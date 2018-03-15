<template lang="html">
  <div class="register_wrapper">
		<div class="vux-demo">
      <img class="logo" src="../../assets/vux_logo.png">
      <h1>Why</h1>
    </div>

		<group title="注册" class="login_title">
      <!-- <cell title="VUX" value="cool" is-link></cell> -->
      <x-input title="用户名" v-model="username" placeholder="username"></x-input>
			<x-input title="密码" v-model="password" placeholder="password"></x-input>
      <x-input title="确认密码" v-model="passwordConfirm" placeholder="password confirm" class="register_password"></x-input>
      <x-button @click.native="register">注册</x-button>
    </group>
    1


    <p v-for="text in arr">{{text}}</p>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton, Alert, cookie} from 'vux'
export default {
	data() {
		return {
			username: '',
			password: '',
			passwordConfirm: '',
      arr: []
		}
	},
	components:{
		Group,
		Cell,
		XInput,
		XButton,
		Alert
	},
	mouted() {
		this.register();
    this.translate();
	},
	methods: {
    translate(){
      this.$http.get('/translate')
        .then(res => {
          console.log(res);
          this.arr = res.data;
        })
        .catch(error => {
          console.log(error);
        })


    },

		register() {
			let _this = this;
			if(!this.username){
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
			if(!this.password || this.password.length < 6){
				this.$vux.alert.show({
				  title: '请输入密码',
				  content: '密码必须大于6位?',
				  onShow () {
				    console.log('Plugin: I\'m showing')
				  },
				  onHide () {
				    console.log('Plugin: I\'m hiding')
				  }
				})
				return;
			}
			if(this.password != this.passwordConfirm){
				this.$vux.alert.show({
				  title: '您输入的两次密码不相同',
				  content: '两次密码必须相同',
				  onShow () {
				    console.log('Plugin: I\'m showing')
				  },
				  onHide () {
				    console.log('Plugin: I\'m hiding')
				  }
				})
				return;
			}


      this.$http.post('/signup',{
        name: _this.username,
        password: _this.password,
        repassword: _this.passwordConfirm
      })
        .then(res => {
          console.log(res);
          if(res.data.code == "SUCCESS"){
            this.$router.push({ path: '/login'})
          }
        })
        .catch(error => {
          console.log(error);
        })

			// if(!cookie.get('user')){
			// 	cookie.set('user','[]', {
			// 		domain: '',
			// 		path: '/',
			// 		expires: 30
			// 	})
			// }
			// let currentUser = {
			// 	username: _this.username,
			// 	password: _this.password
			// }
			// let userList = JSON.parse(cookie.get('user'));
			// for(let i = 0;i < userList.length;i++){
			// 	if(userList[i].username == _this.username){
			// 		this.$vux.alert.show({
			// 		  title: '该用户已经被注册',
			// 		  content: '请重新输入用户名',
			// 		  onShow () {
			// 		    console.log('Plugin: I\'m showing')
			// 		  },
			// 		  onHide () {
			// 		    console.log('Plugin: I\'m hiding')
			// 		  }
			// 		})
			// 		this.username = '';
			// 		return;
			// 	}
			// }
			// userList.push(currentUser);
			// cookie.set('user', JSON.stringify(userList), {
			// 	domain: '',
			// 	path: '/',
			// 	expires: 30
			// })
			// console.log(cookie.get('user'));
			// this.username = '';
			// this.password = '';
			// this.passwordConfirm = '';



			// 隐藏
			//this.$vux.alert.hide()
		}
	}
}
</script>

<style lang="less">
.register_wrapper{
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
  .register_password{
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
