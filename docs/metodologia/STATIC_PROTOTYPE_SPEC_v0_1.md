# STATIC PROTOTYPE SPEC v0.1

> **Especificación histórica v0.1.** La implementación vigente es el sitio v0.2.
> El estado actual del videojuego está en `../videojuego.md`; las referencias
> v0.8/v0.9 de este documento se preservan sólo como trazabilidad de diseño.

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** especificación de prototipo estático — no código, no assets, no diseño final
**Fuentes:** `WEBSITE_INFORMATION_ARCHITECTURE_v0_1.md` · `SITE_COPY_DECK_v0_1.md` · `VISUAL_COMPONENT_SPEC_v0_1.md` · `DATA_CONTRACT_v0_1.md` · `BRIEF_MAPA_ORBITAL_ARGENTINO_v0_1.md` · `MAPA_ORBITAL_ARGENTINO_v0_1.md` · `README_WORKSPACE_AUTHORITY.md`

---

## 1. Propósito

Este documento especifica el prototipo estático del sitio: las páginas a implementar, la navegación entre ellas, la estructura de cada página sección a sección, los componentes que cada sección instancia, el contenido que muestra (con referencia a fuente exacta), y el comportamiento esperado de los caveats y los estados de contenido bloqueado.

Un prototipo estático es una implementación de las páginas principales del sitio con contenido real, navegación funcional entre páginas, y todos los componentes en su estado por defecto, pero sin base de datos, sin filtros dinámicos, sin animaciones complejas, y sin interactividad más allá de la navegación y la expansión básica de componentes acordeón.

Este documento no define el diseño gráfico, la paleta de colores, la tipografía ni los assets. No contiene código. Sus afirmaciones empíricas derivan exclusivamente de las fuentes canónicas listadas arriba.

---

## 2. Alcance del prototipo

### Páginas incluidas en el prototipo v0.1

| # | Ruta | Título | Prioridad |
|---|------|--------|-----------|
| P01 | `/` | Inicio | Alta |
| P02 | `/tesis` | La tesis | Alta |
| P03 | `/tres-cuerpos` | Los tres cuerpos | Alta |
| P04 | `/mapa-orbital` | Mapa orbital | Alta |
| P05 | `/actores` | Actores | Alta |
| P06 | `/actores/{actor_id}` | Ficha de actor (template + 5 instancias) | Alta |
| P07 | `/peron` | Perón — pipeline separada | Alta |
| P08 | `/evidencia` | Evidencia y método | Media |
| P09 | `/roadmap` | Roadmap | Media |

### Páginas excluidas del prototipo v0.1 (deferred)

| Página | Razón |
|--------|-------|
| ~~`/juego-simulador`~~ | **Implementado** como `#videojuego` en v0.1. Ver §C12 actualizado. |
| Fichas de los 5 actores restantes | Se prototipan las 5 más representativas; el template cubre al resto |
| Funcionalidad de búsqueda | Requiere backend o índice de búsqueda |
| Versión v1 de cualquier página | No existen los datos que la poblarian |

### Funcionalidad excluida del prototipo v0.1

- Filtros dinámicos en grilla de actores (se muestran como chips estáticos no funcionales)
- Gráficos de barras interactivos con animación
- Drawer de evidencia dinámico conectado a datos NB09 (se muestra como placeholder expandible con extractos cualitativos del MAPA)
- Backend o base de datos
- Sistema de usuarios
- Animaciones de transición complejas

---

## 3. Layout global

### Estructura de página

```
┌─────────────────────────────────────────────────────┐
│  HEADER (fijo, sin scroll)                          │
│  Logo/título + navegación principal                 │
├─────────────────────────────────────────────────────┤
│  CAVEAT BANNER (fijo, bajo el header)               │
│  "Mapa orbital preliminar v0.1 — todos los          │
│   perfiles de actor son hipótesis provisionales..."  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  MAIN CONTENT AREA                                  │
│  (ancho máximo contenido, centrado)                 │
│                                                     │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
│  Texto completo del footer de autoridad             │
└─────────────────────────────────────────────────────┘
```

### Header / navegación principal

**Contenido:**
- Título del sitio: "El problema de los tres cuerpos argentinos" (enlace a `/`)
- Subtítulo: "Un mapa del discurso presidencial argentino, 1983–2025"
- Links de navegación (orden exacto, 10 ítems): Inicio · La tesis · Whitepaper · Mapa orbital · Actores · Evidencia · Videojuego · Roadmap · Perón · Licencia

**Nota:** `#figuras` no es un ítem de nav de primer nivel. Es una ruta secundaria/profunda (`#figuras`) accesible desde Evidencia §5 y desde el whitepaper. La ruta está preservada en el router de `app.js` pero no tiene enlace en la barra de navegación principal.

**Comportamiento:**
- En desktop: navegación horizontal en la misma fila
- En mobile: menú hamburger que despliega la navegación en lista vertical
- El header es fijo: permanece visible durante el scroll
- La página activa tiene un indicador visual en el ítem de navegación correspondiente

**Subnavegación contextual (solo en páginas relevantes):**
- En Mapa orbital: subnav con "Corpus democrático HCDN" y "Perón — contrapunto separado"
- En Actores: subnav con los nombres de los actores disponibles + "Perón — pipeline separada"

### Caveat banner

**Texto fijo (del copy deck §1):**
```
Mapa orbital preliminar v0.1 — todos los perfiles de actor son hipótesis provisionales,
no clasificaciones definitivas. Ver Método para entender los niveles de evidencia.
```

**Comportamiento:**
- Siempre visible, en todas las páginas, bajo el header
- No se puede cerrar ni descartar — es información permanente
- En mobile: se muestra completo o condensado (ver §13)

### Área de contenido principal

- Ancho máximo: definido por implementación (sugiere ~900px para texto denso)
- Centrado horizontal
- Sin columna lateral fija en el prototipo v0.1 — los side-notes y caveat rails se implementan como bloques en el flujo de texto, no como sidebar permanente

### Footer

**Texto (del copy deck §1):**
```
Este sitio presenta el mapa orbital preliminar v0.1 del proyecto
"El problema de los tres cuerpos argentinos." No es el mapa integrado final.
Todos los perfiles son hipótesis provisionales derivadas del corpus HCDN
1983–2025 y de dos documentos limpios de la pipeline alternativa de fuentes
de Perón (1946, 1954). La comparación numérica entre Perón y los actores
democráticos no está autorizada en este estado de la investigación.
```

**Elementos adicionales del footer:**
- Enlace a página Evidencia y método
- Enlace a Roadmap
- Versión del sitio: "v0.1 — basado en MAPA_ORBITAL_ARGENTINO_v0_1 (2026-04-30)"

### Comportamiento mobile global

- El header colapsa a hamburger en viewports < 768px
- El caveat banner se muestra en versión de dos líneas
- El área de contenido ocupa el ancho completo con padding horizontal
- Las tablas se convierten en tarjetas apiladas cuando tienen más de tres columnas
- Los filtros de la grilla de actores se agrupan en un menú desplegable "Filtrar"
- El footer se muestra completo (no truncado)

---

## 4. Wireframe — Inicio (P01)

URL: `/`

### Sección 4.1 — Hero

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §2 — héroe completo |
| Componente | C01 (Hero thesis block) |
| Datos | Ninguno (texto fijo) |
| Altura | Primera pantalla completa sin scroll (above the fold) |
| Caveat | El caveat banner ya está visible sobre el hero; ningún caveat adicional dentro del hero |
| Mobile | Titular a ancho completo; subtitular bajo él; CTAs apilados verticalmente |

**Logo hero:**
- Tamaño desktop: 200×200px (`width: 200px; height: 200px`). Border-radius 16px. Box-shadow para profundidad visual.
- Tamaño mobile (≤767px): 140×140px.
- Fuente: `../../logo.png` (constante `LOGO_PATH` en `app.js`). PNG 1254×1254 en raíz del repositorio.
- Fallback `onerror`: si el archivo no existe, ocultar la imagen y mostrar un contenedor hermano `[hidden]` de tamaño idéntico con el símbolo `◈` (mismo tamaño de caja, color `var(--text-3)`). El fallback nunca muestra un ícono de imagen rota.
- El logo del header (`.site-logo`) permanece en su tamaño reducido — solo el hero logo es ampliado.

**Contenido:**
- Logo hero (200px desktop / 140px mobile) con fallback ◈
- Titular: "Argentina no es un péndulo. / Es un problema de tres cuerpos."
- Subtitular: "Un proyecto de medición del discurso presidencial argentino. / Cuarenta años de apertura legislativa, diez presidentes, tres fuerzas en tensión."
- Dos párrafos de síntesis (copy deck §2 — hero párrafo de entrada actualizado)
- CTA primario: "Leer la tesis →" → `#tesis`
- CTAs secundarios: "Leer whitepaper" → `#whitepaper`, "Explorar mapa orbital" → `#mapa-orbital`, "Ver evidencia" → `#evidencia`

---

### Sección 4.2 — Tarjetas de los tres cuerpos

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §2 — tarjetas de tres cuerpos |
| Componente | C02 (Three-body vector cards) — versión colapsada |
| Datos | Entidad `Vector` (E02 del contrato) |
| Caveat | Enlace "→ Ver evidencia y método" al pie de cada tarjeta |
| Mobile | Tres tarjetas apiladas verticalmente |

**Layout:** tres tarjetas en fila horizontal (desktop) o columna (mobile).

**Contenido de cada tarjeta (colapsado):**
- Nombre + definición corta + señal discursiva principal
- Tecnocracia: "El lenguaje de la reforma técnica del Estado..." / señal: "Reformas institucionales presentadas como necesidad técnica."
- Mesianismo: "El lenguaje de la ruptura histórica y la misión trascendente..." / señal: "La política narrada como destino, no como administración."
- Paternalismo: "El lenguaje de la tutela social..." / señal: "El pueblo interpelado como sujeto de derechos que el Estado garantiza."

