import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import 'first-last';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
