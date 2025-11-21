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
  Hashtag, 
  MultilingualText 
} from '../../core/models/content.model';
import { ContentFilters } from '../../core/models/filter.model';

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
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');

  // Datos de ejemplo de términos relacionados con violencia
  private sampleHashtags: Hashtag[] = [
    { id: '1', nombre: 'Violencia de género', slug: 'violencia-genero', descripcion: 'Violencia ejercida contra las mujeres' },
    { id: '2', nombre: 'Violencia física', slug: 'violencia-fisica', descripcion: 'Violencia física' },
    { id: '3', nombre: 'Violencia psicológica', slug: 'violencia-psicologica', descripcion: 'Violencia psicológica y emocional' },
    { id: '4', nombre: 'Violencia sexual', slug: 'violencia-sexual', descripcion: 'Violencia sexual' },
    { id: '5', nombre: 'Violencia económica', slug: 'violencia-economica', descripcion: 'Violencia económica' },
    { id: '6', nombre: 'Violencia digital', slug: 'violencia-digital', descripcion: 'Violencia en el entorno digital' },
    { id: '7', nombre: 'Señales de alerta', slug: 'senales-alerta', descripcion: 'Señales de alerta de violencia' },
    { id: '8', nombre: 'Recursos de ayuda', slug: 'recursos-ayuda', descripcion: 'Recursos y ayuda disponible' },
  ];

  private sampleContents: ViolenciaContent[] = [
    {
      id: '1',
      slug: 'violencia-fisica',
      tipo: 'violencia',
      titulo: this.createMultilingualText('Violencia física'),
      descripcion: this.createMultilingualText('Cualquier acto que cause daño físico a una mujer.'),
      descripcion_lectura_facil: this.createMultilingualText('La violencia física es cuando alguien te hace daño en el cuerpo. Puede ser golpes, empujones o cualquier cosa que te haga daño físico.'),
      senales_alerta: this.createMultilingualText('Señales de alerta: golpes, empujones, heridas, moretones, fracturas.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[1], this.sampleHashtags[6]],
      recursos_ayuda: ['016', '112'],
      activo: true,
      fecha_publicacion: new Date('2024-01-15'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-10'),
      fecha_modificacion: new Date('2024-01-15'),
      referencias: [
        { titulo: 'Ley Orgánica 1/2004', url: 'https://www.boe.es', anio: 2004 }
      ]
    },
    {
      id: '2',
      slug: 'violencia-psicologica',
      tipo: 'violencia',
      titulo: this.createMultilingualText('Violencia psicológica'),
      descripcion: this.createMultilingualText('Cualquier acto que cause daño emocional o psicológico.'),
      descripcion_lectura_facil: this.createMultilingualText('La violencia psicológica es cuando alguien te hace sentir mal con palabras o acciones. Te insulta, te amenaza o te hace sentir que no vales nada.'),
      senales_alerta: this.createMultilingualText('Señales de alerta: insultos, amenazas, humillaciones, aislamiento, control excesivo.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[2], this.sampleHashtags[6]],
      recursos_ayuda: ['016', '112'],
      activo: true,
      fecha_publicacion: new Date('2024-01-20'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-15'),
      fecha_modificacion: new Date('2024-01-20')
    },
    {
      id: '3',
      slug: 'violencia-sexual',
      tipo: 'violencia',
      titulo: this.createMultilingualText('Violencia sexual'),
      descripcion: this.createMultilingualText('Cualquier acto de naturaleza sexual realizado sin consentimiento.'),
      descripcion_lectura_facil: this.createMultilingualText('La violencia sexual es cuando alguien te obliga a hacer algo sexual que no quieres. Siempre necesitas dar tu permiso para cualquier acto sexual.'),
      senales_alerta: this.createMultilingualText('Señales de alerta: agresiones sexuales, acoso sexual, coacción sexual.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[3], this.sampleHashtags[6]],
      recursos_ayuda: ['016', '112'],
      activo: true,
      fecha_publicacion: new Date('2024-02-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-25'),
      fecha_modificacion: new Date('2024-02-01')
    },
    {
      id: '4',
      slug: 'violencia-economica',
      tipo: 'violencia',
      titulo: this.createMultilingualText('Violencia económica'),
      descripcion: this.createMultilingualText('Control o limitación del acceso a recursos económicos.'),
      descripcion_lectura_facil: this.createMultilingualText('La violencia económica es cuando alguien controla tu dinero. No te deja trabajar, te quita tu dinero o no te da lo necesario para vivir.'),
      senales_alerta: this.createMultilingualText('Señales de alerta: control del dinero, prohibición de trabajar, limitación de recursos básicos.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[4], this.sampleHashtags[6]],
      recursos_ayuda: ['016'],
      activo: true,
      fecha_publicacion: new Date('2024-02-10'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-02-05'),
      fecha_modificacion: new Date('2024-02-10')
    },
    {
      id: '5',
      slug: 'violencia-digital',
      tipo: 'violencia',
      titulo: this.createMultilingualText('Violencia digital'),
      descripcion: this.createMultilingualText('Violencia ejercida a través de medios digitales y redes sociales.'),
      descripcion_lectura_facil: this.createMultilingualText('La violencia digital es cuando alguien te hace daño usando internet o el móvil. Puede ser acoso, amenazas o compartir fotos sin tu permiso.'),
      senales_alerta: this.createMultilingualText('Señales de alerta: acoso online, amenazas por redes sociales, control de dispositivos, difusión de imágenes sin consentimiento.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[5], this.sampleHashtags[6]],
      recursos_ayuda: ['016', '017'],
      activo: true,
      fecha_publicacion: new Date('2024-03-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-02-25'),
      fecha_modificacion: new Date('2024-03-01')
    },
    {
      id: '6',
      slug: 'violencia-institucional',
      tipo: 'violencia',
      titulo: this.createMultilingualText('Violencia institucional'),
      descripcion: this.createMultilingualText('Acciones u omisiones de instituciones públicas que vulneran derechos.'),
      descripcion_lectura_facil: this.createMultilingualText('La violencia institucional es cuando las instituciones públicas no te ayudan o te tratan mal. Por ejemplo, cuando la policía o los servicios sociales no te creen o no te ayudan.'),
      senales_alerta: this.createMultilingualText('Señales de alerta: falta de respuesta institucional, revictimización, falta de recursos.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[7], this.sampleHashtags[6]],
      recursos_ayuda: ['016'],
      activo: true,
      fecha_publicacion: new Date('2024-03-15'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-03-10'),
      fecha_modificacion: new Date('2024-03-15')
    }
  ];

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
    this.isLoading.set(true);
    this.hasError.set(false);
    
    // Simular carga asíncrona
    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }
        // Inicializar el servicio con datos de ejemplo
        this.searchFilterService.setContents(this.sampleContents);
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
    }, 800); // Simular delay de carga
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

  private createMultilingualText(text: string): MultilingualText {
    return {
      es: text,
      en: text, // En producción, aquí irían las traducciones reales
      ca: text,
      val: text,
      gl: text,
      eu: text
    };
  }
}

