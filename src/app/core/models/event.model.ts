/**
 * Modelo de datos para eventos de agenda
 * Implementa la funcionalidad de US-027
 */

import { MultilingualText } from './content.model';

/**
 * Modelo de evento de agenda
 */
export interface AgendaEvent {
  id: string;
  slug: string;
  
  // Campos multiidioma
  titulo: MultilingualText;
  descripcion: MultilingualText;
  
  // Fecha y hora del evento
  fecha: Date;
  hora?: string; // Formato HH:mm
  
  // Lugar del evento
  lugar: MultilingualText;
  direccion?: MultilingualText;
  
  // Vídeo en lengua de signos
  video_signado?: string;
  
  // Metadatos
  activo: boolean;
  fecha_creacion: Date;
  fecha_modificacion: Date;
  
  // Tipo de evento (opcional para categorización)
  tipo?: 'taller' | 'manifestacion' | 'conferencia' | 'actividad' | 'otro';
}

