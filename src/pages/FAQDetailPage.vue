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
      <div class="hc-container hc-header__inner">
        <div class="hc-header__brand">
          <a class="hc-header__logo" href="/">
            <img src="https://www.saleyee.com/Content/Images/logo.png" alt="赛盈分销" />
          </a>
          <div class="hc-header__title">
            <h1>赛盈分销</h1>
            <p>帮助中心</p>
          </div>
        </div>
        <nav class="hc-header__nav">
          <a class="hc-nav-link" href="/help-center">首页</a>
          <a class="hc-nav-link" href="https://www.saleyee.com/faq.html" target="_blank" rel="noreferrer">常见问题</a>
          <a class="hc-nav-link" href="https://www.saleyee.com/guide.html" target="_blank" rel="noreferrer">操作指引</a>
          <a class="hc-nav-link" href="/contact-us">联系我们</a>
        </nav>
      </div>
    </header>

    <main>
      <!-- FAQ 详情页面内容 -->
      <section class="hc-container" style="padding: 20px 0;" :key="faqId">
        <div class="div" v-if="faqItem">
          <!-- 面包屑导航 -->
          <div class="div-2">
            <a href="/help-center" class="a">帮��中心</a>
            <i class="i">></i>
            <span>{{ faqItem.question }}</span>
          </div>

          <!-- 主要内容区域 -->
          <div class="div-3">
            <!-- 问题标题 -->
            <p class="p">{{ faqItem.question }}</p>

            <!-- 发布时间和分类信息 -->
            <div class="div-4">
              <span class="span">
                发布时间：
                <em class="em">{{ formatDate }}</em>
              </span>
            </div>

            <!-- 答案内容 -->
            <div class="div-5">
              <div class="div-6">
                <p class="span-2">{{ faqItem.content }}</p>
              </div>
            </div>

            <!-- 有用与无用按钮 -->
            <div class="div-7">
              <ul class="ul">
                <li class="li">
                  <i class="i-2"></i>
                  <span>有帮助</span>
                </li>
                <li class="li-2">
                  <a href="javascript:void(0)" class="a-5">
                    <i class="i-3"></i>
                    <span>未解决</span>
                  </a>
                </li>
              </ul>
              <p class="p-2">
                已帮助
                <em class="em-2">{{ helpCount }}</em>
                位用户解决问题
              </p>
            </div>
          </div>

          <div class="div-10"></div>
        </div>

        <!-- 找不到问题 -->
        <div v-else class="div">
          <div class="div-8">
            <p class="p">找不到此问题</p>
            <p class="p-3">您访问的问题不存在，请返回帮助中心重新选择。</p>
            <a href="/help-center" class="a-link-back">返回帮助中心</a>
          </div>
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
          <h3>合作联系</h3>
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
        <div class="hc-container">© 2025 Saleyee.com Tengming Limited | 网站地图</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getFaqById } from '@/data/faqData'

const partners = [
  { alt: 'Amazon', src: 'https://www.saleyee.com/ContentNew/Images/partners/amazon.png' },
  { alt: 'eBay', src: 'https://www.saleyee.com/ContentNew/Images/partners/ebay.png' },
  { alt: 'Wish', src: 'https://www.saleyee.com/ContentNew/Images/partners/wish.png' },
  { alt: 'Walmart', src: 'https://www.saleyee.com/ContentNew/Images/partners/walmart.png' },
  { alt: 'Shopify', src: 'https://www.saleyee.com/ContentNew/Images/partners/shopify.png' },
]

const route = useRoute()

const faqId = computed(() => {
  const id = route.params.id
  return id
})

const faqItem = computed(() => {
  const id = faqId.value
  if (!id) {
    return undefined
  }
  const item = getFaqById(id)
  return item
})

const formatDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '/')
})

