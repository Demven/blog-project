import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import scrollTo from '../../services/pageScroller';
import { Category } from '../../pages/home/home';
import { sendYandexEvent, EVENT_ID } from '../analytics/yandex';

@Component({
  selector: 'ds-navbar',
  styleUrls: ['./navbar.scss'],
  template: `
    <nav class="Navbar__menu">
      <menuitem class="Navbar__menu-item">
        <a
          class="Navbar__menu-link"
          (click)="onMenuItemClick($event, 0, categories && categories[0].slug)"
        >
          {{categories && categories[0].title}}
        </a>
      </menuitem>
      <menuitem class="Navbar__menu-item">
        <a
          class="Navbar__menu-link"
          (click)="onMenuItemClick($event, 1, categories && categories[1].slug)"
        >
          {{categories && categories[1].title}}
        </a>
      </menuitem>
      <menuitem class="Navbar__menu-item">
        <a
          class="Navbar__menu-link"
          (click)="onMenuItemClick($event, 2, categories && categories[2].slug)"
        >
          {{categories && categories[2].title}}
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
  @Input() categories: Array<Category>;

  constructor() {
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.sendClickEvent = this.sendClickEvent.bind(this);
  }

  getOffsetToCategory(index:number):number {
    return document.querySelectorAll('ds-homepage-section')[index]['offsetTop'] - 20;
  }

  onMenuItemClick(event:Event, index:number, categorySlug: string) {
    event.preventDefault();

    scrollTo(this.getOffsetToCategory(index));
    this.sendClickEvent(categorySlug);
  }

  sendClickEvent(categorySlug:string) {
    sendYandexEvent(EVENT_ID.NAVIGATION_ITEM_CLICKED, { item: categorySlug });
  }
}
