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
  isLoading = signal(true);
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

  // Datos de ejemplo de libros
  private sampleLibros: RecursoContent[] = [
    {
      id: '1',
      slug: 'el-segundo-sexo',
      tipo: 'recurso',
      subtipo: 'libro',
      titulo: this.createMultilingualText('El segundo sexo'),
      descripcion: this.createMultilingualText('Obra fundamental del feminismo del siglo XX que analiza la condición de la mujer desde múltiples perspectivas.'),
      descripcion_lectura_facil: this.createMultilingualText('Este libro explica cómo se ha visto a las mujeres a lo largo de la historia y por qué es importante luchar por la igualdad.'),
      autor: 'Simone de Beauvoir',
      anio: 1949,
      num_ediciones: 15,
      isbn: '978-84-376-0494-7',
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '2', nombre: 'Teoría', slug: 'teoria', descripcion: 'Teoría feminista' }
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
      slug: 'feminismo-para-principiantes',
      tipo: 'recurso',
      subtipo: 'libro',
      titulo: this.createMultilingualText('Feminismo para principiantes'),
      descripcion: this.createMultilingualText('Una introducción accesible al feminismo que explica conceptos clave y la historia del movimiento.'),
      descripcion_lectura_facil: this.createMultilingualText('Este libro explica qué es el feminismo de forma fácil y sencilla.'),
      autor: 'Nuria Varela',
      anio: 2005,
      num_ediciones: 8,
      isbn: '978-84-376-2345-0',
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '3', nombre: 'Educación', slug: 'educacion', descripcion: 'Educación' }
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
      slug: 'mujeres-que-corren-con-lobos',
      tipo: 'recurso',
      subtipo: 'libro',
      titulo: this.createMultilingualText('Mujeres que corren con los lobos'),
      descripcion: this.createMultilingualText('Un análisis profundo del arquetipo de la mujer salvaje y su importancia en la psicología femenina.'),
      descripcion_lectura_facil: this.createMultilingualText('Este libro habla sobre la fuerza y la sabiduría de las mujeres.'),
      autor: 'Clarissa Pinkola Estés',
      anio: 1992,
      num_ediciones: 12,
      isbn: '978-84-376-1234-5',
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '4', nombre: 'Psicología', slug: 'psicologia', descripcion: 'Psicología' }
      ],
      activo: true,
      fecha_publicacion: new Date('2024-02-01'),
      fecha_modificacion: new Date('2024-02-01'),
      fecha_creacion: new Date('2024-02-01'),
      estado: 'publicado',
      orden: 3
    }
  ];

  ngOnInit(): void {
    // Simular carga de datos
    this.isLoading.set(true);
    this.hasError.set(false);
    
    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }
        
        // Cargar libros en el servicio
        this.resourceService.loadRecursos(this.sampleLibros);
        
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
    }, 800);
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

