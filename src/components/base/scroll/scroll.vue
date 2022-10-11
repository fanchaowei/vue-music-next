<script>
import { defineComponent, ref, defineProps, defineEmits } from 'vue'

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
  probeType: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['scroll'])

const rootRef = ref(null)

useScroll(rootRef, props, emits)
</script>

<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>
