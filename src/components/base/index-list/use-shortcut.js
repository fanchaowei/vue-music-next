import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef) {
  // scroll 组件的实例
  const scrollRef = ref(null)
  // 定义一个存储 y 轴滚动的标识
  const touch = {}
  // 锚点（右侧字母导航中，单个字母）的高度
  const ANCHOR_HEIGHT = 18
  // 右侧字母导航栏列表的 title
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  // 点击右侧字母导航栏，跳转到对应的位置
  const onShortcutTouchStart = (e) => {
    // 获取索引，这里取到的是 li 内的 :data-index 绑定的索引
    const anchorIndex = parseInt(e.target.dataset.index)

    // 存储当前点击下来时，y 轴的数值
    touch.y1 = e.touches[0].pageY
    // 几下当前的索引
    touch.anchorIndex = anchorIndex

    // 滚动到索引位置
    scrollTo(anchorIndex)
  }

  // 华东右侧字母导航栏，跳转到对应的位置
  const onShortcutTouchMove = (e) => {
    // 移动中，y 轴的数值
    touch.y2 = e.touches[0].pageY
    // 这里算出滑动过程中，我们滑动过了几个字母锚点
    // 这里的 | 0 相当于 Math.floor。返回小于等于一个给定数字的最大整数。
    const delta = ((touch.y2 - touch.y1) / ANCHOR_HEIGHT) | 0
    // 获取得到当前手指按压处的字母锚点索引
    const anchorIndex = touch.anchorIndex + delta

    // 滚动到索引位置
    scrollTo(anchorIndex)
  }

  // 滚动到索引位置
  const scrollTo = (anchorIndex) => {
    // 排除 anchorIndex 不是数字引发的错误
    if (isNaN(anchorIndex)) {
      return
    }
    // 限制 anchorIndex 的大小
    anchorIndex = Math.max(0, Math.min(shortcutList.value.length - 1, anchorIndex))
    // 获取对应的字母的列表 element 对象
    const targetEl = groupRef.value.children[anchorIndex]
    // 获取 BScroll 实例，然后调用对应的 api 方法，实现跳转
    const scroll = scrollRef.value.scroll.scroll.value
    scroll.scrollToElement(targetEl, 0)
  }

  return { shortcutList, onShortcutTouchStart, scrollRef, onShortcutTouchMove }
}
