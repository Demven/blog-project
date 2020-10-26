import {
  Component,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import * as moment from 'moment';
import { MarkdownService } from '../../../services/markdown.service';
import { ArticleTitleVisibilityService } from '../../../services/article-title-visibility.service';

@Component({
  selector: 'ds-article-header',
  styleUrls: ['./article-header.scss'],
  template: `
    <h1
      class="ArticleHeader__title"
      #titleEl
    >{{title}}</h1>

    <div class="ArticleHeader__article-info">
      <div class="ArticleHeader__publication-date">{{formatPublicationDate()}}</div>
      <div class="ArticleHeader__views-count">
        <img
          class="ArticleHeader__views-count-icon"
          src="/assets/images/eye.png"
          alt="Eye icon"
        />
        <div class="ArticleHeader__views-count-value">{{views}}</div>
      </div>

      <div
        class="ArticleHeader__comments-count"
        *ngIf="false"
      >
        <img
          class="ArticleHeader__comments-count-icon"
          src="/assets/images/comments.png"
          alt="Comment icon"
        />
        <div class="ArticleHeader__comments-count-value">123</div>
      </div>
    </div>

    <p
      class="ArticleHeader__description"
      [innerHtml]="markdownService.format(description) | dsKeepHtml"
    ></p>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleHeader implements AfterViewInit, OnDestroy {
  @HostBinding('class.ArticleHeader') rootClass = true;

  @Input() title: string;
  @Input() description: string;
  @Input() views: number;
  @Input() publicationDate: string;

  @ViewChild('titleEl')
  private titleEl: ElementRef;

  private articleTitleIsVisible = true;

  constructor(
    public markdownService: MarkdownService,
    private articleTitleVisibilityService: ArticleTitleVisibilityService
  ) {
    this.onArticleScroll = this.onArticleScroll.bind(this);
    this.onTitleIsHidden = this.onTitleIsHidden.bind(this);
    this.onTitleIsVisible = this.onTitleIsVisible.bind(this);
    this.formatPublicationDate = this.formatPublicationDate.bind(this);
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      window.document.addEventListener('scroll', this.onArticleScroll);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.document.removeEventListener('scroll', this.onArticleScroll);
    }
  }

  onArticleScroll() {
    const titleElBounds = this.titleEl.nativeElement.getBoundingClientRect();
    if (this.articleTitleIsVisible && titleElBounds.top < 0) {
      this.onTitleIsHidden();
    } else if (!this.articleTitleIsVisible && titleElBounds.top > 0) {
      this.onTitleIsVisible();
    }
  }

  onTitleIsHidden() {
    this.articleTitleIsVisible = false;
    this.articleTitleVisibilityService.setVisibility(false);
  }

  onTitleIsVisible() {
    this.articleTitleIsVisible = true;
    this.articleTitleVisibilityService.setVisibility(true);
  }

  formatPublicationDate() {
    return moment(this.publicationDate).format('MMM DD YYYY');
  }
}
