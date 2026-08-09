# WEBSITE INFORMATION ARCHITECTURE v0.1

> **Arquitectura histórica v0.1.** El sitio v0.2 supersede el estado editorial
> del videojuego y la publicación. Ver `../videojuego.md` y
> `../../PUBLICATION_NOTES.md`; las referencias v0.8/v0.9 permanecen como
> registro del diseño original.

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** diseño de arquitectura — no código, no assets
**Fuentes:** `BRIEF_MAPA_ORBITAL_ARGENTINO_v0_1.md` · `MAPA_ORBITAL_ARGENTINO_v0_1.md` · `UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md` · `README_WORKSPACE_AUTHORITY.md`

---

## 1. Propósito del sitio

El sitio tiene cuatro funciones concretas:

1. **Introducir el marco de tres cuerpos** — explicar en términos accesibles por qué Argentina no es un péndulo y qué son los tres cuerpos (tecnocracia, mesianismo, paternalismo).
2. **Presentar el mapa orbital** — mostrar qué configuraciones discursivas aparecen en el corpus presidencial democrático 1983–2025 y qué actores las sostienen.
3. **Permitir la exploración por actor, configuración y evidencia** — fichas de actor con sus perfiles, trayectorias, cautelas y base empírica.
4. **Preservar los caveats metodológicos** — el sitio no aplana la incertidumbre. Cada perfil provisional está marcado como tal. La separación entre Perón y el corpus HCDN está visible en la navegación y en el contenido.

El sitio no es un artículo académico ni una campaña de comunicación política. Es una interfaz para que distintos públicos puedan encontrar el nivel de profundidad que les corresponde, sin que la superficie engañe sobre lo que hay debajo.

---

## 2. Audiencias objetivo

