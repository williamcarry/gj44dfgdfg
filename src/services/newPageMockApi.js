// ============================================
// NewPage Mock API Service
// ============================================
// This service provides mock data for NewPage.vue
// with support for filtering, sorting, and pagination

// ============================================
// Sample Data: Product Categories (First 6 top-level categories)
// ============================================
const mockCategories = [
  {
    id: 1,
    title: '家居和家具',
    titleEn: 'Home & Furniture',
    icon: 'Home',
    image: '/frondend/images/menuCategory/home-furniture.jpg',
    href: '#'
  },
  {
    id: 2,
    title: '庭院和园艺',
    titleEn: 'Garden & Horticulture',
    icon: 'Leaf',
    image: '/frondend/images/menuCategory/garden-horticulture.jpg',
    href: '#'
  },
  {
    id: 3,
    title: '户外、娱乐和运动',
    titleEn: 'Outdoor & Sports',
    icon: 'Activity',
    image: '/frondend/images/menuCategory/outdoor-sports.jpg',
    href: '#'
  },
  {
    id: 4,
    title: '消费电子/器材',
    titleEn: 'Consumer Electronics',
    icon: 'Smartphone',
    image: '/frondend/images/menuCategory/electronics.jpg',
    href: '#'
  },
  {
    id: 5,
    title: '宠物用品',
    titleEn: 'Pet Supplies',
    icon: 'PawPrint',
    image: '/frondend/images/menuCategory/pets.jpg',
    href: '#'
  },
  {
    id: 6,
    title: '健康和美容',
    titleEn: 'Health & Beauty',
    icon: 'Heart',
    image: '/frondend/images/menuCategory/health-beauty.jpg',
    href: '#'
  }
]

// ============================================
// Sample Data: Products
// ============================================
// Generate comprehensive product data with all required fields

const baseImages = [
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202404/5b1487bd-c161-4a8b-9a8b-5b07c7199fd2.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2021/202102/43f9078f-e24d-47c7-8f53-a743e042bc5f.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2022/202209/5bc737f9-f9fa-43eb-af41-2e2f8ad91065.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202405/c103f36e-c3d1-4716-bd72-28327d48a024.Jpeg',
  'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2024/202401/bca2859e-1cf0-4ce1-9879-5b9aaf68109b.Jpeg'
]

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

const generateMockProducts = () => {
  const products = []
  const now = new Date()
  
  for (let i = 1; i <= 300; i++) {
    const categoryId = ((i - 1) % 6) + 1
    const imageIndex = (i - 1) % baseImages.length
    const titleIndex = (i - 1) % productTitles.length
    
    // Vary sales count with some products having much higher counts (for top 5 selection)
    let salesCount = Math.floor(Math.random() * 500 + 50)
    if (i <= 5) {
      salesCount = 5000 - (i * 500) // Top 5 have high sales counts
    }
    
    // Random stock
    const totalStock = Math.floor(Math.random() * 1000 + 100)
    
    // Random price
    const basePrice = Math.floor(Math.random() * 5000 + 100)
    const price = parseFloat((basePrice + (Math.random() * 200)).toFixed(2))
    const originalPrice = parseFloat((price * (1 + Math.random() * 0.5)).toFixed(2))
    
    // Random tags - mix of shipping types
    const tags = []
    if (Math.random() > 0.3) {
      tags.push('平台直发') // Platform direct shipping
    }
    if (Math.random() > 0.6) {
      tags.push('热卖')
    }
    if (Math.random() > 0.7) {
      tags.push('新品')
    }
    
    // Random support flags
    const support_dropship = Math.random() > 0.4 ? 1 : 0
    const support_wholesale = Math.random() > 0.5 ? 1 : 0
    const support_circle_buy = Math.random() > 0.6 ? 1 : 0
    const support_self_pickup = Math.random() > 0.7 ? 1 : 0
    
    // Random updated date (within last 90 days)
    const daysAgo = Math.floor(Math.random() * 90)
    const updatedAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    
    products.push({
      id: i,
      spu: `SPU-${String(i).padStart(6, '0')}`,
      title: `${productTitles[titleIndex]} #${i}`,
      titleEn: `Product ${i}`,
      mainImage: baseImages[imageIndex],
      thumbnailImage: baseImages[imageIndex],
      categoryId: categoryId,
      
      // Price and Stock Info
      price: price,
      originalPrice: originalPrice,
      _price: price,
      _originalPrice: originalPrice,
      currency: 'CNY',
      discountRate: parseFloat(((originalPrice - price) / originalPrice).toFixed(2)),
      
      // Stock Info (simulating ProductStock table)
      totalStock: totalStock,
      
      // Tags (shipping type indicator)
      tags: tags,
      
      // Trade mode support flags (simulating Product table fields)
      support_dropship: support_dropship,
      support_wholesale: support_wholesale,
      support_circle_buy: support_circle_buy,
      support_self_pickup: support_self_pickup,
      
      // Sales and visibility
      salesCount: salesCount,
      viewCount: Math.floor(Math.random() * 10000 + 500),
      
      // Timestamp
      updatedAt: updatedAt.toISOString(),
      
      // Additional fields
      isLimited: i % 3 === 0 ? 1 : 0,
      status: 'active'
    })
  }
  
  return products
}

