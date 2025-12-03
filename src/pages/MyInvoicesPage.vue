<template>
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题 -->
    <div class="h-[50px] pt-[10px] relative mb-6">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900 float-left">我的账单</h6>
    </div>

    <!-- 提示条 -->
    <div class="bg-[#fcf8e3] border border-[#faebcc] rounded mt-3 p-3 flex items-start mb-6">
      <span class="text-[#a77200] leading-6 mr-2 flex-shrink-0">!</span>
      <p class="text-[#a77200] leading-6 text-sm">我的账单仅显示您使用第三方支付产生的"充值、提现、消费"记录，余额账户的交易记录请到"我的余额"模块查看；</p>
    </div>

    <!-- 筛选条件：两列布局 -->
    <div class="mb-6">
      <div class="space-y-4">
        <!-- 第一行 -->
        <div class="flex gap-4 flex-wrap">
          <!-- SaleYee单号 -->
          <div class="flex-1 min-w-64">
            <label class="block text-xs text-slate-600 font-medium mb-1">SaleYee单号</label>
            <input
              v-model.trim="filters.orderNo"
              type="text"
              placeholder="请输入单号"
              class="w-full h-10 border border-slate-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <!-- 交易类型 -->
          <div class="flex-1 min-w-64">
            <label class="block text-xs text-slate-600 font-medium mb-1">交易类型</label>
            <select
              v-model="filters.dealType"
              class="w-full h-10 border border-slate-300 rounded px-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">全部</option>
              <option value="充值">充值</option>
              <option value="消费">消费</option>
              <option value="提现">提现</option>
            </select>
          </div>
        </div>

        <!-- 第二行 -->
        <div class="flex gap-4 flex-wrap">
          <!-- 交易时间 -->
          <div class="flex-1 min-w-80">
            <label class="block text-xs text-slate-600 font-medium mb-1">交易时间</label>
            <div class="flex items-center gap-2">
              <input
                v-model="filters.startDate"
                type="date"
                class="flex-1 h-10 border border-slate-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <span class="text-slate-400">-</span>
              <input
                v-model="filters.endDate"
                type="date"
                class="flex-1 h-10 border border-slate-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <!-- 币别 -->
          <div class="flex-1 min-w-64">
            <label class="block text-xs text-slate-600 font-medium mb-1">币别</label>
            <select
              v-model="filters.currency"
              class="w-full h-10 border border-slate-300 rounded px-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">全部</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
            </select>
          </div>
        </div>

        <!-- 搜索按钮 -->
        <div class="text-center mt-4">
          <button
            type="button"
            @click="onSearch"
            class="px-8 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
          >
            搜索
          </button>
        </div>
      </div>
    </div>

    <!-- 表格 -->
    <div class="overflow-x-auto border border-slate-200 rounded-lg">
      <table class="w-full border-collapse bg-white">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="th">
              <input
                type="checkbox"
                class="w-4 h-4 accent-primary rounded"
                :checked="isAllChecked"
                @change="toggleAll"
              />
            </th>
            <th class="th">SaleYee单号</th>
            <th class="th">原支付交易号</th>
            <th class="th">金额</th>
            <th class="th">手续费</th>
            <th class="th">币别</th>
            <th class="th">交易类型</th>
            <th class="th">交易方式</th>
            <th class="th">交易账户</th>
            <th class="th">交易时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pagedRows.length === 0">
            <td :colspan="10" class="text-center text-slate-500 py-8 text-sm">
              没有找到数据，您可以更换搜索条件
            </td>
          </tr>
          <tr v-for="r in pagedRows" :key="r.id" class="border-b border-slate-200 hover:bg-slate-50">
            <td class="td">
              <input
                type="checkbox"
                class="w-4 h-4 accent-primary rounded"
                v-model="r.selected"
              />
            </td>
            <td class="td">{{ r.orderNo }}</td>
            <td class="td">{{ r.payTradeNo }}</td>
            <td class="td">{{ r.amount.toFixed(2) }}</td>
            <td class="td">{{ r.fee.toFixed(2) }}</td>
            <td class="td">{{ r.currency }}</td>
            <td class="td">{{ r.dealType }}</td>
            <td class="td">{{ r.method }}</td>
            <td class="td">{{ r.account }}</td>
            <td class="td">{{ r.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页控件 -->
    <div class="mt-6 flex items-center justify-between">
      <div class="text-sm text-slate-600">
        共 {{ filteredRows.length }} 条 | 第 {{ currentPage }} 页
      </div>
      <div class="flex items-center gap-2">
        <!-- 上一页 -->
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          上一页
        </button>

        <!-- 页码 -->
        <div class="flex items-center gap-1">
          <button
            v-for="page in paginationRange"
            :key="page"
            @click="goToPage(page)"
            :disabled="page === '...'"
            :class="[
              'px-3 py-2 text-sm rounded transition',
              currentPage === page
                ? 'bg-primary text-white border border-primary'
                : 'border border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <!-- 下一页 -->
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          下一页
        </button>

        <!-- 页码大小选择 -->
        <select
          @change="changePageSize"
          v-model.number="pageSize"
          class="px-3 py-2 text-sm border border-slate-300 rounded bg-white hover:bg-slate-100 transition ml-4"
        >
          <option value="10">每页 10 条</option>
          <option value="20">每页 20 条</option>
          <option value="50">每页 50 条</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const allRows = ref(generateDemoRows())

const filters = reactive({
  orderNo: '',
  dealType: '',
  startDate: '',
  endDate: '',
  currency: '',
})

const currentPage = ref(1)
const pageSize = ref(10)

const filteredRows = computed(() => {
  const start = filters.startDate ? new Date(filters.startDate).getTime() : -Infinity
  const end = filters.endDate ? new Date(filters.endDate).getTime() + 24*60*60*1000 - 1 : Infinity
  const orderNo = filters.orderNo.trim().toLowerCase()
  return allRows.value.filter(r =>
    (!orderNo || r.orderNo.toLowerCase().includes(orderNo)) &&
    (!filters.dealType || r.dealType === filters.dealType) &&
    (!filters.currency || r.currency === filters.currency) &&
    (new Date(r.time).getTime() >= start && new Date(r.time).getTime() <= end)
  )
})

const totalPages = computed(() => Math.ceil(filteredRows.value.length / pageSize.value))

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
})

