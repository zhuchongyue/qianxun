<template>
    <div class="home">

        <div class="home-time">

            <div v-if="timeDefault" @click="spread" class="home-time-content home-time-content-default">
                <div class="word">
                    提货时间:
                </div>
                <div class="date date-default">
                    <!-- <p class="date-item ">
                        2016年8月1号 星期一 
                        <img src="./img/selected.png" alt="">
                    </p> -->
                    <p class="date-item date-selected">
                        {{selectedTime.time}}
                        <img src="./img/selected.png" alt=""> 
                    </p>
                  
                </div>
                <div @click="spread" class="spread">
                    <img src="./img/up.png">
                </div>
            </div>
            <div v-else class="home-time-content">
                <div class="word">
                    提货时间:
                </div>
                <div class="date date-default">
                    <!-- <p class="date-item date-selected">
                        2016年8月1号 星期一 
                        <img src="./img/selected.png" alt="">
                    </p> -->
                    <p v-for="time in times" @click="selectTime(time)" class="date-item" :class="{ 'date-selected': time.groupbuyId == selectedTime.groupbuyId}">
                       {{ time.time }}
                        <img v-if="time.groupbuyId == selectedTime.groupbuyId" src="./img/selected.png" alt=""> 
                    </p>
                    
                </div>
                <div @click="spread" class="spread">
                    <img src="./img/sanjiao.png">
                </div>
            </div>
        </div>
        <div class="home-banner">
            <swiper :list="banners"></swiper>
        </div>
        <div class="home-nav">
        	<div class="home-nav-indep">
        		<img src="./img/hot.png" alt="">
        		<p>
        			低价拼团
        		</p>
        	</div>
        	<div class="home-nav-other">

        		<div class="home-nav-other-wrap">
	        		<div class="home-nav-other-item">
	        			<img class="fruit" src="./img/fruit.png" alt="">
	        			<p>
	        				新鲜水果
	        			</p>
	        		</div>
	        		<div class="home-nav-other-item">
	        			<img class="meat" src="./img/meat.png" alt="">
	        			<p>
	        				生态肉禽蛋
	        			</p>
	        		</div>
	        		<div class="home-nav-other-item">
	        			<img class="vegetable" src="./img/vegetable.png" alt="">
	        			<p>
	        				安心蔬菜
	        			</p>
	        		</div>
        		</div>

        		<div class="home-nav-other-wrap">
	        		<div class="home-nav-other-item">
	        			<img class="sea" src="./img/sea.png" alt="">
	        			<p>
	        				放心海鲜
	        			</p>
	        		</div>
	        		<div class="home-nav-other-item">
	        			<img class="handmade" src="./img/handmade.png" alt="">
	        			<p>
	        				手工食品
	        			</p>
	        		</div>
	        		<div class="home-nav-other-item">
	        			<img class="all" src="./img/all.png" alt="">
	        			<p>
	        				全部商品
	        			</p>
	        		</div>
	        	</div>
        	</div>
        </div>
        <div class="home-list">
        	<div class="home-list-word">
        		<p></p>
        		<span>当季热门</span>
        	</div>


        	<div class="home-list-content">
                <group-item></group-item>
        		<div v-for="var p in length" class="home-list-content-item">
        			<img src="./img/luobo.png" alt="">
        			<div class="home-list-content-item-info">
        				<h3>新西兰进口胡萝新西兰进口胡萝卜</h3>
        				<p class="desc">
        					新鲜采摘绝无农药新鲜采摘绝无农药
        				</p>
        				<p>
        					<span class="now">
        						￥28.9	
        					</span>
							<span class="old">
								￥45.9
							</span>
        				</p>
        				<p>
        					<span class="sum">已收343份</span>
        					<span class="buy">
        						<b class="reduce">-</b>
        						<var>0</var>
        						<b class="add active">+</b>
        					</span>
        				</p>
        			</div>
        		</div>
        	</div>
        	
        </div>

        <div class="home-oper">
        	<div class="home-oper-item">
        		<div class="img-wrap">
        			<img class="img-home" src="./img/home.png" alt="">
        		</div>
        		<p>首页</p>
        	</div>
        	<div class="home-oper-item home-oper-center">
        		<div class="img-wrap">
        			<img src="./img/car.png" alt="">
        		</div>
        		<p>购物车</p>
        	</div>
        	<div class="home-oper-item">
        		<div class="img-wrap">
        			<img class="img-user" src="./img/user.png" alt="">
        		</div>
        		<p>我的</p>
        	</div>
        </div>
    </div>
</template>
<style lang="less">
    @import "Home.less";
</style>
<script>

import swiper from '../Swiper/Swiper.vue'

import util from '../../libs/util.js'

import groupItem from '../Common/GroupItem.vue'

export default {
    name: 'home',
    data() {
    	return {
    		length:[1,2,3],
            banners:[],
            times:[],
            selectedTime:{ time: "星期一"},
            timeDefault: true
    	}
    },
    route: {
        data() {
            this.$http.jsonp("getBannersAndTimes").then(response => {

                if(response.data.respCode == 0) {
                    this.times = response.data.respData.times
                    this.banners = response.data.respData.banners.map(value => {
                        value.img = util.handleImg(value.imgUrl)
                        return value
                    })

                }
            });

            this.$http.jsonp("getRecommendInfo", { params: {
                pageNo:1,
                pageSize:10
            }}).then(response => {
                console.log(response.data.respData)
            })

            this.$http.jsonp("getListInfo", { params: {
                pageNo:1,
                pageSize:10
            }}).then(response => {
                console.log(response.data.respData)
            })

            this.$http.jsonp("getTeamGoodsList", {params: {
                pageNo:1,
                pageSize:10
            }}).then(response => {
                console.log(response.data.respData)
            })
        }
    },
    methods: {
        selectTime(time) {
            this.selectedTime = time
            this.timeDefault = true
        },
        spread() {
            this.timeDefault = false
        }
    },
    components: {
        swiper,
        groupItem
    }
}
</script>