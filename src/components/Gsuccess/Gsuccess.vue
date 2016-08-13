<template>
    <div class="gsuccess">
        <div class="gsuccess-dir">
        	<div class="gsuccess-title ">
        		<p>
                    剩余xx小时xx分xx秒
                </p>
                <p>
                    还差x人组团成功
                </p>
                <p>
                    快去邀请更多小伙伴吧 
                </p>
                <img class="tangle" src="./img/sanjiao.png" alt="">
                <img class="remind" src="./img/tan.png" alt="">
        	</div>
        </div>
    	
        <div class="gsuccess-info">
            <img src="./img/p.png" alt="">
            <div class="gsuccess-info-item">
                <p>
                    <span class="title">
                        日本进口草莓_500g 
                    </span>
                    <span class="count">
                        X5
                    </span>
                </p>
                <p class="detail">
                    <span class="number">
                        10人组团
                    </span>
                    &nbsp;&nbsp;
                    <span class="price">
                        ￥59.9
                    </span>
                </p>
            </div>
        </div>
    	
        <div class="gsuccess-dir">
        	<div class="gsuccess-invite">
        		<p><img src="./img/invite.png" alt="invite"></p>
        		<p>
        			邀请好友
        		</p>
        		<p>
        			TA得<i>7</i>元，你得<i>7</i>元
        			<span>&nbsp;&nbsp;邀请</span>
        		</p>
        		<div class="gsuccess-invite-coupons">
        			<p class="img-wrap">
        				<img src="./img/coupons.png" alt="">
        				<span>
        					<var>8</var>
        					<i>元</i>
        				</span>
        			</p>
        				
        		</div>

        		<button class="gsuccess-invite-btn">
        			邀请好友
        		</button>
        	</div>
        </div>
    </div>
   
</template>
<style lang="less">
    @import "Gsuccess.less";
</style>
<script>
export default {
    name: 'gsuccess',
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