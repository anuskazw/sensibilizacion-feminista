import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
import { ResourceService } from '../../../core/services/resource.service';
import { OfflineService } from '../../../core/services/offline.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { RecursoContent, MultilingualText } from '../../../core/models/content.model';
import { SkeletonScreenComponent } from '../../../shared/components/skeleton-screen/skeleton-screen.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { samplePeliculasSeries } from './data';

/**
 * Componente de página de películas y series con listado de películas y series recomendadas
 * Implementa la funcionalidad de US-030
 */
@Component({
  selector: 'app-peliculas-y-series',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonScreenComponent,
    ErrorStateComponent,
    SearchBarComponent
  ],
  templateUrl: './peliculas-y-series.component.html',
  styleUrl: './peliculas-y-series.component.css'
})
export class PeliculasYSeriesComponent implements OnInit {
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private resourceService = inject(ResourceService);
  private offlineService = inject(OfflineService);
  private analyticsService = inject(AnalyticsService);

  // Estados de carga y error
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal<string>('');

  // Texto de búsqueda
  searchText = signal<string>('');

  // Películas y series filtradas y visibles
  peliculasSeries = signal<RecursoContent[]>([]);

  // Películas y series filtradas (por búsqueda, director, año, hashtags)
  filteredPeliculasSeries = computed(() => {
    const allPeliculasSeries = this.peliculasSeries().filter(item => item.activo && item.estado === 'publicado');
    const search = this.searchText().trim();

    // Si no hay texto de búsqueda, devolver todas las películas y series
    if (!search) {
      return allPeliculasSeries;
    }

    // Usar el servicio de recursos para filtrar por búsqueda
    const lang = this.languageService.getCurrentLanguage();
    return this.resourceService.filterRecursos(
      {
        subtipo: 'pelicula_serie',
        busqueda: search
      },
      lang
    );
  });


  ngOnInit(): void {
    // Simular carga de datos
    // this.isLoading.set(true);
    this.hasError.set(false);

    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }

        // Cargar películas y series en el servicio
        this.resourceService.loadRecursos(samplePeliculasSeries);

        // Obtener películas y series del servicio
        this.peliculasSeries.set(this.resourceService.peliculasSeries());

        // Trackear vista de página de películas y series
        this.analyticsService.trackContentView('peliculas-y-series-page', 'recurso', []);

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
    }, 0);
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

  getTitle(peliculaSerie: RecursoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return peliculaSerie.titulo[lang as keyof MultilingualText] || peliculaSerie.titulo.es;
  }

  getDescription(peliculaSerie: RecursoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return peliculaSerie.descripcion[lang as keyof MultilingualText] || peliculaSerie.descripcion.es;
  }

  getEasyReadDescription(peliculaSerie: RecursoContent): string {
    if (!peliculaSerie.descripcion_lectura_facil) {
      return this.getDescription(peliculaSerie);
    }
    const lang = this.languageService.getCurrentLanguage();
    return peliculaSerie.descripcion_lectura_facil[lang as keyof MultilingualText] || peliculaSerie.descripcion_lectura_facil.es;
  }

  onSearchChange(searchValue: string): void {
    this.searchText.set(searchValue);
  }
}

