# Sitio doctrinario estático prerenderizado

El contenido de esta carpeta se publica mediante GitHub Pages.

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000/web/static_prototype/`.

El HTML inicial ya contiene la lectura documental de cada ruta. JavaScript carga
los datos JSON para hidratar esa lectura y activar mapa, filtros, búsqueda y
laboratorio; por eso la experiencia interactiva no funciona completamente desde
una URL `file://`. El videojuego no está embebido: la sección `#videojuego`
enlaza su despliegue independiente.

La publicación v0.6 agrega `#laboratorio` a las rutas de v0.5. El laboratorio
consume `text_analysis_registry.v0.1.json` y
`text_analysis_reference.v0.1.json`, pero procesa el texto íntegramente en el
navegador mediante `orbital-analyzer.js`. La ficha de cada Leyenda consume
`data/legend_gameplay_translation.v0.2.json`; el whitepaper se descarga sólo al
abrir su ruta y los demás JSON opcionales usan carga tolerante a fallas.

Gate local desde la raíz del repositorio:

```bash
npm install
npm run build
npm test
```

La arquitectura y el contrato del prerender están documentados en
[`docs/PRERENDERING.md`](../../docs/PRERENDERING.md).
