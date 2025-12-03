<template>
  <button
    :class="[
      'w-full text-left transition flex items-center justify-between hover:bg-[#CB261C] hover:text-white',
    ]"
    :style="{
      paddingLeft: '28px',
      paddingRight: '15px',
      lineHeight: '34px',
      height: '34px',
      display: 'list-item',
      position: 'relative',
      cursor: 'pointer',
      color: active ? 'rgb(203, 38, 28)' : 'rgb(51, 51, 51)',
      transitionDuration: '0.3s',
      fontSize: '13px',
      backgroundColor: 'white',
    }"
    @click="$emit('click')"
  >
    <span>{{ label }}</span>
    <div class="flex items-center gap-2">
      <span v-if="badge" class="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {{ badge }}
      </span>
      <span v-if="withArrow" class="text-slate-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </span>
      <span v-if="withIcon" class="text-primary text-xs">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1"></circle>
        </svg>
      </span>
    </div>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  withArrow: {
    type: Boolean,
    default: false,
  },
  withIcon: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: [Number, String],
    default: null,
  },
})

defineEmits(['click'])
</script>

<style scoped></style>
