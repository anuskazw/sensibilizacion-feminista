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
    path: '**',
    redirectTo: ''
  }
];
