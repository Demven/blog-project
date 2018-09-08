import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ds-edit-nav',
  styleUrls: ['./edit-nav.scss'],
  template: `
    <a
      class="EditNav__logo-container"
      [routerLink]="['/']"
    >
      <img
        class="EditNav__logo"
        src="/assets/images/logo.png"
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
  encapsulation: ViewEncapsulation.None,
})
export class EditNav {
  @HostBinding('class.EditNav') rootClass = true;

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
