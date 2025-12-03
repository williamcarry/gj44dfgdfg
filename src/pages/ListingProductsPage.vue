<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子���件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="listing-push-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">刊登商品列表</h1>
      <a href="#" class="guide-link">查看刊登指南>></a>
    </div>

    <!-- 搜索筛选区域 -->
    <div class="search-section">
      <div class="search-row">
        <div class="filter-group">
          <select v-model="filters.spuType" class="filter-select">
            <option value="">SPU编码</option>
            <option value="spu">SPU</option>
            <option value="sku">SKU</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <input
          v-model="filters.keyword"
          type="text"
          placeholder="多个SPU通用，分割，最多可输入1000个字符（约110个SPU）"
          class="search-input"
        />

        <div class="date-range">
          <span class="date-label">刊登时间</span>
          <span class="help-icon">?</span>
          <input v-model="filters.startDate" type="date" class="date-input" />
          <span class="date-separator">-</span>
          <input v-model="filters.endDate" type="date" class="date-input" />
        </div>

        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="tabs-section">
      <button
        :class="['tab-item', { active: activeTab === 'success' }]"
        @click="activeTab = 'success'"
      >
        推送成功
      </button>
      <button
        :class="['tab-item', { active: activeTab === 'failed' }]"
        @click="activeTab = 'failed'"
      >
        推送失败
      </button>
    </div>

    <!-- 数据表格 -->
    <div class="table-section">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 50px">
              <input type="checkbox" v-model="selectAll" @change="handleSelectAll" />
            </th>
            <th style="width: 120px">商品图片</th>
            <th style="width: 300px">商品名称/SPU</th>
            <th style="width: 150px">发货区域</th>
            <th style="width: 150px">推送价格</th>
            <th style="width: 150px">推送库存</th>
            <th style="width: 180px">推送时间</th>
            <th style="width: 120px">操作</th>
          </tr>
        </thead>
        <tbody v-if="paginatedData.length > 0">
          <tr v-for="item in paginatedData" :key="item.id">
            <td style="text-align: center">
              <input type="checkbox" v-model="item.selected" />
            </td>
            <td>
              <img :src="item.image" class="product-image" />
            </td>
            <td>
              <div class="product-info">
                <div class="product-name">{{ item.name }}</div>
                <div class="product-spu">SPU: {{ item.spu }}</div>
              </div>
            </td>
            <td style="text-align: center">{{ item.region }}</td>
            <td style="text-align: center">{{ item.price }}</td>
            <td style="text-align: center">{{ item.stock }}</td>
            <td style="text-align: center">{{ item.pushTime }}</td>
            <td style="text-align: center">
              <button class="action-link">查看详情</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 空状态 -->
      <div v-if="paginatedData.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path
              d="M40 10C23.43 10 10 23.43 10 40C10 56.57 23.43 70 40 70C56.57 70 70 56.57 70 40C70 23.43 56.57 10 40 10Z"
              fill="#F3F4F6"
            />
            <path
              d="M40 30C38.9 30 38 30.9 38 32V42C38 43.1 38.9 44 40 44C41.1 44 42 43.1 42 42V32C42 30.9 41.1 30 40 30Z"
              fill="#9CA3AF"
            />
            <circle cx="40" cy="50" r="2" fill="#9CA3AF" />
          </svg>
        </div>
        <p class="empty-text">暂要一键刊登，先绑定飞刊。</p>
        <a href="#" class="empty-link">查看刊登指南</a>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="totalItems > 0" class="pagination-container">
      <div class="pagination-wrapper">
        <button
          class="page-btn"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          上一页
        </button>
        <button
          v-for="page in displayPages"
          :key="page"
          :class="['page-btn', { active: currentPage === page }]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <button
          class="page-btn"
          :disabled="currentPage >= totalPages"
          @click="currentPage++"
        >
          下一页
        </button>
        <select v-model="pageSize" class="page-size-select" @change="currentPage = 1">
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
        <span class="page-info">条 共{{ totalPages }}页，前往第</span>
        <input
          type="number"
          v-model="gotoPage"
          class="goto-input"
          min="1"
          :max="totalPages"
        />
        <span class="page-info">页</span>
        <button class="go-btn" @click="handleGoto">GO</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 筛选条件
const filters = ref({
  spuType: '',
  keyword: '',
  startDate: '2025-09-18',
  endDate: '2025-10-18',
})

// 标签页
const activeTab = ref('success')

// 分页
const currentPage = ref(1)
const pageSize = ref(20)
const gotoPage = ref(1)

// 全选
const selectAll = ref(false)
const handleSelectAll = () => {
  paginatedData.value.forEach((item) => {
    item.selected = selectAll.value
  })
}

// 搜索
const handleSearch = () => {
  console.log('搜索条件:', filters.value)
  currentPage.value = 1
}

// 跳转页面
const handleGoto = () => {
  if (gotoPage.value >= 1 && gotoPage.value <= totalPages.value) {
    currentPage.value = gotoPage.value
  }
}

