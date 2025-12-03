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
  <div class="bg-white">
    <!-- 页面标题 -->
    <div style="height: 50px; padding-top: 10px; position: relative; background-color: rgb(255, 255, 255);">
      <h6 style="color: rgb(51, 51, 51); float: left; font-size: 16px; font-weight: 700; line-height: 40px; position: relative;">异常订单</h6>
    </div>

    <!-- 提示框 -->
    <div style="background-color: rgb(252, 248, 227); border: 1px solid rgb(250, 235, 204); border-radius: 3px; display: flex; margin: 10px; padding: 10px; margin-bottom: 10px;">
      <div style="float: left; width: 17px;">
        <i style="color: rgb(167, 114, 0); font-size: 18px; line-height: 24px; user-select: none;">⚠️</i>
      </div>
      <div style="float: right; margin-left: 8px; width: calc(100% - 26px);">
        <p style="color: rgb(167, 114, 0); line-height: 24px; text-align: left; margin: 0;">异常订单请联系业务经理处理</p>
      </div>
      <div style="clear: both;"></div>
    </div>

    <!-- 搜索过滤区 -->
    <div style="margin-bottom: 30px; width: 100%; padding-left: 20px; padding-right: 20px; padding-top: 10px;">
      <form @submit.prevent="searchOrders">
        <ul style="padding-left: 0; list-style: none;">
          <!-- 下单时间 -->
          <li style="display: list-item; float: left; margin-bottom: 5px; margin-right: 5%; margin-top: 5px; min-height: 34px; width: 45%;">
            <span style="display: inline-block; line-height: 34px; margin-right: 10px; text-align: right; vertical-align: top; width: 100px;">下单时间：</span>
            <input
              v-model="startTime"
              type="date"
              placeholder="开始日期"
              style="appearance: auto; background-color: rgb(255, 255, 255); border: 1px solid rgb(213, 213, 213); border-radius: 2px; display: inline-block; font-size: 16px; height: 34px; line-height: 34px; padding: 3px 10px 3px 10px; transition: 0.5s; width: calc(50% - 64px);"
            />
            <span style="margin: 0 5px;">-</span>
            <input
              v-model="endTime"
              type="date"
              placeholder="结束日期"
              style="appearance: auto; background-color: rgb(255, 255, 255); border: 1px solid rgb(213, 213, 213); border-radius: 2px; display: inline-block; font-size: 16px; height: 34px; line-height: 34px; padding: 3px 10px 3px 10px; transition: 0.5s; width: calc(50% - 64px);"
            />
          </li>

          <!-- 订单号搜索 -->
          <li style="display: list-item; float: left; margin-bottom: 5px; margin-right: 5%; margin-top: 5px; min-height: 34px; width: 45%;">
            <span style="display: inline-block; line-height: 34px; margin-right: 10px; text-align: right; vertical-align: top; width: 100px;">
              <select
                v-model="searchType"
                style="background-color: rgb(255, 255, 255); border: 1px solid rgb(230, 230, 230); border-radius: 2px; height: 34px; line-height: 34px; padding: 3px 10px 3px 10px; cursor: pointer; transition: 0.3s; user-select: none; width: 100px;"
              >
                <option value="0">订单号</option>
                <option value="1">自定义单号</option>
                <option value="5">收件人</option>
              </select>
            </span>
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="请输入"
              style="appearance: auto; background-color: rgb(255, 255, 255); border: 1px solid rgb(213, 213, 213); border-radius: 2px; display: inline-block; height: 34px; line-height: 34px; padding: 3px 10px 3px 10px; transition: 0.5s; width: calc(100% - 115px);"
            />
          </li>

          <!-- 支付时间 -->
          <li style="display: list-item; float: left; margin-bottom: 5px; margin-right: 5%; margin-top: 5px; min-height: 34px; width: 45%;">
            <span style="display: inline-block; line-height: 34px; margin-right: 10px; text-align: right; vertical-align: top; width: 100px;">支付时间：</span>
            <input
              v-model="paidStartTime"
              type="date"
              placeholder="开始日期"
              style="appearance: auto; background-color: rgb(255, 255, 255); border: 1px solid rgb(213, 213, 213); border-radius: 2px; display: inline-block; font-size: 16px; height: 34px; line-height: 34px; padding: 3px 10px 3px 10px; transition: 0.5s; width: calc(50% - 64px);"
            />
            <span style="margin: 0 5px;">-</span>
            <input
              v-model="paidEndTime"
              type="date"
              placeholder="结束日期"
              style="appearance: auto; background-color: rgb(255, 255, 255); border: 1px solid rgb(213, 213, 213); border-radius: 2px; display: inline-block; font-size: 16px; height: 34px; line-height: 34px; padding: 3px 10px 3px 10px; transition: 0.5s; width: calc(50% - 64px);"
            />
          </li>

          <!-- 区域选择 -->
          <li style="display: list-item; float: left; margin-bottom: 5px; margin-right: 5%; margin-top: 5px; min-height: 34px; width: 45%;">
            <span style="display: inline-block; line-height: 34px; margin-right: 10px; text-align: right; vertical-align: top; width: 100px;">区域：</span>
            <select
              v-model="selectedRegion"
              style="background-color: rgb(255, 255, 255); border: 1px solid rgb(230, 230, 230); border-radius: 2px; height: 34px; line-height: 34px; padding: 3px 10px 3px 10px; cursor: pointer; transition: 0.3s; user-select: none; width: calc(100% - 115px);"
            >
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
          </li>

          <!-- 搜索按钮 -->
          <li style="float: left; margin-bottom: 5px; margin-right: 5%; margin-top: 10px; min-height: 34px; text-align: center; width: 95%;">
            <button
              type="submit"
              style="background-color: rgb(203, 38, 28); border: none; border-radius: 2px; color: rgb(255, 255, 255); cursor: pointer; display: inline-block; height: 38px; line-height: 38px; padding: 0 18px; text-align: center; transition: 0.3s; user-select: none; vertical-align: middle; white-space: nowrap; width: 100px;"
            >
              搜索
            </button>
          </li>
        </ul>
      </form>
      <div style="clear: both;"></div>
    </div>

    <!-- 表格区域 -->
    <div style="padding-left: 20px; padding-right: 20px;">
      <div style="overflow-x: auto;">
        <table style="background-color: rgb(255, 255, 255); border-collapse: collapse; display: table; margin-bottom: 10px; margin-top: 10px; width: 100%;">
          <thead style="display: table-header-group; vertical-align: middle;">
            <tr style="background-color: rgb(242, 242, 242); display: table-row; vertical-align: middle;">
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 35%;">商品</th>
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 10%;">价格</th>
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 6%;">数量</th>
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 10%;">总额</th>
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 6%;">状态</th>
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 11%;">异常原因</th>
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 11%;">处理意见</th>
              <th style="border: 1px solid rgb(230, 230, 230); display: table-cell; line-height: 20px; min-height: 20px; padding: 9px 15px; position: relative; text-align: center; vertical-align: middle; width: 10%;">操作</th>
            </tr>
          </thead>
          <tbody style="display: table-row-group; vertical-align: middle;">
            <tr v-for="order in paginatedOrders" :key="order.id" style="background-color: rgb(255, 255, 255); display: table-row; transition: 0.3s; vertical-align: middle; border-bottom: 1px solid rgb(230, 230, 230);">
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">
                <div style="text-align: left;">{{ order.productName }}</div>
              </td>
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">${{ order.price }}</td>
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">{{ order.quantity }}</td>
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">${{ order.totalAmount }}</td>
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">
                <span :class="getStatusClass(order.status)">{{ order.status }}</span>
              </td>
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">{{ order.exceptionReason }}</td>
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">{{ order.handlingOpinion }}</td>
              <td style="border: 1px solid rgb(230, 230, 230); display: table-cell; padding: 9px 15px; text-align: center; vertical-align: middle;">
                <button @click="editOrder(order.id)" style="color: rgb(203, 38, 28); background: none; border: none; cursor: pointer; font-weight: bold; text-decoration: underline;">处理</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 空状态 -->
      <div v-if="paginatedOrders.length === 0" style="font-size: 24px; line-height: 36px; padding-bottom: 50px; padding-top: 50px; text-align: center;">
        没有找到数据，您可以更换搜索条件
      </div>

      <!-- 分页 -->
      <div v-if="filteredOrders.length > 0" style="background-color: rgb(255, 255, 255); margin-bottom: 20px; width: 100%; margin-top: 20px;">
        <div style="padding-bottom: 10px; padding-left: 1px; padding-top: 10px; text-align: right;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="text-align: left; font-size: 14px; color: rgb(102, 102, 102);">
              共 {{ totalOrders }} 条 | 第 {{ currentPage }} 页
            </div>
            <div style="display: flex; gap: 5px; align-items: center;">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                style="background-color: rgb(255, 255, 255); border: 1px solid rgb(213, 213, 213); border-radius: 2px; cursor: pointer; height: 32px; line-height: 32px; padding: 0 10px; text-align: center; transition: 0.3s; user-select: none; disabled:opacity: 0.5; disabled:cursor: not-allowed;"
              >
                上一页
              </button>
              <div style="display: flex; gap: 3px;">
                <button
                  v-for="page in paginationRange"
                  :key="page"
                  @click="goToPage(page)"
                  :class="currentPage === page ? 'active-page' : 'normal-page'"
                  style="background-color: currentPage === page ? 'rgb(203, 38, 28)' : 'rgb(255, 255, 255)'; border: 1px solid rgb(213, 213, 213); border-radius: 2px; color: currentPage === page ? 'rgb(255, 255, 255)' : 'rgb(51, 51, 51)'; cursor: pointer; height: 32px; line-height: 32px; padding: 0 10px; text-align: center; transition: 0.3s; user-select: none;"
                >
                  {{ page }}
                </button>
              </div>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                style="background-color: rgb(255, 255, 255); border: 1px solid rgb(213, 213, 213); border-radius: 2px; cursor: pointer; height: 32px; line-height: 32px; padding: 0 10px; text-align: center; transition: 0.3s; user-select: none; disabled:opacity: 0.5; disabled:cursor: not-allowed;"
              >
                下一页
              </button>
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
const pageSize = ref(10)
const startTime = ref('')
const endTime = ref('')
const paidStartTime = ref('')
const paidEndTime = ref('')
const searchType = ref('0')
const searchKeyword = ref('')
const selectedRegion = ref('')

