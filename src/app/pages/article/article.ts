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
import { env } from '../../../environments';

class Keyword {
  name: string;
  slug: string;
}

export class ArticleModel {
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
  keywords: Array<Keyword>;
  views: {
    count: number;
  };
  publication_date: string;
  body: Array<any>;
}

export const DEFAULT_ARTICLE: ArticleModel = {
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
export class ArticlePage implements OnInit {
  @HostBinding('class.ArticlePage') rootClass = true;

  slug: string;
  article: ArticleModel = DEFAULT_ARTICLE;

  @select(state => state.ui.articleTitleIsVisible) readonly articleTitleIsVisible$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    public imagesService: ImagesService,
    private metaTags: Meta,
    private titleTag: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.updateMetaTags = this.updateMetaTags.bind(this);
    this.updateCanonicalUrl = this.updateCanonicalUrl.bind(this);
  }

  ngOnInit() {
    this.article = this.route.snapshot.data['article'];

    console.info('data', this.article);

    this.updatePageTitle();
    this.updateMetaTags();
    this.updateCanonicalUrl();
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
}
