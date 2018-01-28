const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, '../../static/img')
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
// var upload = multer({ storage: storage});

//var upload = multer({ dest: '../../static/img'});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/img')
  },
  filename: function (req, file, cb) {
    let originName = file.originalname;
    let originNameArray = originName.split('.');
    let type = originNameArray[originNameArray.length-1];
    cb(null, Date.now() + '.' + type);
  }
})

var upload = multer({ storage: storage })

router.post('/img',upload.single('avatar') , function(req, res){
  console.log('file',req.file);
  console.log('files', req.files);
  console.log(req.body);
  console.log(req.params)

  let obj = req.file;
  let tmp_path = obj.path;
  let new_path = tmp_path + obj.originalname;

  let originName = obj.originalname;//原图片名称
  type = originName.split;


  res.send({
    avatar: new_path
  })
})




module.exports = router;
