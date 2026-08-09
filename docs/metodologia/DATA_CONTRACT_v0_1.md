# DATA CONTRACT v0.1

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** contrato de datos para prototipo estático — no código, no archivos JSON
**Fuentes:** `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` · `NB10_democratic_actor_interpretive_matrix_v0_1.csv` · `NB10_democratic_document_interpretive_table_v0_1.csv` · `MAPA_ORBITAL_ARGENTINO_v0_1.md` · `SITE_COPY_DECK_v0_1.md` · `VISUAL_COMPONENT_SPEC_v0_1.md` · `README_WORKSPACE_AUTHORITY.md`

---

## 1. Propósito

Este documento define la forma de los datos que el sitio consume. No es código. No define implementación ni estructura de archivos. No contiene JSON, TypeScript, ni ningún lenguaje de programación.

El contrato especifica: qué entidades existen, qué campos tiene cada una, cuáles son obligatorios, cuáles son derivados de fuentes canónicas existentes, y cuáles son campos de estado añadidos para el sitio. Define también reglas de validación que cualquier implementación debe respetar, y seis vistas derivadas que agrupan entidades para los componentes del sitio.

Un implementador que lea este documento puede construir los objetos de datos del sitio sin leer los archivos empíricos directamente. Las fuentes canónicas son la autoridad; este contrato es la interfaz entre esas fuentes y el frontend.

---

## 2. Principios de los datos

**La fuente canónica primero.** Todo campo empírico en cualquier entidad debe trazarse a una fuente canónica existente: `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv`, `NB10_democratic_actor_interpretive_matrix_v0_1.csv`, `NB10_democratic_document_interpretive_table_v0_1.csv`, o `MAPA_ORBITAL_ARGENTINO_v0_1.md`. Ningún campo empírico puede ser inventado, estimado, o imputado de otra fuente sin documentación explícita de esa derivación. Si un campo no está en la fuente canónica, el campo no existe en la entidad.

**Los caveats son campos obligatorios, no anotaciones.** El campo `required_caveat` existe en la entidad principal de cada actor y caso. No es un campo opcional ni un comentario de documentación. Una instancia de `ActorProfile` sin `required_caveat` es un registro inválido. Los badges de caveat que corresponden al estado de un registro no son decoración: son datos estructurales que el sitio debe leer y mostrar.

**El linaje es obligatorio.** Cada entidad con datos empíricos lleva el campo `corpus_lineage` con uno de los siguientes valores: `HCDN_PROMOTED_LAYER`, `PERON_ALT_PIPELINE`, `BLOCKED`. Este campo no puede ser nulo. Es la base para las reglas de separación Perón–HCDN y para la lógica de las vistas derivadas.

**La separación de Perón es estructural.** No existe ninguna entidad en este contrato que combine datos numéricos de la `PERON_ALT_PIPELINE` con datos del `HCDN_PROMOTED_LAYER` en el mismo objeto. Los campos `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo` del `ActorProfile` son exclusivos del corpus HCDN (calibración NB05). Los campos de Perón (`peron_mes_score`, `peron_pat_score`, `peron_tec_score`) son conteos proposicionales de la `PERON_ALT_PIPELINE`. Los dos conjuntos de campos nunca aparecen en el mismo objeto.

**El contenido bloqueado debe ser representable.** El sistema de datos puede representar un ítem bloqueado: un `PeronPhaseCard` con `blocked: true`, un `RoadmapItem` con `status: "bloqueado"`, una entidad con `source_status: "exclude_from_propositional_review"`. Lo que no puede hacer es omitir esas entidades. Perón 1973 tiene su propia entrada de datos con campos poblados (razón del bloqueo, acción requerida, estado de fuente) aunque no tenga contenido analítico.

**No existe campo `final_type`.** Ninguna entidad en este contrato tiene un campo que clasifique a un actor con un tipo fijo. Los campos `readiness_status` y `comparability_tier` comunican el nivel de robustez del perfil. No sustituyen a una tipología. No se añade este campo en ninguna implementación futura sin que exista una decisión documentada en el proyecto.

---

## 3. Artefactos fuente

| Artefacto | Ruta | Contribución al contrato |
|-----------|------|--------------------------|
| `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` | `tres_cuerpos_argentos/empirical/` | Entidad `CaseUnit` — un registro por actor o caso. Incluye actores HCDN, documentos Perón 1946/1954, y el bloqueo 1973. Fuente primaria para campos de linaje, configuración, cautela, caveats y estado. |
| `NB10_democratic_actor_interpretive_matrix_v0_1.csv` | `empirical/corpus_presidencial_hcdn/tables_promoted/` | Entidad `ActorProfile` — un registro por actor democrático HCDN. Contiene `avg_tecnocracia_v0`, `avg_paternalismo`, `avg_mesianismo`, `directed_two_body_configuration`, `stability_label`, `readiness_status`. Fuente primaria para campos de score y estabilidad. |
| `NB10_democratic_document_interpretive_table_v0_1.csv` | `empirical/corpus_presidencial_hcdn/tables_promoted/` | Entidad `DocumentRecord` — un registro por documento del corpus HCDN. Contiene `filename`, `year`, `genre`, `configuration`, `attractor_strength`, `total_score`, `gap`, `review_status`, `metadata_status`, `interpretation_status`, `notes`. |
| `MAPA_ORBITAL_ARGENTINO_v0_1.md` | `tres_cuerpos_argentos/empirical/` | Entidad `Configuration` (§3.2), descripciones de fase Perón (§6), proposiciones del mapa (§7), precondiciones v1 (§9). Fuente primaria para textos interpretativos de configuración y para los registros `PeronPhaseCard` y `RoadmapItem`. |
| `SITE_COPY_DECK_v0_1.md` | `tres_cuerpos_argentos/web/` | Textos públicos del sitio. Fuente para `plain_language_definition`, `SiteMeta`, copy de badges y banners. No es fuente de datos empíricos. |
| `VISUAL_COMPONENT_SPEC_v0_1.md` | `tres_cuerpos_argentos/web/` | Definición de los 10 `CaveatBadge`. Fuente para campos `badge_id`, `label`, `meaning`, `blocks_interaction`, `display_locations`. |

### Fuentes excluidas de este contrato

| Fuente | Razón de exclusión |
|--------|--------------------|
| `CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` (inglés) | No canónica — contiene errores de período y configuración. Marcada como non-canonical 2026-04-30. |
| Outputs NB01–NB04 | Supersedidos por calibración NB05. No usar como fuente de scores ni configuraciones. |
| `PILOT_FRAGMENT_CORPUS` | Unidad de análisis incompatible (fragmento ≠ documento). No pertenece al corpus HCDN. |
| Outputs pre-corrección Macri/AlbertoF | Perfil fusionado pre-corrección sin validez interpretativa. La corrección patch v0_2 (2026-04-29) es la versión válida. |

---

## 4. Entidades del contrato

El contrato define diez entidades:

