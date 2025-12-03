<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '节日装饰'
  },
  titleEn: {
    type: String,
    default: 'Festival Decorations'
  }
})

// 当前语言
const currentLang = ref('zh-CN')

// 获取当前语言环境
const currentLanguage = computed(() => {
  return currentLang.value
})

// 根据语言显示标题
const displayTitle = computed(() => {
  return currentLanguage.value === 'en' ? props.titleEn : props.title
})

const fallbackImage = 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg'

const themes = ref([
  {
    title: '万圣节装饰',
    bannerImage: 'https://resource.saleyee.com/UploadFiles/Images/2025/202508/2b6a0e0c-60c5-4137-8a74-d98f82ab01e5.png',
    bannerHref: 'https://www.saleyee.com/subject/2025halloweendecoration.html',
    products: [
      {
        title: '71in 真人大小悬挂女巫会发声 万圣日常装饰',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/1b863b65-1960-42f6-a211-388e5d052ab3.Jpeg',
        href: 'https://www.saleyee.com/item/19198134.html',
      },
      {
        title: '9.6ft 万圣横幅 4颗白LED灯 万圣充气装饰 12V',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202507/0f37e22e-b978-49d3-bcfb-17f4bb8569fa.Jpeg',
        href: 'https://www.saleyee.com/item/59459371.html',
      },
      {
        title: '4.3ft 大鱼骷髅人 眼睛身体绿灯 鬼叫声 声控 电池款不含电池',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/470e692b-95a3-4caf-ab5e-c0d4567d6913.Jpeg',
        href: 'https://www.saleyee.com/item/85579749.html',
      },
      {
        title: '3ft 倒吊木乃伊 震动 鬼叫声 声控 电池款不含电池',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/6a676bde-e7f7-4c3a-af79-6218c18a29ac.Jpeg',
        href: 'https://www.saleyee.com/item/24145343.html',
      },
      {
        title: '额外产品 5',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
        href: '#',
      },
    ],
  },
  {
    title: '圣诞装饰',
    bannerImage: 'https://resource.saleyee.com/UploadFiles/Images/2025/202508/67439a0f-9003-4b07-aa6d-bc37bc55c629.png',
    bannerHref: 'https://www.saleyee.com/subject/prepare-your-early-christmas-list-2025.html',
    products: [
      {
        title: '36in 绿色 80灯 暖色3模式 电池盒控制 270枝头 带蝴蝶结 18个DIY配饰',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202410/890f8f68-c40a-40c5-a4f3-017cf297c900.Jpeg',
        href: 'https://www.saleyee.com/item/19048016.html',
      },
      {
        title: '绿色尖头喷白 7ft 870枝头 PVC材质 圣诞树 N101 欧洲',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202110/755b02bc-8c47-4a17-a00d-7c3798089de1.Jpeg',
        href: 'https://www.saleyee.com/item/44802000.html',
      },
      {
        title: '3pcs家庭麋鹿 54*38*122cm 金色 铁架 棉线 葱粉 圣诞灯饰麋鹿',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/d41d793d-cf75-4653-8470-a715d6e9f12f.Jpeg',
        href: 'https://www.saleyee.com/item/63956299.html',
      },
      {
        title: '白色 5ft 72灯 72枝头 白桦树造型 塑料材质 圣诞树 英规 N001',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202209/f58ec505-b5aa-49bd-9b7d-342b9a22ef61.Jpeg',
        href: 'https://www.saleyee.com/item/04581212.html',
      },
      {
        title: '额外产品 5',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
        href: '#',
      },
    ],
  },
])

function onImgError(e) {
  const img = e.target
  if (img && img.src !== fallbackImage) {
    img.src = fallbackImage
  }
}

function extractItemId(href) {
  const m = href?.match(/\/item\/(\d+)/)
  return m ? m[1] : ''
}
function productLink(p) {
  // @ts-ignore allow missing href
  const raw = p.href || ''
  // @ts-ignore allow optional id
  const id = p.id || extractItemId(raw)
  return id ? `/item/${id}` : raw || '#'
}
function linkTarget(p) {
  const link = productLink(p)
  return /^https?:\/\//.test(link) ? '_blank' : undefined
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

// 组件挂载时初始化语言
onMounted(() => {
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  window.addEventListener('languagechange', handleLangChange)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<!-- ... existing template and style sections remain unchanged ... -->

<template>
  <section class="w-full" style="background-color: #F2F3F7;">
    <!-- 标题 -->
    <div class="w-full text-center py-11" style="background-color: #F2F3F7;">
      <h2 class="text-3xl font-bold text-slate-800">{{ displayTitle }}</h2>
    </div>

    <!-- 两个主题区域 -->
    <div class="mx-auto max-w-[1500px] w-[80%]" style="display: flex; flex-direction: column; gap: 10px;">
      <div v-for="(theme, themeIdx) in themes" :key="themeIdx">
        <!-- 产品列表 - 5列布局 -->
        <div class="bg-white border border-slate-300 rounded">
          <ul class="flex flex-wrap" style="row-gap:10px;">
            <li
              v-for="(product, productIdx) in theme.products"
              :key="productIdx"
              class="flex flex-col items-center text-center border-r border-slate-200"
              :style="{
                width: 'calc(20% - 0.8px)',
                borderRight: productIdx % 5 === 4 ? 'none' : '1px solid #e2e8f0',
              }"
            >
              <div class="w-full flex flex-col items-center py-5">
                <!-- 产品图片 -->
                <a :href="productLink(product)" :target="linkTarget(product)" class="block text-center mb-3">
                  <img
                    :src="product.img"
                    :alt="product.title"
                    loading="lazy"
                    @error="onImgError"
                    class="inline-block w-[190px] h-[190px] object-contain cursor-pointer transition-all hover:opacity-80"
                    style="margin-top: 35px; margin-bottom: 25px"
                  />
                </a>

                <!-- 产品标题和价格 -->
                <div class="px-2 pb-8 w-full flex-1 flex flex-col">
                  <a
                    :href="productLink(product)"
                    :target="linkTarget(product)"
                    class="text-sm text-slate-800 hover:text-primary transition line-clamp-2 h-12 flex items-center justify-center"
                  >
                    {{ product.title }}
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: rgb(203, 38, 28);
}
</style>