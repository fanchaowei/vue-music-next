import { computed } from 'vue'

export default function useShortcut(props) {
  // 右侧字母导航栏列表的 title
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  return { shortcutList }
}
