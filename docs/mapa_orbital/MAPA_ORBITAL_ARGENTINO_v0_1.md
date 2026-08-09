# MAPA ORBITAL ARGENTINO v0.1

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** mapa preliminar — evidencia limpia — no clasificación definitiva
**Fuentes canónicas:**
- `UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md` (síntesis canónica principal)
- `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` (datos co-canónicos)
- `NB10_interpretive_synthesis_democracy_1983_2025_v0_1.md` (fuente HCDN)
- `PERON_INTERIM_MEMO_1946_1954_v0_1.md` (fuente PERON_ALT_PIPELINE)
**Precheck:** `MAPA_ORBITAL_ARGENTINO_PRECHECK_v0_1.md` — veredicto: MAPA_AUTHORIZED_WITH_CONSTRAINTS

---

## 1. Estatuto del mapa

Este documento es el primer mapa orbital del discurso presidencial argentino producido en el marco del proyecto *El problema de los tres cuerpos argentinos*. Es un **artefacto preliminar**: organiza la evidencia limpia disponible en un formato de mapa sin añadir datos, scoring ni análisis nuevos. Todo lo que el mapa afirma deriva de la síntesis canónica y del CSV co-canónico producidos el 2026-04-30.

**Lo que este mapa es:**
- Un mapa del corpus democrático HCDN 1983–2025 organizado por familias de configuración orbital
- Un registro cualitativo de los documentos limpios de Perón 1946–1954 como contrapunto metodológicamente separado
- Una presentación estructurada de las hipótesis orbitales que la evidencia limpia habilita

**Lo que este mapa no es:**
- El *mapa orbital argentino v1* definido en la síntesis canónica §15.6, que requiere: bridge note formal entre pipelines, perfil tri-documento de Perón (1946 + 1954 + 1973), y corpus Milei ampliado a n≥4
- Una clasificación final de ningún actor
- Una comparación numérica entre Perón y actores HCDN

**Perón no es numéricamente comparable a los actores HCDN en este mapa.** Los dos cuerpos de evidencia usan instrumentos distintos, procedimientos de extracción distintos, y registros de patrones distintos. No existe bridge note que establezca condiciones de comparabilidad. El mapa incluye a Perón como anotación cualitativa en sección separada (§6), no como punto de datos en la misma escala orbital que los actores democráticos.

**Perón 1973 está excluido.** PERON_SRC_015 fue reclasificado `exclude_from_propositional_review` (BLQ-02c, 2026-04-30): el archivo contiene el discurso de Allende, no el discurso inaugural de Perón. No hay evidencia del discurso de Perón del 12 de octubre de 1973 en ninguna pipeline activa. Ninguna inferencia sobre 1973 se incluye en este mapa.

---

## 2. Regla de lectura

### Los actores no son tipos

El modelo de tres cuerpos no produce clasificaciones fijas. Produce **configuraciones dos-cuerpos dirigidas** que describen el registro retórico de documentos específicos — mensajes de apertura legislativa y asunciones presidenciales del corpus HCDN. Los actores se analizan como *unidades de caso* con corpus, configuraciones, transiciones y caveats propios. No hay "tipo paternalista", "tipo tecnocrático" ni "tipo mesiánico": hay configuraciones predominantes en determinados períodos y documentos, con grados de robustez que varían.

### La dirección importa

`paternalismo+tecnocracia` y `tecnocracia+paternalismo` no son equivalentes. Comparten los mismos dos vectores pero difieren en cuál domina y cuál acompaña. La configuración primaria encuadra el discurso; la secundaria le da contenido instrumental. Menem opera en `paternalismo+tecnocracia` mientras ejecuta la mayor reforma de mercado de la democracia argentina. La combinación de vectores no predice la política: predice el *registro retórico*. La dirección —qué vector domina— sí tiene contenido analítico propio.

### Provisorio no significa débil

Todas las proposiciones interpretivas en este mapa son provisionales. Esa es la convención metodológica del proyecto, no una declaración de debilidad empírica. Un perfil de actor con n=11, caution=low, y 9/11 documentos en la misma configuración (Menem) es empíricamente robusto y sigue siendo provisional. Un perfil con n=2 (Milei) es estructuralmente insuficiente. Los niveles de evidencia importan y están marcados en cada unidad de caso.

### Niveles de evidencia

| Tier | Contenido | Uso en el mapa |
|------|-----------|---------------|
| TIER_1_HCDN | Actores NB10 del corpus democrático calibrado | Hipótesis de actor con nivel explícito de cautela |
| TIER_2_PERON | Documentos limpios PERON_ALT_PIPELINE (1946, 1954) | Anotación cualitativa separada — sin escala orbital común con TIER_1 |
| TIER_3_PROVISIONAL | Actores HCDN de corpus thin o perfil corregido | Hipótesis de actor con cautela elevada o provisional |
| TIER_4_BLOQUEADO | Perón 1973 | Excluido — ninguna evidencia válida disponible |

---

## 3. Núcleo democrático HCDN 1983–2025

### 3.1 El campo de fuerzas

El hallazgo más robusto del corpus democrático es la dominancia del díada tec/pat: el 86% de los 51 documentos del corpus HCDN 1983–2025 muestra `paternalismo+tecnocracia` o `tecnocracia+paternalismo` como configuración primaria y secundaria. Esta cifra es transversal a orientaciones gubernamentales radicalmente distintas —Menem y CFK, De la Rúa y NK, Alfonsín y Macri— y persiste a lo largo de más de cuatro décadas de democracia. El díada no es el sello de ninguna corriente política: es el registro retórico dominante del presidencialismo democrático argentino en el período analizado.

El mesianismo no está ausente del corpus democrático: aparece como vector primario en tres momentos asociados a ruptura institucional aguda (Alfonsín 1989 en hiperinflación, Rodríguez Saá 2001 en colapso, Duhalde 2002 en emergencia post-default) y como secundario sostenido en el único actor que lo presenta fuera de ese contexto (Milei, n=2, provisional).

### 3.2 Distribución de configuraciones

*Fuente: NB10_interpretive_synthesis_democracy_1983_2025_v0_1.md §5; síntesis canónica §6.*

| Configuración | Documentos | Actores | Porcentaje |
|--------------|-----------|---------|-----------|
| paternalismo+tecnocracia | 25 | 7 | 49% |
| tecnocracia+paternalismo | 19 | 8 | 37% |
| tecnocracia+mesianismo | 3 | 2 | 6% |
| paternalismo+mesianismo | 2 | 2 | 4% |
| paternalismo+none | 1 | 1 | 2% |
| mesianismo+tecnocracia | 1 | 1 | 2% |
| **Total díada tec/pat** | **44** | — | **86%** |
| **Total corpus** | **51** | 10 | 100% |

