<template>
  <footer class="bg-slate-900 text-slate-200 mt-[10px]">
    <div class="mx-auto max-w-[1500px] min-w-[1200px] w-[80%] py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('footer.about') }}</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link class="hover:text-primary" to="/about-saleyee">赛盈简介</router-link>
            </li>
            <li><router-link class="hover:text-primary" to="/membership">会员权益</router-link></li>
            <li><a class="hover:text-primary" href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a></li>
            <li><router-link class="hover:text-primary" to="/contact-us">联系我们</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('footer.customer') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link class="hover:text-primary" to="/help-center">帮助中心</router-link></li>
            <li><router-link class="hover:text-primary" to="/faq/hc271661">售后条款</router-link></li>
            <li><router-link class="hover:text-primary" to="/faq/hp062361">支付方式</router-link></li>
            <li><router-link class="hover:text-primary" to="/faq/hp981158">物流方式</router-link></li>
            <li><router-link class="hover:text-primary" to="/vat-policy">VAT政策解读</router-link></li>
            <li><router-link class="hover:text-primary" to="/feedback">体验反馈</router-link></li>
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('footer.partners') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><router-link class="hover:text-primary" to="/distributors">跨境卖家入驻</router-link></li>
            <li><router-link class="hover:text-primary" to="/supplier">供应商入驻</router-link></li>
            <li><router-link class="hover:text-primary" to="/partners">合作伙伴</router-link></li>
            <li><a class="hover:text-primary" href="#">商务合作</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('footer.weixin') }}</h3>
          <div class="flex items-center gap-3">
            <img
              class="h-24 w-24 rounded bg-white p-1"
              src="https://www.saleyee.com/ContentNew/Images/2021/December/saleyee-weixin.png"
              alt="赛盈官方微信"
            />
            <div class="text-sm text-slate-300">{{ t('footer.scan') }}</div>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-white/10 pt-8">
        <div class="text-sm text-slate-400">{{ t('footer.friendLinks') }}</div>
        <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-400">
          <a
            class="hover:text-primary"
            href="https://www.goodcang.com/"
            target="_blank"
            rel="noreferrer"
            >Goodcang</a
          >
          <a
            class="hover:text-primary"
            href="https://www.yunexpress.com/"
            target="_blank"
            rel="noreferrer"
            >YunExpress</a
          >
          <a
            class="hover:text-primary"
            href="https://www.saleyee.cn/"
            target="_blank"
            rel="noreferrer"
            >Saleyee.cn</a
          >
          <a class="hover:text-primary" href="#">{{ t('footer.more') }}</a>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-6 opacity-80">
          <img
            class="h-8"
            src="https://www.saleyee.com/ContentNew/Images/2021/November/foot_recommend1.png"
            alt="Amazon热销"
          />
          <img
            class="h-8"
            src="https://www.saleyee.com/ContentNew/Images/2021/November/foot_recommend2.png"
            alt="eBay热销"
          />
          <img
            class="h-8"
            src="https://www.saleyee.com/ContentNew/Images/2021/November/foot_recommend3.png"
            alt="Wish热销"
          />
          <img
            class="h-8"
            src="https://www.saleyee.com/ContentNew/Images/2021/November/foot_recommend4.png"
            alt="Walmart热销"
          />
          <img
            class="h-8"
            src="https://www.saleyee.com/ContentNew/Images/2021/November/foot_recommend5.png"
            alt="Shopify热销"
          />
        </div>

        <div class="mt-8 text-xs text-slate-500">© 2025 Saleyee.com, Tengming Limited</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { t } from '@/i18n'
</script>

<style scoped></style>
