# MAPA ORBITAL ARGENTINO v0.4

**Estado:** promovido como recalibración funcional simétrica provisional  
**Corpus:** 52 documentos · 12 unidades actor × mandato · 1.048 señales  
**Regla:** la masa selecciona la pareja; la función ordena la relación; la trayectoria limita el agregado.

## Resultado

La nueva metodología no cambia ninguna pareja agregada. Sí modifica cómo se ordenan o se dejan indeterminadas cinco relaciones. Milei queda como `MES→TEC↺`: PAT aparece positivamente como protección subordinada en 2024–2025 y mixto en 2026, no como cuerpo conductor.

| Unidad | v0.3 | v0.4 | Estado |
|---|---|---|---|
| Alfonsín | `TEC↔PAT` | `PAT↔TEC` | trayectoria inestable |
| Menem I | `PAT→TEC` | `PAT→TEC` | estable |
| Menem II | `PAT↔TEC` | `PAT→TEC` | estable |
| De la Rúa | `PAT↔TEC` | `PAT↔TEC` | trayectoria inestable |
| R. Saá | `PAT↔MES` | `PAT→MES` | baja n |
| Duhalde | `PAT→TEC` | `PAT→TEC` | sensible a fase |
| N. Kirchner | `PAT→TEC` | `PAT→TEC` | trayectoria inestable |
| CFK I | `TEC↔PAT` | `PAT→TEC` | estable |
| CFK II | `PAT→TEC` | `PAT→TEC` | sensible a fase |
| Macri | `PAT→TEC` | `TEC↔PAT` | frontera |
| A. Fernández | `PAT→TEC` | `PAT→TEC` | estable provisional |
| Milei | `MES→TEC↺` | `MES→TEC↺` | calibrador longitudinal |

## Qué cambió

Cambian 5 notaciones agregadas. El diff completo está en `tables/MAPA_ORBITAL_DIFF_v0_3_to_v0_4.csv`.

- **Alfonsín:** `TEC↔PAT` → `PAT↔TEC`. La masa agregada favorece PAT, pero cinco transiciones documentales y dos cierres MES→TEC impiden convertirla en tipo fijo.
- **Menem II:** `PAT↔TEC` → `PAT→TEC`. La segunda presidencia conserva la pareja y la flecha bajo siete de ocho controles LODO.
- **R. Saá:** `PAT↔MES` → `PAT→MES`. PAT organiza la promesa material y MES dramatiza la excepción; n=1 exige cautela máxima.
- **CFK I:** `TEC↔PAT` → `PAT→TEC`. La recodificación funcional ordena la antigua indeterminación: PAT encuadra y TEC opera/prueba.
- **Macri:** `PAT→TEC` → `TEC↔PAT`. TEC domina gobierno activo, PAT organiza la asunción; el bootstrap no autoriza una flecha única.

## Validación

- LODO: ocho funciones retiradas de a una por unidad.
- Bootstrap: 2.000 remuestreos documentales por unidad.
- Trayectorias: se informa la secuencia documental y no sólo el promedio.
- Calibrador externo: 72 señales Milei 2024–2026 codificadas exhaustivamente en NB17.
- Prueba de estrés local: los codificadores pequeños no alcanzaron acuerdo suficiente y no se usaron como verdad de terreno.

## Límite epistemológico

La primera pasada automática alcanza 76,4% de acuerdo en polaridad, 59,7% en función y 63,9% en posición contra el calibrador Milei. Por eso no se presenta como sustituto de una doble codificación humana. El mapa v0.4 promueve adjudicaciones de unidad apoyadas en funciones, sensibilidad y evidencia previa; conserva esa deuda de replicación como caveat explícito.

## Visuales

- `figures/MAPA_ORBITAL_DIRECTION_MATRIX_v0_4.png`
- `figures/MAPA_ORBITAL_DOCUMENT_TRAJECTORIES_v0_4.png`
- `MAPA_ORBITAL_ARGENTINO_v0_4.drawio` · fuente editable; Draw.io no pudo exportarse por CLI en este entorno, pero el XML fue validado.

## Separación de superficies

Esta promoción actualiza investigación, mapa, whitepaper y sitio doctrinario. **No autoriza modificar el videojuego** ni sus coeficientes.
