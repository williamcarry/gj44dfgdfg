// ============================================
// Mock API 服务 - 数据格式标准化
// ============================================
// 后端只需修改 API_BASE_URL 即可切换到真实后端

export const API_BASE_URL = 'http://localhost:3000/api'
// 后端对接时修改为: export const API_BASE_URL = 'https://your-backend.com/api'

// ============================================
// 分类数据
// ============================================
export const categories = [
  {
    id: 1,
    title: '家居和家具',
    titleEn: 'Home & Furniture',
    children: [
      {
        id: 1,
        title: '家具',
        titleEn: 'Furniture',
        items: [
          { id: 1, title: '沙发', titleEn: 'Sofa' },
          { id: 2, title: '床', titleEn: 'Bed' },
          { id: 3, title: '餐桌', titleEn: 'Dining Table' }
        ]
      },
      {
        id: 2,
        title: '家居装饰',
        titleEn: 'Home Decor',
        items: [
          { id: 1, title: '壁画', titleEn: 'Wall Art' },
          { id: 2, title: '灯具', titleEn: 'Lighting' }
        ]
      },
      {
        id: 3,
        title: '厨房用品',
        titleEn: 'Kitchenware',
        items: [
          { id: 1, title: '刀具', titleEn: 'Knives' },
          { id: 2, title: '餐具', titleEn: 'Tableware' }
        ]
      },
      {
        id: 4,
        title: '卫浴用品',
        titleEn: 'Bathroom Supplies',
        items: [
          { id: 1, title: '浴室镜', titleEn: 'Bathroom Mirror' },
          { id: 2, title: '毛巾架', titleEn: 'Towel Rack' }
        ]
      },
      {
        id: 5,
        title: '床上用品',
        titleEn: 'Bedding',
        items: [
          { id: 1, title: '床单', titleEn: 'Bed Sheet' },
          { id: 2, title: '被套', titleEn: 'Duvet Cover' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '庭院和园艺',
    titleEn: 'Garden & Horticulture',
    children: [
      {
        id: 1,
        title: '园艺工具',
        titleEn: 'Gardening Tools',
        items: [
          { id: 1, title: '铲子', titleEn: 'Shovel' },
          { id: 2, title: '耙子', titleEn: 'Rake' }
        ]
      },
      {
        id: 2,
        title: '户外家居',
        titleEn: 'Outdoor Furniture',
        items: [
          { id: 1, title: '户外椅', titleEn: 'Outdoor Chair' },
          { id: 2, title: '户外桌', titleEn: 'Outdoor Table' }
        ]
      },
      {
        id: 3,
        title: '园艺饰品',
        titleEn: 'Garden Ornaments',
        items: [
          { id: 1, title: '花盆', titleEn: 'Flower Pot' },
          { id: 2, title: '雕像', titleEn: 'Statue' }
        ]
      },
      {
        id: 4,
        title: '户外照明',
        titleEn: 'Outdoor Lighting',
        items: [
          { id: 1, title: '太阳能灯', titleEn: 'Solar Light' },
          { id: 2, title: '吊灯', titleEn: 'Hanging Light' }
        ]
      },
      {
        id: 5,
        title: '植物养护',
        titleEn: 'Plant Care',
        items: [
          { id: 1, title: '肥料', titleEn: 'Fertilizer' },
          { id: 2, title: '药水', titleEn: 'Pesticide' }
        ]
      }
    ]
  }
]

// ============================================
// 商品数据生成器
// ============================================
// 生成足够的商品数据，包含所有必要字段

const generateMockProducts = () => {
  const baseImages = [
    'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/5b1487bd-c161-4a8b-9a8b-5b07c7199fd2.Jpeg',
    'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202102/43f9078f-e24d-47c7-8f53-a743e042bc5f.Jpeg',
    'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202209/5bc737f9-f9fa-43eb-af41-2e2f8ad91065.Jpeg',
    'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202405/c103f36e-c3d1-4716-bd72-28327d48a024.Jpeg',
    'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202401/bca2859e-1cf0-4ce1-9879-5b9aaf68109b.Jpeg',
  ]

  const products = [
    {
      id: 36,
      title: '儿童自行车 16 寸',
      titleEn: 'Children Bicycle 16-inch',
      thumbnailImage: baseImages[0],
      originalPrice: 299.0000,
      sellingPrice: 199.0000,
      currency: 'CNY',
      discountRate: 0.33,
      isLimited: 1,
      viewCount: 1250,
      categoryId: 1,
      subcategoryId: 1,
      itemId: 1,
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 37,
      title: '实木沙发套装',
      titleEn: 'Solid Wood Sofa Set',
      thumbnailImage: baseImages[1],
      originalPrice: 5999.0000,
      sellingPrice: 3999.0000,
      currency: 'CNY',
      discountRate: 0.33,
      isLimited: 0,
      viewCount: 2340,
      categoryId: 1,
      subcategoryId: 1,
      itemId: 1,
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 38,
      title: '北欧风格茶几',
      titleEn: 'Nordic Coffee Table',
      thumbnailImage: baseImages[2],
      originalPrice: 899.0000,
      sellingPrice: 699.0000,
      currency: 'CNY',
      discountRate: 0.22,
      isLimited: 1,
      viewCount: 1890,
      categoryId: 1,
      subcategoryId: 1,
      itemId: 1,
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 39,
      title: '欧式床头柜',
      titleEn: 'European Bedside Cabinet',
      thumbnailImage: baseImages[3],
      originalPrice: 799.0000,
      sellingPrice: 549.0000,
      currency: 'CNY',
      discountRate: 0.31,
      isLimited: 0,
      viewCount: 1567,
      categoryId: 1,
      subcategoryId: 1,
      itemId: 1,
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 40,
      title: '现代吊灯',
      titleEn: 'Modern Chandelier',
      thumbnailImage: baseImages[4],
      originalPrice: 599.0000,
      sellingPrice: 399.0000,
      currency: 'CNY',
      discountRate: 0.33,
      isLimited: 1,
      viewCount: 2100,
      categoryId: 1,
      subcategoryId: 2,
      itemId: 2,
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 41,
      title: '玻璃餐桌',
      titleEn: 'Glass Dining Table',
      thumbnailImage: baseImages[0],
      originalPrice: 1299.0000,
      sellingPrice: 849.0000,
      currency: 'CNY',
      discountRate: 0.35,
      isLimited: 0,
      viewCount: 1756,
      categoryId: 1,
      subcategoryId: 1,
      itemId: 1,
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 42,
      title: '厨房刀具套装',
      titleEn: 'Kitchen Knife Set',
      thumbnailImage: baseImages[1],
      originalPrice: 299.0000,
      sellingPrice: 199.0000,
      currency: 'CNY',
      discountRate: 0.33,
      isLimited: 1,
      viewCount: 2234,
      categoryId: 1,
      subcategoryId: 3,
      itemId: 3,
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 43,
      title: '陶瓷碗盘套装',
      titleEn: 'Ceramic Tableware Set',
      thumbnailImage: baseImages[2],
      originalPrice: 199.0000,
      sellingPrice: 129.0000,
      currency: 'CNY',
      discountRate: 0.35,
      isLimited: 0,
      viewCount: 1834,
      categoryId: 1,
      subcategoryId: 3,
      itemId: 3,
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 44,
      title: '浴室镜柜',
      titleEn: 'Bathroom Mirror Cabinet',
      thumbnailImage: baseImages[3],
      originalPrice: 499.0000,
      sellingPrice: 349.0000,
      currency: 'CNY',
      discountRate: 0.30,
      isLimited: 1,
      viewCount: 1423,
      categoryId: 1,
      subcategoryId: 4,
      itemId: 4,
      updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 45,
      title: '全棉床单套装',
      titleEn: 'Cotton Bedding Set',
      thumbnailImage: baseImages[4],
      originalPrice: 399.0000,
      sellingPrice: 279.0000,
      currency: 'CNY',
      discountRate: 0.30,
      isLimited: 0,
      viewCount: 2567,
      categoryId: 1,
      subcategoryId: 5,
      itemId: 5,
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 46,
      title: '园艺工具组合',
      titleEn: 'Garden Tool Set',
      thumbnailImage: baseImages[0],
      originalPrice: 299.0000,
      sellingPrice: 199.0000,
      currency: 'CNY',
      discountRate: 0.33,
      isLimited: 0,
      viewCount: 1678,
      categoryId: 2,
      subcategoryId: 1,
      itemId: 1,
      updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 47,
      title: '户外休闲椅',
      titleEn: 'Outdoor Lounge Chair',
      thumbnailImage: baseImages[1],
      originalPrice: 799.0000,
      sellingPrice: 549.0000,
      currency: 'CNY',
      discountRate: 0.31,
      isLimited: 1,
      viewCount: 1945,
      categoryId: 2,
      subcategoryId: 2,
      itemId: 2,
      updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 48,
      title: '装饰花盆',
      titleEn: 'Decorative Flower Pot',
      thumbnailImage: baseImages[2],
      originalPrice: 149.0000,
      sellingPrice: 99.0000,
      currency: 'CNY',
      discountRate: 0.33,
      isLimited: 0,
      viewCount: 1234,
      categoryId: 2,
      subcategoryId: 3,
      itemId: 3,
      updatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 49,
      title: '太阳能户外灯',
      titleEn: 'Solar Outdoor Light',
      thumbnailImage: baseImages[3],
      originalPrice: 199.0000,
      sellingPrice: 129.0000,
      currency: 'CNY',
      discountRate: 0.35,
      isLimited: 1,
      viewCount: 2089,
      categoryId: 2,
      subcategoryId: 4,
      itemId: 4,
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 50,
      title: '有机肥料',
      titleEn: 'Organic Fertilizer',
      thumbnailImage: baseImages[4],
      originalPrice: 79.0000,
      sellingPrice: 59.0000,
      currency: 'CNY',
      discountRate: 0.25,
      isLimited: 0,
      viewCount: 1456,
      categoryId: 2,
      subcategoryId: 5,
      itemId: 5,
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // 增加更多产品以支持分页和查询
  for (let i = 51; i <= 150; i++) {
    const categoryId = (i % 2) + 1
    const subcategoryId = ((i % 5) + 1)
    const itemId = ((i % 5) + 1)
    const imageIndex = (i - 51) % 5

    products.push({
      id: i,
      title: `商品 ${i}`,
      titleEn: `Product ${i}`,
      thumbnailImage: baseImages[imageIndex],
      originalPrice: parseFloat((100 + (i % 50) * 10).toFixed(4)),
      sellingPrice: parseFloat(((100 + (i % 50) * 10) * (1 - (i % 5) * 0.1)).toFixed(4)),
      currency: 'CNY',
      discountRate: (i % 5) * 0.1,
      isLimited: i % 3 === 0 ? 1 : 0,
      viewCount: Math.floor(Math.random() * 5000 + 500),
      categoryId,
      subcategoryId,
      itemId,
      updatedAt: new Date(Date.now() - (i % 30) * 24 * 60 * 60 * 1000).toISOString()
    })
  }

  return products
}

const mockProducts = generateMockProducts()

// ============================================
// API: 获取分类菜单
// ============================================
export const getCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: categories
      })
    }, 300)
  })
}

