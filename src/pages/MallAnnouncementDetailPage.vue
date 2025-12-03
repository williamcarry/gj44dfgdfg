<!--
CSS 引用说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> ���提供
-->
<template>
  <div class="bg-white rounded-lg border border-slate-200 overflow-hidden">
    <div class="p-6 md:p-8">
      <!-- 标题和日期区域 -->
      <div class="border-b border-slate-200 pb-6 mb-8">
        <h1 class="text-2xl font-bold text-slate-900 text-center mb-4">{{ announcement.title }}</h1>
        <p class="text-center text-slate-500">{{ formatDate(announcement.date) }}</p>
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
        <p class="text-slate-600">{{ formatDate(announcement.date) }}</p>
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
  announcementId: Number,
  onBack: Function
})

// 全部公告数据
const allAnnouncements = {
  397: {
    id: 397,
    title: '关于赛盈分销平台新增发货物流的通知',
    content: `尊敬的分销商们：

    为进一步优化平台物流服务，提升小件商品的发货时效与成本优势，平台现已正式上线【EconomySmallParcelShipping】发货物流。

一、物流说明

    适用销售平台范围：eBay、Amazon、Shopify、Walmart、Shein、TikTok；

    物流限制：由于其他销售平台暂不支持该物流渠道，若在非上述平台下单选择该渠道，平台将提示报错无法下单；

    适用仓库类型：SY平台仓；

二、温馨提示

    请各位分销商在刊登商品及选择发货物流时，需注意平台支持范围，以免影响订单利润和发货进度。

    平台将持续拓展更多优质物流渠道，满足多平台发货需求。

    赛盈将竭尽所能为合作伙伴提供更优质的服务，感谢您一直以来对赛盈信任与支持。如有疑问，请联系平台客服或专���商务经理。`,
    date: new Date('2025-10-14')
  },
  396: {
    id: 396,
    title: '2025年关于赛盈分销平台国庆节放假通知',
    content: `尊敬的分销商：

    你们好！

    根据国家法定节假日的安排，赛盈平台工作人员于2025年10月1日——2025年10月8日安排放假8天。

    假期期间，各位分销商在赛盈平台可继续下单，平台会正常安排发货。若有发生订单售中、售后问题，请您在平台统一进行申诉。赛盈平台将会安排相关值班人员每日进行申诉订单跟进处理，请您自行安排好相关事宜。如有疑问，请及时联系您的业务经理咨询处理；

    衷心感谢您对赛盈平台工作的支持、体谅及宽容。

    在此祝各位分销商国庆节快乐，生意兴隆，顺祝商祺！`,
    date: new Date('2025-09-28')
  },
  395: {
    id: 395,
    title: '���盈 × Lian Lian Global 联合官宣：首3月手续费五折，即刻开启！',
    content: `尊敬的客户：

    您好！为助力赛盈平台用户降本增效，无忧出海，赛盈分销平台联合连连国际支付推出支付手续费五折活动，低至0.15%，在2025年9月15日-2025年12月15日期间，在收银台选择"连连国际支付"支付订单，即可享受五折支付手��费的优惠。

一、活动对象：赛盈分销平台分销商用户

二、支付场景：目前连连国际账户支付支持订单支付，可直接用于支付赛盈平台订单，暂不支持账户余额充值功能，后续我们将根据客户需求逐步拓展更多使用场景。

三、多币种支持：充分覆盖主流跨境贸易币种，现阶段可支持美元（USD）、欧元（EUR）、英镑（GBP）及加元（CAD）订单支付，无需频繁兑换币种，提升支付效率。

四、退款规则：订单退款资金将原路退回至您的连连国际账户，退款流程透明、高效。

五、线下汇款：通过线下汇款方式打款至我司连连国际账户，根据相关监管要求及业务规范，可能需要提供交易相关证明材料（如订单合同、采购凭证等），具体材料清单可咨询平台客服或连连国际官方服务通道。

六、��与方式：如果您已有连连国际账户，可在平台收银台选择"LianLianGlobal"方式，按照页面指引一键登录LianLian账户进行订单支付操作，无需在平台绑定账号。如尚未注册，可点击链接开通账户，立享超低费率跨境支付服务！

若您在使用过程中遇到任何问题，请联系您的业务经理咨询。

新支付方式的上线，是我们持续优化服务的重要一步。未来，我们将继续不��丰富支付场景、提升服务品质，感谢您一直以来对赛盈信任与支持。`,
    date: new Date('2025-09-15')
  },
  394: {
    id: 394,
    title: '关于赛盈分销平台变更网站域名的通知',
    content: `尊敬的客户：

    您好！为了提升平台业务服务能力，赛盈分销平台将于2025年7月30日19：00起正式由原域名www.saleyee.cn迁移到新域名www.saleyee.com。

    原域名（www.saleyee.cn）将作为企业官网，仅展示公司介绍、服务内容等信息，不再支持业务操作。

注意事项：

1.API接口：请API对接的客户于7月30日后进行接口文件的更新；（由api.saleyee.cn变更为api.saleyee.com)

2.图片调用：若独立站客户使用平台链接图片，请同步完成链接更新；

3.无感切换：您的平台账号密码、订��数据、资金余额等100%同步迁移；

4.页面重定向：原域名相关的业务链接会自动重定向至新域名对应页面；（除saleyee.cn以外）

    因域名迁移，给您带来不便，敬请见谅。感谢您的支持、理解与配合。

    若您有任何疑问请联系您的业务经理咨询，感谢您一直以来对赛盈信任与支持，谢谢。

    特此公告！`,
    date: new Date('2025-07-28')
  },
  393: {
    id: 393,
    title: '关于赛盈分销平台开放加拿大市场的通知',
    content: `尊敬的分销商伙伴：

    你们好！

    为了助力您开拓更广阔的市场，拓展更多的分销商品选择，我们非常高兴的通知您，赛盈分销平台正式开放加拿大市场的分销业务。以下是关于加拿大市场核心业务说明：

1.商品资源：登录平台点击链接即可查看赛盈加拿大仓专区海量在售商品，热门品类应有尽有。

2.市场覆盖：加拿大仓专区商品仅面向加拿大市场分销，精准定位，助您深耕区域商机。

3.物流时效：订单生成后，海外仓48小时内(工作日）发货，极速配送保障客户体验。

4.多元支付：支持AirwalletPay、微信支付、支付宝支付、银行转账,灵活便捷，交易无忧。

诚邀各位伙伴与我们携手，把握加拿大市场机遇，开启跨境电商新征程！如有业务疑问或需求，可随时联系您的业务经理。期待与您在加拿大市场并肩作战，共创佳绩！`,
    date: new Date('2025-05-13')
  },
  392: {
    id: 392,
    title: '关于美国仓部分产品退货地址更新的通知',
    content: `尊敬的分销商：

    你们好！

    赛盈��国区部分商品的原退货地址"703Bartley-ChesterRd, Flanders,NJ,07836"将停止使用，更新为下述退货地址，请及时下载最新的数据包查看商品的退货地址。

街道地址1：1170Florence,ColumbusRd
街道地址2：Gate(102-125)
城市：Fieldsboro
省：NJ(NewJersey)
邮编：08505

    自2025年5月16日零点开始，退回至原地址的退件，海外仓将不再处理，请分销商尽快更新销售平台设置的退货地址。

    赛盈将竭尽所能为合作伙伴提供更优质的服务，感谢您一直以来对赛盈的信任和支持。`,
    date: new Date('2025-05-09')
  }
}

const announcement = computed(() => {
  return allAnnouncements[props.announcementId] || allAnnouncements[397]
})

const contentLines = computed(() => {
  return announcement.value.content
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
