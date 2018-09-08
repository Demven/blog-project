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

export const EDIT_ARTICLE_HEADING_TYPE = 'heading';

class HeadingModel {
  type: string;
  text: string;
}

@Component({
  selector: 'ds-edit-article-heading',
  styleUrls: ['./edit-article-heading.scss'],
  template: `
    <div class="EditArticleHeading__wrapper">
      <p
        class="EditArticleHeading__content"
        (click)="onEdit()"
        *ngIf="!editMode"
      >{{currentValue || content.text}}</p>
      
      <ds-text-field
        [name]="index"
        [placeholder]="'Heading text'"
        [value]="currentValue || content.text"
        [required]="true"
        (change)="onFieldChange($event)"
        *ngIf="editMode"
      ></ds-text-field>
    </div>
    
    <div class="EditArticleHeading__actions">
      <button
        class="EditArticleHeading__action EditArticleHeading__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleHeading__action EditArticleHeading__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleHeading implements OnInit {
  @HostBinding('class.EditArticleHeading') rootClass = true;
  @HostBinding('class.EditArticleHeading--edit-mode') editMode = false;

  @Input() index: string;
  @Input() content: HeadingModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;

  public currentValue: string;

  constructor() {
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  ngOnInit() {
    if (!this.content.text && !this.currentValue) {
      this.editMode = true;
    }
  }

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this.currentValue = value;
    }
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;

    if (this.currentValue && this.currentValue.length > 0) {
      this.update.emit({ index: this.index, content: { ...this.content, text: this.currentValue } });
    } else if (!this.content.text) {
      this.onDelete();
    }
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }
}
