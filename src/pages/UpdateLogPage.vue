<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提���
-->
<template>
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题 -->
    <div class="h-[50px] pt-[10px] relative">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900 float-left">更新记录</h6>
    </div>

    <!-- 筛选条件：两列布局 -->
    <div class="mt-3">
      <ul class="w-full clearfix">
        <!-- 左列：平台类型、平台账号 -->
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">平台类型：</span>
          <select v-model="filters.platformType" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]">
            <option value="">全部</option>
            <option value="Shopify">Shopify</option>
            <option value="eBay">eBay</option>
            <option value="AmazonUS">美国亚马逊</option>
            <option value="AmazonUK">英国亚马逊</option>
            <option value="Walmart">Walmart</option>
          </select>
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">同步状态：</span>
          <select v-model="filters.syncStatus" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]">
            <option value="">全部</option>
            <option value="success">成功</option>
            <option value="fail">失败</option>
            <option value="processing">进行中</option>
          </select>
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <div class="flex items-center">
            <div class="inline-flex items-center border border-slate-300 rounded h-[34px] overflow-hidden mr-[10px]">
              <select v-model="filters.accountField" class="h-full px-2 bg-white">
                <option value="account">平台账号</option>
                <option value="shop">平台店铺</option>
              </select>
            </div>
            <input v-model.trim="filters.platformAccount" type="text" class="h-[34px] border border-slate-300 rounded px-2 flex-1" />
          </div>
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <div class="flex items-center">
            <span class="inline-block w-[100px] text-right leading-[34px] mr-[10px]">同步时间：</span>
            <div class="flex items-center w-[calc(100%-115px)]">
              <input v-model="filters.startDate" type="date" placeholder="开始日期" class="h-[34px] border border-slate-300 rounded px-2 w-[48%]" />
              <span class="mx-2">-</span>
              <input v-model="filters.endDate" type="date" placeholder="结束日期" class="h-[34px] border border-slate-300 rounded px-2 w-[48%]" />
            </div>
          </div>
        </li>
      </ul>
      <div class="clear-both"></div>
      <div class="w-full text-center mt-2">
        <button type="button" @click="onSearch" class="inline-block bg-primary text-white rounded w-[100px] h-[38px] leading-[38px]">搜索</button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mt-4 overflow-x-auto">
      <table class="w-full border-collapse bg-white">
        <thead>
          <tr class="bg-[#f2f2f2]">
            <th class="th">平台类型</th>
            <th class="th">平台账号</th>
            <th class="th">平台仓库</th>
            <th class="th">平台SKU</th>
            <th class="th">更新库存量</th>
            <th class="th">同步批次Id</th>
            <th class="th">同步状态</th>
            <th class="th">同步时间</th>
            <th class="th">失败原因</th>
            <th class="th">实际库存</th>
            <th class="th">上传时间</th>
            <th class="th">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td :colspan="12" class="text-center text-slate-500 py-10">没有找到数据，您可以更换搜索条件</td>
          </tr>
          <tr v-for="r in rows" :key="r.id">
            <td class="td">{{ r.platformType }}</td>
            <td class="td">{{ r.platformAccount }}</td>
            <td class="td">{{ r.platformWarehouse }}</td>
            <td class="td">{{ r.platformSku }}</td>
            <td class="td">{{ r.updateQty }}</td>
            <td class="td">{{ r.batchId }}</td>
            <td class="td">{{ r.syncStatus }}</td>
            <td class="td">{{ r.syncTime }}</td>
            <td class="td">{{ r.failReason }}</td>
            <td class="td">{{ r.realStock }}</td>
            <td class="td">{{ r.uploadTime }}</td>
            <td class="td"><button class="text-primary text-xs" type="button">查看</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const filters = reactive({
  platformType: '',
  syncStatus: '',
  accountField: 'account',
  platformAccount: '',
  startDate: '',
  endDate: '',
})

const rows = ref([])

const onSearch = () => {
  // 纯前端静态页：不改变数据，仅模拟搜索动作
}
</script>

<style scoped>
.th { @apply border border-slate-300 px-4 py-2 text-sm text-center align-middle; }
.td { @apply border border-slate-300 px-4 py-2 text-sm text-left; }
.clear-both { clear: both; }
</style>
