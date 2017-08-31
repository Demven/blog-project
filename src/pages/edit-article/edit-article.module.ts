import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import EditArticlePage from './edit-article';
import EditArticleNav from './edit-article-nav/edit-article-nav';
import TextField from './text-field/text-field';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EditArticlePage,
    EditArticleNav,
    TextField,
  ],
  exports: [ EditArticlePage ],
})
export default class EditArticleModule {}
