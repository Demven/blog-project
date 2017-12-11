import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import ImagesService from '../../../services/images.service';
import './article-image.pcss';

export const ARTICLE_IMAGE_TYPE = 'inline-image';

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
        [src]="imagesService.getCroppedImageUrl(content.url, imagesService.ASPECT_RATIO.w16h9)"
        alt="{{content.description}}"
      />
      <figcaption class="ArticleImage__image-info">
        <h4 class="ArticleImage__description">{{content.description}}</h4>
        <h4 class="ArticleImage__credits">(by {{content.credits}})</h4>
      </figcaption>
    </figure>
  `,
})
export default class ArticleImage {
  @HostBinding('class.ArticleImage') rootClass: boolean = true;

  @Input() content: ImageModel;

  constructor(public imagesService: ImagesService) {}
}
