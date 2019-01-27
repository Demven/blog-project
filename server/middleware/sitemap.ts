import * as sitemapGenerator from 'sitemap';
import Article from '../dal/models/article';

const CACHE_TIMEOUT = 6 * 60 * 60 * 1000; // 6 hours
const WWW_HOST = `${process.env.WWW_HOST}`;

interface Sitemap {
  toXML(callback: Function): void;
}

class SitemapUrl {
  url: String;
  lastmodISO: String;
  img: SitemapImage;
}

class SitemapImage {
  url: String;
  caption: String;
  license: String;
}

let _sitemap: Sitemap = null;
let _sitemapGeneratedDate: Date = new Date();

function fetchArticles():Promise<SitemapUrl[]> {
  return new Promise((resolve) => {
    Article
      .find({}, 'slug image last_updated')
      .populate('image')
      .exec()
      .then(articles => {
        const urls: SitemapUrl[] = articles.map((article:any) => ({
          url: `${WWW_HOST}/article/${article.slug}`,
          lastmodISO: article.last_updated.toISOString(),
          img: {
            url: article.image ? article.image.url : '',
            caption: article.image ? article.image.description : '',
            license: 'https://creativecommons.org/licenses/by-nc/4.0/'
          }
        }));

        resolve(urls);
      });
  });
}

function createNewSitemap(): Promise<Sitemap> {
  return new Promise((resolve) => {
    fetchArticles()
      .then((urls: SitemapUrl[]) => {
        _sitemap = sitemapGenerator.createSitemap({
          hostname: 'http://example.com',
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
      sitemap.toXML((error, xml) => {
        if (error) {
          next(error);
        }

        res.header('Content-Type', 'application/xml');
        res.send(xml);
      });
    })
    .catch(error => next(error));
}
