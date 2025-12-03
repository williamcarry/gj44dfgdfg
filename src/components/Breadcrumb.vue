<template>
  <div class="mb-4">
    <div class="flex items-center flex-wrap gap-1 text-sm">
      <!-- 首页链接 -->
      <a href="/" class="text-slate-500 hover:text-primary transition cursor-pointer">
        {{ t('home') }}
      </a>
      
      <template v-if="breadcrumbs.length > 0">
        <span class="text-slate-400 mx-1">></span>
        
        <!-- 动态面包屑 -->
        <template v-for="(crumb, index) in breadcrumbs" :key="index">
          <!-- 所有项都显示为可点击的链接 -->
          <a 
            href="javascript:void(0)"
            @click="handleBreadcrumbClick(crumb)"
            class="text-slate-500 hover:text-primary transition cursor-pointer"
          >
            {{ crumb.title }}
          </a>
          
          <!-- 分隔符（不在最后一项显示） -->
          <span 
            v-if="index < breadcrumbs.length - 1" 
            class="text-slate-400 mx-1"
          >
            >
          </span>
        </template>
      </template>
      
      <!-- 如果没有选择分类，显示默认的"所有商品" -->
      <template v-else>
        <span class="text-slate-400 mx-1">></span>
        <a href="javascript:void(0)" @click="handleAllProductsClick" class="text-slate-500 hover:text-primary transition cursor-pointer">
          {{ t('allProducts') }}
        </a>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

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
  }
})

const emit = defineEmits(['category-click'])

// 当前语言
const currentLang = ref('zh-CN')

// 多语言配置
const messages = {
  'zh-CN': {
    home: '首页',
    allProducts: '所有商品'
  },
  'en': {
    home: 'Home',
    allProducts: 'All Products'
  }
}

// 翻译函数
const t = (key) => {
  return messages[currentLang.value]?.[key] || messages['zh-CN']?.[key] || key
}

// 根据语言获取标题
const getTitle = (item) => {
  if (!item) return ''
  return currentLang.value === 'en' ? (item.titleEn || item.title) : item.title
}

// 计算面包屑导航
const breadcrumbs = computed(() => {
  const crumbs = []
  
  if (!props.categories || props.categories.length === 0) {
    return crumbs
  }
  
  // 查找选中的一级分类
  let selectedCat1 = null
  let selectedCat2 = null
  let selectedCat3 = null
  
  if (props.selectedCategory1) {
    selectedCat1 = props.categories.find(cat => cat.id === props.selectedCategory1)
    
    if (selectedCat1) {
      // 添加一级分类到面包屑
      crumbs.push({
        title: getTitle(selectedCat1),
        url: `/all-categories-products?categoryId=${selectedCat1.id}`,
        categoryId: selectedCat1.id,
        subcategoryId: null,
        itemId: null
      })
      
      // 如果选中了二级分类，继续查找
      if (props.selectedCategory2 && selectedCat1.children) {
        selectedCat2 = selectedCat1.children.find(subCat => subCat.id === props.selectedCategory2)
        
        if (selectedCat2) {
          // 添加二级分类到面包屑
          crumbs.push({
            title: getTitle(selectedCat2),
            url: `/all-categories-products?subcategoryId=${selectedCat2.id}`,
            categoryId: null,
            subcategoryId: selectedCat2.id,
            itemId: null
          })
          
          // 如果选中了三级分类，继续查找
          if (props.selectedCategory3 && selectedCat2.items) {
            selectedCat3 = selectedCat2.items.find(item => item.id === props.selectedCategory3)
            
            if (selectedCat3) {
              // 添加三级分类到面包屑
              crumbs.push({
                title: getTitle(selectedCat3),
                url: `/all-categories-products?itemId=${selectedCat3.id}`,
                categoryId: null,
                subcategoryId: null,
                itemId: selectedCat3.id
              })
            }
          }
        }
      }
    }
  }
  
  return crumbs
})

// 处理面包屑点击事件
const handleBreadcrumbClick = (crumb) => {
  emit('category-click', {
    categoryId: crumb.categoryId,
    subcategoryId: crumb.subcategoryId,
    itemId: crumb.itemId
  })
}

// 处理“所有商品”点击
const handleAllProductsClick = () => {
  emit('category-click', {
    categoryId: null,
    subcategoryId: null,
    itemId: null
  })
}

// 监听语言变化
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

onMounted(() => {
  // 初始化当前语言
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  
  // 监听语言变化事件
  window.addEventListener('languagechange', handleLangChange)
})

onUnmounted(() => {
  // 移除语言变化事件监听
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<style scoped>
.text-primary {
  color: #cb261c;
}

a:hover {
  color: #cb261c;
}
</style>
