# GITHUB REPOSITORY SPLIT PLAN v0.1

> **Documento histórico supersedido para estado de publicación.** Conserva la
> decisión arquitectónica de separar investigación y juego, pero sus referencias
> a v0.8/v0.9 fueron reemplazadas por `PUBLICATION_NOTES.md` y
> `docs/videojuego.md` en el bump editorial v0.2. La decisión vigente es:
> investigación pública, repositorio del juego privado y beta web jugable.

**Proyecto:** El problema de los tres cuerpos argentinos  
**Autora:** Alexandra Bustos Frati, PhD  
**Estado:** Planificación autorizada · Publicación diferida · No ejecutar todavía  
**Versión:** v0.1 · 2026-05-01

---

## 1. Decisión

### Nombres de repositorio

| Repositorio | Nombre |
|-------------|--------|
| A — Investigación | `tres-cuerpos-argentinos-investigacion` |
| B — Juego | `tres-cuerpos-argentinos-game` |

### Regla de gobierno

- **investigacion** = autoridad conceptual y empírica del proyecto. Todo lo que establece qué dice el marco teórico, qué muestran los datos, cómo se cita y bajo qué licencia vive el contenido público.
- **game** = implementación experimental del marco como mecánica de juego. No establece afirmaciones empíricas independientes. Depende conceptualmente de `investigacion` pero es técnicamente autónomo.

La contaminación en cualquier dirección —código de gameplay en el repo de investigación, notebooks de corpus en el repo del juego— está explícitamente prohibida.

---

## 2. Por qué repositorios separados

### Niveles de madurez distintos

El prototipo de investigación web (v0.1) está estable y documentado. El videojuego está en v0.8 (gameplay deficiente, no publicable) con v0.9 en desarrollo y v1.0 pendiente. Publicar juntos significaría que un crash de compilación del juego o un cambio de motor podría contaminar la historia de commits del repo de investigación, que tiene que mantenerse limpia para citas académicas.

### Audiencias distintas

- `investigacion`: investigadores, periodistas, académicos, citadores, cualquier persona interesada en el marco teórico o los hallazgos empíricos.
- `game`: desarrolladores de juegos, diseñadores, personas interesadas en la traducción lúdica del marco, playtesters.

Un investigador que llega al repo de investigación no debería tener que navegar dependencias de Unity / Godot / npm para encontrar el whitepaper. Un desarrollador de juegos no necesita los notebooks del corpus.

### Licencias distintas

El contenido de investigación está bajo CC BY-NC 4.0. El código del juego tiene su propio régimen de licencia pendiente. Mezclarlos en un solo repo crea ambigüedad sobre qué cubre qué licencia y complica la atribución.

### Ciclos de lanzamiento distintos

`investigacion` puede publicarse en v0.1 en cuanto el smoke test local esté aprobado. `game` no puede publicarse hasta que v0.9 supere la revisión de jugabilidad mínima. Un único repo retrasaría la publicación del contenido de investigación hasta que el juego esté listo.

### Dependencias técnicas distintas

`investigacion`: HTML estático, CSS, JavaScript vanilla, Python para exportación de datos. Sin dependencias de build del lado del cliente. Sin motor de juego.  
`game`: motor de juego (TBD), assets binarios grandes, posibles dependencias de build, mecánicas en iteración activa.

### El juego v0.9 todavía bajo evaluación

Publicar el repo del juego antes de que v0.9 esté evaluado significaría publicar código cuya jugabilidad está documentada como deficiente (`v0.8 existe, gameplay pobre`). El repo de investigación no debe cargar ese estigma.

### La investigación puede permanecer estable aunque el juego sea inestable

Si el juego regresa a v0.8 o requiere una reescritura de mecánicas, eso no debe tocar ningún commit de `investigacion`. La separación garantiza que el historial de investigación es autónomo.

---

## 3. Repositorio A — investigacion

**Nombre:** `tres-cuerpos-argentinos-investigacion`

**Propósito:** Repositorio canónico de investigación. Contiene la teoría, la evidencia empírica disponible, el whitepaper, las figuras promovidas, la metodología, el prototipo web estático, la documentación de licencia y el roadmap. Es la fuente de cita académica del proyecto.

### Incluir

**Raíz del repositorio:**
- `README.md` — descripción del proyecto, estado v0.1, caveats, instrucciones de cita
- `LICENSE.md` — política de licencia definida (CC BY-NC 4.0 para contenido, otros regímenes documentados)
- `CITATION.cff` — metadatos de cita estructurados (formato Citation File Format)
- `logo.png` — logo canónico del proyecto

