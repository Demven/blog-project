import { NgModule } from '@angular/core';
import {
  BrowserModule,
  Title,
  Meta,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import {
  applyMiddleware,
  Store,
  createStore,
} from 'redux';
import rootReducer from './redux/reducers';
import initialAppState, { IAppState } from './redux/InitialAppState';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';
import { CommonModule as CommonComponentsModule } from './common/common.module';
import { InViewportModule } from 'ng-in-viewport';
import { ArticleModule } from './pages/article/article.module';
import { HomeModule } from './pages/home/home.module';
import { ContactsModule } from './pages/contacts/contacts.module';
import { Page404Module } from './pages/page404/page404.module';
import { EditArticleModule } from './pages/edit-article/edit-article.module';
import { EditHomePageModule } from './pages/edit-homepage/edit-homepage.module';
import { LoginModule } from './pages/login/login.module';
import { LogoutModule } from './pages/logout/logout.module';
import { UserService } from './services/user.service';
import { ImagesService } from './services/images.service';
import { MarkdownService } from './services/markdown.service';
import { MathJaxService } from './services/mathJax.service';
import { CodeHighlightService } from './services/code-highlight.service';
import { CanActivateGuard } from './services/can-activate-guard.service';
import { HomepageDataResolverService } from './services/data-resolvers/homepage-data-resolver.service';
import { ArticleDataResolverService } from './services/data-resolvers/article-data-resolver.service';
import { env } from '../environments';

const store:Store<any> = createStore(
  rootReducer,
  initialAppState,
  applyMiddleware(),
);

if (typeof window !== 'undefined') {
  window['store'] = store;
  window['env'] = env;
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'blog-project' }),
    HttpClientModule,
    AppRouterModule,
    NgReduxModule,
    InViewportModule,
    CommonModule,
    CommonComponentsModule,
    ArticleModule,
    HomeModule,
    ContactsModule,
    Page404Module,
    EditArticleModule,
    EditHomePageModule,
    LoginModule,
    LogoutModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    UserService,
    ImagesService,
    MarkdownService,
    MathJaxService,
    CodeHighlightService,
    CanActivateGuard,
    HomepageDataResolverService,
    ArticleDataResolverService,
    Title,
    Meta,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
