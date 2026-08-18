# El problema de los tres cuerpos argentinos
## Una lectura orbital del presidencialismo argentino

**Autora:** Alexandra Bustos Frati, PhD  
**Proyecto:** El problema de los tres cuerpos argentinos  
**Versión:** v0.4 — recalibración funcional simétrica  
**Fecha de publicación:** 2026-08-11  
**Estado:** hipótesis revisables — no apto todavía para cita académica como clasificación histórica  
**Origen documental:** mensajes presidenciales publicados en los Diarios de Sesiones de la HCDN, 1983–2026; contrapunto separado de Perón 1946 y 1954, reconstruido desde la pipeline documental alternativa del proyecto  
**Corpus:** HCDN v0.1 + extensión documentada 2026 · 52 documentos · 10 personas · 12 unidades `actor × mandato`  
**Linaje metodológico:** NB10 (parejas y línea de base) → NB12–NB16 (dirección y prueba temporal) → NB17 (calibrador Milei) → NB18 (polaridad, función y posición simétricas) → NB19–NB21 (sensibilidad, adjudicación y mapa v0.4)  
**Fuentes de base:** MAPA_ORBITAL_ARGENTINO_v0_1.md · UNIFIED_CLEAN_CORPUS_INTERPRETIVE_SYNTHESIS_v0_1.md · MEMO_INTERPRETIVE_FINDINGS_1983_2025_v0_1.md · NB10_interpretive_synthesis_democracy_1983_2025_v0_1.md · PERON_INTERIM_MEMO_1946_1954_v0_1.md  
**Cita:** Bustos Frati, Alexandra (2026). *El problema de los tres cuerpos argentinos: una lectura orbital del presidencialismo argentino*. Whitepaper v0.4.
**Licencia del texto y las figuras:** CC BY-NC 4.0.

> **Condición de lectura:** La versión v0.4 aplica a los tres vectores una misma pregunta: si la señal es afirmada, subordinada, atribuida, rechazada o descriptiva; qué función cumple; y qué posición ocupa. La masa selecciona la pareja, la función ordena la relación y la trayectoria limita el promedio. El videojuego no forma parte de esta recalibración.

---

### Antes de leer: qué cambia en NB17–NB21

**NB17 convierte a Milei 2024–2026 en calibrador longitudinal.** Sus 72 señales se codifican de manera exhaustiva por polaridad, función y posición. El resultado distingue entre presencia positiva y liderazgo: PAT protege beneficiarios y limita sacrificios, pero no define tiempo, autoridad ni telos; MES encuadra y TEC realiza. La secuencia es `MES→TEC` en 2024 y `MES→TEC↺` en 2025–2026.

**NB18 generaliza el instrumento a todo el corpus.** La congelación contiene 52 documentos, 12 unidades y 1.048 señales. La sesión de Rodríguez Saá se recorta a sus 29 segmentos presidenciales: 58 matches legislativos ajenos quedan excluidos. Cada señal conserva su vector léxico, pero recibe tres dictámenes separados: polaridad, función y posición. El mismo árbol de decisión se aplica a TEC, MES y PAT.

La calibración con dos modelos locales pequeños no alcanzó el estándar requerido. En una muestra ciega de 18 señales, ambos lograron 77,8% contra el calibrador en polaridad, pero sólo 61,1%/38,9% en función principal y 38,9%/22,2% en posición. La primera pasada determinista sobre las 72 señales obtuvo 76,4% en polaridad, 59,7% en función y 63,9% en posición. Por esa razón los modelos y el motor automático funcionan como prueba de estrés y trazabilidad, no como verdad de terreno ni como sustituto de una doble codificación humana.

**NB19 y NB20 separan pareja, flecha y trayectoria.** La masa léxica corregida por polaridad selecciona la pareja. Ocho funciones —tiempo, problema, autoridad, sujeto/enemigo, telos, sacrificio, medios y prueba— ordenan la relación. La sensibilidad retira una dimensión por vez y ejecuta 2.000 remuestreos documentales por unidad. Las transiciones entre documentos se informan aparte para que un promedio no borre fases.

**NB21 adjudica y publica el mapa orbital v0.4.** Ninguna de las doce parejas agregadas cambia. Sí cambian cinco notaciones: Menem II pasa a `PAT→TEC`; Rodríguez Saá a `PAT→MES` con n=1; CFK I a `PAT→TEC`; Macri a `TEC↔PAT`; y Milei conserva `MES→TEC↺`. Alfonsín queda `PAT↔TEC` y se marca como trayectoria inestable, aun cuando el promedio automático favorece PAT.

La notación se lee así: `A→B` indica que A encuadra y B instrumenta; `A↔B` indica que la evidencia no autoriza una jerarquía; `A→B↺` añade retroalimentación de la prueba. Ninguna notación es un tipo personal.

---

### Resumen

En mecánica clásica, el problema de los tres cuerpos describe la dificultad de predecir con precisión las trayectorias de tres masas que se atraen mutuamente bajo gravedad. A diferencia del sistema de dos cuerpos —cuya trayectoria tiene solución analítica, el péndulo cuyo arco puede calcularse con exactitud— el sistema de tres cuerpos en interacción no tiene solución general en forma cerrada: sus trayectorias son sensibles a las condiciones iniciales, no se reducen a un ritmo oscilante simple, y la dinámica del conjunto no puede deducirse solo del movimiento de sus partes. Esta analogía no describe una ley física de la política argentina. Es una heurística de lectura. Pero es útil: sugiere que hay sistemas cuya dinámica no se captura con un eje bipolar, y que forzarlos en ese esquema no simplifica el análisis —lo empobrece.

La política argentina tampoco tiene "solución analítica" en el sentido de que ninguna variable simple —apertura o cierre, peronismo o anti-peronismo, Estado o mercado— permite predecir o explicar la forma que toma el discurso presidencial en cada mandato. Lo que propone este proyecto es que el campo retórico del presidencialismo argentino está organizado por la interacción entre tres vectores: **modernización tecnocrática**, **mesianismo redentor** y **paternalismo conservador**. Ninguno de los tres puede eliminarse del análisis sin perder precisión. Los tres interactúan, compiten y se configuran en jerarquías variables que cambian con el contexto, el género discursivo y el momento de crisis o estabilidad. El sistema no oscila entre dos polos: se organiza entre tres. De ahí la metáfora.

El análisis empírico se apoya en el corpus de discursos presidenciales ante la Honorable Cámara de Diputados de la Nación Argentina (HCDN) del período democrático 1983–2026: 52 documentos de apertura legislativa y asunción presidencial, 10 personas y **12 unidades actor × mandato**, procesados mediante vectores proposicionales calibrados y reexaminados con una auditoría estructural abductiva. Menem y Cristina Fernández de Kirchner aportan dos mandatos cada uno; Alfonsín aporta un único mandato cuya inestabilidad documental se conserva como trayectoria. Los períodos de Perón (1946 y 1954) se presentan como contrapunto cualitativo metodológicamente separado. El discurso de Perón del 12 de octubre de 1973 permanece excluido.

Los hallazgos centrales son cinco. Primero: la metodología simétrica no cambia ninguna de las doce parejas agregadas; diez siguen siendo TEC–PAT, Rodríguez Saá PAT–MES y Milei MES–TEC. Segundo: masa, función y trayectoria responden preguntas distintas. La masa selecciona cuerpos presentes; la función distingue encuadre, operación, prueba y beneficiario; la trayectoria muestra cuándo el promedio oculta una fase. Tercero: Menem I y II quedan `PAT→TEC`; CFK I y II también, aunque CFK II conserva sensibilidad de fase. Cuarto: Macri queda `TEC↔PAT`: TEC domina los documentos de gobierno activo, PAT la asunción, y el bootstrap no autoriza una flecha única. Quinto: Milei queda `MES→TEC↺`; PAT conserva presencia positiva subordinada, pero no autoridad de encuadre. La inestabilidad de Alfonsín y la disociación discurso/gobierno de Menem siguen siendo hallazgos centrales.

