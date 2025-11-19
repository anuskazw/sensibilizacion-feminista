import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Language {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Idiomas soportados según los requisitos del proyecto
  public readonly availableLanguages: Language[] = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'ca', name: 'Català' },
    { code: 'val', name: 'Valencià' },
    { code: 'gl', name: 'Galego' },
    { code: 'eu', name: 'Euskara' }
  ];

  private readonly STORAGE_KEY = 'preferred-language';
  private readonly DEFAULT_LANGUAGE = 'es';

  constructor(private translate: TranslateService) {
    this.initLanguage();
  }

  /**
   * Inicializa el idioma de la aplicación
   * 1. Verifica si hay un idioma guardado en localStorage
   * 2. Si no hay, detecta el idioma del navegador (Accept-Language)
   * 3. Si no es soportado, usa el idioma por defecto (español)
   */
  private initLanguage(): void {
    // Configurar idiomas disponibles
    this.translate.addLangs(this.availableLanguages.map(lang => lang.code));
    
    // Intentar obtener idioma guardado
    const savedLanguage = this.getSavedLanguage();
    
    if (savedLanguage && this.isLanguageSupported(savedLanguage)) {
      this.setLanguage(savedLanguage);
    } else {
      // Detectar idioma del navegador
      const browserLang = this.detectBrowserLanguage();
      this.setLanguage(browserLang);
    }
  }

  /**
   * Detecta el idioma del navegador usando Accept-Language
   */
  private detectBrowserLanguage(): string {
    const browserLang = this.translate.getBrowserLang();
    
    if (browserLang && this.isLanguageSupported(browserLang)) {
      return browserLang;
    }
    
    // Si el idioma del navegador no es soportado, usar el idioma por defecto
    return this.DEFAULT_LANGUAGE;
  }

  /**
   * Verifica si un idioma está soportado
   */
  private isLanguageSupported(lang: string): boolean {
    return this.availableLanguages.some(l => l.code === lang);
  }

  /**
   * Obtiene el idioma guardado en localStorage
   */
  private getSavedLanguage(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  /**
   * Guarda el idioma en localStorage
   */
  private saveLanguage(lang: string): void {
    localStorage.setItem(this.STORAGE_KEY, lang);
  }

  /**
   * Establece el idioma actual de la aplicación
   */
  public setLanguage(lang: string): void {
    if (this.isLanguageSupported(lang)) {
      this.translate.use(lang);
      this.saveLanguage(lang);
      
      // Actualizar el atributo lang del HTML para accesibilidad
      document.documentElement.lang = lang;
    }
  }

  /**
   * Obtiene el idioma actual
   */
  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  /**
   * Obtiene el nombre del idioma actual
   */
  public getCurrentLanguageName(): string {
    const currentLang = this.getCurrentLanguage();
    const language = this.availableLanguages.find(lang => lang.code === currentLang);
    return language ? language.name : this.DEFAULT_LANGUAGE;
  }
}

