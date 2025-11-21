import { Component, Input, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LazyVideoDirective } from '../../directives/lazy-video.directive';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { AnalyticsService, ContentType } from '../../../core/services/analytics.service';

export interface SignLanguageVideo {
  lseUrl?: string;  // Lengua de Signos Española
  lscUrl?: string;  // Lengua de Signos Catalana
  title: string;
  transcription?: string;
  subtitlesUrl?: string;
}

@Component({
  selector: 'app-sign-language-video-player',
  standalone: true,
  imports: [CommonModule, TranslateModule, LazyVideoDirective, ErrorStateComponent],
  templateUrl: './sign-language-video-player.component.html',
  styleUrl: './sign-language-video-player.component.css'
})
export class SignLanguageVideoPlayerComponent implements OnInit, OnDestroy {
  @Input() video!: SignLanguageVideo;
  @Input() autoplay: boolean = false; // Por defecto sin autoplay para accesibilidad
  @Input() inline: boolean = true; // true = inline, false = plegable
  @Input() contentId?: string; // ID del contenido para tracking
  @Input() contentType?: ContentType; // Tipo de contenido para tracking
  
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  
  // Estado del reproductor
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 1;
  playbackRate: number = 1;
  showSubtitles: boolean = false;
  showTranscription: boolean = false;
  isCollapsed: boolean = false;
  isMuted: boolean = false;
  isFullscreen: boolean = false;
  
  // Control de idioma de signos
  currentLanguage: 'lse' | 'lsc' = 'lse';
  availableLanguages: Array<'lse' | 'lsc'> = [];
  
  // Opciones de velocidad de reproducción
  playbackRates: number[] = [0.5, 0.75, 1, 1.25, 1.5];
  
  // Estado de carga
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';
  
  private isBrowser: boolean;
  
  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private analyticsService: AnalyticsService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngOnInit(): void {
    // Determinar qué idiomas de signos están disponibles
    if (this.video.lseUrl) {
      this.availableLanguages.push('lse');
    }
    if (this.video.lscUrl) {
      this.availableLanguages.push('lsc');
    }
    
    // Establecer idioma inicial
    if (this.availableLanguages.length > 0) {
      this.currentLanguage = this.availableLanguages[0];
    }
    
    // Iniciar colapsado si no es inline
    if (!this.inline) {
      this.isCollapsed = true;
    }
  }
  
  get currentVideoUrl(): string {
    return this.currentLanguage === 'lse' ? (this.video.lseUrl || '') : (this.video.lscUrl || '');
  }
  
