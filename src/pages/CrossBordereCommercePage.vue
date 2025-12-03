<template>
  <div class="min-h-screen bg-slate-50">
    <SiteHeader />

    <!-- 黄色提示横幅 -->
    <div class="yellow-banner">
      <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1150px] px-4 md:px-0">
        <div class="platform-tit">
          <h3>不知道如何询问行Amazon选品？</h3>
          <p>赛盈大数���选品，201个维度数据让选品告诉!</p>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1150px] px-4 md:px-0">
      <!-- 平台选择 Tab 栏 -->
      <div class="platform-tabs-container">
        <div class="platform-tabs">
          <button
            v-for="platform in platforms"
            :key="platform.value"
            @click="selectPlatform(platform.value)"
            :class="['platform-tab', { active: selectedPlatform === platform.value }]"
          >
            <img :src="platform.logo" :alt="platform.value" class="platform-logo" />
          </button>
        </div>
      </div>

      <!-- 主内容区 -->
      <div class="flex">
        <!-- 商品区域 -->
        <div class="flex-1">
      <!-- 筛选栏 -->
      <div class="bg-white shadow-sm mb-6">
        <!-- 已选条件 - 仅显示非分类筛选条件 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">{{ t('selected') }}</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <span v-if="!selectedWarehouses && !selectedNewTime && !selectedShipment && !selectedSaleMode" class="text-slate-500 text-sm">{{ t('none') }}</span>
            <template v-else>
              <span v-if="selectedWarehouses" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getWarehouseName(selectedWarehouses) }} <button @click="selectedWarehouses = null" class="text-slate-600 hover:text-primary font-bold">×</button></span>
              <span v-if="selectedNewTime" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getNewTimeLabel(selectedNewTime) }} <button @click="selectedNewTime = ''" class="text-slate-600 hover:text-primary font-bold">×</button></span>
              <span v-if="selectedShipment" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getShipmentLabel(selectedShipment) }} <button @click="selectedShipment = ''" class="text-slate-600 hover:text-primary font-bold">×</button></span>
              <span v-if="selectedSaleMode" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getSaleModeLabel(selectedSaleMode) }} <button @click="selectedSaleMode = ''" class="text-slate-600 hover:text-primary font-bold">×</button></span>
            </template>
          </div>
        </div>

        <!-- 商品品牌 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">{{ t('brand') }}</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" class="text-sm text-primary font-medium cursor-pointer">{{ t('all') }}</a>
          </div>
        </div>


        <!-- 上新时间 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">{{ t('newTime') }}</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" @click="selectedNewTime = ''" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', !selectedNewTime ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ t('all') }}</a>
            <a v-for="option in newTimeOptions" :key="option.value" v-show="option.value" href="javascript:;" @click="selectedNewTime = selectedNewTime === option.value ? '' : option.value" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', selectedNewTime === option.value ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ option.label }}</a>
          </div>
        </div>

        <!-- 发货类型 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">{{ t('shipment') }}</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" @click="selectedShipment = ''" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', !selectedShipment ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ t('all') }}</a>
            <a v-for="option in shipmentOptions" :key="option.value" v-show="option.value" href="javascript:;" @click="selectedShipment = selectedShipment === option.value ? '' : option.value" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', selectedShipment === option.value ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ option.label }}</a>
          </div>
        </div>

        <!-- 交易模式 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">{{ t('mode') }}</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" @click="selectedSaleMode = ''" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', !selectedSaleMode ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ t('all') }}</a>
            <a v-for="option in saleModeOptions" :key="option.value" v-show="option.value" href="javascript:;" @click="selectedSaleMode = selectedSaleMode === option.value ? '' : option.value" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', selectedSaleMode === option.value ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ option.label }}</a>
          </div>
        </div>


      </div>

      <!-- 全选与批量操作 -->
      <div class="bg-white shadow-sm mb-6">
        <div class="flex items-center px-5 py-3 border-b border-slate-200">
          <!-- 左边：全选与已选项 -->
          <div class="flex-shrink-0">
            <ul class="flex items-center gap-5">
              <li class="flex items-center gap-2">
                <input type="checkbox" v-model="selectAll" @change="handleSelectAll" class="rounded cursor-pointer" />
                <span class="text-sm font-medium text-slate-700 cursor-pointer">{{ t('selectAll') }}</span>
              </li>
              <li>
                <p class="text-xs text-slate-600">{{ t('selectedItems') }} <em class="font-semibold text-primary">{{ selectedCount }}</em> {{ t('items') }}</p>
              </li>
            </ul>
          </div>

          <!-- 右边：批量操作按钮 -->
          <div class="flex-1"></div>
          <div class="flex-shrink-0">
            <ul class="flex items-center gap-6">
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1" :title="t('publish')">
                <img src="/frondend/images/AllCategoriesProductsPage/publish_icon.png" alt="一键刊登" class="w-4 h-4" />
                {{ t('publish') }}
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <img src="/frondend/images/AllCategoriesProductsPage/down2.png" alt="下载数据包" class="w-4 h-4" />
                {{ t('download') }}
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <img src="/frondend/images/AllCategoriesProductsPage/favorites_icon.png" alt="加入收藏夹" class="w-4 h-4" />
                {{ t('favorite') }}
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <DownloadIcon class="w-4 h-4 text-[#2F54EB]" />
                {{ t('downloadSpu') }}
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <CopyIcon class="w-4 h-4 text-[#13C2C2]" />
                {{ t('copySpu') }}
              </a></li>
            </ul>
          </div>
        </div>

        <!-- 排序栏（改为附件格式） -->
        <div class="sort-wrapper">
          <div class="sort-inner">
            <ul class="sort-list">
              <li v-for="option in sortOptions" :key="option.value" :class="['sort-item', selectedSort === option.value ? 'active' : '']">
                <a href="javascript:;" @click.prevent="handleSortChange(option.value)" class="sort-link">
                  {{ option.label }}
                  <!-- 显示箭头 -->
                  <i v-if="option.hasArrow && selectedSort === option.value" class="sort-arrow" :class="sortOrder === 'ASC' ? 'arrow-up' : 'arrow-down'"></i>
                </a>
              </li>

              <li class="li-2">
                <label class="onlylook">
                  <input type="checkbox" lay-skin="primary" lay-filter="onlylook" :title="t('onlyStock')" class="hidden-checkbox" v-model="onlyStock" />
                  <span class="onlylook-text">{{ t('onlyStock') }}</span>
                  <i class="i-2"></i>
                </label>
              </li>

              <li class="li-3">
                {{ t('inventory') }}：
                <input type="text" v-model="inventoryStart" class="small-input" placeholder="最小" />
                -
                <input type="text" v-model="inventoryEnd" class="small-input" placeholder="最大" />
              </li>

              <li class="li-4">
                {{ t('priceRange') }}：
                <input type="text" v-model="minPrice" class="small-input" placeholder="最小" />
                -
                <input type="text" v-model="maxPrice" class="small-input" placeholder="最大" />
                <button class="button-apply" @click.prevent="applyStockAndPriceFilter">{{ t('confirm') }}</button>
              </li>
            </ul>

          </div>
        </div>
      </div>

      <!-- 商品网格 -->
      <template v-if="isLoading">
        <!-- 显示骨架屏 -->
        <SkeletonLoader type="product-list" :count="16" :columns="4" />
      </template>
      <template v-else-if="products.length === 0">
        <!-- 暂无商品提示 -->
        <div class="bg-white rounded-lg shadow-sm py-20 mb-8">
          <div class="text-center">
            <p class="text-slate-400 text-lg font-medium">{{ t('noProducts') }}</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <div
            v-for="product in products"
            :key="product.id"
            class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <!-- 图片 -->
            <a :href="`/shop/item/${product.id}`" target="_blank" rel="noopener noreferrer" class="block aspect-square overflow-hidden bg-slate-100">
              <img :src="product.image" :alt="getProductTitle(product)" class="w-full h-full object-cover hover:scale-105 transition" />
            </a>

            <!-- 内容 -->
            <div class="p-4">
              <!-- 标题 -->
              <a :href="`/shop/item/${product.id}`" target="_blank" rel="noopener noreferrer" class="block mb-2">
                <h3 class="text-sm text-slate-900 font-medium line-clamp-2 hover:text-primary transition">
                  {{ getProductTitle(product) }}
                </h3>
              </a>

              <!-- SPU 和库存 -->
              <div class="flex justify-between items-center mb-3">
                <p class="text-xs text-slate-500">{{ t('spu') }}: {{ product.spu }}</p>
                <p class="text-xs text-slate-500">{{ t('stockLabel') }}: {{ product.stock }}</p>
              </div>

              <!-- 价格 -->
              <div class="mb-3 p-2 bg-slate-50 rounded text-center price-box">
                <!-- 售价 -->
                <div class="text-red-500 font-bold text-lg" v-if="product.sellingPrice">
                  {{ product.currency }} {{ parseFloat(product.sellingPrice).toFixed(2) }}
                </div>
                <!-- 原价（只有当原价和售价不同时才显示） -->
                <div class="text-gray-500 text-sm line-through" v-if="product.originalPrice && parseFloat(product.originalPrice) !== parseFloat(product.sellingPrice)">
                  {{ product.currency }} {{ parseFloat(product.originalPrice).toFixed(2) }}
                </div>
              </div>

              <!-- 库存信息 -->
              <div class="flex items-center gap-1 mb-3">
                <PackageIcon class="w-4 h-4 text-red-500" />
                <span class="text-xs text-slate-500">{{ t('stockLabel') }}: {{ product.stock }}</span>
              </div>

              <!-- 勾选框和操作 -->
              <div class="flex items-center justify-between pt-3">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    class="rounded" 
                    :checked="selectedProducts.has(product.id)"
                    @change="toggleProductSelection(product.id)"
                  />
                </label>
                <div class="flex items-center gap-2">
                  <button :title="t('publish')" class="p-2 text-slate-600 hover:text-primary transition">
                    <img src="/frondend/images/AllCategoriesProductsPage/publish_icon.png" alt="一键刊登" class="w-4 h-4" />
                  </button>
                  <button :title="t('download')" class="p-2 text-slate-600 hover:text-primary transition">
                    <img src="/frondend/images/AllCategoriesProductsPage/down2.png" alt="下载数据包" class="w-4 h-4" />
                  </button>
                  <button :title="t('favorite')" class="p-2 text-slate-600 hover:text-primary transition" @click="toggleFavorite(product.id)">
                    <img src="/frondend/images/AllCategoriesProductsPage/favorites_icon.png" alt="加入收藏夹" class="w-4 h-4" :class="{'opacity-50': !isProductFavorited(product.id)}" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 使用 Pagination 组件 -->
      <div class="pagination-debug">
        <!-- 调试信息 -->
        <!-- <p>当前页: {{ currentPage }}, 总页数: {{ totalPages }}, 总条目: {{ totalItems }}</p> -->
      </div>
      <Pagination 
        :current-page="currentPage"
        :total-pages="totalPages"
        :change-page="goToPage"
      />
        </div>
      </div>

    </div>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'
