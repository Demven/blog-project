import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ARTICLE_DATA from '../../temporary-data/article-data';
import './article.pcss';

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
  };
}

@Component({
  selector: 'ds-page-article',
  template: `
    <ds-modal [flat]="true">
      <div class="Article__modal-content">
        <ds-label [title]="article.category.title" [green]="true"></ds-label>

        <div class="Article__hero">
          <img
            class="Article__hero-image"
            src="{{article.image.url}}"
            alt="{{article.image.description}}"
          />
        </div>

        <img class="Article__hidden-hero-image" src="{{article.image.url}}" />
        
        <div class="Article__content-container">
          <div class="Article__content-header"></div>
        </div>
      </div>
    </ds-modal>
  `,
})
export default class Article implements OnInit, OnDestroy {
  @HostBinding('class.Article') rootClass: boolean = true;

  slug: string;
  article: ArticleModel = ARTICLE_DATA;
  private routerParamsListener: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routerParamsListener = this.route.params.subscribe(params => {
      this.slug = params['slug'];
    });
  }

  ngOnDestroy() {
    this.routerParamsListener.unsubscribe();
  }
}
