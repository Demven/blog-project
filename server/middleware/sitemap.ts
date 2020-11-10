import createSitemap, { Sitemap, ISitemapItemOptionsLoose } from 'sitemap';
import axios from 'axios';
import { env } from '../environments';

const CACHE_TIMEOUT = 6 * 60 * 60 * 1000; // 6 hours
const WWW_HOST = `${env.WWW_HOST}`;

let _sitemap: Sitemap = null;
let _sitemapGeneratedDate: Date = new Date();

function fetchArticles():Promise<ISitemapItemOptionsLoose[]> {
  return axios
    .get(`${env.API_HOST}/v1/article/sitemap`)
    .then((response) => {
      console.info('response', response);
      return response;
    })
    .then(({ data: articles }) => {
      console.info('articles', articles);
      const urls: ISitemapItemOptionsLoose[] = articles.map((article:any) => ({
        url: `${WWW_HOST}/article/${article.slug}`,
        lastmodISO: article.last_updated.toISOString(),
        img: {
          url: article.image ? article.image.url : '',
          caption: article.image ? article.image.description : '',
          license: 'https://creativecommons.org/licenses/by-nc/4.0/'
        }
      }));

      return urls;
    })
    .catch((error: Error) => {
      console.error('Could not get sitemap articles', error.message);
      return [];
    });
}

function createNewSitemap(): Promise<Sitemap> {
  return new Promise((resolve) => {
    fetchArticles()
      .then((urls: ISitemapItemOptionsLoose[]) => {
        _sitemap = createSitemap({
          hostname: WWW_HOST,
          cacheTime: CACHE_TIMEOUT,
          urls
        });

        resolve(_sitemap);
      });
  });
}

function getSitemapGenerator(): Promise<Sitemap> {
  const currentDate = +(new Date());
  const cacheIsStale = currentDate - +_sitemapGeneratedDate > CACHE_TIMEOUT;

  if (!_sitemap || cacheIsStale) {
    _sitemapGeneratedDate = new Date();

    return createNewSitemap();
  } else {
    // reuse existing sitemap
    return Promise.resolve(_sitemap);
  }
}

export default function generateSitemap(req, res, next) {
  getSitemapGenerator()
    .then((sitemap: Sitemap) => {
      const xml = sitemap.toXML();

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    })
    .catch(error => next(error));
}
