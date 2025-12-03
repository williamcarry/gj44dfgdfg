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
    <!-- 详情页面 -->
    <OrderNotificationDetailPage
      v-if="selectedNotificationId !== null"
      :notification-id="selectedNotificationId"
      @back="selectedNotificationId = null"
    />

    <!-- 列表页面 -->
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
            下一页
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
import OrderNotificationDetailPage from '@/pages/OrderNotificationDetailPage.vue'

const currentPage = ref(1)
const pageSize = ref(5)
const selectedNotificationId = ref(null)

const notifications = [
  {
    id: 1,
    title: '订单已发货，物流信息已更新',
    content: '您的订单（订单号：2025101001）已发货，物流编号为FEDEX123456，预计3-5个工作日送达。请及时关注物流动态。',
    date: new Date('2025-10-15')
  },
  {
    id: 2,
    title: '订单确认成功',
    content: '您的订单（订单号：2025101002）已确认，供应商将在24小时内安排发货。感谢您的购买！',
    date: new Date('2025-10-14')
  },
  {
    id: 3,
    title: '订单待发货提醒',
    content: '您有1个待发货订单，订单号为2025101003，请及时完成发货以保证订单及时送达。',
    date: new Date('2025-10-13')
  },
  {
    id: 4,
    title: '订单已签收',
    content: '您的订单（订单号：2025101004）已被客户签收，感谢您的信任。如有任何问题，请及时联系我们。',
    date: new Date('2025-10-12')
  },
  {
    id: 5,
    title: '订单已取消',
    content: '您的订单（订单号：2025101005）已被取消，退款将在3-5个工作日内原路返回。',
    date: new Date('2025-10-11')
  },
  {
    id: 6,
    title: '订单配送���',
    content: '您的订单（订单号：2025101006）正在配送中，预计今��送达。请保持电话畅通。',
    date: new Date('2025-10-10')
  },
  {
    id: 7,
    title: '订单即将发货',
    content: '您的订单（订单号：2025101007）已备货完成，即将��货，请耐心等待。',
    date: new Date('2025-10-09')
  },
  {
    id: 8,
    title: '订单异常提醒',
    content: '您的订单（订单号：2025101008）配送过程中出现异常，物流商正在处理，请稍候。',
    date: new Date('2025-10-08')
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
