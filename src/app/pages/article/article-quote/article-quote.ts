import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

export const ARTICLE_QUOTE_TYPE = 'quote';

class QuoteModel {
  text: string;
  credit: string;
}

@Component({
  selector: 'ds-article-quote',
  styleUrls: ['./article-quote.scss'],
  template: `
    <p class="ArticleQuote__text">{{content.text}}</p>
    <p class="ArticleQuote__credit">{{content.credit}}</p>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleQuote {
  @HostBinding('class.ArticleQuote') rootClass = true;

  @Input() content: QuoteModel;
}
