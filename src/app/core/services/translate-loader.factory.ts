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
    // Obtener el baseHref del tag <base> o usar '/' por defecto
    // Esto funciona tanto en desarrollo como en producción con baseHref configurado
    const baseElement = document.querySelector('base');
    const baseHref = baseElement?.getAttribute('href') || '/';
    
    // Construir la ruta relativa al baseHref, eliminando barras duplicadas
    const path = `${baseHref}assets/i18n/${lang}.json`.replace(/([^:]\/)\/+/g, '$1');
    
    return this.http.get(path);
  }
}

/**
 * Factory function para crear el CustomTranslateLoader
 */
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http);
}

