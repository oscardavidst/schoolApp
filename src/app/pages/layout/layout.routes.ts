import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';

export const routes_layout: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'students',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () =>
          import('../students/students.routes').then((m) => m.routes_students),
      },
      {
        path: 'teachers',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () =>
          import('../teachers/teachers.routes').then((m) => m.routes_teachers),
      },
      {
        path: 'scores',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () =>
          import('../scores/scores.routes').then((m) => m.routes_scores),
      },
      {
        path: '**',
        redirectTo: 'students',
      },
    ],
  },
];
