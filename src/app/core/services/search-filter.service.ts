import { Injectable, signal, computed } from '@angular/core';
import { 
  Content, 
  BaseContent, 
  Hashtag,
  ContentType 
} from '../models/content.model';
import { 
  ContentFilters, 
  SearchResult, 
  SortOption 
} from '../models/filter.model';

/**
 * Servicio de búsqueda y filtrado de contenidos
 * Implementa búsqueda fuzzy, filtros combinables y sinónimos básicos
 */
@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {
  // Señales reactivas para el estado del filtro
  private currentFilters = signal<ContentFilters>({});
  private allContents = signal<Content[]>([]);
  
  // Diccionario de sinónimos básicos (puede expandirse)
  private synonyms: Record<string, string[]> = {
    'mujer': ['femenino', 'mujeres', 'fémina'],
    'violencia': ['agresión', 'maltrato', 'abuso'],
    'igualdad': ['equidad', 'paridad'],
    'feminismo': ['feminista', 'movimiento feminista'],
    'discriminación': ['discriminar', 'prejuicio', 'sesgo'],
    'patriarcado': ['patriarcal', 'machismo', 'androcentrismo'],
    'sororidad': ['hermandad', 'solidaridad femenina'],
    'empoderamiento': ['empoderar', 'autonomía'],
  };

  /**
   * Establece los contenidos a filtrar
   */
  setContents(contents: Content[]): void {
    this.allContents.set(contents);
  }

  /**
   * Obtiene los contenidos actuales
   */
  getContents(): Content[] {
    return this.allContents();
  }

  /**
   * Actualiza los filtros
   */
  updateFilters(filters: Partial<ContentFilters>): void {
    this.currentFilters.update(current => ({
      ...current,
      ...filters
    }));
  }

  /**
   * Limpia todos los filtros
   */
  clearFilters(): void {
    this.currentFilters.set({});
  }

  /**
   * Obtiene los filtros actuales
   */
  getCurrentFilters(): ContentFilters {
    return this.currentFilters();
  }

  /**
   * Realiza la búsqueda y filtrado con los filtros actuales
   */
  search(filters?: ContentFilters): SearchResult<Content> {
    const appliedFilters = filters || this.currentFilters();
    const contents = this.allContents();
    
    let filtered = [...contents];

    // Filtrar por tipo
    if (appliedFilters.tipos && appliedFilters.tipos.length > 0) {
      filtered = filtered.filter(content => 
        appliedFilters.tipos!.includes(content.tipo)
      );
    }

    // Filtrar por texto con búsqueda fuzzy y sinónimos
    if (appliedFilters.searchText && appliedFilters.searchText.trim()) {
      const searchTerms = this.expandSearchTerms(appliedFilters.searchText);
      const lang = appliedFilters.currentLanguage || 'es';
      
      filtered = filtered.filter(content => 
        this.matchesSearchText(content, searchTerms, lang)
      );
    }

    // Filtrar por hashtags
    if (appliedFilters.hashtagIds && appliedFilters.hashtagIds.length > 0) {
      filtered = filtered.filter(content =>
        this.hasAnyHashtag(content, appliedFilters.hashtagIds!)
      );
    }

    // Filtrar por año
    if (appliedFilters.anioDesde !== undefined || appliedFilters.anioHasta !== undefined) {
      filtered = filtered.filter(content =>
        this.matchesYearRange(content, appliedFilters.anioDesde, appliedFilters.anioHasta)
      );
    }

    // Filtrar por subtipo de recurso
    if (appliedFilters.recursoSubtipos && appliedFilters.recursoSubtipos.length > 0) {
      filtered = filtered.filter(content =>
        content.tipo === 'recurso' && 
        appliedFilters.recursoSubtipos!.includes((content as any).subtipo)
      );
    }

    // Ordenar resultados
    if (appliedFilters.sortBy) {
      filtered = this.sortContents(filtered, appliedFilters.sortBy, appliedFilters.currentLanguage || 'es');
    }

    return {
      items: filtered,
      totalCount: contents.length,
      filteredCount: filtered.length,
      appliedFilters
    };
  }

  /**
   * Expande los términos de búsqueda con sinónimos
   */
  private expandSearchTerms(searchText: string): string[] {
    const terms = searchText.toLowerCase().trim().split(/\s+/);
    const expanded = new Set<string>(terms);

    terms.forEach(term => {
      // Buscar sinónimos
      Object.entries(this.synonyms).forEach(([key, values]) => {
        if (key === term || values.includes(term)) {
          expanded.add(key);
          values.forEach(v => expanded.add(v));
        }
      });
    });

    return Array.from(expanded);
  }

  /**
   * Verifica si un contenido coincide con los términos de búsqueda
   * Implementa búsqueda fuzzy tolerante a errores
   */
  private matchesSearchText(content: BaseContent, searchTerms: string[], lang: string): boolean {
    const titulo = (content.titulo[lang as keyof typeof content.titulo] || content.titulo.es || '').toLowerCase();
    const descripcion = (content.descripcion[lang as keyof typeof content.descripcion] || content.descripcion.es || '').toLowerCase();
    const descripcionFacil = (content.descripcion_lectura_facil[lang as keyof typeof content.descripcion_lectura_facil] || 
                              content.descripcion_lectura_facil.es || '').toLowerCase();
    
    const searchableText = `${titulo} ${descripcion} ${descripcionFacil}`;
    
    // Buscar coincidencia de todos los términos
    return searchTerms.some(term => {
      // Búsqueda exacta
      if (searchableText.includes(term)) {
        return true;
      }
      
      // Búsqueda fuzzy: permite 1-2 caracteres de diferencia
      const words = searchableText.split(/\s+/);
      return words.some(word => this.fuzzyMatch(word, term));
    });
  }

  /**
   * Implementa búsqueda fuzzy simple usando distancia de Levenshtein simplificada
   */
  private fuzzyMatch(word: string, term: string): boolean {
    // Si la palabra es muy corta, solo coincidencia exacta
    if (term.length < 4) {
      return word === term;
    }

    // Permitir hasta 2 caracteres de diferencia
    const maxDistance = Math.min(2, Math.floor(term.length / 4));
    return this.levenshteinDistance(word, term) <= maxDistance;
  }

  /**
   * Calcula la distancia de Levenshtein entre dos strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const m = str1.length;
    const n = str2.length;
    
    if (m === 0) return n;
    if (n === 0) return m;
    
    const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,      // deletion
          dp[i][j - 1] + 1,      // insertion
          dp[i - 1][j - 1] + cost // substitution
        );
      }
    }
    
    return dp[m][n];
  }

  /**
   * Verifica si un contenido tiene alguno de los hashtags especificados
   */
  private hasAnyHashtag(content: BaseContent, hashtagIds: string[]): boolean {
    return content.hashtags.some(tag => hashtagIds.includes(tag.id));
  }

  /**
   * Verifica si un contenido está dentro del rango de años
   */
  private matchesYearRange(content: BaseContent, anioDesde?: number, anioHasta?: number): boolean {
    if (!content.anio) return false;
    
    const matchesDesde = anioDesde === undefined || content.anio >= anioDesde;
    const matchesHasta = anioHasta === undefined || content.anio <= anioHasta;
    
    return matchesDesde && matchesHasta;
  }

  /**
   * Ordena los contenidos según el criterio especificado
   */
  private sortContents(contents: Content[], sortBy: SortOption, lang: string): Content[] {
    const sorted = [...contents];
    
    switch (sortBy) {
      case 'titulo_asc':
        return sorted.sort((a, b) => {
          const titleA = a.titulo[lang as keyof typeof a.titulo] || a.titulo.es || '';
          const titleB = b.titulo[lang as keyof typeof b.titulo] || b.titulo.es || '';
          return titleA.localeCompare(titleB);
        });
      
      case 'titulo_desc':
        return sorted.sort((a, b) => {
          const titleA = a.titulo[lang as keyof typeof a.titulo] || a.titulo.es || '';
          const titleB = b.titulo[lang as keyof typeof b.titulo] || b.titulo.es || '';
          return titleB.localeCompare(titleA);
        });
      
      case 'anio_asc':
        return sorted.sort((a, b) => (a.anio || 0) - (b.anio || 0));
      
      case 'anio_desc':
        return sorted.sort((a, b) => (b.anio || 0) - (a.anio || 0));
      
      case 'fecha_publicacion':
        return sorted.sort((a, b) => 
          new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime()
        );
      
      default:
        return sorted;
    }
  }

  /**
   * Obtiene todos los hashtags únicos de los contenidos
   */
  getAllHashtags(): Hashtag[] {
    const hashtagMap = new Map<string, Hashtag>();
    
    this.allContents().forEach(content => {
      content.hashtags.forEach(tag => {
        if (!hashtagMap.has(tag.id)) {
          hashtagMap.set(tag.id, tag);
        }
      });
    });
    
    return Array.from(hashtagMap.values()).sort((a, b) => 
      a.nombre.localeCompare(b.nombre)
    );
  }

  /**
   * Obtiene el rango de años disponibles en los contenidos
   */
  getYearRange(): { min: number; max: number } | null {
    const years = this.allContents()
      .map(c => c.anio)
      .filter((year): year is number => year !== undefined);
    
    if (years.length === 0) return null;
    
    return {
      min: Math.min(...years),
      max: Math.max(...years)
    };
  }
}

