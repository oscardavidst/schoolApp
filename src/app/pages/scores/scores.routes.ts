import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout/layout.component';
import { ScoresDetailComponent } from './scores-detail/scores-detail.component';
import { ScoresListComponent } from './scores-list/scores-list.component';

export const routes_scores: Routes = [
  { path: 'detail', component: ScoresDetailComponent },
  { path: 'list', component: ScoresListComponent },
];
