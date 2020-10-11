import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomepageSection } from '../../types/HomepageSection.type';
import { env } from '../../../environments';

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
      const pageData = runningOnClient ? (<any>window).pageData : null;

      if (pageData && pageData instanceof Array) {
        homepageDataPromise = Promise.resolve(pageData);
      } else {
        homepageDataPromise = this.fetchHomepageData();
      }
    }

    return homepageDataPromise;
  }

  getHomepageDataFromClientStorage(): Promise<Array<HomepageSection>> {
    return new Promise(resolve => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `${env.CMS_HOST}/iframe-preview.html`;
      iframe.onload = () => {
        window.addEventListener('message', event => {
          const { homepage } = event.data;
          if (homepage) {
            console.info('Received preview data for the Homepage:', homepage);
            resolve(homepage);
          }
        });

        iframe.contentWindow.postMessage({ pageType: 'homepage' }, '*');
      };
      document.body.appendChild(iframe);
    });
  }

  fetchHomepageData(): Promise<Array<HomepageSection>> {
    return this.http
      .get<Array<HomepageSection>>(`${env.WWW_HOST}/api/v1/homepage-section`)
      .toPromise()
      .catch(error => {
        throw new Error(`API request /api/v1/homepage-section failed: ${error.message}`);
      });
  }
}
