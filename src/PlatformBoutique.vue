<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, inject, watch } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

// 注入首页数据
const homeData = inject('homeData', null)

// 当前语言
const currentLang = ref('zh-CN')

// 获取当前语言环境
const currentLanguage = computed(() => {
  return currentLang.value
})

// 多语言文本
const i18n = {
  title: {
    'zh-CN': '平台爆款',
    'en': 'Platform Bestsellers'
  },
  viewMore: {
    'zh-CN': '查看更多',
    'en': 'View More'
  }
}

// 翻译函数
const t = (key) => {
  return i18n[key]?.[currentLanguage.value] || i18n[key]?.['zh-CN'] || ''
}

// 平台名称映射
const platformNames = {
  'amazon': 'Amazon',
  'walmart': 'Walmart',
  'ebay': 'eBay',
  'temu': 'Temu',
  'shein': 'Shein',
  'tiktok': 'TikTok'
}

// 平台标签映射（支持多语言）
const platformLabels = {
  'amazon': {
    'zh-CN': '亚马逊热销产品',
    'en': 'Amazon Bestsellers'
  },
  'walmart': {
    'zh-CN': '沃尔玛热销产品',
    'en': 'Walmart Bestsellers'
  },
  'ebay': {
    'zh-CN': 'eBay热销产品',
    'en': 'eBay Bestsellers'
  },
  'temu': {
    'zh-CN': 'Temu热销产品',
    'en': 'Temu Bestsellers'
  },
  'shein': {
    'zh-CN': 'Shein热销产品',
    'en': 'Shein Bestsellers'
  },
  'tiktok': {
    'zh-CN': 'TikTok热销产品',
    'en': 'TikTok Bestsellers'
  }
}

// 平台数据，初始为空
const platformData = ref([])
const activePlatform = ref('')

// 监听 homeData 变化，更新 platformData
watch(() => homeData?.value?.platformBoutique, (newData) => {
  console.log('🔍 PlatformBoutique watch 触发:', newData)
  if (newData && Array.isArray(newData)) {
    platformData.value = newData.map(platform => ({
      key: platform.key,
      name: platformNames[platform.key] || platform.key,
      label: platformLabels[platform.key]?.[currentLanguage.value] || platformLabels[platform.key]?.['zh-CN'] || `${platformNames[platform.key]}热销产品`,
      products: platform.products || []
    }))
    
    console.log('✅ PlatformBoutique 数据已更新:', platformData.value)
    
    // 如果有数据，设置默认激活的平台
    if (platformData.value.length > 0 && !activePlatform.value) {
      activePlatform.value = platformData.value[0].key
      console.log('✅ 默认激活平台:', activePlatform.value)
    }
  }
}, { immediate: true, deep: true })

const currentPlatformData = computed(() => {
  return platformData.value.find(p => p.key === activePlatform.value)
})

function extractItemId(href) {
  const m = href?.match(/\/item\/(\d+)/)
  return m ? m[1] : ''
}

// 修改为使用 id
function productLink(p) {
  return p.id ? `/shop/item/${p.id}` : '#'
}
function linkTarget(p) {
  return undefined
}

function selectPlatform(platformKey) {
  activePlatform.value = platformKey
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
    // 语言切换时重新映射平台标签
    if (homeData?.value?.platformBoutique) {
      platformData.value = homeData.value.platformBoutique.map(platform => ({
        key: platform.key,
        name: platformNames[platform.key] || platform.key,
        label: platformLabels[platform.key]?.[currentLang.value] || platformLabels[platform.key]?.['zh-CN'] || `${platformNames[platform.key]}热销产品`,
        products: platform.products || []
      }))
    }
  }
}

