import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ds-footer',
  styleUrls: ['./footer.scss'],
  template: `
    <div class="Footer__line"></div>
    
    <h3 class="Footer__author">Dmitry Salnikov</h3>
    
    <div class="Footer__logo-container">
      <div class="Footer__current-year">{{currentYear}}</div>
      <img
        class="Footer__logo"
        src="/assets/images/logo.png"
      />
    </div>

    <h3 class="Footer__blog">Personal blog</h3>
  `,
})
export class Footer {
  @HostBinding('class.Footer') rootClass = true;

  currentYear: number = new Date().getFullYear();
}
