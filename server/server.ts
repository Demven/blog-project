import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as Sentry from '@sentry/node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import robots from './middleware/robots';
import generateSitemap from './middleware/sitemap';
import { AppServerModule } from '../src/main.server';
import { env } from './environments';

enableProdMode();

const app = express();
const DIST_FOLDER = path.join(process.cwd(), 'dist');

// The request handler must be the first middleware on the app
Sentry.init({ dsn: env.SENTRY_DSN_SERVER });
app.use(Sentry.Handlers.requestHandler());

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', `${DIST_FOLDER}/client`);

if (env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use(cors({ origin: /\.dmitry-salnikov\.info$/, }));
}

app.get('/sitemap.xml', generateSitemap);
app.get('*.*', express.static(`${DIST_FOLDER}/client`));

app.use(robots());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

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
