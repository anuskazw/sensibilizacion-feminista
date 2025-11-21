import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Componente para mostrar estados de error con opción de reintentar
 */
@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.css'
})
export class ErrorStateComponent {
  @Input() message: string = '';
  @Input() showRetry: boolean = true;
  @Input() retryLabel: string = 'common.retry';
  @Input() suggestions: string[] = [];
  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}

