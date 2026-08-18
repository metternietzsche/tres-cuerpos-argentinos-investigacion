import { createServer } from 'node:http';
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { chromium } from '@playwright/test';

const root = resolve('web/static_prototype');
const canonical = 'https://lore.trescuerpos.arcagaucha.com';
const siteName = 'El problema de los tres cuerpos argentinos';
const socialImage = `${canonical}/assets/logo.webp?v=20260815`;
const lastModified = JSON.parse(readFileSync(resolve(root, 'data/site_meta.json'), 'utf8')).last_updated;

const baseRoutes = [
  {
    file: 'index.html',
    route: 'inicio',
    title: siteName,
    description: 'Investigación doctrinaria sobre tecnocracia, mesianismo y paternalismo en el discurso presidencial argentino, con mapa empírico y videojuego.',
    priority: '1.0',
  },
  { file: 'empeza-aca.html', route: 'recorrido', title: 'Empezá acá', description: 'Un recorrido breve por la tesis, el mapa, la evidencia, las Leyendas y el videojuego.' },
  { file: 'tesis.html', route: 'tesis', title: 'La tesis', description: 'Por qué la política argentina no se reduce a un péndulo y cómo interactúan sus tres cuerpos.' },
  { file: 'mapa-orbital.html', route: 'mapa-orbital', title: 'Mapa orbital', description: 'Campo ternario interactivo con 52 discursos, doce unidades de mandato y los tres vectores simultáneos del corpus presidencial democrático argentino.' },
  { file: 'laboratorio.html', route: 'laboratorio', title: 'Analizá un discurso', description: 'Laboratorio orbital local para explorar señales de tecnocracia, mesianismo y paternalismo en un texto político.' },
  { file: 'actores.html', route: 'actores', title: 'Actores y Leyendas', description: 'Actores del corpus presidencial y su correspondencia explícita con las Leyendas jugables.' },
  { file: 'leyendas.html', route: 'leyendas', title: 'Trazabilidad de Leyendas', description: 'Cómo se traducen fuentes, cautelas y configuraciones del mapa orbital a los puntajes del videojuego.' },
  { file: 'evidencia.html', route: 'evidencia', title: 'Cómo leemos un discurso', description: 'Método, ejemplos, fuentes y límites para reconstruir relaciones entre los tres vectores.' },
  { file: 'whitepaper.html', route: 'whitepaper', title: 'Whitepaper v0.4', description: 'Recalibración funcional simétrica de los tres vectores, con polaridad, función, posición, sensibilidad y trayectoria publicadas.' },
  { file: 'figuras.html', route: 'figuras', title: 'Figuras', description: 'Galería guiada de figuras empíricas del corpus HCDN.' },
  { file: 'videojuego.html', route: 'videojuego', title: 'Videojuego', description: 'Tres Cuerpos: República inestable, una traducción jugable del marco doctrinario desarrollada por Arca Gaucha.' },
  { file: 'licencia.html', route: 'licencia', title: 'Licencia', description: 'Licencias, atribución y condiciones de uso del sitio, los datos y el videojuego.' },
];

const actorData = JSON.parse(readFileSync(resolve(root, 'data/actors_hcdn.json'), 'utf8'));
const publication = JSON.parse(readFileSync(resolve(root, 'data/actor_publication.json'), 'utf8'));

const actors = Array.isArray(actorData) ? actorData : (actorData.actors || []);
const actorRoutes = actors.map(actor => ({
  file: `actor-${actor.actor_id}.html`,
  route: `actores/${actor.actor_id}`,
  title: actor.display_name,
  description: `Ficha documental de ${actor.display_name}: discursos, configuración orbital, trayectoria y cautelas del corpus presidencial argentino.`,
  priority: '0.7',
}));

const legendRoutes = (publication.legends || []).map(legend => ({
  file: `leyenda-${legend.id}.html`,
  route: `leyendas/${legend.id}`,
  title: `Por qué ${legend.incarnation} tiene ese puntaje`,
  description: `Fuentes, evidencia por vector, regla de traducción y cautelas del puntaje de ${legend.incarnation} en el videojuego.`,
  priority: '0.7',
}));

const routes = [...baseRoutes, ...actorRoutes, ...legendRoutes];
const routeByHash = new Map(baseRoutes.map(item => [item.route, item.file]));

for (const file of readdirSync(root)) {
  if (/^(actor|leyenda)-.+\.html$/.test(file) && !routes.some(route => route.file === file)) {
    unlinkSync(resolve(root, file));
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char]));
}

function replaceMeta(html, selector, value) {
  const escaped = escapeHtml(value);
  const pattern = selector.startsWith('property:')
    ? new RegExp(`<meta\\s+property="${selector.slice(9)}"\\s+content="[^"]*"\\s*\/?>`, 'i')
    : new RegExp(`<meta\\s+name="${selector}"\\s+content="[^"]*"\\s*\/?>`, 'i');
  const attribute = selector.startsWith('property:') ? `property="${selector.slice(9)}"` : `name="${selector}"`;
  const tag = `<meta ${attribute} content="${escaped}">`;
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `  ${tag}\n</head>`);
}

function replaceCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}">`;
  return /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i.test(html)
    ? html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, tag)
    : html.replace('</head>', `  ${tag}\n</head>`);
}

