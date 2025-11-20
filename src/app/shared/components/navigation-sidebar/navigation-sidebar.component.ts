import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarService } from '../../../core/services/sidebar.service';

/**
 * Componente de sidebar de navegación lateral izquierdo reutilizable
 * Implementa la funcionalidad de US-012
 */
@Component({
  selector: 'app-navigation-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navigation-sidebar.component.html',
  styleUrl: './navigation-sidebar.component.css'
})
export class NavigationSidebarComponent {
  @Input() isOpen: boolean = true;

  constructor(public sidebarService: SidebarService) {}

  // Enlaces de navegación a las 5 secciones principales
  navigationLinks = [
    {
      id: 'home',
      route: '/',
      icon: '🏠',
      exact: true
    },
    {
      id: 'historia',
      route: '/historia',
      icon: '📚'
    },
    {
      id: 'conceptos',
      route: '/conceptos',
      icon: '💡'
    },
    {
      id: 'violencia',
      route: '/violencia',
      icon: '⚠️'
    },
    {
      id: 'recursos',
      route: '/recursos',
      icon: '📖'
    }
  ];

  /**
   * Alterna el estado colapsado/expandido del sidebar
   */
  toggleCollapse(): void {
    this.sidebarService.toggle();
  }
}

