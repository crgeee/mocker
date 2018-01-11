import colors from 'colors';
import config from './config.json';
import mongoose from 'mongoose';

/* eslint-disable no-console */

export default callback => {
  console.log('Connecting to mongodb database...');

  // default to production
  let connection = config.dev.mongo;

  // connect
  mongoose.connect(connection);
  let db = mongoose.connection;

  //handle mongo error
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Successfully connected to MongoDB...');
    callback(db);
  });
};
