# NB10 — Interpretive Synthesis: Democratic Presidential Discourse 1983–2025

**Version:** v0_1
**Date:** 2026-04-29
**Status:** interpretive synthesis — not a final classification
**Authorized:** 2026-04-29 after both blocking prerequisites satisfied
**Produced by:** `notebooks/NB10_interpretive_synthesis_democracy_1983_2025.py`

---

## 1. Scope

This document synthesizes the HCDN corpus lab's calibrated scores for the Argentine democratic
period (1983–2025) into a first controlled interpretive layer. It covers 51 documents
from 10 actors across 10 democratic-period presidencies.

**What this is:**
- A synthesis of corrected, promoted pipeline outputs (NB05–NB09) into interpretive hypotheses
- A map of configuration patterns and trajectory instability across the democratic period
- A set of provisional, evidence-grounded hypotheses about presidential discourse patterns

**What this is not:**
- A final historical classification of any actor or period
- A claim about the political orientation or ideology of any government
- A model update or scoring revision
- A comparison involving Perón (no calibrated profile exists in any pipeline)

**Discourse ≠ Government.** Vector configurations describe the rhetorical register of presidential
addresses. A paternalismo-dominant configuration does not imply a welfare-state policy; a
tecnocracia-dominant configuration does not imply technocratic governance. These are properties
of the *discourse*, not the *administration*.

---

## 2. Source Authority

All inputs are from the canonical promoted layer or corrected lab outputs:

| Source | Path | Status |
|--------|------|--------|
| NB08 actor profiles | `tables_promoted/NB08_democratic_actor_profiles_1983_2025.csv` | canonical promoted |
| NB08 documents | `tables_promoted/NB08_democratic_documents_1983_2025.csv` | canonical promoted |
| NB08 transitions | `tables_promoted/NB08_democratic_configuration_transitions.csv` | canonical promoted |
| NB07 period summary | `tables_promoted/NB07_actor_period_summary.csv` | canonical promoted |
| NB07 actor profiles | `tables_promoted/NB07_actor_orbital_profiles.csv` | canonical promoted |
| Manual review resolutions | `review_queue/manual_review_queue_resolution_v0_1.csv` | 2026-04-29 |
| Macri 2019 correction | `review_queue/metadata_patch_macri_2019_v0_1.csv` | 2026-04-29 |
| Genre metadata | `corpus/registry/hcdn_messages_registry.csv` | source of record |

**Lineage:** All NB07–NB08 promoted outputs reflect the 2026-04-29 metadata correction
(`Mensaje Presidencial 2019.txt` → Alberto Fernández). No pre-correction outputs are used.

---

## 3. Corrections and Review Status

### 3.1 Macri 2019 Metadata Correction

`Mensaje Presidencial 2019.txt` was misattributed to Mauricio Macri by the pipeline's
year-based heuristic. The document is Alberto Fernández's inauguration address (2019-12-10).
Correction applied 2026-04-29 (patch v0_2). See: `review_queue/MACRI_2019_METADATA_RESOLUTION_v0_1.md`.

Downstream effects:
- Macri: n_docs 6→5; caution high→medium; status review_only→provisional
- Alberto Fernández: n_docs 3→4; year_min 2020→2019; gains 2019 inauguration

### 3.2 Manual Review Queue — 8 Documents Cleared

All 8 active flagged documents (requires_manual_reading, still_ambiguous, possible_overcorrection)
were reviewed via human text inspection and cleared to `cleared_provisional`.
See: `review_queue/MANUAL_REVIEW_QUEUE_RESOLUTION_v0_1.md`.

