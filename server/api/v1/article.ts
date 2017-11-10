const slug = require('slug');
import * as Promise from 'bluebird';
import { Router as expressRouter, Request, Response } from 'express';
import Article from '../../dal/models/article';
import Image from '../../dal/models/image';
import ViewsCount from '../../dal/models/views-count';
import { authorization, processAuthError } from '../authorization';

const router = expressRouter();

router.get('/:slug', (req:Request, res:Response) => {
  const slug:string = req.params.slug;
  const ignorePageView = req.query.ignore ? req.query.ignore === 'pageview' : false;

  function findArticleAndPopulate(slug: string) {
    return Article
      .findOne({ slug })
      .populate('image category views')
      .exec();
  }

  function incrementViewsCount(article: any) {
    if (!ignorePageView && article) {
      const views = article.views;

      ViewsCount
        .findOneAndUpdate({ _id: views._id }, { $inc: { 'count': 1 } })
        .exec();

      // don't wait for ViewsCount to update
      // just return the article
      article.views.count = views.count + 1;
      return article;
    }

    return article;
  }

  findArticleAndPopulate(slug)
    .then(incrementViewsCount)
    .then(article => {
      if (article) {
        res.json(article);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/', authorization, processAuthError, (req:Request, res:Response) => {
  const article = req.body;
  const createMainImage = () => Image.create(article.image);
  const createViewsCount = () => ViewsCount.create({ count: 0 });

  if (article.slug) {
    // update
    Article
      .findOne({ slug: article.slug })
      .populate('image category')
      .then((articleFromDb: any) => {
        let imagePromise = Promise.resolve(article.image);
        if (articleFromDb.image.url !== article.image.url) {
          imagePromise = Image
            .findOne({ url: article.image.url })
            .then((image:Object) => {
              if (image) {
                // reuse existing image
                console.info('Reuse existing image');
                return image;
              } else {
                console.info('Create a new image');
                return createMainImage();
              }
            });
        }

        imagePromise
          .then((mainImage:Object) => {
            article.image = mainImage;

            (<any>Article)
              .updateOne({ slug: article.slug }, article)
              .then((article:Object) => {
                if (article) {
                  res.json(article);
                } else {
                  res.sendStatus(500);
                }
              })
              .catch((err:Error) => {
                res.status(500).send(err);
              });
          });
      })
      .catch((err:Error) => {
        res.status(500).send(err);
      });
  } else {
    // create
    article.slug = slug(article.title).toLowerCase();

    Promise
      .all([
        createMainImage(),
        createViewsCount(),
      ])
      .then(([mainImage, viewsCount]: [Object, Object]) => {
        article.image = mainImage;
        article.views = viewsCount;

        Article
          .create(article)
          .then(article => {
            if (article) {
              res.json(article);
            } else {
              res.sendStatus(500);
            }
          })
          .catch((err:Error) => {
            res.status(500).send(err);
          });
      });
  }
});

export default router;
