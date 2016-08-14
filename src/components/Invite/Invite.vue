<template>
    <div class="invite">
    	<div class="invite-top">
    		<img src="../Common/img/invite.png" alt="" />
    		<p>
    			邀请好友，免费送TA一张<i>7</i>元优惠券
    		</p>
    		<p>
    		如果TA进行了消费
    		</p>
    		<p>
    		订单完成后，你也得到一张<i>7</i>元优惠券
 			</p>
    	</div>

    	<div class="invite-info">
    		<img src="../Common/img/avatar.png" alt="">
    		<div class="invite-info-sum">
    			<div class="invite-info-sum-down">
    				<p class="line"></p>
    				<p>已邀请好友</p>
    				<var>7</var>
    			</div>
    			<div class="invite-info-sum-gain">
    			<p class="line"></p>
    				<p>得到优惠券</p>
    				<var>7</var>
    			</div>
    		</div>
    	</div>

    	<div class="invite-oper">
    		<p class="img-wrap">
    			<img src="../Common/img/coupons.png" alt="">
    			<span>
    				<var>8</var>
    				<i>元</i>
    			</span>
    		</p>
    	</div>

		<div class="invite-btn-wrap">
    	<button class="invite-btn">
    		邀请好友
    	</button>
    	</div>
    </div>
</template>
<style lang="less">
    @import "Invite.less";
</style>
<script>
export default {
    name: 'invite',
    
}