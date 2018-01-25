<template lang="html">
  <div class="city_weather_wrapper">
  	<p class="city_name_title">深圳</p>
		<p class="weather_total">{{weatherInfo[0].now.cond_txt}} {{weatherInfo[0].now.wind_dir}} {{weatherInfo[0].now.wind_sc}}</p>
		<p class="weather_now">{{weatherInfo[0].now.fl}}℃</p>
		<group>
      <cell :title="weatherInfo[0].daily_forecast[0].date" @click.native="onClick" :is-loading="!weatherInfo[0].now.fl" :value="weatherInfo[0].daily_forecast[0].tmp_max + '~' + weatherInfo[0].daily_forecast[0].tmp_min"></cell>
    </group>
		<scroller lock-y :scrollbar-x=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, XButton, Group, Cell} from 'vux'
export default {
	data() {
		return {
			weatherInfo: []
		}
	},
	components: {
		Scroller,
		XButton,
		Group,
		Cell
	},
	mounted() {
		this.getCityWeather();
	},
	methods: {
		getCityWeather() {
			let _this = this;
			_this.$http.get('https://free-api.heweather.com/s6/weather?location=上海&key=17356dca593346dcb5625c24c29dc3e3')
				.then(res => {
					console.log(JSON.stringify(res, null, 2));
					let data = res.data.HeWeather6;
					for(let i = 0;i < data.length;i++){
						_this.weatherInfo.push(data[i]);
					}
				})
		}
	}
}
</script>

<style lang="less">
	.city_weather_wrapper{
		.city_name_title{
			text-align: center;
			font-size: 24px;
		}
		.weather_total{
			text-align: center;
		}
		.weather_now{
			text-align: center;
			font-size: 28px;
		}




		.box1 {
		  height: 100px;
		  position: relative;
		  width: 1490px;
		}
		.box1-item {
		  width: 200px;
		  height: 100px;
		  background-color: #ccc;
		  display:inline-block;
		  margin-left: 15px;
		  float: left;
		  text-align: center;
		  line-height: 100px;
		}
		.box1-item:first-child {
		  margin-left: 0;
		}
		.box2-wrap {
		  height: 300px;
		  overflow: hidden;
		}

	}
</style>