const helpCount = 261
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
.hc-header__inner { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; gap: 24px; flex-wrap: wrap; }
.hc-header__brand { display: flex; align-items: center; gap: 16px; }
.hc-header__logo img { height: 60px; width: auto; }
.hc-header__title h1 { font-size: 24px; font-weight: 600; margin: 0; color: #111827; }
.hc-header__title p { margin: 4px 0 0; font-size: 14px; color: #6b7280; }
.hc-header__nav { display: flex; align-items: center; gap: 24px; }
.hc-nav-link { color: #374151; font-size: 14px; text-decoration: none; position: relative; padding-bottom: 4px; transition: color 0.2s ease; }
.hc-nav-link:hover { color: #cb261c; }

/* ��脚 */
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

/* FAQ 详情页面样式（按提供的HTML布局） */
.div { background-color: #fff; }
.div-2 { border-bottom: 1px solid #eee; border-bottom-style: solid; border-bottom-width: 1px; color: #333; margin-bottom: 20px; padding-bottom: 15px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 12px; }
.a { color: #999; cursor: pointer; display: inline; margin-right: 8px; text-decoration: none; transition: color 0.3s; }
.a:hover { color: #cb261c; }
.i { color: #999; display: inline-block; font-size: 12px; margin-right: 8px; margin-left: 8px; }
.p { color: #333; font-size: 18px; font-weight: 700; line-height: 36px; text-align: center; margin: 0; }
.div-4 { text-align: center; }
.span { display: inline-block; font-size: 12px; line-height: 20px; margin-left: 10px; margin-right: 10px; text-align: center; }
.em { display: inline; font-size: 12px; line-height: 20px; text-align: center; }
.div-5 { margin-bottom: 40px; margin-top: 20px; }
.div-6 { line-height: normal; text-align: justify; }
.span-2 { display: inline; font-size: 16px; line-height: 1.8; text-align: justify; word-wrap: break-word; white-space: pre-wrap; }
.div-7 { margin-bottom: 20px; margin-top: 80px; text-align: center; }
.ul { align-items: center; display: flex; justify-content: center; text-align: center; list-style: none; padding: 0; margin: 0; }
.li { align-items: center; background-color: #fff; border: 1px solid #eee; border-radius: 2px; color: #333; cursor: pointer; display: flex; margin-right: 10px; padding: 10px 40px; transition: all 0.3s ease; }
.li:hover { border-color: #cb261c; color: #cb261c; }
.i-2 { background-image: url("https://www.saleyee.com/Area/ZT.DMS.Help.Web/Content/images/solve.png"); background-position: 0px 0px; background-repeat: no-repeat; cursor: pointer; height: 18px; margin-right: 6px; text-align: center; width: 18px; }
.li-2 { align-items: center; background-color: #fff; border: 1px solid #eee; border-radius: 2px; color: #333; cursor: pointer; display: flex; padding: 10px 40px; transition: all 0.3s ease; }
.li-2:hover { border-color: #cb261c; }
.li-2:hover .a-5 { color: #cb261c; }
.a-5 { align-items: center; border-color: #333; color: #333; cursor: pointer; display: flex; text-align: center; text-decoration: none; transition: color 0.3s; }
.i-3 { background-image: url("https://www.saleyee.com/Area/ZT.DMS.Help.Web/Content/images/unsolve.png"); background-position: 0px 0px; background-repeat: no-repeat; cursor: pointer; height: 18px; margin-right: 6px; text-align: center; width: 18px; }
.p-2 { line-height: 36px; margin-top: 10px; text-align: center; margin: 0; }
.em-2 { display: inline-block; line-height: 36px; margin-left: 5px; margin-right: 5px; text-align: center; }
.div-3 { background: #fff; margin-bottom: 20px; min-height: 550px; padding: 20px; width: 100%; }
.div-10 { clear: both; }

/* 未找到页面样式 */
.div-8 { padding: 60px 20px; text-align: center; }
.p-3 { color: #666; font-size: 14px; margin-bottom: 30px; }
.a-link-back { display: inline-block; padding: 10px 30px; background-color: #cb261c; color: #fff; text-decoration: none; border-radius: 4px; transition: background-color 0.3s; }
.a-link-back:hover { background-color: #a91e14; }

@media (max-width: 1149px) {
  .hc-container { max-width: 960px; min-width: auto; }
}
@media (max-width: 991px) {
  .hc-container { max-width: 720px; }
}
@media (max-width: 767px) {
  .hc-container { max-width: 540px; padding: 0 12px; }
}
@media (max-width: 575px) {
  .hc-header__logo img { height: 48px; }
  .hc-header__title h1 { font-size: 20px; }
}
</style>
