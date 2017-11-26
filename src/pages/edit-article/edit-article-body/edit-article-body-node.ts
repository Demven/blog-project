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
import EditArticleText, { EDIT_ARTICLE_TEXT_TYPE } from '../edit-article-text/edit-article-text';
import EditArticleImage, { EDIT_ARTICLE_IMAGE_TYPE } from '../edit-article-image/edit-article-image';
import EditArticleHeading, { EDIT_ARTICLE_HEADING_TYPE } from '../edit-article-heading/edit-article-heading';
import EditArticleQuote, { EDIT_ARTICLE_QUOTE_TYPE } from '../edit-article-quote/edit-article-quote';

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
      case EDIT_ARTICLE_TEXT_TYPE:
        return EditArticleText;
      case EDIT_ARTICLE_IMAGE_TYPE:
        return EditArticleImage;
      case EDIT_ARTICLE_HEADING_TYPE:
        return EditArticleHeading;
      case EDIT_ARTICLE_QUOTE_TYPE:
        return EditArticleQuote;
      default:
        return null;
    }
  }
}
