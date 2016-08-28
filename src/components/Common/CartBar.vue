<template>
	<div class="cart-oper">
		<div class="cart-oper-empty">
			<div class="cart-oper-empty-car" @click="showCartList">
				<img src="./img/car.png" alt="">
			</div>
			<!-- <div class="cart-oper-empty-word">
        		购物车是空的
      		</div> -->
	        <div class="cart-oper-empty-word">
	         共<span class="sum-price">￥{{ sumPrice }}</span>
	         (满{{ config.limitFreight }}包邮)
	        </div>
			<div class="cart-oper-empty-summary">
		        <a v-link="{name: 'delivery'}">
					结算({{allGoods.length}})
		        </a>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	@import "CartBar.less";
</style>
<script>

	import { changeGroupbuyid, addGoods } from '../../vuex/actions.js'

	import { groupbuyid, allGoods, config } from '../../vuex/getters.js'

	export default {
		name: 'cart-bar',
		data() {
			return {
				sumPrice: 0
			}
		},
		methods: {
			showCartList() {
				this.$dispatch('show-cart-list')
			}
		},
		computed: {
			sumPrice() {
				var price = 0;

				this.allGoods.forEach(value => {
				  price += parseFloat(value.product.price,10) * value.count;
				})

				return price
			}
		},
		vuex: {
			getters: {
				allGoods,
				config
			}
		}
	}
</script>
