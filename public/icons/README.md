# Iconos PWA

Este directorio contiene los iconos necesarios para la Progressive Web App (PWA).

## Iconos requeridos

Los siguientes iconos deben estar presentes en este directorio:

- `icon-72x72.png` - 72x72 píxeles
- `icon-96x96.png` - 96x96 píxeles
- `icon-128x128.png` - 128x128 píxeles
- `icon-144x144.png` - 144x144 píxeles
- `icon-152x152.png` - 152x152 píxeles
- `icon-192x192.png` - 192x192 píxeles
- `icon-384x384.png` - 384x384 píxeles
- `icon-512x512.png` - 512x512 píxeles

## Generación de iconos

Para generar los iconos desde un diseño base, puedes usar herramientas como:

1. **Online tools:**
   - [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)

2. **Desde línea de comandos:**
   ```bash
   # Usando ImageMagick (si está instalado)
   convert favicon.ico -resize 192x192 icon-192x192.png
   convert favicon.ico -resize 512x512 icon-512x512.png
   ```

3. **Desde un diseño SVG:**
   - Exporta el SVG a PNG en los tamaños requeridos
   - Asegúrate de que los iconos sean cuadrados y tengan buen contraste

## Nota

Los iconos actuales son placeholders. Reemplázalos con los iconos finales del diseño antes de desplegar a producción.

