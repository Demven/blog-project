import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { HomepageSectionArticle, Category } from './edit-homepage-section-article/edit-homepage-section-article';

export class HomepageSection {
  category: Category;
  articles: Array<HomepageSectionArticle>;
}

@Component({
  selector: 'ds-edit-homepage-section',
  styleUrls: ['./edit-homepage-section.scss'],
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
      [index]="i"
      [article]="article"
      [category]="homepageSection.category"
      [main]="i === 0"
      (update)="onSectionArticleUpdate($event)"
    ></ds-edit-homepage-section-article>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class EditHomePageSection {
  @HostBinding('class.EditHomePageSection') rootClass = true;

  @Input() index: number;
  @Input() homepageSection: HomepageSection;

  @Output() update: EventEmitter<Object> = new EventEmitter();

  constructor() {
    this.onSectionArticleUpdate = this.onSectionArticleUpdate.bind(this);
  }

  onSectionArticleUpdate({ index, article }: { index: number, article: HomepageSectionArticle }) {
    if (article) {
      const updatedArticles: Array<HomepageSectionArticle> = [...this.homepageSection.articles];
      updatedArticles[index] = article;

      const updatedHomepageSection: HomepageSection = {
        ...this.homepageSection,
        articles: updatedArticles,
      };

      this.update.emit({ index: this.index, homepageSection: updatedHomepageSection });
    }
  }
}
