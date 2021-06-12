import createSitemap, { Sitemap, ISitemapItemOptionsLoose } from 'sitemap';
import gql from '../services/gql';
import { env } from '../environments';
import SitemapArticle from '../types/SitemapArticle';

const CACHE_TIMEOUT = 6 * 60 * 60 * 1000; // 6 hours
const WWW_HOST = `${env.WWW_HOST}`;

let _sitemap: Sitemap = null;
let _sitemapGeneratedDate: Date = new Date();

function fetchArticles():Promise<ISitemapItemOptionsLoose[]> {
  return gql(`
    sitemapArticles {
      slug
      image {
        url
        description
        credits
      }
      last_updated
    }
  `)
    .then((data:any) => data.sitemapArticles as SitemapArticle[])
    .then((sitemapArticles:SitemapArticle[]) => {
      const urls:ISitemapItemOptionsLoose[] = sitemapArticles.map((article:SitemapArticle) => ({
        url: `${WWW_HOST}/article/${article.slug}`,
        lastmodISO: (new Date(article.last_updated)).toISOString(),
        img: {
          url: article.image?.url || '',
          caption: article.image?.description || '',
          license: 'https://creativecommons.org/licenses/by-nc/4.0/'
        },
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
      .then((urls:ISitemapItemOptionsLoose[]) => {
        _sitemap = createSitemap({
          hostname: WWW_HOST,
          cacheTime: CACHE_TIMEOUT,
          urls,
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
