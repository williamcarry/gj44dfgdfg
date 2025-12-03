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
  notificationId: {
    type: Number,
    required: true
  },
  onBack: {
    type: Function,
    required: false
  }
})

const allNotifications = {
  1: {
    id: 1,
    title: '退货申请已受理',
    content: `尊敬的分销商，

您的退货申请已受理，请注意以下事项：

申请号：RS2025101001
退货原因：产品质量问题
申请时间：2025-10-15 10:30:00

退货须知：
1. 请在7天内将商品寄回，逾期将不再受理
2. 商品应保持原装状态，包装完整
3. 请妥善保管快递单号，用于物流追踪
4. 寄回地址：赛盈物流中心，地址电话已发送至您的邮箱

我们会在收到商品后进行质检，质检通过后会在3个工作日内处理退款。`,
    date: new Date('2025-10-15')
  },
  2: {
    id: 2,
    title: '退货商品已签收',
    content: `尊敬的分销商，

我们已签收您的退货商品，感谢您的配合。

申请号：RS2025101002
签收时间：2025-10-14 15:45:00
商品编号：SKU123456

质检状态：
目前正在进行仔细质检，预计3个工作日内完成。质检报告将邮件通知您。

请耐心等待，如有任何疑问，欢迎联系我们的客服团队。`,
    date: new Date('2025-10-14')
  },
  3: {
    id: 3,
    title: '退款已处理',
    content: `尊敬的分销商，

您的退款已处理完毕，请查收。

申请号：RS2025101003
退款金额：$500.00
处理时间：2025-10-13 14:20:00
退款方式：原路返回

退款预计在3-5个工作日内到达您的账户。如长时间未收到，请联系您的银行或支付机构确认。`,
    date: new Date('2025-10-13')
  },
  4: {
    id: 4,
    title: '售后服务提醒',
    content: `尊敬的分销商，

您有一个待处理的售后问题，请及时与我们联系。

申请号：AF2025101004
问题描述：产品存在故障
创建时间：2025-10-12 09:30:00
状态：待处理

我们的客服团队随时准备为您服务，请拨打客服热线或在线客服与我们联系，以便尽快解决您的问题。`,
    date: new Date('2025-10-12')
  },
  5: {
    id: 5,
    title: '换货申请已批准',
    content: `尊敬的分销商，

恭喜！您的换货申请已批准，新产品已在仓库备货。

申请号：EX2025101005
原产品：SKU123456
新产品：SKU789012
批准时间：2025-10-11 11:00:00

新产品将在2个工作日内发货，请保持电话畅通以便接收物流信息。发货后我们会立即通知您。`,
    date: new Date('2025-10-11')
  },
  6: {
    id: 6,
    title: '售后服务完成',
    content: `尊敬的分销商，

您的售后服务已成功完成，感谢您的耐心配合。

申请号：AF2025101006
服务类型：维修
完成时间：2025-10-10 16:30:00
服务结果：良好

如果您对我们的服务有任何意见或建议，欢迎随时反馈。您的建议对我们改进服务质量非常重要。`,
    date: new Date('2025-10-10')
  },
  7: {
    id: 7,
    title: '发起维修申请',
    content: `尊敬的分销商，

您的维修申请已提交成功，我们将尽快为您服务。

申请号：RE2025101007
问题描述：产品无法正常工作
提交时间：2025-10-09 10:15:00
维修方式：上门服务

我们的技术团队将在24小时内与您联系，预约上门维修时间。请保持电话畅通，谢谢。`,
    date: new Date('2025-10-09')
  },
  8: {
    id: 8,
    title: '售后物流已发货',
    content: `尊敬的分销商，

您的售后物流已发货，请及时接收。

申请号：AF2025101008
物流单号：SF123456
物流公司：顺丰速运
发货时间：2025-10-08 10:30:00
预计送达：2个工作日

请妥善签收，如有任何问题，请立即与我们联系。感谢您的配合！`,
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