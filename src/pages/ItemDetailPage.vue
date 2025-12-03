<!--
CSS 引用说明：
1. ���局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. 页面局部样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import OneClickPublishButton from '@/components/OneClickPublishButton.vue'
import OneClickPublishModal from '@/components/OneClickPublishModal.vue'
import PaymentMethodModal from '@/components/PaymentMethodModal.vue'
import OrderStatusMonitor from '@/components/OrderStatusMonitor.vue'
import RelatedProducts from '@/components/RelatedProducts.vue'
import ProductDetailTabs from '@/components/ProductDetailTabs.vue'
import { getProductByIdentifier } from '@/data/products'
import { getProductDetail, createMockProduct, shippingRegions, shippingMethods, stockInfo, PRICE_CONFIG } from '@/services/productDetailMockApi'

// 从 Symfony 接收 props
const props = defineProps({
  id: {
    type: [String, Number],
    default: ''
  }
})

const productId = computed(() => {
  // 优先使用从 Symfony 传递的 id
  if (props.id) return String(props.id).replace(/\.html$/i, '')
  
  // 备用方案：从 URL 路径中提取
  const pathMatch = window.location.pathname.match(/\/item\/([^/?]+)/)
  return pathMatch ? pathMatch[1].replace(/\.html$/i, '') : ''
})

const product = ref(undefined)
const selectedImage = ref('')
const selectedIndex = ref(0)
const thumbnailOffset = ref(0)
const quantity = ref(1)
const activeTab = ref('dropship')
const isPublishModalOpen = ref(false)
const isPaymentModalOpen = ref(false)
const isOrderStatusOpen = ref(false)
const currentOrderNo = ref('')

const basePrice = computed(() => product.value?.basePrice || PRICE_CONFIG.dropshipPrice)

const mainImageUrl = computed(() => {
  return (
    selectedImage.value ||
    (product.value?.images && product.value.images[selectedIndex.value]?.url) ||
    product.value?.mainImage ||
    ''
  )
})

const totalPrice = computed(() => {
  const total = basePrice.value * quantity.value
  return `${product.value?.currency || PRICE_CONFIG.currency} ${total.toFixed(2)}`
})


async function loadProduct(id) {
  if (!id) {
    product.value = undefined
    selectedImage.value = ''
    return
  }

  try {
    const p = getProductByIdentifier(id)
    if (p) {
      product.value = p
      selectedIndex.value = 0
      selectedImage.value = p.mainImage || (p.images && p.images[0] && p.images[0].url) || ''
      return
    }

    const result = await getProductDetail(id)
    if (result.success) {
      product.value = result.data
      selectedIndex.value = 0
      selectedImage.value = result.data.mainImage
    } else {
      console.error('Failed to load product:', id)
      product.value = createMockProduct(id)
      selectedImage.value = product.value.mainImage
    }
  } catch (error) {
    console.error('Error loading product:', error)
    product.value = createMockProduct(id)
    selectedImage.value = product.value.mainImage
  }
}

onMounted(() => {
  loadProduct(productId.value)
})

watch(() => productId.value, (newId) => {
  loadProduct(newId)
})

function selectThumbnail(url, index) {
  selectedImage.value = url
  if (typeof index === 'number') selectedIndex.value = index
}

function handleThumbnailMouseMove(e) {
  const wrapper = e.currentTarget
  const scrollContainer = wrapper.querySelector('.thumbnail-scroll-container')
  if (!scrollContainer || !product.value?.images) return

  const items = wrapper.querySelectorAll('.thumbnail-item')
  const wrapperRect = wrapper.getBoundingClientRect()
  const scrollLeft = scrollContainer.style.transform
    ? parseInt(scrollContainer.style.transform.match(/\d+/)?.[0] || '0')
    : 0

  items.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect()
    const itemLeft = itemRect.left - wrapperRect.left + scrollLeft
    const itemRight = itemLeft + itemRect.width

    const mouseX = e.clientX - wrapperRect.left
    if (mouseX >= itemLeft && mouseX <= itemRight) {
      if (product.value?.images && index >= 0 && index < product.value.images.length) {
        selectThumbnail(product.value.images[index].url, index)
      }
    }
  })
}

