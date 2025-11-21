import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de skeleton screen genérico
 * Replica la estructura del contenido esperado durante la carga
 */
@Component({
  selector: 'app-skeleton-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-screen.component.html',
  styleUrl: './skeleton-screen.component.css'
})
export class SkeletonScreenComponent {
  @Input() type: 'card' | 'card-grid' | 'list' | 'content-card' = 'card';
  @Input() count: number = 1;
  @Input() showTitle: boolean = true;
  @Input() showDescription: boolean = true;
  @Input() showHashtags: boolean = false;
  @Input() showButton: boolean = false;

  get items(): number[] {
    return Array(this.count).fill(0).map((_, i) => i);
  }
}