// 演示���据
const mockData = ref([
  {
    id: 1,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
    name: '源头工厂 荷叶鸟笼装饰挂件家居工艺品',
    spu: 'S2205417',
    region: 'US',
    price: 'USD 28.87',
    stock: 50,
    pushTime: '2025-10-18 14:30:25',
  },
  {
    id: 2,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/a4c9e7bb-0579-407f-bcb9-12b94237817a.Jpeg',
    name: '6x10 美尺聚碳酸酯透明室外温室',
    spu: 'J4973817',
    region: 'US',
    price: 'USD 304.91',
    stock: 36,
    pushTime: '2025-10-18 13:15:42',
  },
  {
    id: 3,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202501/8829a6ab-0a10-4349-a506-12835c30c872.Jpeg',
    name: '现代简约客厅装饰画',
    spu: 'D8823456',
    region: 'UK',
    price: 'GBP 45.99',
    stock: 120,
    pushTime: '2025-10-17 16:22:10',
  },
  {
    id: 4,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202506/89c6cc05-8416-491e-8b0e-3fde8a318f0e.Jpeg',
    name: '北欧风格木质花架',
    spu: 'W3341289',
    region: 'CA',
    price: 'CAD 89.50',
    stock: 78,
    pushTime: '2025-10-17 11:05:33',
  },
  {
    id: 5,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    name: '创意金属壁挂装饰',
    spu: 'M7765432',
    region: 'US',
    price: 'USD 56.80',
    stock: 95,
    pushTime: '2025-10-16 09:40:18',
  },
  {
    id: 6,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    name: '手工编织收纳筐',
    spu: 'B2234567',
    region: 'UK',
    price: 'GBP 32.50',
    stock: 145,
    pushTime: '2025-10-16 08:12:55',
  },
])

// 计算总数
const totalItems = computed(() => mockData.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

// 分页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return mockData.value.slice(start, end)
})

// 显示的页码
const displayPages = computed(() => {
  const pages = []
  const maxDisplay = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxDisplay / 2))
  const endPage = Math.min(totalPages.value, startPage + maxDisplay - 1)

  if (endPage - startPage < maxDisplay - 1) {
    startPage = Math.max(1, endPage - maxDisplay + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})
</script>

<style scoped>
.listing-push-page {
  background: #fff;
  min-height: 100vh;
  padding: 20px;
}

/* 页面头部 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.guide-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
}

.guide-link:hover {
  text-decoration: underline;
}

/* 搜索区域 */
.search-section {
  background: #fff;
  padding: 16px 0;
  margin-bottom: 20px;
}

.search-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.filter-group {
  position: relative;
  display: inline-block;
}

.filter-select {
  padding: 8px 32px 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  background: #fff;
  cursor: pointer;
  appearance: none;
  min-width: 120px;
}

.filter-select:focus {
  outline: none;
  border-color: #d32f2f;
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 10px;
  color: #999;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.search-input::placeholder {
  color: #999;
}

.search-input:focus {
  outline: none;
  border-color: #d32f2f;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-label {
  font-size: 14px;
  color: #666;
}

.help-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #666;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}

.date-input {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.date-input:focus {
  outline: none;
  border-color: #d32f2f;
}

.date-separator {
  color: #666;
}

.search-btn {
  padding: 8px 32px;
  background: #d32f2f;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #b71c1c;
}

/* 标签页 */
.tabs-section {
  display: flex;
  gap: 2px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 20px;
}

.tab-item {
  padding: 12px 24px;
  border: none;
  background: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all 0.3s;
}

.tab-item:hover {
  color: #d32f2f;
}

.tab-item.active {
  color: #d32f2f;
  border-bottom-color: #d32f2f;
}

/* 表格 */
.table-section {
  background: #fff;
  min-height: 400px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table thead {
  background: #fafafa;
}

.data-table th {
  padding: 12px 8px;
  color: #666;
  font-weight: 500;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
}

.data-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.data-table tbody tr:hover {
  background: #fafafa;
}

.data-table td {
  padding: 12px 8px;
  vertical-align: middle;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.product-info {
  text-align: left;
}

.product-name {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-spu {
  font-size: 12px;
  color: #999;
}

.action-link {
  color: #3b82f6;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.action-link:hover {
  text-decoration: underline;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-text {
  color: #999;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.empty-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 14px;
}

.empty-link:hover {
  text-decoration: underline;
}

/* 分页 */
.pagination-container {
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #d32f2f;
  color: #d32f2f;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background: #d32f2f;
  color: #fff;
  border-color: #d32f2f;
}

.goto-input {
  width: 50px;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: center;
}

.page-size-select {
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.page-info {
  color: #666;
}

.go-btn {
  padding: 6px 16px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
}

.go-btn:hover {
  border-color: #d32f2f;
  color: #d32f2f;
}
</style>
