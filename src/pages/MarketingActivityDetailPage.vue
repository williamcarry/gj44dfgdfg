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
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <div class="p-8">
      <!-- 标题和日期 -->
      <div class="border-b border-slate-200 pb-6 mb-8">
        <h1 class="text-2xl font-bold text-slate-900 text-center mb-4">{{ activity.title }}</h1>
        <p class="text-center text-slate-500 text-sm">{{ activity.date }}</p>
      </div>

      <!-- 内容区域 -->
      <div class="prose prose-sm max-w-none mb-8 text-slate-700 leading-relaxed">
        <!-- 动态内容渲染 -->
        <div v-if="activity.id === 1">
          <!-- 圣诞早鸟专场活动 -->
          <p class="mb-4"><strong>尊敬的赛盈分销商伙伴</strong>，</p>

          <p class="mb-4">
            ��诞季的钟声即将敲响，全年最大的销售机遇近在眼前！为助您抢占先机，我们正式启动圣诞早鸟专场促销，立即布局圣诞热销商品，提前锁定节日消费需求！
          </p>

          <p class="mb-4">
            <strong>活动时间：</strong>2025年10月13日-11月13日
          </p>

          <h3 class="text-lg font-semibold text-slate-900 mb-4">活动特惠：</h3>
          <p class="mb-4">
            1. <strong>价格优势：</strong>享限时高达30%的采购价折扣，以优势价格提升利润空间；
          </p>
          <p class="mb-4">
            2. <strong>平台精选圣诞热销品类：</strong>
          </p>
          <p class="ml-4 mb-4">圣诞装饰 - 圣诞树、圣诞充气装饰、挂饰、花环等；</p>
          <p class="ml-4 mb-4">灯串灯具 - LED灯串、户外装饰灯</p>

          <h3 class="text-lg font-semibold text-slate-900 mb-4">参与方式：</h3>
          <ol class="list-decimal ml-6 mb-4 space-y-2">
            <li>
              登录您的赛盈卖家账号，进入活动页面
              <a href="#" class="text-primary hover:text-primary">
                https://www.saleyee.com/subject/christmas-advance-sale.html
              </a>
            </li>
            <li>下单时享受即时折扣，自动应用特惠采购价格。</li>
          </ol>

          <p class="mb-4">若您有任何疑问或需要进一步的信息，请随时与您的客户经理联系。</p>
          <p class="mb-6">预祝您圣诞大卖，收获满满！</p>

          <!-- 宣传图片 -->
          <div class="my-8">
            <img
              src="https://resource.saleyee.com/Content/Images/asset/%E5%9C%A3%E8%AF%9E%E9%87%87%E8%B4%AD%E5%AD%A3_1270x480.jpg?v=2091658909"
              alt="圣诞早鸟专场"
              class="w-full rounded"
            />
          </div>
        </div>

        <!-- 通用内容模板 -->
        <template v-else>
          <p v-for="(line, index) in activity.contentLines" :key="index" class="mb-4">
            {{ line }}
          </p>
        </template>
      </div>

      <!-- 附件下载 -->
      <div v-if="activity.attachment" class="font-semibold text-slate-900 mb-8">
        <p class="mb-2">
          <strong>附件下载：</strong>
          <a href="#" class="text-primary hover:text-primary ml-2">{{ activity.attachment }}</a>
        </p>
      </div>

      <!-- 返回按钮 -->
      <div class="flex justify-center">
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
  activityId: Number,
  onBack: Function
})

const allActivities = {
  1: {
    id: 1,
    title: '圣诞早鸟专场启动：热度来袭，赢战Q4旺季！',
    date: '2025/10/10 15:24:25',
    attachment: '圣诞早鸟专场-产品表'
  },
  2: {
    id: 2,
    title: '【Q4丰收季】 主题活动来袭！精准选品，吹响旺季的号角！',
    content: `尊敬的赛盈分销商伙伴，

您好！跨境旺季的号角即将吹响，为助您精准备货、抢占Q4全年销售峰值，平台重磅启动【Q4丰收季】 主题促销活动，现诚挚邀请您参与！

活动时间：2025年10月1日-10月31日

活动特惠：
1.价格优势：平台联合核心供应商让利，采购价至高直降50%，利润空间显著提升！
2.聚焦爆品：首批发力室内家具、工具、万圣节装饰三大热搜品类，均是跨境平台搜索热度正急速攀升的焦点。

参与方式：
登录您的卖家账号，进入活动页面 https://www.saleyee.com/subject/q4-harvest-season-hot-picks-ready.html
下单时享受即时折扣，自动应用特惠采购价格。

若您有任何疑问或需要进一步的信息，请随时与您���客户经理联系。顺祝商祺！`,
    date: '2025/9/29 14:22:42',
    attachment: 'Q4必选清单专场(丰收节特惠)--产品表'
  },
  3: {
    id: 3,
    title: '采购券到账通知',
    content: `尊敬的赛盈用户您好：

您有 1 张【USD1.00】采购券已到账，有效期到 2025/11/26。请查收！

采购券编号：CND2509282050360793307

感谢您对赛盈平台的支持。`,
    date: '2025/9/28 20:52:14'
  },
  4: {
    id: 4,
    title: '新品上市：2025秋季热销商品推介会',
    content: `尊敬的分销商伙伴，

秋季商品已上市，为您精心挑选了本季度最受欢迎的热销商品，现推介给各位伙伴。快来查看并选购吧！

本季度新品涵盖多个热销品类，包括：
- 秋季服饰配饰
- 家居装饰用品
- 季节性家电
- 户外运动装备

所有新品均经过严格的质量审核，确保品质无忧。欢迎各位伙伴踊跃采购！

如有任何疑问，请联系您的业务经理。`,
    date: '2025/9/25 10:30:00',
    attachment: '2025秋季新品清单'
  }
}

const activity = computed(() => {
  const act = allActivities[props.activityId] || allActivities[1]
  if (act.content && !act.contentLines) {
    act.contentLines = act.content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
  }
  return act
})

const goBack = () => {
  if (props.onBack) {
    props.onBack()
  }
}
</script>

<style scoped></style>
