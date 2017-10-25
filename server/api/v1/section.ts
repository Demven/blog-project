import { Router as expressRouter } from 'express';
import HomepageSection from '../../dal/models/homepage-section';

const router = expressRouter();

router.get('/', (req, res) => {
  HomepageSection
    .find()
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

export default router;
