<template>
	<div class="gsdelivery">
		<div class="gsdelivery-tip">
			<p v-if="submitInfo.warn" class="gsdelivery-tip-harry">
				{{ submitInfo.warn }}
			</p>
			
		</div>

		<div class="gsdelivery-addr">
			<div class="gsdelivery-addr-tap">
				<div class="gsdelivery-addr-tap-select" @click="selectDelivery" v-bind:class="{selected: buyWay == 2 }">
					配送(满{{submitInfo.limitFreight }}包邮)
				</div>
				<div class="gsdelivery-addr-tap-new"    @click="selectNotDelivery" v-bind:class="{selected: buyWay == 1 }">
					自提(免费)
				</div>
			</div>
			<div v-if="buyWay == 2" class="gsdelivery-addr-info">
				<div class="gsdelivery-addr-info-select">
					
					<div class="gsdelivery-addr-info-select-item">
						<div class="gsdelivery-addr-info-select-item-hint">
							<p>收货人</p>
							<p>电话</p>
							
						</div>
						<div class="gsdelivery-addr-info-select-item-value">
							<div>
								<input type="text" v-model="account.buyerMobile">
							</div>
							<div>
								<input type="text" v-model="account.buyerName">
							</div>
						</div>
					</div>
					<div class="gsdelivery-addr-info-select-time">
						发货时间 {{submitInfo.getTime}}
					</div>
					
				</div>
				<div class="gsdelivery-addr-info-location">
					<p>邮寄地址</p>
					<div class="gsdelivery-addr-info-location-wrap">
						<div class="gsdelivery-addr-info-location-city">
							北京市
							<span class="right">
								<select v-model="selectedAreaId" name="" id="">
									<option v-for="area in areas" v-bind:value="area.id">
										{{ area.name }}
									</option>
								</select>
							</span>
						</div>
						<div class="gsdelivery-addr-info-location-area">
							朝阳区
						</div>
					</div>
				</div>
			</div>
			<div v-else class="gsdelivery-addr-new">
				<div class="gsdelivery-addr-new-item">
					<div class="gsdelivery-addr-new-item-hint">
						<p>收货人</p>
						<p>电话</p>
						
					</div>
					<div class="gsdelivery-addr-new-item-value">
						<div>
							<input type="text" v-model="account.buyerMobile">
						</div>
						<div>
							<input type="text" v-model="account.buyerName">
						</div>
					</div>
				</div>
				<div class="gsdelivery-addr-new-own">
					<p>
						选择现有自提点
					</p>
					<div class="gsdelivery-addr-new-own-location">
						<div class="gsdelivery-addr-new-own-info">
							<select v-model="selectedAddressIndex" name="" id="">
								<option v-for="(index,address) in addresses" v-bind:value="index">
									{{ address.name }}
								</option>
							</select>
						</div>
						<!-- <div class="gsdelivery-addr-new-own-detail">
							望京soho
						</div> -->
					</div>
				</div>
				<div class="gsdelivery-addr-new-all">
					地址&nbsp;&nbsp;{{ addresses[selectedAddressIndex].name }}
				</div>
			</div>
		</div>

		<div class="gsdelivery-voucher">
			<template v-if="submitInfo.tickets && submitInfo.tickets.length>0">
				代金券
				<select v-model="ticket" name="" id="">
					<option v-for="tc in submitInfo.tickets" v-bind:value="tc">
						{{ tc.title }}
					</option>
				</select>
			</template>
			<template v-else>
				暂无可用代价券
			</template>
		</div>
		<div class="gsdelivery-list">

			<div class="gsdelivery-list-item">
				<img :src="groupGood.imgs[0]" alt="">
				<div class="gsdelivery-list-item-info">
					<h3>{{groupGood.title}}</h3>
					<p class="price">
						￥{{groupGood.price}}
					</p>
					<span class="buy">
						<b @click="reduceCount(good)" :class="{ active: count>0}">-</b>
						<var>{{count}}</var>
						<b @click="addCount(good)" class="active">+</b>
					</span>
				</div>
			</div>
		</div>

		<div class="gsdelivery-all">
			<p>
				优惠<span>{{ (ticket && ticket.money) || 0 }}元</span>
			</p>
			<p>
				运费<span>{{ freight }}元</span>
			</p>
			<p>
				合计<span>{{ sumPrice }}元</span>
			</p>
		</div>

		<div class="gsdelivery-wx">
			<img src="./img/wx.png">
			<p>微信支付</p>
		</div>

		<div class="gsdelivery-oper">
			<div class="gsdelivery-oper-all">
				
				<div class="gsdelivery-oper-all-word">
					共<span>￥{{sumPrice}}</span>
				</div>
				<div @click="addOrder" class="gsdelivery-oper-all-summary">
					支付订单
				</div>
			</div>
			<!-- <div v-show="!showCartMask" class="gsdelivery-oper-car">
				<img src="../Common/img/car.png" alt="">
			</div> -->
		</div>
	</div>
	<cart-mask></cart-mask>