const exceptionOrders = [
  {
    id: 1,
    productName: '蓝牙耳机无线充电',
    price: 32.50,
    quantity: 2,
    totalAmount: 65.00,
    status: '待处理',
    exceptionReason: '库存不足',
    handlingOpinion: '补货中',
    orderDate: new Date('2025-10-15'),
    paidDate: new Date('2025-10-15'),
    region: 'US',
    orderNo: 'ORD20251015001'
  },
  {
    id: 2,
    productName: '户外LED手电筒',
    price: 18.99,
    quantity: 1,
    totalAmount: 18.99,
    status: '处理中',
    exceptionReason: '地址错误',
    handlingOpinion: '联系客户确认',
    orderDate: new Date('2025-10-14'),
    paidDate: new Date('2025-10-14'),
    region: 'UK',
    orderNo: 'ORD20251014002'
  },
  {
    id: 3,
    productName: '防水运动手表',
    price: 45.00,
    quantity: 1,
    totalAmount: 45.00,
    status: '已解决',
    exceptionReason: '支付失败',
    handlingOpinion: '已重新支付',
    orderDate: new Date('2025-10-13'),
    paidDate: new Date('2025-10-13'),
    region: 'CA',
    orderNo: 'ORD20251013003'
  },
  {
    id: 4,
    productName: '智能家居控制器',
    price: 62.75,
    quantity: 1,
    totalAmount: 62.75,
    status: '待处理',
    exceptionReason: '收件人信息不完整',
    handlingOpinion: '待处理',
    orderDate: new Date('2025-10-12'),
    paidDate: new Date('2025-10-12'),
    region: 'DE',
    orderNo: 'ORD20251012004'
  },
  {
    id: 5,
    productName: '充电宝20000mAh',
    price: 24.50,
    quantity: 3,
    totalAmount: 73.50,
    status: '处理中',
    exceptionReason: '无法联系客户',
    handlingOpinion: '重新发送通知',
    orderDate: new Date('2025-10-11'),
    paidDate: new Date('2025-10-11'),
    region: 'FR',
    orderNo: 'ORD20251011005'
  },
  {
    id: 6,
    productName: '手机壳保护套',
    price: 8.99,
    quantity: 5,
    totalAmount: 44.95,
    status: '已解决',
    exceptionReason: '配送错误',
    handlingOpinion: '已换货发送',
    orderDate: new Date('2025-10-10'),
    paidDate: new Date('2025-10-10'),
    region: 'ES',
    orderNo: 'ORD20251010006'
  },
  {
    id: 7,
    productName: '自拍杆三脚架',
    price: 15.80,
    quantity: 2,
    totalAmount: 31.60,
    status: '待处理',
    exceptionReason: '商品损坏',
    handlingOpinion: '申请赔偿',
    orderDate: new Date('2025-10-09'),
    paidDate: new Date('2025-10-09'),
    region: 'RU',
    orderNo: 'ORD20251009007'
  },
  {
    id: 8,
    productName: '蓝牙音箱便携式',
    price: 38.00,
    quantity: 1,
    totalAmount: 38.00,
    status: '已解决',
    exceptionReason: '退货处理',
    handlingOpinion: '已退款',
    orderDate: new Date('2025-10-08'),
    paidDate: new Date('2025-10-08'),
    region: 'US',
    orderNo: 'ORD20251008008'
  },
  {
    id: 9,
    productName: '显示器支架调节',
    price: 29.99,
    quantity: 1,
    totalAmount: 29.99,
    status: '处理中',
    exceptionReason: '发票信息错误',
    handlingOpinion: '重新发送发票',
    orderDate: new Date('2025-10-07'),
    paidDate: new Date('2025-10-07'),
    region: 'UK',
    orderNo: 'ORD20251007009'
  },
  {
    id: 10,
    productName: '键盘鼠标套装',
    price: 35.50,
    quantity: 1,
    totalAmount: 35.50,
    status: '待处理',
    exceptionReason: '物流延迟',
    handlingOpinion: '跟进物流',
    orderDate: new Date('2025-10-06'),
    paidDate: new Date('2025-10-06'),
    region: 'CA',
    orderNo: 'ORD20251006010'
  },
  {
    id: 11,
    productName: '手机壳防摔',
    price: 12.00,
    quantity: 2,
    totalAmount: 24.00,
    status: '已解决',
    exceptionReason: '清关问题',
    handlingOpinion: '已清关发出',
    orderDate: new Date('2025-10-05'),
    paidDate: new Date('2025-10-05'),
    region: 'DE',
    orderNo: 'ORD20251005011'
  },
  {
    id: 12,
    productName: '保温杯不锈钢',
    price: 28.50,
    quantity: 1,
    totalAmount: 28.50,
    status: '处理中',
    exceptionReason: '订单信息错误',
    handlingOpinion: '确认后重新处理',
    orderDate: new Date('2025-10-04'),
    paidDate: new Date('2025-10-04'),
    region: 'FR',
    orderNo: 'ORD20251004012'
  }
]

