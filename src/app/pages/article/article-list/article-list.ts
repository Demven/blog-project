import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { MarkdownService } from '../../../services/markdown.service';

export const ARTICLE_LIST_TYPE = 'list';

class ListModel {
  type: string;
  listType: string;
  text: string;
  items: Array<string>;
}

@Component({
  selector: 'ds-article-list',
  styleUrls: ['./article-list.scss'],
  template: `    
    <p
      class="ArticleList__text"
      [innerHtml]="markdownService.format(content.text) | dsKeepHtml"
    ></p>
    <ul
      class="ArticleList__items"
      *ngIf="content.items && content.items[0]"
    >
      <li
        *ngFor="let item of content.items"
        class="ArticleList__item"
        [innerHtml]="markdownService.format(item) | dsKeepHtml"
      ></li>
    </ul>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleList {
  @HostBinding('class.ArticleList') rootClass = true;

  constructor(public markdownService:MarkdownService) {}

  @Input() content: ListModel;
}
