import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ds-page-home',
  styleUrls: ['./page404.scss'],
  template: `
    <ds-analytics-yandex></ds-analytics-yandex>
    
    <div class="Page404__content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Page404 implements OnInit {
  @HostBinding('class.Page404') rootClass = true;

  constructor(private titleTag: Title) {
    this.updatePageTitle = this.updatePageTitle.bind(this);
  }

  ngOnInit() {
    this.updatePageTitle();
  }

  updatePageTitle() {
    this.titleTag.setTitle('Page Not Found');
  }
}
