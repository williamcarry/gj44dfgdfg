# Fusion Vue Tailwind Starter — 开发文档 (README)

本文档旨在为后续开发者（包括 AI 助手）提供对项目的整体理解、运行/开发流程、代码结构与��要页面/组件的说明，便于快速上手与维护。

---

## 项目概述

- 项目名称：fusion-vue-tailwind-starter
- 目的：基于 Vue 3 + Vite + Tailwind 的分销商城管理前端模版，包含帮助中心、商品管理、下单、售后等常见页面。
- 主要语言：TypeScript + Vue 3（SFC）

---

## 技术栈

- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- Element Plus（部分组件）
- Vitest（单元测试）
- ESLint / Prettier

---

## 快速启动（本地开发）

1. 安装依赖：`ni`（项目中已记录）或 `npm install` / `pnpm install`（根据团队约定）
2. 本地开发：
   - 启动：`npm run dev`（底层使用 Vite）
   - 打包：`npm run build` 或 `npm run build-only`
   - 预览构建：`npm run preview`
3. 测试：`npm run test:unit`（Vitest）
4. 代码检查与格式化：
   - Lint：`npm run lint`
   - Format：`npm run format`

注意：项目默认 Vite 本地端口为 `5173`（在开发环境中代理到该端口）。

---

## 常用脚本（package.json 中）

- dev: `vite`
- build: `run-p type-check "build-only {@}" --`
- preview: `vite preview`
- test:unit: `vitest`
- lint: `eslint . --fix`
- format: `prettier --write src/`
- ensure-encoding: `node scripts/ensure-utf8.cjs`
- download:supplier-images / download:product-images：辅助脚本

---

## 项目结构（概要）

- src/
  - assets/           # 全局样式与静态资源（base.css, main.css, logo.svg）
  - components/       # 可复用组件（icons、布局、UI 片段）
  - data/             # 静态数据（如 FAQ）
    - faqData.ts      # 帮助中心 FAQ 数据存放位置（数组 + getFaqById）
  - pages/            # 路由页面（单文件组件）
  - router/           # 路由配置（src/router/index.ts）
  - i18n.ts           # 国际化（若使用）
  - main.ts           # 应用入口
  - App.vue           # 根组件

其他：
- scripts/            # 辅助脚本（图片下载、编码保证等）
- public/             # 公共静态资源

---

## 主要页面说明（src/pages）

下面对 `src/pages/*.vue` 中每个页面文件逐一说明：文件名、预计路由（或路由片段）、页面职责、关键数据来源与注意事项。解释尽量保守（基于文件名与项目惯例），如需更精确的信息，请打开对应 `.vue` 文件查看实现细节。

- AboutSaleyeePage.vue — /about
  - 职责：展示公司与平台简介、发展历程、联系方式等静态公司信息。
  - 数据：主要为静态文案与图片资源（assets/public）。

- AddressBookPage.vue — /address-book
  - 职责：用户地址管理（增删改查地址簿）、显示用户已保存地址列表。
  - 关键交互：表单校验、地址条目分页/导入导出（若有）。

- AfterSalesManagementPage.vue — /after-sales
  - 职���：售后工单管理主界面，显示售后单列表、筛选与操作（申诉、补充凭证、查看状态）。
  - 数据：从后端 API 拉取售后工单数据并支持附件上传。

- AfterSalesNotificationDetailPage.vue — /after-sales/notification/:id
  - 职责：售后通知详情页，展示通知正文与处理历史。

- AfterSalesNotificationPage.vue — /after-sales/notifications
  - 职责：售后相关通知列表页。

- AllCategoriesPage.vue — /categories
  - 职责：展示商品分类树、分类筛选与入口，通常用于选品与浏览。

- AllProductsPage.vue — /products
  - 职责：商品搜索与列表页，支持关键词搜索、筛选（品类、价格、库存）和排序。
  - 关键交互：分页、快速添加到收藏、批量下载数据包（如项目场景）。