| Audiencia | Lo que busca | Entrada principal |
|-----------|-------------|-------------------|
| Público general educado | Entender la tesis central en términos accesibles | Inicio · La tesis |
| Periodistas y analistas | Referencia rápida sobre configuraciones de actores específicos | Actores · Mapa orbital |
| Académicos e investigadores | Base empírica, método, nivel de evidencia, acceso a caveats completos | Evidencia · Método · Roadmap |
| Estudiantes | Marco conceptual y casos concretos | Los tres cuerpos · Actores |
| Usuarios del juego o simulador | Cómo se traducen los vectores a mecánicas | Videojuego (#videojuego) |
| Colaboradores del proyecto | Estado del corpus, precondiciones para v1, decisiones de gobernanza | Roadmap · Método |

---

## 3. Navegación principal

```
Inicio
├── La tesis
├── Los tres cuerpos
├── Mapa orbital
│   ├── Corpus democrático HCDN
│   └── Perón — contrapunto separado
├── Actores
│   ├── [ficha por actor × 10]
│   └── Perón — pipeline separada
├── Evidencia
├── Método
├── Whitepaper        ← v0.1 addition
├── Mapa orbital
├── Actores
│   ├── [ficha por actor × 10]
│   └── Perón — pipeline separada
├── Evidencia         ← expandida: metodología, notebooks, datasets, figuras (§1–§8)
├── Videojuego        ← v0.1 addition (route: #videojuego)
├── Roadmap
├── Perón — contrapunto separado
└── Licencia          ← v0.1 addition (route: #licencia)
```

**Nota v0.1:** Figuras ya no es un item de navegación de primer nivel. Accesible mediante ruta `#figuras` y enlazada desde §5 de Evidencia.

**Orden de navegación implementado (10 ítems):** Inicio → La tesis → Whitepaper → Mapa orbital → Actores → Evidencia → Videojuego → Roadmap → Perón → Licencia

```
```

La separación de Perón en la navegación es deliberada: aparece como subnodo tanto en "Mapa orbital" como en "Actores", siempre con indicación de que pertenece a una pipeline metodológicamente distinta.

---

## 4. Arquitectura página a página

### 4.1 Inicio

| Campo | Detalle |
|-------|---------|
| Propósito | Captura la tesis central e invita a explorar |
| Fuente de contenido | `BRIEF_MAPA_ORBITAL_ARGENTINO_v0_1.md §1` |
| Caveats a preservar | El mapa es preliminar; no hay clasificaciones definitivas |
| Ver §5 para estructura detallada | — |

---

### 4.2 La tesis

| Campo | Detalle |
|-------|---------|
| Propósito | Explica en profundidad por qué el péndulo es insuficiente y qué propone el modelo de tres cuerpos |
| Secciones | (1) El péndulo como superficie; (2) Los tres vectores y por qué interaccionan; (3) Qué mide el proyecto y qué no |
| Fuente de contenido | `BRIEF §1` · `UNIFIED_SYNTHESIS §1` |
| Caveats | El marco es una herramienta analítica; no predice política ni clasifica corrientes |
| Interactivo posible | Diagrama estático de tres fuerzas en tensión |

---

### 4.3 Los tres cuerpos

| Campo | Detalle |
|-------|---------|
| Propósito | Definir cada vector —tecnocracia, paternalismo, mesianismo— con ejemplos de proposiciones y cómo se detectan |
| Secciones | Una sección por vector: definición, ejemplos proposicionales, cómo aparece en el corpus, qué no es |
| Fuente de contenido | `UNIFIED_SYNTHESIS §4–§6` · `BRIEF §3` |
| Caveats | Los vectores describen el registro retórico, no la orientación política del gobierno |
| Interactivo posible | Tarjetas de patrón proposicional con ejemplos de texto real del corpus |

---

### 4.4 Mapa orbital

| Campo | Detalle |
|-------|---------|
| Propósito | Mostrar las familias de configuración del corpus democrático y la posición cualitativa separada de Perón |
| Fuente de contenido | `MAPA §3–§4` · `BRIEF §3–§5` |
| Caveats | El mapa es v0.1, no el mapa integrado final; Perón aparece separado; actores TIER_3 marcados |
| Ver §6 para estructura detallada | — |

---

### 4.5 Actores

| Campo | Detalle |
|-------|---------|
| Propósito | Fichas individuales por actor del corpus HCDN + Perón en sección separada |
| Fuente de contenido | `MAPA §5` · `UNIFIED_SYNTHESIS §4–§12` · `BRIEF §4–§5` |
| Caveats | Cada ficha incluye tier, nivel de cautela, y aviso de clasificación provisional |
| Ver §7 para template de ficha | — |

---

### 4.6 Evidencia

| Campo | Detalle |
|-------|---------|
| Propósito | Explicar qué cuenta como evidencia limpia, cómo se construyó el corpus, qué está excluido y por qué |
| Secciones | (1) Corpus HCDN — qué es, cómo se procesó; (2) PERON_ALT_PIPELINE — instrumento diferente; (3) Exclusiones y bloqueos; (4) Sistema de cautelas |
| Fuente de contenido | `UNIFIED_SYNTHESIS §2–§3` · `README_WORKSPACE_AUTHORITY §5` |
| Caveats | Perón 1973 excluido; corpus HCDN tiene gaps documentados; no hay puente numérico entre pipelines |
| Interactivo posible | Tabla de documentos con status de calidad OCR y flag de cautela por actor |

---

### 4.7 Método

| Campo | Detalle |
|-------|---------|
| Propósito | Explicar la metodología proposicional, la calibración, y el gobierno de linajes |
| Secciones | (1) Por qué detección proposicional y no lexical; (2) Calibración TM/TCM/AGN; (3) Lineages y autoridad; (4) Qué es limpio y qué no |
| Fuente de contenido | `README_WORKSPACE_AUTHORITY §2–§3` · log de pipeline HCDN |
| Caveats | El método es experimental; el corpus está cerrado pero el pipeline v1 está pendiente |
| Interactivo posible | Diagrama de flujo de pipeline (estático) |

---

### 4.8 Videojuego ← v0.1 addition (route: #videojuego)

| Campo | Detalle |
|-------|---------|
| Propósito | Explicar la traducción experimental del marco a mecánicas de juego de estrategia; puente entre el sitio analítico y el prototipo lúdico |
| Audiencia | Usuarios del juego, público interesado en la dimensión aplicada del marco |
| Secciones | (1) Logo/header con caveat de estado; (2) Idea central — vectores como fuerzas, configuraciones como atractores, crisis, actores como trayectorias; (3) Vista previa de mecánicas (grid de 4 tarjetas); (4) Principios de diseño; (5) Nota sobre Perón como caso meta-orbital; (6) Estado del prototipo (v0.8 / v0.9 / v1.0); (7) Caveats; (8) CTAs |
| Estado | v0.8 existe (gameplay pobre). v0.9 en desarrollo. v1.0 pendiente (requiere `MAPA_ORBITAL_ARGENTINO_v1.md`). |
| Fuente de contenido | `BRIEF §8` · `MAPA §7–§8` · §10 de este documento |
| Logo | Busca `logo.png` en raíz del repositorio (`../../logo.png` relativo al prototipo). Si no se encuentra, muestra tarjeta placeholder "Logo pendiente de integración". |
| Caveats obligatorios | No es un simulador. No es un motor de predicción. No produce tipologías. El marco es una heurística analítica, no una ley. |
| Route | `#videojuego` |
| Ver §10 para diseño de traducción | — |

---

### 4.9 Roadmap

| Campo | Detalle |
|-------|---------|
| Propósito | Comunicar transparentemente el estado actual del corpus y las condiciones para el mapa v1 |
| Secciones | (1) Qué está completo; (2) Qué está bloqueado y por qué; (3) Las siete precondiciones para el mapa v1; (4) Cómo contribuir |
| Fuente de contenido | `MAPA §9` · `README_WORKSPACE_AUTHORITY §6` |
| Caveats | El roadmap es una declaración honesta de límites, no una promesa de entrega |

---

### 4.10 Whitepaper ← v0.1 addition

| Campo | Detalle |
|-------|---------|
| Propósito | Presentar el argumento central en formato de artículo académico-divulgativo de largo aliento |
| Audiencia | Académicos, periodistas especializados, lectores con interés analítico sostenido |
| Secciones | Ver `WHITEPAPER_CONTENT_PLAN_v0_1.md` — 12 secciones desde introducción hasta roadmap |
| Estado | Versión en desarrollo (v0.1) — placeholder con estructura completa, texto in-progress |
| Fuente de contenido | `BRIEF_MAPA_ORBITAL_ARGENTINO_v0_1.md` · `MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1.md` · `PERON_INTERIM_MEMO_1946_1954_v0_1.md` · `UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md` |
| Caveats | El whitepaper es provisional. No introduce análisis nuevos. Solo afirmaciones ya respaldadas por las fuentes canónicas. Badge PROVISIONAL visible en todo momento. |
| Route | `#whitepaper` |

---

### 4.11 Figuras ← ruta secundaria (ya no es nav de primer nivel)

| Campo | Detalle |
|-------|---------|
| Propósito | Galería de figuras empíricas extraídas de los notebooks; acceso visual a la evidencia |
| Audiencia | Todos los públicos; entrada visual alternativa al texto |
| Secciones | (1) Corpus democrático; (2) Perfiles de actor; (3) Configuraciones; (4) Transiciones; (5) Perón; (6) Roadmap/caveats |
| Estado | 9 figuras promovidas disponibles en `empirical/corpus_presidencial_hcdn/figures_promoted/`. Sin figuras de Perón promovidas (bloqueadas). |
| Fuente de contenido | `figures_promoted/` — NB07, NB08, NB10 figures |
| Caveats | Cada figura lleva badge PROVISIONAL. Las figuras de NB07 son iteraciones anteriores — las de NB10 son las más recientes. Ninguna figura hace comparaciones directas Perón–HCDN. |
| Route | `#figuras` — ruta preservada; CTA desde §5 de Evidencia y desde Inicio (caveat strip). Ya no en nav principal. |

---

### 4.12 Evidencia (expandida en v0.1)

| Campo | Detalle |
|-------|---------|
| Propósito | Documentar exhaustivamente qué cuenta como evidencia limpia, el pipeline de análisis, notebooks, datasets, figuras y límites de compartibilidad |
| Audiencia | Investigadores, periodistas, colaboradores del proyecto, auditores metodológicos |
| Secciones | §1 Qué cuenta como evidencia limpia (HCDN, Perón alt-source, excluido); §2 Metodología: pipeline NB01–NB10; §3 Notebooks con estado de sharing; §4 Datasets; §5 Figuras (CTA a #figuras); §6 Qué no se comparte todavía; §7 Reproducibilidad; §8 Sistema de badges |
| Estado | v0.1 completo con datos en línea (notebooks y datasets como arrays inline en app.js) |
| Caveats | Todos los notebooks son internos en v0.1. Solo los JSON static data y NB10 configuration map son publicables actualmente. |
| Route | `#evidencia` |

---

### 4.13 Licencia ← v0.1 — POLÍTICA DEFINIDA

| Campo | Detalle |
|-------|---------|
| Propósito | Comunicar la política de licencia vigente del proyecto |
| Audiencia | Cualquier visitante que quiera reutilizar contenido, colaboradores, potenciales citadores |
| Secciones | (1) Contenido público — CC BY-NC 4.0; (2) Atribución requerida + cita sugerida; (3) Uso comercial — licencia escrita separada; (4) Tipos de contenido y estado de licencia (5 categorías); (5) Publicación en GitHub; (6) Uso provisional del sitio; (7) Contacto (5 links) |
| Estado | Política vigente desde v0.1. Los *datos* siguen siendo provisionales; la *licencia* está definida. |
| Caveats | CC BY-NC 4.0 para contenido público. Uso comercial prohibido sin licencia escrita. Código: todos los derechos reservados. Logo/marca: todos los derechos reservados. Datasets/corpus: no cubiertos automáticamente. GitHub diferido hasta v0.9. |
| Route | `#licencia` |

---

### 4.14 Autoría y enlaces sociales

| Campo | Detalle |
|-------|---------|
| Propósito | Hacer visible la autoría del proyecto y proveer canales de contacto y seguimiento |
| Dónde aparece | (1) Hero de Inicio: "Por Alexandra Bustos Frati, PhD"; (2) Footer: "Proyecto desarrollado por Alexandra Bustos Frati, PhD." + enlaces sociales |
| Autoría | Alexandra Bustos Frati, PhD |
| LinkedIn | https://www.linkedin.com/in/lexbustosfrati/ |
| GitHub | https://github.com/metternietzsche |
| Threads | https://www.threads.net/@lexy.futura |
| Substack | https://alexandrabustosfrati.substack.com |
| ResearchGate | https://www.researchgate.net/profile/Alexandra-Bustos-Frati |
| Reglas | Todos los enlaces externos: `target="_blank" rel="noopener noreferrer"`. Autoría no oculta solo en metadatos. |

---

## 5. Estructura de la página de inicio

**Hero**
```
Argentina no es un péndulo.
Es un problema de tres cuerpos.
```
Subtítulo de una oración: el péndulo describe la superficie; este proyecto mide la estructura profunda del discurso presidencial argentino.

**Tarjetas de entrada — los tres cuerpos**
Tres tarjetas horizontales, una por vector:
- Tecnocracia — modernización técnica, reforma del Estado, racionalización
- Paternalismo — tutela social, interpelación al pueblo como sujeto de derechos
- Mesianismo — ruptura histórica, redención, mandato trascendente

Cada tarjeta: nombre del vector, una oración de definición, y un ejemplo proposicional del corpus.

**Vista previa del mapa**
Una representación simplificada de la distribución de configuraciones del corpus democrático:
- 86% díada tec/pat
- Lista de las cuatro familias de configuración con conteo de documentos
- Advertencia visible: "Mapa preliminar v0.1 — no clasificación definitiva"

**Configuraciones destacadas**
Dos o tres configuraciones con caso asociado:
- `paternalismo+tecnocracia`: caso canónico Menem (discurso paternalista durante la mayor reforma de mercado de la democracia argentina)
- `tecnocracia+mesianismo`: caso analíticamente más distintivo Milei (hipótesis provisional, n=2)
- `paternalismo+mesianismo`: inauguraciones de crisis — Rodríguez Saá 2001, Duhalde 2002

**CTA principal**
→ Explorar el mapa orbital
→ Ver actores

---

## 6. Página del mapa orbital

**Sección 1 — El campo democrático HCDN 1983–2025**
- Tabla de distribución de configuraciones (6 configuraciones, documentos, actores, porcentaje)
- Presentación de las cuatro familias orbitales con descripción breve
- Aviso prominente: "Este mapa es preliminar. No es el mapa integrado final. Ver Roadmap para las condiciones del mapa v1."

**Sección 2 — Actores del corpus democrático**
- Grilla de tarjetas de actor: 10 actores, cada uno con nombre, período, configuración modal, nivel de cautela (LOW / MEDIUM / HIGH), y badge de tier (TIER_1 / TIER_3)
- Al hacer clic → ficha de actor individual (ver §7)
- Actores TIER_3 marcados con indicador visual distinto: ⚠️ perfil provisional

**Sección 3 — Perón: contrapunto cualitativo separado**
Sección visualmente demarcada con separador claro:
```
PERÓN 1946–1954 — Pipeline alternativa — No comparable numéricamente al corpus HCDN
```
- Los dos documentos limpios: 1946 (asunción) y 1954 (apertura)
- Jerarquía vectorial MES > PAT > TEC en ambos documentos
- Descripción cualitativa de cada fase
- Aviso explícito: sin escala orbital común con los actores democráticos
- Perón 1973: mención del bloqueo activo, sin contenido de evidencia

---

## 7. Template de ficha de actor

Cada ficha de actor del corpus HCDN sigue el mismo template.

**Encabezado**
```
[Nombre del actor]
[Período] · Corpus: N documentos · Cautela: LOW / MEDIUM / HIGH · Tier: TIER_1 / TIER_3
```

Badge de clasificación provisional, siempre visible:
```
Hipótesis provisional — no clasificación histórica definitiva
```

**Cuerpo de la ficha**

| Campo | Contenido |
|-------|-----------|
| Configuración modal | La configuración más frecuente en el corpus del actor |
| Vector dominante promedio | La dirección del díada a nivel actor (puede diferir de la modal) |
| Configuración actor-avg | Configuración resultante del promedio de scores NB05 |
| Base empírica | N documentos, share_ambiguous_nb05, attractor strength distribution |
| Transiciones | N transiciones en el corpus; estabilidad orbital |
| Caveat obligatorio | Texto fijo por actor (ver `MAPA §5`) |

**Trayectoria / línea de tiempo**
Visualización de la secuencia de documentos en el tiempo: año, tipo (apertura / asunción), configuración, attractor strength. Sin escala numérica en el eje Y — solo visual de configuración por documento.

**Extractos de evidencia**
Dos o tres proposiciones representativas del corpus del actor, con:
- texto del segmento (truncado)
- vector detectado
- patrón proposicional activado
- fuente (nombre de documento, año)

Nota: "Los extractos son evidencia del registro retórico de mensajes formales. No describen el gobierno."

**Aviso de cierre**
```
Este perfil es una hipótesis provisional derivada del corpus HCDN_PROMOTED_LAYER.
No es una clasificación histórica definitiva.
```

**Actores con caveats especiales**

| Actor | Caveat adicional en ficha |
|-------|--------------------------|
| Milei | "n=2 documentos — tipo de actor no confirmado. Requiere corpus ampliado (n≥4)." |
| Macri | "Perfil corregido (patch v0_2, 2026-04-29) — pendiente validación por re-run pipeline v1." |
| Alberto Fernández | "caution=high — share_ambiguous_nb05=1.0. La ambigüedad persistente puede ser el hallazgo." |
| Alfonsín | "La inestabilidad orbital es el hallazgo principal — no clasificar como tipo fijo." |
| Menem | "No confundir registro discursivo paternalista con la política de Estado menemista." |

---

## 8. Página de Perón

La página de Perón es una sección autónoma, no una ficha de actor del corpus democrático. Su separación es metodológica, no editorial.

**Sección 1 — Por qué una pipeline separada**
Tres razones: OCR parcialmente fallido en el corpus HCDN, sin calibración aplicable al período pre-democrático, sin bridge note. Explicado en lenguaje accesible sin jerga de pipeline.

**Sección 2 — Los dos documentos limpios**
Presentación paralela de 1946 y 1954:

| Campo | 1946 — Asunción inaugural | 1954 — Apertura anual |
|-------|--------------------------|----------------------|
| Registro del mesianismo | Ruptura fundacional, redención, discontinuidad histórica consumada | Consagración providencial-doctrinal, tres banderas, eternidad |
| Registro del paternalismo | Justicia social prometida, masas trabajadoras, acceso educativo | Pueblo organizado, orden social establecido |
| Registro de la tecnocracia | Construcción institucional activa, Consejo Nacional de Posguerra, planificación | Aparato asumido, doctrina organizacional de fondo |
| Hallazgo clave | TEC co-igual con PAT (63 vs 64) | TEC debilitado: único vector cuyo score absoluto decrece a pesar del mayor corpus |

Aviso: "Los datos de esta tabla son conteos proposicionales de la PERON_ALT_PIPELINE. No son comparables numéricamente con los scores calibrados del corpus HCDN."

**Sección 3 — Perón 1973: bloqueado**
```
El discurso del 12 de octubre de 1973 existe históricamente.
No está disponible en ninguna pipeline activa.
La fuente identificada contiene el discurso de otra persona.
Adquirir una fuente verificada es la primera precondición para el mapa v1.
```
Sin especulación sobre 1973. Sin inferencias.

**Sección 4 — Hipótesis de dos fases**
La jerarquía MES > PAT > TEC es estable en ambos documentos disponibles; el contenido interno de cada vector se desplaza entre 1946 y 1954. Esta hipótesis requiere el tercer documento (1973) para ser evaluada. No hay clasificación final de Perón.

---

## 9. Página de evidencia y método

**Sección 1 — Corpus HCDN**
- Fuente: mensajes de apertura legislativa y asunciones disponibles en el portal HCDN
- 148 PDFs registrados → OCR → control de calidad → análisis_ready
- 51 documentos del período democrático 1983–2025 en el corpus limpio
- Calibración proposicional: qué son los patrones TM, TCM, AGN y por qué se ponderan así

**Sección 2 — PERON_ALT_PIPELINE**
- Por qué Perón no entró en el corpus HCDN (exclusión por diseño: `05_extract_analysis_txt_non_peron.py`)
- Instrumento diferente: extracción manual de columnas de Diario de Sesiones
- Status actual: dos documentos limpios, 1973 bloqueado
- Sin calibración común con el corpus HCDN

**Sección 3 — Qué está excluido**

| Excluido | Razón |
|----------|-------|
| Perón 1973 | Fuente contiene discurso de otro orador |
| Outputs NB01–NB04 pre-calibración | Supersedidos por NB05 calibrado |
| Fragmentos del corpus piloto | Unidad de análisis incompatible (fragmento ≠ documento) |
| Síntesis en inglés | Contiene errores de período y configuración — no canónica |

**Sección 4 — Sistema de cautelas**
Tabla de los cuatro niveles de cautela (low, medium, high, TIER_3) con explicación de qué significa cada uno en términos de tamaño de corpus, ambigüedad y estado de corrección.

---

## 10. Videojuego — diseño de traducción

El marco de tres cuerpos traduce naturalmente a mecánicas de juego. La sección `#videojuego` del sitio no es el juego en sí — es el puente conceptual entre el análisis y el prototipo lúdico. El prototipo v0.8 existe en `videogame/tres_cuerpos_v8/`; v0.9 está en desarrollo.

**Vectores como fuerzas políticas**
Los tres vectores operan como campos de fuerza que el jugador puede activar, reforzar o contrarrestar. No son ideologías ni partidos: son registros de acción política disponibles en el campo.

**Configuraciones como atractores**
Una configuración orbital (ej. `paternalismo+tecnocracia`) no es un estado fijo: es un atractor al que el discurso tiende bajo determinadas condiciones. El juego puede modelar la fuerza del atractor como resistencia al cambio de configuración.

**Crisis como eventos de desplazamiento de masa**
Los momentos en que el mesianismo emerge en el corpus democrático —hiperinflación, colapso institucional, default— corresponden a eventos que modifican la distribución de fuerzas. En el juego, las crisis son eventos que redistribuyen la masa de los tres cuerpos, forzando reconfiguración.

**Actores como trayectorias, no como tipos**
Ningún actor en el corpus tiene un tipo fijo. Alfonsín recorre seis configuraciones distintas en ocho documentos. El juego puede modelar a los actores como trayectorias con atractores propios, no como fichas estáticas.

**Estado del prototipo**
v0.8 existe en `videogame/tres_cuerpos_v8/` (gameplay pobre). v0.9 en desarrollo. v1.0 pendiente — requiere `MAPA_ORBITAL_ARGENTINO_v1.md` para poblar fichas de actor con perfiles calibrados.

**Caveats de diseño**
El videojuego no es un simulador de política argentina. No produce predicciones. No clasifica actores. Es una exploración lúdica de la heurística analítica. Los actores históricos en el juego son trayectorias con atractores propios, no fichas con estadísticas fijas o tipologías confirmadas.

---

## 11. Componentes visuales e interactivos posibles

Listado de componentes. Ninguno requiere datos en tiempo real — todos pueden construirse como estáticos o semi-estáticos con los datos del CSV co-canónico.

| Componente | Descripción | Fuente de datos |
|-----------|-------------|-----------------|
| Diagrama de tres fuerzas | Triángulo estático o animado con los tres vectores en tensión | Conceptual |
| Tarjetas de configuración orbital | Cuatro familias con nombre, descripción, actores asociados, % del corpus | `NB10_configuration_map_v0_1.csv` |
| Grilla de fichas de actor | 10 actores con badge de tier/cautela; clic → ficha | `NB10_democratic_actor_interpretive_matrix_v0_1.csv` |
| Línea de tiempo por actor | Secuencia de documentos con configuración y attractor strength | `NB10_democratic_document_interpretive_table_v0_1.csv` |
| Mapa de distribución de configuraciones | Gráfico de barras: documentos por configuración | `NB10_configuration_map_v0_1.csv` |
| Drawer de evidencia | Panel expandible con proposiciones representativas por actor | `NB09_case_packet_evidence_index.csv` |
| Badges de cautela | Indicadores visuales de nivel de evidencia (LOW / MEDIUM / HIGH / PROVISIONAL) | `NB08_democratic_actor_profiles_1983_2025.csv` |
| Carril separado de Perón | Sección visual demarcada, sin escala orbital común con HCDN | `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` |
| Barra de roadmap | Estado de las siete precondiciones para el mapa v1 (PASS / FAIL / pendiente) | `MAPA §9` |

**Componentes bloqueados o diferidos**

| Componente | Por qué diferido |
|-----------|-----------------|
| Perón en el mismo mapa orbital que actores HCDN | Requiere bridge note — no disponible |
| Ficha de Perón 1973 | Fuente bloqueada; sin evidencia |
| Perfil Milei confirmado | Requiere n≥4; actualmente n=2 |
| Comparación numérica Perón–HCDN | Requiere bridge note |

---

## 12. Jerarquía de contenido

| Nivel | Descripción | Ejemplo |
|-------|-------------|---------|
| Canónico | Afirmaciones directamente derivadas de la síntesis canónica y el CSV co-canónico | Configuraciones con % de corpus; scores actor-avg NB05 |
| Brief | Síntesis accesible de los hallazgos principales, con caveats preservados | Texto de §4 del brief; proposiciones P1–P5 |
| Extractos de evidencia | Proposiciones representativas del corpus, citadas con fuente | Segmentos de NB09 case packets |
| Visuales exploratorios | Representaciones que ilustran el marco sin afirmar datos nuevos | Diagrama de tres fuerzas; línea de tiempo de actor |
| Contenido bloqueado / diferido | Materiales que requieren precondiciones no satisfechas | Perón 1973; integración numérica Perón–HCDN; perfil Milei confirmado |

El sitio siempre deja visible la distinción entre contenido canónico y contenido diferido. Los bloqueos activos no se ocultan: se presentan como parte honesta del estado del proyecto.

---

## 13. Versioning y caveats del sitio

El sitio en su versión actual refleja el estado del corpus al 2026-04-30: `MAPA_ORBITAL_ARGENTINO_v0_1.md` (preliminar). No es el mapa integrado final.

**Aviso permanente visible en todo el sitio** (pie de página o banner):
```
Este sitio presenta el mapa orbital preliminar v0.1.
No es el mapa integrado final.
Todos los perfiles de actor son hipótesis provisionales.
La comparación numérica entre Perón y actores HCDN no está autorizada.
Ver Roadmap para las condiciones del mapa v1.
```

**Condiciones para actualizar el sitio a v1:**
Las mismas siete precondiciones del mapa v1 (ver `MAPA §9`):
1. Fuente verificada del discurso de Perón del 12 de octubre de 1973
2. Procesamiento con los mismos controles de calidad que 1946 y 1954
3. Perfil tri-documento de Perón (PERON_NB04)
4. Bridge note formal entre PERON_ALT_PIPELINE y corpus HCDN
5. Corpus Milei ampliado a n≥4
6. Decisión sobre re-run completo de pipeline HCDN v1
7. Producción de `MAPA_ORBITAL_ARGENTINO_v1.md`

Cuando alguna de estas condiciones cambie de estado, el sitio puede actualizarse en la sección correspondiente (ficha de Milei, sección Perón) sin esperar al mapa v1 completo.

---

## 14. Próximos pasos de construcción

En orden. Los pasos posteriores no deben anticiparse sin completar los anteriores.

**1. Deck de copy del sitio**
Producir `web/SITE_COPY_DECK_v0_1.md`: textos definitivos para cada página y sección en español, listos para implementación. El brief ya provee la base; el deck adapta el tono a cada audiencia y define los textos exactos de todos los elementos de UI (títulos, subtítulos, etiquetas de badge, mensajes de caveat, textos de botones).

**2. Especificación de componentes visuales**
Producir `web/VISUAL_COMPONENT_SPEC_v0_1.md`: descripción funcional de cada componente (propósito, datos de entrada, datos de salida, estados posibles, comportamiento en mobile). Sin diseño gráfico — solo especificación de comportamiento e información.

**3. Contrato de datos para actores y configuraciones**
Producir `web/DATA_CONTRACT_v0_1.md`: esquema de los objetos de datos que el sitio consume — actor, configuración, documento, extracto de evidencia, caveat. Derivado directamente de `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` y los CSV promovidos de NB08–NB10. Este contrato es la interfaz entre la evidencia empírica y la implementación front-end.

**4. Prototipo estático**
Con copy deck, especificación visual y contrato de datos completos: construir un prototipo estático de las páginas principales (Inicio, Mapa orbital, dos o tres fichas de actor, Perón). Sin base de datos ni interactividad compleja. Suficiente para validar la arquitectura de información.

**5. Interactividad progresiva**
Una vez validado el prototipo estático: conectar los componentes interactivos (tarjetas de actor, drawer de evidencia, línea de tiempo) a los datos del CSV. Los componentes bloqueados se marcan como coming-soon con descripción explícita del bloqueo, no se ocultan.

---

*Producido en el marco del proyecto El problema de los tres cuerpos argentinos. Esta arquitectura de información deriva de evidencia provisional. El sitio que implemente esta arquitectura debe preservar todos los caveats documentados en `MAPA_ORBITAL_ARGENTINO_v0_1.md §8` y `BRIEF_MAPA_ORBITAL_ARGENTINO_v0_1.md §7`.*
