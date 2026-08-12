# Manifiesto de export público de investigación v0.4

**Repositorio objetivo:** `metternietzsche/tres-cuerpos-argentinos-investigacion`  
**Versión:** `v0.4.2`
**Fuente:** `web/static_prototype/` + derivados promovidos NB17–NB21
**Fecha:** 2026-08-11

Este manifiesto separa la autoridad doctrinaria y empírica del videojuego. El
sitio conserva su puente editorial hacia el juego, pero no vuelve a empaquetar
su build ni sus assets de runtime.

## Clasificación

| Ruta de origen | Acción | Destino o regla |
|---|---|---|
| `README.md` | `generate` | Actualizar la estructura separada y el estado v0.49 beta del juego. |
| `LICENSE.md` | `generate` | CC BY-NC 4.0 para contenido público; excepciones claras. |
| `CITATION.cff` | `include` | Citar sitio y mapa v0.4 con caveat de réplica humana. |
| `docs/whitepaper/` | `include` | Whitepaper y materiales editoriales. |
| `docs/mapa_orbital/v0_4/` | `include` | Mapa, fuente Draw.io y nueve tablas derivadas de sensibilidad. |
| `docs/metodologia/` | `include` | Pipeline v0.2, codebook y esquema de codificación. |
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
| `web/static_prototype/assets/` | `include` | Logo, figuras, quince retratos lúdicos y un retrato documental WebP con atribución propia. |
| `web/static_prototype/game/` | `exclude` | Build v0.42 obsoleto y duplicado. |
| `web/static_prototype/mobile_game_concept/` | `exclude` | Prototipo interno. |
| `audio/`, `card-art/`, `hand-art/`, `legend-art/`, `scenario-art/`, `table-art/` | `exclude` | Los árboles completos del runtime pertenecen al repo del juego; sólo se publican derivados editoriales seleccionados bajo `assets/`. |
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
- ningún documento bruto del corpus ni ruta secreta o credencial;
- videojuego y coeficientes de Leyendas sin modificaciones.

## Decisión de licencia

Textos, whitepaper, mapa y figuras explicativas: **CC BY-NC 4.0** con atribución
a Alexandra Bustos Frati, PhD. Código del prototipo, logo, marca, datasets y
materiales de terceros conservan las excepciones detalladas en `LICENSE.md`.