| Document | Original flag | Resolution | Key finding |
|---|---|---|---|
| `01.03.2018As.txt` (Macri 2018) | requires_manual_reading | cleared_provisional | Indeterminate retained; tec_TM=0 despite TM-type content |
| `1988-12-21_Asamblea_...Alfonsin.txt` | requires_manual_reading | cleared_provisional | Indeterminate retained; tec=mes exact tie genuine (Carapintada crisis) |
| `Mensaje Presidencial 2022.txt` (Alberto F) | still_ambiguous | cleared_provisional | near-tie (gap=1.49/3.9%); pat barely dominant |
| `MENSAJE PRESIDENCIAL 1995.txt` (Menem) | still_ambiguous | cleared_provisional | near-tie (gap=0.911/1.1%); effective co-dominance |
| `2014-03-01_Asamblea_...Fernandez.txt` (CFK) | still_ambiguous | cleared_provisional | near-tie (gap=0.983/2.6%) |
| `MENSAJE PRESIDENCIAL 1985.txt` (Alfonsín) | still_ambiguous | cleared_provisional | near-tie (gap=0.822/1.2%); three-body (mes=7.398) |
| `MENSAJE PRESIDENCIAL 1994.txt` (Menem) | possible_overcorrection | cleared_provisional | AGN exclusion valid; pat lead (gap=4.672) stands |
| `2003-05-25_...Kirchner_Asuncixn.txt` | possible_overcorrection | cleared_provisional | TCM downweighting drove flip; pat lead (gap=3.873) stands |

**Two documents retain `indeterminate` attractor (low-weight):**
- Macri 2018 (`01.03.2018As.txt`): total_score=10.44
- Alfonsín 1988 extraordinary (`1988-12-21_Asamblea_Legislativa_Extraordinaria_Alfonsin.txt`): total=11.64, exact tie

---

## 4. Actor Interpretive Matrix

**Corpus summary:** 51 documents | 10 actors | Strong: 21 | Medium: 25 | Weak: 2 | Indeterminate: 3


### Carlos Menem

| Field | Value |
|-------|-------|
| Years | 1990–1999 |
| n documents | 11 |
| Directed configuration | paternalismo+tecnocracia |
| avg tec / pat / mes | 19.115 / 32.014 / 2.415 |
| Attractor mode |  |
| Transitions | 3 |
| Caution | low |
| Readiness | strong_provisional |

**Hypothesis:** Menem's discourse is persistently paternalismo-dominant across eleven years — the largest corpus in the democratic period. The paternalismo+tecnocracia configuration holds in 9 of 11 documents. The paternalist mass in Menem's rhetoric is robust across the neoliberal economic reorientation of the 1990s: the government's market-liberalizing program is articulated in a paternalist rhetorical register, not a technocratic one. The 1996 apertura is uniquely paternalismo+none (secondary vector absent), and 1997 is the only tecnocracia+paternalismo instance. The 1994 (possible_overcorrection) and 1995 (still_ambiguous) flags are cleared but note near-ties and AGN suppression respectively.

**Caveat:** Caution level: low (n=11, share_problematic=0.182). Two cleared flags remain interpretively relevant: 1994 possible_overcorrection (AGN exclusion suppressed tec; constitutional reform year); 1995 still_ambiguous (effective tec=pat co-dominance, gap=0.911/82.893 = 1.1%). The 1995 second-term inaugural is a distinct weak-attractor document. Do not conflate Menem's rhetorical register with his policy orientation.

### Cristina Fernández de Kirchner

| Field | Value |
|-------|-------|
| Years | 2007–2015 |
| n documents | 9 |
| Directed configuration | tecnocracia+paternalismo |
| avg tec / pat / mes | 18.305 / 15.958 / 1.483 |
| Attractor mode |  |
| Transitions | 4 |
| Caution | low |
| Readiness | strong_provisional |

**Hypothesis:** CFK shows the most consistent strong-attractor configuration in the democratic corpus: 6 of 9 documents score strong attractor strength. The actor modal configuration paternalismo+tecnocracia (5 documents) is interrupted by four tecnocracia+paternalismo instances (2008, 2011 apertura, 2011 inauguration, and 2012 inverted). The 2008 tecnocracia+paternalismo document is particularly strong (gap=38.408, strength=strong) — the sharpest technocratic dominance in the CFK corpus. Overall the actor profile shows tecnocracia as the average-dominant vector (avg_tec=18.305 > avg_pat=15.958) despite the modal configuration being paternalismo+tecnocracia. CFK's discourse shifts across her two terms in ways that warrant intra-term disaggregation in future analysis.

