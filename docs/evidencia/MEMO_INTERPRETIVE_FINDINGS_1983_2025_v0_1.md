# MEMO — Hallazgos interpretativos HCDN democracia 1983–2025 v0.1

**Proyecto:** El problema de los tres cuerpos argentinos
**Corpus:** HCDN corpus lab — período democrático 1983–2025
**Versión:** v0.1
**Fecha:** 2026-04-29
**Estado:** síntesis interpretiva provisional — no es clasificación histórica definitiva
**Fuente:** HCDN_NB10 (ejecutado y promovido 2026-04-29)

---

## 1. Estatuto del memo

Este memo transforma los hallazgos cuantificados de HCDN_NB10 en una síntesis interpretiva controlada para el período democrático argentino 1983–2025. No es un análisis nuevo ni una revisión del modelo de scoring. Sus proposiciones son **hipótesis basadas en el corpus**, no conclusiones históricas cerradas.

El objeto de análisis es el **discurso presidencial**: mensajes de apertura legislativa y discursos de asunción procesados por la pipeline HCDN. El corpus no cubre el campo político completo, no mide orientación ideológica de los gobiernos, y no es equiparable a una historia del presidencialismo argentino. Una configuración discursiva dominante describe el **registro retórico** de los documentos analizados, no la política de estado de un gobierno.

La distinción es estructural al modelo: **discurso ≠ gobierno**.

---

## 2. Fuente y autoridad empírica

Los hallazgos de este memo descansan sobre los siguientes materiales, todos pertenecientes a la capa canónica promovida del HCDN corpus lab:

- **NB05 — scores calibrados:** vectores tec/pat/mes por documento (calibración: TM×1.00, TCM×0.50, AGN×0.00), tabla canónica de 70 documentos 1900–2025, con 51 del período democrático.
- **NB07–NB08 — clasificación orbital y perfiles de actor:** configuraciones dos-cuerpos dirigidas por documento y por actor, con niveles de cautela y flags de auditoría.
- **NB09 — paquetes de caso:** evidencia cualitativa de segmentos para cinco actores prioritarios (CFK, Milei, Menem, Macri, Alfonsín).
- **NB10 — síntesis interpretiva:** matriz de actor, mapa de configuraciones, análisis de transiciones, hipótesis de sistema.
- **Corrección de metadatos Macri 2019 (aplicada 2026-04-29):** `Mensaje Presidencial 2019.txt` reatribuido a Alberto Fernández (asunción 10-12-2019). Todos los perfiles de Macri y Alberto Fernández en este memo reflejan esta corrección.
- **Resolución de la cola de revisión manual (2026-04-29):** 8 documentos activamente flagueados revisados mediante lectura de texto fuente. Los 8 resueltos como `cleared_provisional`. Ningún documento excluido.

**Perón queda excluido** del análisis comparativo de este memo. No existe perfil calibrado de Perón en ninguna pipeline del proyecto. El corpus HCDN cubre la democracia desde 1983; cualquier comparación con Perón requeriría una pipeline alternativa independiente con su propia estrategia de calibración.

---

## 3. Hallazgo central

**La configuración discursiva modal del corpus presidencial democrático 1983–2025 es *paternalismo+tecnocracia*.**

De los 51 documentos del período, 25 (49%) presentan paternalismo como vector dominante y tecnocracia como secundario. La configuración inversa —*tecnocracia+paternalismo*— aparece en 19 documentos (37%). Entre ambas, el díada tec/pat concentra 44 documentos: el 86% del corpus democrático.

Este resultado no significa que Argentina sea un país "tecnocrático" ni que sus presidentes hayan sido sistemáticamente populistas. Significa que el **registro retórico** del discurso presidencial democrático combina de forma persistente dos tipos de lenguaje: (a) protección social, tutela estatal, interpelación al pueblo como receptor de beneficios; (b) modernización técnico-administrativa, gestión eficiente, racionalización del Estado.

La calibración NB05 descuenta el lenguaje administrativo genérico (subtipo AGN, peso=0.00) y reduce el peso del lenguaje técnico-burocrático de catálogo (subtipo TCM, peso=0.50). La tecnocracia que permanece luego de la calibración es, por tanto, más significativa —pero sigue siendo tecnocracia de discurso, no tecnocracia de gobierno.