function scrollThumbnails(direction) {
  if (!product.value?.images) return

  const itemCount = product.value.images.length
  const itemsPerPage = 5
  const maxPages = Math.ceil(itemCount / itemsPerPage)
  let currentPage = Math.floor(thumbnailOffset.value / itemsPerPage)

  if (direction === 'prev') {
    currentPage = Math.max(0, currentPage - 1)
  } else {
    currentPage = Math.min(maxPages - 1, currentPage + 1)
  }

  thumbnailOffset.value = currentPage * itemsPerPage
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value -= 1
}

function increaseQty() {
  quantity.value += 1
}

function handlePublish(platform) {
  if (!product.value) return
  console.log(`Publishing to ${platform}:`, product.value.sku)
  // 这里可以添加实际的发布逻辑
}

function openPaymentModal() {
  if (!product.value) return
  isPaymentModalOpen.value = true
}

function showOrderStatus() {
  const now = new Date()
  const date = now.getFullYear().toString() +
               String(now.getMonth() + 1).padStart(2, '0') +
               String(now.getDate()).padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  currentOrderNo.value = `ORD-${date}-${random}`
  isOrderStatusOpen.value = true
}

function handlePaymentConfirm(paymentMethod) {
  if (!product.value) return
  console.log(`Payment confirmed with method: ${paymentMethod}`)
  console.log(`Product: ${product.value.sku}, Quantity: ${quantity.value}`)

  // 支付方式映���
  const paymentMethodNames = {
    'wechat': '微信支付',
    'alipay': '支付宝',
    'card': '信用卡',
    'paypal': 'PayPal',
    'balance': '余额支付',
    'payoneer': 'Payoneer'
  }

  const methodName = paymentMethodNames[paymentMethod] || paymentMethod
  console.log(`Redirecting to ${methodName} payment...`)

  // 这里可以添加实际的支付逻辑，比如：
  // 1. 调用支付API
  // 2. 生成支付二维码
  // 3. 重定向到第三方支付页面
  // 4. 验证余额是否足够（用于余额支付）
  // 等等

  alert(`已选择${methodName}，系统将跳��到支付页��...`)
}
</script>

