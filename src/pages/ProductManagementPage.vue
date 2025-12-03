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
  <div class="product-management-page">
    <!-- 顶部标签导航 -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-item', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="header-actions">
        <span class="action-text">商品管理全面升级！</span>
        <a href="#" class="action-link">立即前往了解</a>
      </div>
    </div>

    <!-- 子标签导航 -->
    <div class="sub-tabs-container">
      <button
        v-for="subTab in subTabs"
        :key="subTab.key"
        :class="['sub-tab-item', { active: activeSubTab === subTab.key }]"
        @click="activeSubTab = subTab.key"
      >
        {{ subTab.label }}<span class="count" v-if="subTab.count !== undefined">({{ subTab.count }})</span>
      </button>
    </div>

    <!-- 搜索和筛选栏 -->
    <div class="filter-bar">
      <div class="filter-row">
        <div class="filter-group">
          <select v-model="filters.searchType" class="filter-select">
            <option value="sku">SKU</option>
            <option value="name">商品名称</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <div class="search-input-wrapper">
          <input
            v-model="filters.keyword"
            placeholder="输入关键词搜索"
            class="search-input"
          />
          <button class="search-button">
            <Search class="search-icon" />
          </button>
        </div>

        <div class="filter-group">
          <select v-model="filters.sort" class="filter-select">
            <option value="recent">最近更新</option>
            <option value="price_asc">价格升序</option>
            <option value="price_desc">价格降序</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <div class="filter-group">
          <select v-model="filters.category" class="filter-select">
            <option value="">商品分类</option>
            <option value="home">家居用品</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <div class="filter-group">
          <select v-model="filters.tags" class="filter-select">
            <option value="">商品标签</option>
            <option value="hot">热卖</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <div class="filter-group">
          <select v-model="filters.warehouse" class="filter-select">
            <option value="">区域/库存</option>
            <option value="US">US</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <div class="filter-group">
          <select v-model="filters.platform" class="filter-select">
            <option value="">禁售平台</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>

        <div class="filter-group">
          <select v-model="filters.addTime" class="filter-select">
            <option value="">添加时间</option>
            <option value="today">今天</option>
            <option value="week">本周</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>
      </div>

      <!-- 快捷筛选 -->
      <div class="quick-filters">
        <label class="checkbox-label">
          <input type="checkbox" v-model="quickFilters.featured" />
          <span>特别关注</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="quickFilters.support_swap" />
          <span>支持图货</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="quickFilters.support_batch" />
          <span>支持批发</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="quickFilters.support_presale" />
          <span>支持借远地址</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="quickFilters.published" />
          <span>已映射</span>
        </label>
        <label class="checkbox-label">
          <input type="checkbox" v-model="quickFilters.self_pickup" />
          <span>支持自提</span>
        </label>
        <button class="reset-btn" @click="resetFilters">
          <RotateCcw class="reset-icon" />
          重置
        </button>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="action-bar">
      <div class="left-actions">
        <span class="total-count">共 {{ totalCount }} 个商品</span>
        <button class="action-btn">
          <Upload class="btn-icon" />
          导出
        </button>
        <button class="action-btn">
          <Tag class="btn-icon" />
          设置标签
        </button>
        <button class="action-btn">
          <Star class="btn-icon" />
          特别关注
          <ChevronDown class="btn-icon-small" />
        </button>
        <button class="action-btn">
          <AlertTriangle class="btn-icon" />
          修改库存警戒线
        </button>
        <button class="action-btn">
          <Flag class="btn-icon" />
          一键刊登
        </button>
        <button class="action-btn">
          <Trash2 class="btn-icon" />
          删除
        </button>
      </div>
      <div class="right-actions">
        <button class="action-btn">
          <Bell class="btn-icon" />
          设置消息通知
        </button>
        <button class="action-btn">
          <Tags class="btn-icon" />
          标签管理
        </button>
      </div>
    </div>

    <!-- 商品���表 -->
    <div class="product-table">
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 50px">
              <input type="checkbox" v-model="selectAll" @change="handleSelectAll" />
            </th>
            <th style="width: 350px; text-align: left; padding-left: 16px">商品</th>
            <th style="width: 80px; text-align: center">区域</th>
            <th style="width: 100px; text-align: left">库存</th>
            <th style="width: 200px; text-align: left">价格</th>
            <th style="width: 250px; text-align: left">发货物流</th>
            <th style="width: 100px; text-align: center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="product-row">
            <td style="text-align: center">
              <input type="checkbox" v-model="product.selected" />
            </td>
            <td>
              <div class="product-cell">
                <img :src="product.image" class="product-image" />
                <div class="product-info">
                  <div class="product-title">{{ product.title }}</div>
                  <div class="product-sku">SKU:{{ product.sku }}</div>
                  <div class="product-badges">
                    <span v-if="product.status === 'downloaded'" class="badge badge-gray">已下载</span>
                    <span v-if="product.tags.includes('标签')" class="badge badge-blue">+ 标签</span>
                  </div>
                </div>
              </div>
            </td>
            <td style="text-align: center">
              <div class="region-cell">
                <span>{{ product.region }}</span>
              </div>
            </td>
            <td>
              <div class="stock-cell">
                <div class="stock-value">
                  {{ product.stock }}
                  <TrendingUp v-if="product.stockTrend === 'up'" class="trend-icon" />
                </div>
                <div class="stock-alert">警戒线：{{ product.alertLine }}</div>
              </div>
            </td>
            <td>
              <div class="price-cell">
                <div v-for="(price, index) in product.prices" :key="index" class="price-item">
                  <div class="price-value">
                    {{ price.currency }} {{ price.value }}
                    <TrendingUp v-if="price.trend === 'up'" class="trend-icon-price" />
                  </div>
                  <div class="price-discount" v-if="price.discount">
                    <span class="discount-badge" v-if="price.reduction">
                      <AlertCircle class="discount-icon" />
                      即降价前: {{ price.currency }} {{ price.reducedPrice }}
                    </span>
                    <span :class="['discount-value', price.discount.startsWith('-') ? 'negative' : '']">
                      {{ price.discount }}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="shipping-cell">
                <div v-for="(shipping, index) in product.shippings" :key="index" class="shipping-item">
                  <div class="shipping-method">{{ shipping.method }}</div>
                  <div class="shipping-time">参考时效：{{ shipping.time }}</div>
                </div>
              </div>
            </td>
            <td style="text-align: center">
              <div class="operation-dropdown">
                <button class="operation-btn" @click="toggleDropdown(product.id)">
                  操作
                  <MoreHorizontal class="operation-icon" />
                </button>
                <div v-if="activeDropdown === product.id" class="dropdown-menu">
                  <button class="dropdown-item">设置特别关注</button>
                  <button class="dropdown-item">一键刊登</button>
                  <button class="dropdown-item delete">���除</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <div class="pagination-wrapper">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">上一页</button>
        <input type="number" v-model="currentPage" class="page-input" min="1" :max="totalPages" />
        <button class="page-btn" :disabled="currentPage >= totalPages" @click="currentPage++">下一页</button>
        <select v-model="pageSize" class="page-size-select">
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
        <span class="page-info">条  共{{ totalPages }}页，前往第</span>
        <input type="number" v-model="gotoPage" class="goto-input" min="1" :max="totalPages" />
        <span class="page-info">页</span>
        <button class="go-btn" @click="handleGoto">GO</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Search,
  Upload,
  Tag,
  Star,
  ChevronDown,
  AlertTriangle,
  Flag,
  Trash2,
  Bell,
  Tags,
  RotateCcw,
  TrendingUp,
  AlertCircle,
  MoreHorizontal,
} from 'lucide-vue-next'

