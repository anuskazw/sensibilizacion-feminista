import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: 'video[appLazyVideo]',
  standalone: true
})
export class LazyVideoDirective implements OnInit, OnDestroy {
  @Input() appLazyVideo: string = ''; // URL del vídeo
  @Input() preload: 'none' | 'metadata' | 'auto' = 'none'; // Preload por defecto 'none' para lazy loading
  @Input() rootMargin: string = '100px'; // Margen para IntersectionObserver (más espacio para vídeos)

  private observer?: IntersectionObserver;
  private isBrowser: boolean;
  private hasLoaded: boolean = false;

  constructor(
    private el: ElementRef<HTMLVideoElement>,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      // En SSR, configurar el vídeo pero no cargarlo
      this.setupVideo();
      return;
    }

    // Configurar el vídeo sin cargar
    this.setupVideo();

    // Usar IntersectionObserver para lazy loading
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupVideo(): void {
    const video = this.el.nativeElement;
    
    // Configurar preload según input
    video.preload = this.preload;
    
    // No establecer src todavía para evitar carga automática
    if (!this.hasLoaded) {
      // Usar data-src temporalmente si el navegador no soporta IntersectionObserver
      video.setAttribute('data-src', this.appLazyVideo);
    }
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      // Fallback: cargar el vídeo directamente
      this.loadVideo();
      return;
    }

    const options: IntersectionObserverInit = {
      rootMargin: this.rootMargin,
      threshold: 0.01
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasLoaded) {
          this.loadVideo();
          this.observer?.disconnect();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private loadVideo(): void {
    if (this.hasLoaded) return;

    const video = this.el.nativeElement;
    
    // Cargar el vídeo
    video.src = this.appLazyVideo;
    this.hasLoaded = true;

    // Manejar errores de carga
    video.onerror = () => {
      console.error('Error al cargar el vídeo:', this.appLazyVideo);
    };

    // Si el preload es 'metadata' o 'auto', cargar los metadatos
    if (this.preload === 'metadata' || this.preload === 'auto') {
      video.load();
    }
  }
}

