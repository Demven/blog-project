import {
  Component,
  Input,
  HostBinding,
  ViewEncapsulation,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../../services/images.service';
import { ScreenSize, ScreenSizeService } from '../../../services/screen-size.service';
import { GQLService } from '../../../services/gql.service';
import { Category } from '../../../types/Category.type';
import { Article } from '../../../types/Article.type';

export const ARTICLE_RECOMMENDATIONS_TYPE = 'recommendation';

class RecommendationsModel {
  recommendationType: RecommendationType;
  category: Category;
}

enum RecommendationType {
  MOST_POPULAR_IN_CATEGORY = 'most-popular-in-category',
}

@Component({
  selector: 'ds-article-recommendations',
  styleUrls: ['./article-recommendations.scss'],
  template: `
    <ds-label
      class="ArticleRecommendations__label"
      [title]="content.category.title"
      [green]="content.category.color === 'green'"
      [blue]="content.category.color === 'blue'"
      [red]="content.category.color === 'red'"
      [small]="true"
    ></ds-label>

    <h3 class="ArticleRecommendations__read-these-too">Read These Too</h3>

    <ul class="ArticleRecommendations__articles">
      <li
        class="ArticleRecommendations__article"
        *ngFor="let article of articles"
      >
        <a
          class="ArticleRecommendations__article-link"
          routerLink="/article/{{article.slug}}"
          target="_blank"
        >
          <img
            class="ArticleRecommendations__article-image"
            [src]="cropImage(article.image.url)"
          />

          <h4 class="ArticleRecommendations__article-title">{{article.title}}</h4>
        </a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ArticleRecommendations implements OnInit {
  @HostBinding('class.ArticleRecommendations') rootClass = true;

  @Input() content:RecommendationsModel;

  articles:Article[] = [];

  constructor (
    public imagesService: ImagesService,
    private gql: GQLService,
    private changeDetector: ChangeDetectorRef,
    public screenSizeService: ScreenSizeService,
    private route: ActivatedRoute,
  ) {
    this.cropImage = this.cropImage.bind(this);
  }

  ngOnInit() {
    this.fetchCategoryArticles();
  }

  fetchCategoryArticles () {
    if (!this.content?.category?.slug) {
      return;
    }

    const currentArticleSlug:string = this.route.snapshot.params['slug'];

    this.gql.query(`
      mostPopularInCategory (
        categorySlug: "${this.content.category.slug}",
        excludeSlug: "${currentArticleSlug}",
        limit:3
      ) {
        _id
        slug
        title
        image {
          url
        }
        views {
          count
        }
      }
    `)
      .then((data:any) => data.mostPopularInCategory as Article[])
      .then((articles:Article[]) => {
        if (articles?.length) {
          this.articles = articles;
          this.changeDetector.detectChanges();
        }
      })
      .catch(console.error);
  }

  cropImage (url:string) {
    const isMobile = this.screenSizeService.isCurrentScreenSize(ScreenSize.MOBILE_ANY);
    const aspectRatio = isMobile
        ? this.imagesService.ASPECT_RATIO.w1h1
        : this.imagesService.ASPECT_RATIO.w3h2;

    return this.imagesService.getCroppedImageUrl(url, aspectRatio, 320);
  }
}