function publicHref(hash) {
  if (routeByHash.has(hash)) return `./${routeByHash.get(hash)}`;
  if (hash === 'buscar' || hash.startsWith('buscar/')) return `./#${hash}`;
  if (hash.startsWith('actores/')) return `./actor-${hash.slice('actores/'.length)}.html`;
  if (hash.startsWith('leyendas/')) return `./leyenda-${hash.slice('leyendas/'.length)}.html`;
  if (hash.startsWith('evidencia/')) {
    const target = {
      metodologia: 'evidencia-metodologia',
      'ejemplo-menem': 'evidencia-ejemplo-menem',
      casos: 'evidencia-casos',
      'ficha-tecnica': 'evidencia-ficha-tecnica',
      peron: 'evidencia-peron',
      'milei-2026': 'evidencia-milei-2026',
      roadmap: 'evidencia-roadmap',
    }[hash.slice('evidencia/'.length)];
    return target ? `./evidencia.html#${target}` : './evidencia.html';
  }
  return null;
}

function rewriteDocumentLinks(html) {
  return html.replace(/href="#([^"]+)"/g, (match, hash) => {
    const href = publicHref(hash);
    return href ? `href="${href}" data-client-route="#${escapeHtml(hash)}"` : match;
  });
}

function markActiveNavigation(html, route) {
  const section = route.split('/')[0] === 'leyendas' ? 'actores' : route.split('/')[0];
  return html.replace(/<a([^>]*class="nav-link[^"]*"[^>]*data-section="([^"]+)"[^>]*)>/g, (tag, attributes, candidate) => {
    let next = attributes
      .replace(/\saria-current="[^"]*"/g, '')
      .replace(/class="([^"]*)"/, (_, classes) => `class="${classes.replace(/\sactive\b/g, '').trim()}"`);
    if (candidate === section) {
      next = next.replace(/class="([^"]*)"/, (_, classes) => `class="${classes} active"`);
      next += ' aria-current="page"';
    }
    return `<a${next}>`;
  });
}

function buildHtml(shell, route, content) {
  const pageTitle = route.route === 'inicio' ? route.title : `${route.title} · ${siteName}`;
  const url = route.route === 'inicio' ? `${canonical}/` : `${canonical}/${route.file}`;

  let html = shell
    .replace(/<body(?:\s+data-prerender-route="[^"]*")?>/i, `<body data-prerender-route="${escapeHtml(route.route)}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`)
    .replace(/<main\s+id="app"[\s\S]*?<\/main>/i, `<main id="app" role="main" data-prerendered="true">\n${content}\n  </main>`)
    .replace(/<div\s+id="loading"[^>]*>/i, '<div id="loading" role="status" aria-live="polite" hidden aria-hidden="true">');

  html = replaceMeta(html, 'description', route.description);
  html = replaceMeta(html, 'property:og:title', pageTitle);
  html = replaceMeta(html, 'property:og:description', route.description);
  html = replaceMeta(html, 'property:og:url', url);
  html = replaceMeta(html, 'property:og:image', socialImage);
  html = replaceMeta(html, 'twitter:card', 'summary_large_image');
  html = replaceMeta(html, 'twitter:title', pageTitle);
  html = replaceMeta(html, 'twitter:description', route.description);
  html = replaceMeta(html, 'twitter:image', socialImage);
  html = replaceCanonical(html, url);
  html = rewriteDocumentLinks(html);
  html = markActiveNavigation(html, route.route);
  html = html.replace(/^[\t ]+$/gm, '');

  return html.endsWith('\n') ? html : `${html}\n`;
}

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function startServer() {
  const server = createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const target = resolve(root, relative);
    if (!target.startsWith(`${root}${sep}`) || !existsSync(target) || !statSync(target).isFile()) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, { 'content-type': mimeTypes[extname(target)] || 'application/octet-stream' });
    response.end(readFileSync(target));
  });
  return new Promise((resolveServer, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolveServer(server));
  });
}

const shell = readFileSync(resolve(root, 'index.html'), 'utf8');
const server = await startServer();
const address = server.address();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const runtimeFailures = [];
page.on('console', message => { if (message.type() === 'error') runtimeFailures.push(`console: ${message.text()}`); });
page.on('pageerror', error => runtimeFailures.push(`page: ${error.message}`));
page.on('requestfailed', request => runtimeFailures.push(`request: ${request.url()} ${request.failure()?.errorText || ''}`));

try {
  for (const route of routes) {
    await page.goto(`http://127.0.0.1:${address.port}/#${route.route}`, { waitUntil: 'networkidle' });
    await page.locator('main#app:not([hidden]) h1').first().waitFor({ state: 'visible' });
    if (route.route === 'whitepaper') await page.locator('.wp-body').waitFor({ state: 'visible' });
    const snapshot = await page.locator('main#app').evaluate(element => ({
      content: element.innerHTML,
      h1Count: element.querySelectorAll('h1').length,
      textLength: (element.textContent || '').replace(/\s+/g, ' ').trim().length,
      internalLinks: element.querySelectorAll('a[href]').length,
    }));
    if (snapshot.h1Count !== 1) throw new Error(`${route.route}: se esperó un H1 y se obtuvieron ${snapshot.h1Count}.`);
    if (snapshot.textLength < 180) throw new Error(`${route.route}: el contenido prerenderizado es demasiado breve.`);
    if (snapshot.internalLinks < 1) throw new Error(`${route.route}: no produjo enlaces HTML.`);
    writeFileSync(resolve(root, route.file), buildHtml(shell, route, snapshot.content));
  }
} finally {
  await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}

if (runtimeFailures.length) {
  throw new Error(`El prerender encontró fallas de navegador:\n- ${runtimeFailures.join('\n- ')}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => {
  const url = route.route === 'inicio' ? `${canonical}/` : `${canonical}/${route.file}`;
  return `  <url><loc>${url}</loc><lastmod>${lastModified}</lastmod><priority>${route.priority || '0.8'}</priority></url>`;
}).join('\n')}
</urlset>
`;
writeFileSync(resolve(root, 'sitemap.xml'), sitemap);

console.log(`Prerender estático completo: ${routes.length} páginas documentales con HTML inicial.`);
