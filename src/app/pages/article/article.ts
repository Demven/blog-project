import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import axios from 'axios';
import clientStorage, { STORAGE_KEY } from '../../services/clientStorage';
import { ImagesService } from '../../services/images.service';
import { env } from '../../../environments';

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
  styleUrls: ['./article.scss'],
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
  encapsulation: ViewEncapsulation.None,
})
export class ArticlePage implements OnInit, OnDestroy {
  @HostBinding('class.ArticlePage') rootClass = true;

  slug: string;
  article: ArticleModel = DEFAULT_ARTICLE;
  previewMode = false;
  private routerParamsListener: any;

  @select(state => state.ui.articleTitleIsVisible) readonly articleTitleIsVisible$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    public imagesService: ImagesService,
    private metaTags: Meta,
  ) {
    this.onArticleRouteInit = this.onArticleRouteInit.bind(this);
    this.useArticleDataFromClientStorage = this.useArticleDataFromClientStorage.bind(this);
    this.updateMetaTags = this.updateMetaTags.bind(this);
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.previewMode = window.location.pathname === '/article/preview';
    }

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
          this.updateMetaTags();
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
      this.updateMetaTags();
    }
  }

  updateMetaTags() {
    this.metaTags.updateTag({ name: 'description', content: this.article.description });
    this.metaTags.updateTag({ property: 'og:title', content: this.article.title });
    this.metaTags.updateTag({ property: 'og:description', content: this.article.description });
    this.metaTags.updateTag({ property: 'og:type', content: 'article' });
    this.metaTags.updateTag({ property: 'og:url', content: `${env.WWW_HOST}/article/${this.article.slug}` });
    this.metaTags.updateTag({ property: 'og:image', content: this.imagesService.getCroppedImageUrl(this.article.image.url, this.imagesService.ASPECT_RATIO.w16h9) });
    this.metaTags.updateTag({ property: 'og:image:width', content: '1024' });
    this.metaTags.updateTag({ property: 'og:image:height', content: '576' });
  }
}
