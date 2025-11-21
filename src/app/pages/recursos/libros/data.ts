import { RecursoContent, MultilingualText } from '../../../core/models/content.model';

/**
 * Función helper para crear textos multilingües
 */
function createMultilingualText(text: string): MultilingualText {
  return {
    es: text,
    en: text,
    ca: text,
    val: text,
    gl: text,
    eu: text
  };
}

/**
 * Datos de ejemplo de libros
 */
export const sampleLibros: RecursoContent[] = [
  {
    id: '1',
    slug: 'el-segundo-sexo',
    tipo: 'recurso',
    subtipo: 'libro',
    titulo: createMultilingualText('El segundo sexo'),
    descripcion: createMultilingualText('Obra fundamental del feminismo del siglo XX que analiza la condición de la mujer desde múltiples perspectivas.'),
    descripcion_lectura_facil: createMultilingualText('Este libro explica cómo se ha visto a las mujeres a lo largo de la historia y por qué es importante luchar por la igualdad.'),
    autor: 'Simone de Beauvoir',
    anio: 1949,
    num_ediciones: 15,
    isbn: '978-84-376-0494-7',
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '2', nombre: 'Teoría', slug: 'teoria', descripcion: 'Teoría feminista' }
    ],
    activo: true,
    fecha_publicacion: new Date('2024-01-01'),
    fecha_modificacion: new Date('2024-01-01'),
    fecha_creacion: new Date('2024-01-01'),
    estado: 'publicado',
    orden: 1
  },
  {
    id: '2',
    slug: 'feminismo-para-principiantes',
    tipo: 'recurso',
    subtipo: 'libro',
    titulo: createMultilingualText('Feminismo para principiantes'),
    descripcion: createMultilingualText('Una introducción accesible al feminismo que explica conceptos clave y la historia del movimiento.'),
    descripcion_lectura_facil: createMultilingualText('Este libro explica qué es el feminismo de forma fácil y sencilla.'),
    autor: 'Nuria Varela',
    anio: 2005,
    num_ediciones: 8,
    isbn: '978-84-376-2345-0',
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '3', nombre: 'Educación', slug: 'educacion', descripcion: 'Educación' }
    ],
    activo: true,
    fecha_publicacion: new Date('2024-01-15'),
    fecha_modificacion: new Date('2024-01-15'),
    fecha_creacion: new Date('2024-01-15'),
    estado: 'publicado',
    orden: 2
  },
  {
    id: '3',
    slug: 'mujeres-que-corren-con-lobos',
    tipo: 'recurso',
    subtipo: 'libro',
    titulo: createMultilingualText('Mujeres que corren con los lobos'),
    descripcion: createMultilingualText('Un análisis profundo del arquetipo de la mujer salvaje y su importancia en la psicología femenina.'),
    descripcion_lectura_facil: createMultilingualText('Este libro habla sobre la fuerza y la sabiduría de las mujeres.'),
    autor: 'Clarissa Pinkola Estés',
    anio: 1992,
    num_ediciones: 12,
    isbn: '978-84-376-1234-5',
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '4', nombre: 'Psicología', slug: 'psicologia', descripcion: 'Psicología' }
    ],
    activo: true,
    fecha_publicacion: new Date('2024-02-01'),
    fecha_modificacion: new Date('2024-02-01'),
    fecha_creacion: new Date('2024-02-01'),
    estado: 'publicado',
    orden: 3
  }
];

