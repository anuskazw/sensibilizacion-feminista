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
  isLoading = signal(true);
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

  // Datos de ejemplo de documentales
  private sampleDocumentales: RecursoContent[] = [
    {
      id: '1',
      slug: 'miss-representation',
      tipo: 'recurso',
      subtipo: 'documental',
      titulo: this.createMultilingualText('Miss Representation'),
      descripcion: this.createMultilingualText('Documental que explora cómo los medios de comunicación contribuyen a la representación insuficiente de las mujeres en posiciones de poder e influencia.'),
      descripcion_lectura_facil: this.createMultilingualText('Este documental muestra cómo los medios de comunicación no muestran bien a las mujeres en posiciones importantes.'),
      autor: 'Jennifer Siebel Newsom',
      direccion: 'Jennifer Siebel Newsom',
      anio: 2011,
      duracion: 90,
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '9', nombre: 'Medios de comunicación', slug: 'medios-comunicacion', descripcion: 'Medios de comunicación' }
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
      slug: 'the-mask-you-live-in',
      tipo: 'recurso',
      subtipo: 'documental',
      titulo: this.createMultilingualText('The Mask You Live In'),
      descripcion: this.createMultilingualText('Documental que examina cómo la cultura estadounidense define la masculinidad y cómo esto afecta a niños y hombres, conectando con temas de igualdad de género.'),
      descripcion_lectura_facil: this.createMultilingualText('Este documental habla sobre cómo se espera que los hombres se comporten y cómo eso afecta a todos.'),
      autor: 'Jennifer Siebel Newsom',
      direccion: 'Jennifer Siebel Newsom',
      anio: 2015,
      duracion: 97,
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '10', nombre: 'Masculinidad', slug: 'masculinidad', descripcion: 'Masculinidad' }
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
      slug: 'she-beautiful-when-she-is-angry',
      tipo: 'recurso',
      subtipo: 'documental',
      titulo: this.createMultilingualText('She\'s Beautiful When She\'s Angry'),
      descripcion: this.createMultilingualText('Documental histórico sobre el movimiento de liberación de las mujeres en Estados Unidos desde 1966 hasta 1971, destacando las luchas y logros del feminismo de segunda ola.'),
      descripcion_lectura_facil: this.createMultilingualText('Este documental cuenta la historia de cómo las mujeres lucharon por sus derechos en los años 60 y 70.'),
      autor: 'Mary Dore',
      direccion: 'Mary Dore',
      anio: 2014,
      duracion: 92,
      hashtags: [
        { id: '1', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Feminismo' },
        { id: '8', nombre: 'Historia feminista', slug: 'historia-feminista', descripcion: 'Historia feminista' }
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
      slug: 'feminists-what-were-they-thinking',
      tipo: 'recurso',
      subtipo: 'documental',
      titulo: this.createMultilingualText('Feminists: What Were They Thinking?'),
      descripcion: this.createMultilingualText('Documental que explora el movimiento feminista de los años 70 a través de fotografías y entrevistas con mujeres que participaron en la lucha por la igualdad.'),
      descripcion_lectura_facil: this.createMultilingualText('Este documental muestra fotos y entrevistas de mujeres que lucharon por la igualdad hace muchos años.'),
      autor: 'Johanna Demetrakas',
      direccion: 'Johanna Demetrakas',
      anio: 2018,
      duracion: 86,
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
    this.isLoading.set(true);
    this.hasError.set(false);
    
    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }
        
        // Cargar documentales en el servicio
        this.resourceService.loadRecursos(this.sampleDocumentales);
        
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

