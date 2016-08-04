

import Vue  from "vue"
import Vuex from "vuex"
import address from "./modules/address.js"
import login from './modules/login.js'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		address,
		login
	},
	strict: debug,
	//middlewares: debug ? [Vuex.createLogger()] : []
})