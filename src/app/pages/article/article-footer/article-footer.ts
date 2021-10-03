import {
  Component, EventEmitter,
  HostBinding,
  Input, Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-article-footer',
  styleUrls: ['./article-footer.scss'],
  template: `
    <h3 class="ArticleFooter__title">Do you like the article?</h3>

    <ds-article-thanks-button
      class="ArticleFooter__thanks-button"
      [count]="thanksCount"
      [disabled]="thanksDisabled"
      (click)="onThanksClick($event)"
    ></ds-article-thanks-button>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleFooter {
  @HostBinding('class.ArticleFooter') rootClass = true;

  @Input() thanksCount:string|number = 0;
  @Input() thanksDisabled = false;

  @Output() thanksClick:EventEmitter<Event> = new EventEmitter();

  constructor() {
    this.onThanksClick = this.onThanksClick.bind(this);
  }

  onThanksClick(event:Event) {
    this.thanksClick.emit(event);
  }
}
