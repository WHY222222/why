<template lang="html">
  <div class="weather_wrapper">
  	weather
		<p>{{weather}}</p>
		<p>{{recentWeather}}</p>
    {{$store.state.session}}
    <p>{{session}}</p>
    <p>{{JSON.stringify($store.state)}}</p>


		<group class="user_word_inp_box">
	    <x-textarea v-model="word"></x-textarea>
			<x-button>发送</x-button>
	  </group>
  </div>
</template>

<script>
import { XTextarea, Group, XButton, cookie } from 'vux'

var _this;
export default {
	data() {
		return {
			weather: '',
			recentWeather: '',
			word: '',
      session: '',
		}
	},
	components: {
		XTextarea,
    Group,
    XButton
	},
  created(){
    _this = this;
  },
	mounted() {
		// this.getWeather();
		// this.getRecentWeather();
    _this.$http.get('/signin/checkSession', {
      params: {
        token: cookie.get('token')
      }
    })
      .then(res => {
        console.log('session', res);
        _this.session = JSON.stringify(res);
      })
      .catch(err => {
        console.log(err)
      })
	},
	methods: {
		getWeather() {
			let _this = this;
			this.$http.get('https://api.seniverse.com/v3/robot/talk.json?key=mtqgpeldccxfifud&q=深圳最近天气')
				.then(res => {
					console.log(res.data);
					this.weather = res.data.results[0].reply.plain;
				})
				.catch(function (error){
					console.log(error);
				})
		},
		getRecentWeather() {
			let _this = this;
			this.$http.get('https://free-api.heweather.com/s6/weather?location=深圳&key=17356dca593346dcb5625c24c29dc3e3')
				.then(res => {
					console.log(res.data);
					this.recentWeather = res.data.results[0].reply.plain;
				})
				.catch(function (error){
					console.log(error);
				})
		}
	}
}
</script>

<style lang="less">
	.weather_wrapper{
		.user_word_inp_box{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
			padding-bottom: 4px;
			.vux-x-textarea{
				padding: 0 10px;
				width: 80%;
				float: left;
			}
			textarea{
				border: 1px #D9D9D9 solid;
				width: 100%;
				height: 30px;
				line-height: 30px;
			}

		}
	}
</style>
