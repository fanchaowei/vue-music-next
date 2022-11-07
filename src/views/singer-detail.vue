<script>
import { defineComponent, toRefs, onMounted } from 'vue'

import { getSingerDetail } from '@/service/singer.js'
import { processSongs } from '@/service/song.js'
export default defineComponent({
  name: 'singer-detail',
})
</script>

<script setup>
const props = defineProps({
  singer: Object,
})
const { singer } = toRefs(props)

onMounted(async () => {
  // 获取歌手的歌单
  const result = await getSingerDetail(singer.value)
  // 获取歌曲的播放 url
  const songs = await processSongs(result.songs)
  console.log('result', result, songs)
})
</script>

<template>
  <div class="singer-detail">111</div>
</template>

<style scoped lang="scss">
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
