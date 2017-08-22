import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import axios from 'axios';
import { HomepageSection } from '../../common/homepage-section/homepage-section';
import './home.pcss';

@Component({
  selector: 'ds-page-home',
  template: `
    <ds-navbar></ds-navbar>
    
    <div class="Home__content">
      <ds-homepage-section *ngFor="let homepageSection of homepageSections"
        [homepageSection]="homepageSection"
      ></ds-homepage-section>
    </div>

    <ds-footer></ds-footer>
  `,
})
export default class Home implements OnInit {
  @HostBinding('class.Home') rootClass: boolean = true;

  homepageSections: Array<HomepageSection>;

  ngOnInit() {
    axios
      .get('/api/v1/section')
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
