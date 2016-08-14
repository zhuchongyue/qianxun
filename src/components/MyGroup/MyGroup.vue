<template>
    <div class="mygroup">
    	<div class="mygroup-info">
    	    <img src="../Common/img/p.png" alt="">
    	    <div class="mygroup-info-item">
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
    	        <p class="lack">
    	           还差6人
    	        </p>
    	        <button class="invite">
    	        	邀请好友参团
    	        </button>
    	    </div>
    	</div>

    	<div class="mygroup-info">
    	    <img src="../Common/img/p.png" alt="">
    	    <div class="mygroup-info-item">
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
    	        <p class="fail">
    	        	组团失败已退款
    	        </p>
    	    </div>
    	</div>
    	<div class="mygroup-info">
    	    <img src="../Common/img/p.png" alt="">
    	    <div class="mygroup-info-item">
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
    	        <p class="success">
    	        	组团成功
    	        </p>
    	    </div>
    	</div>
    </div>
    <div @click="hideMask" v-if="showMask" class="mygroup-mask">
        <div class="mygroup-mask-con">

			<p>
	            剩余xx小时xx分xx秒
	        </p>
	        <p>
	            还差x人组团成功
	        </p>
	        <p>
	            快去邀请更多小伙伴吧 
	        </p>
			        
            <img class="tangle" src="../Common/img/xiejiao.png" alt="">
            <img class="remind" src="../Common/img/tan.png" alt="">
        </div>
    </div>
</template>
<style lang="less">
    @import "MyGroup.less";
</style>
<script>
export default {
    name: 'mygroup',
    data(){
        return {
            showMask: true
        }
    },
    methods: {
        hideMask(){
            this.showMask = false;
        }
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