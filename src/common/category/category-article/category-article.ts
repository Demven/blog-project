import { Component, HostBinding, Input } from '@angular/core';
import './category-article.pcss';

export class CategoryArticle {
  title: string;
  slug: string;
  image: {
    url: string;
    description: string;
    credits: string;
  };
}

@Component({
  selector: 'ds-category-article',
  template: `
    <a
      class="CategoryArticle__link"
      routerLink="/article/{{article.slug}}"
    >
      <img
        class="CategoryArticle__image"
        src="{{article.image.url}}"
        alt="{{article.image.description}}"
      />
      <div class="CategoryArticle__image-shadow"></div>
      <h2 class="CategoryArticle__title">{{article.title}}</h2>
    </a>
  `,
})
export default class CategoryArticleComponent {
  @HostBinding('class.CategoryArticle') rootClass: boolean = true;
  @HostBinding('class.CategoryArticle--main') @Input() main: boolean;

  @Input() article: CategoryArticle;
}
