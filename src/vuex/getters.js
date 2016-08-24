
export const groupbuyid = state => {
	return state.cart.groupbuyid
}

export const addrMaps = state => {
	return state.address.addrMap
}

export const defaultAddr = state => {
	return state.address.defaultAddr
}

export const selectedCity = state => {
	return state.address.selectedCity;
}

export const selectedAddr = state => {
	return {
		city: state.address.selectedCity,
		area: state.address.selectedArea
	}
}

export const redirect = state => {
	return state.login.redirect
}


