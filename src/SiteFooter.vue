<template>
  <footer class="bg-slate-900 text-slate-200 mt-[10px]">
    <div class="mx-auto max-w-[1500px] min-w-[1200px] w-[80%] py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('aboutSaleyee') }}</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <a class="hover:text-primary" href="/about-me">{{ t('saleyeeIntro') }}</a>
            </li>
            <li><a class="hover:text-primary" href="/membership">{{ t('membership') }}</a></li>
            <li><a class="hover:text-primary" href="/contact-us">{{ t('contactUs') }}</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('customerService') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><a class="hover:text-primary" href="/help-center">{{ t('helpCenter') }}</a></li>
            <!-- 售后条款 -->
            <li>
              <a 
                class="hover:text-primary" 
                :href="afterSalesResource?.helpFaqId ? '/help-center?faqid=' + afterSalesResource.helpFaqId : ''"
                v-text="currentLang === 'en' && afterSalesResource?.titleEn ? afterSalesResource.titleEn : afterSalesResource?.title || afterSalesResource?.title"
              ></a>
            </li>
            <!-- 支付方式 -->
            <li>
              <a 
                class="hover:text-primary" 
                :href="paymentResource?.helpFaqId ? '/help-center?faqid=' + paymentResource.helpFaqId : ''"
                v-text="currentLang === 'en' && paymentResource?.titleEn ? paymentResource.titleEn : paymentResource?.title || paymentResource?.title"
              ></a>
            </li>
            <!-- 物流方式 -->
            <li>
              <a 
                class="hover:text-primary" 
                :href="shippingResource?.helpFaqId ? '/help-center?faqid=' + shippingResource.helpFaqId : ''"
                v-text="currentLang === 'en' && shippingResource?.titleEn ? shippingResource.titleEn : shippingResource?.title || shippingResource?.title"
              ></a>
            </li>
            <li><a class="hover:text-primary" href="/shop/vat-policy">{{ t('vatPolicy') }}</a></li>
            <!-- <li><a class="hover:text-primary" href="/feedback">{{ t('feedback') }}</a></li> -->
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('businessCooperation') }}</h3>
          <ul class="space-y-2 text-sm">
            <li><a class="hover:text-primary" href="/register">{{ t('crossBorderSeller') }}</a></li>
            <li><a class="hover:text-primary" href="/supplier">{{ t('supplier') }}</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-white font-semibold mb-3">{{ t('officialWeChat') }}</h3>
          <div class="flex items-center gap-3">
            <img
              class="h-24 w-24 rounded bg-white p-1"
              src="/frondend/images/SiteFooter/dj373fgjg4.png"
              :alt="t('officialWeChat')"
            />
            <div class="text-sm text-slate-300">{{ t('scanToFollow') }}</div>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-white/10">
        <div class="mt-8 text-xs text-slate-500" v-text="copyrightResource?.title || ''"></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';

// 页面翻译数据
const translations = ref({})

// 当前语言
const currentLang = ref('zh-CN')

// 从window对象获取store实例
const store = window.vueStore;

// 获取页脚资源
const footerResources = computed(() => {
  // 确保store和getters存在
  if (store && store.getters) {
    return store.getters.footerResources || [];
  }
  return [];
});

// 售后条款资源 (position为footer, positiontype为footerhelp, type为link)
const afterSalesResource = computed(() => {
  // 确保footerResources.value存在且为数组
  if (Array.isArray(footerResources.value) && footerResources.value.length > 0) {
    // 获取所有符合条件的资源
    const resources = footerResources.value.filter(resource => 
      resource.position === 'footer' && 
      resource.positiontype === 'footerhelp' && 
      resource.type === 'link'
    );
    
    // 按照固定顺序返回第一个资源作为售后条款
    return resources.length > 0 ? resources[0] : null;
  }
  return null;
});

