<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
<script setup>
import MHeader from '@/components/header/header'
import Tab from '@/components/tab/tab'
</script>

<template>
  <m-header></m-header>
  <Tab></Tab>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style lang="scss"></style>
