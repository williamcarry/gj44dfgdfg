<template>
  <Teleport to="body" v-if="isOpen">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black/35 z-40" @click="closeModal"></div>

    <!-- 模态对话框 -->
    <div class="fixed bg-white rounded-lg shadow-xl z-50" :style="{ width: '550px', maxHeight: '75vh', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }">
      <!-- 标题栏 -->
      <div class="flex items-center justify-between h-12 px-4 border-b border-gray-200 bg-white rounded-t-lg">
        <h2 class="text-base font-medium text-gray-800">{{ t('title') }}</h2>
        <button type="button" class="text-gray-400 hover:text-gray-600 transition-colors" @click="closeModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="overflow-y-auto" :style="{ maxHeight: 'calc(75vh - 100px)' }">
        <div class="p-4">
          <!-- 订单信息摘要 -->
          <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
            <div class="flex gap-3">
              <!-- 商品缩略图 -->
              <div class="flex-shrink-0">
                <img
                  v-if="productImage"
                  :src="productImage"
                  :alt="displayProductTitle"
                  class="w-16 h-16 object-cover rounded border border-gray-300"
                />
                <div v-else class="w-16 h-16 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-gray-500 text-xs">
                  {{ t('noImage') }}
                </div>
              </div>
              <!-- 商品信息 -->
              <div class="flex-1">
                <p class="text-xs text-gray-600 mb-2">
                  {{ t('productLabel') }}<span class="text-gray-900 font-medium">{{ displayProductTitle }}</span>
                </p>
                
                <!-- 总价 -->
                <p class="text-xs text-gray-600 mb-2">
                  {{ t('totalPriceLabel') }}<span class="text-base font-bold text-orange-600">{{ totalPrice }}</span>
                </p>
                
                <p class="text-xs text-gray-600 mb-2">
                  {{ t('quantityLabel') }}<span class="text-gray-900 font-medium">{{ quantity }}</span>
                </p>
                
                <!-- 价格明细 -->
                <div v-if="priceBreakdown && priceBreakdown.length > 0" class="mt-2 pt-2 border-t border-gray-300">
                  <p class="text-xs text-gray-500 mb-1 font-medium">{{ t('totalReduction') }}</p>
                  <div v-for="(item, index) in priceBreakdown" :key="index" class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{{ item.label }}</span>
                    <span :class="item.amount < 0 ? 'text-green-600' : 'text-gray-900'">
                      {{ item.amount < 0 ? '' : '+' }}{{ item.currency }} {{ item.amount.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 支付方式选择 -->
          <p class="text-sm font-medium text-gray-900 mb-3">选择支付方式：</p>

          <div class="grid grid-cols-3 gap-3 mb-3">
            <!-- 微信支付 -->
            <div
              v-show="false"
              class="flex flex-col items-center justify-center w-full p-2 border rounded-lg cursor-pointer transition-all"
              :class="selectedMethod === 'wechat' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white hover:border-gray-400'"
              @click="selectedMethod = 'wechat'"
            >
              <img
                :alt="t('wechatPay')"
                loading="lazy"
                src="/frondend/images/ItemDetailPage/wechat.png"
                class="w-8 h-8 mb-2 flex-shrink-0"
                onerror="this.src='https://via.placeholder.com/32?text=WeChat'"
              />
              <span class="text-xs font-medium text-gray-800 text-center">{{ t('wechatPay') }}</span>
            </div>

            <!-- 支付宝 -->
            <div
              v-show="false"
              class="flex flex-col items-center justify-center w-full p-2 border rounded-lg cursor-pointer transition-all"
              :class="selectedMethod === 'alipay' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-gray-400'"
              @click="selectedMethod = 'alipay'"
            >
              <img
                :alt="t('alipay')"
                loading="lazy"
                src="/frondend/images/ItemDetailPage/alipay.png"
                class="w-8 h-8 mb-2 flex-shrink-0"
                onerror="this.src='https://via.placeholder.com/32?text=Alipay'"
              />
              <span class="text-xs font-medium text-gray-800 text-center">{{ t('alipay') }}</span>
            </div>

            <!-- 信用卡 -->
            <div
              v-show="false"
              class="flex flex-col items-center justify-center w-full p-2 border rounded-lg cursor-pointer transition-all"
              :class="selectedMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-gray-400'"
              @click="selectedMethod = 'card'"
            >
              <svg class="w-8 h-8 mb-2 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"></path>
              </svg>
              <span class="text-xs font-medium text-gray-800 text-center">{{ t('creditCard') }}</span>
            </div>

            <!-- PayPal -->
            <div
              v-show="false"
              class="flex flex-col items-center justify-center w-full p-2 border rounded-lg cursor-pointer transition-all"
              :class="selectedMethod === 'paypal' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-white hover:border-gray-400'"
              @click="selectedMethod = 'paypal'"
            >
              <img
                :alt="t('paypal')"
                loading="lazy"
                src="/frondend/images/ItemDetailPage/paypal.png"
                class="w-8 h-8 mb-2 flex-shrink-0"
                onerror="this.src='https://via.placeholder.com/32?text=PayPal'"
              />
              <span class="text-xs font-medium text-gray-800 text-center">{{ t('paypal') }}</span>
            </div>

            <!-- 余额支付 -->
            <div
              class="flex flex-col items-center justify-center w-full p-2 border rounded-lg cursor-pointer transition-all"
              :class="selectedMethod === 'balance' ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white hover:border-gray-400'"
              @click="selectedMethod = 'balance'"
            >
              <svg class="w-8 h-8 mb-2 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-xs font-medium text-gray-800 text-center">{{ t('balancePay') }}</span>
            </div>

            <!-- Payoneer -->
            <div
              class="flex flex-col items-center justify-center w-full p-2 border rounded-lg cursor-pointer transition-all"
              :class="selectedMethod === 'payoneer' ? 'border-cyan-500 bg-cyan-50' : 'border-gray-300 bg-white hover:border-gray-400'"
              @click="selectedMethod = 'payoneer'"
            >
              <img
                :alt="t('payoneer')"
                loading="lazy"
                src="/frondend/images/ItemDetailPage/payoneer.png"
                class="w-8 h-8 mb-2 flex-shrink-0"
                onerror="this.src='https://via.placeholder.com/32?text=Payoneer'"
              />
              <span class="text-xs font-medium text-gray-800 text-center">{{ t('payoneer') }}</span>
            </div>
          </div>

          <!-- 支付方式说明 -->
          <div class="rounded-lg p-2 mb-3" style="background-color: #FFF8F0; border: 1px solid #FFE8CC;">
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 flex-shrink-0 mt-0.5" style="color: #FF6600;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <p class="text-xs" style="color: #8B4513; line-height: 18px;">
                <span class="font-medium" style="color: #FF6600;">温馨提示：</span>
                请选择合适的支付方式完成订单支付。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <div class="flex items-center justify-end gap-2 h-12 px-4 border-t border-gray-200 bg-white rounded-b-lg">
        <button
          type="button"
          class="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded transition-colors inline-flex items-center justify-center min-h-8 line-height-1"
          @click="closeModal"
        >
          取消
        </button>
        <button
          type="button"
          class="px-4 py-2 text-xs font-medium text-white rounded transition-colors inline-flex items-center justify-center min-h-8 line-height-1"
          style="background-color: #FF6600;"
          :style="{ 'background-color': !selectedMethod ? '#CCCCCC' : '#FF6600', 'cursor': !selectedMethod ? 'not-allowed' : 'pointer' }"
          :disabled="!selectedMethod"
          @click="handlePayment"
          @mouseenter="$event.target.style.backgroundColor = !selectedMethod ? '#CCCCCC' : '#FF8833'"
          @mouseleave="$event.target.style.backgroundColor = !selectedMethod ? '#CCCCCC' : '#FF6600'"
        >
          确认支付
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue'

// 页面翻译数据
const translations = ref({})

// 当前语言（从 localStorage 读取初始值）
const currentLang = ref(localStorage.getItem('app.lang') || 'zh-CN')

// 加载翻译文件
const loadTranslations = async () => {
  try {
    const response = await fetch('/frondend/lang/PaymentMethodModal.json')
    const data = await response.json()
    translations.value = data
  } catch (error) {
    console.error('Failed to load translations:', error)
  }
}

// 翻译函数
const t = (key) => {
  const lang = currentLang.value
  if (translations.value[lang] && translations.value[lang][key]) {
    return translations.value[lang][key]
  }
  return key
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
  loadTranslations()
}

// 商品标题显示：根据语言动态选择
const displayProductTitle = computed(() => {
  // 使用 currentLang.value 确保响应式更新
  const lang = currentLang.value
  // 中文环境显示中文标题
  if (lang === 'zh-CN') {
    return props.productTitle || ''
  }
  // 英文环境优先显示英文标题，没有英文标题则显示中文标题
  return props.productTitleEn || props.productTitle || ''
})

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  productTitle: {
    type: String,
    required: true
  },
  productTitleEn: {
    type: String,
    default: ''
  },
  productImage: {
    type: String,
    default: ''
  },
  quantity: {
    type: Number,
    default: 1
  },
  totalPrice: {
    type: String,
    required: true
  },
  priceBreakdown: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'confirm'])

