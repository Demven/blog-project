import 'envkey';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import connectToDatabase from './dal';
import apiV1Router from './api/v1';

connectToDatabase();

const app = express();

const distFolderPath = path.join(__dirname, '../../dist');

app.use(express.static(`${distFolderPath}/client`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

const clientRouter = express.Router();
clientRouter.get('*', (req, res) => {
  res.type('html');
  res.sendFile(`${distFolderPath}/client/index.html`);
});

app.use('/api/v1', apiV1Router);
app.use('/', clientRouter);

const port:number = global.parseInt(process.env.PORT, 10);

console.log('++++++++++++ PORT', port);

app.listen(port, () => {
  global.console.info(`Server started on port:${port}`);
});
