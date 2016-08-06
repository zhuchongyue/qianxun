<template>
  <div class="date">

      <div class="date-time-content">
          <div class="word">
              提货时间:
          </div>
          <div class="time">
              <p class="time-item date-selected">
                  2016年8月1号 星期一 
                  <img src="./img/selected.png" alt="">
              </p>
             <!--  <p class="time-item">
                 2016年8月1号 星期一
                 <img src="./img/selected.png" alt="">
             </p>
             <p class="time-item">
                 2016年8月1号 星期一
                 <img src="./img/selected.png" alt=""></p>
             <p class="time-item">2016年8月1号 星期一
                 <img src="./img/selected.png" alt="">
             </p> -->
          </div>
          <div @click="spread" class="spread">
              <img src="./img/sanjiao.png">
          </div>
      </div>
  </div>
</template>
<style lang="less">
  @import 'Date.less';
</style>

<script>
  
    export default {
      name:'DateEle'
    }

</script>