**Al hacer clic en una tarjeta:** expande para mostrar "Lo que no es" y señales adicionales. En el prototipo estático, la expansión es un accordion simple.

**CTA al pie de la sección:** "→ Ver los tres cuerpos en detalle" → `/tres-cuerpos`

---

### Sección 4.3 — Vista previa del mapa

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §2 — vista previa del mapa |
| Componente | C03 (Orbital map preview) |
| Datos | Tabla de distribución de configuraciones de `MAPA §3.2` |
| Caveat | Banner de versión siempre visible: "Este es el mapa orbital v0.1..." |
| Mobile | Diagrama conceptual simplificado a 3 nodos + lista de configuraciones |

**Contenido:**
- Título: "El mapa que la evidencia permite"
- Párrafo introductorio (copy deck §2 — cuerpo de mapa preview)
- Diagrama conceptual estático de tres fuerzas (placeholder: triángulo con etiquetas)
- Tabla de distribución:
  - paternalismo+tecnocracia → Configuración modal (49%)
  - tecnocracia+paternalismo → Co-dominante (37%)
  - tecnocracia+mesianismo → Analíticamente distintiva (6%)
  - paternalismo+mesianismo → Registros de crisis (4%)
- Banner de versión: "Este es el mapa orbital v0.1. No es el mapa integrado final. Perón aparece en sección separada. Ver Roadmap."

**CTA:** "Explorar el mapa completo" → `/mapa-orbital`

---

### Sección 4.4 — Configuraciones destacadas

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §2 — configuraciones destacadas |
| Componente | Tres bloques de C05 (Configuration family cards) en versión compacta |
| Datos | `CaseUnit` de Menem, Milei, Rodríguez Saá/Duhalde |
| Caveat | Milei: "n=2 — hipótesis no confirmada" visible sin expansión |
| Mobile | Tres bloques apilados |

**Tres bloques:**
1. Destacado Menem — paternalismo+tecnocracia (copy deck §2 — destacado 1)
2. Destacado Milei — tecnocracia+mesianismo, con n=2 visible (copy deck §2 — destacado 2)
3. Mesianismo en democracia — pat+mes en inauguraciones de crisis (copy deck §2 — destacado 3)

---

### Sección 4.5 — Aviso Perón separado

| Campo | Especificación |
|-------|---------------|
| Copy | Derivado de copy deck §7 — "Perón — una pipeline diferente" (versión condensada) |
| Componente | Bloque de texto con badge `PERON_ALT_SOURCE` |
| Datos | Ninguno (texto fijo) |
| Caveat | Badge `NO_COMPARABLE_NUMERICAMENTE` visible |

**Contenido (2 oraciones):**
"Perón no aparece en el mapa orbital junto a los actores democráticos por una razón metodológica: los instrumentos son distintos. Ver la sección Perón para los dos documentos limpios disponibles y el estado del bloqueo de 1973."

**CTA:** "→ Ver Perón" → `/peron`

---

### Sección 4.6 — CTA al Roadmap

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §10 — estado v0.1 (versión condensada) |
| Componente | Texto + CTA simple |
| Datos | Estado de P1 en `RoadmapItem` |

**Contenido:** "El mapa v0.1 es el primer ordenamiento de la evidencia limpia. Siete condiciones deben satisfacerse para el mapa integrado final."

**CTA:** "Ver roadmap hacia el mapa v1" → `/roadmap`

---

## 5. Wireframe — La tesis (P02)

URL: `/tesis`

### Estructura de la página

```
[Breadcrumb: Inicio > La tesis]
[Título: La tesis]
[Subtítulo breve]
[Sección 5.1] Por qué el péndulo es insuficiente
[Sección 5.2] Qué agrega el modelo de tres cuerpos
[Sección 5.3] Qué significa "orbital" aquí
[Sección 5.4] Lo que el modelo no afirma
[Sección 5.5] Enlace a método
```

### Sección 5.1 — Por qué el péndulo es insuficiente

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §3 — "El péndulo es real. Pero no es la estructura." |
| Componente | Bloque de texto simple |
| Datos | Ninguno |
| Caveat | Ninguno adicional |

**Contenido:** título + cuerpo completo del copy deck §3.1 (3 párrafos incluyendo el caso Menem como ejemplo de disociación).

---

### Sección 5.2 — Qué agrega el modelo de tres cuerpos

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §3 — "Tres fuerzas. Combinaciones dirigidas. Configuraciones que cambian." |
| Componente | Bloque de texto + C02 en versión minimalista (3 etiquetas de vector) |
| Datos | Entidad `Vector` |

**Contenido:** título + cuerpo completo del copy deck §3.2 + las tres etiquetas de vector como referencia visual.

---

### Sección 5.3 — Qué significa "orbital" aquí

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §3 — "Órbitas, no tipos" |
| Componente | Bloque de texto + diagrama conceptual estático (C03 simplificado) |
| Datos | Ninguno |

**Contenido:** título + cuerpo completo del copy deck §3.3 + placeholder del diagrama de tres fuerzas con nota "representación conceptual".

---

### Sección 5.4 — Lo que el modelo no afirma

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §3 — "Lo que este proyecto no dice" |
| Componente | Lista de cinco ítems (copy deck §3.4) |
| Datos | Ninguno |
| Caveat | La lista completa es en sí misma el caveat de la página |

**Contenido:** título + lista de cinco proposiciones negativas (→ No dice que el discurso sea equivalente al gobierno; → No dice que las trayectorias sean predecibles; etc.)

---

### Sección 5.5 — Enlace a método

Bloque al pie de la página:
```
Para entender cómo se miden estos vectores → Ver Evidencia y método
```
Enlace a `/evidencia`.

---

## 6. Wireframe — Los tres cuerpos (P03)

URL: `/tres-cuerpos`

### Estructura de la página

```
[Título: Los tres cuerpos]
[Párrafo introductorio: qué son y qué no son]
[Sección 6.1] Tecnocracia — tarjeta expandida
[Sección 6.2] Mesianismo — tarjeta expandida
[Sección 6.3] Paternalismo — tarjeta expandida
[Sección 6.4] Cómo interactúan: familias de configuración
[Sección 6.5] Riesgo de sobredetección general
```

**Párrafo introductorio:** derivado del BRIEF §1 — "el discurso presidencial combina tres vectores en proporciones distintas".

---

### Secciones 6.1–6.3 — Una tarjeta expandida por vector

Para cada vector, instanciar **C02 en versión expandida** con todos los subcampos:

| Subcampo | Fuente |
|----------|--------|
| Nombre largo del vector | Entidad `Vector.name` |
| Definición corta | `Vector.short_definition` |
| Lo que no es | `Vector.what_it_is_not` |
| Señales discursivas típicas | `Vector.discourse_signals` (lista) |
| Riesgo de sobredetección | `Vector.over_detection_warning` |
| Enlace: "→ Ver evidencia y método" | `/evidencia` |

**Caveats por vector:**
- Tecnocracia: nota de que la calibración TM×1.00 / TCM×0.50 / AGN×0.00 intenta distinguir proposición estructurante de mención incidental
- Mesianismo: nota de que el género inaugural infla el tono; el corpus HCDN controla comparando asunciones con aperturas del mismo actor
- Paternalismo: nota de que el paternalismo puede aparecer como vocabulario retórico convencional; el caso Menem es el ejemplo de separación

---

### Sección 6.4 — Cómo interactúan: familias de configuración

| Campo | Especificación |
|-------|---------------|
| Componente | C05 (Configuration family cards) — versión compacta sin expandir |
| Datos | Entidad `Configuration` — las 4 familias principales |
| Caveat | Porcentajes del corpus visibles como datos canónicos |

Muestra las cuatro familias con nombre + porcentaje + 1 oración de descripción. CTA: "Ver mapa completo" → `/mapa-orbital`.

---

### Sección 6.5 — Nota sobre sobredetección

Bloque de texto simple derivado de `VISUAL_COMPONENT_SPEC_v0_1.md §5` (notas de sobredetección de cada vector). Tres párrafos cortos, uno por vector.

---

## 7. Wireframe — Mapa orbital (P04)

URL: `/mapa-orbital`

**Regla dura:** Perón no aparece en el componente de mapa democrático (C04). La separación es estructural: las secciones del mapa democrático y el carril de Perón tienen divisores visuales explícitos y son navegables por anclaje desde la subnav.

### Estructura de la página

```
[Subnav: Corpus democrático HCDN | Perón — contrapunto separado]
[Sección 7.1] Banner de versión v0.1
[Sección 7.2] Mapa democrático HCDN — distribución de configuraciones
[Sección 7.3] Familias de configuración
[Sección 7.4] Grilla de actores democráticos
[Sección 7.5] Transiciones y estabilidad orbital
[--- divisor explícito ---]
[Sección 7.6] Carril Perón — metodológicamente separado
[Sección 7.7] Bloqueos activos del mapa
```

---

### Sección 7.1 — Banner de versión v0.1

| Campo | Especificación |
|-------|---------------|
| Componente | Bloque de aviso prominente |
| Copy | "Este mapa es preliminar. No es el mapa integrado final que incluye a Perón en el mismo marco numérico que los actores democráticos. Ver Roadmap para las condiciones del mapa v1." |
| Caveat | El bloque es en sí mismo el caveat principal de la página |

---

### Sección 7.2 — Distribución de configuraciones del corpus HCDN

| Campo | Especificación |
|-------|---------------|
| Componente | C03 (Orbital map preview) en versión completa |
| Datos | Tabla de `Configuration.document_count` + `Configuration.corpus_percentage` |
| Badge | `HCDN_ONLY` visible sobre la tabla |
| Copy | Copy deck §5 — "El corpus democrático HCDN 1983–2025" + "El hallazgo más robusto" |

