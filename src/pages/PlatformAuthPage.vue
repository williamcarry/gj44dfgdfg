<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <div class="p-6">
      <!-- 标题与说明 -->
      <div class="mb-4 flex items-center gap-3">
        <h6 class="text-base font-bold text-slate-900">平台授权</h6>
        <p class="text-slate-600 text-sm">(对于已在合作的第三方平台进行授权。)</p>
      </div>

      <!-- 筛选表单 -->
      <form @submit.prevent="onSearch" class="mb-6">
        <ul class="flex flex-wrap gap-x-[5%] gap-y-3">
          <li class="w-[45%] flex items-center min-h-[34px]">
            <span class="inline-block w-[100px] text-right mr-2 leading-[34px]">平台类型：</span>
            <select v-model="form.platform" class="h-9 px-2 border border-slate-300 rounded bg-white flex-1">
              <option value="">全部</option>
              <option v-for="opt in platformOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </li>
          <li class="w-[45%] flex items-center min-h-[34px]">
            <span class="inline-block w-[100px] text-right mr-2 leading-[34px]">授权状态：</span>
            <select v-model="form.status" class="h-9 px-2 border border-slate-300 rounded bg-white flex-1">
              <option value="">全部</option>
              <option value="0">未授权</option>
              <option value="10">授权中</option>
              <option value="100">已授权</option>
            </select>
          </li>
          <li class="w-[45%] flex items-center min-h-[34px]">
            <span class="inline-block w-[100px] text-right mr-2 leading-[34px]">平台账号：</span>
            <input v-model="form.account" type="text" class="h-9 px-3 border border-slate-300 rounded bg-white flex-1" />
          </li>
          <li class="w-[45%] flex items-center min-h-[34px]">
            <span class="inline-block w-[100px] text-right mr-2 leading-[34px]">授权到期日：</span>
            <input v-model="form.start" type="date" class="h-9 px-2 border border-slate-300 rounded bg-white w-[calc(50%-64px)] flex-1" />
            <span class="mx-2 text-slate-400">-</span>
            <input v-model="form.end" type="date" class="h-9 px-2 border border-slate-300 rounded bg-white w-[calc(50%-64px)] flex-1" />
          </li>
          <li class="w-[95%] text-center mt-1">
            <button type="submit" class="inline-block w-[100px] h-[38px] leading-[38px] text-white bg-primary rounded">搜索</button>
          </li>
        </ul>
      </form>

      <!-- 顶部操作按钮 -->
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <button @click="add('Amazon')" class="px-2 h-[30px] text-xs text-white bg-primary rounded">添加Amazon账号</button>
        <button @click="add('WISH')" class="px-2 h-[30px] text-xs text-white bg-primary rounded">添加WISH账号</button>
        <button @click="add('eBay')" class="px-2 h-[30px] text-xs text-white bg-primary rounded">添加eBay账号</button>
        <button @click="add('IrobotBox')" class="px-2 h-[30px] text-xs text-white bg-primary rounded">添加IrobotBox账号</button>
        <button @click="add('Shopify')" class="px-2 h-[30px] text-xs text-white bg-primary rounded">添加Shopify账号</button>
        <button @click="add('EKM')" class="px-2 h-[30px] text-xs text-white bg-primary rounded">添加EKM账号</button>
        <a href="https://www.saleyee.com/guide/hc806655.html" target="_blank"
           class="px-2 h-[30px] leading-[30px] text-xs border border-primary text-primary rounded">���台授权指引</a>
      </div>

      <!-- 表格 -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse bg-white">
          <thead>
            <tr class="bg-slate-100" style="background-color: rgb(242,242,242);">
              <th class="th">平台类型</th>
              <th class="th">平台账号</th>
              <th class="th">授权状态</th>
              <th class="th">授权时间</th>
              <th class="th">授权到期时间</th>
              <th class="th">是否启用</th>
              <th class="th">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filteredRows" :key="row.id" class="hover:bg-slate-50 transition">
              <td class="td">{{ row.platformLabel }}</td>
              <td class="td">{{ row.account }}</td>
              <td class="td">
                <span :class="statusClass(row.status)">{{ statusText(row.status) }}</span>
              </td>
              <td class="td">{{ row.authAt }}</td>
              <td class="td">{{ row.expireAt }}</td>
              <td class="td">{{ row.enabled ? '是' : '否' }}</td>
              <td class="td">
                <div class="flex items-center justify-center gap-2">
                  <button class="text-primary hover:underline" @click="authorize(row)">授权</button>
                  <button class="text-slate-600 hover:underline" @click="toggle(row)">{{ row.enabled ? '禁用' : '启用' }}</button>
                  <button class="text-red-600 hover:underline" @click="remove(row.id)">删除</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredRows.length === 0">
              <td colspan="7" class="text-center text-slate-500 py-6">暂无授权账号</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const platformOptions = [
  { value: 'wish', label: 'WISH' },
  { value: 'ebay', label: 'eBay' },
  { value: 'amazon-us', label: '美国亚马逊' },
  { value: 'amazon-ca', label: '加拿大亚马逊' },
  { value: 'amazon-mx', label: '墨西哥亚马逊' },
  { value: 'amazon-uk', label: '英国亚马逊' },
  { value: 'amazon-fr', label: '法国亚马逊' },
  { value: 'amazon-de', label: '德国亚马逊' },
  { value: 'amazon-it', label: '意大利亚马逊' },
  { value: 'amazon-es', label: '西班牙亚马逊' },
  { value: 'irobotbox', label: '赛盒' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'ekm', label: 'EKM' },
  { value: 'walmart', label: 'Walmart' }
]

