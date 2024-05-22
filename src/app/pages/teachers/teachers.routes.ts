import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout/layout.component';
import { TeachersDetailComponent } from './teachers-detail/teachers-detail.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';

export const routes_teachers: Routes = [
  { path: 'detail', component: TeachersDetailComponent },
  { path: '**', component: TeachersListComponent },
];
