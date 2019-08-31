import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
require('./models/image');
require('./models/category');
require('./models/keyword');
require('./models/article');
require('./models/homepage-section');
require('./models/views-count');

require('mongoose').Promise = require('bluebird');

export default function connectToDatabase() {
  let connectionURI:string;
  if (process.env.NODE_ENV === 'production' && process.env.MONGODB_USERNAME) {
    connectionURI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_APP_NAME}`;
  } else {
    connectionURI = `mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_APP_NAME}`;
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
