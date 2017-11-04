import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {
  applyMiddleware,
  Store,
  createStore,
} from 'redux';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import rootReducer from './redux/reducers';
import initialAppState, { IAppState } from './redux/InitialAppState';
import AppComponent from './app.component';
import AppRouterModule from './app-router.module';
import CommonComponentsModule from './common/common.module';
import ArticleModule from './pages/article/article.module';
import HomeModule from './pages/home/home.module';
import ContactsModule from './pages/contacts/contacts.module';
import Page404Module from './pages/page404/page404.module';
import EditArticleModule from './pages/edit-article/edit-article.module';
import EditHomePageModule from './pages/edit-homepage/edit-homepage.module';

const store:Store<any> = createStore(
  rootReducer,
  initialAppState,
  applyMiddleware(),
);

global['store'] = store;

@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
    NgReduxModule,
    CommonModule,
    CommonComponentsModule,
    ArticleModule,
    HomeModule,
    ContactsModule,
    Page404Module,
    EditArticleModule,
    EditHomePageModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
})
export default class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
