import api from './routes';
import bodyParser from 'body-parser';
import colors from 'colors';
import config from '../config.json';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import initializeDb from './db.js';
import middleware from './middleware';
import morgan from 'morgan';
import path from 'path';

/* eslint-disable no-console */
console.log(config.consolePrefix.magenta + 'Starting up server application.'.magenta);

const server = express();
const port = process.env.PORT || config.port;
const sslPort = config.sslPort;

// logging
server.use(morgan('common'));

// 3rd party middleware
server.use(cors({exposedHeaders: config.corsHeaders}));

// limits for body parsing
server.use(bodyParser.json({limit: config.bodyLimit}));
server.use(bodyParser.urlencoded({extended: false}));

// ssl
let sslOptions = {
  key: fs.readFileSync('./keys/key.pem'),
  cert: fs.readFileSync('./keys/cert.pem'),
  passphrase: '12345678',
  // requestCert: false,
  // rejectUnauthorized: false
};

// connect to db
initializeDb(db => {
  // internal middleware
  server.use(middleware({config, db}));

  // api router
  server.use('/', api({config, db}));

  server.use((req, res, next) => {
    const err = new Error(config.consolePrefix + 'Not Found');
    err.status = 404;
    next(err);
  });

  server.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        code: err.code,
        message: err.message,
        stack: err.stack
      }
    });
  });

  server.listen(port, function() {
    let msg = config.consolePrefix + 'HTTP server started on localhost:' + port + '.';
    console.log(msg.green);
  });

  const sslServer = https.createServer(sslOptions, server);
  sslServer.listen(sslPort, function() {
    let msg2 = config.consolePrefix + 'HTTPS server started at localhost:' + sslPort + '.';
    console.log(msg2.green);
  });
});
