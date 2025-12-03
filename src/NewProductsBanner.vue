<script setup>
import { ref } from 'vue'

const fallbackImage = ''

const themes = ref([
  {
    title: '新品推荐',
    products: [
      {
        title: '时尚简约背包',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2024/202404/e419b640-34a9-47c6-a93e-aea7aa15cc94.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '户外运动T恤',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2024/202404/d5f8e1c2-7a3e-4f2d-9c1b-8e5a6d9b0c3f.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '防水手机壳',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2024/202404/a2b7e9d1-f4c6-4e8a-9d5f-1c3e7b9a2d6f.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '便携式蓝牙音箱',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2024/202404/c8f3a5d2-e1b9-4c7f-8d2e-5a9f6b1c3e7d.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '身体瑜伽垫',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2024/202404/f1e4d8b3-7c2a-4d9e-6f5b-2c8a1e9d3b6f.png',
        href: 'https://www.saleyee.com',
      },
    ],
  },
  {
    title: '热销商品',
    products: [
      {
        title: '女性连衣裙',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2023/202306/6354c66a-fee7-43be-a216-b900d199862a.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '夏季短袖T恤',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2023/202306/7e5d9f2b-a1c3-4e6d-8f7a-3b2c9e1d5a6f.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '时尚休闲裤',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2023/202306/8c6a4e9d-f2b7-4f1e-a3d5-6b9c2e7f1a8d.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '防晒衣',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2023/202306/9d7b5f0e-g3c8-5g2f-b4e6-7c0d3f8g2b9e.png',
        href: 'https://www.saleyee.com',
      },
      {
        title: '女性配饰套装',
        img: 'https://resource.saleyee.com/UploadFiles/Images/2023/202306/1e8c6g1f-h4d9-6h3g-c5f7-8d1e4g9h3c0f.png',
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
      <h2 class="text-3xl font-bold text-slate-800">新品推荐</h2>
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