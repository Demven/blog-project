import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  EventEmitter,
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params,
} from '@angular/router';
import axios from 'axios';
import { SelectItem } from '../../edit-common/select-field/select-field';
import clientStorage, { STORAGE_KEY } from '../../services/clientStorage';
import { ImagesService } from '../../services/images.service';

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
  views: {
    count: number;
  };
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
  views: {
    count: 0,
  },
  body: [],
};

@Component({
  selector: 'ds-page-edit-article',
  styleUrls: ['./edit-article.scss'],
  template: `
    <ds-svg-sprite></ds-svg-sprite>
    <ds-edit-nav
      [title]="article.title"
      (publish)="onPublish()"
      (preview)="onPreview()"
    ></ds-edit-nav>

    <main class="EditArticlePage__main">
      <div class="EditArticlePage__input-field">
        <ds-text-field
          [name]="'title'"
          [label]="'Title'"
          [placeholder]="'Title'"
          [value]="article.title"
          [required]="true"
          (change)="onFieldChange($event)"
        ></ds-text-field>
      </div>

      <div class="EditArticlePage__input-field EditArticlePage__hero-image-field">
        <ds-text-field
          [name]="'mainImageUrl'"
          [label]="'Main Image'"
          [placeholder]="'Url'"
          [value]="article.image.url"
          [required]="true"
          (change)="onMainImageChange($event)"
        ></ds-text-field>
        <img
          class="EditArticlePage__hero-image"
          [src]="imagesService.getCroppedImageUrl(article.image.url, imagesService.ASPECT_RATIO.w16h9)"
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
        (addContent)="onAddContent($event)"
      ></ds-edit-article-body>

      <ds-edit-article-add-content
        [index]="body.length"
        (addContent)="onAddContent($event)"
      ></ds-edit-article-add-content>

      <ds-toast [messageEmmiter]="toastMessageEmmiter"></ds-toast>
    </main>
  `,
})
export class EditArticlePage implements OnInit, OnDestroy {
  @HostBinding('class.EditArticlePage') rootClass = true;

  slug: string;
  article: ArticleModel = DEFAULT_ARTICLE;
  body: Array<Object> = [];
  categories: Array<SelectItem> = [];
  private routerParamsListener: any;
  category = 0;
  createMode = false;
  toastMessageEmmiter: EventEmitter<string> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, public imagesService: ImagesService) {
    this.onArticleRouteInit = this.onArticleRouteInit.bind(this);
    this.fetchArticle = this.fetchArticle.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.onBodyContentUpdate = this.onBodyContentUpdate.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onMainImageChange = this.onMainImageChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAddContent = this.onAddContent.bind(this);
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
      .get(`/api/v1/article/${this.slug}?ignore=pageview`)
      .then(response => {
        if (response.status === 200) {
          this.article = response.data;
          this.body = [...this.article.body];
          console.info('article data', this.article);
        } else {
          console.error('Could not get article data', response);
          this.toastMessageEmmiter.emit('Could not get article data');
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
        } else {
          console.error('Could not get categories data', response);
          this.toastMessageEmmiter.emit('Could not get categories data');
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

  onAddContent({ index, bodyNode }: { index: number, bodyNode: object }): void {
    this.article.body.splice(index, 0, bodyNode); // insert bodyNode at certain position
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
    }
  }

  onPublish() {
    const token = clientStorage.get(STORAGE_KEY.AUTH_TOKEN);
    axios
      .post('/api/v1/article', this.article, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        if (response.status === 200) {
          console.info('successfully published', response.data);
          this.toastMessageEmmiter.emit('Successfully published');

          if (this.createMode) {
            const articleSlug = response.data.slug;
            this.router.navigate([`/article/${articleSlug}/edit`]);
          } else {
            this.router.navigate([`/article/${this.article.slug}/edit`]);
          }
        } else {
          console.error('Failed to publish', response);
          this.toastMessageEmmiter.emit('Failed to publish the article');
        }
      })
      .catch(error => {
        console.error(error);
        this.toastMessageEmmiter.emit('Failed to publish the article');
      });
  }

  onPreview() {
    clientStorage.save(STORAGE_KEY.ARTICLE_DATA, this.article);
    window.open('/article/preview', '_blank');
  }
}