**Caveat:** n=9 documents. LOW caution. share_ambiguous=0.111 (1/9). One cleared flag: 2014 still_ambiguous (gap=0.983/2.6% — near-tie). The 2009 document is in the registry but not in the NB08 democratic corpus (possible pipeline gap — not in NB08 table). The 2015 apertura (last document) is in the 'Macrismo' period boundary — filed under CFK/Kirchnerismo in NB09 but listed under period 10 in NB08. Nominal actor caution=low is the strongest reading confidence in the democratic corpus.

### Raúl Alfonsín

| Field | Value |
|-------|-------|
| Years | 1983–1989 |
| n documents | 8 |
| Directed configuration | tecnocracia+paternalismo |
| avg tec / pat / mes | 19.223 / 15.947 / 5.09 |
| Attractor mode |  |
| Transitions | 5 |
| Caution | medium |
| Readiness | provisional |

**Hypothesis:** Alfonsín's discourse is characterized by high orbital instability: the dominant vector shifts repeatedly among tecnocracia, paternalismo, and mesianismo across the eight-year term. The 1983 inauguration and 1986–1987 aperturas anchor tecnocracia; the 1984–1985 addresses show paternalismo dominance; the 1989 final address pivots to mesianismo. The 1988 extraordinary session (Carapintada crisis) shows the only tec+mes configuration in the corpus, reflecting constitutional-juridical defense combined with democratic-mission appeal. No single configuration is stable across the presidency.

**Caveat:** Two documents retain active caution flags: 1985 (still_ambiguous near-tie, gap=0.822) and 1988 extraordinary (indeterminate attractor, tec=mes exact tie, session-record format). The 1989 mesianismo dominance is a single-year signal and should not be over-weighted. Mesianismo secondary is notable across the term (avg_mes=5.09, highest of all democratic actors).

### Néstor Kirchner

| Field | Value |
|-------|-------|
| Years | 2003–2007 |
| n documents | 5 |
| Directed configuration | paternalismo+tecnocracia |
| avg tec / pat / mes | 27.833 / 28.448 / 1.867 |
| Attractor mode |  |
| Transitions | 1 |
| Caution | medium |
| Readiness | provisional |

**Hypothesis:** Kirchner's five-document corpus shows a paternalismo+tecnocracia inaugural (2003) followed by a shift to tecnocracia+paternalismo in 2005–2007 (three consecutive years). The overall actor profile (paternalismo barely dominant at avg: 28.448 vs 27.833) reflects genuine near-parity across the term. The 2003 inauguration's possible_overcorrection flag (cleared) notes that TCM downweighting drove the paternalismo assignment; the 2005–2007 apertura run anchors the tecnocracia signal. Kirchner's discourse is the most balanced tec/pat dyad in the democratic corpus.

**Caveat:** n=5 documents. Medium caution. share_ambiguous=0.8 (4/5 documents have NB05 ambiguity flag). The tec/pat near-parity makes any strong directional claim about Kirchner's dominant vector unreliable. The 2007 last apertura (gap=0.935, total=56.606 = 1.7%) is effectively a tie. Kirchner's corpus is the most ambiguous in the democratic period.

### Mauricio Macri

| Field | Value |
|-------|-------|
| Years | 2015–2019 |
| n documents | 5 |
| Directed configuration | tecnocracia+paternalismo |
| avg tec / pat / mes | 20.542 / 13.914 / 0.869 |
| Attractor mode |  |
| Transitions | 3 |
| Caution | medium |
| Readiness | provisional |

**Hypothesis:** Macri's corrected profile (n=5, after removing the misattributed Alberto Fernández 2019 inauguration) shows tecnocracia+paternalismo as the modal configuration across the Macrismo period: the 2016 and 2017 aperturas and the 2019 final apertura anchor tecnocracia dominance with strong attractor. The 2015 inauguration is the only paternalismo+tecnocracia document (characteristic of inaugural addresses across actors). The 2018 apertura retains an indeterminate attractor (low total score, tec_TM=0.0 despite TM-type content) and should not carry full weight. The corrected profile is internally coherent: tecnocracia dominates the working-presidency aperturas.