La tabla incluye solo actores HCDN_PROMOTED_LAYER. No incluye documentos de la PERON_ALT_PIPELINE.

### 3.3 Mapa de unidades de caso — corpus HCDN democrático

La tabla siguiente resume las unidades de caso del corpus democrático. Las columnas `avg_tec / avg_pat / avg_mes` son scores calibrados NB05 (calibración TM×1.00 / TCM×0.50 / AGN×0.00) del corpus HCDN_PROMOTED_LAYER exclusivamente. No son comparables con los scores propositionales de la PERON_ALT_PIPELINE.

| Unidad de caso | Actor | Período | n | Config. modal | Config. actor-avg | avg_tec / avg_pat / avg_mes | Trans. | Cautela | Tier |
|----------------|-------|---------|---|--------------|-------------------|----------------------------|--------|---------|------|
| ALFONSIN_1983_1989 | Raúl Alfonsín | 1983–1989 | 8 | sin modal estable (5 trans.) | tec+pat (avg) | 19.2 / 15.9 / 5.1 | 5 | medium | TIER_1 |
| MENEM_1990_1999 | Carlos Menem | 1990–1999 | 11 | pat+tec (9/11) | pat+tec (avg_pat=32.0 — máximo corpus) | 19.1 / 32.0 / 2.4 | 3 | low | TIER_1 |
| DELARUA_1999_2001 | Fernando de la Rúa | 1999–2001 | 3 | pat+tec (1999–2000); flip tec+pat (2001) | pat+tec (avg) | 22.2 / 27.4 / 6.2 | 1 | medium | TIER_1 |
| DUHALDE_2002_2003 | Eduardo Duhalde | 2002–2003 | 3 | pat+tec (actor-level); pat+mes (inaugural 2002) | pat+tec (avg) | 18.7 / 19.8 / 11.0 | 1 | medium | TIER_1 |
| KIRCHNER_2003_2007 | Néstor Kirchner | 2003–2007 | 5 | pat+tec (near-parity; share_ambig=0.8) | pat/tec near-parity (28.4 / 27.8) | 27.8 / 28.4 / 1.9 | 1 | medium | TIER_1 |
| CFK_2007_2015 | Cristina Fernández de Kirchner | 2007–2015 | 9 | pat+tec (modal 5/9); tec+pat (avg-level) | tec+pat (avg_tec > avg_pat) | 18.3 / 16.0 / 1.5 | 4 | low | TIER_1 |
| MACRI_2015_2019 ⚠️ | Mauricio Macri | 2015–2019 | 5 | tec+pat (3/5 aperturas activas) | tec+pat (avg) | 20.5 / 13.9 / 0.9 | 3 | medium | TIER_3 |
| ALBERTOF_2019_2022 ⚠️ | Alberto Fernández | 2019–2022 | 4 | pat+tec (2021, 2022); near-parity actor | pat/tec near-parity (16.4 / 15.5; 5.5%) | 15.5 / 16.4 / 0.8 | 1 | **high** | TIER_3 |
| MILEI_2024_2025 ⚠️ | Javier Milei | 2024–2025 | 2 | tec+mes (ambos docs) | tec+mes (tec > mes >> pat) | 18.2 / 11.2 / 13.4 | 0 | medium | TIER_3 |
| RODRIGUEZSA_2001 ⚠️ | Adolfo Rodríguez Saá | dic 2001 | 1 | pat+mes (1 doc — colapso) | pat+mes | 3.5 / 9.7 / 5.6 | — | **high** | TIER_3 |

**Leyenda ⚠️:** actores TIER_3 — corpus thin, perfil corregido, o ambigüedad estructural. Ver caveats obligatorios en §5.

**Los scores avg son exclusivos del corpus HCDN (NB05 calibrado). No poner en tabla conjunta con datos PERON_ALT_PIPELINE.**

### 3.4 Patrones de transición

*Fuente: NB10 §6 Transition Patterns.*

| Actor | Transiciones | Documentos | Estabilidad orbital |
|-------|-------------|------------|-------------------|
| Alfonsín | 5 | 8 | **inestable** — mayor inestabilidad del corpus |
| Macri | 3 | 5 | **inestable** (corrected prov.) |
| Menem | 3 | 11 | moderada — estabilidad alta en corpus largo |
| CFK | 4 | 9 | moderada — fortaleza atractora compensa las transiciones |
| De la Rúa | 1 | 3 | moderada — flip en 2001 |
| Duhalde | 1 | 3 | moderada — transición inaugural→apertura |
| Alberto Fernández | 1 | 4 | moderada — near-parity en todos los docs |
| Kirchner | 1 | 5 | **estable** — mayor estabilidad ratio de actores ≥4 docs |
| Milei | 0 | 2 | estable (n=2 — no interpretable como trayectoria) |

---

## 4. Configuraciones principales

El corpus HCDN muestra seis familias de configuración. Las dos familias del díada tec/pat concentran el 86% de los documentos. Las cuatro familias restantes son numéricamente minoritarias pero analíticamente significativas: identifican los contextos en que el mesianismo emerge como vector primario o secundario sostenido.

### 4.1 paternalismo+tecnocracia — la configuración modal

Con 25 documentos (49%) y 7 actores, `paternalismo+tecnocracia` es la configuración más frecuente del corpus democrático. No es la configuración de una corriente política: aparece en Menem (reforma neoliberal), Kirchner y CFK (kirchnerismo), De la Rúa (centroderecha), Duhalde (peronismo de emergencia) y Alberto Fernández (peronismo kirchnerista). La tecnocracia en esta configuración es el acompañante del discurso tutelar, no su motor soberano.

El caso más robusto es Menem: 9 de 11 documentos en `pat+tec`, avg_pat=32.014 (máximo del corpus democrático), con el mayor corpus individual del período. La persistencia del registro paternalista durante una reforma de mercado sin precedente es el hallazgo empírico más consolidado de esta configuración.

### 4.2 tecnocracia+paternalismo — la configuración co-dominante

Con 19 documentos (37%) y 8 actores, `tecnocracia+paternalismo` es la cara inversa del díada. La tecnocracia en posición primaria no significa ausencia de paternalismo: significa que el lenguaje de reforma técnico-institucional, modernización de gestión o racionalización del Estado encuadra el discurso, y el lenguaje tutelar lo acompaña.

