import { Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';
import { NsaPage } from './pages/nsa/nsa.page';
import { ImportXMLPage } from './pages/tpr/import-xml/import-xml.page';
import { TprPage } from './pages/tpr/tpr.page';

export const routes: Routes = [
  { path: '', component: MainPage},
  { path: 'nsa', component: NsaPage },
  { path: 'tpr', component: TprPage },
  { path: 'import', component: ImportXMLPage},
  { path: '**', redirectTo: '' },
];
