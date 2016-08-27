<template>
    <div class="mygroup">

        <div v-for="group in myGroup" class="mygroup-info">
            <img :src="group.img" alt="">
            <div class="mygroup-info-item">
                <p>
                    <span class="title">
                        {{ group.title }}
                    </span>
                    <span class="count">
                        X5
                    </span>
                </p>
                <p class="detail">
                    <span class="number">
                        {{ group.groupPerson }}人组团
                    </span>
                    &nbsp;&nbsp;
                    <span class="price">
                        ￥{{ group.money }}
                    </span>
                   
                </p>
                <p class="lack" v-if="group.status == 1">
                   还差{{ group.remPerson }}人
                </p>
                <template v-if="group.status == 0">
                    <button class="invite">
                        待支付
                    </button>
                </template>

                <template v-if="group.status == 1">
                    <button @click="inviteFriend(group)" class="invite">
                        邀请好友参团
                    </button>
                </template>

                
                <template v-if="group.status == 2">
                   <p class="success">
                        组团成功
                    </p>
                </template>
                <template v-if="group.status == 3">
                    <p class="fail">
                        组团失败已退款
                    </p>  
                </template>
               
            </div>
        </div>

    	
    </div>
    <div @click="hideMask" v-if="showMask" class="mygroup-mask">
        <div class="mygroup-mask-con">

			<p>
	            剩余xx小时xx分xx秒
	        </p>
	        <p>
	            还差{{ lackPerson }}人组团成功
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
            showMask: false,
            myGroup: [],
            lackPerson: 0,
        }
    },
    methods: {
        hideMask(){
            this.showMask = false;
        },
        inviteFriend(group) {
            this.showMask = true;
            this.lackPerson = group.remPerson;

            var link = `http://www.qx-llt.com/test/?wx=true&teamId=${group.teamId}#!/gdetail/${group.groupGoodsId}`;
            var _this = this;

            wx.ready(function(){
                wx.onMenuShareTimeline({
                    title: '千寻邻里团', // 分享标题
                    link: link, // 分享链接
                    imgUrl: group.img, // 分享图标
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
    },
    route: {
    	data(){
            this.$http.jsonp("getMyGroups").then(response => {
                console.log(response)
                if( 0 == response.data.respCode ) {
                    this.myGroup = response.data.respData;
                }
            })
    	},
    	activate(){
    		document.body.style.backgroundColor="#e6e6e6"
    	},
    	deactivate(){
    		document.body.style.backgroundColor=""
    	}
    }
}