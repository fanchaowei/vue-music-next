<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getSingerList } from '../service/singer'
import IndexList from '../components/base/index-list/index-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant.js'
export default defineComponent({
  name: 'singer',
})
</script>

<script setup>
const router = useRouter()

// 歌手信息
const singers = ref([])
// 点击选中的歌手
const selectedSinger = ref(null)
// 获取点击选中的歌手，并跳转页面
const selectSinger = (singer) => {
  console.log('selectSinger')
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push({ path: `/singer/${singer.mid}` })
}
const cacheSinger = (singer) => {
  storage.session.set(SINGER_KEY, singer)
}

//#region 生命周期

onMounted(async () => {
  const result = await getSingerList()
  singers.value = result.singers
})

//#endregion
</script>

<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers" @select="selectSinger"></IndexList>
    <router-view :singer="selectedSinger"></router-view>
  </div>
</template>

<style scoped lang="scss">
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
