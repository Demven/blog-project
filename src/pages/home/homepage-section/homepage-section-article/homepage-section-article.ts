import { Component, HostBinding, Input } from '@angular/core';
import './homepage-section-article.pcss';

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

@Component({
  selector: 'ds-homepage-section-article',
  template: `
    <a
      class="HomepageSectionArticle__link"
      routerLink="/article/{{article.slug}}"
    >
      <img
        class="HomepageSectionArticle__image"
        src="{{article.image.url}}"
        alt="{{article.image.description}}"
      />
      <div class="HomepageSectionArticle__image-shadow"></div>
      <h2 class="HomepageSectionArticle__title">{{article.title}}</h2>
    </a>
  `,
})
export default class HomepageSectionArticleComponent {
  @HostBinding('class.HomepageSectionArticle') rootClass: boolean = true;
  @HostBinding('class.HomepageSectionArticle--main') @Input() main: boolean;

  @Input() article: HomepageSectionArticle;
}
