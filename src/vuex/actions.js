
import * as types from './mutations-types'

export const changeGroupbuyid = ( { dispatch }, id) => {
	dispatch(types.CHANGE_GROUPBUYID, id)
}

export const addGoods = ( { dispatch }, good) => {
	dispatch(types.ADD_GOODS, good)
}

export const clearGoods = ( { dispatch }) => {
	dispatch(types.CLEAR_GOODS)
}

export const setGroupGood = ({ dispatch }, groupGood) => {
	dispatch( types.SET_GROUP_GOOD, groupGood)
} 

/*详情页添加good*/
export const addDetailGood = ({ dispatch }, good) => {
	dispatch(types.ADD_DETAIL_GOODS, good)
}

export const setConfig = ({ dispatch }, config) => {
	dispatch(types.SET_CONFIG, config)
}