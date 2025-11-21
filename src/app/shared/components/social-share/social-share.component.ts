import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BaseContent, MultilingualText } from '../../../core/models/content.model';

/**
 * Componente para compartir contenido en redes sociales
 * Implementa la funcionalidad de US-028
 */
@Component({
  selector: 'app-social-share',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './social-share.component.html',
  styleUrl: './social-share.component.css'
})
export class SocialShareComponent {
  @Input() content!: BaseContent;
  @Input() url?: string;
  @Input() title?: string;
  @Input() description?: string;

  // URL base de la aplicación
  private readonly baseUrl = computed(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  });

  // URL completa del contenido a compartir
  private readonly shareUrl = computed(() => {
    if (this.url) {
      return this.url.startsWith('http') ? this.url : `${this.baseUrl()}${this.url}`;
    }
    if (this.content?.slug) {
      return `${this.baseUrl()}/${this.content.tipo}/${this.content.slug}`;
    }
    return this.baseUrl();
  });

  // Título para compartir
  private readonly shareTitle = computed(() => {
    if (this.title) {
      return this.title;
    }
    if (this.content?.titulo) {
      const lang = this.getCurrentLanguage();
      return this.content.titulo[lang as keyof MultilingualText] || this.content.titulo.es || '';
    }
    return '';
  });

  // Descripción para compartir
  private readonly shareDescription = computed(() => {
    if (this.description) {
      return this.description;
    }
    if (this.content?.descripcion) {
      const lang = this.getCurrentLanguage();
      return this.content.descripcion[lang as keyof MultilingualText] || this.content.descripcion.es || '';
    }
    return '';
  });

  /**
   * Obtiene el idioma actual
   */
  private getCurrentLanguage(): string {
    if (typeof document !== 'undefined') {
      const htmlLang = document.documentElement.lang;
      return htmlLang || 'es';
    }
    return 'es';
  }

  /**
   * Comparte en Twitter/X
   */
  shareOnTwitter(): void {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.shareTitle())}&url=${encodeURIComponent(this.shareUrl())}`;
    this.openShareWindow(url, 'twitter');
  }

  /**
   * Comparte en Facebook
   */
  shareOnFacebook(): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl())}`;
    this.openShareWindow(url, 'facebook');
  }

  /**
   * Comparte en WhatsApp
   */
  shareOnWhatsApp(): void {
    const text = `${this.shareTitle()}\n${this.shareDescription()}\n${this.shareUrl()}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    this.openShareWindow(url, 'whatsapp');
  }

  /**
   * Comparte en Telegram
   */
  shareOnTelegram(): void {
    const text = `${this.shareTitle()}\n${this.shareDescription()}\n${this.shareUrl()}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.shareUrl())}&text=${encodeURIComponent(text)}`;
    this.openShareWindow(url, 'telegram');
  }

  /**
   * Abre la ventana de compartir
   */
  private openShareWindow(url: string, platform: string): void {
    const width = 600;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      url,
      `share-${platform}`,
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1`
    );
  }

  /**
   * Getters para usar en el template
   */
  getShareUrl(): string {
    return this.shareUrl();
  }

  getShareTitle(): string {
    return this.shareTitle();
  }

  getShareDescription(): string {
    return this.shareDescription();
  }
}

