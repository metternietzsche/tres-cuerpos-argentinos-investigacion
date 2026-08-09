# BRIEF — Mapa orbital argentino v0.1

**Proyecto:** El problema de los tres cuerpos argentinos
**Fecha:** 2026-04-30
**Estado:** síntesis derivada — no clasificación definitiva
**Fuente:** `MAPA_ORBITAL_ARGENTINO_v0_1.md` (preliminar) · `UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md` (canónica)

---

## 1. Tesis breve

Argentina no es un péndulo. Es un problema de tres cuerpos.

El péndulo —la alternancia entre apertura financiera y proteccionismo, entre endeudamiento externo y mercado interno— existe como superficie. Pero leer el sistema político argentino solo desde esa oscilación es leer la apariencia, no la estructura. La estructura profunda se organiza por la interacción entre tres fuerzas retóricas: **tecnocracia**, **mesianismo** y **paternalismo**. En el modelo de tres cuerpos, estas fuerzas no son etiquetas de identidad política sino vectores que el discurso presidencial activa, combina y jerarquiza de maneras que no siempre coinciden con la orientación del gobierno que los produce. Los vectores son dirigidos: `paternalismo+tecnocracia` y `tecnocracia+paternalismo` no son equivalentes.

Este brief resume la evidencia limpia disponible al 2026-04-30. No es una clasificación definitiva de actores. Es el primer ordenamiento de lo que el corpus dice, con las cautelas que el corpus requiere.

---

## 2. Qué evidencia entra

**Corpus democrático HCDN 1983–2025:** 51 documentos de 10 actores presidenciales —mensajes de apertura legislativa y asunciones del período democrático— calibrados con vectores proposicionales (TM×1.00 / TCM×0.50 / AGN×0.00) mediante la pipeline HCDN. Los perfiles reflejan la corrección de metadatos del 2026-04-29: `Mensaje Presidencial 2019.txt` fue reatribuido a Alberto Fernández.

**Perón 1946 y 1954 como contrapunto cualitativo separado:** dos documentos limpios de la PERON_ALT_PIPELINE con status `usable_one_document_hypothesis`. Aparecen en §5 como anotación metodológicamente separada del corpus HCDN, no como punto de datos en la misma escala.

**Perón 1973: excluido.** PERON_SRC_015 contiene el discurso del presidente de la Asamblea Legislativa, no el de Perón. El discurso pronunciado desde el balcón de la Casa Rosada no está en ninguna pipeline activa. No se hace ninguna inferencia sobre 1973.

**Sin puente numérico Perón–HCDN.** Los scores de la PERON_ALT_PIPELINE no son comparables a los scores calibrados del corpus HCDN. No existe una bridge note. La comparación es cualitativa, a través del marco conceptual compartido.

---

## 3. Hallazgo central

El hallazgo más robusto del corpus democrático es la dominancia del díada tecnocracia/paternalismo: el **86% de los 51 documentos** del período 1983–2025 muestra `paternalismo+tecnocracia` o `tecnocracia+paternalismo` como configuración primaria y secundaria. `Paternalismo+tecnocracia` es la configuración modal: 25 documentos (49%), 7 actores. No es el sello de ninguna corriente política. Aparece en Menem (durante la mayor reforma de mercado de la democracia argentina), en Kirchner y CFK, en De la Rúa y Duhalde.

Lo que este hallazgo significa: el discurso presidencial de apertura legislativa combina sistemáticamente —con independencia de la orientación del gobierno— la interpelación al pueblo como sujeto de derechos y el lenguaje de reforma técnica del Estado. Lo que no significa: que todos los gobiernos hayan hecho lo mismo, ni que el registro retórico describa la política implementada. El caso Menem establece empíricamente que el registro discursivo y el programa de gobierno son dimensiones analíticamente separables.

---

## 4. Actores y configuraciones

Los perfiles que siguen son hipótesis provisionales. No son clasificaciones finales.

**Raúl Alfonsín (1983–1989) · TIER_1 · caution: medium**
El corpus alfonsinista es el de mayor inestabilidad del período: cinco cambios de configuración en ocho documentos. La lectura provisional es que el discurso respondió con registros distintos a contextos sucesivos radicalmente diferentes: transición democrática, crisis económica, presiones militares, hiperinflación. El mesianismo aparece en los momentos de mayor presión (1988 Carapintada, 1989 salida anticipada): opera como registro de respuesta a crisis, no como vector estructural.

