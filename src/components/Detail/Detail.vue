<template>
	<div class="detail">
		<swiper :list="banners"></swiper>
		<div class="detail-infos">
			<h3>
				{{ detail.title}}
			</h3>
			<p class="detail-infos-price">
				<span class="now">
					￥{{ detail.price }}
				</span>
				<span class="old">
					￥{{ detail.marketPrice }}
				</span>
				<span class="count">
					<button @click="addCart">
						加入购物车
					</button>
				</span>
			</p>
			<div class="detail-infos-tag">
				<span v-if="detail.isExpress==1">
					<img src="./img/selected.png" alt="">
					快递
				</span>
				<span v-if="detail.isZiti==1">
					<img src="./img/selected.png" alt="">自提
				</span>
				<span v-if="detail.isDay==1">
					<img src="./img/selected.png" alt="">当日采摘
				</span>
			</div>
			<p class="detail-infos-invite">
				<a v-link="{ name: 'invite' }">
					邀请好友立减{{ detail.inviteMoney }}元
					<img src="../Common/img/arrow_grap.png" alt="">
				</a>
			</p>
			<ul v-for="desc in detail.goodsDesc">
				<li>{{ desc }}</li>
			</ul>

		</div>
		<div class="detail-intro">

			<div class="detail-intro-tap">
				<div class="detail-intro-tap-item" @click="selectTap(1)" :class="{ 'selected': tapIndex == 1 }">
					规格
				</div>
				<div class="detail-intro-tap-item split" @click="selectTap(2)" :class="{ 'selected': tapIndex == 2 }">
					图文详情
				</div>

			</div>

			<div class="detail-intro-contents">
				<div class="detail-intro-contents-spec" v-if="tapIndex == 1">


					<p v-for="rule in detail.rules">
						<span class="name">
							{{ rule.name }}
						</span>
						<span class="spec">
							{{ rule.value }}
						</span>
					</p>
				</div>
				<div class="detail-intro-contents-detail" v-else>
						<div v-for="picDetail in detail.details">
					<div class="img-wrap" v-if="picDetail.img">
						<img v-bind:src="picDetail.img" alt="">
					</div>
					<p v-for="pp in picDetail.details">
						<span class="name">
							{{ pp.name }}
						</span>
						<span class="spec">
							{{ pp.value }}
						</span>
					</p>
					</div>
				</div>

			</div>
		</div>

		<cart-bar></cart-bar>
		<cart-mask></cart-mask>
		<!-- <div class="detail-oper">
			<div class="detail-oper-item detail-oper-home">
				<a href="">
					<div class="img-wrap">
			        			<img class="img-home" src="../Common/img/home.png" alt="">
			        		</div>
			        		<p>首页</p>
				</a>
			</div>
			<div class="detail-oper-item detail-oper-alone">
				<a href="">
					<p class="price">
						￥248
					</p>
					单独购买
				</a>
			</div>
			<div class="detail-oper-item detail-oper-all">
				<a href="">
					<p class="price">
						￥177
					</p>
					3人团
				</a>
			</div>
		</div> -->
	</div>
</template>
<style lang="less">
	@import 'Detail.less';
</style>
<script>

	import Swiper from '../Swiper/Swiper.vue'

	import CartBar from '../Common/CartBar.vue'

	import cartMask from '../Common/CartMask.vue'

	import { addGoods, addDetailGood } from '../../vuex/actions.js'

	export default {
		name: 'detail',
		vuex: {
			actions: {
				addGoods,
				addDetailGood
			}
		},
		data() {
			return {
				tapIndex: 1,
				detail: {},

			}
		},
		computed: {
			groupGoodsId() {
				return this.$route.params.goodId;
			},
			banners() {
				if(this.detail.imgs){
					return this.detail.imgs.map(value => {
						return {
							img: value
						}
					})
				}else{
					return []

				}
			}
		},
		route: {
			data() {
				this.$http.jsonp("getGoodsInfo", {
					params: {
						groupGoodsId: this.groupGoodsId
					}
				}).then( response => {
					if( 0 == response.data.respCode ){
						this.detail = response.data.respData
					}
				})
			}
		},
		events: {
			'show-cart-list': function() {
				this.$broadcast('show-cart');
			}
		},
		methods: {
			selectTap(index) {
				this.tapIndex = index
			},

			addCart() {
				this.addGoods({
					product: this.detail,
					count: 1
				})
				alert('添加购物车成功')
			},
		},
		components:{
			Swiper,
			CartBar,
			cartMask
		}
	}
</script>
