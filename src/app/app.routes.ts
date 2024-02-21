import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/ngrx-component', pathMatch: 'full' },
  { path: '/ngrx', redirectTo: '/ngrx-component', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent }
];
