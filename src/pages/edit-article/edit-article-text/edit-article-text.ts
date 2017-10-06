import {
  Component,
  Input,
  Output,
  OnInit,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import { ICON } from '../../../common/svg-sprite/svg-sprite';
import './edit-article-text.pcss';

class TextModel {
  type: string;
  text: string;
}

@Component({
  selector: 'ds-edit-article-text',
  template: `
    <div class="EditArticleText__wrapper">
      <p
        class="EditArticleText__content"
        (click)="onEdit()"
        *ngIf="!editMode"
      >{{currentValue || content.text}}</p>
      
      <ds-text-area
        [name]="index"
        [rows]="3"
        [placeholder]="'Text'"
        [value]="currentValue || content.text"
        required
        (change)="onFieldChange($event)"
        *ngIf="editMode"
      ></ds-text-area>
    </div>
    <div class="EditArticleText__actions">
      <button
        class="EditArticleText__action EditArticleText__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleText__action EditArticleText__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
    </div>
  `,
})
export default class EditArticleText implements OnInit {
  @HostBinding('class.EditArticleText') rootClass: boolean = true;
  @HostBinding('class.EditArticleText--edit-mode') editMode: boolean = false;

  @Input() index: string;
  @Input() content: TextModel;

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
