<script setup>
const props = defineProps({
  // 骨架屏类型：hero-banner, category-sidebar, platform-boutique, floor, product-list
  type: {
    type: String,
    default: 'product-list'
  },
  // 商品数量（用于 product-list 和 floor 类型）
  count: {
    type: Number,
    default: 10
  },
  // 列数（用于 product-list 类型）
  columns: {
    type: Number,
    default: 5
  }
})
</script>

<template>
  <!-- Hero Banner 骨架屏 -->
  <div v-if="type === 'hero-banner'" class="skeleton-hero-banner">
    <div class="skeleton-box" style="width: 100%; height: 480px; border-radius: 8px;"></div>
  </div>

  <!-- Category Sidebar 骨架屏 -->
  <div v-else-if="type === 'category-sidebar'" class="skeleton-category-sidebar">
    <div class="skeleton-box" style="width: 210px; height: 480px; border-radius: 8px;"></div>
  </div>

  <!-- Platform Boutique 骨架屏 -->
  <div v-else-if="type === 'platform-boutique'" class="skeleton-platform-boutique" style="background-color: #F2F3F7; padding: 40px 0;">
    <div class="mx-auto w-full max-w-[1500px] md:w-[80%]">
      <!-- 标题骨架 -->
      <div class="skeleton-box mx-auto" style="width: 200px; height: 36px; margin-bottom: 30px;"></div>
      
      <!-- 平台标签骨架 -->
      <div class="flex justify-center gap-4 mb-8">
        <div v-for="i in 6" :key="i" class="skeleton-box" style="width: 120px; height: 40px; border-radius: 20px;"></div>
      </div>
      
      <!-- 产品网格骨架 -->
      <div class="grid grid-cols-5 gap-4">
        <div v-for="i in 10" :key="i" class="skeleton-product-card">
          <div class="skeleton-box" style="width: 100%; height: 200px; margin-bottom: 12px;"></div>
          <div class="skeleton-box" style="width: 80%; height: 16px; margin: 0 auto 8px;"></div>
          <div class="skeleton-box" style="width: 60%; height: 16px; margin: 0 auto;"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floor 楼层骨架屏 -->
  <div v-else-if="type === 'floor'" class="skeleton-floor" style="background-color: #F2F3F7; padding: 40px 0;">
    <div class="mx-auto w-full max-w-[1500px] md:w-[80%]">
      <!-- 楼层标题骨架 -->
      <div class="skeleton-box mx-auto" style="width: 300px; height: 36px; margin-bottom: 30px;"></div>
      
      <!-- 产品列表骨架 -->
      <div class="border border-slate-300 rounded bg-white">
        <div class="flex flex-wrap" style="row-gap: 10px;">
          <div 
            v-for="i in count" 
            :key="i" 
            class="skeleton-product-card"
            :style="{
              width: '20%',
              borderRight: i % 5 === 0 ? 'none' : '1px solid #e2e8f0',
              boxSizing: 'border-box',
              padding: '20px'
            }"
          >
            <div class="skeleton-box" style="width: 190px; height: 190px; margin: 0 auto 16px;"></div>
            <div class="skeleton-box" style="width: 80%; height: 14px; margin: 0 auto 8px;"></div>
            <div class="skeleton-box" style="width: 60%; height: 14px; margin: 0 auto;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Product List 商品列表骨架屏 -->
  <div v-else-if="type === 'product-list'" class="skeleton-product-list">
    <div 
      class="grid gap-4" 
      :style="{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }"
    >
      <div v-for="i in count" :key="i" class="skeleton-product-card bg-white border border-slate-200 rounded p-4">
        <div class="skeleton-box" style="width: 100%; aspect-ratio: 1; margin-bottom: 12px;"></div>
        <div class="skeleton-box" style="width: 100%; height: 16px; margin-bottom: 8px;"></div>
        <div class="skeleton-box" style="width: 80%; height: 16px; margin-bottom: 8px;"></div>
        <div class="skeleton-box" style="width: 60%; height: 20px;"></div>
      </div>
    </div>
  </div>

  <!-- Grid Layout 网格布局骨架屏（通用） -->
  <div v-else class="skeleton-grid">
    <div 
      class="grid gap-4" 
      :style="{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }"
    >
      <div v-for="i in count" :key="i" class="skeleton-box" style="width: 100%; height: 300px; border-radius: 8px;"></div>
    </div>
  </div>
</template>

<style scoped>
/* 骨架屏基础样式 */
.skeleton-box {
  background: linear-gradient(
    90deg,
    #f0f0f0 0%,
    #f8f8f8 50%,
    #f0f0f0 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 骨架屏容器样式 */
.skeleton-hero-banner,
.skeleton-category-sidebar,
.skeleton-platform-boutique,
.skeleton-floor,
.skeleton-product-list,
.skeleton-grid {
  width: 100%;
}

.skeleton-product-card {
  display: flex;
  flex-direction: column;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .skeleton-platform-boutique .grid,
  .skeleton-product-list .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
  
  .skeleton-floor .flex {
    flex-wrap: wrap;
  }
  
  .skeleton-floor .skeleton-product-card {
    width: 50% !important;
  }
}
</style>
