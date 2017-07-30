import { Router as router } from 'express';

import articleRouter from './article';
import sectionRouter from './section';

const v1Router = router();

v1Router.use('/article', articleRouter);
v1Router.use('/section', sectionRouter);

export default v1Router;
