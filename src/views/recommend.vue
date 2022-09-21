<script>
import { defineComponent, onMounted, ref, computed } from 'vue'
import { getRecommend } from '@/service/recommend.js'

import Slider from '@/components/base/slider/slider.vue'
import Scroll from '@/components/base/scroll/scroll.vue'

export default defineComponent({
  name: 'recommend',
})
</script>

<script setup>
//#region 推荐页面相关

// 页面加载 loading
const loading = computed(() => {
  return !sliders.value.length && !albums.value.length
})
const loadingText = ref('正在载入...')

// 获取歌单和轮播图数据
async function getRecommendData() {
  const result = await getRecommend()
  return result
}
// 轮播图数据
const sliders = ref([])
// 推荐榜单数据
const albums = ref([])
console.log('主组件获取数据前...')
console.log('主组件获取数据后...')
//#endregion

//#region 生命周期

onMounted(async () => {
  console.log('主组件 mounted')
  // 获取数据
  const result = await getRecommendData()
  // 赋值轮播图
  sliders.value = result.sliders
  // 赋值推荐榜单
  albums.value = result.albums
})

//#endregion
</script>

<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <Scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <Slider v-if="sliders.length" :sliders="sliders"></Slider>
          </div>
        </div>
        <div class="recommend-list" v-show="!loading">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in albums" class="item" :key="item.id">
              <div class="icon">
                <!-- v-lazy 是图片懒加载插件给予的 -->
                <img width="60" height="60" v-lazy="item.pic" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="title">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<style scoped lang="scss">
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
