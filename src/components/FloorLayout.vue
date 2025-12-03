<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false
  }
})
</script>

<!-- ... existing template and style sections remain unchanged ... -->

<template>
  <section class="w-full" style="background-color: #F2F3F7;">
    <!-- 标题 -->
    <div class="w-full text-center py-11" style="background-color: #F2F3F7;">
      <h2 class="text-3xl font-bold text-slate-800">{{ props.title || '' }}</h2>
    </div>

    <div class="mx-auto max-w-[1500px] w-[80%]" style="display: flex; flex-direction: column; gap: 10px;">
      <div>
        <div class="bg-white border border-slate-300 rounded">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
a { color: inherit; text-decoration: none; }

a:hover { color: rgb(203, 38, 28); }
</style>