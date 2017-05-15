import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import './article-text.pcss';

class TextModel {
  text: string;
}

@Component({
  selector: 'ds-article-text',
  template: `
    <p class="ArticleText__content">{{content.text}}</p>
  `,
})
export default class ArticleText {
  @HostBinding('class.ArticleText') rootClass: boolean = true;

  @Input() content: TextModel;
}
