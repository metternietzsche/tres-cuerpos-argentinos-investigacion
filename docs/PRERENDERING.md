# Prerender estático del sitio Lore

## Diagnóstico anterior

- **Framework:** ninguno. La publicación usa HTML, CSS y JavaScript del navegador escritos a mano. El paquete se ejecuta como módulos ESM de Node (`type: module`), pero `app.js` es un script de cliente clásico.
- **Runtime y herramientas:** Node 22 en CI; Playwright 1.62.1 y axe-core 4.13.0 para aceptación. No hay React, Vue, Next, Astro ni servidor de aplicación.
- **Build:** `generate-route-pages.mjs` sólo generaba páginas de redirección de aproximadamente 1,7 KB. El contenido se publicaba directamente desde `web/static_prototype`.
- **Render anterior:** `index.html` contenía encabezado, navegación, un estado de carga y un `<main id="app" hidden>` vacío. Después de `DOMContentLoaded`, `app.js` descargaba hasta dieciséis JSON y escribía la ruta seleccionada mediante `innerHTML`.
- **Contenido ausente del HTML inicial:** tesis, definiciones doctrinarias, mapa y sus lecturas, método, evidencia, whitepaper, fichas de actores, trazabilidad de Leyendas, explicación del videojuego y enlaces contextuales. Las páginas `.html` del sitemap sólo incluían un título, una descripción breve, `meta refresh` y `location.replace()` hacia una ruta hash.
- **Rutas:** router propio basado en `location.hash`; rutas principales como `#tesis`, `#mapa-orbital` y `#evidencia`, más detalles `#actores/:id`, `#leyendas/:id` y subsecciones `#evidencia/:sección`. Los anchors documentales usan identificadores como `#evidencia-metodologia`.
- **Metadata anterior:** la portada declaraba title, description, canonical, Open Graph, Twitter y JSON-LD genéricos. El cliente sólo cambiaba title, description, OG title y OG description. Las páginas de redirección tenían canonical y Open Graph parciales, sin contenido documental y sin el conjunto completo de Twitter cards.
- **Headings anteriores:** las funciones de render sí generaban H1/H2/H3, pero sólo después de ejecutar JavaScript. El estado de carga agregaba además un H1 transitorio.
- **Hosting:** GitHub Pages con dominio personalizado mediante `CNAME`. `.github/workflows/pages.yml` instala Node/Chromium, valida, ejecuta Playwright, sube `web/static_prototype` y hace smoke del despliegue. No existe backend permanente.

## Decisión

Se eligió **SSG por prerender en build**, no SSR.

El contenido y sus datos cambian al publicar, no por request. GitHub Pages ya sirve archivos estáticos y el pipeline ya instala Chromium para Playwright. Un servidor SSR agregaría infraestructura y fallas operativas sin aportar contenido personalizado. Reescribir el sitio en otro framework tampoco es necesario.

`npm run build` ejecuta el sitio existente en un servidor efímero local, visita cada ruta con Chromium, espera el render vigente y guarda ese mismo HTML dentro de archivos estáticos. El navegador del visitante sigue cargando `app.js` para filtros, búsqueda, laboratorio, navegación hash y controles interactivos.

## Superficie generada

- 12 páginas principales: portada, recorrido, tesis, mapa, laboratorio, actores, Leyendas, evidencia, whitepaper, figuras, videojuego y licencia.
- 10 fichas de actores del corpus.
- 15 fichas de trazabilidad de Leyendas.
- `sitemap.xml` con las 37 URLs canónicas.
- `robots.txt` continúa permitiendo rastreo y enlazando el sitemap.

Cada documento contiene inicialmente:

- title, description, canonical, Open Graph y Twitter card;
- un H1 único;
- navegación principal;
- headings y texto documental completos;
- enlaces internos HTML hacia otras páginas estáticas;
- enlaces externos, incluido el videojuego;
- el mismo CSS y los mismos scripts de mejora progresiva.

Las URLs hash públicas siguen funcionando. Las páginas `.html` dejan de redirigir y se vuelven las URLs canónicas rastreables. Las subsecciones de Evidencia conservan sus anchors; las fichas reciben rutas adicionales `actor-*.html` y `leyenda-*.html` sin eliminar las rutas hash previas.

## Comandos

```bash
npm run build
npm run test:static
npm run test:unit
npm run test:e2e
```

`npm test` regenera primero el prerender y luego ejecuta las tres capas de pruebas.

## Límites deliberados

- El laboratorio necesita JavaScript para analizar un texto; su explicación, formulario, privacidad y método sí existen en el HTML inicial.
- El mapa, los filtros, búsqueda y acordeones mantienen su capa interactiva cliente. Sin JavaScript se conserva la lectura documental y la navegación entre páginas.
- La ruta de búsqueda no se indexa como documento independiente porque su resultado depende de la consulta cliente.
- El prerender usa Chromium durante el build, pero la publicación resultante sigue siendo puramente estática.