| # | Entidad | Descripción breve |
|---|---------|------------------|
| E01 | `SiteMeta` | Metadatos globales del sitio: título, versión, banners, autoridad |
| E02 | `Vector` | Los tres vectores del modelo: tecnocracia, mesianismo, paternalismo |
| E03 | `Configuration` | Configuraciones dirigidas dos-cuerpos del corpus |
| E04 | `CaseUnit` | Unidad de caso derivada de `UNIFIED_CLEAN_CASE_MATRIX` — actor o documento Perón |
| E05 | `ActorProfile` | Perfil de actor democrático HCDN derivado de `NB10_democratic_actor_interpretive_matrix` |
| E06 | `DocumentRecord` | Registro de documento derivado de `NB10_democratic_document_interpretive_table` |
| E07 | `EvidenceExcerpt` | Fragmento de evidencia proposicional de los case packets NB09 |
| E08 | `CaveatBadge` | Sistema de 10 badges definido en `VISUAL_COMPONENT_SPEC_v0_1.md §12` |
| E09 | `RoadmapItem` | Precondición del mapa v1 derivada de `MAPA §9` |
| E10 | `PeronPhaseCard` | Card de fase Perón (1946, 1954, 1973 bloqueada) — pipeline separada |

---

## 5. SiteMeta (E01)

Una sola instancia. No tiene linaje empírico — es metadata de presentación.

| Campo | Tipo | Obligatorio | Fuente |
|-------|------|-------------|--------|
| `site_title` | string | sí | Copy deck §1 |
| `subtitle` | string | sí | Copy deck §1 |
| `thesis_short` | string | sí | Copy deck §1 — tesis en una oración |
| `thesis_long` | string | sí | Copy deck §1 — párrafo largo para metadescripción |
| `version` | string | sí | `"v0.1"` |
| `map_version` | string | sí | `"MAPA_ORBITAL_ARGENTINO_v0_1"` |
| `canonical_language` | string | sí | `"es"` |
| `caveat_banner` | string | sí | Copy deck §1 — texto del banner global |
| `footer_text` | string | sí | Copy deck §1 — texto del footer |
| `universal_actor_caveat` | string | sí | `"Hipótesis provisional — no clasificación histórica definitiva"` |
| `blocked_label` | string | sí | `"Evidencia no disponible — ver Roadmap"` |
| `last_updated` | string (fecha ISO) | sí | `"2026-04-30"` |
| `authority_files` | array de string | sí | Rutas de los artefactos canónicos primarios |

**Valores fijos para `authority_files`:**
```
[
  "empirical/UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md",
  "empirical/UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv",
  "empirical/MAPA_ORBITAL_ARGENTINO_v0_1.md"
]
```

---

## 6. Vector (E02)

Tres instancias fijas. No cambian entre versiones del corpus.

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `vector_id` | string (enum) | sí | `"tecnocracia"` / `"mesianismo"` / `"paternalismo"` |
| `name` | string | sí | Nombre largo: "Modernización tecnocrática" / "Mesianismo redentor" / "Paternalismo conservador" |
| `short_name` | string | sí | Nombre corto para badges y etiquetas: "Tecnocracia" / "Mesianismo" / "Paternalismo" |
| `short_definition` | string | sí | Copy deck §4 — definición corta |
| `what_it_is_not` | string | sí | Copy deck §4 — campo obligatorio de clarificación |
| `discourse_signals` | array de string | sí | Copy deck §4 — mínimo 3 señales |
| `over_detection_warning` | string | sí | Copy deck §4 — riesgo de sobredetección |
| `link_to_method` | string | sí | Ancla o ruta a sección Evidencia/Método del sitio |
| `color_token` | string | no | Token de diseño (decisión del implementador). Sin dependencia semántica: el color no puede ser el único indicador del vector. |

**Nota:** `color_token` es el único campo sin valor canónico en este contrato. La implementación puede añadirlo; si lo hace, no puede ser el único indicador del vector (regla de accesibilidad).

---

## 7. Configuration (E03)

Seis configuraciones del corpus democrático más una entrada `indeterminate`. Las configuraciones son pares dirigidos: `dominant_vector + secondary_vector` no es lo mismo que `secondary_vector + dominant_vector`. Esta distinción es estructural, no decorativa.

| Campo | Tipo | Obligatorio | Fuente |
|-------|------|-------------|--------|
| `configuration_id` | string (enum) | sí | Slug derivado: `"pat_tec"`, `"tec_pat"`, `"tec_mes"`, `"pat_mes"`, `"pat_none"`, `"mes_tec"`, `"indeterminate"` |
| `dominant_vector` | string (ref Vector.vector_id) | sí | Vector que domina en la configuración |
| `secondary_vector` | string (ref Vector.vector_id) ó null | sí | Vector secundario; `null` solo para `"pat_none"` |
| `directed_label` | string | sí | Etiqueta con signo de dirección: `"paternalismo+tecnocracia"` — el orden no es intercambiable |
| `document_count` | integer | sí | Número de documentos HCDN con esta configuración como modal. Fuente: `MAPA §3.2` |
| `actor_count` | integer | sí | Número de actores que exhiben esta configuración en al menos un documento. Fuente: `MAPA §3.2` |
| `corpus_percentage` | float | sí | Porcentaje del corpus de 51 documentos. Fuente: `MAPA §3.2` |
| `plain_language_definition` | string | sí | Copy deck §5 — definición en lenguaje accesible |
| `interpretation` | string | sí | Texto interpretativo del corpus. Fuente: `MAPA §4` |
| `associated_case_unit_ids` | array de string (ref CaseUnit.case_unit_id) | sí | Todos los casos donde esta configuración aparece (a nivel modal o actor-avg) |
| `featured_case_unit_id` | string (ref CaseUnit.case_unit_id) | no | Caso más robusto o más ilustrativo para destacar |
| `caveats` | array de string | sí | Texto de caveat metodológico. Mínimo uno. |
| `status` | string (enum) | sí | `"dominant"` (86% del corpus) / `"minor"` / `"marginal"` / `"indeterminate"` |

**Instancias requeridas:**

| `configuration_id` | `directed_label` | `document_count` | `corpus_percentage` | `status` |
|-------------------|-----------------|-----------------|--------------------|---------| 
| `pat_tec` | `paternalismo+tecnocracia` | 25 | 49 | `dominant` |
| `tec_pat` | `tecnocracia+paternalismo` | 19 | 37 | `dominant` |
| `tec_mes` | `tecnocracia+mesianismo` | 3 | 6 | `minor` |
| `pat_mes` | `paternalismo+mesianismo` | 2 | 4 | `minor` |
| `pat_none` | `paternalismo+none` | 1 | 2 | `marginal` |
| `mes_tec` | `mesianismo+tecnocracia` | 1 | 2 | `marginal` |
| `indeterminate` | `indeterminate` | 0 | 0 | `indeterminate` |

**Regla crítica:** `pat_tec` y `tec_pat` son entidades distintas. No se normalizan. No se fusionan bajo ningún rótulo de "díada tec/pat" como identificador de una sola configuración. La distinción de dirección es el argumento analítico central de M2 en el mapa.

---

## 8. CaseUnit (E04)

Derivado directamente de `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv`. Un registro por fila del CSV. El CSV tiene 14 registros: 10 actores HCDN, 2 documentos limpios de Perón, y 1 bloqueo (Perón 1973). Un registro adicional se documenta en el MAPA (Rodríguez Saá), que también aparece en el CSV.

