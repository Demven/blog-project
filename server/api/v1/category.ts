import { Router as expressRouter } from 'express';
import Category from '../../dal/models/category';

const router = expressRouter();

router.get('/', (req, res) => {
  Category
    .find()
    .then(categories => {
      if (categories instanceof Array) {
        res.json(categories);
      } else {
        res.sendStatus(500);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export default router;
