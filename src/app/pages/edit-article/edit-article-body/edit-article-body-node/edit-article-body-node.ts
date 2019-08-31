import {
  Component,
  ViewContainerRef,
  ViewChild,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  ComponentFactoryResolver,
  ChangeDetectorRef,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { EditArticleText, EDIT_ARTICLE_TEXT_TYPE } from '../../edit-article-text/edit-article-text';
import { EditArticleImage, EDIT_ARTICLE_IMAGE_TYPE } from '../../edit-article-image/edit-article-image';
import { EditArticleHeading, EDIT_ARTICLE_HEADING_TYPE } from '../../edit-article-heading/edit-article-heading';
import { EditArticleQuote, EDIT_ARTICLE_QUOTE_TYPE } from '../../edit-article-quote/edit-article-quote';
import { EditArticleList, EDIT_ARTICLE_LIST_TYPE } from '../../edit-article-list/edit-article-list';
import { EditArticleMath, EDIT_ARTICLE_MATH_TYPE } from '../../edit-article-math/edit-article-math';
import { EditArticleCode, EDIT_ARTICLE_CODE_TYPE } from '../../edit-article-code/edit-article-code';
import { ICON } from '../../../../common/svg-sprite/svg-sprite';

class BodyNodeContent {
  type: string;
}

@Component({
  selector: 'ds-edit-article-body-node',
  styleUrls: ['./edit-article-body-node.scss'],
  template: `
    <div
      class="EditArticleBodyNode__before-node-container"
      #target
    >
      <ds-edit-article-add-content
        [index]="index"
        [small]="true"
        (addContent)="onAddContent($event)"
      ></ds-edit-article-add-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleBodyNode implements OnChanges, AfterViewInit, OnDestroy {
  @HostBinding('class.EditArticleBodyNode') rootClass = true;

  @Input() index: number;
  @Input() content: BodyNodeContent;

  @Output() update: EventEmitter<Event> = new EventEmitter();
  @Output() remove: EventEmitter<Event> = new EventEmitter();
  @Output() addContent: EventEmitter<object> = new EventEmitter();

  @ViewChild('target', { read: ViewContainerRef, static: false }) target: ViewContainerRef;

  node: ComponentRef<any>;

  private isViewInitialized = false;

  public ICON_ADD: string = ICON.ADD;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetector:ChangeDetectorRef) {
    this.onAddContent = this.onAddContent.bind(this);
  }

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
    switch (type) {
      case EDIT_ARTICLE_TEXT_TYPE:
        return EditArticleText;
      case EDIT_ARTICLE_IMAGE_TYPE:
        return EditArticleImage;
      case EDIT_ARTICLE_HEADING_TYPE:
        return EditArticleHeading;
      case EDIT_ARTICLE_QUOTE_TYPE:
        return EditArticleQuote;
      case EDIT_ARTICLE_LIST_TYPE:
        return EditArticleList;
      case EDIT_ARTICLE_MATH_TYPE:
        return EditArticleMath;
      case EDIT_ARTICLE_CODE_TYPE:
        return EditArticleCode;
      default:
        return null;
    }
  }

  onAddContent(event: object) {
    this.addContent.emit(event);
  }
}