| Campo | Tipo | Obligatorio | Fuente en CSV |
|-------|------|-------------|---------------|
| `case_unit_id` | string | sí | Columna `case_unit` (ej. `MENEM_1990_1999`) |
| `display_name` | string | sí | Columna `actor` (ej. `"Carlos Menem"`) |
| `period_or_years` | string | sí | Columna `period_or_years` |
| `corpus_lineage` | string (enum) | sí | Columna `corpus_lineage` (`HCDN_PROMOTED_LAYER` / `PERON_ALT_PIPELINE`) |
| `comparability_tier` | string | sí | Columna `comparability_tier` (ej. `TIER_1_HCDN_DEMOCRATIC_ACTOR_PROFILE`) |
| `source_status` | string | sí | Columna `source_status` (ej. `canonical_promoted`, `usable_one_document_hypothesis`, `exclude_from_propositional_review`) |
| `coverage_level` | string | sí | Columna `coverage_level` — descripción del corpus disponible |
| `dominant_configuration` | string | sí | Columna `dominant_configuration` |
| `secondary_or_tertiary_vector` | string | sí | Columna `secondary_or_tertiary_vector` |
| `interpretive_strength` | string | sí | Columna `attractor_strength_or_interpretive_strength` |
| `main_evidence_basis` | string | sí | Columna `main_evidence_basis` |
| `interpretive_hypothesis` | string | sí | Columna `interpretive_hypothesis` — texto de hipótesis; tratado como provisional |
| `caution_level` | string (enum) | sí | Columna `caution_level` (`low` / `medium` / `high` / `BLOQUEADO`) |
| `required_caveat` | string | sí | Columna `required_caveat` — campo obligatorio en display |
| `next_evidence_needed` | string | sí | Columna `next_evidence_needed` |
| `include_in_hcdn_actor_map` | boolean | sí | Derivado: `true` solo si `corpus_lineage == "HCDN_PROMOTED_LAYER"` y `source_status != "exclude_from_propositional_review"` |
| `include_in_peron_lane` | boolean | sí | Derivado: `true` solo si `corpus_lineage == "PERON_ALT_PIPELINE"` |
| `blocked` | boolean | sí | Derivado: `true` si `source_status == "exclude_from_propositional_review"` o si `comparability_tier` contiene `"BLOQUEADO"` |
| `blocked_reason` | string ó null | condicional | Obligatorio si `blocked == true`. Derivado del `interpretive_hypothesis` del CSV para el registro bloqueado. |

**Instancias del CSV:**

| `case_unit_id` | `corpus_lineage` | `caution_level` | `blocked` | `include_in_hcdn_actor_map` |
|----------------|-----------------|----------------|----------|----------------------------|
| `PERON_1946_ASUNCION` | `PERON_ALT_PIPELINE` | alto (un solo doc) | false | false |
| `PERON_1954_APERTURA` | `PERON_ALT_PIPELINE` | alto (un solo doc) | false | false |
| `ALFONSIN_1983_1989` | `HCDN_PROMOTED_LAYER` | medium | false | true |
| `MENEM_1990_1999` | `HCDN_PROMOTED_LAYER` | low | false | true |
| `DELARUA_1999_2001` | `HCDN_PROMOTED_LAYER` | medium | false | true |
| `DUHALDE_2002_2003` | `HCDN_PROMOTED_LAYER` | medium | false | true |
| `KIRCHNER_2003_2007` | `HCDN_PROMOTED_LAYER` | medium | false | true |
| `CFK_2007_2015` | `HCDN_PROMOTED_LAYER` | low | false | true |
| `MACRI_2015_2019` | `HCDN_PROMOTED_LAYER` | medium | false | true |
| `ALBERTOF_2019_2022` | `HCDN_PROMOTED_LAYER` | high | false | true |
| `MILEI_2024_2025` | `HCDN_PROMOTED_LAYER` | medium | false | true |
| `RODRIGUEZSA_2001` | `HCDN_PROMOTED_LAYER` | high | false | true |
| `PERON_1973_ASUNCION_BLOQUEADA` | `PERON_ALT_PIPELINE` | BLOQUEADO | **true** | false |

---

## 9. ActorProfile (E05)

Derivado de `NB10_democratic_actor_interpretive_matrix_v0_1.csv`. Solo actores del corpus democrático HCDN. Perón no tiene `ActorProfile`. Rodríguez Saá tiene `ActorProfile` pero con `readiness_status: "single_document"`.

| Campo | Tipo | Obligatorio | Fuente en CSV |
|-------|------|-------------|---------------|
| `actor_id` | string | sí | Slug derivado: `alfonsin`, `menem`, `delarua`, `duhalde`, `kirchner`, `cfk`, `macri`, `albertof`, `milei`, `rodriguezsa` |
| `display_name` | string | sí | Columna `actor` |
| `period` | string | sí | Columna `years_covered` |
| `n_documents` | integer | sí | Columna `n_docs` |
| `directed_configuration` | string | sí | Columna `directed_two_body_configuration` |
| `dominant_vector` | string (ref Vector.vector_id) | sí | Columna `dominant_vector` |
| `secondary_vector` | string (ref Vector.vector_id) | sí | Columna `secondary_vector` |
| `avg_tecnocracia` | float | sí | Columna `avg_tecnocracia_v0` — score NB05 calibrado. **No para display prominente.** Solo para cálculos de ranking interno. |
| `avg_paternalismo` | float | sí | Columna `avg_paternalismo` — mismo aviso |
| `avg_mesianismo` | float | sí | Columna `avg_mesianismo` — mismo aviso |
| `attractor_strength_summary` | string ó null | no | Columna `attractor_strength_summary` — puede estar vacía en el CSV; derivar de `DocumentRecord` si está vacía |
| `transition_count` | integer | sí | Columna `n_configuration_transitions` |
| `stability_label` | string (enum) | sí | Columna `stability_label` (`stable` / `moderate` / `unstable`) |
| `caution_level` | string (enum) | sí | Columna `caution_level` |
| `readiness_status` | string | sí | Columna `readiness_status` (ej. `strong_provisional`, `provisional`, `provisional_high_caution`, `provisional_insufficient_corpus`, `single_document`) |
| `main_hypothesis` | string | sí | Columna `main_interpretive_hypothesis` — texto de hipótesis; siempre provisional |
| `required_caveat` | string | sí | Columna `required_caveat` — campo obligatorio en display |
| `document_ids` | array de string (ref DocumentRecord.document_id) | sí | Todos los `document_id` del actor en el corpus |
| `linked_case_unit_id` | string (ref CaseUnit.case_unit_id) | sí | Enlace al registro `CaseUnit` correspondiente |
| `caveat_badges` | array de string (ref CaveatBadge.badge_id) | sí | Ver lógica de asignación de badges bajo esta tabla |
| `include_in_actor_map` | boolean | sí | `true` para los 10 actores democráticos. Nunca `true` para Perón. |

**Aviso sobre `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo`:** estos campos están disponibles en el contrato para uso interno (ordenar actores por score, verificar consistencia). No deben mostrarse como cifras prominentes en ningún componente de cara al usuario, de acuerdo con `VISUAL_COMPONENT_SPEC_v0_1.md §10` ("el componente no muestra scores en bruto") y `§11` ("los scores NB05 brutos no se muestran en el drawer").

**Lógica de asignación de `caveat_badges` por actor:**

| Actor | Badges mínimos obligatorios |
|-------|---------------------------|
| Todos | `["PROVISIONAL"]` |
| Menem, CFK (caution=low, n≥9) | `["PROVISIONAL", "HCDN_ONLY"]` |
| Alfonsín, De la Rúa, Duhalde, Kirchner | `["PROVISIONAL", "HCDN_ONLY"]` |
| Macri | `["PROVISIONAL", "HCDN_ONLY", "METADATA_CORREGIDA"]` |
| AlbertoF | `["PROVISIONAL", "HCDN_ONLY", "METADATA_CORREGIDA"]` |
| Milei | `["PROVISIONAL", "HCDN_ONLY", "LOW_N"]` |
| Rodríguez Saá | `["PROVISIONAL", "HCDN_ONLY", "LOW_N"]` |
| De la Rúa, Duhalde, Kirchner (n=3 o n=5) | añadir `"LOW_N"` si n<4 |

