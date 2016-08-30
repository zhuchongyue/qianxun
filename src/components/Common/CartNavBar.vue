<template>
	<div class="home-oper">
		<div class="home-oper-item" :class="{ 'home-oper-active': index==1}">
			<div class="img-wrap">
				<img v-if="index==1" class="img-home" src="./img/home_blue.png" alt="">
				<img v-else class="img-home" src="./img/home.png" alt="">
			</div>
			<p>首页</p>
		</div>
		<div class="home-oper-item home-oper-center" :class="{ 'home-oper-active': index==2}" @click="showCart">
	        <div v-if="allGoods.length>0" class="red-point"></div>
			<div class="img-wrap">
				<img v-if="index==2" src="./img/car_blue.png" alt="">
				<img v-else src="./img/car.png" alt="">
			</div>
			<p>购物车</p>
		</div>
		<div class="home-oper-item" :class="{ 'home-oper-active': index==3}">
	        <a v-link="{ name: 'mine'}">
	    		<div class="img-wrap">
	    			<img v-if="index==3" class="img-user" src="./img/user_blue.png" alt="">
	    			<img v-else class="img-user" src="./img/user.png" alt="">
	    		</div>
	    		<p>我的</p>
	        </a>
		</div>
	</div>
</template>
<style lang="less">
	@import 'CartNavBar.less';
</style>
<script>

	import { groupbuyid, allGoods } from '../../vuex/getters.js'
	export default {
		name:'carNavBar',
		props:['index'],
		events: {
			
		},
		methods: {
			showCart() {
				this.$dispatch('pop-cart')
			}
		},	
		vuex: {
			getters: {
				allGoods
			}
		}
	}
</script>