// ============================================
// CrossBorderEcommerce Mock API Service
// ============================================
// 根据 CrossBordereCommercePage.vue 页面参数编写的 Mock API

// ============================================
// Mock 分类数据
// ============================================
const mockCategories = [
  {
    id: 1,
    name: '家居和家具',
    nameEn: 'Home & Furniture',
    children: [
      {
        id: 101,
        name: '家具',
        nameEn: 'Furniture',
        items: [
          { id: 1001, name: '沙发', nameEn: 'Sofa' },
          { id: 1002, name: '床', nameEn: 'Bed' },
          { id: 1003, name: '餐桌', nameEn: 'Dining Table' }
        ]
      },
      {
        id: 102,
        name: '家居装饰',
        nameEn: 'Home Decor',
        items: [
          { id: 1004, name: '壁画', nameEn: 'Wall Art' },
          { id: 1005, name: '灯具', nameEn: 'Lighting' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '庭院和园艺',
    nameEn: 'Garden & Horticulture',
    children: [
      {
        id: 201,
        name: '园艺工具',
        nameEn: 'Gardening Tools',
        items: [
          { id: 2001, name: '铲子', nameEn: 'Shovel' },
          { id: 2002, name: '耙子', nameEn: 'Rake' }
        ]
      },
      {
        id: 202,
        name: '户外家居',
        nameEn: 'Outdoor Furniture',
        items: [
          { id: 2003, name: '户外椅', nameEn: 'Outdoor Chair' },
          { id: 2004, name: '户外桌', nameEn: 'Outdoor Table' }
        ]
      }
    ]
  },
  {
    id: 3,
    name: '户外、娱乐和运动',
    nameEn: 'Outdoor & Sports',
    children: [
      {
        id: 301,
        name: '户外用品',
        nameEn: 'Outdoor Supplies',
        items: [
          { id: 3001, name: '帐篷', nameEn: 'Tent' },
          { id: 3002, name: '睡袋', nameEn: 'Sleeping Bag' }
        ]
      },
      {
        id: 302,
        name: '运动器材',
        nameEn: 'Sports Equipment',
        items: [
          { id: 3003, name: '瑜伽垫', nameEn: 'Yoga Mat' },
          { id: 3004, name: '哑铃', nameEn: 'Dumbbell' }
        ]
      }
    ]
  },
  {
    id: 4,
    name: '消费电子/器材',
    nameEn: 'Consumer Electronics',
    children: [
      {
        id: 401,
        name: '智能设备',
        nameEn: 'Smart Devices',
        items: [
          { id: 4001, name: '智能手环', nameEn: 'Smart Band' },
          { id: 4002, name: '蓝牙音箱', nameEn: 'Bluetooth Speaker' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: '宠物用品',
    nameEn: 'Pet Supplies',
    children: [
      {
        id: 501,
        name: '宠物食品',
        nameEn: 'Pet Food',
        items: [
          { id: 5001, name: '狗粮', nameEn: 'Dog Food' },
          { id: 5002, name: '猫粮', nameEn: 'Cat Food' }
        ]
      }
    ]
  }
]

// ============================================
// 生成 Mock 商品数据
// ============================================
const productTitles = [
  '现代实木沙发套装',
  '北欧风格茶几',
  '欧式床头柜',
  '现代吊灯',
  '玻璃餐桌',
  '厨房刀具套装',
  '陶瓷碗盘套装',
  '浴室镜柜',
  '全棉床单套装',
  '园艺工具组合',
  '户外休闲椅',
  '装饰花盆',
  '太阳能户外灯',
  '有机肥料',
  '儿童自行车',
  '户外帐篷',
  '便携式露营灯',
  '登山背包',
  '智能手环',
  '无线蓝牙音箱',
  '宠物猫窝',
  '宠物狗粮碗',
  '补水面膜',
  '护肤霜'
]

const baseImages = [
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/5b1487bd-c161-4a8b-9a8b-5b07c7199fd2.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202102/43f9078f-e24d-47c7-8f53-a743e042bc5f.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202209/5bc737f9-f9fa-43eb-af41-2e2f8ad91065.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202405/c103f36e-c3d1-4716-bd72-28327d48a024.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202401/bca2859e-1cf0-4ce1-9879-5b9aaf68109b.Jpeg'
]

const generateMockProducts = () => {
  const products = []
  const now = new Date()
  
  for (let i = 1; i <= 500; i++) {
    const categoryId = ((i - 1) % 5) + 1
    const imageIndex = (i - 1) % baseImages.length
    const titleIndex = (i - 1) % productTitles.length
    
    // 随机库存 (50-1000)
    const stock = Math.floor(Math.random() * 950 + 50)
    
    // 随机价格
    const basePrice = Math.floor(Math.random() * 5000 + 100)
    const sellingPrice = parseFloat((basePrice + (Math.random() * 200)).toFixed(2))
    const originalPrice = parseFloat((sellingPrice * (1 + Math.random() * 0.5)).toFixed(2))
    
    // 随机发货类型 (0=平台发货, 1=供应商自发货)
    const shipmentType = Math.random() > 0.3 ? 0 : 1
    
    // 随机交易模式 (0=一件代发, 1=批发, 2=圈货, 3=自提)
    const saleMode = Math.floor(Math.random() * 4)
    
    // 随机更新时间 (最近90天)
    const daysAgo = Math.floor(Math.random() * 90)
    const updatedAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    
    // 随机销量 (0-5000)
    const salesCount = Math.floor(Math.random() * 5000)
    
    // 随机浏览量 (500-10000)
    const viewCount = Math.floor(Math.random() * 9500 + 500)
    
    // 随机下载数 (0-1000)
    const downloadCount = Math.floor(Math.random() * 1000)
    
    products.push({
      id: i,
      spu: `SPU-${String(i).padStart(6, '0')}`,
      title: `${productTitles[titleIndex]} #${i}`,
      titleEn: `Product ${i} - ${productTitles[titleIndex]}`,
      categoryId: categoryId,
      subcategoryId: categoryId * 100 + Math.floor((i % 10) / 5),
      itemId: categoryId * 1000 + (i % 10),
      thumbnailImage: baseImages[imageIndex],
      stock: stock,
      originalPrice: originalPrice,
      sellingPrice: sellingPrice,
      currency: 'USD',
      shipmentType: shipmentType,
      saleMode: saleMode,
      updatedAt: updatedAt.toISOString(),
      salesCount: salesCount,
      viewCount: viewCount,
      downloadCount: downloadCount
    })
  }
  
  return products
}

const allProducts = generateMockProducts()

// ============================================
// API 实现
// ============================================

/**
 * 处理跨境电商页面的 API 请求
 * 支持获取分类数据和商品列表
 * 
 * @param {URLSearchParams} params - 查询参数
 * @returns {Promise<Object>} API 响应数据
 */
export const handleCrossBorderEcommerceRequest = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 检查是否是获取分类数据（如果没有productId相关参数，则返回分类数据）
      const page = params.get('page')
      const hasProductFilters = params.get('categoryId') || params.get('subcategoryId') || 
                                params.get('itemId') || params.get('newTime') ||
                                params.get('shipment') || params.get('saleMode') ||
                                params.get('sortField') || params.get('stockMin') ||
                                params.get('stockMax') || params.get('priceMin') ||
                                params.get('priceMax')
      
      // 始终返回分类数据，结合商品数据（根据参数判断）
      const response = {
        categories: formatCategories(mockCategories),
        products: [],
        pagination: {
          totalPages: 1,
          totalItems: 0,
          currentPage: 1,
          itemsPerPage: 20
        }
      }
      
      // 如果有产品过滤条件，则返回过滤后的商品
      if (hasProductFilters) {
        const { products, pagination } = getFilteredProducts(params)
        response.products = products
        response.pagination = pagination
      }
      
      resolve(response)
    }, 300)
  })
}

/**
 * 格式化分类数据
 */
function formatCategories(categories) {
  return categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    nameEn: cat.nameEn,
    children: cat.children.map(subCat => ({
      id: subCat.id,
      name: subCat.name,
      nameEn: subCat.nameEn,
      items: subCat.items.map(item => ({
        id: item.id,
        name: item.name,
        nameEn: item.nameEn
      }))
    }))
  }))
}

