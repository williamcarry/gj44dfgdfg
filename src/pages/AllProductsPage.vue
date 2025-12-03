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
  <div class="min-h-screen bg-slate-50">
    <SiteHeader />

    <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1150px] px-4 md:px-0 py-6">
      <!-- 筛选栏 -->
      <div class="bg-white shadow-sm mb-6">
        <!-- 已选条件 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">已选</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <span v-if="!selectedWarehouses && !selectedNewTime && !selectedShipment && !selectedSaleMode && !selectedCategory1" class="text-slate-500 text-sm">无</span>
            <template v-else>
              <span v-if="selectedWarehouses" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getWarehouseName(selectedWarehouses) }} <button @click="selectedWarehouses = null" class="text-slate-600 hover:text-primary font-bold">×</button></span>
              <span v-if="selectedNewTime" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getNewTimeLabel(selectedNewTime) }} <button @click="selectedNewTime = ''" class="text-slate-600 hover:text-primary font-bold">×</button></span>
              <span v-if="selectedShipment" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getShipmentLabel(selectedShipment) }} <button @click="selectedShipment = ''" class="text-slate-600 hover:text-primary font-bold">×</button></span>
              <span v-if="selectedSaleMode" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getSaleModeLabel(selectedSaleMode) }} <button @click="selectedSaleMode = ''" class="text-slate-600 hover:text-primary font-bold">×</button></span>
              <span v-if="selectedCategory1" class="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-1 rounded">{{ getCategoryName(selectedCategory1) }} <button @click="selectedCategory1 = ''" class="text-slate-600 hover:text-primary font-bold">×</button></span>
            </template>
          </div>
        </div>

        <!-- 商品品牌 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">品牌</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" class="text-sm text-primary font-medium cursor-pointer">全部</a>
          </div>
        </div>


        <!-- 上新时间 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">上新</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" @click="selectedNewTime = ''" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', !selectedNewTime ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">全部</a>
            <a v-for="option in newTimeOptions" :key="option.value" v-show="option.value" href="javascript:;" @click="selectedNewTime = selectedNewTime === option.value ? '' : option.value" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', selectedNewTime === option.value ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ option.label }}</a>
          </div>
        </div>

        <!-- 发货类型 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">发货</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" @click="selectedShipment = ''" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', !selectedShipment ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">全部</a>
            <a v-for="option in shipmentOptions" :key="option.value" v-show="option.value" href="javascript:;" @click="selectedShipment = selectedShipment === option.value ? '' : option.value" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', selectedShipment === option.value ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ option.label }}</a>
          </div>
        </div>

        <!-- 交易模式 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">模式</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" @click="selectedSaleMode = ''" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', !selectedSaleMode ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">全部</a>
            <a v-for="option in saleModeOptions" :key="option.value" v-show="option.value" href="javascript:;" @click="selectedSaleMode = selectedSaleMode === option.value ? '' : option.value" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', selectedSaleMode === option.value ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ option.label }}</a>
          </div>
        </div>

        <!-- 商品分类 -->
        <div class="flex items-center px-5 py-3 border-b border-slate-200 gap-5">
          <span class="font-bold text-sm w-[150px] shrink-0 text-left">商品分类：</span>

          <!-- 一级分类 -->
          <div class="relative inline-block w-[200px]">
            <div @click="showCategory1Dropdown = !showCategory1Dropdown" class="flex items-center cursor-pointer border border-slate-300 rounded px-3 py-2 bg-white hover:border-primary transition">
              <input
                type="text"
                :value="getCategoryName(selectedCategory1) || '一级分类'"
                readonly
                class="flex-1 text-xs bg-transparent outline-none cursor-pointer"
              />
              <span class="text-slate-400 ml-2 text-xs">▼</span>
            </div>
            <div v-show="showCategory1Dropdown" class="absolute top-full left-0 mt-1 w-full bg-white border border-slate-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
              <div @click="selectedCategory1 = ''; showCategory1Dropdown = false" class="px-3 py-2 text-xs cursor-pointer hover:bg-primary hover:text-white" :class="{'bg-primary text-white': !selectedCategory1}">一级分类</div>
              <div v-for="cat in categories" :key="cat.id" @click="selectedCategory1 = cat.id; showCategory1Dropdown = false" class="px-3 py-2 text-xs cursor-pointer hover:bg-primary hover:text-white border-t border-slate-100" :class="{'bg-primary text-white': selectedCategory1 === cat.id}">{{ cat.name }}</div>
            </div>
          </div>

          <!-- 二级分类 -->
          <div class="relative inline-block w-[200px]">
            <div @click="showCategory2Dropdown = !showCategory2Dropdown" class="flex items-center cursor-pointer border border-slate-300 rounded px-3 py-2 bg-white hover:border-primary transition">
              <input
                type="text"
                value="二级分类"
                readonly
                class="flex-1 text-xs bg-transparent outline-none cursor-pointer"
              />
              <span class="text-slate-400 ml-2 text-xs">▼</span>
            </div>
            <div v-show="showCategory2Dropdown" class="absolute top-full left-0 mt-1 w-full bg-white border border-slate-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
              <div class="px-3 py-2 text-xs cursor-pointer hover:bg-primary hover:text-white">二级分类</div>
            </div>
          </div>

          <!-- 三级分类 -->
          <div class="relative inline-block w-[200px]">
            <div @click="showCategory3Dropdown = !showCategory3Dropdown" class="flex items-center cursor-pointer border border-slate-300 rounded px-3 py-2 bg-white hover:border-primary transition">
              <input
                type="text"
                value="三级分类"
                readonly
                class="flex-1 text-xs bg-transparent outline-none cursor-pointer"
              />
              <span class="text-slate-400 ml-2 text-xs">▼</span>
            </div>
            <div v-show="showCategory3Dropdown" class="absolute top-full left-0 mt-1 w-full bg-white border border-slate-300 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
              <div class="px-3 py-2 text-xs cursor-pointer hover:bg-primary hover:text-white">三级分类</div>
            </div>
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
                <span class="text-sm font-medium text-slate-700 cursor-pointer">全选</span>
              </li>
              <li>
                <p class="text-xs text-slate-600">已选 <em class="font-semibold text-primary">{{ selectedCount }}</em> 项</p>
              </li>
            </ul>
          </div>

          <!-- 右边：批量操作按钮 -->
          <div class="flex-1"></div>
          <div class="flex-shrink-0">
            <ul class="flex items-center gap-6">
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1" title="一键刊登">
                <svg class="w-4 h-4 text-[#CB261C]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                一键刊登
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <svg class="w-4 h-4 text-[#37B24D]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                下载数据包
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <svg class="w-4 h-4 text-[#FAAD14]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                加入收藏夹
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <svg class="w-4 h-4 text-[#2F54EB]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                下载SPU
              </a></li>
              <li><a href="javascript:;" class="text-xs text-slate-700 hover:text-primary transition inline-flex items-center gap-1">
                <svg class="w-4 h-4 text-[#13C2C2]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9a2 2 0 01-2-2v-2H6a1 1 0 110-2h1v-2H6a1 1 0 110-2h1V7a2 2 0 012-2h2V3z" />
                </svg>
                复制SPU
              </a></li>
            </ul>
          </div>
        </div>

        <!-- 排序栏（改为附件��式） -->
        <div class="sort-wrapper">
          <div class="sort-inner">
            <ul class="sort-list">
              <li v-for="option in sortOptions" :key="option.value" :class="['sort-item', selectedSort === option.value ? 'active' : '']">
                <a href="javascript:;" @click.prevent="selectedSort = option.value" class="sort-link">{{ option.label }}<i v-if="option.value === '4' || option.value === '3'" class="sort-arrow"></i></a>
              </li>

              <li class="li-2">
                <label class="onlylook">
                  <input type="checkbox" lay-skin="primary" lay-filter="onlylook" title="仅看有货" class="hidden-checkbox" v-model="onlyStock" />
                  <span class="onlylook-text">仅看有货</span>
                  <i class="i-2"></i>
                </label>
              </li>

              <li class="li-3">
                库存：
                <input type="text" v-model="inventoryStart" class="small-input" />
                -
                <input type="text" v-model="inventoryEnd" class="small-input" />
              </li>

              <li class="li-4">
                价格：
                <input type="text" v-model="minPrice" class="small-input" />
                -
                <input type="text" v-model="maxPrice" class="small-input" />
                <button class="button-apply" @click.prevent="applyPrice">确定</button>
              </li>
            </ul>

            <div class="sort-right">
              <a href="/allsearch_page2.html" class="page-btn" @click.prevent="showLoadingAndNavigate"></a>
              <span class="page-count">1/1119</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品网格 -->
      <template v-if="isLoading">
        <!-- 显示骨架屏 -->
        <SkeletonLoader type="product-list" :count="16" :columns="4" />
      </template>
      <template v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
        >
          <!-- 图片 -->
          <a :href="`/item/${product.spu}.html`" class="block aspect-square overflow-hidden bg-slate-100">
            <img :src="product.image" :alt="product.title" class="w-full h-full object-cover hover:scale-105 transition" />
          </a>

          <!-- 内容 -->
          <div class="p-4">
            <!-- 标题 -->
            <a :href="`/item/${product.spu}.html`" class="block mb-2">
              <h3 class="text-sm text-slate-900 font-medium line-clamp-2 hover:text-primary transition">
                {{ product.title }}
              </h3>
            </a>

            <!-- SPU -->
            <p class="text-xs text-slate-500 mb-3">SPU: {{ product.spu }}</p>

            <!-- 价格 -->
            <div class="mb-3 p-2 bg-slate-50 rounded text-center price-box">
              <!-- 售价 -->
              <div class="text-red-500 font-bold text-lg">USD 58.67</div>
              <!-- 原价 -->
              <div class="text-gray-500 text-sm line-through">USD 65.19</div>
            </div>


            <!-- 颜色选项 -->
            <div v-if="product.colors && product.colors.length > 0" class="mb-3">
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in product.colors"
                  :key="color"
                  class="w-6 h-6 rounded hover:opacity-80 transition"
                  :style="{ backgroundColor: color }"
                  :title="color"
                />
              </div>
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
                <button title="一键��登" class="p-2 text-slate-600 hover:text-primary transition">
                  <svg class="w-4 h-4 text-[#CB261C]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                </button>
                <button title="下载" class="p-2 text-slate-600 hover:text-primary transition">
                  <svg class="w-4 h-4 text-[#37B24D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button title="收藏" class="p-2 text-slate-600 hover:text-primary transition">
                  <svg class="w-4 h-4 text-[#FAAD14]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </template>

      <!-- 分页 -->
      <div class="bg-white rounded-lg p-4 shadow-sm flex items-center justify-center gap-2 mb-8">
        <button
          :disabled="currentPage === 1"
          @click="currentPage = Math.max(1, currentPage - 1)"
          class="px-3 py-2 rounded text-slate-700 hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一页
        </button>
        <span class="text-slate-600">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          class="px-3 py-2 rounded text-slate-700 hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一页
        </button>
        <div class="flex items-center gap-2 ml-4">
          <span class="text-slate-600">跳转到</span>
          <input
            v-model.number="pageInput"
            type="number"
            min="1"
            :max="totalPages"
            class="w-12 px-2 py-1 rounded bg-slate-50 text-slate-700"
          />
          <button
            @click="currentPage = Math.min(Math.max(1, pageInput), totalPages)"
            class="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 transition text-sm"
          >
            确定
          </button>
        </div>
      </div>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