**Caveat:** CORRECTED PROFILE. Metadata correction applied 2026-04-29. Profile based on 5 documents (was 6 before correction). Medium caution. The 2018 document has indeterminate attractor (total_score=10.44, tec_TM=0.0) — treat as low-weight. The 2018 document's tec_TM=0.0 despite clear TM-type content (digital government, Estado moderno) may indicate a pattern-set gap for this speech style. The corrected profile should not be cited as final until a full pipeline v1 re-run confirms actor-level aggregations.

### Alberto Fernández

| Field | Value |
|-------|-------|
| Years | 2019–2022 |
| n documents | 4 |
| Directed configuration | paternalismo+tecnocracia |
| avg tec / pat / mes | 15.456 / 16.356 / 0.77 |
| Attractor mode |  |
| Transitions | 1 |
| Caution | high |
| Readiness | provisional_high_caution |

**Hypothesis:** Alberto Fernández's corpus begins in 2019 after metadata correction (the inauguration address was previously misattributed to Macri). The four-document profile shows paternalismo+tecnocracia as the modal configuration (2021 and 2022). The 2019 and 2020 addresses are tecnocracia+paternalismo — the inversion is consistent across the transition from inauguration to first-year governance. Overall actor averages show paternalismo barely above tecnocracia (16.356 vs 15.456), making this the most tightly paired actor-level dyad in the democratic corpus after Kirchner. The 2019 inauguration retains an indeterminate attractor (exact tie tec=pat=14.001).

**Caveat:** CORRECTED PROFILE. Profile includes 2019 inauguration recovered from Macri misattribution. HIGH caution (share_problematic_audit=0.5, n=4). The 2019 document has indeterminate attractor (exact tec=pat tie). The 2022 address is still_ambiguous (cleared_provisional, gap=1.49/3.9%). share_ambiguous_nb05=1.0 (all 4 documents have NB05 ambiguity flag). This profile should not be used for strong configuration claims. Caution remains high pending corpus expansion (2023 apertura not in corpus). Interpret separately from Macri; do not use the pre-correction merged profile.

### Fernando de la Rúa

| Field | Value |
|-------|-------|
| Years | 1999–2001 |
| n documents | 3 |
| Directed configuration | paternalismo+tecnocracia |
| avg tec / pat / mes | 22.164 / 27.379 / 6.228 |
| Attractor mode |  |
| Transitions | 1 |
| Caution | medium |
| Readiness | provisional |

**Hypothesis:** De la Rúa's three-document corpus shows a paternalismo+tecnocracia configuration in 2000 (strong) and 1999 (inauguration, medium), shifting to tecnocracia+paternalismo in 2001 as economic crisis deepened. The 2001 flip coincides with IMF adjustment pressure and the political context of austerity. The overall actor profile (paternalismo dominant) reflects the 2000 strong-attractor document's weight.

**Caveat:** n=3 documents only. Medium caution. The 2001 address (tecnocracia+paternalismo, NB05 ambiguity flag) represents a rhetorical shift consistent with fiscal-austerity framing but the corpus is too small for confident trajectory claims. Corpus ends with resignation (Dec 2001) — no exit speech in corpus.

### Eduardo Duhalde

| Field | Value |
|-------|-------|
| Years | 2002–2003 |
| n documents | 3 |
| Directed configuration | paternalismo+tecnocracia |
| avg tec / pat / mes | 18.699 / 19.834 / 10.962 |
| Attractor mode |  |
| Transitions | 1 |
| Caution | medium |
| Readiness | provisional |

**Hypothesis:** Duhalde's three-document corpus shows an inaugural paternalismo+mesianismo configuration (Jan 2002) followed by a shift to tecnocracia+paternalismo in both apertura addresses (2002 and 2003). The transition from crisis-redemption to technocratic-governance framing across 2002 tracks the stabilization phase of the post-collapse administration.

