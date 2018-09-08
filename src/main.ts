import { ViewEncapsulation, /* enableProdMode */ } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// TODO: fix issue with envkey
// if (process.env.NODE_ENV === 'production') {
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule, [
  {
    defaultEncapsulation: ViewEncapsulation.None
  }
])
  .catch(err => console.log(err));