const isLoading = ref(true)

const selectedWarehouses = ref(null)
const selectedNewTime = ref('')
const selectedShipment = ref('')
const selectedSaleMode = ref('')
const selectedCategory1 = ref('')
const selectedCategory2 = ref('')
const selectedCategory3 = ref('')
const selectedSort = ref('0')
const onlyStock = ref(false)
const inventoryStart = ref('')
const inventoryEnd = ref('')
const minPrice = ref('')
const maxPrice = ref('')

const applyPrice = () => {
  // 简单地将输入应用到筛选状态，可在后续接入实际查询逻辑
  // 目前只是触发响应式更新
  // 将字符串转为数字或保留空值
  const s = minPrice.value && !isNaN(Number(minPrice.value)) ? Number(minPrice.value) : ''
  const e = maxPrice.value && !isNaN(Number(maxPrice.value)) ? Number(maxPrice.value) : ''
  minPrice.value = s
  maxPrice.value = e
}

const showLoadingAndNavigate = (event) => {
  // 如果全局 ZTLayer 存在则调用其 showLoading 方法，避免未定义错误
  try {
    if (typeof window !== 'undefined' && window.ZTLayer && typeof window.ZTLayer.showLoading === 'function') {
      window.ZTLayer.showLoading()
    }
  } catch (err) {
    // 安全吞噬错误，避免影响导航
  }

  // 导航���目标页面（保留 href 行为）
  const href = event && event.currentTarget ? event.currentTarget.getAttribute('href') : '/allsearch_page2.html'
  if (href) {
    window.location.href = href
  }
}
const selectAll = ref(false)
const selectedProducts = ref(new Set())
const currentPage = ref(1)
const pageInput = ref(1)

