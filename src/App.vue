<template>
  <div id="app">
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import myFooter from './components/footer.vue';
export default {
  name: 'app',
  components: {
    myFooter
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
  padding-bottom: 50px;
}
</style>
