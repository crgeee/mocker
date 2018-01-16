import colors from 'colors';
import config from '../config.json';
import mongoose from 'mongoose';

/* eslint-disable no-console */

export default callback => {
  console.log(config.consolePrefix.magenta + 'Connecting to mongodb database...'.magenta);

  // default to production
  let connection = config.env.dev.mongo;
  if (process.env.NODE_ENV == 'production') {
    console.log(config.consolePrefix.magenta + 'NODE_ENV=production set.'.magenta);
    connection = config.env.prod.mongo;
  }

  // connect
  mongoose.connect(connection, {useMongoClient: true});
  let db = mongoose.connection;

  db.on('error', err => {
    console.error(config.consolePrefix.red + 'Error while connecting to DB: ${err.message}'.red);
  });

  db.once('open', () => {
    console.log(config.consolePrefix.green + 'Successfully connected to MongoDB.'.green);
    callback(db);
  });
};
