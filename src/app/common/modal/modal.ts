import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ds-modal',
  styleUrls: ['./modal.scss'],
  template: `
    <div class="Modal__content">
      <div class="Modal__top-gradient"></div>
      <a class="Modal__close-button" [routerLink]="['/']"></a>

      <ng-content></ng-content>
    </div>
  `,
})
export class Modal {
  @HostBinding('class.Modal') rootClass = true;
  @HostBinding('class.Modal--flat') @Input() flat: boolean;
  @HostBinding('class.Modal--all-space-on-mobile') @Input() allSpaceOnMobile: boolean;
}
