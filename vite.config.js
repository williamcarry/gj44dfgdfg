import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    middlewares: [
      {
        // Mock API 中间件：处理 /api/mercure/token 请求
        apply: 'serve',
        handler: (req, res, next) => {
          if (req.url.startsWith('/api/mercure/token')) {
            const url = new URL(req.url, `http://${req.headers.host}`)
            const orderNo = url.searchParams.get('orderNo') || 'MOCK-' + Date.now()

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              success: true,
              token: `mock-jwt-token-${orderNo}-${Date.now()}`,
              topic: `orders/${orderNo}`,
              message: 'Mock token generated'
            }))
          } else if (req.url.startsWith('/api/qiniu/upload-token')) {
            // Mock API 中间件：处理七牛云上传凭证请求
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({
              uploadToken: `mock_upload_token_${Date.now()}_${Math.random().toString(36).substring(7)}`,
              domain: 'https://cdn-demo.example.com'
            }))
          } else {
            next()
          }
        }
      }
    ]
  }
})
