<template>
  <div class="list">
  	<date-ele></date-ele>

  	<div class="list-nav">
  		<p>
  			<a class="list-nav-item list-nav-item-selected">全部</a>
  			<a href="" class="list-nav-item">蔬菜</a>
  			<a href="" class="list-nav-item">水果</a>
  			<a href="" class="list-nav-item">生态肉禽蛋</a>
  			<a href="" class="list-nav-item">低价拼团</a>
  			<a href="" class="list-nav-item">放心海鲜</a>
  			<a href="" class="list-nav-item">手工食品</a>
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
  		<!--
      groupItem
      <general-item></general-item>
      <general-item></general-item>
      <general-item></general-item> -->
  	</div>

  	<div class="list-oper">
  		<div class="list-oper-empty">
  			<div class="list-oper-empty-car">
  				<img src="../Common/img/car.png" alt="">
  			</div>
  			<div class="list-oper-empty-word">
  				购物车是空的
  			</div>
  			<div class="list-oper-empty-summary">
  				结算(0)
  			</div>
  		</div>
  	</div>
  </div>
</template>v ;/
<style lang="less">
    @import "List.less";
</style>
<script>

import DateEle from '../Common/Date.vue'

import GeneralItem from '../Common/GeneralItem.vue'

import GroupItem from '../Common/GroupItem.vue'

export default {
    name: 'home',
    data(){
      return {
        productList: []
      }
    },
    route: {
      data() {
        this.$http.jsonp("getListInfo", { params: {
           pageNo:1,
           pageSize: 20
        }
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
        groupItem: GroupItem
    }
}