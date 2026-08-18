import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('.');
const web = resolve(root, 'web/static_prototype');
const read = path => readFileSync(resolve(root, path), 'utf8');
const json = path => JSON.parse(read(path));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const translationWeb = json('web/static_prototype/data/legend_gameplay_translation.v0.2.json');
const translationPublic = json('data_public/legend_gameplay_translation.v0.2.json');
const publicationWeb = json('web/static_prototype/data/actor_publication.json');
const publicationPublic = json('data_public/actor_publication.json');
const gameWeb = json('web/static_prototype/data/game_meta.json');
const gamePublic = json('data_public/game_meta.json');
const analysisRegistryWeb = json('web/static_prototype/data/text_analysis_registry.v0.1.json');
const analysisRegistryPublic = json('data_public/text_analysis_registry.v0.1.json');
const analysisReferenceWeb = json('web/static_prototype/data/text_analysis_reference.v0.1.json');
const analysisReferencePublic = json('data_public/text_analysis_reference.v0.1.json');
const site = json('web/static_prototype/data/site_meta.json');
const index = read('web/static_prototype/index.html');
const app = read('web/static_prototype/app.js');
const analyzer = read('web/static_prototype/orbital-analyzer.js');

check(JSON.stringify(translationWeb) === JSON.stringify(translationPublic), 'La traducción de Leyendas difiere entre web y data_public.');
check(JSON.stringify(publicationWeb) === JSON.stringify(publicationPublic), 'actor_publication difiere entre web y data_public.');
check(JSON.stringify(gameWeb) === JSON.stringify(gamePublic), 'game_meta difiere entre web y data_public.');
check(JSON.stringify(analysisRegistryWeb) === JSON.stringify(analysisRegistryPublic), 'El registro del analizador difiere entre web y data_public.');
check(JSON.stringify(analysisReferenceWeb) === JSON.stringify(analysisReferencePublic), 'La referencia del analizador difiere entre web y data_public.');
check(translationWeb.translations?.length === 15, 'La traducción debe contener exactamente 15 Leyendas.');

const legendIds = new Set(publicationWeb.legends.map(item => item.id));
const translationIds = new Set(translationWeb.translations.map(item => item.legendId));
check(legendIds.size === 15, 'actor_publication debe publicar 15 Leyendas únicas.');
check([...legendIds].every(id => translationIds.has(id)), 'Toda Leyenda publicada debe tener trazabilidad.');
check([...translationIds].every(id => legendIds.has(id)), 'La trazabilidad no puede contener una Leyenda ajena al roster público.');

const sourceIds = new Set(translationWeb.sources.map(item => item.id));
for (const item of translationWeb.translations) {
  check(['recalibrated', 'adjudicated_unchanged', 'editorial_hold'].includes(item.scoreStatus), `${item.legendId}: scoreStatus inválido.`);
  check(item.sourceIds.length > 0 && item.sourceIds.every(id => sourceIds.has(id)), `${item.legendId}: fuente inexistente.`);
  const priorSum = ['TEC', 'MES', 'PAT'].reduce((sum, vector) => sum + Number(item.priorScores[vector]), 0);
  const scoreSum = ['TEC', 'MES', 'PAT'].reduce((sum, vector) => sum + Number(item.scores[vector]), 0);
  check(priorSum === scoreSum, `${item.legendId}: T1 no conserva la suma.`);
  for (const vector of ['TEC', 'MES', 'PAT']) {
    const score = item.scores[vector];
    check(Number.isInteger(score) && score >= 1 && score <= 10, `${item.legendId}/${vector}: puntaje fuera de 1–10.`);
    check(Math.abs(score - item.priorScores[vector]) <= 1, `${item.legendId}/${vector}: delta mayor que uno.`);
    check(Boolean(item.evidence?.vectorEvidence?.[vector]), `${item.legendId}/${vector}: falta evidencia narrativa.`);
  }
  check(Boolean(item.caveat && item.translationRule && item.sourceWindow), `${item.legendId}: faltan cautela, regla o alcance.`);
}

