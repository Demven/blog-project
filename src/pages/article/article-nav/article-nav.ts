import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import './article-nav.pcss';

@Component({
  selector: 'ds-article-nav',
  template: `
    <a
      class="ArticleNav__logo-container"
      routerLink="/"
    >
      <img
        class="ArticleNav__logo"
        src="../../../../public/images/logo.png"
      />
    </a>
    
    <h3 class="ArticleNav__title">{{title}}</h3>

    <a class="ArticleNav__close-button" routerLink="/"></a>
  `,
})
export default class ArticleNav {
  @HostBinding('class.ArticleNav') rootClass: boolean = true;
  @HostBinding('class.ArticleNav--open') @Input() open: boolean;
  @Input() title: string;
}
