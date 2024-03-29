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
      <ds-article-thanks-button
        [count]="count"
        [disabled]="disabled"
        [withBadge]="true"
        (click)="onClick()"
      ></ds-article-thanks-button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleStickyThanks implements AfterViewInit, OnDestroy {
  @HostBinding('class.ArticleStickyThanks') rootClass = true;
  @HostBinding('class.ArticleStickyThanks--visible') @Input() visible:boolean;

  @Input() disabled:boolean;
  @Input() contentContainerEl:HTMLElement;
  @Input() count:string|number = 0;

  public left = '';

  public clicked = false;
  public clickAnimationActive = false;

  constructor () {
    this.onResize = this.onResize.bind(this);
    this.onClick = this.onClick.bind(this);
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
}
