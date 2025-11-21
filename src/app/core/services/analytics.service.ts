import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from './cookie.service';

/**
 * Tipos de eventos de vídeo que se pueden trackear
 */
export type VideoEventType = 'play' | 'pause' | 'completed';

/**
 * Tipo de lengua de signos
 */
export type SignLanguageType = 'lse' | 'lsc';

/**
 * Tipo de contenido
 */
export type ContentType = 'historia' | 'concepto' | 'violencia' | 'recurso';

/**
 * Evento de métrica de vídeo
 */
export interface VideoMetricEvent {
  eventType: VideoEventType;
  signLanguageType: SignLanguageType;
  videoTitle: string;
  contentId?: string;
  contentType?: ContentType;
  timestamp: number;
  currentTime: number;
  duration: number;
  percentageWatched: number;
}

/**
 * Evento de vista de contenido
 */
export interface ContentViewEvent {
  contentId: string;
  contentType: ContentType;
  hashtags: string[];
  timestamp: number;
}

/**
 * Evento de búsqueda
 */
export interface SearchEvent {
  query: string;
  filters?: Record<string, any>;
  resultsCount: number;
  timestamp: number;
}

/**
 * Servicio de métricas y analytics
 * Implementa los requisitos de US-023
 * Respeta el consentimiento de cookies (US-017)
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly STORAGE_KEY_VIDEO = 'analytics_video_events';
  private readonly STORAGE_KEY_CONTENT = 'analytics_content_views';
  private readonly STORAGE_KEY_SEARCH = 'analytics_search_events';
  private readonly MAX_EVENTS_STORED = 1000; // Límite de eventos almacenados localmente

  private isBrowser: boolean;
  private videoTrackingData: Map<string, {
    startTime?: number;
    lastPauseTime?: number;
    totalPlayTime: number;
    maxPercentage: number;
  }> = new Map();

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private cookieService: CookieService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Verifica si el tracking está habilitado (respetando consentimiento de cookies)
   */
  private isTrackingEnabled(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return this.cookieService.isCategoryEnabled('analytics');
  }

  /**
   * Trackea un evento de reproducción de vídeo (play)
   */
  trackVideoPlay(
    signLanguageType: SignLanguageType,
    videoTitle: string,
    contentId?: string,
    contentType?: ContentType
  ): void {
    if (!this.isTrackingEnabled()) {
      return;
    }

    const videoKey = `${contentId || videoTitle}_${signLanguageType}`;
    const trackingData = this.videoTrackingData.get(videoKey) || {
      totalPlayTime: 0,
      maxPercentage: 0
    };

    trackingData.startTime = Date.now();
    trackingData.lastPauseTime = undefined;
    this.videoTrackingData.set(videoKey, trackingData);

    // No guardamos el evento de play inmediatamente, esperamos a pause o completed
  }

  /**
   * Trackea un evento de pausa de vídeo
   */
  trackVideoPause(
    signLanguageType: SignLanguageType,
    videoTitle: string,
    currentTime: number,
    duration: number,
    contentId?: string,
    contentType?: ContentType
  ): void {
    if (!this.isTrackingEnabled()) {
      return;
    }

    const videoKey = `${contentId || videoTitle}_${signLanguageType}`;
    const trackingData = this.videoTrackingData.get(videoKey);
    
    if (trackingData?.startTime) {
      const playDuration = Date.now() - trackingData.startTime;
      trackingData.totalPlayTime += playDuration;
      trackingData.lastPauseTime = Date.now();
    }

    const percentageWatched = duration > 0 ? (currentTime / duration) * 100 : 0;
    const maxPercentage = Math.max(trackingData?.maxPercentage || 0, percentageWatched);

    const event: VideoMetricEvent = {
      eventType: 'pause',
      signLanguageType,
      videoTitle,
      contentId,
      contentType,
      timestamp: Date.now(),
      currentTime,
      duration,
      percentageWatched
    };

    this.saveVideoEvent(event);

    // Actualizar el tracking data
    if (trackingData) {
      trackingData.maxPercentage = maxPercentage;
      this.videoTrackingData.set(videoKey, trackingData);
    }
  }

  /**
   * Trackea cuando un vídeo se completa
   */
  trackVideoCompleted(
    signLanguageType: SignLanguageType,
    videoTitle: string,
    duration: number,
    contentId?: string,
    contentType?: ContentType
  ): void {
    if (!this.isTrackingEnabled()) {
      return;
    }

    const videoKey = `${contentId || videoTitle}_${signLanguageType}`;
    const trackingData = this.videoTrackingData.get(videoKey);
    
    if (trackingData?.startTime) {
      const playDuration = Date.now() - trackingData.startTime;
      trackingData.totalPlayTime += playDuration;
    }

    const event: VideoMetricEvent = {
      eventType: 'completed',
      signLanguageType,
      videoTitle,
      contentId,
      contentType,
      timestamp: Date.now(),
      currentTime: duration,
      duration,
      percentageWatched: 100
    };

    this.saveVideoEvent(event);

    // Limpiar el tracking data después de completar
    this.videoTrackingData.delete(videoKey);
  }

  /**
   * Trackea actualización de tiempo del vídeo (para calcular porcentaje visualizado)
   */
  trackVideoTimeUpdate(
    signLanguageType: SignLanguageType,
    videoTitle: string,
    currentTime: number,
    duration: number,
    contentId?: string,
    contentType?: ContentType
  ): void {
    if (!this.isTrackingEnabled()) {
      return;
    }

    const videoKey = `${contentId || videoTitle}_${signLanguageType}`;
    const trackingData = this.videoTrackingData.get(videoKey) || {
      totalPlayTime: 0,
      maxPercentage: 0
    };

    const percentageWatched = duration > 0 ? (currentTime / duration) * 100 : 0;
    trackingData.maxPercentage = Math.max(trackingData.maxPercentage, percentageWatched);
    this.videoTrackingData.set(videoKey, trackingData);
  }

  /**
   * Trackea una vista de contenido
   */
  trackContentView(
    contentId: string,
    contentType: ContentType,
    hashtags: string[] = []
  ): void {
    if (!this.isTrackingEnabled()) {
      return;
    }

    const event: ContentViewEvent = {
      contentId,
      contentType,
      hashtags,
      timestamp: Date.now()
    };

    this.saveContentViewEvent(event);
  }

  /**
   * Trackea una búsqueda
   */
  trackSearch(
    query: string,
    resultsCount: number,
    filters?: Record<string, any>
  ): void {
    if (!this.isTrackingEnabled()) {
      return;
    }

    const event: SearchEvent = {
      query,
      filters,
      resultsCount,
      timestamp: Date.now()
    };

    this.saveSearchEvent(event);
  }

  /**
   * Guarda un evento de vídeo en localStorage
   */
  private saveVideoEvent(event: VideoMetricEvent): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_VIDEO);
      const events: VideoMetricEvent[] = stored ? JSON.parse(stored) : [];
      
      events.push(event);
      
      // Limitar el número de eventos almacenados
      if (events.length > this.MAX_EVENTS_STORED) {
        events.shift(); // Eliminar el evento más antiguo
      }
      
      localStorage.setItem(this.STORAGE_KEY_VIDEO, JSON.stringify(events));
    } catch (error) {
      console.error('Error al guardar evento de vídeo:', error);
    }
  }

  /**
   * Guarda un evento de vista de contenido en localStorage
   */
  private saveContentViewEvent(event: ContentViewEvent): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_CONTENT);
      const events: ContentViewEvent[] = stored ? JSON.parse(stored) : [];
      
      events.push(event);
      
      // Limitar el número de eventos almacenados
      if (events.length > this.MAX_EVENTS_STORED) {
        events.shift();
      }
      
      localStorage.setItem(this.STORAGE_KEY_CONTENT, JSON.stringify(events));
    } catch (error) {
      console.error('Error al guardar evento de vista de contenido:', error);
    }
  }

  /**
   * Guarda un evento de búsqueda en localStorage
   */
  private saveSearchEvent(event: SearchEvent): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_SEARCH);
      const events: SearchEvent[] = stored ? JSON.parse(stored) : [];
      
      events.push(event);
      
      // Limitar el número de eventos almacenados
      if (events.length > this.MAX_EVENTS_STORED) {
        events.shift();
      }
      
      localStorage.setItem(this.STORAGE_KEY_SEARCH, JSON.stringify(events));
    } catch (error) {
      console.error('Error al guardar evento de búsqueda:', error);
    }
  }

  /**
   * Obtiene todos los eventos de vídeo almacenados
   */
  getVideoEvents(): VideoMetricEvent[] {
    if (!this.isBrowser) {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_VIDEO);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al obtener eventos de vídeo:', error);
      return [];
    }
  }

  /**
   * Obtiene todos los eventos de vista de contenido almacenados
   */
  getContentViewEvents(): ContentViewEvent[] {
    if (!this.isBrowser) {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_CONTENT);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al obtener eventos de vista de contenido:', error);
      return [];
    }
  }

  /**
   * Obtiene todos los eventos de búsqueda almacenados
   */
  getSearchEvents(): SearchEvent[] {
    if (!this.isBrowser) {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_SEARCH);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error al obtener eventos de búsqueda:', error);
      return [];
    }
  }

  /**
   * Calcula estadísticas de vídeos por tipo de lengua de signos
   */
  getVideoLanguageStats(): { lse: number; lsc: number; total: number } {
    const events = this.getVideoEvents();
    const stats = { lse: 0, lsc: 0, total: events.length };
    
    events.forEach(event => {
      if (event.signLanguageType === 'lse') {
        stats.lse++;
      } else if (event.signLanguageType === 'lsc') {
        stats.lsc++;
      }
    });
    
    return stats;
  }

  /**
   * Calcula estadísticas de vistas por categoría de contenido
   */
  getContentViewStatsByCategory(): Record<ContentType, number> {
    const events = this.getContentViewEvents();
    const stats: Record<string, number> = {};
    
    events.forEach(event => {
      stats[event.contentType] = (stats[event.contentType] || 0) + 1;
    });
    
    return stats as Record<ContentType, number>;
  }

  /**
   * Calcula estadísticas de vistas por hashtag
   */
  getContentViewStatsByHashtag(): Record<string, number> {
    const events = this.getContentViewEvents();
    const stats: Record<string, number> = {};
    
    events.forEach(event => {
      event.hashtags.forEach(hashtag => {
        stats[hashtag] = (stats[hashtag] || 0) + 1;
      });
    });
    
    return stats;
  }

  /**
   * Calcula el porcentaje de fichas con vídeo LSE y LSC disponibles
   * Requiere pasar los contenidos para analizar
   */
  calculateVideoAvailabilityStats(contents: Array<{ video_lse_url?: string; video_lsc_url?: string }>): {
    total: number;
    withLSE: number;
    withLSC: number;
    withBoth: number;
    percentageLSE: number;
    percentageLSC: number;
    percentageBoth: number;
  } {
    const total = contents.length;
    let withLSE = 0;
    let withLSC = 0;
    let withBoth = 0;
    
    contents.forEach(content => {
      const hasLSE = !!content.video_lse_url;
      const hasLSC = !!content.video_lsc_url;
      
      if (hasLSE) withLSE++;
      if (hasLSC) withLSC++;
      if (hasLSE && hasLSC) withBoth++;
    });
    
    return {
      total,
      withLSE,
      withLSC,
      withBoth,
      percentageLSE: total > 0 ? (withLSE / total) * 100 : 0,
      percentageLSC: total > 0 ? (withLSC / total) * 100 : 0,
      percentageBoth: total > 0 ? (withBoth / total) * 100 : 0
    };
  }

  /**
   * Obtiene las búsquedas más frecuentes
   */
  getMostFrequentSearches(limit: number = 10): Array<{ query: string; count: number }> {
    const events = this.getSearchEvents();
    const queryCounts: Record<string, number> = {};
    
    events.forEach(event => {
      if (event.query.trim()) {
        queryCounts[event.query] = (queryCounts[event.query] || 0) + 1;
      }
    });
    
    return Object.entries(queryCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Obtiene estadísticas generales de métricas
   */
  getGeneralStats(): {
    totalVideoEvents: number;
    totalContentViews: number;
    totalSearches: number;
    videoPlayCount: number;
    videoPauseCount: number;
    videoCompletedCount: number;
  } {
    const videoEvents = this.getVideoEvents();
    const contentViews = this.getContentViewEvents();
    const searches = this.getSearchEvents();
    
    return {
      totalVideoEvents: videoEvents.length,
      totalContentViews: contentViews.length,
      totalSearches: searches.length,
      videoPlayCount: videoEvents.filter(e => e.eventType === 'play').length,
      videoPauseCount: videoEvents.filter(e => e.eventType === 'pause').length,
      videoCompletedCount: videoEvents.filter(e => e.eventType === 'completed').length
    };
  }

  /**
   * Limpia todos los eventos almacenados (útil para testing o reset)
   */
  clearAllEvents(): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.removeItem(this.STORAGE_KEY_VIDEO);
    localStorage.removeItem(this.STORAGE_KEY_CONTENT);
    localStorage.removeItem(this.STORAGE_KEY_SEARCH);
    this.videoTrackingData.clear();
  }
}