// 支付方式资源 (position为footer, positiontype为footerhelp, type为link)
const paymentResource = computed(() => {
  // 确保footerResources.value存在且为数组
  if (Array.isArray(footerResources.value) && footerResources.value.length > 0) {
    // 获取所有符合条件的资源
    const resources = footerResources.value.filter(resource => 
      resource.position === 'footer' && 
      resource.positiontype === 'footerhelp' && 
      resource.type === 'link'
    );
    
    // 按照固定顺序返回第二个资源作为支付方式
    return resources.length > 1 ? resources[1] : null;
  }
  return null;
});

// 物流方式资源 (position为footer, positiontype为footerhelp, type为link)
const shippingResource = computed(() => {
  // 确保footerResources.value存在且为数组
  if (Array.isArray(footerResources.value) && footerResources.value.length > 0) {
    // 获取所有符合条件的资源
    const resources = footerResources.value.filter(resource => 
      resource.position === 'footer' && 
      resource.positiontype === 'footerhelp' && 
      resource.type === 'link'
    );
    
    // 按照固定顺序返回第三个资源作为物流方式
    return resources.length > 2 ? resources[2] : null;
  }
  return null;
});

// 页脚二维码图片资源 (position为footer, positiontype为footerqr, type为image)
const footerQrImageResource = computed(() => {
  // 确保footerResources.value存在且为数组
  if (Array.isArray(footerResources.value) && footerResources.value.length > 0) {
    const resource = footerResources.value.find(resource => 
      resource.position === 'footer' && 
      resource.positiontype === 'footerqr' && 
      resource.type === 'image'
    );
    return resource;
  }
  return null;
});

// 版权信息资源 (position为copyright, positiontype为copyright)
const copyrightResource = computed(() => {
  // 从store获取所有公共资源，查找position为copyright且positiontype为copyright的资源
  if (store && store.getters) {
    const allResources = [
      ...(store.getters.headerResources || []),
      ...(store.getters.footerResources || []),
      ...(store.getters.supplierIntroResources || []),
      ...(store.getters.copyrightResources || []),
      ...(store.getters.webicpResources || [])
    ];
    
    const resource = allResources.find(resource => 
      resource.position === 'copyright' && 
      resource.positiontype === 'copyright'
    );
    
    return resource;
  }
  return null;
});

// 加载翻译文件
const loadTranslations = async () => {
  try {
    const response = await fetch('/frondend/lang/SiteFooter.json')
    const data = await response.json()
    translations.value = data
  } catch (error) {
    console.error('Failed to load translations:', error)
  }
}

// 翻译函数 - 直接从页面特定的JSON文件读取
const t = (key) => {
  // 获取当前语言，优先从localStorage获取，否则使用默认值
  const lang = localStorage.getItem('app.lang') || currentLang.value
  
  // 从页面特定的翻译文件中获取翻译
  if (translations.value[lang] && translations.value[lang][key]) {
    return translations.value[lang][key]
  }
  
  // 如果没有找到翻译，返回键名
  return key
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
  // 重新加载翻译以确保语言切换时更新
  loadTranslations()
}

// 组件挂载时加载公共资源数据
onMounted(() => {
  // 初始加载翻译
  loadTranslations()
  
  // 监听语言变化事件
  window.addEventListener('languagechange', handleLangChange)
  
  // 确保store存在后再调用dispatch
  if (store && typeof store.dispatch === 'function') {
    // 检查是否需要加载数据
    const lastUpdated = store.state.publicResources.lastUpdated;
    let shouldLoad = false;
    
    if (!lastUpdated) {
      // 从未加载过数据
      shouldLoad = true;
    } else {
      // 检查数据是否过期（5分钟内认为是有效的）
      const lastUpdatedTime = new Date(lastUpdated);
      const now = new Date();
      const diffMinutes = (now - lastUpdatedTime) / (1000 * 60);
      shouldLoad = diffMinutes >= 5;
    }
    
    // 如果需要加载数据，则一次性加载所有公共资源
    if (shouldLoad) {
      store.dispatch('loadPublicResources');
    }
  }
});

// 组件卸载前移除事件监听器
// onBeforeUnmount(() => {
//   window.removeEventListener('languagechange', handleLangChange)
// })
</script>

<style scoped></style>