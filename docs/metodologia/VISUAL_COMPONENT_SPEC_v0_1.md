# VISUAL COMPONENT SPEC v0.1

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** especificación funcional — no diseño gráfico, no código, no assets
**Fuentes:** `WEBSITE_INFORMATION_ARCHITECTURE_v0_1.md` · `SITE_COPY_DECK_v0_1.md` · `MAPA_ORBITAL_ARGENTINO_v0_1.md` · `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` · `README_WORKSPACE_AUTHORITY.md`

---

## 1. Propósito

Este documento define la especificación funcional e informacional de los componentes del sitio. No define el diseño gráfico, la tipografía, la paleta de colores ni los assets visuales. No contiene código. No toma decisiones de estilo final.

Para cada componente, el documento especifica: propósito, dónde vive en la arquitectura de páginas, qué datos recibe como entrada, cómo muestra esa información, qué puede hacer el usuario, cómo se comportan los caveats, cómo escala en mobile, y qué ocurre cuando el contenido está bloqueado o diferido.

Un implementador puede construir el sitio a partir de este documento sin haber leído los documentos empíricos. Pero las afirmaciones que el sitio presenta deben trazarse a las fuentes canónicas enumeradas arriba, no al copy de este spec.

---

## 2. Principios de los componentes

Estos principios rigen todas las decisiones de diseño de componentes. Cuando un principio entre en conflicto con una preferencia estética, el principio prevalece.

**Evidencia antes que espectáculo.** El componente más importante de cualquier página es la afirmación más cercana a la evidencia canónica. La jerarquía visual debe reflejar la jerarquía de evidencia. Un dato robusto (Menem, n=11, caution=low) ocupa más espacio visual o mayor prominencia que un dato provisional (Milei, n=2). No se usa énfasis visual para hacer que una hipótesis débil parezca más segura de lo que es.

**Caveats visibles por defecto.** Las advertencias metodológicas no se colocan detrás de un clic, en un tooltip, ni en letra pequeña que requiere acción del usuario para ver. El badge de "hipótesis provisional" está visible en la tarjeta de actor sin necesidad de hover ni expansión. Los bloqueos activos se muestran con contenido descriptivo, no se ocultan. Un usuario que llega por primera vez a cualquier ficha de actor lee el caveat antes de leer el dato.

**Actores como trayectorias, no como tipos.** Ningún componente etiqueta a un actor con un tipo fijo. El actor se presenta con su configuración modal (si existe), su número de documentos, sus transiciones, su nivel de cautela. El componente de línea de tiempo es estructuralmente prioritario sobre el badge de configuración porque comunica trayectoria, no estado fijo.

**Configuraciones dirigidas, no combinaciones simétricas.** El componente que muestra configuraciones distingue siempre entre `paternalismo+tecnocracia` y `tecnocracia+paternalismo`. No se agrupan bajo el rótulo "díada tec/pat". El orden en la etiqueta no es intercambiable: el primer vector domina, el segundo acompaña. Los componentes de configuración muestran la dirección.

**Perón separado de la escala numérica HCDN.** Ningún componente pone en la misma escala, gráfico, tabla, o representación visual comparativa a Perón (PERON_ALT_PIPELINE) y a los actores del corpus democrático (HCDN_PROMOTED_LAYER). La separación es metodológica: los instrumentos son distintos y no existe bridge note. El carril de Perón es un componente separado con su propio encabezado de separación metodológica.

**Contenido bloqueado visible, no oculto.** Un card de Perón 1973 existe en el carril de Perón. Muestra el estado del bloqueo, la razón (PERON_SRC_015 = discurso de Allende, no de Perón), y la acción requerida (adquisición de fuente alternativa). No se reemplaza con un espacio en blanco ni se omite. Los componentes del roadmap muestran condiciones no satisfechas como pendientes visibles, no como ausencias.

---

## 3. Inventario de componentes

| # | Componente | Página principal | Tipo |
|---|-----------|-----------------|------|
| C01 | Hero thesis block | Inicio | Estático |
| C02 | Three-body vector cards | Inicio, Los tres cuerpos | Estático / expandible |
| C03 | Orbital map preview | Inicio | Estático con datos |
| C04 | Democratic actor map | Mapa orbital, Actores | Interactivo |
| C05 | Configuration family cards | Mapa orbital, Los tres cuerpos | Expandible |
| C06 | Actor profile card | Actores (ficha individual) | Expandible |
| C07 | Actor timeline | Actores (ficha individual) | Visual con datos |
| C08 | Evidence drawer | Actores, Configuraciones | Deslizable / overlay |
| C09 | Caveat badge system | Todas las páginas | Sistema transversal |
| C10 | Perón separated lane | Mapa orbital, Actores/Perón | Estructuralmente separado |
| C11 | V1 roadmap tracker | Roadmap | Estático con estados |
| C12 | Game/simulator bridge panel | Juego / simulador | Estático conceptual |

Cada componente se especifica en detalle en §§4–15.

---

## 4. Hero thesis block (C01)

### Propósito
Capturar la tesis central del proyecto en la primera pantalla visible. El objetivo no es impresionar visualmente sino hacer que el visitante pueda leer la proposición principal antes de hacer scroll.

### Ubicación en páginas
Inicio — posición superior, primer elemento visible sin scroll.

### Datos de entrada
Texto fijo. No consume datos del corpus. Fuente: `SITE_COPY_DECK_v0_1.md §2`.

### Lógica de display

**Titular principal:**
```
Argentina no es un péndulo.
Es un problema de tres cuerpos.
```

**Subtitular:**
```
Un proyecto de medición del discurso presidencial argentino.
Cuarenta años de apertura legislativa, diez presidentes, tres fuerzas en tensión.
```

**Párrafo de entrada:**
```
El péndulo político argentino existe. Pero describe la superficie, no la estructura.
Este proyecto mide algo más profundo: qué registro retórico usaron los presidentes
argentinos al hablar ante el Congreso entre 1983 y 2025. Los resultados no confirman
el péndulo. Confirman un campo de fuerzas con tres vectores que se combinan de
maneras que ninguna etiqueta política predice.
```

### Interacciones del usuario
Dos CTAs bajo el párrafo de entrada:
- Primario: "Explorar el mapa orbital" → ancla a `#mapa-orbital` o página Mapa orbital
- Secundario: "Conocer a los actores" → ancla a `#actores` o página Actores

Los CTAs no tienen efecto de hover que los haga parecer más o menos seguros que lo que dicen.

### Comportamiento de caveats
Ningún caveat activo en el hero. El caveat del sitio —el banner global— es visible en la barra superior antes del hero, no dentro del componente. El hero no mezcla afirmaciones empíricas con frases retóricas de impacto.

### Comportamiento mobile
El titular ocupa el ancho completo de la pantalla. El párrafo se escala sin truncamiento. Los dos CTAs se apilan verticalmente (CTA primario arriba).

### Estados bloqueados / diferidos
No aplica. El hero es contenido fijo de presentación del marco, no de datos empíricos.

---

## 5. Three-body vector cards (C02)

### Propósito
Definir los tres vectores del modelo —tecnocracia, mesianismo, paternalismo— de manera accesible, rigurosa y distinguible entre sí. El componente introduce el vocabulario antes de que el usuario encuentre cualquier perfil de actor o configuración.

### Ubicación en páginas
- Inicio: tres tarjetas en fila bajo el hero, antes del mapa preview
- Los tres cuerpos: versión expandida de las mismas tarjetas como contenido principal de la página

### Datos de entrada
Texto fijo. Fuente: `SITE_COPY_DECK_v0_1.md §4`. No consume datos del corpus.

### Lógica de display

Tres tarjetas, una por vector. Cada tarjeta muestra en su estado colapsado:
- Nombre del vector
- Definición corta (2–3 líneas)
- Señal discursiva principal (1 línea)

Al expandir (o en la página Los tres cuerpos, por defecto expandidas):
- Definición larga
- "Lo que no es" — sección de aclaración de confusión frecuente
- Señales discursivas típicas (lista)
- Riesgo de sobredetección

**Contenido de cada tarjeta:**

