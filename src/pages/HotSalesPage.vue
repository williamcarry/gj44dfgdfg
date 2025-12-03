<template>
  <div class="min-h-screen bg-[#f2f3f7]">
    <SiteHeader />

    <!-- Content wrapper with purple gradient background -->
    <div class="bg-gradient-to-br from-[#5135be] to-[#9b38c5] bg-no-repeat bg-cover"
      style="background-image: url('https://www.saleyee.com/static/imgs/74596c7198f18c4bc5d1f0ed47151b9e.png'), linear-gradient(135deg, rgb(81, 53, 190) 0%, rgb(155, 56, 197) 100%)"
    >
      <!-- Hero Section -->
      <div class="w-full pt-12 pb-8">
        <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0">
          <div class="text-center">
            <div class="flex items-center justify-center gap-3 mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12a1 1 0 001 1h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v12m0-12V4a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 001 1h1a1 1 0 001-1V4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 001 1h2a1 1 0 001-1v-1" />
              </svg>
              <span class="text-white text-3xl font-semibold">畅销精��</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ranking Grid Layout -->
      <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 pb-8">
        <div class="bg-white rounded-lg p-5">
          <h2 class="text-center text-2xl font-bold text-gray-800 mb-4">排行榜</h2>

          <!-- Four Column Flex Layout -->
          <div class="flex gap-4">
            <!-- Column 1: 热度排行榜 -->
            <div class="bg-gray-100 rounded-lg p-4 flex-1">
              <div class="flex items-center gap-2 mb-4">
                <img
                  src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon1.png"
                  alt="热度"
                  class="w-6 h-6"
                />
                <span class="font-bold text-base text-gray-800">热度排行榜</span>
              </div>
              <ul class="space-y-4 max-h-[490px] overflow-y-auto">
                <li v-for="(item, index) in hotRankings" :key="'hot-' + index" class="flex gap-2 bg-white rounded p-3">
                  <div class="relative flex-shrink-0 w-[35%]">
                    <a :href="`/item/${item.spu}.html`" class="block">
                      <div class="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
                        <img
                          :src="item.image"
                          :alt="item.title"
                          class="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>
                    </a>
                  </div>

                  <div class="flex-1 flex flex-col text-xs">
                    <a :href="`/item/${item.spu}.html`" class="font-medium text-gray-800 hover:text-blue-600 line-clamp-2 mb-1 block leading-5 h-10">
                      {{ item.title }}
                    </a>
                    <div class="flex items-center gap-3 mb-1">
                      <span class="flex items-center text-red-600 font-semibold gap-1">
                        <img src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon1.png" alt="热度" class="w-4 h-4" />
                        {{ item.heat }}
                      </span>
                      <span class="text-gray-500" v-if="item.stock">库存:{{ item.stock }}</span>
                    </div>
                    <p class="text-gray-800 font-bold mb-1" v-if="item.price">
                      <span class="font-bold">{{ item.price }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Column 2: ���藏排行榜 -->
            <div class="bg-gray-100 rounded-lg p-4 flex-1">
              <div class="flex items-center gap-2 mb-4">
                <img
                  src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon2.png"
                  alt="收藏"
                  class="w-6 h-6"
                />
                <span class="font-bold text-base text-gray-800">收藏排行榜</span>
              </div>
              <ul class="space-y-4 max-h-[490px] overflow-y-auto">
                <li v-for="(item, index) in favoriteRankings" :key="'fav-' + index" class="flex gap-2 bg-white rounded p-3">
                  <div class="relative flex-shrink-0 w-[35%]">
                    <a :href="`/item/${item.spu}.html`" class="block">
                      <div class="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
                        <img
                          :src="item.image"
                          :alt="item.title"
                          class="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>
                    </a>
                  </div>

                  <div class="flex-1 flex flex-col text-xs">
                    <a :href="`/item/${item.spu}.html`" class="font-medium text-gray-800 hover:text-blue-600 line-clamp-2 mb-1 block leading-5 h-10">
                      {{ item.title }}
                    </a>
                    <div class="flex items-center gap-3 mb-1">
                      <span class="flex items-center text-red-600 font-semibold gap-1">
                        <img src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon2.png" alt="收藏" class="w-4 h-4" />
                        {{ item.favorites }}
                      </span>
                      <span class="text-gray-500" v-if="item.stock">库存:{{ item.stock }}</span>
                    </div>
                    <p class="text-gray-800 font-bold mb-1" v-if="item.price">
                      <span class="font-bold">{{ item.price }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Column 3: 下��排行����� -->
            <div class="bg-gray-100 rounded-lg p-4 flex-1">
              <div class="flex items-center gap-2 mb-4">
                <img
                  src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon3.png"
                  alt="下载"
                  class="w-6 h-6"
                />
                <span class="font-bold text-base text-gray-800">下载排行榜</span>
              </div>
              <ul class="space-y-4 max-h-[490px] overflow-y-auto">
                <li v-for="(item, index) in downloadRankings" :key="'down-' + index" class="flex gap-2 bg-white rounded p-3">
                  <div class="relative flex-shrink-0 w-[35%]">
                    <a :href="`/item/${item.spu}.html`" class="block">
                      <div class="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
                        <img
                          :src="item.image"
                          :alt="item.title"
                          class="w-full h-full object-cover hover:scale-105 transition"
                        />
                        <span
                          v-if="item.variants"
                          class="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/50 text-white text-xs text-center"
                        >
                          {{ item.variants }}
                        </span>
                      </div>
                    </a>
                  </div>

                  <div class="flex-1 flex flex-col text-xs">
                    <a :href="`/item/${item.spu}.html`" class="font-medium text-gray-800 hover:text-blue-600 line-clamp-2 mb-1 block leading-5 h-10">
                      {{ item.title }}
                    </a>
                    <div class="flex items-center gap-3 mb-1">
                      <span class="flex items-center text-red-600 font-semibold gap-1">
                        <img src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon3.png" alt="下载" class="w-4 h-4" />
                        {{ item.downloads }}
                      </span>
                      <span class="text-gray-500" v-if="item.stock">库存:{{ item.stock }}</span>
                    </div>
                    <p class="text-gray-800 font-bold mb-1" v-if="item.price">
                      <span class="font-bold">{{ item.price }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Column 4: 刊登映射排行榜 -->
            <div class="bg-gray-100 rounded-lg p-4 flex-1">
              <div class="flex items-center gap-2 mb-4">
                <img
                  src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon4.png"
                  alt="刊登"
                  class="w-6 h-6"
                />
                <span class="font-bold text-base text-gray-800">���登排行榜</span>
              </div>
              <ul class="space-y-4 max-h-[490px] overflow-y-auto">
                <li v-for="(item, index) in publishRankings" :key="'pub-' + index" class="flex gap-2 bg-white rounded p-3">
                  <div class="relative flex-shrink-0 w-[35%]">
                    <a :href="`/item/${item.spu}.html`" class="block">
                      <div class="relative w-full aspect-square bg-gray-100 rounded overflow-hidden">
                        <img
                          :src="item.image"
                          :alt="item.title"
                          class="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </div>
                    </a>
                  </div>

                  <div class="flex-1 flex flex-col text-xs">
                    <a :href="`/item/${item.spu}.html`" class="font-medium text-gray-800 hover:text-blue-600 line-clamp-2 mb-1 block leading-5 h-10">
                      {{ item.title }}
                    </a>
                    <div class="flex items-center gap-3 mb-1">
                      <span class="flex items-center text-red-600 font-semibold gap-1">
                        <img src="https://www.saleyee.com/ContentNew/Images/2023/202309/topsales_icon4.png" alt="刊登" class="w-4 h-4" />
                        {{ item.publishes }}
                      </span>
                      <span class="text-gray-500" v-if="item.stock">库存:{{ item.stock }}</span>
                    </div>
                    <p class="text-gray-800 font-bold mb-1" v-if="item.price">
                      <span class="font-bold">{{ item.price }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Carousel and Product Section -->
      <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 pb-8">
        <!-- Category Carousel -->
        <div class="bg-white rounded-lg h-[142px] relative overflow-hidden mb-0.5">
          <div class="h-full flex items-center justify-between relative px-4 py-5">
            <!-- Carousel Container -->
            <div
              ref="carouselContentRef"
              class="flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
              @mousedown="onCarouselMouseDown"
              @mousemove="onCarouselMouseMove"
              @mouseup="onCarouselMouseUp"
              @mouseleave="onCarouselMouseUp"
            >
              <div
                class="flex gap-0"
                :class="{ 'transition-transform duration-300': !isDragging }"
                :style="{ transform: `translateX(-${carouselOffset}px)` }
              ">
                <div
                  v-for="(category, index) in categories"
                  :key="index"
                  @click="selectCategory(index, $event)"
                  class="flex-shrink-0 w-[160px] flex flex-col items-center justify-center cursor-pointer text-center gap-2 px-7 py-5 relative"
                  @selectstart.prevent
                >
                  <img
                    :src="category.image"
                    :alt="category.name"
                    class="w-20 h-20 rounded-full object-cover"
                  />
                  <p class="text-sm font-bold text-gray-800 text-center line-clamp-1">{{ category.name }}</p>
                  <!-- Purple triangle indicator for selected category -->
                  <div
                    v-if="activeCategory === index"
                    class="absolute bottom-0 left-1/2 -translate-x-1/2"
                    style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 12px solid #9b38c5;"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <button
              @click="scrollCarouselLeft"
              :disabled="carouselOffset <= 0"
              :style="{ opacity: carouselOffset > 0 ? 1 : 0.3, cursor: carouselOffset > 0 ? 'pointer' : 'not-allowed' }"
              class="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-14 flex items-center justify-center text-5xl text-gray-400 hover:text-gray-600 z-10 transition-opacity"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              @click="scrollCarouselRight"
              :disabled="!canScrollRight"
              :style="{ opacity: canScrollRight ? 1 : 0.3, cursor: canScrollRight ? 'pointer' : 'not-allowed' }"
              class="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-14 flex items-center justify-center text-5xl text-gray-400 hover:text-gray-600 z-10 transition-opacity"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="flex justify-between items-center py-1.5 gap-4">
          <ul class="flex flex-wrap flex-1">
            <li
              v-for="(filter, index) in productFilters"
              :key="index"
              @click="activeFilter = index"
              :class="{
                'bg-purple-600 border-purple-600 text-white': activeFilter === index,
                'bg-transparent border-pink-200 text-pink-100': activeFilter !== index
              }"
              class="font-medium transition border px-2.5 py-1.5 text-sm rounded mr-2 mb-2 cursor-pointer"
            >
              {{ filter }}
            </li>
          </ul>

          <!-- Export Button -->
          <button class="flex items-center gap-2 transition bg-white border border-primary text-primary px-3 py-1.5 rounded-full text-sm flex-shrink-0">
            <img
              src="https://www.saleyee.com/ContentNew/Images/2023/202309/derive_icon.png"
              alt="export"
              class="w-4 h-4"
            />
            <span>导出</span>
          </button>
        </div>

        <!-- Products Section -->
        <div>
          <ul
            v-for="(group, groupIndex) in productGroups"
            :key="groupIndex"
            class="flex flex-wrap gap-4 mb-2.5 list-none"
          >
            <li
              v-for="(product, index) in group"
              :key="`${groupIndex}-${index}`"
              class="w-[calc(16.6666%-13.33px)] bg-white rounded-[3px] relative flex flex-col h-[320px]"
            >
              <!-- Product Image -->
              <a
                :href="product.link"
                target="_blank"
                class="relative block text-gray-700 transition-all duration-300 w-full aspect-square overflow-hidden rounded-[3px]"
              >
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-full h-full object-cover"
                />
                <span
                  v-if="product.discount"
                  class="absolute top-0 right-0 bg-amber-400 text-white font-medium px-1.5 py-0.5 rounded-bl-2xl rounded-tr-[3px] text-center text-xs leading-6"
                >
                  {{ product.discount }}
                </span>
              </a>

              <!-- Product Info -->
              <div class="min-h-[88px] pb-2 px-2 relative">
                <a
                  :href="product.link"
                  target="_blank"
                  :title="product.title"
                  class="text-gray-700 leading-5 h-10 overflow-hidden text-ellipsis transition-all duration-300 block mt-1 break-words whitespace-normal text-xs font-medium"
                >
                  {{ product.title }}
                </a>

                <!-- Price and Stock -->
                <div class="flex justify-between">
                  <p class="text-gray-800 font-bold leading-[26px] m-0">
                    {{ product.price }}
                  </p>
                  <span class="flex items-center leading-[26px] text-xs">
                    <i class="text-gray-400 font-sans mr-2"/>
                    库存:{{ product.stock }}
                  </span>
                </div>

                <!-- Action Buttons -->
                <div class="rounded-[3px] h-9 absolute left-0 top-[85px] transition-all duration-400 w-full overflow-hidden z-10">
                  <div class="flex items-center bg-white absolute left-0 top-0 w-full pb-2 px-2">
                    <button class="flex items-center gap-1 bg-primary text-white px-3 h-[30px] rounded-full cursor-pointer transition-all duration-500 border-0 text-xs">
                      <img
                        loading="lazy"
                        src="https://www.saleyee.com/ContentNew/Images/2023/202309/collect.png"
                        class="w-4 h-4"
                      />
                      收藏
                    </button>
                    <a
                      title=""
                      href="javascript:;"
                      class="text-gray-700 cursor-pointer ml-4 transition-all duration-300"
                    >
                      <img
                        loading="lazy"
                        src="https://www.saleyee.com/Content/Images/down2.png"
                        class="w-4 h-4 inline-block"
                      />
                    </a>
                    <a
                      title="一键刊登"
                      href="javascript:;"
                      class="text-gray-700 cursor-pointer ml-4 transition-all duration-300"
                    >
                      <img
                        loading="lazy"
                        src="https://www.saleyee.com/ContentNew/Images/2023/202304/flasting_logo.png"
                        class="w-4 h-4 inline-block"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
import { getAllRankings } from '@/services/mockApi.js'

// Carousel state
const carouselOffset = ref(0)
const activeFilter = ref(0)
const activeCategory = ref(0)
const carouselContainerWidth = ref(0)
const carouselContentRef = ref(null)
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartOffset = ref(0)
const isLoadingRankings = ref(false)

// Rankings state - 使用ref使数据响应式
const hotRankings = ref([])
const favoriteRankings = ref([])
const downloadRankings = ref([])
const publishRankings = ref([])

// Categories for carousel
const categories = ref([
  {
    name: '家居和家具',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E5%95%86%E5%9F%8E%E9%A6%96%E9%A1%B5/%E5%AE%B6%E5%B1%85%E5%92%8C%E5%AE%B6%E5%85%B7.jpg?v=1524421279',
  },
  {
    name: '庭院和园艺',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%BA%AD%E9%99%A2%E5%92%8C%E5%9B%AD%E8%89%BA.jpg?v=232566885',
  },
  {
    name: '音乐艺术',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E9%9F%B3%E4%B9%90%E8%89%BA%E6%9C%AF.jpg?v=232566885%E6%9C%AA%E8%AF%BB',
  },
  {
    name: '户外、娱乐和运动',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%88%B7%E5%A4%96.%E5%A8%B1%E4%B9%90%E5%92%8C%E8%BF%90%E5%8A%A8.jpg?v=232566885',
  },
  {
    name: '电器类',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E7%94%B5%E5%99%A8%E7%B1%BB.jpg?v=232566885',
  },
  {
    name: '工商业设备',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%B7%A5%E5%95%86%E4%B8%9A%E8%AE%BE%E5%A4%87.jpg?v=232566885',
  },
  {
    name: '健康���美容',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%81%A5%E5%BA%B7%E5%92%8C%E7%BE%8E%E5%AE%B9.jpg?v=232566885',
  },
  {
    name: '办公、教育与安全',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%8A%9E%E5%85%AC%E6%95%99%E8%82%B2%E4%B8%8E%E5%AE%89%E5%85%A8.jpg?v=232566885',
  },
  {
    name: '宠物用品',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E5%AE%A0%E7%89%A9%E7%94%A8%E5%93%81.jpg?v=232566885',
  },
  {
    name: '玩具/婴童用品',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E7%8E%A9%E5%85%B7%E5%A9%B4%E7%AB%A5%E7%94%A8%E5%93%81.JPG?v=232566885',
  },
  {
    name: '汽摩配件',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%B1%BD%E6%91%A9%E9%85%8D%E4%BB%B6.jpg?v=232566885',
  },
  {
    name: '服饰箱包',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%9C%8D%E9%A5%B0%E7%AE%B1%E5%8C%85.jpg?v=232566885',
  },
  {
    name: '消费电子/器材',
    image: 'https://resource.saleyee.cn/Content/Images/asset/%E4%B8%80%E7%BA%A7%E5%88%86%E7%B1%BB%E5%9B%BE%E6%A0%872024/%E6%B6%88%E8%B4%B9%E7%94%B5%E5%AD%90%E5%99%A8%E6%9D%90.jpg?v=232566885',
  },
])

// Category filters mapping - 二级分类与一级分类的对应关系
const categoryFiltersMap = ref({
  0: ['全部', '家居装饰', '装饰画', '壁贴', '挂钟', '镜子', '烛台', '摆件', '��垫', '帷幔', '盆栽架', '挂毯', '卧室家具', '床架', '床垫', '���头', '床上用品', '床头灯', '衣柜', '梳妆台', '床尾凳', '儿童床', '床板', '入户家具', '鞋柜', '玄关桌', '玄关凳', '穿衣镜', '雨伞架', '门垫', '鞋架', '玄关柜', '衣帽架', '钥匙挂钩', '收纳用品', '书房家具', '卫浴用品', '厨房用品', '客厅家具'],
  1: ['全部', '庭院家具', '园艺工具', '户外装��', '防晒遮阳', '水景用品', '花盆花架', '户外照明'],
  2: ['全部', '古典乐器', '现代乐器', '音乐配件', '音乐教材', '音乐设备'],
  3: ['全部', '帐篷用品', '登山装备', '骑行车具', '户外��具', '睡袋防垫', '运动包', '便携工具'],
  4: ['全部', '厨房电器', '电子产品', '小家电', '电源配件', '智能家居'],
  5: ['全部', '工业机械', '商业设备', '农业机械', '建筑工具', '仓储设备'],
  6: ['全部', '护肤产品', '健身器材', '医疗器械', '美容工具', '健康食品'],
  7: ['全部', '办公用品', '教学用具', '安全防护', '电子产品', '照明设备'],
  8: ['全部', '宠物食品', '宠物玩��', '宠物床铺', '宠物饰品', '清洁用品'],
  9: ['全���', '���智玩具', '动作玩具', '户外运动', '婴儿用品', '儿童家具'],
  10: ['全部', '摩托配件', '汽车配件', '轮胎轮毂', '���护产品', '装饰用品'],
  11: ['全部', '上衣T恤', '裤子短裤', '连衣裙', '外套', '鞋类', '箱包配饰'],
  12: ['全部', '手机配件', '平板电脑', '摄像机', '音频设备', '游戏设备'],
})

// Product filters - 动态二级分类
const productFilters = computed(() => {
  return categoryFiltersMap.value[activeCategory.value] || ['全部']
})

// Product data - with category and subcategory mapping
const productsBase = [
  {
    title: '10层9格无纺布鞋柜 灰色',
    link: 'https://www.saleyee.com/item/00367745.html?warehouseId=126',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202101/b407526c-8b0b-4b9f-90c1-302a56d8925d.Jpeg',
    price: 'EUR 10.12',
    stock: 120,
    discount: '-8%',
    warehouses: ['DE', 'FR', 'UK', 'US'],
    categoryId: 0,
    subcategoryIndex: 2,
  },
  {
    title: '10层9格无纺布鞋柜咖啡色',
    link: 'https://www.saleyee.com/item/46217096.html?warehouseId=127',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202101/a777bf52-7e92-4dbf-b1e8-e7e3caf5d3f2.Jpeg',
    price: 'EUR 13.54',
    stock: 250,
    discount: '-3.97%',
    warehouses: ['FR', 'US', 'UK', 'DE'],
    categoryId: 0,
    subcategoryIndex: 2,
  },
  {
    title: '4层8格带布套3层挂衣杆 无纺布衣柜',
    link: 'https://www.saleyee.com/item/67325725.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202103/b57f8faf-edc2-406e-868b-75ff67a72827.Jpeg',
    price: 'USD 12.82',
    stock: 198,
    discount: '-44.98%',
    warehouses: ['US', 'UK'],
    categoryId: 0,
    subcategoryIndex: 1,
  },
  {
    title: '绿色��头喷白 7ft 870枝头 PVC材质 圣诞树',
    link: 'https://www.saleyee.com/item/44802000.html?warehouseId=126',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202110/755b02bc-8c47-4a17-a00d-7c3798089de1.Jpeg',
    price: 'EUR 25.60',
    stock: 340,
    discount: '',
    warehouses: ['DE', 'FR', 'UK'],
    categoryId: 1,
    subcategoryIndex: 3,
  },
  {
    title: '绿色喷白 6ft 650枝头 PVC材质 圣诞树',
    link: 'https://www.saleyee.com/item/65818713.html?warehouseId=126',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202110/442121e5-ef8b-4b9a-8542-ca9e3d5c6dde.Jpeg',
    price: 'EUR 19.90',
    stock: 275,
    discount: '',
    warehouses: ['DE', 'FR', 'UK'],
    categoryId: 1,
    subcategoryIndex: 3,
  },
  {
    title: '木塑板-5层雕花鞋架-A款（42*24*80cm）',
    link: 'https://www.saleyee.com/item/52666556.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202101/772b610c-71d7-4935-92af-acad4ca33b41.Jpeg',
    price: 'USD 26.32',
    stock: 364,
    discount: '-6%',
    warehouses: ['US'],
    categoryId: 0,
    subcategoryIndex: 0,
  },
  {
    title: '3抽抽屉柜 床头柜储物柜 白色',
    link: 'https://www.saleyee.com/item/75682614.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/85c45220-58e0-4610-9d6f-f5c3e4e64021.Jpeg',
    price: 'USD 55.00',
    stock: 520,
    discount: '-12%',
    warehouses: ['US'],
    categoryId: 0,
    subcategoryIndex: 1,
  },
  {
    title: '工业风可折叠储物箱工具箱',
    link: 'https://www.saleyee.com/item/01929826.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/be2f81e1-d2bc-411c-b82e-64133827b8a3.Jpeg',
    price: 'USD 42.00',
    stock: 280,
    discount: '-5%',
    warehouses: ['US'],
    categoryId: 0,
    subcategoryIndex: 4,
  },
  {
    title: '3-4人 蓝色 手搭便携 露营帐篷',
    link: 'https://www.saleyee.com/item/98102606.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202509/c1a1dc0d-8491-4420-ab09-2d5033e56e50.Jpeg',
    price: 'USD 78.50',
    stock: 410,
    discount: '',
    warehouses: ['US'],
    categoryId: 3,
    subcategoryIndex: 1,
  },
  {
    title: '40*30*52.5cm 矩形 双层桌板 圆棒腿 柚木色 庭院木边桌',
    link: 'https://www.saleyee.com/item/46811514.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/7628df6c-4a10-4aef-a066-a7f82dca173c.Jpeg',
    price: 'USD 95.00',
    stock: 190,
    discount: '-15%',
    warehouses: ['US'],
    categoryId: 1,
    subcategoryIndex: 1,
  },
  {
    title: '10pcs 黑色 铝框架 庭院塑料折叠椅',
    link: 'https://www.saleyee.com/item/89880061.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202509/586c98c3-636a-41ef-b077-0c89b5223cef.Jpeg',
    price: 'USD 15.30',
    stock: 823,
    discount: '-10%',
    warehouses: ['US'],
    categoryId: 1,
    subcategoryIndex: 1,
  },
  {
    title: '磨砂2.0 76*122厘米 凸型 30*48in PVC 地垫',
    link: 'https://www.saleyee.com/item/11900120.html?warehouseId=123',
    image: 'https://img-accelerate.saleyee.cn/upload/product/202509/6777fff5-ad0b-4cba-842d-193854be5a85.png',
    price: 'USD 46.29',
    stock: 119,
    discount: '-7%',
    warehouses: ['US'],
    categoryId: 0,
    subcategoryIndex: 5,
  },
]

// Carousel methods
const scrollCarouselRight = () => {
  const containerWidth = carouselContainerWidth.value || 800
  const maxOffset = Math.max(0, categories.value.length * 160 - containerWidth)
  carouselOffset.value = Math.min(carouselOffset.value + 160, maxOffset)
}

const scrollCarouselLeft = () => {
  carouselOffset.value = Math.max(0, carouselOffset.value - 160)
}

const selectCategory = (index, e) => {
  const dragDistance = Math.abs(dragStartX.value - (e?.clientX || 0))
  if (dragDistance > 5) return

  activeCategory.value = index
  activeFilter.value = 0
}

// Carousel drag methods
const onCarouselMouseDown = (e) => {
  isDragging.value = true
  dragStartX.value = e.clientX
  dragStartOffset.value = carouselOffset.value
}

const onCarouselMouseMove = (e) => {
  if (!isDragging.value) return

  const containerWidth = carouselContainerWidth.value || 800
  const maxOffset = Math.max(0, categories.value.length * 160 - containerWidth)
  const dragDistance = dragStartX.value - e.clientX
  const newOffset = dragStartOffset.value + dragDistance

  carouselOffset.value = Math.max(0, Math.min(newOffset, maxOffset))
}

const onCarouselMouseUp = () => {
  isDragging.value = false
}

const canScrollRight = computed(() => {
  const containerWidth = carouselContainerWidth.value || 800
  const maxOffset = Math.max(0, categories.value.length * 160 - containerWidth)
  return carouselOffset.value < maxOffset
})

onMounted(async () => {
  if (carouselContentRef.value) {
    carouselContainerWidth.value = carouselContentRef.value.offsetWidth
    window.addEventListener('resize', () => {
      if (carouselContentRef.value) {
        carouselContainerWidth.value = carouselContentRef.value.offsetWidth
      }
    })
  }

  // 初始化加载排行榜数据
  await loadRankingsData()
})

// 监听一级分类和二级分类的变化，重新加载排行榜数据
watch([activeCategory, activeFilter], async () => {
  await loadRankingsData()
})

// Filter products based on selected category and subcategory
const filteredProducts = computed(() => {
  return productsBase.filter((product) => {
    const matchesCategory = product.categoryId === activeCategory.value

    if (activeFilter.value === 0) {
      return matchesCategory
    }

    const matchesSubcategory = product.subcategoryIndex === activeFilter.value

    return matchesCategory && matchesSubcategory
  })
})

// Display products - grouped by 6 items per ul
const productGroups = computed(() => {
  const groups = []
  for (let i = 0; i < filteredProducts.value.length; i += 6) {
    groups.push(filteredProducts.value.slice(i, i + 6))
  }
  return groups
})

const hotRankingsBase = [
  {
    spu: '48805228',
    title: '10���9��无纺布鞋柜 黑色',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/5b1487bd-c161-4a8b-9a8b-5b07c7199fd2.Jpeg',
    heat: 6576,
    price: 'EUR 10.12',
    stock: 120,
    warehouses: ['US', 'UK', 'DE'],
  },
  {
    spu: '10380296',
    title: '【认证未出】铁制 20L 0.6mm 油桶 手拎 红色',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/4b1d68a8-895a-41ed-a001-e0d5621661a5.Jpeg',
    heat: 1908,
    price: 'USD 12.50',
    stock: 95,
    warehouses: ['US', 'UK', 'DE'],
  },
  {
    spu: '52194990',
    title: '32in ���艺 正方形 ���色 烧柴火盆',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202102/43f9078f-e24d-47c7-8f53-a743e042bc5f.Jpeg',
    heat: 1392,
    price: 'USD 25.00',
    stock: 230,
    warehouses: ['US', 'UK', 'FR'],
  },
  {
    spu: '97819768',
    title: '4/4 ���板 自然色 小提琴 N101',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202209/5bc737f9-f9fa-43eb-af41-2e2f8ad91065.Jpeg',
    heat: 1146,
    price: 'USD 35.00',
    stock: 150,
    warehouses: ['US', 'UK'],
  },
  {
    spu: '49192021',
    title: '铁���面板 27*27*34cm 黑色 可拆卸 片装便���式 野营火炉',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202405/c103f36e-c3d1-4716-bd72-28327d48a024.Jpeg',
    heat: 1068,
    price: 'USD 45.50',
    stock: 75,
    warehouses: ['US'],
  },
]

const favoriteRankingsBase = [
  {
    spu: '84908498',
    title: '绿色 7ft 1100枝头 PVC材质 圣诞树 N101 美国',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202111/865ccf5e-f038-43de-a838-f32827ec88d2.Jpeg',
    favorites: 261,
    price: 'USD 36.96',
    stock: 1460,
    warehouses: ['US', 'UK'],
  },
  {
    spu: '70669850',
    title: '5.9ft 夏威夷老人 6颗LED灯 束口袋 ��诞充气装饰',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/1bb16269-6a2c-4ae9-ad75-92691ee4d52a.Jpeg',
    favorites: 198,
    price: 'USD 28.50',
    stock: 890,
    warehouses: ['US'],
  },
  {
    spu: '49192021',
    title: '铁艺面板 27*27*34cm 黑�� 可拆卸 片装便携��� 野营火炉',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202405/c103f36e-c3d1-4716-bd72-28327d48a024.Jpeg',
    favorites: 189,
    price: 'USD 45.50',
    stock: 450,
    warehouses: ['US'],
  },
  {
    spu: '57091998',
    title: '��壳行李箱套装 3 件套三合一手提随身行李箱',
    image: 'https://img-accelerate.saleyee.cn/upload/product/202509/482c9d91-f629-47ef-bb67-f7c43e5405c2.png',
    favorites: 117,
    price: 'USD 52.00',
    stock: 620,
    warehouses: ['US'],
  },
  {
    spu: '04197299',
    title: '铸铁 6QT 烹饪锅具 渐变绿 含两个硅胶手套 珐琅锅',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/c0f1b0d5-d95a-42ca-91b9-d2a612aaa92e.Jpeg',
    favorites: 99,
    price: 'USD 68.90',
    stock: 340,
    warehouses: ['US'],
  },
]

const downloadRankingsBase = [
  {
    spu: '75682614',
    title: '3抽抽屉柜 床头柜储物柜 白色',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/85c45220-58e0-4610-9d6f-f5c3e4e64021.Jpeg',
    downloads: 153,
    variants: '6 个变种',
    price: 'USD 55.00',
    stock: 520,
    warehouses: ['US'],
  },
  {
    spu: '01929826',
    title: '工业风可折叠储物箱工��箱',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/be2f81e1-d2bc-411c-b82e-64133827b8a3.Jpeg',
    downloads: 144,
    price: 'USD 42.00',
    stock: 280,
    warehouses: ['US'],
  },
  {
    spu: '98102606',
    title: '3-4人 蓝色 手搭��携 露营帐篷',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202509/c1a1dc0d-8491-4420-ab09-2d5033e56e50.Jpeg',
    downloads: 144,
    price: 'USD 78.50',
    stock: 410,
    warehouses: ['US'],
  },
  {
    spu: '46811514',
    title: '40*30*52.5cm 矩形 双层桌板 圆棒腿 柚木色 庭院���边桌',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/7628df6c-4a10-4aef-a066-a7f82dca173c.Jpeg',
    downloads: 126,
    price: 'USD 95.00',
    stock: 190,
    warehouses: ['US'],
  },
  {
    spu: '89880061',
    title: '10pcs 黑�� 铝框架 庭院塑料折叠椅',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202509/586c98c3-636a-41ef-b077-0c89b5223cef.Jpeg',
    downloads: 126,
    price: 'USD 15.30',
    stock: 823,
    warehouses: ['US'],
  },
]

const publishRankingsBase = [
  {
    spu: '11900120',
    title: '��砂2.0 76*122厘米 凸型 30*48in PVC 地垫',
    image: 'https://img-accelerate.saleyee.cn/upload/product/202509/6777fff5-ad0b-4cba-842d-193854be5a85.png',
    publishes: 90,
    price: 'USD 46.29',
    stock: 119,
    warehouses: ['US'],
  },
  {
    spu: '76185510',
    title: '解压指尖五叶陀螺（4个装 彩缘泡泡颜色随机）',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/ad27a506-7b96-4173-8efb-48957a64a905.Jpeg',
    publishes: 81,
    price: 'USD 3.20',
    stock: 3500,
    warehouses: ['US'],
  },
  {
    spu: '44772942',
    title: '创意指尖陀���自行车链条解压旋转变��陀螺',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202405/01d958a5-79a7-4567-9b89-b5908e932ac0.Jpeg',
    publishes: 81,
    price: 'USD 4.50',
    stock: 2800,
    warehouses: ['US'],
  },
  {
    spu: '38289022',
    title: '6ft 红色葱布 圣���老人拿铃铛 200L暖白皮线灯',
    image: 'https://img-accelerate.saleyee.cn/upload/product/202509/822bf231-884a-4f41-92bc-3825f22a5f39.png',
    publishes: 81,
    price: 'USD 18.99',
    stock: 670,
    warehouses: ['US'],
  },
  {
    spu: '21141614',
    title: '深灰色 pvc复合 1pc 商用���垫 入户用',
    image: 'https://img-accelerate.saleyee.cn/upload/product/202509/fd8a496f-b87e-4b13-ac4a-ebe07f8561d8.png',
    publishes: 72,
    price: 'USD 32.50',
    stock: 415,
    warehouses: ['US'],
  },
]

// 从API加载排行榜数据
const loadRankingsData = async () => {
  isLoadingRankings.value = true
  try {
    // 根据当前选中的一级分类和二级分类查询数据
    const currentCategoryId = activeCategory.value + 1 // API中categoryId从1开始
    const currentSubcategoryId = activeFilter.value === 0 ? null : activeFilter.value // 0表示"全部"

    const response = await getAllRankings(currentCategoryId, currentSubcategoryId)

    if (response.success) {
      hotRankings.value = response.data.hotRankings
      favoriteRankings.value = response.data.favoriteRankings
      downloadRankings.value = response.data.downloadRankings
      publishRankings.value = response.data.publishRankings
    }
  } catch (error) {
    console.error('加载排行榜数据出错:', error)
    // 加载失败时使用备用数据
    hotRankings.value = extendDemo(hotRankingsBase, 1)
    favoriteRankings.value = extendDemo(favoriteRankingsBase, 1)
    downloadRankings.value = extendDemo(downloadRankingsBase, 1)
    publishRankings.value = extendDemo(publishRankingsBase, 1)
  } finally {
    isLoadingRankings.value = false
  }
}

const extendDemo = (arr, times = 1) => {
  const out = [...arr]
  for (let t = 0; t < times; t++) {
    out.push(
      ...arr.map((it, idx) => ({
        ...it,
        spu: `${it.spu}-demo${t + 1}-${idx + 1}`,
        title: `${it.title}（Demo ${t + 1}）`,
      })),
    )
  }
  return out
}
</script>

<style scoped></style>
