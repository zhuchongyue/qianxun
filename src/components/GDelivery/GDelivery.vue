<template>
	<div class="delivery">
		<div class="delivery-tip">
			<p class="delivery-tip-harry" v-if="submitInfo.warn">
				{{ submitInfo.warn }}
			</p>
			<!-- <div class="delivery-tip-place">
				<p>
					提货时间
					&nbsp;&nbsp;
					星期一(8.19)
				</p>
				<ul>
					<li>
						免费自提，团长指定提货地点
					</li>
					<li>
						全团商品将寄到团长指定地点
					</li>
				</ul>
			</div> -->
		</div>

		<div class="delivery-addr">
			<div class="delivery-addr-tap">
				<div class="delivery-addr-tap-select" @click="selectDelivery" v-bind:class="{selected: buyWay == 1 }">
					选择现有自提点
				</div>
				<div class="delivery-addr-tap-new"    @click="selectNotDelivery" v-bind:class="{selected: buyWay == 2 }">
					新建自提点
				</div>
			</div>
			<div v-if="buyWay == 1" class="delivery-addr-new">
			
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
					地址:&nbsp;&nbsp;{{ addresses[selectedAddressIndex].address }}
				</div>
			</div>
			<div v-else class="delivery-addr-info">
				<div class="delivery-addr-info-select">
					
					<div class="delivery-addr-info-select-item">
						<div class="delivery-addr-info-select-item-hint">
							<p>收货人</p>
							<p>电话</p>
							
						</div>
						<div class="delivery-addr-info-select-item-value">
							<div>
								<input type="text" v-model="account.buyerName">
							</div>
							<div>
								<input type="text" v-model="account.buyerMobile">
							</div>
						</div>
					</div>
					
				</div>
				<div class="delivery-addr-info-location">
					
					<div class="delivery-addr-info-location-wrap">
						<div class="delivery-addr-info-location-city">
							邮寄地址&nbsp;&nbsp;北京市
							<span class="right">
								<select v-model="selectedAreaId" name="" id="">
									<option v-for="area in areas" v-bind:value="area.id">
										{{ area.name }}
									</option>
								</select>
							</span>
						</div>
						<div class="delivery-addr-info-location-area">
							<input type="text" v-model="detailAddress" placeholder="请输入详细地址">
						</div>
					</div>
				</div>
			</div>
			
		</div>

		<div class="delivery-voucher">
			暂无可用代价券
		</div>
		<div class="delivery-list">

			<div class="delivery-list-item">
				<img :src="groupGood.imgs[0]" alt="">
				<div class="delivery-list-item-info">
					<h3>{{groupGood.title}}</h3>
					<p class="price">
						￥{{groupGood.price}}
					</p>
					<span class="buy">
						<b @click="reduceCount(good)">-</b>
						<var>1</var>
						<b @click="addCount(good)" class="active">+</b>
					</span>
				</div>
			</div>
			
		</div>

		<div class="delivery-all">
			<p>
				优惠<span> {{ticket}}元</span>
			</p>
			<p>
				运费<span>
					{{ freight }}
					元
					</span>
			</p>
			<p>
				合计<span>{{sumPrice}}元</span>
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
		</div>
	</div>
</template>

<style lang="less">
	@import 'GDelivery.less';
</style>
<script>


import { groupbuyid, allGoods, groupGood } from '../../vuex/getters.js'

import { changeGroupbuyid, addGoods } from '../../vuex/actions.js'

