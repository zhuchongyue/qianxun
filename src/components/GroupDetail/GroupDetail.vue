<template>
	<div class="group">
		<swiper :list="banners"></swiper>
		<div class="group-infos">
			<p class="group-infos-price">
				<span class="now">
					￥{{detail.price}}
				</span>
				<span class="old">
					￥{{detail.marketPrice}}
				</span>
				<span class="count">
					累积销量:{{detail.totalSaleNum}}件
				</span>
			</p>
			<h3>
				{{detail.title}}
			</h3>
			<ul v-if="">
				<li v-for="desc in detail.goodsDesc">{{ desc }}</li>
			</ul>
			<div class="group-infos-tag">
				<span v-if="detail.isExpress==1">
					<img src="./img/selected.png" alt="">
					快递
				</span v-if="detail.isZiti==1">
				<span>
					<img src="./img/selected.png" alt="">自提
				</span>
				<span v-if="detail.isDay==1">
					<img src="./img/selected.png" alt="">当日采摘
				</span>
			</div>
			<p class="group-infos-specific">
				支付开团并邀请{{detail.groupPerson-1}}个成团，人数不足自动退款，团长指定送货时间以及提货地点
			</p>
		</div>

		<div class="group-list" v-if="detail.recommendGroups && detail.recommendGroups.length >0">
			<p class="group-list-title">
				以下小伙伴正在发起团购，可以直接参与
			</p>
			<div class="group-list-item" v-for="rg in detail.recommendGroups">
				<img v-bind:src="rg.portrait" alt="">
				<div class="group-list-item-content">
					<div class="group-list-item-content-addr">
						<p class="name">
							{{rg.name}}
						</p>
						<p class="detail">
							{{rg.address}}
						</p>
					</div>
					<div class="group-list-item-content-go">
						<span>
							还差{{rg.remPerson}}人成团
						</span>
						<a v-link="{ name: 'group-detail', params : { goodId: rg.groupGoodsId }, query: { teamId: rg.teamId }}">
							<span class="group">
								去参团<i></i>
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="group-intro">

			<div class="group-intro-tap">
				<div class="group-intro-tap-item" @click="selectTap(1)" :class="{selected: tapIndex == 1}">
					规格
				</div>
				<div class="group-intro-tap-item split" @click="selectTap(2)" :class="{selected: tapIndex == 2}">
					图文详情
				</div>
				<div class="group-intro-tap-item split" @click="selectTap(3)" :class="{selected: tapIndex == 3}">
					拼团玩法
				</div>
			</div>

			<div class="group-intro-contents">
				<div class="group-intro-contents-spec" :class="{none : tapIndex != 1}">
				<p v-for="rule in detail.rules">
					<span class="name">
						{{ rule.name }}
					</span>
					<span class="spec">
						{{ rule.value }}
					</span>
				</p>
				</div>
				<div class="group-intro-contents-detail" :class="{none : tapIndex != 2}">
					<div v-for="picDetail in detail.details">
					<div class="img-wrap">
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
				<div class="group-intro-contents-rule" :class="{none : tapIndex != 3}">
					<img src="./img/progrss.png" alt="">
				</div>
			</div>
		</div>

		<div class="group-oper">
			<div class="group-oper-item group-oper-home">
				<a href="">
					<div class="img-wrap">
	        			<img class="img-home" src="../Common/img/home.png" alt="">
	        		</div>
	        		<p>首页</p>
				</a>
			</div>
			<div class="group-oper-item group-oper-alone" @click="singleAddOrder">
				<a>
					<p class="price">
						￥{{ detail.price }}
					</p>
					单独购买
				</a>
			</div>
			<div class="group-oper-item group-oper-all" @click="groupAddOrder">
				<a>
					<p class="price">
						￥{{ detail.groupPrice }}
					</p>
					{{ detail.groupPerson }}人团
				</a>
			</div>
		</div>

	</div>
</template>
<style lang="less">
	@import 'GroupDetail.less';
</style>
<script>

	import Swiper from '../Swiper/Swiper.vue'

	import { setGroupGood } from '../../vuex/actions.js'

	export default {
		name: 'group-detail',
		data() {
			return {
				tapIndex: 1,
				detail: {}
			}
		},
		vuex: {
			actions: {
				setGroupGood
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
		methods:{
			selectTap(tapIndex) {
				this.tapIndex = tapIndex
			},
			singleAddOrder() {
				this.setGroupGood(this.detail)
				this.$router.go({
					name: 'gsdelivery',
					params: {
						groupgoodsid: this.groupGoodsId
					}
				})
			},
			groupAddOrder() {
				this.setGroupGood(this.detail)
				this.$router.go({
					name: 'gdelivery',
					params: {
						groupway: 2
					}
				})
			}
		},
		route: {
			data() {
				this.$http.jsonp("getGoodsInfo", {
					params: {
						groupGoodsId: this.groupGoodsId
					}
				}).then(response => {
					if(response.data.respCode == 0 ){
						this.detail = response.data.respData
						console.log(this.detail)
					}
				})
			}
		},
		components:{
			Swiper
		}
	}
</script>
