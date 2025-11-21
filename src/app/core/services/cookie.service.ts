import { Injectable, signal, computed } from '@angular/core';

/**
 * Tipos de cookies según categorías RGPD
 */
export type CookieCategory = 'essential' | 'analytics' | 'marketing';

/**
 * Preferencias de consentimiento de cookies
 */
export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

/**
 * Servicio para gestionar el consentimiento de cookies
 * Implementa los requisitos de US-017
 */
@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private readonly STORAGE_KEY = 'cookie_consent';
  private readonly ESSENTIAL_COOKIES_ENABLED = true; // Siempre activas por defecto

  // Signal para las preferencias de cookies
  private preferencesSignal = signal<CookiePreferences | null>(null);

  // Computed signals para acceso público
  readonly preferences = this.preferencesSignal.asReadonly();
  readonly hasConsent = computed(() => this.preferencesSignal() !== null);
  readonly showBanner = computed(() => !this.hasConsent());

  // Computed signals para cada categoría
  readonly essentialEnabled = computed(() => this.ESSENTIAL_COOKIES_ENABLED);
  readonly analyticsEnabled = computed(() => this.preferencesSignal()?.analytics ?? false);
  readonly marketingEnabled = computed(() => this.preferencesSignal()?.marketing ?? false);

  constructor() {
    // Cargar preferencias guardadas al inicializar
    this.loadPreferences();
  }

  /**
   * Carga las preferencias guardadas desde localStorage
   */
  private loadPreferences(): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const preferences: CookiePreferences = JSON.parse(stored);
        this.preferencesSignal.set(preferences);
      }
    } catch (error) {
      console.error('Error al cargar preferencias de cookies:', error);
    }
  }

  /**
   * Guarda las preferencias en localStorage
   */
  private savePreferences(preferences: CookiePreferences): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
      this.preferencesSignal.set(preferences);
    } catch (error) {
      console.error('Error al guardar preferencias de cookies:', error);
    }
  }

  /**
   * Acepta todas las cookies
   */
  acceptAll(): void {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    this.savePreferences(preferences);
  }

  /**
   * Rechaza todas las cookies no esenciales
   */
  rejectNonEssential(): void {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };
    this.savePreferences(preferences);
  }

  /**
   * Guarda preferencias personalizadas
   */
  saveCustomPreferences(preferences: Partial<CookiePreferences>): void {
    const currentPreferences = this.preferencesSignal() || {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };

    const updatedPreferences: CookiePreferences = {
      essential: true, // Siempre activas
      analytics: preferences.analytics ?? currentPreferences.analytics,
      marketing: preferences.marketing ?? currentPreferences.marketing,
      timestamp: Date.now()
    };

    this.savePreferences(updatedPreferences);
  }

  /**
   * Verifica si una categoría de cookies está habilitada
   */
  isCategoryEnabled(category: CookieCategory): boolean {
    switch (category) {
      case 'essential':
        return this.essentialEnabled();
      case 'analytics':
        return this.analyticsEnabled();
      case 'marketing':
        return this.marketingEnabled();
      default:
        return false;
    }
  }

  /**
   * Resetea las preferencias (útil para testing o cambio de política)
   */
  resetPreferences(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.preferencesSignal.set(null);
    }
  }
}