**Contenido:**
- Párrafos del copy deck §5 (corpus democrático + hallazgo modal)
- Tabla completa de las 6 configuraciones con documentos, actores y porcentaje
- Nota bajo la tabla: "La tabla incluye solo actores HCDN_PROMOTED_LAYER. No incluye documentos de la PERON_ALT_PIPELINE."

---

### Sección 7.3 — Familias de configuración

| Campo | Especificación |
|-------|---------------|
| Componente | C05 (Configuration family cards) — todas las instancias |
| Datos | Entidad `Configuration` (todas) |
| Copy | Copy deck §5 — sección de familias |

Cinco tarjetas (incluyendo "indeterminate/casos límite"). Cada tarjeta expandible con: definición, actores asociados, interpretación, caveats.

Los badges `LOW_N` y `PROVISIONAL` aparecen en tarjetas que referencian a Milei (tec+mes) y Rodríguez Saá (pat+mes).

---

### Sección 7.4 — Grilla de actores democráticos

| Campo | Especificación |
|-------|---------------|
| Componente | C04 (Democratic actor map) |
| Datos | Vista derivada `democratic_actor_map_view` — 10 actores |
| Copy | Template de tarjeta del copy deck §6 |

**Chips de filtro:** visibles como elementos estáticos no funcionales. Etiquetas: "Configuración: todas / pat+tec / tec+pat / tec+mes / pat+mes / variable" — en el prototipo estático, los chips están presentes visualmente pero no filtran. Nota bajo los chips: "Filtros disponibles en versión interactiva."

**Los 10 actores con sus datos del NB10:**

| Actor | Configuración | n | Cautela | Tier | Badges |
|-------|--------------|---|---------|------|--------|
| Raúl Alfonsín | variable (5 trans.) | 8 | medium | TIER_1 | PROVISIONAL |
| Carlos Menem | pat+tec (9/11) | 11 | low | TIER_1 | PROVISIONAL |
| Fernando de la Rúa | pat+tec → flip | 3 | medium | TIER_1 | PROVISIONAL |
| Eduardo Duhalde | pat+tec / pat+mes inaugural | 3 | medium | TIER_1 | PROVISIONAL |
| Néstor Kirchner | near-parity (1 trans.) | 5 | medium | TIER_1 | PROVISIONAL |
| Cristina F. de Kirchner | pat+tec modal / tec+pat avg | 9 | low | TIER_1 | PROVISIONAL |
| Mauricio Macri ⚠️ | tec+pat (3/5 activos) | 5 | medium | TIER_3 | PROVISIONAL · METADATA_CORREGIDA |
| Alberto Fernández ⚠️ | near-parity, ambigüedad | 4 | high | TIER_3 | PROVISIONAL · METADATA_CORREGIDA |
| Javier Milei ⚠️ | tec+mes (2 docs) | 2 | medium | TIER_3 | PROVISIONAL · LOW_N |
| Adolfo Rodríguez Saá ⚠️ | pat+mes (1 doc) | 1 | high | TIER_3 | PROVISIONAL · LOW_N |

Badge "Hipótesis provisional — no clasificación definitiva" visible en cada tarjeta sin expansión.

---

### Sección 7.5 — Transiciones y estabilidad orbital

| Campo | Especificación |
|-------|---------------|
| Componente | Tabla de texto simple |
| Datos | Columnas `transition_count` y `stability_label` del `ActorProfile` (E05) |
| Caveat | Nota: "La estabilidad o inestabilidad es una propiedad del corpus de apertura legislativa, no del gobierno." |

Tabla derivada de `MAPA §3.4`: actor, transiciones, documentos, etiqueta de estabilidad.

---

### Sección 7.6 — Carril Perón: contrapunto cualitativo separado

| Campo | Especificación |
|-------|---------------|
| Componente | C10 (Perón separated lane) completo |
| Datos | Vista `peron_lane_view` — 3 cards |
| Divisor | Elemento visual explícito con texto: "PERÓN 1946–1954 — Pipeline alternativa de fuentes / Instrumento diferente al corpus HCDN / Los datos no son comparables numéricamente." |
| Badge | `PERON_ALT_SOURCE` + `NO_COMPARABLE_NUMERICAMENTE` en el encabezado del carril |

Los tres cards: 1946 (expandible), 1954 (expandible), 1973 (bloqueado con razón del bloqueo). Ver especificación completa en §10.

---

### Sección 7.7 — Bloqueos activos del mapa

| Campo | Especificación |
|-------|---------------|
| Componente | Bloque de texto con lista de bloqueos |
| Datos | Entidad `CaseUnit` donde `blocked == true` + `RoadmapItem` relevantes |
| Copy | Derivado del copy deck §10 y del MAPA §8 |

**Contenido:**
```
Perón 1973 — bloqueado. Ver Roadmap (Precondición P1).
Comparación numérica Perón–HCDN — no disponible. Requiere bridge note (P4).
Perfil Milei confirmado — no disponible. Requiere n≥4 (P5).
Mapa orbital v1 — no disponible. Requiere satisfacer P1–P6 (P7).
```

---

## 8. Wireframe — Actores (índice) (P05)

URL: `/actores`

### Estructura de la página

```
[Título: Actores]
[Párrafo introductorio]
[Sección 8.1] Grilla HCDN — 10 actores (idéntica a §7.4)
[Sección 8.2] Enlace a Perón — pipeline separada
```

### Sección 8.1 — Grilla de actores HCDN

Instancia idéntica de C04 a la definida en §7.4. El índice de actores y la página del mapa orbital comparten el mismo componente en el prototipo; la implementación puede reutilizar el mismo bloque.

**Chips de filtro estáticos:** configuración / cautela / período (no funcionales en v0.1).

**Al hacer clic en un actor:** navega a `/actores/{actor_id}` (P06).

---

### Sección 8.2 — Enlace a Perón

Bloque separado bajo la grilla HCDN, con separador visual explícito:

```
PERÓN — Pipeline alternativa
No aparece en la grilla anterior por razones metodológicas, no editoriales.
[→ Ver ficha de Perón]  → /peron
```

Badge `PERON_ALT_SOURCE` visible en el bloque.

---

## 9. Wireframe — Ficha de actor (template + instancias) (P06)

URL: `/actores/{actor_id}`

### Template de ficha de actor

```
[Breadcrumb: Actores > Nombre del actor]
[Sección 9.1] Encabezado del actor
[Sección 9.2] Badges de status y cautela
[Sección 9.3] Resumen de configuración
[Sección 9.4] Placeholder de timeline
[Sección 9.5] Placeholder de drawer de evidencia
[Sección 9.6] Caveat obligatorio + cierre
```

---

### Sección 9.1 — Encabezado

| Campo | Especificación |
|-------|---------------|
| Componente | C06 (Actor profile card) — encabezado |
| Datos | `ActorProfile.display_name`, `ActorProfile.period`, `ActorProfile.n_documents`, `ActorProfile.caution_level`, `ActorProfile.readiness_status` |

**Formato:**
```
[Nombre del actor]
[Período] · Corpus: [n] documentos · Cautela: [LOW/MEDIUM/HIGH] · [TIER_1/TIER_3]
```

Badge siempre visible:
```
Hipótesis provisional — no clasificación histórica definitiva
```

---

### Sección 9.2 — Badges

Todos los badges de `ActorProfile.caveat_badges` se muestran visualmente. Cada badge tiene su `required_microcopy` (del contrato §12) como texto expandible — no como tooltip.

---

### Sección 9.3 — Resumen de configuración

| Campo | Especificación |
|-------|---------------|
| Componente | C06 — cuerpo |
| Datos | Campos de `ActorProfile` + `CaseUnit` correspondiente |

**Tabla de campos:**

| Campo de display | Fuente en datos |
|-----------------|----------------|
| Configuración modal | `ActorProfile.directed_configuration` |
| Vector dominante (avg) | `ActorProfile.dominant_vector` |
| Base empírica | `ActorProfile.n_documents` + notas de `required_caveat` |
| Transiciones | `ActorProfile.transition_count` + `ActorProfile.stability_label` |
| Hipótesis principal | `ActorProfile.main_hypothesis` (truncado a 4 oraciones) |
| Siguiente evidencia necesaria | `CaseUnit.next_evidence_needed` |

**Nota en el template:** los campos `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo` **no se muestran** en el display público. Son datos internos del contrato, no del frontend.

---

### Sección 9.4 — Placeholder de timeline

| Campo | Especificación |
|-------|---------------|
| Componente | C07 (Actor timeline) — versión placeholder |
| Datos | `DocumentRecord` filtrado por `actor_id` |
| En v0.1 | Lista textual de documentos con año, configuración, attractor strength, y flags. No visualización gráfica aún. |

**Formato de lista en v0.1 (por documento, en orden cronológico):**
```
[año] · [tipo] · [configuración] · [attractor_strength] · [flags si existen]
```

Los documentos `is_low_weight == true` tienen marcador "(low-weight — ver Método)".
Los gaps documentados aparecen como: "[año] · no disponible en corpus v0.1".

---

### Sección 9.5 — Placeholder de drawer de evidencia

| Campo | Especificación |
|-------|---------------|
| Componente | C08 — versión placeholder estática |
| Datos | Extractos cualitativos del MAPA §5 para el actor específico |
| En v0.1 | Acordeón expandible con 2–3 extractos cualitativos por vector. Los extractos NB09 completos se conectan en la versión interactiva. |

**Formato del acordeón:**
```
[+ Ver extractos de evidencia]
  → Vector: tecnocracia
    "[Texto del extracto]" — [Fuente y año]
  → Vector: paternalismo
    "[Texto del extracto]" — [Fuente y año]
```

