

const state = {
	redirect: {
		name: 'mine',
		param: null
	}
}

const mutations = {
	
	CHANGE_REDIRECT (state, redirectInfo) {
		state.redirect = redirectInfo
	}
}

export default {
	state,
	mutations
}