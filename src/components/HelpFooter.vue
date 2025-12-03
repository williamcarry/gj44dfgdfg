<template>
  <!-- 页脚 -->
  <footer class="hc-footer">
    <div class="hc-container hc-footer__inner">
      <div class="hc-footer__col">
        <h3>关于赛盈</h3>
        <ul>
          <li><a href="/about-saleyee">赛盈简介</a></li>
          <li><a href="/membership">会员权益</a></li>
          <li><a href="https://blog.saleyee.com" target="_blank" rel="noreferrer">赛盈学院</a></li>
          <li><a href="/contact-us">联系我们</a></li>
        </ul>
      </div>
      <div class="hc-footer__col">
        <h3>客户服务</h3>
        <ul>
          <li><a href="/help-center">帮助中心</a></li>
          <!-- 售后条款 -->
          <li>
            <a 
              :href="afterSalesResource?.helpFaqId ? '/help-center?faqid=' + afterSalesResource.helpFaqId : '/shop/faq/hc271661'"
              v-text="afterSalesResource?.title || '售后条款'"
            ></a>
          </li>
          <!-- 支付方式 -->
          <li>
            <a 
              :href="paymentResource?.helpFaqId ? '/help-center?faqid=' + paymentResource.helpFaqId : '/shop/faq/hp062361'"
              v-text="paymentResource?.title || '支付方式'"
            ></a>
          </li>
          <!-- 物流方式 -->
          <li>
            <a 
              :href="shippingResource?.helpFaqId ? '/help-center?faqid=' + shippingResource.helpFaqId : '/shop/faq/hp981158'"
              v-text="shippingResource?.title || '物流方式'"
            ></a>
          </li>
          <li><a href="https://www.saleyee.com/help/14.html" target="_blank" rel="noreferrer">VAT政策解读</a></li>
          <li><a href="https://www.saleyee.com/feedback.html" target="_blank" rel="noreferrer">体验反馈</a></li>
        </ul>
      </div>
      <div class="hc-footer__col">
        <h3>合作联系</h3>
        <ul>
          <li><a href="/distributors">跨境卖家入驻</a></li>
          <li><a href="/supplier">供应商入驻</a></li>
          <li><a href="/shop/partners">合作伙伴</a></li>
          <li><a href="https://www.saleyee.com/help/51.html" target="_blank" rel="noreferrer">商务合作</a></li>
        </ul>
      </div>
      <div class="hc-footer__col hc-footer__col--wechat">
        <h3>赛盈官方微信</h3>
        <div class="hc-footer__qr">
          <img src="https://resource.saleyee.cn/UploadFiles/Images/2024/202412/3d1ddf0c-7c7c-4f2e-a9bd-30813e3e5a99.png" alt="赛盈官方微信" />
          <p>扫码关注获取平台资讯</p>
        </div>
      </div>
    </div>
    <div class="hc-footer__partners">
      <div class="hc-container">
        <div class="hc-footer__partners-title">合作伙伴：</div>
        <ul class="hc-footer__partners-list">
          <li v-for="partner in partners" :key="partner.alt">
            <img :src="partner.src" :alt="partner.alt" loading="lazy" />
          </li>
        </ul>
      </div>
    </div>
    <div class="hc-footer__bottom">
      <div class="hc-container">© 2025 Saleyee.com Tengming Limited | 网站地图</div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// 合作伙伴数据
const partners = [
  { alt: 'Amazon', src: 'https://www.saleyee.com/ContentNew/Images/partners/amazon.png' },
  { alt: 'eBay', src: 'https://www.saleyee.com/ContentNew/Images/partners/ebay.png' },
  { alt: 'Wish', src: 'https://www.saleyee.com/ContentNew/Images/partners/wish.png' },
  { alt: 'Walmart', src: 'https://www.saleyee.com/ContentNew/Images/partners/walmart.png' },
  { alt: 'Shopify', src: 'https://www.saleyee.com/ContentNew/Images/partners/shopify.png' },
];

