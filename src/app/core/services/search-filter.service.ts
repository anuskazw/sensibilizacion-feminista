import { Injectable, signal, computed, inject } from '@angular/core';
import {
  Content,
  BaseContent,
  Hashtag,
  ContentType,
  MultilingualText
} from '../models/content.model';
import {
  ContentFilters,
  SearchResult,
  SortOption
} from '../models/filter.model';
import { AnalyticsService } from './analytics.service';
import { LanguageService } from './language.service';

/**
 * Servicio de búsqueda y filtrado de contenidos
 * Implementa búsqueda fuzzy, filtros combinables y sinónimos avanzados
 * 
 * US-024: Búsqueda avanzada con sinónimos
 * - Diccionario amplio de sinónimos multiidioma
 * - Búsqueda semántica por conceptos relacionados
 * - Sugerencias de búsqueda basadas en términos populares
 * - Funciona en los 6 idiomas soportados (es, en, ca, val, gl, eu)
 */
@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {
  private analyticsService = inject(AnalyticsService);
  private languageService = inject(LanguageService);
  
  // Señales reactivas para el estado del filtro
  private currentFilters = signal<ContentFilters>({});
  private allContents = signal<Content[]>([]);
  
  // Diccionario amplio de sinónimos multiidioma
  // Estructura: término principal -> [sinónimos en todos los idiomas]
  private synonyms: Record<string, string[]> = {
    // Términos principales en español
    'mujer': ['femenino', 'mujeres', 'fémina', 'dona', 'woman', 'women', 'emakume', 'muller'],
    'violencia': ['agresión', 'maltrato', 'abuso', 'violència', 'violence', 'indarkeria', 'violencia'],
    'violencia de género': ['violencia machista', 'violencia doméstica', 'violència de gènere', 'gender violence', 'genero indarkeria'],
    'igualdad': ['equidad', 'paridad', 'igualtat', 'equality', 'berdintasuna', 'igualdade'],
    'feminismo': ['feminista', 'movimiento feminista', 'feminisme', 'feminism', 'feminismoa', 'feminismo'],
    'discriminación': ['discriminar', 'prejuicio', 'sesgo', 'discriminació', 'discrimination', 'diskriminazioa', 'discriminación'],
    'patriarcado': ['patriarcal', 'machismo', 'androcentrismo', 'patriarcat', 'patriarchy', 'patriarkatua', 'patriarcado'],
    'androcentrismo': ['androcentrismo', 'androcentrico', 'androcentrica', 'androcentrisme', 'androcentrism', 'androzentrismoa'],
    'sororidad': ['hermandad', 'solidaridad femenina', 'sororitat', 'sisterhood', 'ahizpatasuna', 'irmandade'],
    'empoderamiento': ['empoderar', 'autonomía', 'empoderament', 'empowerment', 'boteretzea', 'empoderamento'],
    'derechos': ['derechos humanos', 'derechos de la mujer', 'drets', 'rights', 'eskubideak', 'dereitos'],
    'lucha': ['lucha feminista', 'movimiento', 'lluita', 'fight', 'borroka', 'loita'],
    'género': ['género', 'sexo', 'gènere', 'gender', 'generoa', 'xénero'],
    'estereotipo': ['estereotipos', 'prejuicios', 'estereotip', 'stereotype', 'estereotipoa', 'estereotipo'],
    'machismo': ['machista', 'sexismo', 'masclisme', 'machismo', 'machismoa', 'machismo'],
    'micromachismo': ['micromachismos', 'micromasclisme', 'micromachismo', 'micromachismoa'],
    'techo de cristal': ['barrera invisible', 'glass ceiling', 'sostre de vidre', 'kristalezko sabai'],
    'brecha salarial': ['diferencia salarial', 'gender pay gap', 'bretxa salarial', 'ordainsarteko aldea'],
    'conciliación': ['conciliación familiar', 'work-life balance', 'conciliació', 'konziliazioa'],
    'acoso': ['acoso sexual', 'acoso laboral', 'assetjament', 'harassment', 'jazarpena', 'acoso'],
    'violencia sexual': ['agresión sexual', 'violación', 'violència sexual', 'sexual violence', 'sexu indarkeria'],
    'violencia psicológica': ['maltrato psicológico', 'violència psicològica', 'psychological violence', 'psikologiko indarkeria'],
    'violencia económica': ['maltrato económico', 'violència econòmica', 'economic violence', 'ekonomiko indarkeria'],
    'feminicidio': ['asesinato de mujeres', 'feminicidi', 'femicide', 'emakumeen hilketa'],
    'interseccionalidad': ['interseccional', 'interseccionalitat', 'intersectionality', 'interseccionalitatea'],
    'diversidad': ['diversidad de género', 'diversitat', 'diversity', 'aniztasuna', 'diversidade'],
    'inclusión': ['inclusivo', 'inclusió', 'inclusion', 'inklusioa', 'inclusión'],
    'transfeminismo': ['transfeminista', 'transfeminisme', 'transfeminism', 'transfeminismoa'],
    'ecofeminismo': ['ecofeminista', 'ecofeminisme', 'ecofeminism', 'ekofeminismoa'],
    'autocuidado': ['cuidado personal', 'autocura', 'self-care', 'auto-zaintza'],
    'consentimiento': ['consent', 'consentiment', 'baimena', 'consentimento'],
    'educación': ['educación feminista', 'educació', 'education', 'hezkuntza', 'educación'],
    'historia': ['historia feminista', 'història', 'history', 'historia', 'historia'],
    'concepto': ['conceptos feministas', 'concepte', 'concept', 'kontzeptua', 'concepto'],
    'recurso': ['recursos', 'recurs', 'resource', 'baliabidea', 'recurso'],
    'testimonio': ['testimonios', 'testimoni', 'testimony', 'testigantza', 'testemuño'],
    'institución': ['instituciones', 'institució', 'institution', 'erakundea', 'institución'],
  };

  // Conceptos relacionados (para búsqueda semántica)
  private relatedConcepts: Record<string, string[]> = {
    'violencia': ['violencia de género', 'violencia doméstica', 'violencia sexual', 'violencia psicológica', 'violencia económica', 'acoso', 'feminicidio'],
    'feminismo': ['sororidad', 'empoderamiento', 'igualdad', 'derechos', 'lucha', 'movimiento feminista'],
    'igualdad': ['equidad', 'paridad', 'derechos', 'brecha salarial', 'techo de cristal', 'conciliación'],
    'discriminación': ['estereotipo', 'prejuicio', 'machismo', 'micromachismo', 'sexismo'],
    'patriarcado': ['androcentrismo', 'machismo', 'patriarcal', 'sexismo'],
    'mujer': ['derechos', 'empoderamiento', 'sororidad', 'violencia de género', 'igualdad'],
    'derechos': ['igualdad', 'derechos humanos', 'derechos de la mujer', 'lucha', 'feminismo'],
    'educación': ['concepto', 'historia', 'feminismo', 'igualdad', 'diversidad'],
    'diversidad': ['inclusión', 'interseccionalidad', 'transfeminismo', 'igualdad'],
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

    // Trackear búsqueda si hay texto de búsqueda o filtros aplicados
    if (appliedFilters.searchText || appliedFilters['hashtagIds']?.length || 
        appliedFilters['anioDesde'] !== undefined || appliedFilters['anioHasta'] !== undefined) {
      const filters: Record<string, any> = {};
      if (appliedFilters['hashtagIds']?.length) filters['hashtagIds'] = appliedFilters['hashtagIds'];
      if (appliedFilters['anioDesde'] !== undefined) filters['anioDesde'] = appliedFilters['anioDesde'];
      if (appliedFilters['anioHasta'] !== undefined) filters['anioHasta'] = appliedFilters['anioHasta'];
      if (appliedFilters['tipos']?.length) filters['tipos'] = appliedFilters['tipos'];
      
      this.analyticsService.trackSearch(
        appliedFilters.searchText || '',
        filtered.length,
        Object.keys(filters).length > 0 ? filters : undefined
      );
    }

    return {
      items: filtered,
      totalCount: contents.length,
      filteredCount: filtered.length,
      appliedFilters
    };
  }

  /**
   * Expande los términos de búsqueda con sinónimos y conceptos relacionados
   * Implementa búsqueda semántica mejorada
   */
  private expandSearchTerms(searchText: string): string[] {
    const normalizedText = searchText.toLowerCase().trim();
    const terms = normalizedText.split(/\s+/);
    const expanded = new Set<string>(terms);

    // Agregar el texto completo normalizado para búsquedas de frases
    if (terms.length > 1) {
      expanded.add(normalizedText);
    }

    // Buscar sinónimos para cada término individual
    terms.forEach(term => {
      // Buscar sinónimos exactos
      Object.entries(this.synonyms).forEach(([key, values]) => {
        if (key === term || values.includes(term)) {
          expanded.add(key);
          values.forEach(v => expanded.add(v));
        }
      });

      // Búsqueda parcial en sinónimos (para términos compuestos)
      Object.entries(this.synonyms).forEach(([key, values]) => {
        if (key.includes(term) || term.includes(key)) {
          expanded.add(key);
          values.forEach(v => expanded.add(v));
        }
        values.forEach(synonym => {
          if (synonym.includes(term) || term.includes(synonym)) {
            expanded.add(key);
            values.forEach(v => expanded.add(v));
          }
        });
      });
    });

    // Buscar conceptos relacionados para el texto completo o términos clave
    const fullText = normalizedText;
    Object.entries(this.relatedConcepts).forEach(([concept, related]) => {
      if (fullText.includes(concept) || terms.some(t => t === concept)) {
        // Agregar el concepto principal y sus relacionados
        expanded.add(concept);
        related.forEach(relatedConcept => {
          expanded.add(relatedConcept);
          // También agregar sinónimos de los conceptos relacionados
          if (this.synonyms[relatedConcept]) {
            this.synonyms[relatedConcept].forEach(syn => expanded.add(syn));
          }
        });
      }
    });

    return Array.from(expanded);
  }

  /**
   * Verifica si un contenido coincide con los términos de búsqueda
   * Implementa búsqueda fuzzy tolerante a errores y búsqueda semántica mejorada
   */
  private matchesSearchText(content: BaseContent, searchTerms: string[], lang: string): boolean {
    const titulo = (content.titulo[lang as keyof typeof content.titulo] || content.titulo.es || '').toLowerCase();
    const descripcion = (content.descripcion[lang as keyof typeof content.descripcion] || content.descripcion.es || '').toLowerCase();
    const descripcionFacil = (content.descripcion_lectura_facil[lang as keyof typeof content.descripcion_lectura_facil] || 
                              content.descripcion_lectura_facil.es || '').toLowerCase();
    
    // Incluir hashtags en la búsqueda para mejorar resultados semánticos
    const hashtagsText = content.hashtags.map(h => {
      const lang = this.languageService.getCurrentLanguage();
      return (h.nombre[lang as keyof MultilingualText] || h.nombre.es).toLowerCase();
    }).join(' ');
    
    const searchableText = `${titulo} ${descripcion} ${descripcionFacil} ${hashtagsText}`;
    
    // Si hay coincidencia exacta en el título, siempre retornar true (prioridad alta)
    const titleMatch = searchTerms.some(term => {
      // Coincidencia exacta en el título
      if (titulo === term || titulo.includes(term) || term.includes(titulo)) {
        return true;
      }
      // Coincidencia fuzzy en el título
      const titleWords = titulo.split(/\s+/);
      return titleWords.some(word => this.fuzzyMatch(word, term));
    });
    
    if (titleMatch) {
      return true;
    }
    
    // Contar coincidencias para mejorar la relevancia
    let matchCount = 0;
    // Para términos únicos o pocos términos, requerir al menos 1 coincidencia
    // Para muchos términos expandidos, requerir al menos 30% pero mínimo 1
    const minMatches = searchTerms.length <= 3 
      ? 1 
      : Math.max(1, Math.ceil(searchTerms.length * 0.3));
    
    for (const term of searchTerms) {
      // Búsqueda exacta
      if (searchableText.includes(term)) {
        matchCount++;
        continue;
      }
      
      // Búsqueda fuzzy: permite 1-2 caracteres de diferencia
      const words = searchableText.split(/\s+/);
      if (words.some(word => this.fuzzyMatch(word, term))) {
        matchCount++;
        continue;
      }
      
      // Búsqueda parcial para términos compuestos
      if (term.length > 4 && searchableText.includes(term.substring(0, Math.max(4, term.length - 2)))) {
        matchCount++;
      }
    }
    
    // Retornar true si hay suficientes coincidencias
    return matchCount >= minMatches;
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
    
    const lang = this.languageService.getCurrentLanguage();
    return Array.from(hashtagMap.values()).sort((a, b) =>
      (a.nombre[lang as keyof MultilingualText] || a.nombre.es).localeCompare(
        b.nombre[lang as keyof MultilingualText] || b.nombre.es
      )
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

  /**
   * Obtiene sugerencias de búsqueda basadas en términos populares y conceptos relacionados
   * Implementa US-024: Búsqueda avanzada con sinónimos
   */
  getSearchSuggestions(query: string = '', limit: number = 10): string[] {
    const suggestions = new Set<string>();
    const normalizedQuery = query.toLowerCase().trim();

    // 1. Obtener búsquedas más frecuentes del analytics
    const popularSearches = this.analyticsService.getMostFrequentSearches(limit * 2);
    popularSearches.forEach(search => {
      if (search.query.toLowerCase().includes(normalizedQuery) || normalizedQuery === '') {
        suggestions.add(search.query);
      }
    });

    // 2. Sugerir sinónimos y conceptos relacionados si hay una consulta
    if (normalizedQuery) {
      const queryTerms = normalizedQuery.split(/\s+/);
      
      queryTerms.forEach(term => {
        // Buscar sinónimos
        Object.entries(this.synonyms).forEach(([key, values]) => {
          if (key === term || values.includes(term) || key.includes(term) || term.includes(key)) {
            suggestions.add(key);
            // Agregar algunos sinónimos relevantes
            values.slice(0, 3).forEach(syn => suggestions.add(syn));
          }
        });

        // Buscar conceptos relacionados
        Object.entries(this.relatedConcepts).forEach(([concept, related]) => {
          if (concept.includes(term) || term.includes(concept)) {
            suggestions.add(concept);
            related.slice(0, 3).forEach(rel => suggestions.add(rel));
          }
        });
      });
    }

    // 3. Sugerir términos comunes del diccionario si no hay consulta o hay pocas sugerencias
    if (suggestions.size < limit && normalizedQuery === '') {
      const commonTerms = [
        'feminismo', 'violencia', 'igualdad', 'derechos', 'mujer',
        'sororidad', 'empoderamiento', 'discriminación', 'patriarcado'
      ];
      commonTerms.forEach(term => suggestions.add(term));
    }

    // 4. Extraer términos únicos de los contenidos (hashtags y títulos comunes)
    if (suggestions.size < limit) {
      const contents = this.allContents();
      const termFrequency: Record<string, number> = {};

      contents.forEach(content => {
        // Agregar hashtags
        content.hashtags.forEach(tag => {
          const lang = this.languageService.getCurrentLanguage();
          const tagName = (tag.nombre[lang as keyof MultilingualText] || tag.nombre.es).toLowerCase();
          termFrequency[tagName] = (termFrequency[tagName] || 0) + 1;
        });

        // Agregar palabras clave de títulos
        const title = (content.titulo.es || '').toLowerCase();
        title.split(/\s+/).forEach(word => {
          if (word.length > 4 && !this.isStopWord(word)) {
            termFrequency[word] = (termFrequency[word] || 0) + 1;
          }
        });
      });

      // Agregar términos más frecuentes
      Object.entries(termFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit - suggestions.size)
        .forEach(([term]) => {
          if (normalizedQuery === '' || term.includes(normalizedQuery)) {
            suggestions.add(term);
          }
        });
    }

    return Array.from(suggestions)
      .filter(s => s.length > 0)
      .slice(0, limit);
  }

  /**
   * Verifica si una palabra es una palabra vacía (stop word) común
   */
  private isStopWord(word: string): boolean {
    const stopWords = [
      'para', 'por', 'con', 'del', 'las', 'los', 'una', 'uno', 'que', 'está',
      'para', 'por', 'con', 'del', 'las', 'los', 'una', 'uno', 'que', 'está',
      'the', 'and', 'for', 'with', 'from', 'that', 'this', 'are', 'was', 'were',
      'per', 'amb', 'del', 'les', 'els', 'una', 'un', 'que', 'està',
      'para', 'polo', 'co', 'do', 'das', 'dos', 'unha', 'un', 'que', 'está'
    ];
    return stopWords.includes(word.toLowerCase());
  }

  /**
   * Obtiene términos relacionados para una consulta de búsqueda
   * Útil para mostrar "Búsquedas relacionadas" o "También buscaste"
   */
  getRelatedSearchTerms(query: string, limit: number = 5): string[] {
    const related = new Set<string>();
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) return [];

    // Buscar conceptos relacionados
    Object.entries(this.relatedConcepts).forEach(([concept, relatedTerms]) => {
      if (normalizedQuery.includes(concept) || concept.includes(normalizedQuery)) {
        relatedTerms.forEach(term => {
          if (term !== normalizedQuery) {
            related.add(term);
          }
        });
      }
    });

    // Buscar sinónimos que no sean el término exacto
    Object.entries(this.synonyms).forEach(([key, values]) => {
      if (normalizedQuery === key || values.includes(normalizedQuery)) {
        values.forEach(syn => {
          if (syn !== normalizedQuery) {
            related.add(syn);
          }
        });
      }
    });

    return Array.from(related).slice(0, limit);
  }
}

