import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import axios from 'axios';
import { SelectItem } from './select-field/select-field';
import './edit-article.pcss';

class ArticleModel {
  title: string;
  slug: string;
  image: {
    url: string;
    description: string;
    credits: string;
  };
  category: {
    title: string;
    slug: string;
    color: string;
  };
  views: number;
  body: Array<any>;
}

@Component({
  selector: 'ds-page-edit-article',
  template: `
    <ds-svg-sprite></ds-svg-sprite>
    <ds-edit-article-nav></ds-edit-article-nav>
    
    <main class="EditArticlePage__main">
      <div class="EditArticlePage__input-field">
        <ds-text-field
          [name]="'title'"
          [label]="'Title'"
          [placeholder]="'Title'"
          [value]="article.title"
          required
          (change)="onFieldChange($event)"
        ></ds-text-field>
      </div>

      <div class="EditArticlePage__input-field EditArticlePage__hero-image-field">
        <ds-text-field
          [name]="'mainImageUrl'"
          [label]="'Main Image'"
          [placeholder]="'Url'"
          [value]="article.image.url"
          required
          (change)="onMainImageChange($event)"
        ></ds-text-field>
        <img
          class="EditArticlePage__hero-image"
          src="{{article.image.url}}"
          *ngIf="article.image.url"
        />
      </div>
      
      <div class="EditArticlePage__input-field">
        <ds-text-area
          [name]="'description'"
          [label]="'Description'"
          [rows]="4"
          [placeholder]="'Description'"
          required
          [errorText]="'This field cannot be empty. Please fill.'"
          (change)="onFieldChange($event)"
        ></ds-text-area>
      </div>

      <div class="EditArticlePage__input-field">
        <ds-select-field
          [name]="'category'"
          [label]="'Category'"
          [errorText]="''"
          [selectedIndex]="category"
          [values]="categories"
          (select)="onCategoryChange($event)"
        ></ds-select-field>
      </div>

      <ds-edit-article-body
        [nodes]="body"
        (update)="onBodyContentUpdate($event)"
        (remove)="onBodyContentRemove($event)"
      ></ds-edit-article-body>
      
      <div class="EditArticlePage__add-content">
        <ul class="EditArticlePage__content-types">
          <li class="EditArticlePage__content-type" (click)="addContent('text')">Text</li>
          <li class="EditArticlePage__content-type" (click)="addContent('inline-image')">Image</li>
        </ul>
        <button
          class="EditArticlePage__add-button"
          (click)="contentTypesVisible ? hideContentTypes() : showContentTypes()"
        ></button>
      </div>
    </main>
  `,
})
export default class EditArticlePage implements OnInit, OnDestroy {
  @HostBinding('class.EditArticlePage') rootClass: boolean = true;
  @HostBinding('class.EditArticlePage--content-types-visible') contentTypesVisible: boolean = false;

  slug: string;
  article: ArticleModel = {
    title: '',
    slug: '',
    image: {
      url: '',
      description: '',
      credits: '',
    },
    category: {
      title: '', // text
      slug: '', // value
      color: '',
    },
    views: 0,
    body: [],
  };
  body: Array<Object> = [];
  categories: Array<SelectItem> = [
    {
      text: 'Robotics',
      value: 'robotics',
    },
    {
      text: 'Programming',
      value: 'programming',
    },
    {
      text: 'Psychology',
      value: 'psychology',
    },
  ];
  private routerParamsListener: any;
  category: number = 0;

  constructor(private route: ActivatedRoute) {
    this.onArticleRouteInit = this.onArticleRouteInit.bind(this);
    this.fetchArticle = this.fetchArticle.bind(this);
    this.showContentTypes = this.showContentTypes.bind(this);
    this.hideContentTypes = this.hideContentTypes.bind(this);
    this.onBodyContentUpdate = this.onBodyContentUpdate.bind(this);
  }

  ngOnInit() {
    this.routerParamsListener = this.route.params.subscribe(this.onArticleRouteInit);
  }

  ngOnDestroy() {
    this.routerParamsListener.unsubscribe();
  }

  onArticleRouteInit(routeParams: Params) {
    this.slug = routeParams['slug'];

    if (this.slug) {
      this.fetchArticle();
    }
  }

  fetchArticle() {
    axios
      .get(`/api/v1/article/${this.slug}`)
      .then(response => {
        if (response.status === 200) {
          this.article = response.data;
          this.category = this.categories.findIndex(category => category.value === this.article.category.slug);
          this.body = [...this.article.body];
          console.info('article data', this.article);
        } else {
          console.error('Could not get article data', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      console.info(name, value);
      this.article[name] = value;
    }
  }

  onMainImageChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this.article.image = { url: value, description: '', credits: '' };
    }
  }

  onCategoryChange({ name, selectedIndex }: { name: string, selectedIndex: number }) {
    this.category = selectedIndex;
    const selectedCategory = this.categories[selectedIndex];
    this.article.category = { title: '', slug: selectedCategory.value, color: '' };

    console.info('selected', name, selectedIndex, this.article);
  }

  showContentTypes():void {
    this.contentTypesVisible = true;
  }

  hideContentTypes():void {
    this.contentTypesVisible = false;
  }

  addContent(contentType:string): void {
    this.article.body.push({ type: contentType });
    this.body = [...this.article.body];
  }

  onBodyContentUpdate({ index, content }: { index: string, content: object }) {
    if (index && content) {
      console.info('update', index, content);
      this.article.body[+index] = content;
      this.body[+index] = content;
    }
  }

  onBodyContentRemove({ index }: { index: string }): void {
    if (index) {
      this.article.body.splice(+index, 1);
      this.body.splice(+index, 1);

      console.info('body', this.body);
    }
  }
}