El caso más robusto es CFK: 6/9 documentos con strong attractor, menor caution del corpus (low), mayor proporción de attractors fuertes de cualquier actor multi-documento. El promedio vectorial de CFK coloca a tecnocracia como dominante (avg_tec=18.305 > avg_pat=15.958), aunque la configuración modal es `pat+tec` en 5/9 documentos — discrepancia explicada por la apertura de 2008 (gap=38.408, el sesgo tecnocrático más pronunciado del corpus CFK).

### 4.3 tecnocracia+mesianismo — la configuración singularizada

Con 3 documentos (6%) y 2 actores, `tecnocracia+mesianismo` es la configuración más analíticamente distintiva del corpus. Aparece en dos actores:
- **Alfonsín, diciembre 1988:** sesión extraordinaria por crisis Carapintada — empate exacto tec=mes (indeterminate attractor); documento de acta, bajo peso en la agregación actor.
- **Milei, 2024 y 2025:** ambos documentos disponibles. El 2025 es una apertura legislativa ordinaria — no es un discurso inaugural ni de crisis. Este es el dato analíticamente más significativo: si el patrón persiste con corpus ampliado, `tecnocracia+mesianismo` sería un registro de gobierno ordinario, no un registro de ruptura institucional.

La caveat es obligatoria: n=2 para Milei no permite afirmar tipo de actor. La hipótesis requiere corpus ampliado (inaugural 2023, apertura 2026).

### 4.4 paternalismo+mesianismo — registros de crisis institucional

Con 2 documentos (4%) y 2 actores, `paternalismo+mesianismo` aparece exclusivamente en contextos de ruptura institucional:
- **Rodríguez Saá, diciembre 2001:** asunción en el momento del default y colapso del Estado. n=1 — punto de datos, no perfil de actor.
- **Duhalde, enero 2002:** inauguración post-colapso. El actor-level de Duhalde es `pat+tec` (3 documentos); la inauguración de emergencia es la excepción que da cuenta del avg_mes=10.962 (máximo de actores multi-año del corpus).

El patrón transversal es interpretable: el mesianismo como vector primario en inauguraciones de crisis parece ser una respuesta retórica a la ruptura institucional aguda, no un atributo estable de los actores que lo exhiben. Los tres actores que muestran mesianismo primario —Alfonsín 1989, Rodríguez Saá 2001, Duhalde 2002— corresponden a contextos de hiperinflación, colapso del Estado, y post-default. Ninguno de los tres tiene el mesianismo como configuración estable a nivel actor-mandato.

### 4.5 Casos límite del corpus

**paternalismo+none (Menem 1996):** un solo documento en el corpus muestra vector dominante sin secundario claro. Es el único caso en el corpus. No produce proposición analítica autónoma con n=1.

**mesianismo+tecnocracia (Alfonsín 1989):** el único documento donde mesianismo lidera con tecnocracia secundaria (no paternalismo). Es el discurso final del mandato alfonsinista, en contexto de hiperinflación y transferencia anticipada del gobierno. El caution es heredable de las circunstancias excepcionales.

---

## 5. Actores democráticos

### 5.1 Raúl Alfonsín (1983–1989) — inestabilidad orbital como hallazgo principal

**TIER_1 | n=8 | caution=medium | 5 transiciones**

El corpus alfonsinista es el de mayor inestabilidad orbital del período democrático: cinco cambios de configuración en ocho documentos. Ninguna configuración se sostiene por más de dos años consecutivos. El vector dominante rota entre tecnocracia, paternalismo y mesianismo a lo largo del mandato.

Secuencia aproximada (según NB10):
- 1983 inauguración: `tecnocracia+paternalismo`
- 1984–1985: `paternalismo+tecnocracia`
- 1986–1987: `tecnocracia+paternalismo`
- 1988 extraordinaria (Carapintada): `tecnocracia+mesianismo` (empate exacto tec=mes — indeterminate)
- 1988 apertura regular: `tecnocracia+paternalismo`
- 1989 (hiperinflación — salida anticipada): `mesianismo+tecnocracia`

La inestabilidad no es un artefacto del corpus ni de la calibración: es el hallazgo principal de este actor. Una lectura provisional es que el discurso alfonsinista respondió con registros distintos a contextos sucesivos radicalmente diferentes: transición democrática, consolidación institucional, crisis económica, presiones militares, hiperinflación. La variabilidad discursiva refleja la presión del contexto, no incoherencia interna.

El avg_mes=5.09 es el más alto del corpus democrático entre actores sin mesianismo como configuración de gobierno ordinario. El mesianismo alfonsinista aparece sistemáticamente en los tres momentos de mayor presión institucional del mandato (1988 Carapintada, 1989 hiperinflación) — lo que sugiere que opera como registro retórico de respuesta a crisis, no como vector estructural.

**Caveat obligatorio:** la inestabilidad orbital de Alfonsín no implica incoherencia política. La configuración actor-level (tec+pat en promedio) no describe una orientación estable: es la media de una trayectoria inestable. No clasificar como tipo fijo. El mesianismo de crisis de 1989 es un single-document signal y no establece que Alfonsín sea un actor mesiánico estructural.

---

### 5.2 Carlos Menem (1990–1999) — disociación entre discurso paternalista y reorientación gubernamental

**TIER_1 | n=11 | caution=low | 3 transiciones**

El corpus Menem es el más amplio del período democrático y el de mayor robustez empírica fuera de CFK. La configuración `paternalismo+tecnocracia` sostiene 9 de 11 documentos a lo largo de los diez años de gobierno. avg_pat=32.014 es el más alto del corpus democrático para cualquier actor — sustancialmente sobre el promedio general.

El hallazgo más significativo de este caso no es la configuración en sí sino lo que la acompaña: Menem es el mayor reformador de mercado de la democracia argentina. La apertura de la economía, la privatización de empresas públicas, la convertibilidad, las reformas laborales constituyen una transformación de orientación sin precedente en el período. Sin embargo, su registro discursivo presidencial es sistemáticamente paternalista: el pueblo, los trabajadores, la protección social como mandato del Estado. La apertura de 1992 concentra pat=70.362 sobre un total de 98.679 — el score de paternalismo más alto de cualquier actor en cualquier documento del corpus democrático.

Esta disociación es el caso más robusto del corpus para la proposición de que el registro retórico del discurso presidencial y la orientación del programa de gobierno son dimensiones analíticamente separables. El modelo de tres cuerpos no predice coherencia entre discurso y política: el caso Menem confirma empíricamente que esa coherencia no debe asumirse.

**Caveat obligatorio:** no confundir el registro discursivo paternalista con la política de Estado menemista. Los vectores describen la retórica de los mensajes presidenciales de apertura legislativa. No describen el gobierno. Los flags cleared de 1994 (posible sobrecorrección AGN en contexto de reforma constitucional — lenguaje institucional técnico excluido por calibración) y 1995 (near-parity gap=0.911, co-dominancia efectiva) retienen relevancia interpretativa aunque estén resueltos.

