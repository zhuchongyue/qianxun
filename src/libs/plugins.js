

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

		if(process.env.NODE_ENV !== 'production') {
			Vue.http.options.root = "http://www-test.qx-llt.com/transfer";
		}else{
			Vue.http.options.root = "http://www.qx-llt.com/transfer";
		}

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
				name: 'home', //首页
				component (resolve) {
					require(['../components/Home/Home.vue'], resolve);
				}
			},
			'/list': { 
				name: 'list', //列表页
				component (resolve) {
					require(['../components/List/List.vue'], resolve);
				}
			},
			'/delivery': {   //支付页
				name: 'delivery',
				component (resolve) {
					require(['../components/Delivery/Delivery.vue'], resolve);
				}
			},
			'/gdetail': {        
				name: 'group-detail',   //团购详情页
				component (resolve) {
					require(['../components/GroupDetail/GroupDetail.vue'], resolve);
				}
			},
			'/success': {
				name: 'success',       //普通商品支付成功页
				component (resolve) {
					require(['../components/Success/Success.vue'], resolve);
				}
			},
			'/gsuccess': {
				name: 'gsuccess',
				component (resolve) {  //团购商品支付成功页
					require(['../components/Gsuccess/Gsuccess.vue'],resolve);
				}
			},
			'/mine': {
				name: 'mine',          //我的
				component (resolve) {
					require(['../components/Mine/Mine.vue'], resolve);
				}
			},
			'/mygroup': {
				name: 'mygroup',       //我的拼团
				component (resolve) {
					require(['../components/MyGroup/MyGroup.vue'], resolve);
				}
			},
			'/fail': {
				name:'fail',
				component (resolve) {
					require(['../components/Fail/Fail.vue'], resolve);
				}
			},
			'order': {
				name: 'order',     //我的订单
				component (resolve) {
					require(['../components/Order/Order.vue'], resolve);
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