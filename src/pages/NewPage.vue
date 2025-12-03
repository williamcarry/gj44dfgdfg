<!--
CSS 引用说明：
1. ���局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：��文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="min-h-screen">
    <SiteHeader />

    <!-- Content Area with Background -->
    <div style="background: url('https://www.saleyee.com/static/imgs/74596c7198f18c4bc5d1f0ed47151b9e.png') top center no-repeat, linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); background-size: cover; padding: 30px 20px;">
      <!-- Hero -->
    <div class="w-full" style="padding: 40px 20px;">
      <div class="mx-auto px-4" style="width: 100%; max-width: 1500px; margin: 0 auto;">
        <div class="flex items-center justify-center gap-6">
          <img loading="lazy" src="/frondend/images/newPage/new-icon.png" alt="new" style="width: 48px; height: 48px;" />
          <div class="text-center">
            <h1 class="text-white text-4xl font-bold">新品上市</h1>
            <p class="text-white mt-2">热品新品优惠 — 立即抢购</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Banner Image -->
    <div style="width: 100%; max-width: 1500px; margin: 0 auto; padding: 20px;">
      <a target="_blank" href="https://www.saleyee.com/subject/ap67303.html" class="block overflow-hidden rounded-lg">
        <img
          loading="lazy"
          src="/frondend/images/newPage/new-banner.jpg"
          style="width: 100%; height: 360px; object-fit: cover; display: block;"
          alt="new product banner"
        />
      </a>
    </div>

    <!-- Main Content: Two Column Layout -->
    <div style="width: 100%; max-width: 1500px; margin: 0 auto; padding: 24px 20px;">
      <div class="bg-white rounded-lg shadow-md p-6 flex gap-6">
        <!-- Left Column: Weekly Featured (本周强推) -->
        <div class="w-[35%]">
          <h2 class="text-white text-4xl font-bold mb-4">本周强推</h2>
          <div class="relative h-96 overflow-hidden rounded-lg">
            <transition name="fade" mode="out-in">
              <a
                v-if="weeklyFeatured.length > 0"
                :key="currentWeeklyIdx"
                :href="`/item/${weeklyFeatured[currentWeeklyIdx].spu}.html`"
                class="block absolute inset-0"
              >
                <img
                  :src="weeklyFeatured[currentWeeklyIdx].mainImage"
                  :alt="weeklyFeatured[currentWeeklyIdx].title"
                  class="w-full h-full object-cover"
                />
              </a>
            </transition>
            <!-- Navigation Arrows -->
            <button
              v-if="weeklyFeatured.length > 1"
              @click="prevWeekly"
              class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/50 z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              v-if="weeklyFeatured.length > 1"
              @click="nextWeekly"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/50 z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Product Details -->
          <div v-if="weeklyFeatured.length > 0" class="mt-4">
            <a :href="`/item/${weeklyFeatured[currentWeeklyIdx].spu}.html`" class="block text-sm text-slate-800 hover:text-primary line-clamp-2 mb-2 font-medium">
              {{ weeklyFeatured[currentWeeklyIdx].title }}
            </a>
            <div class="product-price">
              <span class="price">{{ formatPrice(weeklyFeatured[currentWeeklyIdx]._price) }}</span>
              <span v-if="weeklyFeatured[currentWeeklyIdx]._originalPrice" class="original">{{ formatPrice(weeklyFeatured[currentWeeklyIdx]._originalPrice) }}</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Hot Sales (热销新品) -->
