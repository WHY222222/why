// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router'
import qs from 'qs'
// import store from './store/'
import App from './App'
import Home from './components/HelloFromVux'

import uploader from 'vue-simple-uploader'

import VueScroller from 'vue-scroller'

import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://97.64.83.167:3000');

// vue.use(VueScroller);
Vue.use(uploader)

// import VueSocketio from 'vue-socket.io'


import { AlertPlugin} from 'vux'
Vue.use(AlertPlugin)
import { cookie } from 'vux'
// Vue.use(cookie)


Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false


axios.defaults.timeout = 5000;
axios.defaults.baseURL = '/api';

// if(process.env.NODE_ENV === 'development'){
//   axios.defaults.baseURL = '/api'
// } else{
//   axios.defaults.baseURL = 'www.whyexist.net:3000'
// }

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//Post穿餐序列化
axios.interceptors.request.use((config) => {
  if(config.method === 'post'){
    config.data = qs.stringify(config.data);
  }
  console.log('post')
  return config;
}, (error) => {
  alert('错误的穿参');
  return Promise.reject(error);
})
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
