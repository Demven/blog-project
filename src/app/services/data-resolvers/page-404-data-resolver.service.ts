import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as BluebirdPromise from 'bluebird';
import { env } from '../../../environments';
import { Page404Data } from '../../types/Page404Data.type';
import { Category } from '../../types/Category.type';
import { Article } from '../../types/Article.type';

@Injectable()
export class Page404DataResolverService implements Resolve<Page404Data> {
  constructor(private http: HttpClient) {
    this.fetch404PageData = this.fetch404PageData.bind(this);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Page404Data> {
    const runningOnClient = typeof window !== 'undefined';

    const pageData = runningOnClient ? (<any>window).pageData : null;

    if (pageData && pageData.type === '404') {
      return Promise.resolve(pageData);
    } else {
      return this.fetch404PageData();
    }
  }

  fetch404PageData(): Promise<Page404Data> {
    return BluebirdPromise.all([
      this.fetchCategories(),
      this.fetchArticles()
    ])
      .then(([categories, articles]: [Category[], Article[]]) => ({
        type: '404',
        categories,
        articles
      }));
  }

  fetchCategories(): Promise<Category[]> {
    return this.http
      .get<Array<Category>>(`${env.WWW_HOST}/api/v1/category`)
      .toPromise()
      .catch(error => {
        throw new Error(`API request /api/v1/category failed: ${error.message}`);
      });
  }

  fetchArticles(): Promise<Article[]> {
    return this.http
      .get<Array<Article>>(`${env.WWW_HOST}/api/v1/article/popular?limit=3`)
      .toPromise()
      .catch(error => {
        throw new Error(`API request /api/v1/article/popular failed: ${error.message}`);
      });
  }
}
