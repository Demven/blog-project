import {
  Component,
  OnInit,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { HomepageSection } from '../../common/homepage-section/homepage-section';
import clientStorage, { STORAGE_KEY } from '../../services/clientStorage';
import './edit-homepage.pcss';

@Component({
  selector: 'ds-page-edit-homepage',
  template: `
    <ds-svg-sprite></ds-svg-sprite>
    <ds-edit-nav
      [title]="'Homepage'"
      (publish)="onPublish()"
      (preview)="onPreview()"
    ></ds-edit-nav>

    <ds-edit-homepage-section
      *ngFor="let homepageSection of homepageSections; let i = index"
      [index]="i"
      [homepageSection]="homepageSection"
      (update)="onHomepageSectionUpdate($event)"
    ></ds-edit-homepage-section>
    
    <main class="EditHomePage__main">
      <ds-toast [messageEmmiter]="toastMessageEmmiter"></ds-toast>
    </main>
  `,
})
export default class EditHomePage implements OnInit {
  @HostBinding('class.EditHomePage') rootClass: boolean = true;

  homepageSections: Array<HomepageSection>;
  toastMessageEmmiter: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.fetchHomePageSections = this.fetchHomePageSections.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onHomepageSectionUpdate = this.onHomepageSectionUpdate.bind(this);
  }

  ngOnInit() {
    this.fetchHomePageSections();
  }

  fetchHomePageSections() {
    axios
      .get('/api/v1/homepage-section')
      .then(response => {
        if (response.status === 200) {
          this.homepageSections = response.data;
          console.info('homepage data', this.homepageSections);
        } else {
          console.error('Could not get homepage sections', response);
          this.toastMessageEmmiter.emit('Could not get homepage data');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onHomepageSectionUpdate({ index, homepageSection }: { index: number, homepageSection: HomepageSection }) {
    if (homepageSection) {
      this.homepageSections[index] = homepageSection;
      console.info('UPDATED SECTIONS', this.homepageSections);
    }
  }

  onPublish() {
    console.info('publish', this.homepageSections);

    const updateHomepageSectionsRequests: Array<any> = this
      .homepageSections
      .map((homepageSection: HomepageSection) => axios.post('/api/v1/homepage-section', homepageSection));

    return axios
      .all(updateHomepageSectionsRequests)
      .then((results: Array<AxiosResponse>) => {
        let isSuccessful = true;
        results.forEach((sectionResult: AxiosResponse) => {
          if (sectionResult.status !== 200) {
            isSuccessful = false;
          }
        });

        if (isSuccessful) {
          console.info('successfully published the Homepage', results);
          this.toastMessageEmmiter.emit('Successfully published');
        } else {
          console.error('Failed to publish', results);
          this.toastMessageEmmiter.emit('Failed to publish the Homepage');
        }
      })
      .catch(error => {
        console.error(error);
        this.toastMessageEmmiter.emit('Failed to publish the Homepage');
      });
  }

  onPreview() {
    console.info('preview', this.homepageSections);
    clientStorage.save(STORAGE_KEY.HOMEPAGE_DATA, this.homepageSections);
    // window.open('http://localhost:8080/article/preview', '_blank');
  }
}
