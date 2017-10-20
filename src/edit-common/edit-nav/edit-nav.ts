import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import './edit-nav.pcss';

@Component({
  selector: 'ds-edit-nav',
  template: `
    <a
      class="EditNav__logo-container"
      [routerLink]="['/']"
    >
      <img
        class="EditNav__logo"
        src="../../../../public/images/logo.png"
      />
    </a>
    <h1 class="EditNav__title">{{(title && title.length) ? title : 'Create a new article'}}</h1>
    <button
      class="EditNav__publish-button"
      (click)="onPublish()"
    >Publish</button>
    <button
      class="EditNav__preview-button"
      (click)="onPreview()"
    >Preview</button>
  `,
})
export default class EditNav {
  @HostBinding('class.EditNav') rootClass: boolean = true;

  @Input() title: string;

  @Output() publish: EventEmitter<any> = new EventEmitter();
  @Output() preview: EventEmitter<any> = new EventEmitter();

  onPublish() {
    this.publish.emit();
  }

  onPreview() {
    this.preview.emit();
  }
}
