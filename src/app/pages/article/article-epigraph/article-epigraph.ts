import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

export const ARTICLE_EPIGRAPH_TYPE = 'epigraph';

class EpigraphModel {
  text: string;
  credit: string;
}

@Component({
  selector: 'ds-article-epigraph',
  styleUrls: ['./article-epigraph.scss'],
  template: `
    <p class="ArticleEpigraph__content-text">{{content.text}}</p>
    <p class="ArticleEpigraph__content-credit">{{content.credit}}</p>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleEpigraph {
  @HostBinding('class.ArticleEpigraph') rootClass = true;

  @Input() content: EpigraphModel;
}
