import { Component, HostBinding, Input } from '@angular/core';
import { HomepageSectionArticle } from './edit-homepage-section-article/edit-homepage-section-article';
import './edit-homepage-section.pcss';

export class HomepageSection {
  category: {
    title: string;
    slug: string;
    color: string;
  };
  articles: Array<HomepageSectionArticle>;
}

@Component({
  selector: 'ds-edit-homepage-section',
  template: `
    <ds-label
      [title]="homepageSection.category.title"
      [blue]="homepageSection.category.color === 'blue'"
      [green]="homepageSection.category.color === 'green'"
      [red]="homepageSection.category.color === 'red'"
      [small]="true"
    ></ds-label>

    <ds-edit-homepage-section-article
      *ngFor="let article of homepageSection.articles; let i = index"
      [article]="article"
      [main]="i === 0"
    ></ds-edit-homepage-section-article>
  `,
})
export default class EditHomepageSectionComponent {
  @HostBinding('class.EditHomepageSection') rootClass: boolean = true;

  @Input() homepageSection: HomepageSection;
}
