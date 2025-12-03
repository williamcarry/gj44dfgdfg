<template>
  <div v-if="type === 'product-list'" class="grid" :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: '1.5rem' }">
    <div v-for="i in count" :key="i" class="bg-white rounded-lg overflow-hidden shadow-sm p-4">
      <!-- Image skeleton -->
      <div class="aspect-square bg-slate-200 rounded mb-4 animate-pulse"></div>
      
      <!-- Title skeleton -->
      <div class="space-y-2 mb-3">
        <div class="h-4 bg-slate-200 rounded animate-pulse"></div>
        <div class="h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
      </div>
      
      <!-- SPU skeleton -->
      <div class="h-3 bg-slate-200 rounded animate-pulse w-2/3 mb-3"></div>
      
      <!-- Price skeleton -->
      <div class="p-2 bg-slate-50 rounded mb-3">
        <div class="h-6 bg-slate-200 rounded animate-pulse mb-2"></div>
        <div class="h-3 bg-slate-200 rounded animate-pulse w-4/5"></div>
      </div>
      
      <!-- Warehouse buttons skeleton -->
      <div class="flex flex-wrap gap-2 mb-3">
        <div v-for="j in 3" :key="j" class="h-8 w-12 bg-slate-200 rounded animate-pulse"></div>
      </div>
      
      <!-- Footer skeleton -->
      <div class="flex items-center justify-between pt-3">
        <div class="h-5 w-5 bg-slate-200 rounded animate-pulse"></div>
        <div class="flex items-center gap-2">
          <div v-for="k in 3" :key="k" class="h-8 w-8 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'product-list',
  },
  count: {
    type: Number,
    default: 16,
  },
  columns: {
    type: Number,
    default: 4,
  },
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
