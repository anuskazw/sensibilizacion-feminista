import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContentSidebarComponent } from '../../shared/components/content-sidebar/content-sidebar.component';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { SearchFilterService } from '../../core/services/search-filter.service';
import { LanguageService } from '../../core/services/language.service';
import { SkeletonScreenComponent } from '../../shared/components/skeleton-screen/skeleton-screen.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { OfflineService } from '../../core/services/offline.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import {
  ConceptoContent,
  Hashtag,
  MultilingualText
} from '../../core/models/content.model';
import { ContentFilters } from '../../core/models/filter.model';
import { sampleContents } from './data';

/**
 * Página de conceptos con búsqueda, filtrado e índice alfabético
 * Implementa la funcionalidad de US-008
 */
@Component({
  selector: 'app-conceptos',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, ContentSidebarComponent, SocialShareComponent, SkeletonScreenComponent, ErrorStateComponent],
  templateUrl: './conceptos.component.html',
  styleUrl: './conceptos.component.css'
})
export class ConceptosComponent implements OnInit {
  private searchFilterService = inject(SearchFilterService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private offlineService = inject(OfflineService);
  private analyticsService = inject(AnalyticsService);

  // Estados de carga y error
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal<string>('');

  // Señales reactivas
  currentFilters = signal<ContentFilters>({});

  // Resultados filtrados
  filteredContents = computed(() => {
    const filters = {
      ...this.currentFilters(),
      currentLanguage: this.languageService.getCurrentLanguage()
    };

    const result = this.searchFilterService.search(filters);
    return result.items as ConceptoContent[];
  });

  // Hashtags disponibles
  hashtags = computed(() => this.searchFilterService.getAllHashtags());

  // Índice alfabético de conceptos
  alphabeticalIndex = computed(() => {
    const contents = this.filteredContents();
    const lang = this.languageService.getCurrentLanguage();
    const grouped = new Map<string, ConceptoContent[]>();

    contents.forEach(content => {
      const title = this.getTitle(content);
      const firstLetter = title.charAt(0).toUpperCase();

      if (!grouped.has(firstLetter)) {
        grouped.set(firstLetter, []);
      }
      grouped.get(firstLetter)!.push(content);
    });

    // Ordenar alfabéticamente
    return Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, items]) => ({
        letter,
        items: items.sort((a, b) =>
          this.getTitle(a).localeCompare(this.getTitle(b))
        )
      }));
  });

  // Letras disponibles en el índice alfabético
  alphabeticalLetters = computed(() => {
    return this.alphabeticalIndex().map(group => group.letter);
  });

  ngOnInit(): void {
    // Simular carga de datos
    // this.isLoading.set(true);
    this.hasError.set(false);

    // Simular carga asíncrona
    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }
        // Inicializar el servicio con datos de ejemplo
        this.searchFilterService.setContents(sampleContents);
        // Trackear vista de página de conceptos
        this.analyticsService.trackContentView('conceptos-page', 'concepto', []);
        this.isLoading.set(false);
      } catch (error: any) {
        this.hasError.set(true);
        this.isLoading.set(false);
        if (error.message === 'offline') {
          this.errorMessage.set('error.offline');
        } else {
          this.errorMessage.set('error.generic');
        }
      }
    }, 0); // Simular delay de carga
  }

  retryLoad(): void {
    this.ngOnInit();
  }

  getErrorSuggestions(): string[] {
    if (this.offlineService.isOffline()) {
      return [
        this.translateService.instant('error.suggestionsOffline.0'),
        this.translateService.instant('error.suggestionsOffline.1'),
        this.translateService.instant('error.suggestionsOffline.2')
      ];
    }
    return [
      this.translateService.instant('error.suggestionsNetwork.0'),
      this.translateService.instant('error.suggestionsNetwork.1'),
      this.translateService.instant('error.suggestionsNetwork.2')
    ];
  }

  onFiltersChange(filters: ContentFilters): void {
    this.currentFilters.set(filters);
  }

  getTitle(content: ConceptoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.titulo[lang as keyof MultilingualText] || content.titulo.es;
  }

  getDescription(content: ConceptoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.descripcion_lectura_facil[lang as keyof MultilingualText] ||
           content.descripcion_lectura_facil.es;
  }

  scrollToLetter(letter: string): void {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

