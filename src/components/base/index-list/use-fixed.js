import { ref, watch, nextTick } from 'vue'

export default function useFixed(data) {
  // ul 的 element 对象
  const groupRef = ref(null)
  // 各个分类的高度值数组
  const listHeights = ref([])
  // 滚动的 Y 轴值
  const scrollY = ref(0)

  // 当 data 值变动，就对高度值数组重新赋值
  watch(
    () => data,
    async () => {
      await nextTick()
      calculate()
    }
  )

  // 对高度值的数组进行赋值
  function calculate() {
    const list = groupRef.value.children
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0
    listHeightsVal.push(height)
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll(pos) {
    // 因为 pos.y 为负值，所以需要取负
    scrollY.value = -pos.y
  }

  return {
    groupRef,
    onScroll,
  }
}
