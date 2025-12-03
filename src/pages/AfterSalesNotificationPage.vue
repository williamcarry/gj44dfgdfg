<template>
  <div>
    <!-- 详情页面 -->
    <AfterSalesNotificationDetailPage
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
import AfterSalesNotificationDetailPage from '@/pages/AfterSalesNotificationDetailPage.vue'

const currentPage = ref(1)
const pageSize = ref(5)
const selectedNotificationId = ref(null)

const notifications = [
  {
    id: 1,
    title: '退货申请已受理',
    content: '您的退货申请（申请号：RS2025101001）已受理，请按照退货须知在7天内寄回商品。我们会在收到商品后进行质检。',
    date: new Date('2025-10-15')
  },
  {
    id: 2,
    title: '退货商品已签收',
    content: '我们已签收您的退货商品（申请号：RS2025101002），正在进行质检，预计3个工作日内完成。',
    date: new Date('2025-10-14')
  },
  {
    id: 3,
    title: '退款已处理',
    content: '您的退款（申请号：RS2025101003）已处理，金额为$500.00，将在3-5个工作日内返回到您的账户。',
    date: new Date('2025-10-13')
  },
  {
    id: 4,
    title: '售后服务提醒',
    content: '您有一个待处理的售后问题（申请号：AF2025101004），请及时与我们的客服团队联系以获得帮助。',
    date: new Date('2025-10-12')
  },
  {
    id: 5,
    title: '换货申请已批准',
    content: '您的换货申请（申请号：EX2025101005）已批准，新产品将在2个工作日内发货，请保持电话畅通。',
    date: new Date('2025-10-11')
  },
  {
    id: 6,
    title: '售后服务完成',
    content: '您的售后服务（申请号：AF2025101006）已完成，感谢您的耐心配合。如有任何反馈，欢迎随时联系我们。',
    date: new Date('2025-10-10')
  },
  {
    id: 7,
    title: '发起维修申请',
    content: '您的维修申请（申请号：RE2025101007）已提交，我们的技术团队将在24小时内与您联系以安排上门服务。',
    date: new Date('2025-10-09')
  },
  {
    id: 8,
    title: '售后物流已发货',
    content: '您的售后物流（申请号：AF2025101008）已发货，物流单号为SF123456，预计2个工作日送达。',
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