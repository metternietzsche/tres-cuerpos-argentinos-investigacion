# Sitio doctrinario estático

El contenido de esta carpeta se publica mediante GitHub Pages.

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000/web/static_prototype/`.

El sitio carga datos JSON con `fetch()`, por lo que no funciona correctamente
desde una URL `file://`. El videojuego no está embebido: la sección `#videojuego`
enlaza su despliegue independiente.

La publicación v0.5 agrega rutas `#recorrido`, `#buscar`, `#leyendas` y
`#leyendas/<id>`. La ficha de cada Leyenda consume
`data/legend_gameplay_translation.v0.2.json`; el whitepaper se descarga sólo al
abrir su ruta y los demás JSON opcionales usan carga tolerante a fallas.

Gate local desde la raíz del repositorio:

```bash
npm install
npm test
```
