import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GQLService } from '../gql.service';
import { Article } from '../../types/Article.type';

@Injectable()
export class CategoryArticlesDataResolverService implements Resolve<Article[]> {
  constructor (private gql:GQLService) {
    this.fetchCategoryArticles = this.fetchCategoryArticles.bind(this);
  }

  resolve (
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot,
  ):Promise<Article[]> {
    const runningOnClient = typeof window !== 'undefined';
    const pageData = runningOnClient ? (<any>window).pageData : null;

    const slug:string = route.params['slug'];
    const needToFetch = !pageData?.categoryArticles?.length
      || (pageData?.categoryArticles?.length && pageData.categoryArticles[0]?.category?.slug !== slug);

    return needToFetch
      ? this.fetchCategoryArticles(slug)
      : Promise.resolve(pageData.categoryArticles);
  }

  fetchCategoryArticles (slug:string):Promise<Article[]> {
    return this.gql.query(`
      categoryArticles (categorySlug: "${slug}", articleTitleSearch: "", limit: 100) {
        slug
        title
        description
        category {
          slug
        }
        image {
          url
          description
        }
        views {
          count
        }
        thanks {
          count
        }
        publication_date
      }
    `)
      .then((data:any) => data.categoryArticles as Article[])
      .catch(error => {
        throw new Error(`GraphQL request categoryArticles() failed: ${error.message}`);
      });
  }
}
