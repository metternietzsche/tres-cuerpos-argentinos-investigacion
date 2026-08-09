# JSON EXPORT PLAN v0.1

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** plan de exportación — sin archivos JSON, sin código, sin mutación de fuentes canónicas
**Fuentes:** `WEBSITE_INFORMATION_ARCHITECTURE_v0_1.md` · `SITE_COPY_DECK_v0_1.md` · `VISUAL_COMPONENT_SPEC_v0_1.md` · `DATA_CONTRACT_v0_1.md` · `STATIC_PROTOTYPE_SPEC_v0_1.md` · `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` · `MAPA_ORBITAL_ARGENTINO_v0_1.md` · `NB10_democratic_actor_interpretive_matrix_v0_1.csv` · `NB10_democratic_document_interpretive_table_v0_1.csv` · `NB10_configuration_map_v0_1.csv` · `NB10_transition_analysis_v0_1.csv` · `PERON_NB03_1946_1954_phase_contrast_v0_1.csv` · `README_WORKSPACE_AUTHORITY.md`

---

## 1. Propósito

Este documento define cómo los artefactos canónicos CSV y Markdown del proyecto se transforman en archivos de datos JSON que el prototipo estático del sitio puede consumir directamente. No crea esos archivos. No define código de implementación. No transforma ni muta ningún artefacto fuente.

El problema que resuelve: `STATIC_PROTOTYPE_SPEC_v0_1.md` define 9 páginas que consumen datos reales del corpus. Sin archivos de datos intermedios, el prototipo estático tendría que derivar campos calculados (`include_in_hcdn_actor_map`, `blocked`, `has_nb05_ambiguity_flag`, etc.) en tiempo de render, o repetir la misma lógica de derivación en cada componente. Ambas opciones complican la implementación y aumentan el riesgo de errores de consistencia.

La solución: un conjunto de diez archivos JSON en `web/static_prototype/data/`, cada uno correspondiente a una entidad del `DATA_CONTRACT_v0_1.md`, con todos los campos derivados ya calculados, todos los caveats ya asignados, y todos los registros bloqueados ya presentes como registros bloqueados explícitos.

Un implementador del prototipo que lea este documento y el `DATA_CONTRACT_v0_1.md` puede producir los diez archivos JSON sin leer los CSV canónicos ni el MAPA directamente. Las fuentes canónicas son la autoridad; este plan es la interfaz entre esas fuentes y el implementador.

---

## 2. Principios de exportación

**La fuente canónica primero.** Todo campo empírico en cualquier archivo JSON de destino se traza a una columna específica de un CSV canónico o a una sección específica del `MAPA_ORBITAL_ARGENTINO_v0_1.md`. Ningún campo empírico se inventa, estima ni imputa desde ninguna fuente no canónica.

**Sin invención de datos.** Si un campo está vacío en la fuente, el archivo de destino registra `null`. Si un campo no existe en la fuente, el campo no aparece en el archivo de destino. La única excepción son los campos derivados (`include_in_hcdn_actor_map`, `blocked`, `has_nb05_ambiguity_flag`, etc.), cuya lógica de derivación está completamente especificada en este plan y en el `DATA_CONTRACT_v0_1.md §8–§14`.

**Linaje obligatorio en cada registro.** Todo registro que contenga datos empíricos lleva el campo `corpus_lineage` con uno de los valores canónicos: `HCDN_PROMOTED_LAYER`, `PERON_ALT_PIPELINE`, `BLOCKED`. El campo no puede ser nulo ni ausente.

**Caveats obligatorios en todo registro de caso o actor.** Todo registro de `ActorProfile` (E05), `CaseUnit` (E04), y `PeronPhaseCard` (E10) lleva el campo `required_caveat` y el campo `caveat_badges`. La ausencia de estos campos es un error de exportación, no una convención opcional.

**Perón estructuralmente separado.** El archivo `actors_hcdn.json` no contiene ningún registro de Perón. El archivo `peron_phase_cards.json` no contiene campos `avg_tecnocracia`, `avg_paternalismo` ni `avg_mesianismo`. Los dos conjuntos de campos numéricos (scores NB05 calibrados del corpus HCDN vs. conteos proposicionales de la PERON_ALT_PIPELINE) nunca aparecen en el mismo objeto JSON.

**Contenido bloqueado representado explícitamente.** El registro de Perón 1973 existe en `peron_phase_cards.json` con `blocked: true`, `blocked_reason` poblado, y todos los campos de score como `null`. No se omite. No se reemplaza con un espacio en blanco. Las páginas del prototipo estático que muestran ese card lo renderizan como card bloqueado visible, no como ausencia.

**Métricas internas disponibles pero no expuestas como display primario.** Los campos `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo` en `actors_hcdn.json` y `total_score`, `gap` en `documents_hcdn.json` están presentes en los archivos JSON para uso interno (cálculos de consistencia, ordenamiento en el cliente). No se renderizan como valores prominentes en ninguna página pública. El campo `public_display` en la definición de cada campo especifica si el dato es de uso interno o apto para display directo.

**Sin campo `final_type`.** Ningún registro en ningún archivo JSON exportado define un campo que clasifique a un actor con un tipo fijo. El campo prohibido tampoco puede disfrazarse bajo nombres alternativos (`actor_type`, `rhetorical_type`, `classification`).

---

## 3. Mapa fuente-a-JSON

| `source_file` | `source_type` | `target_json` | `target_entity` | `transformation_type` | `caveats` |
|---|---|---|---|---|---|
| `SITE_COPY_DECK_v0_1.md` + `README_WORKSPACE_AUTHORITY.md` | Markdown | `site_meta.json` | SiteMeta (E01) | Extracción manual de campos de texto; sin campos empíricos del corpus | Texto fijo; sin linaje empírico; 1 instancia |
| `SITE_COPY_DECK_v0_1.md` + `DATA_CONTRACT_v0_1.md` §6 | Markdown | `vectors.json` | Vector (E02) | Extracción manual de definiciones y señales; sin campos del CSV | 3 instancias fijas; sin datos del corpus |
| `NB10_configuration_map_v0_1.csv` + `MAPA_ORBITAL_ARGENTINO_v0_1.md` §3.2–§4 + `SITE_COPY_DECK_v0_1.md` §5 | CSV + Markdown | `configurations.json` | Configuration (E03) | CSV como base de campos cuantitativos; MAPA y SITE_COPY_DECK como fuente de campos narrativos | `pat_tec` y `tec_pat` son entidades distintas — no fusionar; 7 instancias (6 configuraciones + indeterminate) |
| `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` | CSV | `case_units.json` | CaseUnit (E04) | Lectura directa de 15 columnas; derivación de 4 campos booleanos | 13 registros (10 HCDN + 2 Perón limpios + 1 bloqueado); el registro bloqueado debe estar presente |
| `NB10_democratic_actor_interpretive_matrix_v0_1.csv` | CSV | `actors_hcdn.json` | ActorProfile (E05) | Lectura directa de 16 columnas; derivación de `actor_id` slug, `caveat_badges`, `document_ids`, `linked_case_unit_id`, `include_in_actor_map` | Sin Perón; 10 actores; `attractor_strength_summary` vacío en CSV — derivar de `documents_hcdn.json` cuando null |
| `NB10_democratic_document_interpretive_table_v0_1.csv` | CSV | `documents_hcdn.json` | DocumentRecord (E06) | Lectura directa de 15 columnas; derivación de `document_id` slug y 4 booleanos; `total_score` y `gap` marcados como internos | 51 registros; corpus HCDN exclusivamente |
| `PERON_NB03_1946_1954_phase_contrast_v0_1.csv` + `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` (fila `PERON_1973_ASUNCION_BLOQUEADA`) | CSV (dos fuentes) | `peron_phase_cards.json` | PeronPhaseCard (E10) | 2 filas del NB03 para 1946 y 1954; 1 fila del UNIFIED_CASE_MATRIX para 1973 bloqueado | Sin campos `avg_*` del corpus HCDN; 3 cards; card 1973 con todos los campos de score como `null` |
| `VISUAL_COMPONENT_SPEC_v0_1.md` §12 + `DATA_CONTRACT_v0_1.md` §12 | Markdown | `caveat_badges.json` | CaveatBadge (E08) | Extracción manual de las 10 instancias fijas de badge | 10 instancias fijas; sin datos del corpus; no cambian entre versiones del corpus |
| `MAPA_ORBITAL_ARGENTINO_v0_1.md` §9 + `DATA_CONTRACT_v0_1.md` §13 + `SITE_COPY_DECK_v0_1.md` §10 | Markdown | `roadmap.json` | RoadmapItem (E09) | Extracción manual de las 7 precondiciones con estado, dependencias y contenido bloqueado relacionado | 7 instancias fijas; P1, P5, P6 en estado `pendiente`; P2, P3, P4, P7 en estado `bloqueado` |
| — (sin fuente de extracción en v0.1) | — | `evidence_excerpts_stub.json` | EvidenceExcerpt (E07) | Stub vacío: array vacío o estructura placeholder con aviso de estado | Case packets NB09 no parseados para v0.1; no extraer sin plan de extracción aprobado |

