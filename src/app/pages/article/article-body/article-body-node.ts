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
  ChangeDetectionStrategy,
} from '@angular/core';
import { ArticleText, ARTICLE_TEXT_TYPE } from '../article-text/article-text';
import { ArticleImage, ARTICLE_IMAGE_TYPE } from '../article-image/article-image';
import { ArticleHeading, ARTICLE_HEADING_TYPE } from '../article-heading/article-heading';
import { ArticleEpigraph, ARTICLE_EPIGRAPH_TYPE } from '../article-epigraph/article-epigraph';
import { ArticleList, ARTICLE_LIST_TYPE } from '../article-list/article-list';
import { ArticleMath, ARTICLE_MATH_TYPE } from '../article-math/article-math';
import { ArticleCode, ARTICLE_CODE_TYPE } from '../article-code/article-code';
import { ArticleEmbed, ARTICLE_EMBED_TYPE } from '../article-embed/article-embed';
import { ArticleVideo, ARTICLE_VIDEO_TYPE } from '../article-video/article-video';
import { ArticleQuote, ARTICLE_QUOTE_TYPE } from '../article-quote/article-quote';
import { ArticleRecommendations, ARTICLE_RECOMMENDATIONS_TYPE } from '../article-recommendations/article-recommendations';

class BodyNodeContent {
  type: string;
}

@Component({
  selector: 'ds-article-body-node',
  template: `
    <div #target></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleBodyNode implements OnChanges, AfterViewInit, OnDestroy {
  @Input() content:BodyNodeContent;
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

  node: ComponentRef<any>;

  private isViewInitialized = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private changeDetector: ChangeDetectorRef,
  ) {}

  updateComponent() {
    if (!this.isViewInitialized) {
      return;
    }

    if (this.node) {
      this.node.destroy();
    }

    const componentToRender:any|null = this.getComponentByNodeType(this.content.type);

    if (componentToRender) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(componentToRender);
      this.node = this.target.createComponent(factory);
      this.node.instance.content = this.content;
      // this.node.instance.someOutput.subscribe(val => doSomething());
      this.changeDetector.detectChanges();
    }
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
      case ARTICLE_EPIGRAPH_TYPE:
        return ArticleEpigraph;
      case ARTICLE_LIST_TYPE:
        return ArticleList;
      case ARTICLE_MATH_TYPE:
        return ArticleMath;
      case ARTICLE_CODE_TYPE:
        return ArticleCode;
      case ARTICLE_EMBED_TYPE:
        return ArticleEmbed;
      case ARTICLE_VIDEO_TYPE:
        return ArticleVideo;
      case ARTICLE_QUOTE_TYPE:
        return ArticleQuote;
      case ARTICLE_RECOMMENDATIONS_TYPE:
        return ArticleRecommendations;
      default:
        return null;
    }
  }
}
