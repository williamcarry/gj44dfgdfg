<template>
  <div class="bg-white min-h-screen">
    <div class="bg-white overflow-hidden">
      <!-- 上传区域和导入步骤（布局与附件一致） -->
      <div class="flex bg-white">
        <!-- 左侧：上传区域 -->
        <div
          class="flex flex-col items-center justify-center w-3/5 bg-red-50 rounded-lg p-5 mr-4"
          style="background-color: rgb(255, 249, 249); border-radius: 10px; padding: 20px 30px;"
          @dragover.prevent="dragOver = true"
          @dragleave.prevent="dragOver = false"
          @drop.prevent="handleFileUpload"
        >
          <i class="text-6xl text-primary mb-2" style="color: rgb(203, 38, 28); font-size: 48px;">☁️</i>
          <p class="text-center mb-3 text-slate-500" style="color: rgb(153, 153, 153); margin-top: 4px; margin-bottom: 8px; line-height: 30px;">点击上传文件，或将文件拖拽到此处</p>
          <button
            @click="fileInput?.click()"
            class="px-6 text-white rounded font-medium"
            style="background-color: rgb(203, 38, 28); height: 44px; line-height: 44px; font-size: 16px; border-radius: 5px; padding: 0 25px; cursor: pointer; transition: 0.3s;"
          >
            上传文件
          </button>
          <p class="mt-3" style="color: rgb(153, 153, 153);"></p>
          <input
            ref="setFileInputRef"
            type="file"
            accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            @change="handleFileChange"
            class="hidden"
          />
        </div>

        <!-- 右侧：导入步骤 -->
        <div
          class="w-2/5 bg-slate-100 rounded-lg p-5"
          style="background-color: rgb(243, 243, 243); border-radius: 10px; padding: 20px 30px; width: calc(45% - 16px);"
        >
          <h2 class="text-slate-900 font-medium mb-4" style="color: rgb(51, 51, 51); font-weight: 500; line-height: 34px;">导入步骤：</h2>
          <ul class="space-y-1" style="padding-left: 20px;">
            <li class="mb-1" style="margin-bottom: 4px; display: list-item;">
              下载模板
              <span
                @click="downloadTemplate"
                class="inline-block cursor-pointer transition"
                style="border: 1px solid rgb(203, 38, 28); color: rgb(203, 38, 28); display: inline-block; line-height: 30px; margin-left: 8px; padding: 0 16px; border-radius: 3px;"
              >
                下载模板
              </span>
            </li>
            <li class="mb-1" style="margin-bottom: 4px; display: list-item;">将订单信息按要求粘贴到模板中；</li>
            <li class="mb-1" style="margin-bottom: 4px; display: list-item;">上传文件；</li>
            <li class="mb-1" style="margin-bottom: 4px; display: list-item;">
              <a href="https://www.saleyee.com/guide/hp853544.html" target="_blank" class="hover:underline" style="color: rgb(203, 38, 28); text-decoration: underline; transition: 0.3s;">
                去了解批量下单步骤；
              </a>
            </li>
            <li class="mb-1" style="margin-bottom: 4px; display: list-item;">单次最多1000条数据。</li>
          </ul>
        </div>
      </div>

      <!-- 下单说明 -->
      <div class="px-6 py-6 mt-6 rounded-lg" style="background-color: rgb(243, 243, 243);">
        <h3 class="text-sm font-bold text-slate-900 mb-4">下单说明</h3>
        <ul class="space-y-2 text-sm text-slate-700 pl-4">
          <li class="list-decimal">一件代发订单仅支持"free shipping"配送。</li>
          <li class="list-decimal">
            发货区域为英国/欧盟需要填写VAT税号，
            <a href="https://www.saleyee.com/help/14" target="_blank" class="text-primary hover:underline font-medium">
              去了解VAT税后政策
            </a>
            。
          </li>
          <li class="list-decimal">
            【售后保障服务已于2022年1月4日上线，为保障您的售后权益，请您务必使用2022年1月4日之后更新的Excel模板。请注意，批量下单方式售后保障服务不会默认购买，需要您自行填写方可购买成功】
          </li>
          <li class="list-decimal">
            <span class="text-primary font-medium">
              当您的销售平台为Temu，若选择非「自提」进行下单，平台不会屏蔽Fedex物流进行发货，建议您使用「自提」的方式进行下单。
            </span>
          </li>
          <li class="list-decimal">
            <span class="text-primary font-medium">
              "自提订单"请在创建完成后手动上传面单文件，否则订单无法发货
            </span>
          </li>
        </ul>
      </div>

      <!-- 搜索过滤区 -->
      <div class="px-6 py-6">
        <form @submit.prevent="searchRecords" class="space-y-4">
          <div class="flex items-end gap-6">
            <!-- 上传时间 -->
            <div class="flex-1 flex items-center gap-2">
              <label class="text-sm text-slate-700 whitespace-nowrap">上传时间：</label>
              <input
                v-model="startTime"
                type="date"
                placeholder="开始日期"
                class="px-3 py-2 h-9 border border-slate-300 rounded text-sm bg-white flex-1"
              />
              <span class="text-slate-400">-</span>
              <input
                v-model="endTime"
                type="date"
                placeholder="结束日期"
                class="px-3 py-2 h-9 border border-slate-300 rounded text-sm bg-white flex-1"
              />
            </div>

            <!-- 表名 -->
            <div class="flex-1 flex items-center gap-2">
              <label class="text-sm text-slate-700 whitespace-nowrap">表名：</label>
              <input
                v-model="templateName"
                type="text"
                placeholder=""
                class="px-3 py-2 h-9 border border-slate-300 rounded text-sm bg-white flex-1"
              />
            </div>

            <!-- 搜索按钮 -->
            <button
              type="submit"
              class="px-6 py-2 h-9 bg-primary text-white rounded text-sm font-medium hover:bg-primary-dark transition"
            >
              搜索
            </button>
          </div>
        </form>
      </div>

      <!-- 表格区域 -->
      <div class="px-6 py-4">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-slate-100 border-b border-slate-300">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 border border-slate-300">上传时间</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 border border-slate-300">表名</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 border border-slate-300">状态</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 border border-slate-300">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="record in paginatedRecords" :key="record.id" class="hover:bg-slate-50 transition">
                <td class="px-4 py-3 border border-slate-300 text-sm text-slate-700">{{ formatDate(record.uploadTime) }}</td>
                <td class="px-4 py-3 border border-slate-300 text-sm text-slate-700">{{ record.name }}</td>
                <td class="px-4 py-3 border border-slate-300 text-sm">
                  <span :class="getStatusClass(record.status)">{{ record.status }}</span>
                </td>
                <td class="px-4 py-3 border border-slate-300 text-sm">
                  <button @click="viewDetail(record.id)" class="text-primary hover:text-primary-dark font-medium">
                    查看
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 空状态 -->
        <div v-if="paginatedRecords.length === 0" class="text-center py-8 text-slate-500">
          暂无模板记录
        </div>

        <!-- 分页 -->
        <div v-if="filteredRecords.length > 0" class="mt-4 flex items-center justify-between">
          <div class="text-sm text-slate-600">
            共 {{ totalRecords }} 条 | 第 {{ currentPage }} 页
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
              class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 版本更新提醒弹窗 -->
  <div v-if="showUpdateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-sm w-full p-8 text-center">
      <h2 class="text-base font-medium text-slate-900 mb-4">关于批量下单模版更新提醒</h2>
      <div class="space-y-3 text-sm text-left mb-6">
        <p class="text-slate-700">尊敬的分销商:</p>
        <p class="text-slate-700">你们好!</p>
        <p class="text-slate-700 pl-7">赛盈商城批量下单模版有做更新,为保证后续订单正常同步,请及时下载新模板!</p>
      </div>
      <button 
        @click="closeUpdateModal"
        class="px-8 py-2 bg-primary text-white rounded font-medium hover:bg-primary-dark transition"
      >
        我知道了
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const showUpdateModal = ref(true)
const dragOver = ref(false)
let fileInput = null

