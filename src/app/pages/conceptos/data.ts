import { ConceptoContent, Hashtag, MultilingualText } from '../../core/models/content.model';

/**
 * Función helper para crear texto multiidioma
 */
function createMultilingualText(text: string): MultilingualText {
  return {
    es: text,
    en: text, // En producción, aquí irían las traducciones reales
    ca: text,
    val: text,
    gl: text,
    eu: text
  };
}

/**
 * Hashtags de ejemplo para conceptos feministas
 */
export const sampleHashtags: Hashtag[] = [
  { id: '1', nombre: 'Igualdad', slug: 'igualdad', descripcion: 'Igualdad de género' },
  { id: '2', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Movimiento feminista' },
  { id: '3', nombre: 'Derechos', slug: 'derechos', descripcion: 'Derechos de las mujeres' },
  { id: '4', nombre: 'Género', slug: 'genero', descripcion: 'Género y sexualidad' },
  { id: '5', nombre: 'Sociedad', slug: 'sociedad', descripcion: 'Sociedad y cultura' },
  { id: '6', nombre: 'Política', slug: 'politica', descripcion: 'Política y feminismo' },
  { id: '7', nombre: 'Economía', slug: 'economia', descripcion: 'Economía feminista' },
  { id: '8', nombre: 'Teoría', slug: 'teoria', descripcion: 'Teoría feminista' },
];

/**
 * Contenidos de ejemplo de conceptos feministas
 */
export const sampleContents: ConceptoContent[] = [
  {
    id: '1',
    slug: 'patriarcado',
    tipo: 'concepto',
    titulo: createMultilingualText('Patriarcado'),
    descripcion: createMultilingualText('Sistema de organización social en el que los hombres tienen poder sobre las mujeres.'),
    descripcion_lectura_facil: createMultilingualText('El patriarcado es cuando los hombres tienen más poder que las mujeres en la sociedad. Este sistema existe desde hace mucho tiempo.'),
    hashtags: [sampleHashtags[4], sampleHashtags[7], sampleHashtags[1]],
    activo: true,
    fecha_publicacion: new Date('2024-01-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-10'),
    fecha_modificacion: new Date('2024-01-15'),
    referencias: [
      { titulo: 'El patriarcado', autor: 'Kate Millet', anio: 1970 }
    ]
  },
  {
    id: '2',
    slug: 'feminismo',
    tipo: 'concepto',
    titulo: createMultilingualText('Feminismo'),
    descripcion: createMultilingualText('Movimiento social y político que busca la igualdad de derechos entre mujeres y hombres.'),
    descripcion_lectura_facil: createMultilingualText('El feminismo lucha por la igualdad entre mujeres y hombres. Quiere que todas las personas tengan los mismos derechos.'),
    hashtags: [sampleHashtags[0], sampleHashtags[1], sampleHashtags[2]],
    activo: true,
    fecha_publicacion: new Date('2024-01-20'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-15'),
    fecha_modificacion: new Date('2024-01-20')
  },
  {
    id: '3',
    slug: 'genero',
    tipo: 'concepto',
    titulo: createMultilingualText('Género'),
    descripcion: createMultilingualText('Construcción social y cultural de las características, roles y comportamientos asociados a mujeres y hombres.'),
    descripcion_lectura_facil: createMultilingualText('El género son las ideas que la sociedad tiene sobre cómo deben ser las mujeres y los hombres. No es lo mismo que el sexo biológico.'),
    hashtags: [sampleHashtags[3], sampleHashtags[4], sampleHashtags[7]],
    activo: true,
    fecha_publicacion: new Date('2024-02-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-25'),
    fecha_modificacion: new Date('2024-02-01')
  },
  {
    id: '4',
    slug: 'brecha-salarial',
    tipo: 'concepto',
    titulo: createMultilingualText('Brecha salarial'),
    descripcion: createMultilingualText('Diferencia de salario promedio entre mujeres y hombres que realizan el mismo trabajo.'),
    descripcion_lectura_facil: createMultilingualText('La brecha salarial es cuando las mujeres cobran menos dinero que los hombres por hacer el mismo trabajo.'),
    hashtags: [sampleHashtags[0], sampleHashtags[6], sampleHashtags[2]],
    activo: true,
    fecha_publicacion: new Date('2024-02-10'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-05'),
    fecha_modificacion: new Date('2024-02-10')
  },
  {
    id: '5',
    slug: 'empoderamiento',
    tipo: 'concepto',
    titulo: createMultilingualText('Empoderamiento'),
    descripcion: createMultilingualText('Proceso por el cual las mujeres ganan control sobre sus propias vidas y decisiones.'),
    descripcion_lectura_facil: createMultilingualText('Empoderamiento significa que las mujeres pueden tomar sus propias decisiones. Tienen poder sobre su vida.'),
    hashtags: [sampleHashtags[2], sampleHashtags[1], sampleHashtags[4]],
    activo: true,
    fecha_publicacion: new Date('2024-03-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-25'),
    fecha_modificacion: new Date('2024-03-01')
  },
  {
    id: '6',
    slug: 'sororidad',
    tipo: 'concepto',
    titulo: createMultilingualText('Sororidad'),
    descripcion: createMultilingualText('Solidaridad y apoyo mutuo entre mujeres en su lucha por la igualdad.'),
    descripcion_lectura_facil: createMultilingualText('La sororidad es la ayuda entre mujeres. Significa que las mujeres se apoyan unas a otras.'),
    hashtags: [sampleHashtags[1], sampleHashtags[4], sampleHashtags[0]],
    activo: true,
    fecha_publicacion: new Date('2024-03-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-03-10'),
    fecha_modificacion: new Date('2024-03-15')
  },
  {
    id: '7',
    slug: 'interseccionalidad',
    tipo: 'concepto',
    titulo: createMultilingualText('Interseccionalidad'),
    descripcion: createMultilingualText('Concepto que reconoce que las personas pueden sufrir discriminación múltiple por género, raza, clase social, etc.'),
    descripcion_lectura_facil: createMultilingualText('La interseccionalidad dice que una persona puede sufrir discriminación por varios motivos. Por ejemplo, por ser mujer y por su color de piel.'),
    hashtags: [sampleHashtags[7], sampleHashtags[1], sampleHashtags[2]],
    activo: true,
    fecha_publicacion: new Date('2024-04-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-03-25'),
    fecha_modificacion: new Date('2024-04-01')
  },
  {
    id: '8',
    slug: 'cuota-genero',
    tipo: 'concepto',
    titulo: createMultilingualText('Cuota de género'),
    descripcion: createMultilingualText('Medida que establece un porcentaje mínimo de mujeres en puestos de decisión o representación.'),
    descripcion_lectura_facil: createMultilingualText('Las cuotas de género dicen que debe haber un número mínimo de mujeres en puestos importantes. Por ejemplo, en el gobierno o las empresas.'),
    hashtags: [sampleHashtags[5], sampleHashtags[0], sampleHashtags[2]],
    activo: true,
    fecha_publicacion: new Date('2024-04-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-04-10'),
    fecha_modificacion: new Date('2024-04-15')
  },
  {
    id: '9',
    slug: 'androcentrismo',
    tipo: 'concepto',
    titulo: createMultilingualText('Androcentrismo'),
    descripcion: createMultilingualText('Visión del mundo que coloca al hombre como centro y medida de todas las cosas.'),
    descripcion_lectura_facil: createMultilingualText('El androcentrismo es ver el mundo solo desde el punto de vista de los hombres. Es como si solo los hombres fueran importantes.'),
    hashtags: [sampleHashtags[7], sampleHashtags[4], sampleHashtags[1]],
    activo: true,
    fecha_publicacion: new Date('2024-05-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-04-25'),
    fecha_modificacion: new Date('2024-05-01')
  },
  {
    id: '10',
    slug: 'coeducacion',
    tipo: 'concepto',
    titulo: createMultilingualText('Coeducación'),
    descripcion: createMultilingualText('Método educativo que promueve la igualdad entre niñas y niños, eliminando estereotipos de género.'),
    descripcion_lectura_facil: createMultilingualText('La coeducación es enseñar la igualdad en las escuelas. Niñas y niños aprenden que pueden hacer las mismas cosas.'),
    hashtags: [sampleHashtags[0], sampleHashtags[4], sampleHashtags[1]],
    activo: true,
    fecha_publicacion: new Date('2024-05-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-05-10'),
    fecha_modificacion: new Date('2024-05-15')
  }
];

