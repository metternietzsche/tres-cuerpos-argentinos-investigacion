# Method Pipeline v0.2 — recalibración funcional simétrica

**Fecha:** 2026-08-11  
**Estado:** metodología promovida para el mapa orbital v0.4; clasificación histórica todavía provisional  
**Superficie alcanzada:** investigación, mapa orbital, whitepaper y sitio doctrinario  
**Superficie excluida:** videojuego y coeficientes de Leyendas

## Pregunta metodológica

La versión v0.1 calibraba de manera especial el ruido tecnocrático. Ese avance
mejoró TEC, pero dejó una asimetría: MES y PAT no recibían controles equivalentes
de polaridad, función y posición. La v0.2 aplica el mismo instrumento a los tres
vectores y separa cuatro decisiones que antes podían confundirse:

1. **masa:** qué señales aparecen;
2. **pareja:** qué dos cuerpos explican mejor el documento o mandato;
3. **dirección:** cuál encuadra y cuál opera o prueba;
4. **trayectoria:** si esa relación se conserva entre documentos.

La regla resumida es:

> La masa selecciona la pareja; la función ordena la relación; la trayectoria
> limita el agregado.

## Corpus congelado

- 52 documentos presidenciales HCDN, 1983–2026;
- 10 personas;
- 12 unidades `actor × mandato`;
- 1.048 señales NB04 dentro de ventanas presidenciales validadas;
- hashes SHA-256 y rutas registrados en el manifiesto de congelación.

Menem y Cristina Fernández de Kirchner se separan por mandato. Alfonsín se
conserva como una sola unidad constitucional y su inestabilidad interna se
publica como trayectoria. Rodríguez Saá usa sólo los segmentos presidenciales
1084–1112 de la sesión: 58 coincidencias de intervenciones legislativas ajenas
quedan excluidas.

## Unidad de codificación

La unidad es cada match NB04 leído dentro de su segmento presidencial validado.
La señal conserva el vector léxico de origen —TEC, MES o PAT—, pero recibe tres
dictámenes independientes:

```text
polaridad × función × posición
```

### Polaridad

- `afirmada`: la voz adopta la señal como diagnóstico, valor, instrumento o logro;
- `subordinada`: la señal es positiva, pero sirve a otro encuadre;
- `atribuida`: pertenece a un adversario, antecesor o voz citada;
- `negada_rechazada`: se presenta como falsa, fracasada o indeseable;
- `descriptiva`: informa un objeto sin adhesión o rechazo suficientes.

La polaridad recae sobre la función argumental, no sobre si el sustantivo nombra
algo deseable. Un déficit condenado puede ser TEC afirmado cuando opera como
diagnóstico fiscal propio. Una ayuda criticada por su captura no vuelve
automáticamente rechazado al beneficiario paternalista.

### Función principal

Cada señal recibe una función principal entre ocho posibilidades:

| Función | Pregunta operativa |
|---|---|
| tiempo | ¿abre, clausura o periodiza una época? |
| problema | ¿define qué está verdaderamente roto? |
| autoridad | ¿autoriza a decidir, conducir u obedecer? |
| sujeto/enemigo | ¿construye el nosotros, beneficiario o adversario? |
| telos | ¿fija el futuro por el cual vale actuar? |
| sacrificio | ¿legitima o distribuye el costo? |
| medios | ¿aporta instrumentos, reglas, redes o tutela? |
| prueba | ¿presenta resultados que validan el rumbo? |

### Posición

- `encuadre`: organiza la lectura de otras decisiones;
- `operacion`: ejecuta o vuelve practicable el encuadre;
- `prueba`: ofrece resultados como evidencia;
- `payload_beneficiario`: registra a quién o qué se protege o transforma;
- `exterior`: pertenece al orden atribuido, negado o rechazado.

`payload_beneficiario` reconoce presencia política sin conferir liderazgo.

## Cegamiento y decisión

El codificador recibe el segmento y la señal, no actor, año, mapa previo, scores
agregados ni dictamen de otro coder. El texto puede revelar identidad; el
cegamiento exigible es respecto del resultado analítico.

La decisión se toma en este orden:

1. identificar quién sostiene la señal;
2. adjudicar polaridad sobre su función;
3. separar mecanismo, mediador y beneficiario;
4. seleccionar la función que se perdería al retirar la señal;
5. seleccionar la posición efectiva;
6. marcar confianza baja cuando subsisten dos lecturas plausibles.

