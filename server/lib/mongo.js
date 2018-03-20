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


//聊天消息列表
exports.SocketMessage = mongolass.model('SocketMessage', {
  userId: { type: Mongolass.Types.ObjectId, required: true },
  token: { type: 'string', required: true },
  userName: { type: 'string' },
  msg: { type: 'string', required: true}
})

exports.SocketMessage.index({ userId: 1, _id: -1}).exec()//按创建时间的降序查看用户的消息列表