---

### 5.3 Cristina Fernández de Kirchner (2007–2015) — configuración estable de alta fortaleza atractora

**TIER_1 | n=9 | caution=low | 4 transiciones**

CFK presenta el patrón orbital más consistente y de mayor fortaleza atractora del corpus democrático disponible. De sus nueve documentos, seis tienen attractor strength strong — la proporción más alta de cualquier actor multi-documento. El caution_level=low es el más bajo del período.

La configuración modal es `paternalismo+tecnocracia` (5/9 documentos), pero el promedio vectorial coloca a tecnocracia como dominante (avg_tec=18.305 > avg_pat=15.958). La discrepancia se explica por la apertura de 2008 (gap=38.408 — la mayor brecha tecnocrática del corpus CFK), que tracciona el promedio más allá de la moda. Una lectura provisional es un registro de `tecnocracia-con-paternalismo` con intensificación tecnocrática en el primer mandato (especialmente 2008) y perfil más paternalista consolidado en el segundo. La disgregación intra-mandato (2007–2011 / 2011–2015) es la tarea empírica pendiente más importante para este actor.

Las cuatro transiciones registradas en el corpus no implican cambios de díada: en todos los casos, la rotación es dentro del par tec/pat. El díada nunca cambia; cambia la dirección dentro del díada.

**Caveat obligatorio:** la estabilidad orbital es una propiedad del discurso formal de apertura legislativa. No describe el kirchnerismo como corriente política, ni las políticas implementadas, ni el estilo comunicacional más amplio. La apertura de 2009 puede ser un gap en el corpus NB08 — verificar antes de afirmar trayectoria completa. No reducir el perfil de CFK a ninguna caracterización política unívoca.

---

### 5.4 Fernando de la Rúa (1999–2001) — díada truncada con flip en crisis

**TIER_1 | n=3 | caution=medium | 1 transición**

El corpus de De la Rúa cubre 1999–2001 y termina con la renuncia de diciembre de 2001. La inauguración de 1999 y la apertura de 2000 muestran `paternalismo+tecnocracia` (strong attractor en 2000). En 2001, bajo presión de ajuste con el FMI y aceleración de la crisis económica, el modelo registra un flip a `tecnocracia+paternalismo`. El flip es consistente con el contexto de ajuste, pero el corpus de tres documentos es demasiado pequeño para atribuirle causalidad.

avg_mes=6.228 es elevado en el contexto del corpus democrático (mayor que Menem, NK, CFK, Macri, AlbertoF). El mesianismo en De la Rúa no ha sido objeto de análisis cualitativo directo.

**Caveat obligatorio:** corpus truncado — no hay discurso de salida. La trayectoria está cortada, no concluida. El flip de 2001 es interpretable pero no confirmable con n=3. No inferir trayectorias desde un corpus tan pequeño.

---

### 5.5 Eduardo Duhalde (2002–2003) — transición de crisis a gestión técnica

**TIER_1 | n=3 | caution=medium | 1 transición**

El corpus de Duhalde comienza en el aftermath del colapso de diciembre 2001. La inauguración de enero 2002 (post-default, emergencia institucional) muestra `paternalismo+mesianismo` — uno de tres casos en el corpus democrático donde el mesianismo es vector primario, y el único en una inauguración de mandato regular (no asunción de crisis extrema). Los dos aperturas regulares (2002 y 2003) giran a `tecnocracia+paternalismo`, trazando una transición de crisis-redención a gestión técnica de la reconstrucción.

La configuración actor-level es `paternalismo+tecnocracia` (avg_pat=19.834 > avg_tec=18.699). El avg_mes=10.962 es el más alto del corpus democrático multi-año, pero es un artefacto de la inauguración de emergencia, no un rasgo estructural del actor.

**Caveat obligatorio:** el avg_mes no establece que Duhalde sea un actor mesiánico. El patrón `pat+mes` en inauguraciones de crisis es coherente con Rodríguez Saá y Alfonsín 1989: no es un rasgo de Duhalde como actor sino una respuesta retórica al colapso institucional. Las dos aperturas regulares muestran un perfil distinto. Los dos documentos de apertura tienen NB05 ambiguity flag.

---

### 5.6 Néstor Kirchner (2003–2007) — ambigüedad estructural con estabilidad de trayectoria

**TIER_1 | n=5 | caution=medium | 1 transición**

El corpus de NK presenta la paradoja más llamativa del corpus democrático: la mayor estabilidad de trayectoria (1 transición en 5 documentos — tasa=0.25, la más baja entre actores con ≥4 docs) combinada con la mayor ambigüedad de vector (share_ambiguous_nb05=0.8 — 4/5 documentos con NB05 ambiguity flag). La estabilidad de la trayectoria no implica claridad de vector: es estabilidad dentro de una zona persistentemente ambigua.

La diferencia tec/pat a nivel actor es de 0.615 puntos (1.1% del total). La inauguración de 2003 es `pat+tec`; los aperturas 2005–2007 se mueven consistentemente a `tec+pat`. La transición es real pero la brecha en ambos sentidos es pequeña. El corpus de NK sugiere un discurso que combina los dos registros del díada sin que uno domine de manera estable.

**Caveat obligatorio:** la distinción entre `paternalismo+tecnocracia` dominante y `tecnocracia+paternalismo` dominante no está empíricamente resuelta en este corpus. La apertura de 2007 (gap=0.935, 1.7%) es efectivamente un empate. No citar ninguna dirección como confirmada para NK. No comparar con CFK sin controlar la diferencia metodológica intra-kirchnerismo.

---

### 5.7 Mauricio Macri (2015–2019) — perfil corregido provisional ⚠️

**TIER_3 | n=5 (corregido) | caution=medium | 3 transiciones | corrección patch v0_2**

El perfil de Macri es el resultado de la corrección de metadatos del 2026-04-29: `Mensaje Presidencial 2019.txt` fue reatribuido a Alberto Fernández (era la asunción de AF, mal atribuida a Macri por heurística de año). El corpus corregido (n=5, 2015–2019) muestra `tecnocracia+paternalismo` en los aperturas de gobierno activo (2016, 2017, apertura 2019) con strong attractor. La inauguración de 2015 es `pat+tec` — patrón inauguracional consistente con otros actores del corpus.

avg_mes=0.869 es el más bajo del corpus democrático. El discurso presidencial de Macri muestra mínima presencia de mesianismo, coherente con un registro técnico-programático. El documento de 2018 retiene indeterminate attractor (tec_TM=0.0 a pesar de contenido de tipo TM) y debe tratarse como low-weight en la agregación.

