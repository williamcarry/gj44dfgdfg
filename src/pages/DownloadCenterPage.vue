<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样��：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <div class="p-6">
      <!-- 顶部标题与说明 -->
      <div class="mb-4 flex items-center gap-3">
        <h6 class="text-base font-bold text-slate-900">下载中心</h6>
        <p class="text-slate-600 text-sm">(通过下载中心可下载商品、订单等的相关信息数据。)</p>
      </div>

      <!-- 提示框 -->
      <div class="flex items-start gap-2 rounded border p-3 mb-4"
           style="background-color: rgb(252, 248, 227); border-color: rgb(250, 235, 204);">
        <div class="w-[17px] leading-6 text-[18px]"
             style="color: rgb(167, 114, 0);">
          !
        </div>
        <div class="flex-1 ml-2">
          <p class="text-sm leading-6" style="color: rgb(167, 114, 0);">
            1.仅保留最近10条或最近30天记录，每次最多导出10,000条数据；<br />
            2.处理时间，取决于您所选的数据量；<br />
            3.最多只可提交10条处理中的导出申请，请勿重复提交导出申请；
          </p>
        </div>
      </div>

      <!-- 表格 -->
      <div>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse bg-white">
            <thead class="align-middle">
              <tr class="bg-slate-100 transition" style="background-color: rgb(242, 242, 242);">
                <th class="border text-center align-middle px-4 py-2 text-sm"
                    style="width:10%; border-color: rgb(230,230,230);">id</th>
                <th class="border text-center align-middle px-4 py-2 text-sm"
                    style="width:20%; border-color: rgb(230,230,230);">下载类型</th>
                <th class="border text-center align-middle px-4 py-2 text-sm"
                    style="width:20%; border-color: rgb(230,230,230);">来源页面</th>
                <th class="border text-center align-middle px-4 py-2 text-sm"
                    style="width:10%; border-color: rgb(230,230,230);">排队位数</th>
                <th class="border text-center align-middle px-4 py-2 text-sm"
                    style="width:10%; border-color: rgb(230,230,230);">预估时间</th>
                <th class="border text-center align-middle px-4 py-2 text-sm"
                    style="width:20%; border-color: rgb(230,230,230);">申请时间</th>
                <th class="border text-center align-middle px-4 py-2 text-sm"
                    style="width:10%; border-color: rgb(230,230,230);">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in records" :key="item.id" class="hover:bg-slate-50 transition">
                <td class="border text-center px-4 py-2 text-sm" style="border-color: rgb(230,230,230);">{{ item.id }}</td>
                <td class="border text-center px-4 py-2 text-sm" style="border-color: rgb(230,230,230);">{{ item.type }}</td>
                <td class="border text-center px-4 py-2 text-sm" style="border-color: rgb(230,230,230);">{{ item.source }}</td>
                <td class="border text-center px-4 py-2 text-sm" style="border-color: rgb(230,230,230);">{{ item.queue }}</td>
                <td class="border text-center px-4 py-2 text-sm" style="border-color: rgb(230,230,230);">{{ item.eta }}</td>
                <td class="border text-center px-4 py-2 text-sm" style="border-color: rgb(230,230,230);">{{ item.appliedAt }}</td>
                <td class="border text-center px-4 py-2 text-sm" style="border-color: rgb(230,230,230);">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      :disabled="item.queue > 0"
                      @click="downloadTask(item)"
                      class="text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                      下载
                    </button>
                    <button @click="removeTask(item.id)" class="text-red-600 hover:underline">删除</button>
                  </div>
                </td>
              </tr>
              <tr v-if="records.length === 0">
                <td colspan="7" class="text-center text-slate-500 py-6">暂无下载任务</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const records = ref([
  { id: 1001, type: '商品列表', source: '商品管理/商品管理', queue: 0, eta: '准备就绪', appliedAt: '2025-10-18 10:02:15', fileName: 'products-1001.csv' },
  { id: 1002, type: '订单列表', source: '订单管理/我的订单', queue: 2, eta: '约 3 分钟', appliedAt: '2025-10-18 09:55:01', fileName: 'orders-1002.csv' },
  { id: 1003, type: '售后记录', source: '客户服务/售后管理', queue: 0, eta: '准备就绪', appliedAt: '2025-10-17 18:21:43', fileName: 'after-sales-1003.csv' }
])

const downloadTask = (task) => {
  if (task.queue > 0) {
    ElMessage.warning('任务仍在排队，请稍后再试')
    return
  }
  const csv = makeCsvForTask(task)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = task.fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  ElMessage.success('开始下载')
}


const removeTask = (id) => {
  records.value = records.value.filter(r => r.id !== id)
  ElMessage.success('已删除')
}

const makeCsvForTask = (task) => {
  if (task.type === '商品列表') {
    return 'sku,name,price\nSKU001,商品A,10\nSKU002,商品B,20\n'
  }
  if (task.type === '订单列表') {
    return 'order_no,status,total\nORD001,已支付,100\nORD002,待支付,50\n'
  }
  if (task.type === '售后记录') {
    return 'case_no,type,status\nAF001,退货,完成\nAF002,换货,进行中\n'
  }
  return 'id,value\n1,示例\n'
}
</script>

<style scoped>
</style>