Los caveats son parte integrante del argumento, no notas al pie. No existen clasificaciones tipológicas finales. El discurso presidencial formal no es el gobierno completo. La recalibración simétrica mejora la consistencia del instrumento, pero su primera pasada automática no alcanza acuerdo suficiente para reemplazar codificación humana. No existe puente numérico entre la pipeline de Perón y el corpus HCDN. El mapa orbital v0.4 publica adjudicaciones funcionales y su sensibilidad; no es todavía el mapa integrado v1.

---

### 1. Introducción: por qué no alcanza el péndulo

La imagen más persistente de la política argentina es la del péndulo. En una de sus versiones estándar, el sistema oscila entre dos polos macroeconómicos: apertura financiera, endeudamiento externo y orientación exportadora en un extremo; proteccionismo, mercado interno y estatismo distributivo en el otro. En otra versión, el péndulo es político-cultural: populismo versus reformismo, peronismo versus anti-peronismo, Estado versus mercado. En cualquiera de sus formas, la metáfora tiene potencia descriptiva: las sucesivas interrupciones y reconversiones del siglo argentino tienen, en superficie, ese ritmo oscilante.

Pero la metáfora del péndulo captura el movimiento, no el mecanismo. Describe la alternancia sin explicar por qué la alternancia adopta las formas específicas que adopta; por qué el lenguaje de la protección social reaparece en gobiernos que desmantalan el Estado; por qué el lenguaje de la ruptura histórica se activa en mandatos que comienzan con la promesa de normalización; por qué el lenguaje técnico-racionalizador se superpone, casi siempre, al lenguaje de la justicia social, incluso cuando ambos apuntan a programas contradictorios.

El problema del péndulo no es que sea falso. Es que es insuficiente.

Este proyecto propone una gramática alternativa. En lugar de un eje bipolar, propone un campo de tres fuerzas en tensión. En lugar de tipos de actor, propone configuraciones dirigidas. En lugar de orientaciones ideológicas fijas, propone trayectorias que responden al contexto, al género discursivo, y al momento de crisis o estabilidad. La metáfora de los "tres cuerpos" —tomada de la física como heurística, no como ley— expresa que el sistema no tiene una solución analítica simple: su dinámica depende de la masa relativa de cada fuerza, de sus interacciones, y de las condiciones iniciales de cada mandato.

El modelo no pretende agotar el análisis del presidencialismo argentino. Pretende añadir una dimensión que las lecturas pendulares tienden a omitir: la del registro retórico formal del discurso presidencial como objeto de análisis sistemático, con su propia lógica, parcialmente autónoma respecto del programa de gobierno.

---

### 2. Los tres cuerpos

El modelo nombra tres vectores de legitimación epistémica: modernización tecnocrática, mesianismo redentor y paternalismo conservador. No son tipos de actor ni identidades políticas. Son **fuerzas que el discurso presidencial activa en combinaciones y con jerarquías variables**. Un mismo actor puede mostrar configuraciones distintas en distintos momentos de su mandato. La dirección de la combinación importa.

#### 2.1 Modernización tecnocrática

La tecnocracia como vector proposicional afirma que la historia avanza a través de la racionalización, la expertise, la planificación, la capacidad técnica del Estado, la productividad, y el ordenamiento sistémico. El discurso que activa este vector presenta las decisiones de gobierno como respuestas técnicas a problemas objetivos, la reforma institucional como necesidad derivada del diagnóstico, y la modernización del aparato estatal como horizonte de gobierno.

Este vector no equivale simplemente a "tener equipos técnicos". Cuenta como tecnocracia cuando la técnica organiza el sentido histórico del discurso: cuando la reforma técnica es el argumento de legitimación, no el instrumento de otro argumento. Tampoco equivale a neoliberalismo ni a ninguna orientación económica específica: aparece en gobiernos de distinto signo cuando el lenguaje de la transformación técnico-institucional encuadra el discurso presidencial.

La calibración del corpus HCDN distingue entre lenguaje tecnocrático proposicionalmente estructurante (peso 1.0), lenguaje técnico-burocrático de catálogo (peso 0.5), y lenguaje administrativo genérico (peso 0). La tecnocracia que permanece tras la calibración es, por tanto, más significativa: no es tecnocracia de procedimiento sino tecnocracia de programa.

#### 2.2 Mesianismo redentor

El mesianismo como vector proposicional afirma que la historia avanza a través de la misión, la ruptura, la salvación, el sacrificio, la reparación moral, la purificación, la refundación, o el cierre de una etapa de decadencia. El discurso que activa este vector presenta al pueblo como sujeto de una redención debida o consumada, al liderazgo como vehículo de algo más grande que sí mismo, y al momento presente como discontinuidad histórica.

Este vector no es necesariamente religioso. Puede ser secular, revolucionario, moral, nacional, anti-decadente o civilizatorio. No equivale a autoritarismo ni a populismo en sentido técnico. En buena parte del corpus democrático, el mesianismo primario aparece en rupturas institucionales agudas: hiperinflación, colapso del Estado, asunciones de emergencia. Milei obliga a ampliar esa hipótesis. En 2026, el vector reaparece en una apertura ordinaria mediante un cambio de era, una batalla moral, un lugar de la Argentina en la historia y una promesa de grandeza que ordena políticas concretas.

La identificación del mesianismo no puede quedar limitada a las categorías léxicas usadas como proxies en la primera pipeline. Los proxies son huellas de reconocimiento, no la definición del vector. NB12–NB15 amplían la prueba hacia su función estructural: régimen temporal, construcción del problema y del enemigo, fuente de autoridad, sujeto convocado, telos, sacrificio y no-retorno. Ninguna palabra aislada —religión, futuro, crisis, pueblo— basta. La hipótesis mesiánica gana fuerza cuando esas funciones forman una arquitectura recurrente y cuando retirar MES altera el sentido histórico del programa aun si permanecen sus medidas técnicas.

#### 2.3 Paternalismo conservador

El paternalismo como vector proposicional afirma que la historia se preserva o recompone a través de la protección, el cuidado, el orden, la autoridad, la conducción, y la contención de la fragilidad social. El discurso que activa este vector interpela al pueblo como sujeto de derechos que el Estado garantiza, presenta la justicia social como mandato del gobierno, y coloca al Estado en posición tutelar activa ante las amenazas del mercado o del exterior.

Este vector no implica necesariamente política de derechas. Puede ser popular, social, protectivo, institucional o tutelar. No describe el programa de gobierno —describe el registro retórico. El caso más robusto del corpus es Menem: paternalismo dominante durante la mayor reforma de mercado de la democracia argentina. El vector describe cómo se legitima el discurso, no qué políticas implementa el gobierno.

---

### 3. Configuraciones, no tipos

El modelo no produce clasificaciones fijas de actores. Produce **configuraciones dos-cuerpos dirigidas** que describen el registro retórico de documentos específicos. La unidad de análisis no es la persona como tipo estable; es la unidad de caso —**actor × mandato** en este corpus— con documentos, configuraciones, transiciones y caveats propios. Menem I y II son unidades distintas; CFK I y II también. Alfonsín es una única unidad de mandato cuya inestabilidad se conserva en la capa documental.

