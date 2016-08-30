var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function (app, express){
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static('client'));
  app.use(session({secret: 'cookie', resave: true, saveUninitialized: true}));
};