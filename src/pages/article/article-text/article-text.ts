import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import MarkdownService from '../../../services/markdown.service';
import './article-text.pcss';

export const ARTICLE_TEXT_TYPE = 'text';

class TextModel {
  text: string;
}

@Component({
  selector: 'ds-article-text',
  template: `
    <p
      class="ArticleText__content"
      [innerHtml]="markdownService.format(content.text) | dsKeepHtml"
    ></p>
  `,
})
export default class ArticleText {
  @HostBinding('class.ArticleText') rootClass: boolean = true;

  constructor(public markdownService:MarkdownService) {}

  @Input() content: TextModel;
}
