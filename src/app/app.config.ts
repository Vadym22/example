import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
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
};
