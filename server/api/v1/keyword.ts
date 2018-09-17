const generateSlug = require('slug');
import { Router as expressRouter, Request, Response } from 'express';
import Keyword from '../../dal/models/keyword';
import Article from '../../dal/models/article';
import { authorization, processAuthError } from '../authorization';

const router = expressRouter();

router.get('/', (req:Request, res:Response) => {
  const search = req.query.search || '';
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;

  const query = {};
  if (search) {
    query['name'] = new RegExp(search, 'i');
  }

  Keyword
    .find(query)
    .limit(limit)
    .exec()
    .then(keywords => {
      res.json(keywords);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:keywordSlug/articles', (req:Request, res:Response) => {
  const keywordSlug:string = req.params.keywordSlug;
  const name = req.query.name || '';
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;

  Keyword
    .findOne({ slug: keywordSlug })
    .then((keyword:any) => {
      if (keyword) {
        const query = { 'keyword': keyword._id };
        const exclude = { body: 0 };

        if (name) {
          query['name'] = new RegExp(name, 'i');
        }

        Article
          .find(query, exclude)
          .limit(limit)
          .populate('image views')
          .exec()
          .then(articles => {
            if (articles) {
              res.json(articles);
            } else {
              res.sendStatus(404);
            }
          })
          .catch(err => {
            res.status(500).send(err);
          });
      } else {
        res.status(404).send('Keyword with such slug does not exist');
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.post('/', authorization, processAuthError, (req:Request, res:Response) => {
  const name = req.body.keyword;

  if (name) {
    const slug = generateSlug(name).toLowerCase();

    Keyword
      .findOne({ slug })
      .then((foundedKeyword: Object) => {
        if (foundedKeyword) {
          res.json(foundedKeyword);
        } else {
          Keyword
            .create({ name, slug })
            .then(createdKeyword => {
              if (createdKeyword) {
                res.json(createdKeyword);
              } else {
                res.sendStatus(500);
              }
            })
            .catch((err:Error) => {
              res.status(500).send(err);
            });
        }
      });
  } else {
    res.sendStatus(400);
  }
});

export default router;
