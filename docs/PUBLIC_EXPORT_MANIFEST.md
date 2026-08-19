# Manifiesto de export público de investigación v0.6.8

**Repositorio objetivo:** `metternietzsche/tres-cuerpos-argentinos-investigacion`  
**Versión:** `v0.6.8`
**Fuente:** `web/static_prototype/` + derivados promovidos NB17–NB21 + traducción lúdica v0.2 + analizador textual v0.1.1
**Fecha:** 2026-08-18

Este manifiesto separa la autoridad doctrinaria y empírica del videojuego. El
sitio conserva su puente editorial hacia el juego, pero no vuelve a empaquetar
su build ni sus assets de runtime.

## Clasificación

| Ruta de origen | Acción | Destino o regla |
|---|---|---|
| `README.md` | `generate` | Mantener la estructura separada y leer la versión pública actual del juego desde datos. |
| `LICENSE.md` | `generate` | CC BY-NC 4.0 para contenido público; excepciones claras. |
| `CITATION.cff` | `include` | Citar sitio y mapa v0.4 con caveat de réplica humana. |
| `docs/whitepaper/` | `include` | Whitepaper y materiales editoriales. |
| `docs/mapa_orbital/v0_4/` | `include` | Mapa, fuente Draw.io y nueve tablas derivadas de sensibilidad. |
| `docs/metodologia/` | `include` | Pipeline v0.2, codebook y esquema de codificación. |
| `docs/metodologia/ORBITAL_TEXT_ANALYZER_v0_1.md` | `include` | Contrato, límites, privacidad y trazabilidad del laboratorio. |
| `docs/evidencia/` | `include` | Síntesis y matrices derivadas públicas. |
| `docs/licencia/` | `include` | Política ampliada. |
| `docs/roadmap/` | `include` | Roadmap histórico, marcado como tal. |
| `docs/videojuego.md` | `generate` | Enlazar el repo separado y documentar el contrato vigente de validación. |
| `docs/videojuego/legend-methodology-v0.2.md` | `include` | Publicar la metodología de traducción investigación → Leyendas sin convertirla en medición nueva. |
| `figures/` | `include` | Figuras empíricas promovidas. |
| `data_public/` | `include` | Sólo datos derivados seleccionados, incluida la ficha de Leyendas y los registros del analizador sin texto fuente. |
| `web/static_prototype/index.html` | `include` | Entrada del sitio doctrinario. |
| `web/static_prototype/app.js` | `generate` | Retirar publicación conjunta y enlazar al repo real del juego. |
| `web/static_prototype/orbital-analyzer.js` | `include` | Motor local determinista; no transmite ni persiste el texto ingresado. |
| `web/static_prototype/styles.css` | `include` | Estilos del sitio. |
| `web/static_prototype/data/` | `include` | Datos del sitio, sin runtime del juego. |
| `web/static_prototype/assets/` | `include` | Logo, figuras y dieciséis retratos editoriales WebP: quince Leyendas y Rodríguez Saá como actor del corpus. |
| `web/static_prototype/game/` | `exclude` | Build v0.42 obsoleto y duplicado. |
| `web/static_prototype/mobile_game_concept/` | `exclude` | Prototipo interno. |
| `audio/`, `card-art/`, `hand-art/`, `legend-art/`, `scenario-art/`, `table-art/` | `exclude` | Los árboles completos del runtime pertenecen al repo del juego; sólo se publican derivados editoriales seleccionados bajo `assets/`. |
| `audit/` | `exclude` | Auditoría interna pesada. |
| `PUBLICATION_MANIFEST_v0_1.md`, `PUBLICATION_MANIFEST_v0_2.md` | `release-only` | Conservar fuera del clone inicial. |
| `PUBLICATION_NOTES.md` | `exclude` | Decisión conjunta ya reemplazada. |
| `scripts/generate-route-pages.mjs` | `generate` | Producir entradas indexables y `sitemap.xml` para las rutas principales. |
| `scripts/build-text-analysis-data.mjs` | `generate` | Extraer el registro canónico, aplicar la calibración pública v0.1.1 y recalcular la referencia automática de 52 documentos. |
| `scripts/validate-publication.mjs` | `generate` | Verificar paridad, trazabilidad, versiones, SEO y presupuesto del logo. |
| `e2e/`, `playwright.config.mjs` | `generate` | Validar navegación, fichas, búsqueda, resiliencia, accesibilidad y responsive. |
| `.github/workflows/pages.yml` | `generate` | Validar, probar, publicar `web/static_prototype/` y ejecutar smoke de producción. |
| `.github/workflows/release.yml` | `generate` | Exigir tag anotado y publicar un snapshot reproducible con hashes SHA-256. |
| `PROVENANCE.md`, `docs/releases/` | `include` | Documentar procedencia, preservación e insumos preparados para el trámite personal ante DNDA. |
| `CHANGELOG.md`, `.gitignore`, `package.json` | `generate` | Historial público, exclusiones y contrato reproducible de pruebas. |

## Gates

- repositorio por debajo de 150 MB;
- ninguna copia del build, audio o catálogo gráfico del juego;
- cero referencias que presenten v0.42 como versión actual;
- enlaces cruzados al repositorio público real del videojuego;
- caveat visible: datos provisionales, no aptos para cita académica formal;
- las quince Leyendas disponen de una ficha pública con puntaje anterior/actual, evidencia por cuerpo, fuentes, cautela y estado de traducción;
- toda recalibración conserva suma, respeta `|Δ| ≤ 1` por cuerpo y queda separada de los puntajes empíricos del mapa;
- Page estática navegable por rutas hash, entradas indexables y sin errores de consola;
- búsqueda, carga parcial, acceso móvil y contraste pasan la matriz Playwright en desktop, 768 px, 390 px y 320 px;
- ningún documento bruto del corpus ni ruta secreta o credencial;
- el laboratorio procesa localmente, no ofrece descargar el resultado personal
  y separa comparación provisional HCDN de géneros exploratorios;
- registro simétrico de 60 patrones, 20 por cuerpo, y 52 referencias automáticas
  con pesos normalizados;
- runtime y coeficientes internos del videojuego sin modificaciones: el sitio publica su traducción trazable, no una nueva calibración del juego.

## Decisión de licencia

Textos, whitepaper, mapa y figuras explicativas: **CC BY-NC 4.0** con atribución
a Alexandra Bustos Frati, PhD. Código del prototipo, logo, marca, datasets y
materiales de terceros conservan las excepciones detalladas en `LICENSE.md`.
