import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
// 自定义组件
import loadingDirective from '@/components/base/loading/directive.js'
import noResultDirective from './components/base/no-result/directive'

// 引入全局样式文件
import '@/assets/scss/index.scss'

const app = createApp(App)
app.use(store)
app.use(router)

// 配置图片懒加载插件
app.use(lazyPlugin, {
  loading: require('@/assets/images/default.png'),
})

// 全局注册自定义命令
app.directive('loading', loadingDirective)
app.directive('no-result', noResultDirective)

app.mount('#app')
