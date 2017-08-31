import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import axios from 'axios';
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
    <ds-edit-article-nav></ds-edit-article-nav>
    
    <main class="EditArticlePage__main">
      <ds-text-field
        [name]="'title'"
        [label]="'Title'"
        [placeholder]="'Title'"
        required="true"
      ></ds-text-field>
      
      <ds-text-field
        [name]="'description'"
        [label]="'Description'"
        [placeholder]="'Description'"
        required="true"
        errorText="{{'This field cannot be empty. Please fill.'}}"
      ></ds-text-field>
      
      <ds-text-field
        [name]="'category'"
        [label]="'Category'"
        [placeholder]="'Category'"
        required="true"
      ></ds-text-field>
    </main>
  `,
})
export default class EditArticlePage implements OnInit, OnDestroy {
  @HostBinding('class.EditArticlePage') rootClass: boolean = true;

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
      title: '',
      slug: '',
      color: '',
    },
    views: 0,
    body: [],
  };
  private routerParamsListener: any;

  constructor(private route: ActivatedRoute) {
    this.onArticleRouteInit = this.onArticleRouteInit.bind(this);
    this.fetchArticle = this.fetchArticle.bind(this);
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
          console.info('article data', this.article);
        } else {
          console.error('Could not get article data', response);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}
