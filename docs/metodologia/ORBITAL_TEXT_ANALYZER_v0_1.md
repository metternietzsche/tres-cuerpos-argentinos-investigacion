# Laboratorio orbital de textos · contrato v0.1.1

## Propósito

El laboratorio permite pegar un texto político o abrir un archivo `.txt`/`.md`
y recibir una **primera lectura automática** de señales de Tecnocracia,
Mesianismo y Paternalismo. El resultado describe el documento ingresado. No
clasifica la esencia de una persona, no predice conducta y no mide calidad,
ideología, intención ni desempeño de gobierno.

Todo el procesamiento ocurre en el navegador. El sitio no envía ni almacena el
texto y no ofrece descargar el diagnóstico personal. El resultado permanece en
la vista y puede imprimirse.

## Cadena de análisis

1. El segmentador deriva del registro proposicional de NB04.
2. Sesenta patrones —20 por vector— localizan candidatos en los segmentos. La
   calibración v0.1.1 amplía cinco expresiones MES sin crear patrones ni pesos
   asimétricos.
3. La regla simétrica de NB18 asigna polaridad, función y posición contextual.
4. La agregación de NB19 pondera masa positiva y liderazgo funcional.
5. La masa positiva selecciona la pareja; una diferencia funcional mínima de
   `0.055` autoriza una flecha automática. Si no, la relación queda `↔`.
6. La ubicación ternaria normaliza la masa positiva de los tres cuerpos.

Pesos de polaridad: afirmada `1`, subordinada `0.55`, descriptiva `0.2`,
atribuida o rechazada `0`. Pesos de posición: encuadre `1`, operación/prueba
`0.67`, payload beneficiario `0.35`, exterior `0`. Los pesos funcionales se
publican en `data_public/text_analysis_registry.v0.1.json`.

## Comparación con el mapa

Los 52 discursos HCDN fueron reprocesados con este mismo motor v0.1.1 para
construir una nube diagnóstica de referencia. La cercanía de un texto nuevo se
calcula sobre esos pesos automáticos: **no hereda la adjudicación humana final
del mapa orbital v0.4**. La referencia no contiene el texto fuente.

Las aperturas legislativas y los discursos de asunción entran en el dominio de
comparación HCDN, siempre de manera provisional. Actos de campaña, debates,
entrevistas y documentos programáticos quedan fuera de dominio: su ubicación es
exploratoria porque el género cambia quién habla, para qué y bajo qué
restricciones.

## Umbrales y límites

- mínimo: 120 palabras;
- máximo: 120.000 caracteres;
- archivo máximo: 1 MB;
- formatos locales aceptados: `.txt` y `.md`;
- hacen falta al menos tres señales positivas distribuidas en dos cuerpos.

Citas, ironía, negación, atribución y cambios de voz son fuentes conocidas de
error. La primera pasada automática usada para desarrollar el mapa alcanzó
76,4% de acuerdo en polaridad, 59,7% en función y 63,9% en posición frente a la
adjudicación. Por eso el resultado del laboratorio nunca sustituye una lectura
humana documentada.

## Regresión Kicillof 2026

La apertura del 154.º período de sesiones de la Legislatura bonaerense expuso
un falso negativo: v0.1 devolvía `0%` MES pese a que el texto construía un
antagonista democrático, rechazaba la resignación y proponía un futuro
colectivo. La calibración v0.1.1 amplía `MES-06`, `MES-07`, `MES-13`, `MES-19`
y `MES-20`. La regla contextual también deja de confundir la condena de un
antagonista o el rechazo de la resignación con la negación del propio vector.
El caso completo queda como control externo: debe conservar al
menos seis señales MES positivas y un peso MES entre `0.15` y `0.40`.
Sobre la transcripción oficial completa, v0.1.1 devuelve diez señales MES
positivas y pesos diagnósticos `TEC 45,6% · MES 27,9% · PAT 26,5%`. Esa salida
funciona como regresión reproducible, no como adjudicación histórica definitiva.

Esta corrección no convierte cualquier mención a «futuro» o «democracia» en
Mesianismo: exige composiciones más específicas como un bien colectivo atacado,
la negativa a aceptar un orden como inevitable o la autorización popular de un
camino futuro.

## Trazabilidad técnica

El registro público conserva hashes SHA-256 de las tres fuentes canónicas, del
motor JavaScript y de la calibración pública:

- señales NB04: `bef8341addd17278f327a66ea352935e31fda814b828304fe9a3b17c685c203e`;
- reglas NB18: `3cbdde228b027967fbc76eba0b3a728db7d3285b2521d70de1c938e7f9c6e891`;
- agregación NB19: `f72f1aba515d7f8faf516a11807fce8e8f3ad8f3abd40953922ce368351fd910`;
- calibración v0.1.1: `bdf2e779f1109522e3589ef3d830ffbbf43de553889e05ee65fabcde301834e3`;
- motor v0.1.1: `a1232be6508aefed47817040b3a91148342edfad973639e9ea40fc55199d0ac9`.

El generador reproducible es `scripts/build-text-analysis-data.mjs`. El repositorio
público conserva sus derivados congelados para que GitHub Pages no dependa del
corpus fuente, que mantiene su régimen de publicación separado.
