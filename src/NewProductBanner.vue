<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: false,
    default: () => [
      {
        image: 'https://resource.saleyee.com/Content/Images/asset/%E6%96%B0%E5%93%81banner/%E6%96%B0%E5%93%81%E4%B8%8A%E5%B8%82.jpg?v=397110619',
        link: 'https://www.saleyee.com/subject/ap67303.html',
      },
    ]
  },
  height: {
    type: Number,
    required: false,
    default: 400
  },
  interval: {
    type: Number,
    required: false,
    default: 4500
  }
})

const slides = props.slides || [
  {
    image: 'https://resource.saleyee.com/Content/Images/asset/%E6%96%B0%E5%93%81banner/%E6%96%B0%E5%93%81%E4%B8%8A%E5%B8%82.jpg?v=397110619',
    link: 'https://www.saleyee.com/subject/ap67303.html',
  },
]

const height = props.height ?? 400
const interval = props.interval ?? 4500

const idx = ref(0)
let timer

function start() {
  stop()
  if (slides.length > 1) {
    timer = window.setInterval(() => {
      idx.value = (idx.value + 1) % slides.length
    }, interval)
  }
}

function stop() {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function goToPrev() {
  idx.value = (idx.value - 1 + slides.length) % slides.length
  start()
}

function goToNext() {
  idx.value = (idx.value + 1) % slides.length
  start()
}

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})
</script>

<!-- ... existing template and style sections remain unchanged ... -->

<template>
  <div class="relative overflow-hidden rounded-md" :style="{ height: height + 'px' }">
    <transition name="fade" mode="out-in">
      <a
        v-if="slides.length > 0"
        :key="idx"
        :href="slides[idx].link"
        target="_blank"
        class="block absolute inset-0 w-full h-full"
      >
        <img :src="slides[idx].image" :alt="`Banner ${idx + 1}`" class="w-full h-full object-cover" />
      </a>
    </transition>

    <!-- Previous button -->
    <button
      v-if="slides.length > 1"
      @click="goToPrev"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
      aria-label="Previous slide"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Next button -->
    <button
      v-if="slides.length > 1"
      @click="goToNext"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/50 transition-colors"
      aria-label="Next slide"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Indicators -->
    <div v-if="slides.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, i) in slides"
        :key="i"
        @click="idx = i; start()"
        :class="i === idx ? 'bg-white' : 'bg-white/50'"
        class="h-2 w-2 rounded-full transition-all"
        :aria-label="`Go to slide ${i + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>