const filteredOrders = computed(() => {
  let result = exceptionOrders

  if (startTime.value) {
    const start = new Date(startTime.value)
    result = result.filter(o => o.orderDate >= start)
  }

  if (endTime.value) {
    const end = new Date(endTime.value)
    end.setHours(23, 59, 59, 999)
    result = result.filter(o => o.orderDate <= end)
  }

  if (paidStartTime.value) {
    const start = new Date(paidStartTime.value)
    result = result.filter(o => o.paidDate >= start)
  }

  if (paidEndTime.value) {
    const end = new Date(paidEndTime.value)
    end.setHours(23, 59, 59, 999)
    result = result.filter(o => o.paidDate <= end)
  }

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(o =>
      o.orderNo.toLowerCase().includes(keyword) ||
      o.productName.toLowerCase().includes(keyword)
    )
  }

  if (selectedRegion.value) {
    result = result.filter(o => o.region === selectedRegion.value)
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

const getStatusClass = (status) => {
  switch (status) {
    case '已解决':
      return 'px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium'
    case '处理中':
      return 'px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium'
    case '待处理':
      return 'px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium'
    default:
      return 'px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium'
  }
}

const searchOrders = () => {
  currentPage.value = 1
}

const editOrder = (id) => {
  console.log('处理订单:', id)
}

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
</script>

<style scoped>
.px-2 {
  padding-left: 8px;
  padding-right: 8px;
}

.py-1 {
  padding-top: 4px;
  padding-bottom: 4px;
}

.bg-green-100 {
  background-color: rgb(220, 252, 231);
}

.text-green-800 {
  color: rgb(22, 163, 74);
}

.bg-blue-100 {
  background-color: rgb(219, 234, 254);
}

.text-blue-800 {
  color: rgb(30, 58, 138);
}

.bg-yellow-100 {
  background-color: rgb(254, 243, 199);
}

.text-yellow-800 {
  color: rgb(113, 63, 18);
}

.bg-gray-100 {
  background-color: rgb(243, 244, 246);
}

.text-gray-800 {
  color: rgb(31, 41, 55);
}

.rounded {
  border-radius: 4px;
}

.text-xs {
  font-size: 12px;
}

.font-medium {
  font-weight: 500;
}
</style>
