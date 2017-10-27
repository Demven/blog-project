import { Router as router } from 'express';

import articleRouter from './article';
import homepageSectionRouter from './homepage-section';
import categoryRouter from './category';

const v1Router = router();

v1Router.use('/article', articleRouter);
v1Router.use('/homepage-section', homepageSectionRouter);
v1Router.use('/category', categoryRouter);

export default v1Router;