---

## 10. DocumentRecord (E06)

Derivado de `NB10_democratic_document_interpretive_table_v0_1.csv`. Un registro por fila. El CSV actual tiene 51 registros para los 10 actores democráticos del corpus HCDN.

| Campo | Tipo | Obligatorio | Fuente en CSV |
|-------|------|-------------|---------------|
| `document_id` | string | sí | Derivado del `filename`: slug normalizado (ej. `menem_1992`, `cfk_2008_apertura`) |
| `filename` | string | sí | Columna `filename` — nombre exacto del archivo en `corpus/analysis_ready/` |
| `actor_id` | string (ref ActorProfile.actor_id) | sí | Slug del actor derivado de columna `actor` |
| `actor_display_name` | string | sí | Columna `actor` |
| `year` | float | sí | Columna `year` |
| `period_label` | string | sí | Columna `period` (ej. `"8. Menemismo y colapso (1989–2002)"`) |
| `genre` | string (enum) | sí | Columna `genre` — todos los registros actuales tienen `"apertura"` |
| `corpus_lineage` | string | sí | `"HCDN_PROMOTED_LAYER"` para todos los registros de esta tabla |
| `dominant_vector` | string (ref Vector.vector_id) | sí | Columna `dominant_vector` |
| `secondary_vector` | string (ref Vector.vector_id) ó null | sí | Columna `secondary_vector` (`null` para `paternalismo+none`) |
| `configuration` | string (ref Configuration.directed_label) | sí | Columna `configuration` — mantener como string exacto del CSV |
| `attractor_strength` | string (enum) | sí | Columna `attractor_strength` (`strong` / `medium` / `weak` / `indeterminate`) |
| `total_score` | float | sí | Columna `total_score` — **uso interno, no display público** |
| `gap` | float | sí | Columna `gap` — **uso interno, no display público** |
| `review_status` | string | sí | Columna `review_status` (`not_in_active_queue` / `cleared_provisional` / `still_ambiguous`) |
| `metadata_status` | string | sí | Columna `metadata_status` (`clean` / `corrected_v0_2`) |
| `interpretation_status` | string | sí | Columna `interpretation_status` (`usable` / `usable_provisional` / `usable_low_weight`) |
| `notes` | string ó null | no | Columna `notes` — vacío en muchos registros; puede ser null |
| `has_nb05_ambiguity_flag` | boolean | sí | Derivado: `true` si `notes` contiene `"NB05 ambiguity flag"` |
| `is_low_weight` | boolean | sí | Derivado: `true` si `interpretation_status == "usable_low_weight"` |
| `is_indeterminate_attractor` | boolean | sí | Derivado: `true` si `attractor_strength == "indeterminate"` |
| `is_corrected` | boolean | sí | Derivado: `true` si `metadata_status == "corrected_v0_2"` |
| `include_in_timeline` | boolean | sí | `true` para todos los documentos; documentos `low_weight` y `indeterminate` se muestran con marcador diferente, no se omiten |

**Aviso sobre `total_score` y `gap`:** estos campos son necesarios para cálculos internos de consistencia y para verificar la derivación de `attractor_strength`. No se muestran en el frontend público. El campo `gap` es la diferencia entre el score del vector dominante y el secundario (sobre `total_score`). El campo `total_score` es la suma de los tres vectores calibrados. Ni el total ni el gap deben mostrarse directamente al usuario.

**Documentos con estado especial (del CSV):**

| `filename` (abreviado) | Actor | Estado especial |
|-----------------------|-------|----------------|
| `01.03.2018As.txt` | Macri | `interpretation_status: usable_low_weight`, `attractor_strength: indeterminate` |
| `Mensaje Presidencial 2019.txt` | AlbertoF | `metadata_status: corrected_v0_2`, `attractor_strength: indeterminate`, `gap: 0.0` |
| `1988-12-21_Asamblea_Legislativa_Extraordinaria_Alfonsin.txt` | Alfonsín | `interpretation_status: usable_low_weight`, `attractor_strength: indeterminate`, `gap: 0.0` |

---

## 11. EvidenceExcerpt (E07)

Derivado de los case packets NB09 (`empirical/corpus_presidencial_hcdn/case_packets/`). Los case packets no han sido leídos directamente en este contrato, pero su estructura esperada se define aquí para implementación futura. Los campos marcados con `(NB09)` deben derivarse de esos archivos cuando estén disponibles.

| Campo | Tipo | Obligatorio | Fuente |
|-------|------|-------------|--------|
| `evidence_id` | string | sí | Slug derivado: `{actor_id}_{year}_{vector}_{n}` |
| `linked_case_unit_id` | string (ref CaseUnit.case_unit_id) | sí | Caso al que pertenece el extracto |
| `linked_actor_id` | string (ref ActorProfile.actor_id) ó null | sí | Actor; null solo para extractos del corpus Perón |
| `linked_document_id` | string (ref DocumentRecord.document_id) ó null | no | Documento específico si aplica |
| `vector` | string (ref Vector.vector_id) | sí | Vector que activa este extracto |
| `pattern_label` | string ó null | no | Nombre del patrón proposicional activado (ej. `"Reforma institucional como necesidad técnica"`) (NB09) |
| `excerpt_text` | string | sí | Texto del segmento del discurso, truncado si es largo. Máximo 300 caracteres para display. (NB09) |
| `source_file` | string | sí | Nombre del archivo fuente (ref DocumentRecord.filename) |
| `source_line_or_segment` | string ó null | no | Referencia de línea o segmento en el archivo fuente (NB09) |
| `caution_level` | string (enum) | sí | Heredado del `ActorProfile.caution_level` o `CaseUnit.caution_level` del actor |
| `display_context` | string | sí | Descripción del contexto del extracto para el usuario (ej. `"Apertura legislativa 1992 — paternalismo extremo"`) |
| `authorized_for_public_display` | boolean | sí | `true` si el extracto deriva de documentos con `interpretation_status: usable` o `usable_provisional`. `false` para `usable_low_weight` sin revisión explícita. |

**Restricción de display (del visual spec §11):** los extractos de Perón (1946, 1954) se muestran en un drawer separado con el encabezado de separación metodológica y el badge `PERON_ALT_SOURCE`. No se muestran en el mismo drawer que los extractos HCDN.

**Estado en v0.1:** los case packets NB09 existen como archivos en `empirical/corpus_presidencial_hcdn/case_packets/` pero no han sido parseados estructuradamente para este contrato. La implementación del prototipo estático puede usar extractos cualitativos del `MAPA §5` como fuente provisional para los campos `excerpt_text` y `display_context` hasta que los NB09 sean parseados formalmente.

---

## 12. CaveatBadge (E08)

