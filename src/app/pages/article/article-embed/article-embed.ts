import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';

export const ARTICLE_EMBED_TYPE = 'embed';

class EmbedModel {
  embed: string;
  caption: string;
  credits: string;
}

@Component({
  selector: 'ds-article-embed',
  styleUrls: ['./article-embed.scss'],
  template: `
    <ds-embed [embed]="content.embed"></ds-embed>

    <div class="ArticleEmbed__info" *ngIf="content.caption || content.credits">
      <div class="ArticleEmbed__caption" *ngIf="content.caption">{{content.caption}}</div>
      <div class="ArticleEmbed__credits" *ngIf="content.credits">{{content.credits}}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleEmbed implements OnInit {
  @HostBinding('class.ArticleEmbed') rootClass = true;
  @HostBinding('class.ArticleEmbed--with-caption') withCaption = false;

  @Input() content: EmbedModel;

  ngOnInit() {
    this.withCaption = this.content && !!this.content.caption;
  }
}