// 组件挂载时初始化语言
onMounted(() => {
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  window.addEventListener('languagechange', handleLangChange)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<template>
  <section class="w-full" style="background-color: #F2F3F7;">
    <!-- 标题 -->
    <div class="w-full text-center py-11" style="background-color: #F2F3F7;">
      <h2 class="text-3xl font-bold text-slate-800">{{ t('title') }}</h2>
    </div>

    <!-- 平台选项卡 - Tab风格 -->
    <div class="mx-auto max-w-[1500px] w-[80%]">
      <div class="flex border-b border-slate-300">
        <button
          v-for="platform in platformData"
          :key="platform.key"
          class="flex-1 px-4 py-4 text-center cursor-pointer transition-all duration-200 border-r border-slate-300 flex flex-col items-center gap-2"
          :class="
            activePlatform === platform.key
              ? 'bg-white border-b-4 border-b-primary -mb-px'
              : 'bg-slate-50 hover:bg-slate-100'
          "
          @click="selectPlatform(platform.key)"
        >
          <img
            v-if="platform.key === 'amazon'"
            src="/frondend/images/PlatformBoutique/e827b18b-7406-44bd-af87-023264fe1e3f.jpg"
            :alt="platform.name"
            class="h-12 w-auto object-contain"
          />
          <img
            v-else-if="platform.key === 'walmart'"
            src="/frondend/images/PlatformBoutique/624010d8-62d6-4896-b9df-fad86d3388b6.jpg"
            :alt="platform.name"
            class="h-12 w-auto object-contain"
          />
          <img
            v-else-if="platform.key === 'ebay'"
            src="/frondend/images/PlatformBoutique/7f979b21-ecbd-48e9-99bb-f59fb2cc97b5.jpg"
            :alt="platform.name"
            class="h-12 w-auto object-contain"
          />
          <img
            v-else-if="platform.key === 'temu'"
            src="/frondend/images/PlatformBoutique/e419b640-34a9-47c6-a93e-aea7aa15cc94.png"
            :alt="platform.name"
            :class="activePlatform === platform.key ? 'h-12 w-auto object-contain' : 'h-12 w-auto object-contain filter grayscale opacity-60'"
          />
          <img
            v-else-if="platform.key === 'shein'"
            src="/frondend/images/PlatformBoutique/6354c66a-fee7-43be-a216-b900d199862a.png"
            :alt="platform.name"
            :class="activePlatform === platform.key ? 'h-12 w-auto object-contain' : 'h-12 w-auto object-contain filter grayscale opacity-60'"
          />
          <img
            v-else-if="platform.key === 'tiktok'"
            src="/frondend/images/PlatformBoutique/87d65da5-3a20-4e14-b93c-d33c2f421d53.png"
            :alt="platform.name"
            :class="activePlatform === platform.key ? 'h-12 w-auto object-contain' : 'h-12 w-auto object-contain filter grayscale opacity-60'"
          />
        </button>
      </div>
    </div>

    <!-- 当前平台的产品列表 - 与tab相连 -->
    <div class="mx-auto max-w-[1500px] w-[80%]" v-if="currentPlatformData">
      <!-- 产品网格容器 -->
      <div class="bg-white transition-all duration-300 border border-t-0 border-slate-300">
        <!-- 产品列表 -->
        <ul class="flex flex-wrap" style="row-gap:10px;">
          <li
            v-for="(product, idx) in currentPlatformData.products"
            :key="idx"
            class="flex flex-col items-center text-center border-r border-slate-200"
            :style="{
              width: 'calc(20% - 0.8px)',
              borderRight: idx % 5 === 4 ? 'none' : '1px solid #e2e8f0'
            }"
          >
            <div class="w-full flex flex-col items-center py-5">
              <!-- 产品图片 -->
              <a :href="productLink(product)" :target="linkTarget(product)" class="block text-center mb-3">
                <img
                  :src="product.img"
                  :alt="product.title"
                  class="inline-block w-[190px] h-[190px] object-contain cursor-pointer transition-all hover:opacity-80"
                  style="margin-top: 35px; margin-bottom: 25px"
                />
              </a>

              <!-- 产品标题和价格 -->
              <div class="px-2 pb-8 w-full flex-1 flex flex-col">
                <a
                :href="productLink(product)"
                :target="linkTarget(product)"
                class="text-sm text-slate-800 hover:text-primary transition line-clamp-2"
              >
                  {{ currentLanguage === 'en' ? (product.titleEn || product.title) : product.title }}
                </a>
              </div>
            </div>
          </li>
        </ul>

        <!-- 查看更多按钮 -->
        <div class="text-center py-5 border-t border-slate-200" style="background-color: #F2F3F7;">
          <a
            href="/cross-bordere-commerce"
            target="_blank"
            class="inline-block px-8 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition font-medium"
          >
            {{ t('viewMore') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 平台标签鼠标悬停时改变边框颜色 */
a[href]:hover {
  border-bottom-color: rgb(203, 38, 28);
}

/* 添加标题文本截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.5em;
  max-height: 3em;
}
</style>