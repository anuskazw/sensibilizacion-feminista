/**
 * Pruebas unitarias para los modelos de contenido
 * US-004 Ticket 03
 */

import { describe, it, expect } from 'vitest';
import { 
  ContentType, 
  MultilingualText, 
  Hashtag, 
  Reference,
  BaseContent,
  HistoriaContent,
  ConceptoContent,
  ViolenciaContent,
  RecursoContent,
  RecursoSubtipo,
  TestimonioContent,
  InstitucionContent
} from './content.model';

describe('Content Models', () => {
  
  describe('ContentType', () => {
    it('debería contener todos los tipos de contenido válidos', () => {
      const validTypes: ContentType[] = [
        'historia',
        'concepto',
        'violencia',
        'recurso',
        'testimonio',
        'institucion'
      ];
      
      validTypes.forEach(type => {
        expect(type).toBeDefined();
      });
    });
  });

  describe('MultilingualText', () => {
    it('debería permitir crear texto solo en español (requerido)', () => {
      const text: MultilingualText = {
        es: 'Texto en español'
      };
      
      expect(text.es).toBe('Texto en español');
      expect(text.en).toBeUndefined();
    });

    it('debería permitir texto en múltiples idiomas', () => {
      const text: MultilingualText = {
        es: 'Español',
        en: 'English',
        ca: 'Català',
        val: 'Valencià',
        gl: 'Galego',
        eu: 'Euskera'
      };
      
      expect(text.es).toBe('Español');
      expect(text.en).toBe('English');
      expect(text.ca).toBe('Català');
      expect(text.val).toBe('Valencià');
      expect(text.gl).toBe('Galego');
      expect(text.eu).toBe('Euskera');
    });
  });

  describe('Hashtag', () => {
    it('debería crear un hashtag válido', () => {
      const hashtag: Hashtag = {
        id: 'ht-001',
        nombre: { es: 'Feminismo', en: 'Feminism' },
        slug: 'feminismo',
        descripcion: 'Movimiento por la igualdad de género'
      };

      expect(hashtag.id).toBe('ht-001');
      expect(hashtag.nombre.es).toBe('Feminismo');
      expect(hashtag.slug).toBe('feminismo');
      expect(hashtag.descripcion).toBeDefined();
    });

    it('debería permitir hashtag sin descripción', () => {
      const hashtag: Hashtag = {
        id: 'ht-002',
        nombre: { es: 'Igualdad', en: 'Equality' },
        slug: 'igualdad'
      };
      
      expect(hashtag.descripcion).toBeUndefined();
    });
  });

  describe('Reference', () => {
    it('debería crear una referencia completa', () => {
      const ref: Reference = {
        titulo: 'El segundo sexo',
        url: 'https://example.com/libro',
        autor: 'Simone de Beauvoir',
        anio: 1949
      };
      
      expect(ref.titulo).toBe('El segundo sexo');
      expect(ref.url).toBeDefined();
      expect(ref.autor).toBeDefined();
      expect(ref.anio).toBe(1949);
    });

    it('debería permitir referencia solo con título', () => {
      const ref: Reference = {
        titulo: 'Artículo sin más datos'
      };
      
      expect(ref.titulo).toBe('Artículo sin más datos');
      expect(ref.url).toBeUndefined();
    });
  });

  describe('BaseContent', () => {
    it('debería crear contenido base válido', () => {
      const content: BaseContent = {
        id: 'cont-001',
        slug: 'test-content',
        tipo: 'concepto',
        titulo: { es: 'Título de prueba' },
        descripcion: { es: 'Descripción de prueba' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date('2025-01-01')
      };
      
      expect(content.id).toBe('cont-001');
      expect(content.tipo).toBe('concepto');
      expect(content.activo).toBe(true);
    });

    it('debería permitir vídeos en lengua de signos opcionales', () => {
      const content: BaseContent = {
        id: 'cont-002',
        slug: 'test-video',
        tipo: 'historia',
        titulo: { es: 'Con vídeo' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        video_lse_url: 'https://example.com/video-lse.mp4',
        video_lsc_url: 'https://example.com/video-lsc.mp4',
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(content.video_lse_url).toBeDefined();
      expect(content.video_lsc_url).toBeDefined();
    });

    it('debería incluir hashtags y referencias', () => {
      const content: BaseContent = {
        id: 'cont-003',
        slug: 'with-metadata',
        tipo: 'recurso',
        titulo: { es: 'Con metadatos' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        hashtags: [
          { id: 'ht-1', nombre: 'Tag1', slug: 'tag1' }
        ],
        referencias: [
          { titulo: 'Referencia 1', autor: 'Autor' }
        ],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(content.hashtags).toHaveLength(1);
      expect(content.referencias).toHaveLength(1);
    });
  });

  describe('HistoriaContent', () => {
    it('debería crear historia con año requerido', () => {
      const historia: HistoriaContent = {
        id: 'hist-001',
        slug: 'historia-test',
        tipo: 'historia',
        titulo: { es: 'Historia de prueba' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        anio: 1975,
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(historia.tipo).toBe('historia');
      expect(historia.anio).toBe(1975);
    });

    it('debería permitir periodo con anio_hasta', () => {
      const historia: HistoriaContent = {
        id: 'hist-002',
        slug: 'periodo',
        tipo: 'historia',
        titulo: { es: 'Periodo histórico' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        anio: 1960,
        anio_hasta: 1975,
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(historia.anio_hasta).toBe(1975);
    });
  });

  describe('ConceptoContent', () => {
    it('debería crear concepto válido', () => {
      const concepto: ConceptoContent = {
        id: 'conc-001',
        slug: 'feminismo',
        tipo: 'concepto',
        titulo: { es: 'Feminismo' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(concepto.tipo).toBe('concepto');
    });
  });

  describe('ViolenciaContent', () => {
    it('debería crear contenido de violencia con campos específicos', () => {
      const violencia: ViolenciaContent = {
        id: 'viol-001',
        slug: 'violencia-test',
        tipo: 'violencia',
        titulo: { es: 'Tipo de violencia' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        senales_alerta: { es: 'Señales de alerta' },
        recursos_ayuda: ['inst-001', 'inst-002'],
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(violencia.tipo).toBe('violencia');
      expect(violencia.senales_alerta?.es).toBe('Señales de alerta');
      expect(violencia.recursos_ayuda).toHaveLength(2);
    });
  });

  describe('RecursoContent', () => {
    it('debería crear recurso tipo libro', () => {
      const libro: RecursoContent = {
        id: 'rec-001',
        slug: 'libro-test',
        tipo: 'recurso',
        subtipo: 'libro',
        titulo: { es: 'Libro feminista' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        autor: 'Autora',
        isbn: '978-1234567890',
        num_ediciones: 5,
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(libro.tipo).toBe('recurso');
      expect(libro.subtipo).toBe('libro');
      expect(libro.isbn).toBeDefined();
    });

    it('debería crear recurso tipo película/serie', () => {
      const pelicula: RecursoContent = {
        id: 'rec-002',
        slug: 'pelicula-test',
        tipo: 'recurso',
        subtipo: 'pelicula_serie',
        titulo: { es: 'Película' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        direccion: 'Directora',
        duracion: 120,
        num_temporadas: 3,
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(pelicula.subtipo).toBe('pelicula_serie');
      expect(pelicula.duracion).toBe(120);
    });

    it('debería validar subtipos de recurso', () => {
      const subtipos: RecursoSubtipo[] = ['libro', 'pelicula_serie', 'documental'];
      
      subtipos.forEach(subtipo => {
        expect(['libro', 'pelicula_serie', 'documental']).toContain(subtipo);
      });
    });

    // Pruebas específicas US-005
    describe('US-005: Libros', () => {
      it('debería tener todos los campos específicos de libros', () => {
        const libro: RecursoContent = {
          id: 'rec-libro-001',
          slug: 'el-segundo-sexo',
          tipo: 'recurso',
          subtipo: 'libro',
          titulo: { 
            es: 'El segundo sexo',
            en: 'The Second Sex'
          },
          descripcion: { es: 'Descripción del libro' },
          descripcion_lectura_facil: { es: 'Un libro importante sobre feminismo' },
          autor: 'Simone de Beauvoir',
          anio: 1949,
          isbn: '978-0307277787',
          enlace_catalogo: 'https://catalogo.ejemplo.com/libro',
          num_ediciones: 15,
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        expect(libro.subtipo).toBe('libro');
        expect(libro.autor).toBe('Simone de Beauvoir');
        expect(libro.anio).toBe(1949);
        expect(libro.isbn).toBeDefined();
        expect(libro.enlace_catalogo).toBeDefined();
        expect(libro.num_ediciones).toBe(15);
      });

      it('debería permitir libro sin ISBN (campo opcional)', () => {
        const libro: RecursoContent = {
          id: 'rec-libro-002',
          slug: 'libro-sin-isbn',
          tipo: 'recurso',
          subtipo: 'libro',
          titulo: { es: 'Libro antiguo' },
          descripcion: { es: 'Descripción' },
          descripcion_lectura_facil: { es: 'Descripción fácil' },
          autor: 'Autora Clásica',
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        expect(libro.subtipo).toBe('libro');
        expect(libro.isbn).toBeUndefined();
      });

      it('debería heredar campos comunes del modelo base', () => {
        const libro: RecursoContent = {
          id: 'rec-libro-003',
          slug: 'libro-completo',
          tipo: 'recurso',
          subtipo: 'libro',
          titulo: { 
            es: 'Título español',
            en: 'English title',
            ca: 'Títol català'
          },
          descripcion: { es: 'Descripción' },
          descripcion_lectura_facil: { 
            es: 'Lectura fácil en español',
            en: 'Easy reading in English'
          },
          video_lse_url: 'https://example.com/video-lse.mp4',
          video_lsc_url: 'https://example.com/video-lsc.mp4',
          hashtags: [
            { id: 'ht-1', nombre: 'Feminismo', slug: 'feminismo' }
          ],
          referencias: [
            { titulo: 'Referencia 1', url: 'https://ref1.com' }
          ],
          autor: 'Autora',
          activo: true,
          fecha_publicacion: new Date()
        };

        // Campos comunes
        expect(libro.titulo.es).toBeDefined();
        expect(libro.descripcion_lectura_facil.es).toBeDefined();
        expect(libro.video_lse_url).toBeDefined();
        expect(libro.video_lsc_url).toBeDefined();
        expect(libro.hashtags.length).toBe(1);
        expect(libro.referencias?.length).toBe(1);
      });
    });

    describe('US-005: Películas y Series', () => {
      it('debería tener todos los campos específicos de películas/series', () => {
        const pelicula: RecursoContent = {
          id: 'rec-peli-001',
          slug: 'the-handmaids-tale',
          tipo: 'recurso',
          subtipo: 'pelicula_serie',
          titulo: { 
            es: 'El cuento de la criada',
            en: 'The Handmaid\'s Tale'
          },
          descripcion: { es: 'Serie sobre distopía feminista' },
          descripcion_lectura_facil: { es: 'Una serie sobre mujeres en un mundo difícil' },
          direccion: 'Bruce Miller (creador)',
          anio: 2017,
          duracion: 50,
          num_temporadas: 5,
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        expect(pelicula.subtipo).toBe('pelicula_serie');
        expect(pelicula.direccion).toBe('Bruce Miller (creador)');
        expect(pelicula.anio).toBe(2017);
        expect(pelicula.duracion).toBe(50);
        expect(pelicula.num_temporadas).toBe(5);
      });

      it('debería permitir película sin temporadas', () => {
        const pelicula: RecursoContent = {
          id: 'rec-peli-002',
          slug: 'pelicula-individual',
          tipo: 'recurso',
          subtipo: 'pelicula_serie',
          titulo: { es: 'Película individual' },
          descripcion: { es: 'Descripción' },
          descripcion_lectura_facil: { es: 'Una película' },
          direccion: 'Directora',
          duracion: 120,
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        expect(pelicula.subtipo).toBe('pelicula_serie');
        expect(pelicula.num_temporadas).toBeUndefined();
      });
    });

    describe('US-005: Documentales', () => {
      it('debería tener todos los campos específicos de documentales', () => {
        const documental: RecursoContent = {
          id: 'rec-doc-001',
          slug: 'she-is-beautiful',
          tipo: 'recurso',
          subtipo: 'documental',
          titulo: { es: 'She is Beautiful When She is Angry' },
          descripcion: { es: 'Documental sobre el movimiento feminista' },
          descripcion_lectura_facil: { es: 'Un documental sobre mujeres que lucharon por sus derechos' },
          direccion: 'Mary Dore',
          anio: 2014,
          duracion: 92,
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        expect(documental.subtipo).toBe('documental');
        expect(documental.direccion).toBe('Mary Dore');
        expect(documental.anio).toBe(2014);
        expect(documental.duracion).toBe(92);
      });

      it('debería distinguirse de películas por subtipo', () => {
        const documental: RecursoContent = {
          id: 'rec-doc-002',
          slug: 'documental',
          tipo: 'recurso',
          subtipo: 'documental',
          titulo: { es: 'Documental' },
          descripcion: { es: 'Desc' },
          descripcion_lectura_facil: { es: 'Desc fácil' },
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        const pelicula: RecursoContent = {
          id: 'rec-peli-003',
          slug: 'pelicula',
          tipo: 'recurso',
          subtipo: 'pelicula_serie',
          titulo: { es: 'Película' },
          descripcion: { es: 'Desc' },
          descripcion_lectura_facil: { es: 'Desc fácil' },
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        expect(documental.subtipo).not.toBe(pelicula.subtipo);
      });
    });

    describe('US-005: Sinopsis en lectura fácil multiidioma', () => {
      it('todos los recursos deben incluir descripción en lectura fácil', () => {
        const recursos: RecursoContent[] = [
          {
            id: 'rec-1',
            slug: 'libro',
            tipo: 'recurso',
            subtipo: 'libro',
            titulo: { es: 'Libro' },
            descripcion: { es: 'Descripción completa' },
            descripcion_lectura_facil: { es: 'Descripción fácil de leer' },
            hashtags: [],
            activo: true,
            fecha_publicacion: new Date()
          },
          {
            id: 'rec-2',
            slug: 'pelicula',
            tipo: 'recurso',
            subtipo: 'pelicula_serie',
            titulo: { es: 'Película' },
            descripcion: { es: 'Descripción completa' },
            descripcion_lectura_facil: { es: 'Descripción fácil de leer' },
            hashtags: [],
            activo: true,
            fecha_publicacion: new Date()
          }
        ];

        recursos.forEach(recurso => {
          expect(recurso.descripcion_lectura_facil).toBeDefined();
          expect(recurso.descripcion_lectura_facil.es).toBeDefined();
        });
      });

      it('debería soportar sinopsis multiidioma', () => {
        const recurso: RecursoContent = {
          id: 'rec-multi',
          slug: 'recurso-multiidioma',
          tipo: 'recurso',
          subtipo: 'libro',
          titulo: { 
            es: 'Título',
            en: 'Title',
            ca: 'Títol',
            val: 'Títol',
            gl: 'Título',
            eu: 'Izenburua'
          },
          descripcion: { es: 'Descripción' },
          descripcion_lectura_facil: { 
            es: 'Lectura fácil en español',
            en: 'Easy reading in English',
            ca: 'Lectura fàcil en català',
            val: 'Lectura fàcil en valencià',
            gl: 'Lectura fácil en galego',
            eu: 'Irakurketa erraza euskaraz'
          },
          hashtags: [],
          activo: true,
          fecha_publicacion: new Date()
        };

        expect(recurso.descripcion_lectura_facil.es).toBeDefined();
        expect(recurso.descripcion_lectura_facil.en).toBeDefined();
        expect(recurso.descripcion_lectura_facil.ca).toBeDefined();
        expect(recurso.descripcion_lectura_facil.val).toBeDefined();
        expect(recurso.descripcion_lectura_facil.gl).toBeDefined();
        expect(recurso.descripcion_lectura_facil.eu).toBeDefined();
      });
    });
  });

  describe('TestimonioContent', () => {
    it('debería crear testimonio con campos RGPD', () => {
      const testimonio: TestimonioContent = {
        id: 'test-001',
        slug: 'testimonio-1',
        tipo: 'testimonio',
        titulo: { es: 'Mi historia' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        anonimizado: true,
        consentimiento_rgpd: true,
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(testimonio.tipo).toBe('testimonio');
      expect(testimonio.anonimizado).toBe(true);
      expect(testimonio.consentimiento_rgpd).toBe(true);
    });
  });

  describe('InstitucionContent', () => {
    it('debería crear institución con datos de contacto', () => {
      const institucion: InstitucionContent = {
        id: 'inst-001',
        slug: 'institucion-ayuda',
        tipo: 'institucion',
        titulo: { es: 'Centro de ayuda' },
        descripcion: { es: 'Descripción' },
        descripcion_lectura_facil: { es: 'Descripción fácil' },
        telefono: '016',
        email: 'ayuda@ejemplo.es',
        web: 'https://ejemplo.es',
        horario: { es: '24 horas' },
        ambito: 'nacional',
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };
      
      expect(institucion.tipo).toBe('institucion');
      expect(institucion.telefono).toBe('016');
      expect(institucion.ambito).toBe('nacional');
    });

    it('debería validar ámbitos de institución', () => {
      const ambitos = ['nacional', 'autonomico', 'local'];
      
      ambitos.forEach(ambito => {
        expect(['nacional', 'autonomico', 'local']).toContain(ambito);
      });
    });
  });

  describe('Content Union Type', () => {
    it('debería aceptar cualquier tipo de contenido', () => {
      const historia: HistoriaContent = {
        id: 'h1',
        slug: 'historia',
        tipo: 'historia',
        anio: 2000,
        titulo: { es: 'Historia' },
        descripcion: { es: 'Desc' },
        descripcion_lectura_facil: { es: 'Desc fácil' },
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };

      const concepto: ConceptoContent = {
        id: 'c1',
        slug: 'concepto',
        tipo: 'concepto',
        titulo: { es: 'Concepto' },
        descripcion: { es: 'Desc' },
        descripcion_lectura_facil: { es: 'Desc fácil' },
        hashtags: [],
        activo: true,
        fecha_publicacion: new Date()
      };

      // Type assertion para verificar que el tipo unión funciona
      const contents = [historia, concepto];
      
      expect(contents).toHaveLength(2);
      expect(contents[0].tipo).toBe('historia');
      expect(contents[1].tipo).toBe('concepto');
    });
  });
});

