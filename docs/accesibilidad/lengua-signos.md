# Integración de Lengua de Signos

## 📋 Información General

**Historia de Usuario**: US-002  
**Componente**: `SignLanguageVideoPlayerComponent`  
**Estado**: ✅ Implementado

## 🎯 Objetivo

Proporcionar acceso a contenidos en **Lengua de Signos Española (LSE)** y **Lengua de Signos Catalana (LSC)** para personas sordas, garantizando una experiencia inclusiva y accesible.

## 🏗️ Arquitectura

### Componente Principal

**Ubicación**: `src/app/shared/components/sign-language-video-player/`

```typescript
@Component({
  selector: 'app-sign-language-video-player',
  templateUrl: './sign-language-video-player.component.html',
  styleUrls: ['./sign-language-video-player.component.css']
})
export class SignLanguageVideoPlayerComponent {
  @Input() lseUrl?: string;           // URL del vídeo en LSE
  @Input() lscUrl?: string;           // URL del vídeo en LSC
  @Input() transcription?: MultilingualText;  // Transcripción del vídeo
  @Input() subtitlesUrl?: string;     // URL de subtítulos
  @Input() contentId?: string;        // ID del contenido asociado
  @Input() contentType?: ContentType; // Tipo de contenido
  
  currentLanguage: 'lse' | 'lsc' = 'lse';
  isPlaying = false;
  currentTime = 0;
  duration = 0;
}
```

## 🎨 Características

### 1. Selector de Idioma de Signos

Permite cambiar entre LSE y LSC:

```html
<div class="language-selector">
  <button 
    [class.active]="currentLanguage === 'lse'"
    (click)="switchLanguage('lse')"
    aria-label="Cambiar a Lengua de Signos Española">
    LSE
  </button>
  <button 
    [class.active]="currentLanguage === 'lsc'"
    (click)="switchLanguage('lsc')"
    aria-label="Cambiar a Lengua de Signos Catalana">
    LSC
  </button>
</div>
```

### 2. Reproductor de Vídeo Accesible

```html
<video 
  #videoPlayer
  [src]="currentVideoUrl"
  [attr.aria-label]="'Vídeo en ' + (currentLanguage === 'lse' ? 'LSE' : 'LSC')"
  (play)="onPlay()"
  (pause)="onPause()"
  (timeupdate)="onTimeUpdate()"
  (ended)="onEnded()">
  <track 
    *ngIf="subtitlesUrl"
    kind="subtitles"
    [src]="subtitlesUrl"
    srclang="es"
    label="Español">
</video>
```

### 3. Controles Personalizados

```html
<div class="controls" role="group" aria-label="Controles de reproducción">
  <button 
    (click)="togglePlay()"
    [attr.aria-label]="isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo'">
    <i [class]="isPlaying ? 'icon-pause' : 'icon-play'"></i>
  </button>
  
  <div class="progress-bar" role="slider" 
       [attr.aria-valuenow]="currentTime"
       [attr.aria-valuemin]="0"
       [attr.aria-valuemax]="duration"
       aria-label="Barra de progreso">
    <div class="progress" [style.width.%]="progressPercentage"></div>
  </div>
  
  <span class="time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
  
  <button 
    (click)="toggleFullscreen()"
    aria-label="Pantalla completa">
    <i class="icon-fullscreen"></i>
  </button>
</div>
```

### 4. Transcripción

Texto alternativo del contenido del vídeo:

```html
<div class="transcription" *ngIf="transcription">
  <h3>Transcripción</h3>
  <button 
    (click)="toggleTranscription()"
    [attr.aria-expanded]="showTranscription"
    aria-controls="transcription-content">
    {{ showTranscription ? 'Ocultar' : 'Mostrar' }} transcripción
  </button>
  <div 
    id="transcription-content"
    *ngIf="showTranscription"
    [innerHTML]="getTranscription()">
  </div>
</div>
```

## 📊 Tracking de Analytics

El componente integra tracking automático de eventos:

