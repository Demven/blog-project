import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Autosize } from 'angular2-autosize/src/autosize.directive';
import EditArticlePage from './edit-article';
import EditArticleNav from './edit-article-nav/edit-article-nav';
import TextField from './text-field/text-field';
import TextArea from './text-area/text-area';
import SelectField from './select-field/select-field';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    Autosize,
    EditArticlePage,
    EditArticleNav,
    TextField,
    TextArea,
    SelectField,
  ],
  exports: [ EditArticlePage ],
})
export default class EditArticleModule {}
