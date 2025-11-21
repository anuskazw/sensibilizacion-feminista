/**
 * Modelos de datos para blog y comentarios
 * Implementa la funcionalidad de US-026
 */

import { MultilingualText, Hashtag } from './content.model';

/**
 * Estado de moderación de comentarios
 */
export type CommentStatus = 'pendiente' | 'aprobado' | 'rechazado';

/**
 * Modelo de comentario del blog
 */
export interface BlogComment {
  id: string;
  articulo_id: string;
  
  // Contenido del comentario
  contenido: string;
  contenido_lectura_facil?: string;
  
  // Autor
  autor_nombre: string;
  autor_email?: string; // Opcional para usuarios no registrados
  
  // Moderación
  estado: CommentStatus;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  fecha_aprobacion?: Date;
  moderado_por?: string; // ID del moderador
  
  // Respuestas (comentarios anidados)
  respuesta_a?: string; // ID del comentario padre
  respuestas?: BlogComment[];
  
  // Metadatos
  ip_address?: string; // Para moderación
  user_agent?: string; // Para moderación
}

/**
 * Modelo de artículo del blog
 */
export interface BlogArticle {
  id: string;
  slug: string;
  
  // Contenido multiidioma
  titulo: MultilingualText;
  resumen: MultilingualText;
  contenido: MultilingualText;
  contenido_lectura_facil?: MultilingualText;
  
  // Autor
  autor: string;
  autor_bio?: MultilingualText;
  
  // Imagen destacada
  imagen_destacada?: string;
  imagen_alt?: MultilingualText;
  
  // Categorías y etiquetas
  categorias: Hashtag[];
  etiquetas: Hashtag[];
  
  // Comentarios
  comentarios_habilitados: boolean;
  comentarios?: BlogComment[];
  num_comentarios_aprobados?: number;
  
  // SEO
  meta_descripcion?: MultilingualText;
  meta_keywords?: string[];
  
  // Vídeos en lengua de signos
  video_lse_url?: string;
  video_lsc_url?: string;
  video_transcription?: MultilingualText;
  video_subtitles_url?: string;
  
  // Control
  activo: boolean;
  fecha_publicacion: Date;
  fecha_modificacion: Date;
  fecha_creacion: Date;
  estado: 'borrador' | 'publicado';
  
  // Estadísticas
  vistas?: number;
  likes?: number;
}

