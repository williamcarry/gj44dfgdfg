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
    <!-- 详情页 -->
    <MarketingActivityDetailPage
      v-if="selectedActivityId !== null"
      :activity-id="selectedActivityId"
      @back="selectedActivityId = null"
    />

    <!-- 列表页 -->
    <div v-else class="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <!-- 标题和按钮 -->
      <div class="flex items-center justify-between p-6 border-b border-slate-200">
        <h2 class="text-xl font-bold text-slate-900">营销活动</h2>
        <button class="px-4 py-2 border border-primary text-primary rounded hover:bg-slate-50 transition font-medium text-sm">
          通知管理
        </button>
      </div>

      <!-- 搜索和筛选区域 -->
      <div class="p-6 border-b border-slate-200 space-y-4">
        <!-- 搜索框 -->
        <div class="flex gap-3 items-center">
          <div class="flex-1 flex items-center border border-slate-200 rounded overflow-hidden">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="输入站内信标题/内��关键词搜索"
              class="flex-1 px-4 py-2 outline-none"
            />
            <button class="px-4 py-2 bg-slate-100 hover:bg-slate-200 transition">
              <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 筛选��项 -->
        <div class="flex gap-4 flex-wrap">
          <!-- 消息类型 -->
          <div class="min-w-[220px]">
            <select
              v-model="selectedMessageType"
              class="w-full px-3 py-2 border border-slate-200 rounded outline-none"
            >
              <option value="0">全部消息类型</option>
              <option value="8">活动通知</option>
              <option value="13">采购券通知</option>
              <option value="18">商品促销通知</option>
            </select>
          </div>

          <!-- 阅读状态 -->
          <div class="min-w-[220px]">
            <select
              v-model="selectedReadType"
              class="w-full px-3 py-2 border border-slate-200 rounded outline-none"
            >
              <option value="0">全部消息</option>
              <option value="1">未读消息(3)</option>
              <option value="2">已读消息</option>
              <option value="3">历史消息</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 通知列表 -->
      <div class="divide-y divide-slate-200">
        <div
          v-for="activity in paginatedActivities"
          :key="activity.id"
          class="p-5 hover:bg-slate-50 transition"
        >
          <div class="flex gap-4">
            <div class="flex items-start pt-2">
              <input type="checkbox" class="w-4 h-4 text-primary rounded" />
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <span class="inline-block w-2 h-2 bg-primary rounded-full"></span>
                <button
                  @click="selectedActivityId = activity.id"
                  class="hover:text-primary transition cursor-pointer"
                >
                  {{ activity.title }}
                </button>
                <span class="text-xs text-slate-500 ml-auto">{{ activity.date }}</span>
              </h3>
              <p class="text-sm text-slate-600 line-clamp-2 mb-3">{{ activity.content }}</p>
              <div class="flex items-center gap-4 text-xs">
                <span v-if="activity.attachment" class="text-slate-600">
                  附件下载：
                  <a href="#" class="text-primary hover:text-primary">{{ activity.attachment }}</a>
                </span>
                <button
                  @click="selectedActivityId = activity.id"
                  class="text-primary hover:text-primary font-medium"
                >
                  查看详情 >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
        <div class="text-sm text-slate-600">
          共 {{ totalActivities }} 条 | 第 {{ currentPage }} 页
        </div>
        <div class="flex items-center gap-4">
          <!-- 每页条数选择 -->
          <div class="flex items-center gap-2 text-sm">
            <span>每页</span>
            <select
              v-model="pageSize"
              class="px-2 py-1 border border-slate-200 rounded outline-none"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>条</span>
          </div>

          <!-- 分页按钮 -->
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

          <!-- 快速跳转 -->
          <div class="flex items-center gap-1 text-sm">
            <span>共{{ totalPages }}页��前往第</span>
            <input
              v-model.number="jumpPage"
              type="text"
              class="w-10 px-2 py-1 border border-slate-200 rounded outline-none text-center"
            />
            <span>页</span>
            <button
              @click="goToJumpPage"
              class="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 transition"
            >
              GO
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MarketingActivityDetailPage from '@/pages/MarketingActivityDetailPage.vue'

const currentPage = ref(1)
const pageSize = ref(20)
const searchKeyword = ref('')
const selectedMessageType = ref('0')
const selectedReadType = ref('0')
const jumpPage = ref(null)
const selectedActivityId = ref(null)

