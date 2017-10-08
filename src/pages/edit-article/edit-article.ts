import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params,
} from '@angular/router';
import axios from 'axios';
import { SelectItem } from './select-field/select-field';
import clientStorage, { STORAGE_KEY } from '../../services/clientStorage';
import './edit-article.pcss';

class ArticleModel {
  slug: string;
  title: string;
  description: string;
  image: {
    url: string;
    description: string;
    credits: string;
  };
  category: Category;
  views: number;
  body: Array<any>;
}

class Category {
  title: string;
  slug: string;
  color: string;
  _v: number;
  _id: string;
}

const DEFAULT_ARTICLE:ArticleModel = {
  slug: '',
  title: '',
  description: '',
  image: {
    url: '',
    description: '',
    credits: '',
  },
  category: {
    title: '', // text
    slug: '', // value
    color: '',
    _v: 0,
    _id: '',
  },
  views: 0,
  body: [],
};

@Component({
  selector: 'ds-page-edit-article',
  template: `
    <ds-svg-sprite></ds-svg-sprite>
    <ds-edit-article-nav
      [title]="article.title"
      (publish)="onPublish()"
      (preview)="onPreview()"
    ></ds-edit-article-nav>
    
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
          [value]="article.description"
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
  article: ArticleModel = DEFAULT_ARTICLE;
  body: Array<Object> = [];
  categories: Array<SelectItem> = [];
  private routerParamsListener: any;
  category: number = 0;
  createMode: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.onArticleRouteInit = this.onArticleRouteInit.bind(this);
    this.fetchArticle = this.fetchArticle.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.showContentTypes = this.showContentTypes.bind(this);
    this.hideContentTypes = this.hideContentTypes.bind(this);
    this.onBodyContentUpdate = this.onBodyContentUpdate.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onPreview = this.onPreview.bind(this);
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
      this.createMode = false;
      this.fetchArticle()
        .then(this.fetchCategories);
    } else {
      this.createMode = true;
      this.fetchCategories();
    }
  }

  fetchArticle() {
    return axios
      .get(`/api/v1/article/${this.slug}`)
      .then(response => {
        if (response.status === 200) {
          this.article = response.data;
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

  fetchCategories() {
    return axios
      .get('/api/v1/category')
      .then(response => {
        if (response.status === 200) {
          const categories = response.data;
          this.categories = categories.map((category: Category) => ({
            ...category,
            text: category.title,
            value: category.slug,
          }));

          if (this.createMode) {
            this.article.category = categories[0];
          } else {
            this.category = this.categories.findIndex(category => category.value === this.article.category.slug);
          }

          console.info('categories', this.categories);
        } else {
          console.error('Could not get categories data', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onFieldChange({ name, value }: { name: string, value: string }) {
    if (name) {
      this.article[name] = value;
    }
  }

  onMainImageChange({ name, value }: { name: string, value: string }) {
    if (name && value) {
      this.article.image = { url: value, description: '', credits: '' };
    }
  }

  onCategoryChange({ name, selectedIndex }: { name: string, selectedIndex: number }) {
    if (name) {
      this.category = selectedIndex;
      const selectedCategory: object = {
        ...this.categories[selectedIndex],
        text: undefined,
        value: undefined,
      };
      this.article.category = <Category>selectedCategory;
    }
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

  onPublish() {
    console.info('publish', this.article);
    axios
      .post('/api/v1/article/publish', this.article)
      .then(response => {
        if (response.status === 200) {
          console.info('successfully published', response.data);
          if (this.createMode) {
            const articleSlug = response.data.slug;
            this.router.navigate([`/article/${articleSlug}/edit`]);
          } else {
            this.router.navigate([`/article/${this.article.slug}/edit`]);
          }
        } else {
          console.error('Failed to publish', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPreview() {
    console.info('PREVIEW', this.article);
    clientStorage.save(STORAGE_KEY.ARTICLE_DATA, this.article);
    window.open('http://localhost:8080/article/preview', '_blank');
  }
}
