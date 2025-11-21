import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { CookieService } from '../../../core/services/cookie.service';

/**
 * Componente del banner de cookies
 * Implementa los requisitos de US-017
 */
@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.css'
})
export class CookieBannerComponent implements OnInit {
  showSettingsModal = signal(false);
  tempPreferences = signal({
    analytics: false,
    marketing: false
  });

  constructor(public cookieService: CookieService) {}

  ngOnInit(): void {
    // El servicio ya gestiona la visibilidad del banner
  }

  /**
   * Acepta todas las cookies
   */
  acceptAll(): void {
    this.cookieService.acceptAll();
  }

  /**
   * Rechaza cookies no esenciales
   */
  rejectNonEssential(): void {
    this.cookieService.rejectNonEssential();
  }

  /**
   * Abre el modal de configuración
   */
  openSettings(): void {
    const currentPrefs = this.cookieService.preferences();
    this.tempPreferences.set({
      analytics: currentPrefs?.analytics ?? false,
      marketing: currentPrefs?.marketing ?? false
    });
    this.showSettingsModal.set(true);
  }

  /**
   * Cierra el modal de configuración
   */
  closeSettings(): void {
    this.showSettingsModal.set(false);
  }

  /**
   * Guarda las preferencias personalizadas
   */
  saveCustomPreferences(): void {
    this.cookieService.saveCustomPreferences(this.tempPreferences());
    this.closeSettings();
  }

  /**
   * Maneja el cambio de preferencias temporales
   */
  togglePreference(category: 'analytics' | 'marketing'): void {
    this.tempPreferences.update(prefs => ({
      ...prefs,
      [category]: !prefs[category]
    }));
  }
}

