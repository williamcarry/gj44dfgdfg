/**
 * ============================================
 * 商品详情页面 Mock API
 * ============================================
 * 
 * 包含商品详情、图片、物流、支付等所有必要数据
 * 商品状态必须是 'approved'
 * 后端对接时只需修改 API_BASE_URL 和数据源
 */

// API 基础配置
export const API_BASE_URL = 'http://localhost:3000/api'
// 后端对接时修改为: export const API_BASE_URL = 'https://your-backend.com/api'

// ============================================
// 图片数据库（所有可用的示例图片）
// ============================================
export const mockImages = [
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/5b1487bd-c161-4a8b-9a8b-5b07c7199fd2.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202102/43f9078f-e24d-47c7-8f53-a743e042bc5f.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202209/5bc737f9-f9fa-43eb-af41-2e2f8ad91065.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202405/c103f36e-c3d1-4716-bd72-28327d48a024.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202401/bca2859e-1cf0-4ce1-9879-5b9aaf68109b.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202309/2a764166-da43-45a1-9fba-ceea6243b6b7.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202501/8829a6ab-0a10-4349-a506-12835c30c872.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202506/89c6cc05-8416-491e-8b0e-3fde8a318f0e.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202308/9edd9fdd-b8ca-4750-8c74-6180331317f0.jpg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2025/202508/7656a659-2d14-4c49-a355-c45b0ae7edf8.Jpeg'
]

// ============================================
// 工具函数：获取随机图片
// ============================================
export function getRandomImages(count = 6) {
  const shuffled = [...mockImages].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count).map((url, idx) => ({
    id: idx,
    url,
    alt: `Product Image ${idx + 1}`
  }))
}

// ============================================
// 物流信息数据
// ============================================
export const logisticsData = [
  {
    id: 1,
    region: 'US',
    warehouse: 'NJ Fieldsboro',
    standardShipping: {
      price: 89.0,
      currency: 'USD'
    },
    selfPickup: {
      price: 78.2,
      currency: 'USD'
    },
    carriers: ['FedEx', 'USPS', 'UPS'],
    address: 'C/O 1170 Florence Gate (102-125) Columbus Rd, Fieldsboro, NJ 08505, USA'
  },
  {
    id: 2,
    region: 'CA',
    warehouse: 'Vancouver',
    standardShipping: {
      price: 95.0,
      currency: 'USD'
    },
    selfPickup: {
      price: 85.0,
      currency: 'USD'
    },
    carriers: ['FedEx', 'DHL'],
    address: 'Unit 100, 8285 Macpherson Ave, Burnaby, BC V5J 4K2, Canada'
  },
  {
    id: 3,
    region: 'EU',
    warehouse: 'Netherlands',
    standardShipping: {
      price: 120.0,
      currency: 'USD'
    },
    selfPickup: {
      price: 105.0,
      currency: 'USD'
    },
    carriers: ['DHL', 'FedEx', 'UPS'],
    address: 'Logistieke Werkplaats 27, Zaandam 1544 RJ, Netherlands'
  }
]

// ============================================
// 相关商品推荐数据
// ============================================
export const relatedProductsList = [
  {
    id: 501,
    title: '防晒霜 SPF30+ PA+++',
    titleEn: 'Sunscreen SPF30+ PA++++',
    thumbnailImage: mockImages[0],
    sales: 1250
  },
  {
    id: 502,
    title: '防晒喷雾',
    titleEn: 'Sunscreen Spray',
    thumbnailImage: mockImages[1],
    sales: 980
  },
  {
    id: 503,
    title: '身体防晒乳液',
    titleEn: 'Body Sunscreen Lotion',
    thumbnailImage: mockImages[2],
    sales: 850
  },
  {
    id: 504,
    title: '儿童防晒霜',
    titleEn: 'Kids Sunscreen',
    thumbnailImage: mockImages[3],
    sales: 720
  },
  {
    id: 505,
    title: '面部防晒隔离霜',
    titleEn: 'Face Sunscreen Primer',
    thumbnailImage: mockImages[4],
    sales: 650
  },
  {
    id: 506,
    title: '防晒卸妆乳',
    titleEn: 'Sunscreen Makeup Remover',
    thumbnailImage: mockImages[5],
    sales: 540
  }
]