const startTime = ref('')
const endTime = ref('')
const templateName = ref('')

const templateRecords = [
  { id: 1, uploadTime: new Date('2025-10-15 14:30:25'), name: '10月份订单', status: '已完成' },
  { id: 2, uploadTime: new Date('2025-10-14 09:15:42'), name: '9月份订单汇总', status: '已完成' },
  { id: 3, uploadTime: new Date('2025-10-10 16:45:18'), name: '秋季新品订单', status: '已完成' },
  { id: 4, uploadTime: new Date('2025-10-08 11:20:33'), name: '库存补货单', status: '处理中' },
  { id: 5, uploadTime: new Date('2025-10-05 13:45:12'), name: '客户退货处理', status: '失败' },
  { id: 6, uploadTime: new Date('2025-10-01 10:30:45'), name: '定制订单', status: '已完成' },
  { id: 7, uploadTime: new Date('2025-09-28 15:22:17'), name: '批发合作订单', status: '已完成' },
  { id: 8, uploadTime: new Date('2025-09-25 09:45:30'), name: '促销活动订单', status: '已完成' }
]

const filteredRecords = computed(() => {
  let result = templateRecords
  if (startTime.value) {
    const start = new Date(startTime.value)
    result = result.filter(r => r.uploadTime >= start)
  }
  if (endTime.value) {
    const end = new Date(endTime.value)
    end.setHours(23, 59, 59, 999)
    result = result.filter(r => r.uploadTime <= end)
  }
  if (templateName.value) {
    const keyword = templateName.value.toLowerCase()
    result = result.filter(r => r.name.toLowerCase().includes(keyword))
  }
  return result
})

const totalRecords = computed(() => filteredRecords.value.length)
const totalPages = computed(() => Math.ceil(totalRecords.value / pageSize.value))

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredRecords.value.slice(start, end)
})

const paginationRange = computed(() => {
  const delta = 2
  const left = Math.max(1, currentPage.value - delta)
  const right = Math.min(totalPages.value, currentPage.value + delta)
  const range = []
  if (left > 1) {
    range.push(1)
    if (left > 2) range.push('...')
  }
  for (let i = left; i <= right; i++) range.push(i)
  if (right < totalPages.value) {
    if (right < totalPages.value - 1) range.push('...')
    range.push(totalPages.value)
  }
  return range
})

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const getStatusClass = (status) => {
  switch (status) {
    case '已完成':
      return 'px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium'
    case '处理中':
      return 'px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium'
    case '待处理':
      return 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium'
    case '失败':
      return 'px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium'
    default:
      return 'px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium'
  }
}

const handleFileUpload = (event) => {
  dragOver.value = false
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    console.log('文件上传:', files[0].name)
  }
}

const handleFileChange = (event) => {
  const input = event.target
  const files = input.files
  if (files && files.length > 0) {
    console.log('文件选择:', files[0].name)
  }
}

const downloadTemplate = () => {
  const link = document.createElement('a')
  link.href = '#'
  link.download = 'after-sales-template.xlsx'
  link.click()
}

const searchRecords = () => {
  currentPage.value = 1
}

const viewDetail = (id) => {
  console.log('查看详情:', id)
}

const closeUpdateModal = () => {
  showUpdateModal.value = false
}

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const setFileInputRef = (el) => {
  fileInput = el
}
</script>

<style scoped>
</style>