import Pagination from '@/components/Pagination.vue'
import { 
  Upload as UploadIcon,
  Bookmark as BookmarkIcon,
  Copy as CopyIcon,
  Download as DownloadIcon,
  PackagePlus as PackagePlusIcon,
  Heart as HeartIcon,
  Package as PackageIcon
} from 'lucide-vue-next'

// 多语言��置
const messages = {
  'zh-CN': {
    selected: '已选',
    none: '无',
    brand: '品牌',
    all: '全部',
    newTime: '上新',
    shipment: '发货',
    mode: '模式',
    selectAll: '全选',
    selectedItems: '已选',
    items: '项',
    publish: '一键刊登',
    download: '下载数据包',
    favorite: '加入收藏夹',
    downloadSpu: '下载SPU',
    copySpu: '复制SPU',
    sortComprehensive: '综合',
    sortNewest: '最新',
    sortSales: '销量',
    sortPrice: '价格',
    sortDownloads: '下载数',
    sortStock: '库存',
    onlyStock: '仅看有货',
    inventory: '库存',
    priceRange: '价格',
    confirm: '确定',
    spu: 'SPU',
    stockLabel: '库存',
    newTime7: '近7天',
    newTime15: '近15天',
    newTime30: '近30天',
    newTime60: '近60天',
    shipmentPlatform: '平台发货',
    shipmentSupplier: '供应商自发货',
    modeDropshipping: '一件代发',
    modeWholesale: '批发',
    modeReserve: '圈货',
    modePickup: '自提',
    noProducts: '暂无商品',
  },
  'en': {
    selected: 'Selected',
    none: 'None',
    brand: 'Brand',
    all: 'All',
    newTime: 'New Arrivals',
    shipment: 'Shipping',
    mode: 'Mode',
    selectAll: 'Select All',
    selectedItems: 'Selected',
    items: 'items',
    publish: 'Publish',
    download: 'Download',
    favorite: 'Add to Favorites',
    downloadSpu: 'Download SPU',
    copySpu: 'Copy SPU',
    sortComprehensive: 'Comprehensive',
    sortNewest: 'Newest',
    sortSales: 'Sales',
    sortPrice: 'Price',
    sortDownloads: 'Downloads',
    sortStock: 'Stock',
    onlyStock: 'In Stock Only',
    inventory: 'Inventory',
    priceRange: 'Price Range',
    confirm: 'Confirm',
    spu: 'SPU',
    stockLabel: 'Stock',
    newTime7: 'Last 7 days',
    newTime15: 'Last 15 days',
    newTime30: 'Last 30 days',
    newTime60: 'Last 60 days',
    shipmentPlatform: 'Platform Shipping',
    shipmentSupplier: 'Supplier Shipping',
    modeDropshipping: 'Dropshipping',
    modeWholesale: 'Wholesale',
    modeReserve: 'Reserve',
    modePickup: 'Pickup',
    noProducts: 'No products available',
  }
}

