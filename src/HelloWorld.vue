<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.hello-world {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
