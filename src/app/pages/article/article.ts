import {
  Inject,
  Component,
  OnInit,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ImagesService } from '../../services/images.service';
import { PageData } from '../../services/page-data.service';
import { env } from '../../../environments';
import { sendYandexEvent, EVENT_ID } from '../../common/analytics/yandex';
import { Article } from '../../types/Article.type';
import { Keyword } from '../../types/Keyword.type';

export const DEFAULT_ARTICLE: Article = {
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
  keywords: [],
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
    <ds-analytics-yandex></ds-analytics-yandex>

    <ds-article-nav
      [title]="article.title"
      [slug]="article.slug"
      [open]="!(articleTitleIsVisible$ | async)"
    ></ds-article-nav>

    <ds-modal
      [flat]="true"
      [allSpaceOnMobile]="true"
      (close)="onModalClose()"
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
            class="ArticlePage__hero__image"
            [src]="getHeroImageUrl()"
            alt="{{article.image.description}}"
          />
        </div>

        <div class="ArticlePage__hero-preview">
          <img
            class="ArticlePage__hero-preview__image"
            [src]="getPreviewHeroImageUrl()"
            alt="{{article.image.description}}"
          />
        </div>

        <div class="ArticlePage__hero-image-placeholder"></div>

        <div class="ArticlePage__content-container">
          <ds-article-visibility-sensor [slug]="article.slug"></ds-article-visibility-sensor>

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
export class ArticlePage implements OnInit {
  @HostBinding('class.ArticlePage') rootClass = true;
  @HostBinding('class.ArticlePage--hero-image-loaded') heroImageLoaded = false;

  slug: string;
  article: Article = DEFAULT_ARTICLE;

  @select(state => state.ui.articleTitleIsVisible) readonly articleTitleIsVisible$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    public imagesService: ImagesService,
    private pageData: PageData,
    private metaTags: Meta,
    private titleTag: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.updateMetaTags = this.updateMetaTags.bind(this);
    this.updateCanonicalUrl = this.updateCanonicalUrl.bind(this);
    this.loadFullHeroImage = this.loadFullHeroImage.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.getFullHeroImageUrl = this.getFullHeroImageUrl.bind(this);
    this.getPreviewHeroImageUrl = this.getPreviewHeroImageUrl.bind(this);
    this.getHeroImageUrl = this.getHeroImageUrl.bind(this);
  }

  ngOnInit() {
    this.article = this.route.snapshot.data['article'];
    const isServer = typeof window === 'undefined';

    if (isServer) {
      this.pageData.set(this.article);
    }

    this.updatePageTitle();
    this.updateMetaTags();
    this.updateCanonicalUrl();

    if (!isServer) {
      this.loadFullHeroImage();
    }
  }

  updatePageTitle() {
    this.titleTag.setTitle(this.article.title);
  }

  updateMetaTags() {
    const url = `${env.WWW_HOST}/article/${this.article.slug}`;
    const title = this.article.title;
    const description = this.article.description;
    const keywords = this.article.keywords.map((keyword: Keyword) => keyword.name).join(',');
    const imageUrl = this.imagesService.getCroppedImageUrl(this.article.image.url, this.imagesService.ASPECT_RATIO.w16h9);
    const author = 'Dmitry Salnikov';

    this.metaTags.updateTag({ name: 'description', content: description });
    this.metaTags.updateTag({ name: 'keywords', content: keywords });
    this.metaTags.updateTag({ name: 'author', content: author });

    this.metaTags.updateTag({ property: 'og:title', content: title });
    this.metaTags.updateTag({ property: 'og:description', content: description });
    this.metaTags.updateTag({ property: 'og:type', content: 'article' });
    this.metaTags.updateTag({ property: 'og:url', content: url });
    this.metaTags.updateTag({ property: 'og:image', content: imageUrl });
    this.metaTags.updateTag({ property: 'og:image:width', content: '1024' });
    this.metaTags.updateTag({ property: 'og:image:height', content: '576' });

    this.metaTags.updateTag({ property: 'article:published_time', content: title });
    this.metaTags.updateTag({ property: 'article:author', content: author });
    this.metaTags.updateTag({ property: 'article:section', content: this.article.category.title });
    this.metaTags.updateTag({ property: 'article:tag', content: keywords });

    this.metaTags.updateTag({ name: 'twitter:title', content: title });
    this.metaTags.updateTag({ name: 'twitter:description', content: description });
    this.metaTags.updateTag({ name: 'twitter:url', content: url });
    this.metaTags.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  updateCanonicalUrl() {
    const canonicalUrl = `${env.WWW_HOST}/article/${this.article.slug}`;
    const link:HTMLLinkElement = this.document.querySelector('link[rel="canonical"]');
    link.setAttribute('href', canonicalUrl);
  }

  loadFullHeroImage() {
    const heroImage = new Image();
    heroImage.src = this.getFullHeroImageUrl();
    heroImage.onload = () => {
      this.heroImageLoaded = true;
    };
  }

  onModalClose() {
    sendYandexEvent(EVENT_ID.ARTICLE_CLOSE_BUTTON, { article: this.article.slug });
  }

  getFullHeroImageUrl() {
    return this.imagesService.getCroppedImageUrl(this.article.image.url, this.imagesService.ASPECT_RATIO.w16h9);
  }

  getPreviewHeroImageUrl() {
    return this.imagesService.getImagePreviewUrl(this.article.image.url, this.imagesService.ASPECT_RATIO.w16h9);
  }

  getHeroImageUrl() {
    return this.heroImageLoaded ?
      this.getFullHeroImageUrl() :
      this.getPreviewHeroImageUrl();
  }
}