**Caveat:** n=3 documents. Medium caution. Mesianismo is elevated at actor level (avg_mes=10.962 — highest among multi-year democratic actors) due to the 2002 inaugural. The two apertura addresses are NB05 ambiguous (ambiguity_flag=True). Duhalde profile is provisional and should not be cited for strong configuration claims.

### Javier Milei

| Field | Value |
|-------|-------|
| Years | 2024–2025 |
| n documents | 2 |
| Directed configuration | tecnocracia+mesianismo |
| avg tec / pat / mes | 18.212 / 11.188 / 13.435 |
| Attractor mode |  |
| Transitions | 0 |
| Caution | medium |
| Readiness | provisional_insufficient_corpus |

**Hypothesis:** Milei shows a distinctive tecnocracia+mesianismo configuration across both available documents — the only actor in the democratic corpus where mesianismo is a sustained secondary vector at actor level. The 2024 address is medium-attractor; the 2025 address strengthens to strong-attractor with increasing score density. The avg_mes=13.435 is by far the highest mesianismo score in the democratic corpus (next highest: Alfonsín avg_mes=5.09). The tecnocracia+mesianismo configuration is empirically distinctive but rests on n=2 documents only — corpus expansion is required before confident claims.

**Caveat:** n=2 documents. Medium caution. PROVISIONAL — insufficient corpus. The 2024 document has NB05 ambiguity flag (gap=2.223/5.4%). The 2023 inaugural is in the registry but not in the NB08 democratic corpus (Milei assumed office Dec 2023 — this apertura may not have been processed). Do not cite tecnocracia+mesianismo as a confirmed Milei configuration. Reassess after 2026 apertura ingestion.

### Adolfo Rodríguez Saá

| Field | Value |
|-------|-------|
| Years | 2001–2001 |
| n documents | 1 |
| Directed configuration | paternalismo+mesianismo |
| avg tec / pat / mes | 3.54 / 9.666 / 5.582 |
| Attractor mode |  |
| Transitions | 0 |
| Caution | high |
| Readiness | single_document |

**Hypothesis:** Rodríguez Saá's single corpus document (inauguration, Dec 22–23 2001) shows a distinctive paternalismo+mesianismo configuration — the only paternalismo+mesianismo in the democratic corpus. The strong attractor reflects the high-intensity populist and crisis-redemption rhetoric of his brief presidency. No trajectory is assessable from one document.

**Caveat:** n=1 document. HIGH caution. Single-document actor — no aggregation is valid. Treat as a single data point only. The strong attractor may reflect the extraordinary political circumstances (financial collapse, default declaration) rather than a stable discourse pattern.


---

## 5. Configuration Map

| Configuration | n docs | n actors | Stability |
|---|---|---|---|
| `paternalismo+tecnocracia` | 25 | 7 | stable_major |
| `tecnocracia+paternalismo` | 19 | 8 | stable_major |
| `tecnocracia+mesianismo` | 3 | 2 | provisional_distinctive |
| `paternalismo+mesianismo` | 2 | 2 | provisional_distinctive |
| `paternalismo+none` | 1 | 1 | provisional_rare |
| `mesianismo+tecnocracia` | 1 | 1 | provisional_distinctive |


**Key observations:**

1. **Dominant pair:** `paternalismo+tecnocracia` (21 docs, 9 actors) and `tecnocracia+paternalismo`
   (17 docs, 7 actors) together account for 38 of 51 documents (74.5%). The tec/pat dyad is the
   structural baseline of Argentine democratic presidential rhetoric.

2. **Minority configurations:** `tecnocracia+mesianismo` (3 docs) and `paternalismo+mesianismo`
   (2 docs) appear exclusively in crisis or inaugural contexts. `mesianismo+tecnocracia` appears
   once (Alfonsín 1989 — hyperinflationary crisis exit).

3. **Milei's distinctive position:** `tecnocracia+mesianismo` is the only actor-level configuration
   not shared with any other stable-trajectory actor. The 2 documents are insufficient for a
   trajectory claim but the signal is consistent across both years.

4. **Menem's 1996 outlier:** `paternalismo+none` (no secondary vector) is unique in the corpus.

---

## 6. Transition Patterns

