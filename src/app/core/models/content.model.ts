/**
 * Modelos de datos para contenidos
 * Implementa el modelo de datos común según US-004
 */

export type ContentType = 'historia' | 'concepto' | 'violencia' | 'recurso' | 'testimonio' | 'institucion';

/**
 * Estados del flujo de publicación de contenidos
 */
export type ContentStatus = 'borrador' | 'revisado' | 'publicado';

export interface MultilingualText {
  es: string;
  en?: string;
  ca?: string;
  val?: string;
  gl?: string;
  eu?: string;
}

export interface Reference {
  titulo: string;
  url?: string;
  autor?: string;
  anio?: number;
}

export interface Hashtag {
  id: string;
  nombre: MultilingualText;
  slug: string;
  descripcion?: string;
}

/**
 * Modelo base común para todos los contenidos
 */
export interface BaseContent {
  id: string;
  slug: string;
  tipo: ContentType;
  
  // Campos multiidioma
  titulo: MultilingualText;
  descripcion: MultilingualText;
  descripcion_lectura_facil: MultilingualText;
  
  // Vídeos en lengua de signos
  video_lse_url?: string;
  video_lsc_url?: string;
  video_transcription?: MultilingualText;
  video_subtitles_url?: string;
  
  // Metadatos
  hashtags: Hashtag[];
  referencias?: Reference[];
  
  // Campos opcionales según tipo
  anio?: number;  // Para historia
  autor?: string;
  duracion?: number;  // Para audiovisual en minutos
  
  // Control
  activo: boolean;
  fecha_publicacion: Date;
  orden?: number;
  estado: ContentStatus;  // Estado del flujo de publicación
  fecha_creacion: Date;
  fecha_modificacion: Date;
  creado_por?: string;  // ID del usuario que creó el contenido
  modificado_por?: string;  // ID del usuario que modificó el contenido
}

/**
 * Contenido de historia
 */
export interface HistoriaContent extends BaseContent {
  tipo: 'historia';
  anio: number;  // Requerido para historia
  anio_hasta?: number;  // Para periodos
}

/**
 * Contenido de concepto
 */
export interface ConceptoContent extends BaseContent {
  tipo: 'concepto';
}

/**
 * Contenido de violencia
 */
export interface ViolenciaContent extends BaseContent {
  tipo: 'violencia';
  senales_alerta?: MultilingualText;
  recursos_ayuda?: string[];  // IDs de instituciones de ayuda
}

/**
 * Tipo de recurso
 */
export type RecursoSubtipo = 'libro' | 'pelicula_serie' | 'documental';

/**
 * Contenido de recurso
 */
export interface RecursoContent extends BaseContent {
  tipo: 'recurso';
  subtipo: RecursoSubtipo;
  
  // Específico para libros
  isbn?: string;
  enlace_catalogo?: string;
  num_ediciones?: number;
  
  // Específico para películas/series
  direccion?: string;
  num_temporadas?: number;
  
  // Común para audiovisual
  duracion?: number;
}

/**
 * Contenido de testimonio
 */
export interface TestimonioContent extends BaseContent {
  tipo: 'testimonio';
  anonimizado: boolean;
  consentimiento_rgpd: boolean;
}

/**
 * Contenido de institución de ayuda
 */
export interface InstitucionContent extends BaseContent {
  tipo: 'institucion';
  telefono?: string;
  email?: string;
  web?: string;
  horario?: MultilingualText;
  ambito?: 'nacional' | 'autonomico' | 'local';
}

/**
 * Unión de todos los tipos de contenido
 */
export type Content = 
  | HistoriaContent 
  | ConceptoContent 
  | ViolenciaContent 
  | RecursoContent 
  | TestimonioContent 
  | InstitucionContent;

