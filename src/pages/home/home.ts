import { Component, HostBinding } from '@angular/core';
import '../../../public/styles/main.pcss';
import './home.pcss';

@Component({
  selector: 'ds-page-home',
  template: `
    <ds-navbar></ds-navbar>
    
    <div class="Home__content">
      <section class="Home__category"></section>
      <section class="Home__category"></section>
    </div>
  `,
})
export default class Home {
  @HostBinding('class.Home') rootClass: boolean = true;
}