```typescript
onPlay() {
  this.isPlaying = true;
  this.analytics.trackVideoPlay(
    this.videoId,
    this.currentLanguage,
    this.contentId,
    this.contentType
  );
}

onPause() {
  this.isPlaying = false;
  const percentage = (this.currentTime / this.duration) * 100;
  this.analytics.trackVideoPause(
    this.videoId,
    this.currentLanguage,
    percentage,
    this.contentId,
    this.contentType
  );
}

onEnded() {
  this.analytics.trackVideoCompleted(
    this.videoId,
    this.currentLanguage,
    this.contentId,
    this.contentType
  );
}
```

## 🔌 Integración en Contenidos

### En el Modelo de Datos

```typescript
interface BaseContent {
  // ... otros campos
  video_lse_url?: string;
  video_lsc_url?: string;
  video_transcription?: MultilingualText;
  video_subtitles_url?: string;
}
```

### Uso en Componentes

```typescript
export class ConceptoDetailComponent {
  concepto: ConceptoContent;
  
  // En el template:
  // <app-sign-language-video-player
  //   [lseUrl]="concepto.video_lse_url"
  //   [lscUrl]="concepto.video_lsc_url"
  //   [transcription]="concepto.video_transcription"
  //   [subtitlesUrl]="concepto.video_subtitles_url"
  //   [contentId]="concepto.id"
  //   [contentType]="concepto.tipo">
  // </app-sign-language-video-player>
}
```

## ♿ Accesibilidad

### Cumplimiento WCAG 2.2 AA

#### 1.2.1 Solo audio y solo vídeo (grabado) - Nivel A
✅ **Transcripción disponible** para todos los vídeos

#### 1.2.2 Subtítulos (grabados) - Nivel A
✅ **Subtítulos opcionales** mediante archivo VTT

#### 1.2.3 Audiodescripción o medio alternativo (grabado) - Nivel A
✅ **Transcripción completa** como alternativa

#### 1.2.5 Audiodescripción (grabada) - Nivel AA
✅ **Lengua de signos** como alternativa visual

#### 2.1 Accesible por teclado
✅ **Todos los controles accesibles con teclado**
- `Space`: Play/Pause
- `←` / `→`: Retroceder/Avanzar 5 segundos
- `F`: Pantalla completa
- `M`: Silenciar/Activar sonido

```typescript
@HostListener('keydown', ['$event'])
onKeyDown(event: KeyboardEvent) {
  switch(event.key) {
    case ' ':
      event.preventDefault();
      this.togglePlay();
      break;
    case 'ArrowLeft':
      this.seek(-5);
      break;
    case 'ArrowRight':
      this.seek(5);
      break;
    case 'f':
    case 'F':
      this.toggleFullscreen();
      break;
    case 'm':
    case 'M':
      this.toggleMute();
      break;
  }
}
```

#### 4.1.3 Mensajes de estado
✅ **Anuncios de cambios de estado**

```html
<div role="status" aria-live="polite" class="sr-only">
  {{ statusMessage }}
</div>
```

```typescript
updateStatus(message: string) {
  this.statusMessage = message;
  // Ejemplo: "Reproduciendo vídeo en LSE"
  // Ejemplo: "Vídeo pausado a los 2 minutos 30 segundos"
}
```

## 🎨 Estilos CSS

### Responsive

```css
.video-player-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

/* Desktop */
.video-player {
  aspect-ratio: 16 / 9;
}

/* Mobile */
@media (max-width: 768px) {
  .controls {
    font-size: 0.9rem;
  }
  
  .language-selector button {
    padding: 0.5rem 1rem;
  }
}
```

### Accesibilidad Visual

```css
/* Foco visible */
.controls button:focus {
  outline: 2px solid #5c2d91;
  outline-offset: 2px;
}

/* Alto contraste */
@media (prefers-contrast: high) {
  .controls {
    background: black;
    color: white;
  }
}

/* Reducción de movimiento */
@media (prefers-reduced-motion: reduce) {
  .progress {
    transition: none;
  }
}
```

## 📁 Estructura de Archivos

