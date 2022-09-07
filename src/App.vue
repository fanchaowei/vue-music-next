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
  <router-view></router-view>
</template>

<style lang="scss"></style>
