import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ds-icon',
  template: `
    <svg class="icon">
      <use [attr.href]="'#' + name" />
    </svg>
  `,
})
export default class Icon {
  @HostBinding('class.Icon') rootClass: boolean = true;

  @Input() name: string;
}