**Aviso fijo en el drawer:**
```
Los extractos son evidencia del registro retórico de mensajes formales.
No describen el gobierno. El discurso y la política son dimensiones separables.
```

---

### Sección 9.6 — Caveat obligatorio y cierre

**Caveat obligatorio del actor** (`ActorProfile.required_caveat`): siempre visible, en un bloque dedicado, no como texto secundario.

**Aviso de cierre fijo (igual para todos los actores):**
```
Este perfil es una hipótesis provisional derivada del corpus HCDN_PROMOTED_LAYER.
No es una clasificación histórica definitiva.
El discurso de apertura legislativa no describe el gobierno.
```

---

### Instancia 1 — Javier Milei

URL: `/actores/milei`

**Datos del NB10:**
- Período: 2024–2025
- Configuración: tecnocracia+mesianismo (ambos documentos)
- n_documents: 2
- transition_count: 0 · stability_label: stable
- caution_level: medium · readiness_status: provisional_insufficient_corpus
- caveat_badges: PROVISIONAL · HCDN_ONLY · LOW_N

**Encabezado:**
```
Javier Milei
2024–2025 · Corpus: 2 documentos · Cautela: MEDIUM · TIER_3
⚠️ CORPUS INSUFICIENTE (n=2)
Hipótesis provisional — no clasificación histórica definitiva
```

**Configuración display:**
- Configuración: tecnocracia+mesianismo (ambos documentos disponibles)
- Fortaleza atractora: medium (2024) → strong (2025)
- Transiciones: 0

**Hipótesis (del NB10):** "Milei muestra una configuración tecnocracia+mesianismo en ambos documentos disponibles. Es el único actor en el corpus democrático donde el mesianismo es vector secundario sostenido a nivel actor. El documento de 2025 es una apertura legislativa ordinaria, no una inauguración ni un discurso de crisis. Si el patrón persiste con corpus ampliado, el mesianismo mileísta no sería un registro de crisis sino un atributo discursivo de gobierno ordinario." [PROVISIONAL]

**Timeline (de DocumentRecord):**
```
2024 · apertura · tecnocracia+mesianismo · medium · NB05 ambiguity flag
2025 · apertura · tecnocracia+mesianismo · strong
[2023 inaugural] · no disponible en corpus v0.1
```

**Required caveat:** "n=2 documentos. El tipo de actor no puede confirmarse. La hipótesis requiere n≥4 para evaluación. Inaugural dic. 2023 posiblemente ausente. Apertura 2026 pendiente. No citar tecnocracia+mesianismo como rasgo confirmado de Milei."

**Siguiente evidencia:** "Ingestión inaugural dic. 2023 + apertura 2026. Con n≥4 la hipótesis puede evaluarse."

---

### Instancia 2 — Carlos Menem

URL: `/actores/menem`

**Datos del NB10:**
- Período: 1990–1999
- Configuración: paternalismo+tecnocracia (9/11 documentos)
- n_documents: 11 · transition_count: 3 · stability_label: moderate
- caution_level: low · readiness_status: strong_provisional
- caveat_badges: PROVISIONAL · HCDN_ONLY

**Encabezado:**
```
Carlos Menem
1990–1999 · Corpus: 11 documentos · Cautela: LOW · TIER_1
Hipótesis provisional — no clasificación histórica definitiva
```

**Configuración display:**
- Configuración modal: paternalismo+tecnocracia (9 de 11 documentos)
- avg_pat más alto del corpus democrático
- Transiciones: 3 en 11 documentos

**Hipótesis (del NB10 main_interpretive_hypothesis, condensado):** "Menem sostiene paternalismo+tecnocracia en 9 de 11 documentos a través de los diez años de reforma de mercado de los 1990. El hallazgo más significativo es la disociación entre registro discursivo paternalista y orientación gubernamental reformista: el mayor reformador de mercado de la democracia argentina enuncia su discurso presidencial en un registro sistemáticamente tutelar." [PROVISIONAL]

**Timeline:** 1990–1999, 11 documentos. 1992 (pat+tec, strong, pat=70.362 — dato no expuesto directamente). Documentos 1994 y 1995 marcados como cleared_provisional con nota.

**Required caveat:** "No conflate registro discursivo paternalista con política de Estado menemista. Los vectores describen la retórica de los mensajes presidenciales de apertura legislativa. No describen el gobierno."

---

### Instancia 3 — Cristina Fernández de Kirchner

URL: `/actores/cfk`

**Datos del NB10:**
- Período: 2007–2015
- Configuración modal: paternalismo+tecnocracia (5/9); configuración avg-level: tecnocracia+paternalismo
- n_documents: 9 · transition_count: 4 · stability_label: moderate
- caution_level: low · readiness_status: strong_provisional
- caveat_badges: PROVISIONAL · HCDN_ONLY

**Encabezado:**
```
Cristina Fernández de Kirchner
2007–2015 · Corpus: 9 documentos · Cautela: LOW · TIER_1
Hipótesis provisional — no clasificación histórica definitiva
```

**Configuración display:**
- Configuración modal: paternalismo+tecnocracia (5/9 documentos)
- Configuración promedio: tecnocracia+paternalismo (avg_tec=18.305 > avg_pat=15.958)
- Fortaleza atractora: 6/9 documentos con attractor strong — mayor proporción del corpus
- Nota de discrepancia: "La configuración modal difiere del vector promedio. Explicación: la apertura de 2008 tiene la mayor brecha tecnocrática del corpus CFK. Ver timeline."

**Hipótesis (condensado):** "CFK presenta el patrón orbital más consistente y de mayor fortaleza atractora del corpus democrático disponible. La configuración modal (pat+tec en 5/9) difiere del vector promedio dominante (tecnocracia). La discrepancia se explica por la apertura de 2008, con la mayor brecha tecnocrática del corpus CFK. Lectura provisional: tecnocracia-con-paternalismo, con intensificación tecnocrática en el primer mandato." [PROVISIONAL]

**Timeline:** 2007–2015, 9 documentos. 2008 marcado como outlier tecnocrático. 2009: "no disponible en corpus NB08 — posible gap." 2014: cleared_provisional near-tie.

**Required caveat:** "La estabilidad orbital es una propiedad del discurso formal de apertura legislativa. No describe el kirchnerismo como corriente política. La apertura 2009 puede ser un gap — verificar antes de afirmar trayectoria completa."

---

### Instancia 4 — Raúl Alfonsín

URL: `/actores/alfonsin`

**Datos del NB10:**
- Período: 1983–1989
- Configuración: sin modal estable (5 transiciones)
- n_documents: 8 · transition_count: 5 · stability_label: unstable
- caution_level: medium · readiness_status: provisional
- caveat_badges: PROVISIONAL · HCDN_ONLY

**Encabezado:**
```
Raúl Alfonsín
1983–1989 · Corpus: 8 documentos · Cautela: MEDIUM · TIER_1
INESTABILIDAD ORBITAL — hallazgo principal, no defecto del corpus
Hipótesis provisional — no clasificación histórica definitiva
```

**Configuración display:**
- Configuración modal: ninguna estable — 5 transiciones en 8 documentos
- Configuración promedio: tecnocracia+paternalismo (avg)
- avg_mes=5.09: más alto del corpus democrático entre actores sin mesianismo como configuración estable
- Nota: "La inestabilidad orbital no implica incoherencia política. Es el hallazgo principal."

**Hipótesis (condensado):** "Alfonsín presenta la mayor inestabilidad orbital del corpus: cinco cambios de configuración en ocho documentos. El vector dominante rota entre tecnocracia, paternalismo y mesianismo. El mesianismo aparece en los tres momentos de mayor presión del mandato: 1988 Carapintada (empate tec=mes), 1989 hiperinflación (mesianismo primario). Opera como registro retórico de crisis, no como vector estructural del actor." [PROVISIONAL]

**Timeline:** secuencia completa del MAPA §5.1:
```
1983 · asunción · tec+pat · medium
1984 · apertura · pat+tec · medium · NB05 ambiguity flag
1985 · apertura · pat+tec · medium · cleared_provisional (near-tie)
1986 · apertura · tec+pat · strong
1987 · apertura · tec+pat · strong
1988 dic. · extraordinaria · tec+mes · indeterminate · low-weight
1988 · apertura · tec+pat · medium · NB05 ambiguity flag
1989 · apertura · mes+tec · medium
```

**Required caveat:** "La inestabilidad es el hallazgo — no implica incoherencia política. El mesianismo de crisis no establece que Alfonsín sea un actor mesiánico estructural. No clasificar como tipo fijo. La configuración actor-level (tec+pat) es la media de una trayectoria inestable."

---

### Instancia 5 — Mauricio Macri

URL: `/actores/macri`

**Datos del NB10:**
- Período: 2015–2019 (corregido)
- Configuración: tecnocracia+paternalismo (3/5 aperturas activas)
- n_documents: 5 (corregido desde 6) · transition_count: 3 · stability_label: unstable
- caution_level: medium · readiness_status: provisional
- caveat_badges: PROVISIONAL · HCDN_ONLY · METADATA_CORREGIDA

**Encabezado:**
```
Mauricio Macri
2015–2019 · Corpus: 5 documentos (corregido) · Cautela: MEDIUM · TIER_3
⚠️ PERFIL CORREGIDO — PENDIENTE VALIDACIÓN
Hipótesis provisional — no clasificación histórica definitiva
```

**Configuración display:**
- Configuración: tecnocracia+paternalismo (3/5 aperturas activas)
- Inaugural 2015: paternalismo+tecnocracia (patrón inauguracional)
- Doc 2018: indeterminate attractor — low-weight
- avg_mes: 0.869 — el más bajo del corpus democrático
- Nota: "Este perfil no puede compararse con el perfil pre-corrección."

