<template>
	<div class="mod-item">
		<img src="./img/luobo.png" alt="">
		<div class="mod-item-info">
			<h3>新西兰进口胡萝新西兰进口胡萝卜</h3>
			<p class="desc">
				新鲜采摘绝无农药新鲜采摘绝无农药
			</p>
			<p>
				<span class="now">
					￥28.9	
				</span>
				<span class="old">
					￥45.9
				</span>
			</p>
			<p>
				<span class="sum">已收343份</span>
				<span class="buy">
					<b class="reduce">-</b>
					<var>0</var>
					<b class="add active">+</b>
				</span>
			</p>
		</div>
	</div>
</template>
<style lang="less">
	@import 'GeneralItem.less';
</style>
<script>
	export default {
		name: 'GeneralItem',
		props: ['item']
	}
</script>