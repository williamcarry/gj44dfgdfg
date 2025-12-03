<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts ��自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="min-h-screen bg-gray-50">
    <SiteHeader />
    
    <div class="container mx-auto max-w-[1500px] px-4 py-8">
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <!-- About Saleyee Platform Section -->
        <section class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4">关于赛盈平台</h3>
          <p class="text-gray-600 leading-relaxed">
            深圳赛盈网络有限公司，是专注于为供应商及分销商双向赋能的跨境电商分销B2B平台，通过整合谷仓海外仓、云途专线物流、跨呗金融等优质供应链资源，帮助工厂及品牌供应商扩展海外销路；���时也为Amazon、eBay、Wish、Walmart及Shopify等平台的国内外卖家提供海外仓货源���件代发服务，解决卖家遇到的选品难、资金有限、海外仓服务门槛高、售后难等系列经营难题，现已���持美国、英国、德国、法国、加拿大等国家分销。
          </p>
        </section>

        <!-- Membership Levels Section -->
        <section class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4">赛盈会员等级</h3>
          <table class="w-full border-collapse border border-red-600 rounded-lg">
            <thead>
              <tr class="bg-gray-200">
                <th class="border border-red-600 p-3 text-center">会员等级</th>
                <th class="border border-red-600 p-3 text-center">月销售额</th>
                <th class="border border-red-600 p-3 text-center">会员折扣</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(level, index) in membershipLevels" :key="index" class="hover:bg-gray-50">
                <td class="border border-gray-300 p-3 text-center">
                  <span v-if="level.level !== '普通会员'" class="text-orange-600 font-bold">
                    <b>V</b>{{ level.level.replace('VIP', '') }}
                  </span>
                  <span v-else>{{ level.level }}</span>
                  <em v-if="level.level !== '普通会员'" class="text-xs ml-1">({{ level.level }})</em>
                </td>
                <td class="border border-gray-300 p-3 text-center">{{ level.sales }}</td>
                <td class="border border-gray-300 p-3 text-center">{{ level.discount }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- Membership Level Explanation -->
        <section class="mb-8">
          <h4 class="text-lg font-bold text-gray-800 mb-4">会员等级说明</h4>
          <div class="space-y-3 text-gray-600">
            <p>
              <strong>(1) 普通会员:</strong> 新用户注册后，完善相关会员资料即可成为普通会员。
              若您还未完善，请点此前往完善 
              <a href="https://www.saleyee.com/user/info.html" class="text-blue-500 hover:underline">
                https://www.saleyee.com/user/info.html
              </a>
            </p>
            <p>
              <strong>(2) V1-V5:</strong> 每月1号将根据会员在上一个月的销售额数据，对应普通会员至VIP1会员、VIP2会员、VIP3会员、VIP4会员、VIP5会员。会员等级调整将次月生效，无法��前申请生效。
            </p>
            <p>
              <strong>(3) 如何提高会员等级:</strong> 只有您上个月的有效订单销售额达到系统要求，才能享受对应等级的折扣。唯有多下订单才���提升您的会员等级进而享受更多的折扣。
            </p>
            <p>
              <strong>(4) 会员升级:</strong> 会员升级可跨级，如果上一个月的销售额数据满足对应的升级额度，即可直接升级至对应的会员等级。
            </p>
            <p>
              <strong>(5) 会员降级:</strong> 会员降级可跨级，如果上一个月的销售额数据未能满足当前等级所需的成长值，则直接降级至对应的会员等级。
            </p>
            <p class="text-red-600">
              <strong>(6) 中国直发专区:</strong> 商品采用统一分销价格，均不享受赛盈会员权益折扣；产生于中国直发专区的商品订单销售额，均不纳入赛盈会员升级系统。
            </p>
            <p class="text-red-600">
              <strong>(7) 海外仓商品:</strong> 部分海外仓商品不享受赛盈会员权益折扣，请在商品详情页"会员折扣"中查看。
            </p>
          </div>
        </section>

        <!-- Membership Rights Section -->
        <section class="mb-8">
          <h3 class="text-xl font-bold text-gray-800 mb-4">
            赛盈会员权益 
            <span class="text-sm text-gray-600">(适用海外仓商品)</span>
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-red-600 rounded-lg">
              <thead>
                <tr class="bg-red-600 text-white">
                  <th class="border p-3 text-left w-1/6">权益 / VIP等级</th>
                  <th class="border p-3 text-center">普通会员</th>
                  <th class="border p-3 text-center">V1</th>
                  <th class="border p-3 text-center">V2</th>
                  <th class="border p-3 text-center">V3</th>
                  <th class="border p-3 text-center">V4</th>
                  <th class="border p-3 text-center">V5</th>
                  <th class="border p-3 text-center">说明</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(right, index) in membershipRights" :key="index" class="hover:bg-gray-50">
                  <td class="border p-3 bg-blue-50 font-semibold">{{ right.name }}</td>
                  <td v-for="(value, level) in right.levels" :key="level" class="border p-3 text-center">
                    <img v-if="value === 'yes'" src="https://www.saleyee.com/ContentNew/Images/yes.png" alt="Yes" class="w-4 h-4 mx-auto">
                    <img v-else-if="value === 'no'" src="https://www.saleyee.com/ContentNew/Images/no.png" alt="No" class="w-4 h-4 mx-auto">
                    <span v-else>{{ value }}</span>
                  </td>
                  <td class="border p-3">{{ right.description }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Registration Call to Action -->
        <section class="text-center py-8">
          <h4 class="text-xl font-bold text-gray-800 mb-4">如何加入赛盈分销平台，开启海外一件代发模式?</h4>
          <p class="text-gray-600 mb-6">点击下方按钮免费注册并完善会员资料以享受会员权益</p>
          <a 
            href="https://www.saleyee.com/register.html" 
            class="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            欢迎免费注册
          </a>
        </section>
      </div>
    </div>

    <SiteFooter />
    <RightFloatNav />
  </div>
</template>

<script setup>
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import RightFloatNav from '@/components/RightFloatNav.vue'

const membershipLevels = [
  { level: '普通会员', sales: '完善会员资料', discount: '0%' },
  { level: 'VIP1', sales: '≥ $2000', discount: '1%' },
  { level: 'VIP2', sales: '≥ $10000', discount: '2%' },
  { level: 'VIP3', sales: '≥ $50000', discount: '3%' },
  { level: 'VIP4', sales: '≥ $200000', discount: '4%' },
  { level: 'VIP5', sales: '≥ $500000', discount: '5%' }
]

const membershipRights = [
  {
    name: '每月下载SKU数',
    levels: { 
      normal: '200个', 
      v1: '300个', 
      v2: '400个', 
      v3: '500个', 
      v4: '600个', 
      v5: '750个' 
    },
    description: '/'
  },
  {
    name: '平台载单授权',
    levels: { 
      normal: 'yes', 
      v1: 'yes', 
      v2: 'yes', 
      v3: 'yes', 
      v4: 'yes', 
      v5: 'yes' 
    },
    description: '可在个人中心操作'
  },
  {
    name: 'API 对接',
    levels: { 
      normal: 'no', 
      v1: 'no', 
      v2: 'no', 
      v3: 'yes', 
      v4: 'yes', 
      v5: 'yes' 
    },
    description: 'V3-V5的企业用户可联系业务经理申请权限'
  },
  // Add other membership rights here
]
</script>

<style scoped>
.container {
  max-width: 1500px;
  min-width: 1200px;
}
</style>