| Actor | Transitions | Documents | Stability | Rate |
|---|---|---|---|---|
| Raúl Alfonsín | 5 | 8 | unstable | 0.71 |
| Cristina Fernández de Kirchner | 4 | 9 | moderate | 0.5 |
| Carlos Menem | 3 | 11 | moderate | 0.3 |
| Mauricio Macri | 3 | 5 | unstable | 0.75 |
| Alberto Fernández | 1 | 4 | moderate | 0.33 |
| Eduardo Duhalde | 1 | 3 | moderate | 0.5 |
| Fernando de la Rúa | 1 | 3 | moderate | 0.5 |
| Néstor Kirchner | 1 | 5 | stable | 0.25 |
| Javier Milei | 0 | 2 | stable | 0.0 |


**Most unstable actor:** Raúl Alfonsín — maximum configuration transitions.

**Most stable multi-year actor:** Néstor Kirchner — highest stability ratio among actors with ≥4 documents.

**Pattern observations:**

- CFK is the most stable multi-year actor with ≥4 documents: modal configuration holds across 7/9
  documents; the 5 oscillations between paternalismo+tecnocracia and tecnocracia+paternalismo are
  within-dyad (the vectors switch dominance but the pair is constant).
- Menem shows high stability within a single configuration across 11 documents (9 paternalismo+tecnocracia).
- Alfonsín shows the most genuine instability: the secondary and dominant vectors change, and
  mesianismo appears as dominant in 1989 — a qualitatively different configuration.
- Kirchner's trajectory shows a paternalismo-dominant inauguration followed by three
  tecnocracia-dominant aperturas (2005–2007) — a within-term shift consistent with governance
  routinization.

---

## 7. Provisional Hypotheses


### H01 — CFK shows the most consistent strong orbital pattern in the available democratic…

**Support:** NB08 actor profile: caution_level=low, share_strong=0.667, share_medium=0.333. 9 documents 2007–2015. NB07 orbital profile: attractor_strength_mode=strong. Modal config paternalismo+tecnocracia holds in 2007-inaug, 2010, 2012, 2013, 2014, 2015. Tecnocracia+paternalismo in 2008, 2011-ap, 2011-inaug. NB09 case packet: full coverage.

**Actors:** Cristina Fernández de Kirchner | **Confidence:** high

**Caveats:** The average-dominant vector (tecnocracia) differs from the modal configuration dominant (paternalismo) due to the 2008 address's extreme tecnocracia gap (38.408). Intra-term disaggregation (first vs second term) is warranted. The 2014 document is cleared_provisional (near-tie). The 2009 address is in the registry but not in NB08 — possible corpus gap.

**Required next evidence:** Intra-term comparison (2007–2011 vs 2011–2015). Ingestion of 2009 apertura if missing. Comparison with Kirchner (same political coalition) to assess within-coalition continuity.

### H02 — Milei shows a distinctive tecnocracia+mesianismo configuration not observed in a…

**Support:** NB08 actor profile: tecnocracia dominant, mesianismo secondary, config=tecnocracia+mesianismo. 2024: medium attractor (13.338), gap=2.223. 2025: strong attractor (13.532), gap=7.33. Strength trend: medium → strong across two years. avg_mes=13.435 vs corpus mean ~3.0. No other multi-year actor reaches mesianismo as secondary at actor level.

**Actors:** Javier Milei | **Confidence:** provisional — insufficient corpus (n=2)

**Caveats:** n=2 documents only. Medium caution. The 2024 document has NB05 ambiguity flag. The 2023 inaugural may not be in corpus (Milei assumed office Dec 10, 2023). Two documents cannot establish a trajectory. Corpus expansion is required before claiming tecnocracia+mesianismo as a confirmed Milei discourse pattern. Rodríguez Saá and Alfonsín 1988/1989 show mesianismo as secondary/dominant in one document each — these are not trajectory-level signals.

**Required next evidence:** 2026 apertura ingestion. Possible ingestion of 2023 inaugural. With n≥4, test whether mesianismo secondary is stable or recedes as governance normalizes.

### H03 — Menem's presidential discourse retains strong paternalist mass despite the neoli…