Los dos vectores que dominan el corpus se articulan de modos distintos según el actor y el momento: en algunos casos, el lenguaje técnico acompaña las promesas de protección; en otros, las promesas de protección justifican las reformas técnicas. Lo que el corpus muestra es que ambos registros son **co-presentes y mutuamente reforzantes** en la mayor parte del presidencialismo democrático argentino.

El mesianismo —el tercer vector del modelo— está presente pero es minoritario en el corpus: promedio por actor entre 0.869 (Macri) y 5.09 (Alfonsín) en la mayoría de los actores, con la excepción estructural de Javier Milei (13.435) y las excepciones situacionales de Eduardo Duhalde (10.962) y Adolfo Rodríguez Saá (inaugural de crisis). El mesianismo no es ausente, pero aparece concentrado en contextos de crisis o en la configuración singular del actor Milei.

---

## 4. Patrones de actor

### 4.1 Cristina Fernández de Kirchner

CFK presenta el patrón orbital más estable y de mayor peso atractor del corpus democrático disponible. De sus nueve documentos, seis tienen attractor strength *strong* —la proporción más alta de cualquier actor con corpus múltiple. El caution_level es *low*, el más bajo del período. La configuración modal es *paternalismo+tecnocracia* (cinco documentos), aunque el promedio actor-level coloca a la tecnocracia como vector dominante (avg_tec=18.305 > avg_pat=15.958) —diferencia explicada por el documento de 2008, que registra la brecha tecnocrática más amplia del corpus CFK (gap=38.408).

La lectura provisional que emerge del corpus es que el discurso de CFK opera en un registro relativamente estable de tecnocracia-con-paternalismo, con cierta intensificación tecnocrática en el primer mandato (especialmente 2008) y un perfil más paternalista consolidado en el segundo. La disgregación intra-mandato es una tarea empírica pendiente.

Lo que el corpus **no** autoriza es reducir el perfil de CFK a ninguna caracterización política unívoca. La estabilidad orbital es una propiedad del discurso, no del gobierno.

### 4.2 Carlos Menem

Menem tiene el corpus más grande del período democrático (n=11, 1990–1999) y el caution_level más bajo (low). Su configuración modal es *paternalismo+tecnocracia*, sostenida en nueve de once documentos. El promedio de paternalismo (avg_pat=32.014) es el más alto del corpus democrático entero, incluyendo actores que típicamente se asocian con retórica de protección social.

El hallazgo más relevante de la lectura del corpus Menem es la **disociación entre registro discursivo y orientación gubernamental**: el mayor reformador de mercado de la democracia argentina articula su discurso presidencial en un registro consistentemente paternalista, no tecnocrático. La retórica menemista no construye hegemonía a través del lenguaje técnico-modernizador sino a través del lenguaje tutelar. El neoliberalismo menemista se enuncia en paternalismo.

El documento de 1992 concentra pat=70.362 sobre un total de 98.679 —el registro paternalista más alto del corpus democrático. La lectura cualitativa de ese apertura está pendiente y puede iluminar la mecánica de este registro.

Los documentos de 1994 (posible sobrecorrección por AGN) y 1995 (near-tie, gap=0.911/1.1%) están resueltos como `cleared_provisional` pero retienen matices interpretativos: 1994 fue el año de la reforma constitucional, con alta carga de lenguaje institucional-técnico; 1995 es efectivamente co-dominante. Ambas observaciones son compatibles con el perfil general y no lo desestabilizan.

### 4.3 Raúl Alfonsín

Alfonsín presenta la mayor inestabilidad orbital del corpus: cinco transiciones de configuración en ocho documentos (stability_ratio=0.286). Los vectores dominante y secundario rotan entre las tres dimensiones del modelo a lo largo del mandato. No hay una configuración que se sostenga más de dos años consecutivos.

Esta inestabilidad es una lectura provisional del corpus, no un juicio sobre la coherencia política del actor. El modelo registra que el registro retórico de Alfonsín cambia más que el de cualquier otro presidente democrático analizado. Una lectura plausible —y no la única— es que la variabilidad discursiva alfonsinista refleja la extraordinaria presión de contexto que atravesó el primer mandato democrático: transición, consolidación institucional, crisis económica acelerada, presiones militares. El discurso presidencial respondió a esos contextos con registros distintos.

