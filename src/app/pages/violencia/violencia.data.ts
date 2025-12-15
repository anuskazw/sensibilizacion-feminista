/**
 * Datos estáticos para la página de violencia
 * Implementa la funcionalidad de US-009
 */

import {
  ViolenciaContent,
  Hashtag,
  MultilingualText
} from '../../core/models/content.model';

/**
 * Función helper para crear textos multiidioma
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

// Hashtags relacionados con violencia
export const sampleHashtags: Hashtag[] = [
  { id: '1', nombre: 'Violencia de género', slug: 'violencia-genero', descripcion: 'Violencia ejercida contra las mujeres' },
  { id: '2', nombre: 'Violencia física', slug: 'violencia-fisica', descripcion: 'Violencia física' },
  { id: '3', nombre: 'Violencia psicológica', slug: 'violencia-psicologica', descripcion: 'Violencia psicológica y emocional' },
  { id: '4', nombre: 'Violencia sexual', slug: 'violencia-sexual', descripcion: 'Violencia sexual' },
  { id: '5', nombre: 'Violencia económica', slug: 'violencia-economica', descripcion: 'Violencia económica' },
  { id: '6', nombre: 'Violencia digital', slug: 'violencia-digital', descripcion: 'Violencia en el entorno digital' },
  { id: '7', nombre: 'Señales de alerta', slug: 'senales-alerta', descripcion: 'Señales de alerta de violencia' },
  { id: '8', nombre: 'Recursos de ayuda', slug: 'recursos-ayuda', descripcion: 'Recursos y ayuda disponible' },
];

// Contenidos de ejemplo relacionados con violencia
export const sampleContents: ViolenciaContent[] = [
  {
    id: '1',
    slug: 'violencia-fisica',
    tipo: 'violencia',
    titulo: createMultilingualText('Violencia física'),
    descripcion: createMultilingualText('Cualquier acto que cause daño físico a una mujer.'),
    descripcion_lectura_facil: createMultilingualText('La violencia física es cuando alguien te hace daño en el cuerpo. Puede ser golpes, empujones o cualquier cosa que te haga daño físico.'),
    senales_alerta: createMultilingualText('Señales de alerta: golpes, empujones, heridas, moretones, fracturas.'),
    hashtags: [sampleHashtags[0], sampleHashtags[1], sampleHashtags[6]],
    recursos_ayuda: ['016', '112'],
    activo: true,
    fecha_publicacion: new Date('2024-01-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-10'),
    fecha_modificacion: new Date('2024-01-15'),
    referencias: [
      { titulo: 'Ley Orgánica 1/2004', url: 'https://www.boe.es', anio: 2004 }
    ]
  },
  {
    id: '2',
    slug: 'violencia-psicologica',
    tipo: 'violencia',
    titulo: createMultilingualText('Violencia psicológica'),
    descripcion: createMultilingualText('Cualquier acto que cause daño emocional o psicológico.'),
    descripcion_lectura_facil: createMultilingualText('La violencia psicológica es cuando alguien te hace sentir mal con palabras o acciones. Te insulta, te amenaza o te hace sentir que no vales nada.'),
    senales_alerta: createMultilingualText('Señales de alerta: insultos, amenazas, humillaciones, aislamiento, control excesivo.'),
    hashtags: [sampleHashtags[0], sampleHashtags[2], sampleHashtags[6]],
    recursos_ayuda: ['016', '112'],
    activo: true,
    fecha_publicacion: new Date('2024-01-20'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-15'),
    fecha_modificacion: new Date('2024-01-20')
  },
  {
    id: '3',
    slug: 'violencia-sexual',
    tipo: 'violencia',
    titulo: createMultilingualText('Violencia sexual'),
    descripcion: createMultilingualText('Cualquier acto de naturaleza sexual realizado sin consentimiento.'),
    descripcion_lectura_facil: createMultilingualText('La violencia sexual es cuando alguien te obliga a hacer algo sexual que no quieres. Siempre necesitas dar tu permiso para cualquier acto sexual.'),
    senales_alerta: createMultilingualText('Señales de alerta: agresiones sexuales, acoso sexual, coacción sexual.'),
    hashtags: [sampleHashtags[0], sampleHashtags[3], sampleHashtags[6]],
    recursos_ayuda: ['016', '112'],
    activo: true,
    fecha_publicacion: new Date('2024-02-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-01-25'),
    fecha_modificacion: new Date('2024-02-01')
  },
  {
    id: '4',
    slug: 'violencia-economica',
    tipo: 'violencia',
    titulo: createMultilingualText('Violencia económica'),
    descripcion: createMultilingualText('Control o limitación del acceso a recursos económicos.'),
    descripcion_lectura_facil: createMultilingualText('La violencia económica es cuando alguien controla tu dinero. No te deja trabajar, te quita tu dinero o no te da lo necesario para vivir.'),
    senales_alerta: createMultilingualText('Señales de alerta: control del dinero, prohibición de trabajar, limitación de recursos básicos.'),
    hashtags: [sampleHashtags[0], sampleHashtags[4], sampleHashtags[6]],
    recursos_ayuda: ['016'],
    activo: true,
    fecha_publicacion: new Date('2024-02-10'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-05'),
    fecha_modificacion: new Date('2024-02-10')
  },
  {
    id: '5',
    slug: 'violencia-digital',
    tipo: 'violencia',
    titulo: createMultilingualText('Violencia digital'),
    descripcion: createMultilingualText('Violencia ejercida a través de medios digitales y redes sociales.'),
    descripcion_lectura_facil: createMultilingualText('La violencia digital es cuando alguien te hace daño usando internet o el móvil. Puede ser acoso, amenazas o compartir fotos sin tu permiso.'),
    senales_alerta: createMultilingualText('Señales de alerta: acoso online, amenazas por redes sociales, control de dispositivos, difusión de imágenes sin consentimiento.'),
    hashtags: [sampleHashtags[0], sampleHashtags[5], sampleHashtags[6]],
    recursos_ayuda: ['016', '017'],
    activo: true,
    fecha_publicacion: new Date('2024-03-01'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-02-25'),
    fecha_modificacion: new Date('2024-03-01')
  },
  {
    id: '6',
    slug: 'violencia-institucional',
    tipo: 'violencia',
    titulo: createMultilingualText('Violencia institucional'),
    descripcion: createMultilingualText('Acciones u omisiones de instituciones públicas que vulneran derechos.'),
    descripcion_lectura_facil: createMultilingualText('La violencia institucional es cuando las instituciones públicas no te ayudan o te tratan mal. Por ejemplo, cuando la policía o los servicios sociales no te creen o no te ayudan.'),
    senales_alerta: createMultilingualText('Señales de alerta: falta de respuesta institucional, revictimización, falta de recursos.'),
    hashtags: [sampleHashtags[0], sampleHashtags[7], sampleHashtags[6]],
    recursos_ayuda: ['016'],
    activo: true,
    fecha_publicacion: new Date('2024-03-15'),
    estado: 'publicado',
    fecha_creacion: new Date('2024-03-10'),
    fecha_modificacion: new Date('2024-03-15')
  }
];
