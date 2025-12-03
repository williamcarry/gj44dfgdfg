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

        <!-- 区域筛选 -->
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">区域</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <a href="javascript:;" @click="selectedWarehouses = null" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', !selectedWarehouses ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">全部</a>
            <a v-for="warehouse in warehouses" :key="warehouse.id" href="javascript:;" @click="selectedWarehouses = selectedWarehouses === warehouse.id ? null : warehouse.id" :class="['text-xs px-2 py-1 rounded transition cursor-pointer', selectedWarehouses === warehouse.id ? 'bg-primary text-white' : 'text-slate-700 hover:text-primary']">{{ warehouse.name }}</a>
          </div>
          <button class="text-xs text-slate-600 hover:text-primary ml-4 whitespace-nowrap">多选</button>
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
        <div class="flex items-center px-5 py-2 border-b border-slate-200">
          <span class="font-bold text-sm w-20 shrink-0 text-left mr-4 inline-block text-primary px-2 py-1 rounded">分类</span>
          <div class="flex-1 flex flex-wrap gap-2 items-center">
            <select
              v-model="selectedCategory1"
              class="px-2 py-1 rounded focus:outline-none text-xs text-slate-700"
            >
              <option value="">一级分类</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
            <select
              v-model="selectedCategory2"
              class="px-2 py-1 rounded focus:outline-none text-xs text-slate-700"
            >
              <option value="">二级分类</option>
              <option value="">待选择</option>
            </select>
            <select
              v-model="selectedCategory3"
              class="px-2 py-1 rounded focus:outline-none text-xs text-slate-700"
            >
              <option value="">三级分类</option>
              <option value="">待选择</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 全选与批量操作 -->
      <div class="bg-white shadow-sm mb-6">
        <div class="flex items-center flex-wrap gap-2 px-5 py-3 border-b border-slate-200">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="selectAll" class="rounded" />
            <span class="text-sm font-medium text-slate-700">全选</span>
          </label>
          <span class="text-xs text-slate-600">已选 <em class="font-semibold text-primary">{{ selectedCount }}</em> 项</span>
          <div class="flex-1"></div>
          <button class="px-3 py-1 text-xs text-slate-700 hover:text-primary transition hover:bg-slate-50 rounded">一键刊登</button>
          <button class="px-3 py-1 text-xs text-slate-700 hover:text-primary transition hover:bg-slate-50 rounded">下载数据包</button>
          <button class="px-3 py-1 text-xs text-slate-700 hover:text-primary transition hover:bg-slate-50 rounded">加入收藏夹</button>
          <button class="px-3 py-1 text-xs text-slate-700 hover:text-primary transition hover:bg-slate-50 rounded">下载SPU</button>
          <button class="px-3 py-1 text-xs text-slate-700 hover:text-primary transition hover:bg-slate-50 rounded">复制SPU</button>
        </div>

        <!-- 排序栏 -->
        <div class="flex items-center flex-wrap gap-3 px-5 py-3">
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-600 font-medium">排序：</span>
            <button
              v-for="option in sortOptions"
              :key="option.value"
              @click="selectedSort = option.value"
              :class="[
                'px-3 py-1 text-xs rounded transition',
                selectedSort === option.value
                  ? 'bg-primary text-white'
                  : 'text-slate-700 hover:text-primary'
              ]"
            >
              {{ option.label }}
            </button>
          </div>
          <div class="flex-1"></div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="onlyStock" class="rounded" />
            <span class="text-xs text-slate-700">仅看有货</span>
          </label>
        </div>
      </div>

      <!-- 商品网格 -->
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

          <!-- ���容 -->
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
            <div class="mb-3 p-2 bg-slate-50 rounded text-center">
              <a href="/login" class="text-primary text-sm">登录后可见</a>
            </div>

            <!-- 仓库按钮 -->
            <div class="flex flex-wrap gap-2 mb-3">
              <button
                v-for="wh in product.warehouses"
                :key="wh"
                :class="[
                  'px-3 py-1 text-xs rounded transition',
                  selectedProductWarehouses[product.id] === wh
                    ? 'bg-primary text-white'
                    : 'text-slate-700 hover:text-primary'
                ]"
                @click="selectedProductWarehouses[product.id] = wh"
              >
                {{ wh }}
              </button>
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
                <input type="checkbox" class="rounded" />
              </label>
              <div class="flex items-center gap-2">
                <button title="一键刊登" class="p-2 text-slate-600 hover:text-primary transition">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                </button>
                <button title="下载" class="p-2 text-slate-600 hover:text-primary transition">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button title="收藏" class="p-2 text-slate-600 hover:text-primary transition">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    <RightFloatNav />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import RightFloatNav from './components/RightFloatNav.vue'

const selectedWarehouses = ref(null)
const selectedNewTime = ref('')
const selectedShipment = ref('')
const selectedSaleMode = ref('')
const selectedCategory1 = ref('')
const selectedCategory2 = ref('')
const selectedCategory3 = ref('')
const selectedSort = ref('0')
const onlyStock = ref(false)
const selectAll = ref(false)
const selectedCount = ref(0)
const selectedProductWarehouses = ref({})
const currentPage = ref(1)
const pageInput = ref(1)

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

const products = [
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
    title: '家用加湿器静音迷你',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/d41d793d-cf75-4653-8470-a715d6e9f12f.Jpeg',
    warehouses: ['US', 'UK', 'DE', 'FR'],
  },
  {
    id: 10,
    spu: 'WXYZABCDEF',
    title: '户外防水���电筒LED强光',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/7656a659-2d14-4c49-a355-c45b0ae7edf8.Jpeg',
    warehouses: ['US', 'DE', 'CZ'],
  },
  {
    id: 11,
    spu: 'GHIJKLMNOP',
    title: '儿童安全折叠滑梯秋千',
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
    title: '家用电热毛巾架浴室配件',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202501/8829a6ab-0a10-4349-a506-12835c30c872.Jpeg',
    warehouses: ['US', 'UK', 'DE'],
  },
  {
    id: 15,
    spu: 'CDEFGHIJKL',
    title: '瑜伽球防爆健身球家用',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    warehouses: ['FR', 'CZ', 'CA'],
  },
  {
    id: 16,
    spu: 'DEFGHIJKLM',
    title: '无线充电器快速充电pad',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    warehouses: ['US', 'UK', 'DE', 'FR'],
  },
]

const totalPages = computed(() => 110)

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

<style scoped></style>
