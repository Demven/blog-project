import { Component, HostBinding, Input } from '@angular/core';
import './modal.pcss';

@Component({
  selector: 'ds-modal',
  template: `
    <div class="Modal__content">
      <div class="Modal__top-gradient"></div>
      <a class="Modal__close-button" routerLink="/"></a>

      <ng-content></ng-content>
    </div>
  `,
})
export default class Modal {
  @HostBinding('class.Modal') rootClass: boolean = true;
  @HostBinding('class.Modal--flat') @Input() flat: boolean;
}
