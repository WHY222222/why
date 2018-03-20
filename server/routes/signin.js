const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const md5 = require('md5');
const cookieParser = require('cookie-parser');
var jwt = require('jwt-simple');
var socketFunc = require('./socket/socket.js').socketFunc;


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
      var expires = 60 * 1000 * 60 * 24 * 7;
      var token = jwt.encode({
        iss: user._id,
        exp: expires
      }, 'whyexist');
      req.session.user = user;
      req.session.token = token;
      res.cookie('token', token, {maxAge: expires});
      res.send({
        user: user,
        data: '欢迎登录'
      })
    })
    .catch(e => {
      res.send(e)
    })
})


router.get('/checkSession', function(req, res){
  console.log('cookie.token == session.token:',req.query.token, req.session.token);
  // console.log(req.session.token);



  if(req.session.token){
    console.log(req.cookies)
    if(req.query.token == req.session.token){
      socketFunc(req.session.token, req.session.user);
      res.send({
        user: req.session.user,
        code: 'SUCCESS'
      })
    }else{
      res.send({
        user: '',
        code: 'FAULT'
      })
    }

  } else{
    res.send({
      user: '',
      code: 'FAULT'
    })
  }



})


router.get('/allUser', function(req, res){
  UserModel.getUserAll()
    .then( result => {
      console.log('获取所有用户', result);
      let userList = JSON.parse(JSON.stringify(result));
      let expires = 60 * 1000 * 60 * 24 * 7;

      for(let i = 0;i < userList.length;i++){
        let token = jwt.encode({
          iss: userList[i]._id,
          exp: expires
        }, 'whyexist');
        userList[i].token = token;
      }
      res.send({
        data: userList
      })
    })
    .catch( err => {
      console.log(err);
    })
})




module.exports = router;
