import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import AppComponent from './app.component';
import AppRouterModule from './app-router.module';
import Page404 from './pages/page404/page404';
import HomePage from './pages/home/home';
import ContactsPage from './pages/contacts/contacts';
import ArticlePage from './pages/article/article';
import ArticleHeader from './pages/article/article-header/article-header';
import ArticleText from './pages/article/article-text/article-text';
import ArticleImage from './pages/article/article-image/article-image';
import Navbar from './common/navbar/navbar';
import Footer from './common/footer/footer';
import Category from './common/category/category';
import CategoryArticle from './common/category/category-article/category-article';
import Label from './common/label/label';
import Modal from './common/modal/modal';

@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
  ],
  declarations: [
    AppComponent,
    HomePage,
    Page404,
    ContactsPage,
    ArticlePage,
    ArticleHeader,
    ArticleText,
    ArticleImage,
    Navbar,
    Footer,
    Category,
    CategoryArticle,
    Label,
    Modal,
  ],
  bootstrap: [ AppComponent ],
})
export default class HomeModule {}
