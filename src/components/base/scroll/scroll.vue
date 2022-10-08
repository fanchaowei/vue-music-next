<script>
import { defineComponent, ref, defineProps } from 'vue'

import useScroll from './use-scroll'

// 使用滚动组件
export default defineComponent({
  name: 'scroll',
})
</script>

<script setup>
const props = defineProps({
  click: {
    type: Boolean,
    default: false,
  },
})

const rootRef = ref(null)

useScroll(rootRef, props)
</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
