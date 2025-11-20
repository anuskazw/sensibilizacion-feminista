import { Routes } from '@angular/router';

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
    path: '**',
    redirectTo: ''
  }
];
