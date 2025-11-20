import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Página de recursos de ayuda con índice de tarjetas principales
 * Implementa la funcionalidad de US-011
 */
@Component({
  selector: 'app-recursos-ayuda',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './recursos-ayuda.component.html',
  styleUrl: './recursos-ayuda.component.css'
})
export class RecursosAyudaComponent {
  // Tarjetas principales de recursos de ayuda
  helpCards = [
    {
      id: 'testimonios',
      icon: '💬',
      route: '/ayuda/testimonios-mujeres-sordas',
      ariaLabel: 'Ir a la sección de Testimonios de mujeres sordas'
    },
    {
      id: 'instituciones',
      icon: '🏢',
      route: '/ayuda/instituciones-aplicaciones-ayuda',
      ariaLabel: 'Ir a la sección de Instituciones y aplicaciones de ayuda'
    }
  ];
}

