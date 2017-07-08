import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
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
    <ds-article-nav
      [title]="article.title"
      [open]="!(articleTitleIsVisible$ | async)"
    ></ds-article-nav>
    <ds-modal
      [flat]="true"
      [allSpaceOnMobile]="true"
    >
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
          
          <ds-article-body [nodes]="article.body"></ds-article-body>
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
  @select(state => state.ui.articleTitleIsVisible) readonly articleTitleIsVisible$: Observable<boolean>;

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