</template>

<style lang="less">
	@import 'gsdelivery.less';
</style>
<script>



import { groupbuyid, allGoods, groupGood } from '../../vuex/getters.js'

import { changeGroupbuyid, addGoods } from '../../vuex/actions.js'

import cartMask from '../Common/CartMask.vue'

export default {
	name:'gsdelivery',
	data() {
		return {
			submitInfo: {},
			isDelivery: true, //是否选择配送
			areas:[],
			selectedArea:'',
			addresses:[{}],
			selectedAddressIndex:0,
			ticket: {money:0},
			account:{},
			buyWay:1,
			showCartMask: false,
			detail: {price:0},
			count:1,
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
	    groupbuyid,
	    groupGood,
	  },
	  actions: {
	  	addGoods
	  }
	},
	computed: {
		sumPrice() {
			var price = 0;

			/*this.allGoods.forEach(value => {
			  price += parseFloat(value.product.price,10) * value.count;
			})*/


			price += parseFloat(this.groupGood.price) * this.count;

			price += this.freight;

			//if(this.submitInfo.tickets && this.submitInfo.tickets[])

			price -= parseFloat((this.ticket && this.ticket.money) || 0);

			return price
		},
		freight() {
			return this.buyWay == 2 ? this.submitInfo.freight : 0;
		},
		groupGoodsId() {
			return this.$route.params.groupgoodsid;
		},
		
	},
	route: {
		data(){

			/*this.$http.jsonp("getGoodsInfo", {
				params: {
					groupGoodsId: this.groupGoodsId

				}
			}).then(response => {
				if(response.data.respCode == 0 ){
					this.detail = response.data.respData;

					return 
				}
			})*/

			var goods =  JSON.stringify([{"goodsId": this.groupGood.goodsId, "number": this.count }]);

			this.$http.jsonp("submitOrder",{
				params: {
					goods,
					groupbuyId: this.groupbuyid,
					isSingle: 1
				}
			}).then(response => {
				if(response.data.respCode == 0) {
					this.submitInfo = response.data.respData;
					if(this.submitInfo.tickets){
						this.ticket = this.submitInfo.tickets[0]
					}
					
				}
			});

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

			this.$http.jsonp("getAreas",{params: {
				cityId: 1
			}}).then(response => {
				if(0 == response.data.respCode) {
					this.areas = response.data.respData
					this.selectedAreaId = this.areas[0].id
				}
			})
		},
		activate(){
			document.body.style.backgroundColor="#e6e6e6"
		},
		deactivate(){
			document.body.style.backgroundColor=""
		}
	},
	methods:{
		showCart(){
		  this.showCartMask = true;
		  this.$broadcast('show-cart');
		},
		
		addOrder(){

			var goods = JSON.stringify([{"goodsId": this.groupGood.goodsId, "number": this.count }])

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
					ticketId: this.ticket.ticketId,
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
					ticketId: this.ticket.ticketId,
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
		reduceCount(){

			if(this.count>=1){
				this.count--;
			}else{
				return;
			}

		},
		addCount() {
			this.count++;
		},
	}
}
</script>