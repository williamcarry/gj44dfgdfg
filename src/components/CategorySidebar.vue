<template>
  <div class="hidden md:block category-sidebar bg-white border-r border-b shadow-sm" style="height: 460px">
    <ul class="h-full flex flex-col divide-y divide-gray-200">
      <li
        v-for="cat in categories"
        :key="cat.key"
        class="relative group flex flex-col"
        style="height: 35px"
      >
        <!-- Level 1: Main category item -->
        <a
          :href="cat.href"
          class="flex items-center px-4 text-sm text-slate-700 hover:bg-slate-50 border-l-4 border-transparent hover:border-primary cursor-pointer transition-colors"
          style="height: 35px"
        >
          <span class="icon w-5 h-5 flex items-center justify-center text-slate-400 mr-3 flex-shrink-0">
            <component :is="cat.icon" class="h-4 w-4" :stroke-width="1.8" />
          </span>
          <span class="truncate flex-1">{{ cat.title }}</span>
        </a>

        <!-- mega panel: appears to the right of the sidebar and overlays the hero -->
        <div
          class="mega-panel absolute left-full top-0 hidden group-hover:block z-[9999]"
          style="overflow: visible"
        >
          <div class="bg-white shadow-lg overflow-hidden flex">
            <!-- Left content: category menu -->
            <div class="flex-1 p-6 flex flex-col gap-4 max-w-2xl">
              <!-- Each category group -->
              <div v-for="(subCat, idx) in cat.children" :key="cat.key + '-col-' + idx" class="category-group flex items-flex-start gap-2">
                <div class="category-title font-bold text-slate-600 text-sm">{{ subCat.title }}</div>
                <div class="arrow text-slate-400 flex-shrink-0">
                  <ChevronRight class="h-4 w-4" :stroke-width="2" />
                </div>
                <div class="subcategories flex flex-wrap gap-2 flex-1 text-xs">
                  <a
                    v-for="(item, i) in subCat.items"
                    :key="cat.key + '-item-' + idx + '-' + i"
                    :href="item.href"
                    class="text-slate-600 hover:text-red-500 transition-colors whitespace-nowrap"
                  >
                    {{ item.title }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Right column: promotion section -->
            <div class="promotion-image w-80 flex flex-col items-center justify-center p-6 flex-shrink-0" style="background-color: #e6f2ea">
              <div class="promotion-text text-center mb-8">
                <h2 class="text-3xl font-bold text-slate-900 mb-2">品质生活</h2>
                <h3 class="text-2xl text-slate-900">全年热销</h3>
              </div>
              <button class="view-button bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-2 rounded text-sm mb-8 transition-colors">
                立即查看 >>
              </button>
              <div class="decorative-image w-60 h-60" style="background-size: contain; background-repeat: no-repeat; background-position: center; background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 250 250%22%3E%3Crect width%3D%22250%22 height%3D%22250%22 fill%3D%22none%22%2F%3E%3C%21-- 花架主体 --%3E%3Cline x1%3D%2250%22 y1%3D%2250%22 x2%3D%2250%22 y2%3D%22230%22 stroke%3D%22%238B4513%22 stroke-width%3D%224%22%2F%3E%3Cline x1%3D%22200%22 y1%3D%2250%22 x2%3D%22200%22 y2%3D%22230%22 stroke%3D%22%238B4513%22 stroke-width%3D%224%22%2F%3E%3Cline x1%3D%2275%22 y1%3D%22230%22 x2%3D%22175%22 y2%3D%22230%22 stroke%3D%22%238B4513%22 stroke-width%3D%224%22%2F%3E%3C%21-- 第一层架子 --%3E%3Cline x1%3D%2250%22 y1%3D%22200%22 x2%3D%22150%22 y2%3D%22200%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3Cline x1%3D%22130%22 y1%3D%22200%22 x2%3D%22130%22 y2%3D%22140%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3Cline x1%3D%22130%22 y1%3D%22140%22 x2%3D%22200%22 y2%3D%22140%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3C%21-- 第二层架子 --%3E%3Cline x1%3D%2250%22 y1%3D%22150%22 x2%3D%22100%22 y2%3D%22150%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3Cline x1%3D%2280%22 y1%3D%22150%22 x2%3D%2280%22 y2%3D%2290%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3Cline x1%3D%2280%22 y1%3D%2290%22 x2%3D%22200%22 y2%3D%2290%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3C%21-- 第三层架子 --%3E%3Cline x1%3D%2250%22 y1%3D%22100%22 x2%3D%22120%22 y2%3D%22100%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3Cline x1%3D%22100%22 y1%3D%22100%22 x2%3D%22100%22 y2%3D%2250%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3Cline x1%3D%22100%22 y1%3D%2250%22 x2%3D%22200%22 y2%3D%2250%22 stroke%3D%22%238B4513%22 stroke-width%3D%223%22%2F%3E%3C%21-- 木板纹理 --%3E%3Cline x1%3D%2260%22 y1%3D%22200%22 x2%3D%2260%22 y2%3D%22195%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%2280%22 y1%3D%22200%22 x2%3D%2280%22 y2%3D%22195%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22100%22 y1%3D%22200%22 x2%3D%22100%22 y2%3D%22195%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22120%22 y1%3D%22200%22 x2%3D%22120%22 y2%3D%22195%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22140%22 y1%3D%22200%22 x2%3D%22140%22 y2%3D%22195%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22140%22 y1%3D%22140%22 x2%3D%22140%22 y2%3D%22135%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22160%22 y1%3D%22140%22 x2%3D%22160%22 y2%3D%22135%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22180%22 y1%3D%22140%22 x2%3D%22180%22 y2%3D%22135%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%2260%22 y1%3D%22150%22 x2%3D%2260%22 y2%3D%22145%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%2280%22 y1%3D%22150%22 x2%3D%2280%22 y2%3D%22145%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%2260%22 y1%3D%22100%22 x2%3D%2260%22 y2%3D%2295%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%2280%22 y1%3D%22100%22 x2%3D%2280%22 y2%3D%2295%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22100%22 y1%3D%22100%22 x2%3D%22100%22 y2%3D%2295%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22120%22 y1%3D%22100%22 x2%3D%22120%22 y2%3D%2295%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22120%22 y1%3D%2290%22 x2%3D%22120%22 y2%3D%2285%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22140%22 y1%3D%2290%22 x2%3D%22140%22 y2%3D%2285%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22160%22 y1%3D%2290%22 x2%3D%22160%22 y2%3D%2285%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22180%22 y1%3D%2290%22 x2%3D%22180%22 y2%3D%2285%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22120%22 y1%3D%2250%22 x2%3D%22120%22 y2%3D%2245%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22140%22 y1%3D%2250%22 x2%3D%22140%22 y2%3D%2245%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22160%22 y1%3D%2250%22 x2%3D%22160%22 y2%3D%2245%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3Cline x1%3D%22180%22 y1%3D%2250%22 x2%3D%22180%22 y2%3D%2245%22 stroke%3D%22%23A0522D%22 stroke-width%3D%222%22%2F%3E%3C%21-- 花瓶和花 --%3E%3C%21-- 第一层花 --%3E%3Ccircle cx%3D%22170%22 cy%3D%22125%22 r%3D%2210%22 fill%3D%22%2387CEFA%22%2F%3E%3Ccircle cx%3D%22165%22 cy%3D%22115%22 r%3D%228%22 fill%3D%22%2398FB98%22%2F%3E%3Ccircle cx%3D%22175%22 cy%3D%22115%22 r%3D%228%22 fill%3D%22%2398FB98%22%2F%3E%3Ccircle cx%3D%22170%22 cy%3D%22110%22 r%3D%228%22 fill%3D%22%2398FB98%22%2F%3E%3Cline x1%3D%22170%22 y1%3D%22125%22 x2%3D%22170%22 y2%3D%22140%22 stroke%3D%22%23228B22%22 stroke-width%3D%222%22%2F%3E%3C%21-- 第二层�� --%3E%3Ccircle cx%3D%2270%22 cy%3D%22135%22 r%3D%2210%22 fill%3D%22%2387CEFA%22%2F%3E%3Ccircle cx%3D%2265%22 cy%3D%22125%22 r%3D%2210%22 fill%3D%22%23FF99CC%22%2F%3E%3Ccircle cx%3D%2275%22 cy%3D%22125%22 r%3D%2210%22 fill%3D%22%23FF99CC%22%2F%3E%3Ccircle cx%3D%2270%22 cy%3D%22120%22 r%3D%2210%22 fill%3D%22%23FF99CC%22%2F%3E%3Cline x1%3D%2270%22 y1%3D%22135%22 x2%3D%2270%22 y2%3D%22150%22 stroke%3D%22%23228B22%22 stroke-width%3D%222%22%2F%3E%3C%21-- 第三层花 --%3E%3Ccircle cx%3D%22180%22 cy%3D%2275%22 r%3D%2210%22 fill%3D%22%2387CEFA%22%2F%3E%3Cpath d%3D%22M180 65 Q175 55 180 45 Q185 55 180 65%22 fill%3D%22%23FFFF00%22%2F%3E%3Cpath d%3D%22M175 60 Q165 60 175 70 Q185 60 175 60%22 fill%3D%22%23FFFF00%22%2F%3E%3Cline x1%3D%22180%22 y1%3D%2275%22 x2%3D%22180%22 y2%3D%2290%22 stroke%3D%22%23228B22%22 stroke-width%3D%222%22%2F%3E%3C%21-- 第四层花 --%3E%3Ccircle cx%3D%22110%22 cy%3D%2235%22 r%3D%2210%22 fill%3D%22%23FFC0CB%22%2F%3E%3Ccircle cx%3D%22105%22 cy%3D%2225%22 r%3D%228%22 fill%3D%22%23FF69B4%22%2F%3E%3Ccircle cx%3D%22115%22 cy%3D%2225%22 r%3D%228%22 fill%3D%22%23FF69B4%22%2F%3E%3Ccircle cx%3D%22110%22 cy%3D%2220%22 r%3D%228%22 fill%3D%22%23FF69B4%22%2F%3E%3Cline x1%3D%22110%22 y1%3D%2235%22 x2%3D%22110%22 y2%3D%2250%22 stroke%3D%22%23228B22%22 stroke-width%3D%222%22%2F%3E%3C%21-- 第五层花 --%3E%3Ccircle cx%3D%22150%22 cy%3D%22185%22 r%3D%2210%22 fill%3D%22%2387CEFA%22%2F%3E%3Cline x1%3D%22150%22 y1%3D%22185%22 x2%3D%22150%22 y2%3D%22200%22 stroke%3D%22%23228B22%22 stroke-width%3D%222%22%2F%3E%3C%21-- 木质地板 --%3E%3Crect x%3D%2250%22 y%3D%22230%22 width%3D%22150%22 height%3D%2210%22 fill%3D%22%23DEB887%22%2F%3E%3Cline x1%3D%2270%22 y1%3D%22230%22 x2%3D%2270%22 y2%3D%22240%22 stroke%3D%22%23BC8F8F%22 stroke-width%3D%221%22%2F%3E%3Cline x1%3D%2290%22 y1%3D%22230%22 x2%3D%2290%22 y2%3D%22240%22 stroke%3D%22%23BC8F8F%22 stroke-width%3D%221%22%2F%3E%3Cline x1%3D%22110%22 y1%3D%22230%22 x2%3D%22110%22 y2%3D%22240%22 stroke%3D%22%23BC8F8F%22 stroke-width%3D%221%22%2F%3E%3Cline x1%3D%22130%22 y1%3D%22230%22 x2%3D%22130%22 y2%3D%22240%22 stroke%3D%22%23BC8F8F%22 stroke-width%3D%221%22%2F%3E%3Cline x1%3D%22150%22 y1%3D%22230%22 x2%3D%22150%22 y2%3D%22240%22 stroke%3D%22%23BC8F8F%22 stroke-width%3D%221%22%2F%3E%3Cline x1%3D%22170%22 y1%3D%22230%22 x2%3D%22170%22 y2%3D%22240%22 stroke%3D%22%23BC8F8F%22 stroke-width%3D%221%22%2F%3E%3Cline x1%3D%22190%22 y1%3D%22230%22 x2%3D%22190%22 y2%3D%22240%22 stroke%3D%22%23BC8F8F%22 stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <!-- Mobile dropdown fallback -->
    <details class="md:hidden mt-4">
      <summary class="flex items-center gap-3 bg-primary text-white px-4 py-3 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-5 w-5"
        >
          <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
        </svg>
        <span class="font-medium">全部分类</span>
      </summary>
      <div class="bg-white border p-4">
        <div class="space-y-4">
          <div v-for="cat in categories" :key="cat.key + '-m'">
            <h4 class="text-sm font-semibold text-slate-800 mb-2">{{ cat.title }}</h4>
            <div class="space-y-3 pl-4">
              <div v-for="(subCat, idx) in cat.children" :key="cat.key + '-m-sub-' + idx">
                <h5 class="text-xs font-medium text-slate-700 mb-1">{{ subCat.title }}</h5>
                <ul class="text-xs text-slate-600 space-y-1">
                  <li v-for="(item, i) in subCat.items" :key="cat.key + '-m-item-' + idx + '-' + i">
                    <a :href="item.href" class="hover:text-primary">{{ item.title }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup>
import { reactive, markRaw } from 'vue'
import {
  Home,
  Sprout,
  Music,
  Mountain,
  Plug,
  Cog,
  HeartPulse,
  Briefcase,
  PawPrint,
  Puzzle,
  Car,
  ShoppingBag,
  Headphones,
  ChevronRight,
} from 'lucide-vue-next'

const categories = reactive([
  {
    key: 'home-furniture',
    title: '家居和家具',
    icon: markRaw(Home),
    href: '#',
    children: [
      {
        title: '家具',
        items: [
          { title: '沙发', href: '#' },
          { title: '床', href: '#' },
          { title: '桌椅', href: '#' },
          { title: '餐桌', href: '#' },
          { title: '书架', href: '#' },
          { title: '衣柜', href: '#' },
          { title: '电视柜', href: '#' },
          { title: '鞋柜', href: '#' },
          { title: '收纳柜', href: '#' },
          { title: '茶几', href: '#' },
          { title: '床���柜', href: '#' },
          { title: '办公桌', href: '#' },
          { title: '餐边柜', href: '#' },
          { title: '梳妆台', href: '#' },
          { title: '鞋凳', href: '#' },
          { title: '玄关柜', href: '#' },
          { title: '转角沙发', href: '#' },
          { title: '躺椅', href: '#' },
          { title: '休闲椅', href: '#' },
          { title: '摇椅', href: '#' },
          { title: '儿童床', href: '#' },
          { title: '儿童桌椅', href: '#' },
          { title: '书桌', href: '#' },
          { title: '工作台', href: '#' },
          { title: '餐椅', href: '#' },
          { title: '吧椅', href: '#' },
          { title: '沙发床', href: '#' },
          { title: '角柜', href: '#' },
          { title: '衣帽架', href: '#' },
          { title: '置物架', href: '#' },
        ],
      },
      {
        title: '家居装饰',
        items: [
          { title: '收纳', href: '#' },
          { title: '灯具', href: '#' },
          { title: '地毯', href: '#' },
          { title: '窗帘', href: '#' },
          { title: '壁画', href: '#' },
          { title: '镜子', href: '#' },
          { title: '屏风', href: '#' },
          { title: '挂画', href: '#' },
          { title: '花瓶', href: '#' },
          { title: '工艺品', href: '#' },
          { title: '摆件', href: '#' },
        ],
      },
      {
        title: '厨房用品',
        items: [
          { title: '锅具', href: '#' },
          { title: '砧板', href: '#' },
          { title: '刀具', href: '#' },
          { title: '餐具', href: '#' },
          { title: '筷子', href: '#' },
          { title: '勺子', href: '#' },
          { title: '切菜板', href: '#' },
          { title: '砂锅', href: '#' },
          { title: '压力锅', href: '#' },
          { title: '烤盘', href: '#' },
        ],
      },
      {
        title: '卫浴用品',
        items: [
          { title: '毛巾', href: '#' },
          { title: '浴垫', href: '#' },
          { title: '肥皂盒', href: '#' },
          { title: '牙刷架', href: '#' },
          { title: '浴帘', href: '#' },
          { title: '浴巾', href: '#' },
          { title: '浴刷', href: '#' },
          { title: '擦背巾', href: '#' },
          { title: '沐浴液架', href: '#' },
        ],
      },
      {
        title: '床上用品',
        items: [
          { title: '床单', href: '#' },
          { title: '被套', href: '#' },
          { title: '枕头', href: '#' },
          { title: '床笠', href: '#' },
          { title: '床垫', href: '#' },
          { title: '床罩', href: '#' },
          { title: '抱枕', href: '#' },
          { title: '毛毯', href: '#' },
          { title: '床头靠垫', href: '#' },
          { title: '床上四件套', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'garden',
    title: '庭院和园艺',
    icon: markRaw(Sprout),
    href: '#',
    children: [
      {
        title: '园艺工具',
        items: [
          { title: '花盆', href: '#' },
          { title: '种子', href: '#' },
          { title: '园艺工具', href: '#' },
          { title: '户外灯', href: '#' },
        ],
      },
      {
        title: '户外家��',
        items: [
          { title: '烧烤用品', href: '#' },
          { title: '户外装饰', href: '#' },
          { title: '遮阳篷', href: '#' },
          { title: '户外沙发', href: '#' },
        ],
      },
      {
        title: '园艺饰品',
        items: [
          { title: '风铃', href: '#' },
          { title: '花架', href: '#' },
          { title: '秋千', href: '#' },
          { title: '喷泉', href: '#' },
        ],
      },
      {
        title: '户外照明',
        items: [
          { title: '太阳能灯', href: '#' },
          { title: '路灯', href: '#' },
          { title: '壁灯', href: '#' },
          { title: '草坪灯', href: '#' },
        ],
      },
      {
        title: '植物养护',
        items: [
          { title: '肥料', href: '#' },
          { title: '农药', href: '#' },
          { title: '喷雾器', href: '#' },
          { title: '剪刀', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'music-art',
    title: '音乐艺术',
    icon: markRaw(Music),
    href: '#',
    children: [
      {
        title: '弦乐',
        items: [
          { title: '吉他', href: '#' },
          { title: '贝司', href: '#' },
          { title: '小提琴', href: '#' },
          { title: '��弦', href: '#' },
        ],
      },
      {
        title: '键盘乐',
        items: [
          { title: '电钢琴', href: '#' },
          { title: '合成器', href: '#' },
          { title: '手风琴', href: '#' },
          { title: '琴架', href: '#' },
        ],
      },
      {
        title: '打击乐',
        items: [
          { title: '鼓', href: '#' },
          { title: '架子鼓', href: '#' },
          { title: '锣', href: '#' },
          { title: '铃鼓', href: '#' },
        ],
      },
      {
        title: '绘画用品',
        items: [
          { title: '油画', href: '#' },
          { title: '水彩', href: '#' },
          { title: '素描笔', href: '#' },
          { title: '画笔', href: '#' },
        ],
      },
      {
        title: '美术材料',
        items: [
          { title: '画布', href: '#' },
          { title: '画板', href: '#' },
          { title: '颜料', href: '#' },
          { title: '笔筒', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'outdoor',
    title: '户外、娱乐和运动',
    icon: markRaw(Mountain),
    href: '#',
    children: [
      {
        title: '露营用品',
        items: [
          { title: '帐篷', href: '#' },
          { title: '睡袋', href: '#' },
          { title: '露营灯', href: '#' },
          { title: '背包', href: '#' },
        ],
      },
      {
        title: '运动装备',
        items: [
          { title: '运动服', href: '#' },
          { title: '运动鞋', href: '#' },
          { title: '护具', href: '#' },
          { title: '运动包', href: '#' },
        ],
      },
      {
        title: '球类运动',
        items: [
          { title: '篮球', href: '#' },
          { title: '足球', href: '#' },
          { title: '网球', href: '#' },
          { title: '排球', href: '#' },
        ],
      },
      {
        title: '自行车配件',
        items: [
          { title: '山地车', href: '#' },
          { title: '公路车', href: '#' },
          { title: '车灯', href: '#' },
          { title: '头盔', href: '#' },
        ],
      },
      {
        title: '登山装备',
        items: [
          { title: '登山鞋', href: '#' },
          { title: '登山包', href: '#' },
          { title: '登山杖', href: '#' },
          { title: '安全绳', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'appliances',
    title: '电器类',
    icon: markRaw(Plug),
    href: '#',
    children: [
      {
        title: '厨房小电',
        items: [
          { title: '电饭煲', href: '#' },
          { title: '豆浆机', href: '#' },
          { title: '榨汁机', href: '#' },
          { title: '烤箱', href: '#' },
        ],
      },
      {
        title: '大厨电',
        items: [
          { title: '冰箱', href: '#' },
          { title: '洗衣机', href: '#' },
          { title: '微波炉', href: '#' },
          { title: '电磁炉', href: '#' },
        ],
      },
      {
        title: '清洁电器',
        items: [
          { title: '吸尘器', href: '#' },
          { title: '扫地机', href: '#' },
          { title: '拖地机', href: '#' },
          { title: '洗车机', href: '#' },
        ],
      },
      {
        title: '个护电器',
        items: [
          { title: '吹风机', href: '#' },
          { title: '卷发棒', href: '#' },
          { title: '剃须刀', href: '#' },
          { title: '电动牙刷', href: '#' },
        ],
      },
      {
        title: '取暖电器',
        items: [
          { title: '空调', href: '#' },
          { title: '取暖器', href: '#' },
          { title: '风扇', href: '#' },
          { title: '加湿器', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'industrial',
    title: '工商业设备',
    icon: markRaw(Cog),
    href: '#',
    children: [
      {
        title: '生产设备',
        items: [
          { title: '流水线', href: '#' },
          { title: '焊接机', href: '#' },
          { title: '冲压机', href: '#' },
          { title: '铸造设��', href: '#' },
        ],
      },
      {
        title: '包装设备',
        items: [
          { title: '打包机', href: '#' },
          { title: '充填机', href: '#' },
          { title: '封口机', href: '#' },
          { title: '贴标机', href: '#' },
        ],
      },
      {
        title: '输送设备',
        items: [
          { title: '传送带', href: '#' },
          { title: '升降机', href: '#' },
          { title: '提升机', href: '#' },
          { title: '托盘', href: '#' },
        ],
      },
      {
        title: '工业工具',
        items: [
          { title: '扳手', href: '#' },
          { title: '螺丝刀', href: '#' },
          { title: '电钻', href: '#' },
          { title: '电���', href: '#' },
        ],
      },
      {
        title: '安全防护',
        items: [
          { title: '防护服', href: '#' },
          { title: '安全帽', href: '#' },
          { title: '手套', href: '#' },
          { title: '护���镜', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'health',
    title: '健康和美容',
    icon: markRaw(HeartPulse),
    href: '#',
    children: [
      {
        title: '面部护肤',
        items: [
          { title: '洗面奶', href: '#' },
          { title: '���肤水', href: '#' },
          { title: '面霜', href: '#' },
          { title: '面膜', href: '#' },
        ],
      },
      {
        title: '身体护理',
        items: [
          { title: '沐浴露', href: '#' },
          { title: '身体乳', href: '#' },
          { title: '防晒霜', href: '#' },
          { title: '磨砂膏', href: '#' },
        ],
      },
      {
        title: '美容工具',
        items: [
          { title: '美容仪', href: '#' },
          { title: '洁面仪', href: '#' },
          { title: '卷发棒', href: '#' },
          { title: '直板夹', href: '#' },
        ],
      },
      {
        title: '彩妆',
        items: [
          { title: '口红', href: '#' },
          { title: '眼影', href: '#' },
          { title: '粉底', href: '#' },
          { title: '眉笔', href: '#' },
        ],
      },
      {
        title: '健康产品',
        items: [
          { title: '足浴盆', href: '#' },
          { title: '按摩垫', href: '#' },
          { title: '颈椎仪', href: '#' },
          { title: '腰枕', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'office',
    title: '办公、教育与安全',
    icon: markRaw(Briefcase),
    href: '#',
    children: [
      {
        title: '文具用品',
        items: [
          { title: '笔', href: '#' },
          { title: '笔记本', href: '#' },
          { title: '便签', href: '#' },
          { title: '纸张', href: '#' },
        ],
      },
      {
        title: '办公家具',
        items: [
          { title: '办公椅', href: '#' },
          { title: '办公桌', href: '#' },
          { title: '文件柜', href: '#' },
          { title: '书架', href: '#' },
        ],
      },
      {
        title: '教育用品',
        items: [
          { title: '教科书', href: '#' },
          { title: '练习本', href: '#' },
          { title: '黑板', href: '#' },
          { title: '粉笔', href: '#' },
        ],
      },
      {
        title: '��全防护',
        items: [
          { title: '防护口罩', href: '#' },
          { title: '手套', href: '#' },
          { title: '护目镜', href: '#' },
          { title: '防护服', href: '#' },
        ],
      },
      {
        title: '��公电器',
        items: [
          { title: '打印机', href: '#' },
          { title: '复印机', href: '#' },
          { title: '碎纸机', href: '#' },
          { title: '订书机', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'pets',
    title: '宠物用品',
    icon: markRaw(PawPrint),
    href: '#',
    children: [
      {
        title: '宠物粮食',
        items: [
          { title: '�����', href: '#' },
          { title: '猫粮', href: '#' },
          { title: '鸟粮', href: '#' },
          { title: '水族粮', href: '#' },
        ],
      },
      {
        title: '宠物玩具',
        items: [
          { title: '球类', href: '#' },
          { title: '咬胶', href: '#' },
          { title: '逗猫棒', href: '#' },
          { title: '毛球', href: '#' },
        ],
      },
      {
        title: '宠物护理',
        items: [
          { title: '沐浴露', href: '#' },
          { title: '梳子', href: '#' },
          { title: '指甲剪', href: '#' },
          { title: '牙刷', href: '#' },
        ],
      },
      {
        title: '宠物家具',
        items: [
          { title: '宠物床', href: '#' },
          { title: '猫咪树', href: '#' },
          { title: '狗窝', href: '#' },
          { title: '笼子', href: '#' },
        ],
      },
      {
        title: '宠物用具',
        items: [
          { title: '牵引绳', href: '#' },
          { title: '颈圈', href: '#' },
          { title: '水碗', href: '#' },
          { title: '食盆', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'toys-baby',
    title: '玩具/婴童用品',
    icon: markRaw(Puzzle),
    href: '#',
    children: [
      {
        title: '积木玩具',
        items: [
          { title: '塑料积木', href: '#' },
          { title: '木制积木', href: '#' },
          { title: '磁���积木', href: '#' },
          { title: '益智拼图', href: '#' },
        ],
      },
      {
        title: '动模型',
        items: [
          { title: '汽车模型', href: '#' },
          { title: '飞机模型', href: '#' },
          { title: '火车模型', href: '#' },
          { title: '船舶模型', href: '#' },
        ],
      },
      {
        title: '娃娃玩具',
        items: [
          { title: '布娃娃', href: '#' },
          { title: '塑料娃娃', href: '#' },
          { title: '毛绒玩具', href: '#' },
          { title: '手偶', href: '#' },
        ],
      },
      {
        title: '婴儿用品',
        items: [
          { title: '奶瓶', href: '#' },
          { title: '尿布', href: '#' },
          { title: '婴儿床', href: '#' },
          { title: '推车', href: '#' },
        ],
      },
      {
        title: '童装及配饰',
        items: [
          { title: '连体衣', href: '#' },
          { title: '婴���裤', href: '#' },
          { title: '婴儿帽', href: '#' },
          { title: '婴儿袜', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'auto',
    title: '汽摩配件',
    icon: markRaw(Car),
    href: '#',
    children: [
      {
        title: '发动机配件',
        items: [
          { title: '火花塞', href: '#' },
          { title: '机油滤', href: '#' },
          { title: '空气滤', href: '#' },
          { title: '活塞环', href: '#' },
        ],
      },
      {
        title: '车灯配件',
        items: [
          { title: '前大灯', href: '#' },
          { title: '后尾灯', href: '#' },
          { title: '雾灯', href: '#' },
          { title: '灯泡', href: '#' },
        ],
      },
      {
        title: '内饰用品',
        items: [
          { title: '脚垫', href: '#' },
          { title: '座套', href: '#' },
          { title: '方向盘套', href: '#' },
          { title: '车垫', href: '#' },
        ],
      },
      {
        title: '轮胎轮圈',
        items: [
          { title: '轮胎', href: '#' },
          { title: '轮圈', href: '#' },
          { title: '轮毂盖', href: '#' },
          { title: '轮胎塞', href: '#' },
        ],
      },
      {
        title: '外装配件',
        items: [
          { title: '侧镜', href: '#' },
          { title: '挡泥板', href: '#' },
          { title: '扰流板', href: '#' },
          { title: '防护杠', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'bags',
    title: '服饰箱包',
    icon: markRaw(ShoppingBag),
    href: '#',
    children: [
      {
        title: '女性箱包',
        items: [
          { title: '女包', href: '#' },
          { title: '斜挎包', href: '#' },
          { title: '化妆包', href: '#' },
          { title: '手拿包', href: '#' },
        ],
      },
      {
        title: '男性箱包',
        items: [
          { title: '男包', href: '#' },
          { title: '公文包', href: '#' },
          { title: '钱包', href: '#' },
          { title: '腰包', href: '#' },
        ],
      },
      {
        title: '旅行箱',
        items: [
          { title: '行李箱', href: '#' },
          { title: '拉杆箱', href: '#' },
          { title: '旅行包', href: '#' },
          { title: '登机箱', href: '#' },
        ],
      },
      {
        title: '运动背包',
        items: [
          { title: '登山包', href: '#' },
          { title: '双肩包', href: '#' },
          { title: '户外包', href: '#' },
          { title: '学生包', href: '#' },
        ],
      },
      {
        title: '配饰用品',
        items: [
          { title: '皮带', href: '#' },
          { title: '手套', href: '#' },
          { title: '围巾', href: '#' },
          { title: '帽子', href: '#' },
        ],
      },
    ],
  },
  {
    key: 'consumer-electronics',
    title: '消费电子/器材',
    icon: markRaw(Headphones),
    href: '#',
    children: [
      {
        title: '音频设备',
        items: [
          { title: '耳机', href: '#' },
          { title: '蓝牙音箱', href: '#' },
          { title: '麦克风', href: '#' },
          { title: '耳机架', href: '#' },
        ],
      },
      {
        title: '移动设备',
        items: [
          { title: '手机', href: '#' },
          { title: '平板', href: '#' },
          { title: '电子阅读', href: '#' },
          { title: '移动电源', href: '#' },
        ],
      },
      {
        title: '计算��备',
        items: [
          { title: '笔记本', href: '#' },
          { title: '台式电脑', href: '#' },
          { title: '平板电脑', href: '#' },
          { title: '键盘鼠标', href: '#' },
        ],
      },
      {
        title: '影音设备',
        items: [
          { title: '摄像���', href: '#' },
          { title: '数码相机', href: '#' },
          { title: '投影仪', href: '#' },
          { title: '电视', href: '#' },
        ],
      },
      {
        title: '配件线缆',
        items: [
          { title: 'USB线', href: '#' },
          { title: '充���器', href: '#' },
          { title: '数据线', href: '#' },
          { title: '保护套', href: '#' },
        ],
      },
    ],
  },
])
</script>

<style scoped>
.bg-primary {
  background-color: #cb261c;
}

.mega-panel {
  min-width: 1100px;
}

.mega-panel::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 28px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background: white;
  box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.1);
}

.category-group {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-right: -6px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.category-group > * {
  margin-right: 6px;
}

.category-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.category-title {
  font-weight: bold;
  color: #666;
  width: auto;
  flex-shrink: 0;
  font-size: 14px;
}

.arrow {
  color: #999;
  flex-shrink: 0;
  font-size: 12px;
  margin-left: -2px;
}

.subcategories {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-right: -8px;
  font-size: 14px;
}

.subcategories a {
  color: #666;
  text-decoration: none;
  white-space: nowrap;
  margin-right: 8px;
  margin-bottom: 4px;
}

.subcategories a:hover {
  color: #f00;
}

.promotion-image {
  background-color: #e6f2ea;
}

.promotion-text h2 {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.promotion-text h3 {
  font-size: 24px;
  color: #333;
}

.view-button {
  background-color: #5cb85c;
  color: white;
  border: none;
  padding: 10px 30px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.view-button:hover {
  background-color: #4cae4c;
}

.decorative-image {
  width: 250px;
  height: 250px;
}

ul {
  list-style: none;
}

.category-sidebar {
  border-left: 1px solid #e5e7eb;
}
</style>
