import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'historia',
    loadComponent: () => import('./pages/historia/historia.component').then(m => m.HistoriaComponent)
  },
  {
    path: 'conceptos',
    loadComponent: () => import('./pages/conceptos/conceptos.component').then(m => m.ConceptosComponent)
  },
  {
    path: 'violencia',
    loadComponent: () => import('./pages/violencia/violencia.component').then(m => m.ViolenciaComponent)
  },
  {
    path: 'recursos',
    loadComponent: () => import('./pages/recursos/recursos.component').then(m => m.RecursosComponent)
  },
  {
    path: 'recursos-ayuda',
    loadComponent: () => import('./pages/recursos-ayuda/recursos-ayuda.component').then(m => m.RecursosAyudaComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'agenda',
    loadComponent: () => import('./pages/agenda/agenda.component').then(m => m.AgendaComponent)
  },
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/admin/login/login.component').then(m => m.AdminLoginComponent)
      },
      {
        path: '',
        loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
