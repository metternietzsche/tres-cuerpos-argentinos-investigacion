# El problema de los tres cuerpos argentinos

**Sitio doctrinario v0.6.1 · mapa empírico v0.4**
**Autora:** Alexandra Bustos Frati, PhD  
**Estado empírico:** provisional; no apto todavía para cita académica formal

**Dominio canónico:** `https://lore.trescuerpos.arcagaucha.com`

Proyecto de investigación que mapea configuraciones político-epistémicas en los
discursos presidenciales de la democracia argentina (1983–2026) mediante una
recalibración funcional simétrica y análisis computacional de texto.

La hipótesis central es que la política argentina no oscila limpiamente entre dos
polos. **Tecnocracia, Mesianismo y Paternalismo** gravitan al mismo tiempo. La
metáfora orbital funciona como heurística de lectura, no como ley física aplicada
a la política.

## Hallazgos provisionales

- 43 de 52 documentos (83%) conservan la pareja Tecnocracia–Paternalismo;
- ninguna de las doce parejas agregadas cambia respecto de v0.3, pero cinco
  relaciones cambian de dirección o pasan a indeterminación explícita;
- Milei aparece provisionalmente como `MES→TEC↺` en un calibrador longitudinal
  de tres aperturas HCDN y cuatro discursos leídos;
- Macri queda `TEC↔PAT`: el remuestreo no autoriza una flecha única;
- los dos documentos limpios de Perón (1946 y 1954) muestran Mesianismo dominante
  y Paternalismo secundario.

> Los perfiles de actor son hipótesis, no clasificaciones definitivas. El corpus
> HCDN v0.4 reúne 52 documentos, 12 unidades actor × mandato y 1.048 señales.
> La automatización es una prueba de estrés: todavía falta réplica humana
> independiente y la clasificación no está autorizada como resultado histórico
> definitivo.

## Qué cambia en v0.4

Cada señal de Tecnocracia, Mesianismo y Paternalismo recibe el mismo instrumento:
polaridad, función y posición. La masa propone la pareja, la función ordena la
relación y la trayectoria limita el agregado. Se publican también LODO sobre
ocho funciones, 2.000 remuestreos por unidad y el diff completo frente a v0.3.

- [Whitepaper v0.4](docs/whitepaper/WHITEPAPER_FULL_DRAFT_v0_4.md)
- [Mapa orbital v0.4](docs/mapa_orbital/v0_4/MAPA_ORBITAL_ARGENTINO_v0_4.md)
- [Metodología v0.2](docs/metodologia/METHOD_PIPELINE_v0_2.md)
- [Codebook simétrico](docs/metodologia/CODEBOOK_FUNCIONAL_SIMETRICO_v0_3.md)

## Qué corrige la publicación v0.6.1

- el caso de control Kicillof 2026 deja de producir un falso `0%` de
  Mesianismo: el motor reconoce antagonismo democrático, ruptura con la
  resignación y futuro colectivo;
- cinco patrones MES reciben extensiones contemporáneas sin alterar la
  simetría de 20 patrones por cuerpo;
- las 52 referencias automáticas se recalculan con el mismo motor v0.1.1;
- el diagnóstico ya no ofrece una descarga JSON: permanece en pantalla y puede
  imprimirse.

## Qué agregó la publicación v0.6

- laboratorio orbital para pegar o abrir localmente un texto político y
  explorar sus señales TEC/MES/PAT;
- procesamiento íntegro dentro del navegador: el texto no se sube ni se
  almacena y el diagnóstico permanece en la vista;
- ubicación ternaria, evidencia por fragmento y comparación diagnóstica con 52
  discursos procesados por la misma capa automática;
- separación explícita entre géneros comparables HCDN y lecturas exploratorias
  de campaña, debate, entrevista o programa;
- motor y referencia versionados, validación unitaria y pruebas Playwright de
  archivos, XSS, ausencia de descarga, accesibilidad y resultado móvil.

- [Laboratorio orbital](https://lore.trescuerpos.arcagaucha.com/laboratorio.html)
- [Contrato metodológico del analizador](docs/metodologia/ORBITAL_TEXT_ANALYZER_v0_1.md)

## Qué agregó la publicación v0.5

- recorrido guiado para una primera lectura;
- búsqueda transversal de secciones, actores y Leyendas;
- quince fichas que explican el alcance, las fuentes, la cautela y la regla
  detrás de cada puntaje jugable;
- traducción lúdica v0.2 publicada como JSON auditable, sin presentar la
  estrella como coeficiente histórico;
- carga tolerante a fallas, whitepaper bajo demanda, imágenes optimizadas y
  metadatos para buscadores;
- validación estática y matriz Playwright desktop/móvil como gate previo al
  despliegue.

- [Trazabilidad de Leyendas](data_public/legend_gameplay_translation.v0.2.json)
- [Método de traducción lúdica](docs/videojuego/legend-methodology-v0.2.md)

## Abrir el sitio

```bash
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000/web/static_prototype/`.

Para ejecutar el gate completo:

```bash
npm install
npm test
```

## Estructura

```text
.
├── README.md
├── LICENSE.md
├── CITATION.cff
├── docs/                 # whitepaper, método, codebook, evidencia y mapa orbital
├── figures/              # figuras empíricas promovidas
├── data_public/          # derivados públicos seleccionados
└── web/static_prototype/ # sitio doctrinario estático
```

El juego se despliega por separado como
[beta web jugable](https://trescuerpos.arcagaucha.com/).
Su código permanece en un repositorio privado y bajo todos los derechos
reservados. Esa separación evita que una construcción lúdica se presente como
evidencia o que el acceso al juego implique una licencia sobre su código.

## Licencia y cita

Los textos, el whitepaper, el mapa y las figuras explicativas se publican bajo
CC BY-NC 4.0. Código, marca, logo, datasets y materiales de terceros conservan
las excepciones detalladas en [LICENSE.md](LICENSE.md).

La cita estructurada está en [CITATION.cff](CITATION.cff).

La configuración del dominio está documentada en
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Contacto

- [GitHub](https://github.com/metternietzsche)
- [LinkedIn](https://www.linkedin.com/in/lexbustosfrati/)
- [Substack](https://alexandrabustosfrati.substack.com)
- [ResearchGate](https://www.researchgate.net/profile/Alexandra-Bustos-Frati)
