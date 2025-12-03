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
  <div class="mx-auto w-full max-w-[1500px] md:min-w-[1150px] px-4 md:px-0">
    <div class="flex flex-col gap-6">
      <!-- 页面标题和说明 -->
      <div class="bg-white rounded-lg border border-slate-200 p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-slate-900 mb-2">平台载单</h2>
          <p class="text-sm text-slate-600">(即同步平台订单，只有"已授权"状态的账号才能进行载单。)</p>
        </div>

        <!-- 订单状态 Tab -->
        <div class="border-b border-slate-200 mb-6">
          <div class="flex gap-1 flex-wrap">
            <button
              @click="filterByStatus('all')"
              :class="[
                'px-4 py-3 border-b-2 font-medium text-sm transition',
                activeStatusFilter === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              所有订单
            </button>
            <button
              v-for="status in statusOptions"
              :key="status.value"
              @click="filterByStatus(status.value)"
              :class="[
                'px-4 py-3 border-b-2 font-medium text-sm transition flex items-center gap-2',
                activeStatusFilter === status.value
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              {{ status.label }} <span class="text-xs bg-slate-100 px-2 py-1 rounded">0</span>
            </button>
          </div>
        </div>

        <!-- 搜索和筛选区 -->
        <form class="bg-white" @submit.prevent="searchOrders">
          <div class="space-y-0.5 mb-8">
            <!-- 过滤条件行 - 使用 2 列网格 -->
            <div class="flex flex-wrap">
              <!-- 平台类型 -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2.5 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">平台类型：</span>
                  <div class="relative inline-block w-[calc(100%-135px)]">
                    <input
                      type="text"
                      :value="platformTypeLabel"
                      placeholder="全部"
                      readonly
                      class="w-full h-[34px] px-2.5 py-0.5 border border-[#e6e6e6] rounded text-sm bg-white cursor-pointer"
                      @click="toggleDropdown('platformType')"
                    />
                    <i class="absolute right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#c2c2c2] cursor-pointer pointer-events-none"></i>
                    <dl
                      v-if="openDropdown === 'platformType'"
                      class="absolute top-[42px] left-0 z-50 w-full max-h-[300px] overflow-y-auto bg-white border border-[#d2d2d2] rounded shadow-md p-1.25"
                    >
                      <dd
                        v-for="opt in platformTypeOptions"
                        :key="opt.value"
                        class="px-2.5 py-0 leading-9 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 whitespace-nowrap overflow-hidden text-ellipsis"
                        :class="{ 'bg-[#cb2620] text-white': platformType === opt.value }"
                        @click="selectOption('platformType', opt.value, opt.label)"
                      >
                        {{ opt.label }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- 异常类型 -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2.5 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">异常类型：</span>
                  <div class="relative inline-block w-[calc(100%-135px)]">
                    <input
                      type="text"
                      :value="exceptionTypeLabel"
                      placeholder="全部"
                      readonly
                      class="w-full h-[34px] px-2.5 py-0.5 border border-[#e6e6e6] rounded text-sm bg-white cursor-pointer"
                      @click="toggleDropdown('exceptionType')"
                    />
                    <i class="absolute right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#c2c2c2] cursor-pointer pointer-events-none"></i>
                    <dl
                      v-if="openDropdown === 'exceptionType'"
                      class="absolute top-[42px] left-0 z-50 w-full max-h-[300px] overflow-y-auto bg-white border border-[#d2d2d2] rounded shadow-md p-1.25"
                    >
                      <dd
                        v-for="opt in exceptionTypeOptions"
                        :key="opt.value"
                        class="px-2.5 py-0 leading-9 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 whitespace-nowrap overflow-hidden text-ellipsis"
                        :class="{ 'bg-[#cb2620] text-white': exceptionType === opt.value }"
                        @click="selectOption('exceptionType', opt.value, opt.label)"
                      >
                        {{ opt.label }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- 平台账号 -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2.5 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">平台账���：</span>
                  <input
                    v-model="platformAccount"
                    type="text"
                    placeholder=""
                    class="inline-block w-[calc(100%-135px)] h-[34px] px-2.5 py-0.5 border border-[#d5d5d5] rounded text-sm bg-white"
                  />
                </div>
              </div>

              <!-- 跟踪号状态 -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2.5 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">跟踪号状态：</span>
                  <div class="relative inline-block w-[calc(100%-135px)]">
                    <input
                      type="text"
                      :value="trackingStatusLabel"
                      placeholder="全部"
                      readonly
                      class="w-full h-[34px] px-2.5 py-0.5 border border-[#e6e6e6] rounded text-sm bg-white cursor-pointer"
                      @click="toggleDropdown('trackingStatus')"
                    />
                    <i class="absolute right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#c2c2c2] cursor-pointer pointer-events-none"></i>
                    <dl
                      v-if="openDropdown === 'trackingStatus'"
                      class="absolute top-[42px] left-0 z-50 w-full max-h-[300px] overflow-y-auto bg-white border border-[#d2d2d2] rounded shadow-md p-1.25"
                    >
                      <dd
                        v-for="opt in trackingStatusOptions"
                        :key="opt.value"
                        class="px-2.5 py-0 leading-9 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 whitespace-nowrap overflow-hidden text-ellipsis"
                        :class="{ 'bg-[#cb2620] text-white': trackingStatus === opt.value }"
                        @click="selectOption('trackingStatus', opt.value, opt.label)"
                      >
                        {{ opt.label }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- 搜索关键词选择和输入 -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2.5 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">
                    <div class="relative inline-block w-[120px]">
                      <input
                        type="text"
                        :value="searchKeyTypeLabel"
                        placeholder="请选择"
                        readonly
                        class="w-[120px] h-[34px] px-2.5 py-0.5 border border-[#e6e6e6] rounded text-sm bg-white cursor-pointer text-right"
                        @click="toggleDropdown('searchKeyType')"
                      />
                      <i class="absolute right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#c2c2c2] cursor-pointer pointer-events-none"></i>
                      <dl
                        v-if="openDropdown === 'searchKeyType'"
                        class="absolute top-[42px] right-0 z-50 w-[120px] max-h-[300px] overflow-y-auto bg-white border border-[#d2d2d2] rounded shadow-md p-1.25 text-right"
                      >
                        <dd
                          v-for="opt in searchKeyTypeOptions"
                          :key="opt.value"
                          class="px-2.5 py-0 leading-9 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 whitespace-nowrap overflow-hidden text-ellipsis text-right"
                          :class="{ 'bg-[#cb2620] text-white': searchKeyType === opt.value }"
                          @click="selectOption('searchKeyType', opt.value, opt.label)"
                        >
                          {{ opt.label }}
                        </dd>
                      </dl>
                    </div>
                  </span>
                  <input
                    v-model="searchKeyword"
                    type="text"
                    placeholder=""
                    class="inline-block w-[calc(100%-135px)] h-[34px] px-2.5 py-0.5 border border-[#d5d5d5] rounded text-sm bg-white"
                  />
                </div>
              </div>

              <!-- 跟踪号上传状态 -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2.5 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">跟踪号上传状态：</span>
                  <div class="relative inline-block w-[calc(100%-135px)]">
                    <input
                      type="text"
                      :value="uploadStatusLabel"
                      placeholder="全部"
                      readonly
                      class="w-full h-[34px] px-2.5 py-0.5 border border-[#e6e6e6] rounded text-sm bg-white cursor-pointer"
                      @click="toggleDropdown('uploadStatus')"
                    />
                    <i class="absolute right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#c2c2c2] cursor-pointer pointer-events-none"></i>
                    <dl
                      v-if="openDropdown === 'uploadStatus'"
                      class="absolute top-[42px] left-0 z-50 w-full max-h-[300px] overflow-y-auto bg-white border border-[#d2d2d2] rounded shadow-md p-1.25"
                    >
                      <dd
                        v-for="opt in uploadStatusOptions"
                        :key="opt.value"
                        class="px-2.5 py-0 leading-9 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 whitespace-nowrap overflow-hidden text-ellipsis"
                        :class="{ 'bg-[#cb2620] text-white': uploadStatus === opt.value }"
                        @click="selectOption('uploadStatus', opt.value, opt.label)"
                      >
                        {{ opt.label }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- 是否拆单 -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2.5 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">是否拆单：</span>
                  <div class="relative inline-block w-[calc(100%-135px)]">
                    <input
                      type="text"
                      :value="isSplitLabel"
                      placeholder="全部"
                      readonly
                      class="w-full h-[34px] px-2.5 py-0.5 border border-[#e6e6e6] rounded text-sm bg-white cursor-pointer"
                      @click="toggleDropdown('isSplit')"
                    />
                    <i class="absolute right-2.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#c2c2c2] cursor-pointer pointer-events-none"></i>
                    <dl
                      v-if="openDropdown === 'isSplit'"
                      class="absolute top-[42px] left-0 z-50 w-full max-h-[300px] overflow-y-auto bg-white border border-[#d2d2d2] rounded shadow-md p-1.25"
                    >
                      <dd
                        v-for="opt in isSplitOptions"
                        :key="opt.value"
                        class="px-2.5 py-0 leading-9 text-sm text-slate-700 cursor-pointer hover:bg-slate-100 whitespace-nowrap overflow-hidden text-ellipsis"
                        :class="{ 'bg-[#cb2620] text-white': isSplit === opt.value }"
                        @click="selectOption('isSplit', opt.value, opt.label)"
                      >
                        {{ opt.label }}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- 下单时�� -->
              <div class="w-1/2 float-left p-2.5 min-h-[44px]">
                <div class="inline-flex items-center gap-2 w-full">
                  <span class="inline-block w-[120px] text-right leading-[34px] text-slate-700">下单时间：</span>
                  <input
                    v-model="startTime"
                    type="date"
                    placeholder="开始日期"
                    class="inline-block w-[calc(50%-74px)] h-[34px] px-2.5 py-0.5 border border-[#d5d5d5] rounded text-sm bg-white"
                  />
                  <span class="inline-block px-2 text-slate-400">-</span>
                  <input
                    v-model="endTime"
                    type="date"
                    placeholder="结束日期"
                    class="inline-block w-[calc(50%-74px)] h-[34px] px-2.5 py-0.5 border border-[#d5d5d5] rounded text-sm bg-white"
                  />
                </div>
              </div>

              <!-- 搜索按钮 -->
              <div class="w-full float-left p-2.5 min-h-[44px] text-center">
                <button
                  type="submit"
                  class="inline-block w-[100px] h-[38px] leading-[38px] px-4.5 bg-[#cb2620] text-white rounded text-sm cursor-pointer font-medium hover:bg-red-700 transition"
                >
                  搜索
                </button>
              </div>
            </div>
          </div>

          <!-- 清除浮动 -->
          <div class="clear-both"></div>

          <!-- 操作栏 -->
          <div class="flex gap-2 items-center justify-between mt-6">
            <button type="button" class="px-6 py-2 bg-primary text-white rounded font-medium text-sm hover:bg-primary-dark transition">
              手动载单
            </button>
            <div class="relative">
              <em
                class="text-xs text-orange-600 border border-orange-300 px-3 py-2 rounded bg-orange-50 cursor-pointer inline-block"
                @mouseenter="showNoticePopover = true"
                @mouseleave="showNoticePopover = false"
              >
                [ 注意事项 ]
              </em>
              <!-- 弹出框 -->
              <div
                v-if="showNoticePopover"
                class="absolute bottom-full mb-2 right-0 w-80 bg-orange-50 border border-orange-300 rounded px-4 py-3 text-xs text-orange-600 shadow-lg z-50"
                @mouseenter="showNoticePopover = true"
                @mouseleave="showNoticePopover = false"
              >
                <!-- 弹出框箭头 -->
                <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-orange-300"></div>
                <!-- 弹出框内容 -->
                <ul class="space-y-2 list-decimal list-inside">
                  <li>信息生成订单前，确定无遗漏订单，避免遗漏订单尺寸；</li>
                  <li>同时所有SKU无不同映射，除已取消的订单外；</li>
                  <li>暂不支持修改订单，若订单信息需变动，请手动删除订单；</li>
                  <li>创建订单可至我的订单"中选择平台订单查看；</li>
                  <li>不同类货区域SKU去拆单；</li>
                  <li>拆单的订单将有对应号每一性上传传；</li>
                  <li>务必完整号变更来应该的同构，订单已发货后之后支持上传跟踪号；</li>
                  <li>跨越号上传有最长30分钟的延迟，上传跟踪号后请耐心等待；</li>
                  <li>当前不支持异号追选号跨越号上传，请手动上传</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- 数据表格和操作栏 -->
      <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <!-- 表格 -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[17%]">
                  <div class="flex items-center gap-2">
                    <input type="checkbox" class="w-4 h-4 border border-slate-300 rounded" />
                    <span>商品</span>
                  </div>
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[9%]">金额</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[9%]">载单状态</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[9%]">跟踪号状态</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[12%]">跟踪号上传状态</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[11%]">异常类型</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[8%]">拆单</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[15%]">
                  <select class="px-2 py-1 border border-slate-300 rounded text-sm bg-white">
                    <option value="">标记</option>
                    <option value="0">无标记</option>
                    <option value="1">不自动上传</option>
                    <option value="2">超时不自动上传</option>
                  </select>
                </th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[10%]">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="item in paginatedOrders" :key="item.id" class="hover:bg-slate-50 transition">
                <td class="px-4 py-4">
                  <div class="flex gap-3 items-center">
                    <input type="checkbox" class="w-4 h-4 border border-slate-300 rounded" />
                    <div>
                      <div class="text-sm font-medium text-slate-900">{{ item.productName }}</div>
                      <div class="text-xs text-slate-500 mt-1">{{ item.platformOrderNo }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-slate-900">${{ item.amount }}</td>
                <td class="px-4 py-4">
                  <span class="px-2 py-1 text-xs font-medium rounded" :class="getStatusClass(item.loadStatus)">
                    {{ item.loadStatus }}
                  </span>
                </td>
                <td class="px-4 py-4 text-sm text-slate-900">{{ item.trackingStatus }}</td>
                <td class="px-4 py-4">
                  <span class="px-2 py-1 text-xs font-medium rounded" :class="getUploadStatusClass(item.uploadStatus)">
                    {{ item.uploadStatus }}
                  </span>
                </td>
                <td class="px-4 py-4 text-sm text-slate-900">{{ item.exceptionType || '-' }}</td>
                <td class="px-4 py-4 text-sm text-slate-900">{{ item.isSplit }}</td>
                <td class="px-4 py-4 text-sm text-slate-900">{{ item.tag || '-' }}</td>
                <td class="px-4 py-4">
                  <button class="text-primary hover:text-primary-dark text-sm font-medium">
                    编辑
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 空状态 -->
        <div v-if="filteredOrders.length === 0" class="text-center py-16">
          <svg class="w-20 h-20 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          <p class="text-slate-500 text-sm">没有找到数据，您可以更换搜索条件</p>
        </div>

        <!-- 分页 -->
        <div v-if="filteredOrders.length > 0" class="border-t border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
          <div class="text-sm text-slate-600">
            共 {{ totalOrders }} 条 | 第 {{ currentPage }} 页
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              上一页
            </button>
            <div class="flex items-center gap-1">
              <button
                v-for="page in paginationRange"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 text-sm rounded transition',
                  currentPage === page
                    ? 'bg-primary text-white border border-primary'
                    : 'border border-slate-300 hover:bg-slate-100'
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const activeStatusFilter = ref('all')
const searchKeyword = ref('')
const searchKeyType = ref('1')
const startTime = ref('2025-09-18')
const endTime = ref('')
const platformType = ref('')
const exceptionType = ref('')
const platformAccount = ref('')
const trackingStatus = ref('')
const uploadStatus = ref('')
const isSplit = ref('')
const openDropdown = ref(null)
const showNoticePopover = ref(false)

const platformTypeOptions = [
  { value: '', label: '全部' },
  { value: '1', label: 'WISH' },
  { value: '2', label: 'eBay' },
  { value: '3', label: '美国亚马逊' },
  { value: '4', label: '加拿大亚马逊' },
  { value: '5', label: '墨西哥亚马逊' },
  { value: '6', label: '英国亚马逊' },
  { value: '7', label: '法国���马逊' },
  { value: '8', label: '德国亚马逊' },
  { value: '9', label: '意大利亚马逊' },
  { value: '10', label: '西班牙亚马逊' },
  { value: '11', label: '赛盒' },
  { value: '12', label: 'Shopify' },
  { value: '13', label: 'EKM' },
  { value: '14', label: 'Walmart' },
]

const exceptionTypeOptions = [
  { value: '', label: '全部' },
  { value: '1', label: '无SKU映射' },
  { value: '2', label: '库存不足' },
  { value: '3', label: '无商品权限' },
  { value: '4', label: '配送信息错误，请点击"编辑"进行修改' },
  { value: '5', label: '发货区域不支持，请将SKU映射的区域与收货地址的国家改为一致' },
  { value: '6', label: '自定义单号与历史订单重复��请检查表格数据并重新上传' },
  { value: '7', label: '报价失败' },
  { value: '8', label: '无物流映射' },
  { value: '9', label: '此客户仅支持品牌商品下单' },
  { value: '10', label: '此客户仅支持非品牌商品下单' },
]

const trackingStatusOptions = [
  { value: '', label: '全部' },
  { value: '0', label: '未产生' },
  { value: '10', label: '已产生' },
  { value: '20', label: '已变更' },
]

const searchKeyTypeOptions = [
  { value: '1', label: '平台订单号' },
  { value: '2', label: 'SaleYee-SKU' },
  { value: '3', label: '平台SKU' },
]

const uploadStatusOptions = [
  { value: '', label: '全部' },
  { value: '0', label: '待上传' },
  { value: '10', label: '待更新' },
  { value: '15', label: '上传中' },
  { value: '20', label: '已上传' },
  { value: '30', label: '上传失败' },
]

const isSplitOptions = [
  { value: '', label: '全部' },
  { value: '10', label: '是' },
  { value: '20', label: '否' },
]

const statusOptions = [
  { value: 'pending', label: '待生成订单' },
  { value: 'unshipped', label: '未发货' },
  { value: 'partial', label: '部分发货' },
  { value: 'shipped', label: '已发货' },
  { value: 'draft', label: '暂存订单' },
  { value: 'timeout', label: '超过24小时未上传跟踪号' },
  { value: 'waiting', label: '待上传跟��号' },
]

const platformTypeLabel = computed(() => {
  const opt = platformTypeOptions.find(o => o.value === platformType.value)
  return opt?.label || '全部'
})

const exceptionTypeLabel = computed(() => {
  const opt = exceptionTypeOptions.find(o => o.value === exceptionType.value)
  return opt?.label || '全部'
})

const trackingStatusLabel = computed(() => {
  const opt = trackingStatusOptions.find(o => o.value === trackingStatus.value)
  return opt?.label || '全部'
})

const searchKeyTypeLabel = computed(() => {
  const opt = searchKeyTypeOptions.find(o => o.value === searchKeyType.value)
  return opt?.label || '平台订单号'
})

const uploadStatusLabel = computed(() => {
  const opt = uploadStatusOptions.find(o => o.value === uploadStatus.value)
  return opt?.label || '全部'
})

const isSplitLabel = computed(() => {
  const opt = isSplitOptions.find(o => o.value === isSplit.value)
  return opt?.label || '全部'
})

const platformOrders = [
  {
    id: 1,
    platformOrderNo: 'AMZ-20251018-001',
    productName: '蓝牙耳机无线充电',
    amount: 32.50,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
    tag: '无标记',
  },
  {
    id: 2,
    platformOrderNo: 'eBay-20251017-052',
    productName: '户外LED手电筒',
    amount: 18.99,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '待上传',
    exceptionType: '',
    isSplit: '是',
  },
  {
    id: 3,
    platformOrderNo: 'WISH-20251016-234',
    productName: '防水运动手���',
    amount: 45.00,
    loadStatus: '生成失败',
    trackingStatus: '未产生',
    uploadStatus: '待上传',
    exceptionType: '无SKU映射',
    isSplit: '否',
  },
  {
    id: 4,
    platformOrderNo: 'Shopify-20251015-089',
    productName: '智能家居控制器',
    amount: 62.75,
    loadStatus: '已生成',
    trackingStatus: '已变更',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
    tag: '不自动上传',
  },
  {
    id: 5,
    platformOrderNo: 'AMZ-20251014-156',
    productName: '充电宝20000mAh',
    amount: 24.50,
    loadStatus: '已生���',
    trackingStatus: '已产生',
    uploadStatus: '上传���败',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 6,
    platformOrderNo: 'eBay-20251013-678',
    productName: '手机壳保护套',
    amount: 8.99,
    loadStatus: '已生成',
    trackingStatus: '未产生',
    uploadStatus: '待上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 7,
    platformOrderNo: 'WISH-20251012-445',
    productName: '自拍杆三脚架',
    amount: 15.80,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '是',
  },
  {
    id: 8,
    platformOrderNo: 'Shopify-20251011-723',
    productName: '蓝牙音箱便携式',
    amount: 38.00,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '待更新',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 9,
    platformOrderNo: 'AMZ-20251010-234',
    productName: '显示器支架调节',
    amount: 29.99,
    loadStatus: '已生成',
    trackingStatus: '未产生',
    uploadStatus: '待上传',
    exceptionType: '库存不足',
    isSplit: '否',
  },
  {
    id: 10,
    platformOrderNo: 'eBay-20251009-891',
    productName: '键盘鼠标套装',
    amount: 35.50,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 11,
    platformOrderNo: 'WISH-20251008-567',
    productName: '手机壳防摔',
    amount: 12.00,
    loadStatus: '生成失败',
    trackingStatus: '未产生',
    uploadStatus: '待上传',
    exceptionType: '无商品权限',
    isSplit: '否',
  },
  {
    id: 12,
    platformOrderNo: 'Shopify-20251007-334',
    productName: '保温杯不锈钢',
    amount: 28.50,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 13,
    platformOrderNo: 'AMZ-20251006-445',
    productName: '运动鞋休闲',
    amount: 75.00,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '上传中',
    exceptionType: '',
    isSplit: '是',
  },
  {
    id: 14,
    platformOrderNo: 'eBay-20251005-112',
    productName: '背包双肩包',
    amount: 42.00,
    loadStatus: '��生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 15,
    platformOrderNo: 'WISH-20251004-789',
    productName: '帽子棒球帽',
    amount: 16.50,
    loadStatus: '已生成',
    trackingStatus: '未产生',
    uploadStatus: '待上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 16,
    platformOrderNo: 'Shopify-20251003-556',
    productName: '手套冬季保暖',
    amount: 18.99,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 17,
    platformOrderNo: 'AMZ-20251002-667',
    productName: '围巾羊毛',
    amount: 32.00,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 18,
    platformOrderNo: 'eBay-20251001-778',
    productName: '袜子棉质',
    amount: 9.99,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '待上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 19,
    platformOrderNo: 'WISH-20250930-889',
    productName: '皮带腰带',
    amount: 22.50,
    loadStatus: '已生成',
    trackingStatus: '已产生',
    uploadStatus: '已上传',
    exceptionType: '',
    isSplit: '否',
  },
  {
    id: 20,
    platformOrderNo: 'Shopify-20250929-445',
    productName: '腰包斜挎包',
    amount: 26.00,
    loadStatus: '已生成',
    trackingStatus: '已产���',
    uploadStatus: '���上传',
    exceptionType: '',
    isSplit: '是',
  },
]

const filteredOrders = computed(() => {
  let result = platformOrders

  if (activeStatusFilter.value !== 'all') {
    // TODO: 根据状态过滤
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(order =>
      order.productName.toLowerCase().includes(keyword) ||
      order.platformOrderNo.toLowerCase().includes(keyword)
    )
  }

  return result
})

const totalOrders = computed(() => filteredOrders.value.length)
const totalPages = computed(() => Math.ceil(totalOrders.value / pageSize.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredOrders.value.slice(start, end)
})

const paginationRange = computed(() => {
  const delta = 2
  const left = Math.max(1, currentPage.value - delta)
  const right = Math.min(totalPages.value, currentPage.value + delta)
  const range = []

  if (left > 1) {
    range.push(1)
    if (left > 2) {
      range.push('...')
    }
  }

  for (let i = left; i <= right; i++) {
    range.push(i)
  }

  if (right < totalPages.value) {
    if (right < totalPages.value - 1) {
      range.push('...')
    }
    range.push(totalPages.value)
  }

  return range
})

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const filterByStatus = (status) => {
  activeStatusFilter.value = status
  currentPage.value = 1
}

const searchOrders = () => {
  currentPage.value = 1
}

const toggleDropdown = (dropdownName) => {
  openDropdown.value = openDropdown.value === dropdownName ? null : dropdownName
}

const selectOption = (fieldName, value, label) => {
  switch (fieldName) {
    case 'platformType':
      platformType.value = value
      break
    case 'exceptionType':
      exceptionType.value = value
      break
    case 'trackingStatus':
      trackingStatus.value = value
      break
    case 'searchKeyType':
      searchKeyType.value = value
      break
    case 'uploadStatus':
      uploadStatus.value = value
      break
    case 'isSplit':
      isSplit.value = value
      break
  }
  openDropdown.value = null
}

const getStatusClass = (status) => {
  switch (status) {
    case '已生成':
      return 'bg-green-100 text-green-800'
    case '生���失败':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getUploadStatusClass = (status) => {
  switch (status) {
    case '已上传':
      return 'bg-green-100 text-green-800'
    case '待上传':
      return 'bg-yellow-100 text-yellow-800'
    case '上传失败':
      return 'bg-red-100 text-red-800'
    case '上传中':
      return 'bg-blue-100 text-blue-800'
    case '待更新':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<style scoped>
/* 可以根据需要添加自定义样式 */
</style>
