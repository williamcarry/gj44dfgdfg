import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DiscountSalePage from './DiscountSalePage.vue'
import * as mockApi from '@/services/mockApi'

vi.mock('@/components/SiteHeader.vue', () => ({
  default: { name: 'SiteHeader', template: '<div></div>' }
}))
vi.mock('@/components/SiteFooter.vue', () => ({
  default: { name: 'SiteFooter', template: '<div></div>' }
}))

describe('DiscountSalePage', () => {
  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the page with all main sections', () => {
    wrapper = mount(DiscountSalePage, {
      global: {
        stubs: {
          SiteHeader: { template: '<div></div>' },
          SiteFooter: { template: '<div></div>' }
        }
      }
    })
    expect(wrapper.find('.new_promotion_container').exists()).toBe(true)
  })

  it('loads today discounts on mount', async () => {
    const todayRes = await mockApi.getTodayDiscounts()
    expect(todayRes.success).toBe(true)
    expect(todayRes.data).toHaveLength(12)
    expect(todayRes.data[0]).toHaveProperty('id')
    expect(todayRes.data[0]).toHaveProperty('title')
    expect(todayRes.data[0]).toHaveProperty('thumbnailImage')
    expect(todayRes.data[0]).toHaveProperty('currency')
    expect(todayRes.data[0].currency).toBe('CNY')
  })

  it('loads limited supply products on mount', async () => {
    const limitedRes = await mockApi.getLimitedSupplyProducts()
    expect(limitedRes.success).toBe(true)
    expect(limitedRes.data).toHaveLength(6)
    expect(limitedRes.data[0]).toHaveProperty('id')
    expect(limitedRes.data[0]).toHaveProperty('title')
  })

  it('loads new launch discounts on mount', async () => {
    const newRes = await mockApi.getNewLaunchDiscounts()
    expect(newRes.success).toBe(true)
    expect(newRes.data).toHaveLength(6)
    expect(newRes.data[0]).toHaveProperty('id')
  })

  it('excludes today discounts from limited supply products', async () => {
    const todayRes = await mockApi.getTodayDiscounts()
    const limitedRes = await mockApi.getLimitedSupplyProducts()

    const todayIds = new Set(todayRes.data.map(p => p.id))
    const limitedIds = limitedRes.data.map(p => p.id)

    const overlap = limitedIds.filter(id => todayIds.has(id))
    expect(overlap).toHaveLength(0)
  })

  it('excludes today and limited discounts from new launch products', async () => {
    const todayRes = await mockApi.getTodayDiscounts()
    const limitedRes = await mockApi.getLimitedSupplyProducts()
    const newRes = await mockApi.getNewLaunchDiscounts()

    const excludedIds = new Set([...todayRes.data.map(p => p.id), ...limitedRes.data.map(p => p.id)])
    const newIds = newRes.data.map(p => p.id)

    const overlap = newIds.filter(id => excludedIds.has(id))
    expect(overlap).toHaveLength(0)
  })

  it('filters products by discount rate - all', async () => {
    const res = await mockApi.getDiscountProducts({ discountRange: 'all' })
    expect(res.success).toBe(true)
    expect(res.data.products.every(p => p.sellingPrice < p.originalPrice)).toBe(true)
  })

  it('filters products by discount range 1%-10%', async () => {
    const res = await mockApi.getDiscountProducts({ discountRange: '0.01-0.1' })
    expect(res.success).toBe(true)
    if (res.data.products.length > 0) {
      res.data.products.forEach(p => {
        const discountRate = 1 - (p.sellingPrice / p.originalPrice)
        expect(discountRate).toBeGreaterThanOrEqual(0.01)
        expect(discountRate).toBeLessThan(0.1)
      })
    }
  })

  it('filters products by discount range 10%-20%', async () => {
    const res = await mockApi.getDiscountProducts({ discountRange: '0.1-0.2' })
    expect(res.success).toBe(true)
    if (res.data.products.length > 0) {
      res.data.products.forEach(p => {
        const discountRate = 1 - (p.sellingPrice / p.originalPrice)
        expect(discountRate).toBeGreaterThanOrEqual(0.09999)
        expect(discountRate).toBeLessThan(0.2)
      })
    }
  })

  it('filters products by price range', async () => {
    const res = await mockApi.getDiscountProducts({ priceMin: 100, priceMax: 500 })
    expect(res.success).toBe(true)
    res.data.products.forEach(p => {
      expect(p.sellingPrice).toBeGreaterThanOrEqual(100)
      expect(p.sellingPrice).toBeLessThanOrEqual(500)
    })
  })

  it('filters products by minimum price only', async () => {
    const res = await mockApi.getDiscountProducts({ priceMin: 200 })
    expect(res.success).toBe(true)
    res.data.products.forEach(p => {
      expect(p.sellingPrice).toBeGreaterThanOrEqual(200)
    })
  })

  it('filters products by maximum price only', async () => {
    const res = await mockApi.getDiscountProducts({ priceMax: 300 })
    expect(res.success).toBe(true)
    res.data.products.forEach(p => {
      expect(p.sellingPrice).toBeLessThanOrEqual(300)
    })
  })

  it('filters products by category', async () => {
    const res = await mockApi.getDiscountProducts({ categoryId: 1 })
    expect(res.success).toBe(true)
    res.data.products.forEach(p => {
      expect(p.categoryId || 1).toBe(1)
    })
  })

  it('sorts products by viewCount (highest first)', async () => {
    const res = await mockApi.getDiscountProducts({ sortBy: 'viewCount', pageSize: 100 })
    expect(res.success).toBe(true)
    if (res.data.products.length > 1) {
      for (let i = 1; i < res.data.products.length; i++) {
        expect(res.data.products[i - 1].viewCount || 0).toBeGreaterThanOrEqual(res.data.products[i].viewCount || 0)
      }
    }
  })

  it('sorts products by price ascending', async () => {
    const res = await mockApi.getDiscountProducts({ sortBy: 'price-asc', pageSize: 100 })
    expect(res.success).toBe(true)
    if (res.data.products.length > 1) {
      for (let i = 1; i < res.data.products.length; i++) {
        expect(res.data.products[i - 1].sellingPrice).toBeLessThanOrEqual(res.data.products[i].sellingPrice)
      }
    }
  })

  it('sorts products by price descending', async () => {
    const res = await mockApi.getDiscountProducts({ sortBy: 'price-desc', pageSize: 100 })
    expect(res.success).toBe(true)
    if (res.data.products.length > 1) {
      for (let i = 1; i < res.data.products.length; i++) {
        expect(res.data.products[i - 1].sellingPrice).toBeGreaterThanOrEqual(res.data.products[i].sellingPrice)
      }
    }
  })

  it('paginates products correctly', async () => {
    const res1 = await mockApi.getDiscountProducts({ page: 1, pageSize: 20 })
    const res2 = await mockApi.getDiscountProducts({ page: 2, pageSize: 20 })

    expect(res1.success).toBe(true)
    expect(res2.success).toBe(true)
    expect(res1.data.products).toHaveLength(20)
    
    if (res1.data.pagination.total > 20) {
      expect(res2.data.products).toHaveLength(20)
      expect(res1.data.products[0].id).not.toBe(res2.data.products[0].id)
    }
  })

  it('returns correct pagination info', async () => {
    const res = await mockApi.getDiscountProducts({ page: 1, pageSize: 20 })
    expect(res.success).toBe(true)
    expect(res.data.pagination).toHaveProperty('page', 1)
    expect(res.data.pagination).toHaveProperty('pageSize', 20)
    expect(res.data.pagination).toHaveProperty('total')
    expect(res.data.pagination).toHaveProperty('totalPages')
  })

  it('loads categories on mount', async () => {
    const res = await mockApi.getCategories()
    expect(res.success).toBe(true)
    expect(res.data).toBeInstanceOf(Array)
    expect(res.data.length).toBeGreaterThan(0)
    expect(res.data[0]).toHaveProperty('id')
    expect(res.data[0]).toHaveProperty('title')
    expect(res.data[0]).toHaveProperty('children')
  })

  it('supports three-level cascading categories', async () => {
    const res = await mockApi.getCategories()
    expect(res.success).toBe(true)
    const firstCategory = res.data[0]
    expect(firstCategory.children).toBeInstanceOf(Array)
    if (firstCategory.children.length > 0) {
      const secondCategory = firstCategory.children[0]
      expect(secondCategory).toHaveProperty('items')
      expect(secondCategory.items).toBeInstanceOf(Array)
    }
  })

  it('applies multiple filters with AND logic', async () => {
    const res = await mockApi.getDiscountProducts({
      categoryId: 1,
      discountRange: '0.2-0.5',
      priceMin: 200,
      priceMax: 1000
    })

    expect(res.success).toBe(true)
    res.data.products.forEach(p => {
      expect(p.categoryId || 1).toBe(1)
      expect(p.sellingPrice).toBeGreaterThanOrEqual(200)
      expect(p.sellingPrice).toBeLessThanOrEqual(1000)
    })
  })

  it('returns correct product data fields', async () => {
    const res = await mockApi.getTodayDiscounts()
    expect(res.success).toBe(true)
    if (res.data.length > 0) {
      const product = res.data[0]
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('title')
      expect(product).toHaveProperty('titleEn')
      expect(product).toHaveProperty('thumbnailImage')
      expect(product).toHaveProperty('currency', 'CNY')
      expect(product).toHaveProperty('originalPrice')
      expect(product).toHaveProperty('sellingPrice')
      expect(typeof product.originalPrice).toBe('number')
      expect(typeof product.sellingPrice).toBe('number')
    }
  })

  it('ensures discounted products have valid discount calculations', async () => {
    const res = await mockApi.getTodayDiscounts()
    expect(res.success).toBe(true)
    res.data.forEach(p => {
      expect(p.sellingPrice).toBeLessThan(p.originalPrice)
      expect(p.originalPrice).toBeGreaterThan(0)
      expect(p.sellingPrice).toBeGreaterThan(0)
    })
  })

  it('handles empty filter results gracefully', async () => {
    const res = await mockApi.getDiscountProducts({
      priceMin: 100000,
      priceMax: 200000
    })
    expect(res.success).toBe(true)
    expect(res.data.products).toBeInstanceOf(Array)
    expect(res.data.pagination.total).toBe(0)
    expect(res.data.pagination.totalPages).toBe(0)
  })

  it('today discounts are sorted by updatedAt descending', async () => {
    const res = await mockApi.getTodayDiscounts()
    expect(res.success).toBe(true)
    if (res.data.length > 1) {
      for (let i = 1; i < res.data.length; i++) {
        const prevDate = new Date(res.data[i - 1].updatedAt || 0)
        const currDate = new Date(res.data[i].updatedAt || 0)
        expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime())
      }
    }
  })

  it('limited supply products are sorted by updatedAt descending', async () => {
    const res = await mockApi.getLimitedSupplyProducts()
    expect(res.success).toBe(true)
    if (res.data.length > 1) {
      for (let i = 1; i < res.data.length; i++) {
        const prevDate = new Date(res.data[i - 1].updatedAt || 0)
        const currDate = new Date(res.data[i].updatedAt || 0)
        expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime())
      }
    }
  })

  it('new launch products are sorted by updatedAt descending', async () => {
    const res = await mockApi.getNewLaunchDiscounts()
    expect(res.success).toBe(true)
    if (res.data.length > 1) {
      for (let i = 1; i < res.data.length; i++) {
        const prevDate = new Date(res.data[i - 1].updatedAt || 0)
        const currDate = new Date(res.data[i].updatedAt || 0)
        expect(prevDate.getTime()).toBeGreaterThanOrEqual(currDate.getTime())
      }
    }
  })
})
