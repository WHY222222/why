<template lang="html">
  <div class="chat_wrapper">
    <!--<h1 class="chat_title">Server Chat</h1>-->
    <div class="chat_box" id="chatBox" height="-210px">
      <!-- <div class=""> -->
        <p v-for="message in messageList"
          :class="(message.type == 0 ? 'left_message' : 'right_message') + ' message'">
            {{message.msg}}
            <a href="javascript:;">
              <!-- <img src="'src/assets/images/'+ (message.type == 0 ? 'user' : 'server') +'-head.png'" alt=""> -->
              <!-- <img src="../../assets/images/server-head.png" alt=""> -->
            </a>
        </p>
        <div id="toBottom"></div>
      <!-- </div> -->

    </div>
    <group class="operation_wrapper">
      <x-textarea class="wait_send_message" title="" v-model="myInpMessage"></x-textarea>
      <x-button class="send_btn" @click.native="sendMessage">发送</x-button>
    </group>
  </div>
</template>

<script>
var ws;
var _this;
//var socket;
import { XDialog, Scroller, XTextarea, Group, Cell, XInput, XButton, cookie, TransferDomDirective as TransferDom } from 'vux'

//import io from 'socket.io-client';

export default {
  data() {
    return{
      messageList: [],
      myInpMessage: '',
      socketId: '',
    }
  },
  components: {
    Group,
    XButton,
    Scroller,
    XTextarea
  },
  created(){
    _this = this;
    _this.getMessage();
    _this.getRecord();
    //socket = io('http://localhost');

    //_this.getCookie()
    //_this.connectWs();
    //_this.getMessage();

    // const socket = io();
    // const adminSocket = io('http://localhost:3000')
  },
  mounted(){
    let loginMessage = {
      msg: '客户端登录',
      type: '0'
    }
    //_this.$socket.emit('chat message', JSON.stringify(loginMessage));//在这里出发connect事件
    _this.$socket.on('disconnect', (reson) => {
      _this.getRecord();
    })
  },
  sockets: {
    'chat message': function(msg){
      console.log(msg);
    },
    'connect': function(){ //这里是监听connect事件
      _this.socketId = this.$socket.id;
      console.log(_this.socketId);

    },
    'login': function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }
  },
  methods: {
    //聊天记录在最下方
    toBottom(){
      var bottomDiv = document.getElementById('toBottom');
      var chatBox = document.getElementById('chatBox');
      setTimeout(function(){
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 20)

      console.log(bottomDiv);

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
    //
    ioEmit(){
      let data =  {username: 'why', message: 'why emit'};
      console.log(data)
      // _this.$socket.emit('chat message', JSON.stringify(data));
    },
    //获取cookie
    getCookie(){
      _this.$http.get('/cookie')
        .then(res => {
          console.log(res);
          console.log(document.cookie)
        })
        .catch(err => {
          console.log(err);
        })
    },
    //连接ws
    connectWs(){
      //ws = new WebSocket('ws://97.64.83.167:9090');
      ws = new WebSocket('ws://localhost:9090');
      ws.onopen = function(){
        console.log('wx onopen');

      };

    },
    //获取ws消息列表
    getMessage(){
      _this.$socket.on('chat message', function(msg){
        console.log('get message: ' , msg);
        if(JSON.parse(msg).type == 1){
          return;
        }
        _this.messageList.push(JSON.parse(msg));
        _this.toBottom();
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
      _this.$socket.emit('chat message', JSON.stringify(messageData));
      _this.messageList.push(messageData);
      _this.myInpMessage = '';
      _this.toBottom();

      // ws.send(JSON.stringify(messageData));
      // _this.messageList.push(messageData);
      // _this.myInpMessage = '';
    }
  }
}
</script>

<style lang="less">
.chat_wrapper{
  .chat_title{
    text-align: center;
    height: 70px;
    line-height: 70px;
  }
  .chat_box{
    margin: 20px;
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
        }
      }
    }
    .left_message{
      float: left;
      a{
        left: -35px;
        top: 0px;
      }
    }
    .right_message{
      float: right;
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
