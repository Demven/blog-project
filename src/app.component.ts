import { Component, HostBinding } from '@angular/core';
import '../public/styles/main.pcss';
import './app.styles.pcss';

@Component({
  selector: 'ds-app',
  template: `
    <ds-navbar></ds-navbar>
    
    <router-outlet></router-outlet>

    <ds-footer></ds-footer>
  `,
})
export default class AppComponent {
  @HostBinding('class.App') rootClass: boolean = true;
}