const activities = [
  {
    id: 1,
    title: '圣诞早鸟专场启动：热度来袭，赢战Q4旺季！',
    content: '尊敬的赛盈分销商伙伴，圣诞季的钟声即将敲响，全年最大的销售机遇近在眼前！为助您抢占先机，我们正式启动圣诞早鸟专场促销，立即布局圣诞热销商品，提前锁定节日消费需求！活动时间： 2025年10月13日-11月13日',
    date: '2025/10/10 15:24:25',
    attachment: '圣诞早鸟专场-产品表'
  },
  {
    id: 2,
    title: '【Q4丰收季】 主题活动来袭！精准选品，吹响旺季的号角！',
    content: '尊敬的赛盈分销商伙伴，您好！��境旺季的号角即将吹响，为助您精准备货、抢占Q4全年销售峰值，平台重磅启动【Q4丰收季】 主题促销活动，现诚挚邀请您参与！活动时间：2025年10月1日-10月31日',
    date: '2025/9/29 14:22:42',
    attachment: 'Q4必选清单专场(丰收节特惠)--产品表'
  },
  {
    id: 3,
    title: '采购券到账通知',
    content: '尊敬的赛盈用户您好：您有 1 张【USD1.00】采购券已到账，有效期到2025/11/26。请查收！采购券编号：CND2509282050360793307',
    date: '2025/9/28 20:52:14'
  },
  {
    id: 4,
    title: '新品上市：2025秋季热销商品推介会',
    content: '尊敬的分销商伙伴，秋季商品已上市，为您精心挑选了本季度最受欢迎的热销商品，现推介给各位伙伴。快来查看并选购吧！',
    date: '2025/9/25 10:30:00',
    attachment: '2025秋季新品清单'
  },
  {
    id: 5,
    title: '平台大促活动即将开启',
    content: '尊敬的合作伙伴，我们荣幸宣布，平台将于近期启动大型促销活动，提供优质的采购价格和丰厚的利润空间。敬请关注！',
    date: '2025/9/20 14:15:30'
  },
  {
    id: 6,
    title: '限时折扣活动通知',
    content: '亲爱的分销商，本周特推限时折扣活动，部分热销���品享受高达30%的价格优惠，机会难得，欢迎参与！',
    date: '2025/9/18 09:45:20'
  },
  {
    id: 7,
    title: '采购费用优惠券发放',
    content: '各位用户的采购券已发放到账，请及时查收！使用采购券可以降低采购成本，提升利润空间。',
    date: '2025/9/15 16:20:00'
  },
  {
    id: 8,
    title: '节�����惠商品推荐',
    content: '中秋国庆双节临近，我们精心为您准备了节日特惠商品。快来浏览，为您的店铺补充热销商品！',
    date: '2025/9/10 11:30:45'
  },
  {
    id: 9,
    title: '积分兑换���动上线',
    content: '我们推出了全新的积分兑换活动，您的账户积分可以兑换采购优惠，立即参与！',
    date: '2025/9/08 13:00:00'
  },
  {
    id: 10,
    title: '物流服务升级通知',
    content: '平台已升级物流服务，提供更快的发货时效和更优的物流费用。详情请查看通知。',
    date: '2025/9/05 15:45:30'
  },
  {
    id: 11,
    title: '秋季采购指南发布',
    content: '为帮助各位分销商精准备货，我们发布了2025秋季采购指南，包含热销品类分析和采购建议。',
    date: '2025/9/01 10:20:00'
  },
  {
    id: 12,
    title: '会员等级升级福利',
    content: '��谢您的长期支持！您的账户等级已升级，享受更多专属福利和优惠政策。',
    date: '2025/8/28 14:30:15'
  },
  {
    id: 13,
    title: '平台数据报告分享',
    content: '2025年8月数据报告已发布，详细分析了各品类销售趋势和消费者偏好，敬请查阅。',
    date: '2025/8/25 09:15:45'
  },
  {
    id: 14,
    title: '供��商合作机制更新',
    content: '我们完善了供应商合作机制，为各位分销商提供更便利的货源渠道和支持。',
    date: '2025/8/20 16:40:20'
  },
  {
    id: 15,
    title: '品牌认证商品上线',
    content: '我们新增了多个国际品牌的正品认证商品，质量有保障，欢迎采购！',
    date: '2025/8/15 11:25:00'
  }
]

const totalActivities = computed(() => activities.length)
const totalPages = computed(() => Math.ceil(totalActivities.value / parseInt(pageSize.value)))

const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * parseInt(pageSize.value)
  const end = start + parseInt(pageSize.value)
  return activities.slice(start, end)
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

const goToJumpPage = () => {
  if (jumpPage.value && jumpPage.value > 0 && jumpPage.value <= totalPages.value) {
    currentPage.value = jumpPage.value
    jumpPage.value = null
  }
}
</script>

<style scoped></style>