// 获取页脚资源
const footerResources = computed(() => store.getters.footerResources);

// 售后条款资源 (position为footer, positiontype为footerhelp, type为link)
const afterSalesResource = computed(() => {
  return footerResources.value.find(resource => 
    resource.position === 'footer' && 
    resource.positiontype === 'footerhelp' && 
    resource.type === 'link'
  );
});

// 支付方式资源 (position为footer, positiontype为footerhelp, type为link)
// 注意：如果有多个匹配项，我们需要根据某种逻辑选择正确的那个
const paymentResource = computed(() => {
  const resources = footerResources.value.filter(resource => 
    resource.position === 'footer' && 
    resource.positiontype === 'footerhelp' && 
    resource.type === 'link'
  );
  
  // 如果只有一个匹配项，则返回它
  if (resources.length === 1) {
    return resources[0];
  }
  
  // 如果有多个匹配项，可能需要根据标题或其他条件进一步筛选
  // 这里我们简单地返回第一个作为示例
  return resources.length > 0 ? resources[0] : null;
});

// 物流方式资源 (position为footer, positiontype为footerhelp, type为link)
const shippingResource = computed(() => {
  const resources = footerResources.value.filter(resource => 
    resource.position === 'footer' && 
    resource.positiontype === 'footerhelp' && 
    resource.type === 'link'
  );
  
  // 如果只有一个匹配项，则返回它
  if (resources.length === 1) {
    return resources[0];
  }
  
  // 如果有多个匹配项，可能需要根据标题或其他条件进一步筛选
  // 这里我们简单地返回第一个作为示例
  return resources.length > 0 ? resources[0] : null;
});

// 组件挂载时加载公共资源数据
onMounted(() => {
  // 检查是否需要加载数据
  const lastUpdated = store.state.publicResources?.lastUpdated;
  let shouldLoad = false;
  
  if (!lastUpdated) {
    shouldLoad = true;
  } else {
    const lastUpdatedTime = new Date(lastUpdated);
    const now = new Date();
    const diffMinutes = (now - lastUpdatedTime) / (1000 * 60);
    shouldLoad = diffMinutes >= 5;
  }
  
  // 如果需要加载数据，则一次性加载所有公共资源
  if (shouldLoad) {
    store.dispatch('loadPublicResources');
  }
});
</script>

<style scoped>
/* 页脚 */
.hc-footer { background: #111827; color: #f9fafb; }
.hc-footer__inner { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; padding: 48px 0 40px; }
.hc-footer__col h3 { font-size: 16px; margin-bottom: 16px; font-weight: 600; }
.hc-footer__col ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.hc-footer__col a { color: #d1d5db; text-decoration: none; font-size: 13px; }
.hc-footer__col a:hover { color: #fff; }
.hc-footer__col--wechat { text-align: center; }
.hc-footer__qr img { width: 120px; height: 120px; border-radius: 12px; object-fit: cover; }
.hc-footer__qr p { margin-top: 10px; font-size: 13px; color: #d1d5db; }
.hc-footer__partners { background: #0f172a; padding: 18px 0; border-top: 1px solid rgba(148, 163, 184, 0.2); }
.hc-footer__partners-title { font-size: 13px; color: #e5e7eb; margin-bottom: 12px; }
.hc-footer__partners-list { display: flex; align-items: center; flex-wrap: wrap; gap: 20px; list-style: none; padding: 0; margin: 0; }
.hc-footer__partners-list img { height: 28px; filter: brightness(0) invert(1); opacity: 0.75; }
.hc-footer__partners-list img:hover { opacity: 1; }
.hc-footer__bottom { background: #0b1220; padding: 16px 0; font-size: 12px; color: #9ca3af; text-align: center; }

@media (max-width: 767px) {
  .hc-footer__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 575px) {
  .hc-footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>