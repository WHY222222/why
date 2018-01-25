<template lang="html">
  <div class="cnode_wrapper">
    cnode
    <div class="main">
      <div class="header">
        <a href="javascript:;" v-for="(tabItem, tabIndex) in tabList"
          :class="tabItem.type == currentTab ? 'topic-tab topic-tab-active': 'topic-tab'"
          @click="changeTab(tabItem.type)">{{tabItem.tabName}}</a>
      </div>
      <scroller height="-30px;" lock-x  ref="articleScroller" @on-scroll="scrollArticleList" @on-scroll-bottom="onScrollBottom">
        <div class="topic_list">
          <div class="cell" v-for="article in articleList">
            <a href="javascript:;" class="user_avatar pull-left">
              <img :src="article.authorHead" alt="">
            </a>
            <span class="reply_count pull-left">
              <span class="count_of_replies" title="回复数">{{article.replyNum}}</span>
              <span class="count_seperator">/</span>
              <span class="count_of_visits">{{article.clickNum}}</span>
            </span>
            <a href="javascript:;" class="last_time pull-right">
              <img src="" alt="" class="user_small_avatar">
              <span class="last_active_time">{{article.updated}}</span>
            </a>
            <div class="topic_title_wrapper">
              <span class="put_top" v-if="article.ifTop">置顶</span>
              <span class="topiclist-tab" v-if="!article.ifTop && article.type">{{article.type}}</span>
              <a href="javascript:;" class="topic_title">{{article.title}}</a>
            </div>
          </div>
          <load-more tip="loading"></load-more>
        </div>

      </scroller>
      <div class="backtotop" v-show="ifShowToTop" @click="backToTop">回到顶部</div>
    </div>
  </div>
</template>

<script>
import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore } from 'vux';
export default {
  data() {
    return {
      //tabList: [{tabName: '全部'}, {tabName: '精华'}, {tabName: '分享'}, {tabName: '问答'}, {tabName: '招聘'}, {tabName: '客户端测试'}],
      tabList: [],//分类
      currentTab: 'all',//当前分类
      tabListIndex: 0,
      articleList: [],//文章列表
      pageNumber: 1,
      totalPageSize: 1,
      onFetching: false,//用于判断下拉刷新状态
      ifShowToTop: false,//是否显示回到顶部
    }
  },
  components: {
    Scroller,
    Divider,
    Spinner,
    XButton,
    Group,
    Cell,
    LoadMore
  },
  created() {
    this.getTab();//获取tab
    this.getCnodeList();//获取文章列表

  },
  mounted() {

  },
  methods: {
    //获取tab列表
    getTab(){
      this.$http.get('/api/cnodeList/tabs')
        .then(res => {
          //console.log('cnode tab', res);
          this.tabList = res.data;
        })
        .catch(error => {
          console.log(error);
        })
    },
    //获取文章列表
    getCnodeList() {
      let params = {
        tab: this.currentTab,
        pageNumber: this.pageNumber
      };
      this.$http.get('/api/cnodeList', {params: params})
        .then(res => {
          //console.log('cnode list', res);
          let data = res.data;
          let articleList = this.articleList;
          for(let i = 0;i < data.length;i++){
            articleList.push(data[i]);
          }
          this.articleList = articleList;
          this.onFetching = false;//用于判断下拉刷新成功
        })
        .catch(error => {
          console.log(error);
        })
    },
    //tab切换
    changeTab(type) {
      this.currentTab = type;
      this.pageNumber = 1;
      this.articleList = [];
      this.$refs.articleScroller.reset({top: 0});//重置文章列表滑动区域滚动条高度
      this.ifShowToTop = false;
      this.getCnodeList();
    },
    //上下滑动
    scrollArticleList(offset){
      if(offset.top >= 1500){
        this.ifShowToTop = true;
      } else{
        this.ifShowTop = false;
      }
    },
    //下拉刷新
    onScrollBottom(){
      if(this.onFetching){

      } else{
        this.onFetching = true;
        this.pageNumber += 1;
        this.getCnodeList();
        console.log('bottom', this.pageNumber)

      }

    },
    //回到顶部
    backToTop(){
      this.$refs.articleScroller.reset({top: 0});
      this.ifShowToTop = false;
    }

  }
}
</script>

<style lang="less">
.cnode_wrapper{
  background: #e1e1e1;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
  font-size: 14px;
  .header{
    pading: 10px;
    background: #f6f6f6;
    border-radius: 3px 3px 0 0;
    .topic-tab{
      color: #08c;
      padding: 3px 4px;
      border-radius: 3px;
      margin: 0 10px;
    }
    .topic-tab.topic-tab-active{
      background: #08c;
      color: #fff;
    }
  }

  .cell:nth-child(1){
    border-top: none;
  }
  .cell{
    padding-right: 10px;
    background: #FFF;
    border-top: 1px #f0f0f0 solid;
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
    overflow: hidden;
    a{
      color: #778087;
    }
    .pull-left{
      float: left;
    }
    .user_avatar img{
      width: 30px;
      height: 30px;
      border-radius: 3px;
    }
    .reply_count{
      position: absolute;
      left: 85px;
      bottom: 0;
      text-align: left;
      line-height: 2em;
      font-size: 10px;
      width: 70px;
      display: inline-block;
    }
    .count_of_replies{
      color: #9e78c0;
    }
    .count_of_visits{
      font-size: 10px;
      color: #b4b4b4;
    }
    .last_time{
      position: absolute;
      bottom: 0;
      right: 10px;
      font-size: .8em;
      display: inline-block;
      margin-left: 20px;
      color: #777;
      .last_active_time{
        text-align: right;
        min-width: 50px;
        display: inline-block;
        white-space: nowrap;
      }
    }
    .topic_title_wrapper{
      padding-left: 40px;
      white-space: nowrap;
      text-overflow: ellipsis;
      .put_top{
        background: #08c;
        padding: 2px 4px;
        border-radius: 3px;
        -webkit-border-radius: 3px;
        color: #fff;
        font-size: 12px;
      }
      .topiclist-tab{
        background-color: #e5e5e5;
        color: #999;
        padding: 2px 4px;
        border-radius: 3px;
        font-size: 12px;
      }
      .topic_title:visited{
        color: #888;
      }
      .topic_title{
        color: #333;
        font-size: 1em;
        width: 100%;
        max-width: 70%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
        line-height: 30px;
      }
    }

  }
  .backtotop{
    top: 387px;
    right: 0px;
    background: #f5f5f5;
    border: 1px #ccc solid;
    border-right: 0;
    width: 24px;
    color: gray;
    padding: 12px 0 12px 5px;
    position: fixed;
    cursor: pointer;
    text-align: center;
    z-index: 20;
    border-radius: 12px 0 0 12px;
  }

}
</style>