**Tarjeta 1 — Tecnocracia (Modernización tecnocrática)**
- Definición corta: "El lenguaje de la reforma técnica del Estado. Modernización, eficiencia, racionalización. El discurso de quien gobierna prometiendo optimizar, no redimir."
- Señal: "Reformas institucionales presentadas como necesidad técnica, no como elección política."
- Lo que no es: no es sinónimo de neoliberalismo ni de ninguna orientación económica específica.
- Sobredetección: el lenguaje técnico-institucional puede aparecer como cobertura formal obligada; la calibración HCDN (TM×1.00 / TCM×0.50 / AGN×0.00) intenta distinguir la proposición estructurante de la mención incidental.

**Tarjeta 2 — Mesianismo (Mesianismo redentor)**
- Definición corta: "El lenguaje de la ruptura histórica y la misión trascendente. Un pueblo que merece ser salvado, un líder que llega a consumar una discontinuidad que ya estaba escrita."
- Señal: "La política narrada como destino, no como administración."
- Lo que no es: no equivale a autoritarismo ni a populismo en sentido técnico. En el corpus democrático aparece casi exclusivamente en momentos de crisis institucional aguda.
- Sobredetección: el género inaugural tiende a elevar el tono retórico. Las asunciones tienen mayor probabilidad de activar proposiciones mesiánicas. El corpus HCDN controla este efecto comparando asunciones con aperturas del mismo actor donde es posible.

**Tarjeta 3 — Paternalismo (Paternalismo conservador)**
- Definición corta: "El lenguaje de la tutela social. El Estado que protege, conduce y se responsabiliza por el bienestar del pueblo. No la ruptura ni la técnica: el cuidado como eje del discurso."
- Señal: "El pueblo interpelado como sujeto de derechos que el Estado garantiza o restituye."
- Lo que no es: no es sinónimo de política social ni de gasto público. El caso Menem es el ejemplo más robusto.
- Sobredetección: el paternalismo puede aparecer como vocabulario retórico convencional; la calibración busca proposiciones que coloquen al Estado en posición tutelar activa.

### Interacciones del usuario
- Clic en tarjeta → expande a versión larga (en Inicio)
- Clic en enlace al pie de tarjeta → navega a página Evidencia o Método para contexto metodológico

### Comportamiento de caveats
Badge de navegación al pie de cada tarjeta: "→ Ver evidencia y método" para indicar que los vectores tienen base empírica documentada, no son categorías ad-hoc.

### Comportamiento mobile
En Inicio: las tres tarjetas se apilan verticalmente. En Los tres cuerpos: se muestran expandidas por defecto, apiladas.

### Estados bloqueados / diferidos
No aplica. Las tarjetas de vector son conceptuales, no dependen de datos empíricos que puedan estar bloqueados.

---

## 6. Orbital map preview (C03)

### Propósito
Mostrar en Inicio la distribución de configuraciones del corpus democrático de manera que el visitante entienda la estructura del campo sin necesidad de navegar al mapa completo. Es el puente entre la tesis abstracta y la evidencia.

### Ubicación en páginas
Inicio — sección central de la página, entre las tarjetas de vector y las configuraciones destacadas.

### Datos de entrada
Tabla de distribución de configuraciones. Fuente: `MAPA_ORBITAL_ARGENTINO_v0_1.md §3.2`.

| Configuración | Documentos | Porcentaje |
|--------------|-----------|-----------|
| paternalismo+tecnocracia | 25 | 49% |
| tecnocracia+paternalismo | 19 | 37% |
| tecnocracia+mesianismo | 3 | 6% |
| paternalismo+mesianismo | 2 | 4% |
| paternalismo+none | 1 | 2% |
| mesianismo+tecnocracia | 1 | 2% |
| Total corpus | 51 | 100% |

### Lógica de display

**Diagrama conceptual:** representación estática de los tres vectores como fuerzas en tensión. No es una simulación de física newtoniana. No tiene animación de órbitas. Los tres vectores se representan como nodos o vértices de un triángulo; las configuraciones se representan como aristas dirigidas (el vector primario apunta al secundario, no al contrario). El diagrama no tiene escala numérica — es conceptual.

**Distribución de configuraciones:** representación de la distribución de los 51 documentos. Muestra el 86% del díada tec/pat de manera prominente. Las cuatro etiquetas de configuración con porcentaje:
```
paternalismo + tecnocracia    →    Configuración modal (49%)
tecnocracia + paternalismo    →    Co-dominante (37%)
tecnocracia + mesianismo      →    Analíticamente distintiva (6%)
paternalismo + mesianismo     →    Registros de crisis (4%)
```

**Banner de versión:** siempre visible sobre o bajo el diagrama:
```
Mapa orbital preliminar v0.1 — no clasificación definitiva.
Perón aparece en sección separada, no en esta escala.
Ver Roadmap para las condiciones del mapa v1.
```

### Interacciones del usuario
- Clic en configuración → navega a C05 (Configuration family card) de esa configuración
- CTA bajo el componente: "Explorar el mapa completo" → Mapa orbital

### Comportamiento de caveats
Banner de versión siempre visible. No se muestra el diagrama sin el banner.

### Comportamiento mobile
El diagrama conceptual se escala a una representación simplificada de 3 nodos y etiquetas de texto. La tabla de distribución se convierte en lista apilada con porcentajes.

### Estados bloqueados / diferidos
Perón no aparece en este componente. Si hubiera un estado de "mapa v1 disponible" en el futuro, el componente se actualizaría con el banner correspondiente.

---

## 7. Democratic actor map (C04)

### Propósito
Mostrar los diez actores del corpus democrático HCDN 1983–2025 con sus configuraciones, niveles de cautela y tier, en un formato explorable. Perón no aparece en este componente.

### Ubicación en páginas
- Mapa orbital — Sección 2 (según IA §6)
- Actores — vista de grilla/índice de actores

### Datos de entrada
Tabla de actores. Fuente: `MAPA_ORBITAL_ARGENTINO_v0_1.md §3.3` · `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` (columnas: actor, period_or_years, dominant_configuration, caution_level, comparability_tier).

**Registro por actor:**

| Actor | Período | Config. modal | n docs | Cautela | Tier |
|-------|---------|--------------|--------|---------|------|
| Raúl Alfonsín | 1983–1989 | sin modal estable (5 trans.) | 8 | medium | TIER_1 |
| Carlos Menem | 1990–1999 | pat+tec (9/11) | 11 | low | TIER_1 |
| Fernando de la Rúa | 1999–2001 | pat+tec → flip tec+pat | 3 | medium | TIER_1 |
| Eduardo Duhalde | 2002–2003 | pat+tec (activo); pat+mes (inaugural) | 3 | medium | TIER_1 |
| Néstor Kirchner | 2003–2007 | near-parity (1 trans.) | 5 | medium | TIER_1 |
| Cristina Fernández de Kirchner | 2007–2015 | pat+tec modal; tec+pat avg | 9 | low | TIER_1 |
| Mauricio Macri ⚠️ | 2015–2019 | tec+pat (3/5 activos) | 5 | medium | TIER_3 |
| Alberto Fernández ⚠️ | 2019–2022 | near-parity (ambigüedad estructural) | 4 | high | TIER_3 |
| Javier Milei ⚠️ | 2024–2025 | tec+mes (ambos docs) | 2 | medium | TIER_3 |
| Adolfo Rodríguez Saá ⚠️ | dic. 2001 | pat+mes (1 doc) | 1 | high | TIER_3 |

### Lógica de display

Cada actor se presenta como tarjeta o bubble con:
- Nombre y período
- Configuración (etiqueta dirigida: vector1+vector2)
- Badge de cautela (LOW / MEDIUM / HIGH)
- Badge de tier (TIER_1 / TIER_3)
- Número de documentos (n=X)
- Icono ⚠️ para actores TIER_3

Los actores TIER_1 y TIER_3 son visualmente distinguibles. Los actores TIER_3 tienen una indicación de "perfil provisional" que no requiere expansión para verse.

**Filtros disponibles:**
- Por configuración modal: pat+tec / tec+pat / tec+mes / pat+mes / variable
- Por nivel de cautela: low / medium / high
- Por período (décadas: 1983–1989, 1990–1999, 2000–2009, 2010–2019, 2020–2025)
- Por tier: TIER_1 / TIER_3

Los filtros son opcionales — el mapa funciona sin filtros activados.

### Interacciones del usuario
- Clic en actor → abre C06 (Actor profile card) o navega a ficha individual
- Clic en filtro → filtra las tarjetas en pantalla
- Hover sobre badge → muestra definición del nivel (sin requerir hover para ver el badge)

