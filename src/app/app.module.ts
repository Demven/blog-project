import { NgModule, ErrorHandler } from '@angular/core';
import {
  BrowserModule,
  Title,
  Meta,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserClient } from '@sentry/browser';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { CommonModule as CommonComponentsModule } from './common/common.module';
import { InViewportModule } from 'ng-in-viewport';
import { ArticleModule } from './pages/article/article.module';
import { HomeModule } from './pages/home/home.module';
import { ContactsModule } from './pages/contacts/contacts.module';
import { Page404Module } from './pages/page404/page404.module';
import { ImagesService } from './services/images.service';
import { MarkdownService } from './services/markdown.service';
import { MathJaxService } from './services/mathJax.service';
import { CodeHighlightService } from './services/code-highlight.service';
import { CMSRedirectGuard } from './services/cms-redirect-guard.service';
import { HomepageDataResolverService } from './services/data-resolvers/homepage-data-resolver.service';
import { ArticleDataResolverService } from './services/data-resolvers/article-data-resolver.service';
import { Page404DataResolverService } from './services/data-resolvers/page-404-data-resolver.service';
import { PageData } from './services/page-data.service';
import { ErrorLogger } from './services/error-logger';
import { env } from '../environments';

if (typeof window !== 'undefined') {
  window['env'] = env;
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'blog-project' }),
    HttpClientModule,
    AppRouterModule,
    InViewportModule,
    CommonModule,
    CommonComponentsModule,
    ArticleModule,
    HomeModule,
    ContactsModule,
    Page404Module,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: ErrorHandler, useFactory: ErrorLogger.initWith(BrowserClient, env.SENTRY_DSN_CLIENT) },
    ImagesService,
    MarkdownService,
    MathJaxService,
    CodeHighlightService,
    HomepageDataResolverService,
    ArticleDataResolverService,
    Page404DataResolverService,
    CMSRedirectGuard,
    PageData,
    Title,
    Meta,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
