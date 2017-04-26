import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import AppComponent from './app.component';
import AppRouterModule from './app-router.module';
import HomePage from './pages/home/home';
import ContactsPage from './pages/contacts/contacts';
import ArticlePage from './pages/article/article';
import Page404 from './pages/page404/page404';
import Navbar from './common/navbar/navbar';
import Footer from './common/footer/footer';
import Category from './common/category/category';
import CategoryArticle from './common/category/category-article/category-article';
import Label from './common/label/label';

@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
  ],
  declarations: [
    AppComponent,
    HomePage,
    ArticlePage,
    ContactsPage,
    Page404,
    Navbar,
    Footer,
    Category,
    CategoryArticle,
    Label,
  ],
  bootstrap: [ AppComponent ],
})
export default class HomeModule {}