// 当前语言
const currentLang = ref('zh-CN')

// 翻译函数
const t = (key) => {
  return messages[currentLang.value]?.[key] || messages['zh-CN']?.[key] || key
}

// 平台数据
const platforms = ref([
  { value: 'amazon', logo: '/frondend/images/crossBordereCommercePage/amazon.jpg' },
  { value: 'walmart', logo: '/frondend/images/crossBordereCommercePage/walmart.jpg' },
  { value: 'ebay', logo: '/frondend/images/crossBordereCommercePage/ebay.jpg' },
  { value: 'temu', logo: '/frondend/images/crossBordereCommercePage/temu.png' },
  { value: 'shein', logo: '/frondend/images/crossBordereCommercePage/shein.png' },
  { value: 'tiktok', logo: '/frondend/images/crossBordereCommercePage/tiktok.png' },
])

// 选中的平台
const selectedPlatform = ref('amazon')

const isLoading = ref(true)

const selectedWarehouses = ref(null)
const selectedNewTime = ref('')
const selectedShipment = ref('')
const selectedSaleMode = ref('')
// 分类筛选条件（从 URL 参数读取，不可更改）
const selectedCategory1 = ref('')
const selectedCategory2 = ref('')
const selectedCategory3 = ref('')
const selectedSort = ref('viewCount')  // 默认按综合（浏览量）排序
const sortOrder = ref('DESC')  // 默认降序
const onlyStock = ref(false)
const inventoryStart = ref('')
const inventoryEnd = ref('')
const minPrice = ref('')
const maxPrice = ref('')

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

