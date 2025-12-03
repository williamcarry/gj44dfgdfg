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
  <div class="brand-auth-page">
    <!-- 页面标题和说明 -->
    <div class="page-header">
      <h1 class="page-title">品牌授权</h1>
      <p class="page-description">
        （本品牌商品现阶段开放查看权限，所有客户均可获得该产品的销售权限，无需在线申请授权。如有不明，请联系专属客户经理）
      </p>
    </div>

    <!-- 搜索筛选区域 -->
    <div class="search-section">
      <div class="search-row">
        <div class="form-group">
          <label class="form-label">授权单号：</label>
          <input
            v-model="filters.authNumber"
            type="text"
            class="form-input"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label class="form-label">品牌名称：</label>
          <input
            v-model="filters.brandName"
            type="text"
            class="form-input"
            placeholder=""
          />
        </div>
      </div>

      <div class="search-row">
        <div class="form-group">
          <label class="form-label">店铺/账号名称：</label>
          <input
            v-model="filters.shopName"
            type="text"
            class="form-input"
            placeholder=""
          />
        </div>

        <div class="form-group">
          <label class="form-label">授权平台：</label>
          <div class="select-wrapper">
            <select v-model="filters.platform" class="form-select">
              <option value="">全部</option>
              <option value="amazon">Amazon</option>
              <option value="ebay">eBay</option>
              <option value="walmart">Walmart</option>
            </select>
            <span class="select-arrow">▼</span>
          </div>
        </div>
      </div>

      <div class="search-row">
        <div class="form-group">
          <label class="form-label">状态：</label>
          <div class="select-wrapper">
            <select v-model="filters.status" class="form-select">
              <option value="">全部</option>
              <option value="active">生效中</option>
              <option value="expired">已失效</option>
              <option value="pending">待审核</option>
            </select>
            <span class="select-arrow">▼</span>
          </div>
        </div>

        <div class="form-group"></div>
      </div>

      <div class="search-actions">
        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-section">
      <table class="data-table">
        <thead>
          <tr>
            <th>授权单号</th>
            <th>品牌名称</th>
            <th>授权平台</th>
            <th>店铺/账号名称</th>
            <th>店铺/平台账号</th>
            <th>状态</th>
            <th>生效时间</th>
            <th>失效时间</th>
            <th>申请时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody v-if="paginatedData.length > 0">
          <tr v-for="item in paginatedData" :key="item.id">
            <td>{{ item.authNumber }}</td>
            <td>{{ item.brandName }}</td>
            <td>{{ item.platform }}</td>
            <td>{{ item.shopName }}</td>
            <td>{{ item.shopAccount }}</td>
            <td>
              <span :class="['status-badge', `status-${item.status}`]">
                {{ getStatusText(item.status) }}
              </span>
            </td>
            <td>{{ item.effectiveTime }}</td>
            <td>{{ item.expireTime }}</td>
            <td>{{ item.applyTime }}</td>
            <td>
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
        <p class="empty-text">暂无品牌授权数据</p>
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
  authNumber: '',
  brandName: '',
  shopName: '',
  platform: '',
  status: '',
})

// 分页
const currentPage = ref(1)
const pageSize = ref(20)
const gotoPage = ref(1)

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

// 状态文本映射
const getStatusText = (status) => {
  const statusMap = {
    active: '生效中',
    expired: '已失效',
    pending: '待审核',
  }
  return statusMap[status] || status
}

// 演示数据
const mockData = ref([
  {
    id: 1,
    authNumber: 'AUTH202510180001',
    brandName: 'HomeDecor',
    platform: 'Amazon',
    shopName: 'MyHomeStore',
    shopAccount: 'myhomestore@amazon.com',
    status: 'active',
    effectiveTime: '2025-01-01',
    expireTime: '2025-12-31',
    applyTime: '2024-12-15 10:30:00',
  },
  {
    id: 2,
    authNumber: 'AUTH202510180002',
    brandName: 'KitchenPro',
    platform: 'eBay',
    shopName: 'KitchenWorld',
    shopAccount: 'kitchenworld',
    status: 'active',
    effectiveTime: '2025-02-01',
    expireTime: '2026-01-31',
    applyTime: '2025-01-20 14:22:00',
  },
  {
    id: 3,
    authNumber: 'AUTH202510180003',
    brandName: 'GardenLife',
    platform: 'Walmart',
    shopName: 'GreenGarden',
    shopAccount: 'greengarden@walmart.com',
    status: 'expired',
    effectiveTime: '2024-01-01',
    expireTime: '2024-12-31',
    applyTime: '2023-12-10 09:15:00',
  },
  {
    id: 4,
    authNumber: 'AUTH202510180004',
    brandName: 'ModernFurniture',
    platform: 'Amazon',
    shopName: 'FurnitureHub',
    shopAccount: 'furniturehub@amazon.com',
    status: 'pending',
    effectiveTime: '-',
    expireTime: '-',
    applyTime: '2025-10-15 16:45:00',
  },
  {
    id: 5,
    authNumber: 'AUTH202510180005',
    brandName: 'ArtDecor',
    platform: 'eBay',
    shopName: 'ArtGallery',
    shopAccount: 'artgallery',
    status: 'active',
    effectiveTime: '2025-03-01',
    expireTime: '2026-02-28',
    applyTime: '2025-02-20 11:30:00',
  },
  {
    id: 6,
    authNumber: 'AUTH202510180006',
    brandName: 'LightingPlus',
    platform: 'Amazon',
    shopName: 'BrightLights',
    shopAccount: 'brightlights@amazon.com',
    status: 'active',
    effectiveTime: '2025-04-01',
    expireTime: '2026-03-31',
    applyTime: '2025-03-25 13:20:00',
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
.brand-auth-page {
  background: #fff;
  min-height: 100vh;
  padding: 20px;
}

/* 页面头部 */
.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.page-description {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.6;
}

/* 搜索区域 */
.search-section {
  background: #fff;
  padding: 20px 0;
  margin-bottom: 20px;
}

.search-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 32px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-label {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  min-width: 100px;
  text-align: right;
}

.form-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.form-input::placeholder {
  color: #999;
}

.form-input:focus {
  outline: none;
  border-color: #d32f2f;
}

.select-wrapper {
  position: relative;
  flex: 1;
}

.form-select {
  width: 100%;
  padding: 8px 32px 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  background: #fff;
  cursor: pointer;
  appearance: none;
}

.form-select:focus {
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

.search-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.search-btn {
  padding: 8px 48px;
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
  text-align: left;
  white-space: nowrap;
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
  color: #333;
}

.status-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 12px;
}

.status-active {
  background: #dcfce7;
  color: #15803d;
}

.status-expired {
  background: #fee2e2;
  color: #dc2626;
}

.status-pending {
  background: #fef3c7;
  color: #ca8a04;
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
  margin: 0;
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
