<template>
  <div v-if="totalPages > 1" class="pagination-container">
    <button 
      :disabled="currentPage === 1" 
      @click="changePage(currentPage - 1)"
      class="pagination-btn pagination-prev"
    >
      &lt;
    </button>
    
    <!-- 智能页码显示 -->
    <template v-for="page in visiblePages" :key="page">
      <button 
        v-if="page === '...'" 
        class="pagination-btn pagination-ellipsis"
        disabled
      >
        ...
      </button>
      <button 
        v-else
        :class="['pagination-btn', { 'active': page === currentPage }]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </template>
    
    <button 
      :disabled="currentPage === totalPages" 
      @click="changePage(currentPage + 1)"
      class="pagination-btn pagination-next"
    >
      &gt;
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 0
  },
  changePage: {
    type: Function,
    default: () => {}
  }
})

// 计算可见页码
const visiblePages = computed(() => {
  const pagerCount = 11
  const halfPagerCount = Math.floor(pagerCount / 2)
  const currentPageNum = props.currentPage
  const allPages = props.totalPages
  
  let showPages = []
  
  if (allPages <= pagerCount) {
    // 总页数小于等于11页时，显示所有页码
    for (let i = 1; i <= allPages; i++) {
      showPages.push(i)
    }
  } else {
    // 总页数大于11页时，使用省略号折叠
    if (currentPageNum <= halfPagerCount + 1) {
      // 在第1页附近
      for (let i = 1; i <= pagerCount - 2; i++) {
        showPages.push(i)
      }
      showPages.push('...')
      showPages.push(allPages)
    } else if (currentPageNum >= allPages - halfPagerCount) {
      // 在最后一页附近
      showPages.push(1)
      showPages.push('...')
      for (let i = allPages - pagerCount + 3; i <= allPages; i++) {
        showPages.push(i)
      }
    } else {
      // 在中间位置
      showPages.push(1)
      showPages.push('...')
      for (let i = currentPageNum - halfPagerCount + 2; i <= currentPageNum + halfPagerCount - 2; i++) {
        showPages.push(i)
      }
      showPages.push('...')
      showPages.push(allPages)
    }
  }
  
  return showPages
})
</script>

<style scoped>
/* 分页样式 - 更精致的样式 */
.pagination-container {
  position: inherit;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-top: 20px;
}

.pagination-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f5f7fa;
  border-color: #d1d5db;
  color: #cb261c;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background-color: #cb261c;
  color: white;
  border-color: #cb261c;
}

.pagination-btn.active:hover {
  background-color: #a91e14;
  border-color: #a91e14;
  color: white; /* 确保悬停时字体为白色 */
}

.pagination-prev,
.pagination-next {
  font-weight: bold;
}

.pagination-ellipsis {
  border: none;
  background: transparent;
  cursor: default;
}

.pagination-ellipsis:hover {
  background: transparent;
  color: #333;
}

@media (max-width: 767px) {
  /* 移动端分页样式调整 */
  .pagination-container {
    gap: 4px;
  }
  
  .pagination-btn {
    min-width: 28px;
    height: 28px;
    font-size: 12px;
  }
}
</style>