import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-sparkles',
  styleUrls: ['./sparkles.scss'],
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Sparkles {
  @HostBinding('class.Sparkles') rootClass = true;
  @HostBinding('class.Sparkles--active') @Input() active: boolean;
}
