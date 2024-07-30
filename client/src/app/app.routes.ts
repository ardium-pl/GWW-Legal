import { Routes } from '@angular/router';
import { NsaPage } from './pages/nsa/nsa.page';
import { TprPage } from './pages/tpr/tpr.page';
import { MainPage } from './pages/main/main.page';

export const routes: Routes = [
  { path: '', component: MainPage},
  { path: 'nsa', component: NsaPage },
  { path: 'tpr', component: TprPage },
  { path: '**', redirectTo: '' },
];