**Caveat obligatorio:** no comparar con el perfil pre-corrección. El perfil fusionado pre-corrección (con la inauguración de AF incluida) no tiene validez interpretativa. No citar el perfil corregido como definitivo hasta que exista re-run de pipeline v1. El documento 2018 es low-weight. TIER_3 por corrección pendiente de validación, no por corpus insuficiente.

---

### 5.8 Alberto Fernández (2019–2022) — perfil corregido separado, ambigüedad estructural ⚠️

**TIER_3 | n=4 (corregido) | caution=high | 1 transición | corrección patch v0_2**

El corpus de Alberto Fernández comienza con la asunción de 2019 recuperada de la mala atribución a Macri. Los cuatro documentos disponibles tienen NB05 ambiguity flag (share_ambiguous_nb05=1.0). El promedio actor muestra near-parity: avg_pat=16.356 vs avg_tec=15.456 (brecha=5.5%). La asunción de 2019 registra empate exacto (tec=pat=14.001). La apertura de 2023 (último año del mandato) no está en el corpus.

La ambigüedad persistente puede ser el hallazgo principal: el discurso presidencial de Alberto Fernández combina los dos registros del díada sin jerarquía estable en ninguno de sus cuatro documentos. Esto no es un defecto del corpus sino una propiedad del discurso.

**Caveat obligatorio:** leer independientemente del perfil de Macri — son actores separados. No usar el perfil pre-corrección fusionado. No emitir reclamos fuertes de configuración con caution=high. La ambigüedad persistente puede ser el hallazgo, no un defecto. Apertura 2023 ausente — mandato incompleto en el corpus.

---

### 5.9 Javier Milei (2024–2025) — tecnocracia+mesianismo, hipótesis provisional ⚠️

**TIER_3 | n=2 | caution=medium | 0 transiciones**

Milei presenta la configuración más analíticamente distintiva del corpus democrático: `tecnocracia+mesianismo` en ambos documentos disponibles. Es el único actor donde el mesianismo es vector secundario sostenido a nivel actor. avg_mes=13.435 es más del doble del siguiente actor más alto (Alfonsín, 5.09).

La distinción analítica más relevante respecto a los otros casos de mesianismo elevado en el corpus es de contexto: los otros casos donde mesianismo aparece como primario o fuertemente secundario —Alfonsín 1989, Rodríguez Saá 2001, Duhalde 2002— están asociados a crisis institucional, asunción excepcional, o salida de gobierno bajo presión. El mesianismo de Milei aparece en la apertura regular de 2025, ya sin el contexto inaugural de diciembre 2023. Si el patrón se sostiene con corpus ampliado, el mesianismo mileísta no sería un registro de crisis sino un atributo discursivo de gobierno ordinario.

**Caveat obligatorio:** n=2 documentos. El tipo de actor no puede confirmarse. La hipótesis H6 (tecnocracia+mesianismo como configuración de actor) requiere n≥4 para evaluación. Inaugural de diciembre 2023 posiblemente ausente del corpus NB08. Apertura 2026 pendiente. No citar `tecnocracia+mesianismo` como rasgo confirmado de Milei.

---

### 5.10 Adolfo Rodríguez Saá (diciembre 2001) — punto de datos en colapso ⚠️

**TIER_3 | n=1 | caution=high**

Un solo documento de asunción pronunciado en el momento del colapso institucional y default de diciembre 2001. La configuración `paternalismo+mesianismo` es consistente con los otros casos de mesianismo elevado bajo crisis (Duhalde inauguración 2002, Alfonsín 1989). n=1 no permite ningún reclamo sobre el actor. Rodríguez Saá contribuye al patrón corpus-level de mesianismo activado por ruptura institucional, no como perfil de actor.

**Caveat obligatorio:** n=1 — no es un perfil de actor, solo un punto de datos. El strong attractor puede reflejar las circunstancias excepcionales (presidencia de 7 días), no una disposición estable del actor.

---

## 6. Perón 1946–1954 como contrapunto cualitativo separado

**TIER_2_PERON_CLEAN_DOCUMENT_PHASE — PERON_ALT_PIPELINE — metodológicamente separado del corpus HCDN**

Esta sección es metodológicamente distinta de las anteriores. Los documentos de Perón provienen de la PERON_ALT_PIPELINE, que usa un instrumento diferente al corpus HCDN: extracción manual de segmentos de dos columnas del Diario de Sesiones, revisión proposicional con un registro de patrones adaptado al contexto retórico de Perón, sin calibración TM/TCM/AGN. Los scores que siguen —MES, PAT, TEC, mean/seg— son conteos de patrones proposicionales, no scores calibrados del tipo NB05. No son comparables numéricamente a los avg_tec/avg_pat/avg_mes de la tabla HCDN.

**No hay bridge note entre estas dos pipelines.** La bridge note requiere: revisión de alineación metodológica, calibración del registro de patrones, controles de género (asunciones vs asunciones; aperturas vs aperturas), y documentación explícita de comparabilidad. Ninguna de estas condiciones ha sido producida. La comparación cualitativa a través del marco conceptual compartido (tecnocracia, paternalismo, mesianismo como tres fuerzas en tensión) es legítima. La comparación numérica no lo es.

**Perón 1973 está excluido.** PERON_SRC_015 contiene el discurso de Allende y el juramento constitucional de Perón (~60 palabras de fórmula legal fija). El discurso inaugural de Perón del 12 de octubre de 1973, pronunciado desde el balcón de la Casa Rosada, no está en ese archivo y no está en ninguna pipeline activa.

---

### 6.1 Datos de los dos documentos limpios

| Documento | Fuente | Extracción | Segmentos | Palabras limpias | Incertidumbre OCR | Status |
|-----------|--------|-----------|-----------|-----------------|------------------|--------|
| 1946 — asunción inaugural (4 jun) | PERON_SRC_003 | BLQ-02b + micro-review BCN cross-ref | 45 A_segmentable | 5.072 | 2.80% | `usable_one_document_hypothesis` |
| 1954 — apertura anual (19 may) | PERON_SRC_013 | BLQ-02a + micro-review + BLQ-03 | 90 segmentos prosa | 4.621 | 2.16% | `usable_one_document_hypothesis` |

**Scores propositionales PERON_NB02** (conteos de patrones — no comparar con avg NB05):

| Vector | Score 1946 | Score 1954 | Δ raw | Mean/seg 1946 | Mean/seg 1954 | Δ mean/seg |
|--------|-----------|-----------|-------|--------------|--------------|------------|
| mesianismo | 82 | 122 | +40 | 1.82 | 1.36 | −0.47 |
| paternalismo | 64 | 110 | +46 | 1.42 | 1.22 | −0.20 |
| tecnocracia | 63 | 54 | **−9** | 1.40 | 0.60 | **−0.80** |

