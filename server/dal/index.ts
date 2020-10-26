import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
require('./models/image');
require('./models/category');
require('./models/keyword');
require('./models/article');
require('./models/homepage-section');
require('./models/views-count');
import { env } from '../environments';

require('mongoose').Promise = require('bluebird');

export default function connectToDatabase() {
  let connectionURI:string;
  if (env.NODE_ENV === 'production' && env.MONGODB_USERNAME) {
    connectionURI = `mongodb://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_APP_NAME}`;
  } else {
    connectionURI = `mongodb://${env.MONGODB_HOST}/${env.MONGODB_APP_NAME}`;
  }

  console.info(`Connect to the database: ${connectionURI}...`);

  const options = { useFindAndModify: false };

  return new Promise((resolve, reject) => {
    mongoose.connect(connectionURI, options, (error: Error) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.info('Connected');
        resolve(mongoose.connection);
      }
    });
  });
}

export function closeConnection() {
  return Promise.resolve(mongoose.disconnect(() => {
    console.info('Mongodb connection is closed');
  }));
}
