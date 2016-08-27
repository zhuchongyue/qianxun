<template>
    <div class="ticket">

    <template v-if="tickets.length>0">
        <div v-for="ticket in tickets" class="ticket-item">

            <p class="ticket-item-title">
                {{ ticket.inviteTime }}邀请好友{{ ticket.inviteUser }}获得 
            </p>
            <div class="img-wrap">
                <img src="../Common/img/opun_bg.png" alt="">
                <span class="price">
                    <var>{{ ticket.money }}</var>
                    <i>元</i>
                </span>
                <div class="spec">
                    <p>千寻立减优惠券</p>
                    <p>
                        满<var>{{ ticket.limitMoney }}</var>元能用
                    </p>
                </div>
                <span class="deadline">
                    {{ ticket.desc }}
                </span>
            </div>
        </div>
    </template>
    <template v-else>
        <h3>
            暂无可用优惠券
        </h3>
    </template>

        

        <!-- <div class="ticket-item">
        
            <p class="ticket-item-title">
                xx月xx日邀请好友xxx获得 
            </p>
            <div class="img-wrap">
                <img src="../Common/img/opun_bg.png" alt="">
                <span class="price">
                    <var>8</var>
                    <i>元</i>
                </span>
                <div class="spec">
                    <p>千寻立减优惠券</p>
                    <p>
                        满<var>50</var>元能用
                    </p>
                </div>
                <span class="deadline">
                    2016.8.29过期
                </span>
            </div>
        </div>
        
        <div class="ticket-item">
        
            <p class="ticket-item-title">
                xx月xx日邀请好友xxx获得 
            </p>
            <div class="img-wrap">
                <img src="../Common/img/opun_bg.png" alt="">
                <span class="price">
                    <var>8</var>
                    <i>元</i>
                </span>
                <div class="spec">
                    <p>千寻立减优惠券</p>
                    <p>
                        满<var>50</var>元能用
                    </p>
                </div>
                <span class="deadline">
                    2016.8.29过期 
                </span>
            </div>
        </div> -->
    </div>
   
</template>
<style lang="less">
    @import "Ticket.less";
</style>
<script>
export default {
    name: 'ticket',
    data(){
        return {
            tickets: []
        }
    },
    route: {
        data() {
            this.$http.jsonp("getMyTickets").then(response => {
                console.log(response)
                if(0 == response.data.respCode ) {
                    this.tickets = response.data.respData
                }
            })
        }
    }
}