// ============================================
// API: 折扣专区 - 今日折扣
// ============================================
/**
 * 获取今日折扣商品
 * - 查找 discountRate > 0 的商品
 * - 按 updatedAt 排序（最近的时间���在最前面）
 * - 返回 12 个商品
 */
export const getTodayDiscounts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = mockProducts
        .filter(p => p.discountRate > 0)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 12)
        .map(product => ({
          id: product.id,
          title: product.title,
          titleEn: product.titleEn,
          thumbnailImage: product.thumbnailImage,
          currency: product.currency,
          originalPrice: product.originalPrice,
          sellingPrice: product.sellingPrice,
          updatedAt: product.updatedAt,
          discountRate: product.discountRate,
          viewCount: product.viewCount
        }))

      resolve({
        success: true,
        data: result
      })
    }, 300)
  })
}

// ============================================
// API: 折扣专区 - 限量供应
// ============================================
/**
 * 获取限量供应商品
 * - discountRate > 0 AND isLimited = 1
 * - 按 updatedAt 排序（最近的时间排在最前面）
 * - 排除 todayDiscounts 中的所有商品 ID
 * - 返回 6 个商品
 */
export const getLimitedSupplyProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todayDiscountIds = new Set(
        mockProducts
          .filter(p => p.discountRate > 0)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 12)
          .map(p => p.id)
      )

      const result = mockProducts
        .filter(p => p.discountRate > 0 && p.isLimited === 1 && !todayDiscountIds.has(p.id))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 6)
        .map(product => ({
          id: product.id,
          title: product.title,
          titleEn: product.titleEn,
          thumbnailImage: product.thumbnailImage,
          currency: product.currency,
          originalPrice: product.originalPrice,
          sellingPrice: product.sellingPrice,
          updatedAt: product.updatedAt,
          discountRate: product.discountRate,
          viewCount: product.viewCount
        }))

      resolve({
        success: true,
        data: result
      })
    }, 300)
  })
}