---

## 4. Carpeta de datos propuesta

La carpeta de datos del prototipo estático tiene la siguiente estructura:

```
web/static_prototype/data/
  site_meta.json
  vectors.json
  configurations.json
  case_units.json
  actors_hcdn.json
  documents_hcdn.json
  peron_phase_cards.json
  caveat_badges.json
  roadmap.json
  evidence_excerpts_stub.json
  EXPORT_REPORT_v0_1.md          ← producido por el script, no editado manualmente
```

Esta carpeta no debe crearse hasta que el script de exportación esté implementado y haya completado su primera ejecución exitosa. La carpeta no existe aún en el workspace. Crear los archivos JSON manualmente sin el script es posible pero aumenta el riesgo de inconsistencias entre archivos.

---

## 5. Exportaciones por entidad

---

### 5.1 `site_meta.json`

**Artefacto fuente:** `SITE_COPY_DECK_v0_1.md` §1 (textos públicos del sitio) + `README_WORKSPACE_AUTHORITY.md` §3 (lista de artefactos canónicos)

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §5 (E01 SiteMeta)

**Campos obligatorios:**

| Campo | Fuente exacta | Valor o referencia |
|-------|--------------|-------------------|
| `site_title` | Copy deck §1 | "El problema de los tres cuerpos argentinos" |
| `subtitle` | Copy deck §1 | "Un mapa del discurso presidencial argentino, 1983–2025" |
| `thesis_short` | Copy deck §1 | Tesis en una oración (texto del copy deck) |
| `thesis_long` | Copy deck §1 | Párrafo de tesis larga (texto del copy deck) |
| `version` | Fijo | `"v0.1"` |
| `map_version` | Fijo | `"MAPA_ORBITAL_ARGENTINO_v0_1"` |
| `canonical_language` | Fijo | `"es"` |
| `caveat_banner` | Copy deck §1 | Texto del banner global no-dismissible |
| `footer_text` | Copy deck §1 | Texto del footer de autoridad |
| `universal_actor_caveat` | Fijo (DATA_CONTRACT §5) | `"Hipótesis provisional — no clasificación histórica definitiva"` |
| `blocked_label` | Fijo (DATA_CONTRACT §5) | `"Evidencia no disponible — ver Roadmap"` |
| `last_updated` | Fijo | `"2026-04-30"` |
| `authority_files` | README_WORKSPACE_AUTHORITY §4 | Array de tres rutas canónicas (ver debajo) |

**Campos opcionales:** ninguno para v0.1.

**Regla de transformación:** extracción manual. Ningún campo de `site_meta.json` deriva de un CSV. Los valores de `authority_files` son:
```
[
  "empirical/UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md",
  "empirical/UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv",
  "empirical/MAPA_ORBITAL_ARGENTINO_v0_1.md"
]
```

**Reglas de validación:** el campo `version` debe ser `"v0.1"`. El campo `authority_files` no puede incluir `CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` (síntesis en inglés no canónica).

**Display flags:** todos los campos de `site_meta.json` son de display público.

---

### 5.2 `vectors.json`

**Artefacto fuente:** `SITE_COPY_DECK_v0_1.md` §4 (definiciones de los tres vectores) + `DATA_CONTRACT_v0_1.md` §6 (E02 Vector)

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §6 (E02 Vector)

**Campos obligatorios:**

| Campo | Fuente exacta |
|-------|--------------|
| `vector_id` | Enum fijo: `"tecnocracia"` / `"mesianismo"` / `"paternalismo"` |
| `name` | Copy deck §4: "Modernización tecnocrática" / "Mesianismo redentor" / "Paternalismo conservador" |
| `short_name` | Copy deck §4: "Tecnocracia" / "Mesianismo" / "Paternalismo" |
| `short_definition` | Copy deck §4 — definición corta de 2–3 líneas por vector |
| `what_it_is_not` | Copy deck §4 — campo de clarificación de confusión frecuente |
| `discourse_signals` | Copy deck §4 — array de al menos 3 señales discursivas típicas |
| `over_detection_warning` | Copy deck §4 — riesgo de sobredetección |
| `link_to_method` | Fijo: `"/evidencia"` |

**Campos opcionales:** `color_token` — decisión del implementador; no tiene valor canónico en ninguna fuente. Si se añade, no puede ser el único indicador semántico del vector (regla de accesibilidad).

**Regla de transformación:** extracción manual de los tres vectores. Tres instancias en un array. No hay campos del CSV. No hay datos del corpus.

**Reglas de validación:** exactamente 3 instancias. Los tres `vector_id` presentes: `"tecnocracia"`, `"mesianismo"`, `"paternalismo"`. Ningún valor de campo puede derivar de los CSVs del corpus.

**Display flags:** todos los campos de display público.

---

### 5.3 `configurations.json`

**Artefacto fuente:**
- `NB10_configuration_map_v0_1.csv` — columnas: `configuration`, `n_documents`, `n_actors`, `actors`, `n_strong`, `n_medium`, `n_weak`, `n_indeterminate`, `stability_classification`, `interpretation`
- `MAPA_ORBITAL_ARGENTINO_v0_1.md` §3.2 (distribución del corpus) y §4 (interpretación por familia)
- `SITE_COPY_DECK_v0_1.md` §5 (definiciones en lenguaje accesible)

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §7 (E03 Configuration)

**Campos obligatorios:**

