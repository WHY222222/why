<template lang="html">
  <div class="chat_wrapper">
    <h1 class="chat_title">My Chat</h1>
    <div class="chat_box">
      <p v-for="(message, index) in messageList"
        :id="'chat' + index" :class="(message.type == 1 ? 'left_message' : 'right_message') + ' message'">
          {{message.msg}}
      </p>
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
import { XDialog, XTextarea, Group, Cell, XInput, XButton, cookie, TransferDomDirective as TransferDom } from 'vux'


export default {
  data() {
    return {
      messageList: [],
      myInpMessage: '',
    }
  },
  components: {
    Group,
    XButton,
    XTextarea
  },
  created() {
    _this = this;
    _this.connectWs();
    _this.getMessage();
    // this.$options.sockets.event_name = (data) => {
    //   console.log(data);
    // }
  },
  mounted() {

  },
  methods: {
    //连接ws
    connectWs(){
      // ws = new WebSocket('ws://97.64.83.167:9595');
      ws = new WebSocket('ws://localhost:9595');
      ws.onopen = function(){
        console.log('ws onopen');

      };

    },
    //获取ws消息列表
    getMessage(){
      ws.onmessage = function(e){
        console.log('ws onmessage');
        console.log('from server:', e.data);
        let data = JSON.parse(e.data);
        console.log(data)
        _this.messageList.push(data);
        console.log(_this.messageList);
        let lastMessageId = 'chat' + (_this.messageList.length - 1);
        let lastMessageElement = document.getElementById("chat0");
        console.log(lastMessageElement)
        lastMessageElement.scrollIntoView();
      }
    },
    //发送消息
    sendMessage(){
      if(!_this.myInpMessage){
        return;
      }
      console.log(_this.myInpMessage)
      let messageData = {
        type: 0,
        msg: _this.myInpMessage
      }
      console.log(JSON.stringify(messageData))
      ws.send(JSON.stringify(messageData));
      _this.messageList.push(messageData);
      _this.myInpMessage = '';
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
    height: 457px;
    overflow: auto;
    .message{
      max-width: 70%;
      float: left;
      border: 1px #999 solid;
      border-radius: 10px;
      margin: 10px;
      padding: 0 10px;
      clear: both;
    }
    .left_message{
      float: left;
    }
    .right_message{
      float: right;
    }
  }
  .operation_wrapper{
    height: 50px;
    background: #EEE;
    overflow: hidden;
    padding: 5px 1%;
    position: fixed;
    bottom: 50px;
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
