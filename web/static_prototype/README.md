# Sitio doctrinario estático

El contenido de esta carpeta se publica mediante GitHub Pages.

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000/web/static_prototype/`.

El sitio carga datos JSON con `fetch()`, por lo que no funciona correctamente
desde una URL `file://`. El videojuego no está embebido: la sección `#videojuego`
enlaza su repositorio y Page independientes.
