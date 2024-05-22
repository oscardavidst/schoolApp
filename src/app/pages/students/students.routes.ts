import { Routes } from '@angular/router';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';

export const routes_students: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    component: StudentsListComponent,
  },
  {
    path: 'detail',
    canActivate: [isAuthenticatedGuard],
    component: StudentsDetailComponent,
  },
  {
    path: 'detail/:id',
    canActivate: [isAuthenticatedGuard],
    component: StudentsDetailComponent,
  },
  { path: '**', redirectTo: '' },
];
