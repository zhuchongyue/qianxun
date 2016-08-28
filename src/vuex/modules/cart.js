
import {

   CHANGE_GROUPBUYID,

   ADD_GOODS,

   CLEAR_GOODS,

   SET_GROUP_GOOD,

   ADD_DETAIL_GOODS,

   SET_CONFIG,

} from '../mutations-types'

import _ from 'underscore';

const state = {
	groupbuyid: parseInt(sessionStorage.getItem("groupbuyid")) || 0,
	goods: JSON.parse(sessionStorage.getItem("goods")) || [],
	groupGood: JSON.parse(sessionStorage.getItem("groupGood")) || {},
	config: JSON.parse(sessionStorage.getItem("config")) || {},

}

const mutations = {

	SET_GROUP_GOOD (state, groupGood) {
		state.groupGood = groupGood;
		sessionStorage.setItem("groupGood",JSON.stringify(groupGood))
	},
	CHANGE_GROUPBUYID (state, id) {
		state.groupbuyid = id;
		sessionStorage.setItem("groupbuyid", id);
	},
	ADD_GOODS (state, good) {

		let hasFlag = false;
		for(let i = 0; i < state.goods.length; i++) {
			if(_.isEqual(state.goods[i].product.goodsId, good.product.goodsId)){
				hasFlag = true;
				state.goods[i].count += good.count;
				
				if(state.goods[i].count <= 0) {
					state.goods.splice(i, 1)
				}
				sessionStorage.setItem("goods", JSON.stringify(state.goods))
				return;
			}
		}

		if(!hasFlag) {
			state.goods.push(good);
			sessionStorage.setItem("goods", JSON.stringify(state.goods))
		}
		
	},
	ADD_DETAIL_GOODS (state, good) {
		let hasFlag = false;
		for(let i = 0; i < state.goods.length; i++) {
			if(_.isEqual(state.goods[i].product.goodsId, good.product.goodsId)){
				hasFlag = true;
				state.goods[i].count += good.count
				return;
			}
		}

		if(!hasFlag) {
			state.goods.push(good);
		}

	},
	CLEAR_GOODS (state) {
		state.goods = [];
		sessionStorage.setItem("goods", JSON.stringify(state.goods))
	},
	SET_CONFIG (state, config) {
		state.config = config;
		sessionStorage.setItem("config", JSON.stringify(state.config))
	}

}

export default {
	state,
	mutations
}