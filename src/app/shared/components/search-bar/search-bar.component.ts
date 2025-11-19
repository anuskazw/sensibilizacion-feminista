import { Component, Output, EventEmitter, Input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Componente de barra de búsqueda con debounce
 * Permite búsqueda por texto con tolerancia a errores
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() placeholder: string = 'search.placeholder';
  @Input() debounceTime: number = 300; // ms
  @Output() searchChange = new EventEmitter<string>();
  
  searchText = signal('');
  private debounceTimer: any;

  constructor() {
    // Efecto para emitir cambios con debounce
    effect(() => {
      const text = this.searchText();
      this.emitSearchWithDebounce(text);
    });
  }

  onSearchInput(value: string): void {
    this.searchText.set(value);
  }

  clearSearch(): void {
    this.searchText.set('');
  }

  private emitSearchWithDebounce(text: string): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.searchChange.emit(text);
    }, this.debounceTime);
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}

