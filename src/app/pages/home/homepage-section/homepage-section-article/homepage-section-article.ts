import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ImagesService } from '../../../../services/images.service';

export class HomepageSectionArticle {
  title: string;
  slug: string;
  image: {
    url: string;
    description: string;
    credits: string;
  };
  views: {
    count: number;
  };
  publication_date: string;
}

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

  @Input() article: HomepageSectionArticle;
  title = '';

  constructor(public imagesService: ImagesService) {}

  ngOnInit() {
    this.title = this.article.title;

    if (!this.main) {
      this.truncateTitle();
    }
  }

  truncateTitle() {
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth <= 690;
    const isSmallMobile = viewportWidth <= 320;

    if (isSmallMobile && this.article.title.length > (MAX_SMALL_MOBILE_WIDTH + 4)) {
      this.title = `${this.article.title.substring(0, MAX_SMALL_MOBILE_WIDTH)} ...`;
    } else if (isMobile && this.article.title.length > (MAX_MOBILE_WIDTH + 4)) {
      this.title = `${this.article.title.substring(0, MAX_MOBILE_WIDTH)} ...`;
    }
  }
}
