import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';
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
    color: string;
  };
  views: number;
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
        <ds-label
          [title]="article.category.title"
          [green]="article.category.color === 'green'"
          [blue]="article.category.color === 'blue'"
          [red]="article.category.color === 'red'"
        ></ds-label>

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
  article: ArticleModel = {
    title: '',
    slug: '',
    image: {
      url: '',
      description: '',
      credits: '',
    },
    category: {
      title: '',
      slug: '',
      color: '',
    },
    views: 0,
    body: [],
  };
  private routerParamsListener: any;
  @select(state => state.ui.articleTitleIsVisible) readonly articleTitleIsVisible$: Observable<boolean>;

  constructor(private route: ActivatedRoute) {
    this.onArticleRouteInit = this.onArticleRouteInit.bind(this);
  }

  ngOnInit() {
    this.routerParamsListener = this.route.params.subscribe(this.onArticleRouteInit);
  }

  ngOnDestroy() {
    this.routerParamsListener.unsubscribe();
  }

  onArticleRouteInit(routeParams: Params) {
    this.slug = routeParams['slug'];

    axios
      .get(`/api/v1/article/${this.slug}`)
      .then(response => {
        if (response.status === 200) {
          this.article = response.data;
          console.info('article data', this.article);
        } else {
          console.error('Could not get article data', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}
