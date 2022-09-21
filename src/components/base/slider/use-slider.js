import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { ref, onMounted, onUnmounted } from 'vue'

BScroll.use(Slide)

export default function useSlider(wrapperRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)

  onMounted(() => {
    // 实例化插件
    // 文档地址：https://better-scroll.github.io/docs/zh-CN/plugins/slide.html#%E4%BA%8B%E4%BB%B6
    slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    })

    // 注册插件事件
    slider.value.on('slideWillChange', (page) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value.destroy()
  })

  return {
    slider,
    currentPageIndex,
  }
}