```
src/app/shared/components/sign-language-video-player/
├── sign-language-video-player.component.ts       # Lógica del componente
├── sign-language-video-player.component.html     # Template
├── sign-language-video-player.component.css      # Estilos
└── sign-language-video-player.component.spec.ts  # Tests (pendiente)
```

## 🔧 Configuración de Vídeos

### Formato Recomendado

- **Formato**: MP4 (H.264)
- **Resolución**: 1280×720 (HD) o 1920×1080 (Full HD)
- **Frame rate**: 25-30 fps
- **Bitrate**: 2-5 Mbps
- **Audio**: AAC, 128 kbps (opcional, para ambiente)

### Ubicación de Archivos

```
/assets/videos/
├── lse/
│   ├── concepto-feminismo.mp4
│   ├── concepto-igualdad.mp4
│   └── ...
├── lsc/
│   ├── concepto-feminismo.mp4
│   ├── concepto-igualdad.mp4
│   └── ...
└── subtitles/
    ├── concepto-feminismo-es.vtt
    └── ...
```

### Formato de Subtítulos (WebVTT)

```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
El feminismo es un movimiento social y político

00:00:05.000 --> 00:00:10.000
que busca la igualdad de derechos entre hombres y mujeres
```

## 🧪 Testing

### Tests Unitarios (Pendiente)

```typescript
describe('SignLanguageVideoPlayerComponent', () => {
  it('debe cambiar entre LSE y LSC', () => {
    component.switchLanguage('lsc');
    expect(component.currentLanguage).toBe('lsc');
  });
  
  it('debe trackear eventos de reproducción', () => {
    spyOn(analytics, 'trackVideoPlay');
    component.onPlay();
    expect(analytics.trackVideoPlay).toHaveBeenCalled();
  });
  
  it('debe ser accesible por teclado', () => {
    const event = new KeyboardEvent('keydown', { key: ' ' });
    component.onKeyDown(event);
    expect(component.isPlaying).toBe(true);
  });
});
```

### Tests E2E (Pendiente)

```typescript
test('reproducir vídeo en LSE', async ({ page }) => {
  await page.goto('/conceptos/feminismo');
  await page.click('button[aria-label="Reproducir vídeo"]');
  await expect(page.locator('video')).toHaveAttribute('src', /lse/);
});
```

## 📊 Métricas

### Cobertura de Vídeos

Objetivo: 100% de contenidos con vídeos en LSE y LSC

```typescript
const stats = analyticsService.calculateVideoAvailabilityStats(contents);
// {
//   total: 100,
//   withLSE: 85,
//   withLSC: 70,
//   withBoth: 65,
//   percentageLSE: 85%,
//   percentageLSC: 70%,
//   percentageBoth: 65%
// }
```

### Uso de Vídeos

```typescript
const videoStats = analyticsService.getVideoLanguageStats();
// {
//   lse: { plays: 450, completions: 320, averageCompletion: 71% },
//   lsc: { plays: 280, completions: 190, averageCompletion: 68% }
// }
```

## 🔮 Mejoras Futuras

### Corto Plazo
1. Implementar tests unitarios y e2e
2. Agregar control de velocidad de reproducción
3. Mejorar UI de controles

### Mediano Plazo
1. Picture-in-Picture mode
2. Marcadores de capítulos
3. Búsqueda dentro del vídeo por timestamp

### Largo Plazo
1. Streaming adaptativo (HLS/DASH)
2. Generación automática de transcripciones
3. Traducción automática LSE ↔ LSC
4. Integración con IA para mejorar accesibilidad

## 🔗 Recursos

### Lengua de Signos
- [CNSE - Confederación Estatal de Personas Sordas](https://www.cnse.es/)
- [FESOCA - Federació de Persones Sordes de Catalunya](https://www.fesoca.org/)

### Estándares
- [WCAG 2.2 - Medios tempodependientes](https://www.w3.org/WAI/WCAG22/Understanding/time-based-media)
- [WebVTT Specification](https://www.w3.org/TR/webvtt1/)
- [HTML5 Video Accessibility](https://www.w3.org/WAI/media/av/)
