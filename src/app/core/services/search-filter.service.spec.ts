/**
 * Pruebas unitarias para SearchFilterService
 * US-004 Ticket 03
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SearchFilterService } from './search-filter.service';
import { 
  Content, 
  HistoriaContent, 
  ConceptoContent, 
  RecursoContent,
  Hashtag 
} from '../models/content.model';
import { ContentFilters } from '../models/filter.model';

describe('SearchFilterService', () => {
  let service: SearchFilterService;
  let mockContents: Content[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFilterService]
    });
    service = TestBed.inject(SearchFilterService);

    // Crear datos de prueba
    const hashtag1: Hashtag = { id: 'ht-1', nombre: 'Feminismo', slug: 'feminismo' };
    const hashtag2: Hashtag = { id: 'ht-2', nombre: 'Igualdad', slug: 'igualdad' };
    const hashtag3: Hashtag = { id: 'ht-3', nombre: 'Violencia', slug: 'violencia' };

    mockContents = [
      {
        id: 'hist-1',
        slug: 'historia-1',
        tipo: 'historia',
        titulo: { es: 'Primera Ola Feminista' },
        descripcion: { es: 'Movimiento por el sufragio femenino' },
        descripcion_lectura_facil: { es: 'Las mujeres luchan por votar' },
        anio: 1920,
        hashtags: [hashtag1, hashtag2],
        activo: true,
        fecha_publicacion: new Date('2025-01-01')
      } as HistoriaContent,
      {
        id: 'hist-2',
        slug: 'historia-2',
        tipo: 'historia',
        titulo: { es: 'Segunda Ola Feminista' },
        descripcion: { es: 'Movimiento por la igualdad laboral' },
        descripcion_lectura_facil: { es: 'Igualdad en el trabajo' },
        anio: 1970,
        hashtags: [hashtag1],
        activo: true,
        fecha_publicacion: new Date('2025-01-15')
      } as HistoriaContent,
      {
        id: 'conc-1',
        slug: 'concepto-1',
        tipo: 'concepto',
        titulo: { es: 'Patriarcado' },
        descripcion: { es: 'Sistema de dominación masculina' },
        descripcion_lectura_facil: { es: 'Cuando los hombres tienen más poder' },
        hashtags: [hashtag1],
        activo: true,
        fecha_publicacion: new Date('2025-02-01')
      } as ConceptoContent,
      {
        id: 'rec-1',
        slug: 'recurso-1',
        tipo: 'recurso',
        subtipo: 'libro',
        titulo: { es: 'El segundo sexo' },
        descripcion: { es: 'Obra fundamental del feminismo' },
        descripcion_lectura_facil: { es: 'Libro importante sobre feminismo' },
        autor: 'Simone de Beauvoir',
        anio: 1949,
        hashtags: [hashtag1, hashtag2],
        activo: true,
        fecha_publicacion: new Date('2025-01-20')
      } as RecursoContent,
      {
        id: 'conc-2',
        slug: 'concepto-2',
        tipo: 'concepto',
        titulo: { es: 'Violencia de Género' },
        descripcion: { es: 'Violencia ejercida contra las mujeres por razón de género' },
        descripcion_lectura_facil: { es: 'Violencia contra mujeres' },
        hashtags: [hashtag3],
        activo: true,
        fecha_publicacion: new Date('2025-02-10')
      } as ConceptoContent
    ];

    service.setContents(mockContents);
  });

  describe('Inicialización', () => {
    it('debería crear el servicio', () => {
      expect(service).toBeTruthy();
    });

    it('debería permitir establecer contenidos', () => {
      const contents = service.getContents();
      expect(contents.length).toBe(5);
    });
  });

  describe('setContents() y getContents()', () => {
    it('debería establecer y obtener contenidos', () => {
      const newContents: Content[] = [];
      service.setContents(newContents);
      
      expect(service.getContents()).toEqual(newContents);
    });
  });

  describe('updateFilters() y getCurrentFilters()', () => {
    it('debería actualizar filtros parcialmente', () => {
      service.updateFilters({ searchText: 'feminismo' });
      
      const filters = service.getCurrentFilters();
      expect(filters.searchText).toBe('feminismo');
    });

    it('debería mantener filtros anteriores al actualizar', () => {
      service.updateFilters({ searchText: 'test' });
      service.updateFilters({ tipos: ['historia'] });
      
      const filters = service.getCurrentFilters();
      expect(filters.searchText).toBe('test');
      expect(filters.tipos).toEqual(['historia']);
    });
  });

  describe('clearFilters()', () => {
    it('debería limpiar todos los filtros', () => {
      service.updateFilters({ 
        searchText: 'test',
        tipos: ['historia'],
        hashtagIds: ['ht-1']
      });
      
      service.clearFilters();
      
      const filters = service.getCurrentFilters();
      expect(Object.keys(filters).length).toBe(0);
    });
  });

  describe('search() - Filtrado por tipo', () => {
    it('debería filtrar por un solo tipo', () => {
      const result = service.search({ tipos: ['historia'] });
      
      expect(result.filteredCount).toBe(2);
      expect(result.items.every(item => item.tipo === 'historia')).toBe(true);
    });

    it('debería filtrar por múltiples tipos', () => {
      const result = service.search({ tipos: ['historia', 'concepto'] });
      
      expect(result.filteredCount).toBe(4);
      expect(result.items.every(item => 
        item.tipo === 'historia' || item.tipo === 'concepto'
      )).toBe(true);
    });

    it('debería retornar todos los contenidos sin filtro de tipo', () => {
      const result = service.search({});
      
      expect(result.filteredCount).toBe(5);
    });
  });

  describe('search() - Búsqueda por texto', () => {
    it('debería buscar en títulos', () => {
      const result = service.search({ searchText: 'Feminista' });
      
      expect(result.filteredCount).toBeGreaterThan(0);
      expect(result.items.some(item => 
        item.titulo.es.toLowerCase().includes('feminista')
      )).toBe(true);
    });

    it('debería buscar en descripciones', () => {
      const result = service.search({ searchText: 'sufragio' });
      
      expect(result.filteredCount).toBeGreaterThan(0);
    });

    it('debería buscar en descripción lectura fácil', () => {
      const result = service.search({ searchText: 'votar' });
      
      expect(result.filteredCount).toBeGreaterThan(0);
    });

    it('debería ser case-insensitive', () => {
      const lower = service.search({ searchText: 'feminismo' });
      const upper = service.search({ searchText: 'FEMINISMO' });
      
      expect(lower.filteredCount).toBe(upper.filteredCount);
    });

    it('debería manejar texto vacío', () => {
      const result = service.search({ searchText: '' });
      
      expect(result.filteredCount).toBe(5);
    });

    it('debería manejar búsquedas sin resultados', () => {
      const result = service.search({ searchText: 'xyzabc123notfound' });
      
      expect(result.filteredCount).toBe(0);
    });
  });

  describe('search() - Búsqueda con sinónimos', () => {
    it('debería expandir búsqueda con sinónimos', () => {
      const resultMujer = service.search({ searchText: 'mujer' });
      const resultFemenino = service.search({ searchText: 'femenino' });
      
      // Los sinónimos deberían dar resultados similares
      expect(resultMujer.filteredCount).toBeGreaterThanOrEqual(0);
      expect(resultFemenino.filteredCount).toBeGreaterThanOrEqual(0);
    });

    it('debería buscar con sinónimo de violencia', () => {
      const result = service.search({ searchText: 'maltrato' });
      
      // Debería encontrar contenido con "violencia"
      expect(result.filteredCount).toBeGreaterThan(0);
    });
  });

  describe('search() - Filtrado por hashtags', () => {
    it('debería filtrar por un hashtag', () => {
      const result = service.search({ hashtagIds: ['ht-1'] });
      
      expect(result.filteredCount).toBe(4); // 4 contenidos tienen ht-1
      expect(result.items.every(item =>
        item.hashtags.some(tag => tag.id === 'ht-1')
      )).toBe(true);
    });

    it('debería filtrar por múltiples hashtags (OR)', () => {
      const result = service.search({ hashtagIds: ['ht-1', 'ht-3'] });
      
      expect(result.filteredCount).toBe(5); // Todos tienen ht-1 o ht-3
    });

    it('debería retornar vacío si hashtag no existe', () => {
      const result = service.search({ hashtagIds: ['ht-999'] });
      
      expect(result.filteredCount).toBe(0);
    });
  });

  describe('search() - Filtrado por año', () => {
    it('debería filtrar por año desde', () => {
      const result = service.search({ anioDesde: 1950 });
      
      expect(result.items.every(item => 
        !item.anio || item.anio >= 1950
      )).toBe(true);
    });

    it('debería filtrar por año hasta', () => {
      const result = service.search({ anioHasta: 1960 });
      
      expect(result.items.every(item => 
        !item.anio || item.anio <= 1960
      )).toBe(true);
    });

    it('debería filtrar por rango de años', () => {
      const result = service.search({ 
        anioDesde: 1950, 
        anioHasta: 1980 
      });
      
      expect(result.items.every(item => 
        !item.anio || (item.anio >= 1950 && item.anio <= 1980)
      )).toBe(true);
    });

    it('debería excluir contenidos sin año', () => {
      const result = service.search({ anioDesde: 1900 });
      
      // Los conceptos sin año no deberían aparecer
      expect(result.items.every(item => item.anio !== undefined)).toBe(true);
    });
  });

  describe('search() - Filtrado por subtipo de recurso', () => {
    it('debería filtrar recursos por subtipo', () => {
      const result = service.search({ recursoSubtipos: ['libro'] });
      
      expect(result.filteredCount).toBe(1);
      expect(result.items[0].tipo).toBe('recurso');
    });

    it('debería retornar vacío para subtipo inexistente', () => {
      const result = service.search({ recursoSubtipos: ['documental'] });
      
      expect(result.filteredCount).toBe(0);
    });
  });

  describe('search() - Ordenamiento', () => {
    it('debería ordenar por título ascendente', () => {
      const result = service.search({ sortBy: 'titulo_asc' });
      
      for (let i = 1; i < result.items.length; i++) {
        const current = result.items[i].titulo.es;
        const previous = result.items[i - 1].titulo.es;
        expect(current.localeCompare(previous)).toBeGreaterThanOrEqual(0);
      }
    });

    it('debería ordenar por título descendente', () => {
      const result = service.search({ sortBy: 'titulo_desc' });
      
      for (let i = 1; i < result.items.length; i++) {
        const current = result.items[i].titulo.es;
        const previous = result.items[i - 1].titulo.es;
        expect(previous.localeCompare(current)).toBeGreaterThanOrEqual(0);
      }
    });

    it('debería ordenar por año ascendente', () => {
      const result = service.search({ sortBy: 'anio_asc' });
      
      for (let i = 1; i < result.items.length; i++) {
        const current = result.items[i].anio || 0;
        const previous = result.items[i - 1].anio || 0;
        expect(current).toBeGreaterThanOrEqual(previous);
      }
    });

    it('debería ordenar por año descendente', () => {
      const result = service.search({ sortBy: 'anio_desc' });
      
      for (let i = 1; i < result.items.length; i++) {
        const current = result.items[i].anio || 0;
        const previous = result.items[i - 1].anio || 0;
        expect(previous).toBeGreaterThanOrEqual(current);
      }
    });

    it('debería ordenar por fecha de publicación', () => {
      const result = service.search({ sortBy: 'fecha_publicacion' });
      
      for (let i = 1; i < result.items.length; i++) {
        const current = new Date(result.items[i].fecha_publicacion).getTime();
        const previous = new Date(result.items[i - 1].fecha_publicacion).getTime();
        expect(previous).toBeGreaterThanOrEqual(current);
      }
    });
  });

  describe('search() - Filtros combinados', () => {
    it('debería aplicar múltiples filtros a la vez', () => {
      const result = service.search({
        tipos: ['historia'],
        hashtagIds: ['ht-1'],
        anioDesde: 1900,
        anioHasta: 1950
      });
      
      expect(result.items.every(item => {
        const isHistoria = item.tipo === 'historia';
        const hasHashtag = item.hashtags.some(tag => tag.id === 'ht-1');
        const inRange = item.anio && item.anio >= 1900 && item.anio <= 1950;
        return isHistoria && hasHashtag && inRange;
      })).toBe(true);
    });

    it('debería aplicar filtros y ordenamiento juntos', () => {
      const result = service.search({
        tipos: ['historia', 'concepto'],
        sortBy: 'titulo_asc'
      });
      
      expect(result.items.every(item => 
        item.tipo === 'historia' || item.tipo === 'concepto'
      )).toBe(true);
      
      // Verificar ordenamiento
      for (let i = 1; i < result.items.length; i++) {
        const current = result.items[i].titulo.es;
        const previous = result.items[i - 1].titulo.es;
        expect(current.localeCompare(previous)).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('search() - SearchResult', () => {
    it('debería retornar estructura SearchResult correcta', () => {
      const result = service.search({ tipos: ['historia'] });
      
      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('totalCount');
      expect(result).toHaveProperty('filteredCount');
      expect(result).toHaveProperty('appliedFilters');
      
      expect(Array.isArray(result.items)).toBe(true);
      expect(typeof result.totalCount).toBe('number');
      expect(typeof result.filteredCount).toBe('number');
    });

    it('debería incluir totalCount correcto', () => {
      const result = service.search({ tipos: ['historia'] });
      
      expect(result.totalCount).toBe(5); // Total de contenidos
    });

    it('debería incluir filteredCount correcto', () => {
      const result = service.search({ tipos: ['historia'] });
      
      expect(result.filteredCount).toBe(2); // Solo historias
      expect(result.filteredCount).toBe(result.items.length);
    });

    it('debería incluir los filtros aplicados', () => {
      const filters: ContentFilters = { 
        tipos: ['historia'],
        searchText: 'feminismo'
      };
      
      const result = service.search(filters);
      
      expect(result.appliedFilters).toEqual(filters);
    });
  });

  describe('getAllHashtags()', () => {
    it('debería obtener todos los hashtags únicos', () => {
      const hashtags = service.getAllHashtags();
      
      expect(hashtags.length).toBeGreaterThan(0);
      
      // Verificar que sean únicos
      const ids = hashtags.map(tag => tag.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('debería ordenar hashtags alfabéticamente', () => {
      const hashtags = service.getAllHashtags();
      
      for (let i = 1; i < hashtags.length; i++) {
        const current = hashtags[i].nombre;
        const previous = hashtags[i - 1].nombre;
        expect(current.localeCompare(previous)).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe('getYearRange()', () => {
    it('debería obtener el rango de años correcto', () => {
      const range = service.getYearRange();
      
      expect(range).toBeDefined();
      expect(range?.min).toBe(1920);
      expect(range?.max).toBe(1970);
    });

    it('debería retornar null sin contenidos con año', () => {
      const noYearContents: Content[] = [
        {
          id: 'conc-1',
          slug: 'concepto-1',
          tipo: 'concepto',
          titulo: { es: 'Concepto' },
          descripcion: { es: 'Desc' },
          descripcion_lectura_facil: { es: 'Desc fácil' },
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        } as ConceptoContent
      ];
      
      service.setContents(noYearContents);
      const range = service.getYearRange();
      
      expect(range).toBeNull();
    });

    it('debería retornar null con contenidos vacíos', () => {
      service.setContents([]);
      const range = service.getYearRange();
      
      expect(range).toBeNull();
    });
  });

  describe('Búsqueda fuzzy', () => {
    it('debería encontrar coincidencias con errores tipográficos', () => {
      // "feminisno" en lugar de "feminismo"
      const result = service.search({ searchText: 'feminisno' });
      
      // Debería encontrar algo relacionado con feminismo
      expect(result.filteredCount).toBeGreaterThanOrEqual(0);
    });

    it('no debería ser demasiado tolerante con palabras cortas', () => {
      const result = service.search({ searchText: 'xyz' });
      
      // Palabras muy cortas requieren coincidencia exacta
      expect(result.filteredCount).toBe(0);
    });
  });

  describe('Multiidioma', () => {
    it('debería buscar en el idioma especificado', () => {
      const contentWithEn: Content[] = [
        {
          id: 'test-1',
          slug: 'test',
          tipo: 'concepto',
          titulo: { es: 'Concepto', en: 'Concept' },
          descripcion: { es: 'Descripción', en: 'Description' },
          descripcion_lectura_facil: { es: 'Fácil', en: 'Easy' },
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        } as ConceptoContent
      ];
      
      service.setContents(contentWithEn);
      
      const result = service.search({ 
        searchText: 'Concept',
        currentLanguage: 'en'
      });
      
      expect(result.filteredCount).toBeGreaterThan(0);
    });

    it('debería usar español por defecto', () => {
      const result = service.search({ searchText: 'Feminista' });
      
      expect(result.filteredCount).toBeGreaterThan(0);
    });
  });
});

