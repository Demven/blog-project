import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { env } from '../../../environments';
import { DEFAULT_ARTICLE } from '../../pages/article/article';
import { Article } from '../../types/Article.type';

@Injectable()
export class ArticleDataResolverService implements Resolve<Article> {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getArticleDataFromClientStorage = this.getArticleDataFromClientStorage.bind(this);
    this.fetchArticleData = this.fetchArticleData.bind(this);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Article> {
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

  getArticleDataFromClientStorage(): Promise<Article> {
    return new Promise(resolve => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `${env.CMS_HOST}/iframe-preview.html`;
      iframe.onload = () => {
        window.addEventListener('message', event => {
          const { article } = event.data;
          if (article) {
            console.info('Received preview data for the Article:', article);
            resolve(article);
          }
        });

        iframe.contentWindow.postMessage({ pageType: 'article' }, '*');
      };
      document.body.appendChild(iframe);
    });
  }

  fetchArticleData(route: ActivatedRouteSnapshot): Promise<Article> {
    const slug:string = route.params['slug'];

    return this.http
      .get<Article>(`${env.WWW_HOST}/api/v1/article/${slug}`)
      .toPromise()
      .catch(error => {
        if (error.status === 404) {
          this.router.navigate(['/404']);
          return Promise.reject();
        }

        throw new Error(`API request /api/v1/article/${slug} failed: ${error.message}`);
      });
  }
}
