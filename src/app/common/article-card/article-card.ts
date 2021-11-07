import {
  AfterViewInit,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ScreenSize, ScreenSizeService } from '../../services/screen-size.service';
import { Article } from '../../types/Article.type';
import { Category } from '../../types/Category.type';

@Component({
  selector: 'ds-article-card',
  styleUrls: ['./article-card.scss'],
  template: `
    <a
      class="ArticleCard__link"
      routerLink="/article/{{article.slug}}"
    >
      <ds-label
        class="ArticleCard__label"
        [title]="category.title"
        [blue]="category.color === 'blue'"
        [green]="category.color === 'green'"
        [red]="category.color === 'red'"
      ></ds-label>

      <article class="ArticleCard__wrapper">
        <img
          class="ArticleCard__image"
          [src]="croppedImage"
          alt="{{article.image.description}}"
        />

        <div class="ArticleCard__info">
          <h2 class="ArticleCard__title">
            {{article.title}}
          </h2>

          <p class="ArticleCard__description">
            {{article.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'}}
          </p>

          <ds-article-info
            class="ArticleCard__date-and-views"
            [publicationDate]="article?.publication_date"
            [views]="article?.views?.count || 0"
          ></ds-article-info>
        </div>
      </article>
    </a>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleCard implements AfterViewInit, OnDestroy {
  @HostBinding('class.ArticleCard') rootClass = true;
  @Input() article:Article;
  @Input() category:Category;

  MAX_DESCRIPTION_LENGTH = 140;

  public croppedImage:string;

  constructor (
    public imagesService:ImagesService,
    public screenSizeService:ScreenSizeService,
  ) {
    this.onResize = this.onResize.bind(this);
    this.cropImage = this.cropImage.bind(this);
  }

  ngAfterViewInit () {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  ngOnDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize () {
    this.croppedImage = this.cropImage();
  }

  cropImage () {
    const isTablet = this.screenSizeService.isCurrentScreenSize(ScreenSize.TABLET_ANY);

    return this.imagesService.getCroppedImageUrl(
      this.article.image.url,
      !isTablet
        ? this.imagesService.ASPECT_RATIO.w16h9
        : this.imagesService.ASPECT_RATIO.w3h2,
    );
  }
}
