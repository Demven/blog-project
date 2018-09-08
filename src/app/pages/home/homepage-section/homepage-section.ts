import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { HomepageSectionArticle } from './homepage-section-article/homepage-section-article'; // import of model, not component

export class HomepageSection {
  category: {
    title: string;
    slug: string;
    color: string;
  };
  articles: Array<HomepageSectionArticle>;
  views: {
    count: number;
  };
  publication_date: string;
}

@Component({
  selector: 'ds-homepage-section',
  styleUrls: ['./homepage-section.scss'],
  template: `
    <ds-label
      [title]="homepageSection.category.title"
      [blue]="homepageSection.category.color === 'blue'"
      [green]="homepageSection.category.color === 'green'"
      [red]="homepageSection.category.color === 'red'"
    ></ds-label>
    <ds-homepage-section-article
      *ngFor="let article of homepageSection.articles; let i = index"
      [article]="article"
      [main]="i === 0"
    ></ds-homepage-section-article>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class HomepageSectionComponent {
  @HostBinding('class.HomepageSection') rootClass = true;

  @Input() homepageSection: HomepageSection;
}