### Comportamiento de caveats
Badge "Hipótesis provisional — no clasificación definitiva" aparece en cada tarjeta, no solo en actores TIER_3. Para actores TIER_3: badge adicional específico según el caso (ver C09).

Aviso fijo bajo el mapa:
```
Este mapa muestra solo actores del corpus HCDN 1983–2025.
Perón aparece en sección separada — ver carril Perón.
Los perfiles son hipótesis provisionales.
```

### Comportamiento mobile
En mobile, la grilla colapsa a una lista apilada de tarjetas de actor. Los filtros se agrupan en un menú desplegable "Filtrar". El badge de cautela es siempre visible, no colapsado.

### Estados bloqueados / diferidos
Perón no tiene tarjeta en este componente. En el futuro, si Perón se integra con bridge note, aparecería en un componente separado (C10 ampliado), no en este.

---

## 8. Configuration family cards (C05)

### Propósito
Describir cada familia de configuración orbital — qué significa que un discurso presidencial tenga determinada configuración, qué actores la exhiben, y qué interpretación habilita la evidencia.

### Ubicación en páginas
- Mapa orbital — Sección 1
- Los tres cuerpos — como sección final que muestra cómo interactúan los vectores
- Actores — referenciada desde cada ficha de actor

### Datos de entrada
Tabla de distribución de configuraciones. Fuente: `MAPA_ORBITAL_ARGENTINO_v0_1.md §3.2 y §4`.

### Lógica de display

**Cinco tarjetas de familia:**

**Familia 1 — paternalismo + tecnocracia (modal)**
- Estadística: 25 documentos — 49% — 7 actores
- Definición: el lenguaje de protección social encuadra el discurso; la tecnocracia lo instrumenta. El discurso promete tutela estatal y lo ejecuta mediante programas técnicos.
- Actores: Menem (caso canónico), CFK (5/9 docs modal), De la Rúa (1999–2000), Duhalde (apertura regular), NK (inauguración 2003), AlbertoF (2021, 2022), Rodríguez Saá
- Interpretación: la configuración más frecuente del período democrático. Transversal a orientaciones gubernamentales opuestas. El caso Menem prueba que el registro paternalista no predice la política.
- Caveats: "No es el sello de ninguna corriente política. El 49% de frecuencia no implica que sea la configuración correcta ni la más legítima."

**Familia 2 — tecnocracia + paternalismo (co-dominante)**
- Estadística: 19 documentos — 37% — 8 actores
- Definición: el lenguaje de modernización técnica, eficiencia o racionalización del Estado domina; el registro tutelar acompaña.
- Actores: CFK (avg-level y algunos docs), Macri (aperturas activas 2016, 2017, 2019), Alfonsín (1983, 1986–1987), Duhalde (aperturas 2002, 2003), De la Rúa (2001 flip), NK (aperturas 2005–2007)
- Interpretación: cara inversa del díada. La dirección opuesta tiene contenido analítico propio: el encuadre técnico-institucional no es el mismo que el encuadre tutelar, aunque compartan los mismos dos vectores.
- Caveats: "Las dos caras del díada tec/pat tienen contenido analítico distinto. No agrupar bajo una misma etiqueta."

**Familia 3 — tecnocracia + mesianismo (singularizada)**
- Estadística: 3 documentos — 6% — 2 actores
- Definición: el lenguaje técnico-institucional lidera y el lenguaje de misión trascendente lo acompaña como secundario sostenido. Sin paternalismo como secundario principal.
- Actores: Alfonsín (dic. 1988, sesión extraordinaria Carapintada — indeterminate attractor); Milei (2024 y 2025 — ambos documentos disponibles)
- Interpretación: la configuración más analíticamente distintiva del corpus. El caso Milei es significativo porque el doc de 2025 es una apertura ordinaria, no una asunción ni un discurso de crisis.
- Caveats: "Milei n=2 — hipótesis no confirmada. Alfonsín 1988 es un documento de acta con indeterminate attractor, low-weight. El 6% refleja escasez de instancias, no irrelevancia."

**Familia 4 — paternalismo + mesianismo (crisis institucional)**
- Estadística: 2 documentos — 4% — 2 actores
- Definición: tutela social en posición primaria con mesianismo como secundario. Aparece en inauguraciones bajo ruptura institucional aguda.
- Actores: Rodríguez Saá (dic. 2001, colapso institucional y default, n=1); Duhalde (ene. 2002, inaugural de emergencia post-default)
- Interpretación: el patrón no describe a los actores; describe el contexto. Los dos casos coinciden con el colapso institucional de 2001–2002. El patrón mesianismo-de-crisis es coherente con Alfonsín 1989.
- Caveats: "Rodríguez Saá n=1 — punto de datos, no perfil de actor. La configuración del inaugural de Duhalde difiere de sus aperturas regulares (tec+pat)."

**Familia 5 — indeterminate / provisional (casos límite)**
- Estadística: 2 documentos residuales — 4% — 2 actores
- Contenido: paternalismo+none (Menem 1996 — único documento sin secundario claro en el corpus); mesianismo+tecnocracia (Alfonsín 1989 — único documento con mesianismo primario y tecnocracia secundaria, en contexto de hiperinflación y salida anticipada).
- Caveats: "Ninguno de estos documentos produce proposición analítica autónoma con n=1. Son contribuyentes a patrones del corpus general."

### Interacciones del usuario
- Clic en familia → expande descripción completa con actores y caveats
- Clic en actor en la lista → navega a ficha de actor (C06)

### Comportamiento de caveats
Cada tarjeta tiene caveat visible en estado no expandido: el porcentaje del corpus y el número de actores. El número pequeño de actores en familias 3 y 4 comunica por sí mismo la provisionalidad.

### Comportamiento mobile
Las tarjetas se apilan. La Familia 1 y Familia 2 van primero (86% del corpus). Cada tarjeta se muestra colapsada con un expand touch target.

### Estados bloqueados / diferidos
No aplica directamente. Las familias que se discuten son completas para el v0.1.

---

## 9. Actor profile card / template (C06)

### Propósito
Presentar el perfil individual de un actor del corpus democrático con todos los campos de evidencia, caveats y estado de provisionalidad. Es la unidad de contenido más densa del sitio y la más usada por periodistas, investigadores y estudiantes.

### Ubicación en páginas
Página individual por actor. También accesible como overlay desde C04 (Democratic actor map).

### Datos de entrada
Registro completo por actor. Fuente: `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` · `MAPA_ORBITAL_ARGENTINO_v0_1.md §5`.

### Campos del template (orden de display)

| Campo | Contenido | Fuente en CSV |
|-------|-----------|--------------|
| Nombre del actor | Nombre completo | actor |
| Período | Años del corpus (no del mandato completo si hay gaps) | period_or_years |
| Lineaje del corpus | HCDN_PROMOTED_LAYER (siempre para actores democráticos) | corpus_lineage |
| Configuración modal | La configuración más frecuente en el corpus del actor, con nota si no existe modal estable | dominant_configuration |
| Vector dominante promedio | avg-level a partir de avg_tec / avg_pat / avg_mes (NB05 calibrado) | — (calculado) |
| Base empírica | N documentos; share_ambiguous_nb05; distribución de attractor strength | main_evidence_basis |
| Transiciones | Número de transiciones; nota de estabilidad orbital | — |
| Nivel de cautela | LOW / MEDIUM / HIGH con descripción | caution_level |
| Status | TIER_1 o TIER_3 con descripción del tier | comparability_tier |
| Hipótesis principal | Texto de interpretive_hypothesis del CSV (truncado a 3–4 oraciones) | interpretive_hypothesis |
| Caveat obligatorio | Texto de required_caveat del CSV — siempre visible, no expandible ni hover | required_caveat |
| Siguiente evidencia necesaria | Lo que cambiaría el status del perfil | next_evidence_needed |

**Badge siempre visible en encabezado:**
```
Hipótesis provisional — no clasificación histórica definitiva
```

**Caveats especiales por actor (siempre visibles):**

