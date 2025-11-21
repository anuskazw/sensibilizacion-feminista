import { ImageSrcSet } from '../directives/lazy-image.directive';

/**
 * Utilidad para generar srcset dinámicamente a partir de una URL base
 * 
 * @param baseUrl URL base de la imagen
 * @param widths Array de anchos en píxeles para generar diferentes tamaños
 * @returns Array de objetos ImageSrcSet con src y width
 * 
 * @example
 * const srcset = generateSrcSet('https://example.com/image.jpg', [320, 640, 1024, 1920]);
 * // Retorna: [
 * //   { src: 'https://example.com/image.jpg?w=320', width: 320 },
 * //   { src: 'https://example.com/image.jpg?w=640', width: 640 },
 * //   ...
 * // ]
 */
export function generateSrcSet(baseUrl: string, widths: number[]): ImageSrcSet[] {
  return widths.map(width => ({
    src: `${baseUrl}?w=${width}`,
    width
  }));
}

/**
 * Genera un string srcset a partir de una URL base y anchos
 * 
 * @param baseUrl URL base de la imagen
 * @param widths Array de anchos en píxeles
 * @returns String srcset formateado
 * 
 * @example
 * const srcset = generateSrcSetString('https://example.com/image.jpg', [320, 640, 1024]);
 * // Retorna: 'https://example.com/image.jpg?w=320 320w, https://example.com/image.jpg?w=640 640w, ...'
 */
export function generateSrcSetString(baseUrl: string, widths: number[]): string {
  return generateSrcSet(baseUrl, widths)
    .map(item => `${item.src} ${item.width}w`)
    .join(', ');
}

/**
 * Genera un atributo sizes apropiado para imágenes responsivas
 * 
 * @param breakpoints Array de objetos con media query y tamaño
 * @param defaultSize Tamaño por defecto
 * @returns String sizes formateado
 * 
 * @example
 * const sizes = generateSizes(
 *   [{ media: '(max-width: 768px)', size: '100vw' }],
 *   '50vw'
 * );
 * // Retorna: '(max-width: 768px) 100vw, 50vw'
 */
export function generateSizes(
  breakpoints: Array<{ media: string; size: string }>,
  defaultSize: string = '100vw'
): string {
  const sizes = breakpoints
    .map(bp => `(${bp.media}) ${bp.size}`)
    .join(', ');
  
  return sizes ? `${sizes}, ${defaultSize}` : defaultSize;
}

/**
 * Anchos estándar para imágenes responsivas
 */
export const STANDARD_IMAGE_WIDTHS = [320, 640, 768, 1024, 1280, 1920];

/**
 * Breakpoints estándar para responsive images
 */
export const STANDARD_BREAKPOINTS = [
  { media: 'max-width: 640px', size: '100vw' },
  { media: 'max-width: 1024px', size: '50vw' },
  { media: 'min-width: 1025px', size: '33vw' }
];

