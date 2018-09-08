import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-article-nav',
  styleUrls: ['./article-nav.scss'],
  template: `
    <a
      class="ArticleNav__logo-container"
      routerLink="/"
    >
      <img
        class="ArticleNav__logo"
        src="/assets/images/logo.png"
      />
    </a>
    
    <h3 class="ArticleNav__title">{{title}}</h3>

    <a class="ArticleNav__close-button" routerLink="/"></a>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleNav {
  @HostBinding('class.ArticleNav') rootClass = true;
  @HostBinding('class.ArticleNav--open') @Input() open: boolean;
  @Input() title: string;
}
