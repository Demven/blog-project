import { Router as expressRouter, Request, Response } from 'express';
import Category from '../../dal/models/category';
import Article from '../../dal/models/article';

const router = expressRouter();

router.get('/', (req:Request, res:Response) => {
  Category
    .find()
    .then(categories => {
      res.json(categories);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get('/:categorySlug/articles', (req:Request, res:Response) => {
  const categorySlug:string = req.params.categorySlug;
  const title = req.query.title || '';
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;

  Category
    .findOne({ slug: categorySlug })
    .then((category:any) => {
      if (category) {
        const query = { 'category': category._id };
        const exclude = { body: 0 };

        if (title) {
          query['title'] = new RegExp(title, 'i');
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
        res.status(404).send('Category with such slug does not exist');
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export default router;
