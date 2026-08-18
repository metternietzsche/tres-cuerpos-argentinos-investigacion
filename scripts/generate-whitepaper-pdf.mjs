import { createServer } from 'node:http';
import { readFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(projectRoot, 'web', 'static_prototype');
const output = path.join(publicRoot, 'data', 'EL_PROBLEMA_DE_LOS_TRES_CUERPOS_ARGENTINOS_WHITEPAPER_v0_4.pdf');
const temporaryOutput = `${output}.tmp`;
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
]);

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const target = path.resolve(publicRoot, relativePath);
    if (!target.startsWith(`${publicRoot}${path.sep}`) && target !== publicRoot) throw new Error('Ruta fuera de la publicación');
    const body = await readFile(target);
    response.writeHead(200, { 'Content-Type': mimeTypes.get(path.extname(target)) || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('No encontrado');
  }
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(0, '127.0.0.1', resolve);
});

const address = server.address();
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://127.0.0.1:${address.port}/whitepaper.html`, { waitUntil: 'networkidle' });
  await page.locator('.wp-markdown-body .wp-section').first().waitFor({ state: 'visible' });
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach(image => { image.loading = 'eager'; });
    await Promise.all(images.map(image => image.decode().catch(() => undefined)));
  });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: temporaryOutput,
    format: 'A4',
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
    outline: true,
  });
  await rename(temporaryOutput, output);
  process.stdout.write(`PDF regenerado: ${path.relative(projectRoot, output)}\n`);
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
