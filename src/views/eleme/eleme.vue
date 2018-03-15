<template lang="html">
  <div class="login_wrap">
    <div class="vux-demo">
      <img class="logo" src="../../assets/vux_logo.png">
      <h2>自动领取饿了么大红包</h2>
    </div>
    <group title="饿了么" class="login_title">
      <!-- <cell title="VUX" value="cool" is-link></cell> -->
      <x-input title="手机号" v-model="phone" placeholder="绑定饿了么账号的手机号"></x-input>
      <x-input title="密码" v-model="elemeUrl" placeholder="https://h5.ele.me/hongbao/开头的链接" class="login_password"></x-input>
      <x-button @click.native="getEleme">立即领取</x-button>
    </group>
    <group>

    </group>
  </div>
</template>

<script>
import { XDialog, Group, XSwitch, Cell, XInput, XButton, cookie, TransferDomDirective as TransferDom } from 'vux'
export default {
  data() {
    return {
      phone: '',
      elemeUrl: ''
    }
  },
  components: {
    XDialog,
    Group,
    XSwitch,
    Cell,
    XInput,
    XButton
  },
  directives: {
    TransferDom
  },
  created(){

  },
  mounted(){
    this.getTrain();
  },
  methods: {
    getEleme(){
      if(!this.phone){
        this.$vux.alert.show({
				  title: '请输入手机号',
				  content: '用户手机号不能为空',
				  onShow () {
				    console.log('Plugin: I\'m showing')
				  },
				  onHide () {
				    console.log('Plugin: I\'m hiding')
				  }
				})
				return;
      }

      if(!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phone))){

        this.$vux.alert.show({
          title: '请输入正确的手机号',
          content: '所输入的手机号不正确',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
        return;

      }


      this.$http.post('/eleme',{
        phone: this.phone,
        url: this.elemeUrl
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    },
    getTrain(){
      this.$http.get('/otn/leftTicket/queryZ?leftTicketDTO.train_date=2018-02-15&leftTicketDTO.from_station=SHH&leftTicketDTO.to_station=SYT&purpose_codes=ADULT')
        .then(res => {
          console.log('train', res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style lang="less">
</style>
