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
              @click.prevent
              aria-haspopup="true"
            >
              <span>{{ t('header.international') }}</span>
              <ChevronDown class="h-2.5 w-2.5 opacity-70" :stroke-width="2" />
            </a>
            <div
              class="hidden group-hover:block group-focus-within:flex absolute left-0 top-full mt-0 w-28 bg-white border border-slate-300 rounded shadow-md z-50 text-center flex-col"
            >
              <a href="#" class="block px-3 py-2 hover:bg-slate-50 text-slate-700 text-sm">Overseas</a>
              <a href="#" class="block px-3 py-2 hover:bg-slate-50 text-slate-700 text-sm border-t border-slate-200">International</a>
            </div>
          </div>
          <div class="relative group inline-flex items-center h-full px-4 border-r border-slate-300">
            <a
              href="#"
              class="inline-flex items-center gap-1 hover:text-primary text-sm"
              @click.prevent
              aria-haspopup="true"
            >
              <img src="https://www.saleyee.com/ContentNew/Images/2025/202507/language.png" alt="" class="h-5 w-5" />
              <span class="text-primary">{{ langLabel }}</span>
              <ChevronDown class="h-2.5 w-2.5 opacity-70" :stroke-width="2" />
            </a>
            <div
              class="hidden group-hover:flex group-focus-within:flex absolute right-0 top-full mt-0 w-28 bg-white border border-slate-300 rounded shadow-md z-50 text-center flex-col"
            >
              <a href="#" class="block px-3 py-2 hover:bg-slate-50 text-slate-700 text-sm">English</a>
              <a href="#" class="block px-3 py-2 hover:bg-slate-50 text-slate-700 text-sm border-t border-slate-200">简体中文</a>
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
              <span>{{ t('header.wechat') }}</span>
              <ChevronDown class="h-2.5 w-2.5 opacity-70" :stroke-width="2" />
            </a>
            <div
              class="hidden group-hover:flex group-focus-within:flex absolute left-0 top-full mt-0 w-40 bg-white rounded shadow-md z-50 p-3 text-center flex-col"
            >
              <div class="text-sm font-medium text-slate-800 mb-2">扫码关注</div>
              <div class="h-24 w-24 mx-auto rounded border border-slate-300 bg-white p-1">
                <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
                  <rect width="120" height="120" fill="#ffffff" />
                  <rect x="0" y="0" width="36" height="36" fill="#0b1220" />
                  <rect x="8" y="8" width="20" height="20" fill="#ffffff" />
                  <rect x="12" y="12" width="12" height="12" fill="#0b1220" />
                  <rect x="84" y="0" width="36" height="36" fill="#0b1220" />
                  <rect x="92" y="8" width="20" height="20" fill="#ffffff" />
                  <rect x="96" y="12" width="12" height="12" fill="#0b1220" />
                  <rect x="0" y="84" width="36" height="36" fill="#0b1220" />
                  <rect x="8" y="92" width="20" height="20" fill="#ffffff" />
                  <rect x="12" y="96" width="12" height="12" fill="#0b1220" />
                  <rect x="46" y="10" width="12" height="12" fill="#0b1220" />
                  <rect x="58" y="10" width="12" height="12" fill="#0b1220" />
                  <rect x="46" y="24" width="12" height="12" fill="#0b1220" />
                  <rect x="58" y="24" width="12" height="12" fill="#0b1220" />
                  <rect x="44" y="46" width="14" height="14" fill="#0b1220" />
                  <rect x="62" y="46" width="14" height="14" fill="#0b1220" />
                  <rect x="44" y="64" width="14" height="14" fill="#0b1220" />
                  <rect x="62" y="64" width="14" height="14" fill="#0b1220" />
                  <rect x="86" y="46" width="10" height="10" fill="#0b1220" />
                  <rect x="76" y="66" width="10" height="10" fill="#0b1220" />
                  <rect x="96" y="70" width="10" height="10" fill="#0b1220" />
                  <rect x="50" y="86" width="10" height="10" fill="#0b1220" />
                  <rect x="64" y="86" width="10" height="10" fill="#0b1220" />
                  <rect x="78" y="88" width="8" height="8" fill="#0b1220" />
                  <rect x="90" y="92" width="12" height="12" fill="#0b1220" />
                  <rect x="104" y="96" width="8" height="8" fill="#0b1220" />
                  <rect x="40" y="102" width="8" height="8" fill="#0b1220" />
                  <rect x="52" y="104" width="8" height="8" fill="#0b1220" />
                  <rect x="64" y="104" width="8" height="8" fill="#0b1220" />
                </svg>
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
              <span>发货仓库</span>
              <ChevronDown class="h-2.5 w-2.5 opacity-70" :stroke-width="2" />
            </a>
            <div
              class="hidden group-hover:flex group-focus-within:flex absolute left-0 top-full mt-0 w-40 bg-white border border-slate-300 rounded shadow-md z-50 flex-col"
            >
              <a href="https://www.saleyee.com/us-warehous.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/%E5%9B%BD%E5%AE%B6%E5%9B%BE%E6%A0%87%E5%BA%93/1.%E7%BE%8E%E5%9B%BD%E4%BB%93.png?v=704116121" alt="" class="h-4 w-4 mr-2" />
                美国仓
              </a>
              <a href="https://www.saleyee.com/uk-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/%E5%9B%BD%E5%AE%B6%E5%9B%BE%E6%A0%87%E5%BA%93/2.%E8%8B%B1%E5%9B%BD%E4%BB%93.png?v=1483099274" alt="" class="h-4 w-4 mr-2" />
                英国仓
              </a>
              <a href="https://www.saleyee.com/de-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/%E5%9B%BD%E5%AE%B6%E5%9B%BE%E6%A0%87%E5%BA%93/4.%E5%BE%B7%E5%9B%BD%E4%BB%93.png?v=1138402328" alt="" class="h-4 w-4 mr-2" />
                德国仓
              </a>
              <a href="https://www.saleyee.com/fr-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/%E5%9B%BD%E5%AE%B6%E5%9B%BE%E6%A0%87%E5%BA%93/5.%E6%B3%95%E5%9B%BD%E4%BB%93.png?v=1305192273" alt="" class="h-4 w-4 mr-2" />
                法国仓
              </a>
              <a href="https://www.saleyee.com/cz-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-200">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/%E5%9B%BD%E5%AE%B6%E5%9B%BE%E6%A0%87%E5%BA%93/7.%E6%8D%B7%E5%85%8B%E4%BB%93.png?v=1663980524" alt="" class="h-4 w-4 mr-2" />
                捷克仓
              </a>
              <a href="https://www.saleyee.com/ca-warehouse.html" target="_blank" class="flex items-center px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm">
                <img src="https://resource.saleyee.cn/Content/Images/asset/mall/countrylogo/20250415-174619.png?v=758168999" alt="" class="h-4 w-4 mr-2" />
                加拿大仓
              </a>
            </div>
          </div>
          <router-link to="/login" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">{{ t('auth.login') }}</router-link>
          <router-link to="/register" class="inline-flex items-center h-full text-primary text-sm px-4 border-r border-slate-300">{{ t('auth.register') }}</router-link>
          <router-link to="/getting-started" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">入门指引</router-link>
          <router-link to="/help-center" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">帮助中心</router-link>
          <router-link to="/membership" class="inline-flex items-center h-full hover:text-primary text-sm px-4 border-r border-slate-300">会员权益</router-link>
          <router-link to="/user-center" class="inline-flex items-center h-full hover:text-primary text-sm px-4">{{ t('auth.userCenter') }}</router-link>
        </div>
        <div class="clear-both"></div>
      </div>
    </div>

    <!-- Main branding/search bar -->
    <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 py-4 md:py-6">
      <div class="flex items-center gap-4 md:gap-6">
        <!-- Logo -->
        <router-link to="/" class="shrink-0 flex items-center gap-3">
          <img
            class="h-10 md:h-12"
            src="https://www.saleyee.com/Content/Images/logo.png"
            alt="赛盈分销平台 Logo"
          />
          <span class="hidden sm:inline text-lg md:text-xl font-semibold text-slate-800"
            >赛盈分销平台</span
          >
        </router-link>

        <!-- Search -->
        <form @submit.prevent class="flex-1">
          <div class="flex rounded-md overflow-hidden border-2 border-primary/90">
            <input
              type="search"
              :placeholder="t('ui.searchPlaceholder')"
              class="flex-1 px-4 py-2 text-sm md:text-base outline-none"
            />
            <button class="bg-primary text-white px-4 md:px-6 font-medium">{{ t('ui.search') }}</button>
          </div>
        </form>

        <!-- Actions -->
        <div class="hidden md:flex items-center gap-4 text-sm whitespace-nowrap">
          <a href="#" class="inline-flex items-center gap-1 hover:text-primary">
            <span>我的订单</span>
          </a>
          <a href="#" class="inline-flex items-center gap-1 hover:text-primary">
            <span>消息</span>
          </a>
          <router-link to="/cart" class="inline-flex items-center gap-1 hover:text-primary px-3 py-1 rounded hover:bg-slate-100 transition">
            <ShoppingCart class="h-4 w-4" :stroke-width="1.6" />
            <span>购物车</span>
          </router-link>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Menu, Globe, ChevronDown, QrCode, ShoppingCart } from 'lucide-vue-next'
import { currentLang, setLang, t } from '@/i18n'

const langOpen = ref(false)
const langRef = ref(null)

const langLabel = computed(() => (currentLang.value === 'zh-CN' ? t('lang.zh') : t('lang.en')))

function toggleLang() {
  langOpen.value = !langOpen.value
}
function closeLang() {
  langOpen.value = false
}
function selectLang(code) {
  setLang(code)
  closeLang()
}

function onClickOutside(e) {
  const el = langRef.value
  if (el && !el.contains(e.target)) {
    closeLang()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped></style>
