

import Vue from 'vue'
import Resource from 'vue-resource'
import VueTouch from 'vue-touch'
import Router from 'vue-router'
import Vuex from 'vuex'
import App from '../App.vue'

var plugin = {
	init(){
		this.initVuePlugins();
		this.resourceGlobalSetting();
		this.runRouter();
	},

	initVuePlugins() {
		Vue.use(Router);
		Vue.use(Resource);
		Vue.use(VueTouch);
		Vue.use(Vuex);
	},
	resourceGlobalSetting() {
		Vue.http.options.root = "http://zhuanzhuan.58.com/zz/transfer";
	},
	runRouter() {
		var routeMap = this.createRouteMap();
		var router = this.router = new Router({
			hashbang : false,
			history : true,
			root : '/'
		});

		router.beforeEach(this.beforeEach.bind(router));
			
		router.map(routeMap);
		router.start(App,"#app");
		console.log('App-launch');
	},
	createRouteMap() {
		var map = {
			
			'/': {
				name: 'home',
				component (resolve) {
					require(['../components/Home/Home.vue'], resolve);
				}
			},
			'/test': {
				name: 'test',
				component (resolve) {
					require(['../components/Test/Test.vue'], resolve);
				}
			}
			
		}
		return map;
	},
	beforeEach( transition ) {
		var to = transition.to,
			app = to.router.app;
		if( to.auth && !app.isLogin() ){
			app.auth(to)
			transition.next()
		}else{
			transition.next()
		}
	}
}

export default plugin