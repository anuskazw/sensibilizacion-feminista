import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonScreenComponent } from '../../shared/components/skeleton-screen/skeleton-screen.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { OfflineService } from '../../core/services/offline.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * Página de recursos con grid de tarjetas principales
 * Implementa la funcionalidad de US-010
 */
@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, SkeletonScreenComponent, ErrorStateComponent],
  templateUrl: './recursos.component.html',
  styleUrl: './recursos.component.css'
})
export class RecursosComponent implements OnInit {
  private offlineService = inject(OfflineService);
  private translateService = inject(TranslateService);

  // Estados de carga y error
  isLoading = signal(false);
  hasError = signal(false);
  errorMessage = signal<string>('');
  ngOnInit(): void {
    // Simular carga de datos
    // this.isLoading.set(true);
    this.hasError.set(false);

    // Simular carga asíncrona
    setTimeout(() => {
      try {
        if (this.offlineService.isOffline()) {
          throw new Error('offline');
        }
        this.isLoading.set(false);
      } catch (error: any) {
        this.hasError.set(true);
        this.isLoading.set(false);
        if (error.message === 'offline') {
          this.errorMessage.set('error.offline');
        } else {
          this.errorMessage.set('error.generic');
        }
      }
    }, 0);
  }

  retryLoad(): void {
    this.ngOnInit();
  }

  getErrorSuggestions(): string[] {
    if (this.offlineService.isOffline()) {
      return [
        this.translateService.instant('error.suggestionsOffline.0'),
        this.translateService.instant('error.suggestionsOffline.1'),
        this.translateService.instant('error.suggestionsOffline.2')
      ];
    }
    return [
      this.translateService.instant('error.suggestionsNetwork.0'),
      this.translateService.instant('error.suggestionsNetwork.1'),
      this.translateService.instant('error.suggestionsNetwork.2')
    ];
  }

  // Tarjetas principales de recursos
  resourceCards = [
    {
      id: 'libros',
      icon: '📚',
      route: '/recursos/libros',
      ariaLabel: 'Ir a la sección de Libros'
    },
    {
      id: 'peliculas-series',
      icon: '🎬',
      route: '/recursos/peliculas-y-series',
      ariaLabel: 'Ir a la sección de Películas y series'
    },
    {
      id: 'documentales',
      icon: '🎥',
      route: '/recursos/documentales',
      ariaLabel: 'Ir a la sección de Documentales'
    }
  ];
}

