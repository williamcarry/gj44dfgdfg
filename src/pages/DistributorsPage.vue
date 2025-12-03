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
  <div class="distributors-wrapper">
    <!-- Top bar -->
    <div class="top-bar">
      <div class="container top-bar-inner">
        <div class="top-bar-left">
          <a class="top-bar-notice" href="https://resource.saleyee.cn/Files/%E5%85%AC%E5%91%8A%E5%85%AC%E5%BC%80%E4%BF%A1/%E8%AF%A6%E7%BB%86%E8%A7%A3%E8%AF%AATTENGMING%20LIMITED%20%E5%8F%8D%E4%BD%9C%E9%94%80%E9%93%BE%E4%BF%A1%E6%81%AF.pdf" target="_blank" rel="noreferrer">
            <span>【公告】TENGMING LIMITED 公司名称冒用声明</span>
          </a>
        </div>
        <div class="top-bar-right">
          <a class="top-bar-link" href="/login">登录</a>
          <a class="top-bar-link" href="/register">注册</a>
          <a class="top-bar-link" href="/getting-started">入门指引</a>
          <a class="top-bar-link" href="/help-center">帮助中心</a>
          <a class="top-bar-link" href="/membership">会员权益</a>
        </div>
      </div>
    </div>

    <!-- Header -->
    <header class="header">
      <div class="container-full header-inner">
        <div class="header-brand">
          <a class="header-logo" href="/">
            <img src="https://www.saleyee.com/Content/Images/logo.png" alt="赛盈分销" />
          </a>
          <div class="header-title">
            <h1>赛盈分销</h1>
            <p>跨境卖家入驻</p>
          </div>
        </div>
        <nav class="header-nav">
          <a class="nav-link" href="/">首页</a>
          <a class="nav-link" href="/help-center">帮助中心</a>
          <a class="nav-link" href="/contact-us">联系我们</a>
        </nav>
      </div>
    </header>

    <!-- Main content -->
    <div class="distributors-bg">
      <!-- Breadcrumb -->
      <div class="breadcrumb-wrapper">
        <div class="container-wrapper">
          <div class="breadcrumb">
            <a href="/">首页</a>
            <span>&gt;</span>
            <span>跨境卖家入驻</span>
          </div>
        </div>
      </div>

      <div class="container-wrapper">
        <!-- Hero section -->
        <section class="hero-section">
          <div class="hero-content">
            <h1 class="hero-title">跨境电商货源分销服务</h1>
            <p class="hero-subtitle">赛盈分销平台，甄选60000+欧美海外仓精品货源，涵盖家居、运动健身、健康美容、汽配、玩具、服饰箱包等13个大品类产品，为Amazon、eBay、Wish、Walmart及Shopify等平台卖家提供海外仓包邮一件代发服务。</p>
          </div>
        </section>

        <!-- Service overview section -->
        <section class="service-overview">
          <h2 class="section-title">分销服务</h2>
          <div class="service-grid">
            <div class="service-card">
              <div class="service-icon">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_icon1.png" alt="服务对象" />
              </div>
              <h3 class="service-card-title">服务对象</h3>
              <p class="service-card-text">Amazon、eBay、Walmart、Wish、Shopify、Tiktok等跨境电商平台，为想做跨境电商的卖家提供海外仓现货一件代发服务。</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_icon2.png" alt="分销产品" />
              </div>
              <h3 class="service-card-title">分销产品</h3>
              <p class="service-card-text">家居园艺、户外、运动健康、汽配、音乐、宠物、3C、工艺品、玩具、服饰箱包、体育用品等13条品类线。</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_icon3.png" alt="支持分销国家" />
              </div>
              <h3 class="service-card-title">支持分销国家</h3>
              <p class="service-card-text">美国、英国、德国、法国、捷克、加拿大等。</p>
            </div>
            <div class="service-card">
              <div class="service-icon">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_icon4.png" alt="支付方式" />
              </div>
              <h3 class="service-card-title">支付方式</h3>
              <p class="service-card-text">通过实时付款或者预充值的方式进行付款，支持Payoneer、微信支付、香港银行账户、支付宝等。</p>
            </div>
          </div>
        </section>

        <!-- Advantages section -->
        <section class="advantages-section">
          <h2 class="section-title">分销服务优势</h2>
          <ul class="advantages-list">
            <li class="advantage-item">
              <div class="advantage-image">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_img1.png" alt="海量优质货源" />
              </div>
              <div class="advantage-content">
                <h4 class="advantage-title">海量优质货源</h4>
                <ul class="advantage-bullets">
                  <li>赛盈拥有9年专业选品经验，100+专业产品团队；</li>
                  <li>大数据甄选适销跨境精品；</li>
                  <li>甄选家居、运动健身、健康美容、汽配、玩具、服饰箱包等；</li>
                  <li>13条主推品类线、1000+新��每月上线；</li>
                  <li>精选海外仓精品货源，满足多样化选品需求。</li>
                </ul>
              </div>
            </li>

            <li class="advantage-item">
              <div class="advantage-content">
                <h4 class="advantage-title">分销服务优势体系</h4>
                <ul class="advantage-bullets">
                  <li>支持Amazon、eBay、Walmart、Wish、Shopify等全球主流电商平台；</li>
                  <li>服务全球200+国家和地区的跨境卖家；</li>
                  <li>提供完整的产品数据、图片、描述一体化服务；</li>
                  <li>灵活的分销方案适应不同卖家需求；</li>
                  <li>专业的运营支持和数据分析工具。</li>
                </ul>
              </div>
              <div class="advantage-image">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_img2.png" alt="分销服务优势体系" />
              </div>
            </li>

            <li class="advantage-item">
              <div class="advantage-image">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_img3.png" alt="���投入即享海外仓服务" />
              </div>
              <div class="advantage-content">
                <h4 class="advantage-title">零投入即享海外仓服务</h4>
                <ul class="advantage-bullets">
                  <li>赛盈支持美国、英国、德国等9大海外仓一件代发；</li>
                  <li>海外仓货源本土直发可在24小时内出物流跟踪号；</li>
                  <li>2-8天极速妥投，支持Fedex、UPS、USPS等物流全程跟踪；</li>
                  <li>满足amazon、ebay等各大海外电商平台对跨境物流时效的要求。</li>
                </ul>
              </div>
            </li>

            <li class="advantage-item">
              <div class="advantage-content">
                <h4 class="advantage-title">售后无忧</h4>
                <ul class="advantage-bullets">
                  <li>赛盈拥有9年专业客服团队；</li>
                  <li>平台商品售后服务期长达60天、售后比率 < 2%；</li>
                  <li>退换货便捷；</li>
                  <li>高效处理售后问题。</li>
                </ul>
              </div>
              <div class="advantage-image">
                <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应���分销商入驻/distributor_img4.png" alt="售后无忧" />
              </div>
            </li>
          </ul>
        </section>

        <!-- Process section -->
        <section class="process-section">
          <h2 class="section-title">分销服务流程</h2>
          <div class="process-container">
            <div class="process-steps">
              <div class="process-step">
                <div class="step-icon">
                  <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_step1.png" alt="步骤1" />
                </div>
                <h4 class="step-title">注册赛盈会员</h4>
                <p class="step-description">进入赛盈分销平台，注册成为赛盈会员。</p>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_step2.png" alt="步骤2" />
                </div>
                <h4 class="step-title">下载产品数据包</h4>
                <p class="step-description">获取产品数据，下载Excel�价格或API接入。</p>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_step3.png" alt="步骤3" />
                </div>
                <h4 class="step-title">刊登销售</h4>
                <p class="step-description">将产品上传至各平台，开始销售。</p>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_step4.png" alt="步骤4" />
                </div>
                <h4 class="step-title">出单支付货款</h4>
                <p class="step-description">订单生成后支付货款，确保库存。</p>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_step5.png" alt="步骤5" />
                </div>
                <h4 class="step-title">24小时发货</h4>
                <p class="step-description">海外仓24小时内发货，确保��效。</p>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_step6.png" alt="步骤6" />
                </div>
                <h4 class="step-title">售后服务</h4>
                <p class="step-description">赛盈提供全面售后支持，无后顾之忧。</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact section -->
        <section class="contact-section">
          <h2 class="section-title">入驻联系方式</h2>
          <div class="contact-grid">
            <div class="contact-card">
              <h3 class="contact-region">华南区（广东、广西等省份）</h3>
              <div class="contact-info">
                <p class="contact-item">
                  <span class="label">电话：</span>
                  <span class="value">0755-88600121</span>
                </p>
                <p class="contact-item">
                  <span class="label">手机：</span>
                  <span class="value">13534245005</span>
                </p>
                <p class="contact-item">
                  <span class="label">QQ：</span>
                  <span class="value">3479151706</span>
                </p>
              </div>
            </div>

            <div class="contact-card">
              <h3 class="contact-region">东南区（福建等省份）及��它区域</h3>
              <div class="contact-info">
                <p class="contact-item">
                  <span class="label">手机：</span>
                  <span class="value">13588882521</span>
                </p>
                <p class="contact-item">
                  <span class="label">QQ：</span>
                  <span class="value">1911854602</span>
                </p>
              </div>
            </div>
          </div>

          <div class="join-cta">
            <a href="/register" class="join-button">
              <img src="https://resource.saleyee.cn/Content/Images/uploaded/供应商分销商入驻/distributor_join.png" alt="免费入驻" />
            </a>
          </div>
        </section>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="container-full footer-inner">
        <div class="col">
          <h3>关于赛盈</h3>
          <ul>
            <li><a href="/about-saleyee">赛盈简介</a></li>
            <li><a href="/membership">会员权益</a></li>
            <li><a href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a></li>
            <li><a href="/contact-us">联系我��</a></li>
          </ul>
        </div>
        <div class="col">
          <h3>客���服务</h3>
          <ul>
            <li><a href="/help-center">帮助中心</a></li>
            <li><a href="/faq/hc271661">售后条款</a></li>
            <li><a href="/faq/hp062361">支付方式</a></li>
            <li><a href="/vat-policy">VAT政策解读</a></li>
            <li><a href="/feedback">体验反馈</a></li>
          </ul>
        </div>
        <div class="col">
          <h3>合作联系</h3>
          <ul>
            <li><a href="/distributors">跨境卖家入驻</a></li>
            <li><a href="/supplier">供应商入驻</a></li>
            <li><a href="/partners">合作伙伴</a></li>
            <li><a href="#">商务合作</a></li>
          </ul>
        </div>
        <div class="col footer-wechat">
          <h3>赛盈官方微信</h3>
          <img src="https://www.saleyee.com/ContentNew/Images/2021/December/saleyee-weixin.png" alt="赛盈官方微信" />
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container-full">© 2025 Saleyee.com Tengming Limited | 网站地图</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.distributors-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.container-full {
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

