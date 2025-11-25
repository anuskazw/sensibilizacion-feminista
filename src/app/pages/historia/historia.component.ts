import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContentSidebarComponent } from '../../shared/components/content-sidebar/content-sidebar.component';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { SearchFilterService } from '../../core/services/search-filter.service';
import { LanguageService } from '../../core/services/language.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import {
  HistoriaContent,
  MultilingualText
} from '../../core/models/content.model';
import { ContentFilters } from '../../core/models/filter.model';
import { sampleContents } from './data';

/**
 * Página de historia con búsqueda y filtrado
 * Demuestra la funcionalidad implementada en US-003
 */
@Component({
  selector: 'app-historia',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, ContentSidebarComponent, SocialShareComponent],
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {
  private searchFilterService = inject(SearchFilterService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private analyticsService = inject(AnalyticsService);

  // Señales reactivas
  currentFilters = signal<ContentFilters>({});

  // Resultados filtrados
  filteredContents = computed(() => {
    const filters = {
      ...this.currentFilters(),
      currentLanguage: this.languageService.getCurrentLanguage()
    };

    const result = this.searchFilterService.search(filters);
    return result.items as HistoriaContent[];
  });

  // Hashtags y rango de años
  hashtags = computed(() => this.searchFilterService.getAllHashtags());
  yearRange = computed(() => this.searchFilterService.getYearRange());

  ngOnInit(): void {
    // Inicializar el servicio con datos de ejemplo
    this.searchFilterService.setContents(sampleContents);

    // Trackear vista de página de historia
    this.analyticsService.trackContentView('historia-page', 'historia', []);
  }

  onFiltersChange(filters: ContentFilters): void {
    this.currentFilters.set(filters);
  }

  getTitle(content: HistoriaContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.titulo[lang as keyof MultilingualText] || content.titulo.es;
  }

  getDescription(content: HistoriaContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.descripcion_lectura_facil[lang as keyof MultilingualText] ||
           content.descripcion_lectura_facil.es;
  }
}

