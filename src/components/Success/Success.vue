<template>
    <div class="success">
    	<div class="success-title">
    		<img src="./img/face.png" alt="success">
    		<h4>支付成功</h4>
    	</div>
    	<div class="success-addr">
    		<p>
    			提货时间: 星期一（8月11日)
    		</p>
    		<p>
    			提货地址:大西洋城D区12号楼3单元
    			<span>&nbsp;复制</span>
    		</p>
    		<p>
    			取货时报手机尾号7845
    		</p>
    	</div>
    	<div class="success-continue">
    		<a href="">
    			继续购买周五到货商品
    		</a>
    	</div>
    	<div class="success-invite">
    		<p><img src="./img/invite.png" alt="invite"></p>
    		<p>
    			邀请好友
    		</p>
    		<p>
    			TA得<i>7</i>元，你得<i>7</i>元
    			<span>&nbsp;&nbsp;邀请</span>
    		</p>
    		<div class="success-invite-coupons">
    			<p class="img-wrap">
    				<img src="./img/coupons.png" alt="">
    				<span>
    					<var>8</var>
    					<i>元</i>
    				</span>
    			</p>
    				
    		</div>

    		<button class="success-invite-btn">
    			邀请好友
    		</button>
    	</div>
    </div>
    <div @click="hideMask" v-if="showMask" class="success-mask">
        <div class="success-mask-con">
            戳这里邀请好友
            <img src="./img/sanjiao.png" alt="">
        </div>
    </div>
</template>
<style lang="less">
    @import "Success.less";
</style>
<script>
export default {
    name: 'success',
    data(){
            return {
                showMask: true
            }
        },
    methods: {
        hideMask(){
            this.showMask = false;
        }
    }
}