import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-article-footer',
  styleUrls: ['./article-footer.scss'],
  template: `
    <h3
      class="ArticleFooter__title"
      *ngIf="!thanked"
    >
      Do you like the article?
    </h3>

    <ds-article-thanks-button
      class="ArticleFooter__thanks-button"
      [count]="thanksCount"
      [disabled]="thanksDisabled"
      (click)="onThanksClick($event)"
      *ngIf="!thanked"
    ></ds-article-thanks-button>

    <div class="ArticleFooter__percentage">
      <ds-badge class="ArticleFooter__badge">{{thanksCount}}</ds-badge>
      <span class="ArticleFooter__stats">or {{getPercentage()}}% of readers said "Thanks"</span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleFooter {
  @HostBinding('class.ArticleFooter') rootClass = true;
  @HostBinding('class.ArticleFooter--thanked') @Input() thanked = false;

  @Input() viewsCount = 0;
  @Input() thanksCount:string|number = 0;
  @Input() thanksDisabled = false;

  @Output() thanksClick:EventEmitter<Event> = new EventEmitter();

  constructor () {
    this.getPercentage = this.getPercentage.bind(this);
    this.onThanksClick = this.onThanksClick.bind(this);
  }

  getPercentage () {
    return `${Math.round(parseInt(String(this.thanksCount), 10) * 100 / this.viewsCount)}`;
  }

  onThanksClick (event:Event) {
    this.thanksClick.emit(event);
  }
}
