import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import { MarkdownService } from '../../../services/markdown.service';

export const ARTICLE_TEXT_TYPE = 'text';

class TextModel {
  text: string;
}

@Component({
  selector: 'ds-article-text',
  styleUrls: ['./article-text.scss'],
  template: `
    <p
      class="ArticleText__content"
      [innerHtml]="markdownService.format(content.text) | dsKeepHtml"
    ></p>
  `,
})
export class ArticleText {
  @HostBinding('class.ArticleText') rootClass = true;

  constructor(public markdownService:MarkdownService) {}

  @Input() content: TextModel;
}
