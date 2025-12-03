<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样���：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题 -->
    <div class="h-[50px] pt-[10px] relative">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900 float-left">物流映射</h6>
    </div>

    <!-- 筛选表单：两列布局 -->
    <div class="mt-3">
      <ul class="w-full clearfix">
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">平台账号：</span>
          <input v-model.trim="filters.platformAccount" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">平台物流ID：</span>
          <input v-model.trim="filters.platformShipId" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">平���物流名称：</span>
          <input v-model.trim="filters.platformShipName" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">SaleYee物流ID：</span>
          <input v-model.trim="filters.saleYeeShipId" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">SaleYee物流名称：</span>
          <input v-model.trim="filters.saleYeeShipName" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">创建时间：</span>
          <input v-model="filters.createStartStr" placeholder="开始日期" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(50%-64px)]" />
          <span class="mx-1">-</span>
          <input v-model="filters.createEndStr" placeholder="结束日期" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(50%-64px)]" />
        </li>
        <li class="float-left w-[95%] text-center mt-[10px] mb-[5px] min-h-[34px]">
          <button type="button" @click="onSearch" class="inline-block bg-primary text-white rounded w-[100px] h-[38px] leading-[38px]">搜索</button>
        </li>
      </ul>
      <div class="clear-both"></div>
    </div>

    <!-- 操作条 -->
    <div class="mt-2 flex items-center gap-2">
      <button type="button" @click="openAdd" class="bg-primary text-white rounded px-2 h-[30px] text-xs">添加物���映射</button>
      <el-upload :show-file-list="false" accept=".csv,.txt" :before-upload="beforeImport">
        <button type="button" class="bg-primary text-white rounded px-2 h-[30px] text-xs ml-2">批量导入物流映射</button>
      </el-upload>
      <a class="ml-2 border border-primary text-primary rounded px-2 h-[30px] inline-flex items-center text-xs" href="#" @click.prevent="downloadTemplate">
        导入模板下载
      </a>
    </div>

    <!-- 表格 -->
    <div class="mt-3">
      <el-table :data="pagedData" border style="width: 100%" size="small" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="platformType" label="平台类型" width="120" />
        <el-table-column prop="platformAccount" label="平台账号" width="160" />
        <el-table-column prop="platformShipId" label="平台物流ID" width="140" />
        <el-table-column prop="platformShipName" label="平台物流名称" min-width="180" />
        <el-table-column prop="saleYeeShipId" label="SaleYee物流ID" width="140" />
        <el-table-column prop="saleYeeShipName" label="SaleYee物流名称" min-width="180" />
        <el-table-column prop="saleYeeCompany" label="SaleYee物流公司" min-width="160" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" text size="small" @click="editRow(row)">编辑</el-button>
            <el-button type="danger" text size="small" @click="removeRow(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-3 flex justify-end">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="filtered.length"
          :current-page="page"
          :page-size="pageSize"
          @current-change="(p)=> (page=p)"
        />
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.editing ? '编辑物流映射' : '新增物流映射'" width="520px">
      <el-form :model="dialog.form" label-width="120px">
        <el-form-item label="平台类型">
          <el-select v-model="dialog.form.platformType" placeholder="请选择" style="width: 300px">
            <el-option v-for="opt in platformTypes" :key="opt" :label="opt" :value="opt" />
          </el-select>
        </el-form-item>
        <el-form-item label="平台账号">
          <el-input v-model.trim="dialog.form.platformAccount" style="width: 300px" />
        </el-form-item>
        <el-form-item label="平台物流ID">
          <el-input v-model.trim="dialog.form.platformShipId" style="width: 300px" />
        </el-form-item>
        <el-form-item label="平台物流名称">
          <el-input v-model.trim="dialog.form.platformShipName" style="width: 300px" />
        </el-form-item>
        <el-form-item label="SaleYee物流ID">
          <el-input v-model.trim="dialog.form.saleYeeShipId" style="width: 300px" />
        </el-form-item>
        <el-form-item label="SaleYee物流名称">
          <el-input v-model.trim="dialog.form.saleYeeShipName" style="width: 300px" />
        </el-form-item>
        <el-form-item label="SaleYee物流公司">
          <el-input v-model.trim="dialog.form.saleYeeCompany" style="width: 300px" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible=false">取消</el-button>
        <el-button type="primary" @click="saveDialog">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

const platformTypes = ['WISH','eBay','美国亚马逊','加拿大亚马逊','墨西哥亚马逊','英国亚马逊','法国亚马逊','德国亚马逊','意大利亚马逊','西班牙亚马逊','赛盒','Shopify','EKM','Walmart']

const filters = reactive({
  platformAccount: '',
  platformShipId: '',
  platformShipName: '',
  saleYeeShipId: '',
  saleYeeShipName: '',
  createStartStr: '',
  createEndStr: '',
})