- BasicInfoPage.vue — /settings/basic
  - 职责：用户或店铺的基础信息编辑页（公司名、联系人、联系方式等）。

- BatchOrderPage.vue — /orders/batch
  - 职责：批量下单或批量导入订单功能页面，提供模板下载、上传与验证。

- BrandAuthPage.vue — /brand-auth
  - 职责：品牌授权/品牌区相关的申请页面，上传资质资料并提交审核。

- CartPage.vue — /cart
  - 职责：购物车页，展示待采购��� SKU、修改数量、结算入口。

- CashbackActivityPage.vue — /activity/cashback
  - 职责：返现类活动页面，活动规则与商品入口展示。

- ContactUsPage.vue — /contact-us
  - 职责：平台联系方式、在线留言表单、客服渠道信息。

- DirectDeliveryPage.vue — /direct-delivery
  - 职责：中国直发专区或直发商品说明页，展示直发物流与时效信息（与中国直发专区相关）。

- DiscountSalePage.vue — /discounts
  - 职责：促销与折扣活动页面。

- DistributorsPage.vue — /distributors
  - 职责：分销商相关说明（入驻、权益、政策）或分销商管理入口。

- DownloadCenterPage.vue — /download-center
  - 职责：提供商品数据包、素材、文档的下载入口与下载历史记录。

- ExceptionOrderPage.vue — /orders/exception
  - 职责：异常订单管理（例如妥投问题、拦截失败、缺货等）并配合客服处理。

- FAQDetailPage.vue — /faq/:id
  - 职责：FAQ（帮助中心）问题详情页。
  - ���键：通过路由 param（如 hp123456）调用 `getFaqById`（src/data/faqData.ts）并渲染 question 与 content；若未找到则显示“找不到此问题”提示并提供返回帮助中心链接。

- FeedbackPage.vue — /feedback
  - 职责：用��体验反馈与建议收集页面，通常含表单、截图上传与提交状态。

- GettingStartedPage.vue — /getting-started
  - 职责：入门教程、快速上手指南页面（图文或视频示例）。

- HelpCenterPage.vue — /help-center
  - 职责：帮助中心主页面，左侧 FAQ 分类树、右侧 FAQ 摘要/热门问题、以及搜索功能。
  - 数据来源：部分静态数据（App.vue 内配置或 src/data）与 `src/data/faqData.ts`。
  - 交互：搜索关键字过滤、侧栏展开/收起、跳转到 FAQDetail。

- HotSalesPage.vue — /hot-sales
  - 职责：热销商品/爆款专区展示。

- InquiryOrderPage.vue — /orders/inquiry
  - 职责：询单/平台载单相关入口页面。

- InventoryUpdatePage.vue — /inventory/update
  - 职责：库存更新（手动/批量/导入）界面，或与供应商库存同步入口。

- ItemDetailPage.vue — /product/:sku
  - 职责：商品详情页，展示商品图片、规格、价格、库存、加入购物车/下载数据包等操作。

- ListingProductsPage.vue — /listing-products
  - 职责：商品刊登管理页（供应商/分销商用于提交刊登、查看刊登状态）。

- ListingPushPage.vue — /listing-push
  - 职责：刊登推送/一键刊登相关页面（例如 FlasTing 一键刊登 集成）。

- LoginPage.vue — /login
  - 职责：登录页（手机号/邮箱 + 验证/密码登录）、登录相关校验与跳转。

- LogisticsMappingPage.vue — /logistics-mapping
  - 职责：物流渠道映射/配置页（将平台物流与第三方物流映射）。

- MallAnnouncementDetailPage.vue — /announcement/:id
  - 职责：平台公告详情页（如顶部“公司名称被冒用声明”）。

- MallAnnouncementPage.vue — /announcements
  - 职责：公告列表页。

- MarketingActivityDetailPage.vue / MarketingActivityPage.vue — /activity/:id, /activity
  - 职责：营销活动详情与活动列表页。