<div class="w-[65%]">
          <div class="flex items-center justify-between bg-white p-4 rounded-lg mb-4">
            <h2 class="text-2xl font-bold text-slate-800">热销新品</h2>
            <ul class="flex gap-4 flex-1 justify-end">
              <li
                v-for="(item, idx) in hotSalesCategories"
                :key="idx"
                @click="selectedHotSalesCategory = idx"
                :title="item"
                :class="[
                  'px-4 py-2 rounded text-sm cursor-pointer transition whitespace-nowrap max-w-xs overflow-hidden text-ellipsis',
                  selectedHotSalesCategory === idx
                    ? 'bg-red-600 text-white'
                    : 'text-slate-700 hover:bg-gray-100'
                ]"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Product Grid -->
          <div class="grid grid-cols-4 gap-4">
            <div v-for="p in hotSalesTop8" :key="p.spu" class="bg-[#f6f6f6] rounded-lg overflow-hidden hover:shadow transition">
              <a :href="`/item/${p.spu}.html`" class="block relative">
                <div class="relative w-full aspect-square bg-slate-100 overflow-hidden">
                  <img :src="p.mainImage" :alt="p.title" class="w-full h-full object-cover" />
                </div>
              </a>

              <div class="p-3">
                <a :href="`/item/${p.spu}.html`" class="block mb-1">
                  <h3 class="text-xs text-slate-800 font-medium line-clamp-1 hover:text-primary transition">{{ p.title }}</h3>
                </a>
                <div class="product-price">
                  <span class="price">{{ formatPrice(p._price) }}</span>
                  <span v-if="p._originalPrice" class="original">{{ formatPrice(p._originalPrice) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Filter and Product List -->
    <div style="width: 100%; max-width: 1500px; margin: 0 auto; padding: 24px 20px;">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <!-- Left Sidebar: Filters -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-sm sticky top-20" style="padding: 12px 10px;">
          <!-- 库存 Filter -->
          <div class="mb-4">
            <p class="text-gray-800 text-base font-bold mb-3 leading-tight">库存</p>
            <div class="flex items-center gap-0 w-full">
              <div class="flex items-center gap-1 flex-1">
                <input v-model.number="inventoryStart" type="text" placeholder="最低" class="bg-white border border-gray-200 rounded px-2 h-[34px] text-gray-800 text-xs w-[40%] overflow-hidden text-ellipsis focus:outline-none focus:border-gray-200" />
                <span class="text-gray-800 text-sm user-select-none flex-shrink-0">-</span>
                <input v-model.number="inventoryEnd" type="text" placeholder="最高" class="bg-white border border-gray-200 rounded px-2 h-[34px] text-gray-800 text-xs w-[40%] overflow-hidden text-ellipsis focus:outline-none focus:border-gray-200" />
              </div>
              <button type="button" @click="applyInventoryFilter" class="bg-red-700 border-none rounded px-6 h-[34px] text-white text-xs cursor-pointer user-select-none transition-opacity duration-300 flex-shrink-0 hover:opacity-90 whitespace-nowrap ml-auto">确认</button>
            </div>
          </div>

          <!-- 价格 Filter -->
          <div class="mb-4">
            <p class="text-gray-800 text-base font-bold mb-3 leading-tight">价格</p>
            <div class="flex items-center gap-0 w-full">
              <div class="flex items-center gap-1 flex-1">
                <input v-model.number="priceStart" type="text" placeholder="最低" class="bg-white border border-gray-200 rounded px-2 h-[34px] text-gray-800 text-xs w-[40%] overflow-hidden text-ellipsis focus:outline-none focus:border-gray-200" />
                <span class="text-gray-800 text-sm user-select-none flex-shrink-0">-</span>
                <input v-model.number="priceEnd" type="text" placeholder="最高" class="bg-white border border-gray-200 rounded px-2 h-[34px] text-gray-800 text-xs w-[40%] overflow-hidden text-ellipsis focus:outline-none focus:border-gray-200" />
              </div>
              <button type="button" @click="applyPriceFilter" class="bg-red-700 border-none rounded px-6 h-[34px] text-white text-xs cursor-pointer user-select-none transition-opacity duration-300 flex-shrink-0 hover:opacity-90 whitespace-nowrap ml-auto">确认</button>
            </div>
          </div>

          <!-- 上新时间 Filter -->
          <div class="mb-6">
            <p class="font-bold text-slate-900 mb-4 text-base">上新时间</p>
            <ul class="space-y-2">
              <li v-for="(time, idx) in newTimes" :key="idx">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    :value="time.value"
                    v-model="selectedNewTime"
                    class="mr-2"
                  />
                  <span class="text-sm text-slate-700">{{ time.label }}</span>
                </label>
              </li>
            </ul>
          </div>

          <!-- 发货类型 Filter -->
          <div class="mb-6">
            <p class="font-bold text-slate-900 mb-4 text-base">发货类型</p>
            <ul class="space-y-2">
              <li v-for="(type, idx) in shipmentTypes" :key="idx">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    :value="type.value"
                    v-model="selectedShipmentType"
                    class="mr-2"
                  />
                  <span class="text-sm text-slate-700">{{ type.label }}</span>
                </label>
              </li>
            </ul>
          </div>

          <!-- 交易模式 Filter -->
          <div>
            <p class="font-bold text-slate-900 mb-4 text-base">交易模式</p>
            <ul class="space-y-2">
              <li v-for="(mode, idx) in saleModes" :key="idx">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    :value="mode.value"
                    v-model="selectedSaleMode"
                    class="mr-2"
                  />
                  <span class="text-sm text-slate-700">{{ mode.label }}</span>
                </label>
              </li>
            </ul>
          </div>
          </div>
        </aside>

        <!-- Right Content Area -->
        <main class="lg:col-span-4">
          <!-- Category Carousel (matching HotSalesPage.vue) -->
          <div class="bg-white rounded-lg h-[142px] relative overflow-hidden mb-4">
            <div class="h-full flex items-center justify-between relative px-4 py-5">
              <!-- Carousel Container -->
              <div
                ref="carouselContentRef2"
                class="flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
                @mousedown="onCarouselMouseDown2"
                @mousemove="onCarouselMouseMove2"
                @mouseup="onCarouselMouseUp2"
                @mouseleave="onCarouselMouseUp2"
              >
                <div
                  class="flex gap-0"
                  :class="{ 'transition-transform duration-300': !isDragging2 }"
                  :style="{ transform: `translateX(-${carouselOffset2}px)` }"
                >
                  <div
                    v-for="(category, index) in categories"
                    :key="`bottom-${index}`"
                    @click="selectCategoryCarousel(index, $event)"
                    class="flex-shrink-0 w-[160px] flex flex-col items-center justify-center cursor-pointer text-center gap-2 px-7 py-5 relative"
                    @selectstart.prevent
                  >
                    <img
                      :src="category.image"
                      :alt="category.name"
                      class="w-20 h-20 rounded-full object-cover"
                    />
                    <p class="text-sm font-bold text-gray-800 text-center line-clamp-1">{{ category.name }}</p>
                    <!-- Red triangle indicator for selected category -->
                    <div
                      v-if="selectedCategory === index"
                      class="absolute bottom-0 left-1/2 -translate-x-1/2"
                      style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 12px solid #CB261C;"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <button
                @click="scrollCarouselLeft2"
                :disabled="carouselOffset2 <= 0"
                :style="{ opacity: carouselOffset2 > 0 ? 1 : 0.3, cursor: carouselOffset2 > 0 ? 'pointer' : 'not-allowed' }"
                class="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-14 flex items-center justify-center text-5xl text-gray-400 hover:text-gray-600 z-10 transition-opacity"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                @click="scrollCarouselRight2"
                :disabled="!canScrollRight2"
                :style="{ opacity: canScrollRight2 ? 1 : 0.3, cursor: canScrollRight2 ? 'pointer' : 'not-allowed' }"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-14 flex items-center justify-center text-5xl text-gray-400 hover:text-gray-600 z-10 transition-opacity"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>

          <!-- Toolbar: Select All, Sorting, Actions -->
          <div class="bg-white rounded flex justify-between items-center mb-4 p-3 w-full">
            <div>
              <ul class="flex items-center gap-4 flex-wrap">
              <li class="flex items-center h-[32px] relative z-30">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  class="hidden"
                />
                <div class="flex items-center cursor-pointer" @click="selectAll = !selectAll">
                  <i :class="['inline-block relative w-4 h-4 rounded align-middle flex items-center justify-center', selectAll ? 'bg-white border border-red-700' : 'border border-gray-300 bg-white']">
                    <span v-if="selectAll" class="text-red-700 text-xs leading-none">✓</span>
                  </i>
                </div>
                <span class="ml-2 text-sm">全选</span>
              </li>
              <li class="h-[32px] leading-[32px] text-sm">
                <p>已选 <em class="text-red-600">{{ selectedItems }}</em> 项</p>
              </li>
              <li class="h-[32px] leading-[32px]">
                <a href="javascript:;" @click="publishAll" class="flex items-center gap-2 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-red-700">
                  <img src="https://www.saleyee.com/static/imgs/aa83cfdd3cebd0d28376adfbee407bf3.png" class="w-4 h-4 flex-shrink-0" alt="一键刊登" />
                  <span>一键刊登</span>
                </a>
              </li>
              <li class="h-[32px] leading-[32px]">
                <a href="javascript:;" @click="downloadPackage" class="flex items-center gap-2 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-red-700">
                  <img src="https://www.saleyee.com/static/imgs/cb518a6f8a447ae39c5fd2e61a3792be.png" class="w-4 h-4 flex-shrink-0" alt="下载数据包" />
                  <span>下载数据包</span>
                </a>
              </li>
              <li class="h-[32px] leading-[32px]">
                <a href="javascript:;" @click="addToFavorites" class="flex items-center gap-2 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-red-700">
                  <img src="https://www.saleyee.com/static/imgs/43ad215f8b4093e12361ae2cf252eab7.png" class="w-4 h-4 flex-shrink-0" alt="加入收藏夹" />
                  <span>加入收藏夹</span>
                </a>
              </li>
              </ul>
            </div>
            <div class="flex items-center gap-2 h-[32px]">
              <span class="text-sm text-slate-600">排序:</span>
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="newest">最新</option>
                <option value="inventory">库存由大到小</option>
                <option value="price_asc">价格由小到大</option>
                <option value="price_desc">价格由大到小</option>
              </select>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="grid-products">
            <div
              v-for="p in filteredProducts"
              :key="p.spu"
              class="product-card-grid"
            >
              <div class="product-checkbox">
                <input type="checkbox" :value="p.spu" v-model="selectedProducts" class="hidden" />
                <i :class="['checkbox', selectedProducts.includes(p.spu) ? 'checked' : '']" @click.stop="toggleProduct(p.spu)">
                  <span v-if="selectedProducts.includes(p.spu)" class="text-red-700 text-xs leading-none">✓</span>
                </i>
              </div>
              <a :href="`/item/${p.spu}.html`" class="product-image">
                <img :src="p.mainImage" :alt="p.title" />
              </a>
              <div class="product-content">
                <h3 class="product-title">
                  <a :href="`/item/${p.spu}.html`">{{ p.title }}</a>
                </h3>
                <div class="product-price">
                  <span class="price">{{ formatPrice(p._price) }}</span>
                  <span v-if="p._originalPrice" class="original">{{ formatPrice(p._originalPrice) }}</span>
                </div>
                <div class="product-actions-bottom">
                  <a title="一键刊登" href="javascript:;" class="action-icon action-publish-small">
                    <img loading="lazy" src="/frondend/images/newPage/publish-icon.png" alt="一键刊登" />
                  </a>
                  <a title="下载" href="javascript:;" class="action-icon action-download-small">
                    <img loading="lazy" src="/frondend/images/newPage/download-icon.png" alt="下载" />
                  </a>
                  <a title="收藏" href="javascript:;" class="action-icon action-collect-small">
                    <img loading="lazy" src="/frondend/images/newPage/collect-icon.png" alt="收藏" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="bg-white rounded-lg p-4 mt-4 flex items-center justify-between">
            <div class="text-sm text-slate-600">
              共{{ totalPages }}页，前往第
              <input v-model.number="pageNum" type="text" class="w-12 px-2 py-1 border border-gray-300 rounded" />
              页
              <button
                @click="goToPage"
                class="ml-2 px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100"
              >
                GO
              </button>
            </div>
            <ul class="flex gap-1">
              <li v-for="i in Math.min(11, totalPages)" :key="i">
                <a
                  href="javascript:;"
                  @click="currentPage = i; loadFilteredProducts()"
                  :class="[
                    'px-3 py-2 border rounded text-sm',
                    currentPage === i
                      ? 'bg-red-600 text-white border-red-600'
                      : 'border-gray-300 text-slate-700 hover:bg-gray-100'
                  ]"
                >
                  {{ i }}
                </a>
              </li>
              <li v-if="currentPage < totalPages">
                <a href="javascript:;" @click="currentPage = Math.min(currentPage + 1, totalPages); loadFilteredProducts()" class="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100">下一页</a>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
    </div>

    <SiteFooter />
    <RightFloatNav />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import RightFloatNav from '@/components/RightFloatNav.vue'
import { setupNewPageMockApi } from '@/services/newPageMockApi'
import { products as prodList } from '@/data/products'

// API data state
const hotSlideItems = ref([])
const categoriesData = ref([])
const allProducts = ref([])
const apiLoading = ref(false)
const apiError = ref(null)

// Categories for carousel (will be populated from API)
const categories = ref([])

const selectedCategory = ref(0)

// Hot Sales menu categories (will be populated from API)
const hotSalesCategories = ref([])
const selectedHotSalesCategory = ref(0)

// Weekly featured carousel state
const currentWeeklyIdx = ref(0)
const weeklyFeatured = computed(() => hotSlideItems.value.slice(0, 7))

function nextWeekly() {
  if (weeklyFeatured.value.length > 0) {
    currentWeeklyIdx.value = (currentWeeklyIdx.value + 1) % weeklyFeatured.value.length
  }
}

function prevWeekly() {
  if (weeklyFeatured.value.length > 0) {
    currentWeeklyIdx.value = (currentWeeklyIdx.value - 1 + weeklyFeatured.value.length) % weeklyFeatured.value.length
  }
}

// Limit hot sales section to 8 items from the selected category
const hotSalesTop8 = computed(() => {
  if (categoriesData.value.length === 0) return []
  const category = categoriesData.value[selectedHotSalesCategory.value]
  return category?.products || []
})

function formatPrice(n) {
  return `$${n.toFixed(2)}`
}

// Filter controls
const inventoryStart = ref(null)
const inventoryEnd = ref(null)
const priceStart = ref(null)
const priceEnd = ref(null)

const newTimes = [
  { label: '全部', value: '' },
  { label: '近7天', value: '7' },
  { label: '近15天', value: '15' },
  { label: '���30天', value: '30' },
  { label: '近60天', value: '60' },
]
const selectedNewTime = ref('')

const shipmentTypes = [
  { label: '全部', value: '' },
  { label: '平台发货', value: '0' },
  { label: '供应商自发货', value: '1' },
]
const selectedShipmentType = ref('')

const saleModes = [
  { label: '全部', value: '' },
  { label: '一件代发', value: '0' },
  { label: '批发', value: '1' },
  { label: '圈货', value: '2' },
  { label: '自提', value: '3' },
]
const selectedSaleMode = ref('')

// Carousel state for category carousel
const carouselOffset2 = ref(0)
const carouselContainerWidth2 = ref(0)
const carouselContentRef2 = ref(null)
const isDragging2 = ref(false)
const dragStartX2 = ref(0)
const dragStartOffset2 = ref(0)

// Product selection and sorting
const selectAll = ref(false)
const selectedProducts = ref([])
const sortBy = ref('newest')
const currentPage = ref(1)
const pageNum = ref(null)
const totalPages = ref(1)

const selectedItems = computed(() => {
  const pageSkus = filteredProducts.value.map(p => p.spu)
  return pageSkus.filter(sku => selectedProducts.value.includes(sku)).length
})

function toggleProduct(sku) {
  const idx = selectedProducts.value.indexOf(sku)
  if (idx === -1) selectedProducts.value.push(sku)
  else selectedProducts.value.splice(idx, 1)
  const pageSkus = filteredProducts.value.map(p => p.spu)
  selectAll.value = pageSkus.length > 0 && pageSkus.every(s => selectedProducts.value.includes(s))
}

function applyInventoryFilter() {
  currentPage.value = 1
  loadFilteredProducts()
}

function applyPriceFilter() {
  currentPage.value = 1
  loadFilteredProducts()
}

const selectCategoryCarousel = (index, e) => {
  const dragDistance = Math.abs(dragStartX2.value - (e?.clientX || 0))
  if (dragDistance > 5) return
  selectedCategory.value = index
  currentPage.value = 1
  loadFilteredProducts()
}

// Carousel drag methods for category carousel
const onCarouselMouseDown2 = (e) => {
  isDragging2.value = true
  dragStartX2.value = e.clientX
  dragStartOffset2.value = carouselOffset2.value
}

const onCarouselMouseMove2 = (e) => {
  if (!isDragging2.value) return
  const containerWidth = carouselContainerWidth2.value || 800
  const maxOffset = Math.max(0, categories.value.length * 160 - containerWidth)
  const dragDistance = dragStartX2.value - e.clientX
  const newOffset = dragStartOffset2.value + dragDistance
  carouselOffset2.value = Math.max(0, Math.min(newOffset, maxOffset))
}

const onCarouselMouseUp2 = () => {
  isDragging2.value = false
}

const canScrollRight2 = computed(() => {
  const containerWidth = carouselContainerWidth2.value || 800
  const maxOffset = Math.max(0, categories.value.length * 160 - containerWidth)
  return carouselOffset2.value < maxOffset
})

const scrollCarouselRight2 = () => {
  const containerWidth = carouselContainerWidth2.value || 800
  const maxOffset = Math.max(0, categories.value.length * 160 - containerWidth)
  carouselOffset2.value = Math.min(carouselOffset2.value + 160, maxOffset)
}

const scrollCarouselLeft2 = () => {
  carouselOffset2.value = Math.max(0, carouselOffset2.value - 160)
}

function goToPage() {
  if (pageNum.value && pageNum.value > 0 && pageNum.value <= totalPages.value) {
    currentPage.value = pageNum.value
    loadFilteredProducts()
  }
}

// Load data from API
async function loadInitialData() {
  apiLoading.value = true
  apiError.value = null
  try {
    const [hotResponse, categoriesResponse, allCategoriesResponse] = await Promise.all([
      fetch('/api/new-page/hot-slide-items'),
      fetch('/api/new-page/categories-with-products'),
      fetch('/api/new-page/categories')
    ])

    const hotData = await hotResponse.json()
    const categoriesRawData = await categoriesResponse.json()
    const allCategoriesData = await allCategoriesResponse.json()

    if (hotData.success) {
      hotSlideItems.value = hotData.data
    }

    if (categoriesRawData.success) {
      categoriesData.value = categoriesRawData.data
      hotSalesCategories.value = categoriesRawData.data.map(c => c.title)
    }

    if (allCategoriesData.success) {
      categories.value = allCategoriesData.data
    }

    // Load initial products
    await loadFilteredProducts()
  } catch (error) {
    apiError.value = error.message
    console.error('Failed to load initial data:', error)
  } finally {
    apiLoading.value = false
  }
}

// Load filtered products from API
async function loadFilteredProducts() {
  apiLoading.value = true
  apiError.value = null
  try {
    // Get category ID if a category is selected
    let categoryId = null
    if (selectedCategory.value > 0 && categories.value.length > selectedCategory.value) {
      categoryId = categories.value[selectedCategory.value].id
    }

    const params = new URLSearchParams()
    params.append('page', currentPage.value)
    params.append('pageSize', 20)

    if (categoryId) params.append('categoryId', categoryId)
    if (inventoryStart.value !== null) params.append('stockMin', inventoryStart.value)
    if (inventoryEnd.value !== null) params.append('stockMax', inventoryEnd.value)
    if (priceStart.value !== null) params.append('priceMin', priceStart.value)
    if (priceEnd.value !== null) params.append('priceMax', priceEnd.value)
    if (selectedNewTime.value) params.append('daysNew', selectedNewTime.value)

    // Map shipping type values
    let shippingType = 'all'
    if (selectedShipmentType.value === '0') shippingType = 'platform'
    else if (selectedShipmentType.value === '1') shippingType = 'supplier'
    params.append('shippingType', shippingType)

    // Map trade mode values
    let tradeMode = 'all'
    if (selectedSaleMode.value === '0') tradeMode = 'dropship'
    else if (selectedSaleMode.value === '1') tradeMode = 'wholesale'
    else if (selectedSaleMode.value === '2') tradeMode = 'circle'
    else if (selectedSaleMode.value === '3') tradeMode = 'pickup'
    params.append('tradeMode', tradeMode)

    // Map sort values
    const sortMapping = {
      'newest': 'newest',
      'inventory': 'sales',
      'price_asc': 'price_asc',
      'price_desc': 'price_desc'
    }
    const sortParam = sortMapping[sortBy.value] || 'newest'
    params.append('sortBy', sortParam)

    const response = await fetch(`/api/new-page/products?${params}`)
    const data = await response.json()

    if (data.success) {
      allProducts.value = data.data.products
      totalPages.value = data.data.pagination.totalPages || 1
    } else {
      apiError.value = data.error
    }
  } catch (error) {
    apiError.value = error.message
    console.error('Failed to load products:', error)
  } finally {
    apiLoading.value = false
  }
}

const publishAll = () => {
  console.log('Publish', selectedItems.value, 'items')
}

const downloadPackage = () => {
  console.log('Download package')
}

const addToFavorites = () => {
  console.log('Add to favorites')
}

// Filtered products - loaded from API based on filters
const filteredProducts = computed(() => {
  return allProducts.value
})

watch(selectAll, (val) => {
  const pageSkus = filteredProducts.value.map(p => p.spu)
  if (val) {
    const set = new Set([...selectedProducts.value, ...pageSkus])
    selectedProducts.value = Array.from(set)
  } else {
    const pageSet = new Set(filteredProducts.value.map(p => p.spu))
    selectedProducts.value = selectedProducts.value.filter(sku => !pageSet.has(sku))
  }
})

watch(filteredProducts, () => {
  const pageSkus = filteredProducts.value.map(p => p.spu)
  if (pageSkus.length === 0) {
    selectAll.value = false
    return
  }
  selectAll.value = pageSkus.every(sku => selectedProducts.value.includes(sku))
})

// Watch for filter/sort changes
watch([selectedNewTime, selectedShipmentType, selectedSaleMode, sortBy], () => {
  currentPage.value = 1
  loadFilteredProducts()
})

// Initialize API data on mount
onMounted(() => {
  setupNewPageMockApi()
  loadInitialData()
})
</script>

<style scoped>
:root {
  --primary: #CB261C;
}

.bg-primary { background-color: var(--primary); }
.text-primary { color: var(--primary); }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Product grid styles */
.grid-products { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 12px; 
}

.product-card-grid { 
  position: relative; 
  box-sizing: border-box; 
  width: calc((100% - 48px) / 5); 
  background: #fff; 
  border-radius: 3px; 
  overflow: hidden; 
}

.product-card-grid .product-image { 
  width: 100%; 
  aspect-ratio: 1 / 1; 
  display: block; 
  position: relative; 
  overflow: hidden; 
}

.product-card-grid .product-image img { 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  display: block; 
}

.product-card-grid .product-content { 
  padding: 3px; 
}

.product-checkbox { 
  position: absolute; 
  left: 3px; 
  top: 3px; 
  z-index: 10; 
  cursor: pointer; 
}

.checkbox { 
  display: inline-flex; 
  align-items: center; 
  justify-content: center; 
  width: 14px; 
  height: 14px; 
  border: 1px solid #ccc; 
  border-radius: 2px; 
  background: #fff; 
  cursor: pointer; 
  transition: all 0.2s; 
  flex-shrink: 0; 
}

.checkbox.checked { 
  background: #fff; 
  border-color: #CB261C; 
  color: #CB261C; 
  font-size: 10px; 
  line-height: 1; 
}

.product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  color: #333;
  margin: 0 0 2px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  font-weight: 500;
}

.product-title a { 
  color: inherit; 
  text-decoration: none; 
}

.product-title a:hover { 
  color: #CB261C; 
}

.product-price { 
  display: flex; 
  gap: 4px; 
  align-items: center; 
  margin-top: 4px; 
}

.product-price .price { 
  color: #cb261c; 
  font-weight: 700; 
  font-size: 14px; 
}

.product-price .original { 
  color: #999; 
  font-size: 11px; 
  text-decoration: line-through; 
}

.product-actions-bottom {
  padding: 6px 0;
  margin-top: 6px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
  background-color: transparent;
}

.action-icon {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  height: 18px;
  width: 18px;
  flex-shrink: 0;
}

.action-icon img {
  width: 16px;
  height: auto;
  display: inline-block;
}

@media (max-width: 1024px) {
  .product-card-grid { width: calc((100% - 24px) / 3); }
}

@media (max-width: 640px) {
  .product-card-grid { width: calc(50% - 6px); }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

a:hover {
  color: var(--primary);
}
</style>