Diez instancias fijas, derivadas de `VISUAL_COMPONENT_SPEC_v0_1.md §12`. No cambian entre versiones del corpus hasta que el spec visual sea actualizado.

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `badge_id` | string (enum) | sí | Identificador único del badge |
| `label` | string | sí | Texto visible en el badge |
| `meaning` | string | sí | Descripción del significado del badge para display en tooltip o leyenda |
| `severity` | string (enum) | sí | `"info"` / `"caution"` / `"high"` / `"blocking"` |
| `blocks_interaction` | boolean | sí | `true` si el badge impide que el contenido se use con fines analíticos (ej. comparación numérica prohibida incluso con el badge) |
| `display_locations` | array de string | sí | Componentes donde debe aparecer (refs a IDs de componentes del visual spec) |
| `required_microcopy` | string | sí | Texto de explicación que debe mostrarse junto al badge |

**Instancias de los diez badges:**

| `badge_id` | `label` | `severity` | `blocks_interaction` |
|-----------|---------|-----------|---------------------|
| `CANONICO` | `CANÓNICO` | `info` | false |
| `PROVISIONAL` | `HIPÓTESIS PROVISIONAL` | `caution` | false |
| `LOW_N` | `CORPUS INSUFICIENTE (n=X)` | `caution` | false |
| `REVIEW_ONLY` | `SOLO REFERENCIA — NO CITADO COMO EVIDENCIA` | `high` | true |
| `BLOQUEADO` | `BLOQUEADO — EVIDENCIA NO DISPONIBLE` | `blocking` | true |
| `NO_COMPARABLE_NUMERICAMENTE` | `NO COMPARABLE NUMÉRICAMENTE CON CORPUS HCDN` | `blocking` | true |
| `METADATA_CORREGIDA` | `PERFIL CORREGIDO — PENDIENTE VALIDACIÓN` | `caution` | false |
| `SOURCE_FAILURE` | `FALLA DE FUENTE DOCUMENTADA` | `blocking` | true |
| `HCDN_ONLY` | `CORPUS HCDN — NO INCLUYE PERÓN` | `info` | false |
| `PERON_ALT_SOURCE` | `PERON_ALT_PIPELINE — INSTRUMENTO DIFERENTE AL CORPUS HCDN` | `caution` | false |

**`required_microcopy` para badges de alta severidad:**

`NO_COMPARABLE_NUMERICAMENTE`:
```
Los datos de la PERON_ALT_PIPELINE (scores MES/PAT/TEC de PERON_NB02) no están en la
misma escala que los scores NB05 calibrados del corpus democrático HCDN. No existe nota
puente entre las dos pipelines. Este badge no autoriza la comparación: la comparación
numérica está prohibida incluso cuando el badge está presente.
```

`BLOQUEADO`:
```
El contenido de esta entrada no está disponible en ninguna pipeline activa.
La razón del bloqueo está documentada en el campo blocked_reason.
Ver Roadmap para la condición de desbloqueo.
```

`SOURCE_FAILURE`:
```
La fuente identificada para este contenido no contiene el material que debería contener.
Se requiere una fuente alternativa verificada antes de cualquier análisis.
```

---

## 13. RoadmapItem (E09)

Siete instancias derivadas de `MAPA_ORBITAL_ARGENTINO_v0_1.md §9`. Las precondiciones son secuenciales: P2 depende de P1, P3 depende de P2, P4 depende de P3.

| Campo | Tipo | Obligatorio | Fuente |
|-------|------|-------------|--------|
| `roadmap_id` | string (enum) | sí | `"P1"` … `"P7"` |
| `title` | string | sí | Título breve de la precondición. Fuente: `MAPA §9` |
| `description` | string | sí | Descripción completa. Fuente: `SITE_COPY_DECK_v0_1.md §10` |
| `status` | string (enum) | sí | `"completado"` / `"pendiente"` / `"bloqueado"` |
| `unlocks` | array de string (ref RoadmapItem.roadmap_id) | sí | Condiciones que se desbloquean cuando esta se completa. Vacío para P5, P6. |
| `depends_on` | array de string (ref RoadmapItem.roadmap_id) | sí | Condiciones que deben completarse antes. Vacío para P1, P5, P6. |
| `related_blocked_content` | array de string | sí | IDs de entidades bloqueadas que esperan esta condición (ej. `"PERON_1973_ASUNCION_BLOQUEADA"`) |
| `priority` | string (enum) | sí | `"alta"` / `"media"` — P1 es la de mayor impacto encadenado |

**Instancias de los siete items:**

| `roadmap_id` | `title` | `status` | `depends_on` | `unlocks` | `priority` |
|-------------|---------|---------|-------------|----------|-----------|
| `P1` | Fuente verificada del discurso de Perón del 12 de octubre de 1973 | `pendiente` | `[]` | `["P2"]` | `alta` |
| `P2` | Procesamiento de esa fuente con controles BLQ equivalentes a 1946 y 1954 | `bloqueado` | `["P1"]` | `["P3"]` | `alta` |
| `P3` | Perfil tri-documento de Perón (PERON_NB04: 1946 + 1954 + 1973) | `bloqueado` | `["P2"]` | `["P4"]` | `alta` |
| `P4` | Nota puente formal entre PERON_ALT_PIPELINE y corpus HCDN | `bloqueado` | `["P3"]` | `["P7"]` | `alta` |
| `P5` | Corpus Milei ampliado a n≥4 | `pendiente` | `[]` | `["P7"]` | `media` |
| `P6` | Decisión sobre re-run completo de pipeline HCDN v1 | `pendiente` | `[]` | `["P7"]` | `media` |
| `P7` | Producción de MAPA_ORBITAL_ARGENTINO_v1.md | `bloqueado` | `["P4", "P5", "P6"]` | `[]` | `alta` |

---

## 14. PeronPhaseCard (E10)

Tres instancias fijas: 1946, 1954, y 1973 bloqueada. Estas entidades son estructuralmente distintas de `ActorProfile`. No tienen campos de score NB05. No tienen `include_in_actor_map`. Aparecen solo en el componente C10 (Perón separated lane).

| Campo | Tipo | Obligatorio | Fuente |
|-------|------|-------------|--------|
| `phase_id` | string (enum) | sí | `"peron_1946"` / `"peron_1954"` / `"peron_1973_blocked"` |
| `year` | integer | sí | `1946` / `1954` / `1973` |
| `title` | string | sí | Título del card. Fuente: `SITE_COPY_DECK_v0_1.md §7` |
| `source_id` | string | sí | Identificador de la fuente PERON_ALT_PIPELINE (`PERON_SRC_003` / `PERON_SRC_013` / `PERON_SRC_015`) |
| `source_status` | string | sí | Del CSV: `usable_one_document_hypothesis` / `exclude_from_propositional_review` |
| `corpus_lineage` | string | sí | `"PERON_ALT_PIPELINE"` siempre |
| `configuration_hypothesis` | string ó null | condicional | Configuración hipotética derivada de los datos proposicionales. `null` si `blocked == true`. |
| `vector_ranking` | objeto `{first, second, third}` ó null | condicional | Jerarquía de vectores. `null` si `blocked == true`. |
| `peron_mes_score` | integer ó null | condicional | Score MES de PERON_NB02. `null` si bloqueado. **No comparable con avg_mesianismo HCDN.** |
| `peron_pat_score` | integer ó null | condicional | Score PAT de PERON_NB02. `null` si bloqueado. |
| `peron_tec_score` | integer ó null | condicional | Score TEC de PERON_NB02. `null` si bloqueado. |
| `n_segments` | integer ó null | condicional | Número de segmentos del documento. `null` si bloqueado. Fuente: `MAPA §6.1` |
| `word_count` | integer ó null | condicional | Palabras limpias del documento. `null` si bloqueado. |
| `ocr_uncertainty` | float ó null | condicional | Porcentaje de incertidumbre OCR. `null` si bloqueado. |
| `phase_interpretation` | string ó null | condicional | Texto interpretativo de la fase. `null` si bloqueado. Fuente: `SITE_COPY_DECK_v0_1.md §7` |
| `caveats` | array de string | sí | Siempre incluye texto explícito de no-comparabilidad |
| `caveat_badges` | array de string (ref CaveatBadge.badge_id) | sí | Ver tabla debajo |
| `blocked` | boolean | sí | `true` solo para 1973 |
| `blocked_reason` | string ó null | condicional | Obligatorio si `blocked == true`. Fuente: CSV columna `interpretive_hypothesis` del registro `PERON_1973_ASUNCION_BLOQUEADA` |
| `next_action` | string ó null | no | Para el card bloqueado: acción requerida con fuentes prioritarias |
| `linked_roadmap_item_id` | string (ref RoadmapItem.roadmap_id) ó null | no | Enlace a la precondición del roadmap que desbloquearía este card |

