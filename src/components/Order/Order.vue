<template>
    <div class="order">
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
            <div class="order-item-oper">
                <p>
                <span class="price">
                    ￥{{ order.totalMoney }}
                </span>
                <button>
                    支付
                </button>
                </p>
            </div>
        </div>
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <button>
                    邀请好友
                </button>
                </p>
            </div>
        </div>
        
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <span class="delivery">
                    代发货
                </span>
                </p>
            </div>
        </div>
        
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper order-item-down">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <span class="delivery">
                    已发货
                </span>
                </p>
            </div>
        </div>
        
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper order-item-end">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <span class="delivery">
                    已完成
                </span>
                </p>
            </div>
        </div>
    	<!-- 
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <button>
                    支付
                </button>
                </p>
            </div>
        </div>
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <button>
                    邀请好友
                </button>
                </p>
            </div>
        </div>
        
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <span class="delivery">
                    代发货
                </span>
                </p>
            </div>
        </div>
        
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper order-item-down">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <span class="delivery">
                    已发货
                </span>
                </p>
            </div>
        </div>
        
        <div class="order-item">
            <p class="order-item-title">
                xx月xx日提货
                <span>
                    订单号：420809032803284
                </span>
            </p>
            <div class="order-item-detail">
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
                <p>
                    新西兰进口胡萝新西兰进口胡
                    <span>X5</span>
                </p>
            </div>
            <div class="order-item-oper order-item-end">
                <p>
                <span class="price">
                    ￥28.9
                </span>
                <span class="delivery">
                    已完成
                </span>
                </p>
            </div>
        </div>
         -->
    </div>
</template>
<style lang="less">
    @import "Order.less";
</style>
<script>


/*function getId() {
    var userInfo = localStorage.getItem("userInfo");

    return {
        uid: userInfo.uid,
        openId: userInfo.openid
    }
}*/


export default {
    name: 'order',
    data() {
        return {
            orders: [],
            groupOrders: [],

        }
    },
    route: {
    	data(){
            this.$http.jsonp("getMyOrders").then(response => {
                if(0 == response.data.respCode) {
                    this.orders = response.data.respData
                }
            });

            this.$http.jsonp("getMyGroups").then( response => {
                if(0 == response.data.respCode) {
                    this.groupOrders = response.data.respData
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