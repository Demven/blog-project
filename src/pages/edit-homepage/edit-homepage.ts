import {
  Component,
  OnInit,
  HostBinding,
  EventEmitter,
} from '@angular/core';
// import { Router } from '@angular/router';
import axios from 'axios';
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
      *ngFor="let homepageSection of homepageSections"
      [homepageSection]="homepageSection"
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

  constructor(/* private router: Router */) {
    this.fetchHomePageSections = this.fetchHomePageSections.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onPreview = this.onPreview.bind(this);
  }

  ngOnInit() {
    this.fetchHomePageSections();
  }

  fetchHomePageSections() {
    axios
      .get('/api/v1/section')
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

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name) {
      console.info(name, value);
      // this.homepage[name] = value;
    }
  }

  onPublish() {
    console.info('publish', this.homepageSections);
    // axios
    //   .post('/api/v1/article/publish', this.article)
    //   .then(response => {
    //     if (response.status === 200) {
    //       console.info('successfully published', response.data);
    //       this.toastMessageEmmiter.emit('Successfully published');
    //
    //       if (this.createMode) {
    //         const articleSlug = response.data.slug;
    //         this.router.navigate([`/article/${articleSlug}/edit`]);
    //       } else {
    //         this.router.navigate([`/article/${this.article.slug}/edit`]);
    //       }
    //     } else {
    //       console.error('Failed to publish', response);
    //       this.toastMessageEmmiter.emit('Failed to publish the article');
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  onPreview() {
    console.info('preview', this.homepageSections);
    clientStorage.save(STORAGE_KEY.HOMEPAGE_DATA, this.homepageSections);
    // window.open('http://localhost:8080/article/preview', '_blank');
  }
}