const applyStockAndPriceFilter = () => {
  // 独立的库存和价格筛选逻辑
  // 重新加载商品数据
  fetchProducts(1)
}

// 获取商品数据
const fetchProducts = async (page = 1) => {
  try {
    isLoading.value = true
    
    // 构建查询参数
    const params = new URLSearchParams()
    params.append('page', page)
    
    // 添加分类筛选参数
    if (selectedCategory3.value) {
      params.append('itemId', selectedCategory3.value)
    } else if (selectedCategory2.value) {
      params.append('subcategoryId', selectedCategory2.value)
    } else if (selectedCategory1.value) {
      params.append('categoryId', selectedCategory1.value)
    }
    
    // 条件1：上新时间筛选
    if (selectedNewTime.value) {
      params.append('newTime', selectedNewTime.value)
    }
    
    // 条件2：发货类型筛选
    if (selectedShipment.value !== '') {
      params.append('shipment', selectedShipment.value)
    }
    
    // 条件3：交易模式筛选
    if (selectedSaleMode.value !== '') {
      params.append('saleMode', selectedSaleMode.value)
    }
    
    // 添加排序参数
    params.append('sortField', selectedSort.value)
    params.append('sortOrder', sortOrder.value)
    
    // 独立条件：库存筛选
    if (inventoryStart.value && inventoryStart.value !== '') {
      params.append('stockMin', inventoryStart.value)
    }
    if (inventoryEnd.value && inventoryEnd.value !== '') {
      params.append('stockMax', inventoryEnd.value)
    }
    
    // 独立条件：价格筛选
    if (minPrice.value && minPrice.value !== '') {
      params.append('priceMin', minPrice.value)
    }
    if (maxPrice.value && maxPrice.value !== '') {
      params.append('priceMax', maxPrice.value)
    }

    // 添加平台参数
    if (selectedPlatform.value) {
      params.append('platform', selectedPlatform.value)
    }

    const response = await fetch(`/shop/api/product/cross-bordere-commerce?${params.toString()}`)
    const data = await response.json()
    
    // 更新商品数据
    products.value = data.products.map(product => ({
      id: product.id,
      spu: product.spu,
      title: product.title,
      titleEn: product.titleEn,
      image: product.thumbnailImage || '',
      stock: product.stock || 0,
      originalPrice: product.originalPrice,
      sellingPrice: product.sellingPrice,
      currency: product.currency || 'USD'
    }))
    
    // 更新分页信息
    totalPages.value = data.pagination.totalPages
    totalItems.value = data.pagination.totalItems
    currentPage.value = data.pagination.currentPage
    itemsPerPage.value = data.pagination.itemsPerPage
    pageInput.value = data.pagination.currentPage
    
    isLoading.value = false
  } catch (error) {
    console.error('获取商品数据失败:', error)
    isLoading.value = false
  }
}

