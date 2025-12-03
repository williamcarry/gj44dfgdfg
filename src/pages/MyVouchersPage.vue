<template>
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题栏 -->
    <div class="h-[50px] pt-[10px] relative flex items-center justify-between mb-6">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900">我的采购券</h6>
      <a target="_blank" href="https://www.saleyee.com/guide/hp319711.html" class="text-primary hover:underline">采购券使用说明&gt;</a>
    </div>

    <!-- 顶部标签 + 领取更多 -->
    <div class="relative mb-6">
      <div class="border-b border-slate-200">
        <div class="flex items-center gap-0 text-sm">
          <button
            :class="[
              'px-5 h-10 flex items-center cursor-pointer transition border-b-2',
              activeTab === 'unused'
                ? 'text-primary border-primary'
                : 'text-slate-700 border-transparent hover:text-slate-900'
            ]"
            @click="activeTab = 'unused'"
          >
            未使用
          </button>
          <button
            :class="[
              'px-5 h-10 flex items-center cursor-pointer transition border-b-2',
              activeTab === 'used'
                ? 'text-primary border-primary'
                : 'text-slate-700 border-transparent hover:text-slate-900'
            ]"
            @click="activeTab = 'used'"
          >
            已使用
          </button>
          <button
            :class="[
              'px-5 h-10 flex items-center cursor-pointer transition border-b-2',
              activeTab === 'expired'
                ? 'text-primary border-primary'
                : 'text-slate-700 border-transparent hover:text-slate-900'
            ]"
            @click="activeTab = 'expired'"
          >
            已过期
          </button>
        </div>
      </div>
      <a target="_blank" href="https://www.saleyee.com/get-started.html" class="absolute right-0 -top-2 h-10 leading-10 text-primary hover:underline">
        领取更多采购券 &gt;
      </a>
    </div>

    <!-- 排序条 -->
    <div class="bg-slate-100 h-10 leading-10 px-5 mb-5 flex items-center gap-4 text-sm">
      <span class="font-medium">排序：</span>
      <div class="flex items-center gap-2">
        <button
          :class="['px-2 transition', sort === 'new' ? 'text-primary font-medium' : 'text-slate-700 hover:text-slate-900']"
          @click="setSort('new')"
        >
          新到账
        </button>
        <button
          :class="['px-2 transition', sort === 'expiring' ? 'text-primary font-medium' : 'text-slate-700 hover:text-slate-900']"
          @click="setSort('expiring')"
        >
          即将过期
        </button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="grid grid-cols-2 gap-5 mb-6">
      <div v-for="c in pagedCoupons" :key="c.id" class="flex w-full border border-slate-200 rounded-lg overflow-hidden">
        <!-- 左侧金额票面 -->
        <div class="relative w-[200px] bg-[#fef1e8] flex flex-col items-center justify-center py-14 border-r border-dashed border-[rgba(203,38,38,0.2)]">
          <p class="text-[28px] font-extrabold text-primary leading-[38px]">{{ c.currency }} {{ c.amount.toFixed(2) }}</p>
          <span class="text-[13px] text-slate-700">满{{ c.currency }} {{ c.threshold.toFixed(2) }}可用</span>
          <em class="absolute left-0 top-0 bg-[#ffea9b] text-[#ff8000] text-[12px] leading-6 px-2">{{ c.tag }}</em>
          <div class="absolute right-[-1px] top-[-1px] w-[10px] h-[10px] bg-white rounded-b-[20px] border border-[#fef1e8] border-t-white border-r-white"></div>
          <div class="absolute right-[-1px] bottom-[-1px] w-[10px] h-[10px] bg-white rounded-tl-[20px] border border-[#fef1e8] border-b-white border-r-white"></div>
        </div>
        <!-- 右侧详情 -->
        <div class="relative flex-1 bg-[#fef1e8] p-5 flex flex-col justify-between">
          <ul class="mb-4 text-sm text-slate-700 space-y-1">
            <li class="flex leading-6"><em class="text-slate-500 mr-2">使用期限：</em>{{ c.validFrom }} - {{ c.validTo }}</li>
            <li class="flex leading-6"><em class="text-slate-500 mr-2">使用要求：</em><span class="cursor-pointer hover:underline">{{ c.scope }} &gt;</span></li>
            <li class="flex leading-6"><em class="text-slate-500 mr-2">采购券编号：</em>{{ c.code }}</li>
            <li class="flex leading-6"><em class="text-slate-500 mr-2">领取时间：</em>{{ c.receivedAt }}</li>
          </ul>
          <div>
            <button
              v-if="activeTab === 'unused'"
              class="inline-block bg-primary text-white h-10 leading-10 px-7 rounded hover:bg-red-700 transition"
            >
              立即使用
            </button>
          </div>
          <div class="absolute left-[-1px] top-[-1px] w-[10px] h-[10px] bg-white border border-[#fef1e8] border-t-white border-l-white rounded-br-[20px]"></div>
          <div class="absolute left-[-1px] bottom-[-1px] w-[10px] h-[10px] bg-white border border-[#fef1e8] border-b-white border-l-white rounded-tr-[20px]"></div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex items-center justify-between mt-6">
      <div class="text-sm text-slate-600">
        共 {{ filteredCoupons.length }} 条 | 第 {{ page }} 页
      </div>
      <div class="flex items-center gap-2">
        <!-- 上一页 -->
        <button
          @click="previousPage"
          :disabled="page === 1"
          class="px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          上一页
        </button>

        <!-- 页码 -->
        <div class="flex items-center gap-1">
          <button
            v-for="p in paginationRange"
            :key="p"
            @click="goToPage(p)"
            :disabled="p === '...'"
            :class="[
              'px-3 py-2 text-sm rounded transition',
              page === p
                ? 'bg-primary text-white border border-primary'
                : 'border border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed'
            ]"
          >
            {{ p }}
          </button>
        </div>

        <!-- 下一页 -->
        <button
          @click="nextPage"
          :disabled="page === totalPages"
          class="px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          下一页
        </button>

        <!-- 每页条数选择 -->
        <select
          @change="changePageSize"
          v-model.number="pageSize"
          class="px-3 py-2 text-sm border border-slate-300 rounded bg-white ml-4 hover:bg-slate-100 transition"
        >
          <option value="6">每页 6 条</option>
          <option value="12">每页 12 条</option>
          <option value="24">每页 24 条</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const activeTab = ref('unused')
