import {
  Component,
  Input,
  Output,
  OnInit,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import { ICON } from '../../../common/svg-sprite/svg-sprite';
import ImagesService from '../../../services/images.service';
import './edit-article-image.pcss';

export const EDIT_ARTICLE_IMAGE_TYPE = 'inline-image';

class ImageModel {
  type: string;
  url: string;
  description: string;
  credits: string;
}

@Component({
  selector: 'ds-edit-article-image',
  template: `
    <div class="EditArticleImage__wrapper">
      <img
        class="EditArticleImage__image"
        [src]="imagesService.getCroppedImageUrl(url || content.url, imagesService.ASPECT_RATIO.w16h9)"
        *ngIf="url || content.url"
      />
      
      <div
        class="EditArticleImage__content"
        (click)="onEdit()"
        *ngIf="!editMode"
      >
        <p class="EditArticleImage__url">{{url || content.url}}</p>
        <p class="EditArticleImage__description">{{description || content.description}}</p>
        <p class="EditArticleImage__credits">{{credits || content.credits}}</p>
      </div>

      <div
        class="EditArticleImage__url-field"
        *ngIf="editMode"
      >
        <ds-text-field
          [name]="'url'"
          [label]="'URL'"
          [placeholder]="'http://images.com/robot.jpg'"
          [value]="url || content.url"
          (change)="onFieldChange($event)"
          [required]="true"
        ></ds-text-field>
      </div>

      <div
        class="EditArticleImage__description-field"
        *ngIf="editMode"
      >
        <ds-text-area
          [label]="'Description'"
          [name]="'description'"
          [rows]="3"
          [placeholder]="'Description'"
          [value]="description || content.description"
          (change)="onFieldChange($event)"
        ></ds-text-area>
      </div>

      <div
        class="EditArticleImage__credits-field"
        *ngIf="editMode"
      >
        <ds-text-field
          [name]="'credits'"
          [label]="'Credits'"
          [placeholder]="'Google Photos'"
          [value]="credits || content.credits"
          (change)="onFieldChange($event)"
        ></ds-text-field>
      </div>
    </div>
    
    <div class="EditArticleImage__actions">
      <button
        class="EditArticleImage__action EditArticleImage__delete"
        (click)="onDelete()"
      >
        <ds-icon [name]="ICON_CLOSE"></ds-icon>
      </button>
      <button
        class="EditArticleImage__action EditArticleImage__done"
        (click)="onSave()"
        *ngIf="editMode"
      >
        <ds-icon [name]="ICON_DONE"></ds-icon>
      </button>
    </div>
  `,
})
export default class EditArticleImage implements OnInit {
  @HostBinding('class.EditArticleImage') rootClass: boolean = true;
  @HostBinding('class.EditArticleText--edit-mode') editMode: boolean = false;

  @Input() index: string;
  @Input() content: ImageModel;

  @Output() update: EventEmitter<Object> = new EventEmitter();
  @Output() remove: EventEmitter<Object> = new EventEmitter();

  public url: string;
  public description: string;
  public credits: string;

  public ICON_DONE: string = ICON.DONE;
  public ICON_CLOSE: string = ICON.CLOSE;

  constructor(public imagesService: ImagesService) {
    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  ngOnInit() {
    if (!this.content.url && !this.url) {
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

    if (this.url && this.url.length > 0) {
      const content = {
        ...this.content,
        url: this.url,
        description: this.description,
        credits: this.credits,
      };
      this.update.emit({ index: this.index, content });
    } else if (!this.content.url) {
      this.onDelete();
    }
  }

  onDelete() {
    this.remove.emit({ index: this.index });
  }
}