// 标签页数据
const tabs = [
  { key: 'all', label: '全部商品' },
  { key: 'collected', label: '已收藏商品' },
  { key: 'purchased', label: '已购买商品' },
  { key: 'restricted', label: '已下载/映射/刊登商品' },
]

const subTabs = [
  { key: 'all', label: '全部', count: 2 },
  { key: 'in_stock', label: '在售', count: 2 },
  { key: 'out_of_stock', label: '失效', count: 0 },
  { key: 'promotion', label: '促销', count: 1 },
  { key: 'low_stock', label: '低库存', count: 0 },
  { key: 'slow_moving', label: '滞效', count: 0 },
]

const activeTab = ref('all')
const activeSubTab = ref('all')

// 筛选条件
const filters = ref({
  searchType: 'sku',
  keyword: '',
  sort: 'recent',
  category: '',
  tags: '',
  warehouse: '',
  platform: '',
  addTime: '',
})

const quickFilters = ref({
  featured: false,
  support_swap: false,
  support_batch: false,
  support_presale: false,
  published: false,
  self_pickup: false,
})

const resetFilters = () => {
  quickFilters.value = {
    featured: false,
    support_swap: false,
    support_batch: false,
    support_presale: false,
    published: false,
    self_pickup: false,
  }
}

// 分页
const currentPage = ref(1)
const pageSize = ref(20)
const totalCount = ref(2)
const gotoPage = ref(1)
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

