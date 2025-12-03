<!--
CSS 引用说明：
1. 全局样式��在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="min-h-screen flex flex-col bg-white">
    <SiteHeader />

    <main class="flex-1">
      <!-- Hero -->
      <section class="bg-slate-50 border-b">
        <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 py-10 md:py-14">
          <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">甄选海量精品货源 欧美海外仓一件代发</h1>
            <p class="text-slate-600 leading-relaxed">
              深圳赛盈网络有限公司，是专注于为供应商及分销商双向赋能的跨境电商分销B2B平台，通过整合谷仓海外仓、云途专线物流等优质供应链资源，帮助工厂及品牌供应商扩展海外销��；同时也为Amazon、eBay、Walmart及Shopify等平台的国内外卖家提供海外仓货源一件代发服务，解决卖家遇到的选品难、资金有限、海外仓服务门槛高、售后难等系列经营难题，现已支持美国、英国、德国、法国、加拿大等国家分销。
            </p>
            <div class="flex items-center justify-center gap-3 md:gap-4 mt-6">
              <a href="/register" class="btn-primary">免费注册</a>
              <a href="/login" class="btn-secondary">已有账号，去登录</a>
            </div>
            <div class="mt-8">
              <div class="rounded-lg overflow-hidden border bg-black/5">
                <video
                  class="w-full h-auto"
                  controls
                  preload="metadata"
                  poster="https://www.saleyee.com/ContentNew/Images/video_bg.jpg?v20230518"
                >
                  <source src="https://resource.saleyee.cn/videos/saleyee_getting_started.mp4" type="video/mp4" />
                  您的浏览器不支持视频播放。
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 只需4步, 开启 赛盈分销一件代发赚钱模式 -->
      <section class="bg-white">
        <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 py-10 md:py-14">
          <div class="text-center mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-slate-900">只需4步, 开启</h2>
            <p class="text-slate-600">赛盈分销一件代发赚钱模式</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div class="card">
              <div class="card-icon">1</div>
              <h3 class="card-title">1.选品</h3>
              <p class="card-desc">免费注册赛盈账号，在赛盈分销平台上选择产品，并下载商品数据包</p>
              <a class="card-btn" href="/register">立即注册</a>
            </div>
            <div class="card">
              <div class="card-icon">2</div>
              <h3 class="card-title">2.刊登</h3>
              <p class="card-desc">将所选商品刊登到您的Amazon、eBay、Shopify等店铺进行销售</p>
              <a class="card-btn" href="/#selected">去选品</a>
            </div>
            <div class="card">
              <div class="card-icon">3</div>
              <h3 class="card-title">3.下单</h3>
              <p class="card-desc">店铺出单��，即可到赛盈平台下单并付款</p>
              <a class="card-btn" href="#">了解下单</a>
            </div>
            <div class="card">
              <div class="card-icon">4</div>
              <h3 class="card-title">4.发货</h3>
              <p class="card-desc">赛盈海外仓24小时出单号，2-8天妥投</p>
              <a class="card-btn" href="https://www.saleyee.com/faq/hp981158.html" target="_blank" rel="noreferrer">物流方式</a>
            </div>
          </div>
        </div>
      </section>

      <!-- 加入赛盈一件代发分销平台的六大理由 -->
      <section class="bg-slate-50">
        <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 pt-10 md:pt-14 pb-0">
          <div class="text-center mb-8">
            <h2 class="text-xl md:text-2xl font-semibold text-slate-900">加入赛盈一件代发分销平台的六大理由</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div class="card">
              <h3 class="card-title">海量优质货源</h3>
              <p class="card-desc">这里有那些年，你发不动的大货！</p>
              <ul class="list-disc pl-5 text-slate-700 text-sm leading-6">
                <li>10年专业产品团队</li>
                <li>13条品类线</li>
                <li>1000+精品每���上新</li>
                <li>60000+真实海外仓现货SKU</li>
                <li>支持非普货类及大件类产品海外仓直发</li>
              </ul>
            </div>
            <div class="card">
              <img class="w-full h-40 object-cover rounded mb-3" src="https://www.saleyee.com/ContentNew/Images/goten_join2.png" alt="0库存运营模式" />
              <h3 class="card-title">“0”库存运营模式 解放资金压力，降低库存风险</h3>
              <ul class="list-disc pl-5 text-slate-700 text-sm leading-6">
                <li>一件代发，先出单后付款</li>
                <li>无需备货，无库存风险</li>
                <li>零成本搭建跨境供应链体系</li>
              </ul>
            </div>
            <div class="card">
              <h3 class="card-title">9大海外仓服务 24小时出单号，2-8天妥投</h3>
              <ul class="list-disc pl-5 text-slate-700 text-sm leading-6">
                <li>海外总仓储面积达63万+㎡</li>
                <li>支持Fedex、UPS、USPS等物流全程跟踪</li>
                <li>满足Amazon、eBay、Walmart、Shopify物流时效要求</li>
                <li>快速缩短回款周期，提升资金周转率</li>
              </ul>
            </div>
            <div class="card">
              <img class="w-full h-40 object-cover rounded mb-3" src="https://www.saleyee.com/ContentNew/Images/goten_newjoin3.png" alt="售后无忧" />
              <h3 class="card-title">售后无忧</h3>
              <p class="card-desc">售后比率&lt;2%，快捷退换货</p>
              <ul class="list-disc pl-5 text-slate-700 text-sm leading-6">
                <li>专业客服团队，快速响应</li>
                <li>长达60天售后服务期</li>
                <li>售后比率&lt;2%</li>
                <li>退换货便捷，极速处理售后问题</li>
              </ul>
            </div>
            <div class="card">
              <h3 class="card-title">强大技术支持</h3>
              <p class="card-desc">大量减少工作量，实现智能化管理</p>
              <div class="text-slate-700 text-sm leading-6 space-y-2">
                <p>无技术开发团队分销商：赛盈现已支持Amazon及Shopify店铺商品一键刊登功能；并支持Amazon、eBay、Wish、Shopify等平台店铺账号与赛盈系统绑定，可实现订单加载、库存同步、自动上传跟踪号等功能。</p>
                <p>拥有技术开发团队分销商：可通过赛盈公共API接口，实现商品管理、订单管理、账户���理等诸多功能。</p>
              </div>
            </div>
            <div class="card">
              <img class="w-full h-40 object-cover rounded mb-3" src="https://www.saleyee.com/ContentNew/Images/goten_join5.png" alt="一对一客户经理服务" />
              <h3 class="card-title">一对一客户经理服务</h3>
              <p class="card-desc">您的供应链“私人管家”</p>
              <ul class="list-disc pl-5 text-slate-700 text-sm leading-6">
                <li>专业产品服务，定制化推荐</li>
                <li>协助管理库存，提升库存稳定性</li>
                <li>网站功能使用讲解</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<style scoped>
.btn-primary { @apply bg-primary text-white px-4 md:px-6 py-2 rounded font-medium hover:brightness-95; }
.btn-secondary { @apply bg-white text-primary border border-primary px-4 md:px-6 py-2 rounded font-medium hover:bg-slate-50; }
.btn-light { @apply bg-white text-primary px-4 md:px-6 py-2 rounded font-medium hover:bg-slate-100; }
.btn-dark { @apply bg-primary text-white px-4 md:px-6 py-2 rounded font-medium hover:brightness-95; }

.card { @apply rounded-lg border bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition; }
.card-icon { @apply w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold mb-3; }
.card-title { @apply text-base md:text-lg font-semibold text-slate-900 mb-1; }
.card-desc { @apply text-slate-600 text-sm mb-3; }
.card-btn { @apply inline-block bg-primary text-white px-3 py-1.5 rounded text-sm font-medium hover:brightness-95; }
.card-link { @apply inline-block text-primary px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-50; }
</style>
