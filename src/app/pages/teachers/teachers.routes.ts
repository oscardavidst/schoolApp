import { Routes } from '@angular/router';
import { TeachersDetailComponent } from './teachers-detail/teachers-detail.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';

export const routes_teachers: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    component: TeachersListComponent,
  },
  {
    path: 'detail',
    canActivate: [isAuthenticatedGuard],
    component: TeachersDetailComponent,
  },
  {
    path: 'detail/:id',
    canActivate: [isAuthenticatedGuard],
    component: TeachersDetailComponent,
  },
  { path: '**', redirectTo: '' },
];
