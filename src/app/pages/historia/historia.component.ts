import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContentSidebarComponent } from '../../shared/components/content-sidebar/content-sidebar.component';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { SearchFilterService } from '../../core/services/search-filter.service';
import { LanguageService } from '../../core/services/language.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { 
  HistoriaContent, 
  Hashtag, 
  MultilingualText 
} from '../../core/models/content.model';
import { ContentFilters } from '../../core/models/filter.model';

/**
 * Página de historia con búsqueda y filtrado
 * Demuestra la funcionalidad implementada en US-003
 */
@Component({
  selector: 'app-historia',
  standalone: true,
  imports: [CommonModule, TranslateModule, ContentSidebarComponent, SocialShareComponent],
  templateUrl: './historia.component.html',
  styleUrl: './historia.component.css'
})
export class HistoriaComponent implements OnInit {
  private searchFilterService = inject(SearchFilterService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private analyticsService = inject(AnalyticsService);

  // Datos de ejemplo
  private sampleHashtags: Hashtag[] = [
    { id: '1', nombre: 'Sufragismo', slug: 'sufragismo', descripcion: 'Movimiento por el voto femenino' },
    { id: '2', nombre: 'Igualdad', slug: 'igualdad' },
    { id: '3', nombre: 'Feminismo', slug: 'feminismo' },
    { id: '4', nombre: 'Derechos', slug: 'derechos' },
    { id: '5', nombre: 'Activismo', slug: 'activismo' },
    { id: '6', nombre: 'Historia', slug: 'historia' },
    { id: '7', nombre: 'Pioneras', slug: 'pioneras' },
    { id: '8', nombre: 'Movimiento', slug: 'movimiento' },
  ];

  private sampleContents: HistoriaContent[] = [
    {
      id: '1',
      slug: 'sufragio-femenino-espana',
      tipo: 'historia',
      titulo: this.createMultilingualText('Sufragio femenino en España (1931)'),
      descripcion: this.createMultilingualText('El derecho al voto de las mujeres en España se aprobó en 1931 durante la Segunda República.'),
      descripcion_lectura_facil: this.createMultilingualText('En 1931 las mujeres españolas consiguieron el derecho a votar. Fue un logro muy importante.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[3], this.sampleHashtags[5]],
      anio: 1931,
      activo: true,
      fecha_publicacion: new Date('2024-01-15'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-10'),
      fecha_modificacion: new Date('2024-01-15'),
      referencias: [
        { titulo: 'Historia del sufragismo en España', autor: 'María Martínez', anio: 2010 }
      ]
    },
    {
      id: '2',
      slug: 'clara-campoamor',
      tipo: 'historia',
      titulo: this.createMultilingualText('Clara Campoamor'),
      descripcion: this.createMultilingualText('Clara Campoamor fue una política y activista española que luchó por el derecho al voto femenino.'),
      descripcion_lectura_facil: this.createMultilingualText('Clara Campoamor luchó para que las mujeres pudieran votar. Gracias a ella conseguimos este derecho.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[6], this.sampleHashtags[4]],
      anio: 1931,
      activo: true,
      fecha_publicacion: new Date('2024-01-20'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-15'),
      fecha_modificacion: new Date('2024-01-20')
    },
    {
      id: '3',
      slug: 'olympe-de-gouges',
      tipo: 'historia',
      titulo: this.createMultilingualText('Olympe de Gouges'),
      descripcion: this.createMultilingualText('Olympe de Gouges escribió la Declaración de los Derechos de la Mujer y la Ciudadana en 1791.'),
      descripcion_lectura_facil: this.createMultilingualText('En 1791, Olympe de Gouges escribió sobre los derechos de las mujeres. Fue muy valiente.'),
      hashtags: [this.sampleHashtags[3], this.sampleHashtags[6], this.sampleHashtags[5]],
      anio: 1791,
      activo: true,
      fecha_publicacion: new Date('2024-02-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-25'),
      fecha_modificacion: new Date('2024-02-01')
    },
    {
      id: '4',
      slug: 'dia-internacional-mujer',
      tipo: 'historia',
      titulo: this.createMultilingualText('Día Internacional de la Mujer (1975)'),
      descripcion: this.createMultilingualText('En 1975 la ONU estableció el 8 de marzo como Día Internacional de la Mujer.'),
      descripcion_lectura_facil: this.createMultilingualText('El 8 de marzo es el Día de la Mujer. Se celebra desde 1975 en todo el mundo.'),
      hashtags: [this.sampleHashtags[2], this.sampleHashtags[1], this.sampleHashtags[7]],
      anio: 1975,
      activo: true,
      fecha_publicacion: new Date('2024-02-10'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-02-05'),
      fecha_modificacion: new Date('2024-02-10')
    },
    {
      id: '5',
      slug: 'movimiento-me-too',
      tipo: 'historia',
      titulo: this.createMultilingualText('Movimiento #MeToo (2017)'),
      descripcion: this.createMultilingualText('El movimiento #MeToo surgió en 2017 para denunciar el acoso y la violencia sexual.'),
      descripcion_lectura_facil: this.createMultilingualText('En 2017 muchas mujeres compartieron sus experiencias de acoso. Esto se llamó movimiento MeToo.'),
      hashtags: [this.sampleHashtags[4], this.sampleHashtags[7], this.sampleHashtags[2]],
      anio: 2017,
      activo: true,
      fecha_publicacion: new Date('2024-03-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-02-25'),
      fecha_modificacion: new Date('2024-03-01')
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
    return result.items as HistoriaContent[];
  });

  // Hashtags y rango de años
  hashtags = computed(() => this.searchFilterService.getAllHashtags());
  yearRange = computed(() => this.searchFilterService.getYearRange());

  ngOnInit(): void {
    // Inicializar el servicio con datos de ejemplo
    this.searchFilterService.setContents(this.sampleContents);
    
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

