<template>
  <button
    type="button"
    class="relative inline-flex items-center justify-center h-10 leading-10 min-w-[150px] px-4 rounded border border-primary text-primary bg-[#ffeded] font-medium cursor-pointer transition-colors duration-300 hover:bg-[#ffecec] focus:outline-none focus:ring-2 focus:ring-primary/30 overflow-hidden"
    title="一键刊登"
    @click="handleClick"
  >
    <span
      aria-hidden="true"
      class="inline-block w-5 h-5 mr-1 align-middle translate-y-[2px] bg-no-repeat bg-cover"
      style="background-image:url('https://www.saleyee.com/static/imgs/3f8d8e905d1cb80e9c744fe7b9ad292a.png')"
    ></span>
    一键刊登
    <b
      class="pointer-events-none select-none absolute right-[-28px] top-[-28px] w-[60px] h-[60px] bg-primary text-white text-[10px] flex items-end justify-center border border-primary rounded [transform:rotate(45deg)]"
    >
      <span class="pointer-events-none select-none absolute right-[22px] bottom-[-2px] text-white text-[10px] [transform:rotate(-45deg)]">免费</span>
    </b>
  </button>
</template>

<script setup>
defineProps({
  productId: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['click', 'open'])

function handleClick(event) {
  emit('click', event)
  emit('open')
}
</script>