import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Injector } from '@angular/core';

/**
 * Custom TranslateLoader implementation
 * Carga los archivos de traducción desde assets/i18n/
 * Resuelve correctamente el baseHref para GitHub Pages usando Location
 */
export class CustomTranslateLoader implements TranslateLoader {
  private location: Location;

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {
    // Obtener Location usando Injector para evitar dependencias circulares
    this.location = this.injector.get(Location);
  }

  getTranslation(lang: string): Observable<any> {
    // Usar Location.prepareExternalUrl() que maneja automáticamente el baseHref
    const path = this.location.prepareExternalUrl(`assets/i18n/${lang}.json`);
    return this.http.get(path);
  }
}

/**
 * Factory function para crear el CustomTranslateLoader
 */
export function createTranslateLoader(http: HttpClient, injector: Injector): TranslateLoader {
  return new CustomTranslateLoader(http, injector);
}

