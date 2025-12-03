<template>
  <header class="w-full border-b border-slate-200">
    <!-- Top utility bar -->
    <div class="hidden md:block bg-slate-50 text-slate-600 text-sm">
      <div
        class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1150px] px-4 md:px-0 py-2 relative"
        style="height: 36px; line-height: 36px"
      >
        <div class="float-right flex items-center h-full">
          <div class="relative group inline-flex items-center h-full px-4 border-r border-slate-300">
            <a
              href="#"
              class="inline-flex items-center gap-1 hover:text-primary text-sm"
              @click.prevent="toggleLang"
              aria-haspopup="true"
              ref="langRef"
            >
              <img src="/frondend/images/SiteHeader/language.png"  class="h-5 w-5" />
              <span class="text-primary">{{ currentLang === 'zh-CN' ? '简体中文' : 'English' }}</span>
              <ChevronDown class="h-2.5 w-2.5 opacity-70" :stroke-width="2" />
            </a>
            <div
              v-show="langOpen"
              class="absolute right-0 top-full mt-0 w-28 bg-white border border-slate-300 rounded shadow-md z-50 text-center flex-col"
            >
              <a href="#" class="block px-3 py-2 hover:bg-slate-50 text-slate-700 text-sm" @click.prevent="selectLang('en')">English</a>
              <a href="#" class="block px-3 py-2 hover:bg-slate-50 text-slate-700 text-sm border-t border-slate-200" @click.prevent="selectLang('zh-CN')">简体中文</a>
            </div>
          </div>
          <div class="relative group inline-flex items-center h-full px-4 border-r border-slate-300">
            <a
              href="#"
              class="inline-flex items-center gap-1 hover:text-primary text-sm"
              @click.prevent
              aria-haspopup="true"
            >
              <QrCode class="h-4 w-4" :stroke-width="1.6" />
              <span>{{ t('officialAccount') }}</span>
              <ChevronDown class="h-2.5 w-2.5 opacity-70" :stroke-width="2" />
            </a>
            <div
              class="hidden group-hover:flex group-focus-within:flex absolute left-0 top-full mt-0 w-40 bg-white rounded shadow-md z-50 p-3 text-center flex-col"
            >
              <div class="text-sm font-medium text-slate-800 mb-2">{{ t('scanToFollow') }}</div>
              <div class="h-24 w-24 mx-auto rounded border border-slate-300 bg-white p-1">
                <img  src="/frondend/images/SiteHeader/fjg5575fhh.png" class="h-full w-full object-contain" :alt="t('officialAccount')" />
              </div>
            </div>
          </div>
          <div class="relative group inline-flex items-center h-full px-4 border-r border-slate-300">
            <a
              href="#"
              class="inline-flex items-center gap-1 hover:text-primary text-sm"
              @click.prevent
              aria-haspopup="true"
            >
              <span>{{ t('warehouse') }}</span>
              <ChevronDown class="h-2.5 w-2.5 opacity-70" :stroke-width="2" />
            </a>
            <div
              class="hidden group-hover:flex group-focus-within:flex absolute left-0 top-full mt-0 w-40 bg-white border border-slate-300 rounded shadow-md z-50 flex-col"
            >
              <a href="https://www.saleyee.com/us-warehous.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="/frondend/images/SiteHeader/us_warehouse.png" :alt="t('usWarehouse')" class="h-4 w-4 mr-2" />
                {{ t('usWarehouse') }}
              </a>
              <a href="https://www.saleyee.com/uk-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="/frondend/images/SiteHeader/uk_warehouse.png" :alt="t('ukWarehouse')" class="h-4 w-4 mr-2" />
                {{ t('ukWarehouse') }}
              </a>
              <a href="https://www.saleyee.com/de-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="/frondend/images/SiteHeader/de_warehouse.png" :alt="t('deWarehouse')" class="h-4 w-4 mr-2" />
                {{ t('deWarehouse') }}
              </a>
              <a href="https://www.saleyee.com/fr-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="/frondend/images/SiteHeader/fr_warehouse.png" :alt="t('frWarehouse')" class="h-4 w-4 mr-2" />
                {{ t('frWarehouse') }}
              </a>
              <a href="https://www.saleyee.com/cz-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="/frondend/images/SiteHeader/cz_warehouse.png" :alt="t('czWarehouse')" class="h-4 w-4 mr-2" />
                {{ t('czWarehouse') }}
              </a>
              <a href="https://www.saleyee.com/ca-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm">
                <img src="/frondend/images/SiteHeader/ca_warehouse.png" :alt="t('caWarehouse')" class="h-4 w-4 mr-2" />
                {{ t('caWarehouse') }}
              </a>
            </div>
          </div>
          <a href="/login" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">{{ t('login') }}</a>
          <a href="/register" class="inline-flex items-center h-full text-primary text-sm px-4 border-r border-slate-300">{{ t('register') }}</a>
          <a href="/getting-started" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">{{ t('gettingStarted') }}</a>
          <a href="/help-center" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">{{ t('helpCenter') }}</a>
          <a href="/membership" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">{{ t('membership') }}</a>
          <a href="/user-center" class="inline-flex items-center h-full hover:text-primary text-sm px-4">{{ t('userCenter') }}</a>
        </div>
        <div class="clear-both"></div>
      </div>
    </div>

    <!-- Main branding/search bar -->
    <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 py-4 md:py-6">
      <div class="flex items-center gap-4 md:gap-6">
        <!-- Logo -->
        <a href="/" class="shrink-0 flex items-center gap-3">
          <img
            class="h-10 md:h-12"
            src="/frondend/images/logo.png"
            :alt="t('logoAlt')"
          />
          <span class="hidden sm:inline text-lg md:text-xl font-semibold text-slate-800"
            >{{ t('platformName') }}</span
          >
        </a>

        <!-- Search -->
        <form @submit.prevent="handleSearch" class="flex-1">
          <div class="flex rounded-md overflow-hidden border-2 border-primary/90">
            <input
              type="search"
              v-model="searchKeyword"
              :placeholder="t('searchPlaceholder')"
              class="flex-1 px-4 py-2 text-sm md:text-base outline-none"
            />
            <button type="submit" class="bg-primary text-white px-4 md:px-6 font-medium">{{ t('searchButton') }}</button>
          </div>
        </form>

        <!-- Actions -->
        <div class="hidden md:flex items-center gap-4 text-sm whitespace-nowrap">
          <a href="#" class="inline-flex items-center gap-1 hover:text-primary">
            <span>{{ t('myOrders') }}</span>
          </a>
          <a href="#" class="inline-flex items-center gap-1 hover:text-primary">
            <span>{{ t('messages') }}</span>
          </a>
          <a href="/cart" class="inline-flex items-center gap-1 hover:text-primary px-3 py-1 rounded hover:bg-slate-100 transition">
            <ShoppingCart class="h-4 w-4" :stroke-width="1.6" />
            <span>{{ t('shoppingCart') }}</span>
          </a>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Menu, Globe, ChevronDown, QrCode, ShoppingCart } from 'lucide-vue-next'

