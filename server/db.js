import colors from 'colors';
import config from '../config.json';
import mongoose from 'mongoose';

/* eslint-disable no-console */

export default callback => {
  console.log('Connecting to mongodb database...');

  // default to production
  let connection = config.env.dev.mongo;
  if (process.env.NODE_ENV == 'production') {
    console.log('NODE_ENV=production...');
    connection = config.env.prod.mongo;
  }

  // connect
  mongoose.connect(connection, {useMongoClient: true});
  let db = mongoose.connection;

  db.on('error', err => {
    console.error('Error while connecting to DB: ${err.message}');
  });

  db.once('open', () => {
    console.log('Successfully connected to MongoDB...');
    callback(db);
  });
};
