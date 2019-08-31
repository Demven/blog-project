import {
  Component,
  Compiler,
  ViewContainerRef,
  ViewChild,
  Input,
  ComponentRef,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { ArticleText, ARTICLE_TEXT_TYPE } from '../article-text/article-text';
import { ArticleImage, ARTICLE_IMAGE_TYPE } from '../article-image/article-image';
import { ArticleHeading, ARTICLE_HEADING_TYPE } from '../article-heading/article-heading';
import { ArticleQuote, ARTICLE_QUOTE_TYPE } from '../article-quote/article-quote';
import { ArticleList, ARTICLE_LIST_TYPE } from '../article-list/article-list';
import { ArticleMath, ARTICLE_MATH_TYPE } from '../article-math/article-math';
import { ArticleCode, ARTICLE_CODE_TYPE } from '../article-code/article-code';

class BodyNodeContent {
  type: string;
}

@Component({
  selector: 'ds-article-body-node',
  template: `
    <div #target></div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleBodyNode implements OnChanges, AfterViewInit, OnDestroy {
  @Input() content:BodyNodeContent;
  @ViewChild('target', { read: ViewContainerRef, static: false }) target: ViewContainerRef;

  node: ComponentRef<any>;

  private isViewInitialized = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler,
              private changeDetector:ChangeDetectorRef
  ) {}

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }

    if (this.node) {
      this.node.destroy();
    }

    const componentToRender:any = this.getComponentByNodeType(this.content.type);
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentToRender);
    this.node = this.target.createComponent(factory);
    this.node.instance.content = this.content;
    // this.node.instance.someOutput.subscribe(val => doSomething());
    this.changeDetector.detectChanges();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.node) {
      this.node.destroy();
    }
  }

  getComponentByNodeType(type:string) {
    switch (type) {
      case ARTICLE_TEXT_TYPE:
        return ArticleText;
      case ARTICLE_IMAGE_TYPE:
        return ArticleImage;
      case ARTICLE_HEADING_TYPE:
        return ArticleHeading;
      case ARTICLE_QUOTE_TYPE:
        return ArticleQuote;
      case ARTICLE_LIST_TYPE:
        return ArticleList;
      case ARTICLE_MATH_TYPE:
        return ArticleMath;
      case ARTICLE_CODE_TYPE:
        return ArticleCode;
      default:
        return null;
    }
  }
}
