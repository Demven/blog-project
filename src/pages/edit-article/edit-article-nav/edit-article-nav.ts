import {
  Component,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import './edit-article-nav.pcss';

@Component({
  selector: 'ds-edit-article-nav',
  template: `
    <div class="EditArticleNav__logo-container">
      <img
        class="EditArticleNav__logo"
        src="../../../../public/images/logo.png"
      />
    </div>
    <h1 class="EditArticleNav__title">How to make your own personal assistant</h1>
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

  @Output() publish: EventEmitter<any> = new EventEmitter();
  @Output() preview: EventEmitter<any> = new EventEmitter();

  onPublish() {
    this.publish.emit();
  }

  onPreview() {
    this.preview.emit();
  }
}
