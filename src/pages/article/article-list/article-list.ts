import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import MarkdownService from '../../../services/markdown.service';
import './article-list.pcss';

export const ARTICLE_LIST_TYPE = 'list';

class ListModel {
  type: string;
  listType: string;
  text: string;
  items: Array<string>;
}

@Component({
  selector: 'ds-article-list',
  template: `    
    <p
      class="ArticleList__text"
      [innerHtml]="markdownService.format(content.text) | dsKeepHtml"
    ></p>
    <ul class="ArticleList__items">
      <li
        *ngFor="let item of content.items"
        class="ArticleList__item"
        [innerHtml]="markdownService.format(item) | dsKeepHtml"
      ></li>
    </ul>
  `,
})
export default class ArticleList {
  @HostBinding('class.ArticleList') rootClass: boolean = true;

  constructor(public markdownService:MarkdownService) {}

  @Input() content: ListModel;
}