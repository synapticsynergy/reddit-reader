var REDDIT = require('./config.js').REDDIT;
var snoowrap = require('snoowrap');
var redditOauth = require('reddit-oauth');
var request = require('request');
var _ = require('lodash');

var host, r;
if(process.env.PORT){
  host = "https://spa-read.herokuapp.com";
  REDDIT = {
    client_id: process.env.REDDIT_CLIENT_ID,
    client_secret: process.env.REDDIT_CLIENT_SECRET,
    user_agent: process.env.REDDIT_USER_AGENT
  }
} else {
  host = "http://localhost:3000";
}

var redditURL = 'https://www.reddit.com/api/v1/authorize?client_id=' + REDDIT.client_id + '&response_type=code&state=random&redirect_uri=' + host + '/redir&duration=permanent&scope=account,read';

var reddit = new redditOauth({
    app_id: REDDIT.client_id,
    app_secret: REDDIT.client_secret,
    redirect_uri: host + '/redir'
});

module.exports = {

  login: function(req, res, next){
    reddit.oAuthUrl('random', ['account', 'read']);
    res.redirect(redditURL);
  },

  redir: function(req, res, next){

    reddit.oAuthTokens('random', req.query,
      function (success) {
          // Print the access and refresh tokens we just retrieved
          console.log(reddit.access_token);
          console.log(reddit.refresh_token);

          r = new snoowrap({
            user_agent: REDDIT.user_agent,
            client_id: REDDIT.client_id,
            client_secret: REDDIT.client_secret,
            refresh_token: reddit.refresh_token
          });

    });

    res.redirect('/');
  },

  front: function(req, res, next){
    // Printing a list of the titles on the front page
    r.get_hot()
    .map(post => post.title )
    .then(resp => {
      console.log("response", resp);
      res.status(200).send(resp);
    });

  }

};