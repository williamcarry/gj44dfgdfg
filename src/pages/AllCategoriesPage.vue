<template>
  <div class="min-h-screen flex flex-col bg-white">
    <SiteHeader />

    <!-- 分类内容 -->
    <main class="flex-1 bg-white">
      <div class="container">
        <!-- 左边菜单容器 -->
        <div class="menu-container">
          <!-- 一级分类循环 -->
          <div v-for="category in categories" :key="category.key">
            <!-- 一级分类标题 -->
            <h3 class="category-title-heading">
              <a :href="category.href" class="category-title-link">
                {{ category.title }}
              </a>
            </h3>

            <!-- 分类内容容器 -->
            <div class="category-content">
              <!-- 每个子分类 -->
              <div v-for="(subCat, idx) in category.children" :key="category.key + '-' + idx" class="category-group">
                <!-- 子分类标题 -->
                <div class="category-label">{{ subCat.title }}</div>
                <!-- 箭头 -->
                <div class="arrow-icon">></div>
                <!-- 子分类项列表 -->
                <div class="subcategories">
                  <a
                    v-for="(item, i) in subCat.items"
                    :key="category.key + '-item-' + idx + '-' + i"
                    :href="item.href"
                    class="subcategory-link"
                  >
                    {{ item.title }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <RightFloatNav />
    <SiteFooter />
  </div>
</template>

<script setup>
import { reactive, markRaw, ref } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import RightFloatNav from '@/components/RightFloatNav.vue'
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
          { title: '床头柜', href: '#' },
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
        title: '户外家具',
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
          { title: '琴弦', href: '#' },
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
          { title: '铸造设备', href: '#' },
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
          { title: '电锯', href: '#' },
        ],
      },
      {
        title: '安全防护',
        items: [
          { title: '防护服', href: '#' },
          { title: '安全帽', href: '#' },
          { title: '手套', href: '#' },
          { title: '护目镜', href: '#' },
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
          { title: '爽肤水', href: '#' },
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
        title: '安全防护',
        items: [
          { title: '防护口罩', href: '#' },
          { title: '手套', href: '#' },
          { title: '护目镜', href: '#' },
          { title: '防护服', href: '#' },
        ],
      },
      {
        title: '办公电器',
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
          { title: '狗粮', href: '#' },
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
          { title: '磁力积木', href: '#' },
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
          { title: '婴儿裤', href: '#' },
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
        title: '计算设备',
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
          { title: '摄像机', href: '#' },
          { title: '数码相机', href: '#' },
          { title: '投影仪', href: '#' },
          { title: '电视', href: '#' },
        ],
      },
      {
        title: '配件线材',
        items: [
          { title: 'USB线', href: '#' },
          { title: '充电器', href: '#' },
          { title: '数据线', href: '#' },
          { title: '保护套', href: '#' },
        ],
      },
    ],
  },
])

</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.menu-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-title-heading {
  border-bottom: 3px solid #cb261c;
  color: #cb261c;
  font-family: 'Nunito Sans ExtraBold', 'Open Sans Bold', sans-serif;
  font-size: 18px;
  line-height: 36px;
  padding-bottom: 16px;
  padding-top: 8px;
  margin: 0 0 20px 0;
}

.category-title-link {
  color: #111111;
  text-decoration: none;
  transition-duration: 0.3s;
}

.category-title-link:hover {
  color: #111111;
}

.category-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 30px;
}

.category-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.category-label {
  font-weight: bold;
  color: #333;
  width: auto;
  flex-shrink: 0;
  font-size: 16px;
  line-height: 22px;
}

.arrow-icon {
  color: #999;
  flex-shrink: 0;
  font-size: 12px;
  margin-left: 0;
  margin-top: 5px;
}

.subcategories {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 15px;
  align-content: flex-start;
}

.subcategory-link {
  color: #555;
  text-decoration: none;
  transition-duration: 0.3s;
  line-height: 22px;
}

.subcategory-link:hover {
  color: #cb261c;
}

</style>