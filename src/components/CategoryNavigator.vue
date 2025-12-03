<template>
  <div class="category-navigator bg-white shadow-sm border border-slate-200 rounded overflow-hidden">
    <!-- 加载状态 -->
    <div v-if="isLoading" class="px-4 py-8">
      <div class="animate-pulse space-y-3">
        <div class="h-10 bg-slate-200 rounded"></div>
        <div class="h-8 bg-slate-100 rounded ml-4"></div>
        <div class="h-8 bg-slate-100 rounded ml-4"></div>
        <div class="h-10 bg-slate-200 rounded"></div>
        <div class="h-8 bg-slate-100 rounded ml-4"></div>
      </div>
    </div>
    
    <!-- 一级分类列表 -->
    <div v-else-if="displayCategories.length > 0" class="category-scroll-container">
      <div 
        v-for="cat in displayCategories" 
        :key="cat.id"
        class="border-b border-slate-200 last:border-b-0"
      >
        <!-- 一级分类标题 -->
        <div 
          @click="handleCategoryClick(cat.id, null, null)"
          class="px-4 py-3 cursor-pointer transition-colors"
          :class="isCategory1Active(cat.id) ? 'bg-primary text-white font-semibold' : 'hover:bg-slate-50 text-slate-700'"
        >
          <span class="text-sm">{{ getCategoryTitle(cat) }}</span>
        </div>

        <!-- 二级分类列表（展开显示） -->
        <div v-if="shouldShowSubcategories(cat.id) && cat.children && cat.children.length > 0" class="bg-slate-50">
          <div 
            v-for="subCat in cat.children" 
            :key="subCat.id"
            class="border-t border-slate-200"
          >
            <!-- 二级分类标题 -->
            <div 
              @click="handleCategoryClick(cat.id, subCat.id, null)"
              class="px-6 py-2 cursor-pointer transition-colors text-sm flex items-start"
              :class="isCategory2Active(subCat.id) ? 'bg-primary text-white font-semibold' : 'hover:bg-slate-100 text-slate-600'"
            >
              <span class="mr-1">·</span>
              <span>{{ getSubCategoryTitle(subCat) }}</span>
            </div>

            <!-- 三级分类列表（仅当选中该二级分类或其下的三级分类时显示） -->
            <div v-if="shouldShowItems(subCat.id) && subCat.items && subCat.items.length > 0" class="bg-white">
              <div 
                v-for="item in subCat.items" 
                :key="item.id"
                @click="handleCategoryClick(cat.id, subCat.id, item.id)"
                class="px-8 py-2 cursor-pointer transition-colors text-xs flex items-start border-t border-slate-100"
                :class="selectedCategory3 === item.id ? 'bg-primary text-white font-semibold' : 'hover:bg-slate-50 text-slate-500'"
              >
                <span class="mr-1">·</span>
                <span>{{ getItemTitle(item) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="px-4 py-8 text-center text-slate-400 text-sm">
      暂无分类
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  selectedCategory1: {
    type: [Number, String],
    default: ''
  },
  selectedCategory2: {
    type: [Number, String],
    default: ''
  },
  selectedCategory3: {
    type: [Number, String],
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['category-click'])

// 当前语言
const currentLang = ref('zh-CN')

// 根据选中的分类显示对应的分类树
const displayCategories = computed(() => {
  if (!props.categories || props.categories.length === 0) {
    return []
  }

  // 如果选中了三级分类，显示：一级 > 二级 > 该二级下的所有三级
  if (props.selectedCategory3) {
    // 找到对应的一级和二级分类
    for (const cat of props.categories) {
      if (cat.children) {
        for (const subCat of cat.children) {
          if (subCat.items) {
            const foundItem = subCat.items.find(item => item.id === props.selectedCategory3)
            if (foundItem) {
              // 返回包含完整二级分类及其所有三级分类的树
              return [{
                ...cat,
                children: [{
                  ...subCat,
                  items: subCat.items  // 显示该二级分类下的所有三级分类
                }]
              }]
            }
          }
        }
      }
    }
  }

  // 如果选中了二级分类，显示：一级 > 二级 > 所有三级
  if (props.selectedCategory2) {
    // 找到对应的一级分类
    for (const cat of props.categories) {
      if (cat.children) {
        const foundSubCat = cat.children.find(subCat => subCat.id === props.selectedCategory2)
        if (foundSubCat) {
          return [{
            ...cat,
            children: [foundSubCat]
          }]
        }
      }
    }
  }

  // 如果选中了一级分类，显示：一级 > 所有二级
  if (props.selectedCategory1) {
    const foundCat = props.categories.find(cat => cat.id === props.selectedCategory1)
    if (foundCat) {
      return [foundCat]
    }
  }

  // 默认显示所有一级分类
  return props.categories
})

// 根据语言获取分类标题
const getCategoryTitle = (category) => {
  return currentLang.value === 'en' ? (category.titleEn || category.title) : category.title
}

// 根据语言获取子分类标题
const getSubCategoryTitle = (subCategory) => {
  return currentLang.value === 'en' ? (subCategory.titleEn || subCategory.title) : subCategory.title
}

// 根据语言获取项目标题
const getItemTitle = (item) => {
  return currentLang.value === 'en' ? (item.titleEn || item.title) : item.title
}

// 处理分类点击
const handleCategoryClick = (categoryId, subcategoryId, itemId) => {
  emit('category-click', { categoryId, subcategoryId, itemId })
}

// 判断一级分类是否应该高亮
const isCategory1Active = (categoryId) => {
  // 如果只选中了一级分类（没有选中二级和三级），则一级分类高亮
  return props.selectedCategory1 === categoryId && !props.selectedCategory2 && !props.selectedCategory3
}

// 判断二级分类是否应该高亮
const isCategory2Active = (subcategoryId) => {
  // 如果选中了二级分类（没有选中三级），则二级分类高亮
  return props.selectedCategory2 === subcategoryId && !props.selectedCategory3
}

// 判断是否应该显示二级分类列表
const shouldShowSubcategories = (categoryId) => {
  // 当选中该一级分类时，显示其下的所有二级分类
  return props.selectedCategory1 === categoryId
}

// 判断是否应该显示三级分类列表
const shouldShowItems = (subcategoryId) => {
  // 当选中该二级分类，或者选中了该二级分类下的某个三级分类时，显示三级列表
  return props.selectedCategory2 === subcategoryId
}

// 监听语言变化
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

// 组件挂载时初始化语言
if (typeof window !== 'undefined') {
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  window.addEventListener('languagechange', handleLangChange)
}
</script>

<style scoped>
.bg-primary {
  background-color: #cb261c;
}

.text-primary {
  color: #cb261c;
}

.bg-primary\/10 {
  background-color: rgba(203, 38, 28, 0.1);
}

.bg-primary\/5 {
  background-color: rgba(203, 38, 28, 0.05);
}

/* 导航容器最大高度 */
.category-navigator {
  max-height: 650px;
  display: flex;
  flex-direction: column;
}

/* 滚动容器 */
.category-scroll-container {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条样式 */
.category-scroll-container::-webkit-scrollbar {
  width: 2px;
}

.category-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.category-scroll-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e1; /* 灰色 slate-300 */
  border-radius: 2px;
  transition: background-color 0.2s;
}

.category-scroll-container::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8; /* 深灰色 slate-400 */
}

/* Firefox 滚动条样式 */
.category-scroll-container {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
</style>