**Hipótesis (condensado):** "El perfil corregido (n=5, sin asunción AlbertoF 2019 mal atribuida) muestra tec+pat en las aperturas de gobierno activo con strong attractor. El doc 2018 retiene indeterminate attractor y es low-weight. avg_mes=0.869 es el más bajo del corpus democrático — registro mínimo de mesianismo." [PROVISIONAL, CORRECTED]

**Timeline:**
```
2015 · asunción · pat+tec · strong
2016 · apertura · tec+pat · strong
2017 · apertura · tec+pat · strong
2018 · apertura · pat+tec · indeterminate · low-weight
VT-01-03-2019-AS-00.txt · apertura · tec+pat · strong
[Mensaje Presidencial 2019.txt — corresponde a Alberto Fernández, excluido de este corpus]
```

**Required caveat:** "No comparar con el perfil pre-corrección. No citar como definitivo hasta re-run de pipeline v1. El doc 2018 es low-weight. TIER_3 por corrección, no por corpus insuficiente."

---

## 10. Wireframe — Perón (P07)

URL: `/peron`

**Regla dura:** esta página es autónoma. No es una ficha del índice de actores democráticos. La separación es metodológica.

### Estructura de la página

```
[Título: Perón — Pipeline alternativa de fuentes]
[Badge: PERON_ALT_SOURCE · NO_COMPARABLE_NUMERICAMENTE]
[Sección 10.1] Por qué una pipeline separada
[Sección 10.2] Card 1946 — asunción inaugural
[Sección 10.3] Card 1954 — apertura anual
[--- divisor visual ---]
[Sección 10.4] Card 1973 — BLOQUEADO
[Sección 10.5] Aviso de no comparabilidad numérica
[Sección 10.6] CTA hacia adquisición de fuente
```

---

### Sección 10.1 — Por qué una pipeline separada

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §7 — "Perón — una pipeline diferente" (cuerpo completo) |
| Componente | Bloque de texto simple |

Tres razones explicadas en lenguaje accesible: OCR de dos columnas, instrumento diferente al corpus HCDN, sin bridge note.

---

### Secciones 10.2 y 10.3 — Cards 1946 y 1954

| Campo | Especificación |
|-------|---------------|
| Componente | C10 (Perón separated lane) — cards individuales |
| Datos | `PeronPhaseCard` — instancias `peron_1946` y `peron_1954` |
| Badges | `PERON_ALT_SOURCE` + `NO_COMPARABLE_NUMERICAMENTE` |

**Card 1946 — contenido expandible:**
- Fuente: PERON_SRC_003
- Status: usable_one_document_hypothesis
- Jerarquía: MES > PAT > TEC (82 / 64 / 63)
- Segmentos: 45; palabras: 5.072; incertidumbre OCR: 2.80%
- Descripción de fase: copy deck §7 — "1946 — ruptura, redención y mandato de construcción" (cuerpo completo)
- Nota bajo los scores: "Conteos proposicionales PERON_NB02 — no comparar con scores NB05 del corpus HCDN."

**Card 1954 — contenido expandible:**
- Fuente: PERON_SRC_013
- Status: usable_one_document_hypothesis
- Jerarquía: MES > PAT > TEC (122 / 110 / 54)
- Segmentos: 90; palabras: 4.621; incertidumbre OCR: 2.16%
- Hallazgo de contraste: "TEC es el único vector cuyo score absoluto decrece entre 1946 y 1954 (63→54, Δ=−9) a pesar de que el corpus 1954 tiene el doble de segmentos."
- Descripción de fase: copy deck §7 — "1954 — consagración, pueblo organizado, aparato asumido" (cuerpo completo)

---

### Sección 10.4 — Card 1973 (bloqueado)

| Campo | Especificación |
|-------|---------------|
| Componente | C10 — card bloqueada |
| Datos | `PeronPhaseCard.peron_1973_blocked` |
| Badges | `BLOQUEADO` + `SOURCE_FAILURE` + `PERON_ALT_SOURCE` |

**Contenido del card bloqueado:**
- Título: "1973 — BLOQUEADO"
- Razón: cuerpo completo de copy deck §7 — "1973 — el discurso que no está"
- Sin contenido analítico. Sin estimaciones.
- Enlace: "→ Ver Roadmap — Precondición P1" → `/roadmap#P1`

---

### Sección 10.5 — Aviso de no comparabilidad numérica

Bloque de texto fijo:
```
Sin la nota puente entre la PERON_ALT_PIPELINE y el corpus HCDN,
no es posible comparar numéricamente a Perón con los actores democráticos.
Los scores de 1946 y 1954 son conteos proposicionales, no scores NB05 calibrados.
Esta sección ofrece comparación cualitativa a través del marco conceptual compartido.
```

---

### Sección 10.6 — CTA

```
La adquisición de una fuente verificada del discurso de Perón del 12 de octubre de 1973
es la acción de mayor impacto para avanzar hacia el mapa v1.

Fuentes prioritarias:
→ BCN — Mensajes presidenciales (archivo digitalizado)
→ La Nación, 13 de octubre de 1973
→ Archivo histórico de Casa Rosada

[→ Ver Roadmap completo]  → /roadmap
```

---

## 11. Wireframe — Evidencia y método (P08)

URL: `#evidencia`

> **Nota v0.1:** Esta página fue expandida significativamente. Las 6 secciones originales fueron reemplazadas por 8 secciones. El contenido de notebooks (§3) y datasets (§4) se renderiza desde módulos de datos en `app.js` (`EVIDENCIA_NOTEBOOKS`, `EVIDENCIA_PERON_NOTEBOOKS`, `EVIDENCIA_DATASETS`), no desde texto estático del copy deck.

### Estructura de la página

```
[Título: Evidencia y método]
[Sección 11.1] §1 — Qué cuenta como evidencia limpia
[Sección 11.2] §2 — Metodología: pipeline de procesamiento
[Sección 11.3] §3 — Notebooks
[Sección 11.4] §4 — Datasets
[Sección 11.5] §5 — Figuras
[Sección 11.6] §6 — Qué no se comparte todavía
[Sección 11.7] §7 — Reproducibilidad: lo que falta
[Sección 11.8] §8 — Sistema de badges
```

---

### Sección 11.1 — §1 Qué cuenta como evidencia limpia

| Copy | Copy deck §8 — "Limpio no significa perfecto. Significa controlado." |
| Componente | Grilla de tres columnas `.ev-tier-grid` |

Tres columnas (desktop); una columna (mobile):
- **Columna 1 (borde verde):** Corpus HCDN — 51 documentos limpios, 10 actores democráticos, calibración NB05
- **Columna 2 (borde azul):** Perón alt-source — pipeline metodológicamente distinta, 2 documentos limpios (1946, 1954), instrumento diferente, sin bridge note
- **Columna 3 (borde rojo):** Material excluido — Perón 1973 (PERON_SRC_015/BLQ-02c), outputs pre-calibración (NB01–NB04), corpus piloto fragmentado, síntesis canónica en inglés

---

### Sección 11.2 — §2 Metodología: pipeline de procesamiento

| Componente | `.ev-pipeline` — lista ordenada de pasos numerados NB01–NB10 |
| Destacados | Pasos canónicos NB05, NB08, NB10 marcados con clase `.ev-ps-key` |

Pasos de la pipeline HCDN (NB01–NB10) en orden. Los tres pasos clave resaltados visualmente:
- **NB05** — calibración proposicional (TM×1.00 / TCM×0.50 / AGN×0.00)
- **NB08** — perfiles democráticos consolidados
- **NB10** — síntesis interpretiva (fuente canónica de los perfiles de actor públicos)

---

### Sección 11.3 — §3 Notebooks

| Componente | `<table class="ev-table">` con grupos de filas |
| Datos | Arrays `EVIDENCIA_NOTEBOOKS` y `EVIDENCIA_PERON_NOTEBOOKS` de `app.js` |

Tabla con columnas: ID · Nombre · Propósito/Nota · Estado de compartición.

Dos grupos de filas separados por separador visual:
- **HCDN pipeline (NB01–NB10):** 10 filas
- **PERON_ALT_PIPELINE (PERON_NB01–NB03):** 3 filas

Cada fila tiene badge de estado de compartición:
- `ev-badge-ok` (verde): publicable ahora
- `ev-badge-warn` (ámbar): requiere limpieza
- `ev-badge-block` (rojo): solo interno

**Estado en v0.1:** ningún notebook es completamente `publicable`. NB05, NB08, NB10 y PERON_NB03 son `requiere limpieza`. Los demás son `solo interno`.

---

### Sección 11.4 — §4 Datasets

| Componente | `<table class="ev-table">` — tabla de datasets |
| Datos | Array `EVIDENCIA_DATASETS` de `app.js` |

Tabla con columnas: Nombre · Contenido · Linaje · Estado de compartición.

Datasets en v0.1:
- `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` — solo interno
- `NB10 — actor_avg matrix` — solo interno
- `NB10 — document table` — solo interno
- `NB10 — configuration map` — publicable (figuras promovidas disponibles)
- `JSON static data (web/data/*.json)` — publicable (publicado en este sitio)
- `Registro Perón + contraste de fase` — solo interno

---

### Sección 11.5 — §5 Figuras

| Componente | Bloque de texto + CTA a `#figuras` |

Principios de lectura (siempre visibles, no solo en hover):
1. Los ejes son scores proposicionales relativos dentro del corpus, no proporciones de textos.
2. Los porcentajes de configuración son del corpus HCDN 1983–2025 (51 documentos), no de todos los discursos presidenciales argentinos.
3. Perón no aparece en ninguna figura del corpus democrático.
4. Ninguna figura compara numéricamente a Perón con actores democráticos.
5. Figuras NB07 y NB08 son versiones anteriores al análisis NB10; incluidas por continuidad documental, no como versión final.

