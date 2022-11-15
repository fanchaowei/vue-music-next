import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

// 需要添加的 class 名称
const relativeCls = 'g-relative'

// 注册自定义指令
export default function createLoadingLikeDirective(Comp) {
  function append(el) {
    const name = Comp.name
    // 父级元素 position 是否是如下三种, 不是则添加上
    const style = getComputedStyle(el)
    if (['fixed', 'relative', 'absolute'].indexOf(style.position) === -1) {
      addClass(el, relativeCls)
    }
    // 将 loading 的 DOM 结构添加到挂载的指定元素上
    el.appendChild(el[name].instance.$el)
  }

  function remove(el) {
    const name = Comp.name
    removeClass(el, relativeCls)
    el.removeChild(el[name].instance.$el)
  }

  // 获取传入的参数，并设置 title
  function setTitle(instance, binding) {
    const title = binding.arg
    if (typeof title !== 'undefined') {
      instance.setTitle(title)
    }
  }

  return {
    mounted(el, binding) {
      console.log('自定义指令 mounted')
      // 创建一个 loading 的 vue 实例
      const app = createApp(Comp)
      // 将其挂在到新建的 div 上
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name
      // 获取组件的名称，查看 element 对象上是否存在该组件名称的数组，没有则创建一个
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance

      // 设置 title
      setTitle(instance, binding)

      // 判断传入的值，如果是 true，则显示 loading 状态
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      const name = Comp.name
      // 设置 title
      setTitle(el[name].instance, binding)
      // 如果传入的值发生变化
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    },
  }
}
