import { Routes } from '@angular/router';
import { NsaPage } from './pages/nsa/nsa.page';

export const routes: Routes = [
    { path: '/nsa', component: NsaPage },
    { path: '*', redirectTo: '/nsa' },
];