**Prototipo web:**
- `web/static_prototype/` — prototipo completo (index.html, app.js, styles.css, assets/, data/)
- `web/scripts/export_static_data_v0_1.py` — script de exportación de datos JSON

**Documentación de planificación web (seleccionados):**
- `web/WHITEPAPER_FULL_DRAFT_v0_1.md`
- `web/WEBSITE_INFORMATION_ARCHITECTURE_v0_1.md`
- `web/STATIC_PROTOTYPE_SPEC_v0_1.md`
- `web/SITE_COPY_DECK_v0_1.md`
- `web/DATA_CONTRACT_v0_1.md`
- `web/JSON_EXPORT_PLAN_v0_1.md`
- `web/VISUAL_COMPONENT_SPEC_v0_1.md`
- `web/FIGURES_GALLERY_SPEC_v0_1.md`
- `web/GITHUB_REPOSITORY_SPLIT_PLAN_v0_1.md`

**Evidencia y figuras:**
- `empirical/corpus_presidencial_hcdn/figures_promoted/` — 9 PNGs promovidos con documentación
- `empirical/MAPA_ORBITAL_ARGENTINO_v0_1.md`
- `empirical/UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md`
- `empirical/UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` — previa revisión de diccionario y licencia

**Notebooks y datasets (solo después de limpieza individual):**
- Notebooks NB01–NB10 si superan revisión de limpieza
- PERON_NB01–NB02 si superan revisión (PERON_NB03 con bloqueo documentado)
- Datasets derivados que tengan diccionario de variables completo y revisión de fuentes aprobada

### Excluir

- Corpus OCR bruto (no curado para publicación, sensibilidad de fuentes pendiente de revisión)
- Outputs intermedios sucios / archivos de trabajo no curados
- Logs internos no curados
- Archivos de la bóveda privada de Obsidian
- Fuente fallida de Perón 1973 como evidencia activa (bloqueada — ver Roadmap)
- Código fuente del juego
- Builds del juego
- Assets pesados del juego
- Notebooks sin revisar
- Memos internos en inglés no canónicos que no sean documentación del pipeline

---

## 4. Repositorio B — game

**Nombre:** `tres-cuerpos-argentinos-game`

**Propósito:** Implementación experimental del marco teórico como mecánica de juego de estrategia política. No es un simulador. No produce afirmaciones empíricas. Es una traducción lúdica del sistema de tres vectores.

### Incluir

**Raíz del repositorio:**
- `README.md` — propósito experimental, estado de versión (v0.8/v0.9/v1.0), disclaimer de no-simulador, link al repo de investigación
- `LICENSE.md` — régimen de licencia propio (pendiente de formalización)
- `GAME_DESIGN.md` — documento de diseño de mecánicas
- `CHANGELOG.md` — historial de versiones v0.8 → v0.9 → v1.0

**Código y assets:**
- Código fuente del motor de juego
- Assets del juego (sprites, audio, mapas, UI)
- Builds prototipo si son adecuados para distribución
- Notas de playtest

**Documentación:**
- `docs/mechanics/` — documentación de mecánicas de juego
- `docs/research-foundation.md` — declaración de base conceptual (ver §5)
- Notas de versión v0.8 / v0.9 / v1.0

### Excluir

- Corpus de investigación completo
- Notebooks brutos del pipeline de investigación
- Outputs empíricos promovidos salvo referencias derivadas pequeñas (ej. nombres de vectores)
- Internos del pipeline de investigación
- Datasets con licencias sensibles
- Logs de gobierno no relacionados con el juego

---

## 5. Relación entre repositorios

### En el repo `investigacion`

Crear más adelante: `docs/videojuego.md`

Contenido mínimo:

> El videojuego es una traducción experimental del marco teórico a mecánicas de juego de estrategia política. No es parte del proyecto de investigación empírica ni produce afirmaciones sobre la política argentina.
>
> Estado: v0.8 existe pero la jugabilidad es deficiente. v0.9 está bajo evaluación. v1.0 pendiente — requiere mapa orbital v1 completo.
>
> Repositorio del juego: [pendiente / enlace cuando esté público]

### En el repo `game`

Crear más adelante: `docs/research-foundation.md`

Contenido mínimo:

> Este juego está basado en el marco teórico del proyecto *El problema de los tres cuerpos argentinos*.
>
> La autoridad conceptual canónica del marco —teoría, evidencia empírica, metodología, whitepaper— vive en el repositorio de investigación: [tres-cuerpos-argentinos-investigacion].
>
> Las mecánicas de juego son experimentales. No son afirmaciones finales sobre la política argentina. No reemplazan ni contradicen los hallazgos empíricos del proyecto de investigación.

