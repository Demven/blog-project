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

export const EDIT_ARTICLE_VIDEO_TYPE = 'video';

class VideoModel {
  type: string;
  videoType: string;
  video: string;
  caption: string;
  credits: string;
}

@Component({
  selector: 'ds-edit-article-video',
  styleUrls: ['./edit-article-video.scss'],
  template: `
    <div class="EditArticleVideo__wrapper">
      <div
        class="EditArticleVideo__preview"
        (click)="onEdit()"
        *ngIf="!editMode"
      >
        <ds-embed
          [className]="'EditArticleVideo__' + VIDEO_TYPES[selectedVideoTypeIndex].value"
          [embed]="currentVideoValue || content.video"
        ></ds-embed>

        <p class="EditArticleVideo__content" *ngIf="content.video">{{content.video.substring(0, 65)}}...</p>
        <p class="EditArticleVideo__caption" *ngIf="content.caption">{{content.caption}}</p>
        <p class="EditArticleVideo__credits" *ngIf="content.credits">{{content.credits}}</p>
      </div>

      <div
        class="EditArticleVideo__form"
        *ngIf="editMode"
      >
        <div class="EditArticleVideo__select">
          <ds-select-field
            [name]="'type'"
            [label]="'Type'"
            [selectedIndex]="selectedVideoTypeIndex"
            [values]="VIDEO_TYPES"
            (select)="onVideoTypeChange($event)"
          ></ds-select-field>
        </div>
        <ds-text-area
          [name]="'content'"
          [rows]="5"
          [placeholder]="'Paste video embed code here (scripts are supported)'"
          [value]="currentVideoValue || content.video"
          required
          (change)="onVideoChange($event)"
        ></ds-text-area>

        <div class="EditArticleVideo__caption-field">
          <ds-text-area
            [name]="'caption'"
            [label]="'Caption'"
            [rows]="3"
            [placeholder]="'Caption'"
            [value]="caption || content.caption"
            (change)="onFieldChange($event)"
          ></ds-text-area>
        </div>

        <div class="EditArticleVideo__credits-field">
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

    <div class="EditArticleVideo__actions">
      <button
        class="EditArticleVideo__action EditArticleVideo__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleVideo__action EditArticleVideo__done"
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
export class EditArticleVideo implements OnInit {
  @HostBinding('class.EditArticleVideo') rootClass = true;
  @HostBinding('class.EditArticleVideo--edit-mode') editMode = false;

  @Input() index: string;
  @Input() content: VideoModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;

  public VIDEO_TYPES: Array<SelectItem> = [
    { text: 'Youtube', value: 'youtube' },
    { text: 'Vimeo', value: 'vimeo' },
    { text: 'Facebook', value: 'facebook' },
    { text: 'Twitter', value: 'twitter' },
    { text: 'Raw', value: 'raw' },
  ];

  public currentVideoValue: string;
  public selectedVideoTypeIndex = 0;
  public caption: string;
  public credits: string;

  constructor() {
    this.onVideoChange = this.onVideoChange.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  ngOnInit() {
    if (!this.content.video && !this.currentVideoValue) {
      this.editMode = true;
    } else {
      this.selectedVideoTypeIndex = this.VIDEO_TYPES.findIndex(type => type.value === this.content.videoType);
      this.currentVideoValue = this.content.video || '';
    }
  }

  onVideoTypeChange({ name, selectedIndex }: { name: string, selectedIndex: number }) {
    if (name === 'type') {
      this.selectedVideoTypeIndex = selectedIndex;
      this.content.videoType = this.VIDEO_TYPES[selectedIndex].value;
    }
  }

  onVideoChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this.currentVideoValue = value;
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

    if (this.currentVideoValue && this.currentVideoValue.length > 0) {
      const newContent = {
        ...this.content,
        videoType: this.content.videoType || this.VIDEO_TYPES[this.selectedVideoTypeIndex].value,
        video: this.currentVideoValue,
        caption: this.caption,
        credits: this.credits,
      };

      this.update.emit({ index: this.index, content: newContent });
    } else if (!this.content.video) {
      this.onDelete();
    }
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }
}