// Dropdown visibility states
const showCategory1Dropdown = ref(false)
const showCategory2Dropdown = ref(false)
const showCategory3Dropdown = ref(false)

// 商品数据
const products = ref([
  {
    id: 1,
    spu: 'BKMIFWVEIG',
    title: '3*9m 8片面 凉棚 铁 PE布 N002 普规',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202502/3ba95179-6e43-4d0b-bd8d-8e3a6193d0c9.Jpeg',
    warehouses: ['US', 'UK', 'DE'],
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  },
  {
    id: 2,
    spu: 'ABCDEFGHIJ',
    title: '户外露营帐篷 3-4人防水防晒',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202506/89c6cc05-8416-491e-8b0e-3fde8a318f0e.Jpeg',
    warehouses: ['US', 'UK', 'FR'],
  },
  {
    id: 3,
    spu: 'KLMNOPQRST',
    title: '家用拖地机器人智能清扫',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
    warehouses: ['US', 'DE', 'CZ'],
  },
  {
    id: 4,
    spu: 'UVWXYZABCD',
    title: '可折叠储物箱透明防水',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202501/8829a6ab-0a10-4349-a506-12835c30c872.Jpeg',
    warehouses: ['UK', 'FR', 'CA'],
  },
  {
    id: 5,
    spu: 'EFGHIJKLMN',
    title: '办公椅人体工学转椅',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    warehouses: ['US', 'UK'],
  },
  {
    id: 6,
    spu: 'OPQRSTUVWX',
    title: '宠物狗床垫舒适防水',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    warehouses: ['DE', 'FR', 'CZ', 'CA'],
  },
  {
    id: 7,
    spu: 'YZABCDEFGH',
    title: '户外太阳能灭蚊灯',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/79ebe6df-c2d3-4207-b146-513630fe163d.Jpeg',
    warehouses: ['US', 'UK', 'DE'],
  },
  {
    id: 8,
    spu: 'IJKLMNOPQR',
    title: '健身瑜伽垫防滑耐用',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202410/890f8f68-c40a-40c5-a4f3-017cf297c900.Jpeg',
    warehouses: ['FR', 'CZ'],
  },
  {
    id: 9,
    spu: 'MNOPQRSTUV',
    title: '家用加湿�����音迷你',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/d41d793d-cf75-4653-8470-a715d6e9f12f.Jpeg',
    warehouses: ['US', 'UK', 'DE', 'FR'],
  },
  {
    id: 10,
    spu: 'WXYZABCDEF',
    title: '户外防水手电筒LED强光',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/7656a659-2d14-4c49-a355-c45b0ae7edf8.Jpeg',
    warehouses: ['US', 'DE', 'CZ'],
  },
  {
    id: 11,
    spu: 'GHIJKLMNOP',
    title: '儿童安全折叠滑秋千',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/9edd9fdd-b8ca-4750-8c74-6180331317f0.jpg',
    warehouses: ['UK', 'FR', 'CA'],
  },
  {
    id: 12,
    spu: 'QRSTUVWXYZ',
    title: '厨房水龙头防溅器过滤网',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202506/89c6cc05-8416-491e-8b0e-3fde8a318f0e.Jpeg',
    warehouses: ['US', 'UK'],
  },
  {
    id: 13,
    spu: 'ABCDEFGHIJ',
    title: '便携式蓝牙音箱防水户外',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
    warehouses: ['DE', 'FR', 'CZ'],
  },
  {
    id: 14,
    spu: 'BCDEFGHIJK',
    title: '家用电热毛巾架浴室件',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202501/8829a6ab-0a10-4349-a506-12835c30c872.Jpeg',
    warehouses: ['US', 'UK', 'DE'],
  },
  {
    id: 15,
    spu: 'CDEFGHIJKL',
    title: '瑜伽球防爆健身球家用',
    image: '',
    warehouses: ['FR', 'CZ', 'CA'],
  },
  {
    id: 16,
    spu: 'DEFGHIJKLM',
    title: '无线充电器快速充电pad',
    image: '',
    warehouses: ['US', 'UK', 'DE', 'FR'],
  },
])

