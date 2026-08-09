# SÍNTESIS INTERPRETIVA UNIFICADA DEL CORPUS LIMPIO v0.1

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** síntesis provisional — no es clasificación histórica definitiva
**Lineages:** HCDN_PROMOTED_LAYER · PERON_ALT_PIPELINE
**Fuentes primarias:** MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1 · NB10_interpretive_synthesis_democracy_1983_2025_v0_1 · PERON_INTERIM_MEMO_1946_1954_v0_1 · PERON_NB03_1946_1954_PHASE_CONTRAST_v0_1 · PERON_NB02_1946 · PERON_NB02_1954 · PERON_1973_SOURCE_FAILURE_NOTE_v0_1 · UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv

---

## 1. Estatuto del documento

Este documento es la primera síntesis interpretiva unificada de toda la evidencia actualmente limpia del proyecto *El problema de los tres cuerpos argentinos*. Reúne en un marco controlado los hallazgos del corpus presidencial HCDN 1983–2025 con los dos documentos limpios de la pipeline alternativa de fuentes de Perón (1946 y 1954).

**Lo que este documento es:**
- Una síntesis comparativa de la evidencia limpia disponible, organizada por unidades de caso y niveles de comparabilidad
- Una lectura cualitativa de qué sugieren los datos sobre el modelo de tres cuerpos en el discurso presidencial argentino
- Un conjunto de hipótesis provisionales con sustento empírico explícito y con sus limitaciones articuladas

**Lo que este documento no es:**
- Un nuevo ejercicio de scoring, calibración o clasificación
- Una clasificación histórica definitiva de ningún actor
- Un puente numérico entre la PERON_ALT_PIPELINE y el corpus HCDN (ese puente no existe todavía)
- Un documento que incluya el discurso de Perón 1973 como evidencia (esa fuente está bloqueada)

**Convención de hipótesis:** todas las proposiciones interpretivas en este documento se enuncian en registro provisional. El lector debe leer "el corpus sugiere X" y "la hipótesis es X" como afirmaciones revisables, no como hallazgos cerrados. Los prefijos *H1, H2, …* marcan hipótesis identificadas como objetivos de investigación futura.

---

## 2. Qué cuenta como evidencia limpia

La evidencia que informa esta síntesis se divide en dos cuerpos distintos, gobernados por reglas de linaje diferentes.

### 2.1 Corpus democrático HCDN 1983–2025 (HCDN_PROMOTED_LAYER)

La capa canónica promovida del corpus presidencial HCDN constituye la fuente de autoridad para el período democrático. Sus outputs son calibrados, controlados por calidad OCR, y promovidos mediante el script 07. Los materiales relevantes para esta síntesis son:

- **NB05 — scores calibrados:** vectores tec/pat/mes por documento (calibración: TM×1.00, TCM×0.50, AGN×0.00). 51 documentos del período democrático 1983–2025, 10 actores.
- **NB08 — perfiles de actor democráticos:** configuraciones dos-cuerpos dirigidas, niveles de cautela, transiciones.
- **NB09 — paquetes de caso cualitativos:** cinco actores prioritarios (CFK, Menem, Alfonsín, Macri, Milei).
- **NB10 — síntesis interpretiva:** matriz de actor, mapa de configuraciones, hipótesis controladas.
- **Corrección de metadatos Macri 2019 (2026-04-29):** `Mensaje Presidencial 2019.txt` re-atribuido a Alberto Fernández. Todos los perfiles de actor en esta síntesis reflejan esa corrección.
- **Resolución de la cola de revisión manual (2026-04-29):** 8 documentos activamente flagueados revisados y resueltos como `cleared_provisional`. Ningún documento excluido.

### 2.2 Documentos limpios de Perón (PERON_ALT_PIPELINE)

La pipeline alternativa de fuentes de Perón produjo dos documentos con status `usable_one_document_hypothesis` y un contraste de fase entre ellos:

- **PERON_SRC_003 — asunción inaugural, 4 jun 1946:** BLQ-02b (extracción y descolumnización) + micro-review con cross-reference BCN dossier 151. Output: 45 segmentos A_segmentable, 5.072 palabras limpias, 2.80% incertidumbre. Status: `usable_one_document_hypothesis`.
- **PERON_SRC_013 — apertura anual, 19 may 1954:** BLQ-02a (extracción y descolumnización) + micro-review + BLQ-03 (limpieza solo-prosa). Output: 90 segmentos de prosa, 4.621 palabras limpias, 2.16% incertidumbre. Status: `usable_one_document_hypothesis`.
- **PERON_NB03 — contraste de fase 1946 vs 1954:** hipótesis de dos documentos: `mesianismo+paternalismo` como configuración dirigida repetida en ambos discursos. TEC terciario pero persistente.

### 2.3 Excluido de la evidencia limpia

**Perón 1973.** PERON_SRC_015, identificado inicialmente como la asunción del 12 de octubre de 1973, fue reclasificado `exclude_from_propositional_review` (BLQ-02c, 2026-04-30). El archivo es el Diario de Sesiones de la Asamblea Legislativa de esa fecha. Contiene el discurso del Dr. José Antonio Allende (presidente de la Asamblea) dirigido a Perón, y el juramento constitucional de Perón (~60 palabras de fórmula legal fija). El discurso inaugural de Perón fue pronunciado desde el balcón de la Casa Rosada y no está registrado en ese Diario de Sesiones. **No hay evidencia del discurso de Perón de 1973 en ninguna pipeline activa.**

El archivo limpio producido por BLQ-02c está preservado con header CRITICAL para constancia. No debe avanzar a NB01. Ninguna interpretación de este documento se incluye en esta síntesis.

