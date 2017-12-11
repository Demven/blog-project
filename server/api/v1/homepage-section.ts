import { Router as expressRouter, Request, Response } from 'express';
import * as Promise from 'bluebird';
import HomepageSection from '../../dal/models/homepage-section';
import Article from '../../dal/models/article';
import { authorization, processAuthError } from '../authorization';

const router = expressRouter();

router.get('/', (req, res) => {
  HomepageSection
    .find()
    .sort({ order: 'asc' })
    .populate('category')
    .populate({
      path: 'articles',
      populate: { path: 'image category views' },
      select: '-body',
    })
    .exec()
    .then(sections => {
      if (sections instanceof Array) {
        res.json(sections);
      } else {
        res.sendStatus(500);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/', authorization, processAuthError, (req:Request, res:Response) => {
  const homepageSection = req.body;

  if (!homepageSection.articles || homepageSection.articles.length !== 5) {
    return res.status(400).send('You must provide an array of `articles` to assign to the homepage section');
  } else if (!homepageSection._id) {
    return res.status(400).send('You must provide an `_id` for the homepage section');
  }

  function findHomepageArticles(articles: Array<any>) {
    return Promise.map(articles, (article:any) => Article.findById(article._id));
  }

  return findHomepageArticles(homepageSection.articles)
    .then((articlesFromDb: Array<Object>) => {
      HomepageSection
        .findByIdAndUpdate(homepageSection._id, { $set: { articles: articlesFromDb } })
        .then((updatedHomepageSection:Object) => {
          if (updatedHomepageSection) {
            res.json(updatedHomepageSection);
          } else {
            res.sendStatus(500);
          }
        });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export default router;