CTA: "Ver galería de figuras →" → `#figuras`

---

### Sección 11.6 — §6 Qué no se comparte todavía

| Componente | Bloque `.notice.notice-red` con lista numerada |

Lista de 8 ítems con razón de restricción para cada uno. Incluye: notebooks no limpiados, datasets primarios, scores calibrados como display primario, final_type, comparación numérica Perón–HCDN, evidencia cualitativa NB09, metadatos corregidos pendientes de validación, corpus Perón pre-calibración.

---

### Sección 11.7 — §7 Reproducibilidad: lo que falta

| Componente | `.ev-repro-list` con ítems `.ev-repro-item` |

Lista de 5 pasos hacia reproducibilidad completa:
1. Limpiar y publicar notebooks (NB05, NB08, NB10)
2. Publicar dataset NB10 con diccionario de datos
3. Documentar scripts de procesamiento (OCR, segmentación)
4. Re-run completo de pipeline v1 tras corrección de metadatos
5. Bridge note formal PERON_ALT_PIPELINE ↔ HCDN

CTA: "Ver roadmap completo →" → `#roadmap`

---

### Sección 11.8 — §8 Sistema de badges

| Componente | Leyenda del sistema de badges — instancia de C09 |
| Datos | `caveat_badges.json` |

Leyenda completa de los badges con badge_id, label, severity y meaning. Renderizada desde datos JSON. Incluye enlace a `#whitepaper` para metodología detallada.

---

## 12. Wireframe — Roadmap (P09)

URL: `/roadmap`

### Estructura de la página

```
[Título: Roadmap hacia el mapa v1]
[Sección 12.1] Estado v0.1
[Sección 12.2] Siete condiciones para el mapa v1
[Sección 12.3] Contenido bloqueado visible
[Sección 12.4] Acciones activas
```

---

### Sección 12.1 — Estado v0.1

| Copy | Copy deck §10 — "Dónde estamos" |
| Componente | Bloque de texto simple |

Cuerpo del copy deck §10.1 completo (dos párrafos: qué cubre el v0.1, qué no).

---

### Sección 12.2 — Siete condiciones para el mapa v1

| Componente | C11 (V1 roadmap tracker) — todos los 7 ítems |
| Datos | Vista `roadmap_view` — los 7 `RoadmapItem` |
| Copy | Copy deck §10 — "Siete condiciones para el mapa completo" |

**Display de cada ítem:**
- `roadmap_id` (P1–P7) + `title` + `status` (PENDIENTE / BLOQUEADO)
- `description` expandible
- `depends_on` mostrado como "Requiere: P{n}" para los ítems con dependencias
- `unlocks` mostrado como "Desbloquea: P{n}"

Los ítems P2, P3, P4, P7 muestran badge `BLOQUEADO` (dependen de precondiciones no satisfechas). Los ítems P1, P5, P6 muestran badge vacío ("pendiente").

---

### Sección 12.3 — Contenido bloqueado visible

Lista de contenido bloqueado con enlace a la condición que lo desbloquearía:

```
Perón 1973 — bloqueado (P1) · ver /peron
Comparación numérica Perón–HCDN — bloqueado (P4) · ver /peron
Perfil Milei confirmado — pendiente (P5) · ver /actores/milei
Mapa orbital v1 — bloqueado (P7) · requiere P1–P6
```

---

### Sección 12.4 — Acciones activas

| Copy | Copy deck §10 — "La acción de mayor impacto" |

Cuerpo del copy deck §10 final: P1 como acción de mayor impacto encadenado, con las tres fuentes prioritarias.

---

## 12b. Wireframe — Whitepaper (P10) ← v0.1 addition

URL: `#whitepaper`

### Estructura de la página

```
[Encabezado: título + badge PROVISIONAL + abstract]
[Tabla de contenidos — 12 secciones]
[Cuerpo del artículo — secciones 1–12]
```

---

### Encabezado del artículo

```
┌─────────────────────────────────────────────────────────────────┐
│  WHITEPAPER · v0.1 · EN DESARROLLO                              │
│  badge[PROVISIONAL]  badge[HCDN_ONLY]                           │
│  ────────────────────────────────────────────────────────────── │
│  El problema de los tres cuerpos argentinos:                         │
│  una lectura orbital del presidencialismo argentino             │
│                                                                  │
│  Abstract (texto completo — ver WHITEPAPER_CONTENT_PLAN §2)     │
└─────────────────────────────────────────────────────────────────┘
```

---

### Tabla de contenidos

```
1.  Introducción: los límites de la metáfora del péndulo
2.  Los tres cuerpos como vectores político-históricos
3.  Corpus y método
4.  Corpus democrático 1983–2025
5.  Hallazgo empírico principal: paternalismo + tecnocracia como configuración modal
6.  Trayectorias de actor, no tipos de actor
7.  Perón 1946–1954 como contrapunto cualitativo separado
8.  Milei y tecnocracia + mesianismo
9.  Menem y la brecha entre discurso y estabilización gubernamental
10. Alfonsín y la inestabilidad de la transición
11. Limitaciones y caveats
12. Roadmap hacia v1
```

Cada ítem es un link de ancla (`#wp-sec-N`). Secciones `en_desarrollo` marcadas con `[en desarrollo]`.

---

### Cuerpo del artículo

Cada sección como bloque `<article>` con:
- `<h3>` numerado + título
- Texto del argumento (o placeholder `[en desarrollo]`)
- Badge `PROVISIONAL` si contiene afirmaciones empíricas provisionales
- Referencia a fuente canónica: `fuente: BRIEF §N` / `fuente: MEMO §N`

**Sección especial — Perón (§7):**
Incluye aviso de separación estructural idéntico al de P07. No incluye comparaciones numéricas Perón–HCDN. La subsección de 1973 se renderiza como bloque bloqueado.

**Sección especial — Limitaciones (§11):**
Lista completa de restricciones del análisis. No colapsable. Siempre visible.

---

### Componente(s)
- C13 (Whitepaper article layout) — sección §15b del VISUAL_COMPONENT_SPEC

### Copy
- Copy deck §11

---

## 12c. Wireframe — Figuras (P11) ← v0.1 addition

URL: `#figuras` — **ruta secundaria/profunda**

> **Nota de navegación (v0.1 actualización):** `#figuras` no está en la barra de navegación principal. Es una ruta profunda accesible vía:
> - CTA "Ver galería de figuras →" en Evidencia §5
> - Figuras 1–3 embebidas como `<img>` en `#whitepaper`; placeholder cards para figuras 4–6 con texto explicativo
> - Cualquier enlace directo a `#figuras` (la ruta está preservada en el router)
> No eliminar la ruta del router; solo no incluirla en el nav principal.

### Estructura de la página

```
[Encabezado: título + badge PROVISIONAL + caveat de galería]
[Categoría 1: Corpus democrático]
  [figura_card × N]
[Categoría 2: Perfiles de actor]
  [figura_card × N]
[Categoría 3: Configuraciones]
  [figura_card × N]
[Categoría 4: Transiciones]
  [figura_card × N]
[Categoría 5: Perón]
  [figura_card BLOQUEADA (sin figuras promovidas disponibles)]
[Categoría 6: Roadmap / caveats]
  [figura_card PENDIENTE]
```

---

### Figura card — estado promoted

```
┌──────────────────────────────────┐
│  [imagen PNG — max-width: 100%]  │
│  badge[PROVISIONAL]              │
│  Título de la figura             │
│  Fuente: NB10                    │
│  ─────────────────────────────── │
│  Caption: [texto descriptivo]    │
│  [▶ Caveat metodológico]         │
└──────────────────────────────────┘
```

El caveat metodológico es un acordeón expandible. No hover-only.

---

### Figura card — estado blocked

```
┌──────────────────────────────────┐
│  [placeholder — símbolo ⊘]       │
│  badge[BLOQUEADO]                │
│  Título de la figura             │
│  ─────────────────────────────── │
│  Razón del bloqueo (visible)     │
│  → Ver #roadmap                  │
└──────────────────────────────────┘
```

---

### Figuras disponibles (v0.1)

9 figuras en `empirical/corpus_presidencial_hcdn/figures_promoted/`:

| figure_id | Título | Notebook | Categoría |
|-----------|--------|----------|-----------|
| NB10_config_dist | Distribución de configuraciones | NB10 | Configuraciones |
| NB10_actor_interp_map | Mapa interpretativo de actores | NB10 | Perfiles de actor |
| NB10_transition_counts | Conteos de transición | NB10 | Transiciones |
| NB08_config_timeline | Línea de tiempo de configuraciones | NB08 | Transiciones |
| NB08_dem_actor_vector_map | Mapa vectorial de actores (democráticos) | NB08 | Perfiles de actor |
| NB08_dem_config_counts | Conteos de configuraciones | NB08 | Configuraciones |
| NB07_actor_heatmap | Heatmap actor dominante/secundario | NB07 | Perfiles de actor |
| NB07_actor_vector_map | Mapa vectorial de actores | NB07 | Perfiles de actor |
| NB07_attractor_counts | Conteos de fuerza atractora | NB07 | Corpus democrático |

---

### Componente(s)
- C14 (Figures gallery) — sección §15c del VISUAL_COMPONENT_SPEC

### Copy
- Copy deck §12

---

## 13. Estados de componentes estáticos

Para cada componente del sitio, los estados que el prototipo estático debe implementar:

---

**C01 Hero thesis block**
- Estado por defecto: headline + subtitular + párrafo + dos CTAs
- Estado mobile: igual con CTAs apilados verticalmente

---

**C02 Three-body vector cards**
- Estado por defecto (colapsado): nombre + definición corta + señal
- Estado expandido: todos los subcampos del vector
- Estado mobile: tarjetas apiladas, expansión por tap