const selectedCount = computed(() => selectedProducts.value.size)

const warehouses = [
  { id: '123', name: 'US' },
  { id: '124', name: 'UK' },
  { id: '126', name: 'DE' },
  { id: '127', name: 'FR' },
  { id: '129', name: 'CZ' },
  { id: '132', name: 'CA' },
]

const newTimeOptions = [
  { label: '全部', value: '' },
  { label: '近7天', value: '7' },
  { label: '近15天', value: '15' },
  { label: '近30天', value: '30' },
  { label: '近60天', value: '60' },
]

const shipmentOptions = [
  { label: '全部', value: '' },
  { label: '平台发货', value: '0' },
  { label: '供应商自发货', value: '1' },
]

const saleModeOptions = [
  { label: '全部', value: '' },
  { label: '一件代发', value: '0' },
  { label: '批发', value: '1' },
  { label: '圈货', value: '2' },
  { label: '自提', value: '3' },
]

const sortOptions = [
  { label: '综合', value: '0' },
  { label: '最新', value: '6' },
  { label: '销量', value: '4' },
  { label: '价格', value: '3' },
  { label: '下载数', value: '5' },
  { label: '库存', value: '8' },
]

const categories = [
  { id: '908', name: '办公、教育与安全' },
  { id: '909', name: '宠物用品' },
  { id: '910', name: '电器类' },
  { id: '912', name: '户外、娱乐和运动' },
  { id: '913', name: '家居和家具' },
  { id: '914', name: '健康和美容' },
  { id: '917', name: '庭院和园艺' },
  { id: '918', name: '玩具/婴童用品' },
  { id: '919', name: '消费电子/器材' },
  { id: '920', name: '音乐艺术' },
]

