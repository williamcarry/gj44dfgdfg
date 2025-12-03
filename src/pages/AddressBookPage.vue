<template>
  <div class="bg-white rounded-lg border border-slate-200">
    <!-- 标题 -->
    <div class="h-12 border-b border-slate-200 px-6 flex items-center">
      <h3 class="text-base font-semibold text-slate-900">地址簿</h3>
    </div>

    <!-- 内容区域 -->
    <div class="p-6">
      <!-- 操作按钮 -->
      <div class="flex items-center gap-3 mb-6">
        <button
          @click="handleDeleteSelected"
          :disabled="selectedIds.length === 0"
          class="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
        >
          删除地址
        </button>
        <button
          @click="handleAddAddress"
          :disabled="addresses.length >= 10"
          class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm font-medium"
        >
          添加新地址
        </button>
        <p class="text-sm text-slate-600 ml-auto">
          您已创建
          <em class="font-semibold text-slate-900">{{ addresses.length }}</em>
          个地址，最多可创建10个
        </p>
      </div>

      <!-- 地址表格 -->
      <div class="overflow-x-auto border border-slate-200 rounded-lg">
        <table class="w-full border-collapse">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-12">
                <input
                  type="checkbox"
                  class="w-4 h-4 accent-primary rounded"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                />
              </th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-32">收货人</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-40">电话</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 flex-1">详细地址</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-24">邮编</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-24">地址标签</th>
              <th class="px-4 py-3 text-center text-sm font-medium text-slate-700 w-24">默认地址</th>
              <th class="px-4 py-3 text-center text-sm font-medium text-slate-700 w-32">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            <tr v-for="addr in addresses" :key="addr.id" class="hover:bg-slate-50">
              <td class="px-4 py-4">
                <input
                  type="checkbox"
                  class="w-4 h-4 accent-primary rounded"
                  :checked="selectedIds.includes(addr.id)"
                  @change="toggleAddress(addr.id)"
                />
              </td>
              <td class="px-4 py-4 text-sm text-slate-900">{{ addr.receiver_name }}</td>
              <td class="px-4 py-4 text-sm text-slate-900">{{ addr.receiver_phone }}</td>
              <td class="px-4 py-4 text-sm text-slate-900">{{ addr.receiver_address }}</td>
              <td class="px-4 py-4 text-sm text-slate-900">{{ addr.receiver_zipcode }}</td>
              <td class="px-4 py-4 text-sm text-slate-900">{{ addr.address_label || '-' }}</td>
              <td class="px-4 py-4 text-center text-sm">
                <span v-if="addr.is_default" class="text-primary font-semibold">是</span>
                <span v-else class="text-slate-500">否</span>
              </td>
              <td class="px-4 py-4 text-center">
                <button
                  @click="handleEditAddress(addr)"
                  class="text-primary hover:underline text-sm font-medium"
                >
                  编辑
                </button>
                <span class="text-slate-300 mx-2">|</span>
                <button
                  @click="handleDeleteAddress(addr.id)"
                  class="text-red-600 hover:underline text-sm font-medium"
                >
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 新增/编辑地址对话框 -->
    <div v-if="dialogVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- 对话框头部 -->
        <div class="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
          <h3 class="text-lg font-semibold text-slate-900">
            {{ isEditing ? '编辑地址' : '添加新地址' }}
          </h3>
          <button
            @click="dialogVisible = false"
            class="text-slate-500 hover:text-slate-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 对话框内容 -->
        <div class="p-6 space-y-6">
          <!-- 收货人姓名（必填） -->
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">
              <span class="text-red-500">*</span> 收货人姓名
            </label>
            <input
              v-model="formData.receiver_name"
              type="text"
              placeholder="请输入收货人姓名"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <!-- 收货人电话（必填） -->
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">
              <span class="text-red-500">*</span> 收货人电话
            </label>
            <input
              v-model="formData.receiver_phone"
              type="tel"
              placeholder="请输入收货人电话"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <!-- 收货详细地址（必填） -->
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">
              <span class="text-red-500">*</span> 详细地址
            </label>
            <textarea
              v-model="formData.receiver_address"
              placeholder="请输入收货详细地址"
              rows="3"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- 收货邮编（必填） -->
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">
              <span class="text-red-500">*</span> 邮编
            </label>
            <input
              v-model="formData.receiver_zipcode"
              type="text"
              placeholder="请输入邮编"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <!-- 地址标签 -->
          <div>
            <label class="block text-sm font-medium text-slate-900 mb-2">地址标签</label>
            <select
              v-model="formData.address_label"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
            >
              <option value="">请选择地址标签</option>
              <option value="家">家</option>
              <option value="公司">公司</option>
              <option value="学校">学校</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <!-- 是否为默认地址 -->
          <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-slate-900">默认地址</label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="formData.is_default"
                class="w-4 h-4 accent-primary rounded"
              />
              <span class="text-sm text-slate-700">设置为默认地址</span>
            </label>
          </div>
        </div>

        <!-- 对话框底部 -->
        <div class="flex justify-end gap-2 p-6 border-t border-slate-200 bg-slate-50">
          <button
            @click="dialogVisible = false"
            class="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition text-sm font-medium"
          >
            取消
          </button>
          <button
            @click="handleSaveAddress"
            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const isEditing = ref(false)
const selectedIds = ref([])
const editingId = ref(null)

const formData = reactive({
  receiver_name: '',
  receiver_phone: '',
  receiver_address: '',
  receiver_zipcode: '',
  address_label: '',
  is_default: false,
})

// 地址数据
const addresses = ref([
  {
    id: 1,
    receiver_name: '张三',
    receiver_phone: '+86-138-1234-5678',
    receiver_address: '北京市朝阳区建国路88号',
    receiver_zipcode: '100000',
    address_label: '家',
    is_default: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  {
    id: 2,
    receiver_name: '李四',
    receiver_phone: '+86-138-9876-5432',
    receiver_address: '上海市浦东新区世纪大道100号',
    receiver_zipcode: '200000',
    address_label: '公司',
    is_default: false,
    created_at: '2024-01-02',
    updated_at: '2024-01-02',
  },
  {
    id: 3,
    receiver_name: '王五',
    receiver_phone: '+86-138-5555-6666',
    receiver_address: '广州市天河区珠江新城50号',
    receiver_zipcode: '510000',
    address_label: '其他',
    is_default: false,
    created_at: '2024-01-03',
    updated_at: '2024-01-03',
  },
])

const isAllSelected = computed(() => {
  return addresses.value.length > 0 && selectedIds.value.length === addresses.value.length
})

function resetForm() {
  formData.receiver_name = ''
  formData.receiver_phone = ''
  formData.receiver_address = ''
  formData.receiver_zipcode = ''
  formData.address_label = ''
  formData.is_default = false
  editingId.value = null
  isEditing.value = false
}

function handleAddAddress() {
  if (addresses.value.length >= 10) {
    ElMessage.warning('最多只能创建10个地址')
    return
  }
  resetForm()
  dialogVisible.value = true
}

function handleEditAddress(row) {
  formData.receiver_name = row.receiver_name
  formData.receiver_phone = row.receiver_phone
  formData.receiver_address = row.receiver_address
  formData.receiver_zipcode = row.receiver_zipcode
  formData.address_label = row.address_label
  formData.is_default = row.is_default
  editingId.value = row.id
  isEditing.value = true
  dialogVisible.value = true
}

function handleSaveAddress() {
  if (!formData.receiver_name || !formData.receiver_phone || !formData.receiver_address || !formData.receiver_zipcode) {
    ElMessage.warning('请填写所有必填项')
    return
  }

  if (isEditing.value && editingId.value) {
    const index = addresses.value.findIndex((addr) => addr.id === editingId.value)
    if (index > -1) {
      addresses.value[index] = {
        ...addresses.value[index],
        receiver_name: formData.receiver_name,
        receiver_phone: formData.receiver_phone,
        receiver_address: formData.receiver_address,
        receiver_zipcode: formData.receiver_zipcode,
        address_label: formData.address_label,
        is_default: formData.is_default,
        updated_at: new Date().toISOString().split('T')[0],
      }
    }
    ElMessage.success('地址已更新')
  } else {
    const newId = Math.max(...addresses.value.map((a) => a.id), 0) + 1
    const now = new Date().toISOString().split('T')[0]
    addresses.value.push({
      id: newId,
      receiver_name: formData.receiver_name,
      receiver_phone: formData.receiver_phone,
      receiver_address: formData.receiver_address,
      receiver_zipcode: formData.receiver_zipcode,
      address_label: formData.address_label,
      is_default: formData.is_default,
      created_at: now,
      updated_at: now,
    })
    ElMessage.success('地址已添加')
  }

  dialogVisible.value = false
  resetForm()
}

function handleDeleteAddress(id) {
  const index = addresses.value.findIndex((addr) => addr.id === id)
  if (index > -1) {
    addresses.value.splice(index, 1)
    ElMessage.success('地址已删除')
  }
}

function handleDeleteSelected() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请先选择��删除的地址')
    return
  }

  addresses.value = addresses.value.filter((addr) => !selectedIds.value.includes(addr.id))
  selectedIds.value = []
  ElMessage.success('所选地址已删除')
}

function toggleAddress(id) {
  const index = selectedIds.value.indexOf(id)
  if (index > -1) {
    selectedIds.value.splice(index, 1)
  } else {
    selectedIds.value.push(id)
  }
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = addresses.value.map((addr) => addr.id)
  }
}
</script>

<style scoped></style>
