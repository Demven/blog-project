import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import './article-image.pcss';

class ImageModel {
  url: string;
  description: string;
  credits: string;
}

@Component({
  selector: 'ds-article-image',
  template: `
    <figure class="ArticleImage__container">
      <img
        class="ArticleImage__image"
        src="{{content.url}}"
        alt="{{content.description}}"
      />
      <figcaption class="ArticleImage__image-info">
        <h3 class="ArticleImage__description">{{content.description}}</h3>
        <h3 class="ArticleImage__credits">(by {{content.credits}})</h3>
      </figcaption>
    </figure>
  `,
})
export default class ArticleImage {
  @HostBinding('class.ArticleImage') rootClass: boolean = true;

  @Input() content: ImageModel;
}