Quedan excluidos también: outputs NB02–NB04 precalibración del corpus HCDN; texto OCR crudo; fuentes de calidad C_USABLE_WITH_CAUTION o inferior en la PERON_ALT_PIPELINE; y los fragmentos piloto del corpus PILOT_FRAGMENT_CORPUS, que son una línea metodológicamente independiente no comparable a outputs de nivel-documento.

---

## 3. Regla puente

Perón está incluido en esta síntesis como unidad de caso cualitativa, comparado con el corpus HCDN **únicamente a través del modelo teórico compartido**, no a través de scores numéricos.

Esta limitación es metodológica, no provisional:

1. **Instrumentos distintos.** La pipeline HCDN aplica vectores TM/TCM/AGN calibrados sobre texto analysis-ready completo y produce scores documentales. La PERON_ALT_PIPELINE aplica patrones proposicionales sobre segmentos manualmente extraídos y revisados de documentos con layout de dos columnas de Diario de Sesiones. Los resultados no están en la misma escala.

2. **Sin calibración común.** El calibrado HCDN fue desarrollado y validado para el corpus democrático 1983–2025. Aplicarlo al discurso de 1946–1954 no tiene base metodológica establecida.

3. **Sin bridge note.** Las condiciones de bridge establecidas en el plan de la PERON_ALT_PIPELINE —perfil tri-documento completo, revisión de alineación metodológica, calibración del registro de patrones, nota de comparabilidad explícita— no han sido producidas. La bridge note no puede anticiparse desde una evidencia de dos documentos.

**Lo que sí es legítimo:** observar que ambos cuerpos de evidencia iluminan los mismos tres vectores del marco conceptual —tecnocracia, paternalismo, mesianismo— y comparar cualitativamente qué configuraciones sugieren, con qué registro, y en qué contextos. Eso es lo que hace esta síntesis. No se hacen afirmaciones del tipo "Perón tiene score X veces mayor que el actor Y" ni se colocan scores de ambas pipelines en la misma tabla comparativa.

---

## 4. Matriz unificada de unidades de caso (tabla compacta)

La tabla siguiente presenta las unidades de caso centrales. La matriz completa con todos los campos está en `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv`.

| Unidad de caso | Actor | Período | Corpus | Configuración (hipótesis) | Fortaleza interpretativa | Cautela | Tier |
|----------------|-------|---------|--------|--------------------------|------------------------|---------|------|
| PERON_1946_ASUNCION | Juan Domingo Perón | 1946 | PERON_ALT_PIPELINE | mesianismo+paternalismo (TEC terciario) | usable_one_doc (45 segs A / MES=82) | alto | TIER_2 |
| PERON_1954_APERTURA | Juan Domingo Perón | 1954 | PERON_ALT_PIPELINE | mesianismo+paternalismo (TEC terciario debilitado) | usable_one_doc (90 segs prosa / MES=122) | alto | TIER_2 |
| ALFONSIN_1983_1989 | Raúl Alfonsín | 1983–1989 | HCDN_PROMOTED_LAYER | sin modal estable — inestabilidad orbital (5 trans./8 docs) | provisional (8 docs / caution medium) | medio | TIER_1 |
| MENEM_1990_1999 | Carlos Menem | 1990–1999 | HCDN_PROMOTED_LAYER | paternalismo+tecnocracia (9/11 docs) | strong_provisional (11 docs / caution low) | bajo | TIER_1 |
| DELARUA_1999_2001 | Fernando de la Rúa | 1999–2001 | HCDN_PROMOTED_LAYER | paternalismo+tecnocracia; flip a tec+pat en 2001 | provisional (3 docs / caution medium) | medio | TIER_1 |
| DUHALDE_2002_2003 | Eduardo Duhalde | 2002–2003 | HCDN_PROMOTED_LAYER | paternalismo+mesianismo (inauguración); tec+pat (aperturas) | provisional (3 docs / caution medium) | medio | TIER_1 |
| KIRCHNER_2003_2007 | Néstor Kirchner | 2003–2007 | HCDN_PROMOTED_LAYER | paternalismo+tecnocracia (near-parity — mayor ambigüedad del corpus) | provisional (5 docs / caution medium / share_ambig=0.8) | medio | TIER_1 |
| CFK_2007_2015 | Cristina Fernández de Kirchner | 2007–2015 | HCDN_PROMOTED_LAYER | tec+pat (avg-level); pat+tec (modal 5/9 docs) | strong_provisional (9 docs / caution low / 6 strong attractors) | bajo | TIER_1 |
| MACRI_2015_2019 | Mauricio Macri | 2015–2019 | HCDN_PROMOTED_LAYER (corregido) | tecnocracia+paternalismo (3/5 docs gobierno activo) | provisional corregido (5 docs / caution medium / corrección patch v0_2) | medio | TIER_3 |
| ALBERTOF_2019_2022 | Alberto Fernández | 2019–2022 | HCDN_PROMOTED_LAYER (corregido) | paternalismo+tecnocracia (modal); near-parity a nivel actor | provisional alto (4 docs / caution high / share_ambig_nb05=1.0) | alto | TIER_3 |
| MILEI_2024_2025 | Javier Milei | 2024–2025 | HCDN_PROMOTED_LAYER | tecnocracia+mesianismo (ambos docs; fortaleza creciente) | provisional insuficiente (2 docs / caution medium) | medio | TIER_3 |
| RODRIGUEZSA_2001 | Adolfo Rodríguez Saá | dic 2001 | HCDN_PROMOTED_LAYER | paternalismo+mesianismo (1 doc — colapso institucional) | single_document (1 doc / caution high) | alto | TIER_3 |
| PERON_1973_ASUNCION_BLOQUEADA | Juan Domingo Perón | 1973 | PERON_ALT_PIPELINE | BLOQUEADO — Allende; no Perón | excluido (PERON_SRC_015 reclasificado) | BLOQUEADO | TIER_4 |

