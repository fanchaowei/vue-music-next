vue3 编写的音乐 webapp。
课程链接：[音乐 webapp](https://coding.imooc.com/learn/list/503.html)。
```
.
├── README.md  // 阅读材料
├── babel.config.js 
├── backend // 后端 node ，用于数据生成
│   ├── prod.server.js
│   ├── router.js
│   └── sign.js
├── package.json // 项目文件清单
├── public 
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── fonts // 字体文件
│   │   │   ├── music-icon.eot
│   │   │   ├── music-icon.svg
│   │   │   ├── music-icon.ttf
│   │   │   └── music-icon.woff
│   │   └── scss // css 文件
│   │       ├── base.scss // 基础 css 配置 
│   │       ├── icon.scss // 图标字体配置
│   │       ├── index.scss // 导出入口
│   │       ├── mixin.scss // 公用 css 函数配置
│   │       ├── reset.scss // 对基础标签做样式重置
│   │       └── variable.scss // 定义公用基础变量
│   ├── components
│   │   ├── base // 公用的组件
│   │   │   └── slider
│   │   │       └── slider.vue
│   │   ├── header // 头部组件
│   │   │   ├── header.vue
│   │   │   ├── logo@2x.png
│   │   │   └── logo@3x.png
│   │   └── tab // tab 标签
│   │       └── tab.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── service api 接口
│   │   ├── base.js // axios 封装
│   │   └── recommend.js
│   ├── store
│   │   └── index.js
│   └── views // 页面
│       ├── recommend.vue
│       ├── search.vue
│       ├── singer.vue
│       └── top-list.vue
├── tree.txt
├── vue.config.js
└── yarn.lock

```