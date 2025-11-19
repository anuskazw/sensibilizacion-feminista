/**
 * Modelos para filtros de búsqueda
 */

import { ContentType, RecursoSubtipo } from './content.model';

/**
 * Opciones de ordenamiento
 */
export type SortOption = 'titulo_asc' | 'titulo_desc' | 'anio_asc' | 'anio_desc' | 'fecha_publicacion';

/**
 * Filtros aplicables a los contenidos
 */
export interface ContentFilters {
  // Búsqueda por texto
  searchText?: string;
  
  // Filtros por tipo
  tipos?: ContentType[];
  
  // Filtros por hashtags (IDs)
  hashtagIds?: string[];
  
  // Filtros por año
  anioDesde?: number;
  anioHasta?: number;
  
  // Filtros específicos de recursos
  recursoSubtipos?: RecursoSubtipo[];
  
  // Ordenamiento
  sortBy?: SortOption;
  
  // Idioma actual para búsqueda
  currentLanguage?: string;
}

/**
 * Resultado de búsqueda
 */
export interface SearchResult<T> {
  items: T[];
  totalCount: number;
  filteredCount: number;
  appliedFilters: ContentFilters;
}