// ============================================
// API: 折扣专区 - 新品特惠
// ============================================
/**
 * 获取新品特惠商品
 * - discountRate > 0
 * - 按 updatedAt 排序（最近的时间排在最前面）
 * - 排除 todayDiscounts 和 limitedSupplyProducts 中的所有商品 ID
 * - 返回 6 个商品
 */
export const getNewLaunchDiscounts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todayDiscountIds = new Set(
        mockProducts
          .filter(p => p.discountRate > 0)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 12)
          .map(p => p.id)
      )

      const limitedSupplyIds = new Set(
        mockProducts
          .filter(p => p.discountRate > 0 && p.isLimited === 1 && !todayDiscountIds.has(p.id))
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 6)
          .map(p => p.id)
      )

      const excludedIds = new Set([...todayDiscountIds, ...limitedSupplyIds])

      const result = mockProducts
        .filter(p => p.discountRate > 0 && !excludedIds.has(p.id))
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 6)
        .map(product => ({
          id: product.id,
          title: product.title,
          titleEn: product.titleEn,
          thumbnailImage: product.thumbnailImage,
          currency: product.currency,
          originalPrice: product.originalPrice,
          sellingPrice: product.sellingPrice,
          updatedAt: product.updatedAt,
          discountRate: product.discountRate,
          viewCount: product.viewCount
        }))

      resolve({
        success: true,
        data: result
      })
    }, 300)
  })
}

