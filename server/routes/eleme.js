const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const superagent = require('superagent');
//const http = require('http');
//const url = requier('url');


router.post('/', function(req, res, next){
  if(req.body.url){
    let phone = req.body.phone;
    let url = req.body.url;
    require('./eleme/request')({
      mobile: phone,
      url: url
    })
    res.send({
      phone: phone,
      url: url
    })
    return;
  }
  getElemeUrl(req, res, next);
  return;

  superagent.get('https://www.pinghongbao.com/go/94108d7211fa32e3')
    .end(function(err, sres){
      if(err){
        next(err);
      }
      console.log(sres);
      let redirectElemeUrl = sres.redirects[0];
      console.log(redirectElemeUrl);
      let $ = cheerio.load(sres.text);


      let scriptData = [];
      let scriptSrc = [];
      //console.log($('script').eq(0));
      $('script').each(function(index, data){
        //let scriptDataItem = JSON.stringify(data);
        scriptData.push($(this).html());
        scriptSrc.push($(this).attr('src'))
      })
      res.send({
        "data": 'SUCCESS',
        "params": req.body,
        "scriptData": scriptData,
        "scriptSrc": scriptSrc,
        "redirectElemeUrl": redirectElemeUrl
      })
    })

  return;


  console.log(req.body, req.query.phone, req.params.phone)
  let phone = req.body.phone;
  let url = req.body.url;
  require('./eleme/request')({
    mobile: phone,
    url: url
  })
  res.send({
    phone: phone,
    url: url
  })
  return;





})


let getElemeUrl = (req, res, next) => {
  let phone = req.body.phone;
  superagent.get('https://www.pinghongbao.com/eleme')
    .end(function(err, sres){
      if(err){
        next(err);
      }
      //console.log(sres);
      //let redirectElemeUrl = sres.redirects[0];
      //console.log(redirectElemeUrl);
      let $ = cheerio.load(sres.text);
      let maxNumArr = [];
      let currentNumArr = [];
      let elemeUrlArr = [];
      let moneyNum = 0;
      $('.pure-u-1').each(function(index, data){
        let maxNumStr = $(this).find('span.ifvc').text();
        //console.log(maxNumStr);
        if(/饿了么拼手气/.test(maxNumStr)){
          let maxNum = maxNumStr.replace(/[^0-9]/ig, '');
          let currentNumStr = $(this).find('.pure-u-1-3 span').text();
          let currentNum = parseInt(currentNumStr);
          if(currentNum < maxNum){
            moneyNum++;
            console.log(moneyNum);
            let currentUrl = $(this).find('.dropdown-menu li').eq(1).children().attr('data-clipboard-text');
            elemeUrlArr.push(currentUrl);
          }
        }

      })
      getMoney(req, res, next, elemeUrlArr, phone, moneyNum);
    })
}

let getMoney = (req, res, next, elemeUrlArr, phone, moneyNum) => {
  for(let i =0;i < elemeUrlArr.length;i++){
    console.log(elemeUrlArr[i])
    superagent.get(elemeUrlArr[i])
      .end(function(err, sres){
        let redirectElemeUrl = sres.redirects[0];
        require('./eleme/request')({
          mobile: phone,
          url: redirectElemeUrl
        })


      })

  }
  res.send({
    code: 'SUCCESS',
    data: moneyNum
  })
}

















module.exports = router;
