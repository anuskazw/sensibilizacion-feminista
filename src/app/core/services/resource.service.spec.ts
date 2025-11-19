/**
 * Pruebas unitarias para ResourceService
 * US-005 Ticket 03
 */

import { TestBed } from '@angular/core/testing';
import { ResourceService, RecursoFilters, InstitucionFilters } from './resource.service';
import { RecursoContent, TestimonioContent, InstitucionContent, Hashtag } from '../models/content.model';

describe('ResourceService', () => {
  let service: ResourceService;

  // Datos de prueba
  const mockHashtag: Hashtag = {
    id: 'ht-001',
    nombre: 'Feminismo',
    slug: 'feminismo',
    descripcion: 'Tag de feminismo'
  };

  const mockLibro: RecursoContent = {
    id: 'rec-001',
    slug: 'el-segundo-sexo',
    tipo: 'recurso',
    subtipo: 'libro',
    titulo: { 
      es: 'El segundo sexo',
      en: 'The Second Sex'
    },
    descripcion: { 
      es: 'Libro sobre feminismo',
      en: 'Book about feminism'
    },
    descripcion_lectura_facil: { 
      es: 'Un libro importante sobre las mujeres',
      en: 'An important book about women'
    },
    autor: 'Simone de Beauvoir',
    anio: 1949,
    isbn: '978-0307277787',
    num_ediciones: 10,
    hashtags: [mockHashtag],
    activo: true,
    fecha_publicacion: new Date('2025-01-01')
  };

  const mockPelicula: RecursoContent = {
    id: 'rec-002',
    slug: 'mujeres-al-borde',
    tipo: 'recurso',
    subtipo: 'pelicula_serie',
    titulo: { 
      es: 'Mujeres al borde de un ataque de nervios',
      en: 'Women on the Verge of a Nervous Breakdown'
    },
    descripcion: { 
      es: 'Película de Almodóvar',
      en: 'Film by Almodóvar'
    },
    descripcion_lectura_facil: { 
      es: 'Una película sobre mujeres',
      en: 'A film about women'
    },
    direccion: 'Pedro Almodóvar',
    anio: 1988,
    duracion: 88,
    hashtags: [mockHashtag],
    activo: true,
    fecha_publicacion: new Date('2025-01-01')
  };

  const mockDocumental: RecursoContent = {
    id: 'rec-003',
    slug: 'she-is-beautiful',
    tipo: 'recurso',
    subtipo: 'documental',
    titulo: { 
      es: 'She is Beautiful When She is Angry',
      en: 'She is Beautiful When She is Angry'
    },
    descripcion: { 
      es: 'Documental sobre feminismo',
      en: 'Documentary about feminism'
    },
    descripcion_lectura_facil: { 
      es: 'Un documental sobre mujeres luchadoras',
      en: 'A documentary about fighting women'
    },
    direccion: 'Mary Dore',
    anio: 2014,
    duracion: 92,
    hashtags: [],
    activo: true,
    fecha_publicacion: new Date('2025-01-01')
  };

  const mockTestimonio: TestimonioContent = {
    id: 'test-001',
    slug: 'testimonio-1',
    tipo: 'testimonio',
    titulo: { 
      es: 'Mi historia de superación',
      en: 'My story of overcoming'
    },
    descripcion: { 
      es: 'Testimonio anónimo',
      en: 'Anonymous testimony'
    },
    descripcion_lectura_facil: { 
      es: 'Una historia de valentía',
      en: 'A story of courage'
    },
    anonimizado: true,
    consentimiento_rgpd: true,
    hashtags: [],
    activo: true,
    fecha_publicacion: new Date('2025-01-01')
  };

  const mockInstitucion: InstitucionContent = {
    id: 'inst-001',
    slug: 'atencion-016',
    tipo: 'institucion',
    titulo: { 
      es: 'Teléfono 016',
      en: '016 Phone'
    },
    descripcion: { 
      es: 'Atención a víctimas de violencia',
      en: 'Support for violence victims'
    },
    descripcion_lectura_facil: { 
      es: 'Teléfono de ayuda gratuito',
      en: 'Free help phone'
    },
    telefono: '016',
    email: 'contacto@016.es',
    web: 'https://violenciagenero.igualdad.gob.es',
    horario: { 
      es: '24 horas, todos los días',
      en: '24 hours, every day'
    },
    ambito: 'nacional',
    hashtags: [],
    activo: true,
    fecha_publicacion: new Date('2025-01-01')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceService]
    });
    service = TestBed.inject(ResourceService);
  });

  afterEach(() => {
    service.clear();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('Carga de datos', () => {
    it('debería cargar recursos correctamente', () => {
      service.loadRecursos([mockLibro, mockPelicula, mockDocumental]);
      
      expect(service.totalRecursos()).toBe(3);
      expect(service.recursos().length).toBe(3);
    });

    it('debería filtrar recursos inactivos al cargar', () => {
      const inactivo = { ...mockLibro, id: 'rec-999', activo: false };
      service.loadRecursos([mockLibro, inactivo]);
      
      expect(service.totalRecursos()).toBe(1);
      expect(service.recursos().find(r => r.id === 'rec-999')).toBeUndefined();
    });

    it('debería cargar testimonios correctamente', () => {
      service.loadTestimonios([mockTestimonio]);
      
      expect(service.totalTestimonios()).toBe(1);
      expect(service.testimonios().length).toBe(1);
    });

    it('debería cargar instituciones correctamente', () => {
      service.loadInstituciones([mockInstitucion]);
      
      expect(service.totalInstituciones()).toBe(1);
      expect(service.instituciones().length).toBe(1);
    });
  });

  describe('Computed signals para subtipos', () => {
    beforeEach(() => {
      service.loadRecursos([mockLibro, mockPelicula, mockDocumental]);
    });

    it('debería computar libros correctamente', () => {
      expect(service.libros().length).toBe(1);
      expect(service.libros()[0].subtipo).toBe('libro');
    });

    it('debería computar películas/series correctamente', () => {
      expect(service.peliculasSeries().length).toBe(1);
      expect(service.peliculasSeries()[0].subtipo).toBe('pelicula_serie');
    });

    it('debería computar documentales correctamente', () => {
      expect(service.documentales().length).toBe(1);
      expect(service.documentales()[0].subtipo).toBe('documental');
    });
  });

  describe('Filtrado de recursos', () => {
    beforeEach(() => {
      service.loadRecursos([mockLibro, mockPelicula, mockDocumental]);
    });

    it('debería filtrar por subtipo', () => {
      const filters: RecursoFilters = { subtipo: 'libro' };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].subtipo).toBe('libro');
    });

    it('debería filtrar por autor', () => {
      const filters: RecursoFilters = { autor: 'Beauvoir' };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].autor).toContain('Beauvoir');
    });

    it('debería filtrar por año específico', () => {
      const filters: RecursoFilters = { anio: 1949 };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].anio).toBe(1949);
    });

    it('debería filtrar por rango de años', () => {
      const filters: RecursoFilters = { 
        anioDesde: 1980,
        anioHasta: 2000
      };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].anio).toBe(1988);
    });

    it('debería filtrar por hashtags', () => {
      const filters: RecursoFilters = { 
        hashtags: ['ht-001']
      };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(2);
    });

    it('debería filtrar por búsqueda de texto en título', () => {
      const filters: RecursoFilters = { 
        busqueda: 'segundo'
      };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe('rec-001');
    });

    it('debería filtrar por búsqueda de texto en descripción', () => {
      const filters: RecursoFilters = { 
        busqueda: 'Almodóvar'
      };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe('rec-002');
    });

    it('debería filtrar por búsqueda de texto en autor', () => {
      const filters: RecursoFilters = { 
        busqueda: 'simone'
      };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].autor).toContain('Simone');
    });

    it('debería combinar múltiples filtros', () => {
      const filters: RecursoFilters = { 
        subtipo: 'libro',
        anioDesde: 1900,
        hashtags: ['ht-001']
      };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].id).toBe('rec-001');
    });

    it('debería buscar en el idioma especificado', () => {
      const filters: RecursoFilters = { 
        busqueda: 'Second Sex'
      };
      const filtered = service.filterRecursos(filters, 'en');
      
      expect(filtered.length).toBe(1);
    });
  });

  describe('Filtrado de instituciones', () => {
    beforeEach(() => {
      const institucionAutonomica: InstitucionContent = {
        ...mockInstitucion,
        id: 'inst-002',
        slug: 'centro-regional',
        ambito: 'autonomico'
      };
      service.loadInstituciones([mockInstitucion, institucionAutonomica]);
    });

    it('debería filtrar por ámbito', () => {
      const filters: InstitucionFilters = { ambito: 'nacional' };
      const filtered = service.filterInstituciones(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].ambito).toBe('nacional');
    });

    it('debería filtrar por búsqueda de texto', () => {
      const filters: InstitucionFilters = { 
        busqueda: '016'
      };
      const filtered = service.filterInstituciones(filters);
      
      expect(filtered.length).toBe(1);
    });

    it('debería buscar en teléfono', () => {
      const filters: InstitucionFilters = { 
        busqueda: '016'
      };
      const filtered = service.filterInstituciones(filters);
      
      expect(filtered.length).toBe(1);
      expect(filtered[0].telefono).toBe('016');
    });
  });

  describe('Búsqueda por slug', () => {
    beforeEach(() => {
      service.loadRecursos([mockLibro]);
      service.loadTestimonios([mockTestimonio]);
      service.loadInstituciones([mockInstitucion]);
    });

    it('debería encontrar recurso por slug', () => {
      const recurso = service.getRecursoBySlug('el-segundo-sexo');
      
      expect(recurso).toBeDefined();
      expect(recurso?.id).toBe('rec-001');
    });

    it('debería retornar undefined si no encuentra recurso', () => {
      const recurso = service.getRecursoBySlug('no-existe');
      
      expect(recurso).toBeUndefined();
    });

    it('debería encontrar testimonio por slug', () => {
      const testimonio = service.getTestimonioBySlug('testimonio-1');
      
      expect(testimonio).toBeDefined();
      expect(testimonio?.id).toBe('test-001');
    });

    it('debería encontrar institución por slug', () => {
      const institucion = service.getInstitucionBySlug('atencion-016');
      
      expect(institucion).toBeDefined();
      expect(institucion?.id).toBe('inst-001');
    });
  });

  describe('Búsqueda de instituciones por IDs', () => {
    beforeEach(() => {
      const institucion2: InstitucionContent = {
        ...mockInstitucion,
        id: 'inst-002',
        slug: 'inst-002'
      };
      service.loadInstituciones([mockInstitucion, institucion2]);
    });

    it('debería retornar instituciones por sus IDs', () => {
      const instituciones = service.getInstitucionesByIds(['inst-001', 'inst-002']);
      
      expect(instituciones.length).toBe(2);
    });

    it('debería retornar array vacío si no hay coincidencias', () => {
      const instituciones = service.getInstitucionesByIds(['no-existe']);
      
      expect(instituciones.length).toBe(0);
    });
  });

  describe('Estadísticas', () => {
    beforeEach(() => {
      service.loadRecursos([mockLibro, mockPelicula, mockDocumental]);
    });

    it('debería retornar estadísticas de recursos por subtipo', () => {
      const stats = service.getRecursosStats();
      
      expect(stats.length).toBe(3);
      expect(stats.find(s => s.subtipo === 'libro')?.count).toBe(1);
      expect(stats.find(s => s.subtipo === 'pelicula_serie')?.count).toBe(1);
      expect(stats.find(s => s.subtipo === 'documental')?.count).toBe(1);
    });

    it('debería retornar lista de autores únicos', () => {
      const autores = service.getAutores();
      
      expect(autores.length).toBeGreaterThan(0);
      expect(autores).toContain('Simone de Beauvoir');
    });

    it('debería retornar lista de años únicos ordenados descendentemente', () => {
      const anios = service.getAnios();
      
      expect(anios.length).toBe(3);
      expect(anios[0]).toBeGreaterThan(anios[anios.length - 1]);
    });
  });

  describe('Ordenamiento', () => {
    beforeEach(() => {
      service.loadRecursos([mockLibro, mockPelicula, mockDocumental]);
    });

    it('debería ordenar por título ascendente', () => {
      const recursos = service.recursos();
      const sorted = service.sortRecursos(recursos, 'titulo', 'asc', 'es');
      
      expect(sorted[0].titulo.es < sorted[1].titulo.es).toBe(true);
    });

    it('debería ordenar por título descendente', () => {
      const recursos = service.recursos();
      const sorted = service.sortRecursos(recursos, 'titulo', 'desc', 'es');
      
      expect(sorted[0].titulo.es > sorted[1].titulo.es).toBe(true);
    });

    it('debería ordenar por año ascendente', () => {
      const recursos = service.recursos();
      const sorted = service.sortRecursos(recursos, 'anio', 'asc');
      
      expect(sorted[0].anio! <= sorted[1].anio!).toBe(true);
    });

    it('debería ordenar por año descendente', () => {
      const recursos = service.recursos();
      const sorted = service.sortRecursos(recursos, 'anio', 'desc');
      
      expect(sorted[0].anio! >= sorted[1].anio!).toBe(true);
    });

    it('debería ordenar por autor', () => {
      const recursos = service.recursos();
      const sorted = service.sortRecursos(recursos, 'autor', 'asc');
      
      // Verificar que los recursos con autor estén ordenados
      const conAutor = sorted.filter(r => r.autor);
      if (conAutor.length > 1) {
        expect(conAutor[0].autor! <= conAutor[1].autor!).toBe(true);
      } else {
        expect(conAutor.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Limpieza de datos', () => {
    it('debería limpiar todos los datos', () => {
      service.loadRecursos([mockLibro]);
      service.loadTestimonios([mockTestimonio]);
      service.loadInstituciones([mockInstitucion]);
      
      expect(service.totalRecursos()).toBe(1);
      expect(service.totalTestimonios()).toBe(1);
      expect(service.totalInstituciones()).toBe(1);
      
      service.clear();
      
      expect(service.totalRecursos()).toBe(0);
      expect(service.totalTestimonios()).toBe(0);
      expect(service.totalInstituciones()).toBe(0);
    });
  });

  describe('Casos edge', () => {
    it('debería manejar recursos sin año', () => {
      const recursoSinAnio = { ...mockLibro, anio: undefined };
      service.loadRecursos([recursoSinAnio]);
      
      const anios = service.getAnios();
      expect(anios.length).toBe(0);
    });

    it('debería manejar recursos sin autor', () => {
      const recursoSinAutor = { ...mockLibro, autor: undefined };
      service.loadRecursos([recursoSinAutor]);
      
      const autores = service.getAutores();
      expect(autores).not.toContain('Simone de Beauvoir');
    });

    it('debería manejar búsqueda con texto vacío', () => {
      service.loadRecursos([mockLibro]);
      
      const filters: RecursoFilters = { busqueda: '' };
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(1);
    });

    it('debería manejar filtros vacíos', () => {
      service.loadRecursos([mockLibro, mockPelicula]);
      
      const filters: RecursoFilters = {};
      const filtered = service.filterRecursos(filters);
      
      expect(filtered.length).toBe(2);
    });
  });
});

