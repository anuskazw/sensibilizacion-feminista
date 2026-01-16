# Sistema de Analytics

## 📋 Información General

**Historia de Usuario**: US-023  
**Archivo**: `src/app/core/services/analytics.service.ts`  
**Estado**: ✅ Completada

## 🎯 Objetivo

Sistema de métricas avanzadas para trackear interacciones de usuarios con la aplicación, respetando el consentimiento de cookies y proporcionando estadísticas útiles para mejorar la experiencia.

## 🏗️ Arquitectura

### Almacenamiento
- **Ubicación**: `localStorage` del navegador
- **Límite**: 1000 eventos por tipo
- **Persistencia**: Datos permanecen entre sesiones

### Claves de Almacenamiento
```typescript
'analytics_video_events'      // Eventos de vídeo
'analytics_content_views'     // Vistas de contenido
'analytics_search_events'     // Búsquedas realizadas
```

## 📊 Tipos de Eventos

### 1. VideoEvent

Eventos relacionados con reproducción de vídeos en lengua de signos:

```typescript
interface VideoEvent {
  timestamp: Date;
  eventType: 'play' | 'pause' | 'completed';
  videoId: string;
  signLanguageType: 'lse' | 'lsc';
  percentageWatched: number;
  contentId?: string;
  contentType?: ContentType;
}
```

**Campos**:
- `timestamp`: Momento del evento
- `eventType`: Tipo de acción (reproducir, pausar, completar)
- `videoId`: Identificador único del vídeo
- `signLanguageType`: LSE (Lengua de Signos Española) o LSC (Lengua de Signos Catalana)
- `percentageWatched`: Porcentaje visualizado (0-100)
- `contentId`: ID del contenido asociado (opcional)
- `contentType`: Tipo de contenido (opcional)

### 2. ContentViewEvent

Vistas de páginas y contenidos:

```typescript
interface ContentViewEvent {
  timestamp: Date;
  contentId: string;
  contentType: ContentType;
  contentTitle: string;
  hashtags: string[];
  language: string;
}
```

**Campos**:
- `timestamp`: Momento de la vista
- `contentId`: ID del contenido visualizado
- `contentType`: historia | concepto | violencia | recurso | testimonio | institucion
- `contentTitle`: Título del contenido
- `hashtags`: Hashtags asociados
- `language`: Idioma de visualización

### 3. SearchEvent

Búsquedas realizadas por usuarios:

```typescript
interface SearchEvent {
  timestamp: Date;
  query: string;
  filters: SearchFilters;
  resultsCount: number;
  language: string;
}
```

**Campos**:
- `timestamp`: Momento de la búsqueda
- `query`: Texto buscado
- `filters`: Filtros aplicados
- `resultsCount`: Número de resultados
- `language`: Idioma de búsqueda

## 🔧 API del Servicio

### Tracking de Vídeos

```typescript
// Reproducir vídeo
trackVideoPlay(
  videoId: string,
  signLanguageType: 'lse' | 'lsc',
  contentId?: string,
  contentType?: ContentType
): void

// Pausar vídeo
trackVideoPause(
  videoId: string,
  signLanguageType: 'lse' | 'lsc',
  percentageWatched: number,
  contentId?: string,
  contentType?: ContentType
): void

// Vídeo completado
trackVideoCompleted(
  videoId: string,
  signLanguageType: 'lse' | 'lsc',
  contentId?: string,
  contentType?: ContentType
): void

// Actualizar porcentaje
trackVideoTimeUpdate(
  videoId: string,
  currentTime: number,
  duration: number
): void
```

### Tracking de Vistas

```typescript
trackContentView(
  contentId: string,
  contentType: ContentType,
  contentTitle: string,
  hashtags: string[] = [],
  language: string = 'es'
): void
```

### Tracking de Búsquedas

```typescript
trackSearch(
  query: string,
  filters: SearchFilters,
  resultsCount: number,
  language: string = 'es'
): void
```

### Consulta de Eventos

