import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ds-app',
  styleUrls: ['./app.component.scss'],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  @HostBinding('class.App') rootClass = true;
}
