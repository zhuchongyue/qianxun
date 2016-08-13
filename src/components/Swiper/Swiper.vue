<template>
  <div class="vux-slider">
    <div class="vux-swiper" :style="{height: xheight}">
      <slot></slot>
      <div class="vux-swiper-item" v-for="item in list" @click="clickListItem(item)">
        <a :href="item.url">
          <div class="vux-img" :style="{backgroundImage: buildBackgroundUrl(item.img)}"></div>
          <!-- <p class="vux-swiper-desc">{{item.title}}</p> -->
        </a>
      </div>
    </div>
    <div :class="[dotsClass, 'vux-indicator', 'vux-indicator-' + dotsPosition]" v-show="showDots">
      <a href="javascript:" v-for="key in length">
        <i class="vux-icon-dot" :class="{'active': key === current}"></i>
      </a>
    </div>
  </div>
</template>

<script>
import Swiper from './swiper'
import { go } from './router'

export default {
  ready () {
    if (!(this.list && this.list.length === 0)) {
      this.render()
    }
    this.xheight = this.getHeight()
  },
  methods: {
    clickListItem (item) {
      go(item.url, this.$router)
      this.$emit('on-click-list-item', JSON.parse(JSON.stringify(item)))
    },
    buildBackgroundUrl (url) {
      return `url(${url})`
    },
    render () {
      this.swiper = new Swiper({
        container: this.$el,
        direction: this.direction,
        auto: this.auto,
        loop: this.loop,
        interval: this.interval,
        threshold: this.threshold,
        duration: this.duration,
        height: this.height || this._height,
        minMovingDistance: this.minMovingDistance,
        imgList: this.imgList
      })
      .on('swiped', (prev, index) => {
        this.current = index
        this.index = index
      })
    },
    rerender () {
      if (!this.$el) {
        return
      }
      this.$nextTick(() => {
        this.index = 0
        this.current = 0
        this.length = this.list.length || this.$children.length
        this.destroy()
        this.render()
      })
    },
    destroy () {
      this.swiper && this.swiper.destroy()
    },
    getHeight () {
      // when list.length > 0, it's better to set height or ratio
      const hasHeight = parseInt(this.height, 10)
      if (hasHeight) return this.height
      if (!hasHeight) {
        if (this.aspectRatio) {
          return this.$el.offsetWidth * this.aspectRatio + 'px'
        }
        return '180px'
      }
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    showDots: {
      type: Boolean,
      default: true
    },
    dotsPosition: {
      type: String,
      default: 'right'
    },
    dotsClass: String,
    auto: {
      type: Boolean,
      default: false
    },
    loop: Boolean,
    interval: {
      type: Number,
      default: 3000
    },
    threshold: {
      type: Number,
      default: 50
    },
    duration: {
      type: Number,
      default: 300
    },
    height: {
      type: String,
      default: 'auto'
    },
    aspectRatio: Number,
    minMovingDistance: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      current: this.index,
      xheight: 'auto',
      length: this.list.length
    }
  },
  watch: {
    list (val) {
      this.rerender()
    },
    current (currentIndex) {
      this.$emit('on-index-change', currentIndex)
    },
    index (val) {
      if (val !== this.current) {
        this.$nextTick(() => {
          this.swiper.go(val)
        })
      }
    }
  },
  beforeDestroy () {
    this.destroy()
  }
}

</script>

<style lang="less">
@import 'Swiper.less';
</style>
