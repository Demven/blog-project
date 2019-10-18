import {
  Component,
  Input,
  Output,
  HostBinding,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { EDIT_ARTICLE_TEXT_TYPE } from '../edit-article-text/edit-article-text';
import { EDIT_ARTICLE_IMAGE_TYPE } from '../edit-article-image/edit-article-image';
import { EDIT_ARTICLE_HEADING_TYPE } from '../edit-article-heading/edit-article-heading';
import { EDIT_ARTICLE_EPIGRAPH_TYPE } from '../edit-article-epigraph/edit-article-epigraph';
import { EDIT_ARTICLE_LIST_TYPE, LIST_TYPE } from '../edit-article-list/edit-article-list';
import { EDIT_ARTICLE_MATH_TYPE } from '../edit-article-math/edit-article-math';
import { EDIT_ARTICLE_CODE_TYPE } from '../edit-article-code/edit-article-code';
import { EDIT_ARTICLE_EMBED_TYPE } from '../edit-article-embed/edit-article-embed';
import { EDIT_ARTICLE_VIDEO_TYPE } from '../edit-article-video/edit-article-video';
import { EDIT_ARTICLE_QUOTE_TYPE } from '../edit-article-quote/edit-article-quote';
import { ICON } from '../../../common/svg-sprite/svg-sprite';

@Component({
  selector: 'ds-edit-article-add-content',
  styleUrls: ['./edit-article-add-content.scss'],
  template: `
    <ul class="EditArticleAddContent__content-types">
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_TEXT_TYPE)">
        Text
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_IMAGE_TYPE)">
        Image
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_HEADING_TYPE)">
        Heading
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_EPIGRAPH_TYPE)">
        Epigraph
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_LIST_TYPE, { listType: LIST_TYPE.BULLET })">
        List
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_MATH_TYPE)">
        Math
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_CODE_TYPE)">
        Code
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_EMBED_TYPE)">
        Embed
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_VIDEO_TYPE)">
        Video
      </li>
      <li class="EditArticleAddContent__content-type" (click)="onAddContent(this.CONTENT_TYPES.EDIT_ARTICLE_QUOTE_TYPE)">
        Quote
      </li>
    </ul>
    <button
      class="EditArticleAddContent__add-button"
      (click)="contentTypesVisible ? hideContentTypes() : showContentTypes()"
    >
      <ds-icon [name]="ICON_ADD"></ds-icon>
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleAddContent {
  @HostBinding('class.EditArticleAddContent') rootClass = true;
  @HostBinding('class.EditArticleAddContent--content-types-visible') contentTypesVisible = false;
  @HostBinding('class.EditArticleAddContent--small') @Input() small: boolean;

  @Input() index: number;

  @Output() addContent: EventEmitter<object> = new EventEmitter();

  public CONTENT_TYPES = {
    EDIT_ARTICLE_TEXT_TYPE: EDIT_ARTICLE_TEXT_TYPE,
    EDIT_ARTICLE_IMAGE_TYPE: EDIT_ARTICLE_IMAGE_TYPE,
    EDIT_ARTICLE_HEADING_TYPE: EDIT_ARTICLE_HEADING_TYPE,
    EDIT_ARTICLE_EPIGRAPH_TYPE: EDIT_ARTICLE_EPIGRAPH_TYPE,
    EDIT_ARTICLE_LIST_TYPE: EDIT_ARTICLE_LIST_TYPE,
    EDIT_ARTICLE_MATH_TYPE: EDIT_ARTICLE_MATH_TYPE,
    EDIT_ARTICLE_CODE_TYPE: EDIT_ARTICLE_CODE_TYPE,
    EDIT_ARTICLE_EMBED_TYPE: EDIT_ARTICLE_EMBED_TYPE,
    EDIT_ARTICLE_VIDEO_TYPE: EDIT_ARTICLE_VIDEO_TYPE,
    EDIT_ARTICLE_QUOTE_TYPE: EDIT_ARTICLE_QUOTE_TYPE,
  };
  public LIST_TYPE = LIST_TYPE;
  public ICON_ADD: string = ICON.ADD;

  constructor() {
    this.showContentTypes = this.showContentTypes.bind(this);
    this.hideContentTypes = this.hideContentTypes.bind(this);
    this.onAddContent = this.onAddContent.bind(this);
  }

  showContentTypes():void {
    this.contentTypesVisible = true;
  }

  hideContentTypes():void {
    this.contentTypesVisible = false;
  }

  onAddContent(contentType:string, additionalData:object = {}): void {
    this.contentTypesVisible = false;

    const bodyNode = { type: contentType, ...additionalData };
    this.addContent.emit({ index: this.index, bodyNode });
  }
}
