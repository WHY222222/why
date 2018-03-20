const SocketMessage = require('../lib/mongo').SocketMessage;


module.exports = {
  //创建一条消息
  create: function create (message) {
    return SocketMessage.create(message).exec()
  },

  //通过用户token获取用户消息列表
  getMessageByUserToken: function getUserBuName (token){
    const query = {}
    if (token){
      query.token = token
    }
    return SocketMessage
      .find(query)
      .sort({_id: -1})
      .addCreatedAt()
      .exec()
  },
  //获取所有用户
  getUserAll: function getUserAll(){
    return Message
      .find({})
      .addCreatedAt()
      .exec()
  }
}
