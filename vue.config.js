const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  "devServer":{
    "proxy": {
      "/api": {
      "target": 'http://localhost:10000/',
      "pathRewrite": { '^/api': '' },
      "changeOrigin": true,
      "secure": false
      }
    }
  }
})
