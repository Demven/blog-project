import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { trackPageView } from '../../common/analytics/yandex';
import { PageData } from '../../services/page-data.service';
import { env } from '../../../environments';
import { Category } from '../../types/Category.type';
import { Article } from '../../types/Article.type';

@Component({
  selector: 'ds-page-category',
  styleUrls: ['./category.scss'],
  template: `
    <ds-analytics-yandex [trackPageViewManually]="true"></ds-analytics-yandex>
    <ds-navbar [categories]="categories"></ds-navbar>

    <div class="CategoryPage__content">
      <ds-article-card
        class="CategoryPage__article"
        *ngFor="let article of categoryArticles"
        [article]="article"
        [category]="currentCategory"
      ></ds-article-card>
    </div>

    <ds-footer></ds-footer>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class CategoryPage implements OnInit {
  @HostBinding('class.CategoryPage') rootClass = true;

  slug:string;
  categories:Category[];
  currentCategory:Category;
  categoryArticles:Article[];

  private pageTitle = 'Dmitry Salnikov - Personal Blog';

  constructor (
    private route:ActivatedRoute,
    private pageData:PageData,
    private metaTags:Meta,
    private titleTag:Title,
    @Inject(DOCUMENT) private document:Document,
  ) {
    this.onRouteChange = this.onRouteChange.bind(this);
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.updateMetaTags = this.updateMetaTags.bind(this);
    this.updateCanonicalUrl = this.updateCanonicalUrl.bind(this);
  }

  ngOnInit () {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      this.pageData.set({
        categories: this.route.snapshot.data['categories'],
        categoryArticles: this.route.snapshot.data['categoryArticles'],
      });
    }

    this.route.params.subscribe(this.onRouteChange);
  }

  onRouteChange (params:Params) {
    this.slug = params['slug'];

    this.categories = this.route.snapshot.data['categories'];
    this.categoryArticles = this.route.snapshot.data['categoryArticles'];

    this.currentCategory = this.categories.find((category:Category) => category.slug === this.slug);

    this.updatePageTitle();
    this.updateMetaTags();
    this.updateCanonicalUrl();

    trackPageView();
  }

  updatePageTitle () {
    this.pageTitle = `${this.currentCategory.title[0].toUpperCase() + this.currentCategory.title.slice(1)} - Dmitry Salnikov`;
    this.titleTag.setTitle(this.pageTitle);
  }

  updateMetaTags () {
    const url = `${env.WWW_HOST}/category/${this.currentCategory.slug}`;
    const description = `A list of articles about ${this.currentCategory.title.toLowerCase()}`;
    const keywords = this.categoryArticles
      .flatMap((article:Article) => article.keywords)
      .join(', ');
    const imageUrl = `${env.WWW_HOST}/assets/images/share-logo.jpg`;

    this.metaTags.updateTag({ name: 'description', content: description });
    this.metaTags.updateTag({ name: 'keywords', content: keywords });
    this.metaTags.removeTag('name="author"');

    this.metaTags.updateTag({ property: 'og:title', content: this.pageTitle });
    this.metaTags.updateTag({ property: 'og:description', content: description });
    this.metaTags.updateTag({ property: 'og:type', content: 'website' });
    this.metaTags.updateTag({ property: 'og:url', content: url });
    this.metaTags.updateTag({ property: 'og:image', content: imageUrl });
    this.metaTags.updateTag({ property: 'og:image:width', content: '600' });
    this.metaTags.updateTag({ property: 'og:image:height', content: '338' });

    this.metaTags.removeTag('property="article:published_time"');
    this.metaTags.removeTag('property="article:author"');
    this.metaTags.removeTag('property="article:section"');
    this.metaTags.removeTag('property="article:tag"');

    this.metaTags.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.metaTags.updateTag({ name: 'twitter:description', content: description });
    this.metaTags.updateTag({ name: 'twitter:url', content: url });
    this.metaTags.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  updateCanonicalUrl() {
    const canonicalUrl = `${env.WWW_HOST}/category/${this.currentCategory.slug}`;
    const link:HTMLLinkElement = this.document.querySelector('link[rel="canonical"]');
    link.setAttribute('href', canonicalUrl);
  }
}
