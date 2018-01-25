const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const superagent = require('superagent');
//const Iconv = require('iconv').Iconv;

//const iconv = new Iconv('GBK', 'UTF-8');
let baseUrl = 'https://cnodejs.org/';
router.get('/tabs', function(req, res, next){
  //获取tab
  superagent.get(baseUrl)
    .end(function(err, sres) {
      if(err){
        return next(err);
      }
      //console.log(sres);
      //一般可以先转换为标准unicode格式（有需要就添加：当返回的数据呈现太多\\\u 之类的时）
      //sres=unescape(sres.replace(/\\u/g,"%u"));
      //再对实体符进行转义
      //有x则表示是16进制，$1就是匹配是否有x ，$2就是匹配出的第二个括号捕获到的内容，将$2以对应进制表示转换
      // sres = sres.replace(/&#(x)?(\w+);/g,function($,$1,$2){
      //                 return String.fromCharCode(parseInt($2,$1?16:10));
      //              });
      let $ = cheerio.load(sres.text);
      let tabs = [];
      $('.topic-tab').each(function( index, data){
        let $data = $(data);
        tabs.push({
          tabName: $data.text(),//分类名称
          type: $data.attr('href').split('=')[1],//href中形式为 /tab=all ,取出其中tab切换要用的all
        })
      })
      //console.log(tabs);
      res.send(tabs);
    })

})

router.get('/', function(req, res, next){

  //获取全部内容
  console.log('req', req.query);
  let url = baseUrl;
  for(let i in req.query){
    if(/\?/.test(url)){
      url += '&' + i + '=' + req.query[i];
    } else{
      url += '?' + i + '=' + req.query[i];
    }
  }
  console.log(url);
  superagent.get(url)
    .end(function(err, sres){
      if(err){
        return next(err);
      }
      //console.log(sres);
      let $ = cheerio.load(sres.text);
      let articleList = [];
      //console.log($('.topic_list .cell'))
      $('.cell').each(function(index, data){
        let $data = $(data);
        //console.log($data)
        let articleDetail = {
          authorHead: $data.find('.user_avatar img').attr('src'),//作者头像
          updated: $data.find('.last_time .last_active_time').text(),//更新时间
          title: $data.find('.topic_title').text().replace(/(^\s*)|(\s*$)/g, ""),//文章标题
          ifTop: $data.find('.topic_title_wrapper span').text() == '置顶' ? true : false,//是否置顶
          type: $data.find('.topic_title_wrapper span').text(),//类别
          replyNum: $data.find('.reply_count .count_of_replies').text().replace(/(^\s*)|(\s*$)/g, ""),//回复数
          clickNum: $data.find('.reply_count .count_of_visits').text().replace(/(^\s*)|(\s*$)/g, ""),//点击数
        }
        articleList.push(articleDetail);
        //console.log(articleDetail);
      })
      //console.log(articleList);
      res.send(articleList);
    })
  // if(!req.query.tab || req.query.tab == 'all'){
  //
  // } else{
  //
  // }
})





module.exports = router;
