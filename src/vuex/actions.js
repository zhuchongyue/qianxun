
import * as types from './mutations-types'

export const changeGroupbuyid = ( { dispatch }, id) => {
	dispatch(types.CHANGE_GROUPBUYID, id)
}

export const addGoods = ( { dispatch }, good) => {
	dispatch(types.ADD_GOODS, good)
}



