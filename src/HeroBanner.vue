<script setup>
import { onMounted, onUnmounted, ref, computed, inject, watch } from 'vue'

const props = defineProps({
  heroHeight: {
    type: Number,
    required: false
  }
})

// 从父组件注入 homeData
const homeData = inject('homeData', ref(null))

// 计算属性：从 homeData 中获取轮播图数据
const slides = computed(() => {
  if (homeData.value && homeData.value.sliders && homeData.value.sliders.length > 0) {
    // 使用后端返回的轮播图数据
    return homeData.value.sliders.map(slider => slider.url || slider.path)
  }
  // 如果没有轮播图数据，不显示任何图片
  return []
})

// 默认图片计算属性：从 homeData 中获取第一张图片作为默认图片
const defaultSlide = computed(() => {
  if (homeData.value && homeData.value.sliders && homeData.value.sliders.length > 0) {
    return homeData.value.sliders[0].url || homeData.value.sliders[0].path
  }
  // 如果没有轮播图数据，使用默认图片路径
  return '/frondend/images/slider/06189dc6-4039-4415-9581-e5d1bee4983b.jpg'
})

// 是否显示轮播图
const showSlides = computed(() => slides.value.length > 0)

const index = ref(0)
let timer

// guard usage of window during render by tracking desktop state in setup
const isDesktop = ref(false)
function updateIsDesktop() {
  if (typeof window !== 'undefined') isDesktop.value = window.innerWidth >= 768
}

// 当轮播图数据变化时，重置索引和定时器
watch(slides, (newSlides) => {
  // 重置索引
  index.value = 0
  // 重启定时器
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
  if (newSlides.length > 1) {
    timer = window.setInterval(() => {
      index.value = (index.value + 1) % newSlides.length
    }, 4500)
  }
})

onMounted(() => {
  updateIsDesktop()
  window.addEventListener('resize', updateIsDesktop)
  if (slides.value.length > 1) {
    timer = window.setInterval(() => {
      index.value = (index.value + 1) % slides.value.length
    }, 4500)
  }
})

onUnmounted(() => {
  if (timer) window.clearInterval(timer)
  if (typeof window !== 'undefined') window.removeEventListener('resize', updateIsDesktop)
})

const heroStyle = computed(() => {
  const h = props.heroHeight ?? 480
  return isDesktop.value ? { height: h + 'px' } : {}
})
</script>

<template>
  <section class="bg-slate-100 w-full">
    <!-- 显示轮播图 -->
    <div v-if="showSlides" :style="heroStyle" class="relative overflow-hidden rounded-md bg-white shadow-sm z-10 w-full">
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
      <div v-if="slides.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
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
        v-if="slides.length > 1"
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
        v-if="slides.length > 1"
        class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50"
        @click="index = (index + 1) % slides.length"
        aria-label="下一张"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    
    <!-- 显示默认图片 -->
    <div v-else :style="heroStyle" class="relative overflow-hidden rounded-md bg-white shadow-sm z-10 w-full">
      <img
        :src="defaultSlide"
        class="absolute inset-0 h-full w-full object-cover"
        alt="默认轮播图"
      />
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