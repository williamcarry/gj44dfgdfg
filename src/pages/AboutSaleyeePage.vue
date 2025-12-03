<template>
  <div class="about-saleyee-page">
    <!-- Top bar -->
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="top-bar-left">
          <a
            class="top-bar-notice"
            href="https://resource.saleyee.cn/Files/%E5%85%AC%E5%91%8A%E5%85%AC%E5%BC%80%E4%BF%A1/%E8%AF%A6%E7%BB%86%E8%A7%A3%E8%AF%ATTENGMING%20LIMITED%20%E5%8F%8D%E4%BD%9C%E9%94%80%E9%93%BE%E4%BF%A1%E6%81%AF.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span>【公告】TENGMING LIMITED 公司名称冒用声明</span>
          </a>
        </div>
        <div class="top-bar-right">
          <a class="top-bar-link" href="/login">登录</a>
          <a class="top-bar-link" href="/register">注册</a>
          <a class="top-bar-link" href="/getting-started">���门指引</a>
          <a class="top-bar-link" href="/membership">会员权益</a>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="header">
      <div class="container header-inner">
        <div class="header-brand">
          <a class="header-logo" href="/">
            <img src="https://www.saleyee.com/Content/Images/logo.png" alt="赛盈分销" />
          </a>
          <div class="header-title">
            <h1>赛盈分销</h1>
            <p>帮助中心</p>
          </div>
        </div>
        <nav class="header-nav">
          <a class="nav-link" href="/">首页</a>
          <a class="nav-link" href="/about-saleyee">赛盈简介</a>
          <a class="nav-link" href="/help-center">帮助中心</a>
          <a class="nav-link" href="https://www.saleyee.com/faq.html" target="_blank" rel="noreferrer">��见问题</a>
          <a class="nav-link" href="/contact-us">联系我们</a>
        </nav>
      </div>
    </header>

    <!-- Main content -->
    <main class="main">
      <!-- Banner -->
      <div class="about-banner-wrapper">
        <img src="https://resource.saleyee.com/UploadFiles/Images/2025/202506/8e447cb6-42d1-473d-8016-ff78b44b3be4.jpg" alt="赛盈分销" class="banner-image" />
      </div>

      <!-- Introduction section with background -->
      <section class="intro-banner">
        <div class="intro-banner-inner">
          <div class="intro-banner-content">
            <h3>赛盈分销平台介绍</h3>
            <p>深圳赛盈网络有限公司，是专注于为供应商及分销商双向赋能的跨境电商分销B2B平台，通过整合谷仓海外仓、云途专线物流等优质供应链资源，帮助工厂及品牌供应商扩展海外销路；同时也为Amazon、eBay、Walmart及Shopify等平台的国内外卖家提供海外仓货源一件代发服务，解决卖家遇到的选品难、资金有限、海外仓服务门槛高、售后难等系列经营难题，现已支持美国、英国、德国、法国、加拿大等国家分销。</p>
          </div>
        </div>
      </section>

      <div class="container">

        <!-- Business section -->
        <section class="business-section">
          <h2>赛盈分销平台业务</h2>
          <div class="business-content">
            <img src="https://resource.saleyee.cn/Content/Images/asset/help-center/pattern.png?v=1003300813" alt="赛盈分销平台业务" class="business-image" />
          </div>
        </section>

        <!-- Services section -->
        <section class="services-section">
          <h2>赛盈分销平台服务</h2>
          <div class="services-grid">
            <!-- Service 1 (attachment layout) -->
            <div class="service-block">
              <img
                alt="跨境电商货源分销服务"
                loading="lazy"
                src="https://www.saleyee.com/ContentNew/Images/about_service1.png"
                class="service-img"
              />
              <div class="service-block-content">
                <h3 class="service-title">跨境电商货源分销服务</h3>
                <span class="service-hr"></span>
                <p class="service-desc">
                  赛盈分销平台，甄选60000+欧美海外仓精品货源，涵盖家居、运动健身、健康美容、汽配、玩具等13个大品类产品，为Amazon、eBay、Wish、Walmart及Shopify等平台卖家提供海外仓包邮一件代发服务。
                </p>
                <router-link to="/register" class="service-cta">
                  分销商免费入驻
                </router-link>
              </div>
            </div>

            <!-- Service 2 (supplier block matching attachment) -->
            <div class="service-block supplier-block">
              <div class="service-block-content">
                <h3 class="service-title">供应商出海服务</h3>
                <span class="service-hr"></span>
                <p class="service-desc">
                  赛盈分销平台现诚邀广大传统外贸厂商及贸易公司等供应商入驻，提供集货、清关、物流、海外仓储、分销、金融等一体化服务，助力更多出口货源供应商扬帆出海。
                </p>
                <router-link to="/supplier" class="service-cta">
                  供应商免费入驻
                </router-link>
              </div>
              <img
                alt="供应商出海服务"
                loading="lazy"
                src="https://www.saleyee.com/ContentNew/Images/about_service2.png"
                class="service-img"
              />
            </div>
          </div>
        </section>

        <!-- Warehouse section -->
        <section class="warehouse-section">
          <h2>赛盈分销平台海外仓实景图</h2>
          <div class="warehouse-wrapper" ref="warehouseWrapper">
            <div class="warehouse-track" :style="trackStyle">
              <div v-for="(w, idx) in warehouseImages" :key="idx" class="warehouse-item">
                <img :src="w.src" :alt="w.name" class="warehouse-img" loading="lazy" />
                <p class="warehouse-name">{{ w.name }}</p>
              </div>
            </div>

            <button v-if="maxIndex > 0" class="carousel-button next" @click="nextWarehouse" :disabled="currentWarehouse >= maxIndex" aria-label="Next slide">
              <ChevronRightIcon size="24" />
            </button>

            <button v-if="maxIndex > 0" class="carousel-button prev" @click="prevWarehouse" :disabled="currentWarehouse === 0" aria-label="Previous slide">
              <ChevronLeftIcon size="24" />
            </button>
          </div>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-grid">
          <div class="footer-col">
            <h3>关于赛盈</h3>
            <ul>
              <li><a href="/about-saleyee">赛盈简介</a></li>
              <li><a href="/membership">会员权益</a></li>
              <li><a href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a></li>
              <li><a href="/contact-us">联系我们</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>客户服务</h3>
            <ul>
              <li><a href="/help-center">帮助中心</a></li>
              <li><a href="/faq/hp246053">售后条款</a></li>
              <li><a href="/faq/hp062361">支付方式</a></li>
              <li><a href="/faq/hp981158">物流方式</a></li>
              <li><a href="https://www.saleyee.com/help/14.html" target="_blank" rel="noreferrer">VAT政策解读</a></li>
              <li><a href="https://www.saleyee.com/feedback.html" target="_blank" rel="noreferrer">体验反馈</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h3>合作联系</h3>
            <ul>
              <li><a href="https://www.saleyee.com/distributors.html" target="_blank" rel="noreferrer">跨境卖家入驻</a></li>
              <li><a href="https://supplier.saleyee.cn/?invitationCode=LeJWrx" target="_blank" rel="noreferrer">供应商入驻</a></li>
              <li><a href="/partners">合作伙伴</a></li>
              <li><a href="https://www.saleyee.com/help/51.html" target="_blank" rel="noreferrer">商务合作</a></li>
            </ul>
          </div>
          <div class="footer-col footer-col--wechat">
            <h3>赛盈官方微信</h3>
            <div class="footer-qr">
              <img src="https://resource.saleyee.cn/UploadFiles/Images/2024/202412/3d1ddf0c-7c7c-4f2e-a9bd-30813e3e5a99.png" alt="赛盈官方微信" />
              <p>扫码关注获取平台资讯</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          © 2025 Saleyee.com Tengming Limited | 网站地图
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-vue-next'

