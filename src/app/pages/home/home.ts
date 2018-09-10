import {
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import axios from 'axios';
import { HomepageSection } from './homepage-section/homepage-section'; // import of model, not component
import clientStorage, { STORAGE_KEY } from '../../services/clientStorage';
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
  previewMode = false;

  constructor(private metaTags: Meta) {
    this.useHomepageDataFromClientStorage = this.useHomepageDataFromClientStorage.bind(this);
    this.fetchHomepageData = this.fetchHomepageData.bind(this);
    this.updateMetaTags = this.updateMetaTags.bind(this);
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.previewMode = window.location.pathname === '/homepage/preview';
    }

    if (this.previewMode) {
      this.useHomepageDataFromClientStorage();
    } else {
      this.fetchHomepageData();
    }

    this.updateMetaTags();
  }

  useHomepageDataFromClientStorage() {
    const homepageData: Array<HomepageSection> = clientStorage.get(STORAGE_KEY.HOMEPAGE_DATA);

    if (homepageData && homepageData.length > 0) {
      this.homepageSections = homepageData;
    }
  }

  fetchHomepageData() {
    axios
      .get(`${env.WWW_HOST}/api/v1/homepage-section`)
      .then(response => {
        if (response.status === 200) {
          this.homepageSections = response.data;
          this.categories = this.homepageSections.map(section => section.category);
        } else {
          console.error('Could not get homepage sections', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateMetaTags() {
    this.metaTags.updateTag({ name: 'description', content: 'Personal blog about robotics, programming, philosophy and psychology' });
    this.metaTags.updateTag({ property: 'og:title', content: 'Dmitry Salnikov - Personal Blog' });
    this.metaTags.updateTag({ property: 'og:description', content: 'Personal blog about robotics, programming, philosophy and psychology' });
    this.metaTags.updateTag({ property: 'og:type', content: 'website' });
    this.metaTags.updateTag({ property: 'og:url', content: env.WWW_HOST });
    this.metaTags.updateTag({ property: 'og:image', content: `${env.WWW_HOST}/assets/images/share-logo.jpg` });
    this.metaTags.updateTag({ property: 'og:image:width', content: '600' });
    this.metaTags.updateTag({ property: 'og:image:height', content: '338' });
  }
}