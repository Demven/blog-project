import {
  Component,
  Input,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../redux/InitialAppState';
import { articleTitleIsHiddenAction, articleTitleIsVisibleAction } from '../../../redux/actions/ui';
import './article-header.pcss';

@Component({
  selector: 'ds-article-header',
  template: `
    <h1
      class="ArticleHeader__title"
      #titleEl
    >{{title}}</h1>
    
    <div class="ArticleHeader__article-info">
      <div class="ArticleHeader__views-count">
        <img
          class="ArticleHeader__views-count-icon"
          src="../../../../public/images/eye.png"
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
          src="../../../../public/images/comments.png"
          alt="Comment icon"
        />
        <div class="ArticleHeader__comments-count-value">123</div>
      </div>
    </div>
  `,
})
export default class ArticleHeader implements AfterViewInit, OnDestroy {
  @HostBinding('class.ArticleHeader') rootClass: boolean = true;

  @Input() title: string;
  @Input() views: number;

  @ViewChild('titleEl')
  private titleEl : ElementRef;

  private articleTitleIsVisible: boolean = true;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.onArticleScroll = this.onArticleScroll.bind(this);
    this.onTitleIsHidden = this.onTitleIsHidden.bind(this);
    this.onTitleIsVisible = this.onTitleIsVisible.bind(this);
  }

  ngAfterViewInit() {
    window.document.addEventListener('scroll', this.onArticleScroll);
  }

  ngOnDestroy() {
    window.document.removeEventListener('scroll', this.onArticleScroll);
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
    this.ngRedux.dispatch(articleTitleIsHiddenAction());
  }

  onTitleIsVisible() {
    this.articleTitleIsVisible = true;
    this.ngRedux.dispatch(articleTitleIsVisibleAction());
  }
}
