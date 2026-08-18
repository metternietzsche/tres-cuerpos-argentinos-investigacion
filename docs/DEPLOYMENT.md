# Dominio de la investigación

## Destino

- Sitio canónico: `https://lore.trescuerpos.arcagaucha.com`.
- Origen: GitHub Pages del repositorio público
  `tres-cuerpos-argentinos-investigacion`.
- URL de respaldo:
  `https://metternietzsche.github.io/tres-cuerpos-argentinos-investigacion/`.

## DNS en Hostinger

Configurar el dominio personalizado en GitHub Pages y agregar:

| Tipo | Nombre | Destino | TTL |
|---|---|---|---|
| `CNAME` | `lore.trescuerpos` | `metternietzsche.github.io` | predeterminado |

No modificar `NS`, `MX`, SPF, DKIM ni DMARC. El correo
`info@arcagaucha.com` debe permanecer en Hostinger.

## Verificación

1. GitHub Pages y su certificado HTTPS quedan activos.
2. El dominio canónico devuelve HTTP 200.
3. CSS, JavaScript, datos y figuras devuelven HTTP 200.
4. La navegación hacia el juego usa `https://trescuerpos.arcagaucha.com`.
5. `info@arcagaucha.com` continúa enviando y recibiendo correo.
6. `robots.txt`, `sitemap.xml`, `manifest.webmanifest` y las 37 páginas
   prerenderizadas responden HTTP 200; su HTML inicial contiene un H1 único,
   navegación, texto documental, enlaces y metadata específica.
7. `laboratorio.html`, `orbital-analyzer.js` y sus dos registros JSON responden
   HTTP 200; un texto de muestra se analiza sin iniciar requests nuevos.
8. El workflow ejecuta validación estática, tests unitarios, matriz Playwright
   desktop/móvil y smoke de producción antes de dar el despliegue por cerrado.
