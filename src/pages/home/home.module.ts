import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import Navbar from '../../common/navbar/navbar';
import Category from '../../common/category/category';
import CategoryArticle from '../../common/category/category-article/category-article';
import Label from '../../common/label/label';
import HomePage from './home';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    HomePage,
    Navbar,
    Category,
    CategoryArticle,
    Label,
  ],
  bootstrap: [ HomePage ],
})
export default class HomeModule {}