const allRows = ref([
  { id: 1, platform: 'amazon-us', platformLabel: '美国亚马逊', account: 'shop-usa-01', status: '100', authAt: '2025-09-01 10:00:00', expireAt: '2026-09-01 10:00:00', enabled: true },
  { id: 2, platform: 'shopify', platformLabel: 'Shopify', account: 'myshop', status: '0', authAt: '-', expireAt: '-', enabled: false },
  { id: 3, platform: 'ebay', platformLabel: 'eBay', account: 'ebay-cn-02', status: '10', authAt: '2025-10-10 12:20:00', expireAt: '-', enabled: true }
])

const form = ref({ platform: '', status: '', account: '', start: '', end: '' })

const filteredRows = computed(() => {
  return allRows.value.filter(r => {
    if (form.value.platform && r.platform !== form.value.platform) return false
    if (form.value.status && r.status !== form.value.status) return false
    if (form.value.account && !r.account.toLowerCase().includes(form.value.account.toLowerCase())) return false
    if (form.value.start && r.expireAt !== '-' && new Date(r.expireAt) < new Date(form.value.start)) return false
    if (form.value.end && r.expireAt !== '-') {
      const end = new Date(form.value.end)
      end.setHours(23,59,59,999)
      if (new Date(r.expireAt) > end) return false
    }
    return true
  })
})

const statusText = (status) => {
  if (status === '0') return '未授权'
  if (status === '10') return '授权中'
  return '已授权'
}

const statusClass = (status) => {
  if (status === '0') return 'px-2 py-1 bg-red-100 text-red-700 rounded text-xs'
  if (status === '10') return 'px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs'
  return 'px-2 py-1 bg-green-100 text-green-700 rounded text-xs'
}

const onSearch = () => {}

const add = (type) => {
  console.log('添加', type)
}

const authorize = (row) => {
  console.log('授权', row)
}

const toggle = (row) => {
  row.enabled = !row.enabled
}

const remove = (id) => {
  allRows.value = allRows.value.filter(r => r.id !== id)
}
</script>

<style scoped>
.th { @apply border border-slate-300 text-center align-middle px-4 py-2 text-sm; }
.td { @apply border border-slate-300 text-center px-4 py-2 text-sm; }
</style>
