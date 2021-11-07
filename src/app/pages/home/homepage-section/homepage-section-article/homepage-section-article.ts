import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ImagesService } from '../../../../services/images.service';
import { ScreenSize, ScreenSizeService } from '../../../../services/screen-size.service';
import { HomepageSectionArticle } from '../../../../types/HomepageSectionArticle.type';

const MAX_MOBILE_WIDTH = 56; // characters
const MAX_SMALL_MOBILE_WIDTH = 38; // characters

@Component({
  selector: 'ds-homepage-section-article',
  styleUrls: ['./homepage-section-article.scss'],
  template: `
    <a
      class="HomepageSectionArticle__link"
      routerLink="/article/{{article.slug}}"
    >
      <img
        class="HomepageSectionArticle__image"
        [src]="imagesService.getCroppedImageUrl(article.image.url, imagesService.ASPECT_RATIO.w3h2)"
        alt="{{article.image.description}}"
      />
      <div class="HomepageSectionArticle__image-shadow"></div>
      <h2 class="HomepageSectionArticle__title">{{title}}</h2>
    </a>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class HomepageSectionArticleComponent implements OnInit {
  @HostBinding('class.HomepageSectionArticle') rootClass = true;
  @HostBinding('class.HomepageSectionArticle--main') @Input() main: boolean;

  @Input() article:HomepageSectionArticle;
  title = '';

  constructor (
    public imagesService: ImagesService,
    private screenSizeService: ScreenSizeService,
  ) {}

  ngOnInit () {
    this.title = this.article.title;

    if (!this.main && typeof window !== 'undefined') {
      this.truncateTitle();
    }
  }

  truncateTitle () {
    const isMobile = this.screenSizeService.isCurrentScreenSize(ScreenSize.MOBILE_ANY);
    const isSmallMobile = this.screenSizeService.isCurrentScreenSize(ScreenSize.MOBILE_SMALL);

    if (isSmallMobile && this.article.title.length > (MAX_SMALL_MOBILE_WIDTH + 4)) {
      this.title = `${this.article.title.substring(0, MAX_SMALL_MOBILE_WIDTH)} ...`;
    } else if (isMobile && this.article.title.length > (MAX_MOBILE_WIDTH + 4)) {
      this.title = `${this.article.title.substring(0, MAX_MOBILE_WIDTH)} ...`;
    }
  }
}
