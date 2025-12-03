<script setup>
import { ref } from 'vue'

const fallbackImage = ''

const themes = ref([
  {
    title: '国际品牌',
    products: [
      {
        title: '欧洲顶级家具品牌',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202410/890f8f68-c40a-40c5-a4f3-017cf297c900.Jpeg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '美洲知名品牌商品',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/d41d793d-cf75-4653-8470-a715d6e9f12f.Jpeg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '亚洲一线品牌',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/7656a659-2d14-4c49-a355-c45b0ae7edf8.Jpeg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '全球奢侈品牌',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/9edd9fdd-b8ca-4750-8c74-6180331317f0.jpg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '国际专业品牌',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202506/89c6cc05-8416-491e-8b0e-3fde8a318f0e.Jpeg',
        href: 'https://www.saleyee.com',
      },
    ],
  },
  {
    title: '国内名牌',
    products: [
      {
        title: '国产优质家居品牌',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '民族优秀品牌',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202501/8829a6ab-0a10-4349-a506-12835c30c872.Jpeg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '国内知名厂商',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202506/89c6cc05-8416-491e-8b0e-3fde8a318f0e.Jpeg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '中国驰名商标',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
        href: 'https://www.saleyee.com',
      },
      {
        title: '国内领先品牌',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
        href: 'https://www.saleyee.com',
      },
    ],
  },
])

function onImgError(e) {
  const img = e.target
  if (img) {
    img.style.display = 'none'
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
  return id ? `/shop/item/${id}` : raw || '#'
}
function linkTarget(p) {
  const link = productLink(p)
  return /^https?:\/\//.test(link) ? '_blank' : undefined
}
</script>

<!-- ... existing template and style sections remain unchanged ... -->

<template>
  <section class="w-full" style="background-color: #F2F3F7;">
    <!-- 标题 -->
    <div class="w-full text-center py-11" style="background-color: #F2F3F7;">
      <h2 class="text-3xl font-bold text-slate-800">品牌热品大牌联盟</h2>
    </div>

    <!-- 多个主题区域 -->
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

                <!-- 产品标题 -->
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