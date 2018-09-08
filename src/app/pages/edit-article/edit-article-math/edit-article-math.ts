import {
  Component,
  Input,
  Output,
  OnInit,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import { ICON } from '../../../common/svg-sprite/svg-sprite';
import { MathJaxService } from '../../../services/mathJax.service';

export const EDIT_ARTICLE_MATH_TYPE = 'math';

class MathModel {
  type: string;
  equation: string;
}

@Component({
  selector: 'ds-edit-article-math',
  styleUrls: ['./edit-article-math.scss'],
  template: `
    <div class="EditArticleMath__wrapper">
      <p
        class="EditArticleMath__content"
        id="{{generatedId}}"
        (click)="onEdit()"
        *ngIf="!editMode"
      >\`{{currentValue || content.equation}}\`</p>
      
      <ds-text-area
        [name]="'equation'"
        [rows]="3"
        [placeholder]="'ASCII Equation'"
        [value]="currentValue || content.equation"
        required
        (change)="onFieldChange($event)"
        *ngIf="editMode"
      ></ds-text-area>
    </div>
    <div class="EditArticleMath__actions">
      <button
        class="EditArticleMath__action EditArticleMath__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleMath__action EditArticleMath__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
    </div>
  `,
})
export class EditArticleMath implements OnInit {
  @HostBinding('class.EditArticleMath') rootClass = true;
  @HostBinding('class.EditArticleMath--edit-mode') editMode = false;

  @Input() index: string;
  @Input() content: MathModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;

  public currentValue: string;
  public generatedId = `math-${Math.floor(Math.random() * 10000)}`;

  constructor(private mathJaxService: MathJaxService) {
    this.renderEquation = this.renderEquation.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  ngOnInit() {
    if (!this.content.equation && !this.currentValue) {
      this.editMode = true;
    } else {
      this.renderEquation();
    }
  }

  renderEquation() {
    this.mathJaxService.renderEquation(`#${this.generatedId}`);
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
      this.update.emit({ index: this.index, content: { ...this.content, equation: this.currentValue } });
    } else if (!this.content.equation) {
      this.onDelete();
    }

    window.setTimeout(this.renderEquation, 100);
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }
}
