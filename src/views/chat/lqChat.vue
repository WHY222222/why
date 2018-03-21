<template lang="html">
  <div class="chat_wrapper">


    <!-- 聊天窗口 -->
    <div class="">
      <div class="chat_top"  @click="returnLogin">
        <a href="javascript:;" class="chat_return_btn"><span><</span>返回</a>
        <p class="chat_user_name">{{userName}}</p>
      </div>
      <div class="chat_box" id="chatBox" ref="chatBox" height="-210px">
        <div class="">
          <p v-for="message in messageList"
            :class="(message.type == 1 ? 'left_message' : 'right_message') + ' message'">
              {{message.msg}}
              <a href="javascript:;" class="user_head">
                <img src="../../assets/images/server-head.jpg" alt="" v-if="message.type == 1">
                <img src="../../assets/images/user-head.png" alt="" v-if="message.type == 0">
              </a>
          </p>
        </div>

      </div>
      <group class="operation_wrapper">
        <x-textarea class="wait_send_message" title="" v-model="myInpMessage"></x-textarea>
        <x-button class="send_btn" @click.native="sendMessage">发送</x-button>
      </group>
    </div>


  </div>
</template>

<script>
var ws;
var _this;
var selfSendMessage = false;
//var socket;
import { XDialog, Scroller, XTextarea, Group, Cell, XInput, XButton, cookie, TransferDomDirective as TransferDom } from 'vux'

// import VueSocketio from 'vue-socket.io';
const io = require('socket.io-client');
var whySocket = [];
var token = cookie.get('token');

// import io from 'socket.io-client';
// var socket = io('http://localhost', {
//   path: '/chat'
// });



