import {
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { sendYandexEvent, EVENT_ID } from '../analytics/yandex';

@Component({
  selector: 'ds-footer',
  styleUrls: ['./footer.scss'],
  template: `
    <div
      class="Footer__line"
      inViewport
      (inViewportAction)="onInViewport($event)"
    ></div>
    
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
  encapsulation: ViewEncapsulation.None,
})
export class Footer {
  @HostBinding('class.Footer') rootClass = true;

  currentYear: number = new Date().getFullYear();
  private impressionFired = false;

  onInViewport({ visible }: { visible: boolean }): void {
    if (!this.impressionFired && visible) {
      this.impressionFired = true;
      sendYandexEvent(EVENT_ID.HOMEPAGE_COMPLETED);
    }
  }
}
