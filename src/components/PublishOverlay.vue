<template>
  <Teleport to="body">
    <div
      class="publish-overlay"
      :class="{ show: open }"
      @click.self="handleClose"
      aria-hidden="true"
    ></div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['close'])

function handleClose() {
  emit('close')
}
</script>

<style scoped>
.publish-overlay {
  background-color: rgb(255, 255, 255);
  cursor: move;
  display: none;
  height: 100%;
  left: 0px;
  opacity: 0;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2147483647;
}
.publish-overlay.show {
  display: block;
  opacity: 1;
}
</style>