**Niveles de comparabilidad:**
- **TIER_1_HCDN_DEMOCRATIC_ACTOR_PROFILE:** perfiles de actor democráticos del corpus HCDN (NB10). Todos provienen de la misma pipeline calibrada. La variación entre actores Tier 1 es en calidad de corpus (n de documentos, nivel de cautela), no en metodología.
- **TIER_2_PERON_CLEAN_DOCUMENT_PHASE:** documentos limpios de Perón de la PERON_ALT_PIPELINE. Comparables entre sí; comparables *cualitativamente* pero no *numéricamente* con Tier 1.
- **TIER_3_PROVISIONAL_LOW_N:** actores HCDN con corpus pequeño (n≤2), caution alto, o perfil corregido pendiente de validación v1. La metodología es la misma que Tier 1 pero la robustez del corpus es menor.
- **TIER_4_REVIEW_ONLY_OR_BLOCKED:** casos no utilizables para síntesis interpretiva activa. Perón 1973 es el único caso actual en este tier.

---

## 5. Hallazgo comparativo principal

La evidencia limpia disponible sugiere que el discurso presidencial argentino no está organizado por un eje pendular único —populismo versus tecnocracia, Estado versus mercado, pueblo versus élite— sino por **combinaciones dirigidas y recurrentes de tres fuerzas**, cuyas jerarquías y contenidos varían con el actor, la fase política y el contexto de crisis.

El 86% de los 51 documentos del corpus democrático HCDN muestra una de las dos configuraciones del díada tec/pat (paternalismo+tecnocracia o tecnocracia+paternalismo). Esta cifra es transversal a presidentes de orígenes políticos y orientaciones gubernamentales radicalmente distintos: Menem y CFK; De la Rúa y Kirchner; Alfonsín y Macri. El díada tec/pat no es el sello de una corriente política — es el registro retórico dominante del presidencialismo democrático argentino en el período analizado.

El mesianismo no desaparece de ese corpus: aparece con intensidad en momentos de crisis institucional (Alfonsín 1989, Rodríguez Saá 2001, Duhalde 2002), como vector secundario elevado a lo largo del mandato alfonsinista, y —en el caso singular de Milei— como vector secundario sostenido con independencia de un contexto inaugural o de crisis.

Los dos documentos limpios de Perón muestran una configuración distinta al modo democrático: en ambos, el mesianismo lidera, el paternalismo es secundario, y la tecnocracia es terciaria pero nunca ausente. Si el díada tec/pat es el registro central de la democracia, la jerarquía MES > PAT > TEC es el registro de los dos discursos de Perón disponibles.

Este contraste es analíticamente sugestivo pero no cuantificable entre pipelines. Lo que el conjunto ilumina es que el modelo de tres cuerpos no predice un arreglo fijo: predice que las tres fuerzas operan en tensión y que sus jerarquías cambian con el contexto histórico. La evidencia limpia es consistente con esa predicción. No la confirma de manera definitiva.

---

## 6. Paternalismo + tecnocracia como configuración modal del discurso democrático

*Fuentes: NB10_interpretive_synthesis; MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1; NB08_democratic_actor_profiles.*

El corpus democrático HCDN 1983–2025 muestra una configuración modal robusta: el díada tec/pat concentra el 86% de los 51 documentos del período. La distribución es:

| Configuración | Documentos | Actores |
|--------------|------------|---------|
| paternalismo+tecnocracia | 25 (49%) | 7 |
| tecnocracia+paternalismo | 19 (37%) | 8 |
| tecnocracia+mesianismo | 3 (6%) | 2 |
| paternalismo+mesianismo | 2 (4%) | 2 |
| paternalismo+none | 1 (2%) | 1 |
| mesianismo+tecnocracia | 1 (2%) | 1 |

La persistencia del díada tec/pat no implica que sea una combinación aditiva o neutra. Las dos direcciones del díada —con paternalismo dominante o con tecnocracia dominante— son configuraciones propositivamente distintas: una prioriza el lenguaje de protección social, tutela estatal e interpelación al pueblo como sujeto de derecho; la otra prioriza el lenguaje de modernización técnico-administrativa, eficiencia de gestión y racionalización del Estado. Ambas conviven frecuentemente en el mismo discurso, pero con distinta jerarquía.

La calibración NB05 descuenta el lenguaje administrativo genérico (subtipo AGN, peso=0.00) y reduce el peso del lenguaje técnico-burocrático de catálogo (subtipo TCM, peso=0.50). La tecnocracia que permanece tras la calibración es, por tanto, propositivamente más significativa: incluye reforma institucional con orientación explícita, planificación económica, modernización de gestión como marco argumental. No es tecnocracia de procedimiento —es tecnocracia de programa.

Ningún actor con corpus múltiple escapa completamente al díada. La afirmación no es que todos los presidentes democráticos sean paternalistas o tecnocráticos en su gobierno: es que el **registro retórico disponible** para el discurso presidencial de apertura legislativa en ese período articula consistentemente esas dos fuerzas como co-presentes.

La distinción entre las dos orientaciones del díada tiene relevancia analítica. Menem opera en paternalismo+tecnocracia a lo largo de una década de reforma de mercado. Macri opera en tecnocracia+paternalismo con avg_mes mínimo (0.869). CFK muestra paternalismo como modal pero tecnocracia como promedio dominante —diferencia explicada por la excepcionalidad de un documento (2008, gap=38.408). Ninguno de estos perfiles es equivalente al otro, aunque todos compartan el díada.

