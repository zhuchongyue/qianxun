<template>
	<div class="detail">
		<swiper :list="banners"></swiper>
		<div class="detail-infos">
			<h3>
				美国进口樱桃
			</h3>
			<p class="detail-infos-price">
				<span class="now">
					￥29.8
				</span>
				<span class="old">
					￥35.9
				</span>
				<span class="count">
					<button>
						加入购物车
					</button>
				</span>
			</p>
			<div class="detail-infos-tag">
				<span>
					<img src="./img/selected.png" alt="">
					快递
				</span>
				<span>
					<img src="./img/selected.png" alt="">自提
				</span>
				<span>
					<img src="./img/selected.png" alt="">当日采摘
				</span>
			</div>
			<p class="detail-infos-invite">
				<a href="">
					邀请好友立减15元
					<img src="../Common/img/arrow_grap.png" alt="">
				</a>
			</p>
			<ul>
				<li>新鲜采摘绝无农药无农药</li>
				<li>新鲜采摘绝无农药无农新鲜采摘绝无农药无农</li>
			</ul>
			
		</div>

		

		<div class="detail-intro">
			
			<div class="detail-intro-tap">
				<div class="detail-intro-tap-item  selected">
					规格
				</div>
				<div class="detail-intro-tap-item split">
					图文详情
				</div>
				
			</div>

			<div class="detail-intro-contents">
				<div class="detail-intro-contents-spec">
					<p>
						<span class="name">
							商品名称
						</span>
						<span class="spec">
							美国进口樱桃
						</span>
					</p>
					<p>
						<span class="name">商品规格</span>

						<span class="spec">
							500g
						</span> 
						 

					</p>
					<p>
						<span class="name">价格</span>

						<span class="spec">
							29.8元
						</span> 
						 

					</p>
					<p>
						<span class="name">产地</span>

						<span class="spec">
							美国
						</span>
					</p>

					<p>
						<span class="name">产品编号</span>

						<span class="spec">
							12345
						</span> 

					</p>

					<p>
						<span class="name">保质期</span>

						<span class="spec">
							冷藏保存,尽快食用
						</span> 

					</p>
				</div>
				<div class="detail-intro-contents-detail none">

					<div class="img-wrap">
						<img src="./img/banner.png" alt="">
					</div>
					<p>
						<span class="name">
							商品名称
						</span>
						<span class="spec">
							美国进口樱桃
						</span>
					</p>
					<p>
						<span class="name">商品规格</span>

						<span class="spec">
							500g
						</span> 
						 

					</p>
					<p>
						<span class="name">价格</span>

						<span class="spec">
							29.8元
						</span> 
						 

					</p>
					<p>
						<span class="name">产地</span>

						<span class="spec">
							美国
						</span>
					</p>

					<p>
						<span class="name">产品编号</span>

						<span class="spec">
							12345
						</span> 

					</p>

					<p>
						<span class="name">保质期</span>

						<span class="spec">
							冷藏保存,尽快食用
						</span> 

					</p>
				</div>
				
			</div>
		</div>

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

	export default {
		name: 'detail',
		data() {
			return {
				banners:[
					{img: './img/banner.png'},
					{img: './img/banner.png'},
					{img: './img/banner.png'},
				]
			}
		},
		route: {
			data() {
				this.$http.jsonp("getGoodsInfo", {
					params: {
						groupGoodsId: 14
					}
				})

				this.$http.jsonp("getGoodsInfo", {
					params: {
						goodsId: 14
					}
				})
			}
		},
		components:{
			Swiper
		}
	}
</script>