**Carlos Menem (1990–1999) · TIER_1 · caution: low**
El corpus Menem es el más amplio del período (n=11) y el de mayor robustez. La configuración `paternalismo+tecnocracia` sostiene 9 de 11 documentos. El avg_pat de Menem es el más alto del corpus democrático. La disociación entre ese registro discursivo paternalista y la orientación gubernamental reformista es el caso canónico del proyecto para la separabilidad entre retórica y política de Estado.

**Cristina Fernández de Kirchner (2007–2015) · TIER_1 · caution: low**
CFK presenta el patrón orbital más consistente del corpus: seis de nueve documentos con attractor strength strong. La caution_level es la más baja del período. Hay una discrepancia interna: la configuración modal es `pat+tec` (5/9 documentos), pero el promedio vectorial coloca a tecnocracia como dominante, impulsado por la apertura de 2008.

**Mauricio Macri (2015–2019) · TIER_3 · caution: medium**
El perfil resulta de la corrección del 2026-04-29 (patch v0_2). El corpus corregido (n=5) muestra `tecnocracia+paternalismo` en las aperturas de gobierno activo, con el avg_mes más bajo del corpus democrático. El documento de 2018 tiene flag de baja confianza y se trata como low-weight. El perfil no debe compararse con el pre-corrección y está pendiente de validación por re-run completo de pipeline v1.

**Alberto Fernández (2019–2022) · TIER_3 · caution: high**
Sus cuatro documentos muestran todos el flag NB05 de ambigüedad (share_ambiguous_nb05=1.0). El promedio actor registra near-parity: diferencia del 5.5% entre avg_pat y avg_tec. La asunción de 2019 registra empate exacto. La ambigüedad persistente puede ser el hallazgo principal, no un defecto del corpus. La apertura de 2023 está ausente; el mandato incompleto en la evidencia.

**Javier Milei (2024–2025) · TIER_3 · caution: medium**
`Tecnocracia+mesianismo` en los dos documentos disponibles — el único actor democrático donde el mesianismo es vector secundario sostenido a nivel actor. El avg_mes es más del doble del siguiente actor más alto del corpus. La distinción analítica relevante es de contexto: el documento de 2025 es una apertura ordinaria, no un discurso inaugural ni de crisis. Si el patrón persiste con corpus ampliado (n≥4), representaría mesianismo como atributo de gobierno ordinario, no de crisis. El tipo de actor no puede confirmarse con n=2.

---

## 5. Perón como contrapunto separado

*Sección metodológicamente distinta de §4. Instrumento diferente al corpus HCDN. Los datos no son comparables numéricamente.*

Los dos documentos limpios disponibles muestran la misma jerarquía vectorial en ambos: **mesianismo > paternalismo > tecnocracia**, estable a través de dos géneros y ocho años. El contenido de cada vector, sin embargo, no es estático.

En **1946**, el mesianismo es el de la ruptura fundacional y la redención: el derrumbe de la antigua farsa, las fechas históricas como marcas de discontinuidad ya consumada. El paternalismo anuncia justicia social debida a las masas trabajadoras. La tecnocracia nombra un programa activo de construcción institucional —planificación, industrialización, el Consejo Nacional de Posguerra.

En **1954**, el mesianismo se ha desplazado a la consagración providencial-doctrinal: las tres banderas, la Providencia como legitimadora. El pueblo ya no recibe un programa —es una fuerza social organizada. La tecnocracia, en cambio, debilita en términos relativos: es el único vector cuyo score absoluto decrece a pesar de que el corpus de 1954 tiene el doble de segmentos. El aparato institucional que 1946 construyó mediante programas técnicos explícitos opera en 1954 como hecho de fondo.

Esta hipótesis —jerarquía estable, contenido móvil— requiere el documento de 1973 para ser evaluada. Sin ese tercer documento, Perón permanece como contraste de dos fases, no como perfil de actor. No hay clasificación final de Perón en este documento.

---

## 6. Qué sugiere el mapa

Cinco proposiciones provisionales derivadas de la síntesis canónica.