**H1 (alta confianza empírica — Tier 1):** *paternalismo+tecnocracia es la configuración discursiva modal del presidencialismo democrático argentino en el período 1983–2025.* La modalidad se sostiene con un corpus de 51 documentos y 10 actores. No requiere refuerzo empírico inmediato, pero sí interpretación teórica sobre qué condiciones estructurales producen ese campo retórico disponible.

---

## 7. Perón 1946–1954 como articulación de mesianismo+paternalismo con desplazamientos de fase

*Fuentes: PERON_NB02_1946; PERON_NB02_1954; PERON_NB03_1946_1954_PHASE_CONTRAST_v0_1; PERON_INTERIM_MEMO_1946_1954_v0_1.*

Los dos documentos limpios de Perón muestran la misma jerarquía vectorial: **MES > PAT > TEC** en ambos discursos, a ocho años de distancia y en dos géneros distintos (asunción inaugural y apertura anual). El ranking es estable. El contenido de cada vector no lo es.

| Vector | Score 1946 | Score 1954 | Δ raw | Mean/seg 1946 | Mean/seg 1954 | Δ mean/seg |
|--------|-----------|-----------|-------|--------------|--------------|------------|
| mesianismo | 82 | 122 | +40 | 1.82 | 1.36 | −0.47 |
| paternalismo | 64 | 110 | +46 | 1.42 | 1.22 | −0.20 |
| tecnocracia | 63 | 54 | **−9** | 1.40 | 0.60 | **−0.80** |

*Nota metodológica: el corpus de 1954 tiene el doble de segmentos primarios (90 vs 45). Los scores raw son parcialmente dependientes del tamaño del corpus. El mean/seg es la métrica comparativa más defensible. TEC es el único vector cuyo score absoluto decrece a pesar del mayor corpus.*

### 7.1 La asunción de 1946: ruptura fundacional y mandato de reconstrucción

El mesianismo de 1946 es el de la **ruptura y la redención fundacional**: el derrumbe de la antigua farsa (2×), la voluntad popular como legitimidad histórica trascendente (3×), las fechas fundacionales 17 de octubre y 24 de febrero (2×), la serenidad salvadora y la Argentina como tierra de paz (3×). Perón no llega como administrador de un orden existente sino como vehículo de una discontinuidad histórica. El mandato es existencial, no burocrático.

El paternalismo de 1946 es **promisorio y tutelar**: justicia social que *se le adeudaba* a las masas trabajadoras, reforma social anunciada, tierra como instrumento de labor doctrinado, acceso educativo comprometido. La causa del pueblo constituye el vínculo inaugural entre Estado y pueblo. El programa social es anunciado y prometido —no aún ejecutado.

La tecnocracia de 1946 nombra un **mandato activo de reconstrucción**: normalidad constitucional como objetivo de gobierno, industrialización, planificación hidráulica y energética, recursos naturales como base programática del desarrollo, el Consejo Nacional de Posguerra como instrumento de planificación. El aparato de Estado está siendo construido; TEC nombra el canal de acción a través del cual la ruptura mesiánica toma forma institucional. En 1946, la tecnocracia no es infraestructura subordinada —es el instrumento del mandato fundacional.

### 7.2 La apertura de 1954: consolidación providencial-doctrinal y pueblo organizado

El mesianismo de 1954 es el de la **consolidación providencial-doctrinal**: las tres banderas como trívium mesiánico (7×), el peronismo como movimiento de salvación histórica (7×), la Providencia divina como legitimadora de la misión (4×), la gloria y eternidad como horizonte trascendente (4×). La ruptura fundacional de 1946 es ahora historia establecida. El reclamo mesiánico ya no anuncia una discontinuidad —la defiende y consagra. Perón en 1954 no declara una ruptura; narra su cumplimiento y convoca al pueblo a ser digno de lo ya logrado.

El paternalismo de 1954 ha pasado de tutela promisoria a **orden social organizado**: las organizaciones del pueblo como cuerpo social (10×), el pueblo organizado y con conciencia social (5×), gobernar *con* y *para* el pueblo (3×). El pueblo ya no es el receptor de un programa —es una fuerza social estructurada cuyas organizaciones el Estado coordina. La relación pueblo-Estado está codificada, no inaugurada.

La tecnocracia de 1954 es **aparato organizacional asumido**: independencia económica como doctrina sistémica (6×), estructuras orgánico-funcionales del Estado (2×). El mandato de reconstrucción de 1946 —el Consejo Nacional de Posguerra, la planificación hidráulica, el programa industrial— ha desaparecido del discurso. El aparato institucional que 1946 construyó mediante programas técnicos explícitos es, en 1954, un hecho de fondo. TEC contribuye al marco del discurso como doctrina organizacional —presente pero implícita, terciaria sin ser ausente.

### 7.3 El debilitamiento de TEC: el hallazgo más robusto del contraste de fase

TEC es el único vector cuyo score absoluto decrece entre 1946 y 1954 (63→54, Δ=−9) a pesar de que el corpus de 1954 tiene el doble de segmentos. El mean/seg de TEC cae de 1.40 a 0.60 —la mayor caída de cualquier vector en la métrica normalizada. Esta es la inferencia más analíticamente robusta del contraste de fase: la tecnocracia genuinamente se debilita en 1954, no solo relativamente sino en términos absolutos.

El contenido del debilitamiento es interpretable: el proyecto técnico explícito de 1946 —que construía instituciones— se convierte en el aparato asumido de 1954 —que opera instituciones. TEC no desaparece; cambia de registro. Pasa de mandato de construcción a doctrina de operación.

### 7.4 Hipótesis de dos documentos