*Nota metodológica: el corpus de 1954 tiene el doble de segmentos primarios (90 vs 45). Los scores raw son parcialmente dependientes del tamaño del corpus. El mean/seg es la métrica comparativa más defensible. TEC es el único vector cuyo score absoluto decrece a pesar del mayor corpus — el hallazgo más analíticamente robusto del contraste de fase.*

---

### 6.2 La asunción de 1946: ruptura fundacional, promesa social, mandato de reconstrucción

El mesianismo de 1946 es el de la **ruptura y la redención fundacional**: el derrumbe de la antigua farsa, la voluntad popular como legitimidad histórica trascendente, las fechas fundacionales —17 de octubre, 24 de febrero— como marcas de una discontinuidad ya consumada. Perón no llega como administrador de un orden existente: llega como vehículo de una ruptura histórica. El mandato es existencial, no burocrático.

El paternalismo de 1946 es **promisorio y tutelar**: justicia social que *se le adeudaba* a las masas trabajadoras, reforma social anunciada, tierra como instrumento de labor doctrinado, acceso educativo comprometido. La inauguración constituye en el discurso mismo el vínculo entre Estado y pueblo como promesa fundacional. El programa social es anunciado —no aún ejecutado.

La tecnocracia de 1946 nombra un **mandato activo de reconstrucción**: normalidad constitucional como objetivo de gobierno, industrialización, planificación hidráulica y energética, recursos naturales como base programática del desarrollo, el Consejo Nacional de Posguerra como instrumento de planificación. El aparato de Estado está siendo construido. TEC no es infraestructura subordinada en 1946: es el canal de acción a través del cual la ruptura mesiánica toma forma institucional. La proximidad entre PAT y TEC en 1946 (64 vs 63, mean/seg 1.42 vs 1.40) es notable — los dos vectores secundarios son efectivamente co-secundarios.

### 6.3 La apertura de 1954: consolidación providencial, pueblo organizado, aparato asumido

El mesianismo de 1954 es el de la **consolidación providencial-doctrinal**: las tres banderas como trívium mesiánico (7×), el peronismo como movimiento de salvación histórica (7×), la Providencia divina como legitimadora de la misión (4×), la gloria y eternidad como horizonte trascendente (4×). La ruptura fundacional de 1946 es ahora historia establecida. El reclamo mesiánico ya no anuncia una discontinuidad — la defiende y consagra. Perón en 1954 no declara una ruptura; narra su cumplimiento.

El paternalismo de 1954 ha pasado de tutela promisoria a **orden social organizado**: las organizaciones del pueblo como cuerpo social (10×), el pueblo organizado y con conciencia social (5×), gobernar *con* y *para* el pueblo (3×). El pueblo ya no es receptor de un programa —es una fuerza social estructurada. La relación pueblo-Estado está codificada, no inaugurada.

La tecnocracia de 1954 es **aparato organizacional asumido**: independencia económica como doctrina sistémica (6×), estructuras orgánico-funcionales del Estado. El mandato de reconstrucción de 1946 —el Consejo Nacional de Posguerra, la planificación hidráulica, el programa industrial— ha desaparecido del discurso. El aparato institucional que 1946 construyó mediante programas técnicos explícitos es, en 1954, un hecho de fondo. TEC contribuye al marco del discurso como doctrina organizacional —presente pero implícita.

### 6.4 El debilitamiento de TEC: el hallazgo más robusto del contraste de fase

TEC es el único vector cuyo score absoluto decrece entre 1946 y 1954 (63→54, Δ=−9) a pesar de que el corpus de 1954 tiene el doble de segmentos. El mean/seg de TEC cae de 1.40 a 0.60 —la mayor caída de cualquier vector en la métrica normalizada. Esta es la inferencia más analíticamente robusta del contraste de fase.

El contenido del debilitamiento es interpretable: el proyecto técnico explícito de 1946 —que construía instituciones— se convierte en el aparato asumido de 1954 —que opera instituciones. TEC no desaparece; cambia de registro. Pasa de mandato de construcción a doctrina de operación.

### 6.5 Hipótesis de dos documentos

**H2 (provisional — dos documentos, TIER_2):** los dos discursos limpios de Perón muestran la misma jerarquía vectorial: MES > PAT > TEC, estable a ocho años de distancia y en dos géneros distintos (asunción inaugural y apertura anual). La jerarquía es estable; el contenido de cada vector no lo es. Esto sugiere que Perón puede importar para el marco no como un tipo proposicional fijo sino como una articulación de los tres cuerpos con sensibilidad de fase: una orientación jerárquica consistente cuyo contenido interno evoluciona con la situación política.

Esta hipótesis requiere el tercer documento (1973) para ser evaluada con seriedad. Si la jerarquía se mantiene en 1973 pero el contenido vuelve a desplazarse —el retorno del exilio, la tercera presidencia, un pueblo diferente— la lectura fase-sensible se refuerza. Si la jerarquía se rompe —si TEC sube o MES colapsa— la hipótesis de dos documentos necesita revisión. La hipótesis no puede estabilizarse desde la evidencia actual.

---

## 7. Qué sugiere el mapa

Las siguientes proposiciones sintetizan lo que el conjunto de evidencia limpia ilumina sobre el modelo de tres cuerpos en el discurso presidencial argentino. Todas son hipótesis provisionales con nivel de sustento explícito. Derivan de la síntesis canónica §13 (P1–P7); se reproducen aquí organizadas por alcance empírico.

---

**M1 — El campo retórico democrático está dominado por el díada tec/pat.**
*(Alta confianza empírica — TIER_1; 51 documentos, 10 actores)*

El 86% de los documentos del corpus HCDN 1983–2025 muestra una de las dos direcciones del díada. Ningún actor con corpus múltiple escapa al díada durante todo su mandato. El campo retórico disponible para el discurso presidencial de apertura legislativa en el período articula consistentemente tecnocracia y paternalismo como co-presentes. Este resultado es independiente de la orientación política o gubernamental del actor.

*Límite:* esta proposición no describe la política de ningún gobierno. Describe el registro retórico del corpus. La disociación entre registro y programa es el caso Menem.

---

**M2 — Las dos orientaciones del díada son propositivamente distintas.**
*(Alta confianza — TIER_1)*