/**
 * 获取过滤后的商品列表
 */
function getFilteredProducts(params) {
  const pageSize = 20
  const page = parseInt(params.get('page')) || 1
  
  // 提取过滤参数
  const categoryId = params.get('categoryId') ? parseInt(params.get('categoryId')) : null
  const subcategoryId = params.get('subcategoryId') ? parseInt(params.get('subcategoryId')) : null
  const itemId = params.get('itemId') ? parseInt(params.get('itemId')) : null
  const newTime = params.get('newTime') ? parseInt(params.get('newTime')) : null
  const shipment = params.get('shipment') !== null ? parseInt(params.get('shipment')) : null
  const saleMode = params.get('saleMode') !== null ? parseInt(params.get('saleMode')) : null
  const sortField = params.get('sortField') || 'viewCount'
  const sortOrder = params.get('sortOrder') || 'DESC'
  const stockMin = params.get('stockMin') ? parseInt(params.get('stockMin')) : null
  const stockMax = params.get('stockMax') ? parseInt(params.get('stockMax')) : null
  const priceMin = params.get('priceMin') ? parseFloat(params.get('priceMin')) : null
  const priceMax = params.get('priceMax') ? parseFloat(params.get('priceMax')) : null
  
  // 过滤商品
  let filtered = [...allProducts]
  
  // 按分类过滤
  if (itemId) {
    filtered = filtered.filter(p => p.itemId === itemId)
  } else if (subcategoryId) {
    filtered = filtered.filter(p => p.subcategoryId === subcategoryId)
  } else if (categoryId) {
    filtered = filtered.filter(p => p.categoryId === categoryId)
  }
  
  // 按上新时间过滤
  if (newTime !== null) {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - newTime)
    filtered = filtered.filter(p => new Date(p.updatedAt) >= cutoffDate)
  }
  
  // 按发货类型过滤
  if (shipment !== null) {
    filtered = filtered.filter(p => p.shipmentType === shipment)
  }
  
  // 按交易模式过滤
  if (saleMode !== null) {
    filtered = filtered.filter(p => p.saleMode === saleMode)
  }
  
  // 按库存范围过滤
  if (stockMin !== null || stockMax !== null) {
    filtered = filtered.filter(p => {
      if (stockMin !== null && p.stock < stockMin) return false
      if (stockMax !== null && p.stock > stockMax) return false
      return true
    })
  }
  
  // 按价格范围过滤
  if (priceMin !== null || priceMax !== null) {
    filtered = filtered.filter(p => {
      if (priceMin !== null && p.sellingPrice < priceMin) return false
      if (priceMax !== null && p.sellingPrice > priceMax) return false
      return true
    })
  }
  
  // 排序
  const sortFieldMap = {
    'viewCount': 'viewCount',
    'updatedAt': 'updatedAt',
    'salesCount': 'salesCount',
    'price': 'sellingPrice',
    'downloadCount': 'downloadCount',
    'stock': 'stock'
  }
  
  const field = sortFieldMap[sortField] || 'viewCount'
  filtered.sort((a, b) => {
    let aVal = a[field]
    let bVal = b[field]
    
    if (typeof aVal === 'string') {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
    }
    
    if (sortOrder === 'ASC') {
      return aVal - bVal
    } else {
      return bVal - aVal
    }
  })
  
  // 分页
  const totalItems = filtered.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const start = (page - 1) * pageSize
  const products = filtered.slice(start, start + pageSize).map(p => ({
    id: p.id,
    spu: p.spu,
    title: p.title,
    titleEn: p.titleEn,
    thumbnailImage: p.thumbnailImage,
    stock: p.stock,
    originalPrice: p.originalPrice,
    sellingPrice: p.sellingPrice,
    currency: p.currency
  }))
  
  return {
    products,
    pagination: {
      totalPages,
      totalItems,
      currentPage: page,
      itemsPerPage: pageSize
    }
  }
}

/**
 * 设置 Fetch 拦截器用于 Mock API
 * 需要在页面 onMounted 时调用
 */
export const setupCrossBorderEcommerceMockApi = () => {
  const originalFetch = window.fetch
  
  window.fetch = function(url, options) {
    // 检查是否是跨境电商 API 调用
    if (typeof url === 'string' && url.startsWith('/shop/api/product/cross-bordere-commerce')) {
      // 提取查询参数
      const urlParts = url.split('?')
      const params = new URLSearchParams(urlParts[1] || '')
      
      return handleCrossBorderEcommerceRequest(params).then(data => {
        return {
          ok: true,
          status: 200,
          json: () => Promise.resolve(data)
        }
      }).catch(error => {
        return {
          ok: false,
          status: 500,
          json: () => Promise.resolve({ 
            success: false, 
            error: error.message 
          })
        }
      })
    }
    
    // 其他请求使用原始 fetch
    return originalFetch.call(window, url, options)
  }
}
