<!--
CSS 引��说明：
1. 全局样式：在 src/main.ts 中自动加载
   - src/assets/main.css (导入 src/assets/base.css)
     - @tailwind base, components, utilities (Tailwind CSS)
     - 全局 CSS 变量 (--color-*, --section-gap, --category-width 等)
   - Element Plus 样式 (element-plus/dist/index.css)
2. ��面局����样式：该文件底部的 <style scoped> 块
3. 导入的子组件样式：由各子组件的 <style scoped> 块提供
-->
<template>
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <div class="flex-1 border-t" style="border-color: rgb(203, 38, 28);">
      <div class="mx-auto w-full max-w-[1500px] md:min-w-[1150px] px-4 md:px-0">
        <div class="flex gap-[15px]">
          <!-- 左侧导航菜单 -->
          <div class="hidden md:block shrink-0 border-r border-slate-200 bg-white sidebar-menu" :style="{ width: 'var(--category-width)', paddingBottom: '0px', paddingTop: '0px' }">
            <!-- 个人中心组 -->
            <div>
              <button
                @click="toggleGroup('personal')"
                class="w-full flex items-center gap-2 border-b border-slate-200 bg-white hover:bg-[#CB261C] hover:text-white transition-colors cursor-pointer"
                style="color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <User class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">个人��心</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.personal ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.personal" class="overflow-hidden">
                <SidebarItem
                  label="个人中心"
                  :active="activeMenu === 'info'"
                  @click="activeMenu = 'info'"
                />
                <SidebarItem
                  label="基本信息"
                  :active="activeMenu === 'baseinfo'"
                  @click="activeMenu = 'baseinfo'"
                />
                <SidebarItem
                  label="地址簿"
                  :active="activeMenu === 'address'"
                  @click="activeMenu = 'address'"
                />
                <SidebarItem
                  label="VAT税号管理"
                  :active="activeMenu === 'vat'"
                  @click="activeMenu = 'vat'"
                  :with-icon="true"
                />
                <SidebarItem
                  label="账户安全"
                  :active="activeMenu === 'security'"
                  @click="activeMenu = 'security'"
                />
              </div>
            </div>

            <!-- ��息中心组 -->
            <div>
              <button
                @click="toggleGroup('messages')"
                class="w-full flex items-center gap-2 border-b border-slate-200 hover:bg-[#CB261C] hover:text-white transition cursor-pointer"
                style="background-color: white; color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <MessageSquare class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">消息中心</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.messages ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.messages" class="overflow-hidden">
                <SidebarItem
                  label="商城公告"
                  :active="activeMenu === 'mall-announcement'"
                  @click="activeMenu = 'mall-announcement'"
                />
                <SidebarItem
                  label="营销活动"
                  :active="activeMenu === 'marketing-activity'"
                  @click="activeMenu = 'marketing-activity'"
                />
                <SidebarItem
                  label="订单通知"
                  :active="activeMenu === 'order-notification'"
                  @click="activeMenu = 'order-notification'"
                />
                <SidebarItem
                  label="售后通知"
                  :active="activeMenu === 'after-sales-notification'"
                  @click="activeMenu = 'after-sales-notification'"
                />
                <SidebarItem
                  label="平台消息"
                  :active="activeMenu === 'platform-message'"
                  @click="activeMenu = 'platform-message'"
                />
              </div>
            </div>

            <!-- 商品管理组 -->
            <div>
              <button
                @click="toggleGroup('products')"
                class="w-full flex items-center gap-2 border-b border-slate-200 hover:bg-[#CB261C] hover:text-white transition cursor-pointer"
                style="background-color: white; color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <Package class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">商品管理</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.products ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.products" class="overflow-hidden">
                <SidebarItem
                  label="购物车"
                  :active="activeMenu === 'shopping-cart'"
                  @click="navigateToCart"
                />
                <SidebarItem
                  label="商品管理"
                  :active="activeMenu === 'products'"
                  @click="activeMenu = 'products'"
                  :badge="1"
                />
                <SidebarItem
                  label="刊登���送列表"
                  :active="activeMenu === 'listing-push'"
                  @click="activeMenu = 'listing-push'"
                />
                <SidebarItem
                  label="刊登商����列表"
                  :active="activeMenu === 'listing-products'"
                  @click="activeMenu = 'listing-products'"
                />
                <SidebarItem
                  label="品牌授权"
                  :active="activeMenu === 'brand-auth'"
                  @click="activeMenu = 'brand-auth'"
                />
                <SidebarItem
                  label="商品通知"
                  :active="activeMenu === 'product-notification'"
                  @click="activeMenu = 'product-notification'"
                />
              </div>
            </div>

            <!-- 营销活动组 -->
            <div>
              <button
                @click="toggleGroup('marketing')"
                class="w-full flex items-center gap-2 border-b border-slate-200 hover:bg-[#CB261C] hover:text-white transition cursor-pointer"
                style="background-color: white; color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <Megaphone class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">营销��动</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.marketing ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.marketing" class="overflow-hidden">
                <SidebarItem
                  label="返现活动"
                  :active="activeMenu === 'sales'"
                  @click="activeMenu = 'sales'"
                />
              </div>
            </div>

            <!-- 订单管理组 -->
            <div>
              <button
                @click="toggleGroup('orders')"
                class="w-full flex items-center gap-2 border-b border-slate-200 hover:bg-[#CB261C] hover:text-white transition cursor-pointer"
                style="background-color: white; color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <ShoppingCart class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">订单管理</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.orders ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.orders" class="overflow-hidden">
                <SidebarItem
                  label="咨价单"
                  :active="activeMenu === 'inquiry-order'"
                  @click="activeMenu = 'inquiry-order'"
                />
                <SidebarItem
                  label="我的订��"
                  :active="activeMenu === 'orders'"
                  @click="activeMenu = 'orders'"
                />
                <SidebarItem
                  label="平台载单"
                  :active="activeMenu === 'platform-orders'"
                  @click="activeMenu = 'platform-orders'"
                />
                <SidebarItem
                  label="���量下单"
                  :active="activeMenu === 'batch-orders'"
                  @click="activeMenu = 'batch-orders'"
                />
                <SidebarItem
                  label="异常订单"
                  :active="activeMenu === 'exception-orders'"
                  @click="activeMenu = 'exception-orders'"
                />
              </div>
            </div>

            <!-- 客户服务组 -->
            <div>
              <button
                @click="toggleGroup('customers')"
                class="w-full flex items-center gap-2 border-b border-slate-200 hover:bg-[#CB261C] hover:text-white transition cursor-pointer"
                style="background-color: white; color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <Users class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">客户服务</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.customers ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.customers" class="overflow-hidden">
                <SidebarItem
                  label="售后管理"
                  :active="activeMenu === 'after-sales-management'"
                  @click="activeMenu = 'after-sales-management'"
                />
                <SidebarItem
                  label="下载中心"
                  :active="activeMenu === 'download-center'"
                  @click="activeMenu = 'download-center'"
                />
              </div>
            </div>

            <!-- 第三方开店��� -->
            <div>
              <button
                @click="toggleGroup('platforms')"
                class="w-full flex items-center gap-2 border-b border-slate-200 hover:bg-[#CB261C] hover:text-white transition cursor-pointer"
                style="background-color: white; color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <Store class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">第三方开店</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.platforms ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.platforms" class="overflow-hidden">
                <SidebarItem
                  label="平台授权"
                  :active="activeMenu === 'platform-auth'"
                  @click="activeMenu = 'platform-auth'"
                />
                <SidebarItem
                  label="载单设置"
                  :active="activeMenu === 'order-settings'"
                  @click="activeMenu = 'order-settings'"
                />
                <SidebarItem
                  label="SKU映射"
                  :active="activeMenu === 'sku-mapping'"
                  @click="activeMenu = 'sku-mapping'"
                />
                <SidebarItem
                  label="物流映射"
                  :active="activeMenu === 'logistics-mapping'"
                  @click="activeMenu = 'logistics-mapping'"
                />
                <SidebarItem
                  label="库存更新"
                  :active="activeMenu === 'inventory-update'"
                  @click="activeMenu = 'inventory-update'"
                />
                <SidebarItem
                  label="更新记录"
                  :active="activeMenu === 'update-log'"
                  @click="activeMenu = 'update-log'"
                />
              </div>
            </div>

            <!-- 回复管理组 -->
            <div>
              <button
                @click="toggleGroup('feedback')"
                class="w-full flex items-center gap-2 border-b border-slate-200 hover:bg-[#CB261C] hover:text-white transition cursor-pointer"
                style="background-color: white; color: rgb(51, 51, 51); height: 44px; line-height: 44px; padding-left: 15px; padding-right: 15px; text-decoration-color: rgb(51, 51, 51); outline-color: rgb(51, 51, 51); font-size: 14px; font-weight: 500;"
              >
                <Wallet class="h-5 w-5" style="color: rgb(203, 38, 28); flex-shrink: 0;" />
                <span class="text-sm">资产管��</span>
                <ChevronDown
                  class="h-4 w-4 ml-auto transition-transform duration-300"
                  :style="{ transform: expandedGroups.feedback ? 'rotate(0deg)' : 'rotate(-90deg)', color: 'rgb(156, 163, 175)' }"
                />
              </button>
              <div v-if="expandedGroups.feedback" class="overflow-hidden">
                <SidebarItem
                  label="我的余额"
                  :active="activeMenu === 'my-balance'"
                  @click="activeMenu = 'my-balance'"
                />
                <SidebarItem
                  label="我的账单"
                  :active="activeMenu === 'my-invoices'"
                  @click="activeMenu = 'my-invoices'"
                />
                <SidebarItem
                  label="我的采购券"
                  :active="activeMenu === 'my-vouchers'"
                  @click="activeMenu = 'my-vouchers'"
                />
                <SidebarItem
                  label="支付账号管理"
                  :active="activeMenu === 'payment-account'"
                  @click="activeMenu = 'payment-account'"
                />
              </div>
            </div>

          </div>

          <!-- 右侧主内容 -->
          <div class="flex-1 min-w-0">
            <!-- 个���中心面板 -->
            <div v-if="activeMenu === 'info'" class="bg-white">
              <!-- 顶部：用户信息 + VIP等级（30% + 70%） -->
              <div class="flex border-b border-slate-200" style="gap: 10px; background-color: #f0f0f0;">
                <!-- 左侧30% - 用户信息 -->
                <div style="width: calc(25% - 5px); padding: 20px; background-color: white;">
                  <div>
                    <h3 title="金红元" style="border-color: rgb(17, 17, 17); color: rgb(17, 17, 17); float: left; font-size: 16px; height: 34px; line-height: 34px; margin-right: 10px; max-width: 100%; outline-color: rgb(17, 17, 17); overflow-x: hidden; overflow-y: hidden; text-decoration-color: rgb(17, 17, 17); text-emphasis-color: rgb(17, 17, 17); text-overflow: ellipsis; text-wrap: nowrap; white-space: nowrap; margin: 0; padding: 0;">金红元</h3>
                    <div style="display: inline-block; height: 34px; margin-right: 10px; position: relative; z-index: 2;">
                      <i style="background-image: url('https://www.saleyee.com/static/imgs/18230253690308fc8b46fddd29f8d970.png'); background-repeat: no-repeat; cursor: pointer; display: inline-block; height: 16px; margin-bottom: 7.5px; margin-top: 7.5px; width: 16px;"></i>
                      <i style="background-image: url('https://www.saleyee.com/static/imgs/18230253690308fc8b46fddd29f8d970.png'); background-repeat: no-repeat; cursor: pointer; display: inline-block; height: 16px; margin-bottom: 7.5px; margin-top: 7.5px; width: 16px;"></i>
                      <i style="background-image: url('https://www.saleyee.com/static/imgs/18230253690308fc8b46fddd29f8d970.png'); background-repeat: no-repeat; cursor: pointer; display: inline-block; height: 16px; margin-bottom: 7.5px; margin-top: 7.5px; width: 16px;"></i>
                      <i style="background-image: url('https://www.saleyee.com/static/imgs/18230253690308fc8b46fddd29f8d970.png'); background-repeat: no-repeat; cursor: pointer; display: inline-block; height: 16px; margin-bottom: 7.5px; margin-top: 7.5px; width: 16px;"></i>
                      <i style="background-image: url('https://www.saleyee.com/static/imgs/18230253690308fc8b46fddd29f8d970.png'); background-repeat: no-repeat; cursor: pointer; display: inline-block; height: 16px; margin-bottom: 7.5px; margin-top: 7.5px; width: 16px;"></i>
                    </div>
                  </div>

                  <div style="clear: both;"></div>
                  <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <div style="display: inline-block; position: relative;">
                      <span style="display: inline-block; width: 32px; height: 32px; background: url('https://www.saleyee.com/static/imgs/55bc83c926f63039a743975129d0fa45.png') no-repeat; background-position: 0 -32px; cursor: pointer;"></span>
                      <p style="line-height: 30px; white-space: nowrap; display: none; background: white; box-shadow: #ccc 0 0 5px 0; padding: 3px 10px; position: absolute; top: 32px; left: 0;">手机号：<i style="display: inline; line-height: 30px;">*******1681</i> <a href="#" style="color: #0096ff; padding-left: 10px;">更改</a></p>
                    </div>

                    <div style="display: inline-block; position: relative;">
                      <span style="display: inline-block; width: 32px; height: 32px; background: url('https://www.saleyee.com/static/imgs/55bc83c926f63039a743975129d0fa45.png') no-repeat; background-position: -32px 0; cursor: pointer;"></span>
                      <p style="line-height: 30px; white-space: nowrap; display: none; background: white; box-shadow: #ccc 0 0 5px 0; padding: 3px 10px; position: absolute; top: 32px; left: 0;">您尚未绑定邮箱 <a href="#" style="color: #0096ff; padding-left: 10px;">去绑定>></a></p>
                    </div>

                    <div style="display: inline-block; position: relative;">
                      <span style="display: inline-block; width: 32px; height: 32px; background: url('https://www.saleyee.com/static/imgs/55bc83c926f63039a743975129d0fa45.png') no-repeat; background-position: -64px 0; cursor: pointer;"></span>
                      <p style="line-height: 30px; white-space: nowrap; display: none; background: white; box-shadow: #ccc 0 0 5px 0; padding: 3px 10px; position: absolute; top: 32px; left: 6px; z-index: 99;">赛盈分销平台����<i style="display: inline; line-height: 30px;">未认证</i> <a href="#" style="color: #0096ff; padding-left: 10px;">去认证>></a></p>
                    </div>
                  </div>

                  <p style="line-height: 24px; margin: 0;">客户ID：<i style="display: inline; line-height: 24px;">CNSY51436528</i></p>
                </div>

                <!-- 右侧75% - VIP等级信息 -->
                <div style="width: calc(75% - 5px); padding: 20px; background-color: white;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <p style="color: #333; line-height: 20px; margin: 0;">会员等级：普通会员</p>
                    <a href="#" style="color: #cb261c; line-height: 20px; transition: all 0.3s;">了解更多会员权益>></a>
                  </div>

                  <div style="margin-bottom: 10px; margin-top: 20px; position: relative;">
                    <ul style="cursor: pointer; display: flex; margin: 0; padding: 0; list-style: none; gap: 2px;">
                      <!-- 普通 -->
                      <li style="cursor: pointer; margin-right: 2px; text-align: center; width: calc(16.6% - 2px);" @mouseenter="hoveredVipLevel = 'normal'" @mouseleave="hoveredVipLevel = null">
                        <b style="background: url('https://www.saleyee.com/static/imgs/4f10ca96fc4aa0f36fc878cce4c958f4.png') center/cover no-repeat; color: white; cursor: pointer; display: inline-block; height: 40px; line-height: 40px; margin-bottom: 5px; text-align: center; width: 40px;">普通</b>
                        <span style="background-color: #cb261c; border-radius: 6px 0 0 6px; cursor: pointer; display: inline-block; height: 12px; text-align: center; width: 100%;"></span>
                        <p style="cursor: pointer; line-height: 20px; text-align: center; margin: 0;">0.00 $</p>
                      </li>
                      <!-- VIP1 -->
                      <li style="cursor: pointer; display: list-item; margin-right: 2px; text-align: center; width: calc(16.6% - 2px);" @mouseenter="hoveredVipLevel = 'vip1'" @mouseleave="hoveredVipLevel = null">
                        <b style="border-color: #cb261c; color: #cb261c; cursor: pointer; display: inline-block; height: 40px; line-height: 40px; margin-bottom: 5px; text-align: center; width: 40px;">VIP1</b>
                        <span style="background-color: #cb261c; cursor: pointer; display: inline-block; height: 12px; opacity: 0.3; text-align: center; width: 100%;"></span>
                        <p style="cursor: pointer; line-height: 20px; text-align: center; margin: 0;">2000.00 $</p>
                      </li>
                      <!-- VIP2 -->
                      <li style="cursor: pointer; display: list-item; margin-right: 2px; text-align: center; width: calc(16.6% - 2px);" @mouseenter="hoveredVipLevel = 'vip2'" @mouseleave="hoveredVipLevel = null">
                        <b style="border-color: #cb261c; color: #cb261c; cursor: pointer; display: inline-block; height: 40px; line-height: 40px; margin-bottom: 5px; text-align: center; width: 40px;">VIP2</b>
                        <span style="background-color: #cb261c; cursor: pointer; display: inline-block; height: 12px; opacity: 0.3; text-align: center; width: 100%;"></span>
                        <p style="cursor: pointer; line-height: 20px; text-align: center; margin: 0;">10000.00 $</p>
                      </li>
                      <!-- VIP3 -->
                      <li style="cursor: pointer; display: list-item; margin-right: 2px; text-align: center; width: calc(16.6% - 2px);" @mouseenter="hoveredVipLevel = 'vip3'" @mouseleave="hoveredVipLevel = null">
                        <b style="border-color: #cb261c; color: #cb261c; cursor: pointer; display: inline-block; height: 40px; line-height: 40px; margin-bottom: 5px; text-align: center; width: 40px;">VIP3</b>
                        <span style="background-color: #cb261c; cursor: pointer; display: inline-block; height: 12px; opacity: 0.3; text-align: center; width: 100%;"></span>
                        <p style="cursor: pointer; line-height: 20px; text-align: center; margin: 0;">50000.00 $</p>
                      </li>
                      <!-- VIP4 -->
                      <li style="cursor: pointer; display: list-item; margin-right: 2px; text-align: center; width: calc(16.6% - 2px);" @mouseenter="hoveredVipLevel = 'vip4'" @mouseleave="hoveredVipLevel = null">
                        <b style="border-color: #cb261c; color: #cb261c; cursor: pointer; display: inline-block; height: 40px; line-height: 40px; margin-bottom: 5px; text-align: center; width: 40px;">VIP4</b>
                        <span style="background-color: #cb261c; cursor: pointer; display: inline-block; height: 12px; opacity: 0.3; text-align: center; width: 100%;"></span>
                        <p style="cursor: pointer; line-height: 20px; text-align: center; margin: 0;">200000.00 $</p>
                      </li>
                      <!-- VIP5 -->
                      <li style="cursor: pointer; display: list-item; text-align: center; width: calc(16.6% - 2px);" @mouseenter="hoveredVipLevel = 'vip5'" @mouseleave="hoveredVipLevel = null">
                        <b style="border-color: #cb261c; color: #cb261c; cursor: pointer; display: inline-block; height: 40px; line-height: 40px; margin-bottom: 5px; text-align: center; width: 40px;">VIP5</b>
                        <span style="background-color: #cb261c; border-radius: 0 6px 6px 0; cursor: pointer; display: inline-block; height: 12px; opacity: 0.3; text-align: center; width: 100%;"></span>
                        <p style="cursor: pointer; line-height: 20px; text-align: center; margin: 0;">500000.00 $</p>
                      </li>
                    </ul>
                    <!-- VIP权益弹窗 -->
                    <div :style="{ display: hoveredVipLevel ? 'block' : 'none', backgroundColor: 'rgb(255, 255, 255)', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px 0px', position: 'absolute', top: '90px', width: '100%', zIndex: 9 }">
                      <p :style="{ borderBottom: '1px solid rgb(238, 238, 238)', fontWeight: '700', lineHeight: '20px', marginBottom: '30px', paddingBottom: '18px', paddingLeft: '20px', paddingRight: '20px', paddingTop: '18px', margin: 0 }">
                        会员等级：{{ hoveredVipLevel === 'normal' ? '普通会员' : hoveredVipLevel === 'vip1' ? 'VIP1' : hoveredVipLevel === 'vip2' ? 'VIP2' : hoveredVipLevel === 'vip3' ? 'VIP3' : hoveredVipLevel === 'vip4' ? 'VIP4' : 'VIP5' }}
                      </p>
                      <ul :style="{ display: 'flex', flexWrap: 'wrap', margin: 0, padding: '0 20px 20px 20px', listStyle: 'none' }">
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-240px 0px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">每月下载SKU200个</p>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0', fontSize: '12px', color: '#999' }">本月剩余200个</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-280px 0px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">平台载单授权</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-80px 0px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">API 对接</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-120px 0px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">圈货</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-160px 0px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">品牌授权服务</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-440px 0px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">新品优先销售权</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-240px -40px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">精品独家销售权</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-360px -40px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">订单处理免费</p>
                        </li>
                        <li :style="{ paddingBottom: '30px', paddingLeft: '10px', paddingRight: '10px', textAlign: 'center', width: '16.6%' }">
                          <span :style="{ backgroundImage: 'url(https://www.saleyee.com/static/imgs/bd5826d04fdee6b8eb9b900f4a9ba8f5.png)', backgroundPosition: '-440px -40px', backgroundRepeat: 'no-repeat', display: 'inline-block', height: '40px', textAlign: 'center', width: '40px' }"></span>
                          <p :style="{ lineHeight: '20px', textAlign: 'center', margin: '5px 0 0 0' }">会员服务免费</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 下部：专属客户经理 + 待办事���（35% + 65%） -->
              <div style="height: 10px; background-color: #f0f0f0;"></div>

              <div style="display: flex; gap: 10px; background-color: #f0f0f0;">
                <!-- 左侧35% - 专属客户经理 -->
                <div style="background-color: white; padding-bottom: 20px; padding-top: 20px; width: 28%;">
                  <h3 style="color: #111; font-size: 16px; height: 34px; line-height: 34px; margin-left: 20px; margin-right: 20px;">���属客户��理</h3>
                  <div style="position: relative;">
                    <p style="height: 34px; line-height: 34px; padding-left: 20px; padding-right: 20px; margin: 0;">姓名：<b style="display: inline; line-height: 34px;">详见客户</b></p>
                    <p style="height: 34px; line-height: 34px; padding-left: 20px; padding-right: 20px; margin: 0;">联系电话：<b style="display: inline; line-height: 34px;">15710839739</b></p>
                    <p style="height: 34px; line-height: 34px; padding-left: 20px; padding-right: 20px; margin: 0;">联系邮箱：<b style="display: inline; line-height: 34px;">Yunnie@saleyee.cn</b></p>
                  </div>
                </div>

                <!-- 右侧65% - 待办事项 -->
                <div style="background-color: white; padding-bottom: 20px; padding-top: 20px; flex: 1;">
                  <h3 style="color: #111; font-size: 16px; height: 34px; line-height: 34px; margin-left: 20px; margin-right: 20px;">待办事项 <span style="cursor: pointer; display: inline-block; line-height: 34px; position: relative; margin-left: 5px;">ⓘ</span></h3>
                  <ul style="display: flex; flex-wrap: wrap; padding-left: 20px; padding-right: 20px; margin: 0; list-style: none;">
                    <li style="height: 34px; line-height: 34px; width: 33.333%;">
                      <a href="#" style="color: #333; cursor: pointer; display: inline; line-height: 34px; transition: 0.3s;"><p style="cursor: pointer; display: inline-block; line-height: 34px; margin: 0;">待付款：</p><span style="color: #111; cursor: pointer; display: inline; line-height: 34px;">0</span></a>
                    </li>
                    <li style="height: 34px; line-height: 34px; width: 33.333%;">
                      <a href="#" style="color: #333; cursor: pointer; display: inline; line-height: 34px; transition: 0.3s;"><p style="cursor: pointer; display: inline-block; line-height: 34px; margin: 0;">待发货：</p><span style="color: #111; cursor: pointer; display: inline; line-height: 34px;">0</span></a>
                    </li>
                    <li style="height: 34px; line-height: 34px; width: 33.333%;">
                      <a href="#" style="color: #333; cursor: pointer; display: inline; line-height: 34px; transition: 0.3s;"><p style="cursor: pointer; display: inline-block; line-height: 34px; margin: 0;">待收货：</p><span style="color: #111; cursor: pointer; display: inline; line-height: 34px;">0</span></a>
                    </li>
                    <li style="height: 34px; line-height: 34px; width: 33.333%;">
                      <a href="#" style="color: #333; cursor: pointer; display: inline; line-height: 34px; transition: 0.3s;"><p style="cursor: pointer; display: inline-block; line-height: 34px; margin: 0;">异常订���：</p><span style="color: #111; cursor: pointer; display: inline; line-height: 34px;">0</span></a>
                    </li>
                    <li style="height: 34px; line-height: 34px; width: 33.333%;">
                      <a href="#" style="color: #333; cursor: pointer; display: inline; line-height: 34px; transition: 0.3s;"><p style="cursor: pointer; display: inline-block; line-height: 34px; margin: 0;">跟踪号变更：</p><span style="color: #111; cursor: pointer; display: inline; line-height: 34px;">0</span></a>
                    </li>
                    <li style="height: 34px; line-height: 34px; width: 33.333%;">
                      <a href="#" style="color: #333; cursor: pointer; display: inline; line-height: 34px; transition: 0.3s;"><p style="cursor: pointer; display: inline-block; line-height: 34px; margin: 0;">待生成订单：</p><span style="color: #111; cursor: pointer; display: inline; line-height: 34px;">0</span></a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <!-- 基本信息面板 -->
            <BasicInfoPage v-else-if="activeMenu === 'baseinfo'" />

            <!-- 地址簿面板 -->
            <AddressBookPage v-else-if="activeMenu === 'address'" />

            <!-- 账户安全面板 -->
            <SecurityPage v-else-if="activeMenu === 'security'" />

            <!-- 商城公告面板 -->
            <MallAnnouncementPage v-else-if="activeMenu === 'mall-announcement'" />

            <!-- 营销活动面板 -->
            <MarketingActivityPage v-else-if="activeMenu === 'marketing-activity'" />

            <!-- 订单通知面板 -->
            <OrderNotificationPage v-else-if="activeMenu === 'order-notification'" />

            <!-- 售后通知面板 -->
            <AfterSalesNotificationPage v-else-if="activeMenu === 'after-sales-notification'" />

            <!-- 平���消息面板 -->
            <PlatformMessagePage v-else-if="activeMenu === 'platform-message'" />

            <!-- 商品管理��板 -->
            <ProductManagementPage v-else-if="activeMenu === 'products'" />

            <!-- 刊登推���列表面板 -->
            <ListingPushPage v-else-if="activeMenu === 'listing-push'" />

            <!-- ��登商品列表面板 -->
            <ListingProductsPage v-else-if="activeMenu === 'listing-products'" />

            <!-- 品牌授权面板 -->
            <BrandAuthPage v-else-if="activeMenu === 'brand-auth'" />

            <!-- 商品通知面板 -->
            <ProductNotificationPage v-else-if="activeMenu === 'product-notification'" />

            <!-- 返现活动面板 -->
            <CashbackActivityPage v-else-if="activeMenu === 'sales'" />

            <!-- 我的���额面板 -->
            <MyBalancePage v-else-if="activeMenu === 'my-balance'" />

            <!-- 询价单面板 -->
            <InquiryOrderPage v-else-if="activeMenu === 'inquiry-order'" />

            <!-- 我的订单面板 -->
            <MyOrderPage v-else-if="activeMenu === 'orders'" />

            <!-- 我的账单面板 -->
            <MyInvoicesPage v-else-if="activeMenu === 'my-invoices'" />

            <!-- 我的采购券面板 -->
            <MyVouchersPage v-else-if="activeMenu === 'my-vouchers'" />

            <!-- 平台载单面板 -->
            <PlatformOrderPage v-else-if="activeMenu === 'platform-orders'" />

            <!-- 平台授权面�� -->
            <PlatformAuthPage v-else-if="activeMenu === 'platform-auth'" />

            <!-- 载单设���面板 -->
            <OrderSettingsPage v-else-if="activeMenu === 'order-settings'" />

            <!-- SKU映射面板 -->
            <SkuMappingPage v-else-if="activeMenu === 'sku-mapping'" />

            <!-- 物流��射面板 -->
            <LogisticsMappingPage v-else-if="activeMenu === 'logistics-mapping'" />

            <!-- 库存更新面��� -->
            <InventoryUpdatePage v-else-if="activeMenu === 'inventory-update'" />

            <!-- 更新���录面板 -->
            <UpdateLogPage v-else-if="activeMenu === 'update-log'" />

            <!-- 批量下单面板 -->
            <BatchOrderPage v-else-if="activeMenu === 'batch-orders'" />

            <!-- 下载中心面板 -->
            <DownloadCenterPage v-else-if="activeMenu === 'download-center'" />

            <!-- 支付账号管理面板 -->
            <PaymentAccountPage v-else-if="activeMenu === 'payment-account'" />

            <!-- 异常订单面板 -->
            <ExceptionOrderPage v-else-if="activeMenu === 'exception-orders'" />

            <!-- 售后管理面板 -->
            <AfterSalesManagementPage v-else-if="activeMenu === 'after-sales-management'" />

            <!-- 其他面板 -->
            <div v-else class="bg-white p-6 rounded-lg border border-slate-200">
              <div class="flex flex-col items-center justify-center py-16">
                <svg class="w-20 h-20 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <p class="text-slate-500 text-center">此功能开发中...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  User,
  ChevronDown,
  MessageSquare,
  Package,
  Megaphone,
  ShoppingCart,
  Users,
  Store,
  Wallet,
  BarChart3,
  FileText,
} from 'lucide-vue-next'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SidebarItem from '@/components/SidebarItem.vue'
import BasicInfoPage from '@/pages/BasicInfoPage.vue'
import AddressBookPage from '@/pages/AddressBookPage.vue'
import SecurityPage from '@/pages/SecurityPage.vue'
import MallAnnouncementPage from '@/pages/MallAnnouncementPage.vue'
import MarketingActivityPage from '@/pages/MarketingActivityPage.vue'
import OrderNotificationPage from '@/pages/OrderNotificationPage.vue'
import AfterSalesNotificationPage from '@/pages/AfterSalesNotificationPage.vue'
import PlatformMessagePage from '@/pages/PlatformMessagePage.vue'
import ProductManagementPage from '@/pages/ProductManagementPage.vue'
import ListingPushPage from '@/pages/ListingPushPage.vue'
import ListingProductsPage from '@/pages/ListingProductsPage.vue'
import BrandAuthPage from '@/pages/BrandAuthPage.vue'
import ProductNotificationPage from '@/pages/ProductNotificationPage.vue'
import CashbackActivityPage from '@/pages/CashbackActivityPage.vue'
import InquiryOrderPage from '@/pages/InquiryOrderPage.vue'
import MyOrderPage from '@/pages/MyOrderPage.vue'
import MyInvoicesPage from '@/pages/MyInvoicesPage.vue'
import PlatformOrderPage from '@/pages/PlatformOrderPage.vue'
import BatchOrderPage from '@/pages/BatchOrderPage.vue'
import ExceptionOrderPage from '@/pages/ExceptionOrderPage.vue'
import AfterSalesManagementPage from '@/pages/AfterSalesManagementPage.vue'
import DownloadCenterPage from '@/pages/DownloadCenterPage.vue'
import PlatformAuthPage from '@/pages/PlatformAuthPage.vue'
import OrderSettingsPage from '@/pages/OrderSettingsPage.vue'
import SkuMappingPage from '@/pages/SkuMappingPage.vue'
import LogisticsMappingPage from '@/pages/LogisticsMappingPage.vue'
import InventoryUpdatePage from '@/pages/InventoryUpdatePage.vue'
import UpdateLogPage from '@/pages/UpdateLogPage.vue'
import MyBalancePage from '@/pages/MyBalancePage.vue'
import MyVouchersPage from '@/pages/MyVouchersPage.vue'
import PaymentAccountPage from '@/pages/PaymentAccountPage.vue'

