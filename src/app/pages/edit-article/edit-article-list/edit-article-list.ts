import {
  Component,
  Input,
  Output,
  OnInit,
  HostBinding,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { ICON } from '../../../common/svg-sprite/svg-sprite';
import { MarkdownService } from '../../../services/markdown.service';

export const EDIT_ARTICLE_LIST_TYPE = 'list';
export const LIST_TYPE = {
  BULLET: 'bullet',
  ORDERED: 'ordered',
};

class ListModel {
  type: string;
  listType: string;
  text: string;
  items: Array<string>;
}

@Component({
  selector: 'ds-edit-article-list',
  styleUrls: ['./edit-article-list.scss'],
  template: `
    <div class="EditArticleList__wrapper">
      <p
        class="EditArticleList__content-text"
        (click)="onEdit()"
        [innerHtml]="markdownService.format(text || content.text || '') | dsKeepHtml"
        *ngIf="!editMode"
      ></p>
      <ul
        class="EditArticleList__items"
        (click)="onEdit()"
        *ngIf="!editMode"
      >
        <li
          *ngFor="let item of items"
          class="EditArticleList__item"
          [innerHtml]="markdownService.format(item) | dsKeepHtml"
        ></li>
      </ul>

      <div
        class="EditArticleList__text-field"
        *ngIf="editMode"
      >
        <ds-text-area
          [name]="'text'"
          [label]="'List'"
          [rows]="1"
          [placeholder]="'Optional paragraph before list'"
          [value]="text || content.text"
          [required]="false"
          (change)="onFieldChange($event)"
        ></ds-text-area>
      </div>
      <ul
        class="EditArticleList__item-fields"
        *ngIf="editMode"
      >
        <li
          *ngFor="let item of items; let i = index; trackBy: trackListItem"
          class="EditArticleList__item-field"
        >
          <ds-text-area
            name="{{i}}"
            [rows]="1"
            placeholder="Item {{i + 1}} text"
            [value]="item"
            [required]="false"
            (change)="onListItemChange($event)"
          ></ds-text-area>
          <button
            class="EditArticleList__action EditArticleList__delete-item"
            (click)="onDeleteItem(i)"
          >
            <ds-icon [name]="ICON_REMOVE"></ds-icon>
          </button>
        </li>
      </ul>
    </div>
    
    <div class="EditArticleList__actions">
      <button
        class="EditArticleList__action EditArticleList__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleList__action EditArticleList__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
      <button
        class="EditArticleList__action EditArticleList__add-item"
        (click)="onAdd()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_ADD"></ds-icon>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleList implements OnInit {
  @HostBinding('class.EditArticleList') rootClass = true;
  @HostBinding('class.EditArticleList--edit-mode') editMode = false;

  @Input() index: string;
  @Input() content: ListModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public ICON_ADD: string = ICON.ADD;
  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;
  public ICON_REMOVE: string = ICON.REMOVE;

  public text: string;
  public items: Array<string>;

  private deleted = false;

  constructor(public markdownService:MarkdownService) {
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onListItemChange = this.onListItemChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.trackListItem = this.trackListItem.bind(this);
  }

  ngOnInit() {
    if (!this.content.items && !this.items) {
      this.editMode = true;
      this.items = [''];
    } else if (this.content.items) {
      this.items = [...this.content.items];
    }
  }

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name) {
      this[name] = value;

      if (value === '') {
        this.content.text = value;
      }
    }
  }

  onListItemChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this.items[name] = value;
    }
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;

    if (this.items && this.items.length > 0) {
      const content = {
        ...this.content,
        text: typeof this.text === 'undefined' ? this.content.text : this.text,
        listType: LIST_TYPE.BULLET,
        items: this.items,
      };
      this.update.emit({ index: this.index, content });
    } else if (!this.content.text) {
      this.onDelete();
    }
  }

  onAdd() {
    this.items.push('');
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }

  onDeleteItem(index:number) {
    this.deleted = true;

    this.items.splice(index, 1); // will trigger re-render for all items with random trackId (see trackListItem())
    window.setTimeout(() => {
      this.items = [...this.items]; // will trigger re-render for all items with 'index' trackId
    }, 100);
  }

  /**
   * Prevents re-render items when text value changes.
   * But allows re-render when one of items is deleted.
   * @returns {string} - unique identifier for ngFor item
   */
  trackListItem(index: number):string {
    let itemId;
    if (this.deleted) {
      itemId = (Math.random() * 1000).toFixed(0);
    } else {
      itemId = `${index}`;
    }

    if (this.deleted && (index + 1 === this.items.length)) {
      this.deleted = false;
    }

    return itemId;
  }
}
