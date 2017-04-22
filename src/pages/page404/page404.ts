import { Component, HostBinding } from '@angular/core';
import './page404.pcss';

@Component({
  selector: 'ds-page-home',
  template: `
    <div class="Page404__content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </div>
  `,
})
export default class Page404 {
  @HostBinding('class.Page404') rootClass: boolean = true;
}
