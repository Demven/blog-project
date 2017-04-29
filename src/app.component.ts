import { Component, HostBinding } from '@angular/core';
import '../public/styles/main.pcss';
import './app.styles.pcss';

@Component({
  selector: 'ds-app',
  template: `
    <router-outlet></router-outlet>
  `,
})
export default class AppComponent {
  @HostBinding('class.App') rootClass: boolean = true;
}
