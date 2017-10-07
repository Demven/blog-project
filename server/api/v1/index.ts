import { Router as router } from 'express';

import articleRouter from './article';
import sectionRouter from './section';
import categoryRouter from './category';

const v1Router = router();

v1Router.use('/article', articleRouter);
v1Router.use('/section', sectionRouter);
v1Router.use('/category', categoryRouter);

export default v1Router;
