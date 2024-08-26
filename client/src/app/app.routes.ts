import { Routes } from '@angular/router';
import { NsaSignaturesComponent } from './pages/nsa-signatures/nsa-signatures.component';
import { NsaPage } from './pages/nsa/nsa.page';
import { TprPage } from './pages/tpr/tpr.page';

export const routes: Routes = [
  { path: 'nsa', component: NsaPage },
  { path: 'nsa/signatures', component: NsaSignaturesComponent },
  { path: 'tpr', component: TprPage },
  { path: '**', redirectTo: 'nsa' },
];
