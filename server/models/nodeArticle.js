const marked = require('marked');
const NodeArticle = require('../lib/mongo').NodeArticle;

module.exports = {
  //创建一篇文章
  create: function create (article){
    return NodeArticle.create(article).exec();
  },
  //通过文章id获取一篇文章
  getArticleById: function getArticelById(articleId){
    return NodeArticle
      .findOne({ _id: articleId})
      .addCreatedAt()
      .exec()
  },
  //按创建时间降序获得所有用户文章或者某个特定用户的文章
  getArticles: function getArticles (){
    return NodeArticle
      .find({})
      .sort({_id: -1})
      .addCreatedAt()
      .exec()
  },
  //通过文章id给查看次数加1
  incPv: function incPv(articleId){
    return NodeArticle
      .update({_id: articleId}, { $inc: { clickNum: 1}})
  }
}
