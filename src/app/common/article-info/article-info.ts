import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'ds-article-info',
  styleUrls: ['./article-info.scss'],
  template: `
    <div class="ArticleInfo__publication-date">
      {{formatPublicationDate()}}
    </div>

    <div class="ArticleInfo__views-count">
      <img
        class="ArticleInfo__views-count-icon"
        src="/assets/images/eye.png"
        alt="Eye icon"
      />
      <div class="ArticleInfo__views-count-value">
        {{views}}
      </div>
    </div>

    <div
      class="ArticleInfo__comments-count"
      *ngIf="false"
    >
      <img
        class="ArticleInfo__comments-count-icon"
        src="/assets/images/comments.png"
        alt="Comment icon"
      />
      <div class="ArticleInfo__comments-count-value">123</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleInfo {
  @HostBinding('class.ArticleInfo') rootClass = true;

  @Input() publicationDate: string;
  @Input() views: number;

  constructor () {
    this.formatPublicationDate = this.formatPublicationDate.bind(this);
  }

  formatPublicationDate () {
    return moment(this.publicationDate).format('MMM DD YYYY');
  }
}