.container {
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

.container-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
}

/* Top bar */
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
  flex: 1;
}

.top-bar-notice {
  color: #cb261c;
  text-decoration: none;
  font-weight: 500;
  font-size: 12px;
}

.top-bar-notice:hover {
  text-decoration: underline;
}

.top-bar-right {
  display: flex;
  gap: 18px;
}

.top-bar-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 12px;
}

.top-bar-link:hover {
  color: #cb261c;
}

/* Header */
.header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-logo img {
  height: 56px;
}

.header-title h1 {
  margin: 0;
  font-size: 20px;
  color: #1f2937;
  font-weight: bold;
}

.header-title p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.header-nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 14px;
}

.nav-link:hover {
  color: #cb261c;
}

/* Main background */
.distributors-bg {
  background: linear-gradient(180deg, #fbeae5, #f2f3f7);
  padding: 30px 0;
  flex: 1;
}

/* Breadcrumb */
.breadcrumb-wrapper {
  margin-bottom: 20px;
}

.breadcrumb {
  color: #6b7280;
  font-size: 14px;
  padding: 0;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb span {
  margin: 0 8px;
  color: #6b7280;
}

/* Hero section */
.hero-section {
  background: #fff;
  padding: 50px 50px;
  margin-bottom: 20px;
  text-align: center;
  border-radius: 2px;
}

.hero-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin: 0 0 25px 0;
  line-height: 1.6;
}

.hero-subtitle {
  font-size: 16px;
  color: #333;
  line-height: 1.8;
  margin: 0;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

/* Section title */
.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0 0 35px 0;
  padding-bottom: 15px;
  border-bottom: 3px solid #cb261c;
  display: inline-block;
}

/* Service overview section */
.service-overview {
  background: #fff;
  padding: 50px;
  margin-bottom: 20px;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 30px;
}

.service-card {
  text-align: center;
  padding: 20px;
  border-radius: 4px;
  transition: box-shadow 0.3s;
}

.service-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.service-icon {
  margin-bottom: 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon img {
  max-height: 80px;
  max-width: 100%;
}

.service-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.service-card-text {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Advantages section */
.advantages-section {
  background: #fff;
  padding: 50px;
  margin-bottom: 20px;
}

.advantages-list {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 30px;
}

.advantage-item {
  display: flex;
  margin-bottom: 80px;
  align-items: center;
  gap: 40px;
}

.advantage-item:last-child {
  margin-bottom: 0;
}

.advantage-image {
  width: 50%;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 4px;
}

.advantage-image img {
  width: 100%;
  height: auto;
  display: block;
}

.advantage-content {
  width: 50%;
  flex-shrink: 0;
}

.advantage-title {
  font-size: 30px;
  font-weight: 400;
  color: #333333;
  margin: 0 0 25px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #CC302B;
  display: inline-block;
}

.advantage-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
}

.advantage-bullets li {
  font-size: 16px;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 15px;
}

.advantage-bullets li:last-child {
  margin-bottom: 0;
}

/* Process section */
.process-section {
  background: #fff;
  padding: 50px;
  margin-bottom: 20px;
}

.process-container {
  margin-top: 40px;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.process-step {
  text-align: center;
  padding: 20px 15px;
  border-radius: 4px;
  background: #fafafa;
  transition: background-color 0.3s;
}

.process-step:hover {
  background-color: #f0f0f0;
}

.step-icon {
  margin-bottom: 15px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-icon img {
  max-height: 80px;
  max-width: 100%;
}

.step-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
}

.step-description {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Contact section */
.contact-section {
  background: #fff;
  padding: 50px;
  margin-bottom: 20px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin: 30px 0 50px 0;
}

.contact-card {
  padding: 30px;
  background: #fafafa;
  border-radius: 4px;
  border-left: 4px solid #cb261c;
}

.contact-region {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.contact-info {
  margin: 0;
}

.contact-item {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  display: flex;
  gap: 10px;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 600;
  color: #333;
  min-width: 60px;
}

.value {
  color: #cb261c;
  font-weight: 500;
}

.join-cta {
  text-align: center;
  margin: 40px 0 0 0;
}

.join-button {
  display: inline-block;
  transition: transform 0.3s;
}

.join-button:hover {
  transform: scale(1.05);
}

.join-button img {
  max-width: 400px;
  width: 100%;
  height: auto;
}

/* Footer */
.footer {
  background: #222323;
  color: #ccc;
  margin-top: 0;
}

.footer-inner {
  display: flex;
  gap: 32px;
  padding: 32px 0;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 200px;
}

.col h3 {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
}

.col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.col li {
  margin-bottom: 8px;
}

.col a {
  color: #ccc;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s;
}

.col a:hover {
  color: #cb261c;
}

.footer-wechat img {
  width: 120px;
  height: 120px;
  border-radius: 4px;
}

.footer-bottom {
  background: #1a1a1a;
  border-top: 1px solid #333;
  padding: 16px 0;
  text-align: center;
  color: #999;
  font-size: 12px;
}

/* Responsive design */
@media (max-width: 1024px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .advantage-item {
    flex-direction: column;
    gap: 30px;
  }

  .advantage-image,
  .advantage-content {
    width: 100%;
  }

  .process-steps {
    grid-template-columns: repeat(3, 1fr);
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .header-nav {
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .service-grid {
    grid-template-columns: 1fr;
  }

  .advantage-item {
    flex-direction: column;
    margin-bottom: 50px;
  }

  .advantage-image,
  .advantage-content {
    width: 100%;
  }

  .process-steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-section,
  .service-overview,
  .advantages-section,
  .process-section,
  .contact-section {
    padding: 30px 20px;
  }

  .hero-title {
    font-size: 22px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .advantage-title {
    font-size: 24px;
  }

  .advantage-bullets li {
    font-size: 14px;
  }

  .header-nav {
    gap: 12px;
    font-size: 12px;
  }

  .top-bar-right {
    gap: 12px;
  }

  .footer-inner {
    gap: 20px;
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .service-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .process-steps {
    grid-template-columns: 1fr;
  }

  .hero-section {
    padding: 20px 15px;
  }

  .hero-title {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .hero-subtitle {
    font-size: 13px;
  }

  .header-title h1 {
    font-size: 16px;
  }

  .header-logo img {
    height: 40px;
  }

  .header-inner {
    padding: 15px 0;
  }

  .top-bar-inner {
    flex-direction: column;
    gap: 8px;
    height: auto;
    padding: 8px 0;
  }

  .top-bar-right {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
}
</style>
