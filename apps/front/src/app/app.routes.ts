import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/page').then((m) => m.Page),
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/register/page').then((m) => m.Page),
  },
];
