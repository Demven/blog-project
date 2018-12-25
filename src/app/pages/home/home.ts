import {
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HomepageSection } from './homepage-section/homepage-section';
import { env } from '../../../environments';

export class Category {
  title: string;
  slug: string;
  color: string;
}

@Component({
  selector: 'ds-page-home',
  styleUrls: ['./home.scss'],
  template: `
    <ds-navbar [categories]="categories"></ds-navbar>
    
    <div class="HomePage__content">
      <ds-homepage-section
        *ngFor="let homepageSection of homepageSections"
        [homepageSection]="homepageSection"
      ></ds-homepage-section>
    </div>

    <ds-footer></ds-footer>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  @HostBinding('class.HomePage') rootClass = true;

  homepageSections: Array<HomepageSection>;
  categories: Array<Category>;

  private pageTitle = 'Dmitry Salnikov - Personal Blog';

  constructor(
    private route: ActivatedRoute,
    private metaTags: Meta,
    private titleTag: Title,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.updatePageTitle = this.updatePageTitle.bind(this);
    this.updateMetaTags = this.updateMetaTags.bind(this);
    this.updateCanonicalUrl = this.updateCanonicalUrl.bind(this);
  }

  ngOnInit() {
    this.homepageSections = this.route.snapshot.data['homepageSections'];

    console.info('data', this.homepageSections);

    if (this.homepageSections && this.homepageSections.length) {
      this.categories = this.homepageSections.map(section => section.category);
    }

    this.updatePageTitle();
    this.updateMetaTags();
    this.updateCanonicalUrl();
  }

  updatePageTitle() {
    this.titleTag.setTitle(this.pageTitle);
  }

  updateMetaTags() {
    const url = env.WWW_HOST;
    const description = 'Personal blog about robotics, programming, philosophy and psychology';
    const keywords = 'Dmitry Salnikov, Tech, Science, Programming, Thoughts, JavaScript, CSS, HTML, Blog';
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
    const canonicalUrl = env.WWW_HOST;
    const link:HTMLLinkElement = this.document.querySelector('link[rel="canonical"]');
    link.setAttribute('href', canonicalUrl);
  }
}
