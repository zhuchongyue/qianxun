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
  		<general-item></general-item>
  		<general-item></general-item>
  		<general-item></general-item>
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

export default {
    name: 'home',
    components: {
        dateEle:DateEle,
        generalItem: GeneralItem
    }
}