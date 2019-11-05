import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { ImagesService } from '../../../services/images.service';
import { Article } from '../../../types/Article.type';

@Component({
  selector: 'ds-popular-article',
  styleUrls: ['./popular-article.scss'],
  template: `
    <a
      class="PopularArticle__link"
      routerLink="/article/{{article.slug}}"
    >
      <img
        class="PopularArticle__image"
        [src]="imagesService.getCroppedImageUrl(article.image.url, imagesService.ASPECT_RATIO.w3h2, 640)"
        alt="{{article.image.description}}"
      />
      <div class="PopularArticle__image-shadow"></div>
      <h2 class="PopularArticle__title">{{article.title}}</h2>
    </a>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class PopularArticleComponent {
  @HostBinding('class.PopularArticle') rootClass = true;
  @HostBinding('class.PopularArticle--main') @Input() main: boolean;

  @Input() article: Article;

  constructor(public imagesService: ImagesService) {}
}