check(gameWeb.display_version === publicationWeb.game_version, 'game_meta.display_version y actor_publication.game_version no coinciden.');
check(gameWeb.audit.vitest_tests === 227, 'El conteo público de tests del juego debe ser 227.');
check(site.site_release === 'v0.6.6', 'site_meta.site_release debe ser v0.6.6.');
check(!/v0\.49|game-(career|legend)-final-v42/.test(app), 'app.js conserva referencias visuales o de versión obsoletas.');
check(/name="robots" content="index, follow/.test(index), 'index.html no habilita indexación.');
check(/rel="canonical"/.test(index) && /application\/ld\+json/.test(index), 'index.html carece de canonical o datos estructurados.');
check(!/noindex|nofollow/.test(index), 'index.html todavía bloquea robots.');
check(/orbital-analyzer\.js/.test(index) && /#laboratorio/.test(index), 'La portada no carga o no enlaza el laboratorio orbital.');
check(/WebApplication/.test(index), 'Faltan datos estructurados del laboratorio.');

check(analysisRegistryWeb.patterns?.length === 60, 'El analizador debe publicar exactamente 60 patrones.');
check(analysisRegistryWeb.version === 'ORBITAL_TEXT_ANALYZER_v0_1_1', 'El analizador debe publicar la corrección v0.1.1.');
check(analysisRegistryWeb.methodology?.calibration === 'ORBITAL_TEXT_CALIBRATION_v0_1_1', 'Falta declarar la calibración Kicillof v0.1.1.');
check(new Set(analysisRegistryWeb.patterns?.map(item => item.patternId)).size === 60, 'Los patternId del analizador deben ser únicos.');
for (const vector of ['tecnocracia', 'mesianismo', 'paternalismo']) {
  check(analysisRegistryWeb.patterns?.filter(item => item.vector === vector).length === 20, `${vector}: deben publicarse 20 patrones.`);
}
for (const pattern of analysisRegistryWeb.patterns || []) {
  try { new RegExp(pattern.regex, 'giu'); } catch { failures.push(`${pattern.patternId}: regex inválida.`); }
}
check(analysisReferenceWeb.documents?.length === 52, 'La referencia diagnóstica debe contener 52 discursos.');
check(analysisReferenceWeb.analyzerVersion === analysisRegistryWeb.version, 'La nube de referencia y el analizador usan versiones distintas.');
for (const document of analysisReferenceWeb.documents || []) {
  const weightSum = Object.values(document.weights || {}).reduce((sum, value) => sum + Number(value), 0);
  check(Math.abs(weightSum - 1) < 0.00001, `${document.filename}: pesos diagnósticos no suman uno.`);
  check(!('text' in document) && !('fullText' in document), `${document.filename}: la referencia no debe publicar texto fuente.`);
}
check(/fullTextIncludedInResult:\s*false/.test(analyzer), 'El contrato del analizador debe excluir el texto completo del resultado.');
check(/processedLocally:\s*true/.test(analyzer) && /storedBySite:\s*false/.test(analyzer), 'El contrato local/privado del analizador no está declarado.');
check(!/data-laboratory-download|Descargar diagnóstico JSON|diagnostico-orbital\.json/.test(app), 'El laboratorio todavía ofrece descargar el resultado JSON.');

const primaryDocuments = [
  'index.html',
  'empeza-aca.html',
  'tesis.html',
  'mapa-orbital.html',
  'laboratorio.html',
  'actores.html',
  'leyendas.html',
  'evidencia.html',
  'whitepaper.html',
  'figuras.html',
  'videojuego.html',
  'licencia.html',
];
const actorDocuments = (publicationWeb.actors || []).map(item => `actor-${item.actor_id}.html`);
const legendDocuments = (publicationWeb.legends || []).map(item => `leyenda-${item.id}.html`);
const prerenderedDocuments = [...primaryDocuments, ...actorDocuments, ...legendDocuments];

for (const file of prerenderedDocuments) {
  let html = '';
  try { html = read(`web/static_prototype/${file}`); } catch {
    failures.push(`Falta página prerenderizada: ${file}.`);
    continue;
  }
  const main = html.match(/<main\s+id="app"[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
  const visibleText = main
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  check(/<body\s+data-prerender-route="[^"]+">/i.test(html), `${file}: falta identificar la ruta prerenderizada.`);
  check(/<main\s+id="app"[^>]*data-prerendered="true"/i.test(html), `${file}: main no contiene HTML prerenderizado.`);
  check(!/<main\s+id="app"[^>]*\shidden\b/i.test(html), `${file}: el contenido principal sigue oculto.`);
  check(!/http-equiv="refresh"|location\.replace\('\.\/#/i.test(html), `${file}: conserva una redirección cliente.`);
  check((html.match(/<h1\b/gi) || []).length === 1, `${file}: debe contener exactamente un H1 en el HTML inicial.`);
  check(/<nav\s+id="site-nav"[\s\S]*?<\/nav>/i.test(html), `${file}: falta la navegación principal en HTML.`);
  check(visibleText.length >= 180, `${file}: el texto documental inicial es insuficiente.`);
  check(/<a\b[^>]*href=/i.test(main), `${file}: el contenido no ofrece enlaces HTML rastreables.`);
  check(/<title>[^<]+<\/title>/i.test(html), `${file}: falta title específico.`);
  check(/<meta\s+name="description"\s+content="[^"]+"/i.test(html), `${file}: falta meta description.`);
  check(/<link\s+rel="canonical"\s+href="https:\/\/lore\.trescuerpos\.arcagaucha\.com\/[^"]*"/i.test(html), `${file}: falta canonical público.`);
  check(/<meta\s+property="og:title"\s+content="[^"]+"/i.test(html), `${file}: falta Open Graph title.`);
  check(/<meta\s+property="og:description"\s+content="[^"]+"/i.test(html), `${file}: falta Open Graph description.`);
  check(/<meta\s+property="og:image"\s+content="https:\/\//i.test(html), `${file}: falta Open Graph image.`);
  check(/<meta\s+name="twitter:card"\s+content="summary_large_image"/i.test(html), `${file}: falta Twitter card.`);
  check(/<meta\s+name="twitter:title"\s+content="[^"]+"/i.test(html), `${file}: falta Twitter title.`);
  check(/<meta\s+name="twitter:description"\s+content="[^"]+"/i.test(html), `${file}: falta Twitter description.`);

  for (const href of [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map(match => match[1])) {
    if (!href.startsWith('./') || href.startsWith('./#')) continue;
    const target = href.slice(2).split('#')[0] || 'index.html';
    try { statSync(resolve(web, target)); } catch { failures.push(`${file}: enlace interno roto hacia ${href}.`); }
  }
}

check(prerenderedDocuments.length === 37, 'La publicación debe prerenderizar 12 páginas principales, 10 actores y 15 Leyendas.');
const homeHtml = read('web/static_prototype/index.html');
check(/Empezá acá/.test(homeHtml), 'La portada no expone el recorrido inicial como CTA en el HTML inicial.');
check(/Leer la tesis/.test(homeHtml), 'La portada no expone la tesis como CTA en el HTML inicial.');
check(/Leer whitepaper/.test(homeHtml), 'La portada no expone el acceso al whitepaper en el HTML inicial.');
check(/Jugar videojuego/.test(homeHtml), 'La portada no expone el acceso directo al videojuego en el HTML inicial.');
check(!/Trazar puntajes/.test(homeHtml), 'La portada todavía expone el enlace descartado “Trazar puntajes”.');
check(/https:\/\/trescuerpos\.arcagaucha\.com\//.test(homeHtml), 'La portada no expone la URL pública del videojuego en el HTML inicial.');
check(/https:\/\/trescuerpos\.arcagaucha\.com\//.test(read('web/static_prototype/videojuego.html')), 'La página del videojuego no expone su enlace en el HTML inicial.');
const sitemap = read('web/static_prototype/sitemap.xml');
check(prerenderedDocuments.every(file => file === 'index.html' || sitemap.includes(`/${file}</loc>`)), 'El sitemap no incluye todas las páginas documentales prerenderizadas.');

for (const file of ['robots.txt', 'sitemap.xml', 'manifest.webmanifest', 'assets/logo.webp', 'orbital-analyzer.js', ...primaryDocuments]) {
  try { statSync(resolve(web, file)); } catch { failures.push(`Falta archivo público requerido: ${file}.`); }
}
check(statSync(resolve(web, 'assets/logo.webp')).size < 100_000, 'El logo optimizado debe pesar menos de 100 KB.');

if (failures.length) {
  console.error(`Validación fallida (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Publicación válida: ${translationIds.size} Leyendas trazadas, versiones sincronizadas y superficie SEO completa.`);
