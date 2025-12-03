<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面内部样式：文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="min-h-screen">
    <SiteHeader />
    <div class="new_promotion_container">

    <!-- Hero -->
    <div class="w-full" style="padding: 40px 20px;">
      <div class="mx-auto px-4" style="width: 100%; max-width: 1500px; margin: 0 auto;">
        <div class="flex items-center justify-center gap-6">
          <img loading="lazy" src="/frondend/images/DiscountSalePage/promotion_icon.png" alt="promotion" style="width: 48px; height: 48px;" />
          <div class="text-center">
            <h1 class="text-white text-4xl font-bold">折扣专区</h1>
            <p class="text-white mt-2">限时优惠 — 抢购进行中</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Top embedded white recommendations (countdown + list) -->
    <div class="mx-auto px-4 -mt-4 mb-6" style="width: 100%; max-width: 1500px; margin: 0 auto;">
      <div class="promo-card relative">
        <div class="promo-inner">
          <div class="promo-header flex items-center justify-between mb-3">
            <h2 class="text-lg font-semibold">今天折扣精选</h2>
            <div class="text-sm text-slate-500">共 {{ recommendedTop.length }} 款</div>
          </div>

          <ul class="promo-grid">
            <li v-for="p in recommendedTop" :key="p.spu" class="promo-item">
              <a :href="`/item/${p.spu}.html?warehouseId=${p.warehouses[0]}`" target="_blank" class="promo-thumb">
                <img :src="p.image" :alt="p.title" />
              </a>
              <div class="promo-info">
                <a :href="`/item/${p.spu}.html?warehouseId=${p.warehouses[0]}`" target="_blank" class="promo-title">{{ p.title }}</a>
                <div class="promo-meta">
                  <span class="price">{{ formatPrice(p.price) }}</span>
                  <span class="original">{{ formatPrice(p.originalPrice) }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tabbed product block below discount area -->
    <div class="mx-auto px-4" style="width: 100%; max-width: 1500px; margin: 0 auto;">
      <div class="tab-section mt-6">
        <ul class="tab-nav flex">
          <li :class="['tab-item-tab', activeTab === 'limited' ? 'tab-active' : '']" @click="activeTab = 'limited'">限量供应</li>
          <li :class="['tab-item-tab', activeTab === 'new' ? 'tab-active' : '']" @click="activeTab = 'new'">新品特惠</li>
        </ul>

        <div class="tab-content mt-6">
          <div class="promo-inner">
          <div v-show="activeTab === 'limited'" class="tab-rows">
            <ul v-for="(row, rIdx) in limitedRows" :key="'limited-row-' + rIdx" class="tab-row">
              <li v-for="(p, i) in row" :key="p.spu + '-l' + i" class="product-card">
                <a :href="`/item/${p.spu}.html?warehouseId=${p.warehouses[0]}`" target="_blank" class="product-image">
                  <img :src="p.image" :alt="p.title" loading="lazy" />
                </a>
                <div class="product-content">
                  <h3 class="product-title">{{ p.title }}</h3>
                  <div class="product-price">
                    <span class="price">{{ formatPrice(p.price) }}</span>
                    <span class="original">{{ formatPrice(p.originalPrice) }}</span>
                  </div>
                  <div class="product-actions">
                    <button class="btn-collect" type="button">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/collect.png" />
                      <span>收藏</span>
                    </button>
                    <a href="javascript:;" class="action-icon">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/down2.png" />
                    </a>
                    <a href="javascript:;" class="action-icon" title="一键刊登">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/flasting_logo.png" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div v-show="activeTab === 'new'" class="tab-rows">
            <ul v-for="(row, rIdx) in newRows" :key="'new-row-' + rIdx" class="tab-row">
              <li v-for="(p, i) in row" :key="p.spu + '-n' + i" class="product-card">
                <a :href="`/item/${p.spu}.html?warehouseId=${p.warehouses[0]}`" target="_blank" class="product-image">
                  <img :src="p.image" :alt="p.title" loading="lazy" />
                </a>
                <div class="product-content">
                  <h3 class="product-title">{{ p.title }}</h3>
                  <div class="product-price">
                    <span class="price">{{ formatPrice(p.price) }}</span>
                    <span class="original">{{ formatPrice(p.originalPrice) }}</span>
                  </div>
                  <div class="product-actions">
                    <button class="btn-collect" type="button">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/collect.png" />
                      <span>收藏</span>
                    </button>
                    <a href="javascript:;" class="action-icon">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/down2.png" />
                    </a>
                    <a href="javascript:;" class="action-icon" title="一键刊登">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/flasting_logo.png" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product listing with filter and grid -->
    <div class="mx-auto px-4 py-4" style="width: 100%; max-width: 1500px; margin: 0 auto;">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <!-- Left Sidebar: Filter conditions -->
        <aside class="lg:col-span-1">
          <div class="bg-white rounded-sm sticky top-20 max-h-[70vh] overflow-y-auto p-4" style="padding: 12px 10px;">
            <!-- Category selectors -->
            <div class="mb-4">
              <p class="text-gray-800 text-base font-bold mb-3 leading-tight">商品分类</p>
              <ul class="list-none p-0 m-0 flex flex-col gap-2">
                <!-- 一级分类 -->
                <li class="flex relative">
                  <div class="relative select-none w-full">
                    <div class="select-none relative cursor-pointer" @click="openDropdown = openDropdown === 'first' ? null : 'first'">
                      <input type="text" :value="getCategoryLabel('first', firstCategory)" readonly class="w-full h-[38px] bg-white border border-gray-200 rounded px-2.5 pr-7 cursor-pointer transition-colors duration-300 user-select-none text-gray-800 text-sm leading-[18.2px] overflow-hidden text-ellipsis outline-none" />
                      <i class="dropdown-arrow absolute right-2.5 top-1/2 -mt-0.5 transition-transform duration-300" :class="{ 'dropdown-icon-open': openDropdown === 'first' }"></i>
                    </div>
                    <ul v-show="openDropdown === 'first'" class="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 rounded-b list-none p-0 m-0 z-10 max-h-52 overflow-y-auto">
                      <li class="px-2.5 py-2.5 text-gray-800 text-sm cursor-pointer transition-colors duration-200 user-select-none hover:bg-gray-100 hover:text-red-700" @click="firstCategory = '0'; secondCategory = '0'; thirdCategory = '0'; openDropdown = null">一级分类</li>
                      <li v-for="cat in categoriesData" :key="cat.id" class="px-2.5 py-2.5 text-gray-800 text-sm cursor-pointer transition-colors duration-200 user-select-none hover:bg-gray-100 hover:text-red-700" @click="firstCategory = String(cat.id); secondCategory = '0'; thirdCategory = '0'; openDropdown = null">{{ cat.title }}</li>
                    </ul>
                  </div>
                </li>
                <!-- 二级分类 -->
                <li class="flex relative">
                  <div class="relative select-none w-full">
                    <div class="select-none relative cursor-pointer" @click="openDropdown = openDropdown === 'second' ? null : 'second'">
                      <input type="text" :value="getCategoryLabel('second', secondCategory)" readonly class="w-full h-[38px] bg-white border border-gray-200 rounded px-2.5 pr-7 cursor-pointer transition-colors duration-300 user-select-none text-gray-800 text-sm leading-[18.2px] overflow-hidden text-ellipsis outline-none" />
                      <i class="dropdown-arrow absolute right-2.5 top-1/2 -mt-0.5 transition-transform duration-300" :class="{ 'dropdown-icon-open': openDropdown === 'second' }"></i>
                    </div>
                    <ul v-show="openDropdown === 'second'" class="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 rounded-b list-none p-0 m-0 z-10 max-h-52 overflow-y-auto">
                      <li class="px-2.5 py-2.5 text-gray-800 text-sm cursor-pointer transition-colors duration-200 user-select-none hover:bg-gray-100 hover:text-red-700" @click="secondCategory = '0'; thirdCategory = '0'; openDropdown = null">二级分类</li>
                      <li v-for="subcat in (firstCategory !== '0' && categoriesData.find(c => c.id === parseInt(firstCategory))?.children) || []" :key="subcat.id" class="px-2.5 py-2.5 text-gray-800 text-sm cursor-pointer transition-colors duration-200 user-select-none hover:bg-gray-100 hover:text-red-700" @click="secondCategory = String(subcat.id); thirdCategory = '0'; openDropdown = null">{{ subcat.title }}</li>
                    </ul>
                  </div>
                </li>
                <!-- 三级分类 -->
                <li class="flex relative">
                  <div class="relative select-none w-full">
                    <div class="select-none relative cursor-pointer" @click="openDropdown = openDropdown === 'third' ? null : 'third'">
                      <input type="text" :value="getCategoryLabel('third', thirdCategory)" readonly class="w-full h-[38px] bg-white border border-gray-200 rounded px-2.5 pr-7 cursor-pointer transition-colors duration-300 user-select-none text-gray-800 text-sm leading-[18.2px] overflow-hidden text-ellipsis outline-none" />
                      <i class="dropdown-arrow absolute right-2.5 top-1/2 -mt-0.5 transition-transform duration-300" :class="{ 'dropdown-icon-open': openDropdown === 'third' }"></i>
                    </div>
                    <ul v-show="openDropdown === 'third'" class="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 rounded-b list-none p-0 m-0 z-10 max-h-52 overflow-y-auto">
                      <li class="px-2.5 py-2.5 text-gray-800 text-sm cursor-pointer transition-colors duration-200 user-select-none hover:bg-gray-100 hover:text-red-700" @click="thirdCategory = '0'; openDropdown = null">三级分类</li>
                      <li v-for="item in (secondCategory !== '0' && categoriesData.find(c => c.id === parseInt(firstCategory))?.children?.find(c => c.id === parseInt(secondCategory))?.items) || []" :key="item.id" class="px-2.5 py-2.5 text-gray-800 text-sm cursor-pointer transition-colors duration-200 user-select-none hover:bg-gray-100 hover:text-red-700" @click="thirdCategory = String(item.id); openDropdown = null">{{ item.title }}</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Discount strength -->
            <div class="mb-4">
              <p class="text-gray-800 text-base font-bold mb-3 leading-tight">折扣力度</p>
              <ul class="list-none p-0 m-0 flex flex-col gap-2">
                <li class="flex items-center mb-2 cursor-pointer" @click="discountRange = 'all'">
                  <input type="radio" name="DiscountStrength" value="all" v-model="discountRange" class="hidden" />
                  <div class="flex items-center cursor-pointer user-select-none gap-2">
                    <i :class="['radio-icon w-[18px] h-[18px] border-2 rounded-full bg-white cursor-pointer flex items-center justify-center relative flex-shrink-0', discountRange === 'all' ? 'border-red-700 bg-red-700' : 'border-gray-400']"></i>
                    <div class="text-gray-800 text-sm cursor-pointer user-select-none">��部</div>
                  </div>
                </li>
                <li class="flex items-center mb-2 cursor-pointer" @click="discountRange = '>=1'">
                  <input type="radio" name="DiscountStrength" value=">=1" v-model="discountRange" class="hidden" />
                  <div class="flex items-center cursor-pointer user-select-none gap-2">
                    <i :class="['radio-icon w-[18px] h-[18px] border-2 rounded-full bg-white cursor-pointer flex items-center justify-center relative flex-shrink-0', discountRange === '>=1' ? 'border-red-700 bg-red-700' : 'border-gray-400']"></i>
                    <div class="text-gray-800 text-sm cursor-pointer user-select-none">1%-10%</div>
                  </div>
                </li>
                <li class="flex items-center mb-2 cursor-pointer" @click="discountRange = '>=2'">
                  <input type="radio" name="DiscountStrength" value=">=2" v-model="discountRange" class="hidden" />
                  <div class="flex items-center cursor-pointer user-select-none gap-2">
                    <i :class="['radio-icon w-[18px] h-[18px] border-2 rounded-full bg-white cursor-pointer flex items-center justify-center relative flex-shrink-0', discountRange === '>=2' ? 'border-red-700 bg-red-700' : 'border-gray-400']"></i>
                    <div class="text-gray-800 text-sm cursor-pointer user-select-none">10%-20%</div>
                  </div>
                </li>
                <li class="flex items-center mb-2 cursor-pointer" @click="discountRange = '>=3'">
                  <input type="radio" name="DiscountStrength" value=">=3" v-model="discountRange" class="hidden" />
                  <div class="flex items-center cursor-pointer user-select-none gap-2">
                    <i :class="['radio-icon w-[18px] h-[18px] border-2 rounded-full bg-white cursor-pointer flex items-center justify-center relative flex-shrink-0', discountRange === '>=3' ? 'border-red-700 bg-red-700' : 'border-gray-400']"></i>
                    <div class="text-gray-800 text-sm cursor-pointer user-select-none">20%-50%</div>
                  </div>
                </li>
                <li class="flex items-center mb-2 cursor-pointer" @click="discountRange = '>=4'">
                  <input type="radio" name="DiscountStrength" value=">=4" v-model="discountRange" class="hidden" />
                  <div class="flex items-center cursor-pointer user-select-none gap-2">
                    <i :class="['radio-icon w-[18px] h-[18px] border-2 rounded-full bg-white cursor-pointer flex items-center justify-center relative flex-shrink-0', discountRange === '>=4' ? 'border-red-700 bg-red-700' : 'border-gray-400']"></i>
                    <div class="text-gray-800 text-sm cursor-pointer user-select-none">50%以上</div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Price range -->
            <div class="mb-4">
              <p class="text-gray-800 text-base font-bold mb-3 leading-tight">价格区间</p>
              <div class="flex items-center gap-0 w-full">
                <div class="flex items-center gap-1 flex-1">
                  <input type="text" v-model="minPrice" placeholder="最低" class="bg-white border border-gray-200 rounded px-2 h-[34px] text-gray-800 text-xs w-[40%] overflow-hidden text-ellipsis focus:outline-none focus:border-gray-200" />
                  <span class="text-gray-800 text-sm user-select-none flex-shrink-0">-</span>
                  <input type="text" v-model="maxPrice" placeholder="最高" class="bg-white border border-gray-200 rounded px-2 h-[34px] text-gray-800 text-xs w-[40%] overflow-hidden text-ellipsis focus:outline-none focus:border-gray-200" />
                </div>
              </div>
            </div>

            <!-- Confirm button for all filters -->
            <div class="mb-0">
              <button type="button" @click="applyFilters" class="w-full bg-red-700 border-none rounded px-4 h-[38px] text-white text-sm font-semibold cursor-pointer user-select-none transition-opacity duration-300 hover:opacity-90">确��筛选</button>
            </div>

          </div>
        </aside>

        <!-- Right side: Product grid and toolbar -->
        <main class="lg:col-span-4">
          <!-- Toolbar -->
          <div class="bg-white rounded-t flex justify-between items-center mb-0 p-2 w-full">
            <div>
              <ul class="flex items-center gap-4 flex-wrap">
                <li class="flex items-center h-[32px] relative z-30">
                  <input type="checkbox" v-model="selectAll" class="hidden" />
                  <div class="flex items-center cursor-pointer" @click="selectAll = !selectAll">
                    <i :class="['inline-block relative w-4 h-4 rounded align-middle flex items-center justify-center', selectAll ? 'bg-white border border-red-700' : 'border border-gray-300 bg-white']">
                      <span v-if="selectAll" class="text-red-700 text-xs leading-none">✓</span>
                    </i>
                  </div>
                  <span class="ml-2 text-sm">全选</span>
                </li>
                <li class="h-[32px] leading-[32px] text-sm">
                  <p>已选 <em class="text-red-600">{{ selectedCount }}</em> 项</p>
                </li>
                <li class="h-[32px] leading-[32px]">
                  <a href="javascript:;" @click="publishAll" class="flex items-center gap-2 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-red-700">
                    <img src="/frondend/images/DiscountSalePage/publish_icon.png" class="w-4 h-4 flex-shrink-0" />
                    <span>一键刊登</span>
                  </a>
                </li>
                <li class="h-[32px] leading-[32px]">
                  <a href="javascript:;" @click="downloadPackage" class="flex items-center gap-2 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-red-700">
                    <img src="/frondend/images/DiscountSalePage/download_icon.png" class="w-4 h-4 flex-shrink-0" />
                    <span>下载数据包</span>
                  </a>
                </li>
                <li class="h-[32px] leading-[32px]">
                  <a href="javascript:;" @click="addToFavorites" class="flex items-center gap-2 cursor-pointer transition-colors duration-300 text-gray-500 hover:text-red-700">
                    <img src="/frondend/images/DiscountSalePage/favorites_icon.png" class="w-4 h-4 flex-shrink-0" />
                    <span>加入收藏夹</span>
                  </a>
                </li>
                <li class="h-[32px] relative">
                  <div @click="exportOpen = !exportOpen" class="flex items-center cursor-pointer h-[32px] relative z-10 gap-2 text-gray-500 hover:text-red-700 transition-colors duration-300">
                    <img src="/frondend/images/DiscountSalePage/derive_icon.png" class="w-4 h-4 flex-shrink-0" />
                    <span class="text-sm">导出促销商品信息</span>
                    <i class="text-gray-400 transition-transform duration-300" :style="{ transform: exportOpen ? 'rotate(180deg)' : 'rotate(0)' }">▼</i>
                    <div v-show="exportOpen" class="absolute left-[22px] top-[20px] bg-white rounded shadow-md p-1 min-w-[150px] z-20">
                      <a href="javascript:;" @click.prevent="exportAll" class="block px-3 py-2 text-sm hover:bg-gray-50 text-left">导出全部</a>
                      <a href="javascript:;" @click.prevent="exportSelected" class="block px-3 py-2 text-sm hover:bg-gray-50 text-left">导出所选</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="flex items-center gap-2 h-[32px]">
              <p class="text-sm">排序:</p>
              <select v-model="sortBy" class="border border-gray-300 rounded bg-white px-3 h-[38px] text-sm cursor-pointer">
                <option value="default">综合</option>
                <option value="latest">最新参与活动</option>
                <option value="stock-desc">库存由大到小</option>
                <option value="discount-desc">折扣由高到低</option>
                <option value="price-asc">价格由小到大</option>
                <option value="price-desc">价格由大到小</option>
              </select>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="px-0 py-4">
            <div class="grid-products">
              <div v-for="p in pagedProducts" :key="p.spu" class="product-card-grid">
                <div class="product-checkbox">
                  <input type="checkbox" :value="p.spu" v-model="selectedSkus" class="hidden" />
                  <i :class="['checkbox', selectedSkus.includes(p.spu) ? 'checked' : '']" @click.stop="toggleSelection(p.spu)">
                    <span v-if="selectedSkus.includes(p.spu)" class="text-red-700 text-xs leading-none">✓</span>
                  </i>
                </div>

                <a :href="`/item/${p.spu}.html?warehouseId=${p.warehouses[0]}`" target="_blank" class="product-image">
                  <img :src="p.image" :alt="p.title" loading="lazy" />
                </a>

                <div class="product-content">
                  <a :href="`/item/${p.spu}.html?warehouseId=${p.warehouses[0]}`" target="_blank" class="product-title">{{ p.title }}</a>

                  <div class="product-price">
                    <span class="price">{{ formatPrice(p.price) }}</span>
                    <span class="original">{{ formatPrice(p.originalPrice) }}</span>
                  </div>

                  <div class="product-actions">
                    <button class="btn-collect" type="button">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/collect.png" />
                      <span>收藏</span>
                    </button>
                    <a href="javascript:;" class="action-icon">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/down2.png" />
                    </a>
                    <a href="javascript:;" class="action-icon" title="一键刊登">
                      <img loading="lazy" src="/frondend/images/DiscountSalePage/flasting_logo.png" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center gap-0.5 py-4">
              <button @click="page = Math.max(1, page - 1)" :disabled="page === 1" class="px-3 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm">上一页</button>
              <button v-for="n in pages" :key="n" @click="page = n" :class="['px-3 py-1 border border-gray-300 text-sm', page === n ? 'bg-red-700 text-white' : 'bg-white']">{{ n }}</button>
              <button @click="page = Math.min(totalPages, page + 1)" :disabled="page === totalPages" class="px-3 py-1 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm">下一页</button>
            </div>
          </div>
        </main>
      </div>
    </div>

    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import {
  getCategories,
  getTodayDiscounts,
  getLimitedSupplyProducts,
  getNewLaunchDiscounts,
  getDiscountProducts
} from '@/services/mockApi'

// ============================================
// 数据声明
// ============================================
const recommendedTop = ref([])
const limitedSupplyProducts = ref([])
const newLaunchProducts = ref([])
const allProducts = ref([])
const categoriesData = ref([])
const pagedProducts = ref([])

// ============================================
// 数据加载（页面初始化）
// ============================================
onMounted(async () => {
  try {
    // 加载分类数据
    const categoriesRes = await getCategories()
    if (categoriesRes.success) {
      categoriesData.value = categoriesRes.data
    }

    // 加载三个特殊区域的商品数据 - 必须按照顺序加载
    const todayRes = await getTodayDiscounts()
    if (todayRes.success) {
      recommendedTop.value = todayRes.data.map(p => ({
        ...p,
        spu: String(p.id),
        image: p.thumbnailImage,
        price: p.sellingPrice,
        originalPrice: p.originalPrice,
        warehouses: ['US']
      }))
    }

    const limitedRes = await getLimitedSupplyProducts()
    if (limitedRes.success) {
      limitedSupplyProducts.value = limitedRes.data.map(p => ({
        ...p,
        spu: String(p.id),
        image: p.thumbnailImage,
        price: p.sellingPrice,
        originalPrice: p.originalPrice,
        warehouses: ['US']
      }))
    }

    const newRes = await getNewLaunchDiscounts()
    if (newRes.success) {
      newLaunchProducts.value = newRes.data.map(p => ({
        ...p,
        spu: String(p.id),
        image: p.thumbnailImage,
        price: p.sellingPrice,
        originalPrice: p.originalPrice,
        warehouses: ['US']
      }))
    }

    // 加载初始的商品列表（分页用）
    await loadDiscountProducts()
  } catch (error) {
    console.error('Failed to load data:', error)
  }
})

// 扩展用于制表符块的网格列表
const limitedSupplyGrid = computed(() => {
  const result = []
  if (limitedSupplyProducts.value.length > 0) {
    for (let i = 0; i < 12; i++) {
      result.push(limitedSupplyProducts.value[i % limitedSupplyProducts.value.length])
    }
  }
  return result
})

const newDealsGrid = computed(() => {
  const result = []
  if (newLaunchProducts.value.length > 0) {
    for (let i = 0; i < 12; i++) {
      result.push(newLaunchProducts.value[i % newLaunchProducts.value.length])
    }
  }
  return result
})

// helper to chunk arrays into rows of N
function chunkArray(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

const limitedRows = computed(() => chunkArray(limitedSupplyGrid.value, 6))
const newRows = computed(() => chunkArray(newDealsGrid.value, 6))

const activeTab = ref('limited')
const firstCategory = ref('0')
const secondCategory = ref('0')
const thirdCategory = ref('0')
const openDropdown = ref(null)

// top bar state
const selectAll = ref(false)
const selectedSkus = ref([])
const selectedCount = computed(() => selectedSkus.value.length)
const exportOpen = ref(false)

function publishAll() {
  alert('一键刊登：' + selectedCount.value + ' 项')
}
function downloadPackage() {
  alert('下载数据包')
}
function addToFavorites() {
  alert('加入收���夹')
}
function exportAll() {
  alert('导出全部')
  exportOpen.value = false
}
function exportSelected() {
  alert('导出所选：' + selectedCount.value)
  exportOpen.value = false
}

function toggleSelection(sku) {
  const idx = selectedSkus.value.indexOf(sku)
  if (idx === -1) selectedSkus.value.push(sku)
  else selectedSkus.value.splice(idx, 1)
  const pageSkus = pagedProducts.value.map(p => p.spu)
  selectAll.value = pageSkus.length > 0 && pageSkus.every(s => selectedSkus.value.includes(s))
}

// filters & pagination
const minPrice = ref(null)
const maxPrice = ref(null)
const discountRange = ref('all')
const sortBy = ref('default')
const page = ref(1)
const pageSize = ref(20)

// 折扣范围映射 - 对应 mockApi 的预期格式
const discountRangeMap = {
  'all': 'all',
  '>=1': '0.01-0.1',
  '>=2': '0.1-0.2',
  '>=3': '0.2-0.5',
  '>=4': '0.5-1'
}

// 排序方式映射
const sortByMap = {
  'default': 'viewCount',
  'latest': 'viewCount',
  'stock-desc': 'viewCount',
  'discount-desc': 'discount',
  'price-asc': 'price-asc',
  'price-desc': 'price-desc'
}

async function loadDiscountProducts() {
  try {
    const discountRangeValue = discountRange.value === 'all' ? 'all' : discountRangeMap[discountRange.value]

    const response = await getDiscountProducts({
      page: page.value,
      pageSize: pageSize.value,
      categoryId: firstCategory.value === '0' ? null : parseInt(firstCategory.value),
      subcategoryId: secondCategory.value === '0' ? null : parseInt(secondCategory.value),
      itemId: thirdCategory.value === '0' ? null : parseInt(thirdCategory.value),
      discountRange: discountRangeValue,
      priceMin: minPrice.value ? parseFloat(minPrice.value) : null,
      priceMax: maxPrice.value ? parseFloat(maxPrice.value) : null,
      sortBy: sortByMap[sortBy.value] || 'viewCount'
    })

    if (response.success) {
      pagedProducts.value = response.data.products.map(p => ({
        ...p,
        spu: String(p.id),
        image: p.thumbnailImage,
        price: p.sellingPrice,
        originalPrice: p.originalPrice,
        warehouses: ['US']
      }))

      totalFiltered.value = response.data.pagination.total
    }
  } catch (error) {
    console.error('Failed to load products:', error)
  }
}

function applyFilters() {
  page.value = 1
  loadDiscountProducts()
}

function applyPrice() {
  page.value = 1
  loadDiscountProducts()
}

// 添加总商品数和总页数的状态
const totalFiltered = ref(0)

function getCategoryLabel(level, value) {
  if (!categoriesData.value || categoriesData.value.length === 0) {
    const defaultLabels = {
      first: {
        '0': '一级分类',
        '1': '家居和家具',
        '2': '庭院和园艺'
      },
      second: {
        '0': '二级分类',
        '1': '家具',
        '2': '家居装饰'
      },
      third: {
        '0': '三级分类'
      }
    }
    return defaultLabels[level]?.[value] || (level === 'first' ? '一级分类' : level === 'second' ? '二级分类' : '三级分类')
  }

  if (level === 'first') {
    if (value === '0') return '一级分类'
    const cat = categoriesData.value.find(c => c.id === parseInt(value))
    return cat ? cat.title : '一级分类'
  }

  if (level === 'second') {
    if (value === '0') return '二级分类'
    const firstCat = categoriesData.value.find(c => c.id === parseInt(firstCategory.value))
    if (firstCat && firstCat.children) {
      const subcat = firstCat.children.find(c => c.id === parseInt(value))
      return subcat ? subcat.title : '二级分类'
    }
    return '二级分类'
  }

  if (level === 'third') {
    if (value === '0') return '三级分类'
    const firstCat = categoriesData.value.find(c => c.id === parseInt(firstCategory.value))
    if (firstCat && firstCat.children) {
      const secondCat = firstCat.children.find(c => c.id === parseInt(secondCategory.value))
      if (secondCat && secondCat.items) {
        const item = secondCat.items.find(i => i.id === parseInt(value))
        return item ? item.title : '三级分类'
      }
    }
    return '三级分类'
  }

  return '三级分类'
}

const totalPages = computed(() => Math.max(1, Math.ceil(totalFiltered.value / pageSize.value)))

// 当页码改变时，重新加载数据
watch(page, () => {
  loadDiscountProducts()
})

// 当排序方式改变时，重新加载数据
watch(sortBy, () => {
  page.value = 1
  loadDiscountProducts()
})

// Keep selectAll and selectedSkus in sync for current page
watch(selectAll, (val) => {
  const pageSkus = pagedProducts.value.map(p => p.spu)
  if (val) {
    const set = new Set([...selectedSkus.value, ...pageSkus])
    selectedSkus.value = Array.from(set)
  } else {
    const pageSet = new Set(pagedProducts.value.map(p => p.spu))
    selectedSkus.value = selectedSkus.value.filter(sku => !pageSet.has(sku))
  }
})

watch(pagedProducts, () => {
  const pageSkus = pagedProducts.value.map(p => p.spu)
  if (pageSkus.length === 0) {
    selectAll.value = false
    return
  }
  selectAll.value = pageSkus.every(sku => selectedSkus.value.includes(sku))
})

const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= totalPages.value; i++) arr.push(i)
  return arr
})

