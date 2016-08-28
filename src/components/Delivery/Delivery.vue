<template>
	<div class="delivery">
		<div class="delivery-tip">
			<p v-if="submitInfo.warn" class="delivery-tip-harry">
				{{ submitInfo.warn }}
			</p>
			
		</div>

		<div class="delivery-addr">
			<div class="delivery-addr-tap">
				<div class="delivery-addr-tap-select" @click="selectDelivery" v-bind:class="{selected: buyWay == 2 }">
					配送(满{{submitInfo.limitFreight }}包邮)
				</div>
				<div class="delivery-addr-tap-new"    @click="selectNotDelivery" v-bind:class="{selected: buyWay == 1 }">
					自提(免费)
				</div>
			</div>
			<div v-if="buyWay == 2" class="delivery-addr-info">
				<div class="delivery-addr-info-select">
					
					<div class="delivery-addr-info-select-item">
						<div class="delivery-addr-info-select-item-hint">
							<p>收货人</p>
							<p>电话</p>
							
						</div>
						<div class="delivery-addr-info-select-item-value">
							<div>
								<input type="text" v-model="account.buyerMobile">
							</div>
							<div>
								<input type="text" v-model="account.buyerName">
							</div>
						</div>
					</div>
					<div class="delivery-addr-info-select-time">
						发货时间 {{submitInfo.getTime}}
					</div>
					
				</div>
				<div class="delivery-addr-info-location">
					<p>邮寄地址</p>
					<div class="delivery-addr-info-location-wrap">
						<div class="delivery-addr-info-location-city">
							北京市
							<span class="right">
								<select v-model="selectedAreaId" name="" id="">
									<option v-for="area in areas" v-bind:value="area.id">
										{{ area.name }}
									</option>
								</select>
							</span>
						</div>
						<div class="delivery-addr-info-location-area">
							朝阳区
						</div>
					</div>
				</div>
			</div>
			<div v-else class="delivery-addr-new">
				<div class="delivery-addr-new-item">
					<div class="delivery-addr-new-item-hint">
						<p>收货人</p>
						<p>电话</p>
						
					</div>
					<div class="delivery-addr-new-item-value">
						<div>
							<input type="text" v-model="account.buyerMobile">
						</div>
						<div>
							<input type="text" v-model="account.buyerName">
						</div>
					</div>
				</div>
				<div class="delivery-addr-new-own">
					<p>
						选择现有自提点
					</p>
					<div class="delivery-addr-new-own-location">
						<div class="delivery-addr-new-own-info">
							<select v-model="selectedAddressIndex" name="" id="">
								<option v-for="(index,address) in addresses" v-bind:value="index">
									{{ address.name }}
								</option>
							</select>
						</div>
						<!-- <div class="delivery-addr-new-own-detail">
							望京soho
						</div> -->
					</div>
				</div>
				<div class="delivery-addr-new-all">
					地址&nbsp;&nbsp;{{ addresses[selectedAddressIndex].name }}
				</div>
			</div>
		</div>

		<div class="delivery-voucher">
			暂无可用代价券
		</div>
		<div class="delivery-list">

			<div v-for="good in allGoods" class="delivery-list-item">
				<img :src="good.product.img" alt="">
				<div class="delivery-list-item-info">
					<h3>{{good.product.title}}</h3>
					<p class="price">
						￥{{good.product.price}}
					</p>
					<span class="buy">
						<b @click="reduceCount(good)" :class="{ active: good.count>0}">-</b>
						<var>{{good.count}}</var>
						<b @click="addCount(good)" class="active">+</b>
					</span>
				</div>
			</div>
		</div>

		<div class="delivery-all">
			<p>
				优惠<span>5元</span>
			</p>
			<p>
				运费<span>{{ freight }}元</span>
			</p>
			<p>
				合计<span>{{ sumPrice }}元</span>
			</p>
		</div>

		<div class="delivery-wx">
			<img src="./img/wx.png">
			<p>微信支付</p>
		</div>

		<div class="delivery-oper">
			<div class="delivery-oper-all">
				
				<div class="delivery-oper-all-word">
					共<span>￥{{sumPrice}}</span>
				</div>
				<div @click="addOrder" class="delivery-oper-all-summary">
					支付订单
				</div>
			</div>
			<div v-show="!showCartMask" class="delivery-oper-car">
				<img src="../Common/img/car.png" alt="">
			</div>
		</div>
	</div>
	<cart-mask></cart-mask>
</template>

<style lang="less">
	@import 'Delivery.less';
</style>
<script>


import { groupbuyid, allGoods } from '../../vuex/getters.js'

import { changeGroupbuyid, addGoods } from '../../vuex/actions.js'

import cartMask from '../Common/CartMask.vue'

