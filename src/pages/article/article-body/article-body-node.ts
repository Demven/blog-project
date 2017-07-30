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
} from '@angular/core';
import ArticleImage from '../article-image/article-image';
import ArticleText from '../article-text/article-text';

class BodyNodeContent {
  type: string;
}

@Component({
  selector: 'ds-article-body-node',
  template: `
    <div #target></div>
  `,
})
export default class ArticleBodyNode implements OnChanges, AfterViewInit, OnDestroy {
  @Input() content:BodyNodeContent;
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;

  node: ComponentRef<any>;

  private isViewInitialized:boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private compiler: Compiler,
              private changeDetector:ChangeDetectorRef)
  {}

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
    switch(type) {
      case 'text':
        return ArticleText;
      case 'inline-image':
        return ArticleImage;
      default:
        return null;
    }
  }
}