El mesianismo alfonsinista merece atención particular. Alfonsín tiene el average de mesianismo más alto del corpus (5.09) entre los actores no-mesiánicos, y el mesianismo aparece como vector primario o fuertemente secundario en tres momentos distintos: el discurso extraordinario de diciembre de 1988 (crisis Carapintada, tie tec=mes), el apertura de 1987, y el discurso final de 1989 (hyperinflación, mesianismo dominante). El modelo sugiere que el mesianismo alfonsinista no es un rasgo estructural del discurso sino una respuesta retórica a la presión de crisis.

Dos documentos retienen flags activos luego de la revisión: el apertura de 1985 (near-tie, gap=0.822, cleared_provisional) y la sesión extraordinaria de 1988 (indeterminate, formato de acta parlamentaria, low-weight). Ambos deben tratarse con cautela adicional en la agregación.

### 4.4 Mauricio Macri

El perfil de Macri es el que más cambió con la corrección de metadatos. Antes de la corrección, el corpus Macri incluía el discurso de asunción de Alberto Fernández (2019-12-10), asignado por error a Macri mediante una heurística de año. Removido ese documento, el perfil corregido (n=5, 2015–2019) coloca la configuración modal en *tecnocracia+paternalismo*: los tres aperturas del período de gobierno activo (2016, 2017, apertura final 2019) muestran tecnocracia dominante con attractor fuerte.

El perfil corregido es coherente con el registro retórico esperado del macrismo: lenguaje de modernización estatal, servicios digitales, transparencia y gestión eficiente como marco dominant, con paternalismo como secundario (protección, desarrollo, ciudadano). El avg_mes=0.869 es el más bajo del corpus democrático —Macri es el actor con la menor presencia de mesianismo, lo que es consistente con un registro tecnocrático-programático.

Limitaciones: el documento de 2018 retiene un attractor indeterminate (score total=10.44 para 4.789 palabras, tec_TM=0.0 pese a contenido claramente TM-tipo), lo que sugiere un gap en el pattern set para ese estilo de discurso. Ese documento es low-weight en la agregación. El perfil corregido debe tratarse como provisional hasta que un re-run completo de la pipeline v1 confirme las agregaciones.

El perfil de Macri **no debe compararse** con el perfil pre-corrección ni con el perfil de Alberto Fernández construido con el documento 2019 mal atribuido.

### 4.5 Javier Milei

Milei presenta la configuración más distintiva del corpus democrático: *tecnocracia+mesianismo*. Es el único actor con mesianismo como vector secundario sostenido a nivel actor. El avg_mes=13.435 es más del doble del siguiente actor más alto (Alfonsín, 5.09). Ambos documentos disponibles (2024 y 2025) muestran esa configuración, con fortaleza atractora creciente (medium en 2024, strong en 2025).

La lectura provisional es que el discurso presidencial de Milei combina un registro técnico-desregulatorio con un lenguaje de misión histórica y transformación excepcional. La coexistencia de tecnocracia y mesianismo no es contradictoria en términos del modelo: la lógica argumental puede ser "la transformación técnica es una misión histórica" o "la crisis excepcional requiere soluciones técnicas de carácter misional".

La advertencia empírica es clara: n=2 documentos no permiten establecer una trayectoria. El corpus carece además del discurso inaugural de diciembre de 2023 y del apertura de 2026. **No debe citarse la configuración tecnocracia+mesianismo como rasgo confirmado de Milei** hasta que el corpus se amplíe a n≥4. La hipótesis es plausible e internamente consistente; no es un resultado sólido.

### 4.6 Alberto Fernández

El perfil de Alberto Fernández se construye íntegramente desde la corrección de 2026-04-29. El corpus incluye cuatro documentos: la asunción de 2019 (recuperada de la mala atribución a Macri), más los aperturas de 2020, 2021 y 2022. La configuración modal es *paternalismo+tecnocracia* (2021 y 2022).

El promedio actor-level muestra un empate técnico: avg_pat=16.356 vs avg_tec=15.456 (brecha=0.9, 5.5%). El documento inaugural de 2019 tiene attractor indeterminate (tec=pat=14.001 —empate exacto). El apertura de 2020 es tecnocracia+paternalismo (medium, gap=0.873). La ambigüedad es estructural en este corpus: share_ambiguous_nb05=1.00 —los cuatro documentos tienen flag de ambigüedad NB05.

