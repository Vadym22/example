import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { AddBook, RemoveBook } from '../book.actions';
import { AppState } from '../../app.state';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { HighlightModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    HighlightModule,
    MatDividerModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  books$: Observable<Book[]>;

  constructor(private store: Store<AppState>) {
    this.books$ = store.pipe(select('book'));
  }

  addBook(id: string, title: string, author: string) {
    this.store.dispatch(AddBook({ id, title, author }));
  }

  removeBook(bookId: string) {
    this.store.dispatch(RemoveBook({ bookId }));
  }

  codeInterface = `export interface Book {
    id: string;
    title: string;
    author: string;
  }`;
  codeAppState = `import { Book } from './models/book';

  export interface AppState {
    readonly book: Book[];
  }`;
  codeAppConfig = `import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { BookReducer } from './ngrx-books/book.reducer';
  
  import { routes } from './app.routes';
  import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
  import { provideStore } from '@ngrx/store';
  import { AppState } from './app.state';
  import { provideEffects } from '@ngrx/effects';
  import { BookEffects } from './ngrx-books/book.effects';
  import { provideStoreDevtools } from '@ngrx/store-devtools';
  
  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideStore<AppState>({ book: BookReducer }),
      provideEffects([BookEffects]),
      provideAnimationsAsync(),
      provideStoreDevtools(),
    ],
  };`;
  codeActions = `import { createAction, props } from '@ngrx/store';
  import { Book } from '../models/book';
  export const AddBook = createAction('[Book] Add Book', props<Book>());
  export const AddBookSuccess = createAction('[Book] Added Book Successfully', props<Book>());
  export const AddBookFailure = createAction('[Book] Add Book Failure', props<{ error: any }>());
  export const RemoveBook = createAction('[Book] Remove Book', props<{ bookId: string }>());`;
  codeEffects = `import { Injectable } from '@angular/core';
  import { Actions, createEffect, ofType } from '@ngrx/effects';
  import * as bookActions from './book.actions';
  import { BookService } from './book.service';
  import { catchError, map, mergeMap, of } from 'rxjs';
  
  @Injectable()
  export class BookEffects {
    addBook$ = createEffect(() =>
      this.actions$.pipe(
        ofType(bookActions.AddBook),
        mergeMap((action) =>
          this.bookService.addBook(action).pipe(
            map((book) => bookActions.AddBookSuccess(book)),
            catchError((error) => of(bookActions.AddBookFailure({ error })))
          )
        )
      )
    );
  
    constructor(private actions$: Actions, private bookService: BookService) {}
  }`;
  codeReducer = `import { createReducer, on } from '@ngrx/store';
  import { AddBook, AddBookSuccess, AddBookFailure, RemoveBook } from './book.actions';
  import { Book } from '../models/book';
  
  export const initialState: Book[] = [];
  
  export const BookReducer = createReducer(
    initialState,
    on(AddBook, (state) => {
      return state;
    }),
    on(AddBookSuccess, (state, { id, title, author }) => [...state, { id, title, author }]),
    on(AddBookFailure, (state, { error }) => {
      console.error(error);
      return state;
    }),
  
    on(RemoveBook, (state, { bookId }) => state.filter((book) => book.id !== bookId))
  );`;
  codeService = `import { Injectable } from '@angular/core';
  import { Book } from '../models/book';
  import { Observable, of, throwError } from 'rxjs';
  
  @Injectable({
    providedIn: 'root',
  })
  export class BookService {
    constructor() {}
  
    addBook(book: Book): Observable<Book> {
      return of(book);
    }
  }`;
  codeComponent = `import { Component } from '@angular/core';
  import { Store, select } from '@ngrx/store';
  import {Observable} from 'rxjs';
  import { Book } from '../models/book';
  import { AddBook, RemoveBook } from '../books/book.actions';
  import { AppState } from '../app.state';
  
  @Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
  })

  export class BookListComponent {
    books$: Observable<Book[]>;
    constructor(private store: Store<AppState>){
      this.books$ = store.pipe(select('book'));
    }
    addBook(id: string, title:string, author:string){
      this.store.dispatch(AddBook({id,title,author}));
    }
    removeBook(bookId: string){
      this.store.dispatch(RemoveBook({bookId}));
    }
  }`;
  codeComponentUI = `<h1>Books</h1>
  <div *ngFor="let book of books$ | async">
      <h2>{{book.title}}</h2>
      <h3>{{book.author}}</h3>
      <button (click)="removeBook(book.id)">Remove Book</button>
  </div>
  <h2>Create a new book</h2>
  <div>
      <input #bookId type="text" placeholder="Book Id">
      <input #bookTitle type="text" placeholder="Book Title">
      <input #bookAuthor type="text" placeholder="Author">
      <button (click)="addBook(bookId.value, bookTitle.value, bookAuthor.value)">
          Add Book
      </button>
  </div>
  `;
}
