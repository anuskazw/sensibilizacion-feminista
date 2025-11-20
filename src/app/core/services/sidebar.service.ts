import { Injectable, signal } from '@angular/core';

/**
 * Servicio para gestionar el estado del sidebar de navegación
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Estado colapsado del sidebar
  isCollapsed = signal(false);

  /**
   * Alterna el estado colapsado/expandido del sidebar
   */
  toggle(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }

  /**
   * Colapsa el sidebar
   */
  collapse(): void {
    this.isCollapsed.set(true);
  }

  /**
   * Expande el sidebar
   */
  expand(): void {
    this.isCollapsed.set(false);
  }
}