const activeMenu = ref('info')
const expandedGroups = ref({
  personal: true,
  messages: false,
  products: false,
  marketing: false,
  orders: false,
  customers: false,
  platforms: false,
  feedback: false,
})
const hoveredVipLevel = ref(null)

const menuLabels = {
  info: '个人中心',
  baseinfo: '基本信息',
  address: '地址簿',
  vat: 'VAT税号管理',
  security: '�����户���全',
  messages: '消息中心',
  'mall-announcement': '商城公告',
  'marketing-activity': '营销活动',
  'order-notification': '订单通��',
  'after-sales-notification': '售后通知',
  'platform-message': '��台消��',
  'shopping-cart': '购物车',
  products: '商品管理',
  'listing-push': '刊登推送列表',
  'listing-products': '刊登商品列表',
  'brand-auth': '品牌��权',
  'product-notification': '商品通知',
  sales: '返现活动',
  'inquiry-order': '咨价单',
  orders: '我的订单',
  'platform-orders': '平���载单',
  'batch-orders': '批量下单',
  'exception-orders': '异常订单',
  'after-sales-management': '售后管理',
  'download-center': '下载中心',
  customers: '客户服务',
  'my-balance': '我的余额',
  'my-invoices': '我��账单',
  'my-vouchers': '我的采购券',
  'payment-account': '支付账号管理',
  'platform-auth': '平台授��',
  'order-settings': '载单设置',
  'sku-mapping': 'SKU映射',
  'logistics-mapping': '物流映射',
  'inventory-update': '库存更新',
  'update-log': '更新记录',
  'third-platform': '第三方开店',
  certification: '资产管理',
}

const activeMenuLabel = computed(() => menuLabels[activeMenu.value] || '个人中心')

const navigateToCart = () => {
  window.location.href = '/cart'
}

const toggleGroup = (groupName) => {
  // 关闭所有其他菜单组，只展开当前组
  Object.keys(expandedGroups.value).forEach(key => {
    if (key === groupName) {
      expandedGroups.value[key] = true
    } else {
      expandedGroups.value[key] = false
    }
  })
}
</script>

<style scoped>
/* 左侧导航栏高度自动伸缩 */
.sidebar-menu {
  height: auto;
}
</style>
