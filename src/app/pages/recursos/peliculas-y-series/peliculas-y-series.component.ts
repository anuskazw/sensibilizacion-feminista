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

  // Datos de ejemplo de películas y series
  private samplePeliculasSeries: RecursoContent[] = [
    {
      id: '1',
      slug: 'the-handmaids-tale',
      tipo: 'recurso',
      subtipo: 'pelicula_serie',
      titulo: this.createMultilingualText('The Handmaid\'s Tale'),
      descripcion: this.createMultilingualText('Serie distópica basada en la novela de Margaret Atwood que explora temas de opresión femenina, derechos reproductivos y resistencia.'),
      descripcion_lectura_facil: this.createMultilingualText('Esta serie cuenta la historia de mujeres que luchan por su libertad en un mundo donde han perdido sus derechos.'),
      autor: 'Margaret Atwood',
      direccion: 'Bruce Miller',
      anio: 2017,
      num_temporadas: 5,
      duracion: 60,
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '5', nombre: 'Derechos reproductivos', slug: 'derechos-reproductivos', descripcion: 'Derechos reproductivos' }
      ],
      activo: true,
      fecha_publicacion: new Date('2024-01-01'),
      fecha_modificacion: new Date('2024-01-01'),
      fecha_creacion: new Date('2024-01-01'),
      estado: 'publicado',
      orden: 1
    },
    {
      id: '2',
      slug: 'big-little-lies',
      tipo: 'recurso',
      subtipo: 'pelicula_serie',
      titulo: this.createMultilingualText('Big Little Lies'),
      descripcion: this.createMultilingualText('Serie que aborda temas de violencia doméstica, amistad femenina y secretos familiares, basada en la novela de Liane Moriarty.'),
      descripcion_lectura_facil: this.createMultilingualText('Esta serie muestra cómo las mujeres se apoyan entre sí cuando enfrentan problemas difíciles.'),
      autor: 'Liane Moriarty',
      direccion: 'Jean-Marc Vallée',
      anio: 2017,
      num_temporadas: 2,
      duracion: 55,
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '6', nombre: 'Violencia de género', slug: 'violencia-genero', descripcion: 'Violencia de género' }
      ],
      activo: true,
      fecha_publicacion: new Date('2024-01-15'),
      fecha_modificacion: new Date('2024-01-15'),
      fecha_creacion: new Date('2024-01-15'),
      estado: 'publicado',
      orden: 2
    },
    {
      id: '3',
      slug: 'hidden-figures',
      tipo: 'recurso',
      subtipo: 'pelicula_serie',
      titulo: this.createMultilingualText('Hidden Figures (Figuras Ocultas)'),
      descripcion: this.createMultilingualText('Película que cuenta la historia real de tres matemáticas afroamericanas que trabajaron en la NASA durante la carrera espacial.'),
      descripcion_lectura_facil: this.createMultilingualText('Esta película cuenta la historia de mujeres muy inteligentes que ayudaron a enviar personas al espacio.'),
      autor: 'Margot Lee Shetterly',
      direccion: 'Theodore Melfi',
      anio: 2016,
      duracion: 127,
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '7', nombre: 'Mujeres en la ciencia', slug: 'mujeres-ciencia', descripcion: 'Mujeres en la ciencia' }
      ],
      activo: true,
      fecha_publicacion: new Date('2024-02-01'),
      fecha_modificacion: new Date('2024-02-01'),
      fecha_creacion: new Date('2024-02-01'),
      estado: 'publicado',
      orden: 3
    },
    {
      id: '4',
      slug: 'suffragette',
      tipo: 'recurso',
      subtipo: 'pelicula_serie',
      titulo: this.createMultilingualText('Suffragette'),
      descripcion: this.createMultilingualText('Película histórica sobre el movimiento sufragista británico a principios del siglo XX y la lucha por el derecho al voto de las mujeres.'),
      descripcion_lectura_facil: this.createMultilingualText('Esta película muestra cómo las mujeres lucharon para poder votar hace muchos años.'),
      autor: 'Abi Morgan',
      direccion: 'Sarah Gavron',
      anio: 2015,
      duracion: 106,
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '8', nombre: 'Historia feminista', slug: 'historia-feminista', descripcion: 'Historia feminista' }
      ],
      activo: true,
      fecha_publicacion: new Date('2024-02-15'),
      fecha_modificacion: new Date('2024-02-15'),
      fecha_creacion: new Date('2024-02-15'),
      estado: 'publicado',
      orden: 4
    }
  ];

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
        this.resourceService.loadRecursos(this.samplePeliculasSeries);

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

  private createMultilingualText(text: string): MultilingualText {
    return {
      es: text,
      en: text,
      ca: text,
      val: text,
      gl: text,
      eu: text
    };
  }
}

