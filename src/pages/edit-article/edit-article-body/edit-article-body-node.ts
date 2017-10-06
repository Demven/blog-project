import {
  Component,
  Compiler,
  ViewContainerRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  OnChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import EditArticleImage from '../edit-article-image/edit-article-image';
import EditArticleText from '../edit-article-text/edit-article-text';

class BodyNodeContent {
  type: string;
}

@Component({
  selector: 'ds-edit-article-body-node',
  template: `
    <div #target></div>
  `,
})
export default class EditArticleBodyNode implements OnChanges, AfterViewInit, OnDestroy {
  @Input() index: number;
  @Input() content: BodyNodeContent;

  @Output() update: EventEmitter<Event> = new EventEmitter();
  @Output() remove: EventEmitter<Event> = new EventEmitter();

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
    this.node.instance.index = `${this.index}`;
    this.node.instance.content = this.content;
    this.node.instance.update.subscribe((event:Event) => { this.update.emit(event); });
    this.node.instance.remove.subscribe((event:Event) => { this.remove.emit(event); });
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
        return EditArticleText;
      case 'inline-image':
        return EditArticleImage;
      default:
        return null;
    }
  }
}
