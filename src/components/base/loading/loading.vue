<script>
import { defineComponent, ref, defineExpose } from 'vue'
export default defineComponent({
  name: 'loading',
})
</script>

<script setup>
const title = ref('加载中...')

// eslint-disable-next-line no-unused-vars
const setTitle = (newTitle) => {
  title.value = newTitle
}

defineExpose({
  setTitle,
})
</script>

<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif" />
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
}
</style>
