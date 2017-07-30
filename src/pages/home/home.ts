import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import axios from 'axios'
import { Category } from '../../common/category/category';
import './home.pcss';

@Component({
  selector: 'ds-page-home',
  template: `
    <ds-navbar></ds-navbar>
    
    <div class="Home__content">
      <ds-category *ngFor="let category of categories"
        [category]="category"
      ></ds-category>
    </div>

    <ds-footer></ds-footer>
  `,
})
export default class Home implements OnInit {
  @HostBinding('class.Home') rootClass: boolean = true;

  categories: Array<Category>;

  ngOnInit() {
    axios
      .get('/api/v1/section')
      .then(response => {
        if (response.status === 200) {
          this.categories = response.data;
          console.info('categories data', this.categories);
        } else {
          console.error('Could not get categories', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}