```typescript
// Obtener eventos
getVideoEvents(): VideoEvent[]
getContentViewEvents(): ContentViewEvent[]
getSearchEvents(): SearchEvent[]

// Limpiar eventos
clearAllEvents(): void
```

## 📈 Estadísticas Disponibles

### 1. Estadísticas Generales

```typescript
getGeneralStats(): {
  totalVideoEvents: number;
  totalContentViews: number;
  totalSearches: number;
  videoPlays: number;
  videoPauses: number;
  videoCompletions: number;
  averageVideoCompletion: number;
}
```

### 2. Estadísticas de Vídeo por Idioma

```typescript
getVideoLanguageStats(): {
  lse: {
    plays: number;
    pauses: number;
    completions: number;
    averageCompletion: number;
  };
  lsc: {
    plays: number;
    pauses: number;
    completions: number;
    averageCompletion: number;
  };
}
```

### 3. Vistas por Categoría

```typescript
getContentViewStatsByCategory(): {
  [key in ContentType]: number;
}
```

**Ejemplo de salida**:
```typescript
{
  historia: 45,
  concepto: 78,
  violencia: 23,
  recurso: 56,
  testimonio: 12,
  institucion: 34
}
```

### 4. Vistas por Hashtag

```typescript
getContentViewStatsByHashtag(): {
  [hashtag: string]: number;
}
```

**Ejemplo de salida**:
```typescript
{
  'feminismo': 120,
  'igualdad': 89,
  'violencia-de-genero': 67,
  'accesibilidad': 45
}
```

### 5. Búsquedas Más Frecuentes

```typescript
getMostFrequentSearches(limit: number = 10): {
  query: string;
  count: number;
}[]
```

### 6. Disponibilidad de Vídeos

```typescript
calculateVideoAvailabilityStats(contents: Content[]): {
  total: number;
  withLSE: number;
  withLSC: number;
  withBoth: number;
  percentageLSE: number;
  percentageLSC: number;
  percentageBoth: number;
}
```

## 🔒 Privacidad y Consentimiento

### Verificación de Consentimiento

El servicio verifica automáticamente el consentimiento antes de trackear:

```typescript
private isTrackingEnabled(): boolean {
  return this.cookieService.isCategoryEnabled('analytics');
}
```

**Comportamiento**:
- Si el usuario **NO** ha aceptado cookies de analytics → No se registra nada
- Si el usuario **SÍ** ha aceptado → Se registran todos los eventos

### Cumplimiento RGPD

✅ **Consentimiento explícito**: Usuario debe aceptar cookies de analytics  
✅ **Datos anónimos**: No se almacenan datos personales identificables  
✅ **Almacenamiento local**: Datos en el navegador del usuario  
✅ **Control del usuario**: Puede revocar consentimiento en cualquier momento  
✅ **Transparencia**: Usuario informado sobre qué se trackea

## 🔌 Integración en Componentes

### SignLanguageVideoPlayerComponent

```typescript
export class SignLanguageVideoPlayerComponent {
  constructor(private analytics: AnalyticsService) {}
  
  onPlayPause() {
    if (this.isPlaying) {
      this.analytics.trackVideoPause(
        this.videoId,
        this.currentLanguage,
        this.calculatePercentage(),
        this.contentId,
        this.contentType
      );
    } else {
      this.analytics.trackVideoPlay(
        this.videoId,
        this.currentLanguage,
        this.contentId,
        this.contentType
      );
    }
  }
  
  onTimeUpdate() {
    const percentage = this.calculatePercentage();
    this.analytics.trackVideoTimeUpdate(
      this.videoId,
      this.currentTime,
      this.duration
    );
    
    if (percentage >= 95) {
      this.analytics.trackVideoCompleted(
        this.videoId,
        this.currentLanguage,
        this.contentId,
        this.contentType
      );
    }
  }
}
```

### HistoriaComponent / ConceptosComponent / ViolenciaComponent

```typescript
export class HistoriaComponent implements OnInit {
  constructor(private analytics: AnalyticsService) {}
  
  ngOnInit() {
    this.analytics.trackContentView(
      'historia-page',
      'historia',
      'Página de Historia',
      ['historia', 'feminismo'],
      this.currentLanguage
    );
  }
}
```

