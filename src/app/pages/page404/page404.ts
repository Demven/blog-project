import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ds-page-home',
  styleUrls: ['./page404.scss'],
  template: `
    <div class="Page404__content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  `,
})
export class Page404 {
  @HostBinding('class.Page404') rootClass = true;
}
