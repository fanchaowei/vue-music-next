<script>
import { defineComponent, defineProps, ref, onMounted } from 'vue'

import useSlider from './use-slider'

export default defineComponent({
  name: 'slider',
})
</script>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  sliders: {
    type: Array,
    default() {
      return []
    },
  },
})

const rootRef = ref(null)
const { currentPageIndex } = useSlider(rootRef)

onMounted(() => {})
</script>

<template>
  <div class="slide-wrapper" ref="rootRef">
    <div class="slide-content">
      <div class="slide-page" v-for="item in sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.pic" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{ active: currentPageIndex === index }"
      >
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide-wrapper {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  position: relative;
  .slide-content {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slide-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
