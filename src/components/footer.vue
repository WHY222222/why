<template lang="html">
  <div class="footer">
    <tabbar>
      <tabbar-item :link="{path:'/'}"  selected>
        <img slot="icon" src="../assets/images/index.png">
        <img slot="icon-active" src="../assets/images/index_active.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/login'}" >
        <img slot="icon" src="../assets/images/weather.png">
        <img slot="icon-active" src="../assets/images/weather_active.png">
        <span slot="label">天气</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/'}" >
        <!-- <img style="height:40px;width:40px;" slot="icon" src="../assets/image/ic_nav_add_normal.png"> -->
      </tabbar-item>
      <tabbar-item :link="{path:'/chat'}" >
        <img slot="icon" src="../assets/images/message.png">
        <img slot="icon-active" src="../assets/images/message_active.png">
        <span slot="label">聊天</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/mysettings'}">
        <img slot="icon" src="../assets/images/mine.png">
        <img slot="icon-active" src="../assets/images/mine_active.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';
export default {
  data() {
    return {

    }
  },
  components: {
    Tabbar, TabbarItem
  }
}
</script>

<style lang="less" scoped>
.footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