const selectAll = ref(false)
const selectedProducts = ref(new Set())
const favoritedProducts = ref(new Set()) // 添加这行用于管理收藏状态

// 分页相关状态
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const itemsPerPage = ref(20)
const pageInput = ref(1)

// 商品数据
const products = ref([])

const selectedCount = computed(() => selectedProducts.value.size)

const newTimeOptions = computed(() => [
  { label: t('all'), value: '' },
  { label: t('newTime7'), value: '7' },
  { label: t('newTime15'), value: '15' },
  { label: t('newTime30'), value: '30' },
  { label: t('newTime60'), value: '60' },
])

const shipmentOptions = computed(() => [
  { label: t('all'), value: '' },
  { label: t('shipmentPlatform'), value: '0' },
  { label: t('shipmentSupplier'), value: '1' },
])

const saleModeOptions = computed(() => [
  { label: t('all'), value: '' },
  { label: t('modeDropshipping'), value: '0' },
  { label: t('modeWholesale'), value: '1' },
  { label: t('modeReserve'), value: '2' },
  { label: t('modePickup'), value: '3' },
])

const sortOptions = computed(() => [
  { label: t('sortComprehensive'), value: 'viewCount', field: 'viewCount' },
  { label: t('sortNewest'), value: 'updatedAt', field: 'updatedAt', hasArrow: true },
  { label: t('sortSales'), value: 'salesCount', field: 'salesCount', hasArrow: true },
  { label: t('sortPrice'), value: 'price', field: 'price', hasArrow: true },
  { label: t('sortDownloads'), value: 'downloadCount', field: 'downloadCount', hasArrow: true },
  { label: t('sortStock'), value: 'stock', field: 'stock', hasArrow: true },
])

