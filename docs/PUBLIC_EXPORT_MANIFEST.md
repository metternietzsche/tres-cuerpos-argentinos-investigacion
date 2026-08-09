# Manifiesto de export público de investigación v0.3

**Repositorio objetivo:** `metternietzsche/tres-cuerpos-argentinos-investigacion`  
**Versión inicial:** `v0.2.0`  
**Fuente:** `public_export/investigacion/`  
**Fecha:** 2026-08-09

Este manifiesto separa la autoridad doctrinaria y empírica del videojuego. El
sitio conserva su puente editorial hacia el juego, pero no vuelve a empaquetar
su build ni sus assets de runtime.

## Clasificación

| Ruta de origen | Acción | Destino o regla |
|---|---|---|
| `README.md` | `generate` | Actualizar la estructura separada y el estado v0.49 beta del juego. |
| `LICENSE.md` | `generate` | CC BY-NC 4.0 para contenido público; excepciones claras. |
| `CITATION.cff` | `include` | Conservar versión doctrinaria v0.2.0 y caveat empírico. |
| `docs/whitepaper/` | `include` | Whitepaper y materiales editoriales. |
| `docs/mapa_orbital/` | `include` | Marco y brief del mapa. |
| `docs/metodologia/` | `include` | Contratos y especificaciones metodológicas. |
| `docs/evidencia/` | `include` | Síntesis y matrices derivadas públicas. |
| `docs/licencia/` | `include` | Política ampliada. |
| `docs/roadmap/` | `include` | Roadmap histórico, marcado como tal. |
| `docs/videojuego.md` | `generate` | Enlazar el repo separado; retirar referencias a v0.42 embebida. |
| `figures/` | `include` | Figuras empíricas promovidas. |
| `data_public/` | `include` | Sólo datos derivados ya seleccionados. |
| `web/static_prototype/index.html` | `include` | Entrada del sitio doctrinario. |
| `web/static_prototype/app.js` | `generate` | Retirar publicación conjunta y enlazar al repo real del juego. |
| `web/static_prototype/styles.css` | `include` | Estilos del sitio. |
| `web/static_prototype/data/` | `include` | Datos del sitio, sin runtime del juego. |
| `web/static_prototype/assets/` | `include` | Logo y capturas editoriales seleccionadas. |
| `web/static_prototype/game/` | `exclude` | Build v0.42 obsoleto y duplicado. |
| `web/static_prototype/mobile_game_concept/` | `exclude` | Prototipo interno. |
| `audio/`, `card-art/`, `hand-art/`, `legend-art/`, `scenario-art/`, `table-art/` | `exclude` | Assets runtime pertenecen al repo del juego. |
| `audit/` | `exclude` | Auditoría interna pesada. |
| `PUBLICATION_MANIFEST_v0_1.md`, `PUBLICATION_MANIFEST_v0_2.md` | `release-only` | Conservar fuera del clone inicial. |
| `PUBLICATION_NOTES.md` | `exclude` | Decisión conjunta ya reemplazada. |
| `.github/workflows/pages.yml` | `generate` | Publicar sólo `web/static_prototype/`. |
| `CHANGELOG.md`, `.gitignore` | `generate` | Historial público y exclusiones. |

## Gates

- repositorio por debajo de 150 MB;
- ninguna copia del build, audio o catálogo gráfico del juego;
- cero referencias que presenten v0.42 como versión actual;
- enlaces cruzados al repositorio público real del videojuego;
- caveat visible: datos provisionales, no aptos para cita académica formal;
- Page estática navegable por rutas hash y sin errores de consola.

## Decisión de licencia

Textos, whitepaper, mapa y figuras explicativas: **CC BY-NC 4.0** con atribución
a Alexandra Bustos Frati, PhD. Código del prototipo, logo, marca, datasets y
materiales de terceros conservan las excepciones detalladas en `LICENSE.md`.
