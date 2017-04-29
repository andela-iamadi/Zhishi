require('dotenv').config();

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from './webpack.config.dev';
import open from 'open';
import cookieParser from 'cookie-parser';
var environment = require('./app/js/config/environment/index.js');
import CVar from './app/js/config/CookieVariables.js';

/* eslint-disable no-console */

const port = 8080;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.headers.host.match(/andela.co/)) {
      return res.redirect(environment.zhishiPermanentSite + req.url);
    }
    next();
  });
}

app.use(cookieParser());
app.use((req, res, next) => {
  res.cookie(CVar.apiUrl, process.env.ENGINE_HOST);
  res.cookie(CVar.auth_url, process.env.AUTH_URL);
  res.cookie(CVar.notifyUrl, process.env.ZI_NOTIFY_URL);
  res.cookie(CVar.bugsnag, process.env.BUGSNAG_API);
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://${environment.devHost}:${port}`);
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  }
});
