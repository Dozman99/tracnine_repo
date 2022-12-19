import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.querySelector('script.maps')?.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${environment.maps_API}&libraries=places&callback=initMap`)

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
