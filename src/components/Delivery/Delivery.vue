<template>
	<div class="delivery">
		<div class="delivery-tip">
			<p class="delivery-tip-harry">
				xxx库存紧张 请尽快支付
			</p>
			<div class="delivery-tip-place">
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
			</div>
		</div>

		<div class="delivery-addr">
			<div class="delivery-addr-tap">
				<div class="delivery-addr-tap-select">选择现有自提点</div>
				<div class="delivery-addr-tap-new">新建自提点</div>
			</div>

			<div class="delivery-addr-info">
				<div class="delivery-addr-info-select">
					<div>
						<p>
							选择现有自提点
						</p>
						<div>
							
						</div>
					</div>
					<div>
						<div>
							<p>收货人</p>
							<div>
								Jesscka
							</div>
						</div>
						<div>
							<p>电话</p>
							<div>
								18658342423
							</div>
						</div>
					</div>
					
				</div>
				<div class="delivery-addr-info-new">
					
				</div>
			</div>
		</div>

		<div class="delivery-voucher">
			暂无可用代价券
		</div>
		<div class="delivery-list">
			<div class="delivery-list-item">
				<img src="./img/luobo.png" alt="">
				<div class="delivery-list-item-info">
					<h3>新西南进口胡萝卜</h3>
					<p class="price">
						￥29.8
					</p>
					<span class="buy">
						<b>-</b>
						<var>0</var>
						<b class="active">+</b>
					</span>
				</div>
			</div>
		</div>

		<div class="delivery-all">
			<p>
				优惠<span>5元</span>
			</p>
			<p>
				运费<span>10元</span>
			</p>
			<p>
				合计<span>120元</span>
			</p>
		</div>

		<div class="delivery-wx">
			<img src="./img/wx.png">
			<p>微信支付</p>
		</div>

		<div class="delivery-oper">
			<div class="delivery-oper-all">
				
				<div class="delivery-oper-all-word">
					共<span>￥177</span>
				</div>
				<div @click="createOrder" class="delivery-oper-all-summary">
					支付订单
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less">
	@import 'Delivery.less';
</style>
<script>
	export default {
		name:'delivery',
		data() {
			return {
				submitInfo: {}
			}
		},

		route: {
			data(){
				var goods =  JSON.stringify([{"goodsId": 38, "number": 3},{"goodsId": 14,"number": 1}]);

				this.$http.jsonp("submitOrder",{
					params: {
						goods,
						groupbuyId: 1
					}
				}).then(response => {
					if(response.data.respCode == 0) {
						this.submitInfo = response.data.respData
					}
				});
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
								},
								cancel : function(res){
									alert('cancel')
								}
							})
						})
					}
				})
			}
		}
	}
</script>