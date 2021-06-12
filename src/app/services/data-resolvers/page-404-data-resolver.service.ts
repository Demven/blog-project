import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GQLService } from '../gql.service';
import { Page404Data } from '../../types/Page404Data.type';
import { Article } from '../../types/Article.type';

@Injectable()
export class Page404DataResolverService implements Resolve<Page404Data> {
  constructor (private gql:GQLService) {
    this.fetch404PageData = this.fetch404PageData.bind(this);
  }

  resolve (
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot,
  ):Promise<Page404Data> {
    const runningOnClient = typeof window !== 'undefined';

    const pageData = runningOnClient ? (<any>window).pageData : null;

    if (pageData && pageData.type === '404') {
      return Promise.resolve(pageData);
    } else {
      return this.fetch404PageData();
    }
  }

  fetch404PageData ():Promise<Page404Data> {
    return this.fetchArticles()
      .then((articles:Article[]) => ({
        type: '404',
        articles,
      }));
  }

  fetchArticles ():Promise<Article[]> {
    return this.gql.query(`
      popularArticles (limit: 3) {
        title
        slug
        image {
          url
          description
          credits
        }
        category {
          title
          slug
          color
        }
      }
    `)
      .then((data:any) => data.popularArticles as Article[])
      .catch(error => {
        throw new Error(`GraphQL request popularArticles(limit: 3) failed: ${error.message}`);
      });
  }
}
