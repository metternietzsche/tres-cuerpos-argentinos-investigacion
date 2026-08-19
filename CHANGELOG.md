# Changelog

## Sin publicar

- Sin cambios.

## v0.6.8 · 2026-08-18

- Materializado explícitamente el objeto del tag anotado dentro del workflow de
  GitHub antes de comprobar su tipo y su commit.
- El tag `v0.6.7` permanece como registro inmutable del primer intento, que se
  detuvo antes de publicar artefactos; `v0.6.8` es la primera release preservada.
- Los reintentos dejan de reemplazar assets: sólo aceptan una release existente
  cuando sus cuatro artefactos son idénticos byte por byte.

## v0.6.7 · 2026-08-18

- Normalizado el whitepaper PDF como documento académico A4 blanco, en serif y
  sin el marco oscuro del sitio.
- Añadidas variantes claras de las tres figuras para impresión; la matriz de
  comparabilidad queda sincronizada con v0.4 y NB17–NB21.
- La nota metodológica extensa pasa al final, replegada por defecto en la web y
  desplegada dentro del PDF.
- Incorporada una cadena de preservación con tag anotado, metadata de release,
  manifiestos SHA-256, snapshot reproducible y assets de GitHub Release.
- Documentado el límite entre procedencia técnica, Internet Archive como prueba
  suplementaria y registro administrativo ante la DNDA.

## v0.6.6 · 2026-08-16

- El laboratorio abandona el campo de fecha nativo dependiente del navegador y
  usa explícitamente el formato argentino `DD/MM/AAAA`.
- La fecha se normaliza, se valida contra el calendario y se conserva así en el
  encabezado del resultado.
- El resultado explica que los porcentajes seleccionan la pareja y que la
  dirección se calcula por funciones, no por volumen.
- Nueva cobertura Playwright de fecha, errores de calendario y lectura de la
  flecha en escritorio y móvil.

## v0.6.5 · 2026-08-16

- El breakpoint compacto cubre también tablets hasta 900 px y evita columnas
  de escritorio demasiado estrechas.
- El mapa orbital y sus filtros ya no requieren paneo horizontal en 320 o
  390 px; la navegación de Evidencia se reorganiza como una grilla táctil.
- Las fichas de actores se apilan en móvil, los controles principales alcanzan
  44 px y las tablas que conservan desplazamiento lo anuncian visiblemente.
- Nueva matriz Playwright en 320, 390 y 768 px, repetida antes del release, para
  verificar overflow, navegación, mapa, controles y grillas críticas.

## v0.6.4 · 2026-08-16

- “Empezá acá” deja de explicar la arquitectura interna como una secuencia de
  seis pasos y pregunta directamente qué quiere hacer la persona.
- Cuatro puertas principales: entender la tesis, comparar presidencias, analizar
  un discurso o jugar.
- Evidencia, trazabilidad de Leyendas y whitepaper pasan a una sección secundaria
  para profundizar, sin bloquear el primer uso.
- Nueva composición de tarjetas con jerarquía editorial y adaptación móvil.

## v0.6.3 · 2026-08-16

- “Empezá acá” vuelve visible el videojuego como sexta parada destacada del
  recorrido.
- Añadido un acceso primario directo a la beta pública y un acceso secundario
  a la ficha editorial del videojuego.
- Los dos CTA se apilan a ancho completo en móvil y quedan cubiertos por una
  prueba de navegación repetida en escritorio y móvil.

## v0.6.2 · 2026-08-15

- El laboratorio declara de forma visible que el texto no se envía al servidor
  ni se guarda en el sitio.
- Aclarado que texto y diagnóstico sólo permanecen en la vista y desaparecen al
  recargar o cerrar la página.
- Añadida cobertura Playwright de la promesa de privacidad en escritorio y
  móvil.

## v0.6.1 · 2026-08-15

- Corregido el falso negativo de Mesianismo observado en la apertura
  bonaerense de Axel Kicillof de 2026.
- Añadida una calibración pública y acotada para antagonismo democrático,
  ruptura con la resignación y futuro colectivo, manteniendo 20 patrones por
  cuerpo.
- La polaridad MES ya no trata la condena de un antagonista como rechazo del
  vector cuando la voz del documento adopta esa construcción.
- Completada la función canónica de los veinte patrones MES y recalculada la
  nube de 52 referencias con el mismo motor v0.1.1.
- Retirada la descarga JSON del diagnóstico personal; se conservan impresión,
  evidencia visible y procesamiento local.

## v0.6.0 · 2026-08-15

- Publicado el laboratorio orbital para analizar textos políticos enteramente
  en el navegador, sin subirlos ni almacenarlos.
- Portados el registro simétrico de 60 señales, la lectura contextual y la
  agregación funcional del pipeline canónico a un motor JavaScript auditable.
- Añadidos pesos TEC/MES/PAT, configuración dirigida o indeterminada, mapa
  ternario, fragmentos explicativos y tres referencias diagnósticas cercanas.
- Reprocesados los 52 documentos HCDN con la misma capa automática, sin publicar
  sus textos fuente ni confundir esa referencia con el mapa v0.4 adjudicado.
