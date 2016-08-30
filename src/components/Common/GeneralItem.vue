<template>
<a v-link="{ name: 'detail', params: { goodId: product.groupbuyGoodsId }}">
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
				<span class="sum">已售{{ product.saleNum }}份</span>
				<span class="buy">
					<b class="reduce" v-show="count > 0" :class="{ active: count > 0}" @click="reduceCount($event)">-</b>
					<var v-show="count > 0">{{count}}</var>
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
				
			}
		},

		filters:{
			handleImg: util.handleImg
		},
		methods: {
			reduceCount(e){
				if(this.count>=1){
					this.count--;
				}else{
					e.preventDefault();
					return;
				}

				this.addGoods({
					product: this.product,
					count: -1
				})
				e.preventDefault();
			},
			addCount(e) {
				this.count++;
				this.addGoods({
					product: this.product,
					count: 1
				})
				e.preventDefault()
			},
		},
		computed: {
			count() {
				var temp = 0;
				for(let i=0; i<this.allGoods.length; i++){
					if(_.isEqual(this.allGoods[i].product.goodsId, this.product.goodsId)) {
						temp = this.allGoods[i].count
					}
				}

				return temp;
			}
		},
		ready(){
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
