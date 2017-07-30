import { Router as expressRouter } from 'express';
import { Article } from '../../dal/models';

const router = expressRouter();

router.get('/:slug', (req, res) => {
  Article.find()
    .then(article => {
      res.json(article);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export default router;
