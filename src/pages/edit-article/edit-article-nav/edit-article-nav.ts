import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import './edit-article-nav.pcss';

@Component({
  selector: 'ds-edit-article-nav',
  template: `
    <a
      class="EditArticleNav__logo-container"
      [routerLink]="['/']"
    >
      <img
        class="EditArticleNav__logo"
        src="../../../../public/images/logo.png"
      />
    </a>
    <h1 class="EditArticleNav__title">{{(title && title.length) ? title : 'Create a new article'}}</h1>
    <button
      class="EditArticleNav__publish-button"
      (click)="onPublish()"
    >Publish</button>
    <button
      class="EditArticleNav__preview-button"
      (click)="onPreview()"
    >Preview</button>
  `,
})
export default class EditArticleNav {
  @HostBinding('class.EditArticleNav') rootClass: boolean = true;

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