const handleGoto = () => {
  if (gotoPage.value >= 1 && gotoPage.value <= totalPages.value) {
    currentPage.value = gotoPage.value
  }
}

// 全选
const selectAll = ref(false)
const handleSelectAll = () => {
  products.value.forEach((product) => {
    product.selected = selectAll.value
  })
}

// 操作下拉菜单
const activeDropdown = ref(null)
const toggleDropdown = (productId) => {
  if (activeDropdown.value === productId) {
    activeDropdown.value = null
  } else {
    activeDropdown.value = productId
  }
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  const target = event.target
  if (!target.closest('.operation-dropdown')) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 商品数据
const products = ref([
  {
    id: 1,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
    title: '源头工厂 荷叶鸟笼装饰挂件家居工艺...',
    sku: 'S2205417',
    status: 'downloaded',
    tags: ['标签'],
    region: 'US',
    stock: 50,
    stockTrend: 'up',
    alertLine: 20,
    prices: [
      {
        currency: 'USD',
        value: '28.87',
        trend: 'up',
        discount: '-6%',
        reduction: null,
        reducedPrice: null,
      },
      {
        currency: 'USD',
        value: '29.61',
        trend: 'up',
        discount: null,
        reduction: null,
        reducedPrice: null,
      },
      {
        currency: 'USD',
        value: '36.60',
        trend: 'up',
        discount: '-5%',
        reduction: '0.32',
        reducedPrice: '0.32',
      },
      {
        currency: 'USD',
        value: '22.31',
        trend: null,
        discount: '-8%',
        reduction: null,
        reducedPrice: null,
      },
    ],
    shippings: [
      { method: 'Economy Shipping', time: '3-10天' },
      { method: 'Economy Small Parcel Shipping', time: '3-10天' },
      { method: 'Standard Shipping', time: '5-7天' },
      { method: 'Self-Pick up', time: '1-3天' },
    ],
  },
  {
    id: 2,
    selected: false,
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/a4c9e7bb-0579-407f-bcb9-12b94237817a.Jpeg',
    title: '6x10 美尺聚碳酸酯透明室外温室...',
    sku: 'J4973817',
    status: 'collected',
    tags: ['标签'],
    region: 'US',
    stock: 36,
    stockTrend: 'up',
    alertLine: 20,
    prices: [
      {
        currency: 'USD',
        value: '304.91',
        trend: 'up',
        discount: null,
        reduction: '0.01',
        reducedPrice: '0.01',
      },
    ],
    shippings: [{ method: 'Standard Shipping', time: '5-7天' }],
  },
])
</script>

<style scoped>
.product-management-page {
  background: #fff;
  min-height: 100vh;
}

/* 顶部标签导航 */
.tabs-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.tabs-wrapper {
  display: flex;
  gap: 2px;
}

.tab-item {
  padding: 14px 24px;
  border: none;
  background: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.tab-item:hover {
  color: #d32f2f;
}

.tab-item.active {
  color: #d32f2f;
  border-bottom-color: #d32f2f;
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.action-text {
  color: #666;
}

.action-link {
  color: #d32f2f;
  text-decoration: none;
}

.action-link:hover {
  text-decoration: underline;
}

/* 子标签导航 */
.sub-tabs-container {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.sub-tab-item {
  padding: 6px 16px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #333;
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.sub-tab-item:hover {
  border-color: #d32f2f;
  color: #d32f2f;
}

.sub-tab-item.active {
  background: #d32f2f;
  color: #fff;
  border-color: #d32f2f;
}

.count {
  margin-left: 2px;
}

/* 筛选栏 */
.filter-bar {
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.filter-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.filter-group {
  position: relative;
  display: inline-block;
}

.filter-select {
  padding: 6px 28px 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 13px;
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
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 10px;
  color: #999;
}

.search-input-wrapper {
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  overflow: hidden;
}

.search-input {
  padding: 6px 10px;
  border: none;
  font-size: 13px;
  min-width: 200px;
}

.search-input:focus {
  outline: none;
}

.search-button {
  padding: 0 12px;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  width: 16px;
  height: 16px;
  color: #666;
}

/* 快捷筛选 */
.quick-filters {
  display: flex;
  gap: 16px;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.checkbox-label input[type='checkbox'] {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: none;
  background: none;
  color: #3b82f6;
  font-size: 13px;
  cursor: pointer;
}

.reset-icon {
  width: 14px;
  height: 14px;
}

/* 操作栏 */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #fafafa;
  border-bottom: 1px solid #e5e7eb;
}

.left-actions,
.right-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.total-count {
  font-size: 13px;
  color: #666;
  margin-right: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #333;
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: #d32f2f;
  color: #d32f2f;
}

.btn-icon {
  width: 14px;
  height: 14px;
}

.btn-icon-small {
  width: 12px;
  height: 12px;
}

/* 商品表格 */
.product-table {
  background: #fff;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.custom-table thead {
  background: #fafafa;
}

.custom-table th {
  padding: 12px 8px;
  color: #333;
  font-weight: 500;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
}

.custom-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.custom-table tbody tr:hover {
  background: #fafafa;
}

.custom-table td {
  padding: 12px 8px;
  vertical-align: top;
}

/* 商品单元格 */
.product-cell {
  display: flex;
  gap: 12px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-title {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-sku {
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}

.product-badges {
  display: flex;
  gap: 6px;
}

.badge {
  padding: 2px 8px;
  font-size: 11px;
  border-radius: 3px;
}

.badge-gray {
  background: #f3f4f6;
  color: #666;
}

.badge-blue {
  background: #dbeafe;
  color: #1d4ed8;
}

/* 区域单元格 */
.region-cell {
  font-size: 13px;
  color: #333;
}

/* 库存单元格 */
.stock-cell {
  font-size: 13px;
}

.stock-value {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #333;
  margin-bottom: 4px;
}

.trend-icon {
  width: 14px;
  height: 14px;
  color: #10b981;
}

.stock-alert {
  font-size: 12px;
  color: #666;
}

/* 价格单元格 */
.price-cell {
  font-size: 13px;
}

.price-item {
  margin-bottom: 8px;
}

.price-item:last-child {
  margin-bottom: 0;
}

.price-value {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #333;
  margin-bottom: 2px;
}

.trend-icon-price {
  width: 12px;
  height: 12px;
  color: #10b981;
}

.price-discount {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.discount-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ef4444;
}

.discount-icon {
  width: 12px;
  height: 12px;
}

.discount-value {
  color: #10b981;
}

.discount-value.negative {
  color: #ef4444;
}

/* 发货物流单元格 */
.shipping-cell {
  font-size: 13px;
}

.shipping-item {
  margin-bottom: 8px;
}

.shipping-item:last-child {
  margin-bottom: 0;
}

.shipping-method {
  color: #333;
  margin-bottom: 2px;
}

.shipping-time {
  font-size: 12px;
  color: #666;
}

/* 操作按钮 */
.operation-dropdown {
  position: relative;
  display: inline-block;
}

.operation-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: none;
  background: none;
  color: #3b82f6;
  font-size: 13px;
  cursor: pointer;
}

.operation-btn:hover {
  color: #2563eb;
}

.operation-icon {
  width: 14px;
  height: 14px;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 4px;
  min-width: 140px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  color: #333;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.dropdown-item.delete {
  color: #ef4444;
}

.dropdown-item.delete:hover {
  background: #fee2e2;
}

/* 分页 */
.pagination-container {
  padding: 16px 20px;
  background: #fff;
  border-top: 1px solid #e5e7eb;
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

.page-input,
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
