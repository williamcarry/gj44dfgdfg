# Vue Shop 商城模块

这是一个完整的Vue 3商城应用模块，设计用于集成到Symfony项目中。

## 📦 文件夹内容

```
shop/
├── Home.vue                    # 主页组件（商城首页）
├── App.vue                     # 根组件
├── main.js                     # 应用入口
├── i18n.js                     # 国际化配置
├── styles/
│   ├── base.css               # TailwindCSS + 基础样式
│   └── main.css               # 主样式导入
├── components/                # Vue组件（需要从原项目复制）
│   ├── SiteHeader.vue
│   ├── CategoryNavBar.vue
│   ├── SiteFooter.vue
│   ├── RightFloatNav.vue
│   └── ...其他31个组件
├── pages/                     # 页面组件（需要从原项目复制）
│   ├── ItemDetailPage.vue
│   ├── LoginPage.vue
│   ├── HelpCenterPage.vue
│   └── ...其他页面
├── data/                      # 数据文件（需要从原项目复制）
│   ├── faqData.js
│   ├── helpCenterNav.js
│   ├── products.js
│   └── ...其他数据文件
└── README.md                  # 本文件
```

## 🚀 如何使用

### 1. 复制到Symfony项目

```bash
# 复制整个shop文件夹到你的Symfony项目
cp -r shop /path/to/your-symfony-project/assets/vue/shop

# 或者手动复制
# 1. 创建目录
mkdir -p assets/vue/shop/{components,pages,data,styles}

# 2. 复制所有文件（此shop文件夹中已有的文件）
# 3. 复制components（参见下方说明）
# 4. 复制pages（参见下方说明）
# 5. 复制data（参见下方说明���
```

### 2. 复制缺失的子文件夹

从源项目复制这些文件夹到相应位置：

#### 复制所有组件
```bash
# 源项目路径
cp src/components/*.vue assets/vue/shop/components/
cp src/components/icons/*.vue assets/vue/shop/components/icons/
```

**需要复制的31个组件：**
- SiteHeader.vue
- CategoryNavBar.vue
- CategorySidebar.vue
- SiteFooter.vue
- RightFloatNav.vue
- HeroBanner.vue
- BestsellerProducts.vue
- BrandProducts.vue
- BreadcrumbNav.vue
- FestivalDecorations.vue
- FloorLayout.vue
- HelloWorld.vue
- HomeRecommendations.vue
- ImportantNotice.vue
- MegaCarousel.vue
- NewProductBanner.vue
- NewProductsBanner.vue
- OneClickPublishButton.vue
- OneClickPublishModal.vue
- PlatformBoutique.vue
- PlatformProducts.vue
- PlatformTabs.vue
- ProductDetailTabs.vue
- PublishOverlay.vue
- RelatedProducts.vue
- SeasonalProducts.vue
- SidebarItem.vue
- 以及 icons/ 目录中的所有图标组件

#### 复制所有页面
```bash
# 源项目路径
cp src/pages/*.vue assets/vue/shop/pages/
```

**需要复制的60+个页面组件：**
- AllProductsPage.vue
- ItemDetailPage.vue
- LoginPage.vue
- RegisterPage.vue
- HelpCenterPage.vue
- FAQDetailPage.vue
- CartPage.vue
- UserCenterPage.vue
- 以及其他所有页面组件...

#### 复制数据文件
```bash
# 源项目路径
cp src/data/* assets/vue/shop/data/
```

**需要复制的数据文件：**
- faqData.js (已修复乱码)
- helpCenterNav.js
- operationGuideFaqData.js
- operationGuideNav.js
- products.js
- missingFaqs.json

### 3. 已有的配置文件

以下文件需要在Symfony项目根目录配置（或更新）：

#### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './templates/**/*.{html,twig}',
    './assets/vue/shop/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/element-plus/es/components/**/*.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xl: '1200px',
        '2xl': '1500px',
      },
    },
    extend: {
      colors: {
        primary: '#CB261C',
        slate: {
          950: '#0b1220',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'PingFang SC',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
```

#### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### webpack.config.js (Symfony Encore)
```javascript
const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')

  // 添加Vue应用入口
  .addEntry('shop', './assets/vue/shop/main.js')
  .addStyleEntry('styles', './assets/styles/app.css')

  // Vue支持
  .enableVueLoader()

  // CSS处理
  .enablePostCssLoader()

  // 代码分割
  .splitEntryChunks()
  .enableSingleRuntimeChunk()

  // 构建优化
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

const config = Encore.getWebpackConfig()
module.exports = config
```

### 4. Symfony模板（Twig）

创建或更新模板文件：

#### templates/shop/base.html.twig
```twig
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}商城{% endblock %}</title>
    
    {% block stylesheets %}
        {{ encore_entry_link_tags('styles') }}
    {% endblock %}
</head>
<body>
    <div id="shop-app">
        {# Vue应用挂载点 #}
    </div>

    {% block content %}{% endblock %}

    {% block javascripts %}
        {{ encore_entry_script_tags('shop') }}
    {% endblock %}
</body>
</html>
```

#### templates/shop/home.html.twig
```twig
{% extends 'shop/base.html.twig' %}

{% block title %}商城首页{% endblock %}

{% block content %}
    {# Vue组件会在#shop-app中渲染 #}
{% endblock %}
```

### 5. Symfony Controller

创建 `src/Controller/Shop/ShopController.php`：

```php
<?php

namespace App\Controller\Shop;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/shop', name: 'app_shop_')]
class ShopController extends AbstractController
{
    #[Route('/', name: 'home', methods: ['GET'])]
    public function home(): Response
    {
        return $this->render('shop/home.html.twig');
    }
}
```

## 📦 npm 依赖

确保安装以下依赖：

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
```

## 🎨 样式说明

- **TailwindCSS**: 3.4.11 - 使用工具类样式
- **Element Plus**: 2.11.4 - UI组件库（中文化）
- **颜色主题**: 
  - 主色: #CB261C (红色)
  - 背景: #0b1220 (深色)
- **字体**: Inter + PingFang SC + Microsoft YaHei

## 🌍 国际化

- **支持语言**: 中文 (zh-CN) 和 英文 (en)
- **配置文件**: `i18n.js`
- **使用方法**: `{{ $t('key') }}` 或在Vue中使用 `t('key')`

## ✅ 集成检查清单

- [ ] shop文件夹复制到 `assets/vue/shop/`
- [ ] 所有components文件夹已复制
- [ ] 所有pages文件夹已复制
- [ ] 所有data文件夹已复制
- [ ] tailwind.config.js 已配置
- [ ] postcss.config.js 已配置
- [ ] webpack.config.js 已配置（Encore）
- [ ] Symfony Controller 已创建
- [ ] Twig 模板已创建
- [ ] npm install 已执行
- [ ] npm run build 成功编译
- [ ] 访问 /shop 显示首页

## 🔗 相关文件

- 源文件位置: 原项目 `src/` 目录
- 集成文档: 项目根目录 `SYMFONY_UX_VUE_SHOP_INTEGRATION_DETAILED.md`
- 详细指南: `SYMFONY_UX_VUE_INTEGRATION_GUIDE.md`

## 📝 注意事项

1. **组件导入**: 确保所有组件路径使用相对路径（如 `./components/SiteHeader.vue`）
2. **样式导入**: Home.vue 已使用TailwindCSS类名，无需额外样式文件
3. **路由**: 此模块已移除Vue Router，使用Symfony路由替代
4. **API调用**: 组件中的API调用需要对应的Symfony API端点

## 🚨 常见问题

**Q: 样式没有应用？**
A: 检查 tailwind.config.js 的 content 配置，确保包含 `./assets/vue/shop/**/*.{vue,js}`

**Q: 组件找不到？**
A: ��保所有组件文件都已复制到 `components/` 目录

**Q: 页面显示空白？**
A: 检查Twig模板中是否有 `<div id="shop-app"></div>` 挂载点，以及 JavaScript 是否正确加载

## 📚 文档

详细的集成步骤请参考项目根目录的以下文件：
- `SYMFONY_UX_VUE_INTEGRATION_DETAILED.md` - 完整集成指南
- `SYMFONY_UX_VUE_INTEGRATION_GUIDE.md` - 集成策略

## 📞 支持

如需帮助，请参考以下资源：
- [Vue 3 文档](https://vuejs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Element Plus 文档](https://element-plus.org/)
- [Symfony 文档](https://symfony.com/doc/current/frontend)
