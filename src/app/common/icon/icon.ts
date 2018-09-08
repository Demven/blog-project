import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ds-icon',
  template: `
    <svg class="icon">
      <use [attr.xlink:href]="'#' + name" />
    </svg>
  `,
})
export class Icon {
  @HostBinding('class.Icon') rootClass = true;

  @Input() name: string;
}