// 搜索关键词
const searchKeyword = ref('')

// 页面翻译数据
const translations = ref({})

// 当前语言
const currentLang = ref('zh-CN')

// 从window对象获取store实例
const store = window.vueStore;

const langOpen = ref(false)
const langRef = ref(null)

// 获取页眉资源
const headerResources = computed(() => {
  // 确保store和getters存在
  if (store && store.getters) {
    return store.getters.headerResources || [];
  }
  return [];
});

// 页眉二维码图片资源 (position为header, positiontype为headerq, type为image)
const headerQrImageResource = computed(() => {
  // 确保headerResources.value存在且为数组
  if (Array.isArray(headerResources.value) && headerResources.value.length > 0) {
    const resource = headerResources.value.find(resource => 
      resource.position === 'header' && 
      resource.positiontype === 'headerq' && 
      resource.type === 'image'
    );
    return resource;
  }
  return null;
});

// 加载翻译文件
const loadTranslations = async () => {
  try {
    const response = await fetch('/frondend/lang/SiteHeader.json')
    const data = await response.json()
    translations.value = data
  } catch (error) {
    console.error('Failed to load translations:', error)
  }
}

// 翻译函数 - 直接从页面特定的JSON文件读取
const t = (key) => {
  // 获取当前语言，优先从localStorage获取，否则使用默认值
  const lang = localStorage.getItem('app.lang') || currentLang.value
  
  // 从页面特定的翻译文件中获取翻译
  if (translations.value[lang] && translations.value[lang][key]) {
    return translations.value[lang][key]
  }
  
  // 如果没有找到翻译，返回键名
  return key
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
  // 重新加载翻译以确保语言切换时更新
  loadTranslations()
}

function toggleLang() {
  langOpen.value = !langOpen.value
}

function closeLang() {
  langOpen.value = false
}

function selectLang(code) {
  // 设置语言
  try {
    localStorage.setItem('app.lang', code)
  } catch {}
  currentLang.value = code
  
  // 触发全局语言变化事件
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: code } }))
  }
  
  closeLang()
}

// 处理搜索提交
function handleSearch() {
  const keyword = searchKeyword.value.trim()
  
  // 如果关键词为空，不执行搜索
  if (!keyword) {
    return
  }
  
  // 跳转到商品列表页面，并携带搜索关键词
  window.location.href = `/all-products?q=${encodeURIComponent(keyword)}`
}

function onClickOutside(e) {
  const el = langRef.value
  if (el && !el.contains(e.target)) {
    closeLang()
  }
}

onMounted(() => {
  // 初始化当前语言
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  
  document.addEventListener('click', onClickOutside)
  
  // 初始加载翻译
  loadTranslations()
  
  // 监听语言变化事件
  window.addEventListener('languagechange', handleLangChange)
  
  // 加载公共资源
  if (store && typeof store.dispatch === 'function') {
    // 检查是否需要加载数据
    const lastUpdated = store.state.publicResources.lastUpdated;
    let shouldLoad = false;
    
    if (!lastUpdated) {
      // 从未加载过数据
      shouldLoad = true;
    } else {
      // 检查数据是否过期（5分钟内认为是有效的）
      const lastUpdatedTime = new Date(lastUpdated);
      const now = new Date();
      const diffMinutes = (now - lastUpdatedTime) / (1000 * 60);
      shouldLoad = diffMinutes >= 5;
    }
    
    // 如果需要加载数据，则一次性加载所有公共资源
    if (shouldLoad) {
      store.dispatch('loadPublicResources');
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<style scoped></style>