El codebook completo está en
`CODEBOOK_FUNCIONAL_SIMETRICO_v0_3.md`; el contrato de salida, en
`CODING_SCHEMA_FUNCIONAL_SIMETRICO_v0_3.json`.

## Agregación

Las señales se agregan por documento sin colapsar:

- presencia positiva directa;
- presencia positiva subordinada;
- exterior adversarial;
- liderazgo de encuadre;
- realización operativa;
- payload/beneficiario;
- prueba.

La masa corregida por polaridad propone la pareja. La dirección compara el papel
de los dos cuerpos sobre las ocho funciones. Si el margen es insuficiente o la
trayectoria contradice el promedio, la relación se publica con `↔`.

La notación tiene este significado:

- `A→B`: A encuadra; B instrumenta o prueba;
- `A↔B`: la evidencia no autoriza una jerarquía única;
- `A→B↺`: la prueba producida por B retrovalida el encuadre de A.

No expresa causalidad histórica demostrada ni un tipo personal.

## Sensibilidad

Cada unidad pasa dos controles:

1. **LODO funcional:** se retira una de las ocho funciones por vez;
2. **bootstrap documental:** 2.000 remuestreos de sus documentos con reemplazo.

También se publica la secuencia documental. La adjudicación puede conservar una
pareja y, al mismo tiempo, declarar dirección inestable, sensibilidad de fase o
frontera.

## Calibración y límite de automatización

Milei 2024–2026 funciona como calibrador longitudinal: 72 señales fueron
codificadas exhaustivamente. La primera pasada determinista aplicada al corpus
completo alcanzó contra ese calibrador:

- polaridad: 76,4%;
- función: 59,7%;
- posición: 63,9%.

Dos modelos locales pequeños se probaron de manera ciega como stress test. Su
acuerdo tampoco alcanzó el umbral necesario. En una muestra estratificada de 18
señales, ambos obtuvieron 77,8% de acuerdo con el calibrador en polaridad, pero
la función principal cayó a 61,1% y 38,9%, y la posición a 38,9% y 22,2%. El
acuerdo A–B fue 88,9% en polaridad, 44,4% en función y 27,8% en posición. Por
tanto:

- no son verdad de terreno;
- no reemplazan una doble codificación humana;
- no se usan para corregir selectivamente un actor;
- sí dejan una ruta reproducible para localizar desacuerdos y priorizar revisión.

El mapa v0.4 es una promoción provisional de adjudicaciones funcionales y de su
sensibilidad, no una validación humana final de las 1.048 señales.

## Resultado de la aplicación completa

La metodología fue aplicada a las 12 unidades. No cambió ninguna pareja agregada
respecto de v0.3 y cambió cinco notaciones. Los resultados, diferencias y estados
de estabilidad están en `../mapa_orbital_v0_4/`.

## Reproducibilidad

El linaje computacional es:

| Etapa | Artefacto |
|---|---|
| congelación de corpus | `HCDN_NB17_corpus_freeze_v0_3.py` |
| codebook y esquema | `HCDN_NB17_CODEBOOK_FUNCIONAL_SIMETRICO_v0_3.md` |
| prueba ciega local | `HCDN_NB18_blind_signal_coder_v0_1.py` |
| acuerdo de calibración | `HCDN_NB18_calibration_agreement_v0_1.py` |
| primera pasada simétrica | `HCDN_NB18_symmetric_rule_engine_v0_1.py` |
| mapa candidato | `HCDN_NB19_symmetric_candidate_map_v0_1.py` |
| sensibilidad | `HCDN_NB20_symmetric_sensitivity_v0_1.py` |
| promoción v0.4 | `HCDN_NB21_promote_orbital_map_v0_4.py` |

Los scripts viven en `argentina_tres_cuerpos_corpus/notebooks/`; el corpus bruto y
los documentos con restricciones no forman parte del export público.

## Criterios para v1

Antes de tratar el mapa como clasificación histórica replicada se requiere:

1. doble codificación humana independiente o muestra estratificada suficiente;
2. adjudicación documentada de desacuerdos;
3. integración cuantitativa de la asunción Milei 2023;
4. cierre de brechas de corpus, en especial Alberto Fernández 2023;
5. puente metodológico separado para Perón;
6. nueva ejecución completa ante cualquier cambio de codebook.

No se permite reparar sólo una figura. Tampoco se trasladan estos coeficientes al
videojuego hasta completar una decisión de diseño y balance independiente.
