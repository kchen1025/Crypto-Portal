var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);



// Create express app
var app = express();
// Use the environment's port, 8080 ass the default port
var PORT = process.env.PORT || 8080;

app.use(function(req, res, next) {
  if(req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(require("webpack-dev-middleware")(compiler,{
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));


app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
