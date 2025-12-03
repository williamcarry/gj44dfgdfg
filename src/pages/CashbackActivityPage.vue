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
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <!-- 标题 -->
    <div class="flex items-center justify-between p-6 border-b border-slate-200">
      <h2 class="text-xl font-bold text-slate-900">返现活动</h2>
    </div>

    <!-- 筛选条件区域 -->
    <div class="p-6 border-b border-slate-200">
      <div class="flex flex-wrap gap-4 mb-4">
        <!-- 活动编码下拉框 -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-slate-700 whitespace-nowrap">活动编码</label>
          <select
            v-model="filters.activityCode"
            class="min-w-[180px] px-3 py-2 border border-slate-300 rounded outline-none hover:border-slate-400 focus:border-primary transition"
          >
            <option value="">全部</option>
            <option value="PT250212142657596050">PT250212142657596050</option>
            <option value="PT241030165443954033">PT241030165443954033</option>
            <option value="PT241030164726348784">PT241030164726348784</option>
            <option value="PT241012103025490865">PT241012103025490865</option>
          </select>
        </div>

        <!-- 活动状态下拉框 -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-slate-700 whitespace-nowrap">活动状态：</label>
          <select
            v-model="filters.activityStatus"
            class="min-w-[180px] px-3 py-2 border border-slate-300 rounded outline-none hover:border-slate-400 focus:border-primary transition"
          >
            <option value="">全部</option>
            <option value="active">进行中</option>
            <option value="ended">已结束</option>
            <option value="pending">未开始</option>
          </select>
        </div>

        <!-- 活动时间 -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-slate-700 whitespace-nowrap">活动时间：</label>
          <input
            v-model="filters.startDate"
            type="text"
            placeholder="开始日期"
            class="w-[160px] px-3 py-2 border border-slate-300 rounded outline-none hover:border-slate-400 focus:border-primary transition"
          />
          <span class="text-slate-500">-</span>
          <input
            v-model="filters.endDate"
            type="text"
            placeholder="结束日期"
            class="w-[160px] px-3 py-2 border border-slate-300 rounded outline-none hover:border-slate-400 focus:border-primary transition"
          />
        </div>

        <!-- 搜索按钮 -->
        <button
          @click="handleSearch"
          class="px-6 py-2 bg-primary text-white rounded hover:bg-red-700 transition font-medium"
        >
          搜索
        </button>
      </div>

      <!-- 已选择和导出按钮行 -->
      <div class="flex items-center gap-4">
        <div class="text-sm text-slate-600">
          已选 <span class="text-primary font-semibold">{{ selectedCount }}</span> 项
        </div>
        <button
          @click="handleExport"
          class="px-4 py-2 border border-slate-300 rounded hover:bg-slate-50 transition text-sm flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          导出
        </button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-4 py-3 text-left">
              <input
                v-model="selectAll"
                type="checkbox"
                @change="toggleSelectAll"
                class="w-4 h-4 text-primary rounded"
              />
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 whitespace-nowrap">活动编码</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 whitespace-nowrap">活动���称</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 whitespace-nowrap">活动销售额</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 whitespace-nowrap">活动状态</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 whitespace-nowrap">预计返现金额</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 whitespace-nowrap">活动开始时间</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-slate-700 whitespace-nowrap">活动结束时间</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-slate-700 whitespace-nowrap">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr
            v-for="activity in paginatedActivities"
            :key="activity.id"
            class="hover:bg-slate-50 transition"
          >
            <td class="px-4 py-3">
              <input
                v-model="activity.selected"
                type="checkbox"
                class="w-4 h-4 text-primary rounded"
              />
            </td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ activity.code }}</td>
            <td class="px-4 py-3 text-sm text-slate-900">{{ activity.name }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ activity.sales }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded',
                  activity.status === '已���束'
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-green-100 text-green-700'
                ]"
              >
                {{ activity.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ activity.cashback }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ activity.startTime }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ activity.endTime }}</td>
            <td class="px-4 py-3 text-center">
              <div class="flex flex-col items-center gap-1">
                <button
                  @click="handleJoinActivity(activity)"
                  class="px-4 py-1.5 bg-primary text-white text-sm rounded hover:bg-red-700 transition whitespace-nowrap"
                >
                  参加活动
                </button>
                <button
                  @click="handleViewDetail(activity)"
                  class="text-primary text-sm hover:text-red-700 transition whitespace-nowrap underline"
                >
                  查看
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
          <span>共{{ totalPages }}页，前往第</span>
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
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const pageSize = ref(20)
const jumpPage = ref(null)
const selectAll = ref(false)

const filters = ref({
  activityCode: '',
  activityStatus: '',
  startDate: '',
  endDate: ''
})

const activities = ref([
  {
    id: 1,
    code: 'PT250212142657596050',
    name: '2025年抽屉柜品类活动专场返利',
    sales: 'USD 0.00',
    status: '已结束',
    cashback: 'USD 0.00',
    startTime: '2025/2/17 0:00:00',
    endTime: '2025/3/17 0:00:00',
    selected: false
  },
  {
    id: 2,
    code: 'PT241030165443954033',
    name: '2024黑五-感恩节礼品专场返现返现活动',
    sales: 'USD 0.00',
    status: '已结束',
    cashback: 'USD 0.00',
    startTime: '2024/11/1 1:00:00',
    endTime: '2024/11/30 23:59:00',
    selected: false
  },
  {
    id: 3,
    code: 'PT241030164726348784',
    name: '2024黑五-全品类底价专场阶梯返现活动',
    sales: 'USD 0.00',
    status: '已结束',
    cashback: 'USD 0.00',
    startTime: '2024/11/1 1:00:00',
    endTime: '2024/11/30 23:59:00',
    selected: false
  },
  {
    id: 4,
    code: 'PT241012103025490865',
    name: '2024年���诞储备季',
    sales: 'USD 0.00',
    status: '已结束',
    cashback: 'USD 0.00',
    startTime: '2024/10/14 0:00:00',
    endTime: '2024/11/14 23:59:00',
    selected: false
  }
])

const totalActivities = computed(() => activities.value.length)
const totalPages = computed(() => Math.ceil(totalActivities.value / parseInt(pageSize.value.toString())))
const selectedCount = computed(() => activities.value.filter(a => a.selected).length)

const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * parseInt(pageSize.value.toString())
  const end = start + parseInt(pageSize.value.toString())
  return activities.value.slice(start, end)
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

const toggleSelectAll = () => {
  paginatedActivities.value.forEach(activity => {
    activity.selected = selectAll.value
  })
}

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

const handleSearch = () => {
  console.log('搜索条件:', filters.value)
  // TODO: 实现搜索��辑
}

const handleExport = () => {
  const selectedItems = activities.value.filter(a => a.selected)
  console.log('导出选中项:', selectedItems)
  // TODO: ��现导出逻辑
}

const handleJoinActivity = (activity) => {
  console.log('参加活动:', activity)
}

const handleViewDetail = (activity) => {
  console.log('查看详情:', activity)
}
</script>

<style scoped></style>