const data = ref([
  { id: 101, platformType: 'Shopify', platformAccount: 'shopify-store-1', platformShipId: 'shipsy_001', platformShipName: 'USPS Priority', saleYeeShipId: 'SY-EXP-01', saleYeeShipName: '赛盈美国专线(快)', saleYeeCompany: '赛盈物流', createdAt: '2025-01-05 10:00:00' },
  { id: 102, platformType: 'eBay', platformAccount: 'ebay_seller_cn', platformShipId: 'EB-STD', platformShipName: 'Standard Shipping', saleYeeShipId: 'SY-UK-01', saleYeeShipName: '英国本地递', saleYeeCompany: '赛盈物流UK', createdAt: '2025-01-04 11:22:00' },
  { id: 103, platformType: '美国亚马逊', platformAccount: 'amazon-us-01', platformShipId: 'AMZ-FBA', platformShipName: 'Amazon Logistics', saleYeeShipId: 'SY-US-EC-02', saleYeeShipName: '美国经济线', saleYeeCompany: '赛盈美国', createdAt: '2025-01-03 09:15:00' },
  { id: 104, platformType: '英国亚马逊', platformAccount: 'amazon-uk-main', platformShipId: 'AMZ-UK-STD', platformShipName: 'Amazon UK Standard', saleYeeShipId: 'SY-UK-EC-01', saleYeeShipName: '英国经济线', saleYeeCompany: '赛盈��国', createdAt: '2025-01-02 16:45:00' },
  { id: 105, platformType: 'Walmart', platformAccount: 'walmart-pro-1', platformShipId: 'WM-EX', platformShipName: 'Walmart Express', saleYeeShipId: 'SY-US-EX-01', saleYeeShipName: '美国特快线', saleYeeCompany: '赛盈美国', createdAt: '2025-01-01 08:30:00' },
])
const selected = ref([])
const page = ref(1)
const pageSize = ref(10)

const filtered = computed(() => {
  return data.value.filter((row) => {
    if (filters.platformAccount && !row.platformAccount.includes(filters.platformAccount)) return false
    if (filters.platformShipId && !row.platformShipId.includes(filters.platformShipId)) return false
    if (filters.platformShipName && !row.platformShipName.includes(filters.platformShipName)) return false
    if (filters.saleYeeShipId && !row.saleYeeShipId.includes(filters.saleYeeShipId)) return false
    if (filters.saleYeeShipName && !row.saleYeeShipName.includes(filters.saleYeeShipName)) return false
    return true
  })
})

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const onSearch = () => { page.value = 1 }
const onSelectionChange = (rows) => { selected.value = rows }

const dialog = reactive({
  visible: false,
  editing: false,
  form: {
    id: 0,
    platformType: 'Shopify',
    platformAccount: '',
    platformShipId: '',
    platformShipName: '',
    saleYeeShipId: '',
    saleYeeShipName: '',
    saleYeeCompany: '',
  },
})

const openAdd = () => {
  dialog.visible = true
  dialog.editing = false
  dialog.form = { id: 0, platformType: 'Shopify', platformAccount: '', platformShipId: '', platformShipName: '', saleYeeShipId: '', saleYeeShipName: '', saleYeeCompany: '' }
}

const editRow = (row) => {
  dialog.visible = true
  dialog.editing = true
  dialog.form = { ...row }
}

const saveDialog = () => {
  if (dialog.editing) {
    const idx = data.value.findIndex((d) => d.id === dialog.form.id)
    if (idx !== -1) data.value[idx] = { ...dialog.form, id: dialog.form.id }
  } else {
    data.value.unshift({ ...dialog.form, id: Date.now(), createdAt: new Date().toISOString().slice(0,19).replace('T',' ') })
  }
  dialog.visible = false
}

const removeRow = (row) => {
  data.value = data.value.filter((d) => d.id !== row.id)
}

const beforeImport = async (file) => {
  const text = await file.text()
  const rows = text.split(/\r?\n/).filter(Boolean)
  for (const line of rows.slice(1)) {
    const cols = line.split(',')
    if (cols.length < 8) continue
    data.value.push({
      id: Date.now() + Math.floor(Math.random()*10000),
      platformType: cols[0],
      platformAccount: cols[1],
      platformShipId: cols[2],
      platformShipName: cols[3],
      saleYeeShipId: cols[4],
      saleYeeShipName: cols[5],
      saleYeeCompany: cols[6],
      createdAt: cols[7] || new Date().toISOString().slice(0,19).replace('T',' '),
    })
  }
  return false
}

const downloadTemplate = () => {
  const header = ['平台类型','平台账���','平台物流ID','平台物流名称','SaleYee物流ID','SaleYee物流名称','SaleYee物流公司','创建时间']
  const csv = header.join(',') + '\n'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'logistics-mapping-template.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.clear-both { clear: both; }
</style>
