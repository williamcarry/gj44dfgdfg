<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (���入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div>
    <!-- 详情页面 -->
    <ProductNotificationDetailPage
      v-if="selectedNotificationId !== null"
      :notification-id="selectedNotificationId"
      @back="selectedNotificationId = null"
    />

    <!-- 通知列表 -->
    <div v-else class="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <ul class="divide-y divide-slate-200">
        <li v-for="notification in paginatedNotifications" :key="notification.id" class="p-5 hover:bg-slate-50 transition">
          <div class="flex gap-4">
            <div class="flex-1">
              <div class="flex items-start gap-3 mb-2">
                <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div class="flex-1">
                  <h3
                    @click="selectedNotificationId = notification.id"
                    class="text-base font-semibold text-slate-900 hover:text-primary transition cursor-pointer"
                  >
                    {{ notification.title }}
                  </h3>
                </div>
              </div>
              <p class="text-sm text-slate-600 line-clamp-2 mb-3 ml-5">
                {{ notification.content }}
              </p>
              <div class="flex items-center justify-between ml-5">
                <span class="text-xs text-slate-500">{{ formatDate(notification.date) }}</span>
                <button
                  @click="selectedNotificationId = notification.id"
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
          共 {{ totalNotifications }} 条 | 第 {{ currentPage }} 页
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
import ProductNotificationDetailPage from '@/pages/ProductNotificationDetailPage.vue'

const selectedNotificationId = ref(null)

const currentPage = ref(1)
const pageSize = ref(5)

const notifications = [
  {
    id: 101,
    title: '关于部分商品库存调整的通知',
    content: '尊敬的分销商：您好！因供应商库存调整，部分热销商品的库存数量将在近期进行更新。请及时关注商品库存变化，合理安排您的销售计划。如有疑问，请联系您的专属客户经理。',
    date: new Date('2025-10-18')
  },
  {
    id: 102,
    title: '新品上架通知 - 2025秋季家居系列',
    content: '尊敬的分销商：您好！平台已上架2025秋季家居装饰系列新品，包括北欧风格装饰画、现代简约花架、创意壁挂等多款热门商品。欢迎登录平台查看详情并进行选品。',
    date: new Date('2025-10-15')
  },
  {
    id: 103,
    title: '商品价格调整通知 - 部分SKU降价促销',
    content: '尊敬的分销商：为回馈广大分销商的支持，平台将对部分SKU进行降价促销。本次降价涉及家居装饰、厨房用品等多个品类，降幅最高达15%。请���时更新您的销售价格以获取更多订单。',
    date: new Date('2025-10-12')
  },
  {
    id: 104,
    title: '关于US仓部分商品发货时效优化的通知',
    content: '尊敬的分销商：您好！经过我们与物流合作伙伴的协商，US仓部分商品的发货时效将得到进一步优化。预计发货时间将缩短1-2个工作日，有助于提升您的客��满意度。',
    date: new Date('2025-10-08')
  },
  {
    id: 105,
    title: '新增商品分类 - 户外园艺系列',
    content: '尊敬的分销商：您好！平台新增户外园艺系列商品分类，包括花盆、园艺工具、户外装饰等���款产品。随着春季的到来，该系列商品将迎来销售旺季，欢迎提前选品备货。',
    date: new Date('2025-10-05')
  },
  {
    id: 106,
    title: '商品图片更新通知',
    content: '尊敬的分销商：您好！为提升商品展示效果，平台已对部分商品的主图和详情图进行了更新。新图片更加清晰美观，有助于提高转化率。请及时下载最新的商品数据包。',
    date: new Date('2025-10-01')
  },
  {
    id: 107,
    title: '热销商品推荐 - 秋季爆款清单',
    content: '尊敬的分销商：您好！平台根据近期销售数据，为您整理了秋季热销商品清单��这些商品在市场上表现优异，建议您重点关注并加大推���力度。详情请登录平台查看。',
    date: new Date('2025-09-28')
  },
  {
    id: 108,
    title: '关于部分商品���装升级的通知',
    content: '尊敬的分销商：您好！为提升客户体验，部分商品的包装将进行升级。新包装更加精美牢固，有助于降低���输过程中的破损率。升级后的商品将陆续发货，敬请关注。',
    date: new Date('2025-09-25')
  },
  {
    id: 109,
    title: '商品质检标准更新通知',
    content: '尊敬的分销商：您好！为进一步保证商品质量，平台已更新商品质检标准。新标准将更加严格，确保您收到的每一件商品都符合高质量要求。感谢您对平台的信任与支持。',
    date: new Date('2025-09-20')
  },
  {
    id: 110,
    title: '关于UK仓新增商品的通知',
    content: '尊敬的分销商：您好！UK仓已新增多款热销商品，涵盖家居装饰、厨房用品、园艺工具等多个品类。欢迎UK市场的分销商登录平台查看并选购。',
    date: new Date('2025-09-15')
  }
]

const totalNotifications = computed(() => notifications.length)
const totalPages = computed(() => Math.ceil(totalNotifications.value / pageSize.value))

const paginatedNotifications = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return notifications.slice(start, end)
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
