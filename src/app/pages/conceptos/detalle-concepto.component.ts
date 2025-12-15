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
  ConceptoContent,
  MultilingualText
} from '../../core/models/content.model';
import { sampleContents } from './data';

/**
 * Componente de detalle de un concepto específico
 * Muestra el concepto completo con descripción en lectura fácil y enlaces de redes sociales
 */
@Component({
  selector: 'app-detalle-concepto',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    SocialShareComponent,
    SignLanguageVideoPlayerComponent
  ],
  templateUrl: './detalle-concepto.component.html',
  styleUrl: './detalle-concepto.component.css'
})
export class DetalleConceptoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private searchFilterService = inject(SearchFilterService);
  private languageService = inject(LanguageService);
  private translateService = inject(TranslateService);
  private analyticsService = inject(AnalyticsService);
  private sanitizer = inject(DomSanitizer);

  // Contenido actual
  content = signal<ConceptoContent | null>(null);
  isLoading = signal(true);
  notFound = signal(false);

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
    let contents = this.searchFilterService.getContents() as ConceptoContent[];
    if (contents.length === 0) {
      this.searchFilterService.setContents(sampleContents);
      contents = this.searchFilterService.getContents() as ConceptoContent[];
    }

    const foundContent = contents.find(c => c.slug === slug && c.tipo === 'concepto');

    if (foundContent) {
      this.content.set(foundContent);

      // Trackear vista de contenido
      this.analyticsService.trackContentView(
        `concepto-${foundContent.id}`,
        'concepto',
        foundContent.hashtags.map(h => h.nombre)
      );

      this.isLoading.set(false);
    } else {
      this.notFound.set(true);
      this.isLoading.set(false);
    }
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

  getDescriptionLecturaFacil(): string {
    const content = this.content();
    if (!content) return '';
    const lang = this.languageService.getCurrentLanguage();
    return content.descripcion_lectura_facil[lang as keyof MultilingualText] ||
           content.descripcion_lectura_facil.es;
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

  getShareUrl(): string {
    const content = this.content();
    if (!content) return '';
    return `/conceptos/${content.slug}`;
  }

  hasVideo(): boolean {
    const content = this.content();
    if (!content) return false;
    return !!(content.video_lse_url || content.video_lsc_url);
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

  goBack(): void {
    this.router.navigate(['/conceptos']);
  }
}
