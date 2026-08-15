# Traducción de Leyendas v0.2

Estado: **provisional y aplicada al roster completo**.

Esta capa traduce el Mapa orbital v0.4 al videojuego sin modificar el snapshot
generado `src/generated/worldData.json`. El mapa estima configuraciones
funcionales en discursos; el juego necesita una estrella discreta para una
ventana jugable. No son la misma magnitud.

## Regla T1

1. Se fija primero el alcance histórico de cada encarnación.
2. Se identifica la pareja funcional respaldada por el corpus.
3. Si el tercer cuerpo empata o supera al miembro menor de esa pareja, se
   transfiere un punto del tercero a ese miembro.
4. Si el tercer cuerpo ya es estrictamente menor, la estrella se conserva.
5. La suma total permanece estable y ningún cuerpo cambia más de un punto.
6. Dirección, estabilidad y feedback se publican como metadatos y relato: no
   agregan Poder, no alteran el D6 y no modifican las firmas.

T1 es una regla de traducción lúdica inferida del slice de Alfonsín, no una
medición adicional del corpus.

## Resultado

- Recalibradas: Alfonsín 1983 `5/6/6 → 6/5/6`, Alfonsín 1986 `6/5/5 →
  6/4/6`, Néstor Kirchner `6/6/7 → 7/5/7` y Alberto Fernández `5/5/6 →
  6/4/6`.
- Compatibles sin cambio numérico: Menem 1995, De la Rúa, Duhalde, CFK I,
  CFK II, Macri y Milei.
- Conservadas sin cambio numérico: Perón 1946, cuya pareja MES–PAT ya está
  medida en una pipeline histórica separada pero cuyo puntaje jugable sigue en
  hold editorial; Perón 1951 y Perón 1973, por evidencia bloqueada; y Menem
  1989, por diferencia de alcance entre campaña y mandato.

Los holds no reciben evidencia prestada. La medición separada de Perón 1946
ordena `MES > PAT > TEC`, pero no comparte escala con HCDN y por eso no explica
literalmente la estrella heredada `7/5/8`. En particular, 1954 no sustituye a
1951 y una pieza mal atribuida no se convierte en evidencia de Perón 1973.
Menem 1989 conserva la campaña como alcance propio; el mandato posterior sirve
de contexto, no de reemplazo.

## Comparación y rollback

El build acepta `VITE_LEGEND_GAMEPLAY_TRANSLATION=alfonsin-only` para reconstruir
la mecánica publicada en v0.50: aplica T1 sólo a Alfonsín 1983 y conserva las
otras catorce estrellas heredadas. El valor `legacy` desactiva toda traducción
numérica. Son controles de comparación y rollback; el build público usa `full`.

La redistribución experimental de plenos tiene su propio control independiente:
`VITE_LEGEND_FULL_BALANCE=legacy`. Ninguna de estas variables altera el snapshot
generado ni convierte dirección o estabilidad en una bonificación.

## Frontera epistemológica

El Mapa orbital v0.4 sigue siendo provisional hasta doble codificación humana.
Las estrellas permiten una beta reproducible y explicable; no describen
esencias personales, no predicen conducta y no son coeficientes de poder
histórico. El artefacto auditable es
`src/data/legendGameplayTranslation.v0.2.json` y declara la fuente y el estado
de cada una de las quince Leyendas.
