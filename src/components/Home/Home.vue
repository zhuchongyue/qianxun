<template>

    <div class="home">
       
        <date-ele></date-ele>

        <div class="home-banner">
            <swiper :list="banners"></swiper>
        </div>
        <div class="home-nav">
        	<div class="home-nav-indep">
                <a v-link="{ name: 'list', params: {cateid: -1} }">
            		<img src="./img/hot.png" alt="">
            		<p>
            			低价拼团
            		</p>
                </a>
        	</div>
        	<div class="home-nav-other">

        		<div class="home-nav-other-wrap">
	        		<div class="home-nav-other-item">
                        <a v-link="{ name: 'list', params: {cateid: 1} }">
    	        			<img class="fruit" src="./img/fruit.png" alt="">
    	        			<p>
    	        				新鲜水果
    	        			</p>
                        </a>
	        		</div>
	        		<div class="home-nav-other-item">
                        <a v-link="{ name: 'list', params: {cateid: 4} }">
    	        			<img class="meat" src="./img/meat.png" alt="">
    	        			<p>
    	        				生态肉禽蛋
    	        			</p>
                        </a>
	        		</div>
	        		<div class="home-nav-other-item">
                        <a v-link="{ name: 'list', params: {cateid: 5} }">
    	        			<img class="vegetable" src="./img/vegetable.png" alt="">
    	        			<p>
    	        				安心蔬菜
    	        			</p>
                        </a>
	        		</div>
        		</div>

        		<div class="home-nav-other-wrap">
	        		<div class="home-nav-other-item">
                        <a v-link="{ name: 'list', params: {cateid: 6} }">
    	        			<img class="sea" src="./img/sea.png" alt="">
    	        			<p>
    	        				放心海鲜
    	        			</p>
                        </a>
	        		</div>
	        		<div class="home-nav-other-item">
                        <a v-link="{ name: 'list', params: {cateid: 7} }">
    	        			<img class="handmade" src="./img/handmade.png" alt="">
    	        			<p>
    	        				手工食品
    	        			</p>
                        </a>
	        		</div>
	        		<div class="home-nav-other-item">
                        <a v-link="{ name: 'list', params: {cateid: 0} }">
    	        			<img class="all" src="./img/all.png" alt="">
    	        			<p>
    	        				全部商品
    	        			</p>
                        </a>
	        		</div>
	        	</div>
        	</div>
        </div>
        <div class="home-list">
        	<div class="home-list-word">
        		<p></p>
        		<span>热门推荐</span>
        	</div>

        	<div class="home-list-content">
                <template v-for="product in productList">
                    <template v-if="product.isCanGroup==1">
                        <group-item :product="product"></group-item>
                    </template>
                    <template v-else>
                        <general-item :product="product"></general-item>
                    </template>
                </template>
        	</div>
        </div>
       <!--  <div class="home-oper">
           <div class="home-oper-item">
               <div class="img-wrap">
                   <img class="img-home" src="./img/home_blue.png" alt="">
               </div>
               <p>首页</p>
           </div>
           <div class="home-oper-item home-oper-center" @click="showCart">
               <div v-if="allGoods.length>0" class="red-point"></div>
               <div class="img-wrap">
                   <img src="./img/car_blue.png" alt="">
               </div>
               <p>购物车</p>
           </div>
           <div class="home-oper-item">
               <a v-link="{ name: 'mine'}">
                   <div class="img-wrap">
                       <img class="img-user" src="./img/user_blue.png" alt="">
                   </div>
                   <p>我的</p>
               </a>
           </div>
       </div> -->
       <cart-nav-bar :index="1"></cart-nav-bar>
        <div @click="goTop(0.2,16)" class="home-back">
            <img src="./img/top.png">
        </div>
    </div>
    <cart-mask></cart-mask>
</template>
<style lang="less">
    @import "Home.less";
</style>
<script>

import swiper from '../Swiper/Swiper.vue'

import util from '../../libs/util.js'

import DateEle from '../Common/Date.vue'

import groupItem from '../Common/GroupItem.vue'

import generalItem from '../Common/GeneralItem.vue'

import cartMask from '../Common/CartMask.vue'

import CartNavBar from '../Common/CartNavBar.vue';

import { changeGroupbuyid, clearGoods } from '../../vuex/actions.js'

import { groupbuyid, allGoods } from '../../vuex/getters.js'

export default {
    name: 'home',
    data() {
    	return {
            banners:[],
            productList:[]
    	}
    },
    vuex: {
        actions: {
            changeGroupbuyid,
            clearGoods
        },
        getters: {
            groupbuyid,
            allGoods
        }
    },
    ready(){
    },
    filters:{
        handleImg: util.handleImg
    },
    route: {
        data() {
            this.$http.jsonp("getBannersAndTimes").then(response => {

                if(response.data.respCode == 0) {
                   
                    this.banners = response.data.respData.banners.map(value => {
                        value.img = util.handleImg(value.imgUrl)
                        if(process.env.NODE_ENV !== 'production') {
                            if(value.imgUrl == '') {
                                value.img = "http://static.qx-llt.com/images/upload/20160806/3638ef587e1c43f2aabf9983797c9f6f.jpg"
                            }
                        }
                        return value
                    })

                }
            });

            this.$http.jsonp("getRecommendInfo", { params: {
                pageNo:1,
                pageSize:30
            }}).then(response => {
                if(response.data.respCode == 0){
                    this.productList = response.data.respData
                }
            })


        }
    },
    events: {
        'update-groupbuyid': function() {
            this.getRecommendInfoById(this.groupbuyid);
        },
        'pop-cart': function() {
            this.$broadcast('show-cart');
        }
    },
    methods: {
        showCart(){
            this.$broadcast('show-cart');
        },
        
        getRecommendInfoById(id) {
            this.$http.jsonp("getRecommendInfo", { params: {
                groupbuyId: id,
                pageNo:1,
                pageSize:30
            }}).then(response => {
                if(response.data.respCode == 0){
                    this.productList = response.data.respData
                }
            })
        },

        goTop(acceleration, time) { 
             
             function invokeFunction() {
                var y1 = 0; 
                var y2 = 0; 
                var x3 = 0; 
                var y3 = 0; 
                 
                if (document.documentElement) { 
                    y1 = document.documentElement.scrollTop || 0; 
                } 
                if (document.body) { 
                    y2 = document.body.scrollTop || 0; 
                } 
                var y3 = window.scrollY || 0; 
                var y = Math.max(y1, y2, y3); 
                 
                var speed = 1 + acceleration; 

                window.scrollTo(0, Math.floor(y / speed));

                if(y > 0 ) { 
                    window.setTimeout(invokeFunction, time); 
                }
             }
             
            // 如果距离不为零, 继续调用迭代本函数 
            if(document.body.scrollTop > 0 ) { 
                window.setTimeout(invokeFunction, time); 
            } 
        } 

    },
    components: {
        swiper,
        groupItem,
        generalItem,
        cartMask,
        dateEle:DateEle,
        CartNavBar,
    }
}
</script>