| Actor | Caveat adicional |
|-------|-----------------|
| Milei | "n=2 documentos — tipo de actor no confirmado. Requiere corpus ampliado (n≥4)." |
| Macri | "Perfil corregido (patch v0_2, 2026-04-29). Pendiente validación por re-run pipeline v1. No comparar con perfil pre-corrección." |
| Alberto Fernández | "caution=high. share_ambiguous_nb05=1.0. La ambigüedad persistente puede ser el hallazgo principal, no un defecto del corpus. Apertura 2023 ausente." |
| Alfonsín | "La inestabilidad orbital es el hallazgo principal. No clasificar como tipo fijo. El mesianismo de crisis no establece mesianismo estructural." |
| Menem | "No confundir registro discursivo paternalista con política de Estado menemista." |
| De la Rúa | "Corpus truncado — no hay discurso de salida. No inferir trayectorias desde n=3." |
| Duhalde | "avg_mes elevado es artefacto del inaugural de emergencia, no rasgo estructural." |
| Kirchner | "La distinción de dirección dentro del díada no está empíricamente resuelta." |
| Rodríguez Saá | "n=1 — punto de datos, no perfil de actor. Presidencia de 7 días." |
| CFK | "Apertura 2009 puede ser un gap. Verificar antes de afirmar trayectoria completa." |

**Aviso de cierre fijo (siempre al pie):**
```
Este perfil es una hipótesis provisional derivada del corpus HCDN_PROMOTED_LAYER.
No es una clasificación histórica definitiva.
El discurso de apertura legislativa no describe el gobierno.
```

### Interacciones del usuario
- Clic en "Ver trayectoria" → activa C07 (Actor timeline)
- Clic en "Ver evidencia" → abre C08 (Evidence drawer)
- Clic en badge de caveat → navega a sección Evidencia o Método con explicación del tipo de caveat

### Comportamiento de caveats
El badge "Hipótesis provisional" y el caveat obligatorio del actor son visibles en estado por defecto de la tarjeta, sin expansión. No hay contenido que se muestre como si fuera más seguro de lo que es antes de revelar el caveat.

### Comportamiento mobile
La tarjeta colapsa los campos secundarios (siguiente evidencia, hipótesis extendida) en un accordion. Los tres campos primarios —configuración modal, cautela, caveat obligatorio— permanecen siempre visibles.

### Estados bloqueados / diferidos
Si el actor tuviera evidencia no disponible (como Perón 1973), el campo correspondiente mostraría el estado bloqueado con descripción. En el corpus HCDN actual no hay campos bloqueados por evidencia faltante (los gaps están documentados como ausencias del corpus, no como bloqueos activos).

---

## 10. Actor timeline (C07)

### Propósito
Mostrar la secuencia de documentos de un actor a lo largo del tiempo: año, tipo de discurso, configuración detectada, y fortaleza del atractor. El componente comunica trayectoria, no tipo fijo. Es el componente central para entender la inestabilidad de Alfonsín, la estabilidad de CFK, o el patrón creciente de Milei.

### Ubicación en páginas
Ficha individual de cada actor, bajo el bloque de perfil (C06).

### Datos de entrada
Datos por documento. Fuente: `MAPA_ORBITAL_ARGENTINO_v0_1.md §5` por actor · `NB10_democratic_document_interpretive_table_v0_1.csv` (cuando disponible).

**Campos por punto en la línea de tiempo:**

| Campo | Descripción |
|-------|-------------|
| Año | Año del discurso |
| Tipo | asunción inaugural / apertura legislativa ordinaria / sesión extraordinaria |
| Configuración | par dirigido (ej. pat+tec) o "indeterminate" |
| Attractor strength | strong / medium / weak / indeterminate |
| Flag de confianza | NB05_ambiguous / low-weight / cleared_provisional |
| Nota de contexto | (opcional) texto breve de contexto institucional si es relevante (ej. "crisis Carapintada", "hiperinflación", "post-default") |

**Secuencias por actor (derivadas del MAPA §5):**

Alfonsín: 1983 tec+pat → 1984–85 pat+tec → 1986–87 tec+pat → 1988 dic. tec+mes (indeterminate, extraordinaria) → 1988 ap. tec+pat → 1989 mes+tec

Menem: 1990–1999 pat+tec sostenido (9/11 docs); 3 transiciones; doc 1994 y 1995 con flags cleared

CFK: 2007–2015 alternando pat+tec modal (5/9) / tec+pat; 6/9 strong attractor; doc 2008 outlier tec (gap=38.408)

Macri: 2015 pat+tec (inaugural) → 2016 tec+pat → 2017 tec+pat → 2018 indeterminate (low-weight) → 2019 tec+pat

AlbertoF: 2019 indeterminate (empate exacto) → 2021 pat+tec → 2022 pat+tec; todos con NB05 ambiguity flag

Milei: 2024 tec+mes (medium attractor) → 2025 tec+mes (strong attractor); 0 transiciones

De la Rúa: 1999 pat+tec → 2000 pat+tec (strong) → 2001 tec+pat (flip en crisis)

Duhalde: 2002 ene. pat+mes (inaugural emergencia) → 2002 ap. tec+pat → 2003 tec+pat

Kirchner: 2003 pat+tec (inaugural) → 2005 tec+pat → 2006 tec+pat → 2007 tec+pat (near-tie); todos con NB05 ambiguity flag excepto uno

Rodríguez Saá: 2001 pat+mes (single doc)

### Lógica de display

Eje horizontal: tiempo (años). No hay eje Y numérico — el componente no muestra scores en bruto. Las configuraciones se representan como etiquetas de texto o símbolos sobre la línea de tiempo, no como posiciones en un gráfico numérico.

La fortaleza del atractor se comunica visualmente mediante peso de línea o tamaño del marcador: strong > medium > weak > indeterminate. El marcador indeterminate usa un símbolo distinto (no una posición en el eje).

Los documentos con flags activos (low-weight, NB05_ambiguous) tienen un indicador visual — asterisco o hatching — que los distingue sin ocultarlos.

Las transiciones (cambios de configuración entre documentos consecutivos) se marcan con un indicador de "cambio de trayectoria" entre los dos puntos afectados.

### Interacciones del usuario
- Hover / tap sobre un punto → muestra el campo completo del documento (año, tipo, configuración, attractor, flags, contexto)
- Clic en punto → abre C08 (Evidence drawer) filtrado para ese documento
- La línea de tiempo completa es un enlace a "Ver metodología" si el usuario quiere entender qué significan los valores

### Comportamiento de caveats
- Documentos con low-weight o flags activos tienen marcador distinto y nota al pie: "Los documentos marcados tienen flags de revisión. Ver Método."
- Para actores con corpus parcial (AlbertoF 2023 ausente, CFK 2009 posiblemente ausente, Milei 2023 inaugural posiblemente ausente): el gap se muestra como punto vacío con etiqueta "no disponible", no se omite del eje temporal.
- Para Macri: indicador de que el corpus es corregido-provisional; no mostrar el documento 2019 (AlbertoF) ni el perfil pre-corrección.

### Comportamiento mobile
La línea de tiempo se convierte en una lista vertical de tarjetas de documento ordenadas cronológicamente. Cada tarjeta muestra año, tipo, configuración, attractor, y flags. El tap en una tarjeta activa el overlay de evidencia.

### Estados bloqueados / diferidos
Si el documento de apertura 2026 de Milei se ingresa en el futuro, el timeline se actualiza añadiendo el punto adicional. En el estado v0.1, el timeline de Milei tiene dos puntos (2024 y 2025) y una nota: "El inaugural de diciembre 2023 y la apertura 2026 no están disponibles en el corpus v0.1."

---

## 11. Evidence drawer (C08)

### Propósito
Mostrar fragmentos de evidencia proposicional representativos del corpus de un actor o de una configuración. El componente da acceso a la base empírica sin sobreenfatizar los scores numéricos brutos.

### Ubicación en páginas
Se abre desde C06 (Actor profile card) y desde C07 (Actor timeline, clic en documento). También puede abrirse desde C05 (Configuration family cards, sección "actores asociados").

### Datos de entrada
Proposiciones representativas. Fuente: `NB09_case_packet_evidence_index.csv` (o equivalente en case packets por actor) · `MAPA_ORBITAL_ARGENTINO_v0_1.md §5` (extractos cualitativos).

**Campos por proposición:**

| Campo | Descripción |
|-------|-------------|
| Texto del segmento | Extracto del discurso (truncado si es largo — máximo 3 líneas) |
| Vector detectado | TM (tecnocracia marcador) / TCM (tecnocracia co-marcador) / AGN (no cuenta) / PAT / MES — según el registro de patrones HCDN |
| Patrón proposicional activado | Nombre del patrón (ej. "Reforma institucional como necesidad técnica") |
| Fuente | Nombre del documento y año |
| Caveat del extracto | Nota metodológica si aplica (ej. "documento con NB05 ambiguity flag") |

