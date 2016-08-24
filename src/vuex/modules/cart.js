
import {

   CHANGE_GROUPBUYID,

   ADD_GOODS,


} from '../mutations-types'

const state = {
	groupbuyid: 0,
	goods: []
}

const mutations = {

	CHANGE_GROUPBUYID (state, id) {
		state.groupbuyid = id
	},
	ADD_GOODS (state, good) {
		state.goods.push(good)
	},

}

export default {
	state,
	mutations
}