El caution_level es *high*. No deben extraerse conclusiones directivas del perfil de Alberto Fernández con el corpus actual. El apertura de 2023 no está en el corpus, lo que deja el mandato incompleto. El perfil debe interpretarse separadamente del de Macri —el perfil fusionado pre-corrección es un artefacto de la heurística y no tiene validez interpretiva.

---

## 5. Configuraciones, no tipos

El modelo de tres cuerpos produce **configuraciones dos-cuerpos dirigidas**, no categorías fijas de actor. Esta distinción es operativa y tiene consecuencias directas para la interpretación.

Una configuración *paternalismo+tecnocracia* para Menem (1992, strong attractor, pat=70.362) y una configuración *paternalismo+tecnocracia* para Duhalde (2002, apertura de crisis) son formalmente idénticas en el modelo y sustantivamente distintas en contexto. El modelo no los homologa; registra que el mismo patrón de registro puede cumplir funciones retóricas diferentes.

Asimismo, un actor como Alfonsín, cuya configuración promedio es *tecnocracia+paternalismo*, atraviesa cinco transiciones de configuración en ocho documentos. El perfil actor-level agrega; la trayectoria intra-mandato desagrega. Ambas lecturas son necesarias.

Los cinco atributos del perfil orbital —vector dominante, vector secundario, configuración dirigida, attractor strength, y número de transiciones— deben leerse en conjunto. Un perfil strong-attractor con un solo documento (Rodríguez Saá) no es comparable a un perfil strong-attractor con nueve documentos (CFK). Un near-tie (gap < 2%) en un documento de alto total_score es más informativo que en uno de bajo total_score.

La ambigüedad no es un defecto del modelo. Es, en varios casos, el hallazgo: el discurso presidencial genuinamente combina registros sin jerarquía estable.

---

## 6. Transiciones y estabilidad orbital

El análisis de transiciones de NB10 mide cuántas veces la configuración dos-cuerpos dominante cambia entre documentos consecutivos de un mismo actor. El cociente de estabilidad es (n_docs - n_transitions - 1) / (n_docs - 1).

Los resultados principales:

| Actor | n_docs | n_trans | stability_ratio | estabilidad |
|-------|--------|---------|-----------------|-------------|
| Alfonsín | 8 | 5 | 0.286 | inestable |
| Macri | 5 | 3 | 0.250 | inestable |
| CFK | 9 | 4 | 0.500 | moderado |
| Menem | 11 | 3 | 0.700 | moderado |
| Kirchner | 5 | 1 | 0.750 | estable |
| Alberto F. | 4 | 1 | 0.667 | moderado |
| De la Rúa | 3 | 1 | 0.500 | moderado |
| Duhalde | 3 | 1 | 0.500 | moderado |
| Milei | 2 | 0 | 1.000 | estable (n=2) |
| Rodríguez Saá | 1 | 0 | 1.000 | estable (n=1) |

Alfonsín y Macri son los dos actores clasificados como orbitalmente inestables. En ambos casos, la inestabilidad tiene lecturas distintas. Para Alfonsín, la rotación de vectores dominantes a lo largo de ocho años sugiere que el discurso presidencial respondió diferencialmente a contextos de distinta presión. Para Macri, el ratio de inestabilidad (3 transiciones en 5 documentos) puede estar influido por la pequeñez del corpus y el efecto de género: la asunción de 2015 es paternalismo+tecnocracia (patrón inaugural transversal), lo que genera automáticamente una transición hacia tecnocracia+paternalismo en 2016.

Kirchner aparece como el actor más estable con múltiples documentos (ratio=0.75), a pesar de que su corpus es el más ambiguo en términos de brecha tec/pat: los documentos tienen NB05 ambiguity flag en cuatro de cinco casos. La estabilidad orbital no implica claridad de vector.

Las transiciones no son cambios de gobierno ni cambios ideológicos. Son cambios en el registro retórico predominante entre una apertura y la siguiente. Esa distinción es estructural al modelo.

---

## 7. Lo que el corpus sugiere sobre la democracia 1983–2025

Los siguientes son resultados controlados del corpus, enunciados como hipótesis provisionales. No son proposiciones históricas cerradas.

