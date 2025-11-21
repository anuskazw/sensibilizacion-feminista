import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ImageSrcSet {
  src: string;
  width: number;
}

@Directive({
  selector: 'img[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit, OnDestroy {
  @Input() appLazyImage: string = ''; // URL principal de la imagen
  @Input() srcset?: ImageSrcSet[] | string; // Array de objetos o string con srcset
  @Input() sizes?: string; // Atributo sizes para responsive images
  @Input() placeholder?: string; // URL de imagen placeholder (opcional)
  @Input() rootMargin: string = '50px'; // Margen para IntersectionObserver

  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) {
      // En SSR, cargar la imagen directamente
      this.loadImage();
      return;
    }

    // Configurar placeholder si existe
    if (this.placeholder) {
      this.el.nativeElement.src = this.placeholder;
    } else {
      // Usar un placeholder transparente de 1x1px para evitar layout shift
      this.el.nativeElement.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E';
    }

    // Configurar loading="lazy" como fallback
    this.el.nativeElement.loading = 'lazy';

    // Usar IntersectionObserver para lazy loading más preciso
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      // Fallback para navegadores sin soporte
      this.loadImage();
      return;
    }

    const options: IntersectionObserverInit = {
      rootMargin: this.rootMargin,
      threshold: 0.01
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer?.disconnect();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private loadImage(): void {
    const img = this.el.nativeElement;

    // Configurar srcset si está disponible
    if (this.srcset) {
      if (Array.isArray(this.srcset)) {
        // Convertir array de objetos a string srcset
        img.srcset = this.srcset
          .map(item => `${item.src} ${item.width}w`)
          .join(', ');
      } else {
        // Ya es un string
        img.srcset = this.srcset;
      }
    }

    // Configurar sizes si está disponible
    if (this.sizes) {
      img.sizes = this.sizes;
    }

    // Cargar la imagen principal
    img.src = this.appLazyImage;

    // Manejar errores de carga
    img.onerror = () => {
      console.error('Error al cargar la imagen:', this.appLazyImage);
      // Opcional: mostrar una imagen de error
      img.alt = img.alt || 'Imagen no disponible';
    };
  }
}

