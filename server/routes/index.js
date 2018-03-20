module.exports = function(app){
  app.get('/', function(req, res){
    res.send('index');
  })

  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/cnode', require('./cnodeList'));
  app.use('/upload', require('./upload'));
  app.use('/eleme', require('./eleme'));
  app.use('/train', require('./train/train'));
  app.use('/socket', require('./socket/messageList'));
  // app.use('/translate', require('./translate/translate'));
}