  togglePlay(): void {
    if (!this.isBrowser || !this.videoElement) return;
    
    const video = this.videoElement.nativeElement;
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play().catch(err => {
        console.error('Error al reproducir el vídeo:', err);
        this.hasError = true;
        this.errorMessage = 'No se pudo reproducir el vídeo';
      });
    }
  }
  
  onPlayPause(): void {
    const wasPlaying = this.isPlaying;
    this.isPlaying = !this.isPlaying;
    
    if (this.isBrowser && this.videoElement) {
      const video = this.videoElement.nativeElement;
      
      if (this.isPlaying) {
        // Vídeo empezó a reproducirse
        this.analyticsService.trackVideoPlay(
          this.currentLanguage,
          this.video.title,
          this.contentId,
          this.contentType
        );
      } else {
        // Vídeo se pausó
        this.analyticsService.trackVideoPause(
          this.currentLanguage,
          this.video.title,
          video.currentTime,
          this.duration,
          this.contentId,
          this.contentType
        );
      }
    }
  }
  
  onTimeUpdate(): void {
    if (!this.isBrowser || !this.videoElement) return;
    
    const video = this.videoElement.nativeElement;
    this.currentTime = video.currentTime;
    
    // Trackear actualización de tiempo para calcular porcentaje visualizado
    if (this.duration > 0) {
      this.analyticsService.trackVideoTimeUpdate(
        this.currentLanguage,
        this.video.title,
        this.currentTime,
        this.duration,
        this.contentId,
        this.contentType
      );
      
      // Verificar si el vídeo se completó (con un pequeño margen para evitar problemas de precisión)
      if (this.currentTime >= this.duration - 0.5 && this.isPlaying) {
        // El vídeo se completó
        this.analyticsService.trackVideoCompleted(
          this.currentLanguage,
          this.video.title,
          this.duration,
          this.contentId,
          this.contentType
        );
        this.isPlaying = false;
      }
    }
  }
  
  onLoadedMetadata(): void {
    if (!this.isBrowser || !this.videoElement) return;
    this.duration = this.videoElement.nativeElement.duration;
    this.isLoading = false;
  }
  
  onError(event: Event): void {
    console.error('Error cargando el vídeo:', event);
    this.hasError = true;
    this.errorMessage = 'Error al cargar el vídeo';
    this.isLoading = false;
  }
  
  seek(event: Event): void {
    if (!this.isBrowser || !this.videoElement) return;
    const input = event.target as HTMLInputElement;
    const video = this.videoElement.nativeElement;
    video.currentTime = parseFloat(input.value);
  }
  
  changeVolume(event: Event): void {
    if (!this.isBrowser || !this.videoElement) return;
    const input = event.target as HTMLInputElement;
    const newVolume = parseFloat(input.value);
    this.volume = newVolume;
    this.videoElement.nativeElement.volume = newVolume;
    this.isMuted = newVolume === 0;
  }
  
  toggleMute(): void {
    if (!this.isBrowser || !this.videoElement) return;
    const video = this.videoElement.nativeElement;
    if (this.isMuted) {
      video.volume = this.volume > 0 ? this.volume : 0.5;
      this.volume = video.volume;
      this.isMuted = false;
    } else {
      video.volume = 0;
      this.isMuted = true;
    }
  }
  
  changePlaybackRate(rate: number): void {
    if (!this.isBrowser || !this.videoElement) return;
    this.playbackRate = rate;
    this.videoElement.nativeElement.playbackRate = rate;
  }
  
  toggleSubtitles(): void {
    this.showSubtitles = !this.showSubtitles;
    // Implementar lógica de subtítulos si hay URL
  }
  
  toggleTranscription(): void {
    this.showTranscription = !this.showTranscription;
  }
  
  switchLanguage(language: 'lse' | 'lsc'): void {
    if (this.availableLanguages.includes(language)) {
      const wasPlaying = this.isPlaying;
      const currentTimeStamp = this.currentTime;
      
      // Si estaba reproduciéndose, pausar y trackear antes de cambiar
      if (wasPlaying && this.isBrowser && this.videoElement) {
        const video = this.videoElement.nativeElement;
        this.analyticsService.trackVideoPause(
          this.currentLanguage,
          this.video.title,
          video.currentTime,
          this.duration,
          this.contentId,
          this.contentType
        );
      }
      
      this.currentLanguage = language;
      
      // Esperar a que se cargue el nuevo vídeo y restaurar posición
      setTimeout(() => {
        if (this.isBrowser && this.videoElement) {
          const video = this.videoElement.nativeElement;
          video.currentTime = currentTimeStamp;
          if (wasPlaying) {
            video.play().catch(err => console.error('Error al reanudar:', err));
            // Trackear el play del nuevo idioma
            this.analyticsService.trackVideoPlay(
              this.currentLanguage,
              this.video.title,
              this.contentId,
              this.contentType
            );
          }
        }
      }, 100);
    }
  }
  
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  
  toggleFullscreen(): void {
    if (!this.isBrowser || !this.videoElement) return;
    
    const video = this.videoElement.nativeElement;
    
    if (!this.isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    this.isFullscreen = !this.isFullscreen;
  }
  
  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  retry(): void {
    this.hasError = false;
    this.errorMessage = '';
    this.isLoading = true;
    if (this.isBrowser && this.videoElement) {
      this.videoElement.nativeElement.load();
    }
  }
  
  ngOnDestroy(): void {
    // Si el vídeo estaba reproduciéndose cuando se destruye el componente,
    // trackear la pausa final
    if (this.isBrowser && this.isPlaying && this.videoElement) {
      const video = this.videoElement.nativeElement;
      this.analyticsService.trackVideoPause(
        this.currentLanguage,
        this.video.title,
        video.currentTime,
        this.duration,
        this.contentId,
        this.contentType
      );
    }
  }
}

