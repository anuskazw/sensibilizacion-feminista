import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ViolenciaContent,
  MultilingualText
} from '../../core/models/content.model';
import { ContentFilters } from '../../core/models/filter.model';
import { sampleHashtags, sampleContents } from './violencia.data';

/**
 * Página de violencia con búsqueda, filtrado e índice de términos
 * Implementa la funcionalidad de US-009
 */
@Component({
  selector: 'app-violencia',
  standalone: true,
  imports: [CommonModule, TranslateModule, ContentSidebarComponent, SocialShareComponent, SkeletonScreenComponent, ErrorStateComponent],
  templateUrl: './violencia.component.html',
  styleUrl: './violencia.component.css'
})
export class ViolenciaComponent implements OnInit {
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
    return result.items as ViolenciaContent[];
  });

  // Hashtags disponibles
  hashtags = computed(() => this.searchFilterService.getAllHashtags());

  // Índice de términos relacionados con violencia
  termsIndex = computed(() => {
    const contents = this.filteredContents();
    const lang = this.languageService.getCurrentLanguage();
    const terms: string[] = [];

    contents.forEach(content => {
      const title = this.getTitle(content);
      terms.push(title);
    });

    // Ordenar alfabéticamente
    return terms.sort((a, b) => a.localeCompare(b));
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
        // Trackear vista de página de violencia
        this.analyticsService.trackContentView('violencia-page', 'violencia', []);
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

  getTitle(content: ViolenciaContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.titulo[lang as keyof MultilingualText] || content.titulo.es;
  }

  getDescription(content: ViolenciaContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.descripcion_lectura_facil[lang as keyof MultilingualText] ||
           content.descripcion_lectura_facil.es;
  }

  getAlertSigns(content: ViolenciaContent): string {
    const lang = this.languageService.getCurrentLanguage();
    if (!content.senales_alerta) return '';
    return content.senales_alerta[lang as keyof MultilingualText] ||
           content.senales_alerta.es || '';
  }

  getHashtagName(hashtag: any): string {
    const lang = this.languageService.getCurrentLanguage();
    return hashtag.nombre[lang as keyof MultilingualText] || hashtag.nombre.es;
  }

  scrollToTerm(term: string): void {
    // Buscar el contenido que corresponde al término
    const content = this.filteredContents().find(c => this.getTitle(c) === term);
    if (content) {
      const element = document.getElementById(`content-${content.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

