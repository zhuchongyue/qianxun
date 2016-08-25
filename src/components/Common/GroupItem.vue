<template>
	<a v-link="{ name: 'group-detail', params: { goodId: product.goodsId}}">
		<div class="group-item" href="">
			<img :src="product.img | handleImg"/>
			<div class="group-item-info">
				<h3>{{product.title}}</h3>
				<p class="desc">{{product.subTitle}}</p>
				<p class="oldpri">￥{{product.price}}</p>
				<p class="oper">{{product.groupPerson}}人团价 <span class="now">￥{{product.groupPrice}}</span>
					<span class="oper-buy">
					<i></i>抢购</span>
				</p>
			</div>
		</div>
	</a>
</template>
<style lang="less">
	@import "GroupItem.less";
</style>
<script>

	import util from '../../libs/util.js'

	export default {
		name: 'GroupItem',
		props:['product'],
		filters:{
			handleImg: util.handleImg
		},
		data(){
			return {

			}
		}
	}
</script>
