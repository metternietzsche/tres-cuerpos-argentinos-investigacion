# EXPORT REPORT v0.1

**Fecha:** 2026-04-30
**Script:** `web/scripts/export_static_data_v0_1.py`
**Estado:** PASS — todos los invariantes satisfechos

---

## Archivos generados

- `site_meta.json` — 1 registros (SiteMeta)
- `vectors.json` — 3 registros (Vector)
- `configurations.json` — 7 registros (Configuration)
- `case_units.json` — 13 registros (CaseUnit)
- `actors_hcdn.json` — 10 registros (ActorProfile)
- `documents_hcdn.json` — 51 registros (DocumentRecord)
- `peron_phase_cards.json` — 3 registros (PeronPhaseCard)
- `caveat_badges.json` — 10 registros (CaveatBadge)
- `roadmap.json` — 7 registros (RoadmapItem)
- `evidence_excerpts.json` — 0 registros (EvidenceExcerpt (stub))

---

## Conteos de registros

| Entidad | Esperado | Real |
|---------|----------|------|
| vectors | 3 | 3 ✓ |
| configurations | 7 | 7 ✓ |
| case_units | 13 | 13 ✓ |
| actors_hcdn | 10 | 10 ✓ |
| documents_hcdn | 51 | 51 ✓ |
| peron_phase_cards | 3 | 3 ✓ |
| caveat_badges | 10 | 10 ✓ |
| roadmap | 7 | 7 ✓ |

---

## Validaciones

Todos los invariantes V01–V10 satisfechos.

---

## Notas de exportación

- `attractor_strength_summary` en `actors_hcdn.json`: columna vacía en NB10_democratic_actor_interpretive_matrix. Todos los valores son `null`. Derivar de `documents_hcdn.json` en post-proceso.
- `interpretation` en `configurations.json`: texto en inglés preservado de NB10_configuration_map. Reemplazar con español del MAPA §4 para display público.
- `evidence_excerpts.json`: stub — NB09 case packets no parseados en v0.1.
- `total_score` y `gap` en `documents_hcdn.json`: campos de uso interno. No mostrar en display público.
- `avg_tecnocracia`, `avg_paternalismo`, `avg_mesianismo` en `actors_hcdn.json`: uso interno. No mostrar como cifras prominentes.
