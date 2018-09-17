import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import * as moment from 'moment';
import axios from 'axios';
import { AutoCompleteItem } from '../../../../edit-common/auto-complete/auto-complete';
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

export class Category {
  title: string;
  slug: string;
  color: string;
}

@Component({
  selector: 'ds-edit-homepage-section-article',
  styleUrls: ['./edit-homepage-section-article.scss'],
  template: `
    <div class="EditHomePageSectionArticle__image-wrapper">
      <img
        class="EditHomePageSectionArticle__image"
        [src]="imagesService.getCroppedImageUrl(article.image.url, imagesService.ASPECT_RATIO.w16h9)"
        alt="{{article.image.description}}"
      />
    </div>
    
    <div
      class="EditHomePageSectionArticle__info"
      *ngIf="!editMode"
    >
      <h3
        class="EditHomePageSectionArticle__title"
        title="Edit"
        (click)="startEdit()"
      >{{article.title}}</h3>
      
      <h4
        class="EditHomePageSectionArticle__slug"
        title="Edit"
        (click)="startEdit()"
      >{{article.slug}}</h4>

      <div class="EditHomePageSectionArticle__metadata">
        <div class="EditHomePageSectionArticle__publication-date">{{formatPublicationDate()}}</div>
        <div class="EditHomePageSectionArticle__views-count">
          <img
            class="EditHomePageSectionArticle__views-count-icon"
            src="/assets/images/eye.png"
            alt="Eye icon"
          />
          <div class="EditHomePageSectionArticle__views-count-value">{{article.views.count}}</div>
        </div>
        <div
          class="EditHomePageSectionArticle__comments-count"
          *ngIf="false"
        >
          <img
            class="EditHomePageSectionArticle__comments-count-icon"
            src="/assets/images/comments.png"
            alt="Comment icon"
          />
          <div class="EditHomePageSectionArticle__comments-count-value">123</div>
        </div>
      </div>
    </div>

    <div class="EditHomePageSectionArticle__auto-complete">
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
  encapsulation: ViewEncapsulation.None,
})
export class EditHomePageSectionArticle {
  @HostBinding('class.EditHomePageSectionArticle') rootClass = true;
  @HostBinding('class.EditHomePageSectionArticle--main') @Input() main: boolean;
  @HostBinding('class.EditHomePageSectionArticle--edit-mode') editMode = false;

  @Input() index: number;
  @Input() article: HomepageSectionArticle;
  @Input() category: Category;

  @Output() update: EventEmitter<Object> = new EventEmitter();

  newArticleTitle = '';
  newArticleValues: Array<AutoCompleteItem> = [];
  private suggestedArticles: Array<HomepageSectionArticle>;

  constructor(public imagesService: ImagesService) {
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
