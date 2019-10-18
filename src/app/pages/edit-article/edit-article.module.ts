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
import { EditArticleEpigraph } from './edit-article-epigraph/edit-article-epigraph';
import { EditArticleList } from './edit-article-list/edit-article-list';
import { EditArticleMath } from './edit-article-math/edit-article-math';
import { EditArticleCode } from './edit-article-code/edit-article-code';
import { EditArticleEmbed } from './edit-article-embed/edit-article-embed';
import { EditArticleVideo } from './edit-article-video/edit-article-video';
import { EditArticleQuote } from './edit-article-quote/edit-article-quote';

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
    EditArticleEpigraph,
    EditArticleList,
    EditArticleMath,
    EditArticleCode,
    EditArticleEmbed,
    EditArticleVideo,
    EditArticleQuote,
  ],
  entryComponents: [
    EditArticleText,
    EditArticleImage,
    EditArticleHeading,
    EditArticleEpigraph,
    EditArticleList,
    EditArticleMath,
    EditArticleCode,
    EditArticleEmbed,
    EditArticleVideo,
    EditArticleQuote,
  ],
  exports: [ EditArticlePage ],
})
export class EditArticleModule {}
