import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    // 增加代理，防止跨域
    proxy: {
      // 匹配所有以 '/api' 开头的请求，并转发到目标服务器
      '/hot': {
        target: 'https://apis.tianapi.com', // 这里替换为你的实际后端API地址
        changeOrigin: true, // 允许跨域，将主机头的原点改为目标URL
        rewrite: (path) => path.replace(/^\/hot/, ''), // 如果需要重写路径以匹配后端接口，则可以使用rewrite函数
      },
      '/weather': {
        target: 'https://restapi.amap.com/v3', // 这里替换为你的实际后端API地址
        changeOrigin: true, // 允许跨域，将主机头的原点改为目标URL
        rewrite: (path) => path.replace(/^\/weather/, ''), // 如果需要重写路径以匹配后端接口，则可以使用rewrite函数
      },
    }
  },
  plugins: [
    vue(),
    Components({ resolvers: [VantResolver()] })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
