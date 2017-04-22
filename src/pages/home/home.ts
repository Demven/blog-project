import { Component, HostBinding } from '@angular/core';
import { Category } from '../../common/category/category';
import SECTIONS_DATA from '../../temporary-data/sections-data';
import './home.pcss';

@Component({
  selector: 'ds-page-home',
  template: `
    <div class="Home__content">
      <ds-category *ngFor="let category of categories"
        [category]="category"
      ></ds-category>
    </div>
  `,
})
export default class Home {
  @HostBinding('class.Home') rootClass: boolean = true;

  categories: Array<Category> = SECTIONS_DATA;
}
