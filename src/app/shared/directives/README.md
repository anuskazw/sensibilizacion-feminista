# Directivas de Optimización de Rendimiento

Este directorio contiene directivas para optimizar el rendimiento de imágenes y vídeos mediante lazy loading y responsive images.

## Directivas Disponibles

### LazyImageDirective

Directiva para cargar imágenes de forma diferida (lazy loading) con soporte para `srcset` y `sizes` para imágenes responsivas.

#### Uso básico:

```html
<img 
  appLazyImage="https://example.com/image.jpg" 
  alt="Descripción de la imagen" 
/>
```

#### Uso con srcset (array de objetos):

```html
<img 
  appLazyImage="https://example.com/image.jpg"
  [srcset]="[
    { src: 'https://example.com/image.jpg?w=320', width: 320 },
    { src: 'https://example.com/image.jpg?w=640', width: 640 },
    { src: 'https://example.com/image.jpg?w=1024', width: 1024 }
  ]"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Imagen responsiva" 
/>
```

#### Uso con srcset (string):

```html
<img 
  appLazyImage="https://example.com/image.jpg"
  srcset="image-320.jpg 320w, image-640.jpg 640w, image-1024.jpg 1024w"
  sizes="(max-width: 640px) 100vw, 50vw"
  alt="Imagen responsiva" 
/>
```

#### Uso con placeholder:

```html
<img 
  appLazyImage="https://example.com/image.jpg"
  placeholder="https://example.com/placeholder.jpg"
  alt="Imagen con placeholder" 
/>
```

#### Parámetros:

- `appLazyImage` (string, requerido): URL principal de la imagen
- `srcset` (ImageSrcSet[] | string, opcional): Array de objetos con src y width, o string con srcset formateado
- `sizes` (string, opcional): Atributo sizes para imágenes responsivas
- `placeholder` (string, opcional): URL de imagen placeholder
- `rootMargin` (string, opcional, default: '50px'): Margen para IntersectionObserver

### LazyVideoDirective

Directiva para cargar vídeos de forma diferida (lazy loading).

#### Uso básico:

```html
<video 
  appLazyVideo="https://example.com/video.mp4"
  controls
>
  Tu navegador no soporta el elemento de vídeo.
</video>
```

#### Uso con preload:

```html
<video 
  appLazyVideo="https://example.com/video.mp4"
  [preload]="'metadata'"
  controls
>
  Tu navegador no soporta el elemento de vídeo.
</video>
```

#### Parámetros:

- `appLazyVideo` (string, requerido): URL del vídeo
- `preload` ('none' | 'metadata' | 'auto', opcional, default: 'none'): Nivel de precarga del vídeo
- `rootMargin` (string, opcional, default: '100px'): Margen para IntersectionObserver

## Utilidades

### image-optimization.util.ts

Utilidades para generar `srcset` y `sizes` dinámicamente.

#### Ejemplo de uso:

```typescript
import { generateSrcSet, generateSrcSetString, STANDARD_IMAGE_WIDTHS } from './shared/utils/image-optimization.util';

// Generar srcset como array
const srcsetArray = generateSrcSet('https://example.com/image.jpg', [320, 640, 1024]);

// Generar srcset como string
const srcsetString = generateSrcSetString('https://example.com/image.jpg', STANDARD_IMAGE_WIDTHS);
```

## Características

- ✅ Lazy loading automático usando IntersectionObserver
- ✅ Fallback para navegadores sin soporte de IntersectionObserver
- ✅ Soporte para SSR (Server-Side Rendering)
- ✅ Soporte completo para imágenes responsivas (srcset y sizes)
- ✅ Placeholder automático para evitar layout shift
- ✅ Manejo de errores de carga
- ✅ Configuración flexible de márgenes para IntersectionObserver

## Notas de Rendimiento

- Las imágenes se cargan cuando están a 50px del viewport por defecto
- Los vídeos se cargan cuando están a 100px del viewport por defecto
- Se usa un placeholder SVG transparente de 1x1px para evitar layout shift si no se proporciona un placeholder personalizado
- El lazy loading mejora significativamente el FID (First Input Delay) y el LCP (Largest Contentful Paint)

