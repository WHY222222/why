const express = require('express');
const router = express.Router();
const fs = require('fs');
const sha1 = require('sha1');
const md5 = require('md5');


const UserModel = require('../models/users');




router.post('/', function(req, res){
  const name = req.fields.name;
  const password = req.fields.password;
  const repassword = req.fields.repassword;

  let user = {
    name: name,
    password: md5(password)
  }

  console.log(name,password);
  //用户信息写入数据库
  UserModel.create(user)
    .then(function (result){
      //此user是插入mongodb后的值，包含 _id
      user = result.ops[0];
      delete user.password;
      req.session.user = user;
      //req.flash('success', '注册成功');
      console.log('注册成功');
      res.send({
        code: 'SUCCESS',
        user: user
      })
      .catch(function(e){
        res.send(e);
        if(e.message.match('duplicate key')){
          //req.flash('error', '用户名已被占用');
          console.log('注册失败')
          res.send({
            data: '注册失败',
            result: '用户名已经被注册'
          })
        }
      })
    })
})


module.exports = router;