| Campo en JSON | Columna CSV / fuente | Transformación |
|---|---|---|
| `configuration_id` | Columna `configuration` (texto dirigido) | Normalizar a slug: sustituir `paternalismo` → `pat`, `tecnocracia` → `tec`, `mesianismo` → `mes`, `none` → `none`; reemplazar `+` con `_`. Resultado: `"pat_tec"`, `"tec_pat"`, `"tec_mes"`, `"pat_mes"`, `"pat_none"`, `"mes_tec"` |
| `dominant_vector` | Primer componente del `configuration` | Primer token antes del `+` en la etiqueta dirigida; mapear al `vector_id` canónico |
| `secondary_vector` | Segundo componente del `configuration` | Segundo token; `null` solo si `configuration == "paternalismo+none"` |
| `directed_label` | Columna `configuration` | Preservar exactamente como aparece en el CSV |
| `document_count` | Columna `n_documents` | Entero; verificar contra MAPA §3.2 |
| `actor_count` | Columna `n_actors` | Entero |
| `corpus_percentage` | Calculado: `n_documents / 51 * 100` | Float redondeado a 0 decimales; verificar contra MAPA §3.2 |
| `plain_language_definition` | `SITE_COPY_DECK_v0_1.md` §5 | Extracción manual por configuración |
| `interpretation` | Columna `interpretation` del CSV | Preservar texto completo; nota: el texto del CSV está en inglés — traducir al español o usar versión del MAPA §4 |
| `associated_case_unit_ids` | Columna `actors` (pipe-separated) | Parsear actor names; mapear a `case_unit_id` según tabla de mapeo (ver §6) |
| `caveats` | MAPA §4 / DATA_CONTRACT §7 | Array de texto; mínimo 1 por configuración |
| `status` | Columna `stability_classification` | Mapeo: `stable_major` → `"dominant"`, `provisional_distinctive` → `"minor"`, `provisional_rare` → `"marginal"`, valor ausente → `"indeterminate"` |

**Instancia adicional requerida:** `indeterminate` — no tiene fila en el CSV. Se construye con valores fijos: `document_count: 0`, `corpus_percentage: 0`, `status: "indeterminate"`, `associated_case_unit_ids: []`.

**Campos opcionales:** `featured_case_unit_id` — recomendados por DATA_CONTRACT §7:
- `pat_tec` → `"MENEM_1990_1999"`
- `tec_pat` → `"CFK_2007_2015"`
- `tec_mes` → `"MILEI_2024_2025"` (con caveat n=2)
- `pat_mes` → sin featured (n=2 actores, ambos caution alto)
- `pat_none` → sin featured (n=1, Menem 1996 outlier)
- `mes_tec` → sin featured (n=1, Alfonsín 1989 outlier)

**Regla crítica de validación:** `pat_tec` y `tec_pat` son entidades distintas con `configuration_id` distintos. No se fusionan. No se normalizan. No se agregan bajo un identificador compartido tipo `"tec_pat_dyad"`. La distinción de dirección es el argumento analítico central del MAPA M2.

**Display flags:** todos los campos de display público. Los campos `n_strong`, `n_medium`, `n_weak`, `n_indeterminate` del CSV son útiles para display interno de distribución de fortaleza atractora — no son campos primarios de display.

---

### 5.4 `case_units.json`

**Artefacto fuente:** `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` — todas las 15 columnas, todas las 13 filas (10 actores HCDN + 2 documentos Perón limpios + 1 bloqueo Perón 1973)

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §8 (E04 CaseUnit)

**Columnas del CSV → campos en JSON:**

| Campo en JSON | Columna exacta en CSV |
|---|---|
| `case_unit_id` | `case_unit` |
| `display_name` | `actor` |
| `period_or_years` | `period_or_years` |
| `corpus_lineage` | `corpus_lineage` |
| `comparability_tier` | `comparability_tier` |
| `source_status` | `source_status` |
| `coverage_level` | `coverage_level` |
| `dominant_configuration` | `dominant_configuration` |
| `secondary_or_tertiary_vector` | `secondary_or_tertiary_vector` |
| `interpretive_strength` | `attractor_strength_or_interpretive_strength` |
| `main_evidence_basis` | `main_evidence_basis` |
| `interpretive_hypothesis` | `interpretive_hypothesis` |
| `caution_level` | `caution_level` |
| `required_caveat` | `required_caveat` |
| `next_evidence_needed` | `next_evidence_needed` |

**Campos derivados (no están en el CSV — deben calcularse):**

| Campo derivado | Lógica de derivación |
|---|---|
| `include_in_hcdn_actor_map` | `true` iff `corpus_lineage == "HCDN_PROMOTED_LAYER"` AND `source_status` no contiene `"exclude_from_propositional_review"` |
| `include_in_peron_lane` | `true` iff `corpus_lineage == "PERON_ALT_PIPELINE"` |
| `blocked` | `true` iff `source_status` contiene `"exclude_from_propositional_review"` OR `comparability_tier` contiene `"TIER_4"` OR `caution_level == "BLOQUEADO"` |
| `blocked_reason` | Si `blocked == true`: texto de la columna `interpretive_hypothesis` del mismo registro. Si `blocked == false`: `null` |

**Reglas de validación:** 13 registros totales. El registro `PERON_1973_ASUNCION_BLOQUEADA` debe estar presente con `blocked: true` y `blocked_reason` no null. Ningún registro con `corpus_lineage == "PERON_ALT_PIPELINE"` tiene `include_in_hcdn_actor_map: true`.

**Display flags:** todos los campos son de display público excepto los campos internos de evidencia base (`main_evidence_basis` tiene contenido técnico — puede mostrarse pero no es display prominente por defecto).

---

### 5.5 `actors_hcdn.json`

**Artefacto fuente:** `NB10_democratic_actor_interpretive_matrix_v0_1.csv` — todas las 16 columnas, las 10 filas de actores democráticos (Alfonsín, Menem, De la Rúa, Duhalde, Kirchner, CFK, Macri, AlbertoF, Milei, Rodríguez Saá)

**Regla de exclusión absoluta:** Perón no tiene fila en este CSV. El archivo `actors_hcdn.json` no puede contener ningún registro de Perón bajo ninguna circunstancia.

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §9 (E05 ActorProfile)

**Columnas del CSV → campos en JSON:**

| Campo en JSON | Columna exacta en CSV | Nota |
|---|---|---|
| `display_name` | `actor` | Preservar nombre completo con acentos |
| `period` | `years_covered` | Preservar formato de rango (ej. `"1983–1989"`) |
| `n_documents` | `n_docs` | Entero |
| `directed_configuration` | `directed_two_body_configuration` | Preservar etiqueta dirigida exacta |
| `dominant_vector` | `dominant_vector` | Preservar como `vector_id` del contrato |
| `secondary_vector` | `secondary_vector` | Preservar como `vector_id`; si vacío → `null` |
| `avg_tecnocracia` | `avg_tecnocracia_v0` | Float; **NO PARA DISPLAY PÚBLICO** |
| `avg_paternalismo` | `avg_paternalismo` | Float; **NO PARA DISPLAY PÚBLICO** |
| `avg_mesianismo` | `avg_mesianismo` | Float; **NO PARA DISPLAY PÚBLICO** |
| `attractor_strength_summary` | `attractor_strength_summary` | String o `null`; columna vacía en el CSV para varios actores — ver derivación debajo |
| `transition_count` | `n_configuration_transitions` | Entero |
| `stability_label` | `stability_label` | Enum: `"stable"` / `"moderate"` / `"unstable"` |
| `caution_level` | `caution_level` | Enum: `"low"` / `"medium"` / `"high"` |
| `readiness_status` | `readiness_status` | String: `"strong_provisional"`, `"provisional"`, etc. |
| `main_hypothesis` | `main_interpretive_hypothesis` | Texto largo; preservar completo |
| `required_caveat` | `required_caveat` | Texto de caveat; **campo obligatorio de display** |

**Campos derivados:**

