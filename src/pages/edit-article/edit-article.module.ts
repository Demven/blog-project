import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Autosize } from 'ng-autosize';
import CommonComponentsModule from '../../common/common.module';
import EditArticlePage from './edit-article';
import EditArticleNav from './edit-article-nav/edit-article-nav';
import EditArticleBody from './edit-article-body/edit-article-body';
import EditArticleBodyNode from './edit-article-body/edit-article-body-node';
import EditArticleImage from './edit-article-image/edit-article-image';
import EditArticleText from './edit-article-text/edit-article-text';
import TextField from './text-field/text-field';
import TextArea from './text-area/text-area';
import SelectField from './select-field/select-field';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [
    Autosize,
    EditArticlePage,
    EditArticleNav,
    EditArticleBody,
    EditArticleBodyNode,
    EditArticleImage,
    EditArticleText,
    TextField,
    TextArea,
    SelectField,
  ],
  entryComponents: [
    EditArticleImage,
    EditArticleText,
  ],
  exports: [ EditArticlePage ],
})
export default class EditArticleModule {}
