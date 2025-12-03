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
    <div class="h-[50px] pt-[10px] relative">
      <h6 class="text-[16px] font-bold leading-[40px] text-slate-900 float-left">我的余额</h6>
    </div>

    <div class="notice">
      <div class="notice-icon"><i class="layui-icon">!</i></div>
      <div class="notice-text">
        <p>
          如何充值？
          <a target="_blank" href="https://www.saleyee.com/guide/hp681547.html">点击了解详情</a>
          <br />为了保障资金安全，请注意，赛盈线下账户仅接受来自银行、Payoneer和Airwallex的汇款。
          <br />请注意：赛盈平台不接受支票、本票、汇票存款。
        </p>
      </div>
      <div class="clear"></div>
    </div>

    <div class="currency-wrap">
      <div v-for="c in currencies" :key="c.code" class="currency-card">
        <h4 class="currency-title">{{ c.code }}</h4>
        <div class="actions">
          <div class="action-tip">
            <p>【线上充值、线下汇款】入口已合并，从这里进入</p>
            <a href="javascript:;" class="next">下一步</a>
          </div>
          <a :href="c.rechargeUrl" class="btn btn-outline">
            <i class="icon-recharge"></i>
            充值
          </a>
          <div class="inline-form">
            <div class="inline-form-inner">
              <div class="inline-form-row">
                <form action="/user/asset.html" method="post" target="_blank" novalidate>
                  <input name="__RequestVerificationToken" type="hidden" value="" />
                  <input value="" name="AccountId" type="hidden" />
                  <b>{{ c.amountLabel }}</b>
                  <input name="Money" type="text" value="" class="amount-input" />
                </form>
              </div>
              <p class="form-msg"></p>
            </div>
            <a name="0" href="javascript:;" class="btn btn-primary small">确定</a>
          </div>
          <a :href="c.withdrawUrl" class="btn btn-outline">
            <i class="icon-withdraw"></i>
            提现
          </a>
          <a :href="c.accountUrl" class="btn btn-outline">
            <i class="icon-account"></i>
            查看账户
          </a>
        </div>
        <div class="summary">
          <ul>
            <li>
              <div>
                <span>账户总额</span>
                <p class="sum">0.00</p>
              </div>
            </li>
            <li class="op">=</li>
            <li>
              <div>
                <span>可用余额</span>
                <p class="sum">0.00</p>
              </div>
            </li>
            <li class="op">+</li>
            <li>
              <div>
                <span>冻结金额</span>
                <p class="sum">0.00</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currencies = ref([
  {
    code: 'USD',
    rechargeUrl: 'https://www.saleyee.com/payment/rechargeorremit/573299.html',
    withdrawUrl: 'https://www.saleyee.com/user/asset/customercash/573299.html',
    accountUrl: 'https://www.saleyee.com/user/asset/accountDetail/573299.html',
    amountLabel: '金额 ($ )：',
  },
  {
    code: 'GBP',
    rechargeUrl: 'https://www.saleyee.com/payment/rechargeorremit/573300.html',
    withdrawUrl: 'https://www.saleyee.com/user/asset/customercash/573300.html',
    accountUrl: 'https://www.saleyee.com/user/asset/accountDetail/573300.html',
    amountLabel: '金额 (£ )：',
  },
  {
    code: 'EUR',
    rechargeUrl: 'https://www.saleyee.com/payment/rechargeorremit/573301.html',
    withdrawUrl: 'https://www.saleyee.com/user/asset/customercash/573301.html',
    accountUrl: 'https://www.saleyee.com/user/asset/accountDetail/573301.html',
    amountLabel: '金额 (€)：',
  },
  {
    code: 'CAD',
    rechargeUrl: 'https://www.saleyee.com/payment/rechargeorremit/573302.html',
    withdrawUrl: 'https://www.saleyee.com/user/asset/customercash/573302.html',
    accountUrl: 'https://www.saleyee.com/user/asset/accountDetail/573302.html',
    amountLabel: '金额 (C$)：',
  },
])
</script>

<style scoped>
.notice { background-color:#fcf8e3; border:1px solid #faebcc; border-radius:3px; display:flex; margin:10px 0; padding:10px; }
.notice-icon{ width:17px; }
.notice-icon .layui-icon{ color:#a77200; font-size:18px; line-height:24px; }
.notice-text{ margin-left:8px; width:calc(100% - 26px); color:#a77200; }
.notice-text a{ color:#CB261C; transition:.3s; }
.clear{ clear:both; }

.currency-wrap{ margin:20px auto; padding:0 0; display:grid; grid-template-columns:1fr; gap:20px; }
.currency-card{ padding:0 90px; }
.currency-title{ font-size:24px; color:#333; float:left; line-height:32px; }
.actions{ position:relative; text-align:right; }
.action-tip{ display:none; position:absolute; right:100px; bottom:40px; width:200px; background:#CB261C; color:#fff; padding:16px 10px; border-radius:4px; z-index:998; text-align:right; }
.action-tip .next{ display:inline-block; background:#fff; color:#CB261C; border:1px solid #ddd; border-radius:3px; line-height:34px; padding:0 10px; margin-top:16px; }
.btn{ display:inline-block; min-width:90px; line-height:30px; padding:0 10px; border:1px solid #ddd; border-radius:5px; color:#667f87; transition:.3s; }
.btn-primary{ background:#CB261C; color:#fff; border-color:#ddd; line-height:36px; padding:0 30px; }
.btn.small{ height:36px; line-height:36px; margin-right:45px; float:right; }
.icon-recharge,.icon-withdraw,.icon-account{ display:inline-block; width:20px; height:20px; vertical-align:middle; margin-right:10px; margin-top:-3px; background-repeat:no-repeat; background-position:50% 50%; }
.icon-recharge{ background-image:url('https://www.saleyee.com/static/imgs/6c9b070b0a1510054dcaa882f4bbcc67.png'); }
.icon-withdraw{ background-image:url('https://www.saleyee.com/static/imgs/93327632f33b3a885da13b235972e2c5.png'); }
.icon-account{ background-image:url('https://www.saleyee.com/static/imgs/394c691acc710f57bcff9acb1247fe78.png'); }
.inline-form{ display:none; text-align:right; }
.inline-form-inner{ padding:20px; text-align:right; }
.inline-form-row{ margin-bottom:20px; text-align:right; }
.amount-input{ width:calc(100% - 110px); height:38px; border:1px solid #e6e6e6; border-radius:2px; padding:3px 5px 3px 10px; }
.form-msg{ color:#f00; padding-left:80px; text-align:right; }
.summary{ padding:20px 0; }
.summary ul{ display:flex; width:100%; }
.summary li{ width:23%; background:#f4f5fa; color:#ff5722; border-radius:5px; text-align:center; padding:50px 0; }
.summary li.op{ width:15%; font-size:26px; line-height:128px; color:#333; background:transparent; padding:0; }
.summary .sum{ font-size:24px; color:#333; }
</style>
