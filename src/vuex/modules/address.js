
import {

  CHANGE_DEFAUTL_ADDR,
  SELECT_CITY,
  SELECT_AREA

} from '../mutations-types'

const state = {
	defaultAddr: {},
	currentAddr: null,
	selectedCity: null,
	selectedArea: null,
}

const mutations = {

	CHANGE_DEFAUTL_ADDR (state, addr) {
		state.defaultAddr = addr
	},
	SELECT_CITY (state, city) {
		state.selectedCity = city;
	},
	SELECT_AREA (state, area) {
		state.selectedArea = area;
	}

}

export default {
	state,
	mutations
}