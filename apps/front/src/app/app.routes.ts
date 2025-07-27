import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/page').then((m) => m.Page),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/page').then((m) => m.Page),
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/register/page').then((m) => m.Page),
  },
];
