import { Routes } from '@angular/router';
import { NsaPage } from './pages/nsa/nsa.page';
import { TprPage } from './pages/tpr/tpr.page';

export const routes: Routes = [
  { path: 'nsa', component: NsaPage },
  { path: 'tpr', component: TprPage },
  { path: '**', redirectTo: 'nsa' },
];
