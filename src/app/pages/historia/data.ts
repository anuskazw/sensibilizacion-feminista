import { HistoriaContent, Hashtag, MultilingualText } from '../../core/models/content.model';

/**
 * Función helper para crear textos multilingües
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
 * Hashtags de ejemplo para la página de historia
 */
export const sampleHashtags: Hashtag[] = [
  { id: '1', nombre: 'Sufragismo', slug: 'sufragismo', descripcion: 'Movimiento por el voto femenino' },
  { id: '2', nombre: 'Igualdad', slug: 'igualdad' },
  { id: '3', nombre: 'Feminismo', slug: 'feminismo' },
  { id: '4', nombre: 'Derechos', slug: 'derechos' },
  { id: '5', nombre: 'Activismo', slug: 'activismo' },
  { id: '6', nombre: 'Historia', slug: 'historia' },
  { id: '7', nombre: 'Pioneras', slug: 'pioneras' },
  { id: '8', nombre: 'Movimiento', slug: 'movimiento' },
];

/**
 * Contenidos de ejemplo para la página de historia
 */
export const sampleContents: HistoriaContent[] = [
  {
    id: '1',
    slug: 'sufragio-femenino-espana',
    tipo: 'historia',
    titulo: createMultilingualText('Sufragio femenino en España (1931)'),
    descripcion: createMultilingualText('El derecho al voto de las mujeres en España se aprobó en 1931 durante la Segunda República.'),
    descripcion_lectura_facil: createMultilingualText('En 1931 las mujeres españolas consiguieron el derecho a votar. Fue un logro muy importante.'),
    hashtags: [sampleHashtags[0], sampleHashtags[3], sampleHashtags[5]],
    anio: 1931,
    activo: true,
    fecha_publicacion: new Date('2024-01-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-10'),
    fecha_modificacion: new Date('2024-01-15'),
    video_lse_url: 'https://youtu.be/BcX2-sbMtqI?si=55FrsjEWERYPvlxf',
    video_transcription: createMultilingualText('En este vídeo se explica la historia del sufragio femenino en España, un logro histórico conseguido en 1931 durante la Segunda República.'),
    referencias: [
      { titulo: 'Historia del sufragismo en España', autor: 'María Martínez', anio: 2010 }
    ]
  },
  {
    id: '2',
    slug: 'clara-campoamor',
    tipo: 'historia',
    titulo: createMultilingualText('Clara Campoamor'),
    descripcion: createMultilingualText('Clara Campoamor fue una política y activista española que luchó por el derecho al voto femenino.'),
    descripcion_lectura_facil: createMultilingualText('Clara Campoamor luchó para que las mujeres pudieran votar. Gracias a ella conseguimos este derecho.'),
    hashtags: [sampleHashtags[0], sampleHashtags[6], sampleHashtags[4]],
    anio: 1931,
    activo: true,
    fecha_publicacion: new Date('2024-01-20'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-15'),
    fecha_modificacion: new Date('2024-01-20'),
    video_lse_url: 'https://example.com/videos/clara-campoamor-lse.mp4',
    video_transcription: createMultilingualText('Este vídeo cuenta la vida y obra de Clara Campoamor, una de las principales defensoras del sufragio femenino en España.')
  },
  {
    id: '3',
    slug: 'olympe-de-gouges',
    tipo: 'historia',
    titulo: createMultilingualText('Olympe de Gouges'),
    descripcion: createMultilingualText('Olympe de Gouges escribió la Declaración de los Derechos de la Mujer y la Ciudadana en 1791.'),
    descripcion_lectura_facil: createMultilingualText('En 1791, Olympe de Gouges escribió sobre los derechos de las mujeres. Fue muy valiente.'),
    hashtags: [sampleHashtags[3], sampleHashtags[6], sampleHashtags[5]],
    anio: 1791,
    activo: true,
    fecha_publicacion: new Date('2024-02-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-25'),
    fecha_modificacion: new Date('2024-02-01'),
    video_lse_url: 'https://example.com/videos/olympe-de-gouges-lse.mp4',
    video_transcription: createMultilingualText('Vídeo sobre Olympe de Gouges y su Declaración de los Derechos de la Mujer y la Ciudadana, un documento histórico fundamental para el feminismo.')
  },
  {
    id: '4',
    slug: 'dia-internacional-mujer',
    tipo: 'historia',
    titulo: createMultilingualText('Día Internacional de la Mujer (1975)'),
    descripcion: createMultilingualText('En 1975 la ONU estableció el 8 de marzo como Día Internacional de la Mujer.'),
    descripcion_lectura_facil: createMultilingualText('El 8 de marzo es el Día de la Mujer. Se celebra desde 1975 en todo el mundo.'),
    hashtags: [sampleHashtags[2], sampleHashtags[1], sampleHashtags[7]],
    anio: 1975,
    activo: true,
    fecha_publicacion: new Date('2024-02-10'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-05'),
    fecha_modificacion: new Date('2024-02-10'),
    video_lse_url: 'https://example.com/videos/dia-internacional-mujer-lse.mp4',
    video_transcription: createMultilingualText('Vídeo explicativo sobre el Día Internacional de la Mujer, su historia y su importancia en la lucha por la igualdad de género.')
  },
  {
    id: '5',
    slug: 'movimiento-me-too',
    tipo: 'historia',
    titulo: createMultilingualText('Movimiento #MeToo (2017)'),
    descripcion: createMultilingualText('El movimiento #MeToo surgió en 2017 para denunciar el acoso y la violencia sexual.'),
    descripcion_lectura_facil: createMultilingualText('En 2017 muchas mujeres compartieron sus experiencias de acoso. Esto se llamó movimiento MeToo.'),
    hashtags: [sampleHashtags[4], sampleHashtags[7], sampleHashtags[2]],
    anio: 2017,
    activo: true,
    fecha_publicacion: new Date('2024-03-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-25'),
    fecha_modificacion: new Date('2024-03-01'),
    video_lse_url: 'https://example.com/videos/movimiento-me-too-lse.mp4',
    video_transcription: createMultilingualText('Vídeo sobre el movimiento #MeToo, su origen, impacto y significado en la lucha contra el acoso y la violencia sexual.')
  }
];

