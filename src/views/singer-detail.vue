<script>
import { defineComponent, toRefs, onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import { getSingerDetail } from '@/service/singer.js'
import { processSongs } from '@/service/song.js'
import MusicList from '@/components/music-list/music-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
export default defineComponent({
  name: 'singer-detail',
})
</script>

<script setup>
const route = useRoute()
const props = defineProps({
  singer: Object,
})
const { singer } = toRefs(props)

const loading = ref(true)
// 歌曲数据
const songs = ref([])
// 是否从缓存中获取 singer 数据
const singerData = computed(() => {
  let ret = null
  const singerVal = singer.value
  // props 是否有值，没有就从缓存里找
  if (singerVal) {
    ret = singerVal
  } else {
    const cachedSinger = storage.session.get(SINGER_KEY)
    if (cachedSinger && cachedSinger.mid === route.params.id) {
      ret = cachedSinger
    }
  }
  return ret
})
// 图片
const pic = computed(() => {
  return singerData.value && singerData.value.pic
})
// 歌手名称
const title = computed(() => {
  return singerData.value && singerData.value.name
})

onMounted(async () => {
  // 获取歌手的歌单
  const result = await getSingerDetail(singerData.value)
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
