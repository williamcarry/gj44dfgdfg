<template>
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题 -->
    <div class="h-[50px] pt-[10px] relative mb-6">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900">支付账号管理</h6>
    </div>

    <!-- 提示条 -->
    <div class="bg-[#fcf8e3] border border-[#faebcc] rounded mt-3 p-3 flex items-start mb-6">
      <span class="text-[#a77200] leading-6 mr-2 flex-shrink-0">!</span>
      <p class="text-[#a77200] leading-6 text-sm">Payoneer账号最多可添加5个，您可先删除不用账号，待客户经理审核通过后，再添加新账号；绑定账号请填写您的支付账户（邮箱/手机号）；空中云汇不支持授权绑定账号。</p>
    </div>

    <!-- 筛选条件 -->
    <div class="mb-6">
      <div class="grid grid-cols-2 gap-6 mb-4">
        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">支付方式</label>
          <select
            v-model="filters.paymentType"
            class="w-full h-10 border border-slate-300 rounded px-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">全部</option>
            <option value="Payoneer">Payoneer</option>
            <option value="Airwallex">空中云汇</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-900 mb-2">绑定状态</label>
          <select
            v-model="filters.bindStatus"
            class="w-full h-10 border border-slate-300 rounded px-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">全部</option>
            <option value="未绑定">未绑定</option>
            <option value="已绑定">已绑定</option>
            <option value="未激活">未激活</option>
          </select>
        </div>
      </div>

      <div class="text-center">
        <button
          @click="onSearch"
          type="button"
          class="px-8 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 操作区 -->
    <div class="mb-6">
      <button
        @click="openAdd"
        type="button"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
      >
        添加账号
      </button>
    </div>

    <!-- 表格 -->
    <div class="mb-6 overflow-x-auto border border-slate-200 rounded-lg">
      <table class="w-full border-collapse bg-white">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="th">支付方式</th>
            <th class="th">账户</th>
            <th class="th">绑定状态</th>
            <th class="th">创建时间</th>
            <th class="th">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pagedRows.length === 0">
            <td :colspan="5" class="text-center text-slate-500 py-10 text-sm">
              没有找到数据，您可以更换搜索条件
            </td>
          </tr>
          <tr v-for="r in pagedRows" :key="r.id" class="border-b border-slate-200 hover:bg-slate-50">
            <td class="td">{{ r.type }}</td>
            <td class="td">{{ r.account }}</td>
            <td class="td">{{ r.status }}</td>
            <td class="td">{{ r.createdAt }}</td>
            <td class="td">
              <div class="flex gap-2">
                <button
                  v-if="r.status !== '已绑定'"
                  @click="bind(r)"
                  type="button"
                  class="px-3 py-1 text-sm border border-primary text-primary rounded hover:bg-red-50 transition"
                >
                  绑定
                </button>
                <button
                  v-else
                  @click="unbind(r)"
                  type="button"
                  class="px-3 py-1 text-sm border border-slate-300 text-slate-700 rounded hover:bg-slate-100 transition"
                >
                  解除
                </button>
                <button
                  @click="removeRow(r.id)"
                  type="button"
                  class="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition"
                >
                  删除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="flex items-center justify-end gap-2">
      <button
        @click="previousPage"
        :disabled="page === 1"
        class="px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        上一页
      </button>

      <div class="flex gap-1">
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

      <button
        @click="nextPage"
        :disabled="page === totalPages"
        class="px-3 py-2 text-sm border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        下一页
      </button>

      <select
        @change="changePageSize"
        v-model.number="pageSize"
        class="px-3 py-2 text-sm border border-slate-300 rounded bg-white ml-4 hover:bg-slate-100 transition"
      >
        <option value="10">每页 10 条</option>
        <option value="20">每页 20 条</option>
        <option value="50">每页 50 条</option>
      </select>
    </div>

    <!-- 添加账号弹窗 -->
    <div v-if="addVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full">
        <!-- 对话框头部 -->
        <div class="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
          <h3 class="text-lg font-semibold text-slate-900">添加账号</h3>
          <button
            @click="addVisible = false"
            class="text-slate-500 hover:text-slate-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 对话框内容 -->
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">支付方式</label>
            <select
              v-model="form.type"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">请选择</option>
              <option value="Payoneer">Payoneer</option>
              <option value="Airwallex">空中云汇</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">账号</label>
            <input
              v-model="form.account"
              type="text"
              placeholder="邮箱或手机号"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- 对话框底部 -->
        <div class="flex justify-end gap-2 p-6 border-t border-slate-200 bg-slate-50">
          <button
            @click="addVisible = false"
            type="button"
            class="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition text-sm font-medium"
          >
            取消
          </button>
          <button
            @click="confirmAdd"
            type="button"
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const allRows = ref(generateDemo())

const filters = reactive({ paymentType: '', bindStatus: '' })

const page = ref(1)
const pageSize = ref(10)

const filteredRows = computed(() =>
  allRows.value.filter(r =>
    (!filters.paymentType || r.type === filters.paymentType) &&
    (!filters.bindStatus || r.status === filters.bindStatus)
  )
)

const totalPages = computed(() => Math.ceil(filteredRows.value.length / pageSize.value))

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredRows.value.slice(start, start + pageSize.value)
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

function onSearch() {
  page.value = 1
}

function removeRow(id) {
  allRows.value = allRows.value.filter(r => r.id !== id)
}

function bind(r) {
  r.status = '已绑定'
}

function unbind(r) {
  r.status = '未绑定'
}

const addVisible = ref(false)
const form = reactive({ type: '', account: '' })

function openAdd() {
  addVisible.value = true
}

function confirmAdd() {
  if (!form.type || !form.account) return
  const d = new Date()
  allRows.value.unshift({ id: Date.now(), type: form.type, account: form.account, status: '未激活', createdAt: fmt(d) })
  addVisible.value = false
  form.type = ''
  form.account = ''
  page.value = 1
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
  const list = []
  const types = ['Payoneer', 'Airwallex']
  const statuses = ['未绑定', '已绑定', '未激活']
  const now = new Date()
  for (let i = 0; i < 23; i++) {
    const d = new Date(now.getTime() - i * 86400000)
    list.push({
      id: i + 1,
      type: types[i % 2],
      account: `${types[i % 2]}-user${i}@mail.com`,
      status: statuses[i % 3],
      createdAt: fmt(d),
    })
  }
  return list
}

function fmt(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
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
