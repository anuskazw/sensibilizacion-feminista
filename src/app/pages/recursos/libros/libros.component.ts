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
import { sampleLibros } from './data';

/**
 * Componente de página de libros con listado de libros recomendados
 * Implementa la funcionalidad de US-029
 */
@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonScreenComponent,
    ErrorStateComponent,
    SearchBarComponent
  ],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {
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

  // Libros filtrados y visibles
  libros = signal<RecursoContent[]>([]);

  // Libros filtrados (por búsqueda, autor, año, hashtags)
  filteredLibros = computed(() => {
    const allLibros = this.libros().filter(libro => libro.activo && libro.estado === 'publicado');
    const search = this.searchText().trim();

    // Si no hay texto de búsqueda, devolver todos los libros
    if (!search) {
      return allLibros;
    }

    // Usar el servicio de recursos para filtrar por búsqueda
    const lang = this.languageService.getCurrentLanguage();
    return this.resourceService.filterRecursos(
      {
        subtipo: 'libro',
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

        // Cargar libros en el servicio
        this.resourceService.loadRecursos(sampleLibros);

        // Obtener libros del servicio
        this.libros.set(this.resourceService.libros());

        // Trackear vista de página de libros
        this.analyticsService.trackContentView('libros-page', 'recurso', []);

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

  getTitle(libro: RecursoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return libro.titulo[lang as keyof MultilingualText] || libro.titulo.es;
  }

  getDescription(libro: RecursoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return libro.descripcion[lang as keyof MultilingualText] || libro.descripcion.es;
  }

  getHashtagName(hashtag: any): string {
    const lang = this.languageService.getCurrentLanguage();
    return hashtag.nombre[lang as keyof MultilingualText] || hashtag.nombre.es;
  }

  getEasyReadDescription(libro: RecursoContent): string {
    if (!libro.descripcion_lectura_facil) {
      return this.getDescription(libro);
    }
    const lang = this.languageService.getCurrentLanguage();
    return libro.descripcion_lectura_facil[lang as keyof MultilingualText] || libro.descripcion_lectura_facil.es;
  }

  onSearchChange(searchValue: string): void {
    this.searchText.set(searchValue);
  }
}

