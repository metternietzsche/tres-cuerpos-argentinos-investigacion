# HCDN_NB17 — codebook funcional simétrico v0.3

**Estado:** congelado para HCDN_NB18 · aclaración de calibración r1  
**Unidad:** match NB04 dentro de segmento presidencial validado  
**Vectores:** TEC, MES y PAT reciben el mismo instrumento

## Regla central

Una señal conserva su vector léxico original, pero su presencia no decide su
función. Cada match recibe tres dictámenes independientes:

```text
polaridad × función × posición
```

## Polaridad

| Código | Criterio |
|---|---|
| `afirmada` | La voz adopta la señal como diagnóstico, valor, instrumento o logro propio. |
| `subordinada` | La señal es positiva, pero sirve a un encuadre gobernado por otro cuerpo. |
| `atribuida` | La señal pertenece a un adversario, antecesor o voz citada. |
| `negada_rechazada` | La voz presenta la señal como falsa, fracasada, injusta o indeseable. |
| `descriptiva` | La señal informa un objeto sin adhesión o rechazo suficientes. |

Una señal atribuida o rechazada alimenta `exterior_adversarial`; no cuenta como
presencia positiva ni liderazgo.

La polaridad recae sobre la **función argumental** de la señal, no sobre si el
sustantivo nombra algo deseable. Un déficit condenado puede ser TEC `afirmada`
si la voz lo adopta como diagnóstico fiscal propio. Una administración en crisis
puede ser TEC `afirmada` si su auditoría funciona como instrumento propio.
Asimismo, debe separarse aparato de beneficiario: rechazar la captura de una
ayuda no equivale por sí solo a rechazar a la población protegida.

## Función principal

| Código | Pregunta |
|---|---|
| `tiempo` | ¿Periodiza, abre o clausura una época? |
| `problema` | ¿Define qué está verdaderamente roto? |
| `autoridad` | ¿Autoriza a decidir, conducir u obedecer? |
| `sujeto_enemigo` | ¿Construye el nosotros, el beneficiario o el adversario? |
| `telos` | ¿Fija el futuro por el cual vale actuar? |
| `sacrificio` | ¿Legitima o distribuye el costo? |
| `medios` | ¿Aporta instrumentos, reglas, redes o tutela? |
| `prueba` | ¿Presenta un resultado como validación del rumbo? |

Sólo una función es principal. Puede registrarse una secundaria sin duplicar el
peso.

## Posición

| Código | Criterio |
|---|---|
| `encuadre` | Organiza la lectura de otras decisiones. |
| `operacion` | Ejecuta o vuelve practicable el encuadre. |
| `prueba` | Ofrece resultados como evidencia. |
| `payload_beneficiario` | Designa a quién o qué protege, transforma o administra otro cuerpo. |
| `exterior` | Pertenece al orden atribuido, negado o rechazado. |

`payload_beneficiario` registra presencia política real sin conferir liderazgo.

## Decisión paso a paso

1. Leer el segmento completo, no sólo el match.
2. Identificar quién sostiene la señal. Si es adversario o antecesor, codificar
   `atribuida`; si la voz la condena, `negada_rechazada`.
3. Preguntar si la voz adopta la **función** de la señal como diagnóstico,
   instrumento, valor, telos o prueba. No inferir polaridad por el tono positivo
   o negativo del objeto nombrado.
4. Si la señal es propia, preguntar si organiza el argumento o si sirve a una
   misión ajena. Codificar `afirmada` o `subordinada`.
5. Separar mediador, mecanismo y beneficiario antes de dictaminar PAT.
6. Seleccionar la función que se perdería si se retirara esa señal.
7. Seleccionar la posición efectiva, no la esperable por su vector.
8. Marcar confianza baja cuando dos lecturas sigan siendo plausibles.

## Simetría

- “Administración pública” como botín heredado no es TEC afirmada.
- “Justicia social” como robo no es PAT afirmado.
- “Nueva era” citada para ridiculizar a otro no es MES afirmado.
- Una transferencia social afirmada puede ser PAT positiva y, al mismo tiempo,
  payload subordinado a un encuadre TEC o MES.
- Un resultado fiscal puede ser TEC prueba y retrovalidar después una misión MES;
  ese feedback se decide a nivel documental, no en una palabra.

## Salida por documento

Los matches se agregan sin colapsar:

```text
presencia positiva directa
presencia positiva subordinada
exterior adversarial
liderazgo de encuadre
realización operativa
payload/beneficiario
prueba
```

La pareja, la dirección y el feedback se adjudican después, sobre las ocho
funciones y con sensibilidad. Ninguna suma bruta puede decidirlas por sí sola.

## Cegamiento

El codificador no recibe actor, año, mapa anterior, scores agregados ni dictamen de
otro coder. El texto puede revelar identidad; el cegamiento exigible es respecto
del resultado analítico.

## Versionado

Cualquier cambio de categorías o reglas crea una versión nueva y obliga a
reejecutar todas las señales afectadas. No se permite reparar sólo un actor.
