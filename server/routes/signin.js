const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const md5 = require('md5');

const UserModel = require('../models/users');


// POST /signin 用户登录
router.post('/', function(req, res){
  console.log(req.query, req.fields, req.params, req.body)

  const name = req.body.name;
  const password = req.body.password;
  UserModel.getUserByName(name)
    .then(function (user){
      console.log(user);
      if(!user){
        res.send({
          data: '用户不存在'
        })
        return;
      }

      if(md5(password) !== user.password){
        res.send({
          data: '用户名或密码错误'
        })
        return;
      }
      delete user.password;
      req.session.user = user
      res.send({
        user: name,
        data: '欢迎登录'
      })
    })
    .catch(e => {
      res.send(e)
    })
})





module.exports = router;
