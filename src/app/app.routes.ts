import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { Routes } from '@angular/router';
import { BookListComponent } from './ngrx-books/book-list/book-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ngrx', pathMatch: 'full' },
  { path: 'ngrx', component: BookListComponent },
  { path: '**', component: NotFoundComponent },
];
