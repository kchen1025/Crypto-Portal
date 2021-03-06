require('dotenv').config({path:__dirname+'/credentials.env'})
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var compiler = webpack(webpackConfig);
var querystring = require('querystring');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//these are used by spotify api, and are specific to my own developer account 
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = process.env.REDIRECT_URI; // Your redirect uri

var stateKey = 'spotify_auth_state';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


// Create express app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var router = express.Router();
// Use the environment's port, 8080 ass the default port
var PORT = process.env.PORT || 8080;


app.use(function(req,res,next){
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers","X-Requested-With, content-type");
  res.setHeader("Access-Control-Allow-Credentials",true);
  
  if(req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'))
    .use(cookieParser());



app.get('/login', function(req,res){
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  //you application requests authorization from spotify
  var scope = 'user-read-private user-read-email';
    
  res.redirect('https://accounts.spotify.com/authorize?'+
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope:scope,
      redirect_uri: redirect_uri,
      state:state
    })
  )
})

//pass in the refresh token to get back a new set of access tokens 
app.post('/token/refresh',function(req,res){
  console.log(req.body.refresh_token)
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form:{
      refresh_token: req.body.refresh_token,
      grant_type: 'refresh_token'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json:true
  };  

  request.post(authOptions, function(error, response, body){
    console.log('access_token',response.body.access_token);
    console.log('scope', response.body.scope);
    console.log('expires in ', response.body.expires_in);

    console.log(body)
  })
})


app.get('/callback',function(req,res){

  //your application requests refresh and access tokens 
  //after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if(state === null || state !== storedState){
    res.redirect('/#'+
      querystring.stringify({
        error: 'state_mismatch'
      }))
  }
  else{
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form:{
        code:code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json:true
    };  

    //once the "code" is received, it can be sent in a post request to retrieve the access and refresh tokens.
    //the original access token will expire in 1 hour
    request.post(authOptions, function(error, response, body){
      console.log('access_token',response.body.access_token);
      console.log('refresh_token',response.body.refresh_token);
      console.log('scope', response.body.scope);
      console.log('expires in ', response.body.expires_in);

      if(!error && response.statusCode === 200){
        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {'Authorization': 'Bearer ' + access_token},
          json: true
        }
        
        //use the access token to access the spotify web api
        request.get(options, function(error, response, body){
          console.log(body)
        })

        // pass the token to browser to make more requests
        res.redirect('/#' + 
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          })
        )
      }
      else{
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          })
        )
      }
    })

  }
})


app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