| Campo derivado | Lógica de derivación |
|---|---|
| `actor_id` | Slug normalizado del nombre del actor (ver tabla de slugs en §6) |
| `attractor_strength_summary` | Si la columna del CSV está vacía → `null`. En la exportación, registrar `null` y anotar en el EXPORT_REPORT que este campo debe derivarse desde `documents_hcdn.json` sumando los valores de `attractor_strength` por actor |
| `document_ids` | Leer `documents_hcdn.json` y filtrar por `actor_id` coincidente; extraer el array de `document_id` correspondientes |
| `linked_case_unit_id` | Mapear `actor_id` a `case_unit_id` según tabla de correspondencia en §6 |
| `caveat_badges` | Derivar según lógica de asignación de badges (ver §6) |
| `include_in_actor_map` | `true` para los 10 actores democráticos; nunca `true` para Perón (Perón no tiene registro en este archivo) |

**Reglas de validación:** 10 registros. Ningún `actor_id` puede ser `"peron"` ni derivado de "Juan Domingo Perón". Todo registro tiene `caveat_badges` con al menos `"PROVISIONAL"`. Todo `required_caveat` no es null ni vacío.

**Display flags:** `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo` — `public_display: false`. Todos los demás campos — `public_display: true`.

---

### 5.6 `documents_hcdn.json`

**Artefacto fuente:** `NB10_democratic_document_interpretive_table_v0_1.csv` — todas las 15 columnas, las 51 filas del corpus HCDN

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §10 (E06 DocumentRecord)

**Columnas del CSV → campos en JSON:**

| Campo en JSON | Columna exacta en CSV | Nota |
|---|---|---|
| `filename` | `filename` | Preservar nombre exacto del archivo incluyendo extensión `.txt` |
| `actor_display_name` | `actor` | Preservar nombre completo |
| `year` | `year` | Float (el CSV puede tener decimales) |
| `period_label` | `period` | Preservar texto completo del período |
| `genre` | `genre` | Preservar valor del CSV |
| `dominant_vector` | `dominant_vector` | Normalizar a `vector_id` canónico |
| `secondary_vector` | `secondary_vector` | Normalizar a `vector_id`; si vacío o ausente → `null` |
| `configuration` | `configuration` | Preservar string exacto del CSV (ej. `"paternalismo+tecnocracia"`) |
| `attractor_strength` | `attractor_strength` | Enum: `"strong"` / `"medium"` / `"weak"` / `"indeterminate"` |
| `total_score` | `total_score` | Float; **NO PARA DISPLAY PÚBLICO** |
| `gap` | `gap` | Float; **NO PARA DISPLAY PÚBLICO** |
| `review_status` | `review_status` | Preservar valor del CSV |
| `metadata_status` | `metadata_status` | Preservar valor del CSV |
| `interpretation_status` | `interpretation_status` | Preservar valor del CSV |
| `notes` | `notes` | Preservar texto; si vacío → `null` |

**Campos derivados:**

| Campo derivado | Lógica de derivación |
|---|---|
| `document_id` | Normalizar `filename`: eliminar extensión `.txt`; convertir a lowercase; reemplazar espacios, guiones y puntos con underscores; eliminar caracteres no alfanuméricos excepto underscore. Ejemplo: `"01.03.2018As.txt"` → `"01_03_2018as"`. En caso de colisión de slugs, añadir sufijo del actor (`_{actor_id}`) |
| `actor_id` | Slug del campo `actor` según tabla de correspondencia en §6 |
| `corpus_lineage` | Valor fijo para todos los registros de esta tabla: `"HCDN_PROMOTED_LAYER"` |
| `has_nb05_ambiguity_flag` | `true` iff `notes` contiene la cadena `"NB05 ambiguity flag"` (sensible a mayúsculas/minúsculas: buscar también `"ambiguity_flag=True"`) |
| `is_low_weight` | `true` iff `interpretation_status == "usable_low_weight"` |
| `is_indeterminate_attractor` | `true` iff `attractor_strength == "indeterminate"` |
| `is_corrected` | `true` iff `metadata_status == "corrected_v0_2"` |
| `include_in_timeline` | `true` para todos los registros sin excepción — documentos `is_low_weight` e `is_indeterminate_attractor` se muestran en el timeline con marcador especial, no se omiten |

**Documentos con estado especial** (registrar en EXPORT_REPORT como puntos de atención):

| `filename` | Actor | Estado especial |
|---|---|---|
| `01.03.2018As.txt` | Macri | `is_low_weight: true`, `is_indeterminate_attractor: true` |
| `Mensaje Presidencial 2019.txt` | AlbertoF | `is_corrected: true`, `is_indeterminate_attractor: true`, `gap: 0.0` |
| `1988-12-21_Asamblea_Legislativa_Extraordinaria_Alfonsin.txt` | Alfonsín | `is_low_weight: true`, `is_indeterminate_attractor: true`, `gap: 0.0` |

**Reglas de validación:** 51 registros. Ningún registro tiene `corpus_lineage` distinto de `"HCDN_PROMOTED_LAYER"`. Ningún registro de Perón está en este archivo. Todos los `actor_id` referencian un actor existente en `actors_hcdn.json`.

**Display flags:** `total_score` y `gap` — `public_display: false`. Todos los demás campos — `public_display: true`.

---

### 5.7 `peron_phase_cards.json`

**Artefacto fuente (dos fuentes):**
1. `PERON_NB03_1946_1954_phase_contrast_v0_1.csv` — 2 filas (1946 y 1954) con columnas: `source_id`, `year`, `genre`, `label`, `dominant_vector`, `secondary_vector`, `tertiary_vector`, `score_mesianismo`, `score_paternalismo`, `score_tecnocracia`, `matches_mesianismo`, `matches_paternalismo`, `matches_tecnocracia`, `segs_mesianismo`, `segs_paternalismo`, `segs_tecnocracia`, `mean_per_seg_mesianismo`, `mean_per_seg_paternalismo`, `mean_per_seg_tecnocracia`, `total_primary_segments`, `directed_configuration`, `one_document_status`, `main_caveat`
2. `UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv` — fila `PERON_1973_ASUNCION_BLOQUEADA` para el card bloqueado; y filas `PERON_1946_ASUNCION` y `PERON_1954_APERTURA` para campos adicionales (`coverage_level`, `required_caveat`)

**Regla de exclusión absoluta:** ningún campo en `peron_phase_cards.json` puede ser `avg_tecnocracia`, `avg_paternalismo` ni `avg_mesianismo`. Esos campos pertenecen exclusivamente a `actors_hcdn.json`. Los campos de score de Perón se llaman `peron_mes_score`, `peron_pat_score`, `peron_tec_score`.

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §14 (E10 PeronPhaseCard)

**Tres instancias:**

**Instancia 1 — `peron_1946`** (fuente: NB03 fila `PERON_SRC_003` + UNIFIED_CASE_MATRIX fila `PERON_1946_ASUNCION`)

