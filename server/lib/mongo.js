const config = require('../config/default.js');
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');


//根据id生成创建时间creaed_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results){
    results.forEach (function (item){
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },
  afterFindOne: function (result){
    if(result){
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

//用户表
exports.User = mongolass.model('User', {
  name: { type: 'string'},
  password: { type: 'string'}
})
exports.User.index({ name: 1}, { unique: true}).exec();//根据用户名找到用户，用户名全局唯一

// var Cat = mongolass.model('Cat', { name: {type: 'string'} });
//
// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });


//cnode文章列表 表
// exports.NodeArticle = mongolass.model('NodeArticle', {
//   authorHead: { type: 'string', required: true },//作者头像
//   updated: { type: 'string', required: true },//更新时间
//   title: { type: 'string', required: true },//文章标题
//   ifTop: [Boolean],//是否置顶
//   type: [String],//类别
//   replyNum: [Number],//回复数
//   clickNum: [Number],//点击数
// })
//
// exports.NodeArticle.index({_id: -1}).exec();
