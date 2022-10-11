import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emits) {
  const scroll = ref(null)

  onMounted(() => {
    // eslint-disable-next-line no-unused-vars
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options,
    }))

    // 当 probeType 大于 0 ，则可以监听触发 scroll 事件
    if (options.probeType > 0) {
      scroll.value.on('scroll', (pos) => {
        // 通过 emits 调用父级传入的方法，将 pos 值传出。
        // pos 值就是滚动条的最高处距离可视屏幕的 Y 轴值
        emits('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    scroll,
  }
}