`Paternalismo+tecnocracia` y `tecnocracia+paternalismo` no son intercambiables. En la primera, el lenguaje de protección social, tutela estatal e interpelación al pueblo como sujeto de derecho encuadra el discurso; la tecnocracia instrumenta ese marco. En la segunda, el lenguaje de modernización técnica, eficiencia de gestión o racionalización del Estado domina; el paternalismo acompaña. Menem opera una reforma neoliberal en `pat+tec`; Macri opera un programa similar en `tec+pat`. La diferencia de dirección no es trivial para el análisis proposicional.

---

**M3 — El mesianismo democrático se concentra en contextos de ruptura institucional.**
*(Confianza media — TIER_1/TIER_3; patrón cross-actor)*

En el corpus democrático HCDN, el mesianismo como vector primario o fuertemente secundario aparece en tres tipos de contexto: (a) inauguraciones bajo crisis aguda (Rodríguez Saá 2001, Duhalde 2002); (b) discursos de salida bajo presión (Alfonsín 1989); (c) momentos de crisis de régimen (Alfonsín 1988 Carapintada). La lectura provisional es que el mesianismo activa retóricamente como respuesta a la ruptura institucional, no como atributo estable del actor. La excepción provisoria es Milei (2025, apertura ordinaria) — pero n=2 impide confirmar si esa activación responde a una lógica distinta.

*Límite:* el patrón de crisis-mesianismo involucra actores de TIER_1 y TIER_3; es provisional-consistente, no TIER_1-confirmado.

---

**M4 — La disociación entre discurso y gobierno es una propiedad documentable, no una anomalía.**
*(Alta confianza — TIER_1; caso Menem)*

El corpus Menem establece el caso más robusto del corpus democrático para la disociación entre registro discursivo paternalista y orientación gubernamental reformista. La retórica presidencial puede operar en un registro completamente diferente al programa de gobierno sin contradicción interna evidente para el actor. El modelo de tres cuerpos no predice coherencia entre retórica presidencial y política de Estado: el caso Menem confirma empíricamente que esa coherencia no debe asumirse.

*Límite:* un caso Tier 1 robusto no constituye ley general. Se requieren análisis similares para otros actores con posibles disociaciones.

---

**M5 — Los perfiles de actor varían por fase, género y contexto de crisis.**
*(Confianza media — TIER_1/TIER_2; patrón cross-corpus)*

La inestabilidad de Alfonsín, el flip de De la Rúa en 2001, la transición Duhalde inaugural→apertura, el desplazamiento intra-kirchnerismo entre NK y CFK, los desplazamientos internos de Perón 1946→1954 — todos muestran que los perfiles de actor no son tipos estables sino trayectorias que responden a contextos. El modelo registra esa variación; no la clausura en una clasificación. La sensibilidad de fase que el contraste Perón 1946/1954 sugiere para ese actor es consistente con la variación intra-mandato que el corpus democrático muestra para múltiples actores.

---

**M6 — Milei es el caso democrático más distintivo del corpus, pero no está confirmado.**
*(Confianza baja — TIER_3; n=2)*

`Tecnocracia+mesianismo` es la configuración más analíticamente diferenciada del corpus democrático. Si la hipótesis H6 se confirma con corpus ampliado (n≥4), representaría el único actor democrático con mesianismo como vector secundario sostenido fuera de contexto de crisis o inauguración. avg_mes=13.435 es más del doble del siguiente actor más alto. La fortaleza atractora crece de medium (2024) a strong (2025). Sin embargo, n=2 no permite tipo de actor confirmado.

---

**M7 — Los documentos limpios de Perón sugieren una articulación distinta al campo democrático.**
*(Provisional — TIER_2; dos documentos, sin bridge note)*

Los dos discursos disponibles de Perón muestran MES > PAT > TEC — jerarquía estable a través de dos géneros y ocho años. El campo democrático muestra el díada tec/pat como dominante (86% de documentos). La observación es analíticamente sugestiva: si el díada tec/pat es el registro central de la democracia, la jerarquía MES > PAT > TEC es el registro de los dos discursos de Perón disponibles. Pero los instrumentos son distintos, no existe bridge note, y la observación cualitativa no puede traducirse en comparación numérica.

*Límite:* esta proposición no puede reforzarse hasta que: (a) el tercer documento Perón sea procesado; (b) la bridge note sea producida.

---

## 8. Límites y bloqueos activos

**No hay mapa integrado completo.** Este documento no es el *mapa orbital argentino v1* definido en la síntesis canónica §15.6. Ese documento requiere seis precondiciones que no han sido satisfechas (listadas en §9). Este mapa es un primer ordenamiento de la evidencia disponible en formato de mapa, con Perón como anotación cualitativa separada y con los caveats de los actores TIER_3 en posición visible.

**No hay discurso de Perón de 1973.** La tercera presidencia —el retorno del exilio— no tiene evidencia proposicional en ninguna pipeline activa. La hipótesis H2 (sensibilidad de fase de Perón) no puede evaluarse sin ese documento. Cualquier interpretación de la trayectoria completa de Perón como actor sería especulación sobre un momento no documentado.

**No hay bridge numérico entre Perón y actores HCDN.** Los scores propositionales de la PERON_ALT_PIPELINE (MES/PAT/TEC de PERON_NB02) no son comparables a los vectores calibrados del corpus HCDN (avg_tec/avg_pat/avg_mes de NB05). La tabla de actores HCDN (§3.3) y los datos de Perón (§6.1) aparecen en secciones completamente separadas y no pueden colocarse en el mismo cuadro comparativo con escala numérica compartida.

**El discurso no es el gobierno.** Los vectores describen el registro retórico de los mensajes presidenciales de apertura legislativa y asunciones. No miden la orientación política de los gobiernos, sus políticas implementadas, ni su estilo comunicacional informal. La disociación entre discurso y gobierno no es una excepción: puede ser la norma.

**El corpus limpio es parcial.** El corpus HCDN cubre 51 documentos de 10 actores, con gaps documentados: apertura CFK 2009 posiblemente ausente de NB08; apertura Alberto Fernández 2023 ausente; inaugural Milei 2023 posiblemente ausente; apertura Milei 2026 pendiente. La síntesis de un corpus parcial es provisional por definición.

**La síntesis en inglés no es canónica.** `CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` fue marcada como non-canonical (warning block agregado 2026-04-30). Contiene errores de período para Alfonsín, Kirchner y De la Rúa, y errores de configuración para De la Rúa y Duhalde. No citar ese documento para comparaciones con este mapa.

**Caveats de actores específicos:**