const sort = ref('new')
const page = ref(1)
const pageSize = ref(6)

const coupons = ref(generateDemo())

const filteredCoupons = computed(() => {
  const list = coupons.value.filter(c => c.status === activeTab.value)
  if (sort.value === 'expiring') {
    return list.sort((a, b) => new Date(a.validTo).getTime() - new Date(b.validTo).getTime())
  }
  return list.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime())
})

const totalPages = computed(() => Math.ceil(filteredCoupons.value.length / pageSize.value))

const pagedCoupons = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredCoupons.value.slice(start, start + pageSize.value)
})

const paginationRange = computed(() => {
  const delta = 2
  const left = Math.max(1, page.value - delta)
  const right = Math.min(totalPages.value, page.value + delta)
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

function setSort(value) {
  sort.value = value
}

function previousPage() {
  if (page.value > 1) {
    page.value--
  }
}

function nextPage() {
  if (page.value < totalPages.value) {
    page.value++
  }
}

function goToPage(p) {
  if (typeof p === 'number') {
    page.value = p
  }
}

function changePageSize() {
  page.value = 1
}

function generateDemo() {
  const currencies = ['USD', 'GBP', 'EUR', 'CAD']
  const statuses = ['unused', 'used', 'expired']
  const coupons = []
  const now = new Date()

  for (let i = 0; i < 50; i++) {
    const currency = currencies[i % currencies.length]
    const status = statuses[i % statuses.length]
    const receivedAt = new Date(now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000)
    const validTo = new Date(receivedAt.getTime() + 90 * 24 * 60 * 60 * 1000)

    coupons.push({
      id: i + 1,
      currency,
      amount: Math.round((Math.random() * 100 + 10) * 100) / 100,
      threshold: Math.round((Math.random() * 50 + 50) * 100) / 100,
      tag: ['新用户', '限���活动', '节日优惠'][i % 3],
      validFrom: receivedAt.toISOString().split('T')[0],
      validTo: validTo.toISOString().split('T')[0],
      scope: ['全场商品', '指定分类'][i % 2],
      code: `COUPON${String(1000000 + i)}`,
      receivedAt: receivedAt.toISOString().split('T')[0],
      status,
    })
  }

  return coupons
}
</script>

<style scoped></style>