**Asignación de `caveat_badges`:**

| `phase_id` | `caveat_badges` |
|-----------|----------------|
| `peron_1946` | `["PROVISIONAL", "PERON_ALT_SOURCE", "NO_COMPARABLE_NUMERICAMENTE"]` |
| `peron_1954` | `["PROVISIONAL", "PERON_ALT_SOURCE", "NO_COMPARABLE_NUMERICAMENTE"]` |
| `peron_1973_blocked` | `["BLOQUEADO", "SOURCE_FAILURE", "PERON_ALT_SOURCE"]` |

**Valores de los campos numéricos Perón (del MAPA §6.1):**

| `phase_id` | `n_segments` | `word_count` | `ocr_uncertainty` | `peron_mes_score` | `peron_pat_score` | `peron_tec_score` |
|-----------|-------------|-------------|------------------|------------------|------------------|------------------|
| `peron_1946` | 45 | 5072 | 2.80 | 82 | 64 | 63 |
| `peron_1954` | 90 | 4621 | 2.16 | 122 | 110 | 54 |
| `peron_1973_blocked` | null | null | null | null | null | null |

---

## 15. Vistas derivadas

Las vistas son proyecciones de las entidades base, con filtros y restricciones específicas para cada componente del sitio. No son entidades nuevas — son formas de leer las entidades existentes.

---

### Vista 1 — homepage_featured_configurations

**Propósito:** Mostrar en la página de inicio las tres configuraciones destacadas del copy deck.

**Entidades de entrada:** `Configuration`, `CaseUnit`, `ActorProfile`

**Filtros:**
- Seleccionar específicamente: `pat_tec` (caso Menem), `tec_mes` (caso Milei), `pat_mes` (inauguraciones de crisis)
- Para `pat_tec`: `featured_case_unit_id = "MENEM_1990_1999"`
- Para `tec_mes`: `featured_case_unit_id = "MILEI_2024_2025"`
- Para `pat_mes`: featured cases = `["RODRIGUEZSA_2001", "DUHALDE_2002_2003"]`

**Caveats obligatorios en la vista:**
- Para `tec_mes` (Milei): el texto del caso debe incluir "n=2 — hipótesis no confirmada" sin excepción
- Para `pat_mes`: el texto debe incluir que el patrón describe el contexto de crisis, no a los actores

**Contenido prohibido:** no se puede mostrar la vista `peron_lane_view` en la misma área visual que esta vista. Las configuraciones de Perón no aparecen aquí.

---

### Vista 2 — democratic_actor_map_view

**Propósito:** Grilla de los 10 actores democráticos para el mapa orbital (C04) y la página de actores.

**Entidades de entrada:** `ActorProfile`, `CaveatBadge`

**Filtros:**
- `include_in_actor_map == true`
- `corpus_lineage == "HCDN_PROMOTED_LAYER"` (redundante con el campo anterior, pero explícito como segunda verificación)

**Campos proyectados por tarjeta:** `display_name`, `period`, `directed_configuration`, `n_documents`, `caution_level`, `readiness_status`, `caveat_badges`, `required_caveat` (versión corta)

**Campos NO expuestos en la vista:** `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo`, `total_score`, `gap` de documentos

**Caveats obligatorios en la vista:** badge `PROVISIONAL` siempre visible en cada tarjeta. Badge `LOW_N` visible para actores con n<4. Badge `METADATA_CORREGIDA` visible para Macri y AlbertoF.

**Contenido prohibido:** ningún registro de `PeronPhaseCard` puede aparecer en esta vista. El campo `include_in_actor_map` es la barrera estructural.

---

### Vista 3 — configuration_family_view

**Propósito:** Tarjetas de familias de configuración (C05) para el mapa orbital y la página Los tres cuerpos.

**Entidades de entrada:** `Configuration`, `CaseUnit`, `ActorProfile`

**Filtros:**
- Incluir todas las instancias de `Configuration`
- Ordenar por `document_count` descendente: `pat_tec` (25) → `tec_pat` (19) → `tec_mes` (3) → `pat_mes` (2) → `pat_none` (1) → `mes_tec` (1) → `indeterminate`
- Para cada configuración, los `associated_case_unit_ids` deben resolverse a registros de `CaseUnit` con `include_in_hcdn_actor_map == true` (solo actores HCDN)

**Caveats obligatorios en la vista:** para `tec_mes` (Milei como caso asociado): caveat de n=2 obligatorio. Para `pat_mes` (Rodríguez Saá): caveat de n=1 obligatorio.

**Contenido prohibido:** los casos Perón no aparecen como `associated_case_units` en ninguna familia de configuración. Los documentos 1946 y 1954 de Perón tienen sus propias configuraciones hipotéticas pero no comparten escala con las configuraciones HCDN.

---

### Vista 4 — actor_timeline_view

**Propósito:** Línea de tiempo por actor para el componente C07.

**Entidades de entrada:** `DocumentRecord`, `ActorProfile`

**Filtros:**
- `actor_id == {actor_id}` — una instancia de la vista por actor
- Ordenar por `year` ascendente
- Incluir todos los documentos, incluso los `is_low_weight == true` y `is_indeterminate_attractor == true` — mostrar con marcador diferente, no omitir

**Campos proyectados por punto:** `year`, `genre`, `configuration`, `attractor_strength`, `has_nb05_ambiguity_flag`, `is_low_weight`, `is_indeterminate_attractor`, `is_corrected`, `notes`

**Campos NO expuestos:** `total_score`, `gap`

**Gaps de corpus como puntos vacíos:** para actores con gaps documentados, la vista debe incluir un punto vacío con `year` y `actor_id`, `configuration: null`, `attractor_strength: null`, `notes: "No disponible en corpus v0.1"`:

| Actor | Gaps documentados |
|-------|------------------|
| AlbertoF | Apertura 2023 ausente |
| CFK | Apertura 2009 posiblemente ausente |
| Milei | Inaugural dic. 2023 posiblemente ausente; apertura 2026 pendiente |

**Caveats obligatorios en la vista:** la línea de tiempo de Macri lleva una nota de encabezado: "Corpus corregido (patch v0_2, 2026-04-29). No incluye el documento 2019 (corresponde a Alberto Fernández)."

---

### Vista 5 — peron_lane_view

**Propósito:** Carril de Perón separado (C10).

**Entidades de entrada:** `PeronPhaseCard`