**Restricciones de display:**
- Los scores NB05 brutos (avg_tec=19.2) no se muestran en el drawer. El drawer muestra patrones, no promedios.
- El número de proposiciones por vector (ej. "MES=82") no se muestra en el drawer para Perón — ese dato pertenece al componente C10 (Perón separated lane) con su propia nota de no comparabilidad.
- Por actor, se muestran 2–4 proposiciones representativas por vector detectado, no el corpus completo.

### Interacciones del usuario
- El drawer se abre deslizando desde el lado derecho (desktop) o como overlay de pantalla completa (mobile)
- Filtro por vector dentro del drawer: mostrar solo proposiciones TM / PAT / MES
- Cerrar con botón o gesto de swipe
- Enlace a "Ver metodología completa" → página Método

### Comportamiento de caveats
Nota fija al pie del drawer:
```
Los extractos son evidencia del registro retórico de mensajes formales.
No describen el gobierno. El discurso y la política son dimensiones separables.
```

Para documentos con flags activos: indicador visual y nota al inicio del drawer:
```
Este documento tiene un flag de revisión activo. Ver Método para el detalle.
```

### Comportamiento mobile
Overlay de pantalla completa con scroll vertical. El filtro por vector está en la barra superior del overlay.

### Estados bloqueados / diferidos
Si el case packet de un actor no está disponible (lo cual no es el caso actual para ningún actor HCDN con corpus), el drawer mostraría un estado bloqueado con explicación.

Para Perón: el drawer no se abre desde el carril de Perón con scores comparables a HCDN. Si se muestran proposiciones de los documentos Perón 1946 / 1954, van en un drawer separado con encabezado explícito de separación metodológica y nota de no comparabilidad.

---

## 12. Caveat badge system (C09)

### Propósito
Sistema transversal de indicadores visuales de estado de evidencia. Los badges aparecen en todas las páginas donde hay contenido empírico. Son el mecanismo principal para que el sitio preserve la diferencia entre evidencia robusta y evidencia provisional sin requerir que el usuario lea el texto metodológico completo.

### Ubicación en páginas
Todas las páginas con contenido empírico. Se aplica a: tarjetas de actor (C06), puntos de timeline (C07), family cards (C05), carril de Perón (C10), roadmap tracker (C11).

### Principio de display
Los badges son visibles sin hover. Nunca se ocultan detrás de un tooltip que requiera acción del usuario para mostrar. En pantallas pequeñas, los badges se comprimen a íconos con etiqueta accesible (no desaparecen).

---

### Definición de cada badge

**Badge 1 — CANÓNICO**
- Etiqueta: `CANÓNICO`
- Significado: afirmación derivada directamente de la síntesis canónica (`UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md`) y/o del CSV co-canónico (`UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv`). No infiere más allá de lo que dicen las fuentes.
- Dónde se muestra: junto a afirmaciones estadísticas del corpus (ej. "86% díada tec/pat"); en el encabezado de la tabla de distribución de configuraciones.
- Efecto bloqueante: ninguno.

**Badge 2 — PROVISIONAL**
- Etiqueta: `HIPÓTESIS PROVISIONAL`
- Significado: perfil de actor o proposición interpretiva derivada del corpus. Es la convención metodológica estándar del proyecto. Provisional no significa débil — un perfil con n=11 y caution=low es robusto y sigue siendo provisional.
- Dónde se muestra: en cada tarjeta de actor (C06), siempre visible en el encabezado; en cada perfil cualquiera sea su tier.
- Efecto bloqueante: ninguno. El badge comunica status, no bloquea el contenido.

**Badge 3 — LOW-N**
- Etiqueta: `CORPUS INSUFICIENTE (n=X)`
- Significado: el corpus del actor tiene menos de cuatro documentos, lo que es estructuralmente insuficiente para un perfil de actor confirmado. Se aplica con n=1 (Rodríguez Saá), n=2 (Milei), n=3 (De la Rúa, Duhalde).
- Dónde se muestra: tarjeta de actor (C06), junto al campo de corpus; timeline (C07), en la nota de header.
- Efecto bloqueante: ninguna afirmación de tipo de actor puede presentarse sin este badge para los actores con n<4. El badge reemplaza cualquier conclusión de tipo fijo.
- Texto adicional para Milei: "Requiere n≥4 para evaluación de hipótesis de actor."
- Texto adicional para Rodríguez Saá: "n=1 — punto de datos del corpus, no perfil de actor."

**Badge 4 — REVISIÓN SOLAMENTE**
- Etiqueta: `SOLO REFERENCIA — NO CITADO COMO EVIDENCIA`
- Significado: el documento o artefacto existe pero está marcado como no-canónico o como referencia de revisión, no como fuente de evidencia. Se aplica a: `CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` (síntesis en inglés con errores de período y configuración).
- Dónde se muestra: si se enlaza o menciona algún artefacto marcado como review-only.
- Efecto bloqueante: el artefacto no puede citarse como autoridad del proyecto. El badge debe aparecer antes del enlace.

**Badge 5 — BLOQUEADO**
- Etiqueta: `BLOQUEADO — EVIDENCIA NO DISPONIBLE`
- Significado: el contenido existe como categoría pero no tiene evidencia válida. Se aplica a: Perón 1973 (PERON_SRC_015 = discurso de Allende; el discurso real de Perón no está en ninguna pipeline activa).
- Dónde se muestra: card de Perón 1973 en C10 (Perón separated lane); cualquier referencia al discurso de Perón del 12 de octubre de 1973.
- Efecto bloqueante: ningún contenido analítico puede mostrarse para Perón 1973. El card existe, muestra el bloqueo, y enlaza al Roadmap con la precondición correspondiente.

**Badge 6 — NO COMPARABLE NUMÉRICAMENTE**
- Etiqueta: `NO COMPARABLE NUMÉRICAMENTE CON CORPUS HCDN`
- Significado: los datos de la PERON_ALT_PIPELINE (scores proposicionales MES/PAT/TEC de PERON_NB02) no están en la misma escala que los scores NB05 del corpus HCDN. No existe bridge note. Cualquier cifra de Perón que aparezca en pantalla lleva este badge.
- Dónde se muestra: en C10 (Perón separated lane), junto a cualquier dato numérico de Perón; en el header del carril de Perón; en el drawer de evidencia de Perón.
- Efecto bloqueante: ningún gráfico, tabla, o visualización puede colocar datos numéricos de Perón en la misma escala que datos de actores HCDN. El badge no es suficiente para autorizar esa comparación — la comparación está prohibida incluso con el badge.

**Badge 7 — METADATOS CORREGIDOS**
- Etiqueta: `PERFIL CORREGIDO — PENDIENTE VALIDACIÓN`
- Significado: el perfil del actor fue corregido mediante un patch de metadatos (patch v0_2, 2026-04-29). El perfil corregido es el válido; el perfil pre-corrección no tiene validez interpretativa. La corrección no ha sido validada por un re-run completo de la pipeline v1.
- Dónde se muestra: en la ficha de Macri y de Alberto Fernández, siempre visible en el encabezado.
- Efecto bloqueante: el perfil corregido no puede presentarse como definitivo. No puede compararse con el perfil pre-corrección.

**Badge 8 — FALLA DE FUENTE**
- Etiqueta: `FALLA DE FUENTE DOCUMENTADA`
- Significado: la fuente identificada para este contenido no contiene el material que debería contener. Se aplica a PERON_SRC_015 (contiene el discurso de Allende, no el de Perón).
- Dónde se muestra: card de Perón 1973 en C10; cualquier referencia a PERON_SRC_015.
- Efecto bloqueante: PERON_SRC_015 no puede usarse como fuente de ninguna afirmación sobre el discurso de Perón de 1973. El badge acompaña a la descripción del bloqueo, no reemplaza esa descripción.

**Badge 9 — HCDN SOLAMENTE**
- Etiqueta: `CORPUS HCDN — NO INCLUYE PERÓN`
- Significado: una estadística, tabla, o visualización se refiere exclusivamente al corpus HCDN 1983–2025 y no incluye datos de la PERON_ALT_PIPELINE.
- Dónde se muestra: junto a la tabla de distribución de configuraciones (§3.2 del MAPA); en el header del mapa democrático (C04); junto a cualquier afirmación que use el "86%" o cifras del corpus democrático.
- Efecto bloqueante: ninguno. Es informativo, no restrictivo.