export default {
	name:'delivery',
	data() {
		return {
			submitInfo: {},
			isDelivery: true, //是否选择配送
			areas:[],
			selectedArea:'',
			addresses:[{}],
			selectedAddressIndex:0,
			account:{},
			buyWay:1,
			showCartMask: false,
		}
	},
	components: {
		cartMask
	},
	events: {
	  'hide-cart':function() {
	    this.showCartMask = false;
	  }
	},
	vuex: {
	  getters: {
	    allGoods,
	    groupbuyid
	  },
	  actions: {
	  	addGoods
	  }
	},
	computed: {
		sumPrice() {
			var price = 0;

			this.allGoods.forEach(value => {
			  price += parseFloat(value.product.price,10) * value.count;
			})

			price+= this.freight

			return price
		},
		freight() {
			return this.buyWay == 2 ? this.submitInfo.freight : 0;
		},
		
	},
	route: {
		data(){

			this.$http.jsonp("getMyAccount").then(response => {
				//console.log(response)

				if(0 == response.data.respCode) {
					this.account = response.data.respData
				}
			})

			this.$http.jsonp("getAddress").then(response => {
				console.log('getAddress')
				console.log(response.data.respData)
				if(0 == response.data.respCode) {
					this.addresses = response.data.respData;
				}
			})

			this.$http.jsonp("getAddressInfo",{
				params: {
					addressId: 6
				}
			}).then(response => {
				console.log('getAddressInfo')
				console.log(response)
			})

			this.$http.jsonp("getCitys").then(response => {
				console.log('getCitys')
				console.log(response)
			})

			this.$http.jsonp("getAreas",{params: {
				cityId: 1
			}}).then(response => {
				console.log('getAreas')
				console.log(response)
				if(0 == response.data.respCode) {
					this.areas = response.data.respData
					this.selectedAreaId = this.areas[0].id
				}
			})

			this.$http.jsonp("getAreas",{params: {
				cityId: 5
			}}).then(response => {
				console.log('getAreas')
				console.log(response)
				if(0 == response.data.respCode) {
					this.areas = response.data.respData
					this.selectedAreaId = this.areas[0].id
				}
			})

			var goods =  JSON.stringify([{"goodsId": 38, "number": 3},{"goodsId": 14,"number": 1}]);

			this.$http.jsonp("submitOrder",{
				params: {
					goods,
					groupbuyId: 1
				}
			}).then(response => {
				if(response.data.respCode == 0) {
					this.submitInfo = response.data.respData
					//this.freight = 
				}
			});
		}
	},
	methods:{
		showCart(){
		  this.showCartMask = true;
		  this.$broadcast('show-cart');
		},
		
		addOrder(){

			var goods = JSON.stringify(this.allGoods.map(value => {
				return {
					goodsId: value.product.goodsId,
					number: value.count
				}
			}))

			var params = {}
			//自提
			if(this.buyWay == 1){
				params = {
					buyWay: this.buyWay,
					addressId: this.addresses[this.selectedAddressIndex].id,
					address: this.addresses[this.selectedAddressIndex].adress,
					buyerName: this.account.buyerName,
					buyerMobile: this.account.buyerMobile,
					groupbuyId: this.groupbuyid,
					ticketId: 0,
					payWay: 1,
					goods
				}
			//配送
			}else{
				params = {
					buyWay: this.buyWay,
					cityId: 5,
					areaId: 6,
					address: '测试地址',
					buyerName: this.account.buyerName,
					buyerMobile: this.account.buyerMobile,
					groupbuyId: this.groupbuyid,
					ticketId: 0,
					payWay: 1,
					goods
				}
			}

			this.$http.jsonp("addOrder", {
				params
			}).then(response => {
				if(response.data.respCode == 0) {

					var _this = this;

					var config = response.data.respData;
					wx.ready( () => {
						wx.chooseWXPay({
							appId : config.appId,
							timestamp : config.timeStamp,
							nonceStr : config.nonceStr,
							package : config.packageSign,
							signType : config.signType,
							paySign : config.paySign,
							success(res){
								alert(JSON.stringify(res))
								_this.$router.go({
									name: 'success',
									params: {
										orderId: config.orderId
									}
								})
								
							},
							cancel : function(res){
								alert('cancel')
							}
						})
					})
				}
			})
		},
		selectDelivery() {
			this.buyWay = 2
		},
		selectNotDelivery() {
			this.buyWay = 1
		},
		reduceCount(good){
			var count = good.count;

			if(count>=1){
				count--;
			}else{
				return;
			}

			this.addGoods({
				product: good.product,
				count: -1
			})
			//e.preventDefault();
		},
		addCount(good) {
			//this.count++;
			var count = good.count;

			this.addGoods({
				product: good.product,
				count: 1
			})
			//e.preventDefault()
		},
	}
}
</script>