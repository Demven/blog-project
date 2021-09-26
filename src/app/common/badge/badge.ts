import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ds-badge',
  styleUrls: ['./badge.scss'],
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Badge {
  @HostBinding('class.Badge') rootClass = true;
}
