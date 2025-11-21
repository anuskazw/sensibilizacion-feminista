import { Injectable, signal, computed } from '@angular/core';

/**
 * Servicio de autenticación para el panel de administración
 * Implementa autenticación básica para US-019
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Señal para el estado de autenticación
  private isAuthenticated = signal<boolean>(false);
  private currentUser = signal<string | null>(null);

  // Computed para verificar si el usuario está autenticado
  authenticated = computed(() => this.isAuthenticated());

  constructor() {
    // Verificar si hay una sesión guardada en localStorage
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.isAuthenticated && authData.user) {
          this.isAuthenticated.set(true);
          this.currentUser.set(authData.user);
        }
      } catch (e) {
        // Si hay error al parsear, limpiar localStorage
        localStorage.removeItem('admin_auth');
      }
    }
  }

  /**
   * Inicia sesión con usuario y contraseña
   * En producción, esto debería hacer una llamada al backend
   */
  login(username: string, password: string): boolean {
    // Autenticación básica para desarrollo
    // En producción, esto debería ser una llamada HTTP al backend
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated.set(true);
      this.currentUser.set(username);
      
      // Guardar en localStorage
      localStorage.setItem('admin_auth', JSON.stringify({
        isAuthenticated: true,
        user: username
      }));
      
      return true;
    }
    
    return false;
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('admin_auth');
  }

  /**
   * Obtiene el usuario actual
   */
  getCurrentUser(): string | null {
    return this.currentUser();
  }

  /**
   * Verifica si el usuario está autenticado
   */
  checkAuth(): boolean {
    return this.isAuthenticated();
  }
}

