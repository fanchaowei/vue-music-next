import { ref, watch, nextTick, computed } from 'vue'

export default function useFixed(props) {
  // 抬头标签的固定长度
  const TITLE_HEIGHT = 30
  // ul 的 element 对象
  const groupRef = ref(null)
  // 各个分类的高度值数组
  const listHeights = ref([])
  // 滚动的 Y 轴值
  const scrollY = ref(0)
  // 当前可视窗口所在的那段列表的标识
  const currentIndex = ref(0)
  // 下一个列表顶部距离与固定抬头标签相减得出的高度，用来做标签被顶上去的动画使用
  const distance = ref(0)

  const fixedTitle = computed(() => {
    if (scrollY.value <= 0) {
      return ''
    }
    const currentGroup = props.data[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  // 用于输出标签被顶出的 css 动画效果
  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    // 计算查看下一个列表的顶部高度是否已经小于抬头标签的固定高度了，如果是就求出小了多少了
    const diff = distanceVal > 0 && distanceVal < TITLE_HEIGHT ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0, ${diff}px,0)`,
    }
  })

  // 当 data 值变动，就对高度值数组重新赋值
  watch(
    () => props.data,
    async () => {
      await nextTick()
      calculate()
    }
  )
  // 监听滚动值，以得出目前可视窗口是在哪段列表上
  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const topHeight = listHeightsVal[i]
      const bottomHeight = listHeightsVal[i + 1]
      if (topHeight <= newY && newY < bottomHeight) {
        currentIndex.value = i
        distance.value = bottomHeight - newY
      }
    }
  })

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
    currentIndex,
    fixedTitle,
    fixedStyle,
  }
}
