const path = require('path')

// 设置别名
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入 scss，这里全局引入 变量 和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `,
      },
    },
  },
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias.set('@', resolve('src'))
  },
}
