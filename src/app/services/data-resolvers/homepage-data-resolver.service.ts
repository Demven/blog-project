import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { GQLService } from '../gql.service';
import { HomepageSection } from '../../types/HomepageSection.type';
import { env } from '../../../environments';

@Injectable()
export class HomepageDataResolverService implements Resolve<HomepageSection[]> {
  constructor (private gql:GQLService) {
    this.getHomepageDataFromClientStorage = this.getHomepageDataFromClientStorage.bind(this);
    this.fetchHomepageData = this.fetchHomepageData.bind(this);
  }

  resolve (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Promise<Array<HomepageSection>> {
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

  getHomepageDataFromClientStorage ():Promise<HomepageSection[]> {
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

  fetchHomepageData ():Promise<HomepageSection[]> {
    return this.gql.query(`
      homepageSections {
        category {
          title
          slug
          color
        }
        articles {
          title
          slug
          image {
            url
            description
            credits
          }
          publication_date
        }
        order
      }
    `)
      .then((data:any) => data.homepageSections as HomepageSection[])
      .catch(error => {
        throw new Error(`GraphQL request homepageSections() failed: ${error.message}`);
      });
  }
}