**P1 — El campo retórico democrático está dominado por el díada tecnocracia/paternalismo.**
El 86% de los documentos HCDN 1983–2025 muestra una de las dos direcciones del díada. Ningún actor con corpus múltiple escapa al díada durante todo su mandato. El resultado es independiente de la orientación política del actor.

**P2 — Las dos orientaciones del díada son propositivamente distintas.**
En `paternalismo+tecnocracia`, el lenguaje de protección social encuadra el discurso y la tecnocracia lo instrumenta. En `tecnocracia+paternalismo`, el lenguaje de modernización técnica domina y el paternalismo acompaña. Menem opera la mayor reforma de mercado de la democracia argentina en `pat+tec`; Macri opera un programa similar en `tec+pat`.

**P3 — El mesianismo democrático se concentra en contextos de ruptura institucional.**
En el corpus HCDN, el mesianismo como vector primario o fuertemente secundario aparece en inauguraciones bajo crisis aguda (Rodríguez Saá 2001, Duhalde 2002), en salidas bajo presión (Alfonsín 1989), y en momentos de crisis de régimen (Alfonsín 1988). La excepción provisoria es Milei en 2025 —apertura ordinaria—, con n=2.

**P4 — La disociación entre discurso y gobierno es documentable, no anómala.**
El caso Menem establece el registro empírico más robusto del corpus para la separación entre registro retórico y orientación gubernamental. El modelo de tres cuerpos no predice coherencia entre retórica presidencial y política de Estado.

**P5 — Los perfiles de actor varían por fase, género y contexto de crisis.**
La inestabilidad de Alfonsín, el flip de De la Rúa en 2001, la transición inaugural/apertura en Duhalde, la ambigüedad persistente de Alberto Fernández, los desplazamientos internos del corpus de Perón 1946–1954: todos muestran que los perfiles no son tipos estables sino trayectorias sensibles al contexto.

---

## 7. Límites

- **No hay mapa integrado completo.** El mapa v1 requiere siete precondiciones aún no satisfechas (fuente Perón 1973, procesamiento, perfil tri-documento, bridge note formal, corpus Milei n≥4, opcionalmente re-run pipeline v1).
- **No hay clasificación final de ningún actor.** Todos los perfiles son hipótesis provisionales. El uso de etiquetas de tipo fijo no está autorizado por la evidencia.
- **Perón 1973 no existe como evidencia.** El discurso existe históricamente pero no está en ninguna pipeline activa. Cualquier inferencia sobre la tercera presidencia es especulación.
- **El discurso no es el gobierno.** Los vectores describen el registro retórico de mensajes formales. No miden la orientación política ni el impacto de los gobiernos.
- **El corpus es parcial.** Gaps documentados: apertura CFK 2009 posiblemente ausente, apertura Alberto Fernández 2023 ausente, inaugural Milei diciembre 2023 posiblemente ausente.
- **La síntesis en inglés no es canónica.** `CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` contiene errores de período y de configuración. No debe citarse como autoridad.

---

## 8. Para qué sirve ahora

- **Memo teórico interno.** Las proposiciones P1–P5 pueden citarse como síntesis de primer orden del corpus democrático, con calificación provisional.
- **Planificación de sitio web.** Las cuatro familias de configuración orbital y los diez actores con niveles de evidencia diferenciados ofrecen una estructura directamente aplicable al diseño de información pública.
- **Presentación académica.** El mapa puede presentarse como síntesis empírica preliminar. Los tiers (TIER_1, TIER_2, TIER_3) comunican los distintos niveles de robustez sin ocultar las limitaciones.
- **Diseño conceptual del juego o simulador.** Las familias de configuración, las trayectorias de actor y los patrones de transición son directamente aplicables al diseño de mecánicas orbitales y fichas de actor.
- **Hoja de ruta hacia el mapa v1.** La acción de mayor impacto es la adquisición de una fuente verificada del discurso de Perón del 12 de octubre de 1973 (desbloquea las precondiciones P1, P2, P3 y P4 en cadena).

---

*Producido en el marco del proyecto El problema de los tres cuerpos argentinos. Fuente de autoridad: `MAPA_ORBITAL_ARGENTINO_v0_1.md` (preliminar) y `UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md` (canónica). Todos los perfiles de actor son provisionales. La comparación numérica entre Perón y actores HCDN no está autorizada hasta que exista la bridge note.*
