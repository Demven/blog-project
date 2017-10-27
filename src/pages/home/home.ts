import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import axios from 'axios';
import { HomepageSection } from '../../common/homepage-section/homepage-section';
import clientStorage, { STORAGE_KEY } from '../../services/clientStorage';
import './home.pcss';

@Component({
  selector: 'ds-page-home',
  template: `
    <ds-navbar></ds-navbar>
    
    <div class="Home__content">
      <ds-homepage-section
        *ngFor="let homepageSection of homepageSections"
        [homepageSection]="homepageSection"
      ></ds-homepage-section>
    </div>

    <ds-footer></ds-footer>
  `,
})
export default class Home implements OnInit {
  @HostBinding('class.Home') rootClass: boolean = true;

  homepageSections: Array<HomepageSection>;
  previewMode: boolean = false;

  constructor() {
    this.useHomepageDataFromClientStorage = this.useHomepageDataFromClientStorage.bind(this);
    this.fetchHomepageData = this.fetchHomepageData.bind(this);
  }

  ngOnInit() {
    this.previewMode = window.location.pathname === '/homepage/preview';

    if (this.previewMode) {
      console.info('PREVIEW MODE');
      this.useHomepageDataFromClientStorage();
    } else {
      this.fetchHomepageData();
    }
  }

  useHomepageDataFromClientStorage() {
    const homepageData: Array<HomepageSection> = clientStorage.get(STORAGE_KEY.HOMEPAGE_DATA);

    if (homepageData && homepageData.length > 0) {
      this.homepageSections = homepageData;
    }
  }

  fetchHomepageData() {
    axios
      .get('/api/v1/homepage-section')
      .then(response => {
        if (response.status === 200) {
          this.homepageSections = response.data;
        } else {
          console.error('Could not get homepage sections', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}
