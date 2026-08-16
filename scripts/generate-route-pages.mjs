import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('web/static_prototype');
const canonical = 'https://lore.trescuerpos.arcagaucha.com';
const routes = [
  ['empeza-aca.html', 'recorrido', 'Empezá acá', 'Un recorrido breve por la tesis, el mapa, la evidencia, las Leyendas y el videojuego.'],
  ['tesis.html', 'tesis', 'La tesis', 'Por qué la política argentina no se reduce a un péndulo y cómo interactúan sus tres cuerpos.'],
  ['mapa-orbital.html', 'mapa-orbital', 'Mapa orbital', 'Campo ternario interactivo con 52 discursos y doce unidades actor × mandato.'],
  ['laboratorio.html', 'laboratorio', 'Analizá un discurso', 'Laboratorio orbital local para explorar señales de tecnocracia, mesianismo y paternalismo en un texto político.'],
  ['actores.html', 'actores', 'Actores y Leyendas', 'Actores del corpus presidencial y su correspondencia explícita con las Leyendas jugables.'],
  ['leyendas.html', 'leyendas', 'Trazabilidad de Leyendas', 'Fuentes, cautelas y reglas detrás de los puntajes de las quince Leyendas jugables.'],
  ['evidencia.html', 'evidencia', 'Evidencia y método', 'Método, ejemplos, fuentes y límites de la investigación.'],
  ['whitepaper.html', 'whitepaper', 'Whitepaper v0.4', 'Recalibración funcional simétrica de tecnocracia, mesianismo y paternalismo.'],
  ['videojuego.html', 'videojuego', 'Tres Cuerpos: República Inestable', 'Carrera y quince Leyendas enfrentan conflictos contemporáneos en la beta pública.'],
];

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

for (const [file, hash, title, description] of routes) {
  const url = `${canonical}/${file}`;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} · El problema de los tres cuerpos argentinos</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#101116">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/webp" href="assets/logo.webp?v=20260815">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_AR">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${canonical}/assets/logo.webp?v=20260815">
  <meta name="twitter:card" content="summary_large_image">
  <meta http-equiv="refresh" content="0; url=./#${hash}">
  <link rel="stylesheet" href="styles.css?v=20260815d">
</head>
<body>
  <main class="redirect-page">
    <a href="./#inicio"><img src="assets/logo.webp?v=20260815" alt="" width="72" height="72"></a>
    <p class="section-kicker">EL PROBLEMA DE LOS TRES CUERPOS ARGENTINOS</p>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(description)}</p>
    <p><a href="./#${hash}">Abrir esta sección →</a></p>
  </main>
  <script>location.replace('./#${hash}');</script>
</body>
</html>
`;
  writeFileSync(resolve(root, file), html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${canonical}/</loc><lastmod>2026-08-15</lastmod><priority>1.0</priority></url>
${routes.map(([file]) => `  <url><loc>${canonical}/${file}</loc><lastmod>2026-08-15</lastmod><priority>0.8</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(resolve(root, 'sitemap.xml'), sitemap);
