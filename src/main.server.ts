import { enableProdMode } from '@angular/core';
import { env } from './environments';

if (env.NODE_ENV === 'production') {
  enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
