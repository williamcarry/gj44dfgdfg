<template>
  <div class="hidden md:block category-sidebar bg-white border-r border-b shadow-sm" style="height: 480px">
    <ul class="h-full flex flex-col divide-y divide-gray-200">
      <li
        v-for="cat in categories"
        :key="cat.key"
        class="relative group flex flex-col"
        style="height: calc(480px / 14);"
      >
        <!-- Level 1: Main category item -->
        <a
          :href="getCategoryLink(cat.id, 1)"
          class="flex items-center px-4 text-sm text-slate-700 hover:bg-slate-50 border-l-4 border-transparent hover:border-primary cursor-pointer transition-colors"
          style="height: 100%"
        >
          <span class="icon w-5 h-5 flex items-center justify-center text-slate-400 mr-3 flex-shrink-0">
            <component :is="getIconComponent(cat.icon)" class="h-4 w-4" :stroke-width="1.8" />
          </span>
          <span class="truncate flex-1">{{ getCategoryTitle(cat) }}</span>
        </a>

        <!-- mega panel: appears to the right of the sidebar and overlays the hero -->
        <div
          class="mega-panel absolute left-full top-0 hidden group-hover:block z-[9999]"
          style="overflow: visible"
        >
          <div class="bg-white shadow-lg overflow-hidden flex" style="height: 480px">
            <!-- Left content: category menu -->
            <div class="flex-1 p-6 flex flex-col gap-4 max-w-2xl overflow-y-auto">
              <!-- Each category group -->
              <div v-for="(subCat, idx) in cat.children" :key="cat.key + '-col-' + idx" class="category-group flex items-flex-start gap-2">
                <a :href="getCategoryLink(subCat.id, 2)" class="category-title font-bold text-slate-600 text-sm hover:text-red-500 transition-colors cursor-pointer">{{ getSubCategoryTitle(subCat) }}</a>
                <div class="arrow text-slate-400 flex-shrink-0">
                  <ChevronRight class="h-4 w-4" :stroke-width="2" />
                </div>
                <div class="subcategories flex flex-wrap gap-2 flex-1 text-xs">
                  <a
                    v-for="(item, i) in subCat.items"
                    :key="cat.key + '-item-' + idx + '-' + i"
                    :href="getCategoryLink(item.id, 3)"
                    class="text-slate-600 hover:text-red-500 transition-colors whitespace-nowrap"
                  >
                    {{ getItemTitle(item) }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Right column: promotion section -->
            <div class="promotion-image w-80 flex flex-col items-center justify-center flex-shrink-0" style="background-color: #e6f2ea">
              <!-- Promotion menus -->
              <div v-if="cat.promotions && cat.promotions.length > 0" class="w-full" >
                <div 
                  v-for="promotion in cat.promotions" 
                  :key="promotion.id"
                  class="promotion-item mb-4 last:mb-0"
                >
                  <!-- 促销图片链接，点击跳转到分类商品页 -->
                  <a 
                    :href="getCategoryLink(cat.id, 1)"
                    class="promotion-image-container w-full overflow-hidden block"
                    style="width: 320px; height: 480px;"
                  >
                    <img 
                      v-if="promotion.imageUrl"
                      :src="getSignedImageUrl(promotion.imageUrl)" 
                      :alt="promotion.title"
                      class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      @error="handleImageError"
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, inject, watch } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
const { ChevronRight } = LucideIcons

// 定义 categories 数据
const categories = ref([])

// 从父组件注入首页数据
const homeData = inject('homeData', null)

// 当前语言
const currentLang = ref('zh-CN')

// 获取当前语言环境
const currentLanguage = computed(() => {
  return currentLang.value
})

// 根据语言获取分类标题
const getCategoryTitle = (category) => {
  return currentLanguage.value === 'en' ? (category.titleEn || category.title) : category.title
}

// 根据语言获取子分类标题
const getSubCategoryTitle = (subCategory) => {
  return currentLanguage.value === 'en' ? (subCategory.titleEn || subCategory.title) : subCategory.title
}

// 根据语言获取项目标题
const getItemTitle = (item) => {
  return currentLanguage.value === 'en' ? (item.titleEn || item.title) : item.title
}

// 根据分类级别生成链接
const getCategoryLink = (id, level) => {
  if (!id) return '#'
  
  const baseUrl = '/all-categories-products'
  
  switch (level) {
    case 1:
      return `${baseUrl}?categoryId=${id}`
    case 2:
      return `${baseUrl}?subcategoryId=${id}`
    case 3:
      return `${baseUrl}?itemId=${id}`
    default:
      return baseUrl
  }
}

