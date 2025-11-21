import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger las rutas del panel de administración
 * Redirige al login si el usuario no está autenticado
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.checkAuth()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/admin/login']);
  return false;
};

