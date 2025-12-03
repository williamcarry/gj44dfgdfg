import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// 导入样式
import './styles/main.css'

// 导入国际化
import { t } from './i18n'

const app = createApp(App)

// 使用Element Plus和中文语言包
app.use(ElementPlus, { locale: zhCn })

// 注册全局方法
app.config.globalProperties.$t = t

// 挂载到DOM
const container = document.getElementById('shop-app')
if (container) {
  app.mount('#shop-app')
} else {
  console.warn('Shop app container not found')
}

export default app
