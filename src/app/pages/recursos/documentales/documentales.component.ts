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
import { sampleDocumentales } from './data';

/**
 * Componente de página de documentales con listado de documentales recomendados
 * Implementa la funcionalidad de US-031
 */
@Component({
  selector: 'app-documentales',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SkeletonScreenComponent,
    ErrorStateComponent,
    SearchBarComponent
  ],
  templateUrl: './documentales.component.html',
  styleUrl: './documentales.component.css'
})
export class DocumentalesComponent implements OnInit {
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

  // Documentales filtrados y visibles
  documentales = signal<RecursoContent[]>([]);

  // Documentales filtrados (por búsqueda, director, año, hashtags)
  filteredDocumentales = computed(() => {
    const allDocumentales = this.documentales().filter(doc => doc.activo && doc.estado === 'publicado');
    const search = this.searchText().trim();

    // Si no hay texto de búsqueda, devolver todos los documentales
    if (!search) {
      return allDocumentales;
    }

    // Usar el servicio de recursos para filtrar por búsqueda
    const lang = this.languageService.getCurrentLanguage();
    return this.resourceService.filterRecursos(
      {
        subtipo: 'documental',
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

        // Cargar documentales en el servicio
        this.resourceService.loadRecursos(sampleDocumentales);

        // Obtener documentales del servicio
        this.documentales.set(this.resourceService.documentales());

        // Trackear vista de página de documentales
        this.analyticsService.trackContentView('documentales-page', 'recurso', []);

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

  getTitle(documental: RecursoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return documental.titulo[lang as keyof MultilingualText] || documental.titulo.es;
  }

  getDescription(documental: RecursoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return documental.descripcion[lang as keyof MultilingualText] || documental.descripcion.es;
  }

  getEasyReadDescription(documental: RecursoContent): string {
    if (!documental.descripcion_lectura_facil) {
      return this.getDescription(documental);
    }
    const lang = this.languageService.getCurrentLanguage();
    return documental.descripcion_lectura_facil[lang as keyof MultilingualText] || documental.descripcion_lectura_facil.es;
  }

  onSearchChange(searchValue: string): void {
    this.searchText.set(searchValue);
  }
}

