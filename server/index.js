import api from './routes';
import bodyParser from 'body-parser';
import colors from 'colors';
import config from '../config.json';
import cors from 'cors';
import express from 'express';
import initializeDb from './db.js';
import middleware from './middleware';
import morgan from 'morgan';
import path from 'path';

/* eslint-disable no-console */

const app = express();
const port = process.env.PORT || config.port;

// logging
app.use(morgan('common'));

// 3rd party middleware
app.use(cors({exposedHeaders: config.corsHeaders}));

// limits for body parsing
app.use(bodyParser.json({limit: config.bodyLimit}));
app.use(bodyParser.urlencoded({extended: false}));

// connect to db
initializeDb(db => {
  // internal middleware
  app.use(middleware({config, db}));

  // api router
  app.use('/', api({config, db}));

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        code: err.code,
        message: err.message,
        stack: err.stack
      }
    });
  });

  app.listen(port, function() {
    let msg = 'Application started on port ' + port + '!';
    console.log(msg.green);
  });
});
