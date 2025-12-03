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
      <!-- 页面标题和按钮组 -->
      <div class="bg-white rounded-lg border border-slate-200 p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-slate-900 mb-4">我的订单</h2>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition text-sm">
              一件代发
            </button>
            <a href="#" class="px-4 py-2 border border-primary text-primary rounded hover:bg-slate-50 transition text-sm">
              批发
            </a>
          </div>
        </div>

        <!-- 警告提示区 -->
        <div class="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
          <div class="flex gap-3">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-yellow-800">
                <span class="font-medium">重要提示：</span><br>
                1.订单均为系统自动化推送并发货，若需要拦截订���，请务必在下单后及时申请拦截，实际拦截结果以系统告知为准；<br>
                2.状态为配货中的订单实际还未发出，跟踪号有可能变更，对上传跟踪号后不能进行修改的平台，建议在状态为待收货时再将跟踪号导出上传；<br>
                3.若订单有售后问题，请在平台开启售后并以售后页面的讨论结��为��终操作依据，请关注此页面的留言。平台客服工作时间：9:00-18:00（北京时间 周一 到周五）。周六安排客服值班，具体值班时间以实际为准；
              </p>
            </div>
          </div>
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
              @click="filterByStatus('WaitPayment')"
              :class="[
                'px-4 py-3 border-b-2 font-medium text-sm transition flex items-center gap-2',
                activeStatusFilter === 'WaitPayment'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              待付款 <span class="text-xs bg-slate-100 px-2 py-1 rounded">0</span>
            </button>
            <button 
              @click="filterByStatus('WaitSend')"
              :class="[
                'px-4 py-3 border-b-2 font-medium text-sm transition flex items-center gap-2',
                activeStatusFilter === 'WaitSend'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              配货中 <span class="text-xs bg-slate-100 px-2 py-1 rounded">0</span>
            </button>
            <button 
              @click="filterByStatus('WaitReceive')"
              :class="[
                'px-4 py-3 border-b-2 font-medium text-sm transition flex items-center gap-2',
                activeStatusFilter === 'WaitReceive'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              待收货 <span class="text-xs bg-slate-100 px-2 py-1 rounded">0</span>
            </button>
            <button 
              @click="filterByStatus('Complete')"
              :class="[
                'px-4 py-3 border-b-2 font-medium text-sm transition',
                activeStatusFilter === 'Complete'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              已完成
            </button>
            <button 
              @click="filterByStatus('Closed')"
              :class="[
                'px-4 py-3 border-b-2 font-medium text-sm transition',
                activeStatusFilter === 'Closed'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              已关闭
            </button>
          </div>
        </div>

        <!-- 搜索和筛选区 -->
        <div class="space-y-4">
          <!-- 基础搜索区块 -->
          <div class="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
              <!-- 搜索字段选择 + 搜索框 -->
              <div class="lg:col-span-6 flex items-end gap-2">
                <div class="flex-shrink-0">
                  <label class="block text-xs text-slate-600 font-medium mb-1">搜索方式</label>
                  <select v-model="queryWay" class="px-3 py-2 border border-slate-300 rounded text-sm bg-white min-w-max">
                    <option value="0">订单��</option>
                    <option value="1">自定义单号</option>
                    <option value="2">跟踪号</option>
                    <option value="3">SKU</option>
                    <option value="4">商品名称</option>
                    <option value="5">收件人</option>
                  </select>
                </div>
                <div class="flex-1">
                  <label class="block text-xs text-slate-600 font-medium mb-1">搜索关键词</label>
                  <input
                    v-model="searchKeyword"
                    type="text"
                    placeholder="默认搜索最近30天的单据"
                    class="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <!-- 下单时间范围 -->
              <div class="lg:col-span-6 flex items-end gap-2">
                <div class="flex-1">
                  <label class="block text-xs text-slate-600 font-medium mb-1">开始日期</label>
                  <input
                    type="date"
                    v-model="startTime"
                    class="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <span class="text-slate-400 flex-shrink-0">至</span>
                <div class="flex-1">
                  <label class="block text-xs text-slate-600 font-medium mb-1">结束日期</label>
                  <input
                    type="date"
                    v-model="endTime"
                    class="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 高级筛选区块（可折叠） -->
          <div v-if="showMoreFilters" class="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
            <h4 class="text-sm font-medium text-slate-900">高级筛选</h4>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <!-- 跟踪号状态 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">跟踪号状态</label>
                <select v-model="trackType" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="0">未产生</option>
                  <option value="1">已产生</option>
                  <option value="2">已���更</option>
                </select>
              </div>

              <!-- 创建方式 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">创建方式</label>
                <select v-model="createWay" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="1">手动下单</option>
                  <option value="2">批量��单</option>
                  <option value="3">API下单</option>
                  <option value="4">平台载单</option>
                  <option value="5">售后订单</option>
                  <option value="6">飞刊载单</option>
                </select>
              </div>

              <!-- 区域 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">区域</label>
                <select v-model="warehouse" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="SZ0011">CA</option>
                  <option value="SZ0010">RU</option>
                  <option value="SZ0009">ES</option>
                  <option value="SZ0007">CZ</option>
                  <option value="SZ0006">HK</option>
                  <option value="SZ0005">FR</option>
                  <option value="SZ0004">DE</option>
                  <option value="SZ0002">CN</option>
                  <option value="SZ0003">UK</option>
                  <option value="SZ0001">US</option>
                </select>
              </div>

              <!-- 币别 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">币别</label>
                <select v-model="currency" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="EUR">EUR</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>

              <!-- 导出跟踪号 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">导出跟踪号</label>
                <select v-model="exportType" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="1">已导出</option>
                  <option value="2">未导出</option>
                </select>
              </div>

              <!-- VAT税务类型 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">VAT税务类型</label>
                <select v-model="vatTaxType" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="1">个人卖家</option>
                  <option value="2">企业卖家</option>
                </select>
              </div>

              <!-- 开票订单 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">开票订单</label>
                <select v-model="isBillable" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="1">支持开票</option>
                  <option value="2">不支持开票</option>
                </select>
              </div>

              <!-- 库存类型 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">库存类型</label>
                <select v-model="orderType" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="1">公共</option>
                  <option value="2">圈货</option>
                  <option value="3">买断</option>
                </select>
              </div>

              <!-- 自提订单 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">自提订单</label>
                <select v-model="isPickUp" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </div>

              <!-- Label状态 -->
              <div>
                <label class="block text-xs text-slate-600 font-medium mb-1">Label状态</label>
                <select v-model="labelStatus" class="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">全部</option>
                  <option value="10">待上传</option>
                  <option value="20">已上传</option>
                </select>
              </div>

              <!-- VAT税号（单独占一行） -->
              <div class="md:col-span-2 lg:col-span-1">
                <label class="block text-xs text-slate-600 font-medium mb-1">VAT税号</label>
                <input
                  v-model="vatNumber"
                  type="text"
                  placeholder="请输入VAT税号"
                  class="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- ���钮行 -->
          <div class="flex gap-2 items-center justify-center">
            <button
              @click="searchOrders"
              class="px-8 py-2 bg-primary text-white rounded font-medium text-sm hover:bg-primary-dark transition h-10"
            >
              搜索
            </button>
            <button
              @click="toggleMoreFilters"
              class="px-4 py-2 border border-slate-300 text-slate-700 rounded text-sm hover:bg-slate-50 transition flex items-center gap-2 h-10"
            >
              <span>{{ showMoreFilters ? '收起' : '高级筛选' }}</span>
              <svg class="w-4 h-4 transition-transform" :style="{ transform: showMoreFilters ? 'rotate(180deg)' : 'rotate(0)' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 表格和操作栏 -->
      <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <!-- 表�� -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[35%]">商品</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[10%]">价格</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[10%]">数量</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[20%]">总额</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[12%]">状态</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[10%]">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="item in paginatedOrders" :key="item.id" class="hover:bg-slate-50 transition">
                <td class="px-4 py-4">
                  <div class="flex gap-3">
                    <img :src="item.productImage" :alt="item.productName" class="w-12 h-12 object-cover rounded border border-slate-200" />
                    <div>
                      <div class="text-sm font-medium text-slate-900">{{ item.productName }}</div>
                      <div class="text-xs text-slate-500 mt-1">SKU: {{ item.productSku }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-sm text-slate-900">${{ item.unitPrice }}</td>
                <td class="px-4 py-4 text-sm text-slate-900">{{ item.quantity }}</td>
                <td class="px-4 py-4 text-sm font-semibold text-slate-900">${{ item.totalAmount }}</td>
                <td class="px-4 py-4">
                  <span class="px-2 py-1 text-xs font-medium rounded" :class="getStatusClass(item.status)">
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-4 py-4">
                  <button @click="viewDetail(item.id)" class="text-primary hover:text-primary-dark text-sm font-medium">
                    查看
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
          <p class="text-slate-500 text-sm">您的订单是空的，<a href="#" class="text-primary hover:underline">赶紧去逛逛吧</a></p>
        </div>

        <!-- 底部操��栏 -->
        <div v-if="filteredOrders.length > 0" class="border-t border-slate-200 bg-slate-50 px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input type="checkbox" class="w-4 h-4 border border-slate-300 rounded" />
              <label class="text-sm text-slate-700">全选</label>
              <span class="text-sm text-slate-600">
                已选择 <em class="font-medium text-primary">0</em> 项
              </span>
              <div class="relative group">
                <button class="px-3 py-1 text-sm text-slate-700 hover:text-slate-900 flex items-center gap-1">
                  <span>导出</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </button>
                <div class="absolute left-0 hidden group-hover:block bg-white border border-slate-200 rounded shadow-lg z-10 min-w-max">
                  <button class="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm">导出全部订单</button>
                  <button class="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm">导出选中订单</button>
                  <button class="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm">导出全部物流信息</button>
                  <button class="block w-full text-left px-4 py-2 hover:bg-slate-100 text-sm">导出选中物流信息</button>
                </div>
              </div>
              <button class="px-3 py-1 text-sm text-slate-700 hover:text-slate-900">
                发票���量下载
              </button>
            </div>
            <button class="px-6 py-2 bg-primary text-white rounded text-sm hover:bg-primary-dark transition">
              去合并付款
            </button>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="filteredOrders.length > 0" class="border-t border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
          <div class="text-sm text-slate-600">
            �� {{ totalOrders }} 条 | 第 {{ currentPage }} 页
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

      <!-- Label上传区 -->
      <div v-if="showLabelUpload" class="bg-white rounded-lg border border-slate-200 p-6">
        <div class="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
          <div class="flex gap-3">
            <svg class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <p class="text-sm text-yellow-800">
              <span class="font-medium">重要提示：</span><br>
              1.请核对并上传本订单所需的Label文件：共 <b class="text-red-500">0</b> 张<br>
              2.<b class="text-yellow-700">物流信息一致</b>：选择的物流方式及跟踪号需与上传的Label信息完全匹配；<br>
              3.<b class="text-yellow-700">单张Label独立文件</b>：若您的Label文��合并���多张Label，请务必拆分为"单个PDF文件"；
            </p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[200px]"><span class="text-red-500">*</span>物流���式</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[200px]"><span class="text-red-500">*</span>跟踪号</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[310px]"><span class="text-red-500">*</span>Label文件</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-slate-700 w-[130px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-200">
                <td class="px-4 py-4">
                  <select class="w-full px-3 py-2 border border-slate-300 rounded text-sm">
                    <option>请选择</option>
                  </select>
                </td>
                <td class="px-4 py-4">
                  <input type="text" placeholder="请输入跟踪号" class="w-full px-3 py-2 border border-slate-300 rounded text-sm" />
                </td>
                <td class="px-4 py-4">
                  <label class="cursor-pointer">
                    <button class="px-4 py-2 bg-slate-100 text-slate-700 rounded text-sm hover:bg-slate-200 transition">
                      上传文件
                    </button>
                    <input type="file" accept="application/pdf" class="hidden" />
                  </label>
                </td>
                <td class="px-4 py-4">
                  <span class="text-sm text-primary cursor-pointer hover:underline">新增Label信息</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">订单详情</h3>
            <button @click="closeDetailModal" class="text-slate-500 hover:text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedOrder" class="space-y-6">
            <div class="flex flex-col md:flex-row md:items-start gap-6">
              <div class="flex-shrink-0">
                <img class="h-24 w-24 object-contain border border-slate-200 rounded" :src="selectedOrder.productImage" :alt="selectedOrder.productName" />
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-medium text-slate-900">{{ selectedOrder.productName }}</h4>
                <div class="mt-1 text-sm text-slate-500">SKU: {{ selectedOrder.productSku }}</div>
                <div class="mt-2">
                  <span class="px-2 py-1 text-xs font-medium rounded" :class="getStatusClass(selectedOrder.status)">
                    {{ selectedOrder.status }}
                  </span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-slate-900">${{ selectedOrder.totalAmount }}</div>
                <div class="text-sm text-slate-500 mt-1">{{ selectedOrder.quantity }} 件 × ${{ selectedOrder.unitPrice }}</div>
              </div>
            </div>
            
            <div class="border-t border-slate-200 pt-4">
              <h5 class="text-md font-medium text-slate-900 mb-3">订单信息</h5>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-slate-700">���单��</label>
                  <div class="mt-1 text-sm text-slate-900">{{ selectedOrder.orderNumber }}</div>
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700">下单时间</label>
                  <div class="mt-1 text-sm text-slate-900">{{ selectedOrder.orderDate }}</div>
                </div>
                <div class="md:col-span-2">
                  <label class="text-sm font-medium text-slate-700">收货地址</label>
                  <div class="mt-1 text-sm text-slate-900">{{ selectedOrder.deliveryAddress }}</div>
                </div>
                <div class="md:col-span-2">
                  <label class="text-sm font-medium text-slate-700">备注</label>
                  <div class="mt-1 text-sm text-slate-900">{{ selectedOrder.remarks || '无' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'

const currentPage = ref(1)
const pageSize = ref(5)
const showDetailModal = ref(false)
const selectedOrder = ref(null)
const activeStatusFilter = ref('all')
const searchKeyword = ref('')
const queryWay = ref('0')
const startTime = ref('')
const endTime = ref('')
const trackType = ref('')
const currency = ref('')
const createWay = ref('')
const exportType = ref('')
const warehouse = ref('')
const vatTaxType = ref('')
const vatNumber = ref('')
const isBillable = ref('')
const orderType = ref('')
const isPickUp = ref('')
const labelStatus = ref('')
const showMoreFilters = ref(false)
const showLabelUpload = ref(false)

const orders = [
  {
    id: 1,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/b4a7be3d-a601-4332-a34d-47833226c810.Jpeg',
    productName: '3抽抽屉柜 床头柜储物柜 白���',
    productSku: '75682614',
    unitPrice: 46.80,
    quantity: 2,
    totalAmount: 93.60,
    status: '待发货',
    orderDate: '2025-10-15 14:30:25',
    orderNumber: 'ORD20251015001',
    deliveryAddress: '北京市朝阳区xxx街道xxx号',
    remarks: '请尽快发货'
  },
  {
    id: 2,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/4695cd17-10c7-473c-960a-fbb9d18c4a90.Jpeg',
    productName: '12ft 巨型可怕幽灵 LED灯充气万圣装饰',
    productSku: '50904039',
    unitPrice: 34.04,
    quantity: 1,
    totalAmount: 34.04,
    status: '已发货',
    orderDate: '2025-10-14 09:15:42',
    orderNumber: 'ORD20251014002',
    deliveryAddress: '上海市浦东新区xxx路xxx号',
    remarks: '物流单号：FEDEX123456789'
  },
  {
    id: 3,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
    productName: '6ft LED南瓜灯 万圣节充气装饰',
    productSku: '50904040',
    unitPrice: 22.50,
    quantity: 3,
    totalAmount: 67.50,
    status: '已完成',
    orderDate: '2025-10-10 16:45:18',
    orderNumber: 'ORD20251010003',
    deliveryAddress: '广州市天河区xxx大道xxx号',
    remarks: '客户已签收'
  },
  {
    id: 4,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/b4a7be3d-a601-4332-a34d-47833226c810.Jpeg',
    productName: '现代简约3抽屉梳妆台 白色',
    productSku: '75682615',
    unitPrice: 52.00,
    quantity: 1,
    totalAmount: 52.00,
    status: '待付款',
    orderDate: '2025-10-08 11:20:33',
    orderNumber: 'ORD20251008004',
    deliveryAddress: '深圳市南山区xxx科技园xxx栋',
    remarks: ''
  },
  {
    id: 5,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/03b9a883-ada3-41af-88a5-0beba02f2eeb.Jpeg',
    productName: '万圣节幽灵装饰灯 黑色款',
    productSku: '50904041',
    unitPrice: 28.90,
    quantity: 2,
    totalAmount: 57.80,
    status: '已取消',
    orderDate: '2025-10-05 13:45:12',
    orderNumber: 'ORD20251005005',
    deliveryAddress: '杭州市西湖区xxx路xxx号',
    remarks: '客户主动取消'
  },
  {
    id: 6,
    productImage: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202312/86bb50ad-7a28-4ade-982f-600530c9bb3f.Jpeg',
    productName: '北欧风格床头柜 实木材质',
    productSku: '75682616',
    unitPrice: 65.50,
    quantity: 1,
    totalAmount: 65.50,
    status: '配货中',
    orderDate: '2025-10-01 10:30:45',
    orderNumber: 'ORD20251001006',
    deliveryAddress: '成都市锦江区xxx街道xxx号',
    remarks: '样品确认通过'
  },
]

const filteredOrders = computed(() => {
  let result = orders

  if (activeStatusFilter.value !== 'all') {
    result = result.filter(order => {
      const statusMap = {
        'WaitPayment': '待付款',
        'WaitSend': '���货中',
        'WaitReceive': '待收货',
        'Complete': '已完成',
        'Closed': '已关闭',
      }
      return order.status === statusMap[activeStatusFilter.value]
    })
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(order => 
      order.productName.toLowerCase().includes(keyword) || 
      order.productSku.toLowerCase().includes(keyword) || 
      order.orderNumber.toLowerCase().includes(keyword)
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

const viewDetail = (id) => {
  selectedOrder.value = orders.find(item => item.id === id) || null
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedOrder.value = null
}

const filterByStatus = (status) => {
  activeStatusFilter.value = status
  currentPage.value = 1
}

const searchOrders = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  activeStatusFilter.value = 'all'
  searchKeyword.value = ''
  queryWay.value = '0'
  startTime.value = ''
  endTime.value = ''
  trackType.value = ''
  currency.value = ''
  createWay.value = ''
  exportType.value = ''
  warehouse.value = ''
  vatTaxType.value = ''
  vatNumber.value = ''
  isBillable.value = ''
  orderType.value = ''
  isPickUp.value = ''
  labelStatus.value = ''
  currentPage.value = 1
}

const toggleMoreFilters = () => {
  showMoreFilters.value = !showMoreFilters.value
}

const getStatusClass = (status) => {
  switch (status) {
    case '待付款':
      return 'bg-yellow-100 text-yellow-800'
    case '配货中':
    case '待发货':
      return 'bg-blue-100 text-blue-800'
    case '待收货':
      return 'bg-indigo-100 text-indigo-800'
    case '已发货':
      return 'bg-purple-100 text-purple-800'
    case '已完成':
      return 'bg-green-100 text-green-800'
    case '已取消':
    case '已关闭':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<style scoped>
/* 可以根据需要添加自定义样式 */
</style>