**H2 (provisional — dos documentos, Tier 2):** *Perón puede importar para el marco no como un tipo proposicional fijo sino como una articulación de los tres cuerpos con sensibilidad de fase: una orientación jerárquica consistente (MES > PAT > TEC) cuyo contenido interno evoluciona con la situación política.*

La estabilidad del ranking en ambos discursos es analíticamente sugestiva. No confirma un tipo de actor. Requiere el tercer documento (1973) para testear si la jerarquía se sostiene en un momento político radicalmente distinto: el retorno del exilio, la tercera presidencia, un pueblo cuya composición y conciencia ya no son los de 1946 ni los de 1954. Si el ranking se mantiene en 1973 pero el contenido vuelve a desplazarse, la lectura fase-sensible se refuerza. Si el ranking se rompe —si TEC sube o MES colapsa— la hipótesis de dos documentos necesita revisión.

---

## 8. Alfonsín como inestabilidad de transición

*Fuentes: NB10_interpretive_synthesis; MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1; NB09_case_packet_Alfonsin.*

Alfonsín presenta el mayor número de transiciones de configuración del corpus democrático: cinco en ocho documentos. El vector dominante rota entre las tres dimensiones del modelo a lo largo del mandato. La secuencia aproximada, según NB10, es:

- 1983 (inauguración): tecnocracia+paternalismo
- 1984–1985: paternalismo+tecnocracia
- 1986–1987: tecnocracia+paternalismo
- 1988 (extraordinaria Carapintada): tecnocracia+mesianismo (empate exacto tec=mes)
- 1988 (apertura regular): tecnocracia+paternalismo
- 1989 (final — hiperinflación): mesianismo+tecnocracia

Tres momentos registran mesianismo como primario o como fuertemente secundario: la sesión extraordinaria de 1988 (crisis Carapintada, defensa de la legalidad constitucional), la apertura de 1987 (en lectura de NB10), y la última apertura de 1989 (hiperinflación, salida anticipada del gobierno). La lectura provisional es que el mesianismo alfonsinista actúa como **registro retórico de respuesta a presión de crisis**, no como vector estructural del discurso presidencial de Alfonsín.

La inestabilidad orbital no es un defecto del corpus ni de la calibración. Es el hallazgo principal de este actor. Una interpretación plausible —aunque no la única— es que la variabilidad discursiva alfonsinista refleja la presión de contextos sucesivos radicalmente distintos: transición democrática, consolidación institucional, crisis económica acelerada, presiones militares. El discurso presidencial respondió con registros distintos a contextos distintos.

El avg_mes alfonsinista (5.09) es el más alto del corpus democrático entre los actores que no son clasificados como predominantemente mesiánicos. Eso indica que incluso cuando no es dominante, el mesianismo está más presente en el corpus alfonsinista que en cualquier otro actor del período, salvo Milei.

**H3 (confianza media — Tier 1, medium caution):** *El perfil discursivo de Alfonsín en el período de transición democrática se caracteriza por inestabilidad orbital, con el mesianismo como vector de respuesta a crisis que aparece en tres momentos distintos. Esta inestabilidad es la propiedad interpretativa principal del actor —no la configuración promedio.*

---

## 9. Menem y la disociación entre discurso paternalista y reorientación gubernamental

*Fuentes: NB10_interpretive_synthesis; MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1; NB09_case_packet_Menem.*

El corpus Menem (n=11, caution_level=low) es el más grande del período democrático y el de mayor robustez empírica fuera de CFK. El hallazgo más significativo de este caso es la **disociación sistemática** entre el registro discursivo del presidencialismo y la orientación del gobierno.

Menem es el mayor reformador de mercado de la democracia argentina. La apertura de la economía, la privatización de empresas públicas, la convertibilidad, las reformas laborales —todas constituyen una transformación de orientación tecnocrático-liberal sin precedente en el período. Sin embargo, el corpus de sus mensajes presidenciales muestra paternalismo+tecnocracia en 9 de 11 documentos, con el avg_pat=32.014 más alto del corpus democrático.

La retórica menemista no construye hegemonía a través del lenguaje técnico-modernizador. La construye a través del lenguaje tutelar: la causa del pueblo, el bienestar de los trabajadores, la protección social como mandato del Estado. El reformismo de mercado se enuncia en paternalismo. El apertura de 1992 concentra pat=70.362 sobre un total de 98.679 —el score de paternalismo más alto del corpus para cualquier actor.

Esta disociación no es una anomalía: es el caso más robusto del corpus para el argumento de que la configuración discursiva y la política de Estado son dimensiones analíticamente separables. El modelo de tres cuerpos no predice coherencia entre retórica presidencial y programa de gobierno. El caso Menem confirma empíricamente que esa coherencia no debe asumirse.

**H4 (alta confianza — Tier 1, low caution, n=11):** *El corpus Menem establece el caso más robusto del corpus democrático para la disociación entre registro discursivo paternalista y orientación gubernamental reformista. La retórica presidencial puede operar en un registro completamente diferente al programa de gobierno sin contradicción interna evidente para el actor.*

---

## 10. CFK como configuración orbital estable y de alta fortaleza atractora

*Fuentes: NB10_interpretive_synthesis; MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1; NB09_case_packet_CFK; NB08_democratic_actor_profiles.*

CFK presenta el patrón orbital más estable y de mayor fortaleza atractora del corpus democrático disponible. El caution_level es low (el más bajo del período). De sus nueve documentos, seis tienen attractor strength strong —la proporción más alta de cualquier actor con corpus múltiple. Las cuatro transiciones que registra el corpus no implican cambios de díada: en todos los casos, la rotación es dentro del tec/pat —el vector dominante se invierte entre tecnocracia y paternalismo, pero los dos vectores del díada permanecen como el par activo.

