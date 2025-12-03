<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'

const props = defineProps({
  heroHeight: {
    type: Number,
    required: false
  }
})

const slides = [
  'https://resource.saleyee.com/UploadFiles/Images/2025/202510/06189dc6-4039-4415-9581-e5d1bee4983b.jpg',
  'https://resource.saleyee.com/UploadFiles/Images/2025/202509/00cf4684-6f64-483a-9bd3-ca982f03b8ef.png',
  'https://resource.saleyee.com/UploadFiles/Images/2025/202509/49bbf525-ac11-4d7e-b8ba-f502c58b4407.jpg',
  'https://resource.saleyee.com/UploadFiles/Images/2024/202403/424c4fdb-71a9-4620-a92a-35e59dbbdb73.jpg',
  'https://cdn.builder.io/api/v1/image/assets%2F2307aeed993f441d8cd6d1b0fa348237%2F1f1a06586d06463892fb583f0d575ee4?format=webp&width=1400',
]

const index = ref(0)
let timer

// guard usage of window during render by tracking desktop state in setup
const isDesktop = ref(false)
function updateIsDesktop() {
  if (typeof window !== 'undefined') isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  updateIsDesktop()
  window.addEventListener('resize', updateIsDesktop)
  if (slides.length > 1) {
    timer = window.setInterval(() => {
      index.value = (index.value + 1) % slides.length
    }, 4500)
  }
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
  if (typeof window !== 'undefined') window.removeEventListener('resize', updateIsDesktop)
})

const heroStyle = computed(() => {
  const h = props.heroHeight ?? 460
  return isDesktop.value ? { height: h + 'px' } : {}
})
</script>

<template>
  <section class="bg-slate-100 w-full">
    <div :style="heroStyle" class="relative overflow-hidden rounded-md bg-white shadow-sm z-10 w-full">
      <transition-group name="fade" tag="div" class="h-full w-full relative block">
        <img
          v-for="(src, i) in slides"
          :key="src + i + index"
          v-show="i === index"
          :src="src"
          class="absolute inset-0 h-full w-full object-cover"
          alt="轮播图"
        />
      </transition-group>
      <!-- indicators -->
      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        <button
          v-for="(s, i) in slides"
          :key="'ind' + i"
          class="h-2 w-2 rounded-full"
          :class="i === index ? 'bg-white' : 'bg-white/50'"
          @click="index = i"
          aria-label="切换轮播"
        />
      </div>
      <!-- arrows -->
      <button
        class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50"
        @click="index = (index - 1 + slides.length) % slides.length"
        aria-label="上一张"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50"
        @click="index = (index + 1) % slides.length"
        aria-label="下一张"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
