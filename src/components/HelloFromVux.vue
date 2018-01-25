<template>
  <div class="login_wrap">
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1>Why</h1>
    </div>
    <group title="登录" class="login_title">
      <!-- <cell title="VUX" value="cool" is-link></cell> -->
      <x-input title="用户名" v-model="username" placeholder="username"></x-input>
      <x-input title="密码" v-model="password" placeholder="password" class="login_password"></x-input>
      <x-button>登录</x-button>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      username: '',
      password: ''
    }
  }
}
</script>

<style lang="less">
.login_wrap{
  .login_title{
    .weui-cells__title{
      padding-bottom: 10px;
      font-size: 20px;
    }

  }
  button.weui-btn, input.weui-btn{
    width: auto;
    margin: 50px auto 200px;
  }
  .login_password{
    border-bottom: 1px solid #D9D9D9;
  }
  .weui-cell__hd{
    width: 80px;
  }


}

.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
