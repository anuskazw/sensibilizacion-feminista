/**
 * Servicio para gestión de recursos (libros, películas/series, documentales)
 * y ayudas (testimonios, instituciones)
 * US-005 Ticket 02
 */

import { Injectable, signal, computed } from '@angular/core';
import {
  RecursoContent,
  TestimonioContent,
  InstitucionContent,
  RecursoSubtipo,
  Content
} from '../models/content.model';

/**
 * Filtros para recursos
 */
export interface RecursoFilters {
  subtipo?: RecursoSubtipo;
  autor?: string;
  anio?: number;
  anioDesde?: number;
  anioHasta?: number;
  hashtags?: string[];
  busqueda?: string;
}

/**
 * Filtros para instituciones
 */
export interface InstitucionFilters {
  ambito?: 'nacional' | 'autonomico' | 'local';
  hashtags?: string[];
  busqueda?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  // Señales para almacenar los datos
  private recursosSignal = signal<RecursoContent[]>([]);
  private testimoniosSignal = signal<TestimonioContent[]>([]);
  private institucionesSignal = signal<InstitucionContent[]>([]);

  // Computed signals para acceso público
  readonly recursos = this.recursosSignal.asReadonly();
  readonly testimonios = this.testimoniosSignal.asReadonly();
  readonly instituciones = this.institucionesSignal.asReadonly();

  // Computed signals para estadísticas
  readonly totalRecursos = computed(() => this.recursosSignal().length);
  readonly totalTestimonios = computed(() => this.testimoniosSignal().length);
  readonly totalInstituciones = computed(() => this.institucionesSignal().length);

  // Computed signals para recursos por subtipo
  readonly libros = computed(() => 
    this.recursosSignal().filter(r => r.subtipo === 'libro')
  );
  
  readonly peliculasSeries = computed(() => 
    this.recursosSignal().filter(r => r.subtipo === 'pelicula_serie')
  );
  
  readonly documentales = computed(() => 
    this.recursosSignal().filter(r => r.subtipo === 'documental')
  );

  /**
   * Carga recursos en el servicio
   */
  loadRecursos(recursos: RecursoContent[]): void {
    this.recursosSignal.set(recursos.filter(r => r.activo));
  }

  /**
   * Carga testimonios en el servicio
   */
  loadTestimonios(testimonios: TestimonioContent[]): void {
    this.testimoniosSignal.set(testimonios.filter(t => t.activo));
  }

  /**
   * Carga instituciones en el servicio
   */
  loadInstituciones(instituciones: InstitucionContent[]): void {
    this.institucionesSignal.set(instituciones.filter(i => i.activo));
  }

  /**
   * Filtra recursos según los criterios proporcionados
   */
  filterRecursos(filters: RecursoFilters, lang: string = 'es'): RecursoContent[] {
    let filtered = this.recursosSignal();

    // Filtrar por subtipo
    if (filters.subtipo) {
      filtered = filtered.filter(r => r.subtipo === filters.subtipo);
    }

    // Filtrar por autor
    if (filters.autor) {
      const autorLower = filters.autor.toLowerCase();
      filtered = filtered.filter(r => 
        r.autor?.toLowerCase().includes(autorLower)
      );
    }

    // Filtrar por año específico
    if (filters.anio) {
      filtered = filtered.filter(r => r.anio === filters.anio);
    }

    // Filtrar por rango de años
    if (filters.anioDesde) {
      filtered = filtered.filter(r => !r.anio || r.anio >= filters.anioDesde!);
    }
    if (filters.anioHasta) {
      filtered = filtered.filter(r => !r.anio || r.anio <= filters.anioHasta!);
    }

    // Filtrar por hashtags
    if (filters.hashtags && filters.hashtags.length > 0) {
      filtered = filtered.filter(r =>
        filters.hashtags!.some(hashtagId =>
          r.hashtags.some(h => h.id === hashtagId || h.slug === hashtagId)
        )
      );
    }

    // Búsqueda por texto
    if (filters.busqueda) {
      const searchLower = filters.busqueda.toLowerCase();
      filtered = filtered.filter(r => {
        const titulo = r.titulo[lang as keyof typeof r.titulo] || r.titulo.es || '';
        const descripcion = r.descripcion[lang as keyof typeof r.descripcion] || r.descripcion.es || '';
        const descripcionFacil = r.descripcion_lectura_facil[lang as keyof typeof r.descripcion_lectura_facil] || r.descripcion_lectura_facil.es || '';
        
        return titulo.toLowerCase().includes(searchLower) ||
               descripcion.toLowerCase().includes(searchLower) ||
               descripcionFacil.toLowerCase().includes(searchLower) ||
               (r.autor && r.autor.toLowerCase().includes(searchLower));
      });
    }

    return filtered;
  }

