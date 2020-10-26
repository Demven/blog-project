import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as CommonComponentsModule } from '../../common/common.module';
import { InViewportModule } from 'ng-in-viewport';
import { ArticlePage } from './article';
import { ArticleNav } from './article-nav/article-nav';
import { ArticleHeader } from './article-header/article-header';
import { ArticleVisibilitySensor } from './article-visibility-sensor/article-visibility-sensor';
import { ArticleBody } from './article-body/article-body';
import { ArticleBodyNode } from './article-body/article-body-node';
import { ArticleText } from './article-text/article-text';
import { ArticleImage } from './article-image/article-image';
import { ArticleHeading } from './article-heading/article-heading';
import { ArticleEpigraph } from './article-epigraph/article-epigraph';
import { ArticleList } from './article-list/article-list';
import { ArticleMath } from './article-math/article-math';
import { ArticleCode } from './article-code/article-code';
import { ArticleEmbed } from './article-embed/article-embed';
import { ArticleVideo } from './article-video/article-video';
import { ArticleQuote } from './article-quote/article-quote';
import { ArticleTitleVisibilityService } from '../../services/article-title-visibility.service';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    InViewportModule,
  ],
  declarations: [
    ArticlePage,
    ArticleNav,
    ArticleHeader,
    ArticleVisibilitySensor,
    ArticleBody,
    ArticleBodyNode,
    ArticleText,
    ArticleImage,
    ArticleHeading,
    ArticleEpigraph,
    ArticleList,
    ArticleMath,
    ArticleCode,
    ArticleEmbed,
    ArticleVideo,
    ArticleQuote,
  ],
  providers: [
    ArticleTitleVisibilityService,
  ],
  exports: [ ArticlePage ],
})
export class ArticleModule {}
