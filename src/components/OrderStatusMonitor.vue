<template>
  <Teleport to="body" v-if="isVisible">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black/35 z-40" @click="close"></div>

    <!-- 模态对话框 -->
    <div class="fixed bg-white rounded-lg shadow-xl z-50" :style="{ width: '550px', maxHeight: '75vh', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }">
      <!-- 标题栏 -->
      <div class="flex items-center justify-between h-12 px-4 border-b border-gray-200 bg-white rounded-t-lg">
        <h2 class="text-base font-medium text-gray-800">订单状态</h2>
        <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors" @click="close">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="overflow-y-auto" :style="{ maxHeight: 'calc(75vh - 100px)' }">
        <div class="p-4">
          <!-- 处理中状态 -->
          <div v-if="currentStatus === 'processing'" class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <h3 class="text-base font-semibold text-gray-800 mb-2">处理中...</h3>
            <p class="text-sm text-gray-600 mb-2">订单号：{{ orderNo }}</p>
            <p class="text-xs text-gray-500">{{ statusMessage }}</p>
          </div>

          <!-- 成功状态 -->
          <div v-else-if="currentStatus === 'success'" class="text-center">
            <div class="text-5xl mb-4">🎉</div>
            <h3 class="text-base font-semibold text-gray-800 mb-2">订单成功</h3>
            <p class="text-sm text-gray-600 mb-2">订单号：{{ orderNo }}</p>
            <p class="text-xs text-gray-500 mb-4">您的订单已成功提交</p>
          </div>

          <!-- 失败状态 -->
          <div v-else-if="currentStatus === 'failed'" class="text-center">
            <div class="text-5xl mb-4">⚠️</div>
            <h3 class="text-base font-semibold text-gray-800 mb-2">订单失败</h3>
            <p class="text-sm text-red-600 mb-2">{{ errorMessage }}</p>
            <p class="text-xs text-gray-500">请重新尝试或联系客服</p>
          </div>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <div class="flex items-center justify-end gap-2 h-12 px-4 border-t border-gray-200 bg-white rounded-b-lg">
        <button
          v-if="currentStatus === 'success' || currentStatus === 'failed'"
          type="button"
          class="px-4 py-2 text-xs font-medium text-white rounded transition-colors inline-flex items-center justify-center min-h-8"
          style="background-color: #FF6600;"
          @click="close"
          @mouseenter="$event.target.style.backgroundColor = '#FF7722'"
          @mouseleave="$event.target.style.backgroundColor = '#FF6600'"
        >
          关闭
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  orderNo: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const currentStatus = ref('processing')
const statusMessage = ref('正在处理...')
const errorMessage = ref('')
const eventSource = ref(null)

const resetStatus = () => {
  currentStatus.value = 'processing'
  statusMessage.value = '正在处理...'
  errorMessage.value = ''
}

watch(() => props.orderNo, (newOrderNo) => {
  if (newOrderNo && props.isVisible) {
    resetStatus()
    subscribeMercure(newOrderNo)
  }
}, { immediate: true })

watch(() => props.isVisible, (visible) => {
  if (!visible) {
    closeMercureConnection()
    setTimeout(() => {
      resetStatus()
    }, 300)
  } else if (props.orderNo) {
    resetStatus()
    subscribeMercure(props.orderNo)
  }
})

const subscribeMercure = async (orderNo) => {
  closeMercureConnection()
  
  try {
    const tokenResponse = await fetch(`/api/mercure/token?orderNo=${encodeURIComponent(orderNo)}`, {
      credentials: 'include'
    })
    
    const tokenData = await tokenResponse.json()
    
    if (!tokenData.success || !tokenData.token) {
      currentStatus.value = 'failed'
      errorMessage.value = '连接失败，请重试'
      return
    }
    
    const mercureUrl = new URL('http://127.0.0.1:3000/.well-known/mercure')
    mercureUrl.searchParams.append('topic', tokenData.topic)
    const finalUrl = `${mercureUrl.toString()}&authorization=${tokenData.token}`
    
    eventSource.value = new EventSource(finalUrl)
    
    eventSource.value.onopen = () => {
      statusMessage.value = '已连接'
    }
    
    eventSource.value.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        handleMercureMessage(data)
      } catch (e) {
        console.error('消息解析失败:', e)
      }
    }
    
    eventSource.value.onerror = () => {
      if (eventSource.value?.readyState === EventSource.CLOSED) {
        currentStatus.value = 'failed'
        errorMessage.value = '连接已断开'
      }
    }
  } catch (error) {
    console.error('创建 Mercure 连接失败:', error)
    currentStatus.value = 'failed'
    errorMessage.value = '连接异常'
  }
}

const handleMercureMessage = (data) => {
  switch (data.step) {
    case 'price_verified':
      statusMessage.value = '价格验证成功'
      break
      
    case 'completed':
      currentStatus.value = 'success'
      closeMercureConnection()
      break
      
    case 'failed':
    case 'error':
      currentStatus.value = 'failed'
      errorMessage.value = data.message || '处理失败'
      closeMercureConnection()
      break
      
    default:
      if (data.message) {
        statusMessage.value = data.message
      }
  }
}

const closeMercureConnection = () => {
  if (eventSource.value) {
    eventSource.value.close()
    eventSource.value = null
  }
}

const close = () => {
  emit('close')
}

onBeforeUnmount(() => {
  closeMercureConnection()
})
</script>

<style scoped>
/* 动画 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Teleport 样式 */
:deep(.fixed.inset-0) {
  background-color: rgba(0, 0, 0, 0.35) !important;
}

:deep(.fixed.bg-white) {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  border-radius: 6px !important;
}

:deep(.flex.items-center.justify-between.h-12) {
  height: 50px !important;
  padding: 0 16px !important;
}

:deep(.text-base.font-medium.text-gray-800) {
  color: #333333 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}

:deep(.text-gray-400.hover\:text-gray-600) {
  color: #bfbfbf !important;
  transition: color 0.2s ease !important;
}

:deep(.text-gray-400.hover\:text-gray-600:hover) {
  color: #FF6600 !important;
}

:deep(.overflow-y-auto) {
  background-color: #ffffff !important;
}

:deep(.text-center) {
  text-align: center;
}

:deep(.text-5xl) {
  font-size: 48px;
  line-height: 1;
}

:deep(.text-base.font-semibold.text-gray-800) {
  color: #333333 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}

:deep(.text-sm.text-gray-600) {
  color: #666666 !important;
  font-size: 14px !important;
}

:deep(.text-xs.text-gray-500) {
  color: #999999 !important;
  font-size: 12px !important;
}

:deep(.text-sm.text-red-600) {
  color: #ff4d4f !important;
  font-size: 14px !important;
}

:deep(.flex.items-center.justify-end.gap-2.h-12) {
  height: 50px !important;
  padding: 0 16px !important;
  gap: 8px !important;
}

:deep(.text-white.rounded) {
  color: #ffffff !important;
  background-color: #FF6600 !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 8px 16px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-height: 32px !important;
}

:deep(.text-white.rounded:hover) {
  background-color: #FF7722 !important;
  box-shadow: 0 2px 8px rgba(255, 102, 0, 0.15) !important;
}

@media (max-width: 900px) {
  :deep(.fixed.bg-white) {
    width: 85% !important;
    max-width: 520px !important;
  }
}

@media (max-width: 640px) {
  :deep(.fixed.bg-white) {
    width: 90% !important;
    max-width: 450px !important;
  }
}
</style>
