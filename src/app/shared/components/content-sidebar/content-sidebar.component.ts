import { Component, Input, Output, EventEmitter, signal, computed, ViewChild, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Hashtag, MultilingualText } from '../../../core/models/content.model';
import { ContentFilters } from '../../../core/models/filter.model';
import { LanguageService } from '../../../core/services/language.service';

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
export class ContentSidebarComponent implements AfterViewInit, OnDestroy {
  private languageService = inject(LanguageService);

  @Input() sectionTitle: string = '';
  @Input() hashtags: Hashtag[] = [];
  @Input() yearRange: { min: number; max: number } | null = null;
  @Input() showYearFilter: boolean = true;
  @Input() showAlphabeticalIndex: boolean = false;
  @Input() alphabeticalLetters: string[] = [];
  
  @ViewChild('filterModal') filterModal!: ElementRef<HTMLDialogElement>;
  
  @Output() filtersChange = new EventEmitter<ContentFilters>();
  @Output() letterClick = new EventEmitter<string>();

  // Referencias a los event listeners para poder eliminarlos
  private modalClickHandler?: (event: MouseEvent) => void;
  private modalCancelHandler?: () => void;

  // Estado de los filtros
  searchText = signal('');
  selectedHashtags = signal<Set<string>>(new Set());
  yearFrom = signal<number | undefined>(undefined);
  yearTo = signal<number | undefined>(undefined);
  
  // Hashtags agrupados alfabéticamente
  groupedHashtags = computed(() => {
    const groups = new Map<string, Hashtag[]>();
    
    this.hashtags.forEach(tag => {
      const firstLetter = this.getHashtagName(tag).charAt(0).toUpperCase();
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
        tags: tags.sort((a, b) => this.getHashtagName(a).localeCompare(this.getHashtagName(b)))
      }));
  });

  getHashtagName(tag: Hashtag): string {
    const lang = this.languageService.getCurrentLanguage();
    return tag.nombre[lang as keyof MultilingualText] || tag.nombre.es;
  }

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

  onLetterClick(letter: string): void {
    this.letterClick.emit(letter);
  }

  ngAfterViewInit(): void {
    // Manejar el cierre del modal al hacer clic fuera de él
    if (this.filterModal?.nativeElement) {
      this.modalClickHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target === this.filterModal?.nativeElement) {
          this.closeFilterModal();
        }
      };
      this.modalCancelHandler = () => {
        this.closeFilterModal();
      };
      
      this.filterModal.nativeElement.addEventListener('click', this.modalClickHandler);
      this.filterModal.nativeElement.addEventListener('cancel', this.modalCancelHandler);
    }
  }

  ngOnDestroy(): void {
    // Limpiar event listeners
    if (this.filterModal?.nativeElement) {
      if (this.modalClickHandler) {
        this.filterModal.nativeElement.removeEventListener('click', this.modalClickHandler);
      }
      if (this.modalCancelHandler) {
        this.filterModal.nativeElement.removeEventListener('cancel', this.modalCancelHandler);
      }
    }
  }

  openFilterModal(): void {
    if (this.filterModal?.nativeElement) {
      this.filterModal.nativeElement.showModal();
    }
  }

  closeFilterModal(): void {
    if (this.filterModal?.nativeElement) {
      this.filterModal.nativeElement.close();
    }
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

