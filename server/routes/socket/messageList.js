const express = require('express');
const router = express.Router();

const SocketModel = require('../../models/socketMessage.js');



router.get('/messageList', function(req, res, next){

  let token = req.query.token;

  SocketModel.getMessageByUserToken(token)
    .then(messageList => {
      console.log('读取聊天记录成功', messageList);
      res.send({
        data: messageList,
        code: 'SUCCESS'
      })
    })
    .catch( err => {
      console.log('读取聊天记录失败', err);
      res.send({
        data: '读取聊天in记录失败',
        code: 'FAULT'
      })
    })


})

module.exports = router;
