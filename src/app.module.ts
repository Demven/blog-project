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
import EditArticlePage from './pages/edit-article/edit-article';
import Page404 from './pages/page404/page404';
import HomePage from './pages/home/home';
import ContactsPage from './pages/contacts/contacts';
import Navbar from './common/navbar/navbar';
import Footer from './common/footer/footer';
import HomepageSection from './common/homepage-section/homepage-section';
import HomepageSectionArticle from './common/homepage-section/homepage-section-article/homepage-section-article';

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
  ],
  declarations: [
    AppComponent,
    HomePage,
    EditArticlePage,
    Page404,
    ContactsPage,
    Navbar,
    Footer,
    HomepageSection,
    HomepageSectionArticle,
  ],
  bootstrap: [ AppComponent ],
})
export default class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
