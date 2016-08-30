<template>
    <div class="test">
    	<null-ele :word="word"></null-ele>
    </div>
</template>
<style lang="less">
    @import "Test.less";
</style>
<script>

import NullEle from '../Common/NullEle.vue'

export default {
    name: 'home',
    data() {
    	return {
    		word: '你目前还没有订单',
    	}
    },
    components: {
    	NullEle,
    }
}