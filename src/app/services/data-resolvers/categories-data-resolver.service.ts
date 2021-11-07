import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { GQLService } from '../gql.service';
import { Category } from '../../types/Category.type';

@Injectable()
export class CategoriesDataResolverService implements Resolve<Category[]> {
  constructor (private gql:GQLService) {
    this.fetchCategories = this.fetchCategories.bind(this);
  }

  resolve (
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot,
  ):Promise<Category[]> {
    const runningOnClient = typeof window !== 'undefined';
    const pageData = runningOnClient ? (<any>window).pageData : null;

    return pageData?.categories
      ? Promise.resolve(pageData.categories)
      : this.fetchCategories();
  }

  fetchCategories ():Promise<Category[]> {
    return this.gql.query(`
      categories {
        _id
        title
        slug
        color
      }
    `)
      .then((data:any) => data.categories as Category[])
      .catch(error => {
        throw new Error(`GraphQL request categories() failed: ${error.message}`);
      });
  }
}
