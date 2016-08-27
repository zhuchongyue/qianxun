
import {

   CHANGE_GROUPBUYID,

   ADD_GOODS,

   CLEAR_GOODS,

} from '../mutations-types'

import _ from 'underscore';

const state = {
	groupbuyid: parseInt(sessionStorage.getItem("groupbuyid")) || 0,
	goods: JSON.parse(sessionStorage.getItem("goods")) || []
}

const mutations = {

	CHANGE_GROUPBUYID (state, id) {
		state.groupbuyid = id;
		sessionStorage.setItem("groupbuyid", id);
	},
	ADD_GOODS (state, good) {

		for(let i = 0; i < state.goods.length; i++) {
			if(_.isEqual(state.goods[i].product, good.product)){

				state.goods.splice(i, 1)
				if(good.count>0){
					state.goods.push(good)
					sessionStorage.setItem("goods", JSON.stringify(state.goods))
				}
				return;
			}
		}
		state.goods.push(good);
		sessionStorage.setItem("goods", JSON.stringify(state.goods))
	},
	CLEAR_GOODS (state) {
		state.goods = [];
		sessionStorage.setItem("goods", JSON.stringify(state.goods))
	}

}

export default {
	state,
	mutations
}