| Campo en JSON | Fuente | Valor o transformación |
|---|---|---|
| `phase_id` | Fijo | `"peron_1946"` |
| `year` | NB03 columna `year` | `1946` |
| `title` | `SITE_COPY_DECK_v0_1.md` §7 | Título del card 1946 (extracción manual) |
| `source_id` | NB03 columna `source_id` | `"PERON_SRC_003"` |
| `source_status` | NB03 columna `one_document_status` | `"usable_one_document_hypothesis"` |
| `corpus_lineage` | Fijo | `"PERON_ALT_PIPELINE"` |
| `configuration_hypothesis` | NB03 columna `directed_configuration` | `"mesianismo+paternalismo"` |
| `vector_ranking` | NB03 columnas `dominant_vector`, `secondary_vector`, `tertiary_vector` | Objeto `{first: "mesianismo", second: "paternalismo", third: "tecnocracia"}` |
| `peron_mes_score` | NB03 columna `score_mesianismo` | `82` |
| `peron_pat_score` | NB03 columna `score_paternalismo` | `64` |
| `peron_tec_score` | NB03 columna `score_tecnocracia` | `63` |
| `n_segments` | NB03 columna `total_primary_segments` | `45` |
| `word_count` | UNIFIED_CASE_MATRIX columna `coverage_level` (parsear "5072 palabras limpias") | `5072` |
| `ocr_uncertainty` | UNIFIED_CASE_MATRIX columna `coverage_level` (parsear "2.80% incertidumbre") | `2.80` |
| `phase_interpretation` | `SITE_COPY_DECK_v0_1.md` §7 | Texto de fase 1946 (extracción manual) |
| `caveats` | NB03 columna `main_caveat` + UNIFIED_CASE_MATRIX columna `required_caveat` | Array de textos de caveat |
| `caveat_badges` | Fijo (DATA_CONTRACT §14) | `["PROVISIONAL", "PERON_ALT_SOURCE", "NO_COMPARABLE_NUMERICAMENTE"]` |
| `blocked` | Fijo | `false` |
| `blocked_reason` | Fijo | `null` |
| `next_action` | UNIFIED_CASE_MATRIX columna `next_evidence_needed` | Texto de acción requerida |
| `linked_roadmap_item_id` | Fijo (DATA_CONTRACT §14) | `"P1"` |

**Instancia 2 — `peron_1954`** (fuente: NB03 fila `PERON_SRC_013` + UNIFIED_CASE_MATRIX fila `PERON_1954_APERTURA`)

Misma estructura que `peron_1946`. Valores clave:
- `source_id`: `"PERON_SRC_013"`
- `configuration_hypothesis`: `"mesianismo+paternalismo"`
- `peron_mes_score`: `122`, `peron_pat_score`: `110`, `peron_tec_score`: `54`
- `n_segments`: `90`
- `word_count`: `4621` (parsear de `coverage_level`)
- `ocr_uncertainty`: `2.16` (parsear de `coverage_level`)
- `caveat_badges`: `["PROVISIONAL", "PERON_ALT_SOURCE", "NO_COMPARABLE_NUMERICAMENTE"]`
- `blocked`: `false`

**Instancia 3 — `peron_1973_blocked`** (fuente: UNIFIED_CASE_MATRIX fila `PERON_1973_ASUNCION_BLOQUEADA`)

| Campo en JSON | Valor |
|---|---|
| `phase_id` | `"peron_1973_blocked"` |
| `year` | `1973` |
| `title` | "1973 — BLOQUEADO" |
| `source_id` | `"PERON_SRC_015"` |
| `source_status` | `"exclude_from_propositional_review"` |
| `corpus_lineage` | `"PERON_ALT_PIPELINE"` |
| `configuration_hypothesis` | `null` |
| `vector_ranking` | `null` |
| `peron_mes_score` | `null` |
| `peron_pat_score` | `null` |
| `peron_tec_score` | `null` |
| `n_segments` | `null` |
| `word_count` | `null` |
| `ocr_uncertainty` | `null` |
| `phase_interpretation` | `null` |
| `caveats` | Array derivado de UNIFIED_CASE_MATRIX columna `required_caveat` del registro bloqueado |
| `caveat_badges` | `["BLOQUEADO", "SOURCE_FAILURE", "PERON_ALT_SOURCE"]` |
| `blocked` | `true` |
| `blocked_reason` | UNIFIED_CASE_MATRIX columna `interpretive_hypothesis` del registro `PERON_1973_ASUNCION_BLOQUEADA` (texto completo del bloqueo BLQ-02c) |
| `next_action` | UNIFIED_CASE_MATRIX columna `next_evidence_needed` del mismo registro |
| `linked_roadmap_item_id` | `"P1"` |

**Reglas de validación:** exactamente 3 instancias. El archivo no contiene los campos `avg_tecnocracia`, `avg_paternalismo` ni `avg_mesianismo`. El registro `peron_1973_blocked` tiene `blocked: true` y `blocked_reason` no null. Los registros 1946 y 1954 tienen `blocked: false` y todos los campos de score no null.

**Display flags:** `peron_mes_score`, `peron_pat_score`, `peron_tec_score` — `public_display: true` pero siempre acompañados del badge `NO_COMPARABLE_NUMERICAMENTE` en cualquier renderizado. `word_count`, `n_segments`, `ocr_uncertainty` — `public_display: true`.

---

### 5.8 `caveat_badges.json`

**Artefacto fuente:** `VISUAL_COMPONENT_SPEC_v0_1.md` §12 (definición de los 10 badges) + `DATA_CONTRACT_v0_1.md` §12 (E08 CaveatBadge)

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §12 (E08 CaveatBadge)

**Diez instancias fijas:**

| `badge_id` | `label` | `severity` | `blocks_interaction` |
|---|---|---|---|
| `CANONICO` | `CANÓNICO` | `"info"` | `false` |
| `PROVISIONAL` | `HIPÓTESIS PROVISIONAL` | `"caution"` | `false` |
| `LOW_N` | `CORPUS INSUFICIENTE (n=X)` | `"caution"` | `false` |
| `REVIEW_ONLY` | `SOLO REFERENCIA — NO CITADO COMO EVIDENCIA` | `"high"` | `true` |
| `BLOQUEADO` | `BLOQUEADO — EVIDENCIA NO DISPONIBLE` | `"blocking"` | `true` |
| `NO_COMPARABLE_NUMERICAMENTE` | `NO COMPARABLE NUMÉRICAMENTE CON CORPUS HCDN` | `"blocking"` | `true` |
| `METADATA_CORREGIDA` | `PERFIL CORREGIDO — PENDIENTE VALIDACIÓN` | `"caution"` | `false` |
| `SOURCE_FAILURE` | `FALLA DE FUENTE DOCUMENTADA` | `"blocking"` | `true` |
| `HCDN_ONLY` | `CORPUS HCDN — NO INCLUYE PERÓN` | `"info"` | `false` |
| `PERON_ALT_SOURCE` | `PERON_ALT_PIPELINE — INSTRUMENTO DIFERENTE AL CORPUS HCDN` | `"caution"` | `false` |

Todos los campos `meaning`, `display_locations` y `required_microcopy` se extraen manualmente del `DATA_CONTRACT_v0_1.md` §12 y del `VISUAL_COMPONENT_SPEC_v0_1.md` §12.

**Reglas de validación:** exactamente 10 instancias. Ningún `badge_id` ausente. Los campos `blocks_interaction: true` en `REVIEW_ONLY`, `BLOQUEADO`, `NO_COMPARABLE_NUMERICAMENTE`, `SOURCE_FAILURE`. El campo `required_microcopy` no puede ser null para badges de severidad `"blocking"` o `"high"`.

**Regla de transformación:** extracción manual; sin fuente CSV. El archivo no cambia entre versiones del corpus hasta que el spec visual sea actualizado.

---

### 5.9 `roadmap.json`

**Artefacto fuente:** `MAPA_ORBITAL_ARGENTINO_v0_1.md` §9 (precondiciones para el mapa v1) + `DATA_CONTRACT_v0_1.md` §13 (E09 RoadmapItem) + `SITE_COPY_DECK_v0_1.md` §10 (textos descriptivos de cada condición)

**Referencia de schema:** `DATA_CONTRACT_v0_1.md` §13 (E09 RoadmapItem)

**Siete instancias con sus valores:**