const allProducts = generateMockProducts()

// ============================================
// API Endpoint: Get Hot Slide Items
// ============================================
/**
 * 获取热销新品轮播图产品
 * 返回销量最好的5款产品
 * 
 * @returns {Promise<{success: boolean, data: Array}>}
 */
export const getHotSlideItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = allProducts
        .sort((a, b) => b.salesCount - a.salesCount)
        .slice(0, 5)
        .map(p => ({
          id: p.id,
          spu: p.spu,
          title: p.title,
          titleEn: p.titleEn,
          mainImage: p.thumbnailImage,
          _price: p.price,
          _originalPrice: p.originalPrice,
          price: p.price,
          originalPrice: p.originalPrice,
          discountRate: p.discountRate,
          salesCount: p.salesCount,
          updatedAt: p.updatedAt
        }))

      resolve({
        success: true,
        data: result
      })
    }, 300)
  })
}

// ============================================
// API Endpoint: Get Categories with Products
// ============================================
/**
 * 获取分类菜单和每个分类下的8款产品
 * 只返回前6个一级菜单
 * 
 * @returns {Promise<{success: boolean, data: Array}>}
 */
export const getCategoriesWithProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = mockCategories.slice(0, 6).map(category => {
        const categoryProducts = allProducts
          .filter(p => p.categoryId === category.id)
          .sort((a, b) => b.salesCount - a.salesCount)
          .slice(0, 8)
          .map(p => ({
            id: p.id,
            spu: p.spu,
            title: p.title,
            mainImage: p.thumbnailImage,
            _price: p.price,
            _originalPrice: p.originalPrice,
            price: p.price,
            originalPrice: p.originalPrice,
            discountRate: p.discountRate,
            salesCount: p.salesCount
          }))

        return {
          id: category.id,
          name: category.title,
          title: category.title,
          titleEn: category.titleEn,
          icon: category.icon,
          image: category.image,
          products: categoryProducts
        }
      })

      resolve({
        success: true,
        data: result
      })
    }, 300)
  })
}

// ============================================
// API Endpoint: Get Filtered Products with Pagination
// ============================================
/**
 * 获取带筛选和分页的产品列表
 * 
 * @param {Object} params - Query parameters
 * @param {number} [params.page=1] - Page number (starts from 1)
 * @param {number} [params.pageSize=20] - Items per page
 * @param {number} [params.categoryId] - Filter by category ID
 * @param {number} [params.stockMin] - Filter by minimum stock (totalStock >= stockMin)
 * @param {number} [params.stockMax] - Filter by maximum stock (totalStock <= stockMax)
 * @param {number} [params.priceMin] - Filter by minimum price (price >= priceMin)
 * @param {number} [params.priceMax] - Filter by maximum price (price <= priceMax)
 * @param {number} [params.daysNew] - Filter by days new (updatedAt within last N days)
 * @param {string} [params.shippingType] - Filter by shipping type:
 *   - 'all': no filter
 *   - 'platform': tags contains '平台直发'
 *   - 'supplier': tags does NOT contain '平台直发'
 * @param {string} [params.tradeMode] - Filter by trade mode:
 *   - 'all': no filter
 *   - 'dropship': support_dropship = 1
 *   - 'wholesale': support_wholesale = 1
 *   - 'circle': support_circle_buy = 1
 *   - 'pickup': support_self_pickup = 1
 * @param {string} [params.sortBy='newest'] - Sort by:
 *   - 'newest': updatedAt (newest first)
 *   - 'sales': salesCount (highest first)
 *   - 'views': viewCount (highest first)
 *   - 'price_asc': price (lowest first)
 *   - 'price_desc': price (highest first)
 * 
 * @returns {Promise<{success: boolean, data: {products: Array, pagination: Object}}>}
 */
