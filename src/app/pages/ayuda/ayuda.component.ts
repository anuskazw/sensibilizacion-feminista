import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { telephones, accessibilityEntities, feminismEntities } from './ayuda.data';

/**
 * Página de ayuda con referencias a teléfonos y entidades
 * Implementa la funcionalidad de US-032
 */
@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
  // Teléfonos de ayuda
  telephones = telephones;

  // Entidades de ayuda en temas de accesibilidad
  accessibilityEntities = accessibilityEntities;

  // Entidades de ayuda en temas de feminismo
  feminismEntities = feminismEntities;
}

