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

export const EDIT_ARTICLE_EMBED_TYPE = 'embed';

class EmbedModel {
  type: string;
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
        <ds-embed [embed]="currentEmbedValue || content.embed"></ds-embed>

        <p class="EditArticleEmbed__content" *ngIf="content.embed">{{content.embed.substring(0, 65)}}...</p>
        <p class="EditArticleEmbed__caption" *ngIf="content.caption">{{content.caption}}</p>
        <p class="EditArticleEmbed__credits" *ngIf="content.credits">{{content.credits}}</p>
      </div>

      <div
        class="EditArticleEmbed__form"
        *ngIf="editMode"
      >
        <ds-text-area
          [name]="'embed'"
          [rows]="5"
          [placeholder]="'Paste HTML code here (scripts are supported)'"
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

  public currentEmbedValue: string;
  public caption: string;
  public credits: string;

  constructor() {
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
      this.currentEmbedValue = this.content.embed || '';
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
