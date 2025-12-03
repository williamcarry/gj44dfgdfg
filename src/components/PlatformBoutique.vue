<script setup>
import { ref, reactive, computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

const platformData = reactive([
  {
    key: 'amazon',
    name: 'Amazon',
    label: '亚马逊热销产品',
    moreUrl: 'https://www.saleyee.com/amazon.html',
    products: [
      {
        id: 96,
        title: '【认证未出】铁制 0.6mm 油桶 美式 绿色',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
        href: 'https://www.saleyee.com/item/97686520.html',
      },
      {
        id: 97,
        title: '六层自由组合拆装带1排侧边挂钩 带调节脚与轮 铁 可自由调节层间距 家用层架 117*45*208cm 黑色 N001',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/f4d44a13-3798-4d9e-b494-18c68d3aa727.Jpeg',
        href: 'https://www.saleyee.com/item/25092515.html',
      },
      {
        id: 98,
        title: '铁制 5L 0.6mm 油桶 美式 绿色【同款编码 77275272】',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202506/89c6cc05-8416-491e-8b0e-3fde8a318f0e.Jpeg',
        href: 'https://www.saleyee.com/item/83349591.html',
      },
      {
        id: 99,
        title: '六层自由组合拆装带1排侧边挂钩 带调节脚与轮 铁 可自由调节层间距 用层架 117*45*208cm 烤漆银 N001',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg',
        href: 'https://www.saleyee.com/item/92355718.html',
      },
      {
        id: 100,
        title: '【认证未出】 铁制 20L 0.6mm 油桶 美式 黑色',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/79ebe6df-c2d3-4207-b146-513630fe163d.Jpeg',
        href: 'https://www.saleyee.com/item/06411664.html',
      },
    ],
  },
  {
    key: 'walmart',
    name: 'Walmart',
    label: '沃尔玛热销产品',
    moreUrl: 'https://www.saleyee.com/walmart.html',
    products: [
      {
        id: 101,
        title: '北欧简约落地灯 黑色',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202402/0a7a8c5f-6d36-45f7-8b27-55b8486e0bd3.jpeg',
        href: '#',
      },
      {
        id: 102,
        title: '防水野营帐篷 双人',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202401/98f53c5a-8cc7-4f66-8a84-b6f8b0c9b1d0.jpeg',
        href: '#',
      },
      {
        id: 103,
        title: '用多功能榨汁机',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202307/9d9074fc-c1e7-4fbc-ad57-834fd6c058d8.jpeg',
        href: '#',
      },
      {
        id: 104,
        title: '记忆棉护颈枕',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/2fb9dc9a-2db8-4be3-9b02-1a26ac0f8a5f.jpeg',
        href: '#',
      },
      {
        id: 105,
        title: '高压清洗机 1800W',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202205/5a8930fa-4a57-49d3-9f23-2b2f6a8d7a4d.jpeg',
        href: '#',
      },
    ],
  },
  {
    key: 'ebay',
    name: 'eBay',
    label: 'eBay热销产品',
    moreUrl: 'https://www.saleyee.com/ebay.html',
    products: [
      {
        id: 106,
        title: '复古留声机 蓝牙音箱',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202111/0c1a8a3b-3b65-4cb7-9b1d-7b0b2a6e7c13.jpeg',
        href: '#',
      },
      {
        id: 107,
        title: '健身哑铃 可调重量',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202109/21f2d5d3-86a4-4b35-8e31-f5f6d5a2a3b4.jpeg',
        href: '#',
      },
      {
        id: 108,
        title: '办公室人体工学椅',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202203/6a52e6d1-f5ac-4c06-9a5d-1f9f1b3c7e8d.jpeg',
        href: '#',
      },
      {
        id: 109,
        title: '无线手持挂烫机',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202303/96adf4e4-23f6-44d0-8a3e-2f1c6d4e8a9b.jpeg',
        href: '#',
      },
      {
        id: 110,
        title: '露营折叠桌椅套装',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202305/b7f3a109-9f9c-4d0d-9a2e-0b6a1c5d0e9f.jpeg',
        href: '#',
      },
    ],
  },
  {
    key: 'temu',
    name: 'Temu',
    label: 'Temu热销产品',
    moreUrl: 'https://www.saleyee.com/temu.html',
    products: [
      {
        id: 111,
        title: '时尚简约背包',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/e419b640-34a9-47c6-a93e-aea7aa15cc94.png',
        href: '#',
      },
      {
        id: 112,
        title: '户外运动T恤',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/d5f8e1c2-7a3e-4f2d-9c1b-8e5a6d9b0c3f.png',
        href: '#',
      },
      {
        id: 113,
        title: '防水手机壳',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/a2b7e9d1-f4c6-4e8a-9d5f-1c3e7b9a2d6f.png',
        href: '#',
      },
      {
        id: 114,
        title: '便携式蓝牙音箱',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/c8f3a5d2-e1b9-4c7f-8d2e-5a9f6b1c3e7d.png',
        href: '#',
      },
      {
        id: 115,
        title: '身瑜伽垫',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/f1e4d8b3-7c2a-4d9e-6f5b-2c8a1e9d3b6f.png',
        href: '#',
      },
    ],
  },
  {
    key: 'shein',
    name: 'Shein',
    label: 'Shein热销产品',
    moreUrl: 'https://www.saleyee.com/shein.html',
    products: [
      {
        id: 116,
        title: '女性连衣裙',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202306/6354c66a-fee7-43be-a216-b900d199862a.png',
        href: '#',
      },
      {
        id: 117,
        title: '夏季短袖T恤',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202306/7e5d9f2b-a1c3-4e6d-8f7a-3b2c9e1d5a6f.png',
        href: '#',
      },
      {
        id: 118,
        title: '时尚休闲裤',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202306/8c6a4e9d-f2b7-4f1e-a3d5-6b9c2e7f1a8d.png',
        href: '#',
      },
      {
        id: 119,
        title: '防晒衣',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202306/9d7b5f0e-g3c8-5g2f-b4e6-7c0d3f8g2b9e.png',
        href: '#',
      },
      {
        id: 120,
        title: '女性配饰套装',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202306/1e8c6g1f-h4d9-6h3g-c5f7-8d1e4g9h3c0f.png',
        href: '#',
      },
    ],
  },
  {
    key: 'tiktok',
    name: 'TikTok',
    label: 'TikTok热销产品',
    moreUrl: 'https://www.saleyee.com/tiktok.html',
    products: [
      {
        id: 121,
        title: '美妆护肤套装',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202205/87d65da5-3a20-4e14-b93c-d33c2f421d53.png',
        href: '#',
      },
      {
        id: 122,
        title: '面部护肤仪',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202205/6f4e8d3c-a5b2-4d7f-9e1c-2b8a5f3e7d1a.png',
        href: '#',
      },
      {
        id: 123,
        title: '彩妆盘',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202205/7g5f9e4d-b6c3-5e8g-0f2d-3c9b6g4f8e2b.png',
        href: '#',
      },
      {
        id: 124,
        title: '唇膏套装',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202205/8h6g0f5e-c7d4-6f9h-1g3e-4d0c7h5g9f3c.png',
        href: '#',
      },
      {
        id: 125,
        title: '护肤面膜',
        img: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202205/9i7h1g6f-d8e5-7g0i-2h4f-5e1d8i6h0g4d.png',
        href: '#',
      },
    ],
  },
])

const activePlatform = ref('amazon')

const fallbackImage = 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg'

const currentPlatformData = computed(() => {
  return platformData.find(p => p.key === activePlatform.value)
})

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
function isInternalLink(p) {
  const link = productLink(p)
  return !(/^https?:\/\//.test(link)) && link !== '#'
}

function selectPlatform(platformKey) {
  activePlatform.value = platformKey
}
</script>

<!-- ... existing template and style sections remain unchanged ... -->

<template>
  <section class="w-full" style="background-color: #F2F3F7;">
    <!-- 标题 -->
    <div class="w-full text-center py-11" style="background-color: #F2F3F7;">
      <h2 class="text-3xl font-bold text-slate-800">平台爆款</h2>
    </div>

    <!-- 平台选项卡 - Tab风格 -->
    <div class="mx-auto max-w-[1500px] w-[80%]">
      <div class="flex border-b border-slate-300">
        <button
          v-for="platform in platformData"
          :key="platform.key"
          class="flex-1 px-4 py-4 text-center cursor-pointer transition-all duration-200 border-r border-slate-300 flex flex-col items-center gap-2"
          :class="
            activePlatform === platform.key
              ? 'bg-white border-b-4 border-b-primary -mb-px'
              : 'bg-slate-50 hover:bg-slate-100'
          "
          @click="selectPlatform(platform.key)"
        >
          <img
            v-if="platform.key === 'amazon'"
            src="https://resource.saleyee.com/UploadFiles/Images/2021/202108/e827b18b-7406-44bd-af87-023264fe1e3f.jpg"
            :alt="platform.name"
            class="h-12 w-auto object-contain"
          />
          <img
            v-else-if="platform.key === 'walmart'"
            src="https://resource.saleyee.com/UploadFiles/Images/2021/202108/624010d8-62d6-4896-b9df-fad86d3388b6.jpg"
            :alt="platform.name"
            class="h-12 w-auto object-contain"
          />
          <img
            v-else-if="platform.key === 'ebay'"
            src="https://resource.saleyee.com/UploadFiles/Images/2021/202108/7f979b21-ecbd-48e9-99bb-f59fb2cc97b5.jpg"
            :alt="platform.name"
            class="h-12 w-auto object-contain"
          />
          <img
            v-else-if="platform.key === 'temu'"
            src="https://resource.saleyee.com/UploadFiles/Images/2024/202404/e419b640-34a9-47c6-a93e-aea7aa15cc94.png"
            :alt="platform.name"
            :class="activePlatform === platform.key ? 'h-12 w-auto object-contain' : 'h-12 w-auto object-contain filter grayscale opacity-60'"
          />
          <img
            v-else-if="platform.key === 'shein'"
            src="https://resource.saleyee.com/UploadFiles/Images/2023/202306/6354c66a-fee7-43be-a216-b900d199862a.png"
            :alt="platform.name"
            :class="activePlatform === platform.key ? 'h-12 w-auto object-contain' : 'h-12 w-auto object-contain filter grayscale opacity-60'"
          />
          <img
            v-else-if="platform.key === 'tiktok'"
            src="https://resource.saleyee.com/UploadFiles/Images/2022/202205/87d65da5-3a20-4e14-b93c-d33c2f421d53.png"
            :alt="platform.name"
            :class="activePlatform === platform.key ? 'h-12 w-auto object-contain' : 'h-12 w-auto object-contain filter grayscale opacity-60'"
          />
        </button>
      </div>
    </div>

    <!-- 当前平台的产品列表 - 与tab相连 -->
    <div class="mx-auto max-w-[1500px] w-[80%]" v-if="currentPlatformData">
      <!-- 产品网格容器 -->
      <div class="bg-white transition-all duration-300 border border-t-0 border-slate-300">
        <!-- 产品列表 -->
        <ul class="flex flex-wrap" style="row-gap:10px;">
          <li
            v-for="(product, idx) in currentPlatformData.products"
            :key="idx"
            class="flex flex-col items-center text-center border-r border-slate-200"
            :style="{
              width: 'calc(20% - 0.8px)',
              borderRight: idx % 5 === 4 ? 'none' : '1px solid #e2e8f0'
            }"
          >
            <div class="w-full flex flex-col items-center py-5">
              <!-- 产品图片 -->
              <router-link v-if="isInternalLink(product)" :to="productLink(product)" class="block text-center mb-3">
                <img
                  :src="product.img"
                  :alt="product.title"
                  @error="onImgError"
                  class="inline-block w-[190px] h-[190px] object-contain cursor-pointer transition-all hover:opacity-80"
                  style="margin-top: 35px; margin-bottom: 25px"
                />
              </router-link>
              <a v-else :href="productLink(product)" :target="linkTarget(product)" class="block text-center mb-3">
                <img
                  :src="product.img"
                  :alt="product.title"
                  @error="onImgError"
                  class="inline-block w-[190px] h-[190px] object-contain cursor-pointer transition-all hover:opacity-80"
                  style="margin-top: 35px; margin-bottom: 25px"
                />
              </a>

              <!-- 产品标题和价格 -->
              <div class="px-2 pb-8 w-full flex-1 flex flex-col">
                <router-link v-if="isInternalLink(product)" :to="productLink(product)" class="text-sm text-slate-800 hover:text-primary transition line-clamp-2 h-12 flex items-center justify-center">
                  {{ product.title }}
                </router-link>
                <a v-else :href="productLink(product)" :target="linkTarget(product)" class="text-sm text-slate-800 hover:text-primary transition line-clamp-2 h-12 flex items-center justify-center">
                  {{ product.title }}
                </a>
                <span class="text-orange-500 font-bold text-base mt-1">¥99.9</span>
              </div>
            </div>
          </li>
        </ul>

        <!-- 查看更多按钮 -->
        <div class="text-center py-5 border-t border-slate-200" style="background-color: #F2F3F7;">
          <router-link
            to="/cross-border-ecommerce"
            class="inline-block px-8 py-2 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition font-medium"
          >
            查看更多
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 平台标签鼠标悬停时改变边框颜色 */
a[href]:hover {
  border-bottom-color: rgb(203, 38, 28);
}
</style>
