import { NgModule, ErrorHandler } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { NodeClient } from '@sentry/node';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ErrorLogger } from './services/error-logger';
import { env } from '../environments';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    { provide: ErrorHandler, useFactory: ErrorLogger.initWith(NodeClient, env.SENTRY_DSN_SERVER) },
    // Add universal-only providers here
  ],
  bootstrap: [ AppComponent ],
})
export class AppServerModule {}
