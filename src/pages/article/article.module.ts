import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CommonComponentsModule from '../../common/common.module';
import ArticlePage from './article';
import ArticleNav from './article-nav/article-nav';
import ArticleHeader from './article-header/article-header';
import ArticleBody from './article-body/article-body';
import ArticleBodyNode from './article-body/article-body-node';
import ArticleText from './article-text/article-text';
import ArticleImage from './article-image/article-image';
import ArticleHeading from './article-heading/article-heading';
import ArticleQuote from './article-quote/article-quote';
import ArticleList from './article-list/article-list';
import ArticleMath from './article-math/article-math';
import ArticleCode from './article-code/article-code';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
  ],
  declarations: [
    ArticlePage,
    ArticleNav,
    ArticleHeader,
    ArticleBody,
    ArticleBodyNode,
    ArticleText,
    ArticleImage,
    ArticleHeading,
    ArticleQuote,
    ArticleList,
    ArticleMath,
    ArticleCode,
  ],
  entryComponents: [
    ArticleText,
    ArticleImage,
    ArticleHeading,
    ArticleQuote,
    ArticleList,
    ArticleMath,
    ArticleCode,
  ],
  exports: [ ArticlePage ],
})
export default class ArticleModule {}