### Regla de desambiguación

Si algo establece un resultado empírico o una afirmación teórica sobre la política argentina real, pertenece a `investigacion`. Si algo implementa una mecánica de juego inspirada en ese marco, pertenece a `game`. La frontera es la diferencia entre *afirmar* y *traducir lúdicamente*.

---

## 6. División de licencias

### Repositorio `investigacion`

| Tipo de contenido | Licencia |
|-------------------|----------|
| Textos, whitepaper, mapa orbital, figuras explicativas, metodología pública | **CC BY-NC 4.0** |
| Uso comercial | Prohibido salvo licencia comercial escrita separada otorgada por Alexandra Bustos Frati, PhD |
| Código del prototipo web | Todos los derechos reservados / no licenciado para reutilización todavía |
| Datasets, notebooks, corpus OCR | No cubiertos automáticamente — publicación y licencia pendientes de revisión separada |
| Logo, marca e identidad visual | Todos los derechos reservados |

Atribución requerida en todos los usos permitidos: **Alexandra Bustos Frati, PhD**

### Repositorio `game`

| Tipo de contenido | Licencia |
|-------------------|----------|
| Código del juego | Pendiente de formalización |
| Assets, logo, marca | Todos los derechos reservados |
| Diseño de mecánicas y documentación de juego | Sin reutilización comercial sin licencia escrita separada |
| Uso comercial (cualquier componente) | Requiere licencia comercial escrita separada de Alexandra Bustos Frati, PhD |

### Nota sobre cita

Toda cita, reproducción o adaptación de contenido de cualquier repositorio debe atribuirse a Alexandra Bustos Frati, PhD. La cita canónica aplica al contenido de `investigacion` (ver §7).

---

## 7. Autoría y cita

Ambos repositorios deben incluir visiblemente:

**Autora:**  
Alexandra Bustos Frati, PhD

**Cita canónica del proyecto de investigación:**
```
Bustos Frati, Alexandra. El problema de los tres cuerpos argentinos:
una lectura orbital del presidencialismo argentino.
Proyecto de investigación teórico-empírica, v0.1.
```

**Perfil y contacto:**

| Plataforma | URL |
|-----------|-----|
| LinkedIn | https://www.linkedin.com/in/lexbustosfrati/ |
| GitHub | https://github.com/metternietzsche |
| Threads | https://www.threads.net/@lexy.futura |
| Substack | https://alexandrabustosfrati.substack.com |
| ResearchGate | https://www.researchgate.net/profile/Alexandra-Bustos-Frati |

---

## 8. Secuencia de publicación

El orden recomendado protege la integridad del repo de investigación y no fuerza la publicación del juego antes de que esté listo.

| Paso | Acción | Estado |
|------|--------|--------|
| 1 | Completar smoke test local del prototipo web de investigación | Pendiente |
| 2 | Verificar que el logo nuevo carga correctamente en todas las páginas | Pendiente |
| 3 | Evaluar videojuego v0.9 — ¿es jugable mínimamente? | Pendiente |
| 4 | Si v0.9 es viable, crear plan de export del repo del juego | Bloqueado hasta paso 3 |
| 5 | Preparar carpeta de export pública para `investigacion` | Pendiente |
| 6 | Redactar `LICENSE.md`, `README.md`, `CITATION.cff` para `investigacion` | Pendiente |
| 7 | Crear repositorio GitHub público: `tres-cuerpos-argentinos-investigacion` | **No ejecutar todavía** |
| 8 | Publicar `investigacion` | **No ejecutar todavía** |
| 9 | Crear repo sibling `tres-cuerpos-argentinos-game` solo cuando v0.9 sea mínimamente funcional o esté claramente marcado como experimental | Bloqueado hasta paso 3 |
| 10 | Agregar cross-links entre repos | Bloqueado hasta paso 8–9 |

**Criterio de desbloqueo para publicación de `investigacion`:**
- Smoke test web local aprobado
- Logo correcto verificado
- LICENSE.md, README.md, CITATION.cff completos
- Sin corpus OCR bruto en la carpeta de export
- Sin logs internos no curados
- Caveats preservados en UI

**Criterio de desbloqueo para publicación de `game`:**
- v0.9 evaluado y mínimamente funcional, O declarado explícitamente como experimental con disclaimer visible
- README incluye disclaimer de no-simulador
- Licencia del repo del juego definida
- Link al repo de investigación incluido

---

## 9. Carpeta de staging de export público

Estructura propuesta para uso futuro. **No crear todavía** salvo instrucción explícita.

