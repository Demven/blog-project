import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomepageSection } from '../../pages/home/homepage-section/homepage-section';
import { env } from '../../../environments';
import clientStorage, { STORAGE_KEY } from '../clientStorage';

@Injectable()
export class HomepageDataResolverService implements Resolve<Array<HomepageSection>> {
  constructor(private http: HttpClient) {
    this.getHomepageDataFromClientStorage = this.getHomepageDataFromClientStorage.bind(this);
    this.fetchHomepageData = this.fetchHomepageData.bind(this);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Array<HomepageSection>> {
    const runningOnClient = typeof window !== 'undefined';
    const previewMode = route.url.length === 2 && route.url[0].path === 'homepage' && route.url[1].path === 'preview';

    let homepageDataPromise = Promise.resolve([]);
    if (previewMode) {
      if (runningOnClient) {
        homepageDataPromise = this.getHomepageDataFromClientStorage();
      }
    } else {
      homepageDataPromise = this.fetchHomepageData();
    }

    return homepageDataPromise;
  }

  getHomepageDataFromClientStorage(): Promise<Array<HomepageSection>> {
    const homepageData: Array<HomepageSection> = clientStorage.get(STORAGE_KEY.HOMEPAGE_DATA) || [];

    return Promise.resolve(homepageData);
  }

  fetchHomepageData(): Promise<Array<HomepageSection>> {
    return this.http
      .get<Array<HomepageSection>>(`${env.WWW_HOST}/api/v1/homepage-section`)
      .toPromise()
      .catch(error => {
        console.error(error);
        return [];
      });
  }
}