function formatPrice(n) {
  if (typeof n === 'number') {
    return `¥${n.toFixed(2)}`
  }
  return String(n)
}

// countdown
const countdownEnd = '2025/11/30 15:59:00'
const countdown = ref({ days: '0', hours: '00', minutes: '00' })
let __countdown_timer = null
function updateCountdown() {
  const end = new Date(countdownEnd.replace(/-/g,'/'))
  const now = new Date()
  const diff = Math.max(0, end - now)
  const days = Math.floor(diff / (24 * 3600 * 1000))
  const hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000))
  const minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000))
  countdown.value = { days: String(days), hours: String(hours).padStart(2,'0'), minutes: String(minutes).padStart(2,'0') }
}
updateCountdown()
__countdown_timer = setInterval(updateCountdown, 60 * 1000)

</script>

<style scoped>
/* small helper to override primary color used above */
:root {
  --primary: #CB261C;
}

/* new promotion page background (exclude header/footer) */
.new_promotion_container {
  background: url('https://www.saleyee.com/static/imgs/74596c7198f18c4bc5d1f0ed47151b9e.png') top center no-repeat, linear-gradient(135deg, #FF644D 0%, #FFCA4D 100%);
  background-size: cover;
  padding: 30px 20px;
}

/* promo card styles to match the target layout */
.promo-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  padding: 22px 20px 18px 20px;
  position: relative;
  overflow: visible;
}

