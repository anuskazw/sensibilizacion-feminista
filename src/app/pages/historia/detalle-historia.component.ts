import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SocialShareComponent } from '../../shared/components/social-share/social-share.component';
import { SignLanguageVideoPlayerComponent } from '../../shared/components/sign-language-video-player/sign-language-video-player.component';
import { SearchFilterService } from '../../core/services/search-filter.service';
import { LanguageService } from '../../core/services/language.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import {
  HistoriaContent,
  MultilingualText
} from '../../core/models/content.model';
import { sampleContents } from './data';

/**
 * Componente de detalle de una historia específica
 * Muestra artículo completo con video signado y enlaces de redes sociales
 */
@Component({
  selector: 'app-detalle-historia',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    SocialShareComponent,
    SignLanguageVideoPlayerComponent
  ],
  templateUrl: './detalle-historia.component.html',
  styleUrl: './detalle-historia.component.css'
})
export class DetalleHistoriaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchFilterService = inject(SearchFilterService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private analyticsService = inject(AnalyticsService);
  private sanitizer = inject(DomSanitizer);

  // Contenido actual
  content = signal<HistoriaContent | null>(null);
  isLoading = signal(true);
  notFound = signal(false);

  // Contenido extendido para el artículo largo
  contenidoExtendido = signal<MultilingualText | null>(null);

  // URL segura del video de YouTube cacheada para evitar recargas
  safeYouTubeUrl = computed(() => {
    const currentContent = this.content();
    if (!currentContent) return null;
    
    const videoUrl = currentContent.video_lse_url || currentContent.video_lsc_url || null;
    if (!videoUrl || !this.isYouTubeUrl(videoUrl)) return null;
    
    return this.getSafeYouTubeUrl(videoUrl);
  });

  ngOnInit(): void {
    // Asegurar que los datos estén cargados antes de buscar el contenido
    // Esto es importante cuando se accede directamente a la URL compartida
    const currentContents = this.searchFilterService.getContents();
    if (currentContents.length === 0) {
      this.searchFilterService.setContents(sampleContents);
    }

    // Obtener el slug de la ruta
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        // Asegurar que los datos estén cargados antes de buscar
        const contents = this.searchFilterService.getContents();
        if (contents.length === 0) {
          this.searchFilterService.setContents(sampleContents);
        }
        this.loadContent(slug);
      } else {
        this.notFound.set(true);
        this.isLoading.set(false);
      }
    });
  }

  private loadContent(slug: string): void {
    // Asegurar que los datos estén cargados
    let contents = this.searchFilterService.getContents() as HistoriaContent[];
    if (contents.length === 0) {
      this.searchFilterService.setContents(sampleContents);
      contents = this.searchFilterService.getContents() as HistoriaContent[];
    }

    const foundContent = contents.find(c => c.slug === slug && c.tipo === 'historia');

    if (foundContent) {
      this.content.set(foundContent);
      
      // Generar contenido extendido si no existe
      this.generateExtendedContent(foundContent);
      
      // Trackear vista de contenido
      this.analyticsService.trackContentView(
        `historia-${foundContent.id}`,
        'historia',
        foundContent.hashtags.map(h => this.getHashtagName(h))
      );
      
      this.isLoading.set(false);
    } else {
      this.notFound.set(true);
      this.isLoading.set(false);
    }
  }

  private generateExtendedContent(content: HistoriaContent): void {
    const lang = this.languageService.getCurrentLanguage();
    
    // Si ya existe contenido extendido en los datos, usarlo
    // Por ahora generamos uno basado en la descripción
    const extendedText: MultilingualText = {
      es: this.getExtendedTextEs(content),
      en: this.getExtendedTextEn(content),
      ca: this.getExtendedTextCa(content),
      val: this.getExtendedTextVal(content),
      gl: this.getExtendedTextGl(content),
      eu: this.getExtendedTextEu(content)
    };
    
    this.contenidoExtendido.set(extendedText);
  }

  private getExtendedTextEs(content: HistoriaContent): string {
    const baseDesc = content.descripcion.es || content.descripcion_lectura_facil.es || '';
    
    // Generar texto extendido basado en el contenido
    switch (content.slug) {
      case 'sufragio-femenino-espana':
        return `${baseDesc} Este logro histórico marcó un antes y un después en la lucha por los derechos de las mujeres en España. La aprobación del sufragio femenino fue el resultado de años de lucha y activismo por parte de mujeres valientes que se enfrentaron a una sociedad que les negaba el derecho fundamental a participar en la vida política del país. Clara Campoamor fue una de las principales defensoras de este derecho, enfrentándose incluso a otras mujeres políticas que se oponían al voto femenino. Este momento histórico abrió las puertas para que las mujeres españolas pudieran ejercer su derecho al voto y participar activamente en la construcción de la democracia.`;
      
      case 'clara-campoamor':
        return `${baseDesc} Nacida en Madrid en 1888, Clara Campoamor fue una abogada, escritora y política española que dedicó su vida a la defensa de los derechos de las mujeres. Su discurso en las Cortes Constituyentes de 1931 fue fundamental para conseguir el derecho al voto femenino. Campoamor se enfrentó a la oposición de muchos diputados, incluyendo a Victoria Kent, otra mujer política que consideraba que las mujeres aún no estaban preparadas para votar. Sin embargo, Clara Campoamor defendió con firmeza que el derecho al voto era un derecho fundamental que no podía estar condicionado. Su lucha y su legado continúan siendo una inspiración para las generaciones actuales.`;
      
      case 'olympe-de-gouges':
        return `${baseDesc} Olympe de Gouges fue una escritora, dramaturga y activista política francesa que vivió durante la Revolución Francesa. En 1791 escribió la "Declaración de los Derechos de la Mujer y de la Ciudadana", un documento revolucionario que exigía la igualdad de derechos entre hombres y mujeres. Su obra fue una respuesta directa a la "Declaración de los Derechos del Hombre y del Ciudadano" de 1789, que excluía a las mujeres. De Gouges fue una de las primeras feministas de la historia y pagó con su vida su valentía: fue guillotinada en 1793 por sus ideas políticas y su defensa de los derechos de las mujeres. Su legado sigue siendo fundamental en la historia del feminismo.`;
      
      case 'dia-internacional-mujer':
        return `${baseDesc} El Día Internacional de la Mujer tiene sus raíces en las luchas obreras de principios del siglo XX, cuando las mujeres trabajadoras comenzaron a organizarse para reclamar mejores condiciones laborales y derechos políticos. Aunque la ONU lo estableció oficialmente en 1975, la fecha del 8 de marzo conmemora eventos históricos como la huelga de trabajadoras textiles en Nueva York en 1908 y la manifestación de mujeres en Petrogrado en 1917 que marcó el inicio de la Revolución Rusa. Este día es una oportunidad para reflexionar sobre los logros alcanzados, reconocer los desafíos que aún enfrentan las mujeres en todo el mundo y renovar el compromiso con la igualdad de género.`;
      
      case 'movimiento-me-too':
        return `${baseDesc} El movimiento #MeToo comenzó en octubre de 2017 cuando la actriz Alyssa Milano utilizó el hashtag en Twitter para animar a las mujeres a compartir sus experiencias de acoso y agresión sexual. El movimiento se viralizó rápidamente, con millones de mujeres compartiendo sus historias en redes sociales. Este movimiento global ha tenido un impacto profundo en la sociedad, llevando a la destitución de poderosos hombres en diversas industrias, cambios en las leyes sobre acoso sexual y una mayor conciencia sobre la prevalencia de la violencia sexual. El #MeToo ha empoderado a las mujeres para hablar sobre sus experiencias y ha iniciado conversaciones importantes sobre el consentimiento, el poder y la igualdad.`;
      
      default:
        return `${baseDesc} Este es un momento importante en la historia del feminismo que merece ser recordado y estudiado. La lucha por los derechos de las mujeres ha sido larga y continua, y cada logro representa un paso adelante hacia la igualdad. Es fundamental conocer nuestra historia para entender el presente y construir un futuro más justo para todas las personas.`;
    }
  }

  private getExtendedTextEn(content: HistoriaContent): string {
    return this.getExtendedTextEs(content); // Por ahora usamos el mismo texto
  }

  private getExtendedTextCa(content: HistoriaContent): string {
    return this.getExtendedTextEs(content);
  }

  private getExtendedTextVal(content: HistoriaContent): string {
    return this.getExtendedTextEs(content);
  }

  private getExtendedTextGl(content: HistoriaContent): string {
    return this.getExtendedTextEs(content);
  }

  private getExtendedTextEu(content: HistoriaContent): string {
    return this.getExtendedTextEs(content);
  }

  getTitle(): string {
    const content = this.content();
    if (!content) return '';
    const lang = this.languageService.getCurrentLanguage();
    return content.titulo[lang as keyof MultilingualText] || content.titulo.es;
  }

  getDescription(): string {
    const content = this.content();
    if (!content) return '';
    const lang = this.languageService.getCurrentLanguage();
    return content.descripcion[lang as keyof MultilingualText] || content.descripcion.es;
  }

  getHashtagName(hashtag: any): string {
    const lang = this.languageService.getCurrentLanguage();
    return hashtag.nombre[lang as keyof MultilingualText] || hashtag.nombre.es;
  }

  getExtendedContent(): string {
    const extended = this.contenidoExtendido();
    if (!extended) return '';
    const lang = this.languageService.getCurrentLanguage();
    return extended[lang as keyof MultilingualText] || extended.es;
  }

  getExtendedContentParagraphs(): string[] {
    const content = this.getExtendedContent();
    if (!content) return [];
    // Dividir por puntos seguidos de espacio o doble salto de línea
    return content.split(/\.\s+/).filter(p => p.trim().length > 0).map(p => p.trim() + '.');
  }

  getVideoData() {
    const content = this.content();
    if (!content) return null;
    
    return {
      lseUrl: content.video_lse_url,
      lscUrl: content.video_lsc_url,
      title: this.getTitle(),
      transcription: content.video_transcription 
        ? (content.video_transcription[this.languageService.getCurrentLanguage() as keyof MultilingualText] || content.video_transcription.es)
        : undefined,
      subtitlesUrl: content.video_subtitles_url
    };
  }

  isYouTubeUrl(url?: string): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';
    
    // Convertir diferentes formatos de URL de YouTube a embed
    let videoId = '';
    
    if (url.includes('youtu.be/')) {
      // Formato: https://youtu.be/VIDEO_ID
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('youtube.com/watch?v=')) {
      // Formato: https://www.youtube.com/watch?v=VIDEO_ID
      videoId = url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtube.com/embed/')) {
      // Ya es formato embed, extraer videoId y reconstruir con parámetros
      const match = url.match(/embed\/([^?]+)/);
      if (match) {
        videoId = match[1];
      } else {
        return url.split('?')[0]; // Remover parámetros adicionales si no hay videoId
      }
    }
    
    if (videoId) {
      // Parámetros para reducir tracking y recursos innecesarios:
      // - modestbranding=1: Reduce branding de YouTube
      // - rel=0: No muestra videos relacionados al final
      // - enablejsapi=0: Desactiva JavaScript API (reduce solicitudes)
      // - origin: Especifica el origen para seguridad
      const params = new URLSearchParams({
        'modestbranding': '1',
        'rel': '0',
        'enablejsapi': '0',
        'origin': typeof window !== 'undefined' ? window.location.origin : ''
      });
      
      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }
    
    return url;
  }

  getSafeYouTubeUrl(url: string): SafeResourceUrl {
    const embedUrl = this.getYouTubeEmbedUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getVideoUrl(): string | null {
    const content = this.content();
    if (!content) return null;
    return content.video_lse_url || content.video_lsc_url || null;
  }

  getShareUrl(): string {
    const content = this.content();
    if (!content) return '';
    return `/historia/${content.slug}`;
  }

  goBack(): void {
    this.router.navigate(['/historia']);
  }
}

