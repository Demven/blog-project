import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';

export const ARTICLE_VIDEO_TYPE = 'video';

class VideoModel {
  videoType: string;
  video: string;
  caption: string;
  credits: string;
}

@Component({
  selector: 'ds-article-video',
  styleUrls: ['./article-video.scss'],
  template: `
    <ds-embed
      [className]="'ArticleVideo__' + content.videoType"
      [embed]="content.video"
    ></ds-embed>

    <div class="ArticleVideo__info" *ngIf="content.caption || content.credits">
      <div class="ArticleVideo__caption" *ngIf="content.caption">{{content.caption}}</div>
      <div class="ArticleVideo__credits" *ngIf="content.credits">{{content.credits}}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleVideo implements OnInit {
  @HostBinding('class.ArticleVideo') rootClass = true;
  @HostBinding('class.ArticleVideo--with-caption') withCaption = false;

  @Input() content: VideoModel;

  ngOnInit() {
    this.withCaption = this.content && !!this.content.caption;
  }
}