La lectura provisional es que el discurso de CFK opera en un registro de **tecnocracia-con-paternalismo**, con variación de dirección pero no de configuración fundamental. El vector promedio dominante es tecnocracia (avg_tec=18.305 > avg_pat=15.958), mientras que la configuración modal es paternalismo+tecnocracia (5/9 documentos). La discrepancia se explica por la apertura de 2008 (gap=38.408), que tiene el sesgo tecnocrático más pronunciado del corpus CFK y traccionada el promedio más allá de la moda.

Una interpretación que el corpus sugiere —sin confirmarla— es una intensificación tecnocrática en el primer mandato (especialmente 2008) y un perfil más paternalista consolidado en el segundo. La disgregación intra-mandato (2007–2011 / 2011–2015) es la tarea empírica pendiente más importante para este actor.

Lo que el corpus **no** autoriza es reducir el perfil de CFK a ninguna caracterización política unívoca. La estabilidad orbital es una propiedad del discurso formal de apertura legislativa. No describe el kirchnerismo como corriente política, ni las políticas implementadas, ni el estilo comunicacional más amplio.

**H5 (alta confianza — Tier 1, low caution, n=9):** *CFK presenta la configuración orbital más estable y de mayor fortaleza atractora del corpus democrático. El registro tecnocracia-con-paternalismo es el resultado más robusto a nivel actor, con la aclaración de que la dirección relativa del díada varía entre mandatos.*

---

## 11. Milei como tecnocracia + mesianismo

*Fuentes: NB10_interpretive_synthesis; MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1; NB08_democratic_actor_profiles.*

Milei presenta la configuración más distintiva del corpus democrático HCDN: tecnocracia+mesianismo en ambos documentos disponibles (2024 y 2025). Es el único actor del corpus donde el mesianismo es vector secundario sostenido a nivel actor. El avg_mes=13.435 es más del doble del siguiente actor más alto (Alfonsín, avg_mes=5.09).

La distinción más importante de este caso respecto a los otros casos de mesianismo elevado en el corpus democrático es de contexto: los otros casos donde el mesianismo aparece como primario o fuertemente secundario —Alfonsín 1989 (hiperinflación), Rodríguez Saá 2001 (colapso), Duhalde 2002 (emergencia)— están todos asociados a situaciones de crisis institucional, inauguraciones excepcionales o salidas de gobierno bajo presión. El mesianismo de Milei aparece en el apertura regular de 2025, ya sin el contexto inaugural de diciembre 2023. Eso lo distingue estructuralmente: si el patrón se sostiene con corpus ampliado, el mesianismo de Milei no sería un registro de crisis sino un atributo discursivo de gobierno ordinario.

La combinación tecnocracia+mesianismo no es contradictoria en términos del modelo. La lógica argumental puede ser "la transformación técnica es una misión histórica" o "la crisis excepcional requiere soluciones técnicas de carácter misional". Lo que el corpus sugiere, con la evidencia disponible, es que esa articulación está presente y se consolida entre 2024 y 2025 (medium→strong).

La advertencia empírica es clara e ineludible: n=2 documentos no permiten establecer una trayectoria. El inaugural de diciembre 2023 posiblemente está ausente del corpus NB08. El apertura de 2026 no ha sido procesado.

**H6 (provisional — Tier 3, n=2):** *La configuración tecnocracia+mesianismo de Milei es empíricamente distintiva en el corpus democrático y consistente en los dos documentos disponibles. La hipótesis no puede establecerse como tipo de actor confirmado hasta que el corpus se amplíe a n≥4.*

---

## 12. Macri y Alberto Fernández después de la corrección de metadatos

*Fuentes: NB10_interpretive_synthesis; MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1; NB08_democratic_actor_profiles (corrected).*

La corrección de 2026-04-29 —reatribución de `Mensaje Presidencial 2019.txt` a Alberto Fernández— modifica sustancialmente los perfiles de ambos actores. Ningún perfil pre-corrección tiene validez interpretativa para esta síntesis.

### 12.1 Macri (corregido, caution medium, n=5)

El perfil corregido (n=5, 2015–2019) muestra tecnocracia+paternalismo como configuración de los aperturas de gobierno activo (2016, 2017, apertura 2019), con attractor fuerte. La inauguración de 2015 es paternalismo+tecnocracia —patrón inauguracional que se observa en otros actores del corpus y que puede reflejar un efecto de género antes que una orientación del actor. El avg_mes=0.869 es el más bajo del corpus democrático: el discurso presidencial de Macri muestra mínima presencia de mesianismo, coherente con un registro técnico-programático.

El documento de 2018 retiene indeterminate attractor (tec_TM=0.0 pese a contenido de tipo TM) y debe tratarse como low-weight en la agregación. La posible causa —un gap del pattern set para ese estilo de discurso (gobierno digital, Estado moderno)— es una hipótesis analítica, no una corrección confirmada.

El perfil corregido es internamente coherente pero provisional: las agregaciones actuales son correcciones de patch aplicadas a outputs v0. Requieren validación por re-run completo de pipeline v1 antes de ser citadas como definitivas.

### 12.2 Alberto Fernández (corregido, caution high, n=4)

El corpus de Alberto Fernández comienza con la asunción de 2019 recuperada. Los cuatro documentos disponibles tienen NB05 ambiguity flag (share_ambiguous_nb05=1.0). El actor-level average muestra near-parity: avg_pat=16.356 vs avg_tec=15.456 (brecha=5.5%). La asunción 2019 registra empate exacto (tec=pat=14.001).

