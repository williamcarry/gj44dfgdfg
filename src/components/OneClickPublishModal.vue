<template>
  <Teleport to="body" v-if="isOpen">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black/30 z-40" @click="closeModal"></div>

    <!-- 模态对话框 -->
    <div class="fixed bg-white rounded-lg shadow-2xl z-50" :style="{ width: '500px', maxHeight: '90vh', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }">
      <!-- 标题栏 -->
      <div class="flex items-center justify-between h-12 px-5 border-b border-gray-200 bg-gray-50 rounded-t-lg cursor-move select-none" @mousedown="startDrag">
        <h2 class="text-sm font-medium text-gray-800">一键刊登</h2>
        <button type="button" class="text-gray-400 hover:text-gray-600" @click="closeModal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="overflow-y-auto" :style="{ maxHeight: 'calc(90vh - 48px)' }">
        <div class="p-5">
          <p class="text-base font-medium text-gray-900 mb-5">选择刊登的平台：</p>

          <!-- 平台选择卡片 -->
          <div class="grid grid-cols-2 gap-5 mb-5">
            <!-- Amazon -->
            <div
              class="flex items-center justify-center w-full h-32 border border-gray-300 bg-white rounded cursor-pointer hover:border-primary hover:shadow-md transition-all"
              @click="publishToAmazon"
            >
              <img
                alt="Amazon"
                loading="lazy"
                src="https://www.saleyee.com/ContentNew/Images/2022/202203/amozon_logo.png"
                class="max-w-48 max-h-24"
              />
            </div>

            <!-- Shopify -->
            <div
              class="flex items-center justify-center w-full h-32 border border-gray-300 bg-white rounded cursor-pointer hover:border-primary hover:shadow-md transition-all"
              @click="publishToShopify"
            >
              <img
                alt="Shopify"
                loading="lazy"
                src="https://www.saleyee.com/ContentNew/Images/2022/202203/shopify_logo.png"
                class="max-w-48 max-h-24"
              />
            </div>
          </div>

          <!-- 提示信息 -->
          <div class="flex items-start gap-2 p-3 bg-gray-50 rounded border border-gray-200">
            <img
              alt=""
              loading="lazy"
              src="https://www.saleyee.com/ContentNew/Images/2022/202203/shopify_tips.png"
              class="w-4 h-4 flex-shrink-0 mt-0.5"
            />
            <span class="text-sm text-gray-600">其他平台的刊登功能还在开发中，敬请期待...</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  productId: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['close', 'publish'])

const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)

function closeModal() {
  emit('close')
}

function startDrag(event) {
  isDragging.value = true
  dragStartX.value = event.clientX
  dragStartY.value = event.clientY
}

function publishToAmazon() {
  emit('publish', 'amazon')
  closeModal()
}

function publishToShopify() {
  emit('publish', 'shopify')
  closeModal()
}
</script>