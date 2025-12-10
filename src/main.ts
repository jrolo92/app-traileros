// Estas líneas las he añadido para poner el idioma en español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { LOCALE_ID } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Iconos instalados manualmente
import { addIcons } from 'ionicons';
import { informationCircle, informationCircleOutline, informationCircleSharp, settings, settingsOutline, settingsSharp } from 'ionicons/icons';

addIcons({
  'information-circle': informationCircle,
  'information-circle-outline': informationCircleOutline,
  'information-circle-sharp': informationCircleSharp,
  'settings': settings,
  'settings-outline': settingsOutline,
  'settings-sharp': settingsSharp
})

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // Esta línea también es necesaria para cambiar el idioma a español
    { provide: LOCALE_ID, useValue: 'es'}
  ],
});