El caution_level=high es un juicio calibrado, no una anomalía. El corpus no produce una configuración dominante clara a nivel actor. La ambigüedad persistente puede ser el hallazgo principal: el discurso presidencial de Alberto Fernández combina los dos registros del díada sin que uno domine de manera estable. El apertura de 2023 (último del mandato) no está en el corpus.

**H7 (baja confianza — Tier 3, high caution):** *El corpus de Alberto Fernández exhibe ambigüedad proposicional estructural: todos los documentos disponibles muestran near-parity entre paternalismo y tecnocracia. No pueden emitirse reclamos fuertes de configuración con caution=high y n=4.*

---

## 13. Lo que esta visión unificada sugiere

Las siguientes proposiciones sintetizan lo que el conjunto de evidencia limpia ilumina sobre el modelo de tres cuerpos en el discurso presidencial argentino. Todas son hipótesis provisionales enunciadas con su nivel de sustento empírico.

**P1 — Las combinaciones son dirigidas, no aditivas.**
El modelo no produce scores sumados para un único eje: produce configuraciones dos-cuerpos dirigidas, donde el orden importa. Paternalismo+tecnocracia y tecnocracia+paternalismo son propositivamente distintas, aunque compartan los mismos dos vectores. La dirección —qué vector domina, qué vector acompaña— tiene contenido interpretativo propio. Esta distinción es operativa en el corpus: Menem opera en pat+tec durante una reforma neoliberal; Macri opera en tec+pat con un programa similar. La diferencia de dirección no es trivial.

**P2 — Paternalismo+tecnocracia es el registro central del discurso presidencial democrático.**
El 86% de cobertura del díada tec/pat en el corpus democrático es el resultado empíricamente más sólido de esta síntesis. No hay actor con corpus múltiple que escape al díada durante todo su mandato. Esto no describe la política de gobierno de ningún presidente: describe el campo retórico disponible para el discurso presidencial democrático en el período analizado. El campo retórico parece ser relativamente independiente de la orientación del gobierno (caso Menem), de la coalición política, y del período histórico dentro del ciclo democrático.

**P3 — El mesianismo aparece con menor frecuencia pero con mayor intensidad en casos específicos.**
En el corpus democrático HCDN, el mesianismo es primario en solo tres documentos de actores distintos: Alfonsín 1989, Rodríguez Saá 2001, Duhalde 2002. Los tres corresponden a momentos de crisis institucional, asunción excepcional o salida de gobierno bajo presión. La hipótesis provisoria es que el mesianismo se activa retóricamente como respuesta a ruptura institucional, no como rasgo de actor. La excepción es Milei, donde el mesianismo aparece como secundario sostenido en un apertura regular —lo que puede señalar una lógica distinta de activación, pendiente de confirmación con corpus ampliado.

**P4 — Los documentos limpios de Perón muestran mesianismo+paternalismo con desplazamientos internos de fase.**
En los dos documentos disponibles (1946 y 1954), el mesianismo lidera consistentemente, el paternalismo es secundario, y la tecnocracia es terciaria pero nunca ausente. El ranking es estable; el contenido de cada vector no lo es: el mesianismo pasa de ruptura-redención a consolidación-providencial; el paternalismo pasa de promesa social a orden organizado; la tecnocracia pasa de mandato de reconstrucción a aparato asumido. Esta observación calificativa no puede traducirse en comparación numérica con el corpus democrático.

**P5 — La tecnocracia aparece frecuentemente como infraestructura, no como motor soberano.**
En los dos documentos de Perón, la tecnocracia es terciaria y su debilitamiento entre 1946 y 1954 es el hallazgo más robusto del contraste de fase. En el corpus democrático, la tecnocracia es frecuentemente secundaria (en las configuraciones paternalismo+tecnocracia) o co-dominante en el díada pero raras veces sola. El único actor donde tecnocracia es dominante con mesianismo como secundario —y no con paternalismo— es Milei. Eso sugiere que la tecnocracia como motor discursivo soberano, sin paternalismo como acompañante, puede ser una configuración menos disponible en el presidencialismo argentino, aunque los datos de dos pipelines distintas no permiten una afirmación fuerte.

**P6 — Los perfiles de actor varían por fase, género y crisis.**
La inestabilidad de Alfonsín, el flip de De la Rúa en 2001, el paso de pat+mes a tec+pat en Duhalde, el desplazamiento intra-kirchnerismo entre NK y CFK —todos muestran que los perfiles de actor no son tipos estables sino trayectorias que responden a contextos. El modelo registra esa variación; no la clausura en una clasificación. La sensibilidad de fase que el contraste Perón 1946/1954 sugiere para ese actor es consistente con la variación intra-mandato que el corpus democrático muestra para múltiples actores.

**P7 — Ningún actor debe ser reducido a un tipo fijo.**
Esta es la proposición más transversal de la síntesis. Los case units —no los tipos de actor— son la unidad de análisis apropiada. Una configuración *paternalismo+tecnocracia* para Menem en 1992 y para De la Rúa en 2000 son formalmente idénticas y sustantivamente distintas. El modelo detecta patrones; la interpretación histórica requiere contexto. La síntesis no clausura; abre.

---

## 14. Lo que esta síntesis no prueba

**No hay clasificación final.** Ningún actor tiene un tipo discursivo confirmado. Todos los perfiles son provisionales o provisional-alta-cautela. La etiqueta v0_1 en todos los outputs marca esta como una primera iteración, no una conclusión.

**No hay bridge numérico para Perón.** Los scores propositionales de la PERON_ALT_PIPELINE no son comparables a los vectores TM/TCM/AGN del corpus HCDN. Declaraciones del tipo "el mesianismo de Perón es X veces mayor que el de Milei" o "Perón tiene el mismo perfil que actor Y" no están sustentadas por la evidencia disponible y no son autorizadas por esta síntesis.

