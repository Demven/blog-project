import 'envkey';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as Sentry from '@sentry/node';
import connectToDatabase from './dal';
import apiV1Router from './api/v1';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import robots from './middleware/robots';
import generateSitemap from './middleware/sitemap';

enableProdMode();

// import Angular compiled app
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main');

const DIST_FOLDER = path.join(process.cwd(), 'dist');

connectToDatabase();

const app = express();

// The request handler must be the first middleware on the app
Sentry.init({ dsn: process.env.SENTRY_DSN_SERVER });
app.use(Sentry.Handlers.requestHandler());

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', `${DIST_FOLDER}/client`);

// app.get('*', (req, res, next) => {
//   console.info(req.path);
//   next();
// });

app.get('*.*', express.static(`${DIST_FOLDER}/client`));
app.get('/sitemap.xml', generateSitemap);

app.use(robots());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use('/api/v1', apiV1Router);
app.get('*', (req, res) => {
  res.render('index', { req });
});

// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use((err, req, res, next) => {
  console.error('Caught error: ', err.message);
  res.status(500).send(`Internal Server Error: ${err.message}`);
});

const port:number = global.parseInt(process.env.PORT, 10) || 8080;
app.listen(port, () => {
  global.console.info(`Server started on port:${port}`);
});
