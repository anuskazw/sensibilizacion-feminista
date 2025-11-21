import { Component, HostListener, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('homeContainer', { static: false }) homeContainer!: ElementRef<HTMLElement>;
  
  // Índice de la sección activa (0-3)
  activeSection = signal(0);

  // Tarjetas de la sección 4 (grid de navegación)
  navigationCards = [
    {
      id: 'historia',
      icon: '📚',
      route: '/historia',
      ariaLabel: 'Ir a la sección de Historia'
    },
    {
      id: 'conceptos',
      icon: '💡',
      route: '/conceptos',
      ariaLabel: 'Ir a la sección de Conceptos'
    },
    {
      id: 'violencia',
      icon: '⚠️',
      route: '/violencia',
      ariaLabel: 'Ir a la sección de Violencia'
    },
    {
      id: 'recursos',
      icon: '📖',
      route: '/recursos',
      ariaLabel: 'Ir a la sección de Recursos'
    },
    {
      id: 'ayuda',
      icon: '🤝',
      route: '/ayuda',
      ariaLabel: 'Ir a la sección de Ayuda'
    }
  ];

  ngAfterViewInit(): void {
    // Configurar listener de scroll en el contenedor
    const container = this.homeContainer?.nativeElement || document.querySelector('.home-container') as HTMLElement;
    if (container) {
      container.addEventListener('scroll', () => this.onScroll());
      // Verificar sección inicial
      this.onScroll();
    }
  }

  // Detecta cambios en el scroll para actualizar la sección activa
  onScroll(): void {
    const container = this.homeContainer?.nativeElement || document.querySelector('.home-container') as HTMLElement;
    if (!container) return;

    const sections = document.querySelectorAll('.home-section');
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const scrollPosition = scrollTop + containerHeight / 2;

    sections.forEach((section, index) => {
      const element = section as HTMLElement;
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;

      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        this.activeSection.set(index);
      }
    });
  }

  // Navega a una sección específica
  scrollToSection(index: number): void {
    const container = this.homeContainer?.nativeElement || document.querySelector('.home-container') as HTMLElement;
    const sections = document.querySelectorAll('.home-section');
    if (sections[index] && container) {
      const section = sections[index] as HTMLElement;
      const sectionTop = section.offsetTop;
      container.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  }

  // Manejo de teclado para accesibilidad
  @HostListener('window:keydown', ['$event'])
  handleKeyboardNavigation(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' && event.ctrlKey) {
      event.preventDefault();
      const nextSection = Math.min(this.activeSection() + 1, 3);
      this.scrollToSection(nextSection);
    } else if (event.key === 'ArrowUp' && event.ctrlKey) {
      event.preventDefault();
      const prevSection = Math.max(this.activeSection() - 1, 0);
      this.scrollToSection(prevSection);
    }
  }
}

