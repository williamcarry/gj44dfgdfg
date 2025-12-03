<template>
  <div class="bg-white shadow-sm" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 7px 0px; ">
    <div
      class="mx-auto w-full max-w-[1500px] md:w-[80%] md:min-w-[1200px] px-4 md:px-0 relative"
      style="display: flex; align-items: stretch"
    >
      <!-- All Categories Button (Left) -->
      <div style="float: left; position: relative; width: 210px; flex-shrink: 0">
        <a
          href="/all-categories"
          class="all-categories-btn"
          style="
            background-color: rgb(203, 38, 28);
            color: rgb(255, 255, 255);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 210px;
            height: 36px;
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;
            transition-duration: 0.3s;
            text-decoration: none;
          "
        >
          <img
            src="/frondend/images/menuicon/allmenu.png"
            alt=""
            style="
              display: inline-block;
              width: 20px;
              height: 20px;
              margin-right: 10px;
              margin-top: -3px;
              vertical-align: middle;
            "
          />
          {{ currentLanguage === 'en' ? 'All Categories' : '全部分类' }}
        </a>
      </div>

      <!-- Navigation Links (Right) -->
      <div
        style="
          display: inline-block;
          width: calc(100% - 220px);
          background-color: rgba(0, 0, 0, 0);
          flex: 1;
        "
      >
        <div
          class="nav-links-container"
          style="
            display: flex;
            flex-wrap: wrap;
            height: 36px;
            overflow: hidden;
            width: 100%;
            align-items: stretch;
          "
        >
          <a
            v-for="menu in headerMenus"
            :key="menu.id"
            :href="menu.link || '#'"
            class="nav-link"
            style="
              color: rgb(17, 17, 17);
              font-size: 16px;
              font-weight: 700;
              line-height: 36px;
              padding-left: 20px;
              padding-right: 20px;
              cursor: pointer;
              transition-duration: 0.3s;
              text-decoration: none;
              display: inline-flex;
              align-items: center;
              gap: 4px;
            "
          >
            {{ getMenuText(menu) }}
            <!-- 动态图标显示（在文字后面） -->
            <img
              v-if="menu.icon"
              :src="menu.icon"
              :alt="getMenuText(menu)"
              style="display: inline-block; width: 18px; height: 20px; vertical-align: middle; margin-left: 5px;"
            />
          </a>
        </div>
      </div>

      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject, watch } from 'vue'

// 当前语言
const currentLang = ref('zh-CN')

// 获取当前语言环境
const currentLanguage = computed(() => {
  return currentLang.value
})

// 从父组件注入首页数据
const homeData = inject('homeData', null)

// 菜单数据
const headerMenus = ref([])

// 获取菜单显示文字
const getMenuText = (menu) => {
  return currentLanguage.value === 'en' ? menu.nameEn : menu.name
}

// 监听首页数据变化
const updateHeaderMenus = () => {
  if (homeData && homeData.value && homeData.value.horizontalMenus) {
    headerMenus.value = homeData.value.horizontalMenus.header || []
  }
}

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

// 组件挂载时初始化语言
onMounted(() => {
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  window.addEventListener('languagechange', handleLangChange)
  
  // 监听首页数据变化
  if (homeData) {
    const stopWatching = watch(homeData, updateHeaderMenus, { immediate: true })
    onUnmounted(() => stopWatching())
  }
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: rgb(203, 38, 28);
}

.all-categories-btn:hover {
  background-color: #a8201a;
  color: rgb(255, 255, 255);
}

.nav-link:hover {
  color: rgb(203, 38, 28);
}
</style>