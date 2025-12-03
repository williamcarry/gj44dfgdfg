<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  height: {
    type: Number,
    required: false,
    default: 460
  },
  interval: {
    type: Number,
    required: false,
    default: 4500
  }
})

const slides = props.slides || []
const height = props.height ?? 460
const interval = props.interval ?? 4500

const idx = ref(0)
let timer

function start() {
  stop()
  timer = window.setInterval(() => {
    idx.value = (idx.value + 1) % slides.length
  }, interval)
}
function stop() {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}

onMounted(() => {
  if (slides.length > 1) start()
})
onUnmounted(() => stop())

watch(
  () => props.slides,
  (v) => {
    if (v && v.length > 1) start()
    else stop()
  },
)
</script>

<!-- ... existing template and style sections remain unchanged ... -->

<template>
  <div class="mega-carousel relative overflow-hidden" :style="{ height: height + 'px' }">
    <div class="h-full w-full relative">
      <transition name="fade" mode="out-in">
        <img
          :key="slides[idx] + idx"
          v-if="slides && slides.length"
          :src="slides[idx]"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </transition>
    </div>

    <!-- arrows -->
    <button
      v-if="slides.length > 1"
      @click="idx = (idx - 1 + slides.length) % slides.length"
      class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      v-if="slides.length > 1"
      @click="idx = (idx + 1) % slides.length"
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="h-4 w-4">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- indicators -->
    <div v-if="slides.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(s, i) in slides"
        :key="s + i"
        @click="idx = i"
        :class="i === idx ? 'bg-white' : 'bg-white/50'"
        class="h-2 w-2 rounded-full"
        aria-label="indicator"
      ></button>
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