// ============================================
// 发货区域选项
// ============================================
export const shippingRegions = [
  { code: 'US', label: 'US' },
  { code: 'UK', label: 'UK' },
  { code: 'FR', label: 'FR' }
]

// ============================================
// 发货物流选项
// ============================================
export const shippingMethods = [
  {
    id: 363,
    label: 'Standard Shipping',
    estimatedTime: '5-7天'
  },
  {
    id: 375,
    label: 'Self-Pick up',
    estimatedTime: '5-7天'
  }
]

// ============================================
// 服务支持标志
// ============================================
export const serviceSupport = {
  circleGroupBuy: false, // 是否支持圈货拼购
  selfPickup: true, // 是否支持自提
  freeShipping: true, // 是否包邮
  signatureService: true, // 是否支持签名服务
  guaranteeService: true // 是否支持保障服务
}

// ============================================
// 采购券信息
// ============================================
export const couponInfo = {
  enabled: true,
  label: '满USD25.00减USD1.00'
}

// ============================================
// 仓库信息
// ============================================
export const warehouseInfo = {
  type: 'SY认证仓（第三方仓发货）'
}

// ============================================
// 库存信息
// ============================================
export const stockInfo = {
  quantity: 18,
  recommendedOrderQuantity: 1
}

// ============================================
// 价格常量
// ============================================
export const PRICE_CONFIG = {
  dropshipPrice: 78.20,
  currency: 'USD'
}

// ============================================
// 物流和支付信息
// ============================================
export const logisticsPaymentInfo = {
  id: 1,
  content: `
    <h3>物流信息</h3>
    <p>我们与多家国际物流公司合作，提供快速安全的配送服务。</p>
    <ul>
      <li><strong>标准配送：</strong>通常需要 7-15 个工作日</li>
      <li><strong>自提服务：</strong>支持美国、加拿大、欧洲等地的自提点取货</li>
      <li><strong>追踪服务：</strong>提供实时物流追踪</li>
    </ul>

    <h3>支付信息</h3>
    <p>我们支持多种安全的支付方式：</p>
    <ul>
      <li>信用卡（Visa、MasterCard、American Express）</li>
      <li>PayPal</li>
      <li>银行转账</li>
      <li>支付宝</li>
      <li>微信支付</li>
    </ul>

    <h3>退款政策</h3>
    <p>30 天无条件退款保证，如对产品不满意可申请退款。</p>
  `,
  contentEN: `
    <h3>Logistics Information</h3>
    <p>We partner with leading international logistics companies to provide fast and secure shipping services.</p>
    <ul>
      <li><strong>Standard Shipping:</strong> Usually takes 7-15 business days</li>
      <li><strong>Self-Pickup Service:</strong> Available at pickup points in the US, Canada, Europe, and more</li>
      <li><strong>Tracking Service:</strong> Real-time logistics tracking provided</li>
    </ul>

    <h3>Payment Information</h3>
    <p>We support multiple secure payment methods:</p>
    <ul>
      <li>Credit Cards (Visa, MasterCard, American Express)</li>
      <li>PayPal</li>
      <li>Bank Transfer</li>
      <li>Alipay</li>
      <li>WeChat Pay</li>
    </ul>

    <h3>Refund Policy</h3>
    <p>30-day money-back guarantee. If you're not satisfied with the product, you can request a refund.</p>
  `
}

// ============================================
// 创建 Mock 商品对象
// ============================================
/**
 * 生成单个商品的 Mock 数据
 * 用于当真实数据不存在时显示默认数据
 * 包含 ItemDetailPage.vue 中的所有硬编码字段
 */