const currentWarehouse = ref(0)
const warehouseWrapper = ref(null)
const visibleCount = ref(1)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentWarehouse.value * 304}px)`,
  transition: 'transform 0.4s ease',
}))

const warehouseImages = [
  { name: '美东仓（新泽西）', src: 'https://www.saleyee.com/ContentNew/Images/warehouse2.png' },
  { name: '美西仓（洛杉矶）', src: 'https://www.saleyee.com/ContentNew/Images/warehouse1.png' },
  { name: '美南仓（亚特兰大）', src: 'https://www.saleyee.com/ContentNew/Images/2021/July/warehouse5.png' },
  { name: '英国仓（伯明翰）', src: 'https://www.saleyee.com/ContentNew/Images/warehouse3.png' },
  { name: '德国仓��迪岑巴赫）', src: 'https://www.saleyee.com/ContentNew/Images/warehouse4.png' },
  { name: '法国仓（巴黎）', src: 'https://www.saleyee.com/ContentNew/Images/2021/July/warehouse7.png' },
  { name: '捷克仓（布拉格）', src: 'https://www.saleyee.com/ContentNew/Images/2021/July/warehouse6.png' }
]

const maxIndex = computed(() => Math.max(0, warehouseImages.length - visibleCount.value))

function updateVisibleCount() {
  const width = warehouseWrapper.value ? warehouseWrapper.value.clientWidth : window.innerWidth
  const count = Math.max(1, Math.floor(width / 304))
  visibleCount.value = count
  if (currentWarehouse.value > maxIndex.value) {
    currentWarehouse.value = maxIndex.value
  }
}

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
})

onBeforeUnmount(() => window.removeEventListener('resize', updateVisibleCount))

const nextWarehouse = () => {
  if (currentWarehouse.value < maxIndex.value) {
    currentWarehouse.value++
  }
}

const prevWarehouse = () => {
  if (currentWarehouse.value > 0) {
    currentWarehouse.value--
  }
}
</script>

<style scoped>
.about-saleyee-page {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  color: #2f2f2f;
  background: #f7f9fb;
  line-height: 1.5;
}

.container {
  width: 100%;
  max-width: 1500px;
  min-width: 1150px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

/* ============================================================
   Top Bar Styles
   ============================================================ */
.top-bar {
  background: #f5f7fa;
  border-bottom: 1px solid #e5e7eb;
  font-size: 12px;
  color: #666;
}

.top-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.top-bar-notice {
  color: #cb261c;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s ease;
  font-size: 12px;
}

.top-bar-notice:hover {
  opacity: 0.8;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.top-bar-link {
  color: #666;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 12px;
}

.top-bar-link:hover {
  color: #cb261c;
}

/* ============================================================
   Header Styles
   ============================================================ */
.header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0;
  gap: 24px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-logo {
  display: inline-flex;
  align-items: center;
}

.header-logo img {
  height: 60px;
  width: auto;
  display: block;
}

.header-title h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #111827;
}

.header-title p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #6b7280;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.nav-link {
  color: #374151;
  font-size: 14px;
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color 0.2s ease;
  cursor: pointer;
}

.nav-link:hover,
.nav-link.is-active {
  color: #cb261c;
}

.nav-link.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #cb261c;
}

/* ============================================================
   Main Area
   ============================================================ */
.main {
  background: linear-gradient(180deg, #f7f9fb 0%, #ffffff 100%);
  padding: 40px 0;
  min-height: calc(100vh - 300px);
}

/* ============================================================
   Banner
   ============================================================ */
.about-banner-wrapper {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-bottom: 60px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
}

/* ============================================================
   Introduction Banner Section
   ============================================================ */
.intro-banner {
  background-image: url("https://www.saleyee.com/static/imgs/f6b77effd4f23f9e3757dcc83262dae2.jpg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  height: 750px;
  background-color: rgba(0, 0, 0, 0);
  margin-bottom: 80px;
}

.intro-banner-inner {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  max-width: 1500px;
  min-width: 1200px;
  position: relative;
  width: 80%;
}

.intro-banner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.intro-banner-content h3 {
  border-color: rgb(203, 38, 28);
  color: rgb(203, 38, 28);
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  outline-color: rgb(203, 38, 28);
  text-align: center;
  text-decoration-color: rgb(203, 38, 28);
  text-emphasis-color: rgb(203, 38, 28);
  margin: 0 0 24px 0;
}

.intro-banner-content p {
  border-color: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 36px;
  outline-color: rgb(255, 255, 255);
  text-decoration-color: rgb(255, 255, 255);
  text-emphasis-color: rgb(255, 255, 255);
  margin: 0;
  max-width: 900px;
}

.intro-video {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
}

.intro-video video {
  width: 100%;
  height: auto;
  display: block;
}

/* ============================================================
   Business Section
   ============================================================ */
.business-section {
  margin-bottom: 80px;
  text-align: center;
}

.business-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 40px;
}

.business-content {
  display: flex;
  justify-content: center;
}

.business-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
}

/* ============================================================
   Services Section
   ============================================================ */
.services-section {
  margin-bottom: 80px;
}

.services-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 40px;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.service-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
  transition: all 0.3s ease;
}

.service-card:hover {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.15);
  transform: translateY(-4px);
}

.service-card:nth-child(2) {
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.service-card:nth-child(2) .service-content {
  order: 1;
}

.service-card:nth-child(2) .service-image {
  order: 2;
}

.service-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.service-content h3 {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px;
}

.service-content p {
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  margin: 0 0 20px;
}

.service-link {
  display: inline-block;
  padding: 12px 32px;
  background: #cb261c;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.service-link:hover {
  background: #a81f18;
  transform: translateY(-2px);
}

/* Custom service-block styles */
.service-block {
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: rgba(0, 0, 0, 0);
  grid-column: 1 / -1;
}
.service-img {
  max-width: 650px;
  overflow-clip-margin: content-box;
  overflow-x: clip;
  overflow-y: clip;
  vertical-align: middle;
  width: 45%;
}
.service-block-content {
  width: 50%;
}
.service-title {
  border-color: rgb(51, 51, 51);
  color: rgb(51, 51, 51);
  font-size: 36px;
  font-weight: 700;
  line-height: 54px;
  margin: 0 0 8px 0;
}
.service-hr {
  background-color: rgb(51, 51, 51);
  display: inline-block;
  height: 4px;
  margin-bottom: 30px;
  margin-top: 15px;
  width: 105px;
}
.service-desc {
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 20px;
  color: #374151;
}
.service-cta {
  background-color: rgb(203, 38, 28);
  border-radius: 4px;
  box-shadow: rgba(18, 21, 22, 0.1) 0px 10px 20px 0px;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-size: 24px;
  height: 65px;
  line-height: 65px;
  margin-top: 30px;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.3s;
  width: 253px;
}

/* ============================================================
   Warehouse Section
   ============================================================ */
.warehouse-section {
  margin-bottom: 80px;
  text-align: center;
}

.warehouse-section h2 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 40px;
}

.warehouse-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}

.carousel-button {
  width: 48px;
  height: 48px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #374151;
  flex-shrink: 0;
}

.carousel-button:hover:not(:disabled) {
  background: #cb261c;
  color: #fff;
  border-color: #cb261c;
}

.carousel-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Position arrows overlayed on the carousel */
.carousel-button.next {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
}
.carousel-button.prev {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
}

.carousel-content {
  flex: 1;
  max-width: 600px;
}

.warehouse-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 16px;
}

.warehouse-name {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

/* New track styles for multi-item carousel */
.warehouse-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.warehouse-track {
  display: flex;
  align-items: center;
  transition: transform 0.4s ease;
  will-change: transform;
}
.warehouse-item {
  width: 284px;
  margin-right: 20px;
  text-align: center;
  flex: 0 0 auto;
}
.warehouse-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

/* ============================================================
   Footer
   ============================================================ */
.footer {
  background: #111827;
  color: #f9fafb;
  margin-top: 60px;
}

.footer-inner {
  padding: 48px 0 40px;
  box-sizing: border-box;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-col {
  box-sizing: border-box;
}

.footer-col h3 {
  font-size: 16px;
  margin: 0 0 16px;
  font-weight: 600;
  color: #fff;
}

.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-col li {
  list-style: none;
  margin: 0;
}

.footer-col a {
  color: #d1d5db;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.footer-col a:hover {
  color: #fff;
}

.footer-col--wechat {
  text-align: center;
}

.footer-qr img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.footer-qr p {
  margin: 10px 0 0;
  font-size: 13px;
  color: #d1d5db;
}

.footer-bottom {
  background: #0b1220;
  padding: 16px 0;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
  margin-top: 20px;
}

/* ============================================================
   Responsive Design
   ============================================================ */
@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-nav {
    width: 100%;
    gap: 12px;
  }

  .intro-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .intro-text h2 {
    font-size: 24px;
  }

  .intro-text p {
    font-size: 14px;
  }

  .business-section h2,
  .services-section h2,
  .warehouse-section h2 {
    font-size: 24px;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .service-card:nth-child(2) {
    grid-template-columns: 1fr;
  }

  .service-card:nth-child(2) .service-content {
    order: 0;
  }

  .service-card:nth-child(2) .service-image {
    order: 1;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .warehouse-carousel {
    gap: 12px;
    padding: 24px;
  }

  .carousel-button {
    width: 40px;
    height: 40px;
  }

  .top-bar-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    height: auto;
    padding: 8px 0;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }

  .header-logo img {
    height: 48px;
  }

  .header-title h1 {
    font-size: 18px;
  }

  .about-banner-wrapper {
    margin-bottom: 40px;
  }

  .intro-section,
  .business-section,
  .services-section,
  .warehouse-section {
    margin-bottom: 50px;
  }

  .intro-text h2,
  .business-section h2,
  .services-section h2,
  .warehouse-section h2 {
    font-size: 20px;
  }

  .intro-text p {
    font-size: 13px;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .service-card {
    padding: 20px;
  }

  .service-content h3 {
    font-size: 18px;
  }

  .service-content p {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .warehouse-carousel {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  .carousel-button {
    display: none;
  }

  .top-bar-link {
    font-size: 11px;
  }

  .nav-link {
    font-size: 12px;
  }
}
</style>
