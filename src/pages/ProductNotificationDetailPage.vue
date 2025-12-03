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
  <div class="bg-white rounded-lg border border-slate-200 p-8">
    <!-- 返回按钮 -->
    <button
      @click="$emit('back')"
      class="flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition mb-6"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      返回列表
    </button>

    <!-- 通知标题 -->
    <h1 class="text-2xl font-bold text-slate-900 mb-4">{{ notification.title }}</h1>

    <!-- 发布时间 -->
    <div class="flex items-center gap-4 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-200">
      <span>发布时间：{{ formatDate(notification.date) }}</span>
    </div>

    <!-- 通知内容 -->
    <div class="prose prose-slate max-w-none">
      <div class="text-slate-700 leading-relaxed whitespace-pre-line">
        {{ notification.content }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  notificationId: Number
})

defineEmits([
  'back'
])

// 模拟通知数据
const notifications = [
  {
    id: 101,
    title: '关于部分商���库存调整的通知',
    content: `尊敬的分销商：

��好！

因供应商库存调整，部分热销商品的库存数量将在近期进行更新。

一、调整说明
1. 涉及商品：主要为家居装饰类和厨房用品类商品
2. 调整时间：2025年10月20日起生效
3. 库存变化：部分SKU库存将增加20%-50%

二、注意事项
1. 请及时关注商品库存变化，合理安排您的销售计划
2. 建议提前备货以应对可能的销售高峰
3. 库存数据将在平台实时更新

三、后续支持
如有任何疑问，请联系您的专属客户经理或通过以下方式联系我们：
- 客服邮箱：support@saleyee.com
- 客服电话：400-xxx-xxxx

感谢您的理解与支持！

赛盈分销平台
2025年10月18日`,
    date: new Date('2025-10-18')
  },
  {
    id: 102,
    title: '新品上架通知 - 2025秋季家居系列',
    content: `尊敬的分销商：

您好！

平台已上架2025秋季家居装饰系列新品，欢迎选购！

一、新品介绍
1. 北欧风格装饰画系列（20款）
2. 现代简约花架系列（15款）
3. 创意壁挂装饰系列（18款）
4. 手工编织收纳系列（12款）

二、产品特点
1. 设计新颖，紧跟市场潮流
2. 质量优良，性价比高
3. 库存充足，发货���时
4. 包装精美，适合礼品销售

三、促销活动
新���上架期间（10月15日-10月31日），享受以下优惠：
- 首次采购满500美元，立减50美元
- 批量采购（50件以上），额外享受5%折扣

欢迎登录平台查看详情并进行选品！

赛盈分销平台
2025年10月15日`,
    date: new Date('2025-10-15')
  },
  {
    id: 103,
    title: '商品价格调整通知 - 部分SKU降价促销',
    content: `尊敬的分销商：

您好！

为回馈广大分销商的支持，平台将对部分SKU进行降价促销。

一、促销详情
1. 促销时间：2025年10月12日-2025年11月12日
2. 涉及品类：家居装饰、厨房用品、园艺工具
3. 降价幅度：5%-15%不等

二、热门降价商品
1. ���叶鸟笼装饰挂件：原价USD 30.99，现价USD 28.87（降6%）
2. 北欧风格木质花架：原价USD 99.99，现价USD 89.50（降10%）
3. 创意金属壁挂装饰：原价USD 65.00，现价USD 56.80（降12%）

三、温馨提示
1. 请及时更新您的销售价格以获取更多订单
2. 促销期间库存有限，建议尽快下单
3. 价格调整后，平台将不再接受原价订单的退换货申请

感谢您的支持与配合！

赛盈分销平台
2025年10月12日`,
    date: new Date('2025-10-12')
  }
]

const notification = computed(() => {
  return notifications.find(n => n.id === props.notificationId) || notifications[0]
})

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日`
}
</script>

<style scoped></style>