```
public_export/
├── investigacion/
│   ├── README.md
│   ├── LICENSE.md
│   ├── CITATION.cff
│   ├── web/
│   │   ├── static_prototype/
│   │   └── scripts/
│   ├── docs/
│   ├── figures/
│   │   └── (figures_promoted/ — 9 PNGs)
│   ├── data_public/
│   │   └── (JSON export data del prototipo)
│   ├── notebooks_public/
│   │   └── (solo notebooks que superaron revisión de limpieza)
│   └── assets/
│       └── logo.png
└── game/
    ├── README.md
    ├── LICENSE.md
    ├── GAME_DESIGN.md
    ├── CHANGELOG.md
    ├── src/
    ├── assets/
    ├── builds/
    └── docs/
        └── research-foundation.md
```

**Notas:**
- La carpeta `public_export/investigacion/` es un export controlado — no un espejo del repositorio local completo.
- Solo entran archivos que hayan superado revisión individual para publicación.
- El corpus OCR bruto, los notebooks no revisados y los logs internos nunca entran en `public_export/`.

---

## 10. Checklist de readiness

### Repositorio `investigacion`

- [ ] Título público correcto: "El problema de los tres cuerpos argentinos"
- [ ] Autora visible en README, homepage hero y footer
- [ ] `LICENSE.md` redactado con política CC BY-NC 4.0 definida
- [ ] `CITATION.cff` redactado con metadatos de cita correctos
- [ ] Logo correcto cargando en todas las páginas (`assets/logo.png?v=…`)
- [ ] `README.md` del repo redactado con estado, caveats e instrucciones
- [ ] Sin corpus OCR bruto en la carpeta de export
- [ ] Sin logs internos no curados
- [ ] Sin memos en inglés no canónicos
- [ ] Sin links rotos en el prototipo web
- [ ] Prototipo web corre localmente sin errores de consola
- [ ] Perón 1973 marcado como bloqueado en UI
- [ ] Todos los caveats preservados
- [ ] `#licencia` route renderiza con política completa
- [ ] Ningún campo de score bruto renderizado en UI pública

### Repositorio `game`

- [ ] v0.9 evaluado (jugabilidad mínima o disclaimer explícito de experimental)
- [ ] `README.md` declara estado experimental y versión
- [ ] El juego lanza sin error crítico
- [ ] Loop básico de gameplay existe y está documentado
- [ ] Assets y régimen de licencia claros
- [ ] Link al repo de investigación incluido en `docs/research-foundation.md`
- [ ] Sin afirmaciones de simulador o motor predictivo
- [ ] Sin corpus de investigación ni notebooks en el repo

---

## 11. Estado actual

| Ítem | Estado |
|------|--------|
| Planificación del split de repos | **Autorizada** — este documento |
| Publicación en GitHub | **Diferida** — no ejecutar |
| Repositorio `investigacion` | Planificado — no creado |
| Repositorio `game` | **Bloqueado** hasta evaluación de v0.9 |
| Export público local (`public_export/`) | No creado — no crear todavía |
| LICENSE.md para `investigacion` | Política definida en `web/static_prototype/app.js` `renderLicencia()` — pendiente de formalizar en archivo raíz |
| CITATION.cff | No redactado todavía |
| README.md del repo | No redactado todavía |

---

## 12. Próximas acciones

En orden de prioridad:

1. **Este documento** — creado. ✓
2. **Smoke test final del prototipo web** — verificar que todas las rutas cargan, el logo nuevo aparece, la licencia renderiza, los caveats están presentes.
3. **Evaluar videojuego v0.9** — ¿lanza? ¿tiene gameplay mínimo? ¿es publicable con disclaimer?
4. **Si v0.9 es viable:** crear `GAME_REPOSITORY_EXPORT_PLAN_v0_1.md`.
5. **Preparar package de publicación de `investigacion`:**
   - Redactar `LICENSE.md` (formalizar política ya definida).
   - Redactar `README.md` del repo público.
   - Redactar `CITATION.cff`.
   - Definir qué notebooks y datasets entran en `notebooks_public/` y `data_public/`.
6. **Crear repositorio GitHub `tres-cuerpos-argentinos-investigacion`** — solo cuando pasos 2 y 5 estén completos.
7. **Publicar** — solo cuando repo esté preparado.

**No mover archivos. No publicar. No crear repos en GitHub todavía.**

---

*Este documento es un plan de gobernanza interna. No introduce afirmaciones empíricas nuevas. Todos los datos citados derivan de las fuentes canónicas del proyecto. Documento creado en el contexto del workspace local Argentina_Tres_Cuerpos_Workspace.*
