<script setup>
import { markRaw, onMounted, onUnmounted, ref, computed, inject, watch } from 'vue'
import { ArrowUpCircle, UserRound } from 'lucide-vue-next'

const show = ref(false)
const activeId = ref('top')
const floorMenus = ref([]) // 楼层菜单数据

// 从父组件注入首页数据
const homeData = inject('homeData', null)

// 当前语言
const currentLang = ref('zh-CN')

// 获取当前语言环境
const currentLanguage = computed(() => {
  return currentLang.value
})

// 固定的最后三个按钮（保留）
const fixedNavItems = [
  { id: 'manager', label: '业务经理', labelEn: 'Business Manager', href: '/contact-us', icon: markRaw(UserRound), track: false },
  { id: 'guide', label: '入门指引', labelEn: 'Getting Started', href: '/getting-started', track: false },
  { id: 'top', label: '顶部', labelEn: 'Top', href: '#top', icon: markRaw(ArrowUpCircle), track: false },
]

// 动态生成的楼层导航项
const floorNavItems = computed(() => {
  return floorMenus.value.map((floor, index) => ({
    id: `floor-${floor.id}`,
    label: currentLanguage.value === 'en' ? floor.nameEn : floor.name,
    href: `#floor-${floor.id}`,
    track: true
  }))
})

// 合并所有导航项（楼层 + 固定按钮）
const navItems = computed(() => {
  // 添加平台爆款到楼层导航前
  const platformBoutique = {
    id: 'platform-boutique',
    label: currentLanguage.value === 'en' ? 'Platform Boutique' : '平台爆款',
    href: '#platform-boutique',
    track: true
  }
  
  return [
    platformBoutique,
    ...floorNavItems.value,
    ...fixedNavItems.map(item => ({
      ...item,
      label: currentLanguage.value === 'en' ? item.labelEn : item.label
    }))
  ]
})

const sectionIds = computed(() => {
  return navItems.value.filter((item) => item.track).map((item) => item.id)
})

const firstTrackedId = computed(() => {
  return sectionIds.value[0] ?? 'top'
})

// 获取楼层菜单数据
const updateFloorMenus = () => {
  if (homeData && homeData.value && homeData.value.horizontalMenus) {
    floorMenus.value = homeData.value.horizontalMenus.floor || []
  }
}

function updateActiveSection() {
  const reference = window.scrollY + window.innerHeight * 0.35
  let current = window.scrollY < 150 ? 'top' : firstTrackedId.value

  for (const id of sectionIds.value) {
    const el = document.getElementById(id)
    if (!el) continue
    if (reference >= el.offsetTop) {
      current = id
    }
  }

  activeId.value = current
}

function onScroll() {
  show.value = window.scrollY > 600
  updateActiveSection()
}

function onResize() {
  updateActiveSection()
}

onMounted(() => {
  // 初始化当前语言
  currentLang.value = localStorage.getItem('app.lang') || 'zh-CN'
  
  // 监听首页数据变化
  if (homeData) {
    const stopWatching = watch(homeData, updateFloorMenus, { immediate: true })
    onUnmounted(() => stopWatching())
  }
  
  updateActiveSection()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  
  // 监听语言变化事件
  window.addEventListener('languagechange', handleLangChange)
})

// 监听语言变化事件
const handleLangChange = (event) => {
  if (event.detail && event.detail.lang) {
    currentLang.value = event.detail.lang
  }
}

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('languagechange', handleLangChange)
})
</script>

<!-- ... existing template and style sections remain unchanged ... -->

<template>
  <div v-show="show" class="fixed right-3 md:right-6 top-1/3 z-40">
    <nav class="rounded-md shadow-lg overflow-hidden bg-white border w-28">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="item.href ?? `#${item.id}`"
        class="block px-3 py-2 text-sm transition-colors whitespace-nowrap overflow-hidden text-ellipsis text-center"
        :class="activeId === item.id ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-50'"
      >
        <span class="flex items-center justify-center gap-1 min-w-0">
          <component v-if="item.icon" :is="item.icon" class="h-4 w-4" :stroke-width="1.6" />
          <span class="truncate">{{ item.label }}</span>
        </span>
      </a>
    </nav>
  </div>
</template>

<style scoped></style>