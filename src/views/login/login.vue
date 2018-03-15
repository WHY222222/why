<template>
  <div class="login_wrap">
    <div class="vux-demo">
      <img class="logo" src="../../assets/vux_logo.png">
      <h1>Why</h1>
    </div>
    <group title="登录" class="login_title">
      <!-- <cell title="VUX" value="cool" is-link></cell> -->
      <x-input title="用户名" v-model="username" placeholder="username"></x-input>
      <x-input title="密码" v-model="password" placeholder="password" class="login_password"></x-input>
      <x-button @click.native="login">登录</x-button>
    </group>


    <!-- <div class="scroll_wrapper" ref="scrollItem" :style="`border: 1px #ccc solid;width: 400px;height: 200px;overflow: scroll;line-height: 20px;text-align: center;position: absolute;top: `+touchTop+`px;left: `+touchLeft+`px;`">
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
      <p style="width: 100%;height: 40px;border:1px #aaa dashed;" ref="tapP">1</p>
    </div> -->
    <p v-for="text in arr">{{text}}</p>
  </div>
</template>

<script>
import { XDialog, Group, XSwitch, Cell, XInput, XButton, cookie, TransferDomDirective as TransferDom } from 'vux'

export default {
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
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      username: '',
      password: '',
      startPosX: 0,
      startPosY: 0,
      touchTop: 400,
      touchLeft: 10,
      touchStartPosX: 0,
      touchStartPosY: 0,
      arr: []
    }
  },
	mounted() {
    //this.getNode();
    //this.touchEvent();
    this.translate();
	},
	methods: {
    translate(){
      this.$http.get('/translate')
        .then(res => {
          console.log(res);
          this.arr = res.data.data;
        })
        .catch(error => {
          console.log(error);
        })


    },
    clickP() {
      console.log('click');
      alert('click');
    },
    touchEvent(){
      this.$refs.tapP.addEventListener('click', (e) => {
        alert('tap');
      })
      // this.$refs.scrollItem.addEventListener('touchstart', (e) => {
      //   console.log('touch start', e);
      //   this.touchStartPosX = e.touches[0].clientX;
      //   this.touchStartPosY = e.touches[0].clientY;
      //   this.startPosX = this.touchLeft;
      //   this.startPosY = this.touchTop;
      // })
      // this.$refs.scrollItem.addEventListener('touchmove', (e) => {
      //   this.touchTop = this.startPosY + e.touches[0].clientY - this.touchStartPosY;
      //   this.touchLeft = this.startPosX + e.touches[0].clientX - this.touchStartPosX;
      //   console.log('touch move')
      // })
      // this.$refs.scrollItem.addEventListener('touchend', (e) => {
      //   console.log('touch end');
      // })

    },
    clickScroll(){
      console.log('click it');
    },
		login() {
			let _this = this;
			console.log(_this.username,_this.password)
      // this.$vux.toast.show({
      //   text: 'toast'
      // })
      // return;
      if(!_this.username){
        this.$vux.alert.show({
				  title: '请输入用户名',
				  content: '用户名不能为空',
				  onShow () {
				    console.log('Plugin: I\'m showing')
				  },
				  onHide () {
				    console.log('Plugin: I\'m hiding')
				  }
				})
				return;
      }

      if(!_this.username){
        this.$vux.alert.show({
				  title: '请输入密码',
				  content: '密码不能为空',
				  onShow () {
				    console.log('Plugin: I\'m showing')
				  },
				  onHide () {
				    console.log('Plugin: I\'m hiding')
				  }
				})
				return;
      }

      _this.$http.post('/signin',{
        name: _this.username,
        password: _this.password
      })
      .then(res => {
        console.log(res);
        let data = res.data;
      })
      .catch(res => {
        console.log(res);
      })
			// let userList = JSON.parse(cookie.get('user'));
			// for(let i = 0;i < userList.length;i++){
			// 	if(_this.username == userList[i].username){
			// 		if(_this.password == userList[i].password){
			// 			this.$router.push({ path: '/weather', query:{username: _this.username}});
			// 			return;
			// 		} else{
			// 			this.$vux.alert.show({
			// 			  title: '您输入的密码不正确',
			// 			  content: '请重新输入密码',
			// 			  onShow () {
			// 			    console.log('Plugin: I\'m showing')
			// 			  },
			// 			  onHide () {
			// 			    console.log('Plugin: I\'m hiding')
			// 			  }
			// 			})
			// 			return;
			// 		}
			// 	}
			// }
			// this.$vux.alert.show({
			// 	title: '您输入的用户不存在',
			// 	content: '请重新输入用户名',
			// 	onShow () {
			// 		console.log('Plugin: I\'m showing')
			// 	},
			// 	onHide () {
			// 		console.log('Plugin: I\'m hiding')
			// 	}
			// })

		},
    getNode() {
      this.$http.get('/api/node')
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })

      this.$http.post('/api/signin')
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
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
