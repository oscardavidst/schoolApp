import { Routes } from '@angular/router';
import { ScoresDetailComponent } from './scores-detail/scores-detail.component';
import { ScoresListComponent } from './scores-list/scores-list.component';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';

export const routes_scores: Routes = [
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    component: ScoresListComponent,
  },
  {
    path: 'detail',
    canActivate: [isAuthenticatedGuard],
    component: ScoresDetailComponent,
  },
  {
    path: 'detail/:id',
    canActivate: [isAuthenticatedGuard],
    component: ScoresDetailComponent,
  },
  { path: '**', redirectTo: '' },
];