<template>
  <div class="min-h-screen flex flex-col page">
    <SiteHeader />

    <main class="flex-1">
      <div class="breadcrumb-wrapper">
        <BreadcrumbNav />
      </div>

      <div class="content-container">
        <!-- 左侧：商品图片区域 -->
        <div class="product-section">
          <div class="image-gallery-wrapper">
            <!-- 主图 -->
            <div class="main-image-container">
              <img v-if="mainImageUrl" :src="mainImageUrl" width="500" height="500" :alt="product?.title || '商品�����'" loading="lazy" class="main-image" />
              <div v-else class="no-image-placeholder">暂无图片</div>
              <div class="image-overlay"></div>
            </div>

            <!-- 缩略图导航 -->
            <div class="thumbnail-navigation">
              <div class="thumbnails-wrapper">
                <ul class="thumbnail-scroll-container">
                  <li v-for="(img, idx) in (product?.images || [])" :key="img.id || idx" class="thumbnail-item" @click="selectThumbnail(img.url, idx)">
                    <div class="thumbnail-image-wrapper" :class="{ active: (selectedImage ? selectedImage === img.url : selectedIndex === idx) }">
                      <img :alt="img.alt || (product?.title || '')" loading="lazy" :src="img.url" class="thumbnail-image" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 大图预览 -->
            <div class="large-preview">
              <img v-if="mainImageUrl" :src="mainImageUrl" width="1000" height="1000" :alt="product?.title || '商品大图'" loading="lazy" class="large-preview-image" />
            </div>
          </div>
        </div>

        <!-- 右侧：��品信息区域 -->
        <div class="product-details-section">
          <!-- ���告横幅 -->
          <div class="warning-banner">
            <img loading="lazy" src="/images/icons/prohibition.svg" class="warning-icon" alt="禁止" />
            <p class="warning-text"></p>
          </div>

          <div class="product-info-wrapper">
            <!-- 商品标题信息 -->
            <div class="product-header">
              <h1 :title="product?.title" class="product-title">
                <span class="title-text">{{ product?.title || '商品标题' }}</span>
              </h1>
              <p class="sku-info">SKU：{{ product?.sku || '' }}</p>
              <span class="spu-info">SPU：{{ product?.spu || '' }}</span>
              <span class="publish-date">首次上架时间：{{ product?.publishDate || '' }}</span>
            </div>

            <!-- 商品标签/Tab菜单 -->
            <div class="product-tags">
              <ul class="tags-list">
                <li class="tag-dropship" :class="{ active: activeTab === 'dropship' }" @click="activeTab = 'dropship'">一件代发</li>
                <li class="tag-direct" :class="{ active: activeTab === 'factory' }" @click="activeTab = 'factory'">工厂直采</li>
              </ul>
            </div>

            <!-- 一件代发Tab内容 -->
            <div v-show="activeTab === 'dropship'" class="tab-content dropship-content">
              <!-- 价格与会员折扣区域 -->
              <div class="product-pricing-section">
                <div class="price-display">
                  <p class="price-amount">
                    <b class="price-value">{{ product?.currency || PRICE_CONFIG.currency }} {{ basePrice.toFixed(2) }}</b>
                    <span class="original-price"></span>
                  </p>
                </div>

                <div class="member-discount-box">
                  <p class="member-level">普通会员</p>
                  <span class="discount-text">当前无会员折扣</span>
                  <a target="_blank" href="https://www.saleyee.com/membership.html" class="member-link">了解更多会员权益&gt;</a>
                </div>
              </div>

              <!-- 批发说明区域 -->
              <div class="wholesale-section">
                <div class="wholesale-content">
                  <h5 class="section-title">什么是批发</h5>
                  <p class="section-description">
                    当您需要批量采购商品时，可选择"批发"模式。平台会安排送货至您���定的仓库���运送费在订单���节收取。（目前支持FBA仓、WFS���）
                  </p>
                  <h5 class="section-title">下批发单的流程</h5>
                  <img loading="lazy" src="https://www.saleyee.com/ContentNew/Images/2023/202305/wholesale-guidance.png" class="workflow-image" alt="批发流程" />
                  <div class="button-group">
                    <button type="button" class="btn-primary">立即体验</button>
                    <a target="_blank" href="https://www.saleyee.com/guide/hp746811.html" class="help-link">查看更多帮助 &gt;</a>
                  </div>
                </div>
              </div>

              <!-- 商品详情列表 -->
              <div class="product-details-list">
                <ul class="details-list-primary">
                  <li class="list-item">
                    <span class="item-label">采购券：</span>
                    <div class="item-content">
                      <span v-if="product?.enableDiscount" class="coupon-badge">{{ product.coupon }}</span>
                      <span v-else class="coupon-badge">无采购券</span>
                    </div>
                  </li>

                  <li class="list-item">
                    <span class="item-label">仓库类型说明</span>
                    <div class="item-content">{{ product?.warehouseType || '��库信息' }}</div>
                  </li>

                  <li class="list-item">
                    <span class="item-label">服务说明：</span>
                    <div class="item-services">
                      <span class="service-badge unsupported" title="此商品不支持圈货拼购">
                        <img loading="lazy" src="/images/icons/false.svg" class="service-icon" alt="不支持" />
                        圈货
                      </span>
                      <span class="service-badge supported" title="支持自提">
                        <img loading="lazy" src="/images/icons/true.svg" class="service-icon" alt="支持" />
                        自提
                      </span>
                      <span class="service-badge supported" title="赛盈平台上价格都是已包含运费的非偏远���包邮价格">
                        <img loading="lazy" src="/images/icons/true.svg" class="service-icon" alt="支持" />
                        包邮
                      </span>
                      <span class="service-badge supported">
                        <img loading="lazy" src="/images/icons/true.svg" class="service-icon" alt="支持" />
                        签名服务
                      </span>
                      <span class="service-badge supported" title="此商品支持保障服��">
                        <img loading="lazy" src="/images/icons/true.svg" class="service-icon" alt="支持" />
                        保障服务
                      </span>
                    </div>
                  </li>
                </ul>

                <!-- 发��信息区域 -->
                <div class="details-list-secondary-wrapper">
                  <ul class="details-list-secondary">
                    <li class="list-item">
                      <span class="item-label">发货区域：</span>
                      <div class="item-content">
                        <div class="region-tags">
                          <em v-for="region in (product?.shippingRegions || shippingRegions)" :key="region.code" class="region-code">{{ region.code }}</em>
                        </div>
                      </div>
                    </li>

                    <li class="list-item">
                      <span class="item-label">发货物流：</span>
                      <div class="item-content">
                        <div class="logistics-select">
                          <select class="select-dropdown">
                            <option v-for="method in (product?.shippingMethods || shippingMethods)" :key="method.id" :value="method.id">{{ method.label }}</option>
                          </select>
                          <span class="shipping-time">��考时效：5-7天</span>
                        </div>
                      </div>
                    </li>

                    <li class="list-item">
                      <span class="item-label">请选择数量：</span>
                      <div class="item-content">
                        <div class="quantity-control" role="group" aria-label="数量选择">
                          <em class="quantity-btn" @click="decreaseQty" aria-label="减少数量">-</em>
                          <input
                            type="number"
                            class="quantity-input"
                            v-model.number="quantity"
                            min="1"
                            aria-label="数量"
                          />
                          <em class="quantity-btn" @click="increaseQty" aria-label="增加数量">+</em>
                        </div>
                        <i class="stock-info">库存数量：<em class="stock-value">{{ product?.stock || stockInfo.quantity }}</em></i>
                      </div>
                    </li>

                    <li class="list-item hidden">
                      <span class="item-label">期望价格<div class="price-help"><img loading="lazy" src="/images/icons/insurance.svg" class="help-icon" alt="���助" /><div class="help-tooltip">报��供应商一个您期望��单商品不含运费的批发单价，运费由供应商统一报价，在此不可询价。</div></div>：</span>
                      <div class="price-input-wrapper">
                        <div class="currency-input">
                          <span class="currency">USD</span>
                          <input type="text" placeholder="选填" class="price-input" />
                        </div>
                        <i class="price-note">期望单价不含运费，运费由供应商报价；参考代发价(含运费)：<em class="price-value">0</em></i>
                      </div>
                    </li>

                    <li class="list-item hidden">
                      <span class="item-label">期望数量：</span>
                      <div class="item-content">
                        <div class="quantity-control">
                          <em class="quantity-btn">--</em>
                          <input type="text" placeholder="必填" value="0" class="quantity-input" />
                          <em class="quantity-btn">+</em>
                        </div>
                        <i class="stock-info">可售库存：<em class="stock-value">0</em></i>
                        <i class="stock-info">建议起订量：<em class="stock-value">0</em></i>
                        <i class="stock-info">预估托盘数：<em class="stock-value">0</em></i>
                      </div>
                    </li>
                  </ul>
                </div>

                <!-- 操作按钮组 -->
                <div class="action-buttons-wrapper">
                  <div class="button-group-primary">
                    <button type="button" class="btn-orange" @click="openPaymentModal">立即购买</button>
                    <button type="button" class="btn-secondary">加入购物车</button>
                    <OneClickPublishButton @open="isPublishModalOpen = true" />
                    <button type="button" class="btn-favorite" title="加入收藏">
                      <img title="加入��藏" loading="lazy" src="/images/icons/collect.svg" class="btn-favorite-icon" alt="收藏" />
                    </button>
                  </div>

                  <div class="button-group-secondary">
                    <button type="button" class="btn-link-text btn-download">
                      <svg class="btn-download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      下载数据
                    </button>
                    <button type="button" class="btn-link-text btn-test-order" @click="showOrderStatus" title="查看订单状态">
                      订单状态测试
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 工厂直采Tab内容 -->
            <div v-show="activeTab === 'factory'" class="tab-content factory-content">
              <form class="factory-form">
                <ul class="form-list">
                  <li class="form-item">
                    <p class="form-label">
                      <span class="required-mark">*</span>
                      联系人姓名：
                    </p>
                    <div class="form-control">
                      <input type="text" name="fdName" placeholder="请输入联系人姓名" class="form-input" />
                    </div>
                  </li>
                  <li class="form-item">
                    <p class="form-label">
                      <span class="required-mark">*</span>
                      联系电话：
                    </p>
                    <div class="form-control">
                      <input type="text" name="fdPhone" placeholder="请输入联系电����" class="form-input" />
                    </div>
                  </li>
                  <li class="form-item">
                    <p class="form-label">
                      <span class="required-mark">*</span>
                      直采数量：
                    </p>
                    <div class="form-control">
                      <input type="text" name="fdQty" placeholder="请输入直采数量" class="form-input" />
                    </div>
                  </li>
                  <li class="form-item">
                    <p class="form-label">需求描述：</p>
                    <div class="form-control">
                      <textarea name="fdDesc" rows="4" class="form-textarea" placeholder="请输入需求描述"></textarea>
                    </div>
                  </li>
                  <li class="form-item">
                    <p class="form-label">附件：</p>
                    <div class="form-control">
                      <input type="hidden" name="fdAttaUrl" />
                      <button type="button" class="upload-btn">
                        上传
                      </button>
                      <input type="file" accept="image/jpg,image/png,image/jpeg,application/pdf,application/vnd.rar,application/zip,application/x-7z-compressed,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="file" class="file-input" style="display: none" />
                      <span class="file-tip">支持JPG、JPEG、PNG、PDF、EXCEL、WORD、RAR、ZIP、7z</span>
                    </div>
                  </li>
                  <li class="form-item">
                    <p class="form-label"></p>
                    <div class="form-control">
                      <button type="submit" class="submit-btn">确定</button>
                    </div>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts />
      <ProductDetailTabs />
    </main>

    <SiteFooter />
    <OneClickPublishModal
      :isOpen="isPublishModalOpen"
      :productId="product?.sku"
      @close="isPublishModalOpen = false"
      @publish="handlePublish"
    />
    <PaymentMethodModal
      :isOpen="isPaymentModalOpen"
      :productTitle="product?.title || ''"
      :quantity="quantity"
      :totalPrice="totalPrice"
      @close="isPaymentModalOpen = false"
      @confirm="handlePaymentConfirm"
    />
    <OrderStatusMonitor
      :isVisible="isOrderStatusOpen"
      :orderNo="currentOrderNo"
      @close="isOrderStatusOpen = false"
    />
  </div>
