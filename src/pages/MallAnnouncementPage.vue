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
  <div>
    <!-- ��情页面 -->
    <MallAnnouncementDetailPage
      v-if="selectedAnnouncementId !== null"
      :announcement-id="selectedAnnouncementId"
      @back="selectedAnnouncementId = null"
    />

    <!-- 公告列表 -->
    <div v-else class="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <ul class="divide-y divide-slate-200">
        <li v-for="announcement in paginatedAnnouncements" :key="announcement.id" class="p-5 hover:bg-slate-50 transition">
          <div class="flex gap-4">
            <div class="flex-1">
              <div class="flex items-start gap-3 mb-2">
                <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div class="flex-1">
                  <h3
                    @click="selectedAnnouncementId = announcement.id"
                    class="text-base font-semibold text-slate-900 hover:text-primary transition cursor-pointer"
                  >
                    {{ announcement.title }}
                  </h3>
                </div>
              </div>
              <p class="text-sm text-slate-600 line-clamp-2 mb-3 ml-5">
                {{ announcement.content }}
              </p>
              <div class="flex items-center justify-between ml-5">
                <span class="text-xs text-slate-500">{{ formatDate(announcement.date) }}</span>
                <button
                  @click="selectedAnnouncementId = announcement.id"
                  class="text-xs text-primary hover:text-primary font-medium"
                >
                  查看详情 >
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <!-- 分页 -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
        <div class="text-sm text-slate-600">
          共 {{ totalAnnouncements }} 条 | 第 {{ currentPage }} 页
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            上一页
          </button>
          <div class="flex items-center gap-1">
            <button
              v-for="page in paginationRange"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 text-sm rounded transition',
                currentPage === page
                  ? 'bg-primary text-white border border-primary'
                  : 'border border-slate-300 hover:bg-slate-100'
              ]"
            >
              {{ page }}
            </button>
          </div>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MallAnnouncementDetailPage from '@/pages/MallAnnouncementDetailPage.vue'

const selectedAnnouncementId = ref(null)

const currentPage = ref(1)
const pageSize = ref(5)

const announcements = [
  {
    id: 397,
    title: '关于赛盈分销平台新增发货物流的通知',
    content: '尊敬的分销商们：为进一步优化平台物流服务，提升小件商品的发货时效与成本优势，平台现已正式上线【EconomySmallParcelShipping】发货物流。一、物流说明 适用销售平台范围：eBay、Amazon、Shopify、Walmart、Shein��TikTok；物流限制：由于其他销售平台暂不支持该物流渠道，若在非上述平台下单选择该渠道，平台将提示报错无法下单；适用仓库类型：SY平台仓；',
    date: new Date('2025-10-14')
  },
  {
    id: 396,
    title: '2025年关于赛盈分销平台国庆节放假通知',
    content: '尊敬的分销商：你们好！根据国家法定节假日的安排，赛盈平台工作人员于2025年10月1日——2025年10月8日安排放假8天。假期期间，各位分销商在赛盈平台可继续下单，平台会正常安排发货。',
    date: new Date('2025-09-28')
  },
  {
    id: 395,
    title: '赛盈 × Lian Lian Global 联合官宣：首3月手续费五���，即刻开启！',
    content: '尊敬的客户：您好！为助力赛盈平台用��降本增效，无忧出海，赛盈分销平台联合连连国际支付推出支付手续费五折活动，低至0.15%,在2025年9月15日-2025年12月15日期间，在收银台选择"连连国际支付"支付订单，即可享受五折支付手续费的优惠。',
    date: new Date('2025-09-15')
  },
  {
    id: 394,
    title: '关于赛盈分销平台变更网站域名的通知',
    content: '尊敬的客户：您好！为了提升平台业务服务能力，赛盈分��平台将于2025年7月30日19：00��正式由原域名www.saleyee.cn迁移到新域名www.saleyee.com。原域名（www.saleyee.cn）将作为企业官网，仅展示公司介绍、服务内容等信息。',
    date: new Date('2025-07-28')
  },
  {
    id: 393,
    title: '关于赛盈分销平台开放加拿大市场的通知',
    content: '尊敬的分销商伙伴：你们好！为了助力您开拓更广阔的市场，拓展更多的分销商品选择，我们非常高兴的通知您，赛盈分销平台正式开放加拿大市场的分销业务。',
    date: new Date('2025-05-13')
  },
  {
    id: 392,
    title: '关于美国仓部分产品退货地址更新的通知',
    content: '尊敬的分销商：你们好！赛盈美国���部分商品的原退货地址"703Bartley-ChesterRd, Flanders,NJ,07836"将停止���用，更新为下述退货地址，请及时下载最新的数据包查看商品的退货地址。',
    date: new Date('2025-05-09')
  },
  {
    id: 391,
    title: '关于赛盈分销平台2025年劳动节放假通知',
    content: '尊敬的分销商，你们好！随着五一小长假的临近，我们在此温馨提醒您关于赛盈分销平台2025年劳动节假期的具体安排，以便大家提前做好相应的准备工作。',
    date: new Date('2025-04-28')
  },
  {
    id: 390,
    title: '关于赛盈分销平台支持自提订单的通知',
    content: '尊敬的分销商：您们好！为进一步提升订单处理效率，优化您的分销体验，我们正式上线了"自提订单"功能。我们可支持Temu、Wayfair、Walmart等各大主流销售平台的官方面单。',
    date: new Date('2025-04-16')
  },
  {
    id: 389,
    title: '关于赛盈分销平台商品调价生效时间调整的公告',
    content: '尊敬的分销商：您好！为进一步优化平台运营效率，提升您的分销体验，赛盈分销平台将于2025年4月11日起，对商品价格生效时间规则进行优化调整。',
    date: new Date('2025-04-10')
  },
  {
    id: 388,
    title: '关于赛���分销平台短信验证码接收异常的说明',
    content: '尊敬的��销商：因平台短信运营商为了严格落实国家反诈工作部署及行业监管要求，进一步提升短信服务安全性，导致部分号段的手机号码无法正常接收短信验证码。',
    date: new Date('2025-04-03')
  }
]

const totalAnnouncements = computed(() => announcements.length)
const totalPages = computed(() => Math.ceil(totalAnnouncements.value / pageSize.value))

const paginatedAnnouncements = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return announcements.slice(start, end)
})

const paginationRange = computed(() => {
  const delta = 2
  const left = Math.max(1, currentPage.value - delta)
  const right = Math.min(totalPages.value, currentPage.value + delta)
  const range = []

  if (left > 1) {
    range.push(1)
    if (left > 2) {
      range.push('...')
    }
  }

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < totalPages.value) {
    if (right < totalPages.value - 1) {
      range.push('...')
    }
    range.push(totalPages.value)
  }

  return range
})

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}
</script>

<style scoped></style>
