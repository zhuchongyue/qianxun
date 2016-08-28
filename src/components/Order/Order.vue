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
                <button  v-if="order.status===0">
                    支付
                </button>
                <button  v-if="order.status===4">
                    邀请好友
                </button>
                <span class="delivery" v-if="order.status===1">
                    待发货
                </span>
                </p>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    @import "Order.less";
</style>
<script>
export default {
    name: 'order',
    data() {
        return {
            orders: [],
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