// 更新分类数据
const updateCategories = () => {
  if (homeData && homeData.value && homeData.value.categories) {
    categories.value = homeData.value.categories
    
    // 获取所有促销菜单的图片签名URL
    fetchPromotionImageUrls()
  }
}

// 动态获取图标组件 - 支持后台动态配置任意Lucide图标
const getIconComponent = (iconName) => {
  if (!iconName) return LucideIcons.Home
  
  // 直接从Lucide图标库中动态获取对应的图标组件
  const IconComponent = LucideIcons[iconName]
  
  // 如果找不到对应图标，返回默认Home图标
  return IconComponent || LucideIcons.Home
}

// 缓存签名URL，避免重复请求
const signedUrlCache = new Map()

// 获取图片签名URL
const getSignedImageUrl = (imageKey) => {
  // 如果是完整URL，直接返回
  if (imageKey && imageKey.startsWith('http')) {
    return imageKey
  }
  
  // 如果缓存中有，直接返回
  if (signedUrlCache.has(imageKey)) {
    return signedUrlCache.get(imageKey)
  }
  
  // 否则返回原始key，稍后通过API获取签名URL
  return imageKey
}

// 处理图片加载错误
const handleImageError = (event) => {
  console.error('图片加载失败:', event.target.src)
  // 可以在这里设置默认图片或隐藏图片
}

// 从 API 获取分类数据
const fetchCategories = async () => {
  try {
    const response = await fetch('/shop/api/home/categories')
    const result = await response.json()
    
    console.log('📦 后台返回的分类数据:', result)
    
    if (result.success && result.data.categories) {
      categories.value = result.data.categories
      
      // 获取所有促销菜单的图片签名URL
      await fetchPromotionImageUrls()
    }
  } catch (error) {
    console.error('获取分类数据失败:', error)
  }
}

// 获取促销菜单图片的签名URL
const fetchPromotionImageUrls = async () => {
  try {
    // 确保 categories.value 是数组
    if (!Array.isArray(categories.value)) {
      console.warn('categories.value 不是数组:', categories.value)
      return
    }
    
    // 收集所有需要获取签名URL的图片key
    const imageKeys = []
    for (const cat of categories.value) {
      if (cat.promotions && cat.promotions.length > 0) {
        for (const promotion of cat.promotions) {
          if (promotion.imageUrl && !promotion.imageUrl.startsWith('http')) {
            imageKeys.push(promotion.imageUrl)
          }
        }
      }
    }
    
    // 去重
    const uniqueImageKeys = [...new Set(imageKeys)]
    
    // 批量获取签名URL
    const promises = uniqueImageKeys.map(async (key) => {
      try {
        const response = await fetch('/shop/api/home/image-signed-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key })
        })
        const result = await response.json()
        
        if (result.success) {
          signedUrlCache.set(key, result.url)
          return { key, url: result.url }
        }
      } catch (error) {
        console.error('获取图片签名URL失败:', error)
      }
      return { key, url: key } // 如果失败，返回原始key
    })
    
    // 等待所有请求完成
    await Promise.all(promises)
    
    // 强制更新视图
    categories.value = [...categories.value]
  } catch (error) {
    console.error('获取促销菜单图片签名URL失败:', error)
  }
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

// 组件挂载时获取数据
onMounted(() => {
  // 初始化当前语言
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  
  // 监听首页数据变化
  if (homeData) {
    const stopWatching = watch(homeData, updateCategories, { immediate: true })
    onUnmounted(() => stopWatching())
  }
  
  // 监听语言变化事件
  window.addEventListener('languagechange', handleLangChange)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<style scoped>
.bg-primary {
  background-color: #cb261c;
}

.mega-panel {
  min-width: 990px;
}

.mega-panel::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 28px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background: white;
  box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.1);
}

.category-group {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.category-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.category-title {
  font-weight: bold;
  color: #666;
  width: auto;
  flex-shrink: 0;
  font-size: 14px;
}

.arrow {
  color: #999;
  flex-shrink: 0;
  font-size: 12px;
  margin-left: -2px;
}

.subcategories {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
}

.subcategories a {
  color: #666;
  text-decoration: none;
  white-space: nowrap;
}

.subcategories a:hover {
  color: #f00;
}

.promotion-image {
  background-color: #e6f2ea;
}

.promotion-text h2 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.promotion-text h3 {
  font-size: 24px;
  color: #333;
}

.view-button {
  background-color: #5cb85c;
  color: white;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.view-button:hover {
  background-color: #4cae4c;
}

.decorative-image {
  width: 250px;
  height: 250px;
}

ul {
  list-style: none;
}

.category-sidebar {
  border-left: 1px solid #e5e7eb;
}
</style>