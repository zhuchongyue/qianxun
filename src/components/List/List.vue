<template>
  <div class="list">
  	<date-ele></date-ele>

  	<div class="list-nav">
  		<p>
  			<a v-link="{ name: 'list', params: {cateid: 0} }" class="list-nav-item" :class="{'list-nav-item-selected': cateId == 0}">全部</a>
  			<a v-link="{ name: 'list', params: {cateid: 5} }" class="list-nav-item" :class="{'list-nav-item-selected': cateId == 5}">蔬菜</a>
  			<a v-link="{ name: 'list', params: {cateid: 1} }" class="list-nav-item" :class="{'list-nav-item-selected': cateId == 1}">水果</a>
  			<a v-link="{ name: 'list', params: {cateid: 4} }" class="list-nav-item" :class="{'list-nav-item-selected': cateId == 4}">生态肉禽蛋</a>
  			<a v-link="{ name: 'list', params: {cateid: -1} }" class="list-nav-item" :class="{'list-nav-item-selected': cateId == -1}">低价拼团</a>
  			<a v-link="{ name: 'list', params: {cateid: 6} }" class="list-nav-item" :class="{'list-nav-item-selected': cateId == 6}">放心海鲜</a>
  			<a v-link="{ name: 'list', params: {cateid: 7} }" class="list-nav-item" :class="{'list-nav-item-selected': cateId == 7}">手工食品</a>
  		</p>
  	</div>

  	<div class="list-items">
      <template v-for="product in productList">
          <template v-if="product.isCanGroup==1">

              <group-item :product="product"></group-item>
              
          </template>
          <template v-else>

              <general-item :product="product"></general-item>

          </template>
      </template>
  	
  	</div>

  	<div class="list-oper">
  		<div class="list-oper-empty">
  			<div v-show="!showCartMask" class="list-oper-empty-car" @click="showCart">
  				<img src="../Common/img/car.png" alt="">
  			</div>
  			<!-- <div class="list-oper-empty-word">
          购物车是空的
        </div> -->
        <div class="list-oper-empty-word">
          共<span class="sum-price">￥{{ sumPrice }}</span>
          (满￥{{ config.limitFreight }}包邮)
        </div>
  			<div class="list-oper-empty-summary">
          <a v-link="{name: 'delivery'}">
  				    结算({{allGoods.length}})
          </a>
  			</div>
  		</div>
  	</div>

  </div>
    <cart-mask></cart-mask>

</template>v ;/
<style lang="less">
    @import "List.less";
</style>
<script>

import DateEle from '../Common/Date.vue'

import GeneralItem from '../Common/GeneralItem.vue'

import GroupItem from '../Common/GroupItem.vue'

import cartMask from '../Common/CartMask.vue'

import { groupbuyid, allGoods, config } from '../../vuex/getters.js'


export default {
    name: 'home',
    vuex: {
      getters: {
        allGoods,
        groupbuyid,
        config
      }
    },
    methods: {
      showCart(){
        this.showCartMask = true;
        this.$broadcast('show-cart');
      }
    },  
    ready(){
    },
    data(){
      return {
        productList: [],
        showCartMask: false
      }
    },
    events: {
      'hide-cart':function() {
        this.showCartMask = false;
      },
      'update-groupbuyid': function() {
        this.$router.go({
          name: 'list',
          params: { cateid: 0 }
        })
      }
    },
    computed: {
      cateId(){
        return this.$route.params.cateid
      },
      sumPrice() {
        var price = 0;

        this.allGoods.forEach(value => {
          price += parseInt(value.product.price,10) * value.count;
        })

        return price
      }
    },
    route: {
      data() {

        var params = {};

        if(this.cateId > 0 ){
          params = {
            pageNo:1,
            pageSize: 30,
            categoryId: this.cateId,
            groupbuyId: this.groupbuyid
          }
        }else{
          params = {
            pageNo:1,
            pageSize: 30,
            groupbuyId: this.groupbuyid

          }
        }

        if(this.cateId == -1) {
            params = {
              pageNo:1,
              pageSize: 30,
              isGroup: 1,
              groupbuyId: this.groupbuyid

            }
        }


        this.$http.jsonp("getListInfo", { 
          params
        }).then(response => {
            if(response.data.respCode == 0) {
              this.productList = response.data.respData
            }
        })
      }
    },
    components: {
        dateEle: DateEle,
        generalItem: GeneralItem,
        groupItem: GroupItem,
        cartMask
    }
}