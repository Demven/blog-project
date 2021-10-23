import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { GQLService } from '../gql.service';
import { env } from '../../../environments';
import { DEFAULT_ARTICLE } from '../../pages/article/article';
import { Article } from '../../types/Article.type';

@Injectable()
export class ArticleDataResolverService implements Resolve<Article> {
  constructor (
    private gql:GQLService,
    private router:Router,
  ) {
    this.getArticleDataFromClientStorage = this.getArticleDataFromClientStorage.bind(this);
    this.fetchArticleData = this.fetchArticleData.bind(this);
  }

  resolve(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot
  ):Promise<Article> {
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

  getArticleDataFromClientStorage ():Promise<Article> {
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

  fetchArticleData (route:ActivatedRouteSnapshot):Promise<Article> {
    const slug:string = route.params['slug'];

    return this.gql.query(`
      article (slug: "${slug}") {
        _id
        title
        description
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
        keywords {
          name
          slug
        }
        views {
          count
        }
        thanks {
          count
        }
        publication_date
        body
      }
    `)
      .then((data:any) => data.article as Article)
      .catch(error => {
        if (error.status === 404) {
          this.router.navigate(['/404']);
          return Promise.reject();
        }

        throw new Error(`GraphQL request article(slug: "${slug}") failed: ${error.message}`);
      });
  }
}
