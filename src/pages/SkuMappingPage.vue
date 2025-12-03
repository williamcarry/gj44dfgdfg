<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - ��局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件��式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="bg-white rounded-lg border border-slate-200 p-6">
    <!-- 标题与说明 -->
    <div class="h-[50px] pt-[10px] relative">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900 float-left">SKU映射</h6>
      <p class="inline-block ml-2 leading-[40px] text-slate-700">
        （授权成功的账号可通过建立SKU映射的平台订单载入 SaleYee，需要提前维护好 SKU 映射关系。
        <a class="text-primary hover:underline" target="_blank" href="https://www.saleyee.com/guide/hp957996.html">如何映射</a>）
      </p>
    </div>

    <!-- 筛选表单：两列布局，按钮��中 -->
    <div class="mt-3">
      <ul class="w-full clearfix">
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">平台类型：</span>
          <select v-model="filters.platformType" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]">
            <option v-for="opt in platformOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
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
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">SaleYee SKU：</span>
          <input v-model.trim="filters.saleYeeSku" type="text" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">创建���间：</span>
          <input v-model="filters.createStartStr" placeholder="开始日期" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(50%-64px)]" />
          <span class="mx-1">-</span>
          <input v-model="filters.createEndStr" placeholder="结束日期" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(50%-64px)]" />
        </li>
        <li class="float-left w-[45%] mr-[5%] mt-[5px] mb-[5px] min-h-[34px]">
          <span class="inline-block w-[100px] text-right align-top leading-[34px] mr-[10px]">SKU状态：</span>
          <select v-model="filters.skuStatus" class="h-[34px] border border-slate-300 rounded px-2 w-[calc(100%-115px)]">
            <option value="">全部</option>
            <option value="0">下架</option>
            <option value="1">在售</option>
          </select>
        </li>
        <li class="float-left w-[95%] text-center mt-[10px] mb-[5px] min-h-[34px]">
          <button type="button" @click="onSearch" class="inline-block bg-primary text-white rounded w-[100px] h-[38px] leading-[38px]">搜索</button>
        </li>
      </ul>
      <div class="clear-both"></div>
    </div>

    <!-- 操作条 -->
    <div class="mt-2 flex items-center gap-2">
      <button type="button" @click="openAdd" class="bg-primary text-white rounded px-2 h-[30px] text-xs">添加SKU映射</button>
      <el-upload :show-file-list="false" accept=".csv,.txt" :before-upload="beforeImport">
        <button type="button" class="bg-primary text-white rounded px-2 h-[30px] text-xs ml-2">批量导入SKU映射</button>
      </el-upload>
      <a class="ml-2 border border-primary text-primary rounded px-2 h-[30px] inline-flex items-center text-xs" href="#" @click.prevent="downloadTemplate">
        <span class="inline-block w-3 h-3 mr-1 bg-[url('https://www.saleyee.com/static/imgs/96b09a4eb9a9f72fb9ec989c516e6ab4.png')] bg-center bg-no-repeat bg-[length:14px_14px]"></span>
        导入模板下载
      </a>
    </div>

    <!-- 提示 -->
    <div class="bg-[#fcf8e3] border border-[#faebcc] rounded mt-3 p-3 flex items-start">
      <span class="text-[#a77200] leading-6 mr-2">!</span>
      <p class="text-[#a77200] leading-6">
        在飞刊刊登成功的SKU会自动创建赛盈SKU映射，支持载单。同步库存需要到飞刊“已刊登商品”列表设置同步规则并查看同步结果��
      </p>
    </div>

    <!-- 表格 -->
    <div class="mt-3">
      <el-table :data="pagedData" border style="width: 100%" size="small" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="platformLabel" label="平台类型" width="120" />
        <el-table-column prop="account" label="平台账号" width="160" />
        <el-table-column label="平台SKU" min-width="180">
          <template #header>
            <div class="flex items-center justify-center gap-1">
              <span>平台SKU</span>
              <el-tooltip content="Shopify平台，此字段值为产品变体ID" placement="top">
                <img src="https://www.saleyee.com/ContentNew/Images/2021/November/insurance_icon.png" class="w-4 opacity-60" />
              </el-tooltip>
            </div>
          </template>
          <template #default="{ row }">
            <span class="text-slate-700">{{ row.platformSku }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="saleYeeSkuInfo" label="SaleYee-SKU*数量*发货区域*发货物流" min-width="280" />
        <el-table-column prop="saleStatusLabel" label="SaleYee-SKU状态" width="140" />
        <el-table-column prop="source" label="映射来源" width="120" />
        <el-table-column prop="updatedAt" label="最后更新时间" width="180" />
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
    <el-dialog v-model="dialog.visible" :title="dialog.editing ? '编辑SKU映射' : '新增SKU映射'" width="520px">
      <el-form :model="dialog.form" label-width="110px">
        <el-form-item label="平台类型">
          <el-select v-model="dialog.form.platform" placeholder="请选择" style="width: 300px">
            <el-option v-for="opt in platformOptions.filter(o=>o.value)" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="平台账号">
          <el-input v-model.trim="dialog.form.account" style="width: 300px" />
        </el-form-item>
        <el-form-item label="平台SKU">
          <el-input v-model.trim="dialog.form.platformSku" style="width: 300px" />
        </el-form-item>
        <el-form-item label="SaleYee SKU">
          <el-input v-model.trim="dialog.form.saleYeeSkuInfo" placeholder="格式: SKU*数量*区域*物流" style="width: 300px" />
        </el-form-item>
        <el-form-item label="SKU状态">
          <el-select v-model="dialog.form.saleStatus" style="width: 300px">
            <el-option label="在售" value="1" />
            <el-option label="下架" value="0" />
          </el-select>
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

const platformOptions = [
  { value: '', label: '全部' },
  { value: '1', label: 'WISH' },
  { value: '2', label: 'eBay' },
  { value: '3', label: '美国亚马逊' },
  { value: '4', label: '加拿大亚马逊' },
  { value: '5', label: '墨西哥亚马逊' },
  { value: '6', label: '英国���马逊' },
  { value: '7', label: '法国亚马逊' },
  { value: '8', label: '德国亚马逊' },
  { value: '9', label: '意��利亚马逊' },
  { value: '10', label: '西班牙亚马逊' },
  { value: '11', label: '赛盒' },
  { value: '12', label: 'Shopify' },
  { value: '13', label: 'EKM' },
  { value: '14', label: 'Walmart' },
]

const filters = reactive({
  platformType: '',
  platformSku: '',
  platformAccount: '',
  saleYeeSku: '',
  createStartStr: '',
  createEndStr: '',
  skuStatus: '',
})

const data = ref([
  { id: 1, platform: '12', platformLabel: 'Shopify', account: 'shopify-store-1', platformSku: 'gid://shopify/ProductVariant/1234567890', saleYeeSkuInfo: 'SY-1001*2*US*UPS', saleStatus: '1', saleStatusLabel: '在售', source: '手动', updatedAt: '2025-01-06 12:00:00' },
  { id: 2, platform: '2', platformLabel: 'eBay', account: 'ebay_seller_cn', platformSku: 'EBAY-ABC-001', saleYeeSkuInfo: 'SY-2002*1*UK*RM', saleStatus: '1', saleStatusLabel: '在售', source: '导入', updatedAt: '2025-01-05 09:30:00' },
  { id: 3, platform: '3', platformLabel: '美国亚���逊', account: 'amazon-us-01', platformSku: 'B0TESTSKU1', saleYeeSkuInfo: 'SY-3003*3*US*FEDEX', saleStatus: '0', saleStatusLabel: '下架', source: '手动', updatedAt: '2025-01-03 18:20:00' },
  { id: 4, platform: '6', platformLabel: '英国亚马逊', account: 'amazon-uk-main', platformSku: 'UK-SKU-8899', saleYeeSkuInfo: 'SY-4004*5*UK*DPD', saleStatus: '1', saleStatusLabel: '在售', source: '导入', updatedAt: '2025-01-02 14:10:00' },
  { id: 5, platform: '14', platformLabel: 'Walmart', account: 'walmart-pro-1', platformSku: 'WM-7788-XYZ', saleYeeSkuInfo: 'SY-5005*1*US*USPS', saleStatus: '1', saleStatusLabel: '在售', source: '手动', updatedAt: '2025-01-01 08:00:00' },
])
const selected = ref([])
const page = ref(1)
const pageSize = ref(10)

const filtered = computed(() => {
  return data.value.filter((row) => {
    if (filters.platformType && row.platform !== filters.platformType) return false
    if (filters.platformSku && !row.platformSku.includes(filters.platformSku)) return false
    if (filters.platformAccount && !row.account.includes(filters.platformAccount)) return false
    if (filters.saleYeeSku && !row.saleYeeSkuInfo.includes(filters.saleYeeSku)) return false
    if (filters.skuStatus && row.saleStatus !== filters.skuStatus) return false
    return true
  })
})

const pagedData = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const onSearch = () => {
  page.value = 1
}
const onReset = () => {
  filters.platformType = ''
  filters.platformSku = ''
  filters.platformAccount = ''
  filters.saleYeeSku = ''
  filters.createStartStr = ''
  filters.createEndStr = ''
  filters.skuStatus = ''
  page.value = 1
}

const onSelectionChange = (rows) => {
  selected.value = rows
}

const dialog = reactive({
  visible: false,
  editing: false,
  form: {
    id: 0,
    platform: '',
    account: '',
    platformSku: '',
    saleYeeSkuInfo: '',
    saleStatus: '1',
  },
})

const openAdd = () => {
  dialog.visible = true
  dialog.editing = false
  dialog.form = { id: 0, platform: '', account: '', platformSku: '', saleYeeSkuInfo: '', saleStatus: '1' }
}

const editRow = (row) => {
  dialog.visible = true
  dialog.editing = true
  dialog.form = {
    id: row.id,
    platform: row.platform,
    account: row.account,
    platformSku: row.platformSku,
    saleYeeSkuInfo: row.saleYeeSkuInfo,
    saleStatus: row.saleStatus,
  }
}

const saveDialog = () => {
  const label = platformOptions.find((o) => o.value === dialog.form.platform)?.label || ''
  if (dialog.editing) {
    const idx = data.value.findIndex((d) => d.id === dialog.form.id)
    if (idx !== -1) {
      data.value[idx] = {
        id: dialog.form.id,
        platform: String(dialog.form.platform),
        platformLabel: label,
        account: dialog.form.account,
        platformSku: dialog.form.platformSku,
        saleYeeSkuInfo: dialog.form.saleYeeSkuInfo,
        saleStatus: dialog.form.saleStatus,
        saleStatusLabel: dialog.form.saleStatus === '1' ? '在售' : '下架',
        source: '手动',
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      }
    }
  } else {
    const id = Date.now()
    data.value.unshift({
      id,
      platform: String(dialog.form.platform),
      platformLabel: label,
      account: dialog.form.account,
      platformSku: dialog.form.platformSku,
      saleYeeSkuInfo: dialog.form.saleYeeSkuInfo,
      saleStatus: dialog.form.saleStatus,
      saleStatusLabel: dialog.form.saleStatus === '1' ? '在售' : '下架',
      source: '手动',
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    })
  }
  dialog.visible = false
}

const removeRow = (row) => {
  data.value = data.value.filter((d) => d.id !== row.id)
}

const beforeImport = async (file) => {
  const text = await file.text()
  const rows = text.split(/\r?\n/).filter(Boolean)
  for (const line of rows.slice(1)) { // skip header
    const cols = line.split(',')
    if (cols.length < 6) continue
    const id = Date.now() + Math.floor(Math.random() * 10000)
    const platform = cols[0]
    const platformLabel = platformOptions.find((o) => o.value === platform)?.label || platform
    data.value.push({
      id,
      platform,
      platformLabel,
      account: cols[1],
      platformSku: cols[2],
      saleYeeSkuInfo: cols[3],
      saleStatus: cols[4] || '1',
      saleStatusLabel: cols[4] === '0' ? '下架' : '在售',
      source: '导入',
      updatedAt: cols[5] || new Date().toISOString().slice(0, 19).replace('T', ' '),
    })
  }
  return false
}

const downloadTemplate = () => {
  const header = ['平台类型(数值)','平台账号','平台SKU','SaleYee-SKU*数量*区域*物流','SKU状态(1在售/0下架)','最后更新时间']
  const csv = header.join(',') + '\n'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sku-mapping-template.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
:deep(.el-form-item__label) { color: #334155; }
</style>