const totalPages = computed(() => 110)

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

watch(products, () => {
  updateSelectAllState()
})

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

function getWarehouseName(id) {
  if (!id) return '全部'
  const warehouse = warehouses.find(w => w.id === id)
  return warehouse?.name || ''
}

function getNewTimeLabel(value) {
  const option = newTimeOptions.find(o => o.value === value)
  return option?.label || ''
}

function getShipmentLabel(value) {
  const option = shipmentOptions.find(o => o.value === value)
  return option?.label || ''
}

function getSaleModeLabel(value) {
  const option = saleModeOptions.find(o => o.value === value)
  return option?.label || ''
}

function getCategoryName(id) {
  const category = categories.find(c => c.id === id)
  return category?.name || ''
}
</script>

<style scoped>
/* 排序栏样式（模拟附件样式） */
.sort-wrapper{background:#fff}
.sort-inner{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-bottom:1px solid #ddd}
.sort-list{display:flex;align-items:center;gap:0;list-style:none;padding:0;margin:0}
.sort-item{float:left}
.sort-link{display:inline-block;padding:0 20px;line-height:36px;color:#333;text-decoration:none;border-right:1px solid #ddd}
.sort-item.active .sort-link{background:#eee;color:#e4393c}
.li-2{margin-left:20px;padding-left:20px}
.onlylook{display:inline-flex;align-items:center;position:relative;height:36px}
.hidden-checkbox{display:none}
.onlylook-text{margin-left:8px;color:#333}
.small-input{width:50px;height:24px;padding:3px 6px;border:1px solid #d5d5d5;border-radius:2px;margin:0 6px}
.button-apply{background:#cb261c;color:#fff;border:none;padding:4px 8px;border-radius:2px;margin-left:8px}
.sort-right{display:flex;align-items:center;gap:8px}
.page-btn{display:inline-block;width:22px;height:22px;background-image:url('https://www.saleyee.com/static/imgs/e295b331d03151c33b019deac4e67322.png');background-repeat:no-repeat;background-position:center;border:1px solid #ddd}
.page-count{color:#999}

/* 固定每个商品的价格区域高度并垂直居中 */
.price-box{height:72px;min-height:72px;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden}
.price-box .text-lg{line-height:1}
.price-box .text-sm{opacity:0.9}
</style>
