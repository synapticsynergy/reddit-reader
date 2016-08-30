var requestHandler = require('./requestHandler.js');



module.exports = function (app, express){

  app.get('/api/login', requestHandler.login);
  app.get('/redir', requestHandler.redir);
  app.get('/api/front', requestHandler.front);


  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client','index.html'));
  });

};