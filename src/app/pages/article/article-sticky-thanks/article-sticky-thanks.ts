import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

const MIN_LEFT_SPACE = 20; // px
const RIGHT_SPACE = 48; // px
const BUTTON_WIDTH = 80; // px

@Component({
  selector: 'ds-article-sticky-thanks',
  styleUrls: ['./article-sticky-thanks.scss'],
  template: `
    <div
      class="ArticleStickyThanks__wrapper"
      [style.left]="left"
    >
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
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleStickyThanks implements AfterViewInit, OnDestroy  {
  @HostBinding('class.ArticleStickyThanks') rootClass = true;
  @HostBinding('class.ArticleStickyThanks--visible') @Input() visible:boolean;
  @HostBinding('class.ArticleStickyThanks--disabled') @Input() disabled:boolean;

  @Input() contentContainerEl:HTMLElement;
  @Input() count:string|number = 0;

  public left = '';

  public clicked = false;
  public clickAnimationActive = false;

  constructor () {
    this.onResize = this.onResize.bind(this);
    this.onClick = this.onClick.bind(this);
    this.getBadgeValue = this.getBadgeValue.bind(this);
  }

  ngAfterViewInit () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  ngOnDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize () {
    const contentWidth = Math.round(this.contentContainerEl.getBoundingClientRect().width);

    this.left = `max(${MIN_LEFT_SPACE}px, calc(50% - ${Math.round(contentWidth / 2)}px - ${BUTTON_WIDTH + RIGHT_SPACE}px))`;
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