| `roadmap_id` | `status` | `depends_on` | `unlocks` | `priority` |
|---|---|---|---|---|
| `P1` | `"pendiente"` | `[]` | `["P2"]` | `"alta"` |
| `P2` | `"bloqueado"` | `["P1"]` | `["P3"]` | `"alta"` |
| `P3` | `"bloqueado"` | `["P2"]` | `["P4"]` | `"alta"` |
| `P4` | `"bloqueado"` | `["P3"]` | `["P7"]` | `"alta"` |
| `P5` | `"pendiente"` | `[]` | `["P7"]` | `"media"` |
| `P6` | `"pendiente"` | `[]` | `["P7"]` | `"media"` |
| `P7` | `"bloqueado"` | `["P4", "P5", "P6"]` | `[]` | `"alta"` |

El campo `related_blocked_content` para cada item:
- `P1`: `["PERON_1973_ASUNCION_BLOQUEADA"]`
- `P2`: `["PERON_1973_ASUNCION_BLOQUEADA"]`
- `P3`: `["PERON_1973_ASUNCION_BLOQUEADA"]`
- `P4`: `["comparacion_numerica_peron_hcdn"]`
- `P5`: `["perfil_milei_confirmado"]`
- `P6`: `["pipeline_hcdn_v1"]`
- `P7`: `["MAPA_ORBITAL_ARGENTINO_v1"]`

Los campos `title` y `description` se extraen manualmente del `MAPA_ORBITAL_ARGENTINO_v0_1.md` §9 y del `SITE_COPY_DECK_v0_1.md` §10.

**Reglas de validación:** 7 instancias. P1, P5, P6 con `status: "pendiente"`. P2, P3, P4, P7 con `status: "bloqueado"`. Ningún item tiene `status: "completado"` en v0.1. El campo `depends_on` de P7 referencia exactamente `["P4", "P5", "P6"]`.

---

### 5.10 `evidence_excerpts_stub.json`

**Estado en v0.1:** los case packets NB09 existen en `empirical/corpus_presidencial_hcdn/case_packets/` pero no han sido parseados estructuradamente para el prototipo. No se extraen extractos de esos archivos en v0.1.

**Estructura del stub:** el archivo exportado contiene un array vacío o un objeto con arrays vacíos por actor, más un campo de estado explícito:

```
{
  "status": "stub_v0_1",
  "note": "Los case packets NB09 no han sido parseados para v0.1. Los extractos cualitativos del MAPA §5 se usan como fuente provisional en el prototipo estático.",
  "excerpts": []
}
```

**Reglas de transformación:** no extraer ni adivinar contenido de los NB09 sin un plan de extracción aprobado separado. El prototipo estático usa extractos cualitativos del `MAPA_ORBITAL_ARGENTINO_v0_1.md` §5 en el componente C08 (Evidence drawer) como fuente provisional.

**Reglas de validación:** el archivo existe y contiene el campo `status: "stub_v0_1"`. No contiene extractos con `authorized_for_public_display: true`. El campo `excerpts` es un array; puede estar vacío.

---

## 6. Reglas de transformación

Estas reglas aplican a todos los archivos de exportación. Un script de exportación debe implementarlas antes de escribir cualquier archivo JSON de destino.

---

**T01 — Normalización de IDs a lowercase snake_case.**
Todo `configuration_id`, `actor_id`, `document_id`, `phase_id`, `badge_id`, `roadmap_id`, y `vector_id` usa lowercase snake_case. No camelCase. No guiones. No espacios. Los nombres de display (`display_name`, `directed_label`) preservan el formato original con acentos, mayúsculas y signos diacríticos del CSV fuente.

**T02 — Tabla de slugs de `actor_id`.**
El slug de cada actor es fijo y no se deriva algorítmicamente del nombre completo. La tabla canónica es:

| Nombre en CSV | `actor_id` |
|---|---|
| `Raúl Alfonsín` | `"alfonsin"` |
| `Carlos Menem` | `"menem"` |
| `Fernando de la Rúa` | `"delarua"` |
| `Eduardo Duhalde` | `"duhalde"` |
| `Néstor Kirchner` | `"kirchner"` |
| `Cristina Fernández de Kirchner` | `"cfk"` |
| `Mauricio Macri` | `"macri"` |
| `Alberto Fernández` | `"albertof"` |
| `Javier Milei` | `"milei"` |
| `Adolfo Rodríguez Saá` | `"rodriguezsa"` |

**T03 — Tabla de correspondencia `actor_id` → `case_unit_id`.**

| `actor_id` | `case_unit_id` |
|---|---|
| `"alfonsin"` | `"ALFONSIN_1983_1989"` |
| `"menem"` | `"MENEM_1990_1999"` |
| `"delarua"` | `"DELARUA_1999_2001"` |
| `"duhalde"` | `"DUHALDE_2002_2003"` |
| `"kirchner"` | `"KIRCHNER_2003_2007"` |
| `"cfk"` | `"CFK_2007_2015"` |
| `"macri"` | `"MACRI_2015_2019"` |
| `"albertof"` | `"ALBERTOF_2019_2022"` |
| `"milei"` | `"MILEI_2024_2025"` |
| `"rodriguezsa"` | `"RODRIGUEZSA_2001"` |

**T04 — Tabla de correspondencia nombre de actor (en `actors` del NB10 configuration map) → `case_unit_id`.**
Para derivar `associated_case_unit_ids` en `configurations.json`, parsear el campo `actors` (pipe-separated) y mapear cada nombre a su `case_unit_id` usando la tabla T03 extendida:

| Nombre en CSV de configuration map | `case_unit_id` |
|---|---|
| `Alberto Fernández` | `"ALBERTOF_2019_2022"` |
| `Carlos Menem` | `"MENEM_1990_1999"` |
| `Cristina Fernández de Kirchner` | `"CFK_2007_2015"` |
| `Eduardo Duhalde` | `"DUHALDE_2002_2003"` |
| `Fernando de la Rúa` | `"DELARUA_1999_2001"` |
| `Javier Milei` | `"MILEI_2024_2025"` |
| `Mauricio Macri` | `"MACRI_2015_2019"` |
| `Néstor Kirchner` | `"KIRCHNER_2003_2007"` |
| `Raúl Alfonsín` | `"ALFONSIN_1983_1989"` |
| `Adolfo Rodríguez Saá` | `"RODRIGUEZSA_2001"` |

**T05 — Preservar `display_labels`.**
Todo campo de tipo label (`directed_label`, `display_name`, `period`, `period_label`, `label` de badges) se preserva exactamente como aparece en la fuente, incluyendo acentos, espacios, tildes, y signos diacríticos. La normalización aplica solo a los campos `_id`.

**T06 — Preservar `original_filenames` en `source_reference`.**
En `documents_hcdn.json`, el campo `filename` preserva el nombre exacto del archivo tal como aparece en el CSV, incluyendo extensión `.txt`, puntos, guiones, y cualquier carácter especial. El campo `document_id` (slug) es distinto del campo `filename`.

**T07 — Convertir strings vacíos a `null`.**
Si un campo en el CSV contiene una cadena vacía (`""`), el campo en el JSON de destino es `null`. No se preservan strings vacíos. Esta regla aplica especialmente a: `attractor_strength_summary` en el NB10 actor matrix, `secondary_vector` en documentos sin vector secundario claro, `notes` en el NB10 document table.

**T08 — Preservar textos de caveat completos.**
Los campos `required_caveat`, `blocked_reason`, `main_caveat`, `interpretive_hypothesis`, `main_hypothesis`, y `main_interpretive_hypothesis` se copian sin truncamiento. El truncamiento para display es responsabilidad del frontend, no del archivo de datos.

**T09 — Derivación de `caveat_badges` por actor.**
El algoritmo de asignación de badges para `actors_hcdn.json` es:

1. Todos los actores: añadir `"PROVISIONAL"`, `"HCDN_ONLY"`.
2. Si `readiness_status` contiene `"corrected"` o si el campo `source_status` del `CaseUnit` correspondiente contiene `"corrected"`: añadir `"METADATA_CORREGIDA"`. Aplica a: `macri`, `albertof`.
3. Si `n_documents < 4`: añadir `"LOW_N"`. Aplica a: `delarua` (n=3), `duhalde` (n=3), `milei` (n=2), `rodriguezsa` (n=1).

Resultado esperado por actor:
- `alfonsin`: `["PROVISIONAL", "HCDN_ONLY"]`
- `menem`: `["PROVISIONAL", "HCDN_ONLY"]`
- `delarua`: `["PROVISIONAL", "HCDN_ONLY", "LOW_N"]`
- `duhalde`: `["PROVISIONAL", "HCDN_ONLY", "LOW_N"]`
- `kirchner`: `["PROVISIONAL", "HCDN_ONLY"]`
- `cfk`: `["PROVISIONAL", "HCDN_ONLY"]`
- `macri`: `["PROVISIONAL", "HCDN_ONLY", "METADATA_CORREGIDA"]`
- `albertof`: `["PROVISIONAL", "HCDN_ONLY", "METADATA_CORREGIDA"]`
- `milei`: `["PROVISIONAL", "HCDN_ONLY", "LOW_N"]`
- `rodriguezsa`: `["PROVISIONAL", "HCDN_ONLY", "LOW_N"]`

**T10 — Derivar `include_in_hcdn_actor_map` desde corpus_lineage y source_status.**
En `case_units.json`: `include_in_hcdn_actor_map = (corpus_lineage == "HCDN_PROMOTED_LAYER") AND (NOT source_status.contains("exclude_from_propositional_review"))`. Los valores esperados por registro:
- Los 10 actores HCDN (`ALFONSIN_*` … `RODRIGUEZSA_*`): `true`
- `PERON_1946_ASUNCION`, `PERON_1954_APERTURA`: `false`
- `PERON_1973_ASUNCION_BLOQUEADA`: `false`

**T11 — Parsear campos numéricos desde `coverage_level`.**
Para los registros Perón en `UNIFIED_CLEAN_CASE_MATRIX`, el campo `coverage_level` contiene texto como `"1 documento / 45 segmentos A / 5072 palabras limpias / 2.80% incertidumbre"`. Los campos `word_count` y `ocr_uncertainty` de `peron_phase_cards.json` se parsean de ese texto:
- `word_count`: extraer el número antes de "palabras limpias"
- `ocr_uncertainty`: extraer el float antes de "% incertidumbre"

**T12 — `public_display` como anotación interna.**
Los campos marcados como `public_display: false` en este plan (`avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo`, `total_score`, `gap`) deben estar presentes en los archivos JSON pero el frontend no los renderiza en ninguna sección de cara al usuario. El EXPORT_REPORT debe listar explícitamente estos campos para que el implementador los identifique.

---

## 7. Reglas de validación

Estas reglas deben verificarse después de producir los diez archivos JSON. El script de exportación debe ejecutar estas verificaciones y reportar el resultado en `EXPORT_REPORT_v0_1.md`.

---

**V01 — Perón no aparece en `actors_hcdn.json`.**
Ningún registro en `actors_hcdn.json` tiene `display_name` que contenga "Perón" ni `actor_id` derivado del nombre "Juan Domingo Perón". Verificación: contar registros con `display_name.includes("Perón")` — debe ser 0.

**V02 — Perón 1973 existe y está bloqueado en `peron_phase_cards.json`.**
El archivo contiene exactamente 3 registros. El registro con `phase_id: "peron_1973_blocked"` existe, tiene `blocked: true`, y tiene `blocked_reason` no null y no vacío. Verificación: contar registros con `phase_id == "peron_1973_blocked"` — debe ser 1.

**V03 — Ningún objeto tiene a la vez campos HCDN numéricos y scores de Perón.**
Ningún registro en ninguno de los diez archivos JSON tiene simultáneamente alguno de los campos `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo` y alguno de los campos `peron_mes_score`, `peron_pat_score`, `peron_tec_score`. Estos dos conjuntos de campos son mutuamente excluyentes en el modelo de datos.

**V04 — Todo actor y caso lleva al menos un badge de caveat.**
Todo registro en `actors_hcdn.json` tiene `caveat_badges` como array no vacío con al menos `"PROVISIONAL"`. Todo registro en `case_units.json` tiene `required_caveat` no null y no vacío. Todo registro en `peron_phase_cards.json` tiene `caveat_badges` como array no vacío.

**V05 — Todo item bloqueado tiene `blocked_reason`.**
Todo registro con `blocked: true` en cualquier archivo JSON tiene `blocked_reason` no null y no vacío. Aplica a: el registro `PERON_1973_ASUNCION_BLOQUEADA` en `case_units.json` y el registro `peron_1973_blocked` en `peron_phase_cards.json`.

**V06 — Todo registro empírico tiene `corpus_lineage`.**
Todo registro en `case_units.json`, `actors_hcdn.json`, `documents_hcdn.json`, y `peron_phase_cards.json` tiene el campo `corpus_lineage` con uno de los valores canónicos: `"HCDN_PROMOTED_LAYER"`, `"PERON_ALT_PIPELINE"`, `"BLOCKED"`. El campo no puede ser null ni ausente.

**V07 — El memo en inglés no es fuente.**
El artefacto `CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` (síntesis en inglés, marcada como non-canonical 2026-04-30) no aparece como fuente en ningún campo de ningún archivo JSON. Verificación: buscar la cadena `"CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS"` en todos los archivos — debe ser 0 ocurrencias.

**V08 — Las configuraciones A+B y B+A permanecen entidades distintas.**
`configurations.json` contiene un registro con `configuration_id: "pat_tec"` y un registro distinto con `configuration_id: "tec_pat"`. No existe ningún registro que los agrupe. Ningún registro tiene un `configuration_id` del tipo `"tec_pat_dyad"` o cualquier agrupamiento que fusione los dos. Verificación: contar registros por `configuration_id` — debe ser exactamente 1 de cada uno.

**V09 — Conteos de registros.**
Después de la exportación, los conteos esperados son:

| Archivo | Registros esperados |
|---|---|
| `site_meta.json` | 1 instancia |
| `vectors.json` | 3 registros |
| `configurations.json` | 7 registros (6 + indeterminate) |
| `case_units.json` | 13 registros |
| `actors_hcdn.json` | 10 registros |
| `documents_hcdn.json` | 51 registros |
| `peron_phase_cards.json` | 3 registros |
| `caveat_badges.json` | 10 registros |
| `roadmap.json` | 7 registros |
| `evidence_excerpts_stub.json` | 0 extractos (stub) |

**V10 — Sin campo `final_type`.**
Ningún registro en ningún archivo contiene un campo llamado `final_type`, `actor_type`, `rhetorical_type`, ni `classification` con valor que clasifique a un actor con un tipo fijo.

---

## 8. Plan del script de exportación

El script que produce los diez archivos JSON se ubicará en:

```
web/scripts/export_static_data_v0_1.py
```

Este script no existe aún. No crear el script hasta que este plan y el `DATA_CONTRACT_v0_1.md` estén revisados y aprobados.

**Secuencia de tareas del script (en orden):**

