import colors from 'colors';
import config from '../config.json';
import mongoose from 'mongoose';

/* eslint-disable no-console */

export default callback => {
  // default to production
  let connection = config.env.dev.mongo;
  if (process.env.NODE_ENV == 'production') {
    console.log(config.consolePrefix.magenta + 'NODE_ENV=production set.'.magenta);
    connection = config.env.prod.mongo;
  }

  // connect
  console.log(config.consolePrefix.magenta + 'Connecting to mongodb database...'.magenta);
  console.log(config.consolePrefix.magenta + 'mongodb connection string: '.magenta + connection.magenta);
  mongoose.Promise = global.Promise;
  mongoose.connect(connection, {useMongoClient: true});
  let db = mongoose.connection;

  db.on('error', err => {
    console.error(config.consolePrefix.red + 'Error while connecting to DB: ${err.message}'.red);
  });

  db.once('open', () => {
    console.log(config.consolePrefix.green + 'Successfully connected to mongodb.'.green);
    callback(db);
  });
};
