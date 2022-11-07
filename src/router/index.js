import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/recommend.vue'
import Search from '@/views/search.vue'
import Singer from '@/views/singer.vue'
import TopList from '@/views/top-list.vue'
import SingerDetail from '@/views/singer-detail.vue'

const routes = [
  {
    path: '/',
    component: Recommend,
  },
  {
    path: '/recommend',
    component: Recommend,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail,
      },
    ],
  },
  {
    path: '/top-list',
    component: TopList,
  },
  {
    path: '/user',
    component: null,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
