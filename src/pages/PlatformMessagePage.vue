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
    <PlatformMessageDetailPage
      v-if="selectedMessageId !== null"
      :message-id="selectedMessageId"
      @back="selectedMessageId = null"
    />

    <!-- 列表页面 -->
    <div v-else class="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <ul class="divide-y divide-slate-200">
        <li v-for="message in paginatedMessages" :key="message.id" class="p-5 hover:bg-slate-50 transition">
          <div class="flex gap-4">
            <div class="flex-1">
              <div class="flex items-start gap-3 mb-2">
                <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div class="flex-1">
                  <h3
                    @click="selectedMessageId = message.id"
                    class="text-base font-semibold text-slate-900 hover:text-primary transition cursor-pointer"
                  >
                    {{ message.title }}
                  </h3>
                </div>
              </div>
              <p class="text-sm text-slate-600 line-clamp-2 mb-3 ml-5">
                {{ message.content }}
              </p>
              <div class="flex items-center justify-between ml-5">
                <span class="text-xs text-slate-500">{{ formatDate(message.date) }}</span>
                <button
                  @click="selectedMessageId = message.id"
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
          共 {{ totalMessages }} 条 | 第 {{ currentPage }} 页
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
import PlatformMessageDetailPage from '@/pages/PlatformMessageDetailPage.vue'

const currentPage = ref(1)
const pageSize = ref(5)
const selectedMessageId = ref(null)

const messages = [
  {
    id: 1,
    title: '平台系统维护通知',
    content: '尊敬的分销商，平台将于2025年10月20日进行系统维护，维护期间平台将无法正常访问，预计维护时间为2小时，感谢您的理解和支持。',
    date: new Date('2025-10-15')
  },
  {
    id: 2,
    title: '新功能上线公告',
    content: '我们荣幸地为您推出全新的功能模块——订单智能推荐系统，该系统将根据您的销售数据为您推荐热销商品，帮助您提高经营效率。',
    date: new Date('2025-10-14')
  },
  {
    id: 3,
    title: '平台规则更新说明',
    content: '为进一步规范平台秩序，提升用户体验，我们对平台的部分规则进行��更新，详情请查看平台帮助中心。',
    date: new Date('2025-10-13')
  },
  {
    id: 4,
    title: '安全提示：账号保护',
    content: '为保护您的账户安全，我们建议您定期修改密码，启用双因素认证，避免在公共网络上登录账户。',
    date: new Date('2025-10-12')
  },
  {
    id: 5,
    title: '平台数据报告发布',
    content: '2025年9月平台数据报告已发布，展示了各品类的销售趋势和市场动态，欢迎查阅。',
    date: new Date('2025-10-11')
  },
  {
    id: 6,
    title: '客户满意度调查',
    content: '为了更好地了解您的需求和建议，我们发起了客户满意度调查，欢迎参与，您的意见对我们很重要。',
    date: new Date('2025-10-10')
  },
  {
    id: 7,
    title: '平台培训课程上线',
    content: '我们为您推出了一系列免费的线上培训课程，包括选品技巧、运营策略等，欢迎报名学习。',
    date: new Date('2025-10-09')
  },
  {
    id: 8,
    title: '社区论坛功能介绍',
    content: '我们建立了分销商交流社区，您可以在这里分享经验、解答疑问、交流心得，欢迎加入。',
    date: new Date('2025-10-08')
  },
  {
    id: 9,
    title: '合规经营提醒',
    content: '为确保��台的健康发展，我们提醒所有分销商遵守相关法律法规��诚信经营，共同维护平台秩序。',
    date: new Date('2025-10-07')
  },
  {
    id: 10,
    title: '平台生态建设',
    content: '我们致力于建设一个开放、透明、诚信的分销生态，欢迎各位伙伴积极参与，为平台发展贡献力量。',
    date: new Date('2025-10-06')
  }
]

const totalMessages = computed(() => messages.length)
const totalPages = computed(() => Math.ceil(totalMessages.value / pageSize.value))

const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return messages.slice(start, end)
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
