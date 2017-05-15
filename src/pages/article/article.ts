import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ARTICLE_DATA from '../../temporary-data/article-data';
import './article.pcss';

class ArticleModel {
  title: string;
  slug: string;
  image: {
    url: string;
    description: string;
    credits: string;
  };
  category: {
    title: string;
    slug: string;
  };
  views: number;
  comments: number;
  body: Array<any>;
}

@Component({
  selector: 'ds-page-article',
  template: `
    <ds-modal [flat]="true">
      <div class="ArticlePage__modal-content">
        <ds-label [title]="article.category.title" [green]="true"></ds-label>

        <div class="ArticlePage__hero">
          <img
            class="ArticlePage__hero-image"
            src="{{article.image.url}}"
            alt="{{article.image.description}}"
          />
        </div>

        <img class="ArticlePage__hidden-hero-image" src="{{article.image.url}}" />
        
        <div class="ArticlePage__content-container">
          <ds-article-header
            [title]="article.title"
            [views]="article.views"
            [comments]="article.comments"
          ></ds-article-header>
          
          <div class="ArticlePage__article-body">
            <ds-article-text [content]="article.body[0]"></ds-article-text>
            <ds-article-text [content]="article.body[1]"></ds-article-text>
            <ds-article-image [content]="article.body[2]"></ds-article-image>
            <ds-article-text [content]="article.body[3]"></ds-article-text>
          </div>
        </div>
      </div>
    </ds-modal>
  `,
})
export default class ArticlePage implements OnInit, OnDestroy {
  @HostBinding('class.ArticlePage') rootClass: boolean = true;

  slug: string;
  article: ArticleModel = ARTICLE_DATA;
  private routerParamsListener: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routerParamsListener = this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });
  }

  ngOnDestroy() {
    this.routerParamsListener.unsubscribe();
  }
}
