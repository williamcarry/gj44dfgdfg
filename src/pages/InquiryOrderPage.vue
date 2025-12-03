<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该��件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="mx-auto w-full max-w-[1500px] md:min-w-[1150px] px-4 md:px-0">
    <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <!-- 表格头部 -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">商品信息</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">单���</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">数量</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">金额</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">状态</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="item in paginatedInquiries" :key="item.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-16 w-16">
                    <img class="h-16 w-16 object-contain" :src="item.productImage" :alt="item.productName" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-slate-900">{{ item.productName }}</div>
                    <div class="text-sm text-slate-500">{{ item.productSku }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900">${{ item.unitPrice }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900">{{ item.quantity }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-slate-900">${{ item.totalAmount }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(item.status)">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                <button @click="viewDetail(item.id)" class="text-primary hover:text-primary-dark">查看</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 空状态 -->
      <div v-if="inquiries.length === 0" class="text-center py-12">
        <div class="text-slate-500">暂无询价单数据</div>
      </div>

      <!-- 分页 -->
      <div v-if="inquiries.length > 0" class="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
        <div class="text-sm text-slate-600">
          共 {{ totalInquiries }} 条 | 第 {{ currentPage }} 页
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

    <!-- 详情弹窗 -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">询价单详情</h3>
            <button @click="closeDetailModal" class="text-slate-500 hover:text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedInquiry" class="space-y-4">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-20 w-20">
                <img class="h-20 w-20 object-contain" :src="selectedInquiry.productImage" :alt="selectedInquiry.productName" />
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-slate-900">{{ selectedInquiry.productName }}</div>
                <div class="text-sm text-slate-500">{{ selectedInquiry.productSku }}</div>
              </div>
            </div>
          
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-slate-700">单价</label>
                <div class="mt-1 text-sm text-slate-900">${{ selectedInquiry.unitPrice }}</div>
              </div>
              <div>
                <label class="text-sm font-medium text-slate-700">数量</label>
                <div class="mt-1 text-sm text-slate-900">{{ selectedInquiry.quantity }}</div>
              </div>
              <div>
                <label class="text-sm font-medium text-slate-700">金额</label>
                <div class="mt-1 text-sm text-slate-900">${{ selectedInquiry.totalAmount }}</div>
              </div>
              <div>
                <label class="text-sm font-medium text-slate-700">状态</label>
                <div class="mt-1">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(selectedInquiry.status)">
                    {{ selectedInquiry.status }}
                  </span>
                </div>
              </div>
              <div class="col-span-2">
                <label class="text-sm font-medium text-slate-700">询价时间</label>
                <div class="mt-1 text-sm text-slate-900">{{ selectedInquiry.inquiryDate }}</div>
              </div>
              <div class="col-span-2">
                <label class="text-sm font-medium text-slate-700">备注</label>
                <div class="mt-1 text-sm text-slate-900">{{ selectedInquiry.remarks || '无' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const pageSize = ref(5)
const showDetailModal = ref(false)
const selectedInquiry = ref(null)

// 演示数据
const inquiries = [
  {
    id: 1,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/b4a7be3d-a601-4332-a34d-47833226c810.Jpeg',
    productName: '3抽抽屉柜 床头柜储���柜 白色（同款07479869, 69269387）',
    productSku: '75682614',
    unitPrice: 46.80,
    quantity: 100,
    totalAmount: 4680.00,
    status: '待报价',
    inquiryDate: '2025-10-15 14:30:25',
    remarks: '请尽快报价'
  },
  {
    id: 2,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/4695cd17-10c7-473c-960a-fbb9d18c4a90.Jpeg',
    productName: '12ft 巨型可怕幽灵 4颗LED灯 火焰和闪烁的红眼睛 充气万圣装饰',
    productSku: '50904039',
    unitPrice: 34.04,
    quantity: 50,
    totalAmount: 1702.00,
    status: '已报价',
    inquiryDate: '2025-10-14 09:15:42',
    remarks: '客户急需'
  },
  {
    id: 3,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    productName: '6ft LED南瓜灯 万圣节充气装���',
    productSku: '50904040',
    unitPrice: 22.50,
    quantity: 200,
    totalAmount: 4500.00,
    status: '已完成',
    inquiryDate: '2025-10-10 16:45:18',
    remarks: '长期合作客户'
  },
  {
    id: 4,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/b4a7be3d-a601-4332-a34d-47833226c810.Jpeg',
    productName: '现代简约3抽屉梳妆台 白色',
    productSku: '75682615',
    unitPrice: 52.00,
    quantity: 80,
    totalAmount: 4160.00,
    status: '待报价',
    inquiryDate: '2025-10-08 11:20:33',
    remarks: ''
  },
  {
    id: 5,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/03b9a883-ada3-41af-88a5-0beba02f2eeb.Jpeg',
    productName: '万圣节幽灵装饰灯 黑色款',
    productSku: '50904041',
    unitPrice: 28.90,
    quantity: 150,
    totalAmount: 4335.00,
    status: '已取消',
    inquiryDate: '2025-10-05 13:45:12',
    remarks: '客户取消订单'
  },
  {
    id: 6,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/86bb50ad-7a28-4ade-982f-600530c9bb3f.Jpeg',
    productName: '北欧风格床头柜 实木材质',
    productSku: '75682616',
    unitPrice: 65.50,
    quantity: 60,
    totalAmount: 3930.00,
    status: '待报价',
    inquiryDate: '2025-10-01 10:30:45',
    remarks: '样品确认中'
  },
  {
    id: 7,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
    productName: '户外庭院装饰灯 太阳能款',
    productSku: '50904042',
    unitPrice: 18.75,
    quantity: 300,
    totalAmount: 5625.00,
    status: '已报价',
    inquiryDate: '2025-09-28 15:22:17',
    remarks: '批量采购'
  },
  {
    id: 8,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/2753d850-5827-4fcb-a4ac-bea08144b53e.Jpeg',
    productName: '儿童房储物柜 粉色系列',
    productSku: '75682617',
    unitPrice: 39.90,
    quantity: 120,
    totalAmount: 4788.00,
    status: '已完成',
    inquiryDate: '2025-09-25 09:45:30',
    remarks: '节日促销'
  }
]

const totalInquiries = computed(() => inquiries.length)
const totalPages = computed(() => Math.ceil(totalInquiries.value / pageSize.value))

const paginatedInquiries = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return inquiries.slice(start, end)
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

const viewDetail = (id) => {
  selectedInquiry.value = inquiries.find(item => item.id === id) || null
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedInquiry.value = null
}

const getStatusClass = (status) => {
  switch (status) {
    case '待报价':
      return 'bg-yellow-100 text-yellow-800'
    case '已报价':
      return 'bg-blue-100 text-blue-800'
    case '已完成':
      return 'bg-green-100 text-green-800'
    case '已取消':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<style scoped>
/* 可以根据需要添加自定义样式 */
</style>