**No hay discurso de Perón de 1973.** PERON_SRC_015 contiene el discurso de Allende y el juramento constitucional de Perón. El discurso inaugural real de Perón del 12 de octubre de 1973 no está en ninguna pipeline activa. La tercera presidencia —el retorno del exilio— no tiene evidencia proposicional disponible.

**El discurso no es el gobierno.** Los vectores describen el registro retórico de los mensajes de apertura legislativa y asunciones presidenciales del corpus HCDN. No miden la orientación política de los gobiernos, sus políticas implementadas, ni su estilo comunicacional informal. La disociación entre discurso y gobierno (caso Menem) no es una excepción: puede ser la norma.

**El corpus limpio es aún parcial.** El corpus HCDN democrático cubre 51 documentos de 10 actores, con gaps documentados (apertura CFK 2009 posiblemente ausente; apertura Alberto Fernández 2023 ausente; inaugural Milei 2023 posiblemente ausente; apertura Milei 2026 pendiente). La PERON_ALT_PIPELINE cubre dos documentos de tres presidencias, sin el tercer momento. Una síntesis de un corpus parcial es provisional por definición.

**Las lineages HCDN y PERON difieren metodológicamente.** Esta no es una diferencia de grado sino de instrumento. La síntesis hace un esfuerzo de lectura cualitativa comparada; no hace fusión de resultados. Cualquier fusión numérica futura requiere el desarrollo de una bridge note explícita que actualmente no existe.

---

## 15. Próximos pasos empíricos

Los siguientes pasos están autorizados por la evidencia disponible y ordenados por bloqueo lógico. Los pasos posteriores no deben anticiparse sin completar los anteriores.

**1. Adquirir fuente alternativa para el discurso de Perón de 1973.**
PERON_SRC_015 está retirado para revisión proposicional. La fuente real del discurso inaugural de Perón del 12 de octubre de 1973 existe —fue pronunciado y ampliamente cubierto. El problema es de identificación de fuente, no de existencia del discurso. Prioridad de adquisición: BCN — Colección de Mensajes Presidenciales; La Nación 13-10-1973; Casa Rosada archivo histórico. Registrar como PERON_SRC_020. Verificar contenido y autoría antes de cualquier extracción BLQ.

**2. Ampliar el corpus Milei.**
Ingestión del inaugural de diciembre 2023 (posiblemente ausente de NB08) y del apertura de 2026. Con n≥4, la hipótesis H6 (tecnocracia+mesianismo como configuración de actor) puede evaluarse con mayor solidez. Es la hipótesis con mayor impacto potencial para el modelo si se confirma: un actor democrático con mesianismo como secundario sostenido fuera de contexto de crisis representa una configuración sin precedente en el corpus.

**3. Decidir si ejecutar el re-run completo de pipeline HCDN v1.**
El re-run canónico post-corrección Macri 2019 produciría agregaciones de actor a precisión completa. Los perfiles de Macri y Alberto Fernández pasarían de corrección de patch a output canónico. No tiene prerrequisito bloqueante. Es la acción de mayor impacto sistémico para la integridad del corpus HCDN.

**4. Completar el corpus de Alberto Fernández.**
La apertura de 2023 (último del mandato) no está en el corpus. Su incorporación completaría la trayectoria del mandato y es necesaria antes de cualquier caracterización actor-level del período 2019–2023.

**5. Construir la nota puente formal entre PERON_ALT_PIPELINE y corpus HCDN.**
La bridge note requiere: revisión de alineación metodológica entre ambas pipelines; calibración comparativa del registro de patrones; controles de género (asunciones vs asunciones; aperturas anuales vs aperturas anuales); y documentación explícita de condiciones y límites de comparabilidad. Solo después de la bridge note pueden hacerse afirmaciones comparativas numéricas entre Perón y actores HCDN.

**6. Solo entonces producir el "mapa orbital argentino" v1.**
Una vez que la bridge note exista y el corpus Perón tenga al menos tres documentos (1946 + 1954 + 1973), será posible producir una caracterización de primer orden del campo de fuerzas del discurso presidencial argentino que incluya el período de Perón y el período democrático en un mismo marco interpretativo controlado. Ese documento —que aquí se llama provisionalmente "mapa orbital argentino v1"— es la meta de mediano plazo del trabajo empírico del proyecto.

---

## 16. Gobernanza del documento

| Campo | Valor |
|-------|-------|
| Versión | v0.1 |
| Fecha | 2026-04-30 |
| Producido por | sesión de síntesis (Claude Code, Sonnet 4.6) |
| Linajes cubiertos | HCDN_PROMOTED_LAYER · PERON_ALT_PIPELINE |
| Matriz adjunta | `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` |
| Actores HCDN | CFK · Menem · Alfonsín · Kirchner · De la Rúa · Duhalde · Milei · Macri · Alberto Fernández · Rodríguez Saá |
| Documentos Perón incluidos | 1946 PERON_SRC_003 (usable) · 1954 PERON_SRC_013 (usable) |
| Perón excluido | 1973 PERON_SRC_015 (discurso de Allende — bloqueado) |
| Notebooks ejecutados | ninguno (síntesis solo) |
| Outputs existentes modificados | ninguno |
| Correcciones reflejadas | Macri 2019 patch v0_2 · cola revisión manual 8 docs cleared_provisional |

*Todos los perfiles de actor son provisionales. No citar como clasificaciones históricas definitivas.*
*La comparación numérica entre Perón y actores HCDN no está autorizada hasta que exista la bridge note.*
*Producido en el marco del proyecto El problema de los tres cuerpos argentinos.*
