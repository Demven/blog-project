import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-article-sticky-thanks',
  styleUrls: ['./article-sticky-thanks.scss'],
  template: `
    <ds-sparkles [active]="clickAnimationActive">
      <button
        class="ArticleStickyThanks__button"
        (click)="!disabled ? onClick() : undefined"
      >
        <ds-badge class="ArticleStickyThanks__badge">{{getBadgeValue(count)}}</ds-badge>
        Thank
        <br />
        Me
      </button>
    </ds-sparkles>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleStickyThanks {
  @HostBinding('class.ArticleStickyThanks') rootClass = true;
  @HostBinding('class.ArticleStickyThanks--visible') @Input() visible:boolean;
  @HostBinding('class.ArticleStickyThanks--disabled') @Input() disabled:boolean;
  @HostBinding('style.left') left = `calc(50% - (1024px / 2) - 80px - 35px)`;

  @Input() contentWidth:number;
  @Input() count:string|number = 0;

  public clicked = false;
  public clickAnimationActive = false;

  constructor () {
    this.onClick = this.onClick.bind(this);
    this.getBadgeValue = this.getBadgeValue.bind(this);
  }

  onClick () {
    this.clicked = true;
    this.clickAnimationActive = true;

    setTimeout(() => {
      this.clickAnimationActive = false;
    }, 1000);
  }

  getBadgeValue (count:string|number):string {
    return ((typeof count === 'number' && count < 10000) || typeof count === 'string')
      ? String(count)
      : (count < 1000000
        ? `${(count / 1000).toFixed(1).replace('.0', '')}k`
        : `${(count / 1000000).toFixed(1).replace('.0', '')}M`);
  }
}
