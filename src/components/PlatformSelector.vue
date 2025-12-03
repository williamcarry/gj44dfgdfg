<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  platforms: {
    type: Array,
    required: true,
    // 期望格式: [
    //   { key: 'amazon', name: 'Amazon', image: '...' },
    //   { key: 'walmart', name: 'Walmart', image: '...' },
    //   ...
    // ]
  },
  modelValue: {
    type: String,
    default: ''
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  labelText: {
    type: String,
    default: '选择平台'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const activePlatform = computed({
  get() {
    return props.modelValue || (props.platforms.length > 0 ? props.platforms[0].key : '')
  },
  set(value) {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

function selectPlatform(platformKey) {
  activePlatform.value = platformKey
}

function getImageClass(platform) {
  if (activePlatform.value === platform.key) {
    return 'h-12 w-auto object-contain'
  }
  // 对于 temu, shein, tiktok 等平台，未选中时显示灰色
  if (['temu', 'shein', 'tiktok'].includes(platform.key)) {
    return 'h-12 w-auto object-contain filter grayscale opacity-60'
  }
  return 'h-12 w-auto object-contain'
}
</script>

<template>
  <div class="w-full">
    <!-- 标签 -->
    <div v-if="showLabel" class="mb-3 text-sm font-semibold text-slate-700">
      {{ labelText }}
    </div>

    <!-- 平台选择器 -->
    <div class="flex border-b border-slate-300 overflow-x-auto">
      <button
        v-for="platform in platforms"
        :key="platform.key"
        class="flex-1 min-w-max px-4 py-4 text-center cursor-pointer transition-all duration-200 border-r border-slate-300 flex flex-col items-center gap-2"
        :class="
          activePlatform === platform.key
            ? 'bg-white border-b-4 border-b-red-600 -mb-px'
            : 'bg-slate-50 hover:bg-slate-100'
        "
        @click="selectPlatform(platform.key)"
      >
        <img
          :src="platform.image"
          :alt="platform.name"
          :class="getImageClass(platform)"
        />
        <span v-if="platform.name" class="text-xs text-slate-600">{{ platform.name }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 确保滚动条隐藏但可以滚动 */
div::-webkit-scrollbar {
  height: 4px;
}

div::-webkit-scrollbar-track {
  background: transparent;
}

div::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
