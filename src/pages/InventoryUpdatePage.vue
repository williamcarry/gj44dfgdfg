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
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题 -->
    <div class="h-[50px] pt-[10px] relative">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900 float-left">库存更新</h6>
    </div>

    <!-- 筛选条件：两列布局 -->
    <div class="mt-3">
      <ul class="w-full clearfix">
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
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">平台SKU：</span>
          <input v-model.trim="filters.platformSku" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">平台账号：</span>
          <input v-model.trim="filters.platformAccount" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">自动更新：</span>
          <select v-model="filters.autoUpdate" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]">
            <option value="">全部</option>
            <option value="1">是</option>
            <option value="0">否</option>
          </select>
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">数据源：</span>
          <select v-model="filters.dataSource" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]">
            <option value="">全部</option>
            <option value="系统">系统</option>
            <option value="导入">导入</option>
          </select>
        </li>
      </ul>
      <div class="clear-both"></div>
      <div class="w-full text-center mt-2">
        <button type="button" @click="onSearch" class="inline-block bg-primary text-white rounded w-[100px] h-[38px] leading-[38px]">搜索</button>
      </div>
    </div>

    <!-- 操作按钮组 -->
    <div class="mt-3 flex flex-wrap items-center gap-2">
      <button class="bg-primary text-white rounded px-2 h-[30px] text-xs" type="button">手动更新</button>
      <button class="bg-primary text-white rounded px-2 h-[30px] text-xs" type="button">批���更新</button>
      <button class="bg-primary text-white rounded px-2 h-[30px] text-xs" type="button">更新规则设置</button>
      <button class="bg-primary text-white rounded px-2 h-[30px] text-xs" type="button">清除所有异常</button>
      <button class="bg-primary text-white rounded px-2 h-[30px] text-xs" type="button">excel批量导入</button>
      <button class="bg-primary text-white rounded px-2 h-[30px] text-xs" type="button">上载模板下载</button>
    </div>

    <!-- 提示条 -->
    <div class="bg-[#fcf8e3] border border-[#faebcc] rounded mt-3 p-3 flex items-start">
      <span class="text-[#a77200] leading-6 mr-2">!</span>
      <p class="text-[#a77200] leading-6">
        在飞刊设置成功的SKU会自动创建赛盈SKU映射，支持载单。同步库存需前往飞刊“已刊登商品”列表设置同步规则并查看同步结果。
      </p>
    </div>

    <!-- 表格 -->
    <div class="mt-3 overflow-x-auto">
      <table class="w-full border-collapse bg-white">
        <thead>
          <tr class="bg-[#f2f2f2]">
            <th class="th w-[42px]"><input type="checkbox" class="h-4 w-4" :checked="false" disabled /></th>
            <th class="th">平台类型</th>
            <th class="th">平台账号</th>
            <th class="th">平台SKU</th>
            <th class="th">SaleYee-sku</th>
            <th class="th">真实库存</th>
            <th class="th">更新库存</th>
            <th class="th">自动更新</th>
            <th class="th">更新规则</th>
            <th class="th">数据来源</th>
            <th class="th">上次更新时间</th>
            <th class="th">操作</th>
            <th class="th">日志</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td :colspan="13" class="text-center text-slate-500 py-10">没有找到数据，您可以更换搜索条件</td>
          </tr>
          <tr v-for="r in rows" :key="r.id">
            <td class="td"><input type="checkbox" class="h-4 w-4" v-model="r.selected" /></td>
            <td class="td">{{ r.platformType }}</td>
            <td class="td">{{ r.platformAccount }}</td>
            <td class="td">{{ r.platformSku }}</td>
            <td class="td">{{ r.saleYeeSku }}</td>
            <td class="td">{{ r.realStock }}</td>
            <td class="td">{{ r.updateStock }}</td>
            <td class="td">{{ r.autoUpdate ? '是' : '否' }}</td>
            <td class="td">{{ r.rule }}</td>
            <td class="td">{{ r.source }}</td>
            <td class="td">{{ r.updatedAt }}</td>
            <td class="td"><button class="text-primary text-xs" type="button">编辑</button></td>
            <td class="td"><button class="text-primary text-xs" type="button">查看</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表格底部工具条 -->
    <div class="mt-3 flex items-center justify-between text-sm text-slate-600">
      <div>
        全选 已选 <span class="text-primary">{{ selectedCount }}</span> 项
      </div>
      <button class="bg-primary text-white rounded px-2 h-[28px] text-xs" type="button">批量清除异常</button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const filters = reactive({
  platformType: '',
  platformSku: '',
  platformAccount: '',
  autoUpdate: '',
  dataSource: '',
})

const rows = ref([])

const selectedCount = computed(() => rows.value.filter(r => r.selected).length)

const onSearch = () => {
  // 占位交互：不改变数据，仅模拟搜索动作
}
</script>

<style scoped>
.th { @apply border border-slate-300 px-4 py-2 text-sm text-center align-middle; }
.td { @apply border border-slate-300 px-4 py-2 text-sm text-left; }
.clear-both { clear: both; }
</style>
