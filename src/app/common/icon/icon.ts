import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ds-icon',
  template: `
    <svg class="icon">
      <use [attr.xlink:href]="'#' + name" />
    </svg>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Icon {
  @HostBinding('class.Icon') rootClass = true;

  @Input() name: string;
}
