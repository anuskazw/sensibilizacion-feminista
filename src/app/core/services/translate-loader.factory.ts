import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { Inject, Optional } from '@angular/core';

/**
 * Custom TranslateLoader implementation
 * Carga los archivos de traducción desde assets/i18n/
 * Resuelve correctamente el baseHref para GitHub Pages
 */
export class CustomTranslateLoader implements TranslateLoader {
  private baseHref: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) baseHref?: string
  ) {
    // Obtener baseHref del token de inyección o del tag <base> en el DOM
    this.baseHref = baseHref || this.getBaseHrefFromDOM();
  }

  private getBaseHrefFromDOM(): string {
    const baseElement = document.querySelector('base');
    return baseElement?.getAttribute('href') || '/';
  }

  getTranslation(lang: string): Observable<any> {
    // Normalizar baseHref: asegurar que termine con '/' si no es solo '/'
    let normalizedBaseHref = this.baseHref;
    if (normalizedBaseHref !== '/' && !normalizedBaseHref.endsWith('/')) {
      normalizedBaseHref += '/';
    }

    // Construir la ruta completa con el baseHref
    const path = normalizedBaseHref === '/'
      ? `/assets/i18n/${lang}.json`
      : `${normalizedBaseHref}assets/i18n/${lang}.json`;

    return this.http.get(path);
  }
}

/**
 * Factory function para crear el CustomTranslateLoader
 */
export function createTranslateLoader(http: HttpClient, baseHref?: string): TranslateLoader {
  return new CustomTranslateLoader(http, baseHref);
}

