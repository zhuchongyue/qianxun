<template>
    <div class="success">
    	<div class="success-title">
    		<img src="./img/face.png" alt="success">
    		<h4>支付成功</h4>
    	</div>
    	<div class="success-addr">
    		<p>
    			提货时间: {{ successInfo.getTime }}
    		</p>
    		<p>
    			提货地址: {{ successInfo.address }}
    			<span>&nbsp;复制</span>
    		</p>
    		<p>
    			取货时报手机尾号{{ successInfo.phone }}
    		</p>
    	</div>
    	<div class="success-continue">
    		<a v-link="{ name: 'list', params: {cateid: 0 }}">
    			继续购买周五到货商品
    		</a>
    	</div>
    	<div class="success-invite">
    		<p><img src="./img/invite.png" alt="invite"></p>
    		<p>
    			邀请好友
    		</p>
    		<p>
    			TA得<i>{{ successInfo.invitedMoney }}</i>元，你得<i>{{ successInfo.inviteMoney }}</i>元
    			<span>&nbsp;&nbsp;邀请</span>
    		</p>
    		<div class="success-invite-coupons">
    			<p class="img-wrap">
    				<img src="./img/coupons.png" alt="">
    				<span>
    					<var>{{ successInfo.inviteMoney }}</var>
    					<i>元</i>
    				</span>
    			</p>
    				
    		</div>

    		<button @click="showShare" class="success-invite-btn">
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
                showMask: false,
                successInfo: {}
            }
    },
    computed: {
        orderId(){
            return this.$route.params.orderId;
        }
    },
    route: {
        data() {
            this.$http.jsonp("orderSuccess", { params: {
                orderId: this.orderId
            }}).then( response => {
                if(0 == response.data.respCode ){
                    this.successInfo = response.data.respData
                }
            })
        }
    },
    methods: {
        hideMask(){
            this.showMask = false;
        },
        showShare() {
            this.showMask = true;

            var link = "http://www.qx-llt.com/test/?wx=true#!/"

            var _this = this;
            wx.ready(function(){
                wx.onMenuShareTimeline({
                    title: '千寻邻里团', // 分享标题
                    link: link, // 分享链接
                    imgUrl: "http://static.qx-llt.com/images/upload/20160519/27203415ac344c70be3a115b883730a5.jpg", // 分享图标
                    success: function () { 
                        _this.showMask = false;
                        alert('分享成功！')
                    },
                    cancel: function () {
                        _this.showMask = false;
                        alert('取消失败！')
                        // 用户取消分享后执行的回调函数
                    }
                });
            })
        }
    }
}