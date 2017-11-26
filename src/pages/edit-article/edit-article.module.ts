import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonComponentsModule from '../../common/common.module';
import EditCommonModule from '../../edit-common/edit-common.module';
import EditArticlePage from './edit-article';
import EditArticleBody from './edit-article-body/edit-article-body';
import EditArticleBodyNode from './edit-article-body/edit-article-body-node';
import EditArticleText from './edit-article-text/edit-article-text';
import EditArticleImage from './edit-article-image/edit-article-image';
import EditArticleHeading from './edit-article-heading/edit-article-heading';
import EditArticleQuote from './edit-article-quote/edit-article-quote';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    EditCommonModule,
  ],
  declarations: [
    EditArticlePage,
    EditArticleBody,
    EditArticleBodyNode,
    EditArticleText,
    EditArticleImage,
    EditArticleHeading,
    EditArticleQuote,
  ],
  entryComponents: [
    EditArticleText,
    EditArticleImage,
    EditArticleHeading,
    EditArticleQuote,
  ],
  exports: [ EditArticlePage ],
})
export default class EditArticleModule {}
