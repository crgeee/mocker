import api from './api';
import bodyParser from 'body-parser';
import colors from 'colors';
import config from './config.json';
import cors from 'cors';
import express from 'express';
import initializeDb from './db.dev.js';
import middleware from './middleware';
import morgan from 'morgan';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.dev.js';

/* eslint-disable no-console */

const app = express();
const port = process.env.PORT || config.port;

let msg = 'Development (--dev) flag detected';
console.log(msg.yellow);
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  debug: true,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(morgan('dev'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// 3rd party middleware
app.use(cors({exposedHeaders: config.corsHeaders}));

// limits for body parsing
app.use(bodyParser.json({limit: config.bodyLimit}));
app.use(bodyParser.urlencoded({ extended: false }));

// connect to db
initializeDb(db => {
  // internal middleware
  app.use(middleware({config, db}));

  // api router
  app.use('/api', api({config, db}));

  app.listen(port, function() {
    let msg = 'Application started on port ' + port + '!';
    console.log(msg.green);
  });
});
