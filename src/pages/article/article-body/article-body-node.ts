import {
  Component,
  Compiler,
  ViewContainerRef,
  ViewChild,
  Input,
  ComponentRef,
  ComponentFactoryResolver,
  ChangeDetectorRef,
} from '@angular/core';

class BodyNodeContent {
  type: any;
}

@Component({
  selector: 'ds-article-body-node',
  template: `
    <div #target></div>
  `,
})
export default class ArticleBodyNode {
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

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.content.type);
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
}
