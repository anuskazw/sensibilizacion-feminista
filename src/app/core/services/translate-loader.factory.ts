import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

/**
 * Custom TranslateLoader implementation
 * Carga los archivos de traducción desde assets/i18n/
 */
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/assets/i18n/${lang}.json`);
  }
}

/**
 * Factory function para crear el CustomTranslateLoader
 */
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http);
}

