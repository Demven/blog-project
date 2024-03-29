import {
  Component,
  Input,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ImagesService } from '../../../services/images.service';

export const ARTICLE_IMAGE_TYPE = 'inline-image';

class ImageModel {
  url: string;
  description: string;
  credits: string;
}

@Component({
  selector: 'ds-article-image',
  styleUrls: ['./article-image.scss'],
  template: `
    <figure class="ArticleImage__container">
      <img
        class="ArticleImage__image"
        [src]="imagesService.getCroppedImageUrl(content.url, imagesService.ASPECT_RATIO.w16h9)"
        alt="{{content.description}}"
      />

      <figcaption
        class="ArticleImage__image-info"
        *ngIf="content.description || content.credits"
      >
        <h4 class="ArticleImage__description" *ngIf="content.description">{{content.description}}</h4>
        <h4
          class="ArticleImage__credits"
          *ngIf="content.credits"
          title="Credits"
        >
          by {{content.credits}}
        </h4>
      </figcaption>
    </figure>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleImage implements OnInit {
  @HostBinding('class.ArticleImage') rootClass = true;
  @HostBinding('class.ArticleImage--with-description') withDescription = false;

  @Input() content:ImageModel;

  constructor (public imagesService:ImagesService) {}

  ngOnInit () {
    this.withDescription = this.content && !!this.content.description;
  }
}
