import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
	addProductStatus: false,//添加商品窗口是否打开
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
