/**
 * Modelo para definir meta tags SEO por página e idioma
 */
export interface PageMetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

/**
 * Meta tags multiidioma para una página
 */
export interface MultilingualPageMetaTags {
  [lang: string]: PageMetaTags;
}

/**
 * Configuración SEO para cada ruta de la aplicación
 */
export interface RouteSEOConfig {
  route: string;
  metaTags: MultilingualPageMetaTags;
}