export const getFilteredProducts = async (params = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const {
        page = 1,
        pageSize = 20,
        categoryId = null,
        stockMin = null,
        stockMax = null,
        priceMin = null,
        priceMax = null,
        daysNew = null,
        shippingType = 'all',
        tradeMode = 'all',
        sortBy = 'newest'
      } = params

      let filtered = [...allProducts]

      // Filter by category
      if (categoryId !== null) {
        filtered = filtered.filter(p => p.categoryId === categoryId)
      }

      // Filter by stock
      if (stockMin !== null || stockMax !== null) {
        filtered = filtered.filter(p => {
          if (stockMin !== null && p.totalStock < stockMin) return false
          if (stockMax !== null && p.totalStock > stockMax) return false
          return true
        })
      }

      // Filter by price
      if (priceMin !== null || priceMax !== null) {
        filtered = filtered.filter(p => {
          if (priceMin !== null && p.price < priceMin) return false
          if (priceMax !== null && p.price > priceMax) return false
          return true
        })
      }

      // Filter by days new (updatedAt)
      if (daysNew !== null && daysNew > 0) {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - daysNew)
        filtered = filtered.filter(p => new Date(p.updatedAt) >= cutoffDate)
      }

      // Filter by shipping type
      if (shippingType !== 'all') {
        filtered = filtered.filter(p => {
          const hasDirectShipping = p.tags.includes('平台直发')
          if (shippingType === 'platform') return hasDirectShipping
          if (shippingType === 'supplier') return !hasDirectShipping
          return true
        })
      }

      // Filter by trade mode
      if (tradeMode !== 'all') {
        filtered = filtered.filter(p => {
          if (tradeMode === 'dropship') return p.support_dropship === 1
          if (tradeMode === 'wholesale') return p.support_wholesale === 1
          if (tradeMode === 'circle') return p.support_circle_buy === 1
          if (tradeMode === 'pickup') return p.support_self_pickup === 1
          return true
        })
      }

      // Sort
      if (sortBy === 'newest') {
        filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      } else if (sortBy === 'sales') {
        filtered.sort((a, b) => b.salesCount - a.salesCount)
      } else if (sortBy === 'views') {
        filtered.sort((a, b) => b.viewCount - a.viewCount)
      } else if (sortBy === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortBy === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price)
      }

      // Paginate
      const total = filtered.length
      const totalPages = Math.ceil(total / pageSize)
      const start = (page - 1) * pageSize
      const products = filtered.slice(start, start + pageSize).map(p => ({
        id: p.id,
        spu: p.spu,
        title: p.title,
        titleEn: p.titleEn,
        mainImage: p.thumbnailImage,
        _price: p.price,
        _originalPrice: p.originalPrice,
        price: p.price,
        originalPrice: p.originalPrice,
        discountRate: p.discountRate,
        salesCount: p.salesCount,
        viewCount: p.viewCount,
        totalStock: p.totalStock,
        tags: p.tags,
        updatedAt: p.updatedAt
      }))

      resolve({
        success: true,
        data: {
          products,
          pagination: {
            page,
            pageSize,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
          }
        }
      })
    }, 300)
  })
}

// ============================================
// API Endpoint: Get Categories (for navigation)
// ============================================
/**
 * 获取所有分类（用于导航和筛选）
 * 返回前6个一级分类
 * 
 * @returns {Promise<{success: boolean, data: Array}>}
 */
export const getCategories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = mockCategories.slice(0, 6).map(cat => ({
        id: cat.id,
        name: cat.title,
        title: cat.title,
        titleEn: cat.titleEn,
        icon: cat.icon,
        image: cat.image
      }))

      resolve({
        success: true,
        data: result
      })
    }, 300)
  })
}

// ============================================
// Utility: Create a fetch interceptor for mock API
// ============================================
/**
 * This function sets up a global fetch interceptor to handle mock API calls
 * Must be called in the component's mounted() hook
 * 
 * Usage:
 *   mounted() {
 *     setupNewPageMockApi()
 *   }
 */
export const setupNewPageMockApi = () => {
  const originalFetch = window.fetch

  window.fetch = function(url, options) {
    // Check if this is a mock API call
    if (typeof url === 'string' && url.startsWith('/api/new-page/')) {
      // Extract API path and query string
      const urlParts = url.replace('/api/new-page/', '').split('?')
      const apiPath = urlParts[0]
      const queryString = urlParts[1] || ''
      const params = new URLSearchParams(queryString)
      const queryParams = Object.fromEntries(params)

      // Convert string params to correct types
      if (queryParams.page) queryParams.page = parseInt(queryParams.page)
      if (queryParams.pageSize) queryParams.pageSize = parseInt(queryParams.pageSize)
      if (queryParams.categoryId) queryParams.categoryId = parseInt(queryParams.categoryId)
      if (queryParams.stockMin) queryParams.stockMin = parseFloat(queryParams.stockMin)
      if (queryParams.stockMax) queryParams.stockMax = parseFloat(queryParams.stockMax)
      if (queryParams.priceMin) queryParams.priceMin = parseFloat(queryParams.priceMin)
      if (queryParams.priceMax) queryParams.priceMax = parseFloat(queryParams.priceMax)
      if (queryParams.daysNew) queryParams.daysNew = parseInt(queryParams.daysNew)

      // Route to appropriate handler
      let promise
      if (apiPath === 'hot-slide-items') {
        promise = getHotSlideItems()
      } else if (apiPath === 'categories-with-products') {
        promise = getCategoriesWithProducts()
      } else if (apiPath === 'categories') {
        promise = getCategories()
      } else if (apiPath === 'products') {
        promise = getFilteredProducts(queryParams)
      } else {
        return originalFetch.call(window, url, options)
      }

      // Return a Response-like object
      return promise.then(data => {
        return {
          ok: true,
          status: 200,
          json: () => Promise.resolve(data)
        }
      }).catch(error => {
        return {
          ok: false,
          status: 500,
          json: () => Promise.resolve({ success: false, error: error.message })
        }
      })
    }

    // Fall back to original fetch for non-mock URLs
    return originalFetch.call(window, url, options)
  }
}
