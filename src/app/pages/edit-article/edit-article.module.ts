import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as CommonComponentsModule } from '../../common/common.module';
import { EditCommonModule } from '../../edit-common/edit-common.module';
import { EditArticlePage } from './edit-article';
import { EditArticleBody } from './edit-article-body/edit-article-body';
import { EditArticleBodyNode } from './edit-article-body/edit-article-body-node/edit-article-body-node';
import { EditArticleAddContent } from './edit-article-add-content/edit-article-add-content';
import { EditArticleText } from './edit-article-text/edit-article-text';
import { EditArticleImage } from './edit-article-image/edit-article-image';
import { EditArticleHeading } from './edit-article-heading/edit-article-heading';
import { EditArticleQuote } from './edit-article-quote/edit-article-quote';
import { EditArticleList } from './edit-article-list/edit-article-list';
import { EditArticleMath } from './edit-article-math/edit-article-math';
import { EditArticleCode } from './edit-article-code/edit-article-code';

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
    EditArticleAddContent,
    EditArticleText,
    EditArticleImage,
    EditArticleHeading,
    EditArticleQuote,
    EditArticleList,
    EditArticleMath,
    EditArticleCode,
  ],
  entryComponents: [
    EditArticleText,
    EditArticleImage,
    EditArticleHeading,
    EditArticleQuote,
    EditArticleList,
    EditArticleMath,
    EditArticleCode,
  ],
  exports: [ EditArticlePage ],
})
export class EditArticleModule {}
