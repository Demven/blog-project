import { Component, HostBinding, Input } from '@angular/core';
import './edit-homepage-section-article.pcss';

export class HomepageSectionArticle {
  title: string;
  slug: string;
  image: {
    url: string;
    description: string;
    credits: string;
  };
}

@Component({
  selector: 'ds-edit-homepage-section-article',
  template: `    
    <img
      class="EditHomepageSectionArticle__image"
      src="{{article.image.url}}"
      alt="{{article.image.description}}"
    />
    <div class="EditHomepageSectionArticle__info">
      <h3 class="EditHomepageSectionArticle__title">{{article.title}}</h3>
      <h4 class="EditHomepageSectionArticle__slug">{{article.slug}}</h4>
    </div>
  `,
})
export default class EditHomepageSectionArticleComponent {
  @HostBinding('class.EditHomepageSectionArticle') rootClass: boolean = true;
  @HostBinding('class.EditHomepageSectionArticle--main') @Input() main: boolean;

  @Input() article: HomepageSectionArticle;
}
