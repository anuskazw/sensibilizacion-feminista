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
    // Usar ruta relativa: Angular HttpClient maneja automáticamente el baseHref
    // Esto funciona tanto en desarrollo (baseHref="/") como en producción (baseHref="/sensibilizacion-feminista/")
    return this.http.get(`assets/i18n/${lang}.json`);
  }
}

/**
 * Factory function para crear el CustomTranslateLoader
 */
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http);
}

