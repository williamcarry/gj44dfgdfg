# 快速集成步骤

本文件包含集成shop文件夹到Symfony项目的最小化步骤。

## 第1步：复制shop文件夹

```bash
# 复制整个shop文件夹到你的Symfony项目
cp -r shop /path/to/your-symfony-project/assets/vue/shop
```

## 第2步：复制所需子文件夹

### 从源项目复制components
```bash
cp -r src/components/* /path/to/symfony/assets/vue/shop/components/
```

### 从源项目复制pages  
```bash
cp -r src/pages/* /path/to/symfony/assets/vue/shop/pages/
```

### 从源项目复制data
```bash
cp -r src/data/* /path/to/symfony/assets/vue/shop/data/
```

**检查清单** - 确保这些文件存在：

Components（31个）必须包括：
- ✅ SiteHeader.vue
- ✅ CategoryNavBar.vue
- ✅ CategorySidebar.vue
- ✅ SiteFooter.vue
- ✅ RightFloatNav.vue
- ✅ HeroBanner.vue
- ✅ 以及其他26个组件...

Pages（60+个）必须包括：
- ✅ ItemDetailPage.vue
- ✅ LoginPage.vue
- ✅ HelpCenterPage.vue
- ✅ 以及其他页面...

Data（6个文件）必须包括：
- ✅ faqData.js (已修复乱码)
- ✅ helpCenterNav.js
- ✅ products.js
- ✅ operationGuideFaqData.js
- ✅ operationGuideNav.js
- ✅ missingFaqs.json

## 第3步：安装npm依赖

```bash
cd /path/to/your-symfony-project

npm install
npm install -D tailwindcss postcss autoprefixer webpack-encore
```

## 第4步：创建/更新Symfony配置文件

### 根目录文件

#### tailwind.config.js
```javascript
export default {
  content: [
    './templates/**/*.{html,twig}',
    './assets/vue/shop/**/*.{vue,js}',
    './node_modules/element-plus/es/components/**/*.vue',
  ],
  theme: {
    container: { center: true, padding: '1rem', screens: { xl: '1200px', '2xl': '1500px' } },
    extend: {
      colors: {
        primary: '#CB261C',
        slate: { 950: '#0b1220' },
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', 'Arial', 'sans-serif'],
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

#### webpack.config.js
```javascript
const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('shop', './assets/vue/shop/main.js')
  .addStyleEntry('styles', './assets/styles/app.css')
  .enableVueLoader()
  .enablePostCssLoader()
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

module.exports = Encore.getWebpackConfig()
```

#### assets/styles/app.css
```css
@import '../vue/shop/styles/main.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 第5步：创建Symfony Controller

创建文件：`src/Controller/Shop/ShopController.php`

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

## 第6步：创建Twig模板

创建目录：`templates/shop/`

### templates/shop/base.html.twig
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
    <div id="shop-app"></div>
    {% block content %}{% endblock %}
    {% block javascripts %}
        {{ encore_entry_script_tags('shop') }}
    {% endblock %}
</body>
</html>
```

### templates/shop/home.html.twig
```twig
{% extends 'shop/base.html.twig' %}

{% block title %}商城首页{% endblock %}

{% block content %}
{# Vue应用会自动在#shop-app中渲染 #}
{% endblock %}
```

## 第7步：编译和测试

```bash
# 开发模式编译
npm run dev

# 或生产构建
npm run build

# 启动Symfony开发服务器
symfony serve

# 访问 http://127.0.0.1:8000/shop
```

## ✅ 验证清单

- [ ] shop文件夹在 `assets/vue/shop/`
- [ ] components/ 包含31个组件文件
- [ ] pages/ 包含60+个页面文件
- [ ] data/ 包含6个数据文件
- [ ] tailwind.config.js 已创建
- [ ] postcss.config.js 已创建
- [ ] webpack.config.js 已创建/更新
- [ ] ShopController.php 已创建
- [ ] templates/shop/ 目录已创建
- [ ] templates/shop/base.html.twig 已创建
- [ ] templates/shop/home.html.twig 已创建
- [ ] npm install 已完成
- [ ] npm run build 成功 (无错误)
- [ ] 访问 /shop 显示正常首页

## 🔍 故障排除

### 样式不显示
```bash
# 重新编译
npm run build

# 清除Symfony缓存
php bin/console cache:clear
```

### 组件找不到
检查路径：`assets/vue/shop/components/ComponentName.vue`

### JavaScript错误
检查浏览器console，查看完整错误信息

### 页面空白
- 确保 `<div id="shop-app"></div>` 在Twig模板中
- 检查浏览器DevTools查看加载的文件

## 📞 获取帮助

- 完整文档：`README.md`
- 详细指南：项目根目录的 `SYMFONY_UX_VUE_INTEGRATION_DETAILED.md`
- 问题排除：`SYMFONY_UX_VUE_INTEGRATION_GUIDE.md`

## ⏱️ 预计耗时

- 复制文件：5分钟
- 创建配置：10分钟
- 创建Controller和模板：5分钟
- npm编译：3-5分钟
- **总计：约25分钟**

## 🎉 成功标志

当��看到以下内容，说明集成成功：
- ✅ 首页显示商品列表
- ✅ 页面有红色导航栏（#CB261C）
- ✅ 响应式设计工作正常
- ✅ 没有控制台错误
- ✅ 样式正确应用
