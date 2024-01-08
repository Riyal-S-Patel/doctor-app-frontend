import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AuthorizationService, LoginInfo, routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { httpInterceptorProviders } from './service/interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [AuthorizationService , LoginInfo, httpInterceptorProviders, provideRouter(routes), provideClientHydration()]
};
