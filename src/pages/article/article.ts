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
import clientStorage, { STORAGE_KEY } from '../../services/clientStorage';
import ImagesService from '../../services/images.service';
import './article.pcss';

class ArticleModel {
  slug: string;
  title: string;
  description: string;
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
  views: {
    count: number;
  };
  publication_date: string;
  body: Array<any>;
}

const DEFAULT_ARTICLE: ArticleModel = {
  slug: '',
  title: '',
  description: '',
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
  views: {
    count: 0,
  },
  publication_date: '',
  body: [],
};

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
            [src]="imagesService.getCroppedImageUrl(article.image.url, imagesService.ASPECT_RATIO.w16h9)"
            alt="{{article.image.description}}"
          />
        </div>

        <img
          class="ArticlePage__hidden-hero-image"
          [src]="imagesService.getCroppedImageUrl(article.image.url, imagesService.ASPECT_RATIO.w16h9)"
        />
        
        <div class="ArticlePage__content-container">
          <ds-article-header
            [title]="article.title"
            [description]="article.description"
            [views]="article.views.count"
            [publicationDate]="article.publication_date"
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
  article: ArticleModel = DEFAULT_ARTICLE;
  previewMode: boolean = false;
  private routerParamsListener: any;

  @select(state => state.ui.articleTitleIsVisible) readonly articleTitleIsVisible$: Observable<boolean>;

  constructor(private route: ActivatedRoute, public imagesService: ImagesService) {
    this.onArticleRouteInit = this.onArticleRouteInit.bind(this);
    this.useArticleDataFromClientStorage = this.useArticleDataFromClientStorage.bind(this);
  }

  ngOnInit() {
    this.previewMode = window.location.pathname === '/article/preview';

    if (this.previewMode) {
      this.useArticleDataFromClientStorage();
    } else {
      this.routerParamsListener = this.route.params.subscribe(this.onArticleRouteInit);
    }
  }

  ngOnDestroy() {
    if (!this.previewMode) {
      this.routerParamsListener.unsubscribe();
    }
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

  useArticleDataFromClientStorage() {
    const articleData = clientStorage.get(STORAGE_KEY.ARTICLE_DATA);
    if (articleData) {
      this.article = articleData;
    }
  }
}