---

**C03 Orbital map preview**
- Estado por defecto: diagrama conceptual (placeholder) + tabla de distribución + banner de versión v0.1
- Estado caveat: el banner de versión siempre presente — nunca oculto
- Estado mobile: diagrama como 3 etiquetas textuales + tabla en lista apilada

---

**C04 Democratic actor map**
- Estado por defecto: grilla de 10 tarjetas con badges visibles
- Estado con chips de filtro: chips presentes pero no funcionales en v0.1; nota "Filtros en versión interactiva"
- Estado tarjeta TIER_3: icono ⚠️ + badge PROVISIONAL + badge específico (LOW_N o METADATA_CORREGIDA) visibles sin expansión
- Estado mobile: lista apilada de 10 tarjetas; badges siempre visibles

---

**C05 Configuration family cards**
- Estado por defecto (colapsado): nombre de configuración + porcentaje + 1 oración
- Estado expandido: descripción completa + actores + interpretación + caveats
- Estado low-n: badge LOW_N visible en tarjetas de tec+mes (Milei n=2) y pat+mes (Rodríguez Saá n=1)
- Estado mobile: tarjetas apiladas; las dos primeras (pat+tec 49%, tec+pat 37%) visibles sin scroll

---

**C06 Actor profile card**
- Estado provisional estándar: badge PROVISIONAL visible en encabezado + caveat obligatorio al pie
- Estado corrected-provisional (Macri, AlbertoF): badge METADATA_CORREGIDA visible + nota explícita
- Estado low-n (Milei, Rodríguez Saá): badge LOW_N visible + "n=X — tipo no confirmado" en encabezado
- Estado high-caution (AlbertoF, Rodríguez Saá): badge de HIGH CAUTION en nivel de cautela
- Estado mobile: campos primarios visibles; campos secundarios en accordion expandible

---

**C07 Actor timeline**
- Estado por defecto: lista cronológica de documentos con año, configuración, attractor, flags
- Estado con documento low-weight: marcador "(low-weight)" junto al año; nota al pie del componente
- Estado con documento indeterminate: marcador "(indeterminate attractor)" junto al año
- Estado con gap: punto vacío "[año] · no disponible en corpus v0.1"
- Estado mobile: lista vertical; tap en documento expande sus datos

---

**C08 Evidence drawer**
- Estado cerrado: botón "Ver extractos de evidencia +" en la ficha de actor
- Estado abierto: acordeón expandible con extractos cualitativos por vector; aviso metodológico fijo al pie
- Estado Perón (si aplica): separador de pipeline alternativa; badge NO_COMPARABLE_NUMERICAMENTE antes de cualquier texto con datos numéricos
- Estado mobile: overlay de pantalla completa al tap en el botón

---

**C09 Caveat badge system**
- Estado por defecto: badge visible en todas las instancias que lo requieren, sin hover
- Estado mobile: badge completo visible (sin tooltip ni hover necesario)
- Estado blocking (BLOQUEADO, NO_COMPARABLE_NUMERICAMENTE, SOURCE_FAILURE): `required_microcopy` expandible por tap/clic, no oculto por defecto
- Regla: ningún badge tiene información solo accesible por hover

---

**C10 Perón separated lane**
- Estado con tres cards: 1946 (expandible) + 1954 (expandible) + 1973 (bloqueado)
- Estado card bloqueada: badge BLOQUEADO + FALLA_DE_FUENTE + texto de razón + enlace a Roadmap
- Estado divisor: separador metodológico con texto completo siempre visible antes del primer card
- Estado mobile: tres cards apiladas; separador visible antes del primero

---

**C11 V1 roadmap tracker**
- Estado por defecto: 7 ítems con status PENDIENTE o BLOQUEADO; P1 destacado como mayor impacto
- Estado ítem bloqueado: badge BLOQUEADO + "Requiere: P{n}" visible sin expansión
- Estado cadena de dependencias: P2→P3→P4 encadenados visualmente (flecha o línea jerárquica)
- Estado mobile: lista vertical con íconos de status; accordion para descriptions

---

**C12 Videojuego page** ← implementado en v0.1 (`#videojuego` · `renderVideojuego()`)
- Estado por defecto: header con logo (con fallback onerror si `logo.png` no existe) + caveat de estado; idea central en texto; grid 2×2 de cuatro mecánicas (vectores como fuerzas, configuraciones como atractores, crisis como redistribución de masas, actores como trayectorias); principios de diseño; nota sobre Perón como caso meta-orbital; tracker de estado (v0.8 done / v0.9 in-progress / v1.0 pending); caveats de no-simulador; CTAs a mapa orbital, whitepaper, roadmap
- Estado logo: `<img src="../../logo.png">` con `onerror` que oculta img y muestra tarjeta placeholder "Logo pendiente de integración"
- Estado mobile: header apilado; grid de mecánicas en columna única; status list vertical
- Prototipo de juego v0.8: `videogame/tres_cuerpos_v8/`. v0.9 en desarrollo. v1.0 requiere `MAPA_ORBITAL_ARGENTINO_v1.md`.

---

## 14. Mapeo de contenido a páginas

| Página | Sección | Copy | Datos empíricos | Componente | Caveat obligatorio |
|--------|---------|------|----------------|-----------|-------------------|
| Inicio | Hero | Copy deck §2 hero | Ninguno | C01 | Banner global |
| Inicio | Tres cuerpos cards | Copy deck §2 tarjetas | Vector (E02) | C02 colapsado | Enlace a método en cada card |
| Inicio | Mapa preview | Copy deck §2 mapa | Configuration distribución (MAPA §3.2) | C03 | Banner v0.1; badge HCDN_ONLY |
| Inicio | Configs destacadas | Copy deck §2 destacados | CaseUnit Menem, Milei, RSá | C05 compacto | Milei n=2 visible; RSá n=1 visible |
| Inicio | Aviso Perón | Derivado copy deck §7 | PeronPhaseCard | Bloque texto | Badge PERON_ALT_SOURCE |
| Inicio | CTA Roadmap | Copy deck §10 condensado | RoadmapItem.P1 status | Bloque texto | — |
| La tesis | §3.1 Péndulo | Copy deck §3.1 | Ninguno | Bloque texto | — |
| La tesis | §3.2 Tres cuerpos | Copy deck §3.2 | Vector (E02) | Bloque texto + C02 minimalista | — |
| La tesis | §3.3 Orbital | Copy deck §3.3 | Ninguno | Bloque texto + C03 simplificado | "representación conceptual" |
| La tesis | §3.4 No afirma | Copy deck §3.4 | Ninguno | Lista de 5 proposiciones | La lista es el caveat |
| Los tres cuerpos | Cards expandidas | Copy deck §4 | Vector (E02) | C02 expandido | Nota de sobredetección por vector |
| Los tres cuerpos | Familias config. | Copy deck §5 familias | Configuration (E03) | C05 compacto | Caveats de baja frecuencia |
| Mapa orbital | Banner v0.1 | Derivado IA §6 | — | Bloque aviso | Es el caveat principal de la página |
| Mapa orbital | Distribución | Copy deck §5 | Configuration (E03) MAPA §3.2 | C03 completo | Badge HCDN_ONLY |
| Mapa orbital | Familias | Copy deck §5 | Configuration (E03) MAPA §4 | C05 todas | Caveats por familia |
| Mapa orbital | Grilla HCDN | Copy deck §6 templates | ActorProfile (E05) 10 actores | C04 | PROVISIONAL en cada card |
| Mapa orbital | Transiciones | MAPA §3.4 | ActorProfile.transition_count | Tabla texto | "propiedad del corpus, no del gobierno" |
| Mapa orbital | Carril Perón | Copy deck §7 | PeronPhaseCard (E10) 3 cards | C10 | Divisor metodológico; NO_COMPARABLE_NUMERICAMENTE |
| Mapa orbital | Bloqueos | Copy deck §10 + MAPA §8 | CaseUnit bloqueados; RoadmapItem | Lista texto | — |
| Actores | Grilla | Copy deck §6 templates | ActorProfile (E05) 10 actores | C04 | PROVISIONAL en cada card |
| Actores | Enlace Perón | Copy deck §7 condensado | — | Bloque texto | Badge PERON_ALT_SOURCE |
| Actores/milei | Encabezado | Copy deck §6 Milei | ActorProfile.milei (NB10) | C06 | PROVISIONAL + LOW_N |
| Actores/milei | Timeline | — | DocumentRecord (2 docs + gap 2023) | C07 lista estática | Gap visible; ambiguity flag visible |
| Actores/menem | Encabezado | Copy deck §6 Menem | ActorProfile.menem (NB10) | C06 | PROVISIONAL |
| Actores/cfk | Encabezado | Copy deck §6 CFK | ActorProfile.cfk (NB10) | C06 | PROVISIONAL; gap 2009 |
| Actores/alfonsin | Encabezado | Copy deck §6 Alfonsín | ActorProfile.alfonsin (NB10) | C06 | PROVISIONAL; inestabilidad como hallazgo |
| Actores/macri | Encabezado | Copy deck §6 Macri | ActorProfile.macri (NB10) | C06 | PROVISIONAL + METADATA_CORREGIDA |
| Perón | Separación | Copy deck §7.1 | — | Bloque texto | — |
| Perón | Card 1946 | Copy deck §7.2 | PeronPhaseCard.peron_1946 | C10 card | PERON_ALT_SOURCE + NO_COMPARABLE_NUMERICAMENTE |
| Perón | Card 1954 | Copy deck §7.3 | PeronPhaseCard.peron_1954 | C10 card | PERON_ALT_SOURCE + NO_COMPARABLE_NUMERICAMENTE |
| Perón | Card 1973 | Copy deck §7.4 | PeronPhaseCard.peron_1973_blocked | C10 card bloqueada | BLOQUEADO + SOURCE_FAILURE |
| Perón | CTA fuente | Copy deck §10 condensado | RoadmapItem.P1 | CTA | — |
| Evidencia | §1 Qué cuenta como limpia | Copy deck §8.1 | — | `.ev-tier-grid` (3 col) | — |
| Evidencia | §2 Pipeline NB01–NB10 | Inline `app.js` | — | `.ev-pipeline` pasos | NB05/NB08/NB10 marcados |
| Evidencia | §3 Notebooks | Inline `app.js` (EVIDENCIA_NOTEBOOKS) | Arrays `EVIDENCIA_*_NOTEBOOKS` | `<table class="ev-table">` | Badges ok/warn/block |
| Evidencia | §4 Datasets | Inline `app.js` (EVIDENCIA_DATASETS) | Array `EVIDENCIA_DATASETS` | `<table class="ev-table">` | Badge publicable/interno |
| Evidencia | §5 Figuras CTA | Inline `app.js` | — | Texto + CTA a `#figuras` | Principios de lectura visibles |
| Evidencia | §6 No se comparte | Inline `app.js` | — | `.notice.notice-red` lista | — |
| Evidencia | §7 Reproducibilidad | Inline `app.js` | — | `.ev-repro-list` | CTA a `#roadmap` |
| Evidencia | §8 Badges | Copy deck §8.4 | `caveat_badges.json` | Leyenda C09 | — |
| Roadmap | Estado v0.1 | Copy deck §10.1 | — | Bloque texto | — |
| Roadmap | Siete condiciones | Copy deck §10 lista | RoadmapItem (E09) 7 ítems | C11 | BLOQUEADO en P2–P4, P7 |
| Roadmap | Bloqueados | Derivado MAPA §8 | CaseUnit.blocked + RoadmapItem | Lista con enlaces | — |
| Roadmap | Acciones activas | Copy deck §10 cierre | RoadmapItem.P1 | Bloque texto + fuentes prioritarias | — |

