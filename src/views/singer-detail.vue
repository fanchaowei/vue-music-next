<script>
import { defineComponent, toRefs, onMounted, ref, computed } from 'vue'

import { getSingerDetail } from '@/service/singer.js'
import { processSongs } from '@/service/song.js'
import MusicList from '@/components/music-list/music-list.vue'
export default defineComponent({
  name: 'singer-detail',
})
</script>

<script setup>
const props = defineProps({
  singer: Object,
})
const { singer } = toRefs(props)

const loading = ref(true)
// 歌曲数据
const songs = ref([])
// 图片
const pic = computed(() => {
  return singer.value && singer.value.pic
})
// 歌手名称
const title = computed(() => {
  return singer.value && singer.value.name
})

onMounted(async () => {
  // 获取歌手的歌单
  const result = await getSingerDetail(singer.value)
  // 获取歌曲的播放 url
  songs.value = await processSongs(result.songs)
  loading.value = false
})
</script>

<template>
  <div class="singer-detail">
    <MusicList :songs="songs" :title="title" :pic="pic" :loading="loading"></MusicList>
  </div>
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
