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
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900 float-left">载单设置</h6>
    </div>

    <!-- 载单设置：单选 -->
    <div class="mt-6 mb-6">
      <div class="flex items-start">
        <div class="w-[160px] text-right font-semibold leading-[38px] text-slate-900">载单设置：</div>
        <div class="flex-1">
          <div class="flex items-center gap-6 min-h-[38px]">
            <label class="inline-flex items-center gap-2 select-none cursor-pointer">
              <input id="orderSetAll" type="radio" class="h-4 w-4" value="1" v-model="platOrderSet" />
              <span>同步平台所有订单</span>
            </label>
            <label class="inline-flex items-center gap-2 select-none cursor-pointer">
              <input id="orderSetMapped" type="radio" class="h-4 w-4" value="0" v-model="platOrderSet" />
              <span>只同步有SKU映射的订单</span>
            </label>
          </div>
          <div class="mt-3">
            <button type="button" @click="saveOrderSetting" class="px-[10px] h-[30px] leading-[30px] text-xs text-white bg-primary rounded">保存设置</button>
            <span v-if="saved.orderSet" class="ml-3 text-xs text-green-600">已保存</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="border-t border-slate-200 pt-6 mt-6">
      <!-- 自动上传跟踪号 -->
      <div class="">
        <p class="inline-block w-[160px] text-right font-semibold leading-[38px] text-slate-900">自动上传跟踪号：</p>
        <span class="inline-block">
          <label class="inline-flex items-center gap-2 mr-5 select-none leading-[28px] cursor-pointer">
            <input type="radio" class="h-4 w-4" value="true" v-model="autoUploadRaw" />
            <span>开启</span>
          </label>
          <label class="inline-flex items-center gap-2 mr-5 select-none leading-[28px] cursor-pointer">
            <input type="radio" class="h-4 w-4" value="false" v-model="autoUploadRaw" />
            <span>关闭</span>
          </label>
          <a class="text-primary hover:underline text-sm align-middle" target="_blank" href="https://www.saleyee.com/PlatformOrder/PlatfromAutoUploadNotice">《赛盈平台跟踪号自动上传规则即风险告知书》</a>
        </span>
      </div>

      <!-- 店铺规则设置 -->
      <div class="mt-4">
        <div class="ml-[160px]">
          <p class="leading-[34px]">店铺自动上传跟踪号规则设置</p>
          <button type="button" class="mt-2 px-[10px] h-[30px] text-xs border border-primary text-primary rounded">批量设置</button>
          <div class="overflow-x-auto mt-2">
            <table class="w-full border-collapse bg-white">
              <thead>
                <tr class="bg-[#f2f2f2]">
                  <th class="th w-[5%]">
                    <input type="checkbox" class="h-4 w-4" :checked="false" disabled />
                  </th>
                  <th class="th w-[15%]">平台类型</th>
                  <th class="th w-[30%]">平台账号</th>
                  <th class="th w-[30%]">最后可更新跟踪号时间</th>
                  <th class="th w-[20%]">未发货可传跟踪号</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="stores.length === 0">
                  <td colspan="5" class="text-center text-slate-500 py-6">暂无店铺</td>
                </tr>
                <tr v-for="s in stores" :key="s.id">
                  <td class="td">
                    <input type="checkbox" class="h-4 w-4" v-model="s.selected" />
                  </td>
                  <td class="td text-slate-700">{{ s.platformLabel }}</td>
                  <td class="td text-slate-700">{{ s.account }}</td>
                  <td class="td">
                    <div class="flex items-center justify-center gap-2">
                      <input type="number" class="h-8 w-24 px-2 border border-slate-300 rounded" v-model.number="s.lastUpdateLimit" min="1" @change="normalizeStoreLimit(s)" />
                      <select class="h-8 px-2 border border-slate-300 rounded" v-model.number="s.lastUpdateUnit">
                        <option :value="1">工作日</option>
                        <option :value="2">小时</option>
                        <option :value="3">自然日</option>
                      </select>
                    </div>
                  </td>
                  <td class="td">
                    <input type="checkbox" class="h-4 w-4" v-model="s.allowNotShipped" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" @click="saveStoreRules" class="mt-3 px-[10px] h-[30px] leading-[30px] text-xs text-white bg-primary rounded">保存</button>
          <span v-if="saved.storeRules" class="ml-3 text-xs text-green-600">已保存</span>
        </div>
      </div>
    </div>

    <!-- 飞刊订单购买保障服务 -->
    <div class="border-t border-slate-200 pt-6 mt-6">
      <div>
        <p class="inline-block w-[200px] whitespace-nowrap text-right font-semibold leading-[38px] text-slate-900">飞刊订单购买保障服务：</p>
        <span class="inline-block align-middle text-slate-700">
          在飞刊向赛盈平台创建订单时，按如下设置自动购买保障服务。
          <a class="text-primary hover:underline" target="_blank" href="https://www.flasting.cn/order/salesorder/awaitingorder">前往���刊</a>
        </span>
      </div>
      <div class="mt-2">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse bg-white">
            <thead>
              <tr class="bg-[#f2f2f2]">
                <th class="th text-left">平台服务类型</th>
                <th class="th text-left">平台服务名称</th>
                <th class="th text-left">
                  创建订单时自动购买保障服务
                  <span class="align-middle ml-1 inline-block">
                    <img src="https://www.saleyee.com/ContentNew/Images/2021/November/insurance_icon.png" class="inline-block w-5 align-middle opacity-60" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2" class="td align-top">
                  退货保障服务
                  <span class="ml-1 align-middle inline-block">
                    <img src="https://www.saleyee.com/ContentNew/Images/2021/November/insurance_icon.png" class="inline-block w-5 align-middle opacity-60" />
                  </span>
                  <div class="mt-2 text-xs text-white bg-[#4e4e4e] rounded shadow px-1.5 py-1 inline-block">
                    <p>退货保障服��：适用于“非产品质量问题原因”产生退货订单；</p>
                    <p>赔付额度：订单金额65%； <a target="_blank" href="https://www.saleyee.com/faq/hp503378.html" class="underline">协议详情</a></p>
                  </div>
                </td>
                <td class="td">基础版 (费率 2.50%，发货后 <em class="not-italic font-semibold">45</em> 天内有效)</td>
                <td class="td">
                  <button type="button" @click="toggleService('BX0001')" :class="toggleClass(services.BX0001)">{{ services.BX0001 ? 'ON' : 'OFF' }}</button>
                </td>
              </tr>
              <tr>
                <td class="td">标准版 (费率 5.00%，发货后 <em class="not-italic font-semibold">30</em> 天内有效)</td>
                <td class="td">
                  <button type="button" @click="toggleService('BX0003')" :class="toggleClass(services.BX0003)">{{ services.BX0003 ? 'ON' : 'OFF' }}</button>
                </td>
              </tr>
              <tr>
                <td class="td align-top">
                  物流保障服务
                  <span class="ml-1 align-middle inline-block">
                    <img src="https://www.saleyee.com/ContentNew/Images/2021/November/insurance_icon.png" class="inline-block w-5 align-middle opacity-60" />
                  </span>
                  <div class="mt-2 text-xs text-white bg-[#4e4e4e] rounded shadow px-1.5 py-1 inline-block">
                    <p>物流保障服务：适用于“物流妥投未收到原因”产生订单；</p>
                    <p>赔付额度：订单金额100% <a target="_blank" href="https://www.saleyee.com/faq/hp114856.html" class="underline">协议详情</a></p>
                  </div>
                </td>
                <td class="td">基础版 (费率 2.00%，下单支付后 <em class="not-italic font-semibold">40</em> 天内有效)</td>
                <td class="td">
                  <button type="button" @click="toggleService('BX0002')" :class="toggleClass(services.BX0002)">{{ services.BX0002 ? 'ON' : 'OFF' }}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="button" @click="saveInsurance" class="mt-3 px-[10px] h-[30px] leading-[30px] text-xs text-white bg-primary rounded">保存</button>
        <span v-if="saved.insurance" class="ml-3 text-xs text-green-600">已保存</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 载单设置：同步范围（1=全部, 0=仅SKU映射）
