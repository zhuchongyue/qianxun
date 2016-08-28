<template>
    <div class="home-time">

        <div v-if="timeDefault" @click="spread" class="home-time-content home-time-content-default">
            <div class="word">
                提货时间:
            </div>
            <div class="date date-default">
                
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
</template>
<style lang="less">
  @import 'Date.less';
</style>

<script>

  import { changeGroupbuyid, clearGoods } from '../../vuex/actions.js'
  
  import { groupbuyid } from '../../vuex/getters.js'

  export default {
      name:'DateEle',
      data() {
        return {
          length:[1,2,3],
              times:[],
              selectedTime:{ time: ""},
              timeDefault: true,
              productList:[]
        }
      },
      ready(){
        this.$http.jsonp("getBannersAndTimes").then(response => {

            if(response.data.respCode == 0) {
                this.times = response.data.respData.times
                
                if(this.groupbuyid == 0) {
                    this.changeGroupbuyid(this.times[0].groupbuyId)
                    this.selectedTime = this.times[0];
                }else {
                    this.times.forEach(value => {
                        if(value.groupbuyId == this.groupbuyid){
                          this.selectedTime = value
                        }
                    })
                }
                
              }
          })
      },
      vuex: {
          actions: {
              changeGroupbuyid,
              clearGoods
          },
          getters: {
              groupbuyid,
          }
      },
      methods: {
        spread() {
            this.timeDefault = false
        },
        selectTime(time) {
            this.selectedTime = time;
            this.changeGroupbuyid(time.groupbuyId);
            //this.getRecommendInfoById(time.groupbuyId);
            this.$dispatch('update-groupbuyid')
            this.timeDefault = true;
            this.clearGoods();
        },
      }
  }

</script>
