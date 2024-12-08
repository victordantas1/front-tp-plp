import { Routes } from '@angular/router';
import {HomeFormsComponent} from './home-forms/home-forms.component';
import {ReponsePageComponent} from './reponse-page/reponse-page.component';

export const routes: Routes = [
  { path: '', component: HomeFormsComponent },
  {path: 'reponse', component: ReponsePageComponent},
];
