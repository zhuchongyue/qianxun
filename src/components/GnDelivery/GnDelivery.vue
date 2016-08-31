<template>
	<div class="gndelivery">
		<div class="gndelivery-tip">
			<!-- <p v-if="submitInfo.warn" class="delivery-tip-harry"> -->
			<p class="delivery-tip-harry">
				{{ submitInfo.warn }}
				库存紧张请尽快支付
			</p>

		</div>

		<div class="gndelivery-addr">
			<p>提货时间:</p>
			<p>提货地址:</p>
		</div>
	</div>
</template>
<style lang="less">
	@import 'GnDelivery.less';
</style>
<script>
	export default {
		name: 'gndelivery',

	}
</script>