// ============================================
// API: 折扣专区 - 商品列表（带分页和筛选）
// ============================================
/**
 * 获取折扣商品��表
 * 
 * 参数:
 * - page: 页码（从 1 开始）
 * - pageSize: 每页数量（默认 20）
 * - categoryId: 一级分类 ID
 * - subcategoryId: 二级分类 ID
 * - itemId: 三级分类 ID
 * - discountRange: 折扣范��
 *   * 'all': discountRate > 0
 *   * '0.01-0.1': 1%-10% 折扣
 *   * '0.1-0.2': 10%-20% 折扣
 *   * '0.2-0.5': 20%-50% 折扣
 *   * '0.5-1': 50% 以上折扣
 * - priceMin: 最低价格
 * - priceMax: 最高价格
 * - sortBy: 排序方式
 *   * 'viewCount': 按浏览次数排序（从大到小）
 *   * 'discount': 按折扣率排序（从大到小）
 *   * 'price-asc': 按价格从小到大
 *   * 'price-desc': 按价格从大到小
 * 
 * 返回:
 * {
 *   success: boolean,
 *   data: {
 *     products: [商品列表],
 *     pagination: {
 *       page: 当前页码,
 *       pageSize: 每页数量,
 *       total: 总商品数,
 *       totalPages: 总页数
 *     }
 *   }
 * }
 */
export const getDiscountProducts = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const {
        page = 1,
        pageSize = 20,
        categoryId = null,
        subcategoryId = null,
        itemId = null,
        discountRange = 'all',
        priceMin = null,
        priceMax = null,
        sortBy = 'viewCount'
      } = params

      // 步骤 1: 过滤折扣率
      let filtered = mockProducts.filter(p => p.discountRate > 0)

      // 步骤 2: 按折扣范围过滤 (discountRate 是百分比, 如 0.33 = 33%)
      if (discountRange === '0.01-0.1') {
        filtered = filtered.filter(p => p.discountRate >= 0.01 && p.discountRate < 0.1)
      } else if (discountRange === '0.1-0.2') {
        filtered = filtered.filter(p => p.discountRate >= 0.1 && p.discountRate < 0.2)
      } else if (discountRange === '0.2-0.5') {
        filtered = filtered.filter(p => p.discountRate >= 0.2 && p.discountRate < 0.5)
      } else if (discountRange === '0.5-1') {
        filtered = filtered.filter(p => p.discountRate >= 0.5 && p.discountRate <= 1)
      }

      // 步骤 3: 按分类过滤
      if (categoryId !== null) {
        filtered = filtered.filter(p => p.categoryId === categoryId)
      }
      if (subcategoryId !== null) {
        filtered = filtered.filter(p => p.subcategoryId === subcategoryId)
      }
      if (itemId !== null) {
        filtered = filtered.filter(p => p.itemId === itemId)
      }

      // 步骤 4: 按价格过滤
      if (priceMin !== null) {
        filtered = filtered.filter(p => p.sellingPrice >= priceMin)
      }
      if (priceMax !== null) {
        filtered = filtered.filter(p => p.sellingPrice <= priceMax)
      }

      // 步骤 5: 排序
      if (sortBy === 'viewCount') {
        filtered.sort((a, b) => b.viewCount - a.viewCount)
      } else if (sortBy === 'discount') {
        filtered.sort((a, b) => b.discountRate - a.discountRate)
      } else if (sortBy === 'price-asc') {
        filtered.sort((a, b) => a.sellingPrice - b.sellingPrice)
      } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => b.sellingPrice - a.sellingPrice)
      }

      // 步骤 6: 分页
      const total = filtered.length
      const totalPages = Math.ceil(total / pageSize)
      const start = (page - 1) * pageSize
      const products = filtered.slice(start, start + pageSize).map(product => ({
        id: product.id,
        title: product.title,
        titleEn: product.titleEn,
        thumbnailImage: product.thumbnailImage,
        currency: product.currency,
        originalPrice: product.originalPrice,
        sellingPrice: product.sellingPrice,
        discountRate: product.discountRate,
        viewCount: product.viewCount,
        categoryId: product.categoryId
      }))

      resolve({
        success: true,
        data: {
          products,
          pagination: {
            page,
            pageSize,
            total,
            totalPages
          }
        }
      })
    }, 300)
  })
}

