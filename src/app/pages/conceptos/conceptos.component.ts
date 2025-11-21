import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ContentSidebarComponent } from '../../shared/components/content-sidebar/content-sidebar.component';
import { SearchFilterService } from '../../core/services/search-filter.service';
import { LanguageService } from '../../core/services/language.service';
import { SkeletonScreenComponent } from '../../shared/components/skeleton-screen/skeleton-screen.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { OfflineService } from '../../core/services/offline.service';
import { 
  ConceptoContent, 
  Hashtag, 
  MultilingualText 
} from '../../core/models/content.model';
import { ContentFilters } from '../../core/models/filter.model';

/**
 * Página de conceptos con búsqueda, filtrado e índice alfabético
 * Implementa la funcionalidad de US-008
 */
@Component({
  selector: 'app-conceptos',
  standalone: true,
  imports: [CommonModule, TranslateModule, ContentSidebarComponent, SkeletonScreenComponent, ErrorStateComponent],
  templateUrl: './conceptos.component.html',
  styleUrl: './conceptos.component.css'
})
export class ConceptosComponent implements OnInit {
  private searchFilterService = inject(SearchFilterService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private offlineService = inject(OfflineService);

  // Estados de carga y error
  isLoading = signal(true);
  hasError = signal(false);
  errorMessage = signal<string>('');

  // Datos de ejemplo de conceptos feministas
  private sampleHashtags: Hashtag[] = [
    { id: '1', nombre: 'Igualdad', slug: 'igualdad', descripcion: 'Igualdad de género' },
    { id: '2', nombre: 'Feminismo', slug: 'feminismo', descripcion: 'Movimiento feminista' },
    { id: '3', nombre: 'Derechos', slug: 'derechos', descripcion: 'Derechos de las mujeres' },
    { id: '4', nombre: 'Género', slug: 'genero', descripcion: 'Género y sexualidad' },
    { id: '5', nombre: 'Sociedad', slug: 'sociedad', descripcion: 'Sociedad y cultura' },
    { id: '6', nombre: 'Política', slug: 'politica', descripcion: 'Política y feminismo' },
    { id: '7', nombre: 'Economía', slug: 'economia', descripcion: 'Economía feminista' },
    { id: '8', nombre: 'Teoría', slug: 'teoria', descripcion: 'Teoría feminista' },
  ];

  private sampleContents: ConceptoContent[] = [
    {
      id: '1',
      slug: 'patriarcado',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Patriarcado'),
      descripcion: this.createMultilingualText('Sistema de organización social en el que los hombres tienen poder sobre las mujeres.'),
      descripcion_lectura_facil: this.createMultilingualText('El patriarcado es cuando los hombres tienen más poder que las mujeres en la sociedad. Este sistema existe desde hace mucho tiempo.'),
      hashtags: [this.sampleHashtags[4], this.sampleHashtags[7], this.sampleHashtags[1]],
      activo: true,
      fecha_publicacion: new Date('2024-01-15'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-10'),
      fecha_modificacion: new Date('2024-01-15'),
      referencias: [
        { titulo: 'El patriarcado', autor: 'Kate Millet', anio: 1970 }
      ]
    },
    {
      id: '2',
      slug: 'feminismo',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Feminismo'),
      descripcion: this.createMultilingualText('Movimiento social y político que busca la igualdad de derechos entre mujeres y hombres.'),
      descripcion_lectura_facil: this.createMultilingualText('El feminismo lucha por la igualdad entre mujeres y hombres. Quiere que todas las personas tengan los mismos derechos.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[1], this.sampleHashtags[2]],
      activo: true,
      fecha_publicacion: new Date('2024-01-20'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-15'),
      fecha_modificacion: new Date('2024-01-20')
    },
    {
      id: '3',
      slug: 'genero',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Género'),
      descripcion: this.createMultilingualText('Construcción social y cultural de las características, roles y comportamientos asociados a mujeres y hombres.'),
      descripcion_lectura_facil: this.createMultilingualText('El género son las ideas que la sociedad tiene sobre cómo deben ser las mujeres y los hombres. No es lo mismo que el sexo biológico.'),
      hashtags: [this.sampleHashtags[3], this.sampleHashtags[4], this.sampleHashtags[7]],
      activo: true,
      fecha_publicacion: new Date('2024-02-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-01-25'),
      fecha_modificacion: new Date('2024-02-01')
    },
    {
      id: '4',
      slug: 'brecha-salarial',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Brecha salarial'),
      descripcion: this.createMultilingualText('Diferencia de salario promedio entre mujeres y hombres que realizan el mismo trabajo.'),
      descripcion_lectura_facil: this.createMultilingualText('La brecha salarial es cuando las mujeres cobran menos dinero que los hombres por hacer el mismo trabajo.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[6], this.sampleHashtags[2]],
      activo: true,
      fecha_publicacion: new Date('2024-02-10'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-02-05'),
      fecha_modificacion: new Date('2024-02-10')
    },
    {
      id: '5',
      slug: 'empoderamiento',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Empoderamiento'),
      descripcion: this.createMultilingualText('Proceso por el cual las mujeres ganan control sobre sus propias vidas y decisiones.'),
      descripcion_lectura_facil: this.createMultilingualText('Empoderamiento significa que las mujeres pueden tomar sus propias decisiones. Tienen poder sobre su vida.'),
      hashtags: [this.sampleHashtags[2], this.sampleHashtags[1], this.sampleHashtags[4]],
      activo: true,
      fecha_publicacion: new Date('2024-03-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-02-25'),
      fecha_modificacion: new Date('2024-03-01')
    },
    {
      id: '6',
      slug: 'sororidad',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Sororidad'),
      descripcion: this.createMultilingualText('Solidaridad y apoyo mutuo entre mujeres en su lucha por la igualdad.'),
      descripcion_lectura_facil: this.createMultilingualText('La sororidad es la ayuda entre mujeres. Significa que las mujeres se apoyan unas a otras.'),
      hashtags: [this.sampleHashtags[1], this.sampleHashtags[4], this.sampleHashtags[0]],
      activo: true,
      fecha_publicacion: new Date('2024-03-15'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-03-10'),
      fecha_modificacion: new Date('2024-03-15')
    },
    {
      id: '7',
      slug: 'interseccionalidad',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Interseccionalidad'),
      descripcion: this.createMultilingualText('Concepto que reconoce que las personas pueden sufrir discriminación múltiple por género, raza, clase social, etc.'),
      descripcion_lectura_facil: this.createMultilingualText('La interseccionalidad dice que una persona puede sufrir discriminación por varios motivos. Por ejemplo, por ser mujer y por su color de piel.'),
      hashtags: [this.sampleHashtags[7], this.sampleHashtags[1], this.sampleHashtags[2]],
      activo: true,
      fecha_publicacion: new Date('2024-04-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-03-25'),
      fecha_modificacion: new Date('2024-04-01')
    },
    {
      id: '8',
      slug: 'cuota-genero',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Cuota de género'),
      descripcion: this.createMultilingualText('Medida que establece un porcentaje mínimo de mujeres en puestos de decisión o representación.'),
      descripcion_lectura_facil: this.createMultilingualText('Las cuotas de género dicen que debe haber un número mínimo de mujeres en puestos importantes. Por ejemplo, en el gobierno o las empresas.'),
      hashtags: [this.sampleHashtags[5], this.sampleHashtags[0], this.sampleHashtags[2]],
      activo: true,
      fecha_publicacion: new Date('2024-04-15'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-04-10'),
      fecha_modificacion: new Date('2024-04-15')
    },
    {
      id: '9',
      slug: 'androcentrismo',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Androcentrismo'),
      descripcion: this.createMultilingualText('Visión del mundo que coloca al hombre como centro y medida de todas las cosas.'),
      descripcion_lectura_facil: this.createMultilingualText('El androcentrismo es ver el mundo solo desde el punto de vista de los hombres. Es como si solo los hombres fueran importantes.'),
      hashtags: [this.sampleHashtags[7], this.sampleHashtags[4], this.sampleHashtags[1]],
      activo: true,
      fecha_publicacion: new Date('2024-05-01'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-04-25'),
      fecha_modificacion: new Date('2024-05-01')
    },
    {
      id: '10',
      slug: 'coeducacion',
      tipo: 'concepto',
      titulo: this.createMultilingualText('Coeducación'),
      descripcion: this.createMultilingualText('Método educativo que promueve la igualdad entre niñas y niños, eliminando estereotipos de género.'),
      descripcion_lectura_facil: this.createMultilingualText('La coeducación es enseñar la igualdad en las escuelas. Niñas y niños aprenden que pueden hacer las mismas cosas.'),
      hashtags: [this.sampleHashtags[0], this.sampleHashtags[4], this.sampleHashtags[1]],
      activo: true,
      fecha_publicacion: new Date('2024-05-15'),
      estado: 'publicado',
      fecha_creacion: new Date('2024-05-10'),
      fecha_modificacion: new Date('2024-05-15')
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
    return result.items as ConceptoContent[];
  });

  // Hashtags disponibles
  hashtags = computed(() => this.searchFilterService.getAllHashtags());

  // Índice alfabético de conceptos
  alphabeticalIndex = computed(() => {
    const contents = this.filteredContents();
    const lang = this.languageService.getCurrentLanguage();
    const grouped = new Map<string, ConceptoContent[]>();

    contents.forEach(content => {
      const title = this.getTitle(content);
      const firstLetter = title.charAt(0).toUpperCase();
      
      if (!grouped.has(firstLetter)) {
        grouped.set(firstLetter, []);
      }
      grouped.get(firstLetter)!.push(content);
    });

    // Ordenar alfabéticamente
    return Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([letter, items]) => ({
        letter,
        items: items.sort((a, b) => 
          this.getTitle(a).localeCompare(this.getTitle(b))
        )
      }));
  });

  // Letras disponibles en el índice alfabético
  alphabeticalLetters = computed(() => {
    return this.alphabeticalIndex().map(group => group.letter);
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

  getTitle(content: ConceptoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.titulo[lang as keyof MultilingualText] || content.titulo.es;
  }

  getDescription(content: ConceptoContent): string {
    const lang = this.languageService.getCurrentLanguage();
    return content.descripcion_lectura_facil[lang as keyof MultilingualText] || 
           content.descripcion_lectura_facil.es;
  }

  scrollToLetter(letter: string): void {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

