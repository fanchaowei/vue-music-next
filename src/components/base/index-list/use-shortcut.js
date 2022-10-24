import { computed, ref } from 'vue'

export default function useShortcut(props, groupRef) {
  // scroll 组件的实例
  const scrollRef = ref(null)
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
    // 获取对应的字母的列表 element 对象
    const targetEl = groupRef.value.children[anchorIndex]
    // 获取 BScroll 实例，然后调用对应的 api 方法，实现跳转
    const scroll = scrollRef.value.scroll.scroll.value
    scroll.scrollToElement(targetEl, 0)
  }

  return { shortcutList, onShortcutTouchStart, scrollRef }
}
