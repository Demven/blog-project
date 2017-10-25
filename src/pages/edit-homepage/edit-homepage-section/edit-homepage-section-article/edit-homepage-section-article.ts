import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import * as moment from 'moment';
import axios from 'axios';
import { AutoCompleteItem } from '../../../../edit-common/auto-complete/auto-complete';
import './edit-homepage-section-article.pcss';

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

export class Category {
  title: string;
  slug: string;
  color: string;
}

@Component({
  selector: 'ds-edit-homepage-section-article',
  template: `
    <div class="EditHomepageSectionArticle__image-wrapper">
      <img
        class="EditHomepageSectionArticle__image"
        src="{{article.image.url}}"
        alt="{{article.image.description}}"
      />
    </div>
    
    <div
      class="EditHomepageSectionArticle__info"
      *ngIf="!editMode"
    >
      <h3
        class="EditHomepageSectionArticle__title"
        title="Edit"
        (click)="startEdit()"
      >{{article.title}}</h3>
      
      <h4
        class="EditHomepageSectionArticle__slug"
        title="Edit"
        (click)="startEdit()"
      >{{article.slug}}</h4>

      <div class="EditHomepageSectionArticle__metadata">
        <div class="EditHomepageSectionArticle__publication-date">{{formatPublicationDate()}}</div>
        <div class="EditHomepageSectionArticle__views-count">
          <img
            class="EditHomepageSectionArticle__views-count-icon"
            src="../../../../../public/images/eye.png"
            alt="Eye icon"
          />
          <div class="EditHomepageSectionArticle__views-count-value">{{article.views.count}}</div>
        </div>
        <div
          class="EditHomepageSectionArticle__comments-count"
          *ngIf="false"
        >
          <img
            class="EditHomepageSectionArticle__comments-count-icon"
            src="../../../../../public/images/comments.png"
            alt="Comment icon"
          />
          <div class="EditHomepageSectionArticle__comments-count-value">123</div>
        </div>
      </div>
    </div>

    <div class="EditHomepageSectionArticle__auto-complete">
      <ds-auto-complete
        [name]="'newArticleTitle'"
        [label]="'Article Title'"
        [placeholder]="'Top 5 things to do with Arduino'"
        [value]="newArticleTitle"
        [values]="newArticleValues"
        required
        (change)="onAutoCompleteChange($event)"
        (select)="onAutoCompleteSelect($event)"
        *ngIf="editMode"
      ></ds-auto-complete>
    </div>
  `,
})
export default class EditHomepageSectionArticleComponent {
  @HostBinding('class.EditHomepageSectionArticle') rootClass: boolean = true;
  @HostBinding('class.EditHomepageSectionArticle--main') @Input() main: boolean;
  @HostBinding('class.EditHomepageSectionArticle--edit-mode') editMode: boolean = false;

  @Input() index: number;
  @Input() article: HomepageSectionArticle;
  @Input() category: Category;

  @Output() update: EventEmitter<Object> = new EventEmitter();

  newArticleTitle: string = '';
  newArticleValues: Array<AutoCompleteItem>;
  private suggestedArticles: Array<HomepageSectionArticle>;

  constructor() {
    this.formatPublicationDate = this.formatPublicationDate.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.onAutoCompleteChange = this.onAutoCompleteChange.bind(this);
    this.onAutoCompleteSelect = this.onAutoCompleteSelect.bind(this);
    this.fetchSuggestedArticles = this.fetchSuggestedArticles.bind(this);
    this.processSuggestedArticles = this.processSuggestedArticles.bind(this);
  }

  formatPublicationDate() {
    return moment(this.article.publication_date).format('MMM DD YYYY');
  }

  startEdit() {
    this.editMode = true;
  }

  finishEdit() {
    this.editMode = false;
  }

  onAutoCompleteChange({ name, value }: { name: string, value: string }) {
    if (name) {
      this[name] = value;
      this.fetchSuggestedArticles(value);
    }
  }

  onAutoCompleteSelect({ name, selectedIndex }: { name: string, selectedIndex: number }) {
    if (name) {
      this.newArticleTitle = this.newArticleValues[selectedIndex].text;
      this.update.emit({ index: this.index, article: this.suggestedArticles[selectedIndex] });
    }
  }

  fetchSuggestedArticles(titleInput: string) {
    axios
      .get(`/api/v1/category/${this.category.slug}/articles?title=${titleInput}&limit=5`)
      .then(response => {
        if (response.status === 200) {
          this.processSuggestedArticles(response.data);
        } else {
          console.error('Could not get suggested articles', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  processSuggestedArticles(suggestedArticles: Array<HomepageSectionArticle>) {
    if (suggestedArticles) {
      this.suggestedArticles = suggestedArticles;
      this.newArticleValues = suggestedArticles.map((article:HomepageSectionArticle) => ({
        text: article.title,
        value: article.slug,
      }));
    }
  }
}
