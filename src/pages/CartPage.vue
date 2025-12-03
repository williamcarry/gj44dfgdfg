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
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <div class="flex-1 bg-slate-50">
      <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1150px] px-4 md:px-0 py-8">
        <div class="mb-6">
          <h1 class="text-2xl font-semibold text-slate-900 mb-4">购物车</h1>
          <div class="flex gap-0 border-b border-slate-200">
            <button
              @click="cartType = 'dropship'"
              :class="[
                'px-6 py-3 font-medium border-b-2 transition',
                cartType === 'dropship'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              一件代发
            </button>
            <button
              @click="cartType = 'wholesale'"
              :class="[
                'px-6 py-3 font-medium border-b-2 transition',
                cartType === 'wholesale'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              ]"
            >
              批发
            </button>
          </div>
        </div>

        <el-row :gutter="20">
          <el-col :xs="24" :md="19">
            <div class="bg-white rounded-lg border border-slate-200">
              <div class="grid grid-cols-12 gap-3 p-4 bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-700">
                <div class="col-span-1">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="w-4 h-4" />
                </div>
                <div class="col-span-5">商品</div>
                <div class="col-span-2 text-right">价格</div>
                <div class="col-span-2 text-center">数量</div>
                <div class="col-span-2 text-right">小计</div>
              </div>

              <div v-if="cartItems.length > 0">
                <div v-for="(group, groupIndex) in groupedItems" :key="groupIndex">
                  <div class="grid grid-cols-12 gap-3 p-3 bg-slate-100 border-b border-slate-200 items-center text-xs font-medium text-slate-600">
                    <div class="col-span-1"></div>
                    <div class="col-span-11 flex items-center justify-between">
                      <div class="flex items-center gap-1">
                        <span v-if="group.region === 'US'" class="text-base">🇺🇸</span>
                        <span v-else-if="group.region === 'UK'" class="text-base">🇬🇧</span>
                        <span class="font-medium">{{ group.region }} - {{ group.shipping }} ({{ group.items.length }})</span>
                      </div>
                      <div class="flex items-center gap-6 text-slate-500">
                        <span class="flex items-center gap-1">
                          ⊖ 删除选中商品(0)
                        </span>
                        <span class="flex items-center gap-1">
                          ◯ 选中此运费方式商品(0)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div v-for="(item, itemIndex) in group.items" :key="item.id" class="grid grid-cols-12 gap-3 p-4 border-b border-slate-200 items-center text-sm bg-white">
                    <div class="col-span-1">
                      <input type="checkbox" v-model="item.selected" class="w-4 h-4" />
                    </div>

                    <div class="col-span-5 flex gap-3">
                      <div class="w-16 h-16 bg-slate-100 rounded flex-shrink-0 overflow-hidden">
                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="text-slate-900 font-medium text-sm line-clamp-2 flex justify-between items-start">
                          <span>{{ item.name }}</span>
                          <el-button link type="primary" @click="removeItem(cartItems.indexOf(item))" size="small" class="ml-2">
                            删除
                          </el-button>
                        </div>
                        <div class="text-slate-500 text-xs mt-1">SKU: {{ item.sku }}</div>
                        <div class="text-slate-500 text-xs">可售库存：13</div>
                      </div>
                    </div>

                    <div class="col-span-2 text-right">
                      <div class="text-primary font-semibold text-sm">{{ item.price }}</div>
                      <div class="text-slate-500 line-through text-xs">{{ item.originalPrice }}</div>
                    </div>

                    <div class="col-span-2 flex justify-center">
                      <div class="flex items-center border border-slate-300 rounded bg-white">
                        <button @click="decrementQty(cartItems.indexOf(item))" class="px-2 py-1 text-slate-600 hover:bg-slate-50 text-sm">
                          −
                        </button>
                        <input
                          v-model.number="item.quantity"
                          type="number"
                          class="w-10 text-center border-l border-r border-slate-300 py-1 outline-none text-sm"
                          @change="updateQuantity(cartItems.indexOf(item), item.quantity)"
                        />
                        <button @click="incrementQty(cartItems.indexOf(item))" class="px-2 py-1 text-slate-600 hover:bg-slate-50 text-sm">
                          +
                        </button>
                      </div>
                    </div>

                    <div class="col-span-2 text-right">
                      <div class="text-slate-900 font-medium text-sm">{{ item.price }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="p-8 text-center">
                <el-empty description="购物车为空" />
              </div>
            </div>
          </el-col>

          <el-col :xs="24" :md="5">
            <div class="bg-white rounded-lg border border-slate-200 p-5 sticky top-6">
              <h3 class="text-base font-medium text-slate-900 mb-4">合计</h3>

              <div class="space-y-3 mb-4 text-xs">
                <div class="flex justify-between">
                  <span class="text-slate-600">SKU(件)：</span>
                  <span class="text-slate-900">0</span>
                  <span class="text-slate-600">商品数量(件)：</span>
                  <span class="text-slate-900">0</span>
                </div>
              </div>

              <div class="space-y-2 mb-5 text-sm">
                <div class="flex justify-between">
                  <span class="text-slate-600">商品合计：</span>
                  <span class="text-slate-900">0.00</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">采购券减免：</span>
                  <span class="text-slate-900">-0.00</span>
                </div>
                <div class="flex justify-between text-primary font-semibold">
                  <span>应付总额：</span>
                  <span>0.00</span>
                </div>
              </div>

              <el-button class="w-full mb-4" style="background-color: #CB261C; border-color: #CB261C; color: white; height: 40px;">去结算</el-button>

              <div class="text-xs text-slate-500 leading-relaxed">
                <div class="flex items-start gap-1">
                  <span class="flex-shrink-0">ⓘ</span>
                  <div>
                    <p>税费、保障服务费和其他说明信息</p>
                    <p>在下个页面计算</p>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const cartType = ref('dropship')

const cartItems = ref([
  {
    id: '1',
    name: '副驾驶 Mirror Driver Side FIT for Hyundai Kona II On Host Edition Night SEL Plus Sport',
    sku: '75682614',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/4695cd17-10c7-473c-960a-fbb9d18c4a90.Jpeg',
    price: 'USD 82.64',
    originalPrice: 'USD 92.64',
    quantity: 1,
    region: 'US',
    shipping: '运送方式',
    selected: false,
  },
  {
    id: '2',
    name: '【防摔盔】双4+500 新型户外防摔硅胶头盔 220V 220V 新型户外防摔硅胶头盔 部件 电话',
    sku: '8872641',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202410/890f8f68-c40a-40c5-a4f3-017cf297c900.Jpeg',
    price: 'GBP 33.80',
    originalPrice: 'GBP 43.80',
    quantity: 1,
    region: 'UK',
    shipping: '运送方式',
    selected: false,
  },
  {
    id: '3',
    name: "10''30 白色 STUS 吸盘 油漆 镜面 PER 焊接 NO",
    sku: '5692786',
    image: 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/d41d793d-cf75-4653-8470-a715d6e9f12f.Jpeg',
    price: 'USD 78.20',
    originalPrice: 'USD 88.20',
    quantity: 1,
    region: 'US',
    shipping: '运送方式',
    selected: false,
  },
])

const selectAll = ref(false)

const groupedItems = computed(() => {
  const groups = {}

  cartItems.value.forEach((item) => {
    const key = `${item.region}-${item.shipping}`
    if (!groups[key]) {
      groups[key] = {
        region: item.region,
        shipping: item.shipping || '标准配送',
        items: []
      }
    }
    groups[key].items.push(item)
  })

  return Object.values(groups)
})

const productTotal = computed(() => {
  let total = 0
  cartItems.value.forEach((item) => {
    const priceStr = item.price.replace(/[^0-9.]/g, '')
    const price = parseFloat(priceStr)
    if (!isNaN(price)) {
      total += price * item.quantity
    }
  })
  return `USD ${total.toFixed(2)}`
})

const toggleSelectAll = () => {
  cartItems.value.forEach((item) => {
    item.selected = selectAll.value
  })
}

const incrementQty = (index) => {
  cartItems.value[index].quantity++
}

const decrementQty = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--
  }
}

const updateQuantity = (index, qty) => {
  if (qty < 1) {
    cartItems.value[index].quantity = 1
  }
}

const removeItem = (index) => {
  cartItems.value.splice(index, 1)
}

const goHome = () => {
  window.location.href = '/'
}
</script>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
