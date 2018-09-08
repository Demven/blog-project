import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export const LABEL_COLOR = {
  BLUE: 'blue',
  GREEN: 'green',
  RED: 'red',
};

@Component({
  selector: 'ds-label',
  styleUrls: ['./label.scss'],
  template: `
    <div class="Label__title">{{title}}</div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Label {
  @HostBinding('class.Label') rootClass = true;

  @HostBinding('class.Label--blue') @Input() blue: boolean;
  @HostBinding('class.Label--green') @Input() green: boolean;
  @HostBinding('class.Label--red') @Input() red: boolean;

  @HostBinding('class.Label--small') @Input() small: boolean;

  @Input() title: string;
}