</template>

<style scoped>
.page {
  background-color: #f2f3f7;
}

.breadcrumb-wrapper {
  max-width: 1500px;
  min-width: 1200px;
  width: 80%;
  margin: 0 auto;
  background-color: #f2f3f7;
}

.important-notice-wrapper {
  max-width: 1500px;
  min-width: 1200px;
  width: 80%;
  margin: 0 auto;
}

.content-container {
  max-width: 1500px;
  min-width: 1200px;
  width: 80%;
  margin: 0 auto;
  background-color: #ffffff;
  display: flex;
  overflow: hidden;
}

/* 左侧商品图片��域 */
.product-section {
  flex: 0 0 500px;
  background-color: #ffffff;
}

.image-gallery-wrapper {
  position: relative;
  width: 500px;
}

.main-image-container {
  border: 1px solid #f1f1f1;
  height: 500px;
  overflow: hidden;
  position: relative;
  width: 500px;
}

.main-image {
  height: 500px;
  left: 50%;
  margin-left: -250px;
  position: absolute;
  vertical-align: middle;
  width: 500px;
  object-fit: cover;
}

.no-image-placeholder {
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #999;
}

.image-overlay {
  background-color: rgba(255, 255, 255, 0.5);
  display: none;
  height: 250px;
  position: absolute;
  width: 250px;
}

