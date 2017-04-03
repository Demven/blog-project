import { Component, HostBinding, Input } from '@angular/core';
import { LABEL_COLOR } from '../label/label';
import { CategoryArticle } from './category-article/category-article';
import './category.pcss';

export class Category {
  name: string;
  color: string;
  articles: Array<CategoryArticle>;
}

@Component({
  selector: 'ds-category',
  template: `
    <ds-label
      [title]="_labelData.name"
      [blue]="_labelData.blue"
      [green]="_labelData.green"
      [red]="_labelData.red"
    ></ds-label>
    <ds-category-article
      *ngFor="let article of _category.articles; let i = index"
      [article]="article"
      [main]="i === 0"
    ></ds-category-article>
  `,
})
export default class CategoryComponent {
  @HostBinding('class.Category') rootClass: boolean = true;

  private _labelData: object;
  private _category: Category;

  @Input() set category(category: Category) {
    this._labelData = {
      name: category.name,
      blue: category.color === LABEL_COLOR.BLUE,
      green: category.color === LABEL_COLOR.GREEN,
      red: category.color === LABEL_COLOR.RED,
    };
    this._category = category;
  }
}
