var REDDIT;
var snoowrap = require('snoowrap');
var redditOauth = require('reddit-oauth');
var request = require('request');
var _ = require('lodash');

var host, r, username;
if(process.env.PORT){
  host = "https://spa-read.herokuapp.com";
  REDDIT = {
    client_id: process.env.REDDIT_CLIENT_ID,
    client_secret: process.env.REDDIT_CLIENT_SECRET,
    user_agent: process.env.REDDIT_USER_AGENT
  }
} else {
  host = "http://localhost:3000";
  REDDIT = require('./config.js').REDDIT;
}

var redditURL = 'https://www.reddit.com/api/v1/authorize?client_id=' + REDDIT.client_id + '&response_type=code&state=random&redirect_uri=' + host + '/redir&duration=permanent&scope=account,read,identity';

var reddit = new redditOauth({
    app_id: REDDIT.client_id,
    app_secret: REDDIT.client_secret,
    redirect_uri: host + '/redir'
});

module.exports = {

  login: function(req, res, next){
    reddit.oAuthUrl('random', ['account', 'read', 'identity']);
    res.status(200).send(redditURL);
  },

  redir: function(req, res, next){

    reddit.oAuthTokens('random', req.query,
      function (success) {
          r = new snoowrap({
            user_agent: REDDIT.user_agent,
            client_id: REDDIT.client_id,
            client_secret: REDDIT.client_secret,
            refresh_token: reddit.refresh_token
          });

          r.get_me()
          .then(user => {
            username = user.name;
          });
          res.redirect('/#/home');
    });

  },

  front: function(req, res, next){
    r.get_user(username)
    .get_multireddits()
    .then(resp => {
      if(resp.length !== 0){
        var mult = [];
        resp.forEach(function(multi){
          var obj = {};
          obj.name = multi.name;
          obj.sub = [];

          multi.subreddits.forEach(function(sub){
            var url = sub.url.substring(3, sub.url.length-1);
            obj.sub.push(url);
          });
          mult.push(obj);
        });
        var packet = {type: 'multi', body: mult}
        res.status(200).send(packet);
      } else  {
        // Printing a list of the titles on the front page
        r.get_hot()
        .map(post => {
          var obj = {title: post.title, url: post.url, thumbnail: post.thumbnail};
          return obj;
          })
        .then(resp => {
          resp.type = 'hot';
          res.status(200).send(resp);
        });
      }

    });

  },

  multi: function(req, res, next){

    var packet = {};

    req.body.multi.forEach(function(sub, ind, arr){
      r.get_subreddit(sub)
      .get_hot({limit: 5})
      .map(post => {
         var obj = {title: post.title, url: post.url, thumbnail: post.thumbnail};
          return obj;
      })
      .then(resp => {
        packet[sub] = resp;
        if(Object.keys(packet).length === arr.length){
          res.status(200).send(packet);
        }
      })

    });

  }


};