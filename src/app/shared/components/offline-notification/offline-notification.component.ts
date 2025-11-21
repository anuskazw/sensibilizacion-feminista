import { Component, OnInit, OnDestroy, inject, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OfflineService } from '../../../core/services/offline.service';

/**
 * Componente para mostrar notificación cuando la aplicación está offline
 * Implementa la funcionalidad de US-025
 */
@Component({
  selector: 'app-offline-notification',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './offline-notification.component.html',
  styleUrl: './offline-notification.component.css'
})
export class OfflineNotificationComponent implements OnInit, OnDestroy {
  private offlineService = inject(OfflineService);
  
  // Computed signal que indica si está offline (inverso de isOnline)
  isOffline = computed(() => !this.offlineService.isOnline());
  
  // Signal para controlar si el banner está visible (cerrado por el usuario)
  isDismissed = signal(false);

  // Computed signal que determina si el banner debe mostrarse
  shouldShow = computed(() => this.isOffline() && !this.isDismissed());

  constructor() {
    // Resetear el estado de cerrado cuando vuelve la conexión
    // para que se muestre de nuevo si vuelve a estar offline
    effect(() => {
      const isOnline = this.offlineService.isOnline();
      if (isOnline) {
        this.isDismissed.set(false);
      }
    });
  }

  ngOnInit(): void {
    // No hay inicialización adicional necesaria
  }

  ngOnDestroy(): void {
    // Los effects se limpian automáticamente
  }

  /**
   * Cierra/oculta el banner de notificación offline
   */
  dismiss(): void {
    this.isDismissed.set(true);
  }
}