**Filtros:** ninguno — las tres instancias siempre aparecen juntas, en orden cronológico.

**Orden:** `peron_1946` → `peron_1954` → `peron_1973_blocked`

**Contexto obligatorio de la vista:** el divisor de separación metodológica es parte de la vista, no del componente. El texto del divisor es:
```
PERÓN 1946–1954 — Pipeline alternativa de fuentes
Instrumento diferente al corpus HCDN.
Los datos no son comparables numéricamente con los actores democráticos.
No existe nota puente entre las dos pipelines.
```

**Contenido prohibido:** esta vista nunca aparece en la misma representación numérica que `democratic_actor_map_view`. El badge `NO_COMPARABLE_NUMERICAMENTE` y el badge `PERON_ALT_SOURCE` están en todos los cards no bloqueados.

---

### Vista 6 — roadmap_view

**Propósito:** Tracker del roadmap v1 (C11).

**Entidades de entrada:** `RoadmapItem`

**Filtros:** ninguno — los siete items siempre visibles.

**Orden:** P1 → P2 → P3 → P4 (cadena principal) + P5, P6 (independientes) → P7 (final).

**Campos proyectados:** `roadmap_id`, `title`, `description`, `status`, `depends_on`, `unlocks`, `related_blocked_content`

**Visualización de dependencias:** la relación `depends_on` / `unlocks` se muestra como encadenamiento visual (P2 bajo P1 en jerarquía, P3 bajo P2, etc.). P5 y P6 son paralelos a la cadena principal, ambos apuntan a P7.

---

## 16. Reglas de validación

Las reglas siguientes deben ser verificables programáticamente cuando se produzcan los archivos de datos del sitio. No son sugerencias: son invariantes del contrato.

**R01 — Perón nunca aparece en el mapa democrático.**
Ninguna instancia de `PeronPhaseCard` puede tener `include_in_actor_map: true`. El campo no existe en `PeronPhaseCard`. Si se añadiera, es un error de esquema. Ninguna vista derivada que tenga filtro `corpus_lineage == "HCDN_PROMOTED_LAYER"` puede devolver registros de Perón.

**R02 — Perón 1973 aparece como bloqueado, no omitido.**
La instancia `peron_1973_blocked` de `PeronPhaseCard` debe existir en los datos. `blocked: true`. `blocked_reason` no puede ser null. La vista `peron_lane_view` devuelve tres cards, no dos.

**R03 — La síntesis en inglés no puede ser una fuente.**
`CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` no aparece en ningún campo `authority_files` ni en ningún `linked_source` de ninguna entidad. Si aparece, es un error.

**R04 — No existe campo `final_type` en ninguna entidad.**
Ningún schema en este contrato define el campo `final_type`. Si una implementación añade ese campo, viola el principio de datos 6 y el C-MAP-07 del mapa. El campo prohibido tampoco puede disfrazarse bajo otro nombre que comunique tipología fija (ej. `actor_type`, `rhetorical_type`, `classification`).

**R05 — Todos los registros provisional/low-n/review-only llevan badges.**
Cualquier `ActorProfile` con `readiness_status` que contenga `provisional` lleva al menos el badge `PROVISIONAL`. Cualquier `ActorProfile` con `n_documents < 4` lleva además `LOW_N`. Cualquier `ActorProfile` con `metadata_status: corrected_v0_2` lleva `METADATA_CORREGIDA`. Ningún registro puede estar en los datos sin los badges que le corresponden.

**R06 — Las configuraciones A+B y B+A son entidades distintas.**
`configuration_id: "pat_tec"` y `configuration_id: "tec_pat"` son dos registros de `Configuration`. No se fusionan. No se normalizan. No se agrupan bajo un identificador compartido. Un `DocumentRecord` con `configuration: "paternalismo+tecnocracia"` referencia `"pat_tec"`, no `"tec_pat"`.

**R07 — Los extractos de evidencia tienen referencia de fuente.**
Todo `EvidenceExcerpt` tiene `source_file` no nulo. Un extracto sin referencia de fuente no puede tener `authorized_for_public_display: true`.

**R08 — El contenido bloqueado tiene `blocked_reason`.**
Todo registro con `blocked: true` tiene `blocked_reason` no nulo y no vacío. Se aplica a `CaseUnit`, `PeronPhaseCard`, y cualquier otra entidad que implemente el campo `blocked`. La razón del bloqueo es texto en español, no un código.

**R09 — Los scores numéricos de Perón y los scores HCDN no coexisten en ningún objeto.**
Ningún objeto en el sistema de datos tiene a la vez campos `avg_tecnocracia` (HCDN) y `peron_mes_score` (PERON_NB02). Los dos conjuntos de campos pertenecen a entidades distintas (`ActorProfile` y `PeronPhaseCard` respectivamente) y no se fusionan.

**R10 — El badge `NO_COMPARABLE_NUMERICAMENTE` se aplica antes de cualquier display numérico de Perón.**
Si cualquier vista, componente, o función de display va a mostrar un valor numérico derivado de la `PERON_ALT_PIPELINE`, el badge `NO_COMPARABLE_NUMERICAMENTE` debe estar presente en el mismo contexto visual. El badge no autoriza la comparación: solo señala la procedencia. Los campos `peron_mes_score`, `peron_pat_score`, `peron_tec_score` llevan este badge siempre que se muestren.

---

## 17. Registros de ejemplo

Los siguientes registros son ilustrativos. Muestran la forma de los datos, no son copias exactas de los artefactos fuente. Los valores numéricos se derivan de las fuentes canónicas; los campos de texto son versiones condensadas.

> **Nota:** estos ejemplos son ilustrativos, no son el archivo de datos. Los valores de campos numéricos se tomaron directamente de `NB10_democratic_actor_interpretive_matrix_v0_1.csv` y `MAPA_ORBITAL_ARGENTINO_v0_1.md §6.1`.

---

### Ejemplo 1 — ActorProfile: Javier Milei

```
actor_id: "milei"
display_name: "Javier Milei"
period: "2024–2025"
n_documents: 2
directed_configuration: "tecnocracia+mesianismo"
dominant_vector: "tecnocracia"
secondary_vector: "mesianismo"
avg_tecnocracia: 18.212          [NO PARA DISPLAY PÚBLICO]
avg_paternalismo: 11.188         [NO PARA DISPLAY PÚBLICO]
avg_mesianismo: 13.435           [NO PARA DISPLAY PÚBLICO]
attractor_strength_summary: null [vacío en CSV — derivar de DocumentRecord: medium → strong]
transition_count: 0
stability_label: "stable"
caution_level: "medium"
readiness_status: "provisional_insufficient_corpus"
main_hypothesis:
  "Milei muestra una configuración tecnocracia+mesianismo en ambos documentos
   disponibles. Es el único actor democrático donde el mesianismo es vector
   secundario sostenido a nivel actor. avg_mes=13.435 es más del doble del
   siguiente actor más alto (Alfonsín, 5.09). El documento de 2025 es una
   apertura legislativa ordinaria — no es una inauguración ni un discurso
   de crisis. Si el patrón persiste con corpus ampliado, el mesianismo
   mileísta sería un registro de gobierno ordinario, no de crisis.
   [PROVISIONAL — n=2]"
required_caveat:
  "n=2 documentos. El tipo de actor no puede confirmarse. La hipótesis
   requiere n≥4 para evaluación. Inaugural dic. 2023 posiblemente ausente.
   Apertura 2026 pendiente. No citar tecnocracia+mesianismo como rasgo
   confirmado de Milei."
document_ids: ["milei_2024_apertura", "milei_2025_apertura"]
linked_case_unit_id: "MILEI_2024_2025"
caveat_badges: ["PROVISIONAL", "HCDN_ONLY", "LOW_N"]
include_in_actor_map: true
```