- MembershipPage.vue — /membership
  - 职责：会员权益、等级说明页（例如下载包次数与会员等级关系）。

- MyBalancePage.vue — /user/balance
  - 职责：我的余额、提现申请与提现记录。

- MyInvoicesPage.vue — /user/invoices
  - 职责：发票管理（申请、下载、开票信息）。

- MyOrderPage.vue — /orders
  - 职责：用户订单列表（含��选、查看详情、发货状态、售后入口）。

- MyVouchersPage.vue — /user/vouchers
  - 职责：我的采购券/优惠券管理页面。

- NewPage.vue — /new
  - 职责：占位或临时页面，用于快速原型或测试。

- OrderNotificationDetailPage.vue / OrderNotificationPage.vue — /order-notifications
  - 职责：订单相关系统通知与详情查看。

- OrderSettingsPage.vue — /order-settings
  - 职责：订单处理相关设置（退货保障、物流保障配置等）。

- PartnersPage.vue — /partners
  - 职责：合作伙伴展示页（Amazon、eBay、Shopify 等）。

- PaymentAccountPage.vue — /payment-account
  - 职责：支付收款账号管理（绑定 Payoneer / 银行账户等）。

- PlatformAuthPage.vue — /platform-auth
  - 职责：平台授权/店铺授权（授权载单、店铺绑定等）的入口与状态页。

- PlatformMessageDetailPage.vue / PlatformMessagePage.vue — /messages
  - 职责：平台站内消息/通知列表与详情。

- PlatformOrderPage.vue — /platform-orders
  - 职责：平台级订单管理面板（供内部或供应商使用）。

- ProductManagementPage.vue — /product-management
  - 职责：供应商商品管理控制台（创建、编辑、上下架、批量操作）。

- ProductNotificationDetailPage.vue / ProductNotificationPage.vue — /product-notifications
  - 职责：商品通知（如变价、下架、库存警报）列表与详情。

- RegisterPage.vue — /register
  - 职责：注册页面（个人/企业注册、选择账户类型、实��认证入口）。

- SecurityPage.vue — /security
  - 职责：账号安全设置（修改密码、二要素认证、登录设备管理）。

- SkuMappingPage.vue — /sku-mapping
  - 职责：SKU 映射工具（平台 SKU 与店铺 SKU 的映射配置）。

- SupplierPage.vue — /supplier
  - 职责：供应商入驻/供应商管理页。

- UpdateLogPage.vue — /update-log
  - 职责：版本更新日志页面，展示历史更新内容。

- UserCenterPage.vue — /user
  - 职责：用户中心仪表盘（我的订单、资产、消息的聚合入口）。

- VATPolicyPage.vue — /vat-policy
  - 职责：VAT（增值税）政策解读页，说明税收政策、发票、税号相关流程。

以上每个页面通常会使用公共布局（Header、Footer、侧栏）与���享组件（如 SiteFooter.vue、SiteHeader.vue、Breadcrumb 等）。若需要我把每个 `.vue` 文件里暴露的 props、emits、data keys、或实际路由配置匹配到 `src/router/index.ts`，我可以逐一打开这些文件并生成更精确的字段说明。

(如需，我可以继续：)
- 自动从 `src/router/index.ts` 读取路由配置并把每个页面的路由路径列出来；
- 为每个页面列出其在代码中使用到的数据源（API 路径或本地 data 文件）与关键组件引用；
- 生成一个简化的站点地图（基于路由表）。

---

继续保留其余 README 内容。

---

## 帮助中心与 FAQ 数据管理

### 路由配置（src/router/index.ts）

项目路由由 src/router/index.ts 管理。当前路由表（按文件 src/router/index.ts）如下：