**Support:** NB08 actor profile: caution_level=low, n=11, dominant=paternalismo, avg_pat=32.014. Menem corpus spans 1990–1999; 9/11 docs show paternalismo+tecnocracia. The one tecnocracia-dominant year (1997, gap=1.833) is near-tied. 1992 document is the highest-scoring paternalismo document in the corpus (pat=70.362, total=98.679). avg_tec=19.115 — substantial but well below avg_pat=32.014.

**Actors:** Carlos Menem | **Confidence:** high

**Caveats:** The 1994 (possible_overcorrection) and 1995 (still_ambiguous) flags are cleared but interpretively relevant: 1994 had significant AGN-type institutional-reform technocracy excluded by calibration; 1995 shows near-tie (gap=0.911/1.1%). Caution level LOW applies to data quality, not to the interpretation claim — the paternalist mass claim is robust and does not depend on the flagged documents. Do not conflate Menem's rhetorical register with his government's ideology.

**Required next evidence:** Qualitative reading of the 1992 outlier (pat=70.362) and the 1997 tecnocracia outlier. Comparison of first-term (1989–1995) vs second-term (1995–1999) sub-profiles. Analysis of the 1989 inaugural (HCDN-0138 in registry but not in NB08 democratic corpus).

### H04 — Alfonsín shows the highest orbital instability of any multi-year democratic acto…

**Support:** NB08 transition table: 5 changes in 8 documents. Configurations: tec+pat (1983) → pat+tec (1984) → [same] (1985) → tec+pat (1986) → [same] (1987) → tec+mes (1988-extraordinary) → tec+pat (1988-apertura) → mes+tec (1989). avg_mes=5.09, highest in democratic corpus. Mesianismo appears in 3 distinct documents as primary (1989), secondary (1986–1987), and tied (1988 extraordinary).

**Actors:** Raúl Alfonsín | **Confidence:** medium

**Caveats:** Medium caution. The 1985 document is near-tied cleared_provisional (gap=0.822). The 1988 extraordinary is low-weight (indeterminate, session-record format). Counting the extraordinary session as a transition may overstate instability — it is a unique genre (extraordinary assembly) not comparable to annual aperturas. Excluding the 1988 extraordinary reduces transition count to 4. The instability claim is still valid without this document.

**Required next evidence:** Qualitative reading of the 1989 mesianismo address (hyperinflationary crisis context). Intra-period disaggregation: 1983–1986 (democratic consolidation) vs 1987–1989 (crisis). Comparison with the 1989 inaugural (Menem) as a potential counterpoint.

### H05 — Macri's corrected profile (n=5, after removing the Alberto Fernández 2019 inaugu…

**Support:** NB08 actor profile (corrected): caution_level=medium, n=5, metadata_suspect_present=False. Modal config: tecnocracia+paternalismo (3/5 documents: 2016, 2017, VT-2019). Inauguration 2015: paternalismo+tecnocracia (consistent with inaugural pattern across actors). 2018: indeterminate attractor (low-weight). avg_tec=20.542 > avg_pat=13.914 — widest tec/pat gap among medium-caution actors.

**Actors:** Mauricio Macri | **Confidence:** medium — provisional

**Caveats:** CORRECTED PROFILE (2026-04-29 metadata patch). Medium caution. The 2018 document has indeterminate attractor (total_score=10.44, tec_TM=0.0 despite TM-type content). Excluding 2018, 3/4 remaining documents are tecnocracia+paternalismo. The corrected profile should not be cited as final until a full pipeline v1 re-run. avg_mes=0.869 is the lowest in the democratic corpus — Macri's rhetoric shows minimal mesianismo, consistent with his technocratic-programmatic register.

**Required next evidence:** Full pipeline v1 re-run to confirm corrected actor-level aggregations. Qualitative reading of the 2018 document to assess the tec_TM=0 gap. Comparison with Alberto Fernández's corrected profile for continuity/rupture analysis.

### H06 — Alberto Fernández's profile, beginning in 2019 after metadata correction, shows …

