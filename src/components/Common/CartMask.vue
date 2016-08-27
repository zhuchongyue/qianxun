<template>
	<div class="cmask" @click="hideCart($event)" v-show="showCart">
	</div>
	<div v-show="showCart">
		<div v-if="allGoods.length>0" class="cmask-list">
			<div class="cmask-list-top">
				<span @click.stop.prevent="clearCartGoods">清空购物车<img src="./img/trash.png"></span>
			</div>
			<div class="cmask-list-items">
				<div v-for="good in allGoods" class="cmask-list-items-item">
					<span class="title">
						{{ good.product.title }} 
					</span>
					<p class="oper">
						<span class="price">
							￥{{ good.product.price }}
						</span>
						<span class="buy">
							<b class="reduce" :class="{active: good.count > 0}" @click.prevent="reduceCount(good)">-</b>
							<var>{{ good.count }}</var>
							<b class="add active" @click="addCount(good)">+</b>
						</span>
					</p>
				</div>
			</div>

			<div class="cmask-list-car">
				<img src="./img/car.png" alt="">
			</div>
		</div>
		<div v-else class="cmask-list">
			<div class="cmask-list-top" @click.stop.prevent="clearCartGoods">
				<span>清空购物车<img src="./img/trash.png"></span>
			</div>
			<div class="cmask-list-items">

				<div class="cmask-list-items-item">
					<span class="title">
						您的购物车空空如也,快去购物吧
					</span>
				</div>
				<div class="cmask-list-car">
					<img src="./img/car.png" alt="">
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "CartMask.less";
</style>
<script>

	import { changeGroupbuyid, addGoods, clearGoods } from '../../vuex/actions.js'

	import { groupbuyid, allGoods } from '../../vuex/getters.js'

	export default {
		name: 'cart-mask',
		data() {
			return {
				sumPrice: 0,
				showCart: false,
			}
		},
		vuex:{
			actions: {
				clearGoods,
				addGoods
			},
			getters: {
				allGoods
			}
		},
		computed: {
			/*sumPrice() {
				var price = 0;

				this.allGoods.forEach(value => {
				  price += parseFloat(value.product.price,10) * value.count;
				})

				return price
			}*/
		},
		events: {
			'hide-cart': function() {
				this.showCart = false
			},
			'show-cart': function() {
				this.showCart = true;
			}
		},
		methods: {
			clearCartGoods() {
				this.clearGoods();
			},
			reduceCount(good){
				if(this.count>0){
					this.count--;
				}

				this.addGoods({
					product: good.product,
					count: -1
				})
			},
			addCount(good) {
				
				this.addGoods({
					product: good.product,
					count: 1
				})
			},
			hideCart(e) {
				this.showCart = false;
				this.$dispatch("hide-cart")
				e.preventDefault();
			}
		}
	}
</script>