**Badge 10 — FUENTE ALTERNATIVA PERÓN**
- Etiqueta: `PERON_ALT_PIPELINE — INSTRUMENTO DIFERENTE AL CORPUS HCDN`
- Significado: el contenido proviene de la pipeline alternativa de fuentes de Perón. El instrumento es diferente (conteo proposicional manual vs. calibración NB05). Sin bridge note. Los resultados son cualitativamente comparables mediante el marco conceptual compartido; numéricamente no son comparables.
- Dónde se muestra: en cualquier tarjeta, sección o dato que derive de la PERON_ALT_PIPELINE — 1946, 1954, o datos de PERON_NB02.
- Efecto bloqueante: el badge no autoriza comparación numérica. Solo señala la procedencia.

---

## 13. Perón separated lane (C10)

### Propósito
Presentar los datos de la PERON_ALT_PIPELINE —los dos documentos limpios de 1946 y 1954, el bloqueo de 1973— en un componente estructuralmente separado del mapa democrático HCDN. La separación no es editorial: es metodológica.

### Ubicación en páginas
- Mapa orbital — Sección 3 (bajo el mapa democrático, separada con divisor visual explícito)
- Actores/Perón — contenido principal de la página de Perón

### Datos de entrada
Datos de la PERON_ALT_PIPELINE. Fuente: `MAPA_ORBITAL_ARGENTINO_v0_1.md §6` · `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` (filas PERON_1946, PERON_1954, PERON_1973_BLOQUEADA).

### Divisor de separación metodológica
El componente abre siempre con un separador visual explícito y texto de encabezado:
```
PERÓN 1946–1954 — Pipeline alternativa de fuentes
Instrumento diferente al corpus HCDN.
Los datos no son comparables numéricamente con los actores democráticos.
No existe nota puente entre las dos pipelines.
```

Badge `PERON_ALT_PIPELINE — INSTRUMENTO DIFERENTE AL CORPUS HCDN` visible en el encabezado del carril.

### Lógica de display

**Tres cards en el carril:**

**Card 1 — Perón 1946 (asunción inaugural, 4 jun 1946)**
- Fuente: PERON_SRC_003 (BLQ-02b + micro-review BCN cross-reference)
- Corpus: 45 segmentos A_segmentable; 5.072 palabras limpias; 2.80% incertidumbre OCR
- Status: `usable_one_document_hypothesis`
- Jerarquía vectorial: MES > PAT > TEC (MES=82 / PAT=64 / TEC=63 — conteos proposicionales PERON_NB02)
- Descripción de fase: ruptura fundacional; mesianismo de discontinuidad histórica consumada; paternalismo promisorio (justicia social debida); tecnocracia como mandato activo de reconstrucción (Consejo Nacional de Posguerra, industrialización, planificación hidráulica). Los tres vectores co-iguales como secundarios: PAT=64 y TEC=63.
- Caveat en card: badge `NO COMPARABLE NUMÉRICAMENTE CON CORPUS HCDN` + badge `FUENTE ALTERNATIVA PERÓN`
- Nota metodológica: "Los scores son conteos de patrones proposicionales, no scores calibrados NB05. No tienen escala común con los avg_tec/avg_pat/avg_mes del corpus democrático."

**Card 2 — Perón 1954 (apertura anual, 19 may 1954)**
- Fuente: PERON_SRC_013 (BLQ-02a + micro-review + BLQ-03)
- Corpus: 90 segmentos de prosa; 4.621 palabras limpias; 2.16% incertidumbre OCR
- Status: `usable_one_document_hypothesis`
- Jerarquía vectorial: MES > PAT > TEC (MES=122 / PAT=110 / TEC=54 — conteos PERON_NB02)
- Descripción de fase: consolidación providencial-doctrinal; mesianismo de consagración (las tres banderas como trívium mesiánico, Providencia como legitimadora); paternalismo organizado (pueblo como fuerza social estructurada, no receptor de programa); tecnocracia como aparato asumido (independencia económica como doctrina, no proyecto).
- Hallazgo de contraste: TEC es el único vector cuyo score absoluto decrece entre 1946 y 1954 (63→54, Δ=−9) a pesar de que el corpus 1954 tiene el doble de segmentos. El mean/seg de TEC cae de 1.40 a 0.60 — la mayor caída normalizada. Este es el hallazgo más analíticamente robusto del contraste de fase.
- Caveat en card: badge `NO COMPARABLE NUMÉRICAMENTE CON CORPUS HCDN` + badge `FUENTE ALTERNATIVA PERÓN`

**Card 3 — Perón 1973 (BLOQUEADO)**
- Fecha: 12 de octubre de 1973
- Estado: `exclude_from_propositional_review` — BLQ-02c (2026-04-30)
- Razón del bloqueo: PERON_SRC_015 contiene el Diario de Sesiones de la Asamblea Legislativa del 12 de octubre de 1973. El archivo contiene: lista de delegaciones extranjeras (~100 países); el discurso del Dr. José Antonio Allende (presidente de la Asamblea) dirigido a Perón en segunda persona; y el juramento constitucional de Perón (~60 palabras de fórmula legal fija). El discurso inaugural real de Perón fue pronunciado desde el balcón de la Casa Rosada y no está en ese registro.
- Display: card con badge `BLOQUEADO — EVIDENCIA NO DISPONIBLE` + badge `FALLA DE FUENTE DOCUMENTADA`. Sin contenido analítico. Con texto explícito del bloqueo y enlace al Roadmap (Precondición 1).
- Contenido del card bloqueado: "El discurso existe históricamente. El archivo identificado no lo contiene. Adquirir una fuente verificada es la primera precondición para el mapa v1."

### Hipótesis de dos fases (texto de carril)
Bajo los tres cards, el carril muestra la hipótesis derivable de los dos documentos disponibles:
- La jerarquía vectorial MES > PAT > TEC se mantiene estable en ambos documentos (dos géneros distintos, ocho años de distancia).
- El contenido interno de cada vector se desplaza entre fases: ruptura fundacional → consagración providencial; tutela promisoria → pueblo organizado; construcción institucional activa → aparato asumido.
- Esta hipótesis requiere el tercer documento (1973) para evaluarse. Sin ese documento, Perón permanece como contraste de dos fases, no como perfil de actor.

Aviso fijo bajo la hipótesis:
```
Sin la nota puente entre la PERON_ALT_PIPELINE y el corpus HCDN,
no es posible comparar numéricamente a Perón con los actores democráticos.
Esta sección ofrece comparación cualitativa a través del marco conceptual compartido.
```

### Interacciones del usuario
- Clic en card 1 o 2 → expande descripción de fase
- Clic en card 3 (bloqueado) → muestra descripción del bloqueo y enlace al Roadmap
- Enlace en encabezado: "¿Por qué una pipeline separada?" → página Evidencia o Método, sección PERON_ALT_PIPELINE

### Comportamiento de caveats
El badge `NO COMPARABLE NUMÉRICAMENTE` y el encabezado de separación son visibles sin expansión. El carril completo está enmarcado visualmente como metodológicamente distinto del mapa democrático.

### Comportamiento mobile
Los tres cards se apilan verticalmente. El separador de encabezado y el badge de pipeline alternativa se muestran antes del primer card.

### Estados bloqueados / diferidos
El card de 1973 es permanentemente bloqueado hasta que se adquiera y verifique una fuente alternativa. Si en el futuro se produce la bridge note, el carril de Perón se integraría al mapa orbital completo — ese es el mapa v1, no una actualización de este componente.

---

## 14. V1 roadmap tracker (C11)

### Propósito
Comunicar transparentemente el estado actual de las precondiciones para el mapa orbital v1. El tracker no es una promesa de entrega: es una declaración honesta de lo que falta y por qué.

### Ubicación en páginas
Página Roadmap — contenido principal. También puede aparecer como componente condensado en el footer o en la página de Método.

### Datos de entrada
Las siete precondiciones. Fuente: `MAPA_ORBITAL_ARGENTINO_v0_1.md §9`.

### Siete condiciones con estado

