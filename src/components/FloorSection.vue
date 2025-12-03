<script setup>
import { computed } from 'vue'
import FloorLayout from './FloorLayout.vue'

// 定义组件属性
const props = defineProps({
  floor: {
    type: Object,
    required: true
  },
  language: {
    type: String,
    default: 'zh-CN'
  }
})

// 计算标题，根据语言环境选择中英文标题
const floorTitle = computed(() => {
  if (props.language === 'en') {
    return props.floor.nameEn || props.floor.name || ''
  }
  return props.floor.name || props.floor.nameEn || ''
})
</script>

<template>
  <FloorLayout :title="floorTitle">
    <!-- 这里可以添加楼层的具体内容 -->
    <div class="py-8">
      <p class="text-center text-gray-500">楼层 {{ floorTitle }} 的内容区域</p>
    </div>
  </FloorLayout>
</template>

<style scoped>
/* 可以添加楼层组件的特定样式 */
</style>