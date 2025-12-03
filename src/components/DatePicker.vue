<template>
  <el-date-picker
    v-model="selectedDate"
    type="date"
    :placeholder="placeholder"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    :disabled-date="disabledDate"
    @change="handleDateChange"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElDatePicker } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择日期',
  },
  disableFuture: {
    type: Boolean,
    default: false,
  },
  disablePast: {
    type: Boolean,
    default: false,
  },
  minDate: {
    type: Date,
    default: null,
  },
  maxDate: {
    type: Date,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const selectedDate = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    selectedDate.value = newVal
  }
)

const disabledDate = (time) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (props.disableFuture && time.getTime() > today.getTime()) {
    return true
  }

  if (props.disablePast && time.getTime() < today.getTime()) {
    return true
  }

  if (props.minDate && time.getTime() < props.minDate.getTime()) {
    return true
  }

  if (props.maxDate && time.getTime() > props.maxDate.getTime()) {
    return true
  }

  return false
}

const handleDateChange = (date) => {
  emit('update:modelValue', date)
}
</script>

<style scoped></style>