| # | Condición | Estado actual |
|---|-----------|--------------|
| P1 | Fuente verificada del discurso de Perón del 12 de octubre de 1973 | PENDIENTE — PERON_SRC_015 retirado; PERON_SRC_020 no adquirido |
| P2 | Procesamiento de esa fuente con controles BLQ equivalentes a 1946 y 1954 | PENDIENTE — depende de P1 |
| P3 | Perfil tri-documento de Perón (PERON_NB04: 1946 + 1954 + 1973) | PENDIENTE — depende de P2 |
| P4 | Nota puente formal entre PERON_ALT_PIPELINE y corpus HCDN | PENDIENTE — depende de P3 |
| P5 | Corpus Milei ampliado a n≥4 (inaugural dic. 2023 + apertura 2026) | PENDIENTE — n=2 actual |
| P6 | Decisión sobre re-run completo de pipeline HCDN v1 | PENDIENTE — sin prerrequisito bloqueante |
| P7 | Producción de `MAPA_ORBITAL_ARGENTINO_v1.md` | BLOQUEADO — depende de P1–P6 |

**Texto explicativo por condición:**

P1: "El discurso existe históricamente — fue pronunciado desde el balcón de la Casa Rosada el 12 de octubre de 1973 y fue transmitido y cubierto por los medios. El problema es de fuente, no de existencia. La fuente identificada (PERON_SRC_015) contiene el discurso de otra persona. Fuentes prioritarias: BCN — Mensajes presidenciales; La Nación 13-10-1973; Archivo histórico de Casa Rosada."

P2: "Una vez adquirida la fuente, debe pasar los mismos controles de calidad que las fuentes de 1946 y 1954: extracción, limpieza, micro-revisión con cross-reference, segmentación, revisión proposicional."

P3: "Con tres documentos procesados (1946 fundación, 1954 consolidación, 1973 retorno), puede producirse el perfil tri-documento mínimo para una caracterización de actor Perón."

P4: "La bridge note cubre: alineación metodológica entre pipelines, calibración cruzada del registro de patrones, controles de género (asunciones vs. asunciones), y documentación explícita de condiciones y límites de comparabilidad. Sin esta nota, Perón y los actores democráticos no pueden aparecer en la misma escala numérica."

P5: "El inaugural de diciembre 2023 está posiblemente ausente del corpus NB08. La apertura de 2026 estará disponible al inicio del período legislativo. Con n≥4, la hipótesis tec+mes como configuración de actor puede evaluarse."

P6: "La corrección del perfil de Macri fue aplicada mediante patch. Un re-run completo produciría agregaciones validadas para todos los actores, no solo los afectados por la corrección. No tiene prerrequisito bloqueante."

P7: "Solo cuando P1–P6 estén satisfechas será posible producir el mapa integrado que incluya a Perón y al corpus democrático en el mismo marco interpretativo controlado."

### Lógica de display
Cada condición se muestra como un ítem de lista con:
- Estado visual (PENDIENTE / BLOQUEADO / ✓ COMPLETADO)
- Texto de condición
- Dependencias (P2 depende de P1; P3 depende de P2; P4 depende de P3)
- Texto explicativo expandible

**Nota de apertura:**
```
Este roadmap es una declaración honesta del estado del corpus, no una promesa de entrega.
Las condiciones son técnicas, no editoriales. Cada una tiene una razón específica.
```

### Interacciones del usuario
- Clic en condición → expande texto explicativo
- Las condiciones que dependen de otra están visualmente encadenadas (P2 depende de P1, etc.)

### Comportamiento de caveats
El tracker es en sí mismo un instrumento de transparencia. No requiere caveats adicionales más allá de la nota de apertura.

### Comportamiento mobile
Lista vertical con íconos de estado. El texto expandible funciona como accordion.

### Estados bloqueados / diferidos
Cuando una condición se complete, su estado cambia a ✓ COMPLETADO. El tracker puede actualizarse por condición sin esperar al mapa v1 completo.

---

## 15. Game/simulator bridge panel (C12)

### Propósito
Explicar cómo el marco analítico de tres cuerpos se traduce a mecánicas de juego. Este componente no es un prototipo de juego. Es el puente conceptual entre el sitio analítico y el prototipo lúdico que existe en `videogame/tres_cuerpos_v8/`.

### Ubicación en páginas
Juego / simulador — contenido principal de la página.

### Datos de entrada
Conceptual. No consume datos del corpus directamente. Los ejemplos que usa derivan del MAPA y del copy deck, pero el componente no es un display de datos empíricos.

### Lógica de display

**Cuatro marcos de traducción:**

**Marco 1 — Vectores como fuerzas políticas**
Texto: "En el análisis, los tres vectores son registros retóricos que el discurso activa en distintas proporciones. En el juego, son fuerzas políticas que el jugador puede movilizar, reforzar o contrarrestar. No son ideologías ni partidos. Son recursos disponibles en el campo político que cualquier actor puede combinar."
- Representación visual: triángulo de fuerzas (reutiliza el diagrama conceptual de C03 con variante interactiva)
- No hay mecánica de juego todavía — solo descripción del principio de diseño

**Marco 2 — Configuraciones como atractores**
Texto: "Una configuración orbital no es un estado fijo: es un atractor. El discurso tiende a ese equilibrio bajo determinadas condiciones, con una resistencia al cambio que varía por actor y por período. En el juego, el atractor puede representarse como gravedad discursiva: el esfuerzo para cambiar de configuración es mayor cuando el atractor es fuerte."
- Ejemplo: Menem 1992, pat=70.362 sobre total 98.679 — atractor muy fuerte; cambiar ese equilibrio tiene un costo alto.
- Nota: la referencia al score de Menem es solo para ilustrar la mecánica; el componente no pone scores en pantalla como dato en sí mismo.

**Marco 3 — Crisis como eventos de redistribución de masas**
Texto: "Los tres momentos del corpus democrático donde el mesianismo emerge como vector primario —Alfonsín 1989, Rodríguez Saá 2001, Duhalde 2002— tienen en común la ruptura institucional aguda. En el juego, las crisis son eventos que redistribuyen la masa relativa de los tres cuerpos. Una crisis hiperinflacionaria aumenta la gravedad del mesianismo."
- Principio de diseño: las crisis no activan vectores arbitrariamente; activan vectores que el corpus muestra activados en contextos análogos.

**Marco 4 — Actores como trayectorias, no como tipos**
Texto: "Ningún actor del corpus tiene un tipo fijo. En el juego, los actores históricos son trayectorias con atractores propios. Un actor que históricamente operó en registro paternalista tiene mayor facilidad para activar ese registro, pero no está bloqueado en él. Las circunstancias mueven la trayectoria."
- Referencia: Alfonsín como ejemplo de máxima inestabilidad (5 transiciones en 8 documentos); Menem como ejemplo de atractor fuerte.

**Enlace al prototipo:**
Panel al pie: "El prototipo de juego existe en `videogame/tres_cuerpos_v8/`. Esta sección del sitio es el framing conceptual previo a la experiencia lúdica."

### Interacciones del usuario
- Clic en marco → expande descripción completa
- Enlace al prototipo → abre o enlaza al juego (comportamiento a definir en implementación)

### Comportamiento de caveats
Nota visible antes de los marcos:
```
Esta sección describe principios de diseño del juego, no hipótesis empíricas.
Los ejemplos mencionados derivan del corpus. Las mecánicas no están implementadas aún.
```

### Comportamiento mobile
Los cuatro marcos se apilan verticalmente. El enlace al prototipo aparece como CTA al final.

### Estados bloqueados / diferidos
El componente no tiene dependencias de datos bloqueados. Si el prototipo de juego no está disponible públicamente, el enlace muestra el estado correspondiente (disponible / no disponible).

---

## 15b. Whitepaper article layout (C13) ← v0.1 addition

### Propósito
Presentar el argumento central en formato de artículo largo. Acceso al whitepaper como documento estructurado con tabla de contenidos, secciones expandibles y caveats visibles.

### Ubicación en páginas
- P10 (Whitepaper)

### Datos de entrada
- `site_meta.whitepaper_status` — estado del documento
- Estructura estática de secciones (no proviene de JSON; hardcoded en la primera versión)

### Lógica de display

**Encabezado del artículo:**
- Título del whitepaper
- Subtítulo / descripción del argumento
- Badge `PROVISIONAL` + nota de estado siempre visible
- Abstract (texto fijo)

**Tabla de contenidos:**
- Lista numerada de las 12 secciones
- Links de ancla a cada sección en la página
- Secciones en desarrollo marcadas con `[en desarrollo]`