.thumbnail-navigation {
  overflow: visible;
  padding: 0;
  position: relative;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 0;
}

.nav-arrows {
  display: none;
}

.arrow-left {
  display: none;
}

.arrow-right {
  display: none;
}

.thumbnails-wrapper {
  overflow: visible;
  position: relative;
  padding: 0;
  flex: 1;
}

.thumbnail-scroll-container {
  display: grid;
  grid-template-columns: repeat(5, 88px);
  gap: 12px;
  position: relative;
  transform: none !important;
  width: fit-content;
  margin: 0 auto;
  list-style: none;
  padding: 0;
}

.thumbnail-item {
  cursor: pointer;
  width: 88px;
  height: 88px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.thumbnail-image-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 1px;
  text-align: center;
  border: 1px solid #ddd;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.thumbnail-image-wrapper:hover {
  border-color: #ff6600;
}

.thumbnail-image-wrapper.active {
  border-color: #ff6600;
}

.thumbnail-image {
  cursor: pointer;
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
}

.large-preview {
  background-color: #ffffff;
  border: 1px solid #f1f1f1;
  display: none;
  height: 500px;
  position: absolute;
  right: -100.5%;
  top: 0;
  width: 500px;
  z-index: 9999;
  overflow: hidden;
}

.large-preview-image {
  height: 1000px;
  width: 1000px;
  object-fit: cover;
}

