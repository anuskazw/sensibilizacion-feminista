import { Injectable, signal, effect } from '@angular/core';
import { fromEvent, merge, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * Servicio para detectar el estado de conexión offline/online
 */
@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private isOnlineSignal = signal<boolean>(navigator.onLine);

  readonly isOnline = this.isOnlineSignal.asReadonly();

  constructor() {
    // Escuchar eventos online/offline
    const online$ = fromEvent(window, 'online').pipe(map(() => true));
    const offline$ = fromEvent(window, 'offline').pipe(map(() => false));

    merge(online$, offline$)
      .pipe(startWith(navigator.onLine))
      .subscribe(isOnline => {
        this.isOnlineSignal.set(isOnline);
      });
  }

  /**
   * Verifica si la aplicación está offline
   */
  isOffline(): boolean {
    return !this.isOnline();
  }
}

