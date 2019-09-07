import {
  Component,
  Input,
  Output,
  OnInit,
  HostBinding,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ICON } from '../../../common/svg-sprite/svg-sprite';
import { SelectItem } from '../../../edit-common/select-field/select-field';

export const EDIT_ARTICLE_EMBED_TYPE = 'embed';

class EmbedModel {
  type: string;
  embedType: string;
  embed: string;
  caption: string;
  credits: string;
}

@Component({
  selector: 'ds-edit-article-embed',
  styleUrls: ['./edit-article-embed.scss'],
  template: `
    <div class="EditArticleEmbed__wrapper">
      <div
        class="EditArticleEmbed__preview"
        (click)="onEdit()"
        *ngIf="!editMode"
      >
        <ds-embed
          [embedType]="EMBED_TYPES[selectedEmbedTypeIndex].value"
          [embed]="currentEmbedValue || content.embed"
        ></ds-embed>

        <p class="EditArticleEmbed__content" *ngIf="content.embed">{{content.embed.substring(0, 65)}}...</p>
        <p class="EditArticleEmbed__caption" *ngIf="content.caption">{{content.caption}}</p>
        <p class="EditArticleEmbed__credits" *ngIf="content.credits">{{content.credits}}</p>
      </div>

      <div
        class="EditArticleEmbed__form"
        *ngIf="editMode"
      >
        <div class="EditArticleEmbed__select">
          <ds-select-field
            [name]="'type'"
            [label]="'Type'"
            [selectedIndex]="selectedEmbedTypeIndex"
            [values]="EMBED_TYPES"
            (select)="onEmbedTypeChange($event)"
          ></ds-select-field>
        </div>
        
        <ds-text-area
          [name]="'snippet'"
          [rows]="5"
          [placeholder]="'Paste snippet HTML code here'"
          [value]="currentEmbedValue || content.embed"
          required
          (change)="onEmbedChange($event)"
        ></ds-text-area>

        <div class="EditArticleEmbed__caption-field">
          <ds-text-area
            [name]="'caption'"
            [label]="'Caption'"
            [rows]="3"
            [placeholder]="'Caption'"
            [value]="caption || content.caption"
            (change)="onFieldChange($event)"
          ></ds-text-area>
        </div>

        <div class="EditArticleEmbed__credits-field">
          <ds-text-field
            [name]="'credits'"
            [label]="'Credits'"
            [placeholder]="'Instagram'"
            [value]="credits || content.credits"
            (change)="onFieldChange($event)"
          ></ds-text-field>
        </div>
      </div>
    </div>

    <div class="EditArticleEmbed__actions">
      <button
        class="EditArticleEmbed__action EditArticleEmbed__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleEmbed__action EditArticleEmbed__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleEmbed implements OnInit {
  @HostBinding('class.EditArticleEmbed') rootClass = true;
  @HostBinding('class.EditArticleEmbed--edit-mode') editMode = false;

  @Input() index: string;
  @Input() content: EmbedModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;
  public EMBED_TYPES: Array<SelectItem> = [
    { text: 'HTML', value: 'html' },
    { text: 'Video', value: 'video' },
  ];

  public selectedEmbedTypeIndex = 0;
  public currentEmbedValue: string;
  public caption: string;
  public credits: string;

  constructor() {
    this.onEmbedTypeChange = this.onEmbedTypeChange.bind(this);
    this.onEmbedChange = this.onEmbedChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  ngOnInit() {
    if (!this.content.embed && !this.currentEmbedValue) {
      this.editMode = true;
    } else {
      this.selectedEmbedTypeIndex = this.EMBED_TYPES.findIndex(type => type.value === this.content.embedType);
      this.currentEmbedValue = this.content.embed || '';
    }
  }

  onEmbedTypeChange({ name, selectedIndex }: { name: string, selectedIndex: number }) {
    if (name === 'type') {
      this.selectedEmbedTypeIndex = selectedIndex;
      this.content.embedType = this.EMBED_TYPES[selectedIndex].value;
    }
  }

  onEmbedChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this.currentEmbedValue = value;
    }
  }

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name) {
      this[name] = value;

      if (value === '') {
        this.content[name] = value;
      }
    }
  }

  onEdit() {
    this.editMode = true;
  }

  onSave() {
    this.editMode = false;

    if (this.currentEmbedValue && this.currentEmbedValue.length > 0) {
      const newContent = {
        ...this.content,
        embedType: this.content.embedType || this.EMBED_TYPES[this.selectedEmbedTypeIndex].value,
        embed: this.currentEmbedValue,
        caption: this.caption,
        credits: this.credits,
      };

      this.update.emit({ index: this.index, content: newContent });
    } else if (!this.content.embed) {
      this.onDelete();
    }
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }
}
