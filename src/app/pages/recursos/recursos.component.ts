import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Página de recursos con grid de tarjetas principales
 * Implementa la funcionalidad de US-010
 */
@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.css'
})
export class RecursosComponent {
  // Tarjetas principales de recursos
  resourceCards = [
    {
      id: 'libros',
      icon: '📚',
      route: '/recursos/libros',
      ariaLabel: 'Ir a la sección de Libros'
    },
    {
      id: 'peliculas-series',
      icon: '🎬',
      route: '/recursos/peliculas-y-series',
      ariaLabel: 'Ir a la sección de Películas y series'
    },
    {
      id: 'documentales',
      icon: '🎥',
      route: '/recursos/documentales',
      ariaLabel: 'Ir a la sección de Documentales'
    }
  ];
}

