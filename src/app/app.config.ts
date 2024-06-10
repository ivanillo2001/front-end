import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//formato español
import localeEs from "@angular/common/locales/es";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
registerLocaleData(localeEs,'es')
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),{provide:LOCALE_ID, useValue:'es'}, provideAnimationsAsync(), importProvidersFrom(HttpClientModule), provideAnimationsAsync()]
};
