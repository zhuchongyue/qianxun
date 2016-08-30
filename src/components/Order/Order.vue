<template>
    <div class="order" v-if="orders && orders.length>0">
        <div v-for="order in orders" class="order-item">
            <p class="order-item-title">
               {{order.getTime}}提货
                <span>
                    订单号：{{ order.orderCode }}
                </span>
            </p>
            <div class="order-item-detail">
                <p v-for="detail in order.details">
                    {{ detail.title }}
                    <span>X{{ detail.num }}</span>
                </p>
            </div>
            <div class="order-item-oper order-item-down" v-if="order.status===2">
              <p>
                  <span class="price">￥{{ order.totalMoney }}</span>
                  <span class="delivery">已发货</span>
              </p>
            </div>
            <div class="order-item-oper order-item-end" v-if="order.status===3">
              <p>
                <span class="price">￥{{ order.totalMoney }}</span>
                <span class="delivery" v-if="order.status===3">已完成</span>
                </p>
            </div>
            <div class="order-item-oper" v-if="order.status<2 || order.status>3">
                <p>
                <span class="price">
                    ￥{{ order.totalMoney }}
                </span>
                <button @click="repay(order.orderId)" v-if="order.status===0">
                    支付
                </button>
                <button @click="showShare" v-if="order.status===4">
                    邀请好友
                </button>
                <span class="delivery" v-if="order.status===1">
                    待发货
                </span>
                </p>
            </div>
        </div>
    </div>
    <div @click="hideMask" v-if="showMask" class="order-mask">
        <div class="order-mask-con">
            戳这里邀请好友
            <img src="./img/sanjiao.png" alt="">
        </div>
    </div>
    <cart-nav-bar :index="3"></cart-nav-bar>
    
</template>
<style lang="less">
    @import "Order.less";
</style>
<script>

import CartNavBar from '../Common/CartNavBar.vue';

export default {
    name: 'order',
    data() {
        return {
            orders: [],
            showMask: false,
        }
    },
    components: {
        CartNavBar
    },
    methods: {
        hideMask(){
            this.showMask = false;
        },
        repay(orderId) {
            this.$http.jsonp("repay",{ params: {
                orderId
            }}).then( response => {
                if(response.data.respCode == 0) {

                    var config = response.data.respData;
                    var _this = this;
                    wx.ready( () => {
                        wx.chooseWXPay({
                            appId : config.appId,
                            timestamp : config.timeStamp,
                            nonceStr : config.nonceStr,
                            package : config.packageSign,
                            signType : config.signType,
                            paySign : config.paySign,
                            success(res){
                                alert("支付成功")
                               /* _this.router.go({
                                    name: 'gsuccess',
                                    params: {
                                        orderId: config.orderId
                                    }
                                })*/
                            },
                            cancel : function(res){
                                alert('您已取消支付')
                            }
                        })
                    })
                }
            })
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
                        alert('取消分享！')
                        // 用户取消分享后执行的回调函数
                    }
                });
            })
        }
    },
    route: {
    	data(){
            this.$http.jsonp("getMyOrders").then(response => {
                if(0 == response.data.respCode) {
                    this.orders = response.data.respData
                    console.log(this.orders)
                }
            });
    	},
    	activate(){
    		document.body.style.backgroundColor="#e6e6e6"
    	},
    	deactivate(){
    		document.body.style.backgroundColor=""
    	}
    }

}
