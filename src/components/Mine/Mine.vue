<template>
    <div class="mine">
    	<div class="mine-info">
    		<img :src="account.portrait" alt="touxiao">
    		<p class="mine-name">
    			{{account.nickName}}
    		</p>
    	</div>

    	<div class="mine-items">
    		<a class="mine-items-item" v-link="{ name: 'order' }">
    			<span>
    			<img class="icon1" src="./img/dan.png" alt="">
    			</span>
    			我的订单 
				<img class="arrow" src="./img/arrow.png" alt="">
    		</a>
    		<a class="mine-items-item" v-link= "{ name: 'mygroup' }">
    			<span><img class="icon2" src="./img/tuan.png" alt=""></span>
    			我的拼团
				<img class="arrow" src="./img/arrow.png" alt="">
    		</a>
    		<a class="mine-items-item" v-link="{ name: 'ticket' }">
    			<span><img class="icon3" src="./img/quan.png" alt=""></span>
    			我的优惠券
				<img class="arrow" src="./img/arrow.png" alt="">
    		</a>
    	</div>
    </div>
</template>
<style lang="less">
    @import "Mine.less";
</style>
<script>
export default {
    name: 'mine',
    data() {
        return {
            account: {}
        }
    },
    ready(){
        this.$http.jsonp("getMyAccount").then(response => {
            if(0 == response.data.respCode) {
                this.account = response.data.respData
            }
        })
    },
    route: {
    	data(){

    	},
    	activate(){
    		document.body.style.backgroundColor="#e6e6e6"
    	},
    	deactivate(){
    		document.body.style.backgroundColor=""
    	}
    }
}