# Procedencia y preservación de releases

Este repositorio conserva la procedencia técnica de la publicación **El problema
de los tres cuerpos argentinos**, de Alexandra Bustos Frati, PhD. El sistema
permite demostrar qué archivos integraron cada versión pública y detectar
cualquier modificación posterior.

Esta cadena es evidencia técnica acumulativa. No se presenta como registro
formal de derecho de autor ni reemplaza los trámites que correspondan ante la
Dirección Nacional del Derecho de Autor (DNDA).

## Cadena de preservación

Cada release estable debe reunir:

1. un commit identificado;
2. un tag Git anotado `vX.Y.Z` que apunte a ese commit;
3. `RELEASE_METADATA.json`, con autoría, versión, fecha, commit, URL canónica y
   alcance del snapshot;
4. `SHA256SUMS`, con la huella de cada archivo público;
5. un archivo reproducible `tres-cuerpos-lore-vX.Y.Z-public.tar.gz`;
6. una huella SHA-256 separada del archivo completo;
7. una GitHub Release que conserve esos cuatro artefactos.

El archivo contiene solamente `web/static_prototype/` —es decir, los materiales
ya servidos por el sitio Lore— y copias sin cambios de `LICENSE.md` y
`CITATION.cff`. No incorpora el repositorio privado ni el código fuente del
videojuego. La licencia vigente y todas sus excepciones se preservan literalmente.

## Construcción y verificación

```bash
npm run build
npm test
npm run release:build
npm run release:verify
```

El empaquetado fija orden, propietario y fecha de los archivos a partir del
commit. Dos ejecuciones sobre el mismo tag y las mismas herramientas producen el
mismo archivo. El workflow `Preserve public release` repite los tests, exige un
tag anotado y adjunta los artefactos verificables a la release correspondiente.

Para verificar un archivo descargado:

```bash
sha256sum -c tres-cuerpos-lore-vX.Y.Z-public.tar.gz.sha256
mkdir snapshot
tar -xzf tres-cuerpos-lore-vX.Y.Z-public.tar.gz -C snapshot
cd snapshot
sha256sum -c SHA256SUMS
```

## Capas de evidencia

- **Git y tag anotado:** identidad de la revisión y continuidad del historial.
- **SHA-256:** integridad exacta de archivos y archivo completo.
- **GitHub Release:** publicación fechada de los artefactos congelados.
- **Dominio canónico:** versión actualmente servida.
- **Copia externa y backup privado:** supervivencia frente a una caída de
  GitHub o del hosting.
- **Internet Archive:** corroboración pública suplementaria; nunca se describe
  como registro de copyright.
- **DNDA:** capa administrativa separada que requiere intervención personal de
  la autora.

Los tags y los timestamps de plataformas pueden ser eliminados o reescritos; por
eso ninguno se usa aisladamente. La fuerza de la cadena proviene de la
coincidencia entre commit, tag, manifest, archivo, release y copias externas.

## Regla de actualización

- Todo cambio público posterior requiere una nueva versión y un nuevo tag.
- Nunca se reemplaza silenciosamente un archivo de una release existente.
- Una corrección produce un release nuevo; la versión anterior permanece.
- `CITATION.cff`, `site_meta.json`, `package.json`, `CHANGELOG.md` y el
  manifiesto público deben indicar la misma versión.
- La firma criptográfica del tag se agrega cuando la autora configure una clave
  de firma. La ausencia de firma se declara; no se simula.

La preparación administrativa específica se documenta en
[`docs/releases/DNDA_DEPOSIT_v0.6.7.md`](docs/releases/DNDA_DEPOSIT_v0.6.7.md).
