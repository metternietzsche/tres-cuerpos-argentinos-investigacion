import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const mainRoutes = ['inicio', 'recorrido', 'tesis', 'mapa-orbital', 'laboratorio', 'actores', 'leyendas', 'evidencia', 'whitepaper', 'videojuego', 'licencia'];
const legendIds = ['peron_I_1946', 'peron_II_1951', 'peron_III_1973', 'alfonsin_1983', 'alfonsin_1986', 'menem_I_1989', 'menem_II_1995', 'delarua_2000', 'duhalde_2002', 'nestor_kirchner_2003', 'cfk_I_2007', 'cfk_II_2011', 'macri_2015', 'albertoF_2019', 'milei_2023'];

function collectRuntimeFailures(page) {
  const failures = [];
  page.on('console', message => { if (message.type() === 'error') failures.push(`console: ${message.text()}`); });
  page.on('pageerror', error => failures.push(`page: ${error.message}`));
  page.on('requestfailed', request => failures.push(`request: ${request.url()} ${request.failure()?.errorText || ''}`));
  return failures;
}

test('las rutas principales cargan completas, sin errores ni overflow', async ({ page }) => {
  const failures = collectRuntimeFailures(page);
  for (const route of mainRoutes) {
    await page.goto(`/#${route}`);
    await expect(page.locator('main#app')).toBeVisible();
    await expect(page.locator('main#app h1').first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `overflow en #${route}`).toBeLessThanOrEqual(1);
  }
  expect(failures).toEqual([]);
});

test('las quince Leyendas exponen puntaje, evidencia, regla y cautela', async ({ page }) => {
  for (const id of legendIds) {
    await page.goto(`/#leyendas/${id}`);
    await expect(page.locator('.legend-trace-page h1')).toContainText('Por qué');
    await expect(page.locator('.trace-score')).toHaveCount(3);
    await expect(page.locator('.trace-vector-evidence article')).toHaveCount(3);
    await expect(page.locator('.trace-rule')).toContainText('Regla aplicada');
    await expect(page.locator('.required-caveat-block')).toContainText('QUÉ NO SIGNIFICA');
  }
});

test('Kirchner explica la recalibración 6/6/7 a 7/5/7', async ({ page }) => {
  await page.goto('/#leyendas/nestor_kirchner_2003');
  await expect(page.locator('.trace-score-tec')).toContainText('6 → 7');
  await expect(page.locator('.trace-score-mes')).toContainText('6 → 5');
  await expect(page.locator('.trace-score-pat')).toContainText('se conserva en 7');
  await expect(page.locator('.trace-status')).toContainText('Recalibrada con v0.4');
});

test('la búsqueda encuentra actores y abre la ficha correcta', async ({ page }) => {
  await page.goto('/#buscar');
  await page.locator('#site-search-input').fill('Kirchner');
  await expect(page.getByRole('link', { name: /Actor del corpus Néstor Kirchner/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Leyenda jugable Kirchner restaurador/ })).toBeVisible();
  await page.getByRole('link', { name: /Leyenda jugable Kirchner restaurador/ }).click();
  await expect(page.locator('.legend-trace-page h1')).toContainText('Por qué Kirchner restaurador');
});