const selectedMethod = ref(null)

function closeModal() {
  selectedMethod.value = null
  emit('close')
}

function handlePayment() {
  if (!selectedMethod.value) return
  emit('confirm', selectedMethod.value)
  closeModal()
}

onMounted(() => {
  loadTranslations()
  window.addEventListener('languagechange', handleLangChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<style scoped>
/* ============================================
   支付方式模态框 - 轻盈小巧风格设计
   ============================================ */

/* 基础样式 */
div {
  box-sizing: border-box;
}

/* 背景遮罩 */
:deep(.fixed.inset-0) {
  background-color: rgba(0, 0, 0, 0.35) !important;
}

/* 模态框主容器 - 轻盈小巧 */
:deep(.fixed.bg-white) {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
  border-radius: 6px !important;
  background: #ffffff !important;
}

/* 标题栏 - 紧凑 */
:deep(.flex.items-center.justify-between.h-12) {
  height: 50px !important;
  padding: 0 16px !important;
}

:deep(.text-base.font-medium.text-gray-800) {
  color: #333333 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}

/* 关闭按钮 */
:deep(.text-gray-400.hover\:text-gray-600) {
  color: #bfbfbf !important;
  transition: color 0.2s ease !important;
}

:deep(.text-gray-400.hover\:text-gray-600:hover) {
  color: #FF6600 !important;
}

/* 内容区域 */
:deep(.overflow-y-auto) {
  background-color: #ffffff !important;
}

/* 订单信息卡片 */
:deep(.bg-gray-50.p-3) {
  background-color: #fafafa !important;
  border: 1px solid #f0f0f0 !important;
  border-radius: 6px !important;
  padding: 12px !important;
  margin-bottom: 12px !important;
}

:deep(.w-16.h-16) {
  width: 64px !important;
  height: 64px !important;
  flex-shrink: 0;
}

/* 文本 */
:deep(.text-xs.text-gray-600) {
  color: #666666 !important;
  font-size: 12px !important;
  line-height: 18px !important;
  margin-bottom: 4px !important;
}

/* 总价 */
:deep(.text-base.font-bold.text-orange-600) {
  color: #FF6600 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
}

/* 支付方式标题 */
:deep(.text-sm.font-medium.text-gray-900) {
  color: #333333 !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  margin-bottom: 12px !important;
}

/* 支付方式网格 */
:deep(.grid.grid-cols-3.gap-3) {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 12px !important;
  margin-bottom: 12px !important;
}

:deep(.flex.flex-col.items-center.justify-center.w-full.p-2) {
  border: 1px solid #e8e8e8 !important;
  border-radius: 6px !important;
  padding: 8px !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  background-color: #ffffff !important;
}

:deep(.flex.flex-col.items-center.justify-center.w-full.p-2:hover) {
  border-color: #FF6600 !important;
  box-shadow: 0 2px 8px rgba(255, 102, 0, 0.08) !important;
}

/* 选中状态 */
:deep(.border-orange-500) {
  border-color: #FF6600 !important;
  background-color: #fffaf5 !important;
  box-shadow: 0 2px 8px rgba(255, 102, 0, 0.1) !important;
}

:deep(.bg-orange-50) {
  background-color: #fffaf5 !important;
}

/* 支付方式图标 */
:deep(.w-8.h-8.mb-2) {
  width: 32px !important;
  height: 32px !important;
  margin-bottom: 4px !important;
  flex-shrink: 0;
}

/* 支付方式文本 */
:deep(.text-xs.font-medium.text-gray-800) {
  color: #333333 !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  text-align: center !important;
}

/* 其他颜色 */
:deep(.border-blue-500) {
  border-color: #3b82f6 !important;
}

:deep(.bg-blue-50) {
  background-color: #f0f9ff !important;
}

:deep(.border-green-500) {
  border-color: #10b981 !important;
}

:deep(.bg-green-50) {
  background-color: #f0fdf4 !important;
}

:deep(.border-yellow-500) {
  border-color: #eab308 !important;
}

:deep(.bg-yellow-50) {
  background-color: #fefce8 !important;
}

:deep(.border-purple-500) {
  border-color: #a855f7 !important;
}

:deep(.bg-purple-50) {
  background-color: #faf5ff !important;
}

:deep(.text-purple-600) {
  color: #a855f7 !important;
}

:deep(.border-cyan-500) {
  border-color: #06b6d4 !important;
}

:deep(.bg-cyan-50) {
  background-color: #ecf8ff !important;
}

/* 提示框 */
:deep(.rounded-lg.p-2.mb-3) {
  border-radius: 6px !important;
  padding: 8px !important;
  margin-bottom: 12px !important;
}

:deep(.flex.items-start.gap-2) {
  display: flex !important;
  align-items: flex-start !important;
  gap: 6px !important;
}

:deep(.w-4.h-4) {
  width: 16px !important;
  height: 16px !important;
}

/* 底部按钮栏 */
:deep(.flex.items-center.justify-end.gap-2.h-12) {
  height: 50px !important;
  padding: 0 16px !important;
  background: #ffffff !important;
  border-top: 1px solid #f0f0f0 !important;
  gap: 8px !important;
}

/* 取消按钮 */
:deep(.text-gray-700.bg-white.border.border-gray-300) {
  color: #666666 !important;
  background-color: #ffffff !important;
  border: 1px solid #d9d9d9 !important;
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
  line-height: 1 !important;
}

:deep(.text-gray-700.bg-white.border.border-gray-300:hover) {
  background-color: #fafafa !important;
  border-color: #bfbfbf !important;
  color: #333333 !important;
}

/* 确认支付按钮 */
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
  line-height: 1 !important;
}

:deep(.text-white.rounded:hover:not(:disabled)) {
  background-color: #FF7722 !important;
  box-shadow: 0 2px 8px rgba(255, 102, 0, 0.15) !important;
}

:deep(.text-white.rounded:disabled) {
  background-color: #d9d9d9 !important;
  cursor: not-allowed !important;
  opacity: 1 !important;
}

/* 响应式 */
@media (max-width: 900px) {
  :deep(.fixed.bg-white) {
    width: 85% !important;
    max-width: 520px !important;
  }

  :deep(.grid.grid-cols-3.gap-3) {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 8px !important;
  }
}

@media (max-width: 640px) {
  :deep(.fixed.bg-white) {
    width: 90% !important;
    max-width: 450px !important;
  }

  :deep(.grid.grid-cols-3.gap-3) {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
  }

  :deep(.w-16.h-16) {
    width: 56px !important;
    height: 56px !important;
  }
}
</style>
