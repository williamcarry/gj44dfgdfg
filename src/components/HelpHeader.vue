<template>
  <div class="help-center">
    <!-- 顶部通知与快捷入口 -->
    <div class="hc-top-bar">
      <div class="hc-container hc-top-bar__inner">
        <div class="hc-top-bar__left">
          <a
            class="hc-top-bar__notice"
            href="https://resource.saleyee.cn/Files/%E5%85%AC%E5%91%8A%E5%85%AC%E5%BC%80%E4%BF%A1/%E8%AF%A6%E7%BB%86%E8%A7%A3%E8%AF%OTTENGMING%20LIMITED%20%E5%8F%8D%E4%BD%9C%E9%94%80%E9%93%BE%E4%BF%A1%E6%81%AF.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span>【公告】TENGMING LIMITED 公司名称被冒用声明</span>
          </a>
        </div>
        <div class="hc-top-bar__right">
          <a class="hc-link" href="/login">登录</a>
          <a class="hc-link" href="/register">注册</a>
          <a class="hc-link" href="/getting-started">入门指引</a>
          <a class="hc-link" href="/membership">会员权益</a>
        </div>
      </div>
    </div>

    <!-- 头部品牌区与导航 -->
    <header class="hc-header">
      <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 py-4 md:py-6">
        <div class="flex items-center gap-4 md:gap-6">
          <!-- Logo -->
          <a href="/" class="shrink-0 flex items-center gap-3">
            <img
              class="h-10 md:h-12"
              src="https://www.saleyee.com/Content/Images/logo.png"
              :alt="pageTitle + ' Logo'"
            />
            <span class="hidden sm:inline text-lg md:text-xl font-semibold text-slate-800">
              {{ pageTitle }}
            </span>
          </a>

          <!-- Search -->
          <form @submit.prevent class="flex-1 min-w-[300px] md:min-w-[400px]">
            <div class="flex rounded-md overflow-hidden border-2 border-primary/90">
              <input
                v-model="searchQuery"
                type="search"
                placeholder="请输入相关问题关键字进行查询"
                class="flex-1 px-4 py-2 text-sm md:text-base outline-none"
                @keyup.enter="handleSearch"
              />
              <button 
                @click="handleSearch" 
                class="bg-primary text-white px-4 md:px-6 font-medium search-btn flex items-center gap-2"
                :disabled="isSearching"
              >
                <span v-if="isSearching" class="search-spinner"></span>
                <span>搜索</span>
              </button>
            </div>
          </form>

          <!-- Actions -->
          <div class="hidden md:flex items-center gap-4 text-sm whitespace-nowrap">
            <a :class="['hc-nav-link', isActive('/help-center') ? 'is-active' : '']" href="/help-center">首页</a>
            <a :class="['hc-nav-link', isActive('/operation-guide') ? 'is-active' : '']" href="/operation-guide">操作指引</a>
            <a class="hc-nav-link" href="/contact-us">联系我们</a>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  pageTitle: {
    type: String,
    default: '帮助中心'
  },
  onSearch: {
    type: Function,
    default: () => {}
  }
})

const searchQuery = ref('')
const isSearching = ref(false)

function handleSearch() {
  if (searchQuery.value.trim()) {
    isSearching.value = true
    // 延迟一小段时间再执行搜索，让用户看到动画效果
    setTimeout(() => {
      props.onSearch(searchQuery.value)
      isSearching.value = false
    }, 300)
  }
}

function isActive(path) {
  if (typeof window === 'undefined') return false
  return window.location.pathname.replace(/\/+/g, '/').replace(/\/index\.html$/, '/') === path
}
</script>

<style scoped>
/* 头部/顶部条与页脚（沿用上一版） */
.help-center { font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif; color: #2f2f2f; background: #f7f9fb; }
.hc-container { width: 100%; max-width: 1500px; min-width: 1150px; margin: 0 auto; padding: 0 16px; }
.hc-top-bar { background: #f5f7fa; border-bottom: 1px solid #e5e7eb; font-size: 12px; color: #666; }
.hc-top-bar__inner { display: flex; align-items: center; justify-content: space-between; height: 36px; }
.hc-top-bar__left { display: flex; align-items: center; gap: 16px; }
.hc-top-bar__notice { color: #cb261c; text-decoration: none; transition: opacity 0.2s ease; }
.hc-top-bar__notice:hover { opacity: 0.8; }
.hc-top-bar__right { display: flex; align-items: center; gap: 20px; }
.hc-link { color: #666; text-decoration: none; transition: color 0.2s ease; }
.hc-link:hover { color: #cb261c; }
.hc-header { background: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05); }
.hc-header__inner { position: relative; display: flex; align-items: center; justify-content: space-between; padding: 24px 0; gap: 24px; flex-wrap: wrap; }
.hc-header__brand { display: flex; align-items: center; gap: 16px; }
.hc-header__logo img { height: 60px; width: auto; }
.hc-header__title h1 { font-size: 24px; font-weight: 600; margin: 0; color: #111827; }
.hc-header__title p { margin: 4px 0 0; font-size: 14px; color: #6b7280; }
.hc-header__nav { display: flex; align-items: center; gap: 24px; }
.hc-nav-link { color: #374151; font-size: 14px; text-decoration: none; position: relative; padding-bottom: 4px; transition: color 0.2s ease; }
.hc-nav-link:hover, .hc-nav-link.is-active { color: #cb261c; }
.hc-nav-link.is-active::after { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background: #cb261c; }

/* 搜索栏 - 在header内并排 */
.hc-search-wrapper { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: flex; gap: 0; align-items: center; }
.hc-search-input { appearance: none; background-color: #fff; border: 1px solid #e5e7eb; border-right: none; height: 40px; line-height: 20px; padding: 8px 16px; width: 300px; font-size: 13px; color: #333; transition: all 0.5s ease; }
.hc-search-input::placeholder { color: #999; }
.hc-search-input:focus { outline: none; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-color: #cb261c; }
.hc-search-btn { appearance: none; background-color: #cb261c; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 40px; width: 44px; padding: 0; transition: all 0.3s ease; }
.hc-search-btn:hover { background-color: #a91e14; }
.hc-search-icon { width: 20px; height: 20px; object-fit: contain; }

/* 搜索按钮动画 */
.search-btn {
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.search-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 1149px) {
  .hc-container { max-width: 960px; min-width: auto; }
  .hc-search-input { width: 500px; }
}
@media (max-width: 991px) {
  .hc-container { max-width: 720px; }
  .hc-search-input { width: 400px; }
}
@media (max-width: 767px) {
  .hc-container { max-width: 540px; padding: 0 12px; }
  .hc-search-input { width: 280px; }
  .hc-search-btn { width: 50px; }
  .hc-search-icon { width: 20px; }
}
@media (max-width: 575px) {
  .hc-header__logo img { height: 48px; }
  .hc-header__title h1 { font-size: 20px; }
  .hc-search-input { width: 220px; }
}
</style>