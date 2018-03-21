<template lang="html">
  <div class="chat_wrapper">
    <!--<h1 class="chat_title">Chat</h1>-->
    <!-- 用户列表 -->
    <div class="user_list" v-show="!chatOpen">
      <!-- <group class="user_item">
        <x-input v-model="userName"></x-input>
        <x-button class="name_btn" @click.native="sureName">进入聊天</x-button>
      </group> -->
      <div class="user_item" v-for="(userItem, index) in userList" @click="selectUserChat(index)">
        <img src="../../assets/images/server-head.jpg" alt="" class="user_head">
        <p class="user_name">{{userItem.name}}</p>
        <!-- <span class="message_num">70</span> -->
      </div>
    </div>

    <!-- 聊天窗口 -->
    <div class="" v-show="chatOpen">
      <div class="chat_top" @click="returnUserList">
        <a href="javascript:;" class="chat_return_btn"><span><</span>返回</a>
        <p class="chat_user_name">{{userName}}</p>
      </div>
      <div class="chat_box" id="chatBox" height="-210px">
        <div class="">
          <p v-for="message in messageList"
            :class="(message.type == 0 ? 'left_message' : 'right_message') + ' message'">
              {{message.msg}}
              <a href="javascript:;" class="user_head">
                <img src="../../assets/images/server-head.jpg" alt="" v-if="message.type == 1">
                <img src="../../assets/images/user-head.png" alt="" v-if="message.type == 0">
              </a>
          </p>
        </div>

      </div>
      <group class="operation_wrapper">
        <x-textarea class="wait_send_message" title="" v-model="myInpMessage" ref="sendInput" @on-focus="onFocus"></x-textarea>
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

// import io from 'socket.io-client';
// var socket = io('http://localhost', {
//   path: '/chat'
// });



export default {
  data() {
    return{
      messageList: [],
      allUserMessageList: [
        []
      ],
      myInpMessage: '',
      socketId: '',
      userName: '刘清',
      userList: [
        {
          userName: '刘清',
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1YTIxNjM0MjhkMmEwYjFlYzg1NTY4OWYiLCJleHAiOjYwNDgwMDAwMH0.hTr31GZkRaHkAhIo5Av76FwrpnCsX4whv4sCwwTnIN0',

        }
      ],
      chatOpen: false,
      userIndex: 0,
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
    var chatBox = document.getElementById('chatBox');
    chatBox.style.height = (windowHeight - 100) + 'px';
    console.log(windowHeight, chatBox.style.height)
    let loginMessage = {
      msg: '客户端登录',
      type: '0'
    }
    // _this.getLoginStatus();
    // _this.getMessage();
    _this.getUserList();
  },

  methods: {
    //输入框选中
    onFocus(){
      // var sendInput = _this.$refs.sendInput;
      // setTimeout(function(){
      //   window.scrollTop = chatBox.scrollHeight;
      // }, 20)
    },
    //返回登录
    returnUserList(){
      _this.$router.push({path: '/login'});
    },
    //获取用户
    getUserList(){
      _this.$http.get('/signin/allUser')
        .then(res => {
          console.log('用户列表', res);
          _this.userList = JSON.parse(JSON.stringify(res.data.data));
          for(let i = 0;i < _this.userList.length;i++){
            whySocket.push('');
          }
        })
    },
    //返回用户列表
    returnUserList(){
      _this.chatOpen = false;
    },
    //选择用户打开聊天窗口
    selectUserChat(index){
      console.log(index)
      _this.messageList = _this.allUserMessageList[index];
      console.log(_this.messageList)
      _this.chatOpen = true;
      _this.userName = _this.userList[index].name;
      let token = _this.userList[index].token;
      _this.getUserMessageList(token);
      _this.userIndex = index;
    },
    //获取用户聊天记录
    getUserMessageList(token){
      let params = {
        token: token
      }
      _this.$http.get('/socket/messageList', {
        params: params
      })
        .then(res => {
          console.log('聊天记录', res);
          let getMessageList = JSON.parse(JSON.stringify(res.data.data)).reverse();
          _this.messageList = [];
          for(let i = 0;i < getMessageList.length;i++){
            _this.messageList.push(JSON.parse(getMessageList[i].msg));
            _this.messageList[i].created_at = getMessageList[i].created_at;
          }
          _this.toBottom();

          _this.getLoginStatus(token);//链接用户的ws
        })
        .catch(err => {
          console.log(err);
        })
    },
    //确定登录状态
    getLoginStatus(token){
      // if(whySocket[_this.userIndex]){
      //   return;
      // }
      whySocket[_this.userIndex] = io('http://97.64.83.167:3000', {
        path: '/' + token
      });
      console.log(whySocket)
      _this.getMessage();
      // let params =  {
      //   token: cookie.get('token')
      // }

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
      _this.$http.get('/record')
        .then(res => {
          console.log('聊天记录', res);
          let data = res.data.data;
          for(let i = 0;i < data.length;i++){
            _this.messageList.push(JSON.parse(data[i]));
          }
          _this.toBottom();
        })
        .catch(err => {
          console.log('err:' , err);
        })
    },
    //获取ws消息列表
    getMessage(){
      whySocket[_this.userIndex].on('chat message', function(msg){
        console.log('get message: ' , msg);
        if(JSON.parse(msg).type == 1 && selfSendMessage){
          selfSendMessage = false;
          return;
        }
        console.log(this.messageList)
        _this.messageList.push(JSON.parse(msg));
        _this.toBottom();
      })

      whySocket[_this.userIndex].on('disconnect', function(reason){
        whySocket[_this.userIndex].open();
      })
    },
    //发送消息
    sendMessage(){
      if(!_this.myInpMessage){
        return;
      }
      console.log('send message')
      let messageData = {
        type: 1,
        msg: _this.myInpMessage
      }
      console.log(JSON.stringify(messageData))
      whySocket[_this.userIndex].emit('chat message', JSON.stringify(messageData));
      _this.messageList.push(messageData);
      _this.myInpMessage = '';
      _this.toBottom();
      selfSendMessage = true;//判断自己发出了一条消息

      // ws.send(JSON.stringify(messageData));
      // _this.messageList.push(messageData);
      // _this.myInpMessage = '';
    }
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
    overflow: auto;
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
    // position: fixed;
    // left: 0;
    // bottom: 0;
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
