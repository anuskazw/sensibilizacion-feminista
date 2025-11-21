import { Component, HostListener, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Componente para botón "Volver arriba" que aparece cuando se hace scroll
 * Implementa la funcionalidad de US-021
 */
@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.css'
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  // Indica si el botón debe ser visible
  isVisible = signal(false);
  
  // Umbral de scroll para mostrar el botón (en píxeles)
  private readonly SCROLL_THRESHOLD = 300;

  ngOnInit(): void {
    // Verificar posición inicial al cargar
    this.checkScrollPosition();
  }

  ngOnDestroy(): void {
    // Limpiar listeners si es necesario
  }

  /**
   * Escucha eventos de scroll para mostrar/ocultar el botón
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  /**
   * Verifica la posición del scroll y actualiza la visibilidad del botón
   */
  private checkScrollPosition(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isVisible.set(scrollPosition > this.SCROLL_THRESHOLD);
  }

  /**
   * Hace scroll suave hacia arriba de la página
   */
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Enfocar el elemento principal para accesibilidad
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  }

  /**
   * Maneja la navegación por teclado
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    // Atajo: Alt + Home para volver arriba
    if (event.altKey && event.key === 'Home') {
      event.preventDefault();
      this.scrollToTop();
    }
  }
}

