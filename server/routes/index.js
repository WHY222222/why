module.exports = function(app){
  app.get('/', function(req, res){
    res.send('index');
  })

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/cnodeList', require('./cnodeList'));
  app.use('/upload', require('./upload'));
}
