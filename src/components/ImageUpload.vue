<template>
  <div class="image-upload-container">
    <div v-if="!imageUrl" class="upload-area" @click="triggerFileInput">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleFileSelect"
      />
      <div class="upload-content">
        <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p class="upload-text">点击上传图片</p>
        <p class="upload-hint">或拖拽图片到此</p>
      </div>
    </div>

    <div v-else class="preview-area">
      <img :src="imageUrl" :alt="label" class="preview-image" @click="triggerFileInput" />
      <div class="preview-actions">
        <el-button type="primary" size="small" @click="triggerFileInput">
          重新上传
        </el-button>
        <el-button size="small" @click="removeImage">删除</el-button>
      </div>
    </div>

    <div v-if="uploading" class="upload-progress">
      <el-progress :percentage="uploadProgress" />
      <span class="progress-text">上传中...</span>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  uploadUrl: {
    type: String,
    default: 'https://upload.qiniu.com/', // 七牛云上传地址
  },
})

const emit = defineEmits(['update:modelValue'])

const fileInput = ref(null)
const imageUrl = ref(props.modelValue)
const uploading = ref(false)
const uploadProgress = ref(0)
const errorMessage = ref('')

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      imageUrl.value = newVal
    }
  }
)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    errorMessage.value = '请选择图片文件'
    return
  }

  if (file.size > 10 * 1024 * 1024) {
    errorMessage.value = '文件大小不能超过10MB'
    return
  }

  errorMessage.value = ''

  // 本地预览
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target?.result || ''
  }
  reader.readAsDataURL(file)

  // 上传到七牛云
  await uploadToQiniu(file)
}

const uploadToQiniu = async (file) => {
  uploading.value = true
  uploadProgress.value = 0

  try {
    // 获取上传凭证（从后端获取）
    const tokenResponse = await fetch('/api/qiniu/upload-token', {
      method: 'GET',
    })

    if (!tokenResponse.ok) {
      throw new Error('获取上传凭证失败')
    }

    const { uploadToken, domain } = await tokenResponse.json()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('token', uploadToken)
    formData.append('key', `uploads/${Date.now()}_${file.name}`)

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        uploadProgress.value = Math.round((e.loaded / e.total) * 100)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        const fileUrl = `${domain}/${response.key}`
        imageUrl.value = fileUrl
        emit('update:modelValue', fileUrl)
        uploading.value = false
        errorMessage.value = ''
      } else {
        errorMessage.value = '上传失败，请重试'
        uploading.value = false
      }
    })

    xhr.addEventListener('error', () => {
      errorMessage.value = '上传出错，请重试'
      uploading.value = false
    })

    xhr.addEventListener('abort', () => {
      errorMessage.value = '上传已取消'
      uploading.value = false
    })

    xhr.open('POST', props.uploadUrl)
    xhr.send(formData)
  } catch (error) {
    errorMessage.value = error.message || '获取上传凭证失败'
    uploading.value = false
    console.error('上传失败:', error)
  }
}

const removeImage = () => {
  imageUrl.value = ''
  emit('update:modelValue', '')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style scoped>
.image-upload-container {
  width: 100%;
}

.upload-area {
  border: 2px dashed #d0d7de;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f6f8fa;
}

.upload-area:hover {
  border-color: #0969da;
  background-color: #f0f6fc;
}

.upload-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: #57606a;
}

.upload-text {
  font-size: 14px;
  font-weight: 500;
  color: #24292f;
  margin: 0 0 4px 0;
}

.upload-hint {
  font-size: 12px;
  color: #57606a;
  margin: 0;
}

.preview-area {
  position: relative;
  display: inline-block;
  width: 100%;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.preview-image:hover {
  opacity: 0.8;
}

.preview-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.upload-progress {
  margin-top: 12px;
}

.progress-text {
  display: block;
  font-size: 12px;
  color: #57606a;
  margin-top: 4px;
}

.error-message {
  color: #d1242f;
  font-size: 12px;
  margin-top: 8px;
}
</style>