const handleSelectAll = () => {
  if (selectAll.value) {
    products.value.forEach(product => {
      selectedProducts.value.add(product.id)
    })
  } else {
    products.value.forEach(product => {
      selectedProducts.value.delete(product.id)
    })
  }
}

const toggleProductSelection = (productId) => {
  if (selectedProducts.value.has(productId)) {
    selectedProducts.value.delete(productId)
  } else {
    selectedProducts.value.add(productId)
  }
  
  updateSelectAllState()
}

const updateSelectAllState = () => {
  selectAll.value = products.value.length > 0 && products.value.every(product => selectedProducts.value.has(product.id))
}

// 添加收藏状态切换方法
const toggleFavorite = (productId) => {
  if (favoritedProducts.value.has(productId)) {
    favoritedProducts.value.delete(productId)
  } else {
    favoritedProducts.value.add(productId)
  }
}

// 添加检查产品是否已收藏的方法
const isProductFavorited = (productId) => {
  return favoritedProducts.value.has(productId)
}

// 分页相关方法
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchProducts(page)
  }
}

// 平台选择方法
const selectPlatform = (platform) => {
  selectedPlatform.value = platform
  // 向后台传递参数，重新加载商品数据
  fetchProducts(1)
}

// 排序切换方法
const handleSortChange = (sortValue) => {
  if (selectedSort.value === sortValue) {
    // 如果点击同一个排序选项，切换升降序
    sortOrder.value = sortOrder.value === 'DESC' ? 'ASC' : 'DESC'
  } else {
    // 切换不同排序选项，默认降序
    selectedSort.value = sortValue
    sortOrder.value = 'DESC'
  }
  // 重新加载数据
  fetchProducts(1)
}

watch(products, () => {
  updateSelectAllState()
})

// 监听筛选条件变化，自动重新加载商品
watch([selectedNewTime, selectedShipment, selectedSaleMode, onlyStock], () => {
  fetchProducts(1)
})

onMounted(() => {
  // 初始化当前语言
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'

  // 从 URL 参数中读取分类 ID
  const urlParams = new URLSearchParams(window.location.search)
  const categoryId = urlParams.get('categoryId')
  const subcategoryId = urlParams.get('subcategoryId')
  const itemId = urlParams.get('itemId')

  // 设置分���筛选条件（按优先级）
  if (itemId) {
    selectedCategory3.value = parseInt(itemId)
  } else if (subcategoryId) {
    selectedCategory2.value = parseInt(subcategoryId)
  } else if (categoryId) {
    selectedCategory1.value = parseInt(categoryId)
  }

  // 首次加载：获取商品数据
  fetchProducts(1)

  // 监听语言变化事件
  window.addEventListener('languagechange', handleLangChange)

  // 监听浏览器后退/前进按钮
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  // 移除语言变化事件监听
  window.removeEventListener('languagechange', handleLangChange)
  // 移除 popstate 事件监听
  window.removeEventListener('popstate', handlePopState)
})

// 处理浏览器后退/前进按钮
const handlePopState = (event) => {
  // 从 URL 重新读取���数
  const urlParams = new URLSearchParams(window.location.search)
  const categoryId = urlParams.get('categoryId')
  const subcategoryId = urlParams.get('subcategoryId')
  const itemId = urlParams.get('itemId')

  // 重置所有分类选择
  selectedCategory1.value = ''
  selectedCategory2.value = ''
  selectedCategory3.value = ''

  // 设置新的分类选择
  if (itemId) {
    selectedCategory3.value = parseInt(itemId)
  } else if (subcategoryId) {
    selectedCategory2.value = parseInt(subcategoryId)
  } else if (categoryId) {
    selectedCategory1.value = parseInt(categoryId)
  }

  // 重新加载商品数据
  fetchProducts(1)
}

