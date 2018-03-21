import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/HelloFromVux'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['../views/register/register.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/login/login.vue'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['../views/register/register.vue'], resolve)
    },
    {
      path: '/weather',
      name: 'weather',
      component: resolve => require(['../views/weather/weather.vue'], resolve)
    },
    {
      path: '/cityWeather',
      name: 'cityWeather',
      component: resolve => require(['../views/weather/cityWeather.vue'], resolve)
    },
    {
      path: '/mnode',
      name: 'mnode',
      component: resolve => require(['../views/cnode/cnode.vue'], resolve)
    },
    {
      path: '/mnode/detail',
      name: 'mnodeDetail',
      component: resolve => require(['../views/cnode/cnodeDetail.vue'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['../views/mine/mine.vue'], resolve)
    },
    {
      path: '/elemeHongbao',
      name: 'hongbao',
      component: resolve => require(['../views/eleme/eleme.vue'], resolve)
    },
    {
      path: '/chat',
      name: 'chat',
      component: resolve => require(['../views/chat/lqChat.vue'], resolve)
    },
    {
      path: '/serverChat',
      name: 'serverChat',
      component: resolve => require(['../views/chat/serverChat.vue'], resolve)
    },
    {
      path: '/chatBroad',
      name: 'chatBroad',
      component: resolve => require(['../views/chat/chatBroad.vue'], resolve)
    },
    {
      path: '/privateChat',
      name: 'privateChat',
      component: resolve => require(['../views/chat/privateChat.vue'], resolve)
    },
    {
      path: '/lqChat',
      name: 'lqChat',
      component: resolve => require(['../views/chat/lqChat.vue'], resolve)
    },
    {
      path: '/whyChat',
      name: 'whyChat',
      component: resolve => require(['../views/chat/whyChat.vue'], resolve)
    }






  ]
})
