import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../environments';
import clientStorage, { STORAGE_KEY } from '../clientStorage';
import { ArticleModel, DEFAULT_ARTICLE } from '../../pages/article/article';

@Injectable()
export class ArticleDataResolverService implements Resolve<ArticleModel> {
  constructor(private http: HttpClient) {
    this.getArticleDataFromClientStorage = this.getArticleDataFromClientStorage.bind(this);
    this.fetchArticleData = this.fetchArticleData.bind(this);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<ArticleModel> {
    const runningOnClient = typeof window !== 'undefined';
    const previewMode = route.url[0].path === 'article' && route.url[1].path === 'preview';

    let articleDataPromise = Promise.resolve(DEFAULT_ARTICLE);
    if (previewMode) {
      if (runningOnClient) {
        articleDataPromise = this.getArticleDataFromClientStorage();
      }
    } else {
      const pageData = runningOnClient ? (<any>window).pageData : null;
      const slug = route.url[1].path;

      if (pageData && pageData.slug && slug === pageData.slug) {
        articleDataPromise = Promise.resolve(pageData);
      } else {
        articleDataPromise = this.fetchArticleData(route);
      }
    }

    return articleDataPromise;
  }

  getArticleDataFromClientStorage(): Promise<ArticleModel> {
    const articleData: ArticleModel = clientStorage.get(STORAGE_KEY.ARTICLE_DATA) || DEFAULT_ARTICLE;

    return Promise.resolve(articleData);
  }

  fetchArticleData(route: ActivatedRouteSnapshot): Promise<ArticleModel> {
    const slug:string = route.params['slug'];

    return this.http
      .get<ArticleModel>(`${env.WWW_HOST}/api/v1/article/${slug}`)
      .toPromise()
      .catch(error => {
        throw new Error(`API request /api/v1/article/${slug} failed: ${error.message}`);
      });
  }
}