### SearchFilterService

```typescript
export class SearchFilterService {
  constructor(private analytics: AnalyticsService) {}
  
  search(contents: Content[], query: string, filters?: SearchFilters): Content[] {
    const results = this.performSearch(contents, query, filters);
    
    // Trackear búsqueda
    this.analytics.trackSearch(
      query,
      filters || {},
      results.length,
      this.currentLanguage
    );
    
    return results;
  }
}
```

## 📊 Panel de Administración

### Visualización de Métricas

El panel de administración (`AdminComponent`) muestra todas las métricas:

```typescript
export class AdminComponent implements OnInit {
  generalStats: any;
  videoLanguageStats: any;
  contentViewStats: any;
  videoAvailabilityStats: any;
  mostFrequentSearches: any[];
  
  ngOnInit() {
    this.loadAnalytics();
  }
  
  loadAnalytics() {
    this.generalStats = this.analytics.getGeneralStats();
    this.videoLanguageStats = this.analytics.getVideoLanguageStats();
    this.contentViewStats = this.analytics.getContentViewStatsByCategory();
    this.videoAvailabilityStats = this.analytics.calculateVideoAvailabilityStats(
      this.getAllContents()
    );
    this.mostFrequentSearches = this.analytics.getMostFrequentSearches(10);
  }
}
```

### Secciones del Panel

1. **Eventos de Vídeo**
   - Total de eventos
   - Plays, pauses, completados
   - Porcentaje de finalización promedio

2. **Vistas de Contenido**
   - Total de vistas
   - Vistas por categoría (historia, concepto, violencia, etc.)

3. **Búsquedas**
   - Total de búsquedas
   - Búsquedas más frecuentes (top 10)

4. **Idiomas de Vídeo**
   - Estadísticas LSE vs LSC
   - Reproducciones, pausas, completados por idioma

5. **Disponibilidad de Vídeos**
   - Porcentaje de contenidos con LSE
   - Porcentaje de contenidos con LSC
   - Porcentaje con ambos idiomas

## 🧪 Testing

### Casos de Prueba Recomendados

```typescript
describe('AnalyticsService', () => {
  it('debe trackear evento de play', () => {
    service.trackVideoPlay('video-1', 'lse');
    const events = service.getVideoEvents();
    expect(events.length).toBe(1);
    expect(events[0].eventType).toBe('play');
  });
  
  it('debe respetar consentimiento de cookies', () => {
    cookieService.disableCategory('analytics');
    service.trackVideoPlay('video-1', 'lse');
    const events = service.getVideoEvents();
    expect(events.length).toBe(0);
  });
  
  it('debe calcular estadísticas correctamente', () => {
    service.trackVideoPlay('video-1', 'lse');
    service.trackVideoCompleted('video-1', 'lse');
    const stats = service.getGeneralStats();
    expect(stats.videoPlays).toBe(1);
    expect(stats.videoCompletions).toBe(1);
  });
});
```

## 📁 Archivos Relacionados

```
src/app/core/services/
└── analytics.service.ts                    # Servicio principal

src/app/shared/components/
└── sign-language-video-player/
    └── sign-language-video-player.component.ts  # Integración de tracking

src/app/pages/
├── historia/historia.component.ts          # Tracking de vistas
├── conceptos/conceptos.component.ts        # Tracking de vistas
├── violencia/violencia.component.ts        # Tracking de vistas
└── admin/
    ├── admin.component.ts                  # Visualización de métricas
    └── admin.component.html                # UI de métricas
```

## 🔮 Mejoras Futuras

### Corto Plazo
1. Tests unitarios completos
2. Exportar métricas a CSV/JSON
3. Gráficos visuales en el panel

### Mediano Plazo
1. Envío de métricas a backend
2. Análisis de tendencias temporales
3. Alertas automáticas

### Largo Plazo
1. Machine learning para recomendaciones
2. Heatmaps de interacción
3. A/B testing integrado
