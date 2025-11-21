import { RecursoContent } from '../../../core/models/content.model';

/**
 * Función helper para crear textos multilingües
 */
function createMultilingualText(text: string) {
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
 * Datos de ejemplo de documentales
 */
export const sampleDocumentales: RecursoContent[] = [
  {
    id: '1',
    slug: 'miss-representation',
    tipo: 'recurso',
    subtipo: 'documental',
    titulo: createMultilingualText('Miss Representation'),
    descripcion: createMultilingualText('Documental que explora cómo los medios de comunicación contribuyen a la representación insuficiente de las mujeres en posiciones de poder e influencia.'),
    descripcion_lectura_facil: createMultilingualText('Este documental muestra cómo los medios de comunicación no muestran bien a las mujeres en posiciones importantes.'),
    autor: 'Jennifer Siebel Newsom',
    direccion: 'Jennifer Siebel Newsom',
    anio: 2011,
    duracion: 90,
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '9', nombre: 'Medios de comunicación', slug: 'medios-comunicacion', descripcion: 'Medios de comunicación' }
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
    slug: 'the-mask-you-live-in',
    tipo: 'recurso',
    subtipo: 'documental',
    titulo: createMultilingualText('The Mask You Live In'),
    descripcion: createMultilingualText('Documental que examina cómo la cultura estadounidense define la masculinidad y cómo esto afecta a niños y hombres, conectando con temas de igualdad de género.'),
    descripcion_lectura_facil: createMultilingualText('Este documental habla sobre cómo se espera que los hombres se comporten y cómo eso afecta a todos.'),
    autor: 'Jennifer Siebel Newsom',
    direccion: 'Jennifer Siebel Newsom',
    anio: 2015,
    duracion: 97,
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '10', nombre: 'Masculinidad', slug: 'masculinidad', descripcion: 'Masculinidad' }
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
    slug: 'she-beautiful-when-she-is-angry',
    tipo: 'recurso',
    subtipo: 'documental',
    titulo: createMultilingualText('She\'s Beautiful When She\'s Angry'),
    descripcion: createMultilingualText('Documental histórico sobre el movimiento de liberación de las mujeres en Estados Unidos desde 1966 hasta 1971, destacando las luchas y logros del feminismo de segunda ola.'),
    descripcion_lectura_facil: createMultilingualText('Este documental cuenta la historia de cómo las mujeres lucharon por sus derechos en los años 60 y 70.'),
    autor: 'Mary Dore',
    direccion: 'Mary Dore',
    anio: 2014,
    duracion: 92,
    hashtags: [
      { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
      { id: '8', nombre: 'Historia feminista', slug: 'historia-feminista', descripcion: 'Historia feminista' }
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
    slug: 'feminists-what-were-they-thinking',
    tipo: 'recurso',
    subtipo: 'documental',
    titulo: createMultilingualText('Feminists: What Were They Thinking?'),
    descripcion: createMultilingualText('Documental que explora el movimiento feminista de los años 70 a través de fotografías y entrevistas con mujeres que participaron en la lucha por la igualdad.'),
    descripcion_lectura_facil: createMultilingualText('Este documental muestra fotos y entrevistas de mujeres que lucharon por la igualdad hace muchos años.'),
    autor: 'Johanna Demetrakas',
    direccion: 'Johanna Demetrakas',
    anio: 2018,
    duracion: 86,
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

