import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import './article-header.pcss';

@Component({
  selector: 'ds-article-header',
  template: `
    <h1 class="ArticleHeader__title">{{title}}</h1>
    
    <div class="ArticleHeader__article-info">
      <div class="ArticleHeader__views-count">
        <img
          class="ArticleHeader__views-count-icon"
          src="../../../../public/images/eye.png"
          alt="Eye icon"
        />
        <div class="ArticleHeader__views-count-value">{{views}}</div>
      </div>
      <div class="ArticleHeader__comments-count">
        <img
          class="ArticleHeader__comments-count-icon"
          src="../../../../public/images/comments.png"
          alt="Comment icon"
        />
        <div class="ArticleHeader__comments-count-value">{{comments}}</div>
      </div>
    </div>
  `,
})
export default class ArticleHeader {
  @HostBinding('class.ArticleHeader') rootClass: boolean = true;

  @Input() title: string;
  @Input() views: number;
  @Input() comments: number;
}