**Cuerpo del artículo:**
- Una sección `<article>` por capítulo numerado
- Secciones completas: texto + caveats embebidos
- Secciones en desarrollo: placeholder con referencia a la fuente canónica
- Figuras embebidas donde corresponda (con `figure` + `figcaption`)

**Caveats:**
- Banner de caveat siempre visible en el encabezado del artículo
- Cada afirmación empírica lleva referencia a la fuente (NB10, MAPA §n, etc.)
- Las secciones con datos provisionales llevan badge `PROVISIONAL`

### Comportamiento mobile
- Tabla de contenidos colapsa en acordeón en mobile
- Secciones del artículo mantienen texto completo (no se truncan)
- Figuras embebidas en `max-width: 100%`

### Estados
- `completo`: sección con texto redactado y caveats
- `en_desarrollo`: sección con placeholder y referencia a fuente
- `bloqueado`: sección que requiere datos no disponibles (e.g., Perón 1973)

### Restricciones
- No introduce análisis nuevos — solo afirmaciones ya en las fuentes canónicas
- Perón no se compara numéricamente con HCDN
- No existen tipos finales de actor en ninguna sección

---

## 15c. Figures gallery (C14) ← v0.1 addition

### Propósito
Galería de figuras empíricas para acceso visual a la evidencia. Presenta las figuras promovidas de los notebooks como tarjetas con metadatos y caveats.

### Ubicación en páginas
- P11 (Figuras)

### Datos de entrada
No proviene de JSON — las figuras son referenciadas como assets estáticos.

| Campo | Descripción |
|-------|-------------|
| `figure_id` | Identificador de la figura (e.g., `NB10_config_dist`) |
| `title` | Título legible |
| `src` | Ruta relativa al archivo PNG |
| `source_notebook` | NB07 / NB08 / NB10 |
| `status` | `promoted` / `exploratory` / `blocked` |
| `caption` | Descripción de la figura |
| `caveat` | Texto de advertencia metodológica |
| `alt_text` | Texto alternativo accesible |

### Lógica de display

**Layout de la galería:**
- Grid responsivo: 2 columnas en desktop, 1 en mobile
- Cada figura como tarjeta con: imagen + título + source_notebook + status badge + caption expandible

**Figura card (estado `promoted`):**
- Imagen en `<img>` con `alt` atribuido
- Badge `PROVISIONAL` siempre visible
- Caption visible por defecto
- Caveat en acordeón expandible

**Figura card (estado `blocked`):**
- Placeholder con símbolo de bloqueo (no imagen)
- Badge `BLOQUEADO`
- Texto de razón del bloqueo visible sin hover
- Enlace a `#roadmap`

**Agrupación:**
- Categorías: Corpus democrático · Perfiles de actor · Configuraciones · Transiciones · Perón · Roadmap/caveats
- Header de categoría con separador visual

### Restricciones
- Ninguna figura mezcla datos HCDN y Perón en la misma escala visual
- Figuras de NB07/NB08 marcadas como versiones anteriores al NB10
- No se crean figuras nuevas para el prototipo — solo se referencian las existentes

### Comportamiento mobile
- Grid de 2 columnas → 1 columna en mobile
- Imágenes en `max-width: 100%`, `height: auto`
- Caption siempre visible en mobile (no colapsa)

---

## 16. Accesibilidad y comportamiento mobile

Estas especificaciones aplican a todos los componentes del sitio.

**Texto primero, visual como refuerzo.** Todo componente debe ser completamente comprensible sin assets visuales: si la imagen, el diagrama o el gráfico no cargan, el texto debe transmitir la misma información. Las tablas de datos (distribución de configuraciones, actor map) tienen equivalentes en texto estructurado como alternativa.

**Tablas convertibles a tarjetas.** En viewports mobile, las tablas con más de tres columnas se convierten automáticamente a tarjetas apiladas. Cada tarjeta preserva todos los campos de la tabla. Ningún campo se descarta en la conversión mobile — solo se reorganiza su layout.

**Caveats visibles sin hover.** En mobile no existe hover. Todos los badges y caveats deben estar visibles con tap o sin ninguna acción del usuario. Un badge que solo se muestra al hacer hover en desktop no tiene equivalente válido en mobile. La regla: si el caveat requiere una acción para verse, no cumple con el principio de "caveats visibles por defecto."

**Sin significado exclusivamente por color.** Ningún badge, estado (PENDIENTE / BLOQUEADO / COMPLETADO), o indicador de nivel de cautela (LOW / MEDIUM / HIGH) usa solo el color para comunicar su significado. Cada indicador usa texto o icono además del color. Esto garantiza legibilidad para usuarios con daltonismo y para displays monocromáticos.

**Tarjetas de actor comprimidas en mobile.** En el mapa democrático (C04) y en la grilla de actores, las tarjetas en mobile muestran: nombre del actor, período, configuración modal, badge de cautela, badge de tier. Los campos secundarios (n docs, transiciones) se muestran al expandir. El badge "Hipótesis provisional" permanece visible en la versión comprimida.

**Drawer de evidencia (C08) en mobile.** En mobile se presenta como overlay de pantalla completa. El swipe para cerrar no debe confundirse con el scroll interno del drawer. El botón de cierre está en la esquina superior de fácil alcance con pulgar.

---

## 17. Lo que deliberadamente no se construye en v0.1

**Simulación de física real.** El modelo de tres cuerpos es una metáfora analítica, no una simulación newtoniana. El sitio no intenta animar órbitas, calcular trayectorias en tiempo real, ni modelar interacciones gravitacionales entre los vectores. Cualquier diagrama es conceptual y estático (o con animación muy limitada de presentación).

**Comparación numérica Perón–HCDN.** No existe ningún componente — gráfico, tabla, slider, escala compartida — que coloque datos numéricos de Perón (PERON_NB02) junto a datos del corpus HCDN (NB05) en la misma representación visual. Esta prohibición no se resuelve con disclaimers: la comparación no se hace.

**Clasificador automático de actores.** El sitio no tiene ninguna interfaz de tipo "qué actor eres tú" ni ningún mecanismo que clasifique actores en tipos fijos. La tesis del proyecto es que los actores son trayectorias, no tipos. Un clasificador violaría esa tesis.

**Card de Perón 1973 con contenido analítico.** El card de Perón 1973 existe en el carril de Perón (C10) y muestra el estado del bloqueo. No muestra análisis, interpretaciones ni estimaciones sobre qué podría mostrar ese discurso. El discurso existe históricamente; no está en ninguna pipeline activa; ninguna inferencia sobre ese momento aparece en el sitio.

**Afirmaciones causales automatizadas.** El sitio no hace afirmaciones del tipo "el gobierno X produjo la configuración Y porque [causa]." El corpus mide el registro retórico de los discursos formales. No mide la orientación política de los gobiernos ni la relación entre discurso y política. Ningún componente presenta inferencias causales como si fueran resultados del análisis.

---

## 18. Próximo paso

**`web/DATA_CONTRACT_v0_1.md`**

Esta especificación define qué datos necesitan los componentes y qué campos tienen. El contrato de datos define la estructura exacta de los objetos que el sitio consume: actor, configuración, documento, extracto de evidencia, caveat. Derivado directamente de `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` y los CSVs promovidos de NB08–NB10.

El contrato de datos es la interfaz entre la evidencia empírica y la implementación frontend. Sin él, el prototipo estático puede construirse pero no puede conectarse a datos reales sin refactorización.

Los componentes que más dependen del contrato de datos:
- C04 (Democratic actor map) — necesita el objeto `actor` completo con todos los campos del CSV
- C06 (Actor profile card) — necesita el objeto `actor` más el objeto `caveat` por actor
- C07 (Actor timeline) — necesita el objeto `document` con año, tipo, configuración, attractor, flags
- C08 (Evidence drawer) — necesita el objeto `evidence_excerpt` con texto, vector, patrón, fuente, caveat
- C10 (Perón separated lane) — necesita el objeto `peron_document` con separación explícita de pipeline

---

*Producido en el marco del proyecto El problema de los tres cuerpos argentinos. Esta especificación deriva de evidencia provisional. El sitio que implemente estos componentes debe preservar todos los caveats documentados en `MAPA_ORBITAL_ARGENTINO_v0_1.md §8` y en `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` (columna `required_caveat`). Los datos numéricos de la PERON_ALT_PIPELINE no pueden colocarse en la misma escala visual que los datos del corpus HCDN en ningún componente. Los perfiles de actor son hipótesis provisionales en todos los casos.*
