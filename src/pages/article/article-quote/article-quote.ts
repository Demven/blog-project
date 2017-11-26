import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import './article-quote.pcss';

export const ARTICLE_QUOTE_TYPE = 'quote';

class QuoteModel {
  text: string;
  credit: string;
}

@Component({
  selector: 'ds-article-quote',
  template: `    
    <p class="ArticleQuote__content-text">{{content.text}}</p>
    <p class="ArticleQuote__content-credit">{{content.credit}}</p>
  `,
})
export default class ArticleQuote {
  @HostBinding('class.ArticleQuote') rootClass: boolean = true;

  @Input() content: QuoteModel;
}