.promo-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 6px; }
.promo-item { width: calc((100% - 36px) / 4); height: 136.55px; background: #f6f6f6; border-radius: 3px; padding: 8px; display: flex; gap:8px; align-items: center; box-sizing: border-box; }
.promo-thumb { width: 116.55px; height: 116.55px; flex-shrink: 0; display:block; }
.promo-thumb img { width:116.55px; height:116.55px; object-fit:cover; display:block; }
.promo-info { margin-left: 12px; flex: 1; min-width: 0; }
.promo-title { display:block; font-size:13px; color:#333; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width: 100%; font-weight:500; }
.promo-header { padding-top: 6px; }
.promo-meta { margin-top:8px; display:flex; gap:8px; align-items:center; }
.price { color:#cb261c; font-weight:700; font-size:14px; }
.original { color:#999; font-size:12px; text-decoration:line-through; }

/* Tab section styles */
.tab-section .tab-nav { display:flex; background:#fff; border-radius:10px; overflow:hidden; }
.tab-item-tab { width:50%; text-align:center; font-size:26px; font-weight:700; line-height:80px; height:80px; cursor:pointer; color:#FF654D; background:#fff; border: none; }
.tab-item-tab.tab-active { background:#FFE7E4; color:#FF654D; }
.tab-rows { }
.tab-row { list-style:none; display:flex; flex-direction:row; flex-wrap:wrap; gap:16px; padding:0; margin:0 0 16px 0; }

/* Product card unified styles */
.product-card { box-sizing:border-box; width: calc((100% - 80px) / 6); background:#fff; border-radius:3px; overflow:hidden; display:flex; flex-direction:column; }
.product-image { display:block; width:100%; padding-bottom:100%; position:relative; flex-shrink:0; overflow:hidden; }
.product-image img { position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; display:block; }
.product-content { padding:6px; display:flex; flex-direction:column; flex:1; min-width:0; justify-content:space-between; }
.product-title { display:block; font-size:13px; color:#333; margin:0 0 4px 0; overflow:hidden; text-overflow:ellipsis; line-height:1.4; font-weight:500; }
.product-price { display:flex; gap:4px; align-items:center; font-size:13px; margin-bottom:8px; }
.product-price .price { color:#cb261c; font-weight:700; font-size:14px; }
.product-price .original { color:#999; font-size:11px; text-decoration:line-through; }
.product-actions { display:flex; align-items:center; gap:10px; }

.btn-collect { display:inline-flex; align-items:center; gap:4px; background:linear-gradient(180deg,#CB261C,#A61E17); color:#fff; border:none; border-radius:20px; padding:4px 12px; height:28px; cursor:pointer; font-size:12px; line-height:1; white-space:nowrap; box-shadow:0 2px 6px rgba(198,38,28,0.18); flex-shrink:0; }
.btn-collect img { width:12px; height:12px; }
.action-icon { display:inline-flex; align-items:center; cursor:pointer; flex-shrink:0; }
.action-icon img { width:12px; height:12px; }

.grid-products { display:flex; flex-wrap:wrap; gap:12px; }
.product-card-grid { position:relative; box-sizing:border-box; width:calc((100% - 48px) / 5); background:#fff; border-radius:3px; overflow:hidden; display:flex; flex-direction:column; }
.product-card-grid .product-image { padding-bottom:100%; position:relative; }
.product-card-grid .product-content { padding:6px; }
.product-checkbox { position:absolute; left:3px; top:3px; z-index:10; cursor:pointer; }
.checkbox { display:inline-flex; align-items:center; justify-content:center; width:14px; height:14px; border:1px solid #ccc; border-radius:2px; background:#fff; cursor:pointer; transition:all 0.2s; flex-shrink:0; }
.checkbox.checked { background:#fff; border-color:#CB261C; border:1px solid #CB261C; color:#CB261C; font-size:10px; line-height:1; }

@media (max-width: 1024px) {
  .product-card { width: calc((100% - 48px) / 3); }
  .product-card-grid { width: calc((100% - 24px) / 3); }
}
@media (max-width: 640px) {
  .product-card { width: calc(50% - 8px); }
  .product-card-grid { width: calc(50% - 6px); }
}

/* Product grid - line clamp 2 lines */
.line-clamp-2, .product-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Link hover effect for product cards */
a:hover {
  color: var(--primary);
}

/* Dropdown arrow for category filter */
.dropdown-arrow {
  width: 0;
  height: 0;
  border-top: 6px solid #c2c2c2;
  border-left: 6px dashed rgba(0, 0, 0, 0);
  border-right: 6px dashed rgba(0, 0, 0, 0);
  border-bottom: 6px dashed rgba(0, 0, 0, 0);
}

.dropdown-arrow.dropdown-icon-open {
  transform: rotate(180deg);
}

/* Radio button styling */
.radio-icon {
  border-color: #c2c2c2;
  background-color: #ffffff;
}

input[type="radio"]:checked + .flex .radio-icon {
  border-color: #cb261c;
  background-color: #cb261c;
}

input[type="radio"]:checked + .flex .radio-icon::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