export default {
	name:'delivery',
	data() {
		return {
			submitInfo: {tickets:[{money:0}]},
			isDelivery: true, //是否选择配送
			areas:[],
			selectedArea:'',
			addresses:[{}],
			selectedAddressIndex:0,
			account:{},
			buyWay:1,
			detailAddress: '',

		}
	},
	vuex: {
	  getters: {
	    allGoods,
	    groupbuyid,
	    groupGood
	  },
	  actions: {
	  	addGoods,

	  }
	},
	computed: {
		sumPrice() {
			var price = 0;

			price += parseFloat(this.groupGood.price);

			price+= this.submitInfo.freight;

			price -= this.ticket;

			return price
		},
		freight() {
			return this.submitInfo.freight;
		},
		ticket() {
			return this.submitInfo.tickets && this.submitInfo.tickets[0] && this.submitInfo.tickets[0].money || 0;
		},
		isSingle() {
			return this.$route.params.groupway == 1 ? true : false
		}
	},
	route: {
		data(){

			var goods =  JSON.stringify([{ "goodsId": this.groupGood.goodsId, "number": 1 }]);

			var params = {}

			if(this.isSingle) {
				params = {
					goods,
					groupbuyId: this.groupbuyid,
					isSingle: 1
				}
			}else{
				params = {
					goods,
					groupbuyId: this.groupbuyid,
					teamId: this.groupGood.teamId
				}
			}

			this.$http.jsonp("submitOrder",{
				params
			}).then(response => {
				if(response.data.respCode == 0) {
					this.submitInfo = response.data.respData
					console.log(this.submitInfo)
				}
			});

			this.$http.jsonp("getMyAccount").then(response => {

				if(0 == response.data.respCode) {
					this.account = response.data.respData
				}
			});


			this.$http.jsonp("getAddress").then(response => {
				console.log('getAddress')
				console.log(response.data.respData)
				if(0 == response.data.respCode) {
					this.addresses = response.data.respData;
				}
			});

			this.$http.jsonp("getCitys").then(response => {
				console.log('getCitys')
				console.log(response)
			});

			this.$http.jsonp("getAreas",{params: {
				cityId: 1
			}}).then(response => {
				console.log('getAreas')
				console.log(response)
				if(0 == response.data.respCode) {
					this.areas = response.data.respData
					this.selectedAreaId = this.areas[0].id
				}
			});

			/*
			this.$http.jsonp("getAddressInfo",{
				params: {
					addressId: 7
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
			});*/
		},
		activate(){
			document.body.style.backgroundColor="#e6e6e6"
		},
		deactivate(){
			document.body.style.backgroundColor=""
		}
	},
	methods:{
		createOrder() {

			var goods =  JSON.stringify([{"goodsId": 38, "number": 3},{"goodsId": 14,"number": 1}]);

			this.$http.jsonp("addOrder", {
				params: {
					buyWay: 1,
					buyerName: "朱崇跃",
					buyerMobile: "18612782819",
					groupbuyId: 1,
					payWay: 1,
					goods,
					ticketId: 0,
					address:"北京北京"
				}
			}).then( response => {
				if(response.data.respCode == 0) {

					var config = response.data.respData;
					var _this = this;
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
								_this.router.go({
									name: 'gsuccess',
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
		addOrder(){

			var goods =  JSON.stringify([{ "goodsId": this.groupGood.goodsId, "number": 1 }]);

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
					ticketId: this.submitInfo.tickets[0].id,
					payWay: 1,
					goods
				}
			//配送
			}else{
				params = {
					buyWay: this.buyWay,
					cityId: 1,
					areaId: this.selectedAreaId,
					address: this.detailAddress,
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

								this.$router.go({
									name: 'gsuccess'
								})
							},
							cancel : function(res){
								this.$router.go({
									name: 'order'
								})
							},
							fail: function(){
								this.$router.go({
									name: 'order'
								})
							}
						})
					})
				}
			})
		},
		selectDelivery() {
			this.buyWay = 1
		},
		selectNotDelivery() {
			this.buyWay = 2
		},
		reduceCount(good){
			var count = good.count;

			if(count>0){
				count--;
			}

			this.addGoods({
				product: good.product,
				count: count
			})
			//e.preventDefault();
		},
		addCount(good) {
			//this.count++;
			var count = good.count;

			this.addGoods({
				product: good.product,
				count: ++count
			})
			//e.preventDefault()
		},
	}
}
</script>