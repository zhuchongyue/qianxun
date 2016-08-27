<template>
    <div class="gsuccess">
        <div class="gsuccess-dir">
        	<div class="gsuccess-title ">
        		<p>
                    剩余xx小时xx分xx秒
                </p>
                <p>
                    还差{{ successInfo.remPerson }}人组团成功
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
                        {{ successInfo.title }}
                    </span>
                    <span class="count">
                        X5
                    </span>
                </p>
                <p class="detail">
                    <span class="number">
                        {{ successInfo.groupPerson }}人组团
                    </span>
                    &nbsp;&nbsp;
                    <span class="price">
                        ￥{{ successInfo.price }}
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
        			TA得<i>{{ successInfo.inviteMoney }}</i>元，你得<i>{{ successInfo.invitedMoney }}</i>元
        			<span>&nbsp;&nbsp;邀请</span>
        		</p>
        		<div class="gsuccess-invite-coupons">
        			<p class="img-wrap">
        				<img src="./img/coupons.png" alt="">
        				<span>
        					<var>{{ successInfo.invitedMoney }}</var>
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
            showMask: true,
            successInfo: {}
        }
    },
    ready(){
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
    },
    computed: {
        orderId() {
            return this.$route.params.orderId;
        }
    },
    route: {
        data() {
            this.$http.jsonp("orderSuccess", { params : {
                orderId: this.orderId
            }}).then(response => {
                if(0 == response.data.respCode ) {
                    this.successInfo = response.data.respData
                }
            })
        }
    },
    methods: {
        hideMask(){
            this.showMask = false;
        }
    }
}