  /**
   * Filtra instituciones según los criterios proporcionados
   */
  filterInstituciones(filters: InstitucionFilters, lang: string = 'es'): InstitucionContent[] {
    let filtered = this.institucionesSignal();

    // Filtrar por ámbito
    if (filters.ambito) {
      filtered = filtered.filter(i => i.ambito === filters.ambito);
    }

    // Filtrar por hashtags
    if (filters.hashtags && filters.hashtags.length > 0) {
      filtered = filtered.filter(i =>
        filters.hashtags!.some(hashtagId =>
          i.hashtags.some(h => h.id === hashtagId || h.slug === hashtagId)
        )
      );
    }

    // Búsqueda por texto
    if (filters.busqueda) {
      const searchLower = filters.busqueda.toLowerCase();
      filtered = filtered.filter(i => {
        const titulo = i.titulo[lang as keyof typeof i.titulo] || i.titulo.es || '';
        const descripcion = i.descripcion[lang as keyof typeof i.descripcion] || i.descripcion.es || '';
        
        return titulo.toLowerCase().includes(searchLower) ||
               descripcion.toLowerCase().includes(searchLower) ||
               (i.telefono && i.telefono.includes(filters.busqueda!)) ||
               (i.email && i.email.toLowerCase().includes(searchLower));
      });
    }

    return filtered;
  }

  /**
   * Obtiene un recurso por su slug
   */
  getRecursoBySlug(slug: string): RecursoContent | undefined {
    return this.recursosSignal().find(r => r.slug === slug);
  }

  /**
   * Obtiene un testimonio por su slug
   */
  getTestimonioBySlug(slug: string): TestimonioContent | undefined {
    return this.testimoniosSignal().find(t => t.slug === slug);
  }

  /**
   * Obtiene una institución por su slug
   */
  getInstitucionBySlug(slug: string): InstitucionContent | undefined {
    return this.institucionesSignal().find(i => i.slug === slug);
  }

  /**
   * Obtiene instituciones por sus IDs (útil para recursos_ayuda en ViolenciaContent)
   */
  getInstitucionesByIds(ids: string[]): InstitucionContent[] {
    return this.institucionesSignal().filter(i => ids.includes(i.id));
  }

  /**
   * Obtiene estadísticas de recursos por subtipo
   */
  getRecursosStats(): { subtipo: RecursoSubtipo; count: number }[] {
    const stats = new Map<RecursoSubtipo, number>();
    
    this.recursosSignal().forEach(r => {
      stats.set(r.subtipo, (stats.get(r.subtipo) || 0) + 1);
    });

    return Array.from(stats.entries()).map(([subtipo, count]) => ({
      subtipo,
      count
    }));
  }

  /**
   * Obtiene todos los autores únicos de libros
   */
  getAutores(): string[] {
    const autores = new Set<string>();
    
    this.recursosSignal()
      .filter(r => r.subtipo === 'libro' && r.autor)
      .forEach(r => autores.add(r.autor!));

    return Array.from(autores).sort();
  }

  /**
   * Obtiene todos los años únicos de recursos
   */
  getAnios(): number[] {
    const anios = new Set<number>();
    
    this.recursosSignal()
      .filter(r => r.anio)
      .forEach(r => anios.add(r.anio!));

    return Array.from(anios).sort((a, b) => b - a); // Orden descendente
  }

  /**
   * Ordena recursos por criterio
   */
  sortRecursos(
    recursos: RecursoContent[],
    sortBy: 'titulo' | 'anio' | 'autor',
    order: 'asc' | 'desc' = 'asc',
    lang: string = 'es'
  ): RecursoContent[] {
    const sorted = [...recursos];

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'titulo':
          const tituloA = a.titulo[lang as keyof typeof a.titulo] || a.titulo.es || '';
          const tituloB = b.titulo[lang as keyof typeof b.titulo] || b.titulo.es || '';
          comparison = tituloA.localeCompare(tituloB);
          break;

        case 'anio':
          comparison = (a.anio || 0) - (b.anio || 0);
          break;

        case 'autor':
          const autorA = a.autor || '';
          const autorB = b.autor || '';
          comparison = autorA.localeCompare(autorB);
          break;
      }

      return order === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }

  /**
   * Limpia todos los datos
   */
  clear(): void {
    this.recursosSignal.set([]);
    this.testimoniosSignal.set([]);
    this.institucionesSignal.set([]);
  }
}

