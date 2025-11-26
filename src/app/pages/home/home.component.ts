import { Component } from '@angular/core';
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
export class HomeComponent {
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
}