1. **Leer fuentes.** Leer todos los CSV canónicos (`UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv`, `NB10_democratic_actor_interpretive_matrix_v0_1.csv`, `NB10_democratic_document_interpretive_table_v0_1.csv`, `NB10_configuration_map_v0_1.csv`, `NB10_transition_analysis_v0_1.csv`, `PERON_NB03_1946_1954_phase_contrast_v0_1.csv`) usando rutas relativas desde la raíz del workspace. No modificar ningún CSV durante la lectura.

2. **Aplicar transformaciones.** Ejecutar las reglas T01–T12 de la §6 para derivar todos los campos calculados. Producir los objetos de datos para cada entidad en memoria antes de escribir a disco.

3. **Verificar invariantes.** Ejecutar las reglas V01–V10 de la §7 sobre los objetos producidos en memoria. Si alguna regla falla, abortar la escritura y registrar el fallo en el EXPORT_REPORT.

4. **Escribir archivos JSON.** Solo si las verificaciones pasan, escribir los diez archivos en `web/static_prototype/data/`. Crear la carpeta si no existe.

5. **Producir el EXPORT_REPORT.** Escribir `web/static_prototype/data/EXPORT_REPORT_v0_1.md` con conteos de registros, estado de validaciones, campos `public_display: false` identificados, y lista de archivos fuente usados con timestamps.

**Entorno del script:** Python estándar con biblioteca `csv` para lectura de CSVs. Sin dependencias externas adicionales para la exportación base. El output JSON debe ser legible (indentado, 2 espacios) para facilitar la inspección manual.

**El script no debe:**
- Modificar ningún artefacto en `empirical/`
- Leer archivos de `corpus/raw/`, `corpus/processed/` ni `datasets/documents_text_raw/`
- Leer la síntesis en inglés (`CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md`)
- Leer outputs NB01–NB04 pre-calibración

---

## 9. Plan del reporte de exportación

El reporte de exportación se producirá automáticamente en:

```
web/static_prototype/data/EXPORT_REPORT_v0_1.md
```

El reporte no se edita manualmente. Se regenera en cada ejecución del script. Secciones que debe incluir:

**§1 — Archivos generados.** Lista de los diez archivos con ruta, tamaño, y timestamp de creación.

**§2 — Conteos de registros.** Tabla con nombre de archivo, registros esperados, y registros generados. Cualquier discrepancia entre esperado y generado se marca como `[FALLO]`.

**§3 — Estado de validación.** Una fila por regla V01–V10: `[PASS]` o `[FALLO]` con descripción del fallo si aplica. Si alguna regla falla, el reporte lo indica con `EXPORT_STATUS: FAILED`.

**§4 — Advertencias.** Lista de campos null derivados que pueden requerir atención (ej. `attractor_strength_summary` null para actores específicos), gaps de corpus documentados (AlbertoF 2023 ausente, CFK 2009 posiblemente ausente, Milei 2023 inaugural), y cualquier string vacío convertido a null que no era esperado.

**§5 — Campos de uso interno.** Lista explícita de todos los campos con `public_display: false` en los archivos generados, para que el implementador del prototipo los identifique sin leer este plan.

**§6 — Fuentes usadas.** Lista de todos los artefactos fuente con ruta relativa desde la raíz del workspace y fecha de última modificación en el momento de la exportación.

**§7 — Timestamp.** Fecha y hora de la exportación en formato ISO 8601.

---

## 10. Preguntas abiertas

**Q01 — ¿Los extractos de evidencia deben exportarse en v0.1 o en v0.2?**
El prototipo estático de v0.1 usa extractos cualitativos del `MAPA_ORBITAL_ARGENTINO_v0_1.md` §5 en el componente C08 (Evidence drawer). Los case packets NB09 tienen un formato de texto no estructurado que requeriría un parser dedicado antes de exportar a `evidence_excerpts_stub.json`. Decisión pendiente: si el prototipo v0.1 usa solo los extractos del MAPA (enfoque mínimo) o si se produce un plan de extracción NB09 separado antes de la implementación del prototipo.

**Q02 — ¿El timeline de actor necesita su propio archivo JSON?**
El archivo `documents_hcdn.json` contiene todos los campos necesarios para el componente C07 (Actor timeline): año, configuración, attractor_strength, flags booleanos. El frontend puede filtrar por `actor_id` en tiempo de render. Sin embargo, si el prototipo estático no ejecuta ningún JavaScript en el cliente, puede ser necesario un archivo `actor_timelines.json` con vistas pre-filtradas por actor (10 arrays, uno por actor). Decisión pendiente del framework de implementación.

**Q03 — ¿El prototipo estático debe embeber datos o consumir los archivos JSON?**
Dos opciones: (a) los datos se embeben en el HTML como `<script>` o en variables del template en tiempo de build; (b) el frontend hace fetch de los archivos JSON en runtime. La opción (a) es más simple para un prototipo genuinamente estático sin servidor. La opción (b) requiere un servidor mínimo o un entorno de build que permita fetch local. Esta decisión afecta si los archivos JSON de `data/` son outputs del build (opción a) o assets servidos (opción b).

**Q04 — ¿Las figuras y diagramas del MAPA deben reutilizarse como imágenes o recrearse como componentes?**
El `MAPA_ORBITAL_ARGENTINO_v0_1.md` puede contener figuras en `figures_promoted/`. El prototipo estático define el componente C03 (Orbital map preview) y C11 (V1 roadmap tracker) como representaciones visuales de los datos. Decisión pendiente: ¿reproducir esas figuras como imágenes estáticas en el prototipo, o construirlos como componentes HTML/SVG alimentados por los JSON exportados? La segunda opción es más mantenible pero requiere más trabajo de implementación en v0.1.

---

## 11. Próximo paso

Los cuatro pasos siguientes deben completarse en este orden. No anticipar el paso siguiente sin completar el anterior.

**Paso 1 — Implementar el script de exportación.**
Crear `web/scripts/export_static_data_v0_1.py` siguiendo las especificaciones de §8. El script debe pasar todas las verificaciones V01–V10 en su primera ejecución exitosa. El EXPORT_REPORT generado es el artefacto de aprobación del paso.

**Paso 2 — Ejecutar la exportación una vez y revisar el EXPORT_REPORT.**
Ejecutar el script. Revisar el EXPORT_REPORT para confirmar que todos los conteos coinciden con los valores esperados de §7 (V09), que no hay fallos de validación, y que los campos de uso interno están identificados. Corregir el script si hay discrepancias antes de avanzar.

**Paso 3 — Validar el JSON contra el `DATA_CONTRACT_v0_1.md`.**
Verificar manualmente que la estructura de cada archivo JSON generado cumple con el schema de la entidad correspondiente en el DATA_CONTRACT. En particular: (a) ningún campo `final_type`; (b) Perón 1973 bloqueado con razón completa; (c) los badges de cada actor son los correctos según T09; (d) `total_score` y `gap` presentes en `documents_hcdn.json` pero marcados como internos.

**Paso 4 — Implementar el prototipo estático.**
Con el copy deck, el visual spec, el contrato de datos, el static prototype spec, y los archivos JSON validados: construir las páginas P01–P09 definidas en `STATIC_PROTOTYPE_SPEC_v0_1.md`. Los archivos JSON son la fuente de datos del prototipo. El prototipo no recalcula campos derivados — los consume directamente de los JSON.

---

*Producido en el marco del proyecto El problema de los tres cuerpos argentinos. Este plan deriva de evidencia provisional. Ningún paso en este plan introduce clasificaciones históricas definitivas de actores. La separación estructural entre PERON_ALT_PIPELINE y HCDN_PROMOTED_LAYER es un invariante del plan — no una convención opcional. La exportación no puede proceder si las reglas V01–V10 no pasan en su totalidad.*
