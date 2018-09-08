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
import { CodeHighlightService } from '../../../services/code-highlight.service';
import { SelectItem } from '../../../edit-common/select-field/select-field';

export const EDIT_ARTICLE_CODE_TYPE = 'code';

class CodeModel {
  type: string;
  codeType: string;
  code: string;
}

@Component({
  selector: 'ds-edit-article-code',
  styleUrls: ['./edit-article-code.scss'],
  template: `
    <div class="EditArticleCode__wrapper">
      <div
        class="EditArticleCode__content"
        *ngIf="!editMode"
      >
        <h4 class="EditArticleCode__code-type">{{CODE_TYPES[selectedCodeTypeIndex].text}}</h4>
        <pre
          class="EditArticleCode__code"
          (click)="onEdit()"
        >
          <code [attr.data-language]="CODE_TYPES[selectedCodeTypeIndex].value">{{currentCodeValue || content.code}}</code>
        </pre>
      </div>

      <div
        class="EditArticleCode__form"
        *ngIf="editMode"
      >
        <div class="EditArticleCode__select">
          <ds-select-field
            [name]="'type'"
            [label]="'Type'"
            [selectedIndex]="selectedCodeTypeIndex"
            [values]="CODE_TYPES"
            (select)="onCodeTypeChange($event)"
          ></ds-select-field>
        </div>
        <ds-text-area
          [name]="'code'"
          [rows]="5"
          [placeholder]="'Code'"
          [value]="currentCodeValue || content.code"
          required
          (change)="onCodeChange($event)"
        ></ds-text-area>
      </div>
    </div>

    <div class="EditArticleCode__actions">
      <button
        class="EditArticleCode__action EditArticleCode__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleCode__action EditArticleCode__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleCode implements OnInit {
  @HostBinding('class.EditArticleCode') rootClass = true;
  @HostBinding('class.EditArticleCode--edit-mode') editMode = false;

  @Input() index: string;
  @Input() content: CodeModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;
  public CODE_TYPES: Array<SelectItem> = [
    { text: 'JavaScript', value: 'javascript' },
    { text: 'HTML', value: 'html' },
    { text: 'CSS', value: 'css' },
    { text: 'JSON', value: 'json' },
    { text: 'Command Line', value: 'shell' },
  ];

  public currentCodeValue: string;
  public selectedCodeTypeIndex = 0;

  constructor(private codeHighlightService: CodeHighlightService) {
    this.renderCode = this.renderCode.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCodeTypeChange = this.onCodeTypeChange.bind(this);
  }

  ngOnInit() {
    if (!this.content.code && !this.currentCodeValue) {
      this.editMode = true;
    } else {
      this.selectedCodeTypeIndex = this.CODE_TYPES.findIndex(type => type.value === this.content.codeType);
      this.renderCode();
    }
  }

  renderCode() {
    this.codeHighlightService.renderCode();
  }

  onCodeChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this.currentCodeValue = value;
    }
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;

    if (this.currentCodeValue && this.currentCodeValue.length > 0) {
      this.update.emit({ index: this.index, content: { ...this.content, code: this.currentCodeValue } });
    } else if (!this.content.code) {
      this.onDelete();
    }

    window.setTimeout(this.renderCode, 100);
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }

  onCodeTypeChange({ name, selectedIndex }: { name: string, selectedIndex: number }) {
    if (name === 'type') {
      this.selectedCodeTypeIndex = selectedIndex;
      this.content.codeType = this.CODE_TYPES[selectedIndex].value;
    }
  }
}