const isAllChecked = computed(() => pagedRows.value.length > 0 && pagedRows.value.every(r => r.selected))

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

function toggleAll(e) {
  const checked = e.target.checked
  pagedRows.value.forEach(r => (r.selected = checked))
}

function onSearch() {
  currentPage.value = 1
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}

function changePageSize() {
  currentPage.value = 1
}

function generateDemoRows() {
  const currencies = ['USD','GBP','EUR','CAD']
  const types = ['充值','消费','提现']
  const methods = ['Payoneer','Airwallex','Bank','Paypal']
  const rows = []
  const now = new Date()
  for (let i=0;i<53;i++) {
    const d = new Date(now.getTime() - i*86400000)
    const currency = currencies[i % currencies.length]
    const dealType = types[i % types.length]
    const amount = Math.round((Math.random()*500+10)*100)/100
    const fee = Math.round((amount*0.01)*100)/100
    rows.push({
      id: i+1,
      selected: false,
      orderNo: `SY${String(100000+i)}`,
      payTradeNo: `PT${String(900000+i)}`,
      amount,
      fee,
      currency,
      dealType,
      method: methods[i % methods.length],
      account: `${currency}-ACC-${(i%7)+1}`,
      time: `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} 0${i%9}:1${i%6}:2${i%6}`,
    })
  }
  return rows
}
</script>

<style scoped>
.th {
  @apply border border-slate-300 px-4 py-3 text-sm text-center align-middle font-medium text-slate-700;
}

.td {
  @apply border border-slate-300 px-4 py-3 text-sm text-left;
}
</style>
