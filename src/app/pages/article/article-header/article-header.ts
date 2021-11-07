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

    <ds-article-info
      class="ArticleHeader__article-info"
      [publicationDate]="publicationDate"
      [views]="views"
    ></ds-article-info>

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

  constructor (
    public markdownService: MarkdownService,
    private articleTitleVisibilityService: ArticleTitleVisibilityService
  ) {
    this.onArticleScroll = this.onArticleScroll.bind(this);
    this.onTitleIsHidden = this.onTitleIsHidden.bind(this);
    this.onTitleIsVisible = this.onTitleIsVisible.bind(this);
  }

  ngAfterViewInit () {
    if (typeof window !== 'undefined') {
      window.document.addEventListener('scroll', this.onArticleScroll);
    }
  }

  ngOnDestroy () {
    if (typeof window !== 'undefined') {
      window.document.removeEventListener('scroll', this.onArticleScroll);
    }
  }

  onArticleScroll () {
    const titleElBounds = this.titleEl.nativeElement.getBoundingClientRect();
    if (this.articleTitleIsVisible && titleElBounds.top < 0) {
      this.onTitleIsHidden();
    } else if (!this.articleTitleIsVisible && titleElBounds.top > 0) {
      this.onTitleIsVisible();
    }
  }

  onTitleIsHidden () {
    this.articleTitleIsVisible = false;
    this.articleTitleVisibilityService.setVisibility(false);
  }

  onTitleIsVisible () {
    this.articleTitleIsVisible = true;
    this.articleTitleVisibilityService.setVisibility(true);
  }
}
