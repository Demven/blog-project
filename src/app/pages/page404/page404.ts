import {Component, HostBinding, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { env } from '../../../environments';
import { Page404Data } from '../../types/Page404Data.type';
import { PageData } from '../../services/page-data.service';

const GIF_DELAY = 3000; // ms
const GIF_ANIMATION_LENGTH = 700; // ms

@Component({
  selector: 'ds-page-home',
  styleUrls: ['./page404.scss'],
  template: `
    <ds-analytics-yandex></ds-analytics-yandex>

    <ds-modal>
      <div class="Page404__content">
        <section class="Page404__titles">
          <div class="Page404__unfortunately">Unfortunately</div>
          <h1 class="Page404__title">This page doesn't exist :(</h1>
        </section>

        <img
          class="Page404__gif"
          src="/assets/images/404.gif"
        />

        <section class="Page404__popular-articles">
          <h2 class="Page404__popular-articles__title">But we've found good alternatives for you:</h2>

          <div class="Page404__articles-list">
            <ds-popular-article
              *ngFor="let article of page404Data.articles"
              [article]="article"
            ></ds-popular-article>
          </div>
        </section>
      </div>
    </ds-modal>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Page404 implements OnInit {
  @HostBinding('class.Page404') rootClass = true;
  @HostBinding('class.Page404--gif-visible') gifVisible = true;
  @HostBinding('class.Page404--articles-visible') articlesVisible = false;

  page404Data: Page404Data;

  private pageTitle = '404 - Page Not Found';
  private pageUrl = `${env.WWW_HOST}/404`;

  constructor(
    private route: ActivatedRoute,
    private pageData: PageData,
    private metaTags: Meta,
    private titleTag: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.updateMetaTags = this.updateMetaTags.bind(this);
    this.updateCanonicalUrl = this.updateCanonicalUrl.bind(this);
  }

  ngOnInit() {
    this.page404Data = this.route.snapshot.data['page404Data'];
    const isServer = typeof window === 'undefined';

    if (isServer) {
      this.pageData.set(this.page404Data);
    }

    this.updatePageTitle();
    this.updateMetaTags();
    this.updateCanonicalUrl();

    setTimeout(() => {
      this.gifVisible = false;

      setTimeout(() => {
        this.articlesVisible = true;
      }, GIF_ANIMATION_LENGTH);
    }, GIF_DELAY);
  }

  updatePageTitle() {
    this.titleTag.setTitle(this.pageTitle);
  }

  updateMetaTags() {
    const description = 'Unfortunately, this page doesn\'t exist.';
    const keywords = 'Dmitry Salnikov, Tech, Science, Programming, Thoughts, JavaScript, CSS, HTML, Blog';
    const imageUrl = `${env.WWW_HOST}/assets/images/share-logo.jpg`;

    this.metaTags.updateTag({ name: 'description', content: description });
    this.metaTags.updateTag({ name: 'keywords', content: keywords });
    this.metaTags.removeTag('name="author"');

    this.metaTags.updateTag({ property: 'og:title', content: this.pageTitle });
    this.metaTags.updateTag({ property: 'og:description', content: description });
    this.metaTags.updateTag({ property: 'og:type', content: 'website' });
    this.metaTags.updateTag({ property: 'og:url', content: this.pageUrl });
    this.metaTags.updateTag({ property: 'og:image', content: imageUrl });
    this.metaTags.updateTag({ property: 'og:image:width', content: '600' });
    this.metaTags.updateTag({ property: 'og:image:height', content: '338' });

    this.metaTags.removeTag('property="article:published_time"');
    this.metaTags.removeTag('property="article:author"');
    this.metaTags.removeTag('property="article:section"');
    this.metaTags.removeTag('property="article:tag"');

    this.metaTags.updateTag({ name: 'twitter:title', content: this.pageTitle });
    this.metaTags.updateTag({ name: 'twitter:description', content: description });
    this.metaTags.updateTag({ name: 'twitter:url', content: this.pageUrl });
    this.metaTags.updateTag({ name: 'twitter:image', content: imageUrl });
  }

  updateCanonicalUrl() {
    const link:HTMLLinkElement = this.document.querySelector('link[rel="canonical"]');

    link.setAttribute('href', this.pageUrl);
  }
}
