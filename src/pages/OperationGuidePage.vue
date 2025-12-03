<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="help-center">
    <!-- 顶部通知与快捷入口（沿用样式） -->
    <div class="hc-top-bar">
      <div class="hc-container hc-top-bar__inner">
        <div class="hc-top-bar__left">
          <a class="hc-top-bar__notice" href="/help-center">
            <span>帮助中心</span>
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
      <div class="hc-container hc-header__inner">
        <div class="hc-header__brand">
          <a class="hc-header__logo" href="/">
            <img src="https://www.saleyee.com/Content/Images/logo.png" alt="赛盈分销" />
          </a>
          <div class="hc-header__title">
            <h1>���盈分销</h1>
            <p>操作引导</p>
          </div>
        </div>
        <nav class="hc-header__nav">
          <a :class="['hc-nav-link', isActive('/help-center') ? 'is-active' : '']" href="/help-center">首页</a>
          <a :class="['hc-nav-link', isActive('/operation-guide') ? 'is-active' : '']" href="/operation-guide">操作指引</a>
          <a class="hc-nav-link" href="/contact-us">联系我们</a>
        </nav>
        <!-- 搜索区域 -->
        <div class="hc-search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="请输入相关问题关键字进行查询"
            class="hc-search-input"
            @keyup.enter="handleSearch"
          />
          <button @click="handleSearch" class="hc-search-btn">
            <img alt="搜索" loading="lazy" src="https://www.saleyee.com/Area/ZT.DMS.Help.Web/Content/images/search.png" class="hc-search-icon" />
          </button>
        </div>
      </div>
    </header>

    <main>
      <!-- 左侧分类树 + 右侧内容 -->
      <section class="hc-container" style="padding: 20px 0;">
        <div class="div">
          <!-- 左侧分类 -->
          <div class="div-2">
            <p class="p">操作引导</p>
            <ul class="ul">
              <li v-for="(item, index) in navData" :key="item.id" class="li">
                <span
                  v-if="item.children && item.children.length > 0"
                  :title="item.title"
                  :class="['span', index > 0 ? `span-${index}` : '']"
                  role="button"
                  aria-label="切换展开"
                  :aria-expanded="isOpen(item.id)"
                  @click.prevent.stop="toggle(item.id)"
                >
                  <a :href="item.url" class="a">{{ item.title }}</a>
                  <i :class="['i', index > 0 ? `i-${index}` : '']">{{ isOpen(item.id) ? '−' : '+' }}</i>
                </span>
                <span
                  v-else
                  :title="item.title"
                  :class="['span', index > 0 ? `span-${index}` : '']"
                  role="button"
                  aria-label="打开链接"
                >
                  <a :href="item.url" class="a">{{ item.title }}</a>
                </span>
                <ul
                  v-if="item.children && item.children.length > 0"
                  :class="['ul-sub', `ul-${index + 2}`]"
                  v-show="isOpen(item.id)"
                >
                  <li v-for="child in item.children" :key="child.id" class="li">
                    <a
                      :title="child.title"
                      :href="child.url"
                      :class="['a-child', selectedChildId === child.id ? 'active' : '']"
                      @click.prevent="selectChild(child.id)"
                    >
                      {{ child.title }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <!-- 右侧内容（动态显示） -->
          <div class="div-3">
            <div class="div-4">
              <div v-if="filteredContent.length > 0">
                <h5 class="h5">{{ currentContent.parentTitle }}</h5>
                <div v-for="faqSection in filteredContent" :key="faqSection.title" class="div-5">
                  <p class="p-2">{{ faqSection.title }}</p>
                  <ul class="ul-15">
                    <li v-for="(item, idx) in faqSection.items" :key="idx" class="li-2" :id="slug(item.title)">
                      <a :href="getFaqLink(item)" class="a-45">{{ item.title }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else class="div-5">
                <p class="p-2">{{ searchQuery ? '未找到相关问题' : '暂无内容' }}</p>
              </div>
            </div>
          </div>

          <div class="div-10"></div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="hc-footer">
      <div class="hc-container hc-footer__inner">
        <div class="hc-footer__col">
          <h3>关于赛盈</h3>
          <ul>
            <li><a href="/about-saleyee">赛盈简介</a></li>
            <li><a href="/membership">会员权益</a></li>
            <li><a href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a></li>
            <li><a href="/contact-us">联系我们</a></li>
          </ul>
        </div>
        <div class="hc-footer__col">
          <h3>客户服务</h3>
          <ul>
            <li><a href="/help-center">帮助中心</a></li>
            <li><a href="/faq/hc271661">售后条款</a></li>
            <li><a href="/faq/hp062361">支付方式</a></li>
            <li><a href="/faq/hp981158">物流方式</a></li>
            <li><a href="https://www.saleyee.com/help/14.html" target="_blank" rel="noreferrer">VAT政策解读</a></li>
            <li><a href="https://www.saleyee.com/feedback.html" target="_blank" rel="noreferrer">体验反馈</a></li>
          </ul>
        </div>
        <div class="hc-footer__col">
          <h3>合��联系</h3>
          <ul>
            <li><a href="/distributors">跨境卖家入驻</a></li>
            <li><a href="/supplier">供应商入驻</a></li>
            <li><a href="/partners">合作伙伴</a></li>
            <li><a href="https://www.saleyee.com/help/51.html" target="_blank" rel="noreferrer">商务合作</a></li>
          </ul>
        </div>
        <div class="hc-footer__col hc-footer__col--wechat">
          <h3>赛盈官方微信</h3>
          <div class="hc-footer__qr">
            <img src="https://resource.saleyee.cn/UploadFiles/Images/2024/202412/3d1ddf0c-7c7c-4f2e-a9bd-30813e3e5a99.png" alt="赛盈官方微信" />
            <p>扫码关注获取平台资讯</p>
          </div>
        </div>
      </div>
      <div class="hc-footer__partners">
        <div class="hc-container">
          <div class="hc-footer__partners-title">合作伙伴：</div>
          <ul class="hc-footer__partners-list">
            <li v-for="partner in partners" :key="partner.alt">
              <img :src="partner.src" :alt="partner.alt" loading="lazy" />
            </li>
          </ul>
        </div>
      </div>
      <div class="hc-footer__bottom">
        <div class="hc-container">© 2025 Saleyee.com Tengming Limited | 网站地��</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { operationGuideNav } from '@/data/operationGuideNav'
import { faqData, getFaqById } from '@/data/faqData'
import { operationGuideFaqData } from '@/data/operationGuideFaqData'

const partners = [
  { alt: 'Amazon', src: 'https://www.saleyee.com/ContentNew/Images/partners/amazon.png' },
  { alt: 'eBay', src: 'https://www.saleyee.com/ContentNew/Images/partners/ebay.png' },
  { alt: 'Wish', src: 'https://www.saleyee.com/ContentNew/Images/partners/wish.png' },
  { alt: 'Walmart', src: 'https://www.saleyee.com/ContentNew/Images/partners/walmart.png' },
  { alt: 'Shopify', src: 'https://www.saleyee.com/ContentNew/Images/partners/shopify.png' },
]

// 展开折叠状态（默认展开第一个分类��
const openKeys = ref(new Set([operationGuideNav[0]?.id || '']))
function isOpen(key) {
  return openKeys.value.has(key)
}
function toggle(key) {
  const s = new Set(openKeys.value)
  if (s.has(key)) s.delete(key)
  else s.add(key)
  openKeys.value = s
}

function isActive(path) {
  if (typeof window === 'undefined') return false
  return window.location.pathname.replace(/\/+/g, '/').replace(/\/index\.html$/, '/') === path
}

// 导航数据
const navData = operationGuideNav

// 选中��子项ID（默认第一个子项）
const selectedChildId = ref(operationGuideNav[0]?.children?.[0]?.id || '')

// 当前选中内容
const currentContent = computed(() => {
  for (const item of navData) {
    if (item.children) {
      const child = item.children.find(c => c.id === selectedChildId.value)
      if (child) {
        return {
          title: child.title,
          parentTitle: item.title,
          faqs: child.faqs || []
        }
      }
    }
  }
  return { title: '', parentTitle: '', faqs: [] }
})

function selectChild(childId) {
  selectedChildId.value = childId
  searchQuery.value = ''
  // 滚动到列表顶部
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 搜索
const searchQuery = ref('')
const filteredContent = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return currentContent.value.faqs
  return currentContent.value.faqs
    .map(section => ({
      ...section,
      items: section.items.filter(item => item.title.toLowerCase().includes(query))
    }))
    .filter(section => section.items.length > 0)
})
function handleSearch() {}

function slug(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getFaqLink(item) {
  const title = (item.title || '').trim()
  const found = faqData.find(f => (f.question || '').trim() === title)
    || operationGuideFaqData.find(f => (f.question || '').trim() === title)
  if (found) return `/faq/${found.id}`
  const m = item.url && item.url.match(/\/(faq|guide)\/([a-zA-Z0-9]+)(?:\.html)?/)
  if (m && m[2]) {
    const id = m[2]
    if (id && getFaqById(id)) return `/faq/${id}`
  }
  return item.url || '#'
}
</script>

<style scoped>
/* 复用 HelpCenterPage 样式 */
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
.hc-header__inner { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; gap: 24px; flex-wrap: wrap; }
.hc-header__brand { display: flex; align-items: center; gap: 16px; }
.hc-header__logo img { height: 60px; width: auto; }
.hc-header__title h1 { font-size: 24px; font-weight: 600; margin: 0; color: #111827; }
.hc-header__title p { margin: 4px 0 0; font-size: 14px; color: #6b7280; }
.hc-header__nav { display: flex; align-items: center; gap: 24px; }
.hc-nav-link { color: #374151; font-size: 14px; text-decoration: none; position: relative; padding-bottom: 4px; transition: color 0.2s ease; }
.hc-nav-link:hover, .hc-nav-link.is-active { color: #cb261c; }
.hc-nav-link.is-active::after { content: ''; position: absolute; left: 0; bottom: 0; width: 100%; height: 2px; background: #cb261c; }
.hc-search-wrapper { display: flex; gap: 0; align-items: center; margin-left: auto; }
.hc-search-input { appearance: none; background-color: #fff; border: 1px solid #e5e7eb; border-right: none; height: 40px; line-height: 20px; padding: 8px 16px; width: 300px; font-size: 13px; color: #333; transition: all 0.5s ease; }
.hc-search-input::placeholder { color: #999; }
.hc-search-input:focus { outline: none; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-color: #cb261c; }
.hc-search-btn { appearance: none; background-color: #cb261c; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; height: 40px; width: 44px; padding: 0; transition: all 0.3s ease; }
.hc-search-btn:hover { background-color: #a91e14; }
.hc-search-icon { width: 20px; height: 20px; object-fit: contain; }
.hc-footer { background: #111827; color: #f9fafb; }
.hc-footer__inner { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; padding: 48px 0 40px; }
.hc-footer__col h3 { font-size: 16px; margin-bottom: 16px; font-weight: 600; }
.hc-footer__col ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.hc-footer__col a { color: #d1d5db; text-decoration: none; font-size: 13px; }
.hc-footer__col a:hover { color: #fff; }
.hc-footer__col--wechat { text-align: center; }
.hc-footer__qr img { width: 120px; height: 120px; border-radius: 12px; object-fit: cover; }
.hc-footer__qr p { margin-top: 10px; font-size: 13px; color: #d1d5db; }
.hc-footer__partners { background: #0f172a; padding: 18px 0; border-top: 1px solid rgba(148, 163, 184, 0.2); }
.hc-footer__partners-title { font-size: 13px; color: #e5e7eb; margin-bottom: 12px; }
.hc-footer__partners-list { display: flex; align-items: center; flex-wrap: wrap; gap: 20px; list-style: none; padding: 0; margin: 0; }
.hc-footer__partners-list img { height: 28px; filter: brightness(0) invert(1); opacity: 0.75; }
.hc-footer__partners-list img:hover { opacity: 1; }
.hc-footer__bottom { background: #0b1220; padding: 16px 0; font-size: 12px; color: #9ca3af; text-align: center; }
.div { clear: both; background-color: #f2f3f7; }
.div-2 { background-color: #fff; float: left; margin-right: 20px; width: 240px; }
.p { color: #333; font-size: 16px; font-weight: 700; padding: 20px 20px 5px; }
.ul { padding: 10px 0; }
.li { list-style: none; }
.span { background-color: #fbeae5; color: #333; height: 46px; line-height: 46px; margin-bottom: 1px; padding: 0 40px 0 20px; position: relative; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer; }
.a { color: #333; display: inline-block; line-height: 46px; width: 100%; text-decoration: none; }
.i { position: absolute; right: 12px; top: 0; line-height: 46px; font-size: 18px; color: currentColor; user-select: none; }
.ul-sub { padding: 0 20px; }
.a-child { display: inline-block; width: 100%; line-height: 46px; color: #333; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.a-child.active { color: #cb261c; }
.div-3 { float: right; width: calc(100% - 260px); }
.div-4 { background: #fff; margin-bottom: 20px; min-height: 550px; padding: 20px; width: 100%; }
.h5 { color: #333; font-size: 16px; font-weight: 700; margin-bottom: 16px; }
.div-5 { margin-bottom: 40px; }
.p-2 { color: #333; font-size: 16px; margin-bottom: 4px; }
.ul-15 { margin-left: 30px; padding: 0; }
.li-2 { list-style: disc; color: #999; }
.a-45 { color: #333; text-decoration: none; line-height: 36px; }
.div-10 { clear: both; }

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
