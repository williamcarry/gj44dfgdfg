<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  floorData: {
    type: Object,
    required: true
  }
})

// 当前语言
const currentLang = ref('zh-CN')

// 获取当前语言环境
const currentLanguage = computed(() => {
  return currentLang.value
})

// 根据语言显示标题
const displayTitle = computed(() => {
  return currentLanguage.value === 'en' ? props.floorData.nameEn : props.floorData.name
})

// 处理楼层产品数据
const themes = computed(() => {
  if (!props.floorData || !props.floorData.products) {
    return []
  }

  // 过滤掉没有ID的商品（按照规范：商品ID为空则不应显示）
  const validProducts = props.floorData.products.filter(product => product.id)

  // 如果没有有效商品，返回空数组
  if (validProducts.length === 0) {
    return []
  }

  // 将产品数据转换为组件需要的格式
  const products = validProducts.map(product => ({
    id: product.id,
    title: product.title,
    titleEn: product.titleEn,
    img: product.thumbnail_image
  }))

  return [
    {
      title: props.floorData.name,
      products: products
    }
  ]
})

// 检查是否有有效商品（按照规范：有效商品数量为0时不渲染整个区域）
const hasValidProducts = computed(() => {
  return themes.value.length > 0 && themes.value[0].products.length > 0
})

function productLink(p) {
  // @ts-ignore allow missing id
  const id = p.id
  return id ? `/shop/item/${id}` : '#'
}

function linkTarget(p) {
  const link = productLink(p)
  return /^https?:\/\//.test(link) ? '_blank' : undefined
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

// 组件挂载时初始化语言
onMounted(() => {
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  window.addEventListener('languagechange', handleLangChange)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<template>
  <!-- 只有当有有效商品时才渲染楼层 -->
  <section v-if="hasValidProducts" class="w-full" style="background-color: #F2F3F7;">
    <!-- 标题 -->
    <div class="w-full text-center py-11" style="background-color: #F2F3F7;">
      <h2 class="text-3xl font-bold text-slate-800 flex items-center justify-center gap-6">
        <span class="floor-decoration-left flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#CB261C" opacity="0.8"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#CB261C" opacity="0.5"/>
          </svg>
        </span>
        {{ displayTitle }}
        <span class="floor-decoration-right flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#CB261C" opacity="0.5"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#CB261C" opacity="0.8"/>
          </svg>
        </span>
      </h2>
    </div>

    <!-- 两个主题区域 -->
    <div class="mx-auto max-w-[1500px] w-[80%]" style="display: flex; flex-direction: column; gap: 10px;">
      <div v-for="(theme, themeIdx) in themes" :key="themeIdx">
        <!-- 产品列表 - 5列布局 -->
        <div class="flex justify-center">
          <ul class="flex flex-wrap border border-slate-300 rounded" style="row-gap:10px; margin: 0; padding: 0; list-style: none;">
            <li
              v-for="(product, productIdx) in theme.products"
              :key="product.id"
              class="flex flex-col items-center text-center border-r border-slate-200 bg-white"
              :style="{
                width: '20%',
                borderRight: productIdx % 5 === 4 ? 'none' : '1px solid #e2e8f0',
                boxSizing: 'border-box'
              }">
              <div class="w-full flex flex-col items-center py-5">
                <!-- 产品图片 -->
                <a :href="productLink(product)" :target="linkTarget(product)" class="block text-center mb-3">
                  <img
                    :src="product.img"
                    :alt="currentLanguage === 'en' ? product.titleEn : product.title"
                    loading="lazy"
                    class="inline-block w-[190px] h-[190px] object-contain cursor-pointer transition-all hover:opacity-80"
                    style="margin-top: 35px; margin-bottom: 25px"
                  />
                </a>

                <!-- 产品标题和价格 -->
                <div class="px-2 pb-8 w-full flex-1 flex flex-col">
                  <a
                    :href="productLink(product)"
                    :target="linkTarget(product)"
                    class="text-sm text-slate-800 hover:text-primary transition line-clamp-2 h-12 flex items-center justify-center"
                  >
                    {{ currentLanguage === 'en' ? product.titleEn : product.title }}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: rgb(203, 38, 28);
}

.floor-decoration-left,
.floor-decoration-right {
  animation: sparkle 2s ease-in-out infinite;
}

.floor-decoration-right {
  animation-delay: 1s;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}
</style>