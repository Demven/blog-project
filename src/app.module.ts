import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {
  applyMiddleware,
  Store,
  createStore,
} from 'redux';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import rootReducer from './redux/reducers';
import initialAppState, { IAppState } from './redux/InitialAppState';
import AppComponent from './app.component';
import AppRouterModule from './app-router.module';
import Page404 from './pages/page404/page404';
import HomePage from './pages/home/home';
import ContactsPage from './pages/contacts/contacts';
import ArticlePage from './pages/article/article';
import ArticleNav from './pages/article/article-nav/article-nav';
import ArticleHeader from './pages/article/article-header/article-header';
import ArticleBody from './pages/article/article-body/article-body';
import ArticleBodyNode from './pages/article/article-body/article-body-node';
import ArticleText from './pages/article/article-text/article-text';
import ArticleImage from './pages/article/article-image/article-image';
import Navbar from './common/navbar/navbar';
import Footer from './common/footer/footer';
import HomepageSection from './common/homepage-section/homepage-section';
import HomepageSectionArticle from './common/homepage-section/homepage-section-article/homepage-section-article';
import Label from './common/label/label';
import Modal from './common/modal/modal';

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
  ],
  declarations: [
    AppComponent,
    HomePage,
    Page404,
    ContactsPage,
    ArticlePage,
    ArticleNav,
    ArticleHeader,
    ArticleBody,
    ArticleBodyNode,
    ArticleText,
    ArticleImage,
    Navbar,
    Footer,
    HomepageSection,
    HomepageSectionArticle,
    Label,
    Modal,
  ],
  entryComponents: [
    ArticleText,
    ArticleImage,
  ],
  bootstrap: [ AppComponent ],
})
export default class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