const platOrderSet = ref('0')

// 自动上传跟踪号
const autoUploadRaw = ref('false')
const autoUpload = computed({
  get: () => autoUploadRaw.value === 'true',
  set: (v) => (autoUploadRaw.value = v ? 'true' : 'false'),
})

// 与附件一致：表格可为空
const stores = ref([])

const normalizeStoreLimit = (s) => {
  if (!Number.isFinite(s.lastUpdateLimit) || s.lastUpdateLimit < 1) s.lastUpdateLimit = 1
  s.lastUpdateLimit = Math.floor(s.lastUpdateLimit)
}

const saved = ref({ orderSet: false, storeRules: false, insurance: false })
const saveOrderSetting = () => {
  saved.value.orderSet = true
  setTimeout(() => (saved.value.orderSet = false), 1500)
}
const saveStoreRules = () => {
  stores.value.forEach((s) => normalizeStoreLimit(s))
  saved.value.storeRules = true
  setTimeout(() => (saved.value.storeRules = false), 1500)
}

// 保障服务开关
const services = ref({ BX0001: true, BX0003: true, BX0002: true })
const toggleService = (code) => {
  services.value[code] = !services.value[code]
}
const toggleClass = (on) =>
  `inline-flex items-center justify-center min-w-[48px] h-[22px] text-xs rounded-full border ${
    on ? 'bg-primary text-white border-primary' : 'bg-white text-slate-700 border-slate-300'
  }`
const saveInsurance = () => {
  saved.value.insurance = true
  setTimeout(() => (saved.value.insurance = false), 1500)
}
</script>

<style scoped>
.th { @apply border border-slate-300 px-4 py-2 text-sm text-center align-middle; }
.td { @apply border border-slate-300 px-4 py-2 text-sm text-left; }
</style>
