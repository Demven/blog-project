import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { sendYandexEvent, EVENT_ID } from '../../../common/analytics/yandex';

@Component({
  selector: 'ds-article-nav',
  styleUrls: ['./article-nav.scss'],
  template: `
    <a
      class="ArticleNav__logo-container"
      routerLink="/"
      (click)="onLogoClick()"
    >
      <img
        class="ArticleNav__logo"
        src="/assets/images/logo.png"
      />
    </a>
    
    <h3 class="ArticleNav__title">{{title}}</h3>

    <a
      class="ArticleNav__close-button"
      routerLink="/"
      (click)="onCloseButtonClick()"
    ></a>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleNav {
  @HostBinding('class.ArticleNav') rootClass = true;
  @HostBinding('class.ArticleNav--open') @Input() open: boolean;
  @Input() title: string;
  @Input() slug: string;

  constructor() {
    this.onLogoClick = this.onLogoClick.bind(this);
    this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
  }

  onLogoClick() {
    sendYandexEvent(EVENT_ID.ARTICLE_NAV_LOGO_CLICK);
  }

  onCloseButtonClick() {
    sendYandexEvent(EVENT_ID.ARTICLE_CLOSE_BUTTON, { article: this.slug });
  }
}
