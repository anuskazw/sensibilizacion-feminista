import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

/**
 * Custom TranslateLoader implementation
 * Carga los archivos de traducción desde assets/i18n/
 * Resuelve correctamente el baseHref para GitHub Pages
 */
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    // Obtener el baseHref del tag <base> en el DOM
    // Esto funciona tanto en desarrollo como en producción
    const baseElement = document.querySelector('base');
    let baseHref = baseElement?.getAttribute('href') || '/';
    
    // Normalizar baseHref: asegurar que termine con '/' si no es solo '/'
    if (baseHref !== '/' && !baseHref.endsWith('/')) {
      baseHref += '/';
    }
    
    // Construir la ruta completa con el baseHref
    const path = baseHref === '/'
      ? `/assets/i18n/${lang}.json`
      : `${baseHref}assets/i18n/${lang}.json`;
    
    return this.http.get(path);
  }
}

/**
 * Factory function para crear el CustomTranslateLoader
 */
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http);
}

