
import * as types from './mutations-types'

export const  changeDefaultAddr = ({ dispatch }, addr) => {

	dispatch(types.CHANGE_DEFAUTL_ADDR, addr)
	
}

export const selectCity = ({ dispatch }, city) => {

	dispatch(types.SELECT_CITY, city)

}

export const selectArea = ({ dispatch }, area) => {

	dispatch(types.SELECT_AREA, area)

}


export const changeRedirect = ({ dispatch }, redirectInfo) => {
	dispatch(types.CHANGE_REDIRECT, redirectInfo)
}  