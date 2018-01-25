import {type} from './mutation-types.js'
console.log(type)
export default {
	[type.ADD_PRODUCT](state){
		state.addProductStatus = !state.addProductStatus;
	}
}
