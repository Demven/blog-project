import { Component, HostBinding, Input } from '@angular/core';
import './label.pcss';

export const LABEL_COLOR = {
  BLUE: 'blue',
  GREEN: 'green',
  RED: 'red',
};

@Component({
  selector: 'ds-label',
  template: `
    <div class="Label__title">{{title}}</div>
  `,
})
export default class Label {
  @HostBinding('class.Label') rootClass: boolean = true;

  @HostBinding('class.Label--blue') @Input() blue: boolean;
  @HostBinding('class.Label--green') @Input() green: boolean;
  @HostBinding('class.Label--red') @Input() red: boolean;

  @HostBinding('class.Label--small') @Input() small: boolean;

  @Input() title: string;
}
