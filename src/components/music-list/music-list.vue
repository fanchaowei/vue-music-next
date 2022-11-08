<script>
import { defineComponent, computed, onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import SongList from '@/components/base/song-list/song-list.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
export default defineComponent({
  name: 'music-list',
})
</script>

<script setup>
const router = useRouter()
const props = defineProps({
  songs: {
    type: Array,
    default() {
      return []
    },
  },
  title: String,
  pic: String,
  loading: Boolean,
})
const { songs, title, pic } = toRefs(props)

const bgImageRef = ref(null)
// 图片高度
const imageHeight = ref(0)
const bgImageStyle = computed(() => {
  // 实现歌单列表向上滑动，能盖住歌手图片
  const scrollYVal = scrollY.value
  let zIndex = 0
  let paddingTop = '70%'
  let height = 0
  let translateZ = 0
  if (scrollYVal > maxTranslateY.value) {
    zIndex = 10
    paddingTop = 0
    height = `${RESERVED_HEIGHT}px`
    translateZ = 1
  }

  // 实现歌单列表向下滑动，歌手图片会放大的功能
  let scale = 1
  if (scrollYVal < 0) {
    // scale 是放大或缩小像素
    scale = 1 + Math.abs(scrollYVal / imageHeight.value)
  }

  return {
    zIndex,
    height,
    paddingTop,
    backgroundImage: `url(${pic.value})`,
    transform: `scale(${scale})translateZ(${translateZ}px)`,
  }
})
const scrollStyle = computed(() => {
  return {
    top: `${imageHeight.value}px`,
  }
})
const filterStyle = computed(() => {
  // 实现向上滑动歌曲列表，歌手图片会模糊的功能
  let blur = 0
  const scrollYVal = scrollY.value
  const imageHeightVal = imageHeight.value
  if (scrollYVal >= 0) {
    blur = Math.min(maxTranslateY.value / imageHeightVal, scrollY.value / imageHeightVal) * 20
  }
  return {
    backdropFilter: `blur(${blur}px)`,
  }
})

// 滚动组件当前的 y 轴值
const scrollY = ref(0)
// title 标题的高度
const RESERVED_HEIGHT = 40
// 滚动组件最大能滚动的距离
const maxTranslateY = ref(0)
// 实时获取滚动组件的 y 轴值
const onScroll = (pos) => {
  scrollY.value = -pos.y
}

// 返回
const goBack = () => {
  router.back()
}
onMounted(() => {
  // 获取图片的高度
  imageHeight.value = bgImageRef.value.clientHeight
  // 获取滚动组件最大能滚动的距离
  maxTranslateY.value = imageHeight.value - RESERVED_HEIGHT
})
</script>

<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImageRef">
      <div class="filter" :style="filterStyle"></div>
    </div>
    <Scroll
      class="list"
      :style="scrollStyle"
      v-loading="loading"
      :probe-type="3"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <SongList :songs="songs"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<style scoped lang="scss">
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