function getNewTimeLabel(value) {
  const option = newTimeOptions.value.find(o => o.value === value)
  return option?.label || ''
}

function getShipmentLabel(value) {
  const option = shipmentOptions.value.find(o => o.value === value)
  return option?.label || ''
}

function getSaleModeLabel(value) {
  const option = saleModeOptions.value.find(o => o.value === value)
  return option?.label || ''
}

// 获取商品标题（支持中英文切换）
function getProductTitle(product) {
  if (currentLang.value === 'en' && product?.titleEn) {
    return product.titleEn
  }
  return product?.title || ''
}
</script>

<style scoped>
/* 排序栏样式（模拟附件样式） */
.sort-wrapper{background:#fff}
.sort-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid #ddd}
.sort-list{display:flex;align-items:center;gap:0;list-style:none;padding:0;margin:0}
.sort-item{float:left}
.sort-link{display:inline-flex;align-items:center;gap:4px;padding:0 20px;line-height:36px;color:#333;text-decoration:none;border-right:1px solid #ddd;cursor:pointer}
.sort-item.active .sort-link{background:#eee;color:#e4393c}

/* 箭头样式 */
.sort-arrow{display:inline-block;width:0;height:0;margin-left:4px;border-left:4px solid transparent;border-right:4px solid transparent}
.sort-arrow.arrow-up{border-bottom:6px solid #e4393c}
.sort-arrow.arrow-down{border-top:6px solid #e4393c}

.li-2{margin-left:20px;padding-left:20px}
.onlylook{display:inline-flex;align-items:center;position:relative;height:36px}
.hidden-checkbox{display:none}
.onlylook-text{margin-left:8px;color:#333}
.small-input{width:50px;height:24px;padding:3px 6px;border:1px solid #d5d5d5;border-radius:2px;margin:0 6px}
.button-apply{background:#cb261c;color:#fff;border:none;padding:4px 8px;border-radius:2px;margin-left:8px;cursor:pointer}

/* 固定每个商品的价格区域高度并垂直居中 */
.price-box{height:72px;min-height:72px;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden}
.price-box .text-lg{line-height:1}
.price-box .text-sm{opacity:0.9}

/* 分页容器样式 */
:deep(.pagination-container) {
  position: relative !important;
  bottom: auto !important;
  left: auto !important;
  right: auto !important;
  margin: 20px 0 !important;
  padding-top: 0 !important;
  border-top: none !important;
}

/* 黄色提示横幅样式 */
.yellow-banner {
  background-color: #ffc107;
  height: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 35px;
}

.platform-tit {
  text-align: center;
  color: #ffffff;
}

.platform-tit h3 {
  font-size: 30px;
  line-height: 40px;
  color: #fff;
  margin: 0 0 4px 0;
}

.platform-tit p {
  font-size: 18px;
  line-height: 30px;
  color: #fff;
  margin: 0;
}

/* 平台 Tab 栏样式 */
.platform-tabs-container {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0;
  margin-top: -60px;
  position: relative;
  z-index: 5;
  margin-bottom: 24px;
}

.platform-tabs {
  display: flex;
  height: 120px;
  width: 100%;
  gap: 0;
}

.platform-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  background-color: #ffffff;
  border: none;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 12px;
}

.platform-tab:hover {
  background-color: #f9fafb;
}

.platform-tab.active {
  border-bottom-color: #ffae00;
  background-color: #ffffff;
}

.platform-logo {
  width: auto;
  height: 60px;
  object-fit: contain;
  display: inline-block;
  max-width: 160px;
}
</style>
