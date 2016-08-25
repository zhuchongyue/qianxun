<template>
<a v-link="{ name: 'detail', params: { goodId: product.goodsId}}">
	<div class="mod-item">
		<img :src="product.img | handleImg" alt="">
		<div class="mod-item-info">
			<h3>{{ product.title }}</h3>
			<p class="desc">
				{{ product.subTitle }}
			</p>
			<p>
				<span class="now">
					￥{{ product.price }}
				</span>
				<span class="old">
					￥{{ product.marketPrice }}
				</span>
			</p>
			<p>
				<span class="sum">已收{{ product.saleNum }}份</span>
				<span class="buy">
					<b class="reduce" @click="reduceCount($event)">-</b>
					<var>{{count}}</var>
					<b class="add active" @click="addCount($event)">+</b>
				</span>
			</p>
		</div>
	</div>
	</a>
</template>
<style lang="less">
	@import 'GeneralItem.less';
</style>
<script>
	import util from '../../libs/util.js'

	import _ from "underscore"

	import { changeGroupbuyid, addGoods } from '../../vuex/actions.js'

	import { groupbuyid, allGoods } from '../../vuex/getters.js'

	export default {
		name: 'GeneralItem',

		data() {
			return {
				count: 0
			}
		},

		filters:{
			handleImg: util.handleImg
		},
		methods: {
			reduceCount(e){
				if(this.count>0){
					this.count--;
				}

				this.addGoods({
					product: this.product,
					count: this.count
				})
				e.preventDefault();
			},
			addCount(e) {
				this.count++;
				this.addGoods({
					product: this.product,
					count: this.count
				})
				e.preventDefault()
			},
		},
		ready(){


			for(let i=0; i<this.allGoods.length; i++){
				if(_.isEqual(this.allGoods[i].product.goodsId, this.product.goodsId)) {
					this.count = this.allGoods[i].count
				}
			}
		},
		vuex: {
			actions: {
				changeGroupbuyid,
				addGoods
			},
			getters: {
				groupbuyid,
				allGoods
			}
		},
		props: ['product']
	}

</script>