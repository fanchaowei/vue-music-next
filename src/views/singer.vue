<script>
import { defineComponent, onMounted, ref } from 'vue'

import { getSingerList } from '../service/singer'
import IndexList from '../components/base/index-list/index-list.vue'
export default defineComponent({
  name: 'singer',
})
</script>

<script setup>
// 歌手信息
const singers = ref([])

//#region 生命周期

onMounted(async () => {
  const result = await getSingerList()
  singers.value = result.singers
})

//#endregion
</script>

<template>
  <div class="singer" v-loading="!singers.length">
    <IndexList :data="singers"></IndexList>
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