| Actor | Caveat activo |
|-------|--------------|
| Milei | n=2 — hipótesis de configuración no confirmada como tipo de actor |
| Macri | corrección patch v0_2 — pending validación pipeline v1; doc 2018 low-weight |
| Alberto Fernández | caution=high; share_ambiguous_nb05=1.0; apertura 2023 ausente |
| Alfonsín | inestabilidad orbital es el hallazgo — no clasificar como tipo fijo; mesianismo de crisis ≠ mesianismo estructural |
| Menem | no conflate registro discursivo paternalista con política de Estado |
| Perón | no comparar numéricamente con actores HCDN; dos documentos no establecen perfil de actor; sin controles de género cruzado |

---

## 9. Condiciones para MAPA_ORBITAL_ARGENTINO_v1.md

Los siguientes pasos deben completarse, en el orden indicado, para producir el mapa integrado completo. Los pasos posteriores no deben anticiparse sin completar los anteriores. El precheck de este mapa (MAPA_ORBITAL_ARGENTINO_PRECHECK_v0_1.md §2) documenta el estado actual de cada una.

**1. Adquirir fuente verificada del discurso de Perón del 12 de octubre de 1973.**
PERON_SRC_015 está retirado. El discurso existe —fue pronunciado desde el balcón de la Casa Rosada y fue transmitido y cubierto por los medios. El problema es de identificación de fuente, no de existencia del discurso. Registrar como PERON_SRC_020. Verificar contenido y autoría antes de cualquier extracción BLQ.

**2. Procesar el discurso de Perón de 1973 mediante los mismos controles de calidad.**
BLQ-01 extracción → BLQ-02 calidad y descolumnización → micro-review con cross-reference → PERON_NB01_1973 segmentación → PERON_NB02_1973 revisión proposicional. La fuente verificada de 1973 debe pasar los mismos controles BLQ que las fuentes de 1946 y 1954. El error de PERON_SRC_015 fue parcialmente causado por verificación insuficiente de contenido en el registro.

**3. Producir el perfil tri-documento de Perón (PERON_NB04: 1946 + 1954 + 1973).**
Una vez completado PERON_NB02_1973, PERON_NB04 puede producir el contraste de tres fases: fundación (1946), consolidación (1954), retorno (1973). Este es el perfil mínimo multi-documento requerido para una caracterización de actor Perón. El actual contraste de dos documentos (PERON_NB03) es evidencia preparatoria para NB04, no una sustitución.

**4. Construir la nota puente formal entre PERON_ALT_PIPELINE y corpus HCDN.**
La bridge note debe cubrir: (a) revisión de alineación metodológica entre ambas pipelines; (b) calibración comparativa del registro de patrones; (c) controles de género (asunciones vs asunciones; aperturas vs aperturas); (d) documentación explícita de condiciones y límites de comparabilidad. Solo con la bridge note será posible incluir a Perón en el mismo marco orbital que los actores democráticos con alguna base metodológica.

**5. Ampliar el corpus Milei a n≥4.**
Ingestión del inaugural de diciembre 2023 (posiblemente ausente de NB08) y del apertura de 2026. Con n≥4, la hipótesis H6 (tecnocracia+mesianismo como configuración de actor) puede evaluarse con mayor solidez. Es la hipótesis con mayor impacto potencial para el modelo si se confirma.

**6. Decidir si ejecutar el re-run completo de pipeline HCDN v1.**
El re-run canónico post-corrección Macri 2019 produciría agregaciones de actor a precisión completa para Macri y Alberto Fernández. Sus perfiles pasarían de corrección de patch a output canónico. No tiene prerrequisito bloqueante. Es la acción de mayor impacto sistémico para la integridad del corpus HCDN.

**7. Solo entonces producir el mapa orbital argentino v1.**
Una vez que la bridge note exista, el corpus Perón tenga al menos tres documentos procesados, y el corpus HCDN esté en su versión validada v1, será posible producir la caracterización de primer orden del campo de fuerzas del discurso presidencial argentino que incluya el período de Perón y el período democrático en un mismo marco interpretativo controlado. Ese es el `MAPA_ORBITAL_ARGENTINO_v1.md`. Este documento no lo es.

---

## 10. Gobernanza del documento

| Campo | Valor |
|-------|-------|
| Versión | v0.1 |
| Fecha | 2026-04-30 |
| Producido por | sesión de mapa (Claude Code, Sonnet 4.6) |
| Precheck | `MAPA_ORBITAL_ARGENTINO_PRECHECK_v0_1.md` — MAPA_AUTHORIZED_WITH_CONSTRAINTS |
| Linajes cubiertos | HCDN_PROMOTED_LAYER (§3–§5) · PERON_ALT_PIPELINE (§6) — en secciones separadas |
| Actores HCDN | CFK · Menem · Alfonsín · Kirchner · De la Rúa · Duhalde · Milei · Macri · Alberto Fernández · Rodríguez Saá |
| Documentos Perón incluidos | 1946 PERON_SRC_003 (usable) · 1954 PERON_SRC_013 (usable) |
| Perón excluido | 1973 PERON_SRC_015 (discurso de Allende — bloqueado) |
| Notebooks ejecutados | ninguno |
| Outputs existentes modificados | ninguno |
| Correcciones reflejadas | Macri 2019 patch v0_2 · cola revisión manual 8 docs cleared_provisional |
| Constraints aplicados | C-MAP-01 a C-MAP-10 (ver MAPA_ORBITAL_ARGENTINO_PRECHECK_v0_1.md §6) |

**Compliance C-MAP check:**
- C-MAP-01 (scope declaration) — §1 ✓
- C-MAP-02 (no Perón orbital integration) — §6 separado de §3–§5 ✓
- C-MAP-03 (no numerical cross-pipeline content) — scores Perón en tabla separada §6.1 ✓
- C-MAP-04 (Perón 1973 excluded) — §1 y §6 intro ✓
- C-MAP-05 (Milei provisional throughout) — §3.3, §4.3, §5.9, §8, §9 ✓
- C-MAP-06 (Macri/AlbertoF corrected provisional throughout) — §3.3, §5.7, §5.8, §8 ✓
- C-MAP-07 (no final classifications) — uso de "hipótesis", "sugiere", "provisional" en todas las proposiciones ✓
- C-MAP-08 (preconditions section) — §9 ✓
- C-MAP-09 (source authority declared) — §1 cabecera y §10 ✓
- C-MAP-10 (no merged Perón/HCDN table) — tabla HCDN §3.3 no incluye filas Perón; datos Perón en tabla separada §6.1 ✓

*Todos los perfiles de actor son provisionales. No citar como clasificaciones históricas definitivas.*
*La comparación numérica entre Perón y actores HCDN no está autorizada hasta que exista la bridge note.*
*Este documento no es el mapa orbital argentino v1. Ver §9 para las condiciones requeridas.*
*Producido en el marco del proyecto El problema de los tres cuerpos argentinos.*
