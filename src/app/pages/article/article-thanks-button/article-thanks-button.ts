import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-article-thanks-button',
  styleUrls: ['./article-thanks-button.scss'],
  template: `
    <ds-sparkles [active]="clickAnimationActive">
      <button
        class="ArticleThanksButton__button"
        (click)="!disabled ? onClick() : undefined"
      >
        <ds-badge class="ArticleThanksButton__badge">{{getBadgeValue(count)}}</ds-badge>
        Thank
        <br />
        Me
      </button>
    </ds-sparkles>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleThanksButton {
  @HostBinding('class.ArticleThanksButton') rootClass = true;
  @HostBinding('class.ArticleThanksButton--disabled') @Input() disabled:boolean;

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
