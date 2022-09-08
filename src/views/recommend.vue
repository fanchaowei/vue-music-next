<script>
import { defineComponent, onMounted } from 'vue'
import { getRecommend } from '@/service/recommend.js'

export default defineComponent({
  name: 'recommend',
})
</script>

<script setup>
// 获取歌单和轮播图数据
async function getRecommendData() {
  const result = await getRecommend()
  console.log(result)
}

//#region 生命周期

onMounted(async () => {
  getRecommendData()
})

//#endregion
</script>

<template>
  <div>Recommend</div>
</template>

<style scoped lang="scss"></style>
