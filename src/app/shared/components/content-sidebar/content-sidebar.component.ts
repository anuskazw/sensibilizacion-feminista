import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Hashtag } from '../../../core/models/content.model';
import { ContentFilters } from '../../../core/models/filter.model';

/**
 * Componente de sidebar con búsqueda y filtros
 * Ubicado en el lateral izquierdo según US-003
 */
@Component({
  selector: 'app-content-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, SearchBarComponent],
  templateUrl: './content-sidebar.component.html',
  styleUrl: './content-sidebar.component.css'
})
export class ContentSidebarComponent {
  @Input() sectionTitle: string = '';
  @Input() hashtags: Hashtag[] = [];
  @Input() yearRange: { min: number; max: number } | null = null;
  @Input() showYearFilter: boolean = true;
  @Input() isOpen: boolean = true;
  
  @Output() filtersChange = new EventEmitter<ContentFilters>();
  @Output() toggleSidebar = new EventEmitter<boolean>();

  // Estado de los filtros
  searchText = signal('');
  selectedHashtags = signal<Set<string>>(new Set());
  yearFrom = signal<number | undefined>(undefined);
  yearTo = signal<number | undefined>(undefined);
  
  // Hashtags agrupados alfabéticamente
  groupedHashtags = computed(() => {
    const groups = new Map<string, Hashtag[]>();
    
    this.hashtags.forEach(tag => {
      const firstLetter = tag.nombre.charAt(0).toUpperCase();
      if (!groups.has(firstLetter)) {
        groups.set(firstLetter, []);
      }
      groups.get(firstLetter)!.push(tag);
    });
    
    // Ordenar grupos alfabéticamente
    return Array.from(groups.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, tags]) => ({
        letter,
        tags: tags.sort((a, b) => a.nombre.localeCompare(b.nombre))
      }));
  });

  onSearchChange(text: string): void {
    this.searchText.set(text);
    this.emitFilters();
  }

  toggleHashtag(hashtagId: string): void {
    const current = new Set(this.selectedHashtags());
    if (current.has(hashtagId)) {
      current.delete(hashtagId);
    } else {
      current.add(hashtagId);
    }
    this.selectedHashtags.set(current);
    this.emitFilters();
  }

  isHashtagSelected(hashtagId: string): boolean {
    return this.selectedHashtags().has(hashtagId);
  }

  onYearFromChange(value: string): void {
    const year = value ? parseInt(value, 10) : undefined;
    this.yearFrom.set(year);
    this.emitFilters();
  }

  onYearToChange(value: string): void {
    const year = value ? parseInt(value, 10) : undefined;
    this.yearTo.set(year);
    this.emitFilters();
  }

  clearAllFilters(): void {
    this.searchText.set('');
    this.selectedHashtags.set(new Set());
    this.yearFrom.set(undefined);
    this.yearTo.set(undefined);
    this.emitFilters();
  }

  hasActiveFilters(): boolean {
    return this.searchText().length > 0 ||
           this.selectedHashtags().size > 0 ||
           this.yearFrom() !== undefined ||
           this.yearTo() !== undefined;
  }

  onToggleSidebar(): void {
    this.isOpen = !this.isOpen;
    this.toggleSidebar.emit(this.isOpen);
  }

  private emitFilters(): void {
    const filters: ContentFilters = {
      searchText: this.searchText() || undefined,
      hashtagIds: this.selectedHashtags().size > 0 
        ? Array.from(this.selectedHashtags()) 
        : undefined,
      anioDesde: this.yearFrom(),
      anioHasta: this.yearTo()
    };
    
    this.filtersChange.emit(filters);
  }
}