---

### Ejemplo 2 — PeronPhaseCard: 1954

```
phase_id: "peron_1954"
year: 1954
title: "1954 — Apertura anual, 19 de mayo de 1954"
source_id: "PERON_SRC_013"
source_status: "usable_one_document_hypothesis"
corpus_lineage: "PERON_ALT_PIPELINE"
configuration_hypothesis: "mesianismo+paternalismo"
vector_ranking: { first: "mesianismo", second: "paternalismo", third: "tecnocracia" }
peron_mes_score: 122
peron_pat_score: 110
peron_tec_score: 54
n_segments: 90
word_count: 4621
ocr_uncertainty: 2.16
phase_interpretation:
  "El mesianismo de 1954 es de consagración providencial-doctrinal: las tres banderas
   como trívium mesiánico (7×), el peronismo como movimiento de salvación histórica
   (7×), la Providencia como legitimadora de la misión (4×). El paternalismo es el
   de un pueblo organizado, no receptor de un programa. La tecnocracia es aparato
   asumido: la agenda de reconstrucción de 1946 opera en 1954 como hecho de fondo.
   TEC es el único vector cuyo score absoluto decrece respecto a 1946 (63→54, Δ=−9)
   a pesar de que el corpus de 1954 tiene el doble de segmentos: el hallazgo más
   analíticamente robusto del contraste de fase."
caveats: [
  "No comparar numéricamente con actores HCDN. Un documento no establece perfil de actor.",
  "Sin calibración TM/TCM/AGN. Sin nota puente entre pipelines."
]
caveat_badges: ["PROVISIONAL", "PERON_ALT_SOURCE", "NO_COMPARABLE_NUMERICAMENTE"]
blocked: false
blocked_reason: null
next_action: "Adquirir fuente verificada del discurso de Perón del 12 de octubre de 1973
               para producir el perfil tri-documento (PERON_NB04)."
linked_roadmap_item_id: "P1"
```

---

### Ejemplo 3 — PeronPhaseCard: 1973 bloqueada

```
phase_id: "peron_1973_blocked"
year: 1973
title: "1973 — BLOQUEADO"
source_id: "PERON_SRC_015"
source_status: "exclude_from_propositional_review"
corpus_lineage: "PERON_ALT_PIPELINE"
configuration_hypothesis: null
vector_ranking: null
peron_mes_score: null
peron_pat_score: null
peron_tec_score: null
n_segments: null
word_count: null
ocr_uncertainty: null
phase_interpretation: null
caveats: [
  "Ningún análisis sobre el discurso de Perón del 12 de octubre de 1973 es posible
   en este estado. No hay fuente verificada en ninguna pipeline activa.",
  "PERON_SRC_015 contiene el discurso de Allende, no el de Perón. No usar como proxy."
]
caveat_badges: ["BLOQUEADO", "SOURCE_FAILURE", "PERON_ALT_SOURCE"]
blocked: true
blocked_reason:
  "PERON_SRC_015 es el Diario de Sesiones de la Asamblea Legislativa del 12 de
   octubre de 1973. Contiene: lista de delegaciones extranjeras (~100 países);
   el discurso del Dr. José Antonio Allende (presidente de la Asamblea) dirigido
   a Perón en segunda persona; y el juramento constitucional de Perón (~60 palabras
   de fórmula legal fija). El discurso inaugural real de Perón fue pronunciado desde
   el balcón de la Casa Rosada y no está en ese registro. BLQ-02c (2026-04-30)."
next_action:
  "Adquirir fuente alternativa verificada. Fuentes prioritarias:
   (1) BCN — Mensajes presidenciales; (2) La Nación 13-10-1973;
   (3) Archivo histórico de Casa Rosada. Registrar como PERON_SRC_020.
   Verificar contenido y autoría antes de cualquier extracción BLQ."
linked_roadmap_item_id: "P1"
```

---

### Ejemplo 4 — CaveatBadge: NO_COMPARABLE_NUMERICAMENTE

```
badge_id: "NO_COMPARABLE_NUMERICAMENTE"
label: "NO COMPARABLE NUMÉRICAMENTE CON CORPUS HCDN"
meaning:
  "Los datos de la PERON_ALT_PIPELINE (scores MES/PAT/TEC de PERON_NB02) son
   conteos de patrones proposicionales extraídos manualmente. Los datos del corpus
   HCDN son scores calibrados NB05 (TM×1.00 / TCM×0.50 / AGN×0.00). No existe
   nota puente entre las dos pipelines que establezca condiciones de comparabilidad.
   Los dos conjuntos de datos no están en la misma escala."
severity: "blocking"
blocks_interaction: true
display_locations: [
  "C10_peron_separated_lane",
  "C08_evidence_drawer_when_peron",
  "any_numeric_display_of_peron_data"
]
required_microcopy:
  "Los datos numéricos de Perón no están en la misma escala que los scores NB05
   del corpus democrático. No existe nota puente. Este badge no autoriza la
   comparación: la comparación numérica está prohibida incluso cuando el badge
   está presente."
```

---

## 18. Próximo paso

**`web/STATIC_PROTOTYPE_SPEC_v0_1.md`** o **`web/JSON_EXPORT_PLAN_v0_1.md`**

Con el contrato de datos completo, hay dos caminos equivalentes:

**Opción A — `STATIC_PROTOTYPE_SPEC_v0_1.md`:** especificar las páginas del prototipo estático directamente: Inicio, Mapa orbital, dos o tres fichas de actor, Perón, Roadmap. Define qué entidades de este contrato pueblan cada sección de cada página, qué componentes del visual spec se instancian, y qué datos de ejemplo se usan para el prototipo inicial. Produce un documento que un desarrollador puede usar para construir el prototipo sin tomar decisiones empíricas.

**Opción B — `JSON_EXPORT_PLAN_v0_1.md`:** especificar cómo exportar las entidades de este contrato desde los CSV canónicos a archivos JSON/YAML/Markdown estructurados. Define la transformación de cada columna CSV a campo de entidad, la lógica de derivación de campos calculados (`include_in_actor_map`, `blocked`, `has_nb05_ambiguity_flag`, etc.), el orden de exportación, y los scripts o procedimientos de exportación manual. Produce los archivos de datos estáticos que el prototipo consume.

Los dos pasos son independientes y pueden hacerse en paralelo. Si el objetivo inmediato es ver el prototipo, la Opción A es la más directa. Si el objetivo es tener datos estructurados reutilizables para múltiples implementaciones, la Opción B primero.

---

*Producido en el marco del proyecto El problema de los tres cuerpos argentinos. Este contrato deriva de evidencia provisional. Ningún campo en ninguna entidad introduce clasificaciones históricas definitivas de actores. La separación estructural entre PERON_ALT_PIPELINE y HCDN_PROMOTED_LAYER es un invariante del contrato — no una convención opcional. Ver `MAPA_ORBITAL_ARGENTINO_v0_1.md §8` y `VISUAL_COMPONENT_SPEC_v0_1.md §2` para los fundamentos metodológicos de estas restricciones.*