export function createMockProduct(id) {
  const images = getRandomImages(6)
  return {
    id,
    status: 'approved',
    sku: `SKU-${id}`,
    spu: `SPU-${id}`,
    title: `Product ${id}`,
    titleEn: `Product ${id}`,
    mainImage: images[0].url,
    images,
    publishDate: new Date().toISOString().split('T')[0],
    stock: stockInfo.quantity,
    currency: PRICE_CONFIG.currency,
    originalPrice: PRICE_CONFIG.dropshipPrice.toString(),
    sellingPrice: PRICE_CONFIG.dropshipPrice.toString(),
    basePrice: PRICE_CONFIG.dropshipPrice,
    enableDiscount: couponInfo.enabled,
    coupon: couponInfo.label,
    warehouseType: warehouseInfo.type,
    supportDropship: 1,
    supportWholesale: 1,
    supportCircle_buy: serviceSupport.circleGroupBuy ? 1 : 0,
    supportSelf_pickup: serviceSupport.selfPickup ? 1 : 0,
    supportFreeShipping: serviceSupport.freeShipping ? 1 : 0,
    supportSignatureService: serviceSupport.signatureService ? 1 : 0,
    supportGuaranteeService: serviceSupport.guaranteeService ? 1 : 0,
    length: 20,
    width: 15,
    height: 8,
    weight: 300,
    richContent: '<p>这是一个 Mock 商品，包含所有必要的商品信息。</p>',
    shippingAddress: '广东省深圳市龙华区华强北路 1000 号',
    returnAddress: '广东省深圳市龙华区华强北路 1000 号',
    shippingRegion: logisticsData,
    shippingRegions: shippingRegions,
    shippingMethods: shippingMethods,
    serviceSupport: serviceSupport,
    relatedProducts: []
  }
}

// ============================================
// API: 获取商品详情
// ============================================
/**
 * 获取商品完整详情信息
 * 包含 ItemDetailPage.vue 所需的所有字段
 * 
 * 参数:
 * - productId: 商品 ID（必填）
 * 
 * 返回:
 * {
 *   success: boolean,
 *   data: {
 *     id: 商品 ID,
 *     status: 商品状态（'approved'），
 *     sku: SKU 码,
 *     spu: SPU 码,
 *     title: 商品标题（中文）,
 *     titleEn: 商品标题（英文）,
 *     stock: 库存数量,
 *     currency: 货币单位,
 *     originalPrice: 原价（字符串格式）,
 *     sellingPrice: 售价（字符串格式）,
 *     basePrice: 基础价格（数字格式）,
 *     mainImage: 主图 URL,
 *     images: [{ id, url, alt }],
 *     publishDate: 首次上架日期,
 *     enableDiscount: 是否启用折扣,
 *     coupon: 采购券文本,
 *     warehouseType: 仓库类型,
 *     supportDropship: 是否支持一件代发,
 *     supportWholesale: 是否支持批发,
 *     supportCircle_buy: 是否支持圈货,
 *     supportSelf_pickup: 是否支持自提,
 *     supportFreeShipping: 是否包邮,
 *     supportSignatureService: 是否支持签名服务,
 *     supportGuaranteeService: 是否支持保障服务,
 *     shippingRegions: 发货区域列表,
 *     shippingMethods: 发货物流方法列表,
 *     serviceSupport: 服务支持对象,
 *     shippingRegion: 发货物流详情,
 *     shippingAddress: 发货地址（纯文本）,
 *     returnAddress: 退货地址（纯文本）,
 *     richContent: 商品详情富文本 HTML,
 *     relatedProducts: 相关商品推荐数组
 *   }
 * }
 */
export const getProductDetail = async (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 获取相关推荐商品（销量最高的 6 个）
      const relatedProducts = relatedProductsList
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 6)
        .map(product => ({
          id: product.id,
          title: product.title,
          titleEn: product.titleEn,
          thumbnailImage: product.thumbnailImage
        }))

      // 返回 Mock 商品数据
      const product = createMockProduct(productId)
      
      resolve({
        success: true,
        data: {
          ...product,
          relatedProducts
        }
      })
    }, 300)
  })
}

// ============================================
// 导出所有数据和函数
// ============================================
export default {
  getProductDetail,
  createMockProduct,
  getRandomImages,
  // 图片和物流数据
  mockImages,
  logisticsData,
  relatedProductsList,
  logisticsPaymentInfo,
  // ItemDetailPage 相关数据
  shippingRegions,
  shippingMethods,
  serviceSupport,
  couponInfo,
  warehouseInfo,
  stockInfo,
  PRICE_CONFIG
}
