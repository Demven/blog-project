import {
  Component,
  HostBinding,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { sendYandexEvent, EVENT_ID } from '../../../common/analytics/yandex';
import { ArticleFooterVisibilityService } from '../../../services/article-footer-visibility.service';

const ARTICLE_COMPLETED_EVENT_MAP = {
  25: EVENT_ID.ARTICLE_COMPLETED_25,
  50: EVENT_ID.ARTICLE_COMPLETED_50,
  75: EVENT_ID.ARTICLE_COMPLETED_75,
  100: EVENT_ID.ARTICLE_COMPLETED_100,
};

@Component({
  selector: 'ds-article-visibility-sensor',
  styleUrls: ['./article-visibility-sensor.scss'],
  template: `
    <div
      class="ArticleVisibilitySensor__25"
      inViewport
      (inViewportAction)="onInViewport(25, $event)"
    ></div>
    <div
      class="ArticleVisibilitySensor__50"
      inViewport
      (inViewportAction)="onInViewport(50, $event)"
    ></div>
    <div
      class="ArticleVisibilitySensor__75"
      inViewport
      (inViewportAction)="onInViewport(75, $event)"
    ></div>
    <div
      class="ArticleVisibilitySensor__100"
      inViewport
      (inViewportAction)="onInViewport(100, $event)"
    ></div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleVisibilitySensor {
  @HostBinding('class.ArticleVisibilitySensor') rootClass = true;
  @Input() slug: string;

  private percentsCompleted = 0; // % of the article is scrolled

  constructor(
    private articleFooterVisibilityService:ArticleFooterVisibilityService,
  ) {
    this.onInViewport = this.onInViewport.bind(this);
  }

  onInViewport(percentsCompleted:number, { visible }: { visible: boolean }): void {
    if (visible && percentsCompleted > this.percentsCompleted) {
      this.percentsCompleted = percentsCompleted;

      const eventId = ARTICLE_COMPLETED_EVENT_MAP[percentsCompleted];

      if (eventId) {
        sendYandexEvent(eventId, { article: this.slug });
      }
    }

    if (visible && percentsCompleted === 100) {
      this.articleFooterVisibilityService.setVisibility(true);
    } else {
      this.articleFooterVisibilityService.setVisibility(false);
    }
  }
}
