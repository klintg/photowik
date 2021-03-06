import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import Jimp from 'jimp';
import uuid from 'node-uuid';
import os from 'os';
import fs from 'fs';
import request from 'request';

/* eslint-disable no-console*/
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes'

const port = process.env.PORT || 7000;
const app = express();
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler))

app.use(logger('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

mongoose.connect('mongodb://localhost:27017/redauth');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

router(app);

let ImageUploader = require('./aws')
app.post('/api/v1/image', function (req, res) {

  let image = ImageUploader({
    data_uri: req.body.data_uri,
    filename: req.body.filename,
    filetype: req.body.filetype
  }).then(onGoodImageProcess, onBadImageProcess);

  function onGoodImageProcess(resp) {
    res.send({
      status: 'success',
      uri: resp
    });
  }

  function onBadImageProcess(resp) {
    res.send({
      status: 'error'
    });
  }

});

app.listen(port, function(err) {
  if(err) {
    console.log(err)
  } else {
    open(`http://localhost:${port}`);
  }
});