// ============================================
// 旧的 API 方法（保留向后兼容）
// ============================================

export const getHotRankings = async (categoryId = null, subcategoryId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockProducts

      if (categoryId !== null) {
        filtered = filtered.filter(p => p.categoryId === categoryId)
      }
      if (subcategoryId !== null) {
        filtered = filtered.filter(p => p.subcategoryId === subcategoryId)
      }

      const sorted = filtered.sort((a, b) => b.viewCount - a.viewCount)

      resolve({
        success: true,
        data: sorted.map(item => ({
          ...item,
          heat: item.viewCount,
          price: `${item.currency} ${item.sellingPrice.toFixed(2)}`
        }))
      })
    }, 300)
  })
}

export const getFavoriteRankings = async (categoryId = null, subcategoryId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockProducts

      if (categoryId !== null) {
        filtered = filtered.filter(p => p.categoryId === categoryId)
      }
      if (subcategoryId !== null) {
        filtered = filtered.filter(p => p.subcategoryId === subcategoryId)
      }

      const sorted = filtered.sort((a, b) => b.viewCount - a.viewCount)

      resolve({
        success: true,
        data: sorted.map(item => ({
          ...item,
          heat: item.viewCount,
          price: `${item.currency} ${item.sellingPrice.toFixed(2)}`
        }))
      })
    }, 300)
  })
}

export const getDownloadRankings = async (categoryId = null, subcategoryId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockProducts

      if (categoryId !== null) {
        filtered = filtered.filter(p => p.categoryId === categoryId)
      }
      if (subcategoryId !== null) {
        filtered = filtered.filter(p => p.subcategoryId === subcategoryId)
      }

      const sorted = filtered.sort((a, b) => b.viewCount - a.viewCount)

      resolve({
        success: true,
        data: sorted.map(item => ({
          ...item,
          heat: item.viewCount,
          price: `${item.currency} ${item.sellingPrice.toFixed(2)}`
        }))
      })
    }, 300)
  })
}

export const getPublishRankings = async (categoryId = null, subcategoryId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockProducts

      if (categoryId !== null) {
        filtered = filtered.filter(p => p.categoryId === categoryId)
      }
      if (subcategoryId !== null) {
        filtered = filtered.filter(p => p.subcategoryId === subcategoryId)
      }

      const sorted = filtered.sort((a, b) => b.viewCount - a.viewCount)

      resolve({
        success: true,
        data: sorted.map(item => ({
          ...item,
          heat: item.viewCount,
          price: `${item.currency} ${item.sellingPrice.toFixed(2)}`
        }))
      })
    }, 300)
  })
}

export const getProductsByCategory = async (categoryId, subcategoryId = null) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockProducts.filter(p => p.categoryId === categoryId)

      if (subcategoryId !== null) {
        filtered = filtered.filter(p => p.subcategoryId === subcategoryId)
      }

      resolve({
        success: true,
        data: filtered
      })
    }, 300)
  })
}

export const getAllRankings = async (categoryId = null, subcategoryId = null) => {
  return new Promise(async (resolve) => {
    try {
      const [hot, favorite, download, publish] = await Promise.all([
        getHotRankings(categoryId, subcategoryId),
        getFavoriteRankings(categoryId, subcategoryId),
        getDownloadRankings(categoryId, subcategoryId),
        getPublishRankings(categoryId, subcategoryId)
      ])

      resolve({
        success: true,
        data: {
          hotRankings: hot.data,
          favoriteRankings: favorite.data,
          downloadRankings: download.data,
          publishRankings: publish.data
        }
      })
    } catch (error) {
      resolve({
        success: false,
        error: error.message
      })
    }
  })
}
