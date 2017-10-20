import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonComponentsModule from '../../common/common.module';
import EditCommonModule from '../../edit-common/edit-common.module';
import EditArticlePage from './edit-article';
import EditArticleBody from './edit-article-body/edit-article-body';
import EditArticleBodyNode from './edit-article-body/edit-article-body-node';
import EditArticleImage from './edit-article-image/edit-article-image';
import EditArticleText from './edit-article-text/edit-article-text';

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
    EditArticleImage,
    EditArticleText,
  ],
  entryComponents: [
    EditArticleImage,
    EditArticleText,
  ],
  exports: [ EditArticlePage ],
})
export default class EditArticleModule {}
