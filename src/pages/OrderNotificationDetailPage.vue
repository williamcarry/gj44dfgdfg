<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. ���面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <div class="p-6 md:p-8">
      <!-- 标题和日期区域 -->
      <div class="border-b border-slate-200 pb-6 mb-8">
        <h1 class="text-2xl font-bold text-slate-900 text-center mb-4">{{ notification.title }}</h1>
        <p class="text-center text-slate-500">{{ formatDate(notification.date) }}</p>
      </div>

      <!-- 内容区域 -->
      <div class="prose prose-sm max-w-none mb-8">
        <div class="text-slate-700 leading-relaxed">
          <p v-for="(line, index) in contentLines" :key="index" class="mb-4 text-base">
            {{ line }}
          </p>
        </div>
      </div>

      <!-- 署名 -->
      <div class="text-right space-y-2">
        <p class="text-slate-700 font-medium">赛盈分销平台</p>
        <p class="text-slate-600">{{ formatDate(notification.date) }}</p>
      </div>

      <!-- 返回按钮 -->
      <div class="flex justify-center mt-12">
        <button
          @click="goBack"
          class="px-8 py-2 border border-slate-400 text-slate-500 rounded hover:bg-slate-50 transition font-medium"
        >
          返回
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  notificationId: Number,
  onBack: Function
})

const allNotifications = {
  1: {
    id: 1,
    title: '订单已发货，物流信息已更新',
    content: `尊敬的分销商，

您的订单已发货，物流信息已更新。

订单号：2025101001
物流公司：FedEx
物流单号：FEDEX123456
预计送达时间：3-5个工作日

请妥善保管订单信息，如有任何疑问，请及时与我们联系。感谢您的购买！`,
    date: new Date('2025-10-15')
  },
  2: {
    id: 2,
    title: '订单确认成功',
    content: `尊敬的分销商，

感谢您的下单，您的订单已确认成功。

订单号：2025101002
订单金额：$1,500.00
下单时间：2025-10-14 10:30:00

供应商将在24小��内安排发货，请耐心等待。您可以在订单详情页面查看最新的订单状态和物流信息。`,
    date: new Date('2025-10-14')
  },
  3: {
    id: 3,
    title: '订单待发货提醒',
    content: `尊敬的分销商，

您��一个待发货订单，请及时处理。

订单号：2025101003
订单金额：$2,000.00
下单时间：2025-10-13 14:20:00

请��快完成发货，以确保订单及时送达客户。如有任何问题，请联系客服团队。`,
    date: new Date('2025-10-13')
  },
  4: {
    id: 4,
    title: '订单已签收',
    content: `尊敬的分销商，

恭喜！您的订单已被客户签收。

订单号：2025101004
签收时间：2025-10-12 15:45:00

感谢您的信任与支持。如果客户对产品有任何问题或建议，欢迎与我们沟通。`,
    date: new Date('2025-10-12')
  },
  5: {
    id: 5,
    title: '订单已取消',
    content: `尊敬的分销商，

您的订单已被取消，退款已处理。

订单号：2025101005
订单金额：$1,200.00
退款方式：原路返回

退款将在3-5个工作日内到达您的账户。如有任何疑问，请及时联系我们。`,
    date: new Date('2025-10-11')
  },
  6: {
    id: 6,
    title: '订单配送中',
    content: `尊敬的分销商，

您的��单正在配送中，预计今天送达。

订单号：2025101006
物流单号：SFEX654321
当前位置：正在配送

请保持电话畅通，配送员会在送达前与您联系。感谢您的耐心等待！`,
    date: new Date('2025-10-10')
  },
  7: {
    id: 7,
    title: '订单即将发货',
    content: `尊敬的分销商，

您的订单已备货完成，即将发��。

订单号：2025101007
预计发货时间：24小时内
发货方式：Express

请耐心等待，我们会在发货后立即通知您，并提供物流追踪信息。`,
    date: new Date('2025-10-09')
  },
  8: {
    id: 8,
    title: '订单异常提醒',
    content: `尊敬的分销商，

您的订单配送过程中出现异常情况，物流商正在处理。

订单号：2025101008
异常原因：地址错误，正在重新核实
处理状态：处理中

我们的客服团队已接入此订单，正在积极解决问题。如需帮助，请随时联系我们。`,
    date: new Date('2025-10-08')
  }
}

const notification = computed(() => {
  return allNotifications[props.notificationId] || allNotifications[1]
})

const contentLines = computed(() => {
  return notification.value.content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
})

const goBack = () => {
  if (props.onBack) {
    props.onBack()
  }
}

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}/${month}/${day}`
}
</script>

<style scoped></style>