**Proposición 1: el discurso presidencial democrático tiende al díada paternalismo-tecnocracia como registro modal.**
El 86% del corpus democrático (44 de 51 documentos) muestra una de las dos configuraciones del díada tec/pat. La persistencia es transversal a coaliciones, períodos y estilos de gobierno. Ningún actor de múltiples documentos escapa completamente al díada. Esto no es un rasgo de un presidente sino del **campo retórico disponible** para el presidencialismo argentino.

**Proposición 2: el mesianismo es minoritario pero estructuralmente significativo cuando aparece.**
Fuera del caso Milei, el mesianismo aparece como vector primario en tres documentos de actores diferentes (Alfonsín 1989, Rodríguez Saá 2001, Duhalde 2002). Los tres son momentos de crisis institucional, transición o asunción excepcional. La hipótesis de trabajo es que el mesianismo presidencial se activa en el discurso como respuesta a la presión de crisis —no como rasgo estable de actor. Milei representa una excepción a esa lectura situacional: su mesianismo aparece sostenido en los dos aperturas disponibles, incluyendo el apertura de 2025, ya sin el contexto de asunción.

**Proposición 3: existe disociación entre registro discursivo y orientación gubernamental en al menos un caso robusto.**
El corpus Menem —el más grande del período democrático, con el caution_level más bajo— muestra paternalismo dominante persistente a través de la reforma de mercado de los años 1990. Esto sugiere que la configuración discursiva y la política de gobierno pueden moverse en registros desacoplados. El hallazgo no es que el menemismo sea paternalista como gobierno; es que el discurso presidencial menemista operó en un registro retórico que priorizó el lenguaje de protección y tutela sobre el lenguaje técnico-reformista.

**Proposición 4: los contextos de crisis producen configuraciones discursivas no-modal.**
Las configuraciones menos frecuentes del corpus (paternalismo+mesianismo, mesianismo+tecnocracia, paternalismo+none) están concentradas en momentos de crisis, asunción excepcional o final de mandato bajo presión. Las inaugurales de Rodríguez Saá (2001, default, paternalismo+mesianismo) y Duhalde (2002, post-colapso, paternalismo+mesianismo) y el último discurso de Alfonsín (1989, hyperinflación, mesianismo+tecnocracia) apuntan en esa dirección. El corpus es pequeño para extrapolar, pero el patrón es consistente.

**Proposición 5: el modelo de tres cuerpos requiere distinguir cuatro dimensiones analíticas que el corpus solo puede capturar en una.**
El discurso presidencial es un insumo importante pero parcial del análisis político. El proyecto "tres cuerpos" postula una lógica de tres fuerzas en tensión —tecnocracia, paternalismo, mesianismo— que opera en múltiples registros: electoral, gubernamental, defensivo, comunicacional. Este corpus cubre el registro discursivo formal (mensajes de apertura, asunciones presidenciales). Las otras dimensiones requieren otras fuentes y otro diseño de análisis.

---

## 8. Límites del corpus y del memo

Este memo opera dentro de los siguientes límites, que deben hacerse explícitos:

- **Discurso ≠ gobierno.** Los vectores describen el registro retórico de los documentos, no la política de estado. El modelo no clasifica gobiernos.
- **Mensajes presidenciales ≠ campo político completo.** El corpus cubre aperturas y asunciones. No incluye cadenas nacionales, comunicación informal, discursos electorales ni documentos de coalición.
- **Perón no es comparable con los actores HCDN.** No existe perfil calibrado de Perón en ninguna pipeline del proyecto. Cualquier comparación con Perón en este memo sería especulativa.
- **Milei n=2.** El perfil de Milei no puede considerarse estable. La hipótesis tecnocracia+mesianismo es plausible pero no confirmada.
- **Macri provisional.** El perfil corregido no ha sido validado por un re-run completo de la pipeline. Las agregaciones actuales son correcciones de patch, no outputs de pipeline canónica.
- **Casos cleared_provisional, no definitivos.** Los ocho documentos resueltos en la revisión manual tienen status `cleared_provisional`. Permanecen con su caution_level intacto y sus flags anotados. La resolución indica que no hay razón para excluirlos, no que sean interpretaciones definitivas.
- **Historia de OCR y estructura de fuentes.** El corpus HCDN depende de la calidad de digitalización de los documentos del HCDN. Los documentos de períodos tempranos tienen menor cobertura y mayor riesgo de error de OCR. El pipeline incluye pasos de limpieza pero no garantiza perfección.

