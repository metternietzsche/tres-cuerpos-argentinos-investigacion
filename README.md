# El problema de los tres cuerpos argentinos

**Sitio doctrinario y publicación v0.2.0**  
**Autora:** Alexandra Bustos Frati, PhD  
**Estado empírico:** provisional; no apto todavía para cita académica formal

**Dominio canónico:** `https://lore.trescuerpos.arcagaucha.com`

Proyecto de investigación que mapea configuraciones político-epistémicas en los
discursos presidenciales de la democracia argentina (1983–2025) mediante análisis
computacional de texto.

La hipótesis central es que la política argentina no oscila limpiamente entre dos
polos. **Tecnocracia, Mesianismo y Paternalismo** gravitan al mismo tiempo. La
metáfora orbital funciona como heurística de lectura, no como ley física aplicada
a la política.

## Hallazgos provisionales

- 86% de los documentos democráticos muestran Tecnocracia + Paternalismo como
  configuración primaria y secundaria;
- la configuración modal es Paternalismo + Tecnocracia: 25 documentos, 49% del
  corpus y siete actores;
- Milei aparece provisionalmente como Tecnocracia + Mesianismo con `n=2`;
- los dos documentos limpios de Perón (1946 y 1954) muestran Mesianismo dominante
  y Paternalismo secundario.

> Los perfiles de actor son hipótesis, no clasificaciones definitivas. El corpus
> HCDN v0.1 reúne 51 documentos y todavía no está autorizado para cita académica
> formal.

## Abrir el sitio

```bash
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000/web/static_prototype/`.

## Estructura

```text
.
├── README.md
├── LICENSE.md
├── CITATION.cff
├── docs/                 # whitepaper, método, evidencia y mapa orbital
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

- [LinkedIn](https://www.linkedin.com/in/lexbustosfrati/)
- [GitHub](https://github.com/metternietzsche)
- [Substack](https://alexandrabustosfrati.substack.com)
- [ResearchGate](https://www.researchgate.net/profile/Alexandra-Bustos-Frati)