---

## 15. Restricciones de implementación para código futuro

Estas restricciones derivan del contrato de datos (§16) y del visual spec (§2). Son invariantes que cualquier implementación debe respetar, no sugerencias de diseño.

**Restricción R01 — Sin scores brutos en display público por defecto.**
Los campos `total_score`, `gap`, `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo` del `ActorProfile` y `DocumentRecord` no se renderizan en ninguna página pública. Están disponibles en los datos para uso interno. Si en el futuro se decide mostrarlos (ej. para audiencia académica), deben ir acompañados de una explicación metodológica completa y un badge `HCDN_ONLY`.

**Restricción R02 — Badges visibles sin hover.**
Ningún badge del sistema C09 está implementado únicamente como tooltip. En mobile no existe hover. Un badge que requiere hover no cumple con el principio "caveats visibles por defecto". Todos los badges tienen texto visible en el DOM por defecto.

**Restricción R03 — Perón separado estructuralmente en el DOM.**
El componente C10 (Perón separated lane) y el componente C04 (Democratic actor map) son elementos HTML independientes, nunca anidados. No pueden compartir un contenedor que tenga una escala visual numérica común. El divisor metodológico es un elemento obligatorio en el marcado, no un elemento decorativo que pueda omitirse.

**Restricción R04 — Contenido bloqueado renderizado como cards bloqueadas.**
Un `PeronPhaseCard` con `blocked: true` se renderiza como un card con estado bloqueado visible: badge BLOQUEADO, texto de razón del bloqueo, enlace al Roadmap. Nunca se omite del DOM. Nunca se reemplaza por un espacio en blanco.

**Restricción R05 — Sin semántica exclusivamente por color.**
Ningún badge, estado de roadmap, o indicador de caution_level usa solo el color para comunicar su significado. Cada indicador lleva texto o ícono además del color. Esta restricción aplica al CSS y a cualquier library de charting/visualización utilizada.

**Restricción R06 — Text-first fallback.**
Cada componente visual que muestra datos (C03, C04, C05, C07, C10, C11) tiene un fallback de texto estructurado que es completamente informativo si la representación visual no carga o no está disponible. Las tablas son el fallback estándar. El fallback no es una versión de menor fidelidad: es una representación equivalente en texto.

---

## 16. Próximo paso después de este spec

Los siguientes cuatro pasos deben completarse en orden. No anticipar el paso siguiente sin completar el anterior.

**Paso 1 — `web/JSON_EXPORT_PLAN_v0_1.md`**
Especificar la transformación de los CSV canónicos (`UNIFIED_CLEAN_CASE_MATRIX`, `NB10_democratic_actor_interpretive_matrix`, `NB10_democratic_document_interpretive_table`) a archivos de datos estructurados (JSON, YAML, o Markdown estructurado) que el prototipo estático puede consumir directamente. Definir la derivación de cada campo calculado del contrato de datos (`include_in_actor_map`, `blocked`, `has_nb05_ambiguity_flag`, etc.). Sin este paso, el prototipo tendría que hacer los cálculos en tiempo de render, lo que complica la implementación.

**Paso 2 — Implementar el prototipo estático**
Con el copy deck, el visual spec, el contrato de datos, este spec de prototipo, y los archivos JSON exportados: construir las páginas P01–P09 como HTML/CSS estático (o el framework estático que se elija). No conectar a base de datos. No implementar filtros. Las 5 fichas de actor de §9 son las instancias mínimas. El timeline es una lista; el evidence drawer es un accordion.

**Paso 3 — Validar contra el DATA_CONTRACT**
Una vez implementado el prototipo, verificar las 10 reglas de validación del contrato (R01–R10). En particular: (a) Perón nunca aparece en el mapa democrático; (b) Perón 1973 aparece como bloqueado; (c) ningún objeto combina scores HCDN y Perón; (d) no existe campo final_type; (e) todos los badges están presentes donde corresponde.

**Paso 4 — Añadir interactividad progresiva**
Solo después de validar el prototipo estático: conectar los componentes interactivos a los datos exportados. Orden sugerido: (a) filtros del mapa de actores; (b) timeline visual (de lista a representación gráfica); (c) evidence drawer conectado a NB09; (d) animaciones ligeras de transición. Los componentes bloqueados permanecen como cards bloqueadas visibles — no se ocultan.

---

## 12d. Wireframe — Licencia (P12) ← v0.1 — POLÍTICA DEFINIDA

URL: `#licencia`

### Estructura de la página

```
[Título: Licencia]
[Notice: PROTOTIPO · badge + aclaración datos vs. licencia]
[Sección 1] Contenido público — CC BY-NC 4.0
[Sección 2] Atribución requerida + cita sugerida (.lic-quote)
[Sección 3] Uso comercial — licencia escrita separada requerida
[Sección 4] Tipos de contenido y estado de licencia — tabla de 5 filas
[Sección 5] Publicación en GitHub — condiciones (videojuego v0.9 + estructura)
[Sección 6] Uso provisional del sitio
[Notice: Contacto — LinkedIn / GitHub / Threads / Substack / ResearchGate]
```

| Campo | Especificación |
|-------|---------------|
| Copy | Copy deck §14 |
| Componente | `.lic-section` blocks + `.lic-table` con `.lic-row` (2-col grid: tipo / estado) + `.lic-quote` para atribución y cita |
| Badge | `PROTOTIPO` en notice de estado — distingue datos provisionales de política de licencia vigente |
| Social links contacto | Los 5 links: LinkedIn / GitHub / Threads / Substack / ResearchGate (todos `target="_blank" rel="noopener noreferrer"`) |
| Mobile | `.lic-row` colapsa a 1 columna |

**Política vigente (definida desde v0.1):**
- Contenido público: CC BY-NC 4.0 con atribución obligatoria.
- Uso comercial: prohibido salvo licencia escrita separada (Alexandra Bustos Frati, PhD).
- Código: todos los derechos reservados / no licenciado para reutilización.
- Logo/marca: todos los derechos reservados.
- Datasets/notebooks/corpus: no cubiertos automáticamente / pendiente de revisión separada.
- GitHub: diferido hasta revisión de videojuego v0.9 + finalización de estructura de repo público.

---

## 12e. Autoría y social links — especificación de componentes

### Homepage hero — authorship line
- Elemento: `.inicio-hero-author` — renderizado en `renderInicio()` después del bloque de CTAs
- Texto: "Por Alexandra Bustos Frati, PhD"
- Estilo: serif, itálica, `var(--text-2)`

### Footer
- `.footer-author`: "Proyecto desarrollado por Alexandra Bustos Frati, PhD."
- `.footer-social`: 5 enlaces con separadores `·`
- `.footer-meta`: versión, caveats, links a Evidencia y Licencia

**Links sociales (todos con `target="_blank" rel="noopener noreferrer"`):**

| Plataforma | URL |
|-----------|-----|
| LinkedIn | https://www.linkedin.com/in/lexbustosfrati/ |
| GitHub | https://github.com/metternietzsche |
| Threads | https://www.threads.net/@lexy.futura |
| Substack | https://alexandrabustosfrati.substack.com |
| ResearchGate | https://www.researchgate.net/profile/Alexandra-Bustos-Frati |

---

*Producido en el marco del proyecto El problema de los tres cuerpos argentinos. Este spec deriva de evidencia provisional. El prototipo que implemente estas especificaciones debe preservar todos los caveats documentados en `MAPA_ORBITAL_ARGENTINO_v0_1.md §8`, `VISUAL_COMPONENT_SPEC_v0_1.md §2`, y `DATA_CONTRACT_v0_1.md §2 y §16`. La separación estructural entre la PERON_ALT_PIPELINE y el HCDN_PROMOTED_LAYER es un invariante del prototipo — no una convención opcional.*
