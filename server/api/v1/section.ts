import { Router as expressRouter } from 'express';
import { Section } from '../../dal/models';

const router = expressRouter();

router.get('/', (req, res) => {
  Section.findAll()
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
