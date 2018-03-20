<template>
  <div id="app">
    <router-view></router-view>
    <!-- <my-footer></my-footer> -->
  </div>
</template>

<script>
import myFooter from './components/footer.vue';
import { cookie } from 'vux';
var _this;

export default {
  name: 'app',
  components: {
    myFooter
  },
  created(){
    _this = this;
    if(cookie.get('token')){
      //_this.$router.push({ path: '/chat'});

    } else{
      this.$vux.alert.show({
        title: '提示',
        content: '请先登录',
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding')
        }
      })
      _this.$router.push({ path: '/login'});
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './styles/common.less';

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background-color: #fbf9fe;
}
.weui-input{
  height: 100%;
}
#app{
  // padding-bottom: 50px;
}
</style>