La dirección de la configuración importa, pero esta revisión distingue preguntas que v0.1 trataba como una sola. La **masa proposicional** pregunta cuánto vocabulario calibrado acumula cada vector. La **pareja funcional** pregunta qué dos fuerzas son necesarias para explicar la arquitectura. La **dirección estructural** pregunta cuál organiza tiempo, problema, autoridad, sujeto, telos y sacrificio, y cuál especifica medios y prueba. "Paternalismo + tecnocracia" y "tecnocracia + paternalismo" comparten pareja pero no jerarquía. Si la evidencia estructural no supera el margen de decisión, la notación correcta es `PAT↔TEC`, no una flecha forzada.

En la mayoría del corpus, la pantalla léxica y la adjudicación funcional coinciden en la pareja. Cuando chocan, como ocurre en la apertura de Milei de 2026, el desacuerdo se publica. No se reemplaza un conteo por una impresión: se comparan hipótesis rivales, se retira una dimensión por vez y se informa cuál explicación pierde menos evidencia. El mapa conserva por separado el score de pantalla, la pareja adjudicada y el estado de revisión.

Menem I y Menem II quedan `PAT→TEC`: PAT encuadra beneficiarios y continuidad, mientras TEC ejecuta la transformación y ofrece prueba. Macri queda `TEC↔PAT`: el registro técnico domina las aperturas de gobierno activo, pero el inaugural es PAT→TEC y el agregado permanece en frontera. La v0.4 prefiere una indeterminación explícita a una flecha sensible al documento elegido.

El modelo distingue además entre cuatro dimensiones analíticas que el corpus solo puede capturar en una: el registro discursivo formal (lo que mide el corpus), la captura electoral (cómo se construyen mayorías), la estabilización gubernamental (cómo se administra el aparato de Estado), y la supervivencia defensiva (cómo se responde a las crisis de régimen). Las cuatro dimensiones pueden operar en registros distintos simultáneamente. El discurso presidencial de apertura legislativa es un insumo importante pero parcial del análisis. Los vectores miden el registro discursivo formal —no el gobierno como totalidad.

La ambigüedad no es un defecto del modelo. Alfonsín, De la Rúa, Kirchner, CFK II y Macri presentan trayectorias documentales inestables o sensibles a fase. Eso no obliga a borrar su configuración agregada, pero sí impide leerla como tipo fijo.

> **Figura 1. Mapa orbital por actor × mandato — configuración y estado de trayectoria**
> Fuente: mapa orbital argentino v0.4 (NB21).
> Archivo: MAPA_ORBITAL_DIRECTION_MATRIX_v0_4.png
> Uso: leer por separado la relación agregada y la estabilidad de la trayectoria documental.
> Caveat: 52 documentos, 10 personas, 12 unidades. No incluye Perón ni modifica el videojuego.

---

### 4. Corpus y método

El corpus primario del proyecto es el conjunto de discursos presidenciales ante la Honorable Cámara de Diputados de la Nación Argentina (HCDN) del período democrático 1983–2026. Incluye mensajes de apertura de sesiones ordinarias y discursos de asunción: documentos que marcan el inicio del año legislativo o del mandato, pronunciados ante el Congreso reunido en asamblea, y publicados en el Diario de Sesiones.

La elección de este corpus no es arbitraria. Los mensajes de apertura legislativa son el género discursivo presidencial más formalizado, más comparable entre presidencias y más sistemáticamente disponible a lo largo del período. No son el único discurso presidencial —excluyen cadenas nacionales, discursos electorales y comunicación informal— pero tienen la ventaja de la regularidad. El corpus cubre 52 documentos de 10 personas que ejercieron la Presidencia, organizados en 12 unidades actor × mandato: Alfonsín; Menem I y II; De la Rúa; Rodríguez Saá; Duhalde; Kirchner; CFK I y II; Macri; Alberto Fernández; Milei.

La pipeline de análisis aplica vectores proposicionales calibrados (tecnocracia, paternalismo, mesianismo) a cada documento mediante el protocolo del cuaderno NB05. La calibración distingue entre subtipos propositivos de distinto peso: lenguaje tecnocrático estructurante (1.0), lenguaje técnico-burocrático de catálogo (0.5), y lenguaje administrativo genérico (0.0). El objetivo es descontar el ruido administrativo que aparece en cualquier discurso formal de gobierno y quedarse con la tecnocracia que organiza el argumento, no la que acolcha el texto.

La v0.4 añade una corrección simétrica. Una coincidencia léxica no cuenta automáticamente como presencia positiva: puede ser afirmada, subordinada, atribuida, rechazada o meramente descriptiva. Después se codifica su función —tiempo, problema, autoridad, sujeto/enemigo, telos, sacrificio, medios o prueba— y su posición —encuadre, operación, prueba, payload/beneficiario o exterior—. Así, “administración pública” como botín heredado no suma TEC positiva; “justicia social” como robo no suma PAT positiva; y una “nueva era” atribuida al adversario no suma MES positiva. La polaridad recae sobre la función argumental, no sobre si el sustantivo designa algo deseable: un déficit condenado puede ser un problema TEC afirmado cuando la voz adopta el diagnóstico fiscal.

La corrección más importante aplicada al corpus fue la reatribución del `Mensaje Presidencial 2019.txt` al actor correcto. Ese archivo contenía la asunción presidencial de Alberto Fernández (10-12-2019) y había sido asignado a Macri por una heurística de año. La corrección, aplicada el 2026-04-29, modifica sustancialmente los perfiles de ambos actores y hace que sus corpus sean metodológicamente comparables por primera vez. Ningún perfil pre-corrección tiene validez interpretativa.

La cola de revisión manual —ocho documentos con flags activos de auditoría— fue revisada el mismo día y resuelta como `cleared_provisional`. Los documentos permanecen en el corpus con sus caveats anotados; ninguno fue excluido.

NB10 produce la línea de base interpretativa. NB12–NB16 separan masa y dirección e incorporan la apertura 2026. NB17 codifica exhaustivamente las 72 señales de Milei 2024–2026. NB18 congela 1.048 señales y generaliza polaridad, función y posición. NB19 selecciona parejas por masa corregida y ordena la flecha por liderazgo funcional. NB20 ejecuta ocho controles leave-one-dimension-out y 2.000 remuestreos documentales por unidad. NB21 adjudica los casos donde promedio y trayectoria entran en tensión y publica el mapa v0.4. Las salidas automáticas quedan trazadas, pero no sustituyen el juicio de adjudicación ni una futura réplica humana.

La fuente 2026 queda trazada por tres datos verificables: Asamblea Legislativa del 1 de marzo de 2026, PDF oficial de la HCDN y huella SHA-256 `020a690829271db253f97db6c92b21b51d146785959d48c7943c408d5e9b8091`. El texto analizado contiene 11.028 palabras. El PDF original, el texto extraído, el registro y la ventana presidencial usada por NB15 se conservan en el corpus.