test('Empezá acá ofrece acceso directo y ficha del videojuego', async ({ page }) => {
  await page.goto('/#recorrido');
  const gameStep = page.getByRole('listitem').filter({ has: page.getByRole('heading', { name: 'El experimento lúdico' }) });
  const playLink = gameStep.getByRole('link', { name: /Jugar ahora/ });
  await expect(playLink).toBeVisible();
  await expect(playLink).toHaveAttribute('href', 'https://trescuerpos.arcagaucha.com/');
  await expect(playLink).toHaveAttribute('target', '_blank');

  await gameStep.getByRole('link', { name: 'Conocer el videojuego' }).click();
  await expect(page).toHaveURL(/#videojuego$/);
  await expect(page.getByRole('heading', { name: 'Tres cuerpos, una república inestable' })).toBeVisible();
});

test('el laboratorio analiza localmente y explica sin ofrecer descarga del resultado', async ({ page }) => {
  const failures = collectRuntimeFailures(page);
  await page.goto('/#laboratorio');
  await expect(page.getByRole('heading', { name: '¿Qué tres cuerpos aparecen en este discurso?' })).toBeVisible();
  const privacyNotice = page.getByLabel('Privacidad del análisis');
  await expect(privacyNotice).toContainText('No se envía al servidor ni se guarda en el sitio');
  await expect(privacyNotice).toContainText('desaparecen al recargar o cerrar la página');
  await page.getByRole('button', { name: 'Cargar ejemplo' }).click();
  const postLoadRequests = [];
  page.on('request', request => postLoadRequests.push(request.url()));
  await page.getByRole('button', { name: 'Analizar discurso' }).click();

  await expect(page.locator('.laboratory-output')).toBeVisible();
  await expect(page.locator('.laboratory-score')).toHaveCount(3);
  await expect(page.locator('.laboratory-result-stamp')).toContainText(/TEC|MES|PAT/);
  await expect(page.locator('.laboratory-confidence')).toContainText('fuera del dominio HCDN');
  await expect(page.locator('.laboratory-evidence-column')).toHaveCount(3);
  await expect(page.locator('.laboratory-reference-point')).toHaveCount(52);
  await expect(page.getByRole('button', { name: /Descargar diagnóstico/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Imprimir resultado' })).toBeVisible();
  expect(postLoadRequests).toEqual([]);
  expect(failures).toEqual([]);
});

test('el laboratorio lee .md en memoria y rechaza archivos o textos inválidos', async ({ page }) => {
  await page.goto('/#laboratorio');
  await page.getByRole('button', { name: 'Cargar ejemplo' }).click();
  const sample = await page.getByLabel('Texto a analizar').inputValue();
  await page.getByRole('button', { name: 'Limpiar' }).click();
  await page.locator('#laboratory-file').setInputFiles({
    name: 'discurso.md',
    mimeType: 'text/markdown',
    buffer: Buffer.from(sample),
  });
  await expect(page.getByLabel('Texto a analizar')).toHaveValue(sample);
  await expect(page.locator('#laboratory-file-status')).toContainText('leído localmente');

  await page.locator('#laboratory-file').setInputFiles({
    name: 'discurso.html',
    mimeType: 'text/html',
    buffer: Buffer.from('<script>alert(1)</script>'),
  });
  await expect(page.getByRole('alert')).toContainText('.txt o .md');
  await page.getByRole('button', { name: 'Limpiar' }).click();
  await page.getByLabel('Texto a analizar').fill('Esto es demasiado corto.');
  await page.getByRole('button', { name: 'Analizar discurso' }).click();
  await expect(page.getByRole('alert')).toContainText('al menos 120 palabras');
});

test('el laboratorio escapa metadatos y evidencia aportados por la persona usuaria', async ({ page }) => {
  await page.goto('/#laboratorio');
  await page.getByRole('button', { name: 'Cargar ejemplo' }).click();
  await page.getByLabel('Título o identificación opcional').fill('<img src=x onerror="window.__laboratoryXss=true">');
  await page.getByRole('button', { name: 'Analizar discurso' }).click();
  await expect(page.locator('.laboratory-output-header h2')).toContainText('<img src=x');
  expect(await page.evaluate(() => globalThis.__laboratoryXss === true)).toBe(false);
  await expect(page.locator('.laboratory-output img')).toHaveCount(0);
});

test('el resultado del laboratorio permanece responsivo después del análisis', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Control específico de viewport móvil.');
  await page.goto('/#laboratorio');
  await page.getByRole('button', { name: 'Cargar ejemplo' }).click();
  await page.getByRole('button', { name: 'Analizar discurso' }).click();
  await expect(page.locator('.laboratory-output')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  const svgBox = await page.locator('.laboratory-field').boundingBox();
  expect(svgBox.width).toBeLessThanOrEqual(390);
});

test('un JSON opcional roto no derriba la publicación', async ({ page }) => {
  await page.route('**/roadmap.json*', route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }));
  await page.goto('/#inicio');
  await expect(page.locator('#inicio-page')).toBeVisible();
  await expect(page.locator('.partial-load-warning')).toContainText('resto del sitio sigue disponible');
});

test('el whitepaper pesado se carga sólo al abrir su ruta', async ({ page }) => {
  let whitepaperRequests = 0;
  page.on('request', request => { if (request.url().includes('WHITEPAPER_FULL_DRAFT_v0_4.md')) whitepaperRequests += 1; });
  await page.goto('/#inicio');
  expect(whitepaperRequests).toBe(0);
  await page.goto('/#whitepaper');
  await expect(page.locator('.wp-body')).toBeVisible();
  expect(whitepaperRequests).toBe(1);
});

test('menú móvil y logo conservan navegación', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Control específico de viewport móvil.');
  await page.goto('/#videojuego');
  await page.locator('#mobile-menu-btn').click();
  await expect(page.locator('#site-nav')).toHaveClass(/mobile-open/);
  await page.locator('.site-logo-link').click();
  await expect(page).toHaveURL(/#inicio$/);
  await expect(page.locator('#inicio-page')).toBeVisible();
});

for (const route of ['inicio', 'mapa-orbital', 'laboratorio', 'leyendas', 'leyendas/alfonsin_1983', 'videojuego']) {
  test(`accesibilidad sin violaciones serias en ${route}`, async ({ page }) => {
    await page.goto(`/#${route}`);
    await expect(page.locator('main#app h1').first()).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const blocking = results.violations.filter(item => ['serious', 'critical'].includes(item.impact));
    expect(blocking).toEqual([]);
  });
}

test('SEO técnico entrega robots, sitemap, manifest y rutas indexables', async ({ request }) => {
  for (const path of ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest', '/laboratorio.html', '/leyendas.html', '/videojuego.html']) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
  }
  const index = await (await request.get('/')).text();
  expect(index).toContain('index, follow');
  expect(index).toContain('application/ld+json');
  expect(index).not.toContain('noindex');
});