/* ��侧商品详情区域 */
.product-details-section {
  padding: 0 20px 20px;
  vertical-align: top;
  width: calc(100% - 500px);
}

.warning-banner {
  background-color: #fff7f6;
  display: none;
  margin-top: 20px;
  padding: 13px;
  border-radius: 4px;
}

.warning-icon {
  display: inline-block;
  height: 19px;
  margin-right: 11px;
  vertical-align: middle;
}

.warning-text {
  color: #cb261c;
  line-height: 20px;
  margin: 0;
}

.product-info-wrapper {
  width: 100%;
}

/* 商品标题信息 */
.product-header {
  width: 100%;
}

.product-title {
  color: #000;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  padding: 20px 0 5px 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-text {
  display: inline;
  font-weight: 700;
}

.product-subtitle {
  color: #999;
  line-height: 24px;
  margin: 0 0 10px 0;
  font-size: 14px;
}

.sku-info {
  color: #cb261c;
  display: inline-block;
  font-weight: 700;
  margin-bottom: 10px;
  margin-right: 20px;
  font-size: 13px;
}

.spu-info {
  display: inline;
  margin-right: 20px;
  font-size: 13px;
  color: #666;
}

.publish-date {
  display: inline;
  font-size: 13px;
  color: #666;
}

/* 商品标签/Tab菜单 */
.product-tags {
  width: 100%;
  margin-top: 10px;
}

.tags-list {
  align-items: center;
  background-color: #f5f5f5;
  display: flex;
  height: 52px;
  margin: 10px 0;
  padding: 0;
  list-style: none;
  gap: 0;
  justify-content: flex-start;
}

.tag-dropship,
.tag-direct {
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 44px;
  min-width: 118px;
  padding: 0 27px;
  text-align: center;
  margin: 0;
  list-style: none;
  border-top: 4px solid #f5f5f5;
  color: #333;
  transition: all 0.3s;
}

.tag-dropship {
  background-color: #fff;
}

.tag-direct {
  background-color: transparent;
}

.tag-dropship.active,
.tag-direct.active {
  background-color: #fff;
  border-top-color: #cb261c;
  color: #cb261c;
}

