<template>
    <div class="fail">
    	<div class="fail-title">
    		<img src="./img/failface.png" alt="fail">
    		<h4>支付失败</h4>
    	</div>

    	<div class="fail-btn">
    		<button>
    			重新支付
    		</button>
    	</div>
    </div>
</template>
<style lang="less">
    @import "Fail.less";
</style>
<script>
export default {
    name: 'fail',
    
}