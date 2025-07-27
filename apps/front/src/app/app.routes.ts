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
  {
    path: 'products/create',
    loadComponent: () => import('@penny/ui').then((m) => m.ProductCreate),
  },
  {
    path: 'products',
    loadComponent: () => import('@penny/ui').then((m) => m.ProductList),
  },
  {
    path: 'products/:id',
    loadComponent: () => import('@penny/ui').then((m) => m.ProductDetails),
  },
  {
    path: 'products/:id/edit',
    loadComponent: () => import('@penny/ui').then((m) => m.ProductEdit),
  },
];