- Documentada la frontera entre aperturas/asunciones comparables y géneros de
  campaña exploratorios, junto con límites, precisión conocida y trazabilidad.
- Incorporados controles unitarios y Playwright para carga `.txt`/`.md`,
  descarga sin texto original, XSS, validación, accesibilidad y responsive.

## v0.5.0 · 2026-08-15

- Publicadas quince fichas de trazabilidad de Leyendas con puntaje anterior y
  vigente, alcance histórico, regla T1, evidencia por cuerpo, fuentes y cautela.
- Incorporados un recorrido inicial y búsqueda transversal de actores,
  Leyendas y secciones.
- La portada reduce siete CTA equivalentes a dos entradas principales y enlaces
  secundarios; Actores enlaza ahora cada Leyenda con su ficha.
- Sincronizada toda la superficie visible con `v0.52 beta.13` y 227 tests del
  juego; reemplazadas capturas obsoletas por imágenes del build vigente.
- El whitepaper se carga bajo demanda y la caída de datos opcionales ya no
  derriba toda la publicación.
- Habilitada la indexación pública con canonical, datos estructurados, sitemap,
  robots, manifest y páginas de entrada indexables.
- Corregidos el SVG orbital interactivo y el contraste de las familias
  civilizatorias; agregados controles axe, responsive y de overflow.
- Añadido gate de CI con validación del contrato T1, Playwright desktop/móvil y
  smoke posterior al despliegue.

## v0.4.6 · 2026-08-14

- Sincronizada la vista Videojuego con `v0.52.0-beta.13` después del ajuste
  responsive del cierre de Leyenda.
- No cambian corpus, puntajes, fuentes ni traducción metodológica.

## v0.4.5 · 2026-08-14

- Sincronizada la vista Videojuego con `v0.52.0-beta.12` y su fecha pública.
- El CTA, encabezado, ficha reproducible y documento de frontera dejan de
  presentar `v0.49 beta` como la versión jugable actual.
- Los textos auxiliares hablan de la beta pública sin fijar un número para
  evitar divergencias futuras respecto de `game_meta.json`.

## v0.4.4 · 2026-08-11

- Incorporado Perón como actor medido en un bloque histórico propio, anterior
  a los actores HCDN por orden cronológico.
- Preservada la separación metodológica: 1946 y 1954 usan una pipeline y una
  escala distintas; 1973 permanece bloqueado por falta de fuente verificable.
- Actualizado el encabezado a once personas medidas y dos pipelines, sin sumar
  a Perón como punto numéricamente comparable del mapa democrático.

## v0.4.3 · 2026-08-11

- Reemplazada la fotografía documental de Rodríguez Saá por un retrato
  ilustrado original coherente con la serie visual de las quince Leyendas.
- Retirados de la tarjeta el tratamiento excepcional y la atribución visual
  que rompían la gramática de la pestaña.
- Conservada la distinción conceptual: tiene retrato como actor del corpus,
  pero no se lo presenta como Leyenda jugable.

## v0.4.2 · 2026-08-11

- Incorporado un retrato documental de Adolfo Rodríguez Saá en su ficha del
  corpus, sin presentarlo como Leyenda jugable.
- Añadidas atribución, fuente y licencia CC BY 2.0 visibles y trazables.

## v0.4.1 · 2026-08-11

- Corregidas las fichas de Actores y Leyendas: ahora usan quince retratos WebP
  editoriales independientes y no rutas hacia el runtime privado del juego.

## v0.4.0 · 2026-08-11

- Aplicado el instrumento funcional simétrico a 1.048 señales de 52 documentos
  y doce unidades `actor × mandato`.
- Publicados polaridad, función, posición, LODO y 2.000 remuestreos por unidad.
- Promovido el mapa orbital v0.4: cinco cambios de notación y ninguna alteración
  de pareja respecto de v0.3.
- Actualizados whitepaper, mapa, metodología, codebook, datos y sitio doctrinario.
- Documentado que los codificadores locales y la primera pasada automática no
  alcanzan para sustituir la réplica humana independiente.
- Corregida y propagada la ventana presidencial de Rodríguez Saá; 58 matches
  legislativos ajenos quedan excluidos.
- El videojuego y sus coeficientes permanecen explícitamente fuera del bump.

- Aclarado que la beta web del videojuego es pública, pero su repositorio de
  implementación y su código permanecen privados y bajo derechos reservados.
- Dominios canónicos fijados en `lore.trescuerpos.arcagaucha.com` para la
  investigación y `trescuerpos.arcagaucha.com` para el videojuego.
- Documentadas las guardas DNS que preservan el correo de Arca Gaucha.
- GitHub de la autora elevado por encima de LinkedIn en las superficies de
  contacto del sitio y la documentación vigente.

## v0.2.0 · 2026-08-09

- Primera publicación autónoma del repositorio de investigación.
- Separación del videojuego y eliminación del build v0.42 embebido.
- Sitio, whitepaper, método, figuras y datos derivados en un paquete de publicación liviano.
- Puente editorial actualizado a la beta v0.49 del juego.
- Caveats de evidencia y licencias diferenciadas preservados.