**Fuente primaria 2026:** [PDF oficial de la HCDN](https://www3.hcdn.gob.ar/dependencias/secparl/dgral_info_parlamentaria/dip/mensajes-presidenciales/apertura-de-sesiones/2026-Asamblea-Legislativa-Milei.pdf) · [transcripción oficial de Casa Rosada](https://www.casarosada.gob.ar/informacion/discursos/51181-discurso-del-presidente-de-la-nacion-javier-milei-en-la-apertura-del-144-periodo-de-sesiones-ordinarias-del-congreso-de-la-nacion).

La auditoría descubrió además un problema de fuente en Rodríguez Saá. El archivo de 2001 contiene la sesión legislativa completa. La v0.4 limita el caso a los segmentos 1084–1112: 58 matches no presidenciales quedan excluidos antes de toda agregación. Con esa ventana, la adjudicación de unidad es `PAT→MES`, siempre marcada como n=1 y cautela máxima.

**Perón se analiza por separado.** Los discursos de Perón provienen de la pipeline alternativa de fuentes (PERON_ALT_PIPELINE), que usa extracción manual de segmentos del Diario de Sesiones, revisión proposicional con un registro de patrones adaptado al contexto retórico de Perón, y sin calibración TM/TCM/AGN. Los resultados son conteos de patrones proposicionales, no scores calibrados. No son comparables numéricamente con el corpus HCDN. La sección § 8 de este artículo presenta el análisis de Perón en términos cualitativos, sin puente numérico con el corpus democrático.

**El discurso de Perón de 1973 está bloqueado.** El archivo PERON_SRC_015 —registrado inicialmente como la asunción del 12 de octubre de 1973— fue reclasificado en 2026-04-30. El archivo es el Diario de Sesiones de la Asamblea Legislativa de esa fecha y contiene el discurso del presidente de la Asamblea dirigido a Perón, no el discurso inaugural de Perón. El discurso real fue pronunciado desde el balcón de la Casa Rosada y no está en ese Diario de Sesiones. No existe evidencia del discurso de Perón de 1973 en ninguna pipeline activa del proyecto.

---

### 5. Hallazgo principal del corpus democrático: persistencia de la pareja TEC–PAT

El hallazgo más robusto del corpus democrático HCDN 1983–2026 es la persistencia de la pareja tecnocracia/paternalismo: **43 de los 52 documentos —83%—** la conservan después de aplicar polaridad y función. La cifra es ligeramente menor que en v0.3, pero diez de las doce unidades de mandato mantienen TEC–PAT. La revisión conserva el núcleo del campo y deja de tratar la masa como árbitro automático de pareja y dirección.

La distribución completa es:

| Pareja funcional | Documentos | Unidades de mandato |
|---|---:|---:|
| TEC–PAT | 43 (83%) | 10 |
| MES–TEC | 7 (13%) | 1 |
| PAT–MES | 2 (4%) | 1 |
| **Total** | **52** | **12** |

La pareja es más robusta que su orden interno. Cinco unidades cambian de notación respecto de v0.3, pero ninguna cambia de pareja. La capa documental y la capa de mandato no son intercambiables: una unidad puede conservar TEC–PAT y, al mismo tiempo, mostrar cambios de flecha entre años.

La interpretación de este hallazgo requiere precisión sobre qué significa y qué no significa.

**Lo que el hallazgo significa:** el discurso presidencial de apertura legislativa combina sistemáticamente —con independencia de la orientación del gobierno— dos registros retóricos: (a) el lenguaje de protección social, tutela estatal e interpelación al pueblo como receptor de bienestar; (b) el lenguaje de modernización técnico-administrativa, eficiencia de gestión y racionalización del Estado. Estos dos registros son co-presentes y mutuamente reforzantes en la mayor parte del presidencialismo democrático argentino. El campo retórico disponible para el discurso presidencial del período parece ser relativamente independiente de la orientación política del actor.

**Lo que el hallazgo no significa:** no que todos los presidentes hayan implementado las mismas políticas, ni que el paternalismo o la tecnocracia como registros discursivos predigan el programa de gobierno. El caso más robusto contra esa lectura es Menem.

Por qué importó la calibración NB05: sin descuento del lenguaje administrativo genérico, cualquier discurso formal de gobierno tendería a aparecer como "tecnocrático" por la acumulación de vocabulario institucional convencional —referencias a la Constitución, al presupuesto, a las carteras ministeriales. La calibración busca distinguir la tecnocracia que organiza el argumento (reforma institucional con orientación explícita, planificación económica, modernización de gestión como eje retórico) de la tecnocracia que solo aparece como textura de los documentos. El resultado es una tecnocracia propositivamente más robusta —y eso refuerza, no debilita, el hallazgo de su co-presencia con el paternalismo.

La co-presencia de TEC y PAT no es una anomalía argentina ni un artefacto metodológico. Es una propiedad documentable del discurso presidencial formal del período. Lo que la hace analíticamente interesante es que aparece bajo condiciones tan dispares —reforma neoliberal y kirchnerismo, convertibilidad y cepo cambiario— que no puede explicarse por la orientación del gobierno. Requiere una explicación que tenga en cuenta el campo retórico disponible para el presidencialismo como institución, independientemente de quien lo ocupa.

---

### 6. Familias de configuración en democracia

El corpus HCDN muestra tres familias de pareja. TEC–PAT concentra el 83% de los documentos; MES–TEC y PAT–MES son minoritarias pero identifican los contextos en que el mesianismo emerge como vector activo.

**Paternalismo → tecnocracia.** Es la relación agregada más frecuente. Menem I y II, Duhalde, Kirchner, CFK I y II y Alberto Fernández quedan `PAT→TEC`, con distintos estados de estabilidad. PAT encuadra sujetos, protección y continuidad; TEC aporta instrumentos y prueba. Compartir notación no vuelve equivalentes sus programas ni sus trayectorias.

**Tecnocracia ↔ paternalismo.** Alfonsín y De la Rúa quedan `PAT↔TEC` porque sus trayectorias no autorizan jerarquía; Macri queda `TEC↔PAT` porque los documentos de gobierno activo favorecen TEC, la asunción favorece PAT y el remuestreo conserva una zona de frontera.

**Tecnocracia + mesianismo / mesianismo + tecnocracia.** La pareja más distintiva del corpus aparece en el discurso extraordinario de Alfonsín de 1988 y en Milei. En Alfonsín, el empate exacto de masa y el contexto Carapintada impiden estabilizar una flecha. En Milei, NB10 registra `TEC→MES` por volumen para 2024–2025, pero NB12 favorece `MES→TEC` en 2023, 2024 y 2025. La apertura 2026 endurece la prueba: su pantalla léxica marca PAT–TEC, pero la comparación funcional favorece MES–TEC en 8/8 controles. MES define decadencia, enemigo, umbral, misión y telos; TEC convierte esa misión en diagnóstico, instrumentos y resultados; los resultados vuelven como prueba de la promesa. El mapa la escribe `MES→TEC↺` y conserva la discrepancia de pantalla como caveat.

**Paternalismo + mesianismo.** La pareja aparece en registros de ruptura institucional: Rodríguez Saá en diciembre de 2001 y la inauguración de Duhalde en enero de 2002. Con la ventana presidencial propagada desde el inicio, Rodríguez Saá queda `PAT→MES`, pero n=1 impide convertir esa flecha en tipo. En Duhalde, la trayectoria posterior retorna a TEC–PAT.

---

### 7. Trayectorias democráticas principales

Las trayectorias que siguen son hipótesis de trabajo. Los perfiles se organizan como unidades `actor × mandato`, no como tipos de persona. Cada unidad informa línea de base, dirección estructural y estado. La capa documental conserva los cambios internos que el resumen del mandato no puede expresar.

> **Figura 2. Trayectorias documentales**
> Fuente: mapa orbital argentino v0.4, capa de trayectorias documentales (NB21).
> Archivo: MAPA_ORBITAL_DOCUMENT_TRAJECTORIES_v0_4.png
> Uso: mostrar qué cuerpo domina cada documento y por qué el mandato no se reduce al promedio.
> Caveat: el color codifica el cuerpo dominante; la secuencia exacta está en la tabla documental.

| Unidad | n | v0.4 | Estado de trayectoria |
|---|---:|---|---|
| Alfonsín (1983–1989) | 8 | `PAT↔TEC` | inestable |
| Menem I (1989–1995) | 6 | `PAT→TEC` | estable |
| Menem II (1995–1999) | 5 | `PAT→TEC` | estable |
| De la Rúa (1999–2001) | 3 | `PAT↔TEC` | inestable |
| Rodríguez Saá (2001) | 1 | `PAT→MES` | baja n |
| Duhalde (2002–2003) | 3 | `PAT→TEC` | sensible a fase |
| Néstor Kirchner (2003–2007) | 5 | `PAT→TEC` | inestable |
| CFK I (2007–2011) | 4 | `PAT→TEC` | estable |
| CFK II (2011–2015) | 5 | `PAT→TEC` | sensible a fase |
| Macri (2015–2019) | 5 | `TEC↔PAT` | frontera |
| Alberto Fernández (2019–2023) | 4 | `PAT→TEC` | estable provisional |
| Milei (2023–) | 3 HCDN / 4 leídos | `MES→TEC↺` | calibrador longitudinal |

#### 7.1 Alfonsín: inestabilidad orbital como hallazgo

*TIER_1 · n=8 · caution: medium · 5 transiciones*

El corpus alfonsinista es el de mayor inestabilidad orbital del período democrático: cinco cambios de configuración en ocho documentos. El vector dominante rota entre tecnocracia, paternalismo y mesianismo a lo largo del mandato sin que ninguna configuración se sostenga por más de dos años consecutivos. Ningún otro actor multi-documento del corpus presenta esta variabilidad.

La secuencia aproximada que emerge del corpus (según NB10) arranca con tecnocracia + paternalismo en la inauguración de 1983, transita por paternalismo + tecnocracia en 1984–1985, regresa a tecnocracia + paternalismo en 1986–1987, muestra un empate exacto tecnocracia = mesianismo en el discurso extraordinario de diciembre de 1988 (crisis de los Carapintada), y concluye con mesianismo + tecnocracia en el último discurso de 1989, pronunciado bajo hiperinflación y transferencia anticipada del gobierno.

La lectura provisional es que el discurso alfonsinista respondió con registros distintos a contextos sucesivos radicalmente diferentes: transición democrática, consolidación institucional, crisis económica, presiones militares, hiperinflación. La variabilidad discursiva refleja la presión del contexto, no incoherencia interna. El mesianismo alfonsinista aparece en los tres momentos de mayor presión institucional del mandato y opera como registro de respuesta a crisis, no como vector estructural del actor.

La inestabilidad orbital de Alfonsín no debe leerse como un defecto de su discurso ni como incoherencia política. Es el hallazgo principal de este actor: el presidencialismo de la transición democrática argentina fue retóricamente inestable porque el contexto al que respondía era objetivamente inestable.

La primera pasada v0.4 favorece `PAT→TEC` en el agregado y obtiene alto soporte de remuestreo. La adjudicación conserva `PAT↔TEC` porque el mandato reúne cinco transiciones, tres notaciones y dos cierres MES→TEC. La decisión no niega el promedio: impide que el promedio borre la propiedad principal de la trayectoria. Alfonsín fue un solo mandato; dividirlo para estabilizar el mapa destruiría el hallazgo.

#### 7.2 Menem I y Menem II: continuidad de pareja, diferencia de certeza

*TIER_1 · Menem I n=6 · Menem II n=5 · caution v0.4: medium por unidad*

La matriz personal de once documentos ocultaba dos mandatos constitucionales. Menem I reúne las aperturas de 1990–1994 y la apertura de marzo de 1995; Menem II comienza con la asunción del 8 de julio de 1995 y continúa con 1996–1999. En ambos mandatos, la base proposicional es `PAT→TEC`. Menem I promedia PAT=33.45 y TEC=20.89; Menem II, PAT=30.29 y TEC=16.98.

La recalibración v0.4 ordena ambos mandatos como `PAT→TEC`. Menem I conserva soporte alto; Menem II sostiene la dirección en siete de ocho controles LODO y en el 100% de los remuestreos documentales no indeterminados. La separación constitucional permanece: compartir flecha no autoriza fusionar unidades.

La disociación entre registro discursivo paternalista y orientación gubernamental reformista permanece. La apertura de 1992 concentra el score de paternalismo más alto del corpus. El caso Menem sigue siendo la evidencia más fuerte de que discurso y política de Estado son dimensiones separables; la revisión sólo impide confundir esa tesis con una estabilidad direccional uniforme entre mandatos.

#### 7.3 CFK I y CFK II: la rotación que ocultaba el promedio personal

*TIER_1 · CFK I n=4 · CFK II n=5 · caution v0.4: medium por unidad*

La agregación de nueve documentos producía una media `TEC→PAT`, traccionada por la apertura de 2008, mientras la moda personal era `PAT→TEC`. La separación por mandato resuelve la aparente contradicción: **CFK I parte de `TEC→PAT`** (TEC=24.57; PAT=17.34), mientras **CFK II parte de `PAT→TEC`** (PAT=14.85; TEC=13.29). El segundo mandato no es una repetición atenuada del primero; rota la dirección dentro de la misma pareja.

La capa funcional v0.4 ordena ambos mandatos como `PAT→TEC`. En CFK I la revisión cambia la antigua indeterminación: PAT aporta encuadre de protección y sujeto, mientras TEC concentra operación y prueba. CFK II conserva la misma flecha, pero la asunción de 2011 y el documento de 2014 abren configuraciones alternativas; por eso su estado es sensible a fase. La pareja TEC–PAT es estable y la trayectoria sigue siendo informativa.

Lo que el corpus no autoriza es reducir a CFK o al kirchnerismo a un tipo discursivo. La fortaleza atractora de varios documentos sigue siendo informativa, pero ya no justifica una única flecha personal. La unidad correcta cambia la interpretación sustantiva.

#### 7.4 Macri: perfil corregido y provisional

*TIER_3 · n=5 (corregido) · caution: medium · 3 transiciones · corrección patch v0_2*

El perfil de Macri parte de la corrección de metadatos de 2026-04-29: la asunción de Alberto Fernández fue separada de su corpus. La v0.4 deja `TEC↔PAT`. La asunción de 2015 es PAT→TEC; 2016 y 2018 son TEC→PAT; 2017 y 2019 quedan en frontera. TEC domina el gobierno activo, pero PAT conserva capacidad de encuadre en la promesa inaugural y social. El remuestreo no autoriza una flecha única.

El promedio de mesianismo de Macri sigue siendo el más bajo del corpus democrático. La dirección revisada ocurre dentro de TEC–PAT y no agrega MES. El documento de 2018 retiene attractor indeterminado y debe tratarse como low-weight.

El perfil es TIER_3 por la corrección de patch pendiente de re-run y por su sensibilidad documental. `TEC↔PAT` expresa esa frontera; no debe compararse con el perfil pre-corrección.

#### 7.5 Alberto Fernández: perfil separado después de la corrección

*TIER_3 · n=4 (corregido) · caution: high · 1 transición*

El corpus de Alberto Fernández comienza con la asunción de 2019 recuperada de la mala atribución a Macri. Los cuatro documentos disponibles muestran todos ambigüedad proposicional (share_ambiguous_nb05=1.0). El promedio actor registra near-parity: la diferencia entre paternalismo y tecnocracia es del 5.5%. La asunción de 2019 registra empate exacto.

El caution_level=high es un juicio calibrado. NB13 preserva `PAT→TEC` en el agregado del mandato (margen 0.050; cuatro controles preservan y dos indeterminan), pero tres de los cuatro documentos permanecen indeterminados en la pantalla estructural. El resumen de mandato no elimina esa ambigüedad documental. La apertura de 2023 no está en el corpus.

Este perfil debe leerse de manera completamente independiente del perfil de Macri. El perfil fusionado pre-corrección no tiene validez interpretativa.

#### 7.6 Milei: MES organiza; TEC realiza y prueba

*TIER_3 · n=3 HCDN · cuatro discursos leídos entre NB12 y NB15 · dirección revisada*

Milei presenta la pareja más analíticamente distintiva del corpus democrático: MES–TEC. NB10 la ordena `TEC→MES` por masa en las aperturas de 2024 y 2025. NB12 incorpora la asunción de diciembre de 2023 como fuente primaria contextual y compara tres hipótesis: `TEC→MES`, `MES→TEC` y relación no subordinada. Sobre 26 pasajes y ocho dimensiones, `MES→TEC` queda primera en los tres discursos y en 20/20 pruebas leave-one-dimension-out.

La apertura de 2026 era la prueba que faltaba porque no participó de esa formulación. Su primer resultado incomoda la hipótesis: la pantalla NB04/NB05 obtiene TEC=16,322, MES=6,347 y PAT=20,856. Si el conteo decidiera solo, el documento sería PAT–TEC. La grilla NB13, obligada a heredar esa pareja, queda `PAT↔TEC`. NB15 no borra ese resultado. Lo trata como evidencia de que hay mucha masa paternalista y pregunta qué función cumple.

La comparación funcional pone a competir MES–TEC, PAT–TEC, TEC–PAT y MES–PAT. MES–TEC obtiene soporte medio 2,000 y queda primera en las ocho pruebas que retiran una dimensión por vez. La explicación H4 —MES encuadra; TEC ejecuta y sus resultados retrovalidan MES— queda primera en siete de ocho controles y empata con H2 en el restante, cuando se retira la dimensión de medios y prueba. No hay una victoria fabricada por una sola categoría.

¿Dónde aparece? No sólo en palabras religiosas. El discurso ordena el presente como cambio de era, contrapone decadencia y grandeza, convierte a la Argentina en sujeto de una misión y proyecta el juicio de la historia y la posteridad. Dentro de ese marco, la tecnocracia no es decorado: inflación, reformas, energía, defensa, inteligencia artificial, centros de datos y recursos estratégicos hacen posible el salto civilizatorio. El resultado técnico vuelve después como confirmación de que el rumbo histórico era verdadero.

La masa PAT es real, pero no cumple el papel que el conteo le atribuiría. Una parte está en sustantivos de política social; otra aparece para construir un exterior rechazado —el “Estado protector” o el “burócrata salvador” como figuras de aquello que debe dejarse atrás—. PAT está presente en el texto sin organizar su tiempo, su autoridad ni su destino. Esta distinción entre presencia y función es el hallazgo metodológico del documento.

La explicación provisional es un **acoplamiento asimétrico recursivo**. MES define decadencia, enemigo, umbral, misión, sacrificio y telos. TEC convierte esa misión en diagnóstico, instrumentos y resultados. Después, los resultados técnicos se presentan como prueba de que la promesa mesiánica era verdadera. Sin TEC queda una misión sin programa; sin MES permanecen medidas, pero desaparecen el tiempo histórico, la autorización sacrificial y el destino. El mapa lo resume como `MES→TEC↺`.

Esto no implica que Milei “juegue los tres cuerpos”. Los tres vectores describen el campo general; una presidencia normalmente articula dos, con uno más organizador que el otro. En Milei, PAT no es un componente ausente que deba completar una tríada personal. La hipótesis bajo prueba es precisamente `MES→TEC`.

La cautela sigue siendo ineludible. La apertura 2026 es una prueba temporal fuera de la muestra 2023–2025, pero no fue preregistrada ni codificada a ciegas. La adjudicación de pareja y H4 son autorales y necesitan réplica independiente. La asunción 2023 aún no integra la misma serie cuantitativa HCDN. `MES→TEC↺` es una dirección revisada robusta dentro de este experimento, no un tipo definitivo de persona.

#### 7.7 Rodríguez Saá: ventana corregida y cautela máxima

*TIER_3 · n=1 · caution: high · ventana presidencial propagada a NB18*

El archivo contiene una sesión completa, no sólo el mensaje. La v0.4 restringe el universo a los segmentos 1084–1112 antes de recodificar: elimina 58 matches legislativos ajenos y conserva nueve señales presidenciales. La pareja PAT–MES sobrevive y la función favorece `PAT→MES`: la promesa material encuadra y MES dramatiza la excepción. Con n=1, la notación sigue siendo una hipótesis de documento, no un tipo de actor.

---

### 8. Perón 1946–1954: contrapunto cualitativo separado

Esta sección es metodológicamente distinta de las anteriores. Los datos que siguen provienen de la pipeline alternativa de fuentes de Perón (PERON_ALT_PIPELINE), que usa un instrumento diferente al corpus HCDN. Los resultados son conteos de patrones proposicionales manualmente extraídos de documentos del Diario de Sesiones. No existe puente numérico entre estas dos pipelines. La comparación con los actores democráticos es cualitativa, a través del marco conceptual compartido, no cuantitativa.

**Perón no aparece en el mapa HCDN.** La grilla democrática del proyecto cubre el período 1983–2026. Perón (tres presidencias: 1946–1952, 1952–1955, 1973–1974) es anterior a ese período y usa fuentes distintas. Los datos de Perón se presentan aquí como contrapunto histórico-cualitativo, no como punto de datos en la misma escala.

Los dos documentos limpios disponibles de Perón son su asunción inaugural del 4 de junio de 1946 y su apertura anual del 19 de mayo de 1954. Ambos fueron procesados mediante extracción manual del Diario de Sesiones y revisión proposicional con un registro de patrones adaptado al contexto retórico del período. El status de ambos es `usable_one_document_hypothesis`.

**La jerarquía vectorial es estable en ambos documentos.** Tanto en 1946 como en 1954, el mesianismo domina, el paternalismo es secundario, y la tecnocracia es terciaria pero persistente. El ranking MES > PAT > TEC se sostiene a través de dos géneros distintos (asunción inaugural y apertura anual) y a ocho años de distancia. Esa estabilidad de ranking es analíticamente sugestiva.

**El contenido de cada vector no es estático.** Este es el hallazgo más rico del contraste de fase.

En **1946**, el mesianismo es el de la ruptura fundacional y la redención: el derrumbe de la antigua farsa, las fechas del 17 de octubre y el 24 de febrero como marcas de una discontinuidad ya consumada, la voluntad popular como legitimidad histórica trascendente. El paternalismo anuncia justicia social debida a las masas trabajadoras, reforma social programada, acceso educativo comprometido. El vínculo entre Estado y pueblo es inaugurado por el discurso mismo. La tecnocracia nombra un mandato activo de reconstrucción: planificación hidráulica y energética, industrialización, el Consejo Nacional de Posguerra como instrumento programático.

En **1954**, el mesianismo se ha desplazado a la consagración providencial-doctrinal: las tres banderas como trívium mesiánico (7 veces), el peronismo como movimiento de salvación histórica (7 veces), la Providencia divina como legitimadora (4 veces). La ruptura fundacional de 1946 es ahora historia establecida. El reclamo mesiánico ya no anuncia una discontinuidad —la defiende y consagra. El paternalismo de 1954 ha pasado de tutela promisoria a orden social organizado: el pueblo ya no es receptor de un programa sino una fuerza social estructurada cuyas organizaciones el Estado coordina. La tecnocracia, en cambio, **se debilita absolutamente**: es el único vector cuyo score cae a pesar de que el corpus de 1954 tiene el doble de segmentos que el de 1946. El aparato institucional que 1946 construyó mediante programas técnicos explícitos opera en 1954 como hecho de fondo —presente pero implícito, terciario sin ser ausente.

El debilitamiento de TEC es el hallazgo más analíticamente robusto del contraste de fase. Pasó de mandato de construcción a doctrina de operación.

Este contraste sugiere una hipótesis de trabajo (H2, provisional, dos documentos): Perón puede importar para el marco no como un tipo proposicional fijo sino como una articulación de los tres cuerpos con sensibilidad de fase —una orientación jerárquica consistente cuyo contenido interno evoluciona con la situación política. La hipótesis requiere el tercer documento (1973) para ser evaluada.

**Lo que esta sección no prueba:** ninguna clasificación final de Perón, ninguna comparación numérica con actores HCDN, ninguna confirmación del estatus de atractor meta-orbital, y ninguna inferencia sobre 1973. El discurso inaugural de Perón del 12 de octubre de 1973 no está en ninguna pipeline activa del proyecto.

---

### 9. Qué sugiere el mapa orbital v0.4

Las proposiciones que siguen sintetizan lo que la evidencia limpia disponible ilumina sobre el modelo de tres cuerpos. Todas son hipótesis provisionales.

**P1 — El campo retórico democrático está dominado por la pareja tecnocracia/paternalismo.**
El 83% de los documentos del corpus HCDN 1983–2026 y diez de las doce unidades de mandato muestran la pareja TEC–PAT en el mapa adjudicado. La excepción sostenida es Milei, con MES–TEC; Rodríguez Saá aporta el único caso PAT–MES a nivel de unidad. La dominancia de TEC–PAT atraviesa orientaciones políticas distintas sin agotar el campo de tres vectores.

**P2 — La pareja es más robusta que su dirección.**
Paternalismo + tecnocracia y tecnocracia + paternalismo no son intercambiables, pero la mayor masa no demuestra por sí sola qué vector encuadra al otro. La v0.4 cambia cinco notaciones y ninguna pareja. La dirección exige polaridad, función, posición y trayectoria; no puede inferirse sólo por conteo.

**P3 — El mesianismo no necesita una crisis terminal para organizar un discurso de gobierno.**
En buena parte del corpus democrático, MES aparece en inauguraciones bajo crisis, salidas bajo presión y momentos de crisis de régimen. Milei amplía el patrón: la arquitectura `MES→TEC↺` reaparece en una asunción y en tres aperturas ordinarias. En 2026, la misión ya no anuncia solamente una ruptura; representa al gobierno como agente de una transición civilizatoria en curso.

**P4 — La disociación entre discurso y gobierno es documentable, no anómala.**
El caso Menem establece el registro empírico más robusto del corpus para la separación entre registro discursivo paternalista y orientación gubernamental reformista. El modelo de tres cuerpos no predice coherencia entre retórica presidencial y política de Estado. Esta disociación no es una excepción: puede ser la norma.

**P5 — Los perfiles varían por mandato, fase, género y contexto de crisis.**
La inestabilidad de Alfonsín, De la Rúa y Kirchner; la sensibilidad de fase de Duhalde y CFK II; la frontera de Macri; y el debilitamiento de TEC en Perón entre 1946 y 1954 muestran que los perfiles no son tipos personales estables.

**P6 — La tecnocracia aparece con frecuencia como infraestructura, realización y prueba.**
En el corpus democrático, TEC puede acumular gran volumen sin gobernar tiempo, sujeto o telos. Milei es el caso crítico: TEC conserva autonomía causal, pero la lectura revisada la subordina al meta-encuadre MES. En Perón, TEC es terciaria y su debilitamiento entre 1946 y 1954 sigue siendo el hallazgo más robusto del contraste de fase.

**P7 — Ninguna persona debe reducirse a un tipo fijo.**
Las unidades actor × mandato y sus trayectorias documentales —no los tipos personales— son la escala apropiada. Una configuración formalmente idéntica puede cumplir funciones históricas distintas. El modelo detecta patrones; la interpretación requiere contexto.

**P8 — Los tres vectores describen el campo, no una tríada obligatoria en cada presidente.**
La inestabilidad pertenece al sistema de tres cuerpos. Las presidencias suelen articular dos vectores, normalmente con uno más organizador que el otro. Exigir los tres en un mismo actor confundiría el espacio de fuerzas con cada configuración particular.

---

### 10. Límites

Este artículo y el corpus que lo sustenta tienen límites que deben hacerse explícitos. Los límites no son debilidades del argumento: son parte del argumento. Un análisis que no declare sus límites no es más riguroso; es menos confiable.

**El discurso no es el gobierno.** Los vectores describen el registro retórico de los mensajes presidenciales de apertura legislativa y asunciones. No miden la orientación política de los gobiernos, sus políticas implementadas, ni su estilo comunicacional informal. La disociación entre discurso y gobierno —documentada de manera más robusta en el caso Menem— puede ser la norma, no la excepción.

**El corpus de mensajes presidenciales no es el campo político completo.** Los discursos ante la HCDN son el género más formalizado y comparable. No son el único discurso presidencial. Excluyen cadenas nacionales, comunicación informal, discursos electorales, programas de partido. El análisis cubre una dimensión del presidencialismo; no lo agota.

**El corpus es parcial.** Brechas documentadas: apertura de CFK 2009 posiblemente ausente del corpus NB08; apertura de Alberto Fernández 2023 ausente; inaugural de Milei diciembre 2023 disponible y procesado en NB12 pero no integrado a los scores canónicos NB10. La apertura de Milei 2026 ya está integrada y fue recodificada mediante NB15–NB21. Una síntesis de corpus parcial es provisional por definición.

**Perón 1973 no existe como evidencia.** El discurso existe históricamente —fue pronunciado desde el balcón de la Casa Rosada y fue transmitido y cubierto por los medios. Pero no está en ninguna pipeline activa del proyecto. Cualquier inferencia sobre la tercera presidencia es especulación sobre un momento no documentado.

**No existe puente numérico entre Perón y los actores HCDN.** Los instrumentos son distintos, los procedimientos de extracción son distintos, los registros de patrones son distintos. Sin bridge note, la comparación es cualitativa y conceptual. No pueden hacerse afirmaciones del tipo "el mesianismo de Perón es n veces mayor que el de actor X".

**La dirección estructural sigue siendo revisable.** NB17–NB21 aplican un instrumento simétrico, LODO y bootstrap, pero la primera pasada automática no alcanza acuerdo suficiente para reemplazar una doble codificación humana. `↔` expresa insuficiencia para ordenar; una flecha expresa la mejor adjudicación disponible, no causalidad demostrada.

**Milei n=3 HCDN / cuatro discursos leídos.** La pareja MES–TEC y la dirección `MES→TEC↺` sobreviven a la apertura 2026, incluso frente a una pantalla léxica adversa. No pueden establecerse como tipo personal. La asunción 2023 debe integrarse formalmente a la misma línea cuantitativa y la adjudicación 2026 debe replicarse de manera ciega.

**Macri provisional.** El perfil corregido es TIER_3 pendiente de re-run completo de pipeline v1. La v0.4 lo deja `TEC↔PAT` y publica su sensibilidad documental.

**Alberto Fernández caution=high.** Ambigüedad estructural en todos los documentos disponibles. El mandato está incompleto en el corpus.

**Rodríguez Saá permanece en baja n.** La ventana presidencial 1084–1112 ya se propaga antes de la recodificación v0.4 y excluye 58 matches ajenos. El límite restante es sustantivo: n=1.

**Actor × mandato no elimina la trayectoria.** Separar Menem y CFK corrige la unidad constitucional; no habilita a fragmentar otros mandatos hasta obtener configuraciones estables. Alfonsín demuestra que la inestabilidad interna puede ser el hallazgo.

**La síntesis en inglés no es canónica.** El documento `CORPUS_UNIFIED_INTERPRETIVE_SYNTHESIS_v0_1.md` (en inglés) fue marcado como non-canonical el 2026-04-30 por contener errores de período y configuración para Alfonsín, Kirchner y De la Rúa. No debe citarse como autoridad.

**No existen clasificaciones tipológicas finales.** Ningún actor tiene un tipo discursivo confirmado. Todos los perfiles son provisionales. El modelo no produce `final_type`. El uso de etiquetas de tipo fijo no está autorizado por la evidencia.

> **Figura 5. Niveles de comparabilidad: misma teoría, dos pipelines, cuatro reglas de lectura**
> Fuente: mapa orbital argentino v0.4 (NB17–NB21), matriz de casos HCDN y pipeline documental separada de Perón.
> Archivo: MAPA_ORBITAL_COMPARABILITY_TIERS_v0_4.drawio.png
> Uso: mostrar qué unidades pertenecen a cada tier y qué afirmaciones autoriza cada una sin recombinar mandatos.
> Caveat: NB17–NB21 agregan polaridad, función, posición y sensibilidad sin volver comparables las dos pipelines. El tier mide comparabilidad, no importancia histórica.

---

### 11. Roadmap hacia v1

Las condiciones para producir el mapa orbital integrado argentino v1 están definidas con precisión. Ningún paso puede anticiparse sin completar los anteriores.

**Paso 1 — Adquirir fuente verificada del discurso de Perón del 12 de octubre de 1973.**
El discurso existe y fue pronunciado desde el balcón de la Casa Rosada. El problema es de identificación de fuente, no de existencia del discurso. Fuentes prioritarias: BCN Colección de Mensajes Presidenciales, La Nación 13-10-1973, Casa Rosada archivo histórico. La nueva fuente se registrará como PERON_SRC_020. Cualquier fuente debe verificarse por contenido y autoría antes de avanzar a extracción.

**Paso 2 — Procesar 1973 mediante los mismos controles de calidad.**
La fuente verificada debe pasar extracción (BLQ-01), revisión de calidad y descolumnización (BLQ-02), micro-review con cross-reference, segmentación (PERON_NB01_1973), y revisión proposicional (PERON_NB02_1973). La falla de PERON_SRC_015 fue causada parcialmente por verificación insuficiente de contenido al momento del registro. La próxima fuente para 1973 debe verificarse con más rigor.

**Paso 3 — Producir el perfil tri-documento de Perón (PERON_NB04: 1946 + 1954 + 1973).**
Con tres documentos de tres presidencias distintas (fundación, consolidación, retorno), es posible producir el contraste de tres fases y el mínimo perfil multi-documento requerido para una caracterización de actor Perón. El actual contraste de dos documentos (PERON_NB03) es evidencia preparatoria, no el perfil multi-documento.

**Paso 4 — Construir la nota puente entre PERON_ALT_PIPELINE y corpus HCDN.**
La bridge note requiere: revisión de alineación metodológica entre ambas pipelines, calibración comparativa del registro de patrones, controles de género (asunciones vs asunciones; aperturas vs aperturas), y documentación explícita de condiciones y límites de comparabilidad. Solo con la bridge note será posible hacer afirmaciones comparativas numéricas entre Perón y actores HCDN.

**Paso 5 — Completar la línea Milei a n≥4 (parcialmente cumplido).**
La apertura 2026 ya fue incorporada como tercer documento HCDN y prueba temporal mediante NB15. Resta integrar formalmente el inaugural de diciembre 2023 —ya usado cualitativamente en NB12— a la misma serie cuantitativa. Con n≥4 y codificación independiente podrá evaluarse la estabilidad de `MES→TEC↺` sin confundir ampliación de corpus con validación.

**Paso 6 — Completar la réplica humana del re-run HCDN por actor × mandato (parcialmente cumplido).**
NB17–NB21 ya propagaron la ventana de Rodríguez Saá, separaron mandatos, ejecutaron el instrumento simétrico y publicaron sensibilidad. Resta una doble codificación humana independiente de las 1.048 señales —o de una muestra estratificada con adjudicación suficiente—, integrar Milei 2023 y cerrar la deuda de corpus de Alberto Fernández 2023. Los modelos locales pequeños probados no cumplen ese papel.

**Paso 7 — Solo entonces producir MAPA_ORBITAL_ARGENTINO_v1.md.**
Una vez que la bridge note exista, el corpus Perón tenga al menos tres documentos procesados, y el corpus HCDN esté validado por mandato con dirección revisada, será posible producir una caracterización integrada del campo de fuerzas del discurso presidencial argentino.

---

### 12. Conclusión

Argentina no es un péndulo. El péndulo no es una mentira —es una simplificación que captura el movimiento y pierde la gramática. Lo que este proyecto propone es que esa gramática tiene estructura: tres cuerpos en tensión cuya interacción no se puede reducir a un eje bipolar.

El modelo de los tres cuerpos no niega la alternancia económica. No niega que los gobiernos argentinos hayan oscilado entre orientaciones distintas. Lo que propone es que esa alternancia se inscribe en una gramática retórica más profunda que la antecede y sobrevive: un campo de fuerzas en que la tecnocracia, el mesianismo y el paternalismo compiten por la posición dominante sin que ninguno logre eliminar a los otros.

El mapa orbital v0.4 muestra una estructura más compleja que v0.1. El 83% documental en la pareja tecnocracia/paternalismo sugiere una inercia del campo retórico, pero la auditoría demuestra que **masa, pareja, flecha y trayectoria no son la misma cosa**. La masa identifica qué fuerzas dejan huellas; la función pregunta qué hacen; la trayectoria muestra cuándo una relación cambia de fase. Separar mandatos impide fusionar historias constitucionalmente distintas aun cuando compartan notación.

El mesianismo, menos frecuente, no debe reducirse a proxies religiosos ni a vocabulario de crisis. En Milei, `MES→TEC↺` emerge de una arquitectura: ruptura temporal, enemigo, misión, sacrificio y telos encuadran un programa técnico cuyos resultados retrovalidan la promesa. La apertura 2026 extiende ese marco hacia una imaginación civilizatoria concreta: recursos, energía, inteligencia artificial, centros de datos, defensa y posición nacional en el siglo. En Alfonsín y Rodríguez Saá, en cambio, la dirección permanece abierta o dependiente del episodio. El mismo vector cumple funciones distintas según la configuración y el contexto.

El caso Perón continúa separado: su jerarquía MES > PAT > TEC en dos fases es una anotación cualitativa, no una coordenada comparable con HCDN. La prudencia metodológica no debilita el modelo; evita que la metáfora orbital fabrique una precisión que las fuentes no sostienen.

El propósito del proyecto no es etiquetar personas. Es entender configuraciones y trayectorias: qué dos fuerzas articula cada mandato, cuál organiza más que la otra, cuándo no pueden ordenarse y cómo cambia la relación con el contexto. Los tres cuerpos describen la inestabilidad del campo; no obligan a que cada presidente encarne una tríada. El mapa v0.4 es un instrumento de revisión con sensibilidad publicada. El mapa v1 sólo será posible cuando sus flechas, fuentes y puentes metodológicos hayan sido replicados.

---

**Edición:** recalibración funcional simétrica v0.4 · 2026-08-11.

**Criterio:** las unidades describen relaciones discursivas dentro de mandatos; no son clasificaciones personales.

**Comparabilidad:** no está autorizada la comparación numérica entre Perón y el corpus HCDN.

**Linaje:** base v0.1 · NB12–NB16 · calibrador NB17 · simetría NB18 · sensibilidad NB19–NB20 · mapa orbital v0.4 (NB21).

**Proyecto:** *El problema de los tres cuerpos argentinos*.
