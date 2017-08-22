import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
require('./models/image');
require('./models/category');
require('./models/article');
require('./models/homepage-section');

require('mongoose').Promise = require('bluebird');

export default function connectToDatabase() {
  const options = {
    useMongoClient: true,
    promiseLibrary: Promise,
  };

  let connectionURI:string;
  if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionURI = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;
  } else {
    connectionURI = 'mongodb://localhost/blog';
  }

  console.info(`Connect to database: ${connectionURI}...`);

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
