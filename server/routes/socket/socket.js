

function socketFunc(token, user){
  const http = require('../../../index.js').http;

  const SocketModel = require('../../models/socketMessage');


  var io = require('socket.io')(http, {
    path: '/' + token
  });

  // console.log(io)

  io.on('connection', (socket) => {
    console.log('connect')
    socket.on('chat message', (msg) => {
      console.log('chat message', msg)
      // send a private message to the socket with the given id
      io.emit('chat message', msg);

      let messageParams = {
        userId: user._id,
        token: token,
        userName: user.name,
        msg: msg
      }


      SocketModel.create(messageParams)
        .then(function (result){
          console.log('聊天记录写入成功', result);
        })
        .catch(function(err){
          console.log('聊天记录写入失败', err);
        })

    });

    socket.on('disconnection', (reason) => {
      console.log(token + '用户退出')
    })

  });


}

module.exports = {
  socketFunc: socketFunc
}
