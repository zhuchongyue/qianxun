<template>
	<div class="null">
		<div class="null-icon">
			<img src="./img/null.png" alt="null">
			<p>
				{{ word }}
			</p>
		</div>
		<div class="null-link">
			<a v-link="" class="null-link-a">
				去逛逛
			</a>
		</div>
	</div>
</template>
<style lang="less">
	@import 'NullEle.less';
</style>
<script>
	export default {
		name: 'null-ele',
		props: ['word'],
	}
</script>