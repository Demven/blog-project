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

export const EDIT_ARTICLE_EPIGRAPH_TYPE = 'epigraph';

class EpigraphModel {
  type: string;
  text: string;
  credit: string;
}

@Component({
  selector: 'ds-edit-article-epigraph',
  styleUrls: ['./edit-article-epigraph.scss'],
  template: `
    <div class="EditArticleEpigraph__wrapper">
      <p
        class="EditArticleEpigraph__content-text"
        (click)="onEdit()"
        *ngIf="!editMode"
      >{{text || content.text}}</p>
      <p
        class="EditArticleEpigraph__content-credit"
        (click)="onEdit()"
        *ngIf="!editMode"
      >{{credit || content.credit}}</p>

      <div
        class="EditArticleEpigraph__text-field"
        *ngIf="editMode"
      >
        <ds-text-area
          [name]="'text'"
          [label]="'Epigraph'"
          [rows]="3"
          [placeholder]="'Text'"
          [value]="text || content.text"
          [required]="true"
          (change)="onFieldChange($event)"
        ></ds-text-area>
      </div>
      <div
        class="EditArticleEpigraph__credit-field"
        *ngIf="editMode"
      >
        <ds-text-field
          [name]="'credit'"
          [label]="'Credit'"
          [placeholder]="'Elon Mask'"
          [value]="credit || content.credit"
          [required]="true"
          (change)="onFieldChange($event)"
        ></ds-text-field>
      </div>
    </div>
    <div class="EditArticleEpigraph__actions">
      <button
        class="EditArticleEpigraph__action EditArticleEpigraph__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleEpigraph__action EditArticleEpigraph__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleEpigraph implements OnInit {
  @HostBinding('class.EditArticleEpigraph') rootClass = true;
  @HostBinding('class.EditArticleEpigraph--edit-mode') editMode = false;

  @Input() index: string;
  @Input() content: EpigraphModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;

  public text: string;
  public credit: string;

  constructor() {
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  ngOnInit() {
    if (!this.content.text && !this.text) {
      this.editMode = true;
    }
  }

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this[name] = value;
    }
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;

    if (this.text && this.text.length > 0) {
      const content = {
        ...this.content,
        text: this.text,
        credit: this.credit,
      };
      this.update.emit({ index: this.index, content });
    } else if (!this.content.text) {
      this.onDelete();
    }
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }
}
