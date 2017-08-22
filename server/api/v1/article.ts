import { Router as expressRouter, Request, Response } from 'express';
import Article from '../../dal/models/article';

const router = expressRouter();

router.get('/:slug', (req:Request, res:Response) => {
  const slug:string = req.params.slug;

  Article
    .find({ slug })
    .populate('image category')
    .exec()
    .then(articles => {
      if (articles && articles.length) {
        res.json(articles[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export default router;
