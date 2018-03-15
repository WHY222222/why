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
  let fileType = obj.mimeType;
  let to_path = 'F:\\learn\\start\\why\\myLocalUploadImg/' + obj.filename;
  //这个是我服务器上专门放上传的图片的绝对路径
  fs.realpath(tmp_path, function(err, resolvedPath){
    //这里是获取图片的绝对路径
    if(err){
      throw err;
    }
    fs.createReadStream(resolvedPath).pipe(fs.createWriteStream(to_path));
    //这里对图片进行读取和复制操作

    //let picData = fs.readFileSync(tmp_path);
    //let base64Str = picData.toString('base64');
    //let datauri = 'data:image/png;base64,' + base64Str;
    //base64格式
    fs.unlink(resolvedPath);
    //这里删除项目文件夹下的临时图片

    // fs.exists(to_path, (exists) => {
    //   if(!exists){
    //     //当文件不存在时
    //     res.writeHead(404, {"Content-Type": "text/plain"});
    //     res.send({
    //       data: 'This request URL' + toPath + 'was not found on this server'
    //     })
    //     res.end();
    //     return;
    //   } else{
    //     //当文件存在时
    //     fs.readFile(realPath, "binary", (err, file) => {
    //       if(err){
    //         //文件读取出错
    //         res.writeHead(500, {"Content-Type": "text/plain"});
    //         res.end(err);
    //       } else{
    //         //当文件可被读取时，输出文本流
    //         res.writeHead(200, {"Content-Type": fileType});
    //         res.send({
    //           file:
    //         })
    //       }
    //
    //     })
    //   }
    // })




    res.send({
      avatar: datauri
    })
  })

})




module.exports = router;
