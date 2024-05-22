import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.routes_auth),
  },
  {
    path: 'layout',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.routes_layout),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