- /                -> AllProductsPage (name: home)
- /all-products    -> AllProductsPage (name: all-products)
- /help-center     -> HelpCenterPage (name: help-center)
- /faq/:id         -> FAQDetailPage (name: faq-detail)  (props: true)
- /item/:id        -> ItemDetailPage (name: item-detail) (props: true)
- /* (fallback)    -> redirect to /

说明：
- 大多数页面（src/pages 下）会被按需懒加载并在路由中注册；当前 router 只包含上面一小部分核心路由，其他页面可能通过内部链接或插件按需展示（例如管理面板、分销后台等）。
- 若需要完整的站点路由地图，建议把更多页面在 src/router/index.ts 中逐一注册，或使用自动化脚本（扫描 src/pages 并生成路由）来维护。


## 帮助中心与 FAQ 数据管理

- 文件：`src/data/faqData.ts`
  - 导出 `faqData: FAQItem[]`（数组）以及 `getFaqById(id: string)` 辅助函数。
  - 新增 FAQ：在数组末尾追加对象，结构为：
    {
      id: 'hp123456',
      question: '问题标题',
      url: 'https://www.saleyee.com/faq/hp123456.html',
      content: '问题答案 HTML/纯文本'
    }
  - 保存后开发服务器会热更新，页面会自动刷新（若 Vite 正在运行）。

- 页面：
  - HelpCenterPage.vue：渲染 FAQ 分类侧栏、搜索和FAQ列表；从 `App.vue` 中的配置或 `src/data` 加载数据
  - FAQDetailPage.vue：通过路由参数（`/faq/:id`）调用 `getFaqById` 并显示内容；若找不到则显示“找不到此问题，返回帮助中心”等友好提示。

---

## 组件与样式规范

- 使用单文件组件（.vue），组件内部使用 `<script setup lang="ts">` 风格（如仓库中多数文件）。
- 样式：Tailwind CSS 为主，另有少量全局样式文件 `src/assets/base.css`、`src/assets/main.css`。
- 国际化/文本：若后续要支持多语言，建议在 i18n.ts 中集中管理 key-value，页面内使用 $t()。当前仓库以简体中文为主要文本。

---

## 测试与质量保证

- 单元测试：`vitest`，运行 `npm run test:unit`。
- 静态检查：`eslint`（TypeScript + Vue 插件），运行 `npm run lint`。
- 代码风格：`prettier`，运行 `npm run format`。

建议：PR 前运行 lint 与测试并修复问题。

---

## 常见问题（调试指��）

- Vite 启动失败：确认 `node` 与依赖安装完整；使用 `ni` 或 `npm install` 安装依赖。
- 找不到脚本 `serve`：仓库使用 `dev`（Vite），如果 CI/部署配置期望 `serve`，请改为 `npm run dev` 或在 package.json 添加 `serve` 脚本（仅在明确需要时）。
- 热更新不生效：确认 Vite 端口（默认 5173）没有被占用，浏览器没有缓存硬刷新。

---

## 开发/提交流程建议

- 分支策略：feature/*、fix/*、hotfix/*、release/*
- 提交说明：遵循语义化提交（feat:, fix:, docs:, chore: 等）
- PR 要求：描述变更、关联 issue、运行测试并截图/CI 通过

---

## 可接入的 MCP 服务（建议及用途）

当需要后端、托管或集成服务时，建议使用以下 MCP（Builder.io 平台中的集成项）来扩展项目功能。下列 MCP 均可在 Builder.io 的 MCP 面板中连接：

- Supabase — 数据库、认证、实时订阅（优先推荐用于数据库与认证）
- Neon — serverless Postgres（替代 Postgres 的托管选项）
- Netlify — 部署与托管前端站点
- Zapier — 自动化工作流、第三方整合
- Figma — 设计到代码（使用 Builder.io Figma 插件转换设计）
- Builder CMS — ���容管理、页面编辑与模型管理
- Linear — 项目与任��管理同步
- Notion — 文档、知识库管理
- Sentry — 异常与性能监控
- Context7 — 即时的文档参考与代码示例
- Semgrep — 静态安全扫描（SAST）
- Prisma Postgres — ORM 与数据库模式管理
- 以及 Builder.io 自身的集成选项

如何连接：打开 Builder.io 控制台并点击 [Open MCP popover](#open-mcp-popover)，选择您需要的服务并按步骤完成授权。举例：
- 要连接 Supabase，请点击 [Connect to Supabase](#open-mcp-popover)
- 要连接 Neon，请点击 [Connect to Neon](#open-mcp-popover)
- 要连接 Netlify，请点击 [Connect to Netlify](#open-mcp-popover)
- 要连接 Figma，请点击 [Connect to Figma](#open-mcp-popover)

为什么使用这些 MCP：
- Supabase / Neon / Prisma Postgres：用于存储动态内容（如 FAQ 后端、用户、订单等），授权与实时功能；优先推荐 Supabase 作为首选数据库与 Auth 方案。
- Netlify：简单、快速部署前端静态站点并支持自动化构建。
- Builder CMS：用于把帮助中心、FAQ 等内容交给非开发人员维护。
- Sentry：线上异常监控，便于定位运行时错误。

---

## 额外说明

- 若要把 FAQ 数据从外部源同步到 `src/data/faqData.ts`，���荐把 FAQ 存到外部数据库或 Builder CMS，再在页面中通过 API 拉取并缓存到前端（避免直接在代码中频繁编辑静态文件）。
- 请勿在代码库中提交任何明文的密钥或敏感凭证；使用平台的环境变量或 Builder.io 的 MCP 面板进行安全配置。

---

开发文档补全（快速清单）

- 环境与依赖
  - Node.js 版本：推荐 18+；使用 pnpm/ni/npm 按团队约定安装依赖。
  - 本地运行：npm run dev（基于 Vite，默认端口 5173）。
  - 构建预览：npm run build && npm run preview。

- 重要环境变量（示例）
  - VITE_API_BASE_URL=https://api.example.com
  - VITE_SENTRY_DSN=___REPLACE___
  - 请使用 CI/平台环境变量或 Builder.io MCP 面板配置真实凭证，切勿在代码中提交密钥。

- 如何添加/更新 FAQ
  1. 本地：编辑 `src/data/faqData.ts` 或 `src/data/operationGuideFaqData.ts`，在数组末尾按结构追加 FAQ 对象（id, question, url, content）。
  2. 推荐：将 FAQ 存入外部 CMS（如 Builder CMS 或 Supabase），在页面中通过 API 拉取并缓存，避免频繁提交静态文件。

- 代码风格与约定
  - 使用 `<script setup lang="ts">`，组件采用 SFC 单文件组件。
  - Tailwind 为主，少量全局样式放在 `src/assets`。
  - 提交信息遵循语义化（feat:, fix:, docs:, chore:）。

- 测试与 CI
  - 单元测试：`npm run test:unit`（Vitest）；在 PR 中确保关键逻辑有覆盖。
  - Lint/Format：`npm run lint`、`npm run format`，在提交前运行并修复问题。

- 部署建议
  - 静态站点：Netlify / Vercel 等；在 CI 中运行 `npm run build` 并部署生成产物。
  - 若使用 Supabase/Neon 作为后端，请在 CI 中注入数据库凭证并运行必要的迁移脚本。

- 常见维护任务
  - 修复乱码：确保文件使用 UTF-8 编码，仓库可运行 `node scripts/ensure-utf8.cjs` 验证并修复编码问题。
  - 更新依赖：使用 `ni` 或 `pnpm up` 维护依赖，运行测试和 lint 后再提交。

- 快速排错流程
  1. 复现问题并检查浏览器控制台与 Vite 终端日志。
  2. 是否为数据问题（静态 data 文件 / API 返回）或样式问题（CSS/布局）？
  3. 添加临时日志或单元测试以定位问题并提交修复分支。

需要我代劳的项（我可以执行）：
- 把 README.md 提交到仓库（已编辑），或把 README 内容转为仓库 wiki。
- 将本地静态 FAQ 迁移到 Supabase 或 Builder CMS 并实现前端拉取（需您授权/连接 MCP）。

请告诉我您要我继续执行哪一项，我会开始对应的改动。