/* Tab内容 */
.tab-content {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 工厂直采表单样式 */
.factory-form {
  margin-top: 20px;
}

.form-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.form-item {
  display: flex;
  margin-bottom: 16px;
}

.form-label {
  line-height: 38px;
  width: 180px;
  margin: 0;
  font-weight: 500;
  color: #333;
}

.required-mark {
  color: #ff0000;
  margin-right: 4px;
}

.form-control {
  flex: 1;
  max-width: calc(100% - 180px);
}

.form-input,
.form-textarea {
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 2px;
  padding: 6px 10px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-input {
  height: 38px;
  line-height: 26px;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
  line-height: 20px;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #cb261c;
}

.upload-btn {
  background-color: #fff;
  border: 1px solid #c9c9c9;
  border-radius: 2px;
  color: #555;
  cursor: pointer;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 18px;
  text-align: center;
  transition: all 0.3s;
  font-size: 14px;
}

.upload-btn:hover {
  border-color: #999;
  background-color: #f5f5f5;
}

.file-input {
  display: none !important;
}

.file-tip {
  display: block;
  color: #999;
  font-size: 12px;
  margin-top: 8px;
  line-height: 1.5;
}

.submit-btn {
  background-color: #cb261c;
  border: none;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 18px;
  text-align: center;
  transition: background-color 0.3s;
  font-size: 14px;
  font-weight: 600;
}

.submit-btn:hover {
  background-color: #b01f15;
}

/* 价���与折扣区域 */
.product-pricing-section {
  width: 100%;
  margin-top: 10px;
}

.price-display {
  background-color: #fffbfb;
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.price-amount {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
}

.price-value {
  color: #cb261c;
  font-weight: 700;
  font-size: 24px;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 16px;
}

.member-discount-box {
  background-color: #fffbfb;
  border: 1px solid #ffeaea;
  border-radius: 4px;
  height: 44px;
  margin-bottom: 16px;
  padding: 0 15px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.member-level {
  display: inline-block;
  font-size: 16px;
  line-height: 44px;
  width: auto;
  margin: 0;
}

.discount-text {
  display: inline;
  line-height: 44px;
  font-size: 13px;
  color: #666;
}

.member-link {
  color: #cb261c;
  position: absolute;
  right: 20px;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 13px;
}

.member-link:hover {
  color: #b01f15;
}

/* 批发说���区域 */
.wholesale-section {
  display: none;
  margin-bottom: 20px;
}

.wholesale-content {
  background-color: #ffffff;
  border: 2px solid #e6e6e6;
  padding: 24px;
  border-radius: 4px;
}

.section-title {
  color: #000;
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 16px 0;
  font-weight: 600;
}

.section-description {
  color: #999;
  line-height: 20px;
  margin-bottom: 24px;
  font-size: 14px;
}

.workflow-image {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 20px;
}

.button-group {
  margin-top: 20px;
}

.btn-primary {
  background-color: #cb261c;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  height: 38px;
  line-height: 38px;
  margin-right: 24px;
  padding: 0 18px;
  text-align: center;
  border: none;
  border-radius: 2px;
  transition: background-color 0.3s;
  font-size: 14px;
}

.button-group .help-link {
  color: #cb261c;
  text-decoration: none;
  transition: color 0.3s;
  line-height: 38px;
  font-size: 14px;
}

/* 商品详情列表 */
.product-details-list {
  padding-left: 0;
  margin-top: 20px;
}

.details-list-primary {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  display: table;
  width: 100%;
  line-height: 30px;
  margin-bottom: 16px;
}

.list-item-hidden {
  display: none;
}

.item-label {
  display: table-cell;
  line-height: 1.5;
  vertical-align: middle;
  width: 150px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

.item-content {
  display: table-cell;
  vertical-align: middle;
  width: calc(100% - 150px);
  line-height: 1.5;
}

.item-services {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  line-height: 40px;
}

.coupon-badge {
  background-color: #ffededed;
  border: 1px solid #db1200;
  border-radius: 2px;
  color: #cb261c;
  display: inline-flex;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  align-items: center;
  font-size: 13px;
  margin-bottom: 8px;
}

.service-badge {
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #26bc00;
  border-radius: 3px;
  color: #26bc00;
  cursor: pointer;
  display: inline-flex;
  height: 24px;
  line-height: 24px;
  padding: 0 4px;
  position: relative;
  font-size: 13px;
  gap: 4px;
}

.service-badge.unsupported {
  border-color: #eb7e38;
  color: #eb7e38;
}

.service-icon {
  display: inline-block;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

/* 发货信息区域 */
.details-list-secondary-wrapper {
  margin-top: 20px;
}

.details-list-secondary {
  list-style: none;
  margin: 0;
  padding: 0;
}

.region-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.region-code {
  background-color: #ffededed;
  border: 1px solid #cb261c;
  border-radius: 3px;
  color: #cb261c;
  cursor: pointer;
  display: inline-table;
  line-height: 28px;
  padding: 0 10px;
  font-size: 13px;
}

.logistics-select {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.select-dropdown {
  appearance: auto;
  background-color: #ffffff;
  border: 1px solid #d5d5d5;
  cursor: default;
  display: inline-block;
  height: 34px;
  padding: 0 5px;
  width: 220px;
  font-size: 13px;
}

.shipping-time {
  display: inline;
  color: #666;
  font-size: 13px;
  white-space: nowrap;
}

/* 数量和���格控制 */
.list-item.hidden {
  display: none;
}

.quantity-control {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: inline-table;
  line-height: 24px;
}

.quantity-btn {
  color: #ccc;
  cursor: pointer;
  display: inline-table;
  font-family: arial;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  width: 26px;
}

.quantity-input {
  appearance: textfield;
  -moz-appearance: textfield;
  background-color: transparent;
  border: none;
  border-radius: 0;
  color: #333;
  cursor: text;
  display: inline-block;
  height: 34px;
  padding: 0;
  text-align: center;
  outline: none;
  box-shadow: none;
  width: 44px;
  font-size: 13px;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.stock-info {
  color: #999;
  display: inline;
  line-height: 1.5;
  padding-left: 10px;
  vertical-align: middle;
  font-size: 13px;
}

.stock-value {
  display: inline;
}

.price-help {
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-left: 5px;
}

.help-icon {
  cursor: pointer;
  display: inline-block;
  filter: grayscale(1);
  vertical-align: middle;
  width: 18px;
  height: 18px;
}

.help-tooltip {
  background-color: #4e4e4e;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 7px;
  color: #ffffff;
  display: none;
  left: -10px;
  padding: 5px;
  position: absolute;
  top: 25px;
  width: 200px;
  z-index: 9;
  font-size: 12px;
  line-height: 20px;
}

.price-input-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.currency-input {
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  display: flex;
  line-height: 30px;
  padding: 0 8px;
  width: 150px;
  gap: 6px;
}

.currency {
  color: #999;
  font-size: 13px;
  white-space: nowrap;
}

.price-input {
  appearance: auto;
  background-color: #fff;
  border: none;
  border-radius: 2px;
  cursor: text;
  height: 34px;
  padding: 3px 5px;
  text-align: left;
  width: 94px;
  font-size: 13px;
  flex: 1;
}

.price-note {
  color: #999;
  font-size: 13px;
  line-height: 40px;
}

.price-value {
  color: #cb261c;
  font-weight: 700;
}

/* 操作按钮 */
.action-buttons-wrapper {
  margin-top: 30px;
}

.button-group-primary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
}

.btn-secondary {
  appearance: auto;
  background-color: #cb261c;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  text-align: center;
  transition: background-color 0.3s;
  font-size: 14px;
  white-space: nowrap;
  min-width: 150px;
}

.btn-secondary:hover {
  background-color: #b01f15;
}

.btn-orange {
  align-items: center;
  appearance: auto;
  background-color: #ff6f00;
  border: none;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  justify-content: center;
  line-height: 40px;
  padding: 0 18px;
  text-align: center;
  transition: background-color 0.3s;
  font-size: 14px;
  white-space: nowrap;
}

.btn-orange:hover {
  background-color: #e55d00;
}

.btn-publish {
  appearance: auto;
  background-color: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  cursor: pointer;
  display: inline-flex;
  height: 40px;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  text-align: center;
  transition: all 0.3s;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
}

.btn-publish:hover {
  border-color: #999;
  background-color: #f5f5f5;
}

.btn-publish-icon {
  cursor: pointer;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.btn-favorite {
  appearance: auto;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  padding: 0;
  text-align: center;
  transition: all 0.3s;
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-favorite:hover {
  border-color: #999;
}

.btn-favorite-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.button-group-secondary {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 24px;
}

.btn-link-text {
  appearance: auto;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  height: 34px;
  line-height: 34px;
  padding: 0;
  text-align: center;
  transition: color 0.3s;
  color: #666;
  font-size: 14px;
}

.btn-link-text:hover {
  color: #999;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-download-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  transition: color 0.3s;
}

.btn-download:hover {
  color: #8B0000;
}

.btn-download:hover .btn-download-icon {
  color: #8B0000;
}

.btn-link-feedback {
  appearance: auto;
  background-color: transparent;
  border: none;
  color: #cb261c;
  cursor: pointer;
  display: inline-flex;
  height: 34px;
  line-height: 34px;
  padding: 0;
  text-align: center;
  transition: color 0.3s;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.btn-link-feedback:hover {
  color: #b01f15;
}

.btn-link-icon {
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}


/* 响应��调整 */
@media (max-width: 1200px) {
  .content-container,
  .breadcrumb-wrapper,
  .important-notice-wrapper {
    width: 95%;
  }
}

@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .product-section {
    flex: 1 1 auto;
  }

  .product-details-section {
    width: 100%;
  }

  .tags-list {
    flex-direction: column;
    height: auto;
  }

  .tag-dropship,
  .tag-direct {
    width: 100%;
  }

  .form-item {
    flex-direction: column;
  }

  .form-label {
    width: 100%;
    margin-bottom: 8px;
  }

  .form-control {
    width: 100%;
    max-width: 100%;
  }
}
</style>