---

## 9. Hipótesis para el trabajo empírico siguiente

Las siguientes hipótesis emergen del corpus NB10 como proposiciones provisionales que el trabajo empírico futuro puede refinar, desconfirmar o articular.

**H1 (confirmada a nivel corpus, provisional como generalización):** paternalismo+tecnocracia es la configuración discursiva modal del presidencialismo democrático argentino en el período 1983–2025. La modalidad se sostiene con un corpus de 51 documentos y 10 actores. No requiere refuerzo empírico inmediato, pero sí interpretación teórica sobre qué condiciones estructurales producen ese campo retórico.

**H2 (provisional — n insuficiente):** Milei presenta una configuración tecnocracia+mesianismo que no tiene paralelo sostenido en el corpus democrático. Si el corpus se amplía a n≥4 y la configuración se sostiene, Milei representaría un caso orbitalmente distintivo con implicancias para el modelo completo. Requiere: ingesta del inaugural de 2023 y el apertura de 2026.

**H3 (alta confianza empírica, baja especificidad teórica):** Menem ilustra la disociación entre registro discursivo paternalista y orientación gubernamental reformista. Esta disociación es el caso más robusto del corpus para el argumento de que discurso y gobierno son dimensiones analíticamente separables. Requiere: lectura cualitativa del apertura de 1992 (pat=70.362) y desagregación primer/segundo mandato.

**H4 (confianza media — corpus suficiente, caution medio):** Alfonsín presenta inestabilidad orbital como rasgo del período de transición democrática. La variabilidad de configuraciones puede interpretarse como respuesta retórica a la presión de contextos sucesivos y heterogéneos. Requiere: disgregación por sub-período (1983–1986 / 1987–1989) y lectura cualitativa del discurso de 1989.

**H5 (alta confianza — caution low, corpus n=9):** CFK presenta la configuración orbital más estable y de mayor attractor strength del corpus democrático. Su perfil actor-level (tecnocracia como vector promedio dominante, paternalismo como modal) sugiere que el kirchnerismo CFK operó en un registro de tecnocracia-con-paternalismo no reducible a la oposición populismo/tecnocracia. Requiere: disgregación primer/segundo mandato y verificación del apertura de 2009 (ausente del corpus NB08).

**H6 (consenso metodológico — no refutable por el corpus HCDN):** Perón no puede compararse con los actores HCDN usando los outputs actuales. Cualquier inclusión de Perón en el análisis comparativo requiere una pipeline alternativa independiente con corpus propio y calibración específica. Esta hipótesis es una regla operativa, no una proposición empírica.

---

## 10. Próximos pasos

Las siguientes acciones están autorizadas o recomendadas como continuación del trabajo empírico:

1. **Pipeline HCDN v1 completo.** El re-run canónico post-corrección es la acción de mayor impacto sistémico. Produciría aggregaciones de actor a precisión completa, sin depender de correcciones de patch. No tiene prerequisito bloqueante.

2. **Diseño de pipeline alternativa para Perón.** Definir corpus, estrategia OCR y baseline de calibración como pipeline independiente. El diseño puede avanzar en paralelo con el re-run v1.

3. **Expansión del corpus Milei.** Ingestión del inaugural de diciembre 2023 y del apertura de 2026. Con n≥4, la hipótesis H2 puede evaluarse con mayor solidez.

4. **Apertura 2023 de Alberto Fernández.** El mandato termina incompleto en el corpus. La ingestión completaría el corpus para el actor.

5. **Lectura cualitativa del apertura Menem 1992.** El documento con el score de paternalismo más alto del corpus (pat=70.362) merece una lectura directa de texto para entender la mecánica retórica de ese registro.

6. **Producción de nota de bóveda NB10.** Transformar este memo en un documento de entrada de bóveda para el sistema de conocimiento del proyecto, con estructura de hallazgos por actor, configuraciones y transiciones.

---

*MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1 — producido 2026-04-29*
*Fuente de autoridad: HCDN_PROMOTED_LAYER (canónica) + resolución cola de revisión manual (2026-04-29)*
*Todos los perfiles de actor son provisionales. No citar como clasificaciones históricas definitivas.*
*Producido en el marco del proyecto El problema de los tres cuerpos argentinos.*
