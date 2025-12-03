<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import CategoryNavBar from '@/components/CategoryNavBar.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import CategorySidebar from '@/components/CategorySidebar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import RightFloatNav from '@/components/RightFloatNav.vue'
import PlatformBoutique from '@/components/PlatformBoutique.vue'
import FestivalDecorations from '@/components/FestivalDecorations.vue'
import NewProductsBanner from '@/components/NewProductsBanner.vue'
import HomeRecommendations from '@/components/HomeRecommendations.vue'
import SeasonalProducts from '@/components/SeasonalProducts.vue'
import PlatformProducts from '@/components/PlatformProducts.vue'
import BestsellerProducts from '@/components/BestsellerProducts.vue'
import BrandProducts from '@/components/BrandProducts.vue'

const heroHeight = ref(undefined)

const fallbackImage = 'https://img-accelerate.saleyee.cn/Resources/GoodsImages/2023/202310/3c1b039b-de57-4d8f-805a-4d15658b90c5.Jpeg'

function onImgError(e) {
  const t = e.target
  if (t && t.src !== fallbackImage) t.src = fallbackImage
}

function updateHeroHeight() {
  const el = document.querySelector('.category-sidebar')
  if (el && window.innerWidth >= 768) {
    heroHeight.value = 460
  } else {
    heroHeight.value = undefined
  }
}

onMounted(() => {
  updateHeroHeight()
  window.addEventListener('resize', updateHeroHeight)
})

onUnmounted(() => window.removeEventListener('resize', updateHeroHeight))
</script>

<template>
  <div id="top" class="min-h-screen flex flex-col">
    <SiteHeader />
    <CategoryNavBar />
    <main class="flex-1" style="background-color: #F2F3F7;">
      <div class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1150px] px-4 md:px-0">
        <div class="flex gap-0">
          <div class="hidden md:block w-1/4 lg:w-auto" style="width: 210px; flex-shrink: 0">
            <CategorySidebar />
          </div>
          <div class="flex-1 w-full">
            <HeroBanner :heroHeight="heroHeight" />
          </div>
        </div>
      </div>

      <!-- 平台爆款 -->
      <div id="platform-boutique">
        <PlatformBoutique />
      </div>

      <!-- 节日装饰 -->
      <div id="festival">
        <FestivalDecorations />
      </div>

      <!-- 新品推荐 -->
      <div id="new-products">
        <NewProductsBanner />
      </div>

      <!-- 居家推荐 -->
      <div id="home">
        <HomeRecommendations />
      </div>

      <!-- 节庆产品 -->
      <div id="seasonal">
        <SeasonalProducts />
      </div>

      <!-- 平台产品 -->
      <div id="platform-products">
        <PlatformProducts />
      </div>

      <!-- 家居爆款热销精选 -->
      <div id="bestsellers">
        <BestsellerProducts />
      </div>

      <!-- 品牌热品大牌联盟 -->
      <div id="brands">
        <BrandProducts />
      </div>
    </main>

    <RightFloatNav />
    <SiteFooter />
  </div>
</template>

<style scoped></style>