export default {
  data() {
    return{
      messageList: [],
      allUserMessageList: [],
      myInpMessage: '',
      socketId: '',
      userName: '王宏洋',
      userList: [
        {userName: '王宏洋', token: cookie.get('token')}
      ],
      chatOpen: true,
    }
  },
  components: {
    Group,
    XButton,
    Scroller,
    XTextarea,
    XInput
  },
  created(){
    _this = this;


    //socket = io('http://localhost');

    //_this.getCookie()
    //_this.connectWs();
    //_this.getMessage();

    // const socket = io();
    // const adminSocket = io('http://localhost:3000')
  },
  mounted(){
    var windowHeight = window.innerHeight;
    var chatBox = _this.$refs.chatBox;
    console.log(chatBox);
    chatBox.style.height = (windowHeight - 100) + 'px';
    let loginMessage = {
      msg: '客户端登录',
      type: '0'
    }
    _this.getLoginStatus();
    //_this.getMessage();
  },

  methods: {
    //返回登录
    returnLogin(){
      _this.$router.push({path: '/login'});
    },
    //选择用户打开聊天窗口
    selectUserChat(index){
      _this.messageList = _this.allUserMessageList[index];
      _this.chatOpen = true;
      _this.userName = _this.userList[index].userName;
    },
    //确定登录状态
    getLoginStatus(){

      let params =  {
        token: cookie.get('token')
      }
      _this.$http.get('/signin/checkSession', {params: params})
        .then(res => {
          console.log('checkLogin', res);
          if(res.data.code == 'SUCCESS'){
            whySocket = io('http://97.64.83.167:3000', {
              path: '/' + token
            });
            _this.getRecord();
            _this.getMessage();

          } else{
            this.$vux.alert.show({
    				  title: '您还没有登录',
    				  content: '请先登录',
    				  onShow () {
    				    //_this.$router.push({ path: '/login'});
    				  },
    				  onHide () {
    				    console.log('Plugin: I\'m hiding');
                _this.$router.push({ path: '/login'});

    				  }
    				})
          }

        })
        .catch(err => {
          console.log(err)
        })
    },
    //确定昵称
    sureName(){
      if(!userName){
        return;
      } else{

      }
    },
    //聊天记录在最下方
    toBottom(){
      var bottomDiv = document.getElementById('toBottom');
      var chatBox = document.getElementById('chatBox');
      setTimeout(function(){
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 20)

      //console.log(bottomDiv);

      //bottomDiv.scrollIntoView();
    },
    //获取聊天记录
    getRecord(){
      let params = {
        token: cookie.get('token')
      }
      console.log(params)
      _this.$http.get('/socket/messageList', { params: params})
        .then(res => {
          console.log('聊天记录', res);
          let data = res.data.data.reverse();
          for(let i = 0;i < data.length;i++){
            _this.messageList.push(JSON.parse(data[i].msg));
            _this.messageList[i].created_at = data[i].created_at;
          }
          console.log('历史消息', _this.messageList);
          _this.toBottom();
        })
        .catch(err => {
          console.log('err:' , err);
        })
    },
    //获取ws消息列表
    getMessage(){
      whySocket.on('chat message', function(msg){
        console.log('get message: ' , msg);
        if(JSON.parse(msg).type == 0 && selfSendMessage){
          selfSendMessage = false;
          return;
        }
        _this.messageList.push(JSON.parse(msg));
        _this.toBottom();
      })

      whySocket.on('disconnect', function(reason){
        whySocket.open();
      })
    },
    //发送消息
    sendMessage(){
      if(!_this.myInpMessage){
        return;
      }
      console.log('send message')
      let messageData = {
        type: 0,
        msg: _this.myInpMessage
      }
      console.log(JSON.stringify(messageData))
      whySocket.emit('chat message', JSON.stringify(messageData));

      _this.messageList.push(messageData);
      _this.myInpMessage = '';
      _this.toBottom();
      selfSendMessage = true;//判断自己发出了一条消息

      // ws.send(JSON.stringify(messageData));
      // _this.messageList.push(messageData);
      // _this.myInpMessage = '';
    },
    //获取时间
    getTime(){

    },
  }
}
</script>

<style lang="less">
.chat_wrapper{
  width: 100%;
  height: 100%;
  .chat_title{
    text-align: center;
    height: 70px;
    line-height: 70px;

  }
  .user_list{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
    background: #FFF;
    .user_item{
      width: 100%;
      height: 80px;
      border-bottom: 1px #666 solid;
      overflow: hidden;
      .user_head{
        width: 60px;
        height: 60px;
        margin: 10px 20px;
        float: left;
      }
      .user_name{
        text-align: center;
        line-height: 80px;
        font-size: 30px;
        float: left;
      }
      .message_num{
        float: right;
        margin: 15px 20px;
        font-size: 28px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50px;
        background: #FF3B70;
      }
    }
  }

  .chat_top{
    width: 100%;
    height: 60px;
    overflow: hidden;
    line-height: 60px;
    text-align: center;
    position: relative;
    border-bottom: 1px #666 solid;
    background: #282C34;
    color: #FFF;
    .chat_return_btn{
      float: left;
      margin-left: 15px;
      color: #FFF;
      // span{
      //   font-size: 24px;
      // }
    }
    .chat_user_name{
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .chat_box{
    // margin: 20px;
    border: 1px #CCC solid;
    overflow: auto;
    height: 470px;
    .message{
      max-width: 70%;
      float: left;
      border: 1px #999 solid;
      border-radius: 10px;
      margin: 10px;
      padding: 0 10px;
      clear: both;
      position: relative;
      a{
        position: absolute;
        img{
          width: 30px;
          height: 30px;
          border-radius: 30px;
        }
      }
    }
    .left_message{
      float: left;
      margin-left: 40px;
      a{
        left: -35px;
        top: 0px;
      }
    }
    .right_message{
      float: right;
      margin-right: 40px;
      a{
        right: -35px;
        top: 0px;
      }
    }
  }
  .operation_wrapper{
    height: 40px;
    overflow: hidden;
    .weui-cells{
      margin-top: 0;
    }
  }
  .wait_send_message{
    height: 40px;
    width: 80%;
    border: 1px #999 solid;
    float: left;
    overflow: hidden;
  }
  .send_btn{
    height: 40px;
    width: 20%;
    float: left;
  }
}
</style>
