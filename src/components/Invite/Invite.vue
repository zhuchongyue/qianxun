<template>
    <div class="invite">
    	<div class="invite-top">
    		<img src="../Common/img/invite.png" alt="" />
    		<p>
    			邀请好友，免费送TA一张<i>{{ invite.invitedMoney }}</i>元优惠券
    		</p>
    		<p>
    		如果TA进行了消费
    		</p>
    		<p>
    		订单完成后，你也得到一张<i>{{ invite.inviteMoney }}</i>元优惠券
 			</p>
    	</div>

    	<div class="invite-info">
    		<img v-bind:src="invite.pic" alt="">
    		<div class="invite-info-sum">
    			<div class="invite-info-sum-down">
    				<p class="line"></p>
    				<p>已邀请好友</p>
    				<var>{{ invite.personNum }}</var>
    			</div>
    			<div class="invite-info-sum-gain">
    			<p class="line"></p>
    				<p>得到优惠券</p>
    				<var>{{ invite.cardNum }}</var>
    			</div>
    		</div>
    	</div>

    	<div class="invite-oper">
    		<p class="img-wrap">
    			<img src="../Common/img/coupons.png" alt="">
    			<span>
    				<var>{{ invite.inviteMoney }}</var>
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
    data() {
			return {
				invite: {},
			}
		},
    route: {
      data() {
        this.$http.jsonp("getInviteDetails").then( response => {
          if( 0 == response.data.respCode ){
            this.invite = response.data.respData
          }
        })
      }
    },
}
