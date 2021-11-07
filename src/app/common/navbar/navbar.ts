import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { sendYandexEvent, EVENT_ID } from '../analytics/yandex';
import { Category } from '../../types/Category.type';

@Component({
  selector: 'ds-navbar',
  styleUrls: ['./navbar.scss'],
  template: `
    <nav class="Navbar__menu">
      <menuitem class="Navbar__menu-item">
        <a
          [ngClass]="getLinkClassName(categories[0])"
          routerLink="/category/{{categories[0]?.slug}}"
          routerLinkActive="Navbar__menu-link--active"

          (click)="sendClickEvent(categories[0]?.slug)"
        >
          {{categories[0]?.title}}
        </a>
      </menuitem>

      <menuitem class="Navbar__menu-item">
        <a
          [ngClass]="getLinkClassName(categories[2])"
          routerLink="/category/{{categories[2]?.slug}}"
          routerLinkActive="Navbar__menu-link--active"
          (click)="sendClickEvent(categories[2]?.slug)"
        >
          {{categories[2]?.title}}
        </a>
      </menuitem>

      <menuitem class="Navbar__menu-item">
        <a
          [ngClass]="getLinkClassName(categories[1])"
          routerLink="/category/{{categories[1]?.slug}}"
          routerLinkActive="Navbar__menu-link--active"
          (click)="sendClickEvent(categories[1]?.slug)"
        >
          {{categories[1]?.title}}
        </a>
      </menuitem>

      <menuitem class="Navbar__menu-item">
        <a
          class="Navbar__menu-link"
          routerLink="/contacts"
          (click)="sendClickEvent('contacts')"
        >
          Contacts
        </a>
      </menuitem>
    </nav>

    <a
      class="Navbar__logo-container"
      routerLink="/"
    >
      <img
        class="Navbar__logo"
        src="/assets/images/logo.png"
      />
    </a>

    <h3 class="Navbar__blog-name">Dmitry Salnikov</h3>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Navbar {
  @HostBinding('class.Navbar') rootClass = true;
  @Input() categories: Category[];

  constructor() {
    this.getLinkClassName = this.getLinkClassName.bind(this);
    this.sendClickEvent = this.sendClickEvent.bind(this);
  }

  getLinkClassName (category:Category) {
    return {
      'Navbar__menu-link': true,
      'Navbar__menu-link--red': category?.color === 'red',
      'Navbar__menu-link--green': category?.color === 'green',
      'Navbar__menu-link--blue': category?.color === 'blue',
    };
  }

  sendClickEvent (categorySlug:string) {
    sendYandexEvent(EVENT_ID.NAVIGATION_ITEM_CLICKED, { item: categorySlug });
  }
}
