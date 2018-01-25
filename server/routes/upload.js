const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');



router.post('/img', function(req, res){
  console.log(req.fields);
  res.send({
    avatar: req.fields
  })
})




module.exports = router;