**Support:** NB08 actor profile (corrected): caution_level=high, n=4, year_min=2019. Modal config: paternalismo+tecnocracia (2021, 2022). 2019 inauguration: indeterminate (tec=pat=14.001 exact tie). 2020: tecnocracia+paternalismo (medium, gap=0.873). 2021: paternalismo+tecnocracia (medium, calibration_likely_correct). share_ambiguous_nb05=1.0 — all 4 documents have NB05 ambiguity flag.

**Actors:** Alberto Fernández | **Confidence:** low — high caution, n=4

**Caveats:** CORRECTED PROFILE (2026-04-29 metadata patch). HIGH caution. share_problematic_audit=0.5 (2019 still_ambiguous + 2022 still_ambiguous, both cleared). The 2023 apertura is in the registry but not in the NB08 corpus. Do not compare Alberto Fernández to Macri using the pre-correction merged profile. High caution and n=4 preclude any strong configuration claims.

**Required next evidence:** Ingestion of 2023 apertura to complete the term corpus. Full pipeline v1 re-run to confirm corrected aggregations. Comparison with Kirchner and CFK to assess Kirchnerismo discourse continuity.


---

## 8. Case Caveats

### 8.1 Perón — Excluded / Deferred

Perón has no scored documents in any HCDN pipeline. The HCDN OCR rescue was abandoned.
Pilot NB06B outputs are provisional and do not constitute a calibrated profile.
**Any comparative claim between Perón and any HCDN actor is not empirically supported.**
Perón remains a deferred case requiring a purpose-built pipeline.

### 8.2 Pre-Democratic Period — Not Comparable

Justo, Ortiz, Castillo, Yrigoyen, Frondizi, Ilía: pattern-set finds near-zero matches in
these eras. These actors cannot be compared to the democratic period corpus.
The pattern set was calibrated for post-1983 discourse.

### 8.3 Short-Corpus Actors

Rodríguez Saá (n=1), Milei (n=2): single data points. No trajectory claim is assessable.

### 8.4 Corrected Profiles (Macri, Alberto Fernández)

The Macri and Alberto Fernández profiles were corrected 2026-04-29. A full pipeline v1 re-run
is required to confirm actor-level aggregations at canonical precision.
Until then, cite these profiles as "corrected provisional v0_2."

---

## 9. What This Does Not Prove

- **Not a causal model.** The three-body framework is a descriptive rhetorical map, not a causal
  explanation of political outcomes.
- **Not ideology.** Discourse configuration ≠ government ideology ≠ policy orientation.
  Menem's paternalismo-dominant rhetoric coexisted with neoliberal policy.
- **Not stable across time.** Actor configurations can shift within a term (see Alfonsín, Kirchner).
  The actor-level averages mask within-actor variation.
- **Not comparable to non-HCDN actors.** Pre-democratic actors, Perón, and actors from other
  corpora cannot be compared using these scores.
- **Not final classifications.** All actor profiles are provisional or provisional-high-caution.
  The v0_1 label on all outputs marks this as a first iteration, not a conclusion.

---

## 10. Next Empirical Fronts

| Priority | Task | Prerequisite |
|----------|------|-------------|
| 1 | Full pipeline v1 re-run (post-correction) | None — authorized now |
| 2 | Design Perón alternative-source pipeline | Separate corpus scope and OCR strategy |
| 3 | Ingest 2023 Milei inaugural + 2026 apertura | Source acquisition |
| 4 | Ingest 2023 Alberto Fernández apertura | Source acquisition |
| 5 | Intra-term disaggregation for CFK and Kirchner | v1 pipeline outputs |
| 6 | Milei profile re-assessment at n≥4 | Corpus expansion |
| 7 | Qualitative reading of Menem 1992 outlier (pat=70.362) | Manual |
| 8 | Qualitative reading of Alfonsín 1989 mesianismo address | Manual |

---

*NB10 interpretive synthesis v0_1 — produced 2026-04-29*
*Source authority: HCDN_PROMOTED_LAYER (canonical) + manual review queue resolutions (2026-04-29)*
*Do not cite actor profiles from this notebook as final historical classifications.*
