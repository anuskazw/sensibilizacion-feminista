import { RecursoContent, MultilingualText } from '../../../core/models/content.model';

/**
 * Función helper para crear textos multiidioma
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
 * Datos de ejemplo de películas y series
 */
export const samplePeliculasSeries: RecursoContent[] = [
  {
    id: '1',
    slug: 'the-handmaids-tale',
    tipo: 'recurso',
    subtipo: 'pelicula_serie',
    titulo: createMultilingualText('The Handmaid\'s Tale'),
    descripcion: createMultilingualText('Serie distópica basada en la novela de Margaret Atwood que explora temas de opresión femenina, derechos reproductivos y resistencia.'),
    descripcion_lectura_facil: createMultilingualText('Esta serie cuenta la historia de mujeres que luchan por su libertad en un mundo donde han perdido sus derechos.'),
    autor: 'Margaret Atwood',
    direccion: 'Bruce Miller',
    anio: 2017,
    num_temporadas: 5,
    duracion: 60,
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '5', nombre: 'Derechos reproductivos', slug: 'derechos-reproductivos', descripcion: 'Derechos reproductivos' }
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
    slug: 'big-little-lies',
    tipo: 'recurso',
    subtipo: 'pelicula_serie',
    titulo: createMultilingualText('Big Little Lies'),
    descripcion: createMultilingualText('Serie que aborda temas de violencia doméstica, amistad femenina y secretos familiares, basada en la novela de Liane Moriarty.'),
    descripcion_lectura_facil: createMultilingualText('Esta serie muestra cómo las mujeres se apoyan entre sí cuando enfrentan problemas difíciles.'),
    autor: 'Liane Moriarty',
    direccion: 'Jean-Marc Vallée',
    anio: 2017,
    num_temporadas: 2,
    duracion: 55,
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '6', nombre: 'Violencia de género', slug: 'violencia-genero', descripcion: 'Violencia de género' }
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
    slug: 'hidden-figures',
    tipo: 'recurso',
    subtipo: 'pelicula_serie',
    titulo: createMultilingualText('Hidden Figures (Figuras Ocultas)'),
    descripcion: createMultilingualText('Película que cuenta la historia real de tres matemáticas afroamericanas que trabajaron en la NASA durante la carrera espacial.'),
    descripcion_lectura_facil: createMultilingualText('Esta película cuenta la historia de mujeres muy inteligentes que ayudaron a enviar personas al espacio.'),
    autor: 'Margot Lee Shetterly',
    direccion: 'Theodore Melfi',
    anio: 2016,
    duracion: 127,
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '7', nombre: 'Mujeres en la ciencia', slug: 'mujeres-ciencia', descripcion: 'Mujeres en la ciencia' }
    ],
    activo: true,
    fecha_publicacion: new Date('2024-02-01'),
    fecha_modificacion: new Date('2024-02-01'),
    fecha_creacion: new Date('2024-02-01'),
    estado: 'publicado',
    orden: 3
  },
  {
    id: '4',
    slug: 'suffragette',
    tipo: 'recurso',
    subtipo: 'pelicula_serie',
    titulo: createMultilingualText('Suffragette'),
    descripcion: createMultilingualText('Película histórica sobre el movimiento sufragista británico a principios del siglo XX y la lucha por el derecho al voto de las mujeres.'),
    descripcion_lectura_facil: createMultilingualText('Esta película muestra cómo las mujeres lucharon para poder votar hace muchos años.'),
    autor: 'Abi Morgan',
    direccion: 'Sarah Gavron',
    anio: 2015,
    duracion: 106,
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '8', nombre: 'Historia feminista', slug: 'historia-feminista', descripcion: 'Historia feminista' }
    ],
    activo: true,
    fecha_publicacion: new Date('2024-02-15'),
    fecha_modificacion: new Date('2024-02-15'),
    fecha_creacion: new Date('2024-02-15'),
    estado: 'publicado',